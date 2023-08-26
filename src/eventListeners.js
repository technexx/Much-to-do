import { addProjectToLocalStorage } from "./databaseOps"
import { addProjectItemsToLocalStorage } from "./databaseOps"
import { clearProjectCards } from "./domElements"
import { populateProjectCards } from "./domElements"

export function setEventListeners() {
    addProjectButtonListener()
    addProjectSubmitButtonListener()
    addListItemButtonListener()
    addListItemSubmitButtonListener()
    documentListener()
}

const documentListener = () => {
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".add-project-modal-content")) {
            window.open("#", "_parent")
        }
})
}

const addProjectButtonListener = () => {
    const button = document.querySelector("#add-project-button")

    button.addEventListener("click", () => {
        console.log("add project clicked")
        console.log(document.querySelector("#add-project-popup"))

        window.open("#add-project-popup")
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
    const button = document.querySelector("#add-list-submit-button")

    button.addEventListener("click", (event) => {
        event.preventDefault()
        addProjectToLocalStorage()

        clearProjectCards()
        populateProjectCards()
    })
}

const addListItemSubmitButtonListener = () => {
    const button = document.querySelectorAll("#add-project-submit-button")

    button.forEach(function callback(value, index) {
        button[index].addEventListener("click", (event) => {
            event.preventDefault()
            addProjectItemsToLocalStorage(index)
        })
    })
}