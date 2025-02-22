import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import { User } from "../types/user";

const CALLBACK_URL = "cupra://oauth-callback";
const AUTHORIZATION_URL = "https://identity.vwgroup.io/oidc/v1/authorize";
const ACCESS_TOKEN_URL = "https://identity.vwgroup.io/oidc/v1/token";
const CLIENT_ID = "3c756d46-f1ba-4d78-9f9a-cff0d5292d51@apps_vw-dilab_com";
const CLIENT_SECRET = "eb8814e641c81a2640ad62eeccec11c98effc9bccd4269ab7af338b50a94b3a2";

function getLoginUrl(): string {
  const redirectUri = Linking.createURL("login");
  const params = new URLSearchParams({
    callback_url: CALLBACK_URL,
    client_id: CLIENT_ID,
    access_token_url: ACCESS_TOKEN_URL,
    client_secret: CLIENT_SECRET,
    redirect_uri: redirectUri
  });
  return `${AUTHORIZATION_URL}?${params.toString()}`;
}

async function login(): Promise<void> {
  try {
    const result = await WebBrowser.openAuthSessionAsync(getLoginUrl(), Linking.createURL("login"));

    if (result.type === "success") {
      // Handle successful login
      // You might want to parse the URL for auth tokens here
    }
  } catch (error) {
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
  const queryClient = useQueryClient();

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
