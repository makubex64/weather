import React, { useState } from "react";

interface LocationSearchProps {

    onSearch: (search: string) => void,
}


export const LocationSearch: React.FC<LocationSearchProps> = ({ onSearch }) => {

    const [locationSearch, setLocationSearch] = useState<string>("")

    const disableSearch = locationSearch.trim() === "";
    const addLocation = () => {
        onSearch(locationSearch); 
        setLocationSearch("");
    }

    return (
        <div className="">
            <label >
                add locations <input className="ml-1 mr-1" type="text" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} />
            </label>
            <button className="btn btn-primary" onClick={addLocation} disabled={disableSearch} >search</button>
        </div>
    )

}