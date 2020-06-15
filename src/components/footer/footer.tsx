import React from 'react'
import "./footer.css"
import { Row, Col } from 'react-bootstrap';
const { compose } = require("recompose");
const {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} = require("react-google-maps");
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");

interface MapWithAMarkerWithLabelProps {
    lat: number;
    lng: number;
}
const MapWithAMarkerWithLabel = compose(
    withScriptjs,
    withGoogleMap
)(({ lat, lng }: MapWithAMarkerWithLabelProps) =>
    <Row className="footer justify-content-center">
        <Col md="8">

            {<GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: lat, lng: lng }}
            >
                <MarkerWithLabel
                    position={{ lat: lat, lng: lng }}
                    // labelAnchor={new google.maps.Point(0, 0)}
                    labelStyle={{ backgroundColor: "yellow", fontSize: "32px", padding: "16px" }}
                >
                    <div>Hello There!</div>
                </MarkerWithLabel>
            </GoogleMap>}

        </Col>
    </Row>
);

export default MapWithAMarkerWithLabel;