import { addBlankProjectToLocalStorage } from "./databaseOps"
import { deleteSingleProject } from "./databaseOps"
import { deleteAllProjects } from "./databaseOps"
import { clearProjectCards } from "./domElements"
import { populateProjectCards } from "./domElements"
import { dismissPopup } from "./domElements"
import { addProjectForm } from "./domElements"
import { addListItemsForm } from "./domElements"
import { listItemsContent } from "./domElements"
import { populateListItemsContent } from "./domElements"
import { putItemInLocalStorage } from "./databaseOps"
import { populateListItemForm } from "./domElements"

let mProjectIndex = 0
let mListIndex = 0

export function setEventListeners() {
    documentListener()
    listContentListener()
    addListItemListener()
    deleteSingleProjectButtonListener()
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
            addListItemSubmitButtonListener("add")
            window.open("#popup", "_parent")
        } else if (e.target.closest(".project-item-container")) {
            modalContent.innerHTML = ""
            modalContent.appendChild(addListItemsForm())
            populateListItemForm(mProjectIndex, mListIndex)
            addListItemSubmitButtonListener("edit")
            // populateListItemsContent(mProjectIndex, mListIndex)
            window.open("#popup", "_parent")
        } else if (e.target.closest("#delete-project-button")) {
        } else if (!e.target.closest(".modal-content")) {
            modalContent.innerHTML = ""
            window.open("#", "_parent")
        }

    })
}

//Form submission reloads page, thus skipping console logs.
const addProjectSubmitButtonListener = () => {
    const button = document.querySelector("#add-project-submit-button")

    button.addEventListener("click", (event) => {
        event.preventDefault()
        addBlankProjectToLocalStorage()

        clearProjectCards()
        populateProjectCards()
        dismissPopup()
    })
}

//TODO: Submit should switch add/edit as needed.
const addListItemSubmitButtonListener = (operation) => {
    const button = document.querySelectorAll("#add-list-submit-button")

    button.forEach(function callback(value, index) {
        button[index].addEventListener("click", (event) => {
            event.preventDefault()
            putItemInLocalStorage(operation, mProjectIndex, mListIndex)

            clearProjectCards()
            populateProjectCards()

            dismissPopup()
        })
    })
}

export function listContentListener() {
    const itemList = document.querySelectorAll(".project-item-container")

    itemList.forEach(function callback(value) {
        value.addEventListener("click", (event) => {
            event.preventDefault()
            const projectIndex = value.getAttribute("project-id")
            const listIndex = value.getAttribute("item-id")

            mProjectIndex = projectIndex
            mListIndex = listIndex
        })
      })
}

export function addListItemListener() {
    const listButtons = document.querySelectorAll("#add-list-button")

    listButtons.forEach(function callback(value, index) {
        listButtons[index].addEventListener("click", (event) => {
        mProjectIndex = index            
        })

    })
}

export function deleteSingleProjectButtonListener() {
    const buttons = document.querySelectorAll("#delete-project-button")

    buttons.forEach(function callback(value, index) {
        buttons[index].addEventListener("click", (event) => {
            event.preventDefault()
            deleteSingleProject(index)
            clearProjectCards()
            populateProjectCards()
        })
    })
}