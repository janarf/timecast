document.addEventListener("DOMContentLoaded", function(event) { 
  var estilo = document.getElementsByClassName('load');
  estilo[0].style.visibility = "hidden";
});

// let loader = `<div class="load spinner-grow text-secondary" style="width: 3rem; height: 3rem;" role="status">
//   <span class="sr-only">Loading...</span></div>`;
//   document.getElementById('podcasts-container').innerHTML = loader;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}
function getPosition(userPosition) {
  localStorage.setItem('latitude', userPosition.coords.latitude);
  localStorage.setItem('longitude', userPosition.coords.longitude);
}

getLocation();