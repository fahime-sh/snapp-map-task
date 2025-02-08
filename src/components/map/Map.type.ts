import React from "react";
import Leaflet from "leaflet";
import * as ReactLeaflet from "react-leaflet";

export type MapProps = {
    defaultCenter?: [number, number];
    location?: [number, number];
    children?: (reactLeaflet: typeof ReactLeaflet, leaflet: typeof Leaflet) => React.ReactNode;
    width?: number;
    height?: number;
};


