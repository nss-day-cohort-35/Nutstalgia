import API from "./../dataAPI.js";
const friendObject = {
    template: () => {
        document.querySelector("#friendSearch").addEventListener("keypress", keyPressEvent => {
            if (keyPressEvent.charCode === 13) {
                let searchInput = keyPressEvent.target.value;
                /* WHEN  USER PRESSES ENTER, FIND MATCHING user */
                API.getAnything("users")
                    .then(response => friendObject.friendLoop(response, searchInput))
            }
        })
    },
    /* Generates search bar and users after search is executed. */
    friendListeners: () => {
        document.querySelector("#btnFriends").addEventListener("click", event => {
            friendObject.friendSearchBar()
            friendObject.template();

        })
        document.querySelector("#mainContainer").addEventListener("click", () => {
            friendObject.addFriend();
        })
    },
    addFriend: () => {
        if (event.target.id.startsWith("friendAdd-")) {
            const targetID = event.target.id.split("-")[1]
            const confirmAdd = confirm("Do you want to add this friend?")
            if (confirmAdd) {
                console.log("you added this friend", targetID)
                // API.getByID("users", targetID)
                //     .then(response => 
                //         console.log(response));
                API.saveAnything(friendObject.jsonObject(targetID), "friendships")
            }
        }
    },
    friendSearchBar: () => {
        /* Clears the main container */
        document.querySelector("#mainContainer").innerHTML = ""
        /* Populates the '#addButtonContainer' with the search bar and button */
        document.querySelector("#addButtonContainer").innerHTML =
            ' <input type="text" type="input" placeholder="Search For Friends" id="friendSearch"></input><input type="submit" value="Search"></input> '
    },
    /* Formatting HTML component for the resulting user info */
    friendComponent: (friend) => {
        return `<div>
            <h2>UserName:  ${friend.userName}</h2>
            <h3>First Name: ${friend.firstName}</h3>
            <h3>Last Name: ${friend.lastName}</h3>
            <h4>Friend's Password: ${friend.password}</h4>
            <button id="friendAdd-${friend.id}">Add as Friend!</button>
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
            document.querySelector("#mainContainer").innerHTML += friendObject.friendComponent(friend)
        });
    },
    
    jsonObject: (placeholder) => {
        return {
           initiatorID: sessionStorage.activeUser,
           userId: placeholder
        }
    },

}

export default friendObject;