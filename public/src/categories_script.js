$(document).ready(() => {
  $('#btn-categories').click(() => {
    let myPodcasts = [];
    $.each($('input[type="checkbox"]:checked'), function () {
      myPodcasts.push(eval($(this).val()));
    });
    myPodcasts = myPodcasts.flat();
    let myPodcastsUnique = myPodcasts.filter((item, index) => {
      return myPodcasts.indexOf(item) >= index;
    });
    const USER_ID = window.location.search.match(/\?id=(.*)/)[1];
    firebase.database().ref(`users/${USER_ID}/podcasts`).set({ myPodcastsUnique });
    window.location.href = `../pages/home.html?id=${USER_ID}`;
  });
});