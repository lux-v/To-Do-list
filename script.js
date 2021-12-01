var dodaj = document.getElementById("dodaj");
var ul = document.querySelector("ul");
var vrijednostP = document.querySelector("p");
var brojZadataka = document.getElementsByClassName("instanca").length;
var deleteAll = document.getElementById("obrisiSve");
var unos;
var divOtvoriUnos;
var buttonPromjenaBoje = document.getElementById("promjenaBoje");
var h1 = document.querySelector("h1");


vrijednostP.innerHTML = "Number of tasks: " + brojZadataka;

buttonPromjenaBoje.addEventListener("click", promijeniBoju)


function promijeniBoju(){
    if (h1.className === "plava") {
        h1.classList.remove("plava");
        dodaj.classList.remove("plava");
        buttonPromjenaBoje.classList.remove("plava");
        buttonPromjenaBoje.classList.add("ljubicasta");
    }else{
        h1.classList.add("plava");
        dodaj.classList.add("plava");
        buttonPromjenaBoje.classList.remove("ljubicasta");
        buttonPromjenaBoje.classList.add("plava");
    }
}

if (brojZadataka === 0) {
    sakrijDeleteAllButton();
}

function unesiUListu(){


    if (unos.value !="") {
       
        var li = document.createElement("li");
        var div = document.createElement("div");
        var imgDelete = document.createElement("img");
        div.className ="jedanRed";
        
        li.appendChild(document.createTextNode(unos.value));
        
        li.className = "instanca";

        unos.remove();
        unos = undefined;
        divOtvoriUnos.remove();
        
        imgDelete.className = "icons";
        imgDelete.src="icons/trash-alt-regular.svg";
        
        ul.appendChild(div);
        div.appendChild(li);    
        div.appendChild(imgDelete);    

        brojZadataka ++;
        vrijednostP.innerHTML = "Number of tasks: " + brojZadataka;

        dodaj.focus();
    
        
        if (brojZadataka > 0) {
            prikaziDeleteAllButton();
        }
        
    }else{
        alert("Unesite vrijednost!");
        dodaj.focus();
        
    }

  

}

function otvoriInput(){

    if (unos) {
        unos.focus();
    }else{
        divOtvoriUnos = document.createElement("div");
        unos = document.createElement("input");
        imgAdd = document.createElement("img");


        divOtvoriUnos.className = "jedanRed";
        unos.value ="";

        imgAdd.className = "icons add";
        imgAdd.src = "icons/add.svg"; 

        ul.appendChild(divOtvoriUnos);
        divOtvoriUnos.appendChild(unos);
        divOtvoriUnos.appendChild(imgAdd);
        unos.focus();
    
        unos.addEventListener("keypress", function(){
            if (event.keyCode === 13) {
                unesiUListu();    
            }
        })

        imgAdd.addEventListener("click", unesiUListu)
    

        unos.addEventListener("focusout", function(){

            if(unos.value===""){
                divOtvoriUnos.remove();
                unos.remove();
                unos = undefined;
            }
            
        })
        
    }
}



function handleUlClick(elem){
    precrtajElement(elem);
    obrisiElement(elem);
}


function precrtajElement(elem){
    if (elem.target.className === "instanca") {
        elem.target.classList.add("active");
    }else{
        elem.target.classList.remove("active");
    }

}
function obrisiElement(elem){
    if (elem.target.className === "icons") {
        elem.target.parentElement.remove();
        brojZadataka --;
        
        vrijednostP.innerHTML = "Number of tasks: " + brojZadataka;

        if (brojZadataka === 0) {
            sakrijDeleteAllButton();
        }
    }

}

function obrisiSveElemente(){

    var cijelaLista = document.getElementsByClassName("instanca");
    
    Array.from(cijelaLista).forEach(child => {
        child.parentElement.remove();
        brojZadataka = 0;
        vrijednostP.innerHTML = "Number of tasks: " + brojZadataka;

        
      })
      
      sakrijDeleteAllButton();
}



function sakrijDeleteAllButton(){

    deleteAll.classList.add("sakriveno");
}
function prikaziDeleteAllButton(){

    deleteAll.classList.remove("sakriveno");
}

deleteAll.addEventListener("click", obrisiSveElemente);
ul.addEventListener("click", handleUlClick)
dodaj.addEventListener("click", otvoriInput)


