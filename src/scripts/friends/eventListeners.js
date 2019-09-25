import API from "./../dataAPI.js";

const friendsObject = {
    // hiddenId: "",
    friendsListeners: () => {
        document.querySelector("#btnFriends").addEventListener("click", event => {
            friendsObject.refresh();
        })
        // mainContainer.addEventListener("click", () => {
        //     taskObject.editOrDelete();
        // })
    },
    displayModal: () => {
        document.querySelector("#requestsModal").style.display = "block";

        document.querySelector("#btnCloseRequests").addEventListener("click", event => {
            document.querySelector("#requestsModal").style.display = "none";
            document.querySelector("#requestsContainer").innerHTML = ""
        })
        document.querySelector("#requestsModal").addEventListener("click", event => {
            // taskObject.postJSON();
            console.log("you clicked request modal")
            if (event.target.id.startsWith("requestReject-")) {
                const requestId = event.target.id.split("-")[1]
                const confirmReject = confirm("Do you want to reject this request?")
                if (confirmReject) {
                    API.deleteByID("requests", requestId)
                        .then(response => API.searchGetExpand("requests", "receiverId", sessionStorage.activeUser, "user"))
                        .then(response => friendsObject.requestsLoop(response))
                }
            }
            else if (event.target.id.startsWith("requestAccept-")) {
                const confirmAccept = confirm("Do you want to accept this friend request?")
                if (confirmAccept) {
                    const requestId = event.target.id.split("-")[1]
                    const userId = event.target.id.split("-")[2]
                    console.log("you accepted request")
                    // friendsObject.addFriendship(userId)
                    // friendsObject.addFriendship(userId)
                    API.saveAnything(friendsObject.jsonObject(userId), "friendships").then(response =>
                        API.saveAnything(friendsObject.switchedJsonObject(userId), "friendships")).then(response =>
                            API.deleteByID("requests", requestId)).then(response =>
                                API.searchGetExpand("requests", "receiverId", sessionStorage.activeUser, "user"))
                        .then(response => friendsObject.requestsLoop(response))
                }
                // taskObject.displayModal();
                // API.getByID("tasks", event.target.id.split("-")[1])
                //     .then(response => {
                //         taskObject.hiddenId = `${response.id}`
                //         document.querySelector("#btnTasksSave").innerHTML = "SAVE TASK";
                //         document.querySelector("#taskTitle").value = response.taskName
                //         document.querySelector("#taskDetails").value = response.taskDescription
                //         document.querySelector("#taskDate").value = response.dueDate
                //     })

                event.stopPropagation()
            }
        })
    },
    // addFriendship: (id) => {
    //     API.saveAnything(friendsObject.jsonObject(id), "friendships")
    // },
    jsonObject: (id) => {
        let compoundId = `${sessionStorage.activeUser}-${id}`
        return {
            initiatorId: sessionStorage.activeUser,
            userId: id,
            compound: compoundId
        }
    },
    switchedJsonObject: (id) => {
        let compoundId = `${sessionStorage.activeUser}-${id}`
        return {
            initiatorId: id,
            userId: sessionStorage.activeUser,
            compound: compoundId
        }
    },
    refresh: () => {
        let mainContainer = document.querySelector("#mainContainer")
        mainContainer.innerHTML = ""
        mainContainer.innerHTML += friendsObject.requestsModalComponent();
        document.querySelector("#addButtonContainer").innerHTML = '<input id="seeRequests" type="submit" value="Friend Requests"></input>'
        document.querySelector("#seeRequests").addEventListener("click", event => {
            friendsObject.displayModal();
            document.querySelector("#requestsContainer").innerHTML = ""
            API.searchGetExpand("requests", "receiverId", sessionStorage.activeUser, "user")
                .then(response => friendsObject.requestsLoop(response));
            // taskObject.hiddenId = ""
        })
        // API.searchGet("tasks", "userId", sessionStorage.activeUser)
        //     .then(response => taskObject.taskLoop(response));
    },
    // editOrDelete: () => {
    //     if (event.target.id.startsWith("taskDelete")) {
    //         const targetID = event.target.id.split("-")[1]
    //         const confirmDelete = confirm("Do you want to delete this task?")
    //         if (confirmDelete) {
    //             API.deleteByID("tasks", targetID)
    //                 .then(response => taskObject.taskRefresh());
    //         }
    //     } else if (event.target.id.startsWith("taskEdit")) {
    //         taskObject.displayModal();
    //         API.getByID("tasks", event.target.id.split("-")[1])
    //             .then(response => {
    //                 taskObject.hiddenId = `${response.id}`
    //                 document.querySelector("#btnTasksSave").innerHTML = "SAVE TASK";
    //                 document.querySelector("#taskTitle").value = response.taskName
    //                 document.querySelector("#taskDetails").value = response.taskDescription
    //                 document.querySelector("#taskDate").value = response.dueDate
    //             })
    //     }
    //     event.stopPropagation()
    // },
    requestsModalComponent: () => {
        return `
            <div id="requestsModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span id="btnCloseRequests">&times;</span>
                        <h2>Friend Requests</h2>
                    </div>
                    <div class="modal-body">
                        <div id="requestsContainer"class="flex-container">
                            <p>friend requests</p>
                        </div>
                    </div>
                </div>
            </div> 
            `
    },
    // taskComponent: (task) => {
    //     return `<div>
    //         <h2>title:  ${task.taskName}</h2>
    //         <h3>description: ${task.taskDescription}</h3>
    //         <h3>date: ${task.dueDate}</h3>
    //         <button id="taskEdit-${task.id}">Edit</button>
    //         <button id="taskDelete-${task.id}">Delete</button>
    //     </div>`
    // },
    requestComponent: (object) => {
        return `<div>
            <h3>${object.user.firstName} ${object.user.lastName} (${object.user.userName}) wants to be friends!</h3>
            <button id="requestAccept-${object.id}-${object.user.id}">Accept</button>
            <button id="requestReject-${object.id}">Reject</button>
        </div>`
    },
    requestsLoop: (requestsArray) => {
        document.querySelector("#requestsContainer").innerHTML = ""
        const arrayOfRequests = [...requestsArray]
        const sortedRequests = arrayOfRequests.sort((yeahhh, boiii) => boiii.id - yeahhh.id)
        sortedRequests.forEach(request => {
            console.log(request)
            document.querySelector("#requestsContainer").innerHTML += friendsObject.requestComponent(request)
        });
    },
    // taskLoop: (taskArray) => {
    //     const arrayOfTasks = [...taskArray]
    //     const sortedTasks = arrayOfTasks.sort((yeahhh, boiii) => boiii.id - yeahhh.id)
    //     sortedTasks.forEach(task => {
    //         document.querySelector("#mainContainer").innerHTML += taskObject.taskComponent(task)
    //     });
    // },
    // jsonObject: (title, details, date) => {
    //     return {
    //         userId: sessionStorage.activeUser,
    //         taskName: title,
    //         taskDescription: details,
    //         dueDate: date,
    //         isComplete: "no"
    //     }
    // },
    // postJSON: () => {
    //     let title = document.querySelector("#taskTitle").value
    //     let deets = document.querySelector("#taskDetails").value
    //     let date = document.querySelector("#taskDate").value
    //     if (taskObject.hiddenId === "") {
    //     API.saveAnything(taskObject.jsonObject(title, deets, date), "tasks")
    //         .then(response => taskObject.taskRefresh());
    //     }
    //     else {
    //         API.putByID("tasks", taskObject.hiddenId, taskObject.jsonObject(title, deets, date))
    //             .then(response => taskObject.taskRefresh());
    //     }
    // }
}


export default friendsObject