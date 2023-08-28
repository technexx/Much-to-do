import { addProjectToLocalStorage } from "./databaseOps"
import { addProjectItemsToLocalStorage } from "./databaseOps"
import { clearProjectCards } from "./domElements"
import { populateProjectCards } from "./domElements"
import { dismissPopup } from "./domElements"

export function setEventListeners() {
    // addProjectButtonListener()
    addProjectSubmitButtonListener()
    addListItemButtonListener()
    addListItemSubmitButtonListener()
    documentListener()
}

const documentListener = () => {
    document.addEventListener("click", (e) => {
        if (e.target.closest("#add-project-button")) {
            window.open("#popup", "_parent")
        } else if  (e.target.closest("#add-list-button")) {
            //Todo: Change to add list popup
            window.open("#popup", "_parent")
        } else if  (!e.target.closest(".modal-content")) {
            window.open("#", "_parent")
        }
})
}

const addListItemButtonListener = () => {
    const button = document.querySelector("#add-list-button")
    const popUp = document.querySelector(".add-list-popup")

    if (button !== null) {
        button.addEventListener("click", () => {

        })
    }
}

//Form submission reloads page, thus skipping console logs.
const addProjectSubmitButtonListener = () => {
    const button = document.querySelector("#add-project-submit-button")

    //Todo: Blank list on add (if array is ampty)
    button.addEventListener("click", (event) => {
        console.log("add project clicked")

        event.preventDefault()
        addProjectToLocalStorage()

        clearProjectCards()
        populateProjectCards()

        dismissPopup()

        console.log(localStorage)
    })
}

const addListItemSubmitButtonListener = () => {
    const button = document.querySelectorAll("#add-list-submit-button")

    button.forEach(function callback(value, index) {
        button[index].addEventListener("click", (event) => {
            event.preventDefault()
            addProjectItemsToLocalStorage(index)
        })
    })
}