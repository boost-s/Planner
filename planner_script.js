// Элементы для каналов
const addChannelBtnChan = document.querySelector(".addchatBtn");
const chatContainerChan = document.querySelector(".chat-container");
const todoInputChan = document.querySelector(".todo-input");
const addTaskBtnChan = document.querySelector(".input-sendbtn");
const taskContainerChan = document.querySelector(".task-container");
const mainTextChan = document.querySelector(".maintext");

// Хранилище задач по каналам
let channelsData = {
    "Істер тізімі": [] // первый канал по умолчанию
};

let currentChannelName = "Істер тізімі"; // активный канал
let channelCounter = 1; // счётчик новых каналов

// Рендер задач текущего канала
function renderChannelTasks() {
    taskContainerChan.innerHTML = "";
    channelsData[currentChannelName].forEach((task, index) => {
        // создаём блок задачи
        const taskBlock = document.createElement("div");
        taskBlock.className = "task-block";

        // чекбокс
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.done;

        // текст задачи
        const taskText = document.createElement("div");
        taskText.className = "task-text";
        taskText.innerText = task.text;

        // применяем стили если выполнена
        if (task.done) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "gray";
        }

        // кнопка удаления
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "✕";
        deleteBtn.className = "delete-btn";

        // удаление задачи
        deleteBtn.addEventListener("click", () => {
            channelsData[currentChannelName].splice(index, 1);
            renderChannelTasks();
        });

        // чекбокс изменения состояния
        checkbox.addEventListener("change", () => {
            task.done = checkbox.checked;
            renderChannelTasks();
        });

        // собираем блок
        taskBlock.appendChild(checkbox);
        taskBlock.appendChild(taskText);
        taskBlock.appendChild(deleteBtn);
        taskContainerChan.appendChild(taskBlock);
    });
}

// Добавление задачи в канал
function addChannelTask() {
    const text = todoInputChan.value.trim();
    if (!text) return;

    channelsData[currentChannelName].push({ text, done: false });
    todoInputChan.value = "";
    renderChannelTasks();
}

addTaskBtnChan.addEventListener("click", addChannelTask);
todoInputChan.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addChannelTask();
});

// Добавление нового канала
addChannelBtnChan.addEventListener("click", () => {
    channelCounter++;
    const channelName = `Канал ${channelCounter}`;
    channelsData[channelName] = [];

    const newBtnChan = document.createElement("button");
    newBtnChan.classList.add("chats");
    newBtnChan.innerHTML = `<span class="chatstext">${channelName}</span>`;

    newBtnChan.addEventListener("click", () => {
        currentChannelName = channelName;
        mainTextChan.textContent = channelName;
        renderChannelTasks();
    });

    chatContainerChan.appendChild(newBtnChan);
});

// Переключение на первый канал по умолчанию
document.querySelector(".chat1").addEventListener("click", () => {
    currentChannelName = "Істер тізімі";
    mainTextChan.textContent = "Істер тізімі";
    renderChannelTasks();
});

// Первичная отрисовка
renderChannelTasks();

