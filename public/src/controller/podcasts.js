function podcastsData(myPodcasts, time) {
  let loader = `<div class="load spinner-grow text-secondary" style="width: 3rem; height: 3rem;" role="status">
  <span class="sr-only">Loading...</span></div>`;
  document.getElementById('podcasts-container').innerHTML = loader;

  const podcastPromise = myPodcasts.map(async (podcastId) => {
    const data = await getData(podcastId);
    return data;
  });

  Promise.all(podcastPromise)
    .then(results => {
      const arrayEpisodes = shuffleArray(results.flat());
      const matchingPodcasts = findMatchingTime(arrayEpisodes, time);
      if (matchingPodcasts.length > 0) {
        matchingPodcasts.forEach(podcast => {
          $('#podcasts-container').append(podcastTemplateString(podcast.id));
        });
      } else {
        $('#time-sugestion').html('<p>Não foi encontrado nenhum podcast com a duração desejada :(</p>');
        $('.bold-text').html('Ouça outras opções:');
        arrayEpisodes.forEach(podcast => {
          $('#podcasts-container').append(podcastTemplateString(podcast.id));
        });
      }
    })
    .finally(function () {
      let load = document.getElementsByClassName('load');
      load[1].style.visibility = 'hidden';
    });
}

function getData(podcastId) {
  return fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/podcast/${podcastId}/episodes`)
    .then(response => response.json())
    .then(response => response.data);
}

function findMatchingTime(arrayEpisodes, time) {
  return arrayEpisodes.filter(episode => {
    return (episode.duration <= (time + 240) && episode.duration >= (time - 240));
  });
}

function podcastTemplateString(id) {
  return `<div class=" text-center mx-auto"><iframe scrolling="no" frameborder="0" allowTransparency="true"
  src="https://www.deezer.com/plugins/player?format=square&autoplay=false&playlist=false&width=300&height=300&color=ff0000&layout=dark&size=medium&type=episodes&id=${id}&app_id=349024"
  width="300" height="300"></iframe></div>`;
}

function templateStringTime(timeSeconds) {
  const timeHoursMin = moment.utc(timeSeconds * 1000).format('HH:mm').split(':');
  let min = 'minutos ';
  let pronoun = 'seus ';
  let hour = '';
  let connective = '';

  if (Number(timeHoursMin[0]) >= 1) {
    connective = 'e ';
    if (Number(timeHoursMin[0]) === 1) {
      pronoun = 'sua ';
      hour = 'hora ';
    } else {
      pronoun = 'suas ';
      hour = 'horas ';
    }
    if (timeHoursMin[1] === '01') {
      min = 'minuto ';
    }
    if (timeHoursMin[1] === '00') {
      min = '';
      connective = '';
      timeHoursMin[1] = '';
    }
  } else {
    timeHoursMin[0] = '';
  }
  $('#time-suggestion').html(`Aproveite ${pronoun}${timeHoursMin[0]} ${hour}${connective}${timeHoursMin[1]} ${min} :)`);
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

$(document).ready(() => {
  $('#confirm').click(() => {
    $('#home-select').addClass('d-none');
    $('#suggestions').removeClass('d-none');
    const timeSeconds = Number(localStorage.getItem(localStorage.getItem('transport')));
    templateStringTime(timeSeconds);
    podcastsData(localStorage.getItem('myPodcasts').split(',').map(Number), timeSeconds);
  });

  DZ.init({
    appId: '349024',
    channelUrl: 'localhost:5000'
  });
});