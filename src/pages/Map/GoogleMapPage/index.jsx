import { useEffect,useState } from "react";
import initMap from "./initMap";
import { AppInfoView } from "@crema";
const MapPage = () => {
  

  const [dataSearchPlaces, setDataSearchPlaces] = useState(null);
  console.log("🚀 ~ file: index.jsx ~ line 5 ~ MapPage ~ dataSearchPlaces", dataSearchPlaces)
  useEffect(() => {
    let map = initMap(setDataSearchPlaces);
    window.map = map;
   
  }, []);
  return (
    
    <div style={{ height: "100vh" }}>
    <AppInfoView></AppInfoView>
 
    <div
      id="map"
      style={{ height: "100vh", position: "relative", overflow: "hidden" }}
    ></div>
    </div>
  
  );
};
export default MapPage;