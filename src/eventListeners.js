import { addProjectToLocalStorage } from "./databaseOps"
import { addProjectItemsToLocalStorage } from "./databaseOps"
import { clearProjectCards } from "./domElements"
import { populateProjectCards } from "./domElements"
import { dismissPopup } from "./domElements"
import { addProjectForm } from "./domElements"
import { addListItemsForm } from "./domElements"

export function setEventListeners() {
    // addProjectButtonListener()
    addProjectSubmitButtonListener()
    addListItemButtonListener()
    addListItemSubmitButtonListener()
    documentListener()
}

const documentListener = () => {
    const modal = document.querySelector(".modal")

    document.addEventListener("click", (e) => {
        if (e.target.closest("#add-project-button")) {
            modal.appendChild(addProjectForm())
            window.open("#popup", "_parent")
        } else if  (e.target.closest("#add-list-button")) {
            modal.appendChild(addListItemsForm())
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
        event.preventDefault()
        addProjectToLocalStorage()

        clearProjectCards()
        populateProjectCards()

        dismissPopup()
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