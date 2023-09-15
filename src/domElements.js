import { deleteAllProjects, projectsFromLocalStorage } from "./databaseOps"
import { addListItemListener, listContentListener } from "./eventListeners"
import { deleteSingleProjectButtonListener } from "./eventListeners"
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
    title.maxLength = "40"
    title.placeholder = "Title"
    title.required = "true"

    const desc = document.createElement("input")
    desc.id = "add-list-desc-input"
    desc.type = "text"
    desc.minLength = "1"
    desc.maxLength = "80"
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

export function populateListItemForm(projectIndex, listIndex) {
    const allProjects = projectsFromLocalStorage()
    const project = allProjects[projectIndex]

    const modifiedProject = JSON.parse(project)
    const listItem = modifiedProject.lists[listIndex]

    const title = document.querySelector("#add-list-title-input")
    const desc = document.querySelector("#add-list-desc-input")
    const dueDate = document.querySelector("#add-list-due-date")
    const prioritySelector = document.querySelector("#priority-selector")

    title.value = listItem.title
    desc.value = listItem.description
    dueDate.value = listItem.dueDate

    let priorityIndex = 0
    if (listItem.priority === "normal") priorityIndex = 1
    if (listItem.priority === "high") priorityIndex = 2 
    prioritySelector.selectedIndex = priorityIndex
}

const projectCardContainer = () => {
    const div = document.createElement("div")
    div.classList.add("project-container")
    return div
}

export function populateProjectCards() {
    // deleteAllProjects()
    const projectContainer = document.querySelector(".project-container")
    const allProjects = projectsFromLocalStorage()

    for (let i=0; i<allProjects.length; i++) {
        const projectDiv = document.createElement("div")
        projectDiv.classList.add("projects")

        const projectButtonsDiv = document.createElement("div")
        projectButtonsDiv.classList.add("project-buttons")

        const deleteProjectButton = document.createElement("button")
        deleteProjectButton.setAttribute("id", "delete-project-button")
        deleteProjectButton.innerHTML = "<img src='../src/images/delete.svg'/>"

        const addListButton = document.createElement("button")
        addListButton.setAttribute("id", "add-list-button")
        addListButton.innerHTML = "<img src='../src/images/pencil.svg'/>"

        projectButtonsDiv.appendChild(deleteProjectButton)
        projectButtonsDiv.appendChild(addListButton)

        const titleDiv = document.createElement("div")
        const listDiv = document.createElement("div")
        titleDiv.classList.add("project-title")
        listDiv.classList.add("project-item-array")

        const project = allProjects[i]
        const modifiedProject = JSON.parse(project)
 
        titleDiv.innerText = modifiedProject.title
        projectDiv.appendChild(titleDiv)

        if (modifiedProject.lists !== undefined) {
            const projectItems = modifiedProject.lists
        
            for (let j=0; j<projectItems.length; j++) {
                const itemDiv = document.createElement("div")
                itemDiv.classList.add("project-item-container")
                itemDiv.setAttribute("project-id", i)
                itemDiv.setAttribute("item-id", j)
    
                const title = document.createElement("p")
                title.innerText = projectItems[j].title
                itemDiv.appendChild(title)
                projectDiv.appendChild(itemDiv)
            }
        }

        projectDiv.appendChild(projectButtonsDiv)
        projectContainer.appendChild(projectDiv)
    }

    //Listeners within Projects re-attached here every time Projects update.
    deleteSingleProjectButtonListener()
    listContentListener()
    addListItemListener()
}

export const listItemsContent = () => {
    const itemDiv = document.createElement("div")
    itemDiv.classList.add("project-item-list")

    const projectTitle = document.createElement("p")
    const itemTitle = document.createElement("p")
    const desc = document.createElement("p")
    const dueDate = document.createElement("p")
    const priority = document.createElement("p")
    const isCompleted = document.createElement("p")

    const itemButtonDiv = document.createElement("div")
    itemButtonDiv.classList.add("item-buttons")

    const editButton = document.createElement("button")
    const deleteButton = document.createElement("button")
    editButton.innerHTML = "<img src='../src/images/pencil.svg'/>"
    editButton.style.width = "30px"
    deleteButton.innerHTML = "<img src='../src/images/delete.svg'/>"
    deleteButton.style.width = "30px"

    itemButtonDiv.appendChild(deleteButton)
    itemButtonDiv.appendChild(editButton)

    projectTitle.setAttribute("id", "project-title-in-item")
    itemTitle.setAttribute("id", "item-title")
    desc.setAttribute("id", "item-desc")
    dueDate.setAttribute("id", "item-dueDate")
    priority.setAttribute("id", "item-priority")
    isCompleted.setAttribute("id", "item-isCompleted")
    editButton.setAttribute("id", "edit-item-button")

    itemDiv.append(projectTitle)
    itemDiv.appendChild(itemTitle)
    itemDiv.appendChild(desc)
    itemDiv.appendChild(dueDate)
    itemDiv.appendChild(priority)
    itemDiv.appendChild(isCompleted)
    itemDiv.appendChild(itemButtonDiv)

    return itemDiv
}

export const populateListItemsContent = (projectIndex, listIndex) => {
    const allProjects = projectsFromLocalStorage()
    const project = allProjects[projectIndex]

    const modifiedProject = JSON.parse(project)
    const listItem = modifiedProject.lists[listIndex]

    const projectTitle = document.querySelector("#project-title-in-item")
    const itemTitle = document.querySelector("#item-title")
    const desc = document.querySelector("#item-desc")
    const dueDate = document.querySelector("#item-dueDate")
    const priority = document.querySelector("#item-priority")
    const isCompleted = document.querySelector("#item-isCompleted")

    projectTitle.innerText = modifiedProject.title
    itemTitle.innerText = listItem.title
    desc.innerText = listItem.description
    dueDate.innerText = listItem.dueDate
    priority.innerText = listItem.priority
    isCompleted.innerText = listItem.isCompleted
}

export function clearProjectCards() {
    const projects = document.querySelectorAll(".projects")
    projects.forEach(project => {
        project.remove()
    })
}

export function clearItemListContent() {
    const itemContent = document.querySelectorAll(".project-item-list")
    itemContent.forEach(itemStuff => {
        itemStuff.remove()
    })
}

export function dismissPopup() {
    window.location = "#" 
}