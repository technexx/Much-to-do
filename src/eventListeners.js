import { addBlankProjectToLocalStorage, addProjectToLocalStorage } from "./databaseOps"
import { addProjectItemsToLocalStorage } from "./databaseOps"
import { clearProjectCards } from "./domElements"
import { populateProjectCards } from "./domElements"
import { populateProjectListOfItems } from "./domElements"
import { dismissPopup } from "./domElements"
import { addProjectForm } from "./domElements"
import { addListItemsForm } from "./domElements"

export function setEventListeners() {
    documentListener()
}

const documentListener = () => {
    const modalContent = document.querySelector(".modal-content")

    document.addEventListener("click", (e) => {
        if (e.target.closest("#add-project-button")) {
            modalContent.innerHTML = ""
            modalContent.appendChild(addProjectForm())
            addProjectSubmitButtonListener()
            window.open("#popup", "_parent")
        } else if  (e.target.closest("#add-list-button")) {
            modalContent.innerHTML = ""
            modalContent.appendChild(addListItemsForm())
            addListItemSubmitButtonListener()
            window.open("#popup", "_parent")
            //Todo: Don't run if interacting w/ form.
        } else if (!e.target.closest(".modal-content")) {
            window.open("#", "_parent")
        }
})
}

//Form submission reloads page, thus skipping console logs.
const addProjectSubmitButtonListener = () => {
    const button = document.querySelector("#add-project-submit-button")

    //Todo: Blank list on add (if array is ampty)
    button.addEventListener("click", (event) => {
        event.preventDefault()
        addBlankProjectToLocalStorage()

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

            dismissPopup()
        })
    })
}