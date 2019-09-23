import API from "./../dataAPI.js";

const taskObject = {
    connected: () => {
        console.log("the paggggeeee issss connnasctteddd")
    },
    taskNav: () => {
        document.querySelector("#btnDailyTasks").addEventListener("click", event => {
            let mainContainer = document.querySelector("#mainContainer")
            mainContainer.innerHTML = ""
            mainContainer.innerHTML += taskObject.modalComponent();
            mainContainer.innerHTML += ' Heyyyy daily Tasks <button type="button" id="addTask">Add Task</button>Heyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily TasksHeyyyy daily Tasks'
            document.querySelector("#addTask").addEventListener("click", event => {
                document.querySelector("#tasksModal").style.display = "block";
            })
            document.querySelector("#btnCloseTasks").addEventListener("click", event => {
                document.querySelector("#tasksModal").style.display = "none";
            })
            console.log(sessionStorage.activeUser);
            API.searchGet("tasks", "userId", sessionStorage.activeUser)
                .then (response => taskObject.taskLoop(response));
        })
    },
    modalComponent: () => {
        return `
            <section id="tasksContainer"></section>
            <div id="tasksModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span id="btnCloseTasks">&times;</span>
                        <h2>Task Item</h2>
                    </div>
                    <div class="modal-body">
                        <div class="flex-container">
                            <input class="flex-input" type="text" placeholder=" Title" id="taskTitle">
                            <input class="flex-input" type="text" placeholder="Write a task..." id="taskDetails">
                        </div>
                        <button id="btnNewsSave">Submit</button>
                    </div>
                </div>
            </div> 
            `
    },
    taskComponent: (task) => {
        return `<div>
            <h1>${task.taskName}</h1>
            <p>${task.dueDate}</p>
        </div>`
    },
    taskLoop:(taskArray) => {
        taskArray.forEach(task => {
            document.querySelector("#mainContainer").innerHTML += taskObject.taskComponent(task);
        });
    },
}

export default taskObject