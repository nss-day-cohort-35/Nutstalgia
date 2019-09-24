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
    searchGet (array, key, value) {
        return fetch(`http://localhost:8088/${array}?${key}=${value}`)
            .then(response => response.json())
    },
    /* This dynamically returns a user object by Username. */
    getByUserName(userPlaceholder) {
        return fetch(`http://localhost:8088/users?userName=${userPlaceholder}`)
            .then(response => response.json())
    },
    deleteByID(array, id) {
        return fetch(`http://localhost:8088/${array}/${id}`, {
            method: "DELETE"
        })
            .then(response => response.json())
    },
    getByID(array, id) {
        return fetch(`http://localhost:8088/${array}/${id}`)
            .then(response => response.json())
    },
    putByID(array, id, object) {
        return fetch(`http://localhost:8088/${array}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
            .then(response => response.json())
    },
}

export default API