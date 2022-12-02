import { FETCH_ERROR, LAND_PLOT } from "shared/constants/ActionTypes";
import API from 'api/Request';
import { appIntl } from '@crema/utility/helper/Utils';

export const landPlotAction = ({valueInputSoTo,valueInputSoThua,valueCity,valueDistrict,valueWard}) => {
  const { messages } = appIntl();

  return (dispatch) => {
    API.get(`http://192.168.1.26:8500/vmap/places/gettothuabynumber?lat=&lng=&soto=${valueInputSoTo}&sothua=${valueInputSoThua}&matinh=${valueCity}&maquanhuyen=${valueDistrict}&maphuongxa=${valueWard}`)
      .then((data) => {
        const landPlot = data;
        var map = window.map;
        dispatch({type: LAND_PLOT, payload: {landPlot}});
        if (window.bermuda) {
            window.bermuda.setMap(null);
        }
        if(landPlot!=null) {
              const polygon = landPlot.coordinates.map((item) => {
                const data = item.map((location) => {
                  return {
                    lat: location[0],
                    lng: location[1],
                  };
                });
                
                map.setCenter({lat: item[0][0], lng: item[0][1]});
                return data;
              });
              console.log("🚀 ~ file: LandPlot.js ~ line 29 ~ polygon ~ polygon ", polygon[0][0] )
              
             
                window.bermuda = new google.maps.Polygon({
                  // label: landPlot.dientich + landPlot.donvitinh,
                  paths: polygon,
                  strokeColor: 'blue',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: '#3e32a8',
                  fillOpacity: 0.2,
                });
                let Markers=[]
                var marker = new google.maps.Marker({
                  position: polygon[0][0],
                  map: map,
                  label: landPlot.dientich + landPlot.donvitinh,
                    icon: {
                    path: 'M256,320c-70.688,0-128-57.312-128-128c0-70.687,57.313-128,128-128c70.688,0,128,57.313,128,128C384,262.688,326.688,320,256,320z',
                    fillColor: 'blue',
                    fillOpacity: 1,
                    scale: 0.025,
                    strokeColor: 'black',
                    strokeWeight: 1,
                    strokeOpacity: 1,
                    anchor: new google.maps.Point(200, 200),
    
                    
                  },
                })
                  Markers.push(marker)
            
                window.bermuda.setMap(map);
                map.setZoom(20);
                return;
          }
          else {
            dispatch({type: FETCH_ERROR, payload: messages["common.landPlot"]})
          }

      })
      .catch((e) => {
        throw e;
      });
  };
};
