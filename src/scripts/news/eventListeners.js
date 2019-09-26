import API from "./../dataAPI.js"

/* Modal Popup Open */
const addNewsModal = document.querySelector("#newsModal")
const addNewsModalBtn = document.querySelector("#btnNews")
const closeAddNewsModalBtn = document.querySelector("#btnCloseNews")

const openNewsAddModal = () => {
    document.querySelector("#newsTitle").value = "";
    document.querySelector("#newsSynopsis").value = "";
    document.querySelector("#newsURL").value = "";
    document.querySelector("#newsDate").value = "";

    addNewsModal.style.display = "block";
}
const closeNewsAddModal = () => {
    addNewsModal.style.display = "none";
}

//addNewsModalBtn.addEventListener("click", openNewsAddModal);
closeAddNewsModalBtn.addEventListener("click", closeNewsAddModal);

//Edit Modal PopUp
const addNewsEditModal = document.querySelector("#newsEditModal")
const editNewsModalBtn = document.querySelector("#btnNewsSaveEdit")
const editCloseBtn = document.querySelector("#btnEditCloseNews")

const openNewsEditModal = () => {
    addNewsEditModal.style.display = "block";
};


const closeNewsEditModalBtn = () => {
    addNewsEditModal.style.display = "none";
    console.log("whats up")
};

//addNewsEditModal.addEventListener("click", openNewsEditModal);
editCloseBtn.addEventListener("click", closeNewsEditModalBtn);

/*Get Input Value for Form*/
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

/* Edit Input Value */
const newsEditForm = editNews => {
        document.querySelector("#editNewsTitle").value = editNews.newsTitle;
        document.querySelector("#editNewsSynopsis").value = editNews.synopsis;
        document.querySelector("#editNewsURL").value = editNews.url;
        document.querySelector("#editNewsDate").value = editNews.createDate
        document.querySelector("#newsId").value = editNews.id;
    }
    /* Get Value from edit input field */
const newsInputEditValue = () => {
    const title = document.querySelector("#editNewsTitle").value
    const synopsis = document.querySelector("#editNewsSynopsis").value
    const url = document.querySelector("#editNewsURL").value
    const date = document.querySelector("#editNewsDate").value
    const id = document.querySelector("#newsId").value

    const newArticle = {
        newsTitle: title,
        synopsis: synopsis,
        url: url,
        createDate: date,
        id: id,
        userId: sessionStorage.activeUser
    };
    return newArticle;
};

// Function that render article to the DOM
const renderNewsArticle = (news) => {
    document.querySelector("#mainContainer").innerHTML += "";
    document.querySelector("#mainContainer").innerHTML += createNewsHTML(news);
}

// Get all News Articles
const getNewsArticles = () => {
    API.getAnything("news").then((allArticles) => {
        allArticles.forEach(article => {
            renderNewsArticle(article);
        })
    })
}

//Entry that will Post to the DOM
const createNewsHTML = (news) => {
    return `
      <div class="newsPosts news-component">
       <h2 id="title">News: ${news.newsTitle}</h2>
       <p id="synposis">${news.synopsis}</p>
       <h3 id="url">${news.url}</h3>
       <aside id="createDate">Date Created: ${news.createDate}</aside>
       <hr>
       <button type="button" class="icon-button" id="btnDeleteNews--${news.id}">
         <img class="button-icon"src="styles/img/trash.png" alt="DELETE">
       </button>
       <button type="button" class="icon-button" id="btnEditNews--${news.id}">
        <img class="button-icon"src="styles/img/edit.png" alt="EDIT">
       </button>
      </div>`
}

const newsObject = {
    newsButtonClick: () => {
        document.querySelector("#btnNews").addEventListener("click", () => {
            // kw- added clear main container
            document.querySelector("#mainContainer").innerHTML = ""
            document.querySelector("#addButtonContainer").innerHTML =
                "<div><button class='submit add-button' id='btnAddNews'>Add News</button></div>"
            getNewsArticles();
            document.querySelector("#btnAddNews").addEventListener("click", () => {
                openNewsAddModal()
            })
        })
    },
    saveNewsClick: () => {
        document.querySelector("#btnNewsSave").addEventListener("click", () => {
            const userNews = getNewsFormValue();
            API.saveAnything(userNews, "news");
            closeNewsAddModal();
            //Get all News articles
            renderNewsArticle(userNews)
        })
    },
    deleteNewsClick: () => {
        document.querySelector("#mainContainer").addEventListener("click", event => {
            if (event.target.id.startsWith("btnDeleteNews--")) {
                const eventId = event.target.id.split("--" [1]);
                console.log(eventId)
                    // Clear container
                document.querySelector("#mainContainer").innerHTML = "";
                API.deleteByID("news", eventId[2]).then((response) => {
                    getNewsArticles(response);
                })
            }
        })
    },
    editNewsClick: () => {
        document.querySelector("#mainContainer").addEventListener("click", event => {
            if (event.target.id.startsWith("btnEditNews--")) {
                const eventId2 = event.target.id.split("--" [1])
                API.getByID("news", eventId2[2]).then(response => {
                    newsEditForm(response);
                    openNewsEditModal();
                });
            }
        })
    },
    updateNewsClick: () => {
        document.querySelector("#btnNewsSaveEdit").addEventListener("click", event => {
            const getNews = newsInputEditValue();
            API.putByID("news", getNews.id, getNews).then((response) => {
                closeNewsEditModalBtn();
                document.querySelector("#mainContainer").innerHTML = "";
                getNewsArticles();
            });

        })
    }
}



export default newsObject