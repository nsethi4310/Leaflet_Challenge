
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
  
  d3.json(newtry, function(response) {

    console.log(response.features.length);
  
    console.log(response.features[2]);
    

    // var location1= response.features[2].geometry;

    // L.marker([location1.coordinates[1], location1.coordinates[0]]).bindPopup("<h1>"+response.features[2].properties.mag+" </h1>").addTo(myMap);

    var markers = L.markerClusterGroup();

    for (var i = 0; i < response.features.length; i++) {
      var location = response.features[i];

     console.log(location);

      if (location){
  
        markers.addLayer(L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]])
        .bindPopup(response.features[i].properties.place));
      }
      
    }
    myMap.addLayer(markers);
  
  });
