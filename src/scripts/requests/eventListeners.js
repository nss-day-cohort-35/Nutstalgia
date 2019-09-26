import API from "./../dataAPI.js";
const requestsObject = {
    // search users that match input and send the array to user loop
    searchUsers: (event) => {
        requestsObject.clearContainers();
                let searchInput = event.target.value;
                API.getAnything("users")
                    .then(response => requestsObject.userLoop(response, searchInput))
    },
    // add listeners
    requestsListeners: () => {
        document.querySelector("#mainContainer").addEventListener("click", () => {
            requestsObject.sendRequest();
        })
        document.querySelector("#friendSearch").addEventListener("keypress", keyPressEvent => {
            /* WHEN  USER PRESSES ENTER, FIND MATCHING user */
            if (keyPressEvent.charCode === 13) {
                requestsObject.searchUsers(keyPressEvent);
            }
        })
    },
    // friend request logic
    sendRequest: () => {
        if (event.target.id.startsWith("sendRequest-")) {
            const targetID = event.target.id.split("-")[1]
            const confirmRequest = confirm("Do you want to send a friend request?")
            if (confirmRequest) {
                console.log("you sent a friend request to", targetID)
                // save friend request to JSON
                API.saveAnything(requestsObject.jsonObject(targetID), "requests")
            }
        }
    },
    clearContainers: () => {
        /* Clears the main container */
        document.querySelector("#mainContainer").innerHTML = ""
        /* Populates the '#addButtonContainer' with the search bar and button */
        document.querySelector("#addButtonContainer").innerHTML = ""
    },
    /* Formatting HTML component for the resulting user info */
    friendComponent: (friend) => {
        return `<div>
            <h2>UserName:  ${friend.userName}</h2>
            <h3>First Name: ${friend.firstName}</h3>
            <h3>Last Name: ${friend.lastName}</h3>
            <h4>Friend's Password: ${friend.password}</h4>
            <button id="sendRequest-${friend.id}">send a friend request</button>
        </div>`
    },
    /* Filtering through Users based on what characters are included in the search. */
    userLoop: (friendArray, search) => {
        const arrayOffriends = [...friendArray]
        const foundUsers = arrayOffriends.filter(user =>
            user.firstName.includes(search) || user.lastName.includes(search)
        );
        /* Adds Search Results to the DOM */
        console.log(foundUsers);
        foundUsers.forEach(friend => {
            document.querySelector("#mainContainer").innerHTML += requestsObject.friendComponent(friend)
        });
    },
    // creates friend request object for json
    jsonObject: (placeholder) => {
        return {
           userId: sessionStorage.activeUser,
           receiverId: placeholder
        }
    },

}

export default requestsObject;