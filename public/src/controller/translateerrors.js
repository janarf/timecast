function errorMessageSignUp(error) {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return ('O endereço de email já está cadastrado.');
    case 'auth/invalid-email':
      return ('Insira um endereço de email válido.');
    case 'auth/weak-password':
      return ('A senha deve ter no mínimo 6 caracteres.');
    default:
      return (`Erro desconhecido: ${error.code}: ${error.message}`);
  }
}

function errorMessageSignIn(error) {
  switch (error.code) {
    case 'auth/wrong-password':
      return ('Senha inválida.');
    case 'auth/user-not-found':
      return ('Email não cadastrado.');
    default:
      return (`Erro desconhecido: ${error.code}: ${error.message}`);
  }
}