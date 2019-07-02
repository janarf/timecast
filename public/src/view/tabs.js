const wayTab = document.querySelector('#way-tab');
const timerTab = document.querySelector('#timer-tab');
const firstList = document.querySelector('#f-list');
const sectList = document.querySelector('#s-list');

const displayTimerContent = document.querySelector('#timer-tab');
displayTimerContent.addEventListener('click', () => {
  wayTab.classList.remove('clicked-tab');
  timerTab.classList.add('clicked-tab');
});

const displayWayContent = document.querySelector('#way-tab');
displayWayContent.addEventListener('click', () => {

  timerTab.classList.remove('clicked-tab');
  wayTab.classList.add('clicked-tab');
});