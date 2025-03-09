import { useQuery } from "@tanstack/react-query";

import { getStoredTokenData } from "./session";

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
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      const token = await getStoredTokenData();
      return fetchUserInfo(token?.access_token);
    }
  });
}
