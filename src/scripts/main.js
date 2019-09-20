import API from "./dataAPI.js";

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
        const user = document.querySelector("#userName").value
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
const addModalBtn = document.querySelector("#btn-add")
const closeAddModalBtn = document.querySelector("#btnCloseRegistrationForm")

const openAddModal = () => {
    addModal.style.display = "block";
    document.querySelector("#firstName").value = ""
    document.querySelector("#lastName").value = ""
    document.querySelector("#emailAddress").value = ""
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
    API.saveUser(registeredUser);
})

const getRegisterFormValue = () => {
    const firstName = document.querySelector("#firstName").value
    const lastName = document.querySelector("#lastName").value
    const email = document.querySelector("#emailAddress").value
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
        password: password,
        confirmPassword: confirmPassword
    }
    return registeredUser

}
/* registration form value end */

/* News form Input Value */
const addNewsModal = document.querySelector("#newsModal")
const addNewsModalBtn = document.querySelector("#btnNews")
const closeAddNewsModalBtn = document.querySelector("#btnCloseNews")

const openNewsAddModal = () => {
    addNewsModal.style.display = "block";

}
const closeNewsAddModal = () => {
    addNewsModal.style.display = "none";
}

addNewsModalBtn.addEventListener("click", openNewsAddModal);
closeAddNewsModalBtn.addEventListener("click", closeNewsAddModal);

document.querySelector("#btnNewsSave").addEventListener("click", event => {
    const news = getNewsFormValue()
    console.log(news)

})

const getNewsFormValue = () => {
    const title = document.querySelector("#newsTitle").value
    const synopsis = document.querySelector("#newsSynopsis").value
    const url = document.querySelector("#newsURL").value

    const news = {
        title: title,
        synopsis: synopsis,
        url: url,
    }
    return news

}
/* Input form value end */

document.querySelector("#btn-submit").addEventListener("click", event => {
    const loginUser = document.querySelector("#userName").value
    const loginPW = document.querySelector("#password").value
    API.getAnything("users")
        .then(response => {
            response.forEach(user => {
                console.log(response)
                if (user.id === loginUser && user.password === loginPW) {
                    sessionStorage.setItem("activeUser", user.id)
                }  {
                    // alert("Get off my lawn.")
                }
            });
        });
});