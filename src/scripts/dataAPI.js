const API = {
    // This method gets the user information from JSON
    getNewsArticles: () => {
        return fetch("http://localhost:8088/news")
            .then(response => response.json())
    },
    // This method will post the user information to JSON
    saveUser: (user) => {
        return fetch(" http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
    }
}


export default API