import { useEffect,useState } from "react";
import initMap from "./initMap";
// import { ToastContainer } from "react-toastify";
// import { useDispatch } from 'react-redux';
// import { FETCH_ERROR } from "shared/constants/ActionTypes";
import { AppInfoView } from "@crema";
// import {useIntl} from 'react-intl';
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
    {/* <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  /> */}
 
    <div
      id="map"
      style={{ height: "100vh", position: "relative", overflow: "hidden" }}
    ></div>
    </div>
  
  );
};
export default MapPage;