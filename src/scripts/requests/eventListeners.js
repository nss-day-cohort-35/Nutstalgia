import API from "./../dataAPI.js";
const requestsObject = {
    template: (event) => {
        requestsObject.clearContainers();
                let searchInput = event.target.value;
                API.getAnything("users")
                    .then(response => requestsObject.friendLoop(response, searchInput))
    },
    /* Generates search bar and users after search is executed. */
    friendListeners: () => {
        // document.querySelector("#btnFriends").addEventListener("click", event => {
        //     requestsObject.clearContainers()
        // })
        document.querySelector("#mainContainer").addEventListener("click", () => {
            requestsObject.addFriend();
        })
        document.querySelector("#friendSearch").addEventListener("keypress", keyPressEvent => {
            /* WHEN  USER PRESSES ENTER, FIND MATCHING user */
            if (keyPressEvent.charCode === 13) {
                requestsObject.template(keyPressEvent);
            }
        })
    },
    addFriend: () => {
        if (event.target.id.startsWith("friendAdd-")) {
            const targetID = event.target.id.split("-")[1]
            const confirmAdd = confirm("Do you want to send a friend request?")
            if (confirmAdd) {
                console.log("you sent a friend request to", targetID)
                // API.getByID("users", targetID)
                //     .then(response =>
                //         console.log(response));
                API.saveAnything(requestsObject.jsonObject(targetID), "requests")
            }
        }
    },
    clearContainers: () => {
        /* Clears the main container */
        document.querySelector("#mainContainer").innerHTML = ""
        /* Populates the '#addButtonContainer' with the search bar and button */
        document.querySelector("#addButtonContainer").innerHTML = ""
            // ' <input type="text" type="input" placeholder="Search For Friends" id="friendSearch"></input><input type="submit" value="Dont Press This Button! Hit Enter Instead!"></input> '
        document.querySelector("#friendSearch").textContent = "Search For Friends"
    },
    /* Formatting HTML component for the resulting user info */
    friendComponent: (friend) => {
        return `<div>
            <h2>UserName:  ${friend.userName}</h2>
            <h3>First Name: ${friend.firstName}</h3>
            <h3>Last Name: ${friend.lastName}</h3>
            <h4>Friend's Password: ${friend.password}</h4>
            <button id="friendAdd-${friend.id}">send a friend request</button>
        </div>`
    },
    /* Filtering through Users based on what characters are included in the search. */
    friendLoop: (friendArray, search) => {
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

    jsonObject: (placeholder) => {
        return {
           userId: sessionStorage.activeUser,
           receiverId: placeholder
        }
    },

}

export default requestsObject;