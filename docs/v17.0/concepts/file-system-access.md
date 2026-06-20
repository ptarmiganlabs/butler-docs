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
  # List of directories between which file copying via the REST API can be done.
  fileCopyApprovedDirectories:
    - fromDirectory: C:\Users\joe\butler-test-dir1\abc\..
      toDirectory: C:\Users\joe\butler-test-dir2

  # List of directories between which file moves via the REST API can be done.
  fileMoveApprovedDirectories:
    - fromDirectory: C:\Users\joe\butler-test-dir1\abc\..
      toDirectory: C:\Users\joe\butler-test-dir2

  # List of directories in which file deletes via the REST API can be done.
  fileDeleteApprovedDirectories:
    - C:\Users\joe\butler-test-dir1
    - C:\Users\joe\butler-test-dir1\abc\..
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

There are a set of convenient Qlik Sense subroutines provided with Butler to simplify calling these APIs from load scripts.

The examples section shows how to use these subs - or call the Butler APIs directly.

## Security Best Practices

### 1. Principle of Least Privilege

- Configure only necessary paths for each operation

### 2. Path Validation

- **Absolute Paths**: Use full paths to prevent directory traversal
- **Network Shares**: Be cautious with UNC paths and permissions

---

::: tip Getting Started

1. **Define Allowed Paths**: Configure directories for each operation type
2. **Test with Simple Operations**: Start with basic file copy/delete operations
3. **Use Convenience Subs**: Leverage pre-built subroutines for easier integration
4. **Implement Error Handling**: Always check operation results in your scripts

:::

::: warning Security Reminder

Always follow the principle of least privilege when configuring allowed paths. Only grant access to directories that actually need file operations, and regularly review the configured paths.

:::
