$("#address-search-bar").keypress((e) => {
  if (e.which == 13) { confirmSearch() };
});

$('#search-go').click(confirmSearch)

function addClickEventTransport(mean) {
  $(`#${mean}`).on('click', () => {
    transport.filter((element) => element !== mean)
      .forEach(otherMean => $(`#${otherMean}`)
        .addClass('transport-button')
        .removeClass('transport-button--clicked'));
    localStorage.setItem('transport', mean)
    $(`#${mean}`).addClass('transport-button--clicked')
      .removeClass('transport-button');
    map.removeObjects(map.getObjects());
    getRoute(mean);
  })
}

function confirmSearch() {
  $('.transport').removeClass('invisible');
  $('#confirm').removeClass('d-none');
  $(`#car`).addClass('transport-button--clicked').removeClass('transport-button');
  localStorage.setItem('transport', 'car');
  getRoute('car');
}

transport.forEach(mean => addClickEventTransport(mean));

