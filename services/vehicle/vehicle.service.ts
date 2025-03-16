import { useQuery } from "@tanstack/react-query";

import { getStoredTokenData } from "../session";

import { Vehicle } from "./vehicle.types";

async function fetchVehicle(token?: string, vin?: string): Promise<Vehicle> {
  const response = await fetch(`https://ola.prod.code.seat.cloud.vwgroup.com/vehicles/${vin}/connection`, {
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

export function useVehicle(vin: string) {
  return useQuery({
    queryKey: ["vehicle"],
    queryFn: async () => {
      const token = await getStoredTokenData();
      return fetchVehicle(token?.access_token, vin);
    }
  });
}
