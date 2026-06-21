# Security Considerations

Security is important! Keep these things in mind when deploying Butler.

::: info
Security is a whole field in its own.  
What's considered secure in one company might be considered insecure in another.

It's a good idea to review your tools and services every now and then, for example making sure they are updated to include the latest security patches etc.  
When in doubt, be paranoid.
:::

## Security considerations

::: warning Security/Disclosure
If you discover a serious bug with Butler that may pose a security problem, please disclose it confidentially to security@ptarmiganlabs.com first, so that it can be assessed and hopefully fixed prior to being exploited. Please do not raise GitHub issues for security-related doubts or problems.
:::

- Make sure to configure the firewall on the server where Butler is running to only accept connections from the desired clients/IP addresses.

  A reasonable first approach would be to configure the firewall to only allow calls from localhost. That way calls to Butler can only be made from the server where Butler itself is running.  
   If Butler is not running on the Sense server, the IPs of the Sense servers should also be whitelisted in the firewall, of course.

- The MQTT connections are not secured by certificates or passwords.

  For use within a controlled network that might be fine, but nonetheless something to keep in mind. Adding certificate based authentication (which MQTT supports) would solve this.

- Butler uses various Node.js modules from [npm](https://www.npmjs.com/). If concerned about security, you should review these dependencies and decide whether there are issues in them or not.

  Same thing with Butler itself - while efforts have been made to make Butler secure, you need to decide for yourself whether the level of security is enough for your use case.

  Butler is continuously checked for security vulnerabilities by using GitHub security audit, [Snyk](https://snyk.io/), npm audit and other tools.

## Butler's REST API

Butler can serve its REST API over either HTTP (the default) or HTTPS. As Butler typically runs on the Sense server itself (or a server in close network proximity to the Sense server), the firewalls of that server can be configured to protect Butler from unauthorized access.

When TLS is not enabled, Butler uses plain HTTP for the public REST API. This way of using HTTP for communication between internal systems is in many cases considered acceptable from a security perspective. You should however always consider what's ok in _your_ particular company/setup/configuration/network.

When TLS is needed, Butler can be configured to serve the public REST API over HTTPS by enabling `Butler.restServerConfig.tls` in the config file. See [Enabling HTTPS/TLS for the REST API](/v17.0/getting-started/setup/rest-api/https-tls) for the configuration, validation rules, and operational notes. Existing deployments that do not enable TLS continue to serve the REST API over HTTP exactly as before.

## Butler talking to Qlik Sense

Butler uses https for all communication with Sense, using Sense's certificates for authentication.

## Signed binaries

The macOS executable binary is signed and notarized by Apple's standard process.  
A warning may still be shown first time the app is started. This is expected and normal.

The Windows executable binary is signed by "Open Source Developer, Göran Sander".

## Security Testing (PEN Testing)

Butler undergoes regular penetration testing using a combination of static and dynamic analysis tools. This broadly follows the OWASP Testing Guide and PTES methodology.

**Static analysis** examines source code and dependencies without running the application:

- **Dependency scanning** (`npm audit`, Snyk) — checks all npm packages for known vulnerabilities
- **Secret scanning** (Gitleaks) — detects accidentally committed credentials, API keys, and tokens in the entire git history
- **SAST** (Semgrep) — applies security rules to source code to find injection vulnerabilities, insecure API usage, and OWASP Top 10 issues
- **CodeQL** — deep semantic analysis to find vulnerabilities that pattern-based tools miss

**Dynamic testing** probes a running instance of the application:

- **Port scanning** (nmap) — discovers open ports and services on the target host
- **TLS/SSL auditing** (sslscan) — verifies strong protocols and ciphers, checks for Heartbleed and similar vulnerabilities
- **HTTP security headers** — verifies HSTS, CSP, X-Frame-Options, X-Content-Type-Options, and other recommended headers are set
- **CVE and misconfiguration scanning** (Nuclei) — template-based scanning against thousands of known vulnerabilities, exposed panels, and default credentials
- **DAST** (OWASP ZAP) — active and passive scanning to find XSS, SQL injection, broken authentication, and other runtime vulnerabilities

Results are reviewed, prioritized, and acted on (unless deemed low/acceptable risk) before each release.
