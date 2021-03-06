import API from "./../dataAPI.js";

const friendsObject = {
    friendsListeners: () => {
        document.querySelector("#btnFriends").addEventListener("click", event => {
            friendsObject.refresh();
            friendsObject.populateFriends();
        })
        mainContainer.addEventListener("click", () => {
            console.log("you clicked main")
            if (event.target.id.startsWith("removeFriend--")) {
                const compoundId = event.target.id.split("--")[1]
                const confirmUnfriend = confirm("Do you want to cut this person out of your life?")
                if (confirmUnfriend) {
                    console.log(compoundId)
                    API.searchGet("friendships", "compound", compoundId)
                        .then(response => friendsObject.deleteBothFriendships(response))
                    // .then(response => API.searchGetExpand("requests", "receiverId", sessionStorage.activeUser, "user"))
                    // .then(response => friendsObject.requestsLoop(response))
                }
            }
        })
    },
    deleteBothFriendships: (array) => {
        console.log("yey", array)
        array.forEach(friendship => {
            API.deleteByID("friendships", friendship.id)
                .then(response => friendsObject.refresh())
                .then(response => friendsObject.populateFriends())
            console.log(friendship.id)
        });
    },
    displayModal: () => {
        document.querySelector("#requestsModal").style.display = "block";

        document.querySelector("#btnCloseRequests").addEventListener("click", event => {
            document.querySelector("#requestsModal").style.display = "none";
            document.querySelector("#requestsContainer").innerHTML = ""
        })
        document.querySelector("#requestsModal").addEventListener("click", event => {
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
                    API.saveAnything(friendsObject.jsonObject(userId), "friendships").then(response =>
                        API.saveAnything(friendsObject.switchedJsonObject(userId), "friendships")).then(response =>
                            API.deleteByID("requests", requestId)).then(response =>
                                API.searchGetExpand("requests", "receiverId", sessionStorage.activeUser, "user"))
                        .then(response => friendsObject.requestsLoop(response))
                        .then(response => friendsObject.refresh())
                        .then(response => friendsObject.populateFriends())
                }
                event.stopPropagation()
            }
        })
    },
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
        document.querySelector("#addButtonContainer").innerHTML = "<input class='submit' id='seeRequests' type='submit' value='Friend Requests'></input>"
        document.querySelector("#seeRequests").addEventListener("click", event => {
            friendsObject.displayModal();
            document.querySelector("#requestsContainer").innerHTML = ""
            API.searchGetExpand("requests", "receiverId", sessionStorage.activeUser, "user")
                .then(response => friendsObject.requestsLoop(response))
        })

    },
    populateFriends: () => {
        API.searchGetExpand("friendships", "initiatorId", sessionStorage.activeUser, "user")
            .then(response => friendsObject.friendsLoop(response))
    },
    requestsModalComponent: () => {
        return `
            <div id="requestsModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="closeModal "id="btnCloseRequests">&times;</span>
                        <h2 class="requestModalHeader">Friend Requests</h2>
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
    requestComponent: (object) => {
        return `<div>
            <h3>${object.user.firstName} ${object.user.lastName} (${object.user.userName}) wants to be friends!</h3>
            <button class="submit" id="requestAccept-${object.id}-${object.user.id}">Accept</button>
            <button class="submit" id="requestReject-${object.id}">Reject</button>
        </div>`
    },
    friendComponent: (object) => {
        return `<div>
            <h3>${object.user.firstName} ${object.user.lastName} (${object.user.userName}) is your friend</h3>
            <button class="submit" id="removeFriend--${object.compound}">End Friendship</button>
            <hr>
            </div>`
    },
    requestsLoop: (requestsArray) => {
        document.querySelector("#requestsContainer").innerHTML = ""
        const arrayOfRequests = [...requestsArray]
        const sortedRequests = arrayOfRequests.sort((yeahhh, boiii) => boiii.id - yeahhh.id)
        sortedRequests.forEach(request => {
            // console.log(request)
            document.querySelector("#requestsContainer").innerHTML += friendsObject.requestComponent(request)
        });
    },
    friendsLoop: (friendsArray) => {
        friendsObject.refresh()
        const arrayOfFriends = [...friendsArray]
        const sortedFriends = arrayOfFriends.sort((yeahhh, boiii) => boiii.id - yeahhh.id)
        sortedFriends.forEach(friend => {
            // console.log(friend)
            document.querySelector("#mainContainer").innerHTML += friendsObject.friendComponent(friend)
        });
    },
}


export default friendsObject