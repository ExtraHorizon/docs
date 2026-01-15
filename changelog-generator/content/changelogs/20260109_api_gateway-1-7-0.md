---
service: api-gateway
version: 1.7.0
date: 2026-01-09
---



**🎁 Features**

- Wildcard support for allowed CORS origins
    - Allowed CORS origins can now be defined using wildcard patterns (for example, `https://*.example.com`)

**⚒️ Improvements**

- Security header hardening
    - The `X-Powered-By` header is now never returned from Extra Horizon
    - The `Strict-Transport-Security` header is now always returned from Extra Horizon
