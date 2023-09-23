const loginWindow = () => { // opens and closes login form
  const logIn = document.querySelector(".login");
  const sideMenu = document.getElementById("one");
  const closeX = document.querySelector(".close-x");
  const logInForm = document.querySelector(".log-in-hide");
// addes event listener to log in button
  logIn.addEventListener("click", () => {
    if (sideMenu.classList.contains("side-nav")) {
      sideMenu.classList.add("hide");
      sideMenu.classList.remove("side-nav");
      logInForm.classList.toggle("log-in-display");
    } else {
      logInForm.classList.toggle("log-in-display");// adds or removes class to show or hide the login form
    }
  });
  closeX.addEventListener("click", () => { // closeX - close button on the form
    logInForm.classList.remove("log-in-display");
  });
};
// shows and hides side bar on smaller screens
const navBar = () => {
  const burgerMenu = document.querySelector(".hamburger-menu");
  const sideMenu = document.getElementById("one");
  burgerMenu.addEventListener("click", () => {
    if (sideMenu.classList.contains("side-nav")) {
      sideMenu.classList.add("hide");
      sideMenu.classList.remove("side-nav");
      console.log(sideMenu);
    } else {
      sideMenu.classList.add("side-nav");
      sideMenu.classList.remove("hide");
    }
  });
};
// invoke arrow functions
loginWindow();
navBar();
