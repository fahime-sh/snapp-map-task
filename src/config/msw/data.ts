type City = string;
type Street = string;
type Lat = number;
type Lng = number;

export interface IGetAddressResponse {
    city: City;
    street: Street;
    lat: Lat;
    lng: Lng;
}


export const data: IGetAddressResponse[] = [
    { city: 'تهران', street: 'مترو شادمان', lat: 35.70094092670511, lng: 51.364860534667976 },
];