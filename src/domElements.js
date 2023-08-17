import { sub } from "date-fns"

const content = document.querySelector(".content")

export function createDomElements() {
    content.appendChild(projectHeader("Add a project!"))
    content.appendChild(addProjectButton())
    content.appendChild(projectCardContainer())
    content.appendChild(addProjectPopUp())
    setDefaultAddProjectPopUpVisibility()

    const addProjectPopUpContent = document.querySelector(".add-project-popup")
    addProjectPopUpContent.appendChild(addProjectForm())
}

export function setEventListeners() {
    addProjectButtonListener()
    addProjectSubmitButtonListener()
}

const projectHeader = (title) => {
    const div = document.createElement("div")
    div.classList.add("add-project-header")
    div.innerText = title
    return div
}

const addProjectButton = () => {
    const button = document.createElement("button")
    button.setAttribute("id", "add-project-button")
    button.innerHTML = "<img src='../src/images/plus-circle.svg'/>"
    button.style.width = "100px"
    button.style.backgroundColor = "white"
    return button
}

const addProjectButtonListener = () => {
    const button = document.querySelector("#add-project-button")
    const popUp = document.querySelector(".add-project-popup")

    button.addEventListener("click", () => {
        if (popUp.getAttribute("id") === "invisible") {
            toggleAddProjectPopUpVisibility(true)
            console.log("is invisible")
        } else {
            toggleAddProjectPopUpVisibility(false)
            console.log("is visible")
        }
    })
}

const addProjectPopUp = () => {
    const div = document.createElement("div")
    div.classList.add("add-project-popup")
    
    return div
}

const addProjectForm = () => {
    const addProjectForm = document.createElement("form")
    addProjectForm.setAttribute("id", "add-project-form")

    const title = document.createElement("input")
    title.id = "add-project-title-input"
    title.type = "text"
    title.minLength = "1"
    title.maxLength = "40"
    title.placeholder = "Title"
    title.required = "true"

    const submitButton = document.createElement("button")
    submitButton.setAttribute("id", "add-project-submit-button")
    submitButton.setAttribute("form", "add-project-form")
    submitButton.type = "submit"
    submitButton.innerText = "Submit"

    addProjectForm.appendChild(title)
    addProjectForm.appendChild(submitButton)

    return addProjectForm
}

const addProjectSubmitButtonListener = () => {
    const button = document.querySelector("#add-project-submit-button")
    button.addEventListener("click", () => {
        console.log("clicked!")
    })
}

const setDefaultAddProjectPopUpVisibility = () => {
    const popup = document.querySelector(".add-project-popup")
    popup.setAttribute("id", "invisible")
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

const projectCardContainer = () => {
    const div = document.createElement("div")
    div.classList.add("project-container")
    return div
}