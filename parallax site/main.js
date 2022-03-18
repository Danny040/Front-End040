let navBar = () => {
  const burgerMenu = document.querySelector("#burger");
  const closeBt = document.querySelector("#close");
  const menuList = document.querySelector(".list-menu-wrapper");

  burgerMenu.addEventListener("click", () => {
    menuList.classList.remove("list-menu-wrapper");
    menuList.classList.add("list-menu-wrapper-show");
  });

  closeBt.addEventListener("click", () => {
    menuList.classList.remove("list-menu-wrapper-show");
    menuList.classList.add("list-menu-wrapper");
  });
};

navBar();
