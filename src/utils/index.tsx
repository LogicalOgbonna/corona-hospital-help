import axios from 'axios';

export const getCompoundCode = (code: Array<string>) => {
    let string: string = "";
    for (let i = 1; i < code.length; i++) {
        string += ` ${code[i]}`;
    }
    return string;
}

export const getLocation = (lat: string, lng: string) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    return new Promise((resolve, reject) =>
        axios.get(url).then(res => resolve(getCompoundCode(res.data.plus_code.compound_code.split(" ")))).catch(err => reject(err.response))
    )
}

export const getSearchResult = (lat: string, lng: string, radius: string, searchBy: string) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${searchBy}&keyword=${searchBy}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
    return new Promise((resolve, reject) =>
        axios.get(proxyurl + url).then(res => resolve(res.data.results)).catch(err => reject(err.response))
    )
}