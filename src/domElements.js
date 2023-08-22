import { getProjectsFromLocalStorage } from "./databaseOps"
import { sub } from "date-fns"

const content = document.querySelector(".content")

export function createDomElements() {
    content.appendChild(projectHeader("Add a project!"))
    content.appendChild(addProjectButton())
    content.appendChild(addProjectPopUp())
    content.appendChild(addListPopUp())
    content.appendChild(projectCardContainer())
    setDefaultAddProjectPopUpVisibility()

    const addProjectPopUpContent = document.querySelector(".add-project-popup")
    addProjectPopUpContent.appendChild(addProjectForm())

    const addListPopUpConent = document.querySelector(".add-list-popup")
    addListPopUpConent.appendChild(addListItemsForm())

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

const addListPopUp = () => {
    const div = document.createElement("div")
    div.classList.add("add-list-popup")
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

const addListItemsForm = () => {
    const listItemForm = document.createElement("form")
    listItemForm.setAttribute("id", "add-list-items-form")

    const title = document.createElement("input")
    title.id = "add-list-item-title-input"
    title.type = "text"
    title.minLength = "1"
    title.maxLength = "20"
    title.placeholder = "Title"
    title.required = "true"

    const desc = document.createElement("input")
    desc.id = "add-list-item-desc-input"
    desc.type = "text"
    desc.minLength = "1"
    desc.maxLength = "40"
    desc.placeholder = "Title"
    desc.required = "true"

    const dueDate = document.createElement("input")
    dueDate.id = "add-list-item-due-date"
    dueDate.type = "text"

    const prioritySelector = document.createElement("select")
    prioritySelector.setAttribute("id", "priority-selector")

    const priorityLow = document.createElement("option")
    const priorityNormal = document.createElement("option")
    const priorityHigh = document.createElement("option")

    priorityLow.setAttribute("id", "low-priority")
    priorityNormal.setAttribute("id", "normal-priority")
    priorityHigh.setAttribute("id", "high-priority")

    priorityLow.innerText = "Low"
    priorityNormal.innerText = "Normal"
    priorityHigh.innerText = "High"

    prioritySelector.appendChild(priorityLow)
    prioritySelector.appendChild(priorityNormal)
    prioritySelector.appendChild(priorityHigh)

    listItemForm.appendChild(title)
    listItemForm.appendChild(desc)
    listItemForm.append(dueDate)
    listItemForm.appendChild(buttonDiv)

    buttonDiv.appendChild(priorityLow)
    buttonDiv.appendChild(priorityNormal)
    buttonDiv.appendChild(priorityHigh)
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
    const projectContainer = document.querySelector(".project-container")
    const allProjects = getProjectsFromLocalStorage()

    for (let i=0; i<allProjects.length; i++) {
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

        const project = JSON.parse(allProjects[i])
        console.log(project)

        titleDiv.innerText = project.title

        const projectItems = project.list
    
        const projectsCulled = projectItems.replace("[", "").replace("]", "").replaceAll("\"", "")
        const splitProjects = projectsCulled.split(",")
        console.log(splitProjects)

        for (let j=0; j<splitProjects.length; j++) {
            const itemDiv = document.createElement("div")
            itemDiv.setAttribute("id", "project-list-item")
            itemDiv.innerText = splitProjects[j]
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