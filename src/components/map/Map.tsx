import React, { FC, useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import Leaflet, { icon, LatLngLiteral } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import { MapContainer, Marker, Popup, ScaleControl, TileLayer, useMapEvents, ZoomControl } from "react-leaflet";
import { MapProps } from "@/components/map/Map.type";
import SearchControl from "@/components/searchBox/SearchControl";
import {importantLocations} from "@/utils/costant";
import {data, IGetAddressResponse} from "../../config/msw/data";
const DEFAULT_CENTER: [number, number] = [35.6892, 51.3890];
const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const Map: FC<MapProps> = ({ width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT, location, center }) => {
    const markerRef = useRef<L.Marker | null>(null);
    const [position, setPosition] = useState<[number, number]>(DEFAULT_CENTER);
    const [ selectedLocation , setSelectedLocation]=useState<IGetAddressResponse>()

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            import('../../config/msw/client').then(({ worker }) => {
                worker.start();
            });
        }
    }, []);

    const handleDataLatLng = async (lat:number , lng:number) => {
        try {
            const response = await fetch(`/search/get-address?lat=${lat}&lng=${lng}`);
            const data = await response.json();
            setSelectedLocation(data[0])

            console.log("آدرس دریافت شده:", data[0].lat ,data[0].lng , data[0].street , data[0].city);
        } catch (error) {
            console.error("خطا در دریافت آدرس:", error);
        }
    };

    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker) {
                const newPos = marker.getLatLng();
                setPosition([newPos.lat, newPos.lng]);
                console.log("موقعیت جدید:", newPos.lat, newPos.lng);
            }
        }
    }), []);

    const ClickHandler = () => {
        useMapEvents({
            click: async (e) => {
                console.log(e.latlng)
                setPosition([e.latlng.lat, e.latlng.lng]);
                console.log("نقطه انتخاب شده:", e.latlng.lat, e.latlng.lng);
                await handleDataLatLng(e.latlng.lat , e.latlng.lng);
            },
        });
        return null;
    };

    useEffect(() => {
        (async function init() {
            delete (Leaflet.Icon.Default.prototype as any)._getIconUrl;
            Leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: 'leaflet/images/marker-icon-2x.png',
                iconUrl: 'leaflet/images/marker-icon.png',
                shadowUrl: 'leaflet/images/marker-shadow.png',
            });
        })();
    }, []);

    return (
        <div>
            <MapContainer
                id='snapp-shop'
                center={position}
                zoom={16}
                zoomControl={false}
                style={{ width: `${width}px`, height: `${height}px` }}
            >
                <SearchControl setPosition={setPosition} position={position}/> {/* پاس دادن setPosition به SearchControl */}
                <ClickHandler />
                <ZoomControl position="bottomleft" />
                <ScaleControl position="bottomright" />
                <TileLayer
                    url="https://raster.snappmaps.ir/styles/snapp-style/{z}/{x}/{y}{r}.png"
                />
                <Marker
                    draggable
                    eventHandlers={eventHandlers}
                    position={position}
                    ref={markerRef}
                    icon={L.icon({
                        iconUrl: "/images/currentPointer.png",
                        iconSize: [20, 30],
                    })}
                >
                    <Popup>
                        <strong>مختصات:</strong><br />
                        <span>
                            {selectedLocation ? `${selectedLocation?.city}----${selectedLocation?.street}`:`${position[0]}--${position[1]}`}
                        </span>
                    </Popup>
                </Marker>
                    {importantLocations?importantLocations.map((location , index)=>(
                        <Marker
                            key={index}
                            eventHandlers={eventHandlers}
                                 position={[location.lat , location.lng]}
                                 ref={markerRef}
                                 icon={L.icon({
                                     iconUrl: location.icon,
                                     iconSize: [20, 30],
                                 })}/>
                    )):null}
            </MapContainer>
        </div>
    );
};

export default Map;