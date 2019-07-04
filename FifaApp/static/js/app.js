

var runnerupnation='global';
var hostnation='global';
//Eric Kleppen -- start create map 
function createMap(locations) {
        document.getElementById('weathermap').innerHTML = "<div id='map'></div>";
          var API_KEY = "pk.eyJ1IjoiYmVuZGdhbWUiLCJhIjoiY2p4MTBiMjRkMDRxdTRibzRpc2xha29vbyJ9.H30YFMJBlbttkBgA0pOigw"
      
        // Create the tile layer that will be the background of our map
        var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
            minZoom: 2,
            maxZoom: 18,
            id: "mapbox.streets-satellite",
            accessToken: API_KEY
        });

        // Create a baseMaps object to hold the lightmap layer
        var baseMaps = {
            "Map": darkmap
        };

        // Create an overlayMaps object to hold the bikeStations layer
        var overlayMaps = {
            "Locations": locations
        };

        // Create the map object with options
        var map = L.map("map", {
            center: [-3.718333, -38.542778],
            zoom: 2,
            layers: [darkmap, locations]
        });

        // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(map);
  
        
        //legend example https://leafletjs.com/examples/choropleth/
  var legend = L.control({position: 'bottomright'});

  //function to get the legend color
    function legColor(d) {
      return d === 'Host' ? 'red' :
             d === 'Winner'  ? 'yellow' :
                    'white' ;
       
    };
  
  // 
    legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          cir = ['Host', 'Winner', 'Runner Up']
    
      for (var i = 0; i < cir.length; i++) {
          div.innerHTML +=
              '<i style="background:' + legColor(cir[i]) + '"></i> ' 
              + cir[i] +  '<br>'
              //+ ( '<br>' : '+');
       }
  
        return div;
    };
  
    legend.addTo(map);
    } // end function create map

//Eric Kleppen - Create the circles on the map
function createMarkers(year) {

//api call
var map_url = `/FinalGamesByYear/${year}`;
d3.json(map_url).then(function(data){

console.log(data)
//   // Pull the "stations" property off of response.data
//   var stations = response.data.stations;

// Initialize an array to hold bike markers
var locationMarkers = [];

// Loop through the stations array
for (var i = 0; i < data.length; i++){
    
    var wlat = Math.round(data[i].WinnerLatitude)
    var wlong = Math.round(data[i].WinnerLongitude)

    var rlat = Math.round(data[i].RunnerupLatitude)
    var rlong = Math.round(data[i].RunnerupLongitude)

    var hostlat = Math.round(data[i].HostLatitude)
    var hostlong = Math.round(data[i].HostLongitude)

    // For each station, create a marker and bind a popup with the station's name
    var winner = L.circle([wlat, wlong],100000,{color: 'yellow', opacity:.80})
        .bindPopup("<h3>Winner: " + data[i].Country + "<h3><h3>Final Score: " + data[i].FinalScore + "<h3>");

    var loser = L.circle([rlat, rlong],100000,{color: 'white', opacity:.80})
        .bindPopup("<h3>Runner up : " + data[i].Runnerup + "<h3>");

    var host = L.circle([hostlat, hostlong],100000,{color: 'red', opacity:.80})
        .bindPopup("<h3>Host: " + data[i].Host + "<h3><h3>Attendance: " + data[i].Attendance + "<h3><h3>Venue: " + data[i].Venue + "<h3>");

    // Add the marker to the bikeMarkers array
    locationMarkers.push(winner,loser,host);
    }

  // Create a layer group made from the bike markers array, pass it into the createMap function
    var lg = L.layerGroup(locationMarkers)
   
    createMap(lg);
  });
} // end create markers function




//  Function for text data

function DynamicHeaders(ResultsByCountryData,runnerupnation,hostnation,AttendanceNo, venueName) {

   var MapText = d3.select("#Chart1Text");//select the html element where we will append
   var AttendanceText= d3.select("#Chart2Text")

//    text for map
   MapText.selectAll("h3").remove();
   AttendanceText.selectAll("h3").remove();




   
       
    console.log("cleared Node",runnerupnation,hostnation);
         winnerCountry=ResultsByCountryData.Country;
         winnerYear=ResultsByCountryData.Yearswon;
        wonAlso=ResultsByCountryData["Yearsrunners-up"];
         
        switch(winnerCountry) {
            case "Uruguay":
            wonAlso="1930 and 1950"
            break;
            
            default:
                wonAlso=wonAlso;}





         var MapCell = MapText.append("h3");
         MapCell.text( winnerCountry +" won over" +runnerupnation+ " in " + hostnation + ". "+winnerCountry+ " also won in "+wonAlso +". ");

         var AttCell = AttendanceText.append("h3");
         AttCell.text( "The game took place at the  " + venueName + " in "+hostnation +" drawing  "+AttendanceNo+ " spectators. ");

       // text for attendance 




    };// end of function DynamicHeaders


function updateText(year){
// begin of update text

    d3.json(`/FinalGamesByYear/${year}`).then(function(GetyearCountry) {
        console.log(GetyearCountry);
                nation=GetyearCountry[0]["Country"];
                nation=nation.trim();
                runnerupnation=GetyearCountry[0]["Runnerup"];
                hostnation=GetyearCountry[0]["Host"];
                AttendanceNo=GetyearCountry[0]["Attendance"];
                venueName=GetyearCountry[0]["Venue"];

                switch(nation) {
                    case "West Germany":
                    nation="Germany"
                    break;
                    
                    default:
                    nation=nation;                }          
        
        d3.json(`/ResultsByCountry/${nation}`).then(function(response1) {
        
            var ResultsByCountryData = response1;
            console.log(hostnation);
            
            DynamicHeaders(ResultsByCountryData,runnerupnation,hostnation,AttendanceNo,venueName);

        });//end of api call resultsByCountry
    
    });// end of update text
}; //end of updateText function
    
    
// ALL -- initiate javascript to use the first year from the drop list.
function init() {

    // update dropdown menu
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");

    // Use the list of years  to populate the select options
        d3.json("/years").then((Years) => {
        Years.forEach((year) => {
            console.log(year);
            selector
            .append("option")
            .text(year.Year)
            .property("value", year.Year);
            });
            console.log("logging years0");
            console.log(Years[0].Year);
            const firstYear = Years[0].Year;
            //run functions on initial page load
            
            createMarkers(firstYear);
            updateText(firstYear);
        });
    // default text before rendering the charts
    var Text1Select = d3.select("#Chart1Text");
    Text1Select
    .append("h3").text("");

    var Text1Select = d3.select("#Chart1Text");
    Text1Select
    .append("h3").text("");

    var Text1Select = d3.select("#Chart1Text");
    Text1Select
    .append("h3").text("");

}; //end init function

//call function initiate
init();

// ALL -- Used to call functions when a new year is selected in the droplist. 
function optionChanged(year) {
        console.log(year)
        
        //remove map element from html    
        map.remove()       
        
        //Run functions on year change
        createMarkers(year);
        updateText(year);

    
    };  //end of change function
