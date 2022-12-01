import { LAND_PLOT } from "shared/constants/ActionTypes";
import API from 'api/Request';

export const landPlotAction = ({valueInputSoTo,valueInputSoThua,valueCity,valueDistrict,valueWard}) => {
  return (dispatch) => {
    API.get(`http://192.168.1.26:8500/vmap/places/gettothuabynumber?lat=&lng=&soto=${valueInputSoTo}&sothua=${valueInputSoThua}&matinh=${valueCity}&maquanhuyen=${valueDistrict}&maphuongxa=${valueWard}`)
      .then((data) => {
        const landPlot = data;
        var map = window.map;
        console.log("🚀 ~ file: LandPlot.js ~ line 10 ~ .then ~ map ", map )
        dispatch({type: LAND_PLOT, payload: {landPlot}});
        const polygon = landPlot.coordinates.map((item) => {
            const data = item.map((location) => {
              return {
                lat: location[0],
                lng: location[1],
              };
            });
            console.log("🚀 ~ file: LandPlot.js ~ line 19 ~ data ~ data", data)
            // map.setCenter({lat: item[0][0], lng: item[0][1]});
            return data;
          });
          window.bermuda = new google.maps.Polygon({
            paths: polygon,
            strokeColor: 'blue',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#3e32a8',
            fillOpacity: 0.2,
          });
      
          window.bermuda.setMap(map);
      
          map.setZoom(20);
      
          return;

      })
      .catch((e) => {
        throw e;
      });
  };
};
