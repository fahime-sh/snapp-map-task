import React, { FC, useMemo, useRef, useState } from 'react';
import L from "leaflet";
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import {IGetAddress} from "@/utils/constant.type";
import {importantLocations} from "@/utils/costant";
import { MapProps } from "@/components/map/Map.type";
import ClickHandler from "@/utils/Clickhandler";
import {initLeafletIcons} from "@/utils/initLeaflet";
import SearchControl from "@/components/searchBox/SearchControl";
import ZoomController from "@/components/zoomControler/ZoomController";
import { MapContainer, Marker, Popup, ScaleControl, TileLayer } from "react-leaflet";


const Map: FC<MapProps> = ({ width , height , location, defaultCenter }) => {
    const markerRef = useRef<L.Marker | null>(null);
    const [position, setPosition] = useState<[number, number]>(defaultCenter || [35.6892, 51.3890]);    const [selectedLocation, setSelectedLocation] = useState<IGetAddress | null>(null);
    const [zoom, setZoom] = useState<number>(() => 15);

    const handleDetectLocation = async (lat: number, lng: number) => {
        setSelectedLocation(null);
        try {
            const response = await fetch(`/search/get-address?lat=${lat}&lng=${lng}`);
            const data = await response.json();
            if (!Array.isArray(data) || data.length === 0) {
                console.warn(" موقعیتی یافت نشد.");
                setSelectedLocation(null);
                return;
            }
            const location = data[0];
            if (!location || !location.lat || !location.lng || !location.street || !location.city) {
                console.warn(" داده نامعتبر دریافت شد:", location);
                return;
            }
            setSelectedLocation(location);
            console.log(" آدرس دریافت شده:", location.lat, location.lng, location.street, location.city);
        } catch (error) {
            console.error(" خطا در دریافت آدرس:", error);
        }
    };

    const mapEventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            if (marker) {
                const newPos = marker.getLatLng();
                setPosition([newPos.lat, newPos.lng]);
                console.log("موقعیت جدید:", newPos.lat, newPos.lng);
            }
        }
    }), []);

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            import('../../api/mock/client').then(({ worker }) => {
                worker.start();
            });
        }
    }, []);

    useEffect(() => {
        initLeafletIcons();
    }, []);

    return (
        <div>
            <MapContainer
                id='snapp-shop'
                center={position}
                zoom={zoom}
                zoomControl={false}
                style={{ width: `${width}px`, height: `${height}px` }}
            >
                <SearchControl setPosition={setPosition} position={position}/>
                <ClickHandler setPosition={setPosition} handleDetectLocation={handleDetectLocation} />

                {/*<ZoomControl position="bottomleft" />*/}
                <ZoomController zoom={zoom} setZoom={setZoom}/>
                <ScaleControl position="bottomright" />
                <TileLayer
                    url="https://raster.snappmaps.ir/styles/snapp-style/{z}/{x}/{y}{r}.png"
                />
                <Marker
                    draggable
                    eventHandlers={mapEventHandlers}
                    position={position}
                    ref={markerRef}
                    icon={L.icon({
                        iconUrl: "/images/currentPointer.png",
                        iconSize: [30, 30],
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
                            eventHandlers={mapEventHandlers}
                                 position={[location.lat , location.lng]}
                                 ref={markerRef}
                                 icon={L.icon({
                                     iconUrl: location.icon,
                                     iconSize: [20, 30],
                                 })}>
                            <Popup>
                                <strong>مختصات:</strong><br />
                                <span>
                            {location?.name}
                        </span>
                            </Popup>
                        </Marker>

                    )):null}
            </MapContainer>
        </div>
    );
};

export default Map;