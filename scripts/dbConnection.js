// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import {
    getDatabase,
    ref,
    set,
    onValue,
    push,
    remove,
    update,
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';
import { firebaseConfig } from '../constants/constants.js';


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

var inputTask;
var divOpenInput;
var addNewTask = document.getElementById('addNewTask');
var deleteAll = document.getElementById("obrisiSve");
var ul = document.querySelector("ul");

var totalTasks = document.getElementsByClassName("totalTasks")[0];
var remainingTasks = document.getElementsByClassName("unfinishedTasks")[0];

var totalTaskNumber = 0;
var remainingTaskNumber = 0;

function handleUlClick(elem) {
    crossOutElementInDatabase(elem);
    deleteElementFromDatabase(elem);
}

function hideDeleteAllIcon() {
    deleteAll.classList.add("sakriveno");
}

function showDeleteAllIcon() {
    deleteAll.classList.remove("sakriveno");
}

const populateTasksInDOM = (allTasks) => {
    allTasks.forEach((element) => {
        if (element.naziv !== undefined) {
            var li = document.createElement('li');
            var div = document.createElement('div');
            var imgDelete = document.createElement('img');
            div.className = 'jedanRed';
            li.appendChild(document.createTextNode(element.naziv));
            if (element.zavrseno == true)
                li.className = 'instanca zavrseno';
            else li.className = 'instanca';
            imgDelete.className = 'icons imgDelete';
            div.id = element.id;
            imgDelete.src = 'icons/trash-alt-regular.svg';
            ul.appendChild(div);
            div.appendChild(li);
            div.appendChild(imgDelete);

            totalTasks.innerHTML = 'Total number of tasks: ' + totalTaskNumber;
            remainingTasks.innerHTML =
                'Number of unfinished tasks: ' + remainingTaskNumber;
        }
    });
};



function openTaskInput() {
    if (inputTask) {
        inputTask.focus();
    } else {
        let imgAdd;
        divOpenInput = document.createElement('div');
        inputTask = document.createElement('input');
        imgAdd = document.createElement('img');
        divOpenInput.className = 'jedanRed';
        inputTask.value = '';
        imgAdd.className = 'icons add';
        imgAdd.src = 'icons/add.svg';
        ul.appendChild(divOpenInput);
        divOpenInput.appendChild(inputTask);
        divOpenInput.appendChild(imgAdd);
        inputTask.focus();


        inputTask.addEventListener('keypress', function () {
            if (event.keyCode === 13) {
                postNewTaskToDatabase();
            }
        });
        imgAdd.addEventListener('click', postNewTaskToDatabase);
        inputTask.addEventListener('focusout', function () {
            if (inputTask.value === '') {
                divOpenInput.remove();
                inputTask.remove();
                inputTask = undefined;
            }
        });
    }
}

function deleteAllTasksFromDatabase() {
    const dbRef = ref(db, 'tasks');
    remove(dbRef);
}

function deleteElementFromDatabase(elem) {
    if (elem.target.className === 'icons imgDelete') {



        const dbRef = ref(
            db,
            'tasks/' + elem.target.parentElement.id
        );
        remove(dbRef);
    }
}

function crossOutElementInDatabase(elem) {
    if (elem.target.className === 'instanca') {
        if (elem.target.parentElement.id != '')
            update(
                ref(db, 'tasks/' + elem.target.parentElement.id),
                {
                    zavrseno: true,
                }
            );
    } else {
        if (elem.target.parentElement.id != '')
            update(
                ref(db, 'tasks/' + elem.target.parentElement.id),
                {
                    zavrseno: false,
                }
            );
    }
}

function postNewTaskToDatabase() {
    if (inputTask.value != '') {
        const postTasksRef = ref(db, 'tasks');
        const newTasksRef = push(postTasksRef);

        set(newTasksRef, {
            naziv: inputTask.value,
            zavrseno: false,
        });
        inputTask.remove();
        inputTask = undefined;
        divOpenInput.remove();
        addNewTask.focus();
    } else {
        alert('Unesite vrijednost!');
        addNewTask.focus();
    }
}

const fetchRealtimeDataFromDatabase = () => {
    const dbRef = ref(db, 'tasks');

    onValue(dbRef, (snapshot) => {
        const dataFromDatabase = snapshot.val();
        let allTasks = [];

        var allExistingTasks =
            document.getElementsByClassName('instanca');

        Array.from(allExistingTasks).forEach((child) => {
            child.parentElement.remove();
            totalTaskNumber = 0;
            remainingTaskNumber = 0;
            totalTasks.innerHTML =
                'Total number of tasks: ' + totalTaskNumber;
            remainingTasks.innerHTML =
                'Number of unfinished tasks: ' + remainingTaskNumber;
        });

        if (dataFromDatabase != null && dataFromDatabase != undefined)
            for (const [key, value] of Object.entries(dataFromDatabase)) {

                totalTaskNumber++;
                if (value.zavrseno == false)
                    remainingTaskNumber++;
                let newValue = {
                    ...value,
                    id: key,
                };

                allTasks.push(newValue);
            }

        if (totalTaskNumber === 0) {
            hideDeleteAllIcon();
        }
        else if (totalTaskNumber > 0)
            showDeleteAllIcon();

        populateTasksInDOM(allTasks);

    });
};



ul.addEventListener('click', handleUlClick);
window.onload = fetchRealtimeDataFromDatabase;
addNewTask.addEventListener('click', openTaskInput);
deleteAll.addEventListener('click', deleteAllTasksFromDatabase);