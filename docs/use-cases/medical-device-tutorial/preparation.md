# Preparation

Before you begin, make sure you have the credentials to access your Extra Horizon environment. You'll need

<table><thead><tr><th width="358">Variable</th><th>Example</th></tr></thead><tbody><tr><td>Host URL</td><td><code>api.dev.my-company.extrahorizon.io</code></td></tr><tr><td>OAUTH1 consumer key</td><td><code>bb6c5186acf8aca8ed64ef4ef49e08bb4484c7c4</code></td></tr><tr><td>OAUTH1 consumer secret</td><td><code>4808fbc315294aa7aeb2e40b76d84680c0b582ee</code></td></tr><tr><td>e-mail</td><td><code>john.doe@extrahorizon.com</code></td></tr><tr><td>password</td><td><code>SomeDiff!UnguessableP8ssword</code></td></tr></tbody></table>



Using `Host URL`, `e-mail` and `password`, you can access the Control Center UI at [https://app.extrahorizon.com](https://app.extrahorizon.com). Please log in and explore the UI at your leisure.

This tutorial will be based on code located in the GitHub repository at [https://github.com/ExtraHorizon/medical-device-tutorial](https://github.com/ExtraHorizon/medical-device-tutorial).&#x20;

1. You'll need to have [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs) installed in order to use the repository
2. Check out the repository:&#x20;

```bash
git clone git@github.com:ExtraHorizon/medical-device-tutorial.git
```

3. In the repository, do

```sh
npm install
```

This will install all the repository dependencies, including the [Extra Horizon SDK](https://docs.extrahorizon.com/javascript-sdk/) and [CLI](https://docs.extrahorizon.com/cli/). The SDK will be used by our tutorial application to interact with the Extra Horizon API, while we'll use the CLI to set up & manage our Extra Horizon configuration.

4. Now we'll need to authenticate the CLI to the Extra Horizon backend so that we can use the CLI to manage our configuration. Using the credentials mentioned at the top of this page, do

<pre class="language-bash"><code class="lang-bash"><strong>npx exh login --host=https://&#x3C;Host URL> --email=&#x3C;email> 
</strong>    --password=&#x3C;password> --consumerKey=&#x3C;consumer key> 
    --consumerSecret=&#x3C;consumer secret>
</code></pre>

The CLI will authenticate you & store your credentials in `~/.exh/credentials`.

5. Verify that the CLI works correctly by doing

```
npx exh data schemas list
```

which should return an (empty) list of data schemas.

#### Repository structure

The structure of the repository is as follows:&#x20;

```
.
├── 1-data-model
│   └── schemas
├── 2-workflows
│   ├── schemas
│   ├── tasks
│   │   └── analyze-blood-pressure
│   │       └── src
│   └── templates
│       ├── mail-analysis
│       └── pdf-analysis
├── 3-permissions
│   └── schemas
├── 4-oauth-frontend
│   └── front-end
│       ├── dist
│       └── src
└── examples
    ├── permissions
    ├── workflow 1
    └── workflow 2
```

There are separate directories for each section of this tutorial. Next to that, there's an `examples` directory, which contains sample scripts to perform certain operations on the Extra Horizon backend. They will be used throughout the tutorial.

That's it! Now you're all set to begin the tutorial.
