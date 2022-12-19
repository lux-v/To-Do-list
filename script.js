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
    } else {
        h1.classList.add("plava");
        dodaj.classList.add("plava");
        buttonPromjenaBoje.classList.remove("ljubicasta");
        buttonPromjenaBoje.classList.add("plava");
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

buttonPromjenaBoje.addEventListener("click", promijeniBoju)

