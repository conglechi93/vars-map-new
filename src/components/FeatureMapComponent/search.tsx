import { toast } from "react-toastify";
// import "./index.css";
import axios from "axios";
import markerCustom from './markerCustom'

const searchBoxCustom = (setDataSearchPlaces:any,map: any) => {
  // console.log("🚀 ~ file: search.tsx ~ line 8 ~ searchBoxCustom ~ isDisplay", isDisplay)
  const input = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);
    // let markers: google.maps.Marker[] = [];
    // let infoWindow = new google.maps.InfoWindow();
    let dataPolygon: string[] = [];
    searchBox.addListener("places_changed", () => {
    displaySearchResults(map, searchBox);
  });
   
const removePolygons = (bermudaTriangle: any) => {
    input.addEventListener("input", (e: any) => {
      if (e.target.value == 0) {
        bermudaTriangle.setMap(null);
      }
    });
  };

  const latLngApi = (searchBox: any) => {
    const places = searchBox.getPlaces();

    return axios
      .get( `http://192.168.1.26:8500/vmap/places/getpolygon?lat=${places[0].geometry.location.lat()}&lng=${places[0].geometry.location.lng()}`
        
      )
      .then((res: any) => {

        const dataPolygonLatLngApiBro = res.data.data.coordinates.map((value: any) => {
          const data = value.map((item: any) => {
            return {
              lat: item[1],
              lng: item[0],
            };
          });
          return data;
        });

        var bermudaTriangle = new google.maps.Polygon({
          paths: dataPolygonLatLngApiBro,
          strokeColor: "#0033FF",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: "#0033FF",
          fillOpacity: 0,
        });
        bermudaTriangle.setMap(map);
        removePolygons(bermudaTriangle);

        // setDataSearch({ response: res.data });
      })
      .catch((error: any) => {
        throw error;
      });
  };

  const placeIdApi = (searchBox: any) => {
    const places = searchBox.getPlaces();
    return axios
      .get(
        `http://192.168.1.26:8500/vmap/places/getpolygon?placeId=${places[0].place_id}`
      )
      .then((res: any) => {
        const dataPolygonLatLngApiBro = res.data.data.coordinates.map((value: any) => {
          const data = value.map((item: any) => {
            return {
              lat: item[1],
              lng: item[0],
            };
          });
          return data;
        });

        var bermudaTriangle = new google.maps.Polygon({
          paths: dataPolygonLatLngApiBro,
          strokeColor: "#0033FF",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: "#0033FF",
          fillOpacity: 0,
        });
        bermudaTriangle.setMap(map);
        removePolygons(bermudaTriangle);
      })
      .catch((error: any) => {
        throw error;
      });
  };

  function displaySearchResults(map: any, searchBox: any) {
    const places = searchBox.getPlaces();
    setDataSearchPlaces(places)
    const checkPlace = places.map((value:any) => {
      return value.types
     
   })
    if(checkPlace[0].includes('administrative_area_level_1' )|| checkPlace[0].includes( 'administrative_area_level_3')){
      placeIdApi(searchBox);
      }
      else {
      
      latLngApi(searchBox);
      }

    const refactorPolygon1 = dataPolygon.map((item: any) => {
      if (item.data != null) {
        return;
      }
      return item.data.data.results;
    });

    const refactorPolygon2 = refactorPolygon1.map((value) => {
      if (!value) {
        return;
      }
      return value[0].place_id;
    });

    if (places.length == 0) {
      return toast("Không tìm thấy");
    }
    markerCustom(places,refactorPolygon2,refactorPolygon1,map,input)
    
  }
  
}
export default searchBoxCustom 