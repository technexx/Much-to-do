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

    //Default behavior of form button is to submit.
    const submitButton = document.createElement("button")
    submitButton.setAttribute("id", "add-project-submit-button")
    submitButton.setAttribute("form", "add-project-form")
    submitButton.type = "submit"
    submitButton.innerText = "Submit"

    addProjectForm.appendChild(title)
    addProjectForm.appendChild(submitButton)

    return addProjectForm
}

const setDefaultAddProjectPopUpVisibility = () => {
    const popup = document.querySelector(".add-project-popup")
    popup.setAttribute("id", "invisible")
}

const projectCardContainer = () => {
    const div = document.createElement("div")
    div.classList.add("project-container")
    return div
}