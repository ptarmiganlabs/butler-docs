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

### Using Butler Convenience Subs

Butler provides pre-built Qlik Sense subroutines that simplify API calls:

```qlik
// Load Butler subroutines
$(Include=lib://Butler/butler_subs.qvs);

// Copy a file
Call CopyFile('e:\data\qvd\sales\incoming\sales.qvd', 'e:\data\qvd\sales\processed\sales_$(date(today(), 'YYYY-MM-DD')).qvd')

// Move a file
Call MoveFile('e:\data\qvd\temp\processing.qvd', 'e:\data\archive\processed_$(timestamp(now(), 'YYYY-MM-DD_hhmm')).qvd')

// Delete old files
Call DeleteFile('e:\data\qvd\temp\old_temp.qvd')
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
