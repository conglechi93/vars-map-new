import { useEffect } from "react";
import initMap from "./initMap";
const MapPage = () => {
  useEffect(() => {
    let map = initMap();
    window.map = map;
  }, []);
  return (
    <div
      id="map"
      style={{ height: "100vh", position: "relative", overflow: "hidden" }}
    ></div>
  );
};
export default MapPage;