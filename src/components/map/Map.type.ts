import Leaflet, {LatLngLiteral} from "leaflet";
import * as ReactLeaflet from "react-leaflet";
import React from "react";

export type MapLocation = LatLngLiteral & { id: string };
export type MapProps = {
    center?: [number, number];
    location?: [number, number];
    children?: (reactLeaflet: typeof ReactLeaflet, leaflet: typeof Leaflet) => React.ReactNode;
    width?: number;
    height?: number;
};

type City = string
type Street = string
export interface IGetAddressResponse {
    address: [City, Street]
}

export interface ISearchAddressResponse {
    lat: number;
    lng: number;
}
