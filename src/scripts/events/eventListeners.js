import API from "./../dataAPI.js";


/* Modal Popup Open */
const addEventModal = document.querySelector("#eventsModal")
const addEventModalBtn = document.querySelector("#btnAddEvents")
const closeAddModalBtn = document.querySelector("#btnCloseEvents")

const openEventModal = () => {
    document.querySelector("#eventName").value = ""
    document.querySelector("#eventDate").value = ""
    document.querySelector("#eventLocation").value = ""

    addEventModal.style.display = "block";

}
const closeEventModal = () => {
    addEventModal.style.display = "none";
}

//addEventModalBtn.addEventListener("click", openEventModal);
closeAddModalBtn.addEventListener("click", closeEventModal);
/* Edit Modal PopUp */
const addEditEventModal = document.querySelector("#eventsEditModal")
const editEventModalBtn = document.querySelector("#btnAddEvents")
const editCloseModalBtn = document.querySelector("#btnEditCloseEvents")

const openEventEditModal = () => {
    addEditEventModal.style.display = "block";
};
const closeEditModalBtn = () => {
    addEditEventModal.style.display = "none";
};

//addEventEditModal.addEventListener("click", openEventEditModal);
editCloseModalBtn.addEventListener("click", closeEditModalBtn);

/* Get Input Value form Form */
const eventsInputValue = () => {
    const name = document.querySelector("#eventName").value;
    const date = document.querySelector("#eventDate").value;
    const location = document.querySelector("#eventLocation").value;

    const events = {
        eventName: name,
        eventDate: date,
        eventLocation: location,
        userId: sessionStorage.activeUser
    };
    return events;
};

/* Edit Input Value */
const loadEditForm = editEvent => {
        document.querySelector("#eventNameEdit").value = editEvent.eventName;
        document.querySelector("#eventDateEdit").value = editEvent.eventDate;
        document.querySelector("#eventLocationEdit").value = editEvent.eventLocation;
        document.querySelector("#eventId").value = editEvent.id;
    }
    /* Get Value from edit input field */
const eventsInputEditValue = () => {
    const name = document.querySelector("#eventNameEdit").value;
    const date = document.querySelector("#eventDateEdit").value;
    const location = document.querySelector("#eventLocationEdit").value;
    const id = document.querySelector("#eventId").value;

    const events = {
        eventName: name,
        eventDate: date,
        eventLocation: location,
        id: id,
        userId: sessionStorage.activeUser
    };
    return events;
};

const renderEvents = events => {
    document.querySelector("#mainContainer").innerHTML = "";
    events.forEach(event => {

        document.querySelector("#mainContainer").innerHTML += createEventsHTML(event);
    });
};

const loadEventEntries = () => {

    API.getEventsEntries(sessionStorage.activeUser).then(event => {
        renderEvents(event);
    })
}


const createEventsHTML = eventObj => {
    return `
    <div class="event-component">
    <h2>Name: ${eventObj.eventName}</h2>
    <p>Date: ${eventObj.eventDate}</p>
    <p>Location: ${eventObj.eventLocation}</p>
    <button type="button" class="btn icon-button" id="deleteEvent--${eventObj.id}"><img class="button-icon"src="styles/img/trash.png" alt="DELETE"></button>
    <button type="button" class="btn icon-button" id="editEvent--${eventObj.id}"><img class="button-icon"src="styles/img/edit.png" alt="EDIT"></button>
    </div>
    `
};
const eventsObject = {
    eventsButtonClick: () => {
        document.querySelector("#btnEvents").addEventListener("click", () => {
            document.querySelector("#addButtonContainer").innerHTML = "<div><button class='submit add-button' type='button' id='btnAddEvents'>Add Event</button></div>"
            loadEventEntries()
            document
                .querySelector("#btnAddEvents")
                .addEventListener("click", () => {
                    openEventModal();
                });

        })
    },

    eventSave: () => {
        document.querySelector("#btnEventSave").addEventListener("click", event => {
            const getEvents = eventsInputValue();
            API.saveEventsEntries(getEvents).then(() => {
                closeEventModal();
                loadEventEntries();
            });
        })
    },

    deleteEvent: () => {
        document.querySelector("#mainContainer").addEventListener("click", event => {
            if (event.target.id.startsWith("deleteEvent--")) {
                const confirmDelete = confirm("Do you want to delete this event?")
                if (confirmDelete){
                    API.deleteEventEntries(event.target.id.split("--")[1])
                    .then((response) => {
                        //document.querySelector("#mainContainer").innerHTML = "";
                        loadEventEntries();
                    });
                }
            }
        })
    },

    editEvent: () => {
        document.querySelector("#mainContainer").addEventListener("click", event => {
            if (event.target.id.startsWith("editEvent--")) {
                API.getEventById(event.target.id.split("--")[1]).then(response => {
                    loadEditForm(response);
                    openEventEditModal();
                });
            }
        })
    },



    updateEvent: () => {
        document
            .querySelector("#btnEventSaveEdit")
            .addEventListener("click", event => {
                const getEventsUpdateValue = eventsInputEditValue();
                API.updateEvent(getEventsUpdateValue).then(() => {
                    closeEditModalBtn();
                    loadEventEntries();
                });

            })
    }

}

export default eventsObject