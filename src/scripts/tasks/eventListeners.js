import API from "./../dataAPI.js";

const taskObject = {
    connected: () => {
        console.log("the paggggeeee issss connnasctteddd")
    },
    taskNav: () => {
        document.querySelector("#btnDailyTasks").addEventListener("click", event => {
            taskObject.taskRefresh();
            // console.log("you clllickkedd")
            // let mainContainer = document.querySelector("#mainContainer")
            // mainContainer.innerHTML = ""
            // mainContainer.innerHTML += taskObject.taskModalComponent();
            // document.querySelector("#addContainer").innerHTML = ' Heyyyy daily Tasks <button type="button" id="addTask">Add Task</button> '
            // document.querySelector("#addTask").addEventListener("click", event => {
            //     document.querySelector("#tasksModal").style.display = "block";
            //     document.querySelector("#btnCloseTasks").addEventListener("click", event => {
            //         document.querySelector("#tasksModal").style.display = "none";
            //     })
            //     document.querySelector("#btnTasksSave").addEventListener("click", event => {
            //         taskObject.postJSON();
            //     })
            // })
            // console.log(sessionStorage.activeUser);
            // API.searchGet("tasks", "userId", sessionStorage.activeUser)
            //     .then(response => taskObject.taskLoop(response));
        })
    },
    taskRefresh: () => {
            let mainContainer = document.querySelector("#mainContainer")
            mainContainer.innerHTML = ""
            mainContainer.innerHTML += taskObject.taskModalComponent();
            document.querySelector("#addContainer").innerHTML = ' Heyyyy daily Tasks <button type="button" id="addTask">Add Task</button> '
            document.querySelector("#addTask").addEventListener("click", event => {
                document.querySelector("#tasksModal").style.display = "block";
                document.querySelector("#btnCloseTasks").addEventListener("click", event => {
                    document.querySelector("#tasksModal").style.display = "none";
                })
                document.querySelector("#btnTasksSave").addEventListener("click", event => {
                    taskObject.postJSON();
                })
            })
            console.log(sessionStorage.activeUser);
            API.searchGet("tasks", "userId", sessionStorage.activeUser)
                .then(response => taskObject.taskLoop(response));
    },

    taskModalComponent: () => {
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
                            <input class="flex-input" type="date" id="taskDate">
                        </div>
                        <button id="btnTasksSave">Submit</button>
                    </div>
                </div>
            </div> 
            `
    },
    connected: () => {
        console.log("the paggggeeee issss connnasctteddd")
    },
    taskComponent: (task) => {
        return `<div>
            <h1>title  ${task.taskName}</h1>
            <p>date ${task.dueDate}</p>
        </div>`
    },
    taskLoop: (taskArray) => {
        taskArray.forEach(task => {
            document.querySelector("#mainContainer").innerHTML += taskObject.taskComponent(task)
            console.log(taskObject.taskComponent(task));
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
        API.saveAnything(taskObject.jsonObject(title, deets, date), "tasks")
            .then(taskObject.taskRefresh());

    }
}




export default taskObject