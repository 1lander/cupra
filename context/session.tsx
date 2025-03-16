import { openAuthSessionAsync, coolDownAsync } from "expo-web-browser";
import { useContext, createContext, type PropsWithChildren } from "react";

import { useStorageState } from "@/hooks/useStorageState";

const CALLBACK_URL = "cupra://oauth-callback";
const AUTHORIZATION_URL = "https://identity.vwgroup.io/oidc/v1/authorize";
const ACCESS_TOKEN_URL = "https://identity.vwgroup.io/oidc/v1/token";
const CLIENT_ID = "3c756d46-f1ba-4d78-9f9a-cff0d5292d51@apps_vw-dilab_com";
const CLIENT_SECRET = "eb8814e641c81a2640ad62eeccec11c98effc9bccd4269ab7af338b50a94b3a2";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          try {
            const params = new URLSearchParams({
              response_type: "code",
              client_id: CLIENT_ID,
              redirect_uri: CALLBACK_URL,
              scope: "openid profile nickname birthdate phone cars badge dealers"
            });

            const loginUrl = `${AUTHORIZATION_URL}?${params.toString()}`;
            const result = await openAuthSessionAsync(loginUrl, CALLBACK_URL);

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
              setSession(tokenData.access_token);
            }
          } catch (error) {
            console.error("Login error:", error);
          }
        },
        signOut: async () => {
          const result = await coolDownAsync();
          console.log("coolDownAsync", result);
          setSession(null);
        },
        session,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
