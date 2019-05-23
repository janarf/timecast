function showModal() {
  $('#confirm').attr('disabled', true);
  $('.transport').addClass('d-none');
  $('.error-body').html('Digite um endereço válido.');
  $('.alert').addClass('show');
}