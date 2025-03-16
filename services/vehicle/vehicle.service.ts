import { useQuery } from "@tanstack/react-query";

import { useSession } from "@/context/session";

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
  const { session } = useSession();

  return useQuery({
    queryKey: ["vehicle"],
    queryFn: async () => {
      if (!session) {
        throw new Error("No session found");
      }
      return fetchVehicle(session, vin);
    }
  });
}
