document.addEventListener('DOMContentLoaded', function (event) {
  let loading = document.getElementsByClassName('load');
  loading[0].style.visibility = 'hidden';
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  } else {
    alert('Por favor, ative a geolocalização para utilizar a aplicação');
  }
}
function getPosition(userPosition) {
  localStorage.setItem('latitude', userPosition.coords.latitude);
  localStorage.setItem('longitude', userPosition.coords.longitude);
}

getLocation();