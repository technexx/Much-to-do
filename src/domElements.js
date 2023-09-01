import { deleteAllLocalObjects, getProjectsFromLocalStorage } from "./databaseOps"
import { sub } from "date-fns"

const content = document.querySelector(".content")

export function createDomElements() {
    content.appendChild(projectHeader("Add a project!"))
    content.appendChild(addProjectButton())
    content.appendChild(addModal())
    content.appendChild(projectCardContainer())

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

const addModal = () => {
    const modalDiv = document.createElement("div")
    modalDiv.classList.add("modal")
    modalDiv.setAttribute("id", "popup")

    const contentDiv = document.createElement("div")
    contentDiv.classList.add("modal-content")

    modalDiv.appendChild(contentDiv)

    //Todo: Append either add project or add list form to modal depending on button pressed.
    // contentDiv.appendChild(addProjectForm())
    return modalDiv
}

export const addProjectForm = () => {
    const addProjectForm = document.createElement("form")
    addProjectForm.setAttribute("id", "add-project-form")

    const title = document.createElement("input")
    title.id = "add-project-title-input"
    title.type = "text"
    title.minLength = "3"
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

export const addListItemsForm = () => {
    const listItemForm = document.createElement("form")
    listItemForm.setAttribute("id", "add-list-form")

    const title = document.createElement("input")
    title.id = "add-list-title-input"
    title.type = "text"
    title.minLength = "1"
    title.maxLength = "20"
    title.placeholder = "Title"
    title.required = "true"

    const desc = document.createElement("input")
    desc.id = "add-list-desc-input"
    desc.type = "text"
    desc.minLength = "1"
    desc.maxLength = "40"
    desc.placeholder = "Description"
    desc.required = "true"

    const dueDate = document.createElement("input")
    dueDate.id = "add-list-due-date"
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

    const submitButton = document.createElement("button")
    submitButton.setAttribute("id", "add-list-submit-button")
    submitButton.setAttribute("form", "add-list-form")
    submitButton.type = "submit"
    submitButton.innerText = "Submit"

    listItemForm.appendChild(title)
    listItemForm.appendChild(desc)
    listItemForm.appendChild(dueDate)
    listItemForm.appendChild(prioritySelector)
    listItemForm.appendChild(submitButton)

    return listItemForm
}

//TODO: Needs localStorage fetch using both project and list index (which we have set in eventListeners)
export const populateListItemsContent = (projectIndex, listIndex) => {
    const projectArray = getProjectsFromLocalStorage()
    const listArray = projectArray[listIndex].lists

    const itemDiv = document.createElement("div")
    itemDiv.classList.add("project-item-list")

    const title = document.createElement("p")
    const desc = document.createElement("p")
    const dueDate = document.createElement("p")
    const priority = document.createElement("p")
    const isCompleted = document.createElement("p")

    title.innerText = projectItems[listIndex].title
    desc.innerText = projectItems[listIndex].description
    dueDate.innerText = projectItems[listIndex].dueDate
    priority.innerText = projectItems[listIndex].priority
    isCompleted.innerText = projectItems[listIndex].isCompleted

    itemDiv.appendChild(title)
    itemDiv.appendChild(desc)
    itemDiv.appendChild(dueDate)
    itemDiv.appendChild(priority)
    itemDiv.appendChild(isCompleted)

    return itemDiv
}

const projectCardContainer = () => {
    const div = document.createElement("div")
    div.classList.add("project-container")
    return div
}

export function populateProjectCards() {
    // deleteAllLocalObjects()
    const projectContainer = document.querySelector(".project-container")
    const allProjects = getProjectsFromLocalStorage()

    for (let i=0; i<allProjects.length; i++) {
        const projectDiv = document.createElement("div")
        projectDiv.classList.add("projects")
        // projectDiv.setAttribute("id", "project-" + i)

        const addListButton = document.createElement("button")
        addListButton.setAttribute("id", "add-list-button")
        addListButton.innerHTML = "<img src='../src/images/pencil.svg'/>"     

        const titleDiv = document.createElement("div")
        const listDiv = document.createElement("div")
        titleDiv.classList.add("project-title")
        listDiv.classList.add("project-item-array")

        const project = allProjects[i]
        const modifiedProject = JSON.parse(project)
        console.log(project)
        console.log(modifiedProject)

        titleDiv.innerText = modifiedProject.title
        projectDiv.appendChild(titleDiv)

        if (modifiedProject.lists !== undefined) {
            const projectItems = modifiedProject.lists
        
            for (let j=0; j<projectItems.length; j++) {
                const itemDiv = document.createElement("div")
                itemDiv.classList.add("project-item-container")
                itemDiv.setAttribute("id", "container-" + i)
    
                const title = document.createElement("p")
                title.innerText = projectItems[j].title
                itemDiv.appendChild(title)
                projectDiv.appendChild(itemDiv)
            }
        }

        projectDiv.appendChild(addListButton)
        projectContainer.appendChild(projectDiv)
    }
}

export function clearProjectCards() {
    const projects = document.querySelectorAll(".projects")
    projects.forEach(project => {
        project.remove()
    })
}

export function dismissPopup() {
    window.location = "#" 
}