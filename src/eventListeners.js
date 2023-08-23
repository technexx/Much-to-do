import { addProjectToLocalStorage } from "./databaseOps"
import { addList } from "./databaseOps"
import { addListItem } from "./databaseOps"
import { clearProjectCards } from "./domElements"
import { populateProjectCards } from "./domElements"

export function setEventListeners() {
    addProjectButtonListener()
    addProjectSubmitButtonListener()
    addListItemButtonListener()
}

const addProjectButtonListener = () => {
    const button = document.querySelector("#add-project-button")
    const popUp = document.querySelector(".add-project-popup")

    button.addEventListener("click", () => {
        if (popUp.getAttribute("id") === "invisible") {
            toggleAddProjectPopUpVisibility(true)
        } else {
            toggleAddProjectPopUpVisibility(false)
        }
    })
}

const addListItemButtonListener = () => {
    const button = document.querySelector("#add-list-button")
    const popUp = document.querySelector(".add-list-popup")

    button.addEventListener("click", () => {
        if (popUp.getAttribute("id") === "invisible") {
            toggleAddProjectPopUpVisibility(true)
        } else {
            toggleAddProjectPopUpVisibility(false)
        }
    })
}

//Form submission reloads page, thus skipping console logs.
const addProjectSubmitButtonListener = () => {
    const button = document.querySelector("#add-project-submit-button")

    button.addEventListener("click", (event) => {
        event.preventDefault()
        toggleAddProjectPopUpVisibility(false)

        addProjectToLocalStorage()

        clearProjectCards()
        populateProjectCards()
    })
}

const toggleAddProjectPopUpVisibility = (makeVisible) => {
    const popUp = document.querySelector(".add-project-popup")
    if (makeVisible) {
        popUp.setAttribute("id", "visible")
        popUp.style.display = "flex"
    } else {
        popUp.setAttribute("id", "invisible")
        popUp.style.display = "none"
    }
}

const toggleAddListPopUpVisibility = (makeVisible) => {
    const popUp = document.querySelector(".add-list-popup")
    if (makeVisible) {
        popUp.setAttribute("id", "visible")
        popUp.style.display = "flex"
    } else {
        popUp.setAttribute("id", "invisible")
        popUp.style.display = "none"
    }
}