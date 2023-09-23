let navBar = () => { // this function shows and hides side navigation menu
  const burgerMenu = document.querySelector("#burger");
  const closeBt = document.querySelector("#close");
  const menuList = document.querySelector(".list-menu-wrapper");

  burgerMenu.addEventListener("click", () => { // burger menu button
    menuList.classList.remove("list-menu-wrapper");
    menuList.classList.add("list-menu-wrapper-show");
  });

  closeBt.addEventListener("click", () => { // close button
    menuList.classList.remove("list-menu-wrapper-show");
    menuList.classList.add("list-menu-wrapper");
  });
};

navBar();
