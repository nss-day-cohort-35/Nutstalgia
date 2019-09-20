/*
// Fetch call
const newsAPI = {
    getNewsArticles: () => {
        return fetch("http://localhost:8088/news")
            .then(response => response.json())
    }
};

//Event listener button that changes innerHTML


// This makes sure we have news articles when the page loads!
newsAPI.getNewsArticles().then((allArticles) => {
    allArticles.forEach(article => {
        renderNewsArticle(article)
    })
});

//Functions that builds news article
const newNewsArticle = (title, synopsis, url, date) => {
    const newArticle = {
        newsTitle: title,
        synopsis: synopsis,
        url: url,
        createDate: date
    }
    return newArticle
};

// Event Listener      
document.querySelector("#btnNewsSubmit").addEventListener("click", () => {

    // Collected Form Field Values
    const title = document.querySelector("#title").value;
    const synposis = document.querySelector("#synposis").value;
    const url = document.querySelector("#url").value;
    const createDate = document.querySelector("#createDate").value;

    //Build New Journal Object
    const newsObject = newNewsArticle(title, synopsis, url, date);

    //Clear inputs
    document.querySelector("#title").value = "";
    document.querySelector("#synposis").value = "";
    document.querySelector("#url").value = "";
    document.querySelector("#createDate").value = "";

    // Save object to JSON

})

const renderNewsArticle = (news) => {
        document.querySelector("#NewsResultContainer").innerHTML += newNewsArticle.makeNewsArticle(news);
    },




    //Entry that will Post to the DOM
    makeNewsArticle = (news) => {
        return `
    <div class="newsPosts"> 
      <h2 id="title">News${news.newsTitle}</h2>
      <p id="synposis">Synopsis:${news.synopsis}</p>
      <h3 id="url">${news.url}</h3>
      <aside id="createDate">Date Created:${news.createDate}</aside>
      <button type="button" id="deleteEntry--${news.id}">
         Delete Entry
      </button>
      <button type="button" id="editEntry--${news.id}">
         Edit Entry
      </button>
    </div>
    `
    }

    */