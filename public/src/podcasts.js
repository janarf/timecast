// https://stackoverflow.com/questions/45483759/cannot-load-deezer-api-resources-from-localhost-with-the-fetch-api

const flatten = (a, b) => [...a, ...b];
const myPodcasts = [1833, 2939, 2785, 3161, 2045, 1773, 91, 4319, 65, 1653, 4363, 9153, 27, 8381, 9955];

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
      const arrayEpisodes = shuffleArray(results.reduce(flatten, []));
      const matchingPodcasts = findMatchingTime(arrayEpisodes, time);
      if (matchingPodcasts.length > 0) {
        matchingPodcasts.forEach(podcast => {
          $('#podcasts-container').append(podcastTemplateString(podcast.id));
        });
      } 
      else {
        $('#time-sugestion').html('<p>Não foi encontrado nenhum podcast com a duração desejada:(</p>');
        $('.bold-text').html('Ouça outras opções:');
        arrayEpisodes.forEach(podcast => {
          $('#podcasts-container').append(podcastTemplateString(podcast.id));
        });
      }
    })
    .finally(function() {
      let estilo = document.getElementsByClassName('load');
      estilo[1].style.visibility = "hidden";
    });
}

function getData(podcastId) {
  return fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/podcast/${podcastId}/episodes`)
    .then(response => response.json())
    .then(response => response.data);
}

function findMatchingTime(arrayEpisodes, time) {
  return arrayEpisodes.filter(episode => {
    return (episode.duration <= (time + 240) && episode.duration >= (time - 240))
  });
}

$('#confirm').click(() => {
  $('#home-select').addClass('d-none');
  $('#sugestions').removeClass('d-none');
  const timeSeconds = Number(localStorage.getItem(localStorage.getItem('transport')));
  templateStringTime(timeSeconds);
  podcastsData(myPodcasts, timeSeconds);
});

DZ.init({
  appId: '349024',
  channelUrl: 'localhost:8080'
});

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
  let conective = '';

  if (Number(timeHoursMin[0]) >= 1) {
    conective = 'e ';
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
      conective = '';
      timeHoursMin[1] = '';
    }
  } else {
    timeHoursMin[0] = '';
  }
  $('#time-sugestion').html(`Aproveite ${pronoun}${timeHoursMin[0]} ${hour}${conective}${timeHoursMin[1]} ${min} :)`);
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

