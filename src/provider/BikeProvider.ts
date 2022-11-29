import { StatuBike } from "../models/Bike";

class BikeProvider {
  bikeValidation(role: string) {
    switch (role) {
      case "active":
        return StatuBike.ACTIVE;
      case "disable":
        return StatuBike.DISABLE;
      case "upkeep":
        return StatuBike.UPKEEP;
      default:
        return false;
    }
  }
}

export { BikeProvider };
