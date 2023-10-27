"use client";
import GoogleMapReact from "google-map-react";

export function Map() {
  const defaultProps = {
    center: {
      lat: 15,
      lng: 20,
    },
    zoom: 2,
  };

  return (
    // Important! Always set the container height explicitly
    <div
      style={{
        height: "100%",
        width: "100%",
        overflow: "hidden",
        borderRadius: 10,
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}
      </GoogleMapReact>
    </div>
  );
}
