const loginWindow = () => {
  const logIn = document.querySelector(".login");
  const sideMenu = document.getElementById("one");
  const closeX = document.querySelector(".close-x");
  const logInForm = document.querySelector(".log-in-hide");

  logIn.addEventListener("click", () => {
    if (sideMenu.classList.contains("side-nav")) {
      sideMenu.classList.add("hide");
      sideMenu.classList.remove("side-nav");
      logInForm.classList.toggle("log-in-display");
    } else {
      logInForm.classList.toggle("log-in-display");
    }
  });
  closeX.addEventListener("click", () => {
    logInForm.classList.remove("log-in-display");
  });
};

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

loginWindow();
navBar();
