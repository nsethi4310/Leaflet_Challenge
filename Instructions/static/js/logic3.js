
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


    
d3.json(newtry, function(data) {
// Creating a geoJSON layer with the retrieved data
L.geoJson(data, {
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<h1>" + feature.properties.mag + "</h1> <hmagr> <h2>" + feature.properties.place + "</h2>");

  },
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, {
      // radius: markersize(feature.properties.mag),
      radius: (feature.properties.mag)*4,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      opacity: 1,
      fillOpacity: 1,
      stroke: true,
      weight: 0.5
  })
},
}).addTo(myMap);

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
