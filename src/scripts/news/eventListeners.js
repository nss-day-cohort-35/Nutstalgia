import API from "./../dataAPI.js"



//Entry that will Post to the DOM
const makeNewsArticle = (news) => {
    return `
<div class="newsPosts"> 
  <h2 id="title">News: ${news.newsTitle}</h2>
  <p id="synposis">Synopsis: ${news.synopsis}</p>
  <h3 id="url">${news.url}</h3>
  <aside id="createDate">Date Created: ${news.createDate}</aside>
  <button type="button" id="btnDeleteNews--${news.id}">
     Delete News
  </button>
  <button type="button" id="btnEditNews--${news.id}">
     Edit News
  </button>
</div>
`
}

// Function that render article to the DOM
const renderNewsArticle = (news) => {
    document.querySelector("#mainContainer").innerHTML += makeNewsArticle(news);
}

/* News form Input Value */
const addNewsModal = document.querySelector("#newsModal")
const addNewsModalBtn = document.querySelector("#btnNews")
const closeAddNewsModalBtn = document.querySelector("#btnCloseNews")

const openNewsAddModal = () => {
    addNewsModal.style.display = "block";

}
const closeNewsAddModal = () => {
    addNewsModal.style.display = "none";
}

const getNewsFormValue = () => {
    const title = document.querySelector("#newsTitle").value
    const synopsis = document.querySelector("#newsSynopsis").value
    const url = document.querySelector("#newsURL").value
    const date = document.querySelector("#newsDate").value

    const newArticle = {
        newsTitle: title,
        synopsis: synopsis,
        url: url,
        createDate: date
    }
    return newArticle

}

const newsObject = {
    //Event listener button that changes innerHTML
    newsButton: () => document.querySelector("#btnNews").addEventListener("click", () => {
        // This makes sure we have news articles when the page loads!
        document.querySelector("#mainContainer").innerHTML =
            `<div><button id="addNewsButton"> Add News </button></div>`
        API.getAnything("news").then((allArticles) => {
            allArticles.forEach(article => {
                renderNewsArticle(article);

            }), document.querySelector("#mainContainer").addEventListener("click", (event) => {
                if (event.target.id.startsWith("btnDeleteNews--") === true) {
                    const eventId = event.target.id.split("--" [1]);
                    // Clear container
                    document.querySelector("#mainContainer").innerHTML = "";
                    // Delete function 
                    API.deleteAnything("news", eventId[2])
                        //Get all News articles
                    API.getAnything("news").then((allArticles) => {
                        allArticles.forEach(article => {
                            renderNewsArticle(article);
                        })
                    })
                }
            }), document.querySelector("#addNewsButton").addEventListener("click", () => {
                openNewsAddModal();
            }), document.querySelector("#btnNewsSave").addEventListener("click", () => {
                const userNews = getNewsFormValue();
                API.saveAnything(userNews, "news");
                closeNewsAddModal();
                //Get all News articles
                renderNewsArticle(userNews)
            })
        })
    })
}


/*
const newNewsArticle = (title, synopsis, url, date) => {
    const newArticle = {
        newsTitle: title,
        synopsis: synopsis,
        url: url,
        createDate: date
    }
    return newArticle
};
*/

export default newsObject