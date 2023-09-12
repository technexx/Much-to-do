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
    console.log(project)
}

//If key is the same (e.g. project-x already exists), it will overwrite.
export function addBlankProjectToLocalStorage() {
    // deleteAllProjects()
    const numberOfCurrentProject = projectsFromLocalStorage().length

    const content = document.querySelector("#add-project-title-input")
    const project = new Project(content.value, "")
    localStorage.setItem(("project-" + numberOfCurrentProject), JSON.stringify(project))
}

export function deleteSingleProject(index) {
    const keyArray = projectKeyArray()
    localStorage.removeItem(keyArray[index])
}

export function deleteAllProjects() {
    localStorage.clear()
}

export function deleteSingleItem(projectIndex, listIndex) {
    const projectKeyArray = projectKeyArray()
    const projectKey = projectKeyArray[projectIndex]
    const parsedProject = parsedProject(projectIndex)

    const listArray = listArrayFromParsedProject(parsedProject)
    listArray.splice(listIndex, 1, 0)

    const modifiedProject = new Project(parsedProject.title, listArray)
    localStorage.setItem(projectKey, JSON.stringify(modifiedProject))
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