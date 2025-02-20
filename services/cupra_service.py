from weconnect_cupra import WeConnect
import asyncio

class CupraService:
    def __init__(self):
        self.weconnect = None
        
    async def initialize(self, username, password):
        try:
            self.weconnect = WeConnect(username, password)
            await self.weconnect.login()
            return True
        except Exception as e:
            print(f"Failed to initialize Cupra connection: {str(e)}")
            return False
            
    async def get_vehicle_data(self):
        if not self.weconnect:
            raise Exception("WeConnect not initialized")
            
        vehicles = await self.weconnect.get_vehicles()
        return vehicles
        
    async def get_battery_status(self, vehicle_id):
        if not self.weconnect:
            raise Exception("WeConnect not initialized")
            
        vehicle = await self.weconnect.get_vehicle(vehicle_id)
        return vehicle.battery_status
        
    async def close(self):
        if self.weconnect:
            await self.weconnect.disconnect() 