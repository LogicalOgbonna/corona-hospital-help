import React, { useState, useEffect } from 'react';

import Search from "../../components/search/search";
import SearchResult from "../../components/display-search-result/display-search-result"
import { getLocation, getSearchResult } from '../../utils';
import { createSearchHistory } from '../../firebase';
import { v4 as uuid } from 'uuid';


interface HomeProps {
    lat: string;
    lng: string;
    coords: any;
    user: any
}
function Home({ lat, lng, coords, user }: HomeProps) {

    const [location, setLocation] = useState("");
    const [radius, setRadius] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState([]);
    const [searchBy, setSearchBy] = useState("Hospitals");


    useEffect(() => {
        if (coords) {
            getLocation(lat, lng).then((value: any) => {
                setLocation(value)
            }).catch(err => {
                console.log(err)
            });
        }
    }, [coords, lat, lng]);

    const getHospital = () => {
        setLoading(true)
        getSearchResult(lat, lng, radius, searchBy).then(async (res: any) => {
            const searchResult = res.map((search: any) => ({
                icon: search.icon,
                id: search.id,
                rating: search.rating,
                name: search.name,
                business_status: search.business_status,
                vicinity: search.vicinity,
                opening_hours: search.opening_hours,
            }))
            if (res.length) {
                const value = {
                    searchBy: searchBy,
                    radius: radius,
                    time: new Date(),
                    data: searchResult,
                    location,
                    id: uuid()
                }
                createSearchHistory(user, value)
            }
            setRadius("")
            setResult(searchResult);
            setLoading(false);
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <>
            <Search onSearchByChange={(e: any) => setSearchBy(e)} location={location} value={radius} onSearchChange={(e: any) => setRadius(e.target.value)} onClickSearch={getHospital} />
            <SearchResult loading={loading} result={result} />
        </>
    )
}

export default Home
