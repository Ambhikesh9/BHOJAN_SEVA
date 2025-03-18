export interface FoodListing {
  id: string;
  foodType: string;
  quantity: string;
  servings: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  expiryTime: string;
  donorName: string;
  donorPhone: string;
  createdAt: string;
}

export interface Location {
  lat: number;
  lng: number;
}