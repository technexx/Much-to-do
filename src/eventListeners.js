import { addBlankProjectToLocalStorage, addProjectToLocalStorage } from "./databaseOps"
import { addProjectItemsToLocalStorage } from "./databaseOps"
import { clearProjectCards } from "./domElements"
import { populateProjectCards } from "./domElements"
import { populateProjectListOfItems } from "./domElements"
import { dismissPopup } from "./domElements"
import { addProjectForm } from "./domElements"
import { addListItemsForm } from "./domElements"
import { populateListItemsContent } from "./domElements"

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
        } else if (e.target.closest(".project-item-container")) {
          const itemList = document.querySelectorAll(".project-item-container")

          itemList.forEach(function callback(value, listIndex) {
            value.addEventListener("click", (event) => {
                const projectIndex = value.getAttribute("id").split("-")[1]
                populateListItemsContent(projectIndex, listIndex)
            })
          })
        } else if (!e.target.closest(".modal-content")) {
            window.open("#", "_parent")
        }
})
}

function getProjectIndex(itemContainerIndex) {
    
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

            clearProjectCards()
            populateProjectCards()

            dismissPopup()
        })
    })
}