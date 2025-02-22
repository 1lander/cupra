import { useQuery } from "@tanstack/react-query";

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

const USERINFO_ENDPOINT = "https://identity-userinfo.vwgroup.io/oidc/userinfo";

async function fetchUserInfo(): Promise<UserInfo> {
  const response = await fetch(USERINFO_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.EXPO_PUBLIC_BEARER_TOKEN}`,
      Accept: "application/json"
    }
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user info");
  }

  return response.json();
}

export function useUserInfo() {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo
  });
}

// Helper function to get the access token
// TODO: Implement this based on your authentication setup
export async function getAccessToken(): Promise<string> {
  throw new Error("Not implemented");
}
