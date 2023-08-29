import { te } from "date-fns/locale"

export const ProjectsArray = []
export const ListArray = []
export const ListItemsArray = []

export function testPopulation() {
    deleteAllLocalObjects()

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

    console.log(getProjectKeyArray())
    const projectKey = getProjectKeyArray()[index]
    console.log(projectKey)
    const project = localStorage.getItem(localStorage.key(projectKey))

    const listItem = new ListItem(title.value, desc.value, dueDate.value, priority, false)

    const parsedProject = JSON.parse(project)
    const listArray = []

    parsedProject.lists = [(new ListItem("boo", "boo", "bap", "what", false))]

    //Adds current List object in Project to array.
    if (parsedProject.lists !== "") {
        for (let i=0; i<parsedProject.lists.length; i++) {
            listArray.push (parsedProject.lists[i])
        }
    }
    //Pushes new item into array.
    listArray.push(listItem)
    console.log(JSON.stringify(listArray))
    const modifiedProject = new Project(projectKey, JSON.stringify(listArray))
    console.log(modifiedProject)

    localStorage.setItem(projectKey, modifiedProject)

    const testProject = localStorage.getItem(localStorage.key(projectKey))
    console.log(JSON.parse(testProject))
}

export function deleteAllLocalObjects() {
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

function createAndLogDummyObjects() {
    const listItemOne = new ListItem("itemOne", "does stuff", "1/1/2024", "low", false)
    const listItemTwo = new ListItem("itemTwo", "does more stuff", "5/5/2054", "medium", true)
    const listItemThree = new ListItem("itemThree", "does so much stuff", "3/3/2034", "high", false)
    
    const listOne = new List("test list", [listItemOne, listItemTwo, listItemThree])
    
    const projectOne = new Project("Test Project", listOne)
    
    console.log(projectOne)
}