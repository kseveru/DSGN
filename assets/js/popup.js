var bodyToggle = document.querySelector(".nojs");
var btnToggle = document.querySelector(".btn-toggle");
var navCatalog = document.querySelector(".site-nav");

var projectOpenFondue = document.querySelector(".project__more--fondue");
var projectFondue = document.getElementById("project-fondue-full");
var projectClose = document.querySelector(".project__close");

bodyToggle.classList.remove("nojs");
navCatalog.classList.add("site-nav--closed");

btnToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  btnToggle.classList.toggle("btn-toggle--closed");
  navCatalog.classList.toggle("site-nav--closed");
});

projectOpenFondue.addEventListener("click", function (evt) {
  evt.preventDefault();
  projectFondue.classList.toggle("popup-project--closed");
});

projectClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  projectFondue.classList.toggle("popup-project--closed");
});
