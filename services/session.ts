import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";

const CALLBACK_URL = "cupra://oauth-callback";
const AUTHORIZATION_URL = "https://identity.vwgroup.io/oidc/v1/authorize";
const ACCESS_TOKEN_URL = "https://identity.vwgroup.io/oidc/v1/token";
const CLIENT_ID = "3c756d46-f1ba-4d78-9f9a-cff0d5292d51@apps_vw-dilab_com";
const CLIENT_SECRET = "eb8814e641c81a2640ad62eeccec11c98effc9bccd4269ab7af338b50a94b3a2";

const TOKEN_STORAGE_KEY = "auth_token_data";

export interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export async function getStoredTokenData(): Promise<TokenData | null> {
  const storedData = await SecureStore.getItemAsync(TOKEN_STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : null;
}

export async function login(): Promise<void> {
  try {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: CALLBACK_URL,
      scope: "openid profile nickname birthdate phone cars badge dealers"
    });

    const loginUrl = `${AUTHORIZATION_URL}?${params.toString()}`;
    const result = await WebBrowser.openAuthSessionAsync(loginUrl, CALLBACK_URL);

    if (result.type === "success" && result.url) {
      const url = new URL(result.url);
      const code = url.searchParams.get("code");

      if (!code) {
        throw new Error("No authorization code received");
      }

      const tokenResponse = await fetch(ACCESS_TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: CALLBACK_URL,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET
        }).toString()
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to get access token");
      }

      const tokenData = await tokenResponse.json();
      await SecureStore.setItemAsync(TOKEN_STORAGE_KEY, JSON.stringify(tokenData));
    }
  } catch (error) {
    console.error("Login error:", error);
  }
}

export async function logout(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error("Logout error:", error);
  }
}
