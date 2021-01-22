
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 3
});

// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

  
  var newtry = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
   
  function getColor(i) {
    return i > 90 ? "#EA2C2C" :
      i > 70  ? "#EA822C" :
      i > 50  ? "#EE9C00" :
      i > 30  ? "#EECC00" :
      i > 10   ?  "#D4EE00" :
              "#98EE00";
    }

  d3.json(newtry, function(response){

    console.log(response.features.length);
  
    console.log(response.features[2]);
  

    // var location1= response.features[2].geometry;

    // L.marker([location1.coordinates[1], location1.coordinates[0]]).bindPopup("<h1>"+response.features[2].properties.mag+" </h1>").addTo(myMap);

    // var markers = L.markerClusterGroup();

    for (var i = 0; i < response.features.length; i++) {
      var location = response.features[i];

    //  console.log(location);

      if (location){
  
        
        L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]], 
        {
          fillOpacity: 1,
          // color: "red",
          fillColor: getColor(location.geometry.coordinates[2]),
          radius:location.properties.mag*50000
        }).bindPopup("<h3>Magnitude of Earthquake:" + location.properties.mag +
        "<h3> Depth of Earthquake:" + location.geometry.coordinates[2]+
        "<h3>Place of Earthquake:" + location.properties.place).addTo(myMap)
       
  
        // L.circle([location.geometry.coordinates[1], location.geometry.coordinates[0]]).addTo(myMap);
      
          // markerSize(location.geometry.coordinates[2])}.addTo(myMap);

        
      
      };
    };
  
    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function (myMap) {
      var div = L.DomUtil.create('div', 'info legend'),
        grades = [-10, 10, 30, 50, 70, 90]
        
      // loop through density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
      return div;
    };
    legend.addTo(myMap);
    
  
  });
