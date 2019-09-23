const API = {
    // This method will post the user information to JSON
    getAnything (placeholder) {
        return fetch(`http://localhost:8088/${placeholder}`)
            .then(response => response.json())
    },
    saveAnything: (user, placeholder) => {
        return fetch(`http://localhost:8088/${placeholder}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

    },
    /* This dynamically returns a user object by Username. */
    getByUserName(userPlaceholder) {
        return fetch(`http://localhost:8088/users?userName=${userPlaceholder}`)
            .then(response => response.json())
    }
}


export default API