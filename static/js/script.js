// Creating map object
var myMap = L.map("map", {
    center: [40.4637, 3.7492],
    zoom: 2
  });
  var country = "wld"

  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(myMap);

  // Link to GeoJSON
  var Link = "./bounds_with_refugee_counts.geojson"

  var geojson;

  // Grab data with d3
  d3.json(Link, function(data) {

    // Create a new choropleth layer
    geojson = L.choropleth(data, {

      // Define what  property in the features to us

      valueProperty: "refugee_count",

      // Set color scale

      scale: ["#D3D3D3", "#191970"],

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

    onEachFeature: function(feature, layer) {
      layer.bindPopup("Origin Country : " + feature.properties.name + "<hr> Refugees in the US: " + feature.properties.refugee_count),
        //Function to update Country variable
        //bind click
        layer.on('click', function (e) {
          country = feature.properties.iso_a3
          console.log(country)  
        }); 
      } 
    
      

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
