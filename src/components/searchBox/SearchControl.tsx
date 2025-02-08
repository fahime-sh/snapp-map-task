import React, {  useState, useCallback } from "react";
import L from "leaflet";
import { useMap } from "react-leaflet";
import {SearchControlProps} from "@/components/searchBox/SearchBox.type";



const SearchControl: React.FC<SearchControlProps> = ({ setPosition }) => {
    const map = useMap();
    const [searchValue, setSearchValue] = useState<string>("");
    const [marker, setMarker] = useState<L.Marker | null>(null);

    const searchLocation = useCallback(async (query: string) => {
        if (!query.trim()) return;
        try {
            const response = await fetch(`/search/search-address?address=${query}`);
            const data = await response.json();

            if (data && data.lat && data.lng) {
                const { lat, lng } = data;
                setPosition([lat, lng]);
                map.setView([lat, lng], 13);
                if (marker) {
                    marker.setLatLng([lat, lng]);
                } else {
                    const newMarker = L.marker([lat, lng]).addTo(map);
                    setMarker(newMarker);
                }
            } else {
                console.error("Invalid response from API:", data);
            }
        } catch (error) {
            console.error("Error fetching search location:", error);
        }
    }, [map, marker, setPosition]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            searchLocation(searchValue);
        }
    };

    return (
        <div className="absolute flex items-center bg-white rounded-md p-1 shadow-md z-[999] mt-2 flex-row-reverse custom-search-container  mx-auto" >
            <span className="text-sm font-bold px-2.5 py-1  rounded-lg mb-1.5 flex flex-row-reverse text-center w-max gap-1.5">
        <span className="text-custom-black">جست و جو در 🔍</span>
        <span className="text-indigo-600">تهران</span>
      </span>
            <input
                type="text"
                placeholder="...آدرس را وارد کنید"
                className="border-0 outline-none px-3 py-2 text-sm w-[20rem] rounded-md text-right text-custom-black"
                value={searchValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default SearchControl;
