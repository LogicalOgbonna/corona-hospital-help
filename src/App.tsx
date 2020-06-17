import { Result, Spin } from 'antd';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { geolocated } from "react-geolocated";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import { Footer, Header } from "./components";
import { HomePage, RecentSearch } from "./pages";

function App(props: any) {

  if (!props.isGeolocationAvailable) return <GeoLocationNotEnabled title="Your browser does not support Geolocation" subtitle="Please Switch or Upgrade Your Browser" />
  if (!props.isGeolocationEnabled) return <GeoLocationNotEnabled title="Geolocation is not ENABLED" subtitle="Please Enable Geolocation" />
  if (!props.coords) return <Loading />
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <HomePage coords={props.coords} lat={props.coords.latitude} lng={props.coords.longitude} />
        </Route>
        <Route path="/search-results">
          <RecentSearch />
        </Route>
      </Switch>
      <Footer
        lat={props.coords.latitude}
        lng={props.coords.longitude}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `50%` }} />}
        containerElement={<div style={{ height: `350px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </Router>
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
      subTitle={
        <Row className="justify-content-center">
          <Col md="2" className="">
            <Spin className="ml-3" size="small" />
            <p>{subtitle}...</p>
          </Col>
        </Row>}
    />
  </Col>
</Row>
