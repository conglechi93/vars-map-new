// import data from "../../assets/places.json";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";

const markerCustom = (places:any,refactorPolygon2:any,refactorPolygon1:any,map:any,input:any) =>{
 places.forEach(function (place: any) {
  var bounds = new google.maps.LatLngBounds();
   let markers = [];
      if (!place.geometry) {
        return;
      }

      if (refactorPolygon2[0] == place.place_id) {
        const refactorPolygon3 = refactorPolygon1.map((item: any) => {
          return item[0].polygons;
        });

        if (refactorPolygon3 != null) {
          const polygonReal = refactorPolygon3.map((value: any) => {
            if (!value) {
              return;
            }
            return value.rings;
          });

          const polygonSearch1 = polygonReal.map((location: any) => {
            return location.flat();
          });

          const polygonSearch2 = polygonSearch1.map((value: any) => {
            const data = value.map((item: any) => {
              return {
                lat: item[1],
                lng: item[0],
              };
            });
            return data;
          });

          var bermudaTriangle = new google.maps.Polygon({
            paths: polygonSearch2,
            strokeColor: "#0033FF",
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: "#0033FF",
            fillOpacity: 0,
          });
          bermudaTriangle.setMap(map);
        }
      }

      var icon = {
        url: "data:image/png;base64,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",
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(5, 5),
        scaledSize: new google.maps.Size(25, 30),
      };
      input.addEventListener("input", (e: any) => {
        if (e.target.value == 0) {
          marker.setMap(null);
        }
      });
      const marker = new google.maps.Marker({
        map,
        icon,
        title: place.name,
        position: place.geometry.location,
      });

      markers.push(marker);

      // var icon1 = {
      //   url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHsSURBVHgBpVM9TxtBEJ3Zs2kM4rApIiIlltKAkRJTREqUJiUd+QmpSaSkSQpSxOniCkfCdQr+ALRUNIgCCWNLSJSH+ZCRELKxLcR97DCzd2eMwaLgSSvtzrw3uzv7FmEAFXv6o5XABSL8xMusCSLsIcFeEOg/c80Dp5+Pt8KsbanUb0L6LuvRD29h5MVzk3PrJ9DZ2gkFiKXA73Ihpwn94upkrlLN5Kj+dYn85iUN4vrw2OSEI1zR9ArU0rPLkmgUy4asvUPyLn6QdzYfDp5LTCAc4dYmZ5fjO2fjnQVBZ5XcoyneMXV3cMxvrxpOfBLpF9Yyuf8E8Hl6dwOSUwH4jfdAugUPQo1D8tk26O4E7L96xwH6p7jb+bhhul0eLhZwTnfKYI2PQYo13NIFBUj5ZNRtcmvwGGJO9EJZBU+EFHDknQU48vpRQczxRMPmUppgvcsmCVptUGOLplHDt7NBjS6Ce3RqjEXsUAVKr0nu9NdfwMRLsOziw0VYnJgIOWfFsgkRW9tMKplcKTTSSmQkh83zk7zGfDh4LrHQSCuhGzMzpV7xip23q+nIyl+W6Lp+cs/KfuvS5Iw4PdOzMvYXAcstcFe/yXrYZxLz6OCqEH8mHLyqWBssLCDhG0TIR2FHA62zZ9bmzg82+/k3ZHBSeaRKmxgAAAAASUVORK5CYII=",
      //   size: new google.maps.Size(71, 71),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(5, 5),
      //   scaledSize: new google.maps.Size(15, 15),
      // };
      // var icon2 = {
      //   url: "data:image/png;base64,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",
      //   size: new google.maps.Size(71, 71),
      //   origin: new google.maps.Point(0, 0),
      //   anchor: new google.maps.Point(5, 5),
      //   scaledSize: new google.maps.Size(15, 15),
      // };

      // var temps = map.data.addGeoJson(data);
      // map.data.setStyle({ icon: "none" });

      // const dataTeamplaceBro = temps.filter((item: any) => {
      //   return item.getProperty("id") == place.place_id;
      // });
      // const dataTeamplace = dataTeamplaceBro.map((item: any) => {
      //   if (item.getProperty("id") == place.place_id) {
      //     return {
      //       location: item.getGeometry(),
      //       value: {
      //         img: item.getProperty("img"),
      //         city: item.getProperty("city"),
      //         title: item.getProperty("title"),
      //         name: item.getProperty("name"),
      //         price: item.getProperty("price"),
      //         direction: item.getProperty("direction"),
      //         address: item.getProperty("address"),
      //         district: item.getProperty("district"),
      //         ward: item.getProperty("ward"),
      //         project: item.getProperty("project"),
      //         area: item.getProperty("area"),
      //         room: item.getProperty("room"),
      //         tolet: item.getProperty("tolet"),
      //         typeHouse: item.getProperty("typeHouse"),
      //         competence: item.getProperty("competence"),
      //         polygon: item.getProperty("polygon"),
      //       },
      //     };
      //   }
      // });
      // const markers1 = dataTeamplace.map((item: any) => {
      //   const infoWindow = new google.maps.InfoWindow();
      //   const marker = new google.maps.Marker({
      //     position: item.location.h,
      //     icon: icon1,
      //   });
      //   infoWindow.setContent("<div>" + item.value.price + "</div>");

      //   infoWindow.open(map,marker);

      //   infoWindow.setPosition(item.location.h);
      //   infoWindow.setOptions({ pixelOffset: new google.maps.Size(0, -5) });

      //   marker.addListener("mouseover", () => {
      //     marker.setIcon(icon2);
      //     infoWindow.setContent(
      //       "<div style='display: flex'>" +
      //         "<div>" +
      //         "<image style='width: 155px;margin-right: 3px; height: 100%' src='https://thuthuatnhanh.com/wp-content/uploads/2020/01/hinh-anh-mau-biet-thu-3-tang-dep-sang-trong-va-hien-dai-scaled.jpg' /> " +
      //         "</div>" +
      //         "<div  style='display: flex; flex-direction: column; padding-left: 20px'>" +
      //         "<div style='display: flex'>" +
      //         "<div style='background-color: #D1132A;color: white;padding: 7px;border-radius: 7px;'>" +
      //         item.value.typeHouse +
      //         "</div>" +
      //         "<div style='background-color: #333333;color: white;padding: 7px;border-radius: 7px; margin-left: 10px'>" +
      //         item.value.competence +
      //         "</div>" +
      //         "</div>" +
      //         "<div style='font-weight: 700;margin-top: 10px;'>" +
      //         item.value.title +
      //         "</div>" +
      //         "<div style='display: flex; padding: 5px 0 0px 0'>" +
      //         "<image style='margin-right: 7px'  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAOCAYAAAD0f5bSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGcSURBVHgBbVLNTsJAEN7dLlQT9c7VmIafoy/AAwAJf60knuUB4AHwLtzhrJhSUoJy8gH0xBUCD0AfQKOAdMedpkuaxjnsz8w3M983u5RErFQqnZ/qeoMC5IGxMwLgSff81/dfXdf1FI6pw02tlj89OXnC8/d+37RHo1LC9zsghJfQtI5lWYbCUlwqlUpKBvoS1HyMVFR2K+MHxrp7IVrYMeiElQQh9yrBKpcN0zSLWAzv6Pcp7SIuoIc6pIZzx3Hmiibh/EH6gu71ev0a/WE8hXim67ohRW8UFaC0QRhr244z8AF6GkAxwtS74PyM6b6/ifIHgDUDCKozxlKCsc+4RhboADCwLTqSQgyFHLllmi84+u12O1DDQnqI52HyDN9H7oNwGM14dakPac6O7/Sz2z3LraCmFbfQXwhxRMNltVrts7ncOkFp5/Lq6g3v0YQE531yOLTd6dQ7JqEtFgsvm8kkk5y3jHT6fblcfh0ThBjYrvuhsDROxaxWG1TTGlSInrzeASFDezyeRTH0Pw34I+QDtySlrj2ZrOPxP8O5vNeS6zU0AAAAAElFTkSuQmCC'/>" +
      //         item.value.address +
      //         "</div>" +
      //         "<div style='color: #D1132A;font-weight: 700;font-size: 14.0059px;line-height: 16px;padding: 5px 0 5px 0'>" +
      //         item.value.price +
      //         "</div>" +
      //         "<div style='display: flex;  padding: 5px 0 5px 0; align-items: center'>" +
      //         "<div style='display: flex;width: 100% ; margin-right: 7px'>" +
      //         "<image style='padding-right: 7px' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEnSURBVHgBzZI9TsNAEIV3Zxe7okYcANsSLQfgBEax8ldQh5IiB4COigsgaqRVIqdBooQK0bhCyCEHIBVdaMDrYcaSpcg4OOnyGs+O9c3Mzj4p1lCv1fKE1sOl1N6PteeKo367fecFwXOapos6+G06/fSDIMkRnxTAsRTiQAA8Av9Eay8dgOsoivZXdY/jeO5oPaAwEYgPnCtgM5nMmgr0u90LRJyb0eimzEEZ/FegCtL47661H386nBJYLGgJ7HU6A7GptheUdWB1q+yD7zwf8nPxmReaZdkCmkBW9RUoPnNd11NNIIsdduj7r1qpK3aikvIIpZypJrCugJDSQXKaLsbK88SMx/erQB5X06gEkKXhixqd0PdWijUUhuEu37E8E7hjjHn5BceOqjQT59GuAAAAAElFTkSuQmCC'/>" +
      //         "Hướng - " +
      //         item.value.direction +
      //         "</div>" +
      //         "<div style='margin-left: 10px;display:flex; align-items: center'>" +
      //         "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFiSURBVHgBlVO9SsNQFL7nJjqI1U1sF7eWtgkO+gouUgpJext/EJz0AVwEB/UBVHD0CUz7FDoIDk42LfgAEQdnRcw9nltsSUNuQj+45OTL9517fojBMrAvhG1Vq6v94fBDpwHdB89xysw0fRL8IOcHvu+/pekMnRkM44LMTyjlIz0P67b9GgTBZ1LL0xJEhlEypTxBgJBxHqqYRVGZzQpPiCOv3W5kaXi87GazWWA5cF23qM5UgnHPS6a5mJdggc4851ee541agt1Wq05TvkHEWwnwnijP4YjhL8DzFI9YBIBTkPLYjAD2SLiMjG0CYvLCdWLWiF+Jk0pFm5mTnG+PiJ1O51wNLOnWDVHxyvNfJWP33e4ltVAY95UFIcQGlV9UnjztbGuMI22duhWD7ubJC22BAZRU6Pd6d0lt6r8QDAYvtmU1KPsWmSvU8zeZr9O0qQkU+kHwYNVqFQq/yHym0/0Bk/d3l8Jbkc4AAAAASUVORK5CYII='/>" +
      //         item.value.area +
      //         "</div>" +
      //         "</div>" +
      //         "<div style='display: flex; padding: 5px 0 5px 0; justify-content: space-between;'>" +
      //         "<div style='display: flex; align-items: center;'>" +
      //         "<img style='margin-right: 7px' src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGvSURBVHgBrVPdbcIwEL5zHCWtYAAYgAUyQFmgSEACpQPQ98J75yjPfWiUCCToACzAAGWAZoD0B9LE7jk0KKoQJBWfFNk529/dff4McCZgNul1u9eIeEVftchBKWXIAIKPKJrM5/OQq2C/3W4QgfXs+2MoAcdxrAvDGNB0wtII580EcQEl4XneigZLzRmcCTz/o1oEXR+SAHudmJTrGHHJEAf5OGHlet7kIBG1OPrabMZKvCxk23aTSzn63G7v8vG+4wwHvd5ASLlLmC2Q2HWUMshvVjCFeJVU0d+4niQLkasQM3YaLCKqCoA1FAAlrqUjnaHbvs1as4hg4vn+Ckqg1WpVL03zXtkAlQYaQMX1/Rf4BxTZhWk+MA2xAZpWqJ1DSLUTYndrmCR1Ku/o02CMha7rrjudTi2O43fDMBrZGulUT4kEYxb5JTyaOkneqI1AJ3F1TVNJrWxJMlZJiegBLmPaCCfAOa98A4S/xPsnRcTWrjXEJv00lI/IMycJcy01lceIoMalEAGoUqk1LsTj03QaFCW6se0aEYWqgNSQygcsjkN3Nit9e8o+URStfgCj3LvqbJuA1AAAAABJRU5ErkJggg=='/>" +
      //         item.value.room +
      //         "PN" +
      //         "</div>" +
      //         "<div style='margin-left: 10px;display: flex; align-items: center'>" +
      //         "<img style='margin-right: 7px' src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFQSURBVHgBrZNRTsJAEIZntluJCfVdjyEX8ADAA7AV4ru+ywW4AAeQZyJim77gAXqBXsAD2HdrYghtx5laTPRFtuFLdrc76fzZ/XcGoabf73ta67Z8R1GUgiUokz8c9lCpLhGlHGgD4us6CBY2QqqaEDucePcchrMSccWh7ng0urIW2iPXc4imn9vtDSFOZA8H8kvorPbotNWaIJG331sLLdnkAnFeAiSyLi1M138DQRAk0AAFRwIHg8H5iVJzNjeGhuyKYqNdx5nlRAuunwwawLXnuVpPxaPEQbzn1bqaBT6Ax2Oj+UopluViHYYv0ADf93ucT0czW/Ed37i3LqAhqiwvua2+beG+epTXA0sk59qYh0pQJiqKmZSAMaZzqIj8Ky/ucq7sq8reIWYuD27Y7tiY239V+MkJIJZ+fM/zjx8hgYOrpzCMwQI+VVI3dvYFXtx8Yb5rMooAAAAASUVORK5CYII='/>" +
      //         item.value.tolet +
      //         "WC" +
      //         "</div>" +
      //         "</div>" +
      //         "</div>" +
      //         "</div>"
      //     );
      //     infoWindow.setOptions({ pixelOffset: new google.maps.Size(0, 0) });
      //     infoWindow.setZIndex(999);
      //     infoWindow.open(map, marker);
      //   });
      //   marker.addListener("mouseout", () => {
      //     infoWindow.setContent("<div >" + item.value.price + "</div>");
      //     infoWindow.open(map,marker);
      //     infoWindow.setPosition(item.location.h);
      //     infoWindow.setOptions({ pixelOffset: new google.maps.Size(0, -5) });
      //     infoWindow.setZIndex(1);
      //     marker.setIcon(icon1);

      //   });

      //   return marker;
      // });

      // let markerClusterer = new MarkerClusterer({
      //   map,
      //   markers: markers1,
      //   renderer: {
      //     render: ({ markers, _position: position }: any) => {
      //       const icon = {
      //         url: "data:image/png;base64,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",
      //         size: new google.maps.Size(50, 50),
      //         origin: new google.maps.Point(0, 0),
      //         anchor: new google.maps.Point(17, 34),
      //         scaledSize: new google.maps.Size(25, 30),
      //       };

      //       const markerchirCluster: any = new google.maps.Marker({
      //         position: {
      //           lat: position.lat(),
      //           lng: position.lng(),
      //         },
      //         icon: icon,
      //         label: {
      //           text: String(markers.length),
      //           color: "red",
      //           className: "lable-cluster",
      //         },
      //       });

      //       const infoWindow = new google.maps.InfoWindow();
      //       markerchirCluster.addListener("mouseover", () => {
      //         infoWindow.setContent(
      //           "<div style='display: flex;  padding-left: 20px; font-family: 'Roboto';font-style: normal;font-weight: 400;'>" +
      //             "<div> Có </div>" +
      //             "<div style='margin: 0px 3px 0px 3px'>" +
      //             markers.length +
      //             "</div>" +
      //             "<div style='font-family: 'Roboto';font-style: normal;font-weight: 400;'>Điểm Bất Động Sản</div>" +
      //             "<div>"
      //         );
      //         // infoWindow.setPosition(position);
      //         infoWindow.open(map);
      //         infoWindow.setOptions({
      //           pixelOffset: new google.maps.Size(10, -37),
      //           position: position
              
      //         });
      //       });
      //       markerchirCluster.addListener("mouseout", () => {
      //         infoWindow.close();
      //       });
      //       return markerchirCluster;
      //     },
      //   },
      // });

      // if(isDisplay.isDisplay){
      //   markerClusterer.clearMarkers();
      //   return;
      // }
      // markerClusterer;

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      map.fitBounds(bounds);
      
    });
}
export default markerCustom