const API = {
    // This method gets the user information from JSON
    getNewsArticles: () => {
        return fetch("http://localhost:8088/news")
            .then(response => response.json())
    },
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
    }
}


export default API