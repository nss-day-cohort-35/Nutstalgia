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
    getEventsEntries: () => {
        return fetch(`http://localhost:8088/events`)
            .then(response => response.json())
                       
    }
}


export default API