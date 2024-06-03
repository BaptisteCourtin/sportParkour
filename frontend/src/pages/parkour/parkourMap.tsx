import React from "react";
import { GetParkourByIdQuery, useGetAllParkourQuery } from "@/types/graphql";

import { APIProvider, Map } from "@vis.gl/react-google-maps";
import PoiMarker from "@/components/parkour/poiMarker";

// mettre la clé api dans un .env
const parkourMap = () => {
  const { data, loading, error } = useGetAllParkourQuery({
    fetchPolicy: "no-cache",
  });

  return (
    <main className="parkourMap">
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY as string}
        // onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          className="map"
          defaultZoom={10}
          defaultCenter={{ lat: 47.2138, lng: -1.5552 }}
          mapId="da37f3254c6a6d1c"
          id="map"
        >
          {data?.getAllParkour.map(
            (poi: GetParkourByIdQuery["getParkourById"]) => (
              <PoiMarker poi={poi} />
            )
          )}
        </Map>
      </APIProvider>
    </main>
  );
};

export default parkourMap;
