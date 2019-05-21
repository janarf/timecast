function showModal() {
  $('#btn-modal').trigger('click');
  $('.transport').addClass('invisible');
  $('#confirm').attr('disabled', true);
}