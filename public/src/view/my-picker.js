$(document).ready(() => {
  const picker = new Picker(document.querySelector('.js-inline-picker'), {
    headers: true,
    format: 'HH:mm',
    controls: true,
    inline: true,
    text: {
      title: 'Escolha um intervalo:',
      hour: 'Hora',
      minute: 'minuto',
      cancel: 'Cancelar',
    },
  });

  const timeToSeconds = string => string.split(':')[0] * 3600 + string.split(':')[1] * 60;

  $('#confirm-time').click(() => {
    if (picker.getDate('HH:mm') !== '00:00') {
      $('#home-select').addClass('d-none');
      $('#suggestions').removeClass('d-none');
      templateStringTime(timeToSeconds(picker.getDate('HH:mm')));
      podcastsData(
        localStorage.getItem('myPodcasts').split(',').map(Number),
        timeToSeconds(picker.getDate('HH:mm')));
    }
  });
});