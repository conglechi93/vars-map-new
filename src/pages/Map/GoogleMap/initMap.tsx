
const initMap = () => {

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
    
    return map
}
export default initMap;