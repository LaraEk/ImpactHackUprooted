// Creating map object
var myMap = L.map("map", {
    center: [40.4637, 3.7492],
    zoom: 2
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Link to GeoJSON
  var Link = "https://raw.githubusercontent.com/wri/wri-bounds/master/dist/all_primary_countries.geojson"
  
  var geojson;
  
  // Grab data with d3
  d3.json(Link, function(data) {
  
    // Create a new choropleth layer
    geojson = L.choropleth(data, {
  
      // Define what  property in the features to us

      valueProperty: "un_n3",

      // Set color scale

      scale: ["#269CDB", "#30E558"],
  
      // Number of breaks in step range

      steps: 11,

      // Style
    // This data must be passed
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },
  
      // Binding a pop-up to each layer
      // Add event listener to add popup to layer and add to map
    //onEachFeature: function(feature, layer) {
    //  layer.bindPopup(feature.properties.LOCALNAME + ", " + feature.properties.State + "<br>Median Household Income:<br>" +
    //    "$" + feature.properties.MHI);
    //}
  //}).addTo(myMap);
  
    }).addTo(myMap);
  
    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      console.log(limits)
      var colors = geojson.options.colors;
      console.log(colors)
      var labels = [];
  
      // Add min & max
      var legendInfo = "<h1>Refugees in America</h1>" +
        "<div class=\"labels\">" +
          "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
  
      div.innerHTML = legendInfo;
  
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    // Adding legend to the map
    legend.addTo(myMap);
  
  });

  // Create an overlay object
//var overlayMaps = {
//  "State Population": states,
//  "City Population": cities
//};
  
// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(overlayMaps, {
  collapsed: true
}).addTo(myMap);
  