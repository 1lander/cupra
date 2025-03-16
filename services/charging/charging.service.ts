import { useQuery } from "@tanstack/react-query";

import { baseUrl } from "@/constants/Services";
import { useSession } from "@/context/session";

import { ChargingSettings } from "./charging.types";

async function fetchChargingSettings(token?: string, vin?: string): Promise<ChargingSettings> {
  const response = await fetch(`${baseUrl}/vehicles/${vin}/charging/settings`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    }
  });
  if (!response.ok) {
    throw new Error("Failed to connect vehicle");
  }

  return response.json();
}

export function useCharging(vin: string) {
  const { session } = useSession();

  return useQuery({
    queryKey: ["charging-settings"],
    queryFn: async () => {
      if (!session) {
        throw new Error("No session found");
      }
      return fetchChargingSettings(session, vin);
    }
  });
}
