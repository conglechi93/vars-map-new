function locationUser(map) {
  let infoWindow = new google.maps.InfoWindow();
  var controlDiv = document.createElement('div');

  var firstChild = document.createElement('button');
  firstChild.style.backgroundColor = '#fff';
  firstChild.style.border = 'none';
  firstChild.style.outline = 'none';
  firstChild.style.width = '40px';
  firstChild.style.height = '40px';
  firstChild.style.borderRadius = '2px';
  firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
  firstChild.style.cursor = 'pointer';
  firstChild.style.marginRight = '30px';
  firstChild.style.borderRadius = '7px';
  firstChild.style.marginBottom = '35px';
  firstChild.style.display = 'flex';
  firstChild.style.justifyContent = 'center';
  firstChild.style.alignItems = 'center';
  firstChild.style.padding = '0';

  controlDiv.appendChild(firstChild);

  var secondChild = document.createElement('div');
  secondChild.style.margin = '5px';
  secondChild.style.width = '18px';
  secondChild.style.height = '18px';
  secondChild.style.backgroundImage =
    'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
  secondChild.style.backgroundSize = '180px 18px';
  secondChild.style.backgroundPosition = '0 0';
  secondChild.style.backgroundRepeat = 'no-repeat';
  firstChild.appendChild(secondChild);

  google.maps.event.addListener(map, 'center_changed', function () {
    secondChild.style['background-position'] = '0 0';
  });

  firstChild.addEventListener('click', function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          secondChild.style['background-position'] = '-144px 0';
          var icon = {
            url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJfSURBVHgB3ZUxUxNBFMf/uzklCHESHSEzWpwVDDIjlXbGFNToNyB+AcKgtaFWJ+ELaL4B2NJkopXaUDCCledoEYYZE5OoiVx2fXu5hL3cXbixk19ze29v3//t27fvgP8dNm6yUKknE8AqYrEMk3JJAqa7aE8yZqHXe72RTZX/SeB5pf6Acf6KhkmMx4IQm2FCPMhYfNMqkvPtCM4VJiiQ4tvW06BJ3w7Uh0KIwqh9wmC4HOfO87jdQ9eWAd54aeNeYj1U4EWlvop+WoZcm+KIGxKHtS6+Nf6g2RFYSMexPDeN/SMbza7waEghHj7OpnaCBao/PsM9SMWt2Qt4b7Xx8l0DQeQzVzCXvoSPRye6ucGFuLmeTTmLuCd6zblKx0HtV6hzRan6HR8oALVLjaStKs/ldCYWW9G/WpwxsEUOzkIFMGl4z4Oc3tfGfaSU5mCsDnL3UwtROah1nDWnCvy2T4CmlwbjmekYLeoiKl8bJ05KNUyfgE7HFrQghqi0qLI8O9DQd2ANxs2OxPWkgagspCecuzGATmTPJ0C9ZWhUl0jVelSW5xOei8eE+OITEL1eVV/022bI3U3hLPKZq9iv2aPmHZ8AJaRMj2HRH/8UuGNOYY0chPGIAphPT47eZktvfJ6TcTvotm5T1bE4a2D3sO2UY4LebyQvOnlXu1SBeBAiFyrgipRIZG3UrqpElW+Hcq36UVCzoya5+SSbKui2wNp6VqkXOOeB7TcManJb1OTyo/bQH47bWZWIifE0yHlO76CRBDxCjK2o3yVjrH/bpbSgal3KKlVJedA5zyd/AXfS6D749t8+AAAAAElFTkSuQmCC',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(5, 5),
            scaledSize: new google.maps.Size(20, 20),
          };

          // Create a marker for each place.
          const marker = new google.maps.Marker({
            map,
            icon,
            position: pos,
          });

          map.setCenter(pos);
          return marker;
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        },
      );
    } else {
      //   clearInterval(animationInterval);
      secondChild.style['background-position'] = '0 0';
    }
  });
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ? 'Error' : 'Error');
    infoWindow.open(map);
    infoWindow.close();
  }
}
export default locationUser;
