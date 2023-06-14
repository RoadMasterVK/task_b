function initMap() {
  var options = {
    center: { lat:53.3750818, lng:-6.116662},
    zoom: 12 
  };

  var map = new google.maps.Map(document.getElementById("map"), options);
  var marker = new google.maps.Marker({
    position: { lat:53.3750818, lng:-6.116662}, 
    map: map, 
    title: "Howth Town" 
  });
}
