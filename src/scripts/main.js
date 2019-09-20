/*
    Import all the tools into main.js that are needed to display
    the initial UI to the user. Either the login form should appear
    or the dashboard should be rendered.
*/

/* const message = "Time to build an application that gives you all the information you need in a Nutshell"

document.querySelector("#container").innerHTML = `<h1>${message}</h1>`

console.log(message) */

const addModal = document.querySelector("#register-form")
const addModalBtn = document.querySelector("#btn-add")
const closeAddModalBtn = document.querySelector(".btn-close-registration-form")
const openAddModal = () => {
    addModal.style.display = "block";
}
const closeAddModal = () => {
    addModal.style.display = "none";
}

addModalBtn.addEventListener("click", openAddModal);
closeAddModalBtn.addEventListener("click", closeAddModal);





