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
const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  if (form.checkValidity()) {
    form.submit();
  } else {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
      if (!input.checkValidity()) {
        const error = input.parentNode.querySelector('.error-message');
        if (error) {
          error.textContent = input.validationMessage;
        } else {
          const errorElement = document.createElement('div');
          errorElement.classList.add('error-message');
          errorElement.textContent = input.validationMessage;
          input.parentNode.appendChild(errorElement);
        }
      }
    });
  }
});
