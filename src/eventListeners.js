import { addBlankProjectToLocalStorage } from "./databaseOps"
import { addProjectItemsToLocalStorage } from "./databaseOps"
import { deleteSingleProject } from "./databaseOps"
import { deleteAllProjects } from "./databaseOps"
import { clearProjectCards } from "./domElements"
import { clearItemListContent } from "./domElements"
import { populateProjectCards } from "./domElements"
import { populateProjectListOfItems } from "./domElements"
import { dismissPopup } from "./domElements"
import { addProjectForm } from "./domElements"
import { addListItemsForm } from "./domElements"
import { listItemsContent } from "./domElements"
import { populateListItemsContent } from "./domElements"

let mProjectIndex = 0
let mListIndex = 0

export function setEventListeners() {
    documentListener()
    addListContentListener()
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
            addListItemSubmitButtonListener()
            window.open("#popup", "_parent")
        } else if (e.target.closest(".project-item-container")) {
            modalContent.innerHTML = ""
            modalContent.appendChild(listItemsContent())
            addListContentListener()
            populateListItemsContent(mProjectIndex, mListIndex)
            window.open("#popup", "_parent")
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

const addListItemSubmitButtonListener = () => {
    const button = document.querySelectorAll("#add-list-submit-button")

    button.forEach(function callback(value, index) {
        button[index].addEventListener("click", (event) => {
            event.preventDefault()
            addProjectItemsToLocalStorage(index)

            clearProjectCards()
            populateProjectCards()

            dismissPopup()
        })
    })
}

export function addListContentListener() {
    const itemList = document.querySelectorAll(".project-item-container")

    //This adds another listener on each item every time we run the function.
    itemList.forEach(function callback(value) {
        value.addEventListener("click", (event) => {
            console.log("clicked")
            event.preventDefault()
            const projectIndex = value.getAttribute("project-id")
            const listIndex = value.getAttribute("item-id")

            mProjectIndex = projectIndex
            mListIndex = listIndex

            // populateListItemsContent(mProjectIndex, mListIndex)
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