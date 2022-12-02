const getLatLng = (map)=>{
    map.addListener("click", (e) => {
      
       document.getElementById('length').value = `${e.latLng.lat()},  ${e.latLng.lng()}`
        
      })
}
export default getLatLng 