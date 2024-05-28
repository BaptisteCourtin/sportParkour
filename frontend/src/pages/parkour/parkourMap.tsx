import React from "react";

import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

import PoiMarkers from "@/components/parkour/poiMarkers";

type Poi = { key: string; location: google.maps.LatLngLiteral };
const locations: Poi[] = [
  { key: "operaHouse", location: { lat: -33.8567844, lng: 151.213108 } },
  { key: "tarongaZoo", location: { lat: -33.8472767, lng: 151.2188164 } },
  { key: "manlyBeach", location: { lat: -33.8209738, lng: 151.2563253 } },
  { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },
  { key: "theRocks", location: { lat: -33.8587568, lng: 151.2058246 } },
  { key: "circularQuay", location: { lat: -33.858761, lng: 151.2055688 } },
];

const parkourMap = () => {
  return (
    <main className="parkourMap">
      <APIProvider
        apiKey={"AIzaSyC3ORbJDHOmjpFa_3v_C0cLaUkLv7I0HoM"}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          className="map"
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          mapId="da37f3254c6a6d1c"
          id="map"
        >
          <PoiMarkers pois={locations} />
        </Map>
      </APIProvider>
    </main>
  );
};

export default parkourMap;
