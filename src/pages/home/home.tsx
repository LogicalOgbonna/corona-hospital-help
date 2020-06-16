import React, { useState, useEffect } from 'react';

import Search from "../../components/search/search";
import SearchResult from "../../components/display-search-result/display-search-result"
import { getLocation, getSearchResult } from '../../utils';
import { db } from '../../firebase';


interface HomeProps {
    lat: string;
    lng: string;
    coords: any;
}
function Home({ lat, lng, coords }: HomeProps) {

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
        getSearchResult(lat, lng, radius, searchBy).then((res: any) => {
            setRadius("")
            console.log(res)
            setResult(res);
            setLoading(false);
            db.collection("search").add({ ...res })
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
