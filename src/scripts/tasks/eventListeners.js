import API from "./../dataAPI.js";

const taskObject = {
    hiddenId: "",
    taskListeners: () => {
        document.querySelector("#btnDailyTasks").addEventListener("click", event => {
            taskObject.taskRefresh();
        })
        mainContainer.addEventListener("click", () => {
            taskObject.editOrDelete();
        })
    },
    displayModal: () => {
        document.querySelector("#tasksModal").style.display = "block";
        document.querySelector("#btnCloseTasks").addEventListener("click", event => {
            document.querySelector("#tasksModal").style.display = "none";
            document.querySelector("#taskTitle").value = ""
            document.querySelector("#taskDetails").value = ""
            document.querySelector("#taskDate").value = ""
        })
        document.querySelector("#btnTasksSave").addEventListener("click", event => {
                taskObject.postJSON();
        })
    },
    taskRefresh: () => {
        let mainContainer = document.querySelector("#mainContainer")
        mainContainer.innerHTML = ""
        mainContainer.innerHTML += taskObject.taskModalComponent();
        document.querySelector("#addButtonContainer").innerHTML = ' Heyyyy daily Tasks <button type="button" id="addTask">Add Task</button> '
        document.querySelector("#addTask").addEventListener("click", event => {
            taskObject.displayModal();
            taskObject.hiddenId = ""
        })
        API.searchGet("tasks", "userId", sessionStorage.activeUser)
            .then(response => taskObject.taskLoop(response));
    },
    editOrDelete: () => {
        if (event.target.id.startsWith("taskDelete")) {
            const targetID = event.target.id.split("-")[1]
            const confirmDelete = confirm("Do you want to delete this task?")
            if (confirmDelete) {
                API.deleteByID("tasks", targetID)
                    .then(response => taskObject.taskRefresh());
            }
        } else if (event.target.id.startsWith("taskEdit")) {
            taskObject.displayModal();
            API.getByID("tasks", event.target.id.split("-")[1])
                .then(response => {
                    taskObject.hiddenId = `${response.id}`
                    document.querySelector("#btnTasksSave").innerHTML = "SAVE TASK";
                    document.querySelector("#taskTitle").value = response.taskName
                    document.querySelector("#taskDetails").value = response.taskDescription
                    document.querySelector("#taskDate").value = response.dueDate
                })
        }
        event.stopPropagation()
    },
    taskModalComponent: () => {
        return `
            <section id="tasksContainer"></section>
            <div id="tasksModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="closeModal" id="btnCloseTasks">&times;</span>
                        <h2>Task Item</h2>
                    </div>
                    <div class="modal-body">
                        <div class="flex-container">
                            <input class="flex-input" type="text" placeholder=" Title" id="taskTitle">
                            <input class="flex-input" type="text" placeholder="Write a task..." id="taskDetails">
                            <input class="flex-input" type="date" id="taskDate">
                        </div>
                        <button class="submit" id="btnTasksSave">Submit</button>
                    </div>
                </div>
            </div> 
            ` 
    },
    taskComponent: (task) => {
        return `<div>
            <h2>title:  ${task.taskName}</h2>
            <h3>description: ${task.taskDescription}</h3>
            <h3>date: ${task.dueDate}</h3>
            <button id="taskEdit-${task.id}">Edit</button>
            <button id="taskDelete-${task.id}">Delete</button>
        </div>`
    },
    taskLoop: (taskArray) => {
        const arrayOfTasks = [...taskArray]
        const sortedTasks = arrayOfTasks.sort((yeahhh, boiii) => boiii.id - yeahhh.id)
        sortedTasks.forEach(task => {
            document.querySelector("#mainContainer").innerHTML += taskObject.taskComponent(task)
        });
    },
    jsonObject: (title, details, date) => {
        return {
            userId: sessionStorage.activeUser,
            taskName: title,
            taskDescription: details,
            dueDate: date,
            isComplete: "no"
        }
    },
    postJSON: () => {
        let title = document.querySelector("#taskTitle").value
        let deets = document.querySelector("#taskDetails").value
        let date = document.querySelector("#taskDate").value
        if (taskObject.hiddenId === "") {
        API.saveAnything(taskObject.jsonObject(title, deets, date), "tasks")
            .then(response => taskObject.taskRefresh());
        }
        else {
            API.putByID("tasks", taskObject.hiddenId, taskObject.jsonObject(title, deets, date))
                .then(response => taskObject.taskRefresh());
        }
    }
}


export default taskObject