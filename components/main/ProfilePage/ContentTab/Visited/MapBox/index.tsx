import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
interface MapBox {
  lat: string;
  lon: string;
}
const MapBox = ({ lat, lon }: MapBox) => {
  return (
    <div className="h-[30rem] w-full rounded-lg">
      <Map
        initialViewState={{
          longitude: parseInt(lon),
          latitude: parseInt(lat),
          zoom: 7,
        }}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={parseInt(lon)}
          latitude={parseInt(lat)}
          color="red"
        />
      </Map>
    </div>
  );
};

export default MapBox;
