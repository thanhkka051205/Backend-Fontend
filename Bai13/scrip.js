// localStorage.setItem("fullName", "Doan Van Thanh"); //Them vao localStorage
const fullName = localStorage.getItem("fullName");
const test = document.querySelector("#test");
test.innerHTML = fullName;

//change mode
const currentMode = localStorage.getItem("mode");
if (currentMode) {
  const body = document.querySelector("body");
  body.classList.toggle(currentMode);
}
const buttonChangeMode = document.querySelector("#change-mode");
buttonChangeMode.addEventListener("click", () => {
  const body = document.querySelector("body");
  body.classList.toggle("dark");

  const currentMode = localStorage.getItem("mode");
  if (currentMode) {
    localStorage.setItem("mode", "");
  } else {
    localStorage.setItem("mode", "dark");
  }
});
