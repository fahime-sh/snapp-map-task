
type lat = number;
type lng=number;
type City = string;
type Street = string;

export type Location = {
    name: string;
    lat: number;
    lng: number;
    icon: string;
};

export type LocationsData = Location[];


export interface IGetAddress {
    city: City;
    street: Street;
    lat: lat;
    lng: lng;
}
