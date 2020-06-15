import React, { useEffect, useState } from 'react';
import './App.css';
import { geolocated } from "react-geolocated";
import Axios from "axios"
import Header from './components/header/header';
import Search from './components/search/search';
import SearchResult from './components/display-search-result/display-search-result';
import Footer from "./components/footer/footer"
import { Row, Col } from 'react-bootstrap';
import { Spin, Result } from 'antd';

function App(props: any) {
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  const getCompoundCode = (code: Array<string>) => {
    let string: string = "";
    for (let i = 1; i < code.length; i++) {
      string += ` ${code[i]}`;
    }
    return string;
  }
  useEffect(() => {
    if (props.coords) {
      Axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.coords.latitude},${props.coords.longitude}&sensor=true&key=${process.env.REACT_APP_GOOGLE_API_KEY}`).then(data => {
        setLocation(getCompoundCode(data.data.plus_code.compound_code.split(" ")));
      }).catch(err => {
        console.log(err)
      })
    }
  }, [props.coords]);

  const getHospital = () => {
    setLoading(true)
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${props.coords.latitude},${props.coords.longitude}&radius=${radius}&type=hospital&keyword=hospital&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    Axios.get(proxyurl + url).then(res => {
      setRadius("")
      setResult(res.data.results);
      setLoading(false);
    }).catch(err => {
      console.log(err)
    })
  }
  if (!props.isGeolocationAvailable) return <GeoLocationNotEnabled title="Your browser does not support Geolocation" subtitle="Please Switch or Upgrade Your Browser" />
  if (!props.isGeolocationEnabled) return <GeoLocationNotEnabled title="Geolocation is not ENABLED" subtitle="Please Enable Geolocation" />
  if (!props.coords) return <Loading />
  return (
    <div test-id="hey" className="App">
      <Header />
      <Search location={location} value={radius} onSearchChange={(e: any) => setRadius(e.target.value)} onClickSearch={getHospital} />
      <SearchResult loading={loading} result={result} />
      <Footer
        lat={props.coords.latitude}
        lng={props.coords.longitude}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `50%` }} />}
        containerElement={<div style={{ height: `350px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
  geolocationProvider: navigator.geolocation,
})(App);

const Loading = () => <Row style={{ marginTop: "10%" }} className="justify-content-center">
  <Col md="1" className="">
    <Spin className="ml-3" size="large" />
    <p>Loading...</p>
  </Col>
</Row>

interface GeoLocationNotEnabledProps {
  title: string;
  subtitle: string;
}
const GeoLocationNotEnabled = ({ title, subtitle }: GeoLocationNotEnabledProps) => <Row style={{ marginTop: "10%" }} className="justify-content-center mt-5">
  <Col md="8" className="mt-5">
    <Result
      status="500"
      title={title}
      subTitle={subtitle}
    />
  </Col>
</Row>
