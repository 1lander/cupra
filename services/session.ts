import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as WebBrowser from "expo-web-browser";

import { User } from "../types/user";

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

async function login(): Promise<void> {
  try {
    const result = await WebBrowser.openAuthSessionAsync(
      getLoginUrl(),
      CALLBACK_URL // Use the same callback URL here
    );

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

      const tokenData = await tokenResponse.json();
      // Store the token data securely here
    }
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

// React hooks for using the session service
export function useLogin() {
  return useMutation({
    mutationFn: login
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Clear the user info from the cache
      queryClient.removeQueries({ queryKey: ["userInfo"] });
      // You might want to remove the token from secure storage here
    }
  });
}

export function useAuthStatus() {
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData<User>(["userInfo"]);
  return {
    isAuthenticated: !!user,
    user
  };
}

export const sessionService = {
  login,
  logout
};
