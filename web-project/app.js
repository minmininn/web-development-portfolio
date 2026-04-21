/*function addTask() {
    let input = document.getElementById("taskInput");
    let list = document.getElementById("taskList");

    if (input.value === "") return;

    let li = document.createElement("li");
    li.innerText = input.value;

    list.appendChild(li);

    input.value = "";
}
function addTask() {
    let input = document.getElementById("taskInput");
    let list = document.getElementById("taskList");

    if (input.value === "") return;

    let li = document.createElement("li");
    li.innerText = input.value;

    // 创建删除按钮
    let btn = document.createElement("button");
    btn.innerText = "Delete";
    btn.style.marginLeft = "10px";

    btn.onclick = function() {
        list.removeChild(li);
    };

    li.appendChild(btn);
    list.appendChild(li);

    input.value = "";
}
let total = 0;
let completed = 0;

function updateStats() {
    document.getElementById("stats").innerText =
        `Total: ${total} | Completed: ${completed}`;
}

function addTask() {
    let input = document.getElementById("taskInput");
    let list = document.getElementById("taskList");
    let category = document.getElementById("category");

    if (input.value === "") return;

    total++;
    updateStats();

    let li = document.createElement("li");

    li.innerText = `[${category.value}] ${input.value}`;

    // 完成按钮
    let doneBtn = document.createElement("button");
    doneBtn.innerText = "Done";
    doneBtn.onclick = function () {
        li.style.textDecoration = "line-through";
        li.style.color = "gray";
        completed++;
        updateStats();
    };

    // 删除按钮
    let delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.onclick = function () {
        list.removeChild(li);
        total--;
        updateStats();
    };

    li.appendChild(doneBtn);
    li.appendChild(delBtn);
    list.appendChild(li);

    input.value = "";
}*/
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStats() {
    let total = tasks.length;
    let completed = tasks.filter(t => t.done).length;

    document.getElementById("stats").innerText =
        `Total: ${total} | Completed: ${completed}`;
}

function render() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerText = `[${task.category}] ${task.text}`;

        if (task.done) {
            li.style.textDecoration = "line-through";
            li.style.color = "gray";
        }

        // 完成按钮
        let doneBtn = document.createElement("button");
        doneBtn.innerText = "Done";
        doneBtn.onclick = function () {
            if(!task[index].done){
            tasks[index].done = true;
            saveData();
            render();}
        };

        // 删除按钮
        let delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.onclick = function () {
            tasks.splice(index, 1);
            saveData();
            render();
        };

        li.appendChild(doneBtn);
        li.appendChild(delBtn);
        list.appendChild(li);
    });

    updateStats();
}

function addTask() {
    let input = document.getElementById("taskInput");
    let category = document.getElementById("category");

   if(input.value.trim()===""){alert("please enter a valid task");
    return;
   }

    tasks.push({
        text: input.value,
        category: category.value,
        done: false
    });

    saveData();
    render();

    input.value = "";
}

// 初始加载
render();