import API from "./../dataAPI.js";

const taskObject = {
    connected: () => {
        console.log("the paggggeeee issss connnasctteddd")
    },
    taskNav: () => {
        document.querySelector("#btnDailyTasks").addEventListener("click", event => {
            console.log("you clllickkedd")
            let mainContainer = document.querySelector("#mainContainer")
            mainContainer.innerHTML = ""
            mainContainer.innerHTML += taskObject.taskModalComponent();
            mainContainer.innerHTML += ' Heyyyy daily Tasks <button type="button" id="addTask">Add Task</button>'
            document.querySelector("#addTask").addEventListener("click", event => {
                document.querySelector("#tasksModal").style.display = "block";
            })
            document.querySelector("#btnCloseTasks").addEventListener("click", event => {
                document.querySelector("#tasksModal").style.display = "none";
            })
            console.log(sessionStorage.activeUser);
            API.searchGet("tasks", "userId", sessionStorage.activeUser)
                .then (response => console.log(response));
        })
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
                        </div>
                        <button id="btnNewsSave">Submit</button>
                    </div>
                </div>
            </div> 
            `
    },
    connected: () => {
        console.log("the paggggeeee issss connnasctteddd")
    }
}

export default taskObject