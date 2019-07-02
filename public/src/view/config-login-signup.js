const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");

const displayLoginForm = document.querySelector("#display-login-form");
displayLoginForm.addEventListener("click", () => {
  signupForm.classList.remove("in");
  signupForm.classList.add("d-none");

  loginForm.classList.remove("d-none");
  loginForm.classList.add("in");

  displayLoginForm.classList.add("clicked");
  displaySignUpForm.classList.remove("clicked");

});

const displaySignUpForm = document.querySelector("#display-signup-form");
displaySignUpForm.addEventListener("click", () => {
  loginForm.classList.remove("in");
  loginForm.classList.add("d-none");

  signupForm.classList.remove("d-none");
  signupForm.classList.add("in");

  displayLoginForm.classList.remove("clicked");
  displaySignUpForm.classList.add("clicked");
});

