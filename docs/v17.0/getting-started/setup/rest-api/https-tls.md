# Enabling HTTPS/TLS for the REST API

By default, Butler serves its public REST API over plain HTTP. TLS can be enabled so that the API is exposed over HTTPS using a PEM-encoded certificate and key.

## What's this?

TLS is configured under `Butler.restServerConfig.tls` in the Butler YAML config file. When `tls.enable` is `true`, Butler terminates TLS on the public listener port and continues to use the existing `backgroundServerPort` for the internal port behind the local proxy/public port

If `tls.enable` is `false` (the default), Butler keeps serving the public REST API over HTTP exactly as before.

## Configuration

Add the following settings to the Butler YAML config file:

```yaml
Butler:
    restServerConfig:
        enable: true
        serverHost: butler.example.com
        serverPort: 8443
        backgroundServerPort: 8081
        tls:
            enable: true
            cert: /path/to/cert/certfile.pem
            key: /path/to/cert/keyfile.pem
            ca: /path/to/cert/ca-bundle.pem # Optional. Use null if not needed.
```

### Settings

| Setting | Required | Description |
| --- | --- | --- |
| `tls.enable` | Yes | Set to `true` to serve the public REST API over HTTPS. |
| `tls.cert` | Yes | Absolute path to a PEM-encoded certificate file. |
| `tls.key` | Yes | Absolute path to a PEM-encoded private key file matching `tls.cert`. |
| `tls.ca` | No | Absolute path to a PEM-encoded CA / intermediate bundle. Use `null` if not needed. |

## Runtime behavior

- `serverPort` is the public Butler REST API listener. When TLS is enabled, this port accepts HTTPS connections.
- `backgroundServerPort` is still used for Butler's internal Fastify instance behind the local reverse proxy.
- When TLS is enabled, Butler loads the PEM files from `tls.cert`, `tls.key`, and optionally `tls.ca` during startup.
- Startup fails with a clear error if Butler cannot read the configured TLS files.
- Swagger/OpenAPI metadata and the startup log message for `/documentation` switch from `http://...` to `https://...` automatically when TLS is enabled.

## Validation

- The config file schema validates `Butler.restServerConfig.tls`.
- `tls.enable`, `tls.cert`, and `tls.key` are required schema-validated settings.
- `tls.ca` is optional and accepts either a filesystem path or `null`.

## Operational notes

- Use absolute certificate paths whenever possible.
- The certificate and key must be PEM encoded and match each other.
- `tls.ca` is optional; set it to `null` when no CA/intermediate bundle should be loaded.

## See also

- [Configuring Butler's REST API](/v17.0/getting-started/setup/rest-api/) — Overall REST API configuration, including the `restServerConfig` block.
- [Config file reference](/v17.0/reference/config-file) — Full reference for every `restServerConfig` setting.
- [Security Considerations](/v17.0/security) — Security guidance for Butler, including the REST API listener.
