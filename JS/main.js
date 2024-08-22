let elForm = document.querySelector(".todo-form");
let inputValue = document.querySelector(".todo-input");
let elTodoList = document.querySelector(".todo-list");
let elModalWrapper = document.querySelector(".modal-wrapper");
let elModalInnner = document.querySelector(".modal-inner");
let elModalContent = document.querySelector(".modal-content");

let todos = [];

elForm.addEventListener("submit", function (e){
    e.preventDefault();
    const data = {
        id : todos.length + 1,
        todoValue : inputValue.value,
        isComplated : false 
    }
    e.target.reset();
    todos.push(data);
    renderTodos(todos);
})

function renderTodos(arr){
    elTodoList.innerHTML = null;
    arr.forEach((item, index) => {
        let elTodoItem = document.createElement("li");
        elTodoItem.className = `flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm ${item.isComplated ? "opacity-60 line-through" : ""}`;
        elTodoItem.innerHTML = `
        <div class="flex items-center space-x-2">
           <span class="font-bold text-blue-500">${index + 1}</span>
           <strong class="text-gray-700">${item.todoValue}</strong>
        </div>
        <div class="flex items-center space-x-2">
            <div onclick="handleComplatedClick(${item.id})" class="w-[20px] relative h-[20px] cursor-pointer rounded-full border-2 border-gray-400 hover:bg-gray-200 transition duration-200">
                <div class="absolute inset-[2px] ${item.isComplated ? "bg-blue-500": ""} rounded-full" ></div>
            </div>
            <button id="${item.id}" onclick="handleDeleteTodo(${item.id})" type="button" class="delete-btn p-2 rounded-lg bg-red-500 text-white font-semibold border-2 border-transparent hover:bg-transparent hover:text-red-500 hover:border-red-500 transition duration-300">Delete</button>
            <button id="${item.id}" onclick="handleUptadeTodo(${item.id})" type="button" class="p-2 rounded-lg bg-blue-500 text-white font-semibold border-2 border-transparent hover:bg-transparent hover:text-blue-500 hover:border-blue-500 transition duration-300">Update</button>
        </div>
        `;
        elTodoList.appendChild(elTodoItem);
    });
}


elModalWrapper.addEventListener("click", function(e){
    if(e.target.id == "wrapper"){
        elModalWrapper.classList.add("scale-0")
    }
})


function handleComplatedClick(id){
    const findedObj = todos.find(item => item.id == id)
    findedObj.isComplated =!findedObj.isComplated
    renderTodos(todos)
}



function handleDeleteTodo(id){
    const findedIndex = todos.findIndex(item => item.id == id)
    todos.splice(findedIndex, 1)
    renderTodos(todos)
}



function handleUptadeTodo(id) {
    elModalWrapper.classList.remove("scale-0");
    const findedObj = todos.find(item => item.id == id);

    elModalContent.innerHTML = `
    <form class="w-[450px] flex items-end justify-between m-auto p-4 mt-20 rounded-lg bg-transparent shadow-lg" onsubmit="handleSave(${findedObj.id}, event)">
        <label class="w-[80%] flex flex-col">
            <span class="text-slate-500 text-[15px]">Enter your todo</span>
            <input id="update-input" value="${findedObj.todoValue}" class="p-2 mt-1 rounded-lg outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text">
        </label>
        <button class="p-2 w-[19%] rounded-lg bg-blue-500 text-white font-semibold border-2 border-transparent hover:bg-transparent hover:text-blue-500 hover:border-blue-500 transition duration-300" type="submit">Save</button>
    </form>
    `;
}


function handleSave(id, event) {
    event.preventDefault();
    let updatedValue = document.getElementById("update-input").value;
    const findedObj = todos.find(item => item.id == id);
    findedObj.todoValue = updatedValue;
    elModalWrapper.classList.add("scale-0");
    renderTodos(todos);
}



function closeBtnClick(){
    elModalWrapper.classList.add("scale-0")
}





// elTodoList.addEventListener('click', function(e) {
//     if(e.target.classList.contains('delete-btn')) {
//         const findedIndex = todos.findIndex(item => item.id == e.target.id)
//         todos.splice(findedIndex, 1)
//         renderTodos(todos)
//     }
// })
