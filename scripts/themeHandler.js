var addNewTask = document.getElementById("addNewTask");
var buttonPromjenaBoje = document.getElementById("promjenaBoje");
var h1 = document.querySelector("h1");

const themeColors = {
    default: "siva",
    theme1: 'plava',
    theme2: 'ljubicasta',
}

var theme;

function changeThemeColor() {
    if (theme === themeColors.theme1) {
        localStorage.setItem("theme", themeColors.theme2);
        checkLocalSotrage()

    } else if (theme === themeColors.theme2) {
        localStorage.setItem("theme", themeColors.default);
        checkLocalSotrage();
    }
    else {
        localStorage.setItem("theme", themeColors.theme1);
        checkLocalSotrage();
    }

}

function loadColorFromLocalStorage(theme) {
    if (theme === themeColors.theme1) {
        h1.classList.remove(themeColors.theme2);
        addNewTask.classList.remove(themeColors.theme2);
        buttonPromjenaBoje.classList.remove(themeColors.theme2);

        h1.classList.add(themeColors.theme1);
        addNewTask.classList.add(themeColors.theme1);
        buttonPromjenaBoje.classList.add(themeColors.theme1);
    } else if (theme === themeColors.theme2) {
        h1.classList.remove(themeColors.theme1);
        addNewTask.classList.remove(themeColors.theme1);
        buttonPromjenaBoje.classList.remove(themeColors.theme1);

        h1.classList.add(themeColors.theme2);
        addNewTask.classList.add(themeColors.theme2);
        buttonPromjenaBoje.classList.add(themeColors.theme2);
    }
    else {
        h1.classList.remove(themeColors.theme1);
        addNewTask.classList.remove(themeColors.theme1);
        buttonPromjenaBoje.classList.remove(themeColors.theme1);

        h1.classList.remove(themeColors.theme2);
        addNewTask.classList.remove(themeColors.theme2);
        buttonPromjenaBoje.classList.remove(themeColors.theme2);

        h1.classList.add(themeColors.default);
        addNewTask.classList.add(themeColors.default);
        buttonPromjenaBoje.classList.add(themeColors.default);
    }
}

function checkLocalSotrage() {
    theme = localStorage.getItem("theme");
    loadColorFromLocalStorage(theme);
}

checkLocalSotrage();

buttonPromjenaBoje.addEventListener("click", changeThemeColor)



