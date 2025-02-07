import React, {  useState, useCallback } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
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
        <div className="custom-search-container mx-auto" >
            <span className="searchLabel">
        <span className="searchText">جست و جو در 🔍</span>
        <span className="searchCityLabel">تهران</span>
      </span>
            <input
                type="text"
                placeholder="...آدرس را وارد کنید"
                className="searchInput"
                style={{
                    padding: "8px",
                    marginLeft: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    width: "200px",
                    color: "black",
                }}
                value={searchValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default SearchControl;
