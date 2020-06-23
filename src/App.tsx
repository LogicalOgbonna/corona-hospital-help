import { Result, Spin, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { geolocated } from "react-geolocated";
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom";
import './App.css';
import { Footer, Header } from "./components";
import { auth, createUserProfileDocument } from './firebase';
import { HomePage, RecentSearch } from "./pages";
import Auth from './pages/auth/auth';
import { GuestRoute, ProtectedRoute } from './routes/Protect';

function App(props: any) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth: any) => {
      if (!userAuth) return setCurrentUser(null);
      const userRef: any = await createUserProfileDocument(userAuth, {});
      userRef.onSnapshot((snapShot: any) => {
        setCurrentUser({ ...snapShot.data(), id: snapShot.id });
      })
    })
    return () => {
    }
  }, []);
  if (!props.isGeolocationAvailable) return <GeoLocationNotEnabled enabled={false} title="Your browser does not support Geolocation" subtitle="Please Switch or Upgrade Your Browser" />
  if (!props.isGeolocationEnabled) return <GeoLocationNotEnabled enabled={true} title="Geolocation is not ENABLED" subtitle="Please Enable Geolocation" />
  if (!props.coords) return <Loading />
  return (
    <Router>
      <Header user={currentUser} />
      <Switch>
        <ProtectedRoute exact={true} path="/" user={currentUser} component={HomePage} coords={props.coords} />
        <ProtectedRoute user={currentUser} coords={props.coords} path="/search-results" exact={false} component={RecentSearch} />
        <GuestRoute user={currentUser} path="/signin" exact={true} component={Auth} />
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
  enabled: boolean
}
const GeoLocationNotEnabled = ({ title, subtitle, enabled }: GeoLocationNotEnabledProps) => <Row style={{ marginTop: "10%" }} className="justify-content-center mt-5">
  <Col md="8" className="mt-5">
    <Result
      status="500"
      title={title}
      subTitle={
        <Row className="justify-content-center">
          <Col md="4" className="">
            <p className="text-center">{subtitle}</p>
            {enabled && <>
              <p className="text-center">If Location is ON, please Refresh</p>
              <Button onClick={() => window.location.reload()}>Refresh</Button>
            </>}
          </Col>
        </Row>}
    />
  </Col>
</Row>
