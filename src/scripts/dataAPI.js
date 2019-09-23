const API = {
    // This method gets the user information from JSON
    getAnything(placeholder) {
        return fetch(`http://localhost:8088/${placeholder}`)
            .then(response => response.json())
    },
    // This method will post the user information to JSON
    saveAnything: (user, placeholder) => {
        return fetch(`http://localhost:8088/${placeholder}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
    },
    deleteAnything: (user, id) => {
        return fetch(`http://localhost:8088/${user}/${id}`, {
            method: "DELETE"
        }).then(response => response.json())

    },
    /* This dynamically returns a user object by Username. */
    getByUserName(userPlaceholder) {
        return fetch(`http://localhost:8088/users?userName=${userPlaceholder}`)
            .then(response => response.json())
    }
}


export default API