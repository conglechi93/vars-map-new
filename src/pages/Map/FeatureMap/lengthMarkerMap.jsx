const lengthMarkerMap = (map) => {
//   let handleRemoveClick;

  let poly;
  let totalKm = 0;
//   let gmarkers = [];

//   function handleRemove() {
//     alert('123')
//     handleRemoveClick.remove();
//   }
  
//   google.maps.event.addListener(map,'dblclick', handleRemove);
//   handleRemoveClick = google.maps.event.addListener(map, 'click', addLatLng);
//   google.maps.event.addListener(map, 'dragend', addLatLng);
  
  poly = new google.maps.Polyline({
      strokeColor: '#0033FF',
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });
    
    
    poly.binder = new MVCArrayBinder(poly.getPath());
    console.log("🚀 ~ file: lengthMarkerMap.jsx ~ line 25 ~ lengthMarkerMap ~ poly.getPath()", poly.getPath())
    console.log("🚀 ~ file: lengthMarkerMap.jsx ~ line 25 ~ lengthMarkerMap ~ poly.binder", poly.binder)
    
    poly.setMap(map);
    google.maps.event.addListener(map, 'click', addLatLng);
  google.maps.event.addListener(map, 'dragend',addLatLng);
//   updateLength();

//   function updateLength() {
//     poly.inKm().toFixed(2);
//   }
  google.maps.Polyline.prototype.inKm = function (n) {
    var a = poly.getPath(n),
      len = a.getLength(),
      dist = 0;
    for (var i = 0; i < len - 1; i++) {
      dist += google.maps.geometry.spherical.computeDistanceBetween(
        a.getAt(i),
        a.getAt(i + 1),
      );
    }
    return dist / 1000;
  };
  function addLatLng(event) {
    var path = poly.getPath();
    path.push(event.latLng);
    var len = path.getLength();
    totalKm = poly.inKm().toFixed(2);
   
    var marker = new google.maps.Marker({
      position: event.latLng,
      map: map,
      label: {
        text: totalKm + 'km',
        color: 'blue',
        className: 'lable_polyline',
      },
      icon: {
        path: 'M256,320c-70.688,0-128-57.312-128-128c0-70.687,57.313-128,128-128c70.688,0,128,57.313,128,128C384,262.688,326.688,320,256,320z',
        fillColor: 'blue',
        fillOpacity: 1,
        scale: 0.025,
        strokeColor: 'red',
        strokeWeight: 5,
        strokeOpacity: 1,
        anchor: new google.maps.Point(200, 200),
      },
      draggable: true,
    });

  
    marker.bindTo('position', poly.binder, (len - 1).toString());
    // google.maps.event.addListener(marker, 'dragend', updateLength);
  }
  function MVCArrayBinder(mvcArray) {
    console.log("🚀 ~ file: lengthMarkerMap.jsx ~ line 78 ~ MVCArrayBinder ~ mvcArray", mvcArray)
    poly.array_ = mvcArray;
  }
  MVCArrayBinder.prototype = new google.maps.MVCObject();
  MVCArrayBinder.prototype.get = function (key) {
    if (!isNaN(parseInt(key))) {
      return poly.array_.getAt(parseInt(key));
    } else {
      this.array_.get(key);
    }
  };
  MVCArrayBinder.prototype.set = function (key, val) {
    if (!isNaN(parseInt(key))) {
      poly.array_.setAt(parseInt(key), val);
    } else {
      poly.array_.set(key, val);
    }
  };
};
export default lengthMarkerMap;
