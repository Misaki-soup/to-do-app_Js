'use strict'

let taskList = document.getElementById("taskList");
let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
const list = [];


window.onload = function loadLocal(){
    let tasks = localStorage.getItem('1')
    if (tasks === null) {
        return;
    } else {
        list.push(...JSON.parse(tasks))
        for(let i = 0; i<list.length; i++){
            let task = list.at(i)
            createTask(task)
    }
    }
}

addBtn.addEventListener("click", function() {
    let text = input.value;
    

    if (text === "") return; // ignore empty input
    list.push(text);
    saveToLocal(list);
    createTask(text);

    

    input.value = "";
});


function saveToLocal(data){
        localStorage.setItem('1',JSON.stringify(data))
        console.log (localStorage)
}

function createTask(text){
    let li = document.createElement("li");
    li.textContent = text+' ';

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function() {
        li.remove();

    });
    li.appendChild(deleteBtn);
    taskList.appendChild(li);


}