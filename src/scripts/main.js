import API from "./dataAPI.js";
import eventsObject from "./events/eventListeners.js"
import taskObject from "./tasks/eventListeners.js";
import friendObject from "./friends/eventListeners.js";

eventsObject.eventsButtonClick();
eventsObject.eventSave();
eventsObject.deleteEvent();
eventsObject.editEvent();
eventsObject.updateEvent();

taskObject.taskListeners();
friendObject.friendListeners();

/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

/* const message = "Time to build an application that gives you all the information you need in a Nutshell"

document.querySelector("#container").innerHTML = `<h1>${message}</h1>`

console.log(message) */

/* Login input start */
const addLoginModal = document.querySelector("#loginModal")
const addLoginModalBtn = document.querySelector("#btnSignIn")
const closeLoginModalBtn = document.querySelector("#btnCloseLoginForm")

const openLoginAddModal = () => {
    addLoginModal.style.display = "block";

}
const closeLoginAddModal = () => {
    addLoginModal.style.display = "none";
}

addLoginModalBtn.addEventListener("click", openLoginAddModal);
closeLoginModalBtn.addEventListener("click", closeLoginAddModal);

document.querySelector("#btnLoginSubmit").addEventListener("click", event => {
    const user = getLoginFormValue()
    console.log(user)

})

const getLoginFormValue = () => {
    const user = document.querySelector("#loginUserName").value
    const password = document.querySelector("#myPassword").value

    const userLogin = {
        user: user,
        password: password,

    }
    return userLogin

}
/* Login Form end */
/* registration input value start */
 const addModal = document.querySelector("#register-form")
const addModalBtn = document.querySelector("#btnSignUp")
const closeAddModalBtn = document.querySelector("#btnCloseRegistrationForm")

const openAddModal = () => {
    addModal.style.display = "block";
    document.querySelector("#firstName").value = ""
    document.querySelector("#lastName").value = ""
    document.querySelector("#emailAddress").value = ""
    document.querySelector("#userName").value = ""
    document.querySelector("#userPassword").value = ""
    document.querySelector("#confirmPassword").value = ""
}
const closeAddModal = () => {
    addModal.style.display = "none";
}

addModalBtn.addEventListener("click", openAddModal);
closeAddModalBtn.addEventListener("click", closeAddModal);


document.querySelector("#btn-save").addEventListener("click", event => {
    const registeredUser = getRegisterFormValue()
    console.log(registeredUser)
    // check if registredUser variable is null,
    if (registeredUser != null) {
        //if not null, register and store in session.
        closeAddModal()
    }
    // Called the get registerForm value function which holds the registerd User object
    // This creates the object that will be placed in the JSON
    getRegisterFormValue(registeredUser)

    //I called the save User method that is on the API
    //This will now post the registered user to JSON
    API.saveAnything(registeredUser, "users");
    
   })    

document.querySelector("#createAccount").addEventListener("click", event => {
    openAddModal()
    closeLoginAddModal()
   
})

const getRegisterFormValue = () => {
    const firstName = document.querySelector("#firstName").value
    const lastName = document.querySelector("#lastName").value
    const email = document.querySelector("#emailAddress").value
    const userName = document.querySelector("#userName").value
    const password = document.querySelector("#userPassword").value
    const confirmPassword = document.querySelector("#confirmPassword").value

    //validate password
    if (password != confirmPassword) {
        alert("Password doesn't match")
        return null;
    }

    const registeredUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userName: userName,
        password: password,
        confirmPassword: confirmPassword
    }
    return registeredUser

} 
/* registration form value end */

/* Login Event Listener */
document.querySelector("#btnLoginSubmit").addEventListener("click", event => {
    const loginUser = document.querySelector("#loginUserName").value
    const loginPW = document.querySelector("#myPassword").value
    API.getByUserName(loginUser)
        .then(response => {
            console.log(response);
            if (response.length === 0) {
                alert("Please enter a valid Username.")
            }
            else if (response.length === 1 && response[0].password !== loginPW){
                alert("Password is incorrect.")
            } else if (response[0].password === loginPW) {
                closeLoginAddModal()
                document.querySelector("#welcomeMessage").innerHTML = `<div><h1>Welcome ${loginUser}!</h1></div>`
                document.querySelector("#btnSignOut").style.display="block";
                document.querySelector("#btnSignIn").style.display="none";
                document.querySelector("#btnSignUp").style.display="none";
                sessionStorage.setItem("activeUser", response[0].id)
                console.log("It matches?!")
                
               
            }
        })
    });
    /* Logout Event Listener */
    document.querySelector("#btnSignOut").addEventListener("click", event => {
        sessionStorage.removeItem("activeUser")
        alert("Logged out!")
        console.log("Session Storage", sessionStorage);
        document.querySelector("#btnSignOut").style.display="none";
        document.querySelector("#btnSignIn").style.display="block";
        document.querySelector("#btnSignUp").style.display="block";
        document.querySelector("#welcomeMessage").innerHTML = ""
       
    })
