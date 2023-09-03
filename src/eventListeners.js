import { addBlankProjectToLocalStorage, addProjectToLocalStorage } from "./databaseOps"
import { addProjectItemsToLocalStorage } from "./databaseOps"
import { clearProjectCards } from "./domElements"
import { clearItemListContent } from "./domElements"
import { populateProjectCards } from "./domElements"
import { populateProjectListOfItems } from "./domElements"
import { dismissPopup } from "./domElements"
import { addProjectForm } from "./domElements"
import { addListItemsForm } from "./domElements"
import { listItemsContent } from "./domElements"

export function setEventListeners() {
    documentListener()
    addProjectSubmitButtonListener()
    addListItemSubmitButtonListener()
}

const documentListener = () => {
    const modalContent = document.querySelector(".modal-content")

    document.addEventListener("click", (e) => {
        if (e.target.closest("#add-project-button")) {
            modalContent.innerHTML = ""
            modalContent.appendChild(addProjectForm())
            window.open("#popup", "_parent")
        } else if  (e.target.closest("#add-list-button")) {
            modalContent.innerHTML = ""
            modalContent.appendChild(addListItemsForm())
            window.open("#popup", "_parent")
        } else if (e.target.closest(".project-item-container")) {
            modalContent.innerHTML = ""
            const itemList = document.querySelectorAll(".project-item-container")

            itemList.forEach(function callback(value, index) {
              value.addEventListener("click", (event) => {
                console.log("clicked!")

                  event.preventDefault()
                  clearItemListContent()
                  const projectIndex = value.getAttribute("project-id")
                  const listIndex = value.getAttribute("item-id")

                  //TODO: Why is this not appending properly? This logic executes successive times after each click (1, 2, 3, etc.). We are ADDING an event listener EVERY time an item is clicked.
                  modalContent.appendChild(listItemsContent(projectIndex, listIndex))
                  window.open("#popup", "_parent")
              })
            })
        } else if (!e.target.closest(".modal-content")) {
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