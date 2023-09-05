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

export function addBlankProjectToLocalStorage() {
    const numberOfCurrentProject = getProjectsFromLocalStorage().length

    const content = document.querySelector("#add-project-title-input")
    const project = new Project(content.value, "")
    localStorage.setItem(("project-" + numberOfCurrentProject), JSON.stringify(project))
}

export function getProjectsFromLocalStorage() {
    let projects = []
    for (let i=0; i<localStorage.length; i++) {
        if (localStorage.key(i).includes("project-")) {
            projects.push(localStorage.getItem(localStorage.key(i)))
        }
    }
    return projects
}

function getProjectKeyArray() {
    let array = []
    for (let i=0; i<localStorage.length; i++) {
        if (localStorage.key(i).includes("project-")) {
            array.push(localStorage.key(i))
        }
    }
    return array
}

export function addProjectItemsToLocalStorage(index) {
    const title = document.querySelector("#add-list-title-input")
    const desc = document.querySelector("#add-list-desc-input")
    const dueDate = document.querySelector("#add-list-due-date")
    const prioritySelector = document.querySelector("#priority-selector")
    const priority = prioritySelector.options[prioritySelector.selectedIndex].text

    const projectKeyArray = getProjectKeyArray()
    const projectKey = projectKeyArray[index]
    const project = localStorage.getItem(projectKey)

    const parsedProject = JSON.parse(project)
    const listArray = []

    //Adds current List object in Project to array.
    if (parsedProject.lists !== "") {
        for (let i=0; i<parsedProject.lists.length; i++) {
            listArray.push(parsedProject.lists[i])
        }
    }
    //Pushes new item into array.
    const newListItem = new ListItem(title.value, desc.value, dueDate.value, priority, false)
    listArray.push(newListItem)

    const modifiedProject = new Project(parsedProject.title, listArray)
    localStorage.setItem(projectKey, JSON.stringify(modifiedProject))
}

export function deleteSingleProject(index) {
    const keyArray = getProjectKeyArray()
    console.log("key is " + keyArray[index])
    console.log("index is " + index)
    localStorage.removeItem(keyArray[index])
}

export function deleteAllProjects() {
    localStorage.clear()
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