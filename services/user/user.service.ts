import { useQuery } from "@tanstack/react-query";

import { getStoredTokenData } from "../session";

import { User } from "./user.types";

async function fetchUser(token?: string): Promise<User> {
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

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = await getStoredTokenData();
      return fetchUser(token?.access_token);
    }
  });
}
