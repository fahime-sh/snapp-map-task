import React, { FC, MouseEvent } from "react";
import { ZoomControllerProps } from "@/components/zoomControler/ZoomController.type";
import { useMap } from "react-leaflet";

const ZoomController: FC<ZoomControllerProps> = ({ zoom, setZoom }) => {
    const map = useMap();

    const handleZoom = (zoomScale: number, e: MouseEvent) => {
        e.stopPropagation();
        const newZoom = zoom + (zoomScale === 1 ? 1 : -1);
        setZoom(newZoom);
        map.setZoom(newZoom);
    };

    return (
        <div className="zoomContainer absolute bottom-0 left-0 z-[999] rounded-full flex flex-col pt-2 mb-4 ml-4">
               <button className='bg-white px-4 py-2 text-gray-500 text-base' onClick={(e) => handleZoom(1, e)}>+</button>
               <button className='bg-white px-4 py-2 text-gray-500 text-base' onClick={(e) => handleZoom(-1, e)}>-</button>
           </div>
    );
};

export default ZoomController;