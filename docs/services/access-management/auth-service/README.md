# Auth Service

### Other settings

#### Token authentication with optional skip

The `skipTokenCheck` saves \~300ms by skipping validation on your `token` and `tokenSecret`.

```javascript
import { createOAuth1Client } from '@extrahorion/javascript-sdk';

const exh = createOAuth1Client({
  host: 'sandbox.extrahorizon.io',
  consumerKey: '',
  consumerSecret: '',
});

await exh.auth.authenticate({
  token: '',
  tokenSecret: '',
  skipTokenCheck: true,
});
```
