var addNewTask = document.getElementById("addNewTask");
var buttonPromjenaBoje = document.getElementById("promjenaBoje");
var h1 = document.querySelector("h1");

var theme;

function changeThemeColor() {
    if (theme === "plava") {
        localStorage.setItem("theme", "ljubicasta");
        checkLocalSotrage()

    } else {
        localStorage.setItem("theme", "plava");
        checkLocalSotrage();
    }
}

function loadColorFromLocalStorage(theme) {
    if (theme === "plava") {
        h1.classList.add("plava");
        addNewTask.classList.add("plava");
        buttonPromjenaBoje.classList.add("plava");
    } else {
        h1.classList.remove("plava");
        addNewTask.classList.remove("plava");
        buttonPromjenaBoje.classList.remove("plava");
        buttonPromjenaBoje.classList.add("ljubicasta");
    }
}

function checkLocalSotrage() {
    theme = localStorage.getItem("theme");
    loadColorFromLocalStorage(theme);
}

checkLocalSotrage();

buttonPromjenaBoje.addEventListener("click", changeThemeColor)



