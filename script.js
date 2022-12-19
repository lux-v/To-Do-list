var dodaj = document.getElementById("dodaj");
var ul = document.querySelector("ul");
var ukupnoZadataka = document.getElementsByClassName("totalTasks")[0];
var preostaloZadataka = document.getElementsByClassName("unfinishedTasks")[0];
var brojZadataka = document.getElementsByClassName("instanca").length;
var brojPreostalihZadataka = 0;
var deleteAll = document.getElementById("obrisiSve");
var unos;
var divOtvoriUnos;
var buttonPromjenaBoje = document.getElementById("promjenaBoje");
var h1 = document.querySelector("h1");

ukupnoZadataka.innerHTML = "Number of tasks: " + brojZadataka;

if (brojZadataka === 0) {
    sakrijDeleteAllButton();
}

function promijeniBoju() {
    if (h1.className === "plava") {
        h1.classList.remove("plava");
        dodaj.classList.remove("plava");
        buttonPromjenaBoje.classList.remove("plava");
        buttonPromjenaBoje.classList.add("ljubicasta");

        localStorage.setItem("theme", "ljubicasta");

    } else {
        h1.classList.add("plava");
        dodaj.classList.add("plava");
        buttonPromjenaBoje.classList.remove("ljubicasta");
        buttonPromjenaBoje.classList.add("plava");

        localStorage.setItem("theme", "plava");
    }
}

function sakrijDeleteAllButton() {
    deleteAll.classList.add("sakriveno");
}

function prikaziDeleteAllButton() {
    deleteAll.classList.remove("sakriveno");
}

function handleUlClick(elem) {
    precrtajElement(elem);
    obrisiElement(elem);
}

function setCookie(cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = "theme=" + cvalue + ";" + expires + "; path=/";
}

function checkCookie() {
    var theme = localStorage.getItem("theme");

    console.log("theme: " + theme)
    if (theme == "ljubicasta") {


        h1.classList.remove("plava");
        dodaj.classList.remove("plava");
        buttonPromjenaBoje.classList.remove("plava");
        buttonPromjenaBoje.classList.add("ljubicasta");
    }
    if (theme == "plava") {
        h1.classList.add("plava");
        dodaj.classList.add("plava");
        buttonPromjenaBoje.classList.remove("ljubicasta");
        buttonPromjenaBoje.classList.add("plava");


    }
}

checkCookie();

buttonPromjenaBoje.addEventListener("click", promijeniBoju)

