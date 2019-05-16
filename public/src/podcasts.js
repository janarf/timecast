function listOfEpisodes(idPodcast) {

    fetch(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/podcast/${idPodcast}/episodes`)
        .then(res => res.json()).then(res => console.log(res.data[0]));
}
listOfEpisodes('1833')