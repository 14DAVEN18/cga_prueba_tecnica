import { Coordinates } from "./coordinates";

export interface Seller {
    id: string;
    name: string;
    category: string;
    address: string;
    isActive: boolean;
    coordinates: Coordinates;
    photo: string;
    vehicle: string;
}