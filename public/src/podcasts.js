// https://stackoverflow.com/questions/45483759/cannot-load-deezer-api-resources-from-localhost-with-the-fetch-api
// const apiDeezer = `https://cors-anywhere.herokuapp.com/https://api.deezer.com`


// function listOfEpisodes(idPodcast) {
//     fetch(`${apiDeezer}`)
//         .then(res => res.json()).then(res => console.log(res.data));
// }
// const myPodcasts = [1833, 2939, 2785, 3161, 2045, 1773, 91, 4319, 65, 1653, 4363, 9153, 27, 8381, 9955]
const myPodcasts = [1833, 2939, 2785, 3161, 2045, 1773, 91, 4319, 65, 1653, 4363, 9153, 27, 8381, 9955]

function findMatchingTime() {
  const b = myPodcasts.map(async (podcastId) => {
    const a = await getData(podcastId)
    return a;
  })
  return (b)
}

async function getData(podcastId) {
  const a = await fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/podcast/${podcastId}/episodes`)
  const data = await a.json()
  return data;
}

findMatchingTime().forEach(
  prom => {
    prom.then(response =>
      response.data.forEach(elem =>
        elem
        // console.log(elem)
      ))
  })

console.log(findMatchingTime())
// listOfEpisodes('1833')
// //

DZ.init({
  appId: '349024',
  channelUrl: 'http://localhost:8080/channel.html'
});




// myPodcasts.forEach(async (podcastId) => {
//     const data = await DZ.api(`/podcast/${podcastId}/episodes`,
//         response => {
//             a.push(response.data)

//         });
//     console.log("data", data)
// });
// console.log("newarray", a)

// function getData() {
//     let a = [];
//     myPodcasts.forEach((podcastId) => {
//         DZ.api(`/podcast/${podcastId}/episodes`,
//             response => response.data)

//     });
//     return a
// }
// getData()

// const flatten = (a, b) => [...a, ...b];
