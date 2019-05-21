$('#btn-categories').click(() => {
  let myPodcasts = [];
  $.each($("input[type='checkbox']:checked"), function () {
    myPodcasts.push(eval($(this).val()));
  });
  myPodcasts = myPodcasts.reduce(flatten, [])
  let myPodcastsUnique = myPodcasts.filter((item, index) => {
    return myPodcasts.indexOf(item) >= index;
  });
  database.ref(`users/${firebase.auth().currentUser.uid}/podcasts`).set({
    myPodcastsUnique
  });
  window.location.href = "./home.html"
});