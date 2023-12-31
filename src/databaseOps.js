import { parse } from "date-fns"
import { te } from "date-fns/locale"

export const ProjectsArray = []
export const ListArray = []
export const ListItemsArray = []

export function testPopulation() {
    deleteAllProjects()

    const itemOne = new ListItem("first title", "first desc", "due now", "normal", false)
    const itemTwo = new ListItem("second title", "second desc", "due later", "low", false)

    const project = new Project("Test Project", [itemOne, itemTwo])
    localStorage.setItem(("project-" + 1), JSON.stringify(project))
}

//If key is the same (e.g. project-x already exists), it will overwrite.
export function addBlankProjectToLocalStorage() {
    // deleteAllProjects()
    setProjectKey()

    const content = document.querySelector("#add-project-title-input")
    const project = new Project(content.value, "")
    localStorage.setItem(("project-" + getProjectId()), JSON.stringify(project))
}

function setProjectKey() {
    const currentKey = localStorage.getItem(localStorage.key("project_id"))

    if (currentKey !== null) {
        localStorage.setItem("project_id", (Number(currentKey)+ 1))
    } else {
        localStorage.setItem("project_id", 0)
    }
}

function getProjectId() {
    return localStorage.getItem(localStorage.key("project_id"))
}

export function deleteSingleProject(index) {
    const keyArray = projectKeyArray()
    localStorage.removeItem(keyArray[index])
}

export function deleteAllProjects() {
    localStorage.clear()
}

export function deleteSingleItem(projectIndex, listIndex) {
    const keyArray = projectKeyArray()
    const projectKey = keyArray[projectIndex]
    const project = parsedProject(projectIndex)

    const listArray = listArrayFromParsedProject(project)
    listArray.splice(listIndex, 1)

    const modifiedProject = new Project(project.title, listArray)
    localStorage.setItem(projectKey, JSON.stringify(modifiedProject))

    console.log(localStorage)
}

const projectKeyArray = () => {
    let array = []
    for (let i=0; i<localStorage.length; i++) {
        if (localStorage.key(i).includes("project-")) {
            array.push(localStorage.key(i))
        }
    }
    return array
}
const projectKey = (projectIndex) => {
    const key = projectKeyArray()
    return key[projectIndex]
}

const parsedProject = (projectIndex) => {
    const project = localStorage.getItem(projectKey(projectIndex))
    return JSON.parse(project)
}

export function putItemInLocalStorage(operation, projectIndex, listIndex) {
    const project = parsedProject(projectIndex)
    const listArray = listArrayFromParsedProject(project)
    const item = listItemObjectFromInputForm()

    if (operation === "add") listArray.push(item)
    if (operation === "edit") listArray.splice(listIndex, 1, item)

    const modifiedProject = new Project(project.title, listArray)
    localStorage.setItem(projectKey(projectIndex), JSON.stringify(modifiedProject))
}

const listItemObjectFromInputForm = () => {  
    const title = document.querySelector("#add-list-title-input")
    const desc = document.querySelector("#add-list-desc-input")
    const dueDate = document.querySelector("#add-list-due-date")
    const prioritySelector = document.querySelector("#priority-selector")
    const priority = prioritySelector.options[prioritySelector.selectedIndex].text

    return new ListItem(title.value, desc.value, dueDate.value, priority, false)
}

const listArrayFromParsedProject = (project) => {
    let listArray = []
    if (project.lists !== "") {
        for (let i=0; i<project.lists.length; i++) {
            listArray.push(project.lists[i])
        }
    }
    return listArray
}

export const projectsFromLocalStorage = () => {
    let projects = []
    for (let i=0; i<localStorage.length; i++) {
        if (localStorage.key(i).includes("project-")) {
            projects.push(localStorage.getItem(localStorage.key(i)))
        }
    }
    return projects
}

class Project {
    constructor (title, lists) {
        this.title = title
        this.lists = lists
    }
}

class ListItem {
    constructor (title, description, dueDate, priority, isCompleted) {
        this.title = title; this.description = description; this.dueDate = dueDate; this.priority = priority; this.isCompleted = isCompleted;
    }
}