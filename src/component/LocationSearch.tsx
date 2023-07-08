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
        
        <div className="input-group mb-3">
            
            <input className="me-auto form-control" placeholder="search locations" type="text" value={locationSearch} onChange={(e) => setLocationSearch(e.target.value)} aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <button className="btn btn-outline-primary" onClick={addLocation} disabled={disableSearch} >search</button>

        </div>
    )

}