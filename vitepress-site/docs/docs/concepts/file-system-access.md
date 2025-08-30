# File System Access

Secure file operations (copy, move, delete) from Qlik Sense load scripts using Butler's controlled access approach.

## The Security Challenge

Qlik Sense significantly improved security compared to QlikView by restricting file system access, but this created new challenges for common file operations.

### QlikView vs Qlik Sense File Access

**QlikView Approach:**

- Load scripts could access any file the service account could reach
- Direct file operations (copy, move, delete) from scripts
- **Security Risk**: Poorly written or malicious apps could access sensitive files

**Qlik Sense Standard Mode:**

- Introduced [folder data connections](https://help.qlik.com/en-US/sense/August2021/Subsystems/Hub/Content/Sense_Hub/LoadData/connect-data-sources-data-load-editor.htm) (lib:// references)
- Strict [file system access restrictions](https://help.qlik.com/en-US/sense/August2021/Subsystems/Hub/Content/Sense_Hub/LoadData/file-system-access-restriction.htm)
- **Better Security**: Access limited to pre-defined folder data connections
- **Limitation**: No file-level operations (delete, copy, move) from scripts

**Legacy Mode Option:**

- Per-server setting to revert to QlikView-style access
- **Trade-off**: Regains file operation capabilities but loses security improvements

## Butler's Controlled Access Solution

Butler provides a secure middle ground by offering REST API endpoints for file operations with administrator-controlled access restrictions.

### Key Principles

1. **Whitelist Approach**: Only pre-defined folders are accessible for file operations
2. **Operation-Specific Control**: Different folders can be configured for different operations
3. **API-Based**: Operations performed via REST API calls from load scripts
4. **Audit Trail**: All file operations can be logged and monitored

### Supported Operations

- **File Copy**: Copy files between allowed directories
- **File Move**: Move/rename files within allowed directories
- **File Delete**: Remove files from allowed directories

## Configuration

Define allowed directories for each file operation in Butler's configuration:

```yaml
Butler:
  fileSystem:
    enable: true
    copy:
      allowedPaths:
        - path: 'e:\data\qvd\sales\incoming'
          comment: "Incoming sales data files"
        - path: 'e:\data\qvd\sales\processed'
          comment: "Processed sales data files"
        - path: '\\shared-server\data\exports'
          comment: "Network share for data exports"

    move:
      allowedPaths:
        - path: 'e:\data\qvd\temp'
          comment: "Temporary file processing area"
        - path: 'e:\data\archive'
          comment: "Archive folder for old files"

    delete:
      allowedPaths:
        - path: 'e:\data\qvd\temp'
          comment: "Temporary files safe to delete"
        - path: 'e:\logs\old'
          comment: "Old log files cleanup"
```

## API Endpoints

Butler provides REST endpoints for each file operation:

### File Copy

```text
POST /v4/filecopy
Content-Type: application/json

{
  "fromFile": "e:\\data\\qvd\\sales\\incoming\\sales_data.qvd",
  "toFile": "e:\\data\\qvd\\sales\\processed\\sales_data_2024.qvd"
}
```

### File Move

```text
POST /v4/filemove
Content-Type: application/json

{
  "fromFile": "e:\\data\\qvd\\temp\\temp_file.qvd",
  "toFile": "e:\\data\\archive\\archived_file.qvd"
}
```

### File Delete

```text
DELETE /v4/filedelete
Content-Type: application/json

{
  "deleteFile": "e:\\data\\qvd\\temp\\old_temp_file.qvd"
}
```

## Integration with Load Scripts

### Using Butler Convenience Subs

Butler provides pre-built Qlik Sense subroutines that simplify API calls:

```qlik
// Load Butler subroutines
$(Include=lib://Butler/butler_subs.qvs);

// Copy a file
Call Butler_CopyFile('e:\data\qvd\sales\incoming\sales.qvd', 'e:\data\qvd\sales\processed\sales_$(date(today(), 'YYYY-MM-DD')).qvd')

// Move a file
Call Butler_MoveFile('e:\data\qvd\temp\processing.qvd', 'e:\data\archive\processed_$(timestamp(now(), 'YYYY-MM-DD_hhmm')).qvd')

// Delete old files
Call Butler_DeleteFile('e:\data\qvd\temp\old_temp.qvd')
```

### Direct REST API Calls

For maximum control, call the Butler APIs directly:

```qlik
// Delete old QVD files from temp folder
LET vFileToDelete = 'e:\data\qvd\temp\old_file.qvd';

LOAD
    StatusCode,
    ResponseBody
FROM JSON (
    LOAD
        '$(vFileToDelete)' as deleteFile
    FROM "$(Join(Chr(123),''))") (jsonPath="$"))
)
URL "http://butler-server:8080/v4/filedelete",
httpMethod "DELETE",
httpHeader "Content-Type" "application/json";
```

## Common Use Cases

### 1. QVD File Management

**Scenario**: Clean up temporary QVD files after processing

```qlik
// Process data and create QVDs
STORE TempTable INTO 'lib://Data/temp/processing.qvd';

// Copy to final location
Call Butler_CopyFile(
    'e:\data\qvd\temp\processing.qvd',
    'e:\data\qvd\final\$(vAppName)_$(vTimestamp).qvd'
);

// Clean up temporary file
Call Butler_DeleteFile('e:\data\qvd\temp\processing.qvd');
```

### 2. File Archiving

**Scenario**: Archive processed files with timestamps

```qlik
// Move processed file to archive
LET vArchiveFile = 'e:\data\archive\sales_data_' & timestamp(now(), 'YYYY-MM-DD_hhmmss') & '.qvd';

Call Butler_MoveFile('e:\data\qvd\sales\current.qvd', '$(vArchiveFile)');
```

### 3. Log File Cleanup

**Scenario**: Remove old log files to manage disk space

```qlik
// Delete log files older than 30 days
FOR vFile = 1 to NoOfRows('OldLogFiles')
    LET vLogFile = Peek('FilePath', $(vFile)-1, 'OldLogFiles');
    Call Butler_DeleteFile('$(vLogFile)');
NEXT vFile;
```

### 4. Data Export Management

**Scenario**: Copy data exports to network shares

```qlik
// Export data to CSV
STORE DataTable INTO 'lib://Exports/temp/export.csv' (txt);

// Copy to network share for external systems
Call Butler_CopyFile(
    'e:\data\exports\temp\export.csv',
    '\\shared-server\data\exports\$(vExportName)_$(date(today(), "YYYY-MM-DD")).csv'
);
```

## Security Best Practices

### 1. Principle of Least Privilege

```yaml
# Configure only necessary paths for each operation
Butler:
  fileSystem:
    delete:
      allowedPaths:
        # Only allow deletion in temp/cache folders
        - path: 'e:\data\temp'
        - path: 'e:\cache\qvd'
    copy:
      allowedPaths:
        # Allow copying between data processing folders
        - path: 'e:\data\incoming'
        - path: 'e:\data\processed'
        - path: 'e:\data\exports'
```

### 2. Path Validation

- **Absolute Paths**: Use full paths to prevent directory traversal
- **Restricted Extensions**: Consider limiting file types if needed
- **Network Shares**: Be cautious with UNC paths and permissions

### 3. Audit and Monitoring

```yaml
Butler:
  fileSystem:
    enable: true
    auditLog:
      enable: true
      logLevel: info # Log all file operations
```

### 4. Error Handling

```qlik
// Check API response for errors
IF StatusCode <> 200 THEN
    TRACE File operation failed: $(ResponseBody);
    Exit Script;
END IF;
```

## Convenience Subroutines

Butler includes pre-built subroutines available in the [butler_subs.qvs](https://github.com/ptarmiganlabs/butler/blob/master/docs/sense_script/butler_subs.qvs) file:

### Available Subs

- `Butler_CopyFile(fromPath, toPath)` - Copy a file
- `Butler_MoveFile(fromPath, toPath)` - Move/rename a file
- `Butler_DeleteFile(filePath)` - Delete a file
- `Butler_FileExists(filePath)` - Check if file exists
- `Butler_GetFileInfo(filePath)` - Get file metadata

### Loading the Subs

```qlik
// Include Butler subroutines from data connection
$(Include=lib://Butler/butler_subs.qvs);

// Or include from local file
$(Include=\\butler-server\butler\scripts\butler_subs.qvs);
```

## Error Handling and Responses

### Success Response

```json
{
  "status": "success",
  "message": "File operation completed successfully",
  "operation": "copy",
  "fromFile": "e:\\data\\source.qvd",
  "toFile": "e:\\data\\target.qvd"
}
```

### Error Response

```json
{
  "status": "error",
  "message": "Source file not found",
  "operation": "copy",
  "fromFile": "e:\\data\\missing.qvd",
  "errorCode": "FILE_NOT_FOUND"
}
```

### Common Error Codes

- `PATH_NOT_ALLOWED`: Specified path not in allowed directories
- `FILE_NOT_FOUND`: Source file doesn't exist
- `ACCESS_DENIED`: Insufficient permissions
- `DISK_FULL`: Insufficient disk space
- `FILE_IN_USE`: File locked by another process

## Performance Considerations

### Batch Operations

For multiple file operations, consider grouping them:

```qlik
// Process multiple files efficiently
FOR vFile = 1 to NoOfRows('FilesToProcess')
    LET vSourceFile = Peek('SourcePath', $(vFile)-1, 'FilesToProcess');
    LET vTargetFile = Peek('TargetPath', $(vFile)-1, 'FilesToProcess');

    Call Butler_CopyFile('$(vSourceFile)', '$(vTargetFile)');
NEXT vFile;
```

### Network Considerations

- **Local Operations**: Fastest when source and target are on same server
- **Network Copies**: Consider network bandwidth for large files
- **Timeouts**: Configure appropriate timeouts for large file operations

## Troubleshooting

### Common Issues

1. **Path Not Allowed Error**

   - Verify path is configured in Butler's allowed paths
   - Check path format (use forward slashes or escaped backslashes)

2. **Permission Denied**

   - Ensure Butler service account has required file system permissions
   - Check folder permissions for both source and target locations

3. **File Not Found**
   - Verify file path and name spelling
   - Ensure file exists before attempting operation

### Debug Logging

Enable detailed logging to troubleshoot issues:

```yaml
Butler:
  fileSystem:
    enable: true
    debug: true
    logLevel: debug
```

::: tip Getting Started

1. **Define Allowed Paths**: Configure directories for each operation type
2. **Test with Simple Operations**: Start with basic file copy/delete operations
3. **Use Convenience Subs**: Leverage pre-built subroutines for easier integration
4. **Implement Error Handling**: Always check operation results in your scripts

:::

::: warning Security Reminder

Always follow the principle of least privilege when configuring allowed paths. Only grant access to directories that actually need file operations, and regularly review the configured paths.

:::
