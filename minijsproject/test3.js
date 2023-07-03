const todoform = document.getElementById("todo-form");
const inputtodoform = document.getElementById("newtodo");
const listgroupfirst = document.querySelectorAll(".list-group")[0];
const firstcardbody = document.querySelectorAll(".card-body")[0];
const secondcardbody = document.querySelectorAll(".card-body")[1];
const listgroupsecond = document.querySelectorAll(".list-group")[1];
const thirdcardbody = document.querySelectorAll(".card-body")[2];
const filterinput = document.getElementById("filtertodo");

//console.log(todoform,inputtodoform,listgroupfirst,secondcardbody,listgroupsecond);

eventListeners();

function filter(e){
    //console.log(filterinput.value);
    const text = filterinput.value;
    const allchild = listgroupfirst.children;
    //console.log(allchild);
    for(let i = 0; i < allchild.length ; i++){
        if(allchild[i].textContent.indexOf(text) === -1){
            allchild[i].setAttribute("style","display: none !important");
        }
        else{
            allchild[i].setAttribute("style","display: block");
        }
    }
}

function clearalltrash(e){
    if(e.target.id === "cleartrash"){
        //console.log(e.target);
        while(listgroupsecond.firstChild != null){
            listgroupsecond.removeChild(listgroupsecond.firstChild);
        }
        localStorage.removeItem("trash");
    }
}

function cleartodoslist(e){
    if(e.target.id === "clearall"){
        //console.log(e);
        const todosstorage = gettodosfromlocalstorage();
        for(let i = 0; i< todosstorage.length ; i++){
            deletetodofromstorage(todosstorage[i]);
        }
        localStorage.removeItem("todos");
        while(listgroupfirst.firstElementChild != null){
            addtotrash(listgroupfirst.firstElementChild.textContent);
            listgroupfirst.removeChild(listgroupfirst.firstElementChild);
        }
    }
}

function restorealltrash(e){
    //const htmltodos = document.querySelectorAll("#torestore");
    //console.log(e.target);
    if(e.target.id === "restorealltrash" ){
        //console.log(e);
        const trashtodos = gettrashfromlocalstorage();
        for(let i = 0 ; i < trashtodos.length ; i++){
            addtodotolist(trashtodos[i]);
            addtodotolocalstorage(trashtodos[i]);
            deletetodofromtrash(trashtodos[i]);
        }
        while(listgroupsecond.firstElementChild != null){
            listgroupsecond.removeChild(listgroupsecond.firstElementChild);
        }
        localStorage.removeItem("trash");
    }
}

function deletetodofromtrash(text){
    const res = [];
    const todos = gettrashfromlocalstorage();
    for(let i = 0 ; i < todos.length ; i++){
        if(todos[i] === text)
            continue;
        res.push(todos[i]);
    }
    localStorage.setItem("trash",JSON.stringify(res));
}

function restoretodo(e){
    const todos = gettodosfromlocalstorage();
    const trash = gettrashfromlocalstorage();
    //console.log(e.target);
    if(e.target.className === "fa-solid fa-upload"){
        //console.log(e.target);
        //console.log(e.target.parentElement.parentElement.textContent);
        addtodotolist(e.target.parentElement.parentElement.textContent);
        addtodotolocalstorage(e.target.parentElement.parentElement.textContent);
        deletetodofromtrash(e.target.parentElement.parentElement.textContent);
        e.target.parentElement.parentElement.remove();
    }
}

function gettrashfromlocalstorage(){
    const todos = localStorage.getItem("trash");
    if(todos === null){
        return [];
    }
    return JSON.parse(todos);
}

function loadalltodosfromstorage(e){
    // console.log(e.target);
    const todos = gettodosfromlocalstorage();
    const trashtodos = gettrashfromlocalstorage();
    //console.log(todos);
    for(let i = 0; i<todos.length; i++ ){
        addtodotolist(todos[i]);
    }
    for(let i = 0; i<trashtodos.length; i++){
        addtotrash(trashtodos[i]);
    }
}

function deletetodofromstorage(text){
    const res = [];
    const alltodos = gettodosfromlocalstorage();
    const trashalltodos =  gettrashfromlocalstorage();
    trashalltodos.push(text);
    //console.log(trashalltodos);
    for(let i = 0 ; i< alltodos.length ; i++){
        if(text === alltodos[i])
            continue;
        res.push(alltodos[i]);
    }
    localStorage.setItem("todos",JSON.stringify(res));
    localStorage.setItem("trash",JSON.stringify(trashalltodos));
}



function deletetodo(e){
    //console.log(e.target);
    if(e.target.className == "fa-solid fa-delete-left"){
        addtotrash(e.target.parentElement.parentElement.textContent);
        //console.log(e.target.parentElement.parentElement.textContent);
        deletetodofromstorage(e.target.parentElement.parentElement.textContent);
        e.target.parentElement.parentElement.remove();
    }
}

function addtotrash(text){
    const newtext = document.createTextNode(text);
    const newi = document.createElement("i");
    const newa = document.createElement("a");
    const newli = document.createElement("li");
    newi.className =  "fa-solid fa-upload";
    newa.id = "torestore";
    newa.href = "#";
    newli.className = "list-group-item d-flex justify-content-between";
    newa.appendChild(newi);
    newli.appendChild(newtext);
    newli.appendChild(newa);
    listgroupsecond.appendChild(newli);
    //console.log(newli);
}

function addtodotolist(text){
    const newtext = document.createTextNode(text);
    const newi = document.createElement("i");
    const newa = document.createElement("a");
    const newli = document.createElement("li");
    newi.className = "fa-solid fa-delete-left";
    newi.setAttribute("style","color: #ff004c");
    newa.id = "todelete";
    newa.href = "#";
    newli.className = "list-group-item d-flex justify-content-between";
    newa.appendChild(newi);
    newli.appendChild(newtext);
    newli.appendChild(newa);
    listgroupfirst.appendChild(newli);
}

function gettodosfromlocalstorage(){
    const todoslist = localStorage.getItem("todos");
    if(todoslist === null){
        return [];
    }
    return JSON.parse(todoslist);
}


function addtodotolocalstorage(text){
    const todoslist = gettodosfromlocalstorage();
    todoslist.push(text);
    localStorage.setItem("todos", JSON.stringify(todoslist));
}



function showalert(type,message){
    const newtext = document.createTextNode(message);
    const newdiv = document.createElement("div");
    newdiv.className=`alert alert-${type}`;
    newdiv.appendChild(newtext);
    firstcardbody.appendChild(newdiv);
    setTimeout(function(){newdiv.remove();},2000);
}

function addtodotoui(e){
    // console.log(e);
    // console.log(inputtodoform.value);
    const newtext = inputtodoform.value.trim();
    if(newtext=== ""){
        showalert("danger","Enter a ToDo!");
    }
    else{
        addtodotolist(newtext);
        addtodotolocalstorage(newtext);
        showalert("info","ToDo has been added!");
        inputtodoform.value="";
        e.preventDefault();   
    }
}

function eventListeners(){
    todoform.addEventListener("submit",addtodotoui);
    document.addEventListener("DOMContentLoaded",loadalltodosfromstorage);
    listgroupfirst.addEventListener("click",deletetodo);
    listgroupsecond.addEventListener("click",restoretodo);
    thirdcardbody.addEventListener("click",restorealltrash);
    secondcardbody.addEventListener("click",cleartodoslist);
    thirdcardbody.addEventListener("click",clearalltrash);
    filterinput.addEventListener("keydown",filter);
}