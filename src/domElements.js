import { ProjectsArray } from "./databaseOps"
import { ListArray } from "./databaseOps"
import { ListItemsArray } from "./databaseOps"
import { getProjectTitles } from "./databaseOps"
import { getProjectItems } from "./databaseOps"
import { sub } from "date-fns"

const content = document.querySelector(".content")

export function createDomElements() {
    content.appendChild(projectHeader("Add a project!"))
    content.appendChild(addProjectButton())
    content.appendChild(addProjectPopUp())
    content.appendChild(projectCardContainer())
    setDefaultAddProjectPopUpVisibility()

    const addProjectPopUpContent = document.querySelector(".add-project-popup")
    addProjectPopUpContent.appendChild(addProjectForm())

    populateProjectCards()
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

export function populateProjectCards() {
    const projectTitles = getProjectTitles()
    const projectItems = getProjectItems()
    const projectContainer = document.querySelector(".project-container")

    console.log(projectTitles)
    console.log(projectItems)

    for (let i=0; i<projectTitles.length; i++) {
        const projectDiv = document.createElement("div")
        projectDiv.classList.add("projects")

        const addListItemButton = document.createElement("button")
        addListItemButton.setAttribute("id", "add-list-item")
        addListItemButton.innerHTML = "<img src='../src/images/pencil.svg'/>"
        addListItemButton.style.width = "30px"
        addListItemButton.style.backgroundColor = "white"        

        const titleDiv = document.createElement("div")
        const listDiv = document.createElement("div")
        titleDiv.classList.add("project-title")
        listDiv.classList.add("project-item-array")
    
        titleDiv.innerText = projectTitles[i]

        const projectItemsArray = JSON.parse(projectItems[i])
        // projectDiv.appendChild(projectItemsArray)

        for (let j=0; j<projectItemsArray.length; j++) {
            const itemDiv = document.createElement("div")
            itemDiv.setAttribute("id", "project-list-item")
            itemDiv.innerText = projectItemsArray[j]
            listDiv.appendChild(itemDiv)
        }

        projectDiv.appendChild(titleDiv)
        projectDiv.appendChild(listDiv)
        projectDiv.appendChild(addListItemButton)

        projectContainer.appendChild(projectDiv)
    }
}

export function clearProjectCards() {
    const projects = document.querySelectorAll(".projects")
    projects.forEach(project => {
        project.remove()
    })
    // console.log(projects)
}