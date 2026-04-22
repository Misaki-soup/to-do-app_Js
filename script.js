'use strict'

let taskList = document.getElementById("taskList");
let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
const list = [];

window.onload = function loadLocal(){
    let tasks = localStorage.getItem('tasks')
    if (tasks === null) {
        return;
    } else {
        list.push(...JSON.parse(tasks))
        for(let i = 0; i<list.length; i++){
            let task = list.at(i);
            createTask(task);
    }
    }
}

addBtn.addEventListener("click", function() {
    let text = input.value;
    let task = {}
    
    if (text === "") return; // ignore empty input
    task['text'] = text;
    task['done'] = false;
    list.push(task);
    createTask(task);
    saveToLocal(list);
    
    

    input.value = "";
});


function saveToLocal(data){
        localStorage.setItem('tasks',JSON.stringify(data))
}

function createTask(task){
    let li = document.createElement("li");
    li.textContent = task['text']+' ';

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function() {
        li.remove();
        let index_removed = list.indexOf(task)
        list.splice(index_removed,1)
        saveToLocal(list)
    })

    let doneBtn = document.createElement("button");
    doneBtn.textContent = "done";
    doneBtn.addEventListener("click", function(){task['done'] = true;
        li.style.textDecorationLine='line-through'; 
        li.style.textDecorationColor = 'red';
        saveToLocal(list)
    });

    if(task['done']){
        li.style.textDecorationLine='line-through'; 
        li.style.textDecorationColor = 'red';}
    
    li.appendChild(deleteBtn);
    li.appendChild(doneBtn);
    taskList.appendChild(li);
}