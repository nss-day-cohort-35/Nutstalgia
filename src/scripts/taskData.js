const taskAPI = {
    getTaskEntries () {
        return fetch("http://localhost:3000/entries")
            .then(response => response.json())
    },
    postTaskEntry(newTaskEntry){
        return fetch ("http://localhost:3000/entries",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTaskEntry)
        })
        .then(response => response.json())
    }
}


export default taskAPI