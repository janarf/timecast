function setMyPodcasts() {
  const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
  firebase.database().ref(`users/${USER_ID}/podcasts`)
    .once('value')
    .then(res => res.val().myPodcastsUnique)
    .then(res => {
      console.log(res)
      localStorage.setItem('myPodcasts', res)
    });
}

setMyPodcasts();