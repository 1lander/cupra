import { useQuery } from "@tanstack/react-query";

import { useAuthToken } from "./session";

interface UserInfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  nickname: string;
  email: string;
  email_verified: boolean;
  birthdate: string;
  updated_at: number;
  picture: string;
}

async function fetchUserInfo(token?: string): Promise<UserInfo> {
  const response = await fetch("https://identity-userinfo.vwgroup.io/oidc/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return response.json();
}

export function useUserInfo() {
  const token = useAuthToken();

  return useQuery({
    queryKey: ["userInfo"],
    queryFn: () => fetchUserInfo(token?.access_token)
  });
}

// Helper function to get the access token
// TODO: Implement this based on your authentication setup
export async function getAccessToken(): Promise<string> {
  throw new Error("Not implemented");
}
