---
description: Simple example on how to interact with the Extrahorizon API using python
---

# API interaction (Python)

The Extra horizon SDK currently does not support Python, but fear not: it's perfectly possible to interact with the platform through our API!

At [https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs](https://docs.extrahorizon.com/extrahorizon/api-reference/api-specs) you'll find the complete API documentation.

Have a look at the following example which simply prints your user information. Then we'll go over it step by step.

<pre class="language-python" data-line-numbers><code class="lang-python"><strong>from requests_oauthlib import OAuth1Session
</strong>import os

def handler(event, context):
    exhConsumerKey = os.environ['API_OAUTH_CONSUMER_KEY']
    exhConsumerSecret = os.environ['API_OAUTH_CONSUMER_SECRET']
    exhAccessToken = os.environ['API_OAUTH_TOKEN']
    exhTokenSecret = os.environ['API_OAUTH_TOKEN_SECRET']

    oauth = OAuth1Session(client_key=exhConsumerKey,
                          client_secret=exhConsumerSecret,
                          resource_owner_key=exhAccessToken,
                          resource_owner_secret=exhTokenSecret)

    result = oauth.get('https://&#x3C;your.extrahorizon.url>/users/v1/me')
    
    print(result.content)
</code></pre>

There are 2 methods of make authenticated calls: OAUTH1 & OAUTH2. The easiest way for a task to interact with the API is through the use of OAUTH1 tokens. These tokens can be generated offline and do not expire unless you regenerate them. This saves you from having to refresh & store tokens, which is the case with OAUTH2.

#### Getting credentials

```python
    exhConsumerKey = os.environ['API_OAUTH_CONSUMER_KEY']
    exhConsumerSecret = os.environ['API_OAUTH_CONSUMER_SECRET']
    exhAccessToken = os.environ['API_OAUTH_TOKEN']
    exhTokenSecret = os.environ['API_OAUTH_TOKEN_SECRET']
```

There are 4 different credentials passed to the task through environment variables. Of these, consumer key & consumer secret are system-wide credentials identifying the OAUTH1 application. These are usually communicated by Extra horizon after commissioning.

The token & token secret are personal tokens which you need to generate. This is fairly straightforward using the [Extra horizon Control Center](https://app.extrahorizon.com/auth/applications):&#x20;

* Navigate to the **Authentication** section
* On the **OAuth Applications** page, select or create the oAuth1 application you want to use
* Create or find the version you want to use and click on **Generate**
* You are prompted to fill in your email and password are then able to click **Generate**
* The credentials will be received as a **credentials.txt** file&#x20;

#### Setting up an OAUTH1 session

```python
    oauth = OAuth1Session(client_key=exhConsumerKey,
                          client_secret=exhConsumerSecret,
                          resource_owner_key=exhAccessToken,
                          resource_owner_secret=exhTokenSecret)
```

Here we're using the `requests_oauthlib` python library to create an oauth session for us. See also [here](https://requests-oauthlib.readthedocs.io/en/latest/oauth1\_workflow.html) for more information regarding the OAUTH1 workflow.

#### Executing an API call

And then finally we can do our API call & print the result. Again, replace the host with the actual url of your Extra horizon installation.

```python
    result = oauth.get('https://<your.extrahorizon.url>/users/v1/me')
    
    print(result.content)
```

That's it, now you're ready to :rocket:!
