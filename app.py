from dotenv import load_dotenv
import os
from services.cupra_service import CupraService
import asyncio

# Load environment variables
load_dotenv()

async def main():
    # Initialize Cupra service
    cupra_service = CupraService()
    
    # Login with credentials from environment variables
    success = await cupra_service.initialize(
        os.getenv('CUPRA_USERNAME'),
        os.getenv('CUPRA_PASSWORD')
    )
    
    if success:
        try:
            # Get vehicle data
            vehicles = await cupra_service.get_vehicle_data()
            
            # Process vehicle data
            for vehicle in vehicles:
                print(f"Vehicle ID: {vehicle.vin}")
                battery_status = await cupra_service.get_battery_status(vehicle.vin)
                print(f"Battery Level: {battery_status.level}%")
                
        finally:
            # Always close the connection
            await cupra_service.close()
    else:
        print("Failed to connect to Cupra services")

if __name__ == "__main__":
    asyncio.run(main()) 