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
    document.querySelector("#container").innerHTML = "";
    events.forEach(event => {
        document.querySelector("#container").innerHTML += createEventsHTML(event);
    });
};

const loadEventEntries = () =>{
    API.getEventsEntries("allEvents").then(events => {
        renderEvents(events);
    });
}

const createEventsHTML = eventObj => {
    return `
    <div>
    <h2>${eventObj.eventName}</h2>
    <p>${eventObj.eventDate}</p>
    <p>${eventObj.eventLocation}</p>
    <button type="button" class="btn" id="deleteEvent--${eventObj.id}">Delete</button>
    <button type="button" class="btn" id="editEvent--${eventObj.id}">Edit</button>
    </div>
    `
};
const eventsObject = {
    eventsButtonClick: () => {
        document.querySelector("#btnEvents").addEventListener("click", () => {
            document.querySelector("#addButtonContainer").innerHTML = `<div><button type="button" id="btnAddEvents">Add Event</button></div>`
             API.getEventsEntries("allEvents").then(events => {
                 renderEvents(events);
                 
                 document
                     .querySelector("#btnAddEvents")
                     .addEventListener("click", () => {
                         openEventModal();
                     });
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
        document.querySelector("#container").addEventListener("click", event => {
            if (event.target.id.startsWith("deleteEvent--")) {
                API.deleteEventEntries(event.target.id.split("--")[1])
                .then((response) => {
                   
                    //document.querySelector("#container").innerHTML = "";
                    loadEventEntries();
                });
            }
        })
    },
       
    editEvent: () =>  {
        document.querySelector("#container").addEventListener("click", event => {
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