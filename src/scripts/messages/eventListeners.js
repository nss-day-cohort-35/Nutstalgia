import API from "./../dataAPI.js";
import moment from "moment";

const messagesObject = {
    listeners: () => {
        console.log("messages works")
        document.querySelector("#btnMessages").addEventListener("click", event => {
            messagesObject.refresh()
            messagesObject.fetchMessages()
        })
        // put the listener on the chat input

    },
    chatBar: () => {
        return `
        <div id="chatBar">
            <input type="text" type="input" placeholder="Chat with other Users..." class="chat-input" id="chatInput"></input>
        </div>
        `
    },
    refresh: () => {
        document.querySelector("#mainContainer").innerHTML = ""
        document.querySelector("#addButtonContainer").innerHTML = ""
        document.querySelector("#mainContainer").innerHTML += messagesObject.chatBar();
        document.querySelector("#chatInput").addEventListener("keypress", keyPressEvent => {
            /* WHEN  USER PRESSES ENTER, send a message */
            if (keyPressEvent.charCode === 13) {
                messagesObject.putMessage(keyPressEvent)
                    .then(response => messagesObject.fetchMessages())
            }
        })

        // API.searchGetExpand("requests", "receiverId", sessionStorage.activeUser, "user")
        //     .then(response => friendsObject.requestsLoop(response))

    },
    putMessage: (event) => {
        return API.saveAnything(messagesObject.messageJSON(event.target.value), "messages")
    },
    messageJSON: (message) => {
        return {
            userId: Number(sessionStorage.activeUser),
            message: message,
            dateCreated: moment().format("lll")
        }
    },
    fetchMessages: () => {
        return API.getExpand("messages", "user")
            .then(response => messagesObject.messagesLoop(response))
            .then(response =>
                document.querySelector("#chatInput").addEventListener("keypress", keyPressEvent => {
                    /* WHEN  USER PRESSES ENTER, send a message */
                    if (keyPressEvent.charCode === 13) {
                        messagesObject.putMessage(keyPressEvent)
                            .then(response => messagesObject.fetchMessages())
                    }
                }))
    },
    messagesLoop: (array) => {
        messagesObject.refresh();
        const arrayOfMessages = [...array]
        const sortedMessages = arrayOfMessages.sort((yeahhh, boiii) => yeahhh.id - boiii.id)
        sortedMessages.forEach(message => {
            if (message.user.id === Number(sessionStorage.activeUser)) {
                document.querySelector("#mainContainer").innerHTML += messagesObject.currentUserComponent(message);
            }
            else {
                document.querySelector("#mainContainer").innerHTML += messagesObject.otherUserComponent(message);
            }
            // if else here
            // document.querySelector("#mainContainer").innerHTML += friendsObject.friendComponent(friend)
        })
        document.querySelector("#mainContainer").innerHTML += messagesObject.bottomMarginBlock()

    },
    currentUserComponent: (message) => {
        return `
        <div class="current-user-message">
             <div>
                 <div class="current-user-bubble">
                    <p>${message.message}</p>
                </div>
                <h6 class="message-text">${message.dateCreated}</h6>
            </div>
        </div>`
    },
    otherUserComponent: (message) => {
        return `
        <div class="other-user-message">
            <div>
                <h5 class="message-text">${message.user.firstName} ${message.user.lastName}</h5>
                <div class="other-user-bubble">
                    <p>${message.message}</p>
                </div>
                <h6 class="message-text">${message.dateCreated}</h6>
            </div>
        </div>`

    },
    bottomMarginBlock: () => {
        return `
        <div class="bottom-margin-block"></div>
        `
    }

}


export default messagesObject