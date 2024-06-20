import React, { useEffect, useState } from "react";
import {
  useMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { GetParkourByIdQuery } from "@/types/graphql";
import Link from "next/link";

const PoiMarker = ({ poi }: { poi: GetParkourByIdQuery["getParkourById"] }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [activeMarkerId, setActiveMarkerId] = useState("0");

  const map = useMap();
  useEffect(() => {
    if (!map) return;
  }, [map]);

  const handleActiveMarker = (marker: any, ev: google.maps.MapMouseEvent) => {
    if (!map) return;
    if (!ev.latLng) return;
    map.panTo(ev.latLng);
    if (marker === activeMarkerId) {
      return;
    }
    // console.log("marker clicked: ", marker);
    setActiveMarkerId(marker);
  };

  return (
    <AdvancedMarker
      key={poi.title}
      position={{
        lat: parseFloat(poi.start.split(",")[0]),
        lng: parseFloat(poi.start.split(",")[1]),
      }}
      // position={{ lat: -7.9528, lng: 17.1379 }}
      ref={markerRef}
      clickable={true}
      onClick={(ev) => handleActiveMarker(poi.id, ev)}
    >
      {activeMarkerId == poi.id ? (
        <InfoWindow anchor={marker} onCloseClick={() => setActiveMarkerId("0")}>
          <Link href={`/parkour/${poi.id}`}>{poi.title}</Link>
          <br />
          <a
            href={`https://www.google.fr/maps/place/${poi.start}`}
            target="blank"
          >
            Y aller !
          </a>
        </InfoWindow>
      ) : null}

      <Pin background={"#FBBC04"} glyphColor={"#000"} borderColor={"#000"} />
    </AdvancedMarker>
  );
};

export default PoiMarker;
