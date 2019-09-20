const API = {
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