import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as WebBrowser from "expo-web-browser";

const CALLBACK_URL = "cupra://oauth-callback";
const AUTHORIZATION_URL = "https://identity.vwgroup.io/oidc/v1/authorize";
const ACCESS_TOKEN_URL = "https://identity.vwgroup.io/oidc/v1/token";
const CLIENT_ID = "3c756d46-f1ba-4d78-9f9a-cff0d5292d51@apps_vw-dilab_com";
const CLIENT_SECRET = "eb8814e641c81a2640ad62eeccec11c98effc9bccd4269ab7af338b50a94b3a2";

function getLoginUrl(): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: CALLBACK_URL,
    scope: "openid profile nickname birthdate phone cars badge dealers"
  });
  return `${AUTHORIZATION_URL}?${params.toString()}`;
}

interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

async function login(): Promise<TokenData> {
  try {
    const loginUrl = getLoginUrl();
    const result = await WebBrowser.openAuthSessionAsync(loginUrl, CALLBACK_URL);

    if (result.type === "success" && result.url) {
      // Parse the authorization code from the URL
      const url = new URL(result.url);
      const code = url.searchParams.get("code");

      if (!code) {
        throw new Error("No authorization code received");
      }

      // Exchange the code for an access token
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

      return await tokenResponse.json();
    }
    throw new Error("Login failed");
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed");
  }
}

async function logout(): Promise<void> {
  const response = await fetch(`${AUTHORIZATION_URL}/auth/logout`, {
    method: "POST"
  });

  if (!response.ok) {
    throw new Error("Logout failed");
  }
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: (tokenData) => {
      queryClient.setQueryData(["token_data"], tokenData);

      if (tokenData.expires_in) {
        const refreshTime = (tokenData.expires_in - 300) * 1000;
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ["token_data"] });
        }, refreshTime);
      }
    }
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["userInfo"] });
      queryClient.removeQueries({ queryKey: ["token_data"] });
    }
  });
}

export function useAuthToken() {
  const queryClient = useQueryClient();
  const tokenData = queryClient.getQueryData<TokenData>(["token_data"]);

  return tokenData;
}

export const sessionService = {
  login,
  logout
};
