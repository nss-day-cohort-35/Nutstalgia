import API from "./../dataAPI.js";

const friendsObject = {
    // listeners to be called on main.js
    friendsListeners: () => {
        // click friends in navbar
        document.querySelector("#btnFriends").addEventListener("click", event => {
            friendsObject.refresh();
            friendsObject.populateFriends();
        })
        // remove friend buttons
        mainContainer.addEventListener("click", () => {
            console.log("you clicked main")
            if (event.target.id.startsWith("removeFriend--")) {
                const compoundId = event.target.id.split("--")[1]
                const confirmUnfriend = confirm("Do you want to cut this person out of your life?")
                if (confirmUnfriend) {
                    console.log(compoundId)
                    // fetch both friendships that share a compound ID
                    API.searchGet("friendships", "compound", compoundId)
                        .then(response => friendsObject.deleteBothFriendships(response))
                }
            }
        })
    },
    // loops through both friendships that share a compund ID and deletes both
    deleteBothFriendships: (array) => {
        console.log("yey", array)
        array.forEach(friendship => {
            API.deleteByID("friendships", friendship.id)
                .then(response => friendsObject.refresh())
                .then(response => friendsObject.populateFriends())
            console.log(friendship.id)
        });
    },
    // see friend requests
    displayModal: () => {
        document.querySelector("#requestsModal").style.display = "block";
        // add listener to close modal
        document.querySelector("#btnCloseRequests").addEventListener("click", event => {
            document.querySelector("#requestsModal").style.display = "none";
            document.querySelector("#requestsContainer").innerHTML = ""
        })
        // listener on requests modal for reject or accept
        document.querySelector("#requestsModal").addEventListener("click", event => {
            console.log("you clicked request modal")
            // reject
            if (event.target.id.startsWith("requestReject-")) {
                const requestId = event.target.id.split("-")[1]
                const confirmReject = confirm("Do you want to reject this request?")
                if (confirmReject) {
                    API.deleteByID("requests", requestId)
                        .then(response => API.searchGetExpand("requests", "receiverId", sessionStorage.activeUser, "user"))
                        .then(response => friendsObject.requestsLoop(response))
                }
            }
            // accept
            else if (event.target.id.startsWith("requestAccept-")) {
                const confirmAccept = confirm("Do you want to accept this friend request?")
                if (confirmAccept) {
                    const requestId = event.target.id.split("-")[1]
                    const userId = event.target.id.split("-")[2]
                    console.log("you accepted request")
                    // save the friendship
                    API.saveAnything(friendsObject.jsonObject(userId), "friendships").then(response =>
                        // save the twin of the friendship with swapped intitiatorId and userId
                        API.saveAnything(friendsObject.switchedJsonObject(userId), "friendships")).then(response =>
                            // delete the friend request
                            API.deleteByID("requests", requestId)).then(response =>
                                // refresh the friend requests in the modal
                                API.searchGetExpand("requests", "receiverId", sessionStorage.activeUser, "user"))
                        .then(response => friendsObject.requestsRefresh(response))
                }
                event.stopPropagation()
            }
        })
    },

    requestsRefresh: (response) => {
        friendsObject.requestsLoop(response)
        document.querySelector("#requestsModal").style.display = "none";
        mainContainer.innerHTML = ""
        friendsObject.populateFriends()
    },
    // friendship object
    jsonObject: (id) => {
        // the compound id is the same on both twins, so they can be targeted and deleted together
        let compoundId = `${sessionStorage.activeUser}-${id}`
        return {
            initiatorId: sessionStorage.activeUser,
            userId: id,
            compound: compoundId
        }
    },
    // friendship twin with swapped userId and initiatorId
    switchedJsonObject: (id) => {
        // the compound id is the same on both twins, so they can be targeted and deleted together
        let compoundId = `${sessionStorage.activeUser}-${id}`
        return {
            initiatorId: id,
            userId: sessionStorage.activeUser,
            compound: compoundId
        }
    },
    // refresh main container
    refresh: () => {
        let mainContainer = document.querySelector("#mainContainer")
        mainContainer.innerHTML = ""
        mainContainer.innerHTML += friendsObject.requestsModalComponent();
        document.querySelector("#addButtonContainer").innerHTML = '<input id="seeRequests" type="submit" value="Friend Requests"></input>'
        // put the listener on the see friend requests button
        document.querySelector("#seeRequests").addEventListener("click", event => {
            friendsObject.displayModal();
            document.querySelector("#requestsContainer").innerHTML = ""
            // populate the modal with requests
            API.searchGetExpand("requests", "receiverId", sessionStorage.activeUser, "user")
                .then(response => friendsObject.requestsLoop(response))
        })

    },
    // get friends array and send to foreach loop
    populateFriends: () => {
        API.searchGetExpand("friendships", "initiatorId", sessionStorage.activeUser, "user")
            .then(response => friendsObject.friendsLoop(response))
    },
    // modal HTML
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
    // HTML for single request to be displayed in modal
    requestComponent: (object) => {
        return `<div>
            <h3>${object.user.firstName} ${object.user.lastName} (${object.user.userName}) wants to be friends!</h3>
            <button class="submit" id="requestAccept-${object.id}-${object.user.id}">Accept</button>
            <button class="submit" id="requestReject-${object.id}">Reject</button>
        </div>`
    },
    // HTML for single friend to be displayed in main container
    friendComponent: (object) => {
        return `<div>
            <h3>${object.user.firstName} ${object.user.lastName} (${object.user.userName}) is your friend</h3>
            <button id="removeFriend--${object.compound}">End Friendship</button>
        </div>`
    },
    // loops through array and displays in requests modal
    requestsLoop: (requestsArray) => {
        document.querySelector("#requestsContainer").innerHTML = ""
        const arrayOfRequests = [...requestsArray]
        const sortedRequests = arrayOfRequests.sort((yeahhh, boiii) => boiii.id - yeahhh.id)
        sortedRequests.forEach(request => {
            // console.log(request)
            document.querySelector("#requestsContainer").innerHTML += friendsObject.requestComponent(request)
        });
    },
    // loops through array and displays in main container
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