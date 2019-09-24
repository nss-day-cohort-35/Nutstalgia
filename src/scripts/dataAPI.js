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
                       
    },
    saveEventsEntries: (entry) => {
        return fetch(`http://localhost:8088/events`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
    },
    deleteEvent: (id) => {
        return fetch(`http://localhost:8088/events/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
    },
    getEventById: (id) => {
        return fetch(`http://localhost:8088/events/${id}`, {
           method: 'GET',
         })
         .then(response => response.json());
    },
    updateEvent: (entry) => {
        return fetch(`http://localhost:8088/events/${entry.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })

    },
    /* This dynamically returns a user object by Username. */
    getByUserName(userPlaceholder) {
        return fetch(`http://localhost:8088/users?userName=${userPlaceholder}`)
            .then(response => response.json())
    }
}


export default API