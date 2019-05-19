// https://stackoverflow.com/questions/45483759/cannot-load-deezer-api-resources-from-localhost-with-the-fetch-api
const flatten = (a, b) => [...a, ...b];
const myPodcasts = [1833, 2939, 2785, 3161, 2045, 1773, 91, 4319, 65, 1653, 4363, 9153, 27, 8381, 9955];

function podcastsData(myPodcasts) {
  const podcastPromise = myPodcasts.map(async (podcastId) => {
    const data = await getData(podcastId)
    return data;
  });
  Promise.all(podcastPromise)
    .then(results => {
      const arrayEpisodes = results.reduce(flatten, [])
      console.log(findMatchingTime(arrayEpisodes, 3600))
    });
}

function getData(podcastId) {
  return fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/podcast/${podcastId}/episodes`)
    .then((response) => response.json())
    .then(response => response.data)
}

function findMatchingTime(arrayEpisodes, time) {
  return arrayEpisodes.filter((episode) => {
    return (episode.duration <= (time + 300) && episode.duration >= (time - 300))
  })
}

podcastsData(myPodcasts)

DZ.init({
  appId: '349024',
  channelUrl: 'http://localhost:8080/channel.html'
});





