import { useEffect } from "react"
import { useSelector } from "react-redux"

const useMarkerLandPlot = () => {
    var map = window.map;
    function markerLandPlot(){
        const landPlot = useSelector((state)=>state.landPlot)
        useEffect(()=>{
            const polygon = landPlot.coordinates.map((item)=>{
                    const data = item.ma((location)=>{
                        return {
                            lat: location[0],
                            lng: location[1],
                          };
                    })
                    map.setCenter({lat:item[0][0],lng:item[0][1]})
                    return data
            
                 })
            console.log("🚀 ~ file: markerLandPlot.js ~ line 20 ~ polygon ~  polygon",  polygon)
        },[])

    }
    // const markerLandPlot = useCallback(()=>{
    //     console.log("🚀 ~ file: markerLandPlot.js ~ line 6 ~ useMarkerLandPlot ~ landPlot", landPlot.coordinates)
    //     const polygon = landPlot.coordinates.map((item)=>{
    //     const data = item.ma((location)=>{
    //         return {
    //             lat: location[0],
    //             lng: location[1],
    //           };
    //     })
    //     map.setCenter({lat:item[0][0],lng:item[0][1]})
    //     return data

    //  })
    //  window.bermuda = new google.maps.Polygon({
    //     paths: polygon,
    //     strokeColor: "blue",
    //     strokeOpacity: 0.8,
    //     strokeWeight: 2,
    //     fillColor: "#3e32a8",
    //     fillOpacity: 0.2,
 
    //   });
     
    //   window.bermuda.setMap(map);
     
    //   map.setZoom(20);
      
    //   return;
    // },[])
    return markerLandPlot
}
export default useMarkerLandPlot