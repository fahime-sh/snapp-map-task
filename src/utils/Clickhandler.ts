import { FC } from "react";
import { useMapEvents } from "react-leaflet";

type ClockHandlerInputs = {
    setPosition: (position: [number, number]) => void;
    handleDetectLocation: (lat: number, lng: number) => Promise<void>;
};

const ClickHandler: FC<ClockHandlerInputs> = ({ setPosition, handleDetectLocation }) => {
    useMapEvents({
        click: async (e) => {
            console.log("نقطه انتخاب شده:", e.latlng.lat, e.latlng.lng);
            setPosition([e.latlng.lat, e.latlng.lng]);
            await handleDetectLocation(e.latlng.lat, e.latlng.lng);
        },
    });

    return null;
};

export default ClickHandler;