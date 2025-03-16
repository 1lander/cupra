import { useQuery } from "@tanstack/react-query";

import { useSession } from "@/context/session";

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
  const { session } = useSession();

  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      if (!session) {
        throw new Error("No session found");
      }
      return fetchUser(session);
    }
  });
}
