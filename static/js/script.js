// need a Document Ready Function to open the modal upon 
// first starting page; then can click into content
// NOTE the modal is also triggered by clicking on navbar brand

// need an onclick to map
// to display a country's name 
// and that onlick pulls
// the correct country's information
// into the infobar
// it should also append the politgraph's Title, since
// that is empty when the page loads 


$(".nav-tabs").on("click", "#polittab", function () {
  // on click:
  // make it Active Tab
  $(this).addClass("active");
  $("#econtab").removeClass("active");
  $("#envirotab").removeClass("active");
  // display country-appropriate polit graph
  $("#graphtitle").empty();
  $("#graphtitle").append("[TITLE OF POLIT GRAPH]");
//  $("#graphimg").append();
  // display whatever links we wish to
  $("#articles").empty();
  $("#articles").append("whatever articles we want to call in");
});

$(".nav-tabs").on("click", "#econtab", function () {
  // on click:
  // make it Active Tab
  $(this).addClass("active");
  $("#polittab").removeClass("active");
  $("#envirotab").removeClass("active");
  // display country-appropriate econ graph
  $("#graphtitle").empty();
  $("#graphtitle").append("[TITLE OF ECON GRAPH]");
//  $("#graphimg").append();
});

$(".nav-tabs").on("click", "#envirotab", function () {
  // on click:
  // make it Active Tab
  $(this).addClass("active");
  $("#econtab").removeClass("active");
  $("#polittab").removeClass("active");
  // display country-appropriate enviro graph
  $("#graphtitle").empty();
  $("#graphtitle").append("[TITLE OF ENVIRO GRAPH]");
});



// Creating map object
var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
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
  
      // Set color scale
  
      // Number of breaks in step range
  
      // Binding a pop-up to each layer
  
    }).addTo(myMap);
  
    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];
  
      // Add min & max
      var legendInfo = "<h1>Median Income</h1>" +
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
  