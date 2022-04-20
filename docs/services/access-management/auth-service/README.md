# Auth Service

### Other settings

#### Token authentication with optional skip

The `skipTokenCheck` saves \~300ms by skipping validation on your `token` and `tokenSecret`.

```javascript
import { createOAuth1Client } from '@extrahorion/javascript-sdk';

const sdk = createOAuth1Client({
  host: 'dev.fibricheck.com',
  consumerKey: '',
  consumerSecret: '',
});

await sdk.auth.authenticate({
  token: '',
  tokenSecret: '',
  skipTokenCheck: true,
});
```
