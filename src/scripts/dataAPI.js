const API = {
    // This method gets the user information from JSON
    getAnything(placeholder) {
        return fetch(`http://localhost:8088/${placeholder}`)
            .then(response => response.json())
    },
    saveAnything: (object, location) => {
        return fetch(`http://localhost:8088/${location}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
    },

    getEventsEntries: (userId) => {
        return fetch(`http://localhost:8088/events?userId=${userId}&_sort=eventDate&_order=asc`)
            .then(response => response.json())

    },

    saveEventsEntries: (entry) => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
    },

    deleteEventEntries: (id) => {
        return fetch(`http://localhost:8088/events/${id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
    },
    getEventById: (id) => {
        return fetch(`http://localhost:8088/events/${id}`, {
                method: "GET",
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
    updateNews: (entry) => {
        return fetch(`http://localhost:8088/news/${entry.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(entry)
        })
    },
    searchGet(array, key, value) {
        return fetch(`http://localhost:8088/${array}?${key}=${value}`)
            .then(response => response.json())
    },
    searchGetExpand (array, key, value, expand) {
        return fetch(`http://localhost:8088/${array}?_expand=${expand}&${key}=${value}`)
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
    deleteByKeyValue(array, key, value) {
        return fetch(`http://localhost:8088/${array}?${key}=${value}`, {
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