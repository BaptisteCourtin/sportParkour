import React, { useEffect, useState } from "react";
import { useMap, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import type { Marker } from "@googlemaps/markerclusterer";
type Poi = { key: string; location: google.maps.LatLngLiteral };

const PoiMarkers = (props: { pois: Poi[] }) => {
  const map = useMap();

  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});

  const handleClick = (ev: google.maps.MapMouseEvent) => {
    if (!map) return;
    if (!ev.latLng) return;
    console.log("marker clicked: ", ev.latLng.toString());
    map.panTo(ev.latLng);
  };

  useEffect(() => {
    if (!map) return;
  }, [map]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          ref={(marker) => setMarkerRef(marker, poi.key)}
          clickable={true}
          onClick={handleClick}
          title={"test"}
        >
          <Pin
            background={"#FBBC04"}
            glyphColor={"#000"}
            borderColor={"#000"}
          />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default PoiMarkers;
