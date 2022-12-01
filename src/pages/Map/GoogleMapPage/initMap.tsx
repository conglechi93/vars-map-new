import locationUser from "../LocationUser";
import searchBoxCustom from "components/FeatureMapComponent/search";
const initMap = (setDataSearchPlaces: any) => {
    var zoomLevel = 15;
    var map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 16.07183353329854, lng: 108.21686090955396 },
      zoom: zoomLevel,
      streetViewControl: false,
      mapTypeControl: false,
      scrollwheel: true,
      // zoomControl: false,
      minZoom: 5,
      maxZoom: 20,
      mapId: "90f87356969d889c",
      fullscreenControl: false,
    });
    map.addListener("click", (e:any) => {
      
      let outPutLatLang = document.getElementById('length') as HTMLInputElement
      outPutLatLang = e.latLng.lat() && e.latLng.lng()
      console.log("🚀 ~ file: initMap.tsx ~ line 21 ~ map.addListener ~ outPutLatLang.value", outPutLatLang)
    })
    locationUser(map)
    searchBoxCustom(setDataSearchPlaces, map);


    
    return map
}
export default initMap;