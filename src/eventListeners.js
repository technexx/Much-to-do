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
            const itemList = document.querySelectorAll(".project-item-container")

          //TODO: listIndex doesn't reset in multiple projects (e.g. second project will continue list index of first)
                //TODO: Add a -# of item as another attribute, doesn't need to be "id".
            itemList.forEach(function callback(value) {
              value.addEventListener("click", (event) => {
                  event.preventDefault()
                  clearItemListContent()
                  //Each project item container has an ID set to its parent project index (e.g. first project card has item containers 'container-0', second has 'container-1', etc.)
                  const projectIndex = value.getAttribute("project-id")
                  const listIndex = value.getAttribute("item-id")

                //   console.log(projectIndex)
                //   console.log(listIndex)

                  const allProjectElements = document.querySelectorAll(".projects")
                  const selectedProject = allProjectElements[projectIndex]

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