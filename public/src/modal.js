function showModal() {
  console.log('entrou show modal')
  $('#btn-modal').trigger('click');
  $('.transport').addClass('invisible');
  $('#confirm').attr('disabled', true);
}