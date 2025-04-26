# Getting a Spotify Refresh Token Manually

Since Spotify requires HTTPS redirect URIs, let's use an alternative approach to get your refresh token.

## Method 1: Using the Spotify OAuth Flow Tool

1. Visit [https://developer.spotify.com/documentation/web-api/tutorials/code-flow](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)

2. Scroll down to find the "Get the user's authorization" section

3. Click on the button that says "Try it" or "Use our OAuth flow tool"

4. Enter your client ID and client secret from your Spotify Developer Dashboard

5. For scopes, add these (separated by spaces):

   ```
   user-read-currently-playing user-read-recently-played
   ```

6. Complete the authorization flow and you'll get a refresh token at the end

## Method 2: Using the Spotify OAuth Tool by bih

1. Go to [https://spotify-refresh-token-generator.netlify.app/](https://spotify-refresh-token-generator.netlify.app/)

2. Enter your Client ID and Client Secret from your Spotify Developer Dashboard

3. Select the scopes:

   - user-read-currently-playing
   - user-read-recently-played

4. Click "Generate Token"

5. Follow the authorization flow

6. Copy your refresh token when it appears

## Method 3: Using the Spotify API Console

1. Go to [https://developer.spotify.com/console/](https://developer.spotify.com/console/)

2. Select any GET endpoint (for example, "Get Currently Playing Track")

3. Click "Get Token"

4. Check the required scopes:

   - user-read-currently-playing
   - user-read-recently-played

5. Click "Request Token"

6. Go through the authentication flow

7. Copy the OAuth Token

8. Use this access token to make a request for a refresh token using a tool like Postman or curl

## After Getting Your Refresh Token

Add your refresh token to your .env file:

```
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

This token is long-lived but not permanent. If your app stops working after a few months, you might need to generate a new refresh token.
