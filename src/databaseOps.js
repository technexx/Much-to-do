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

export function addProjectItemsToLocalStorage(index) {
    const title = document.querySelector("#add-list-title-input")
    const desc = document.querySelector("#add-list-desc-input")
    const dueDate = document.querySelector("#add-list-due-date")
    const prioritySelector = document.querySelector("#priority-selector")
    const priority = prioritySelector.options[prioritySelector.selectedIndex].text

    const projectKeyArray = getProjectsFromLocalStorage()
    const projectKey = projectKeyArray[index]
    const project = localStorage.getItem(localStorage.key(projectKey))

    const listItem = new ListItem(title.value, desc.value, dueDate.value, priority, false)

    const parsedProject = JSON.parse(project)
    const listArray = []
    const parsedList = []

    console.log(parsedProject)
    parsedProject.lists = [(new ListItem("boo", "boo", "bap", "what", false))]

    if (parsedProject.lists !== "") {
        // parsedList = JSON.parse(project.lists)
        for (let i=0; i<parsedProject.lists.length; i++) {
            listArray.push (parsedProject.lists[i])
        }
    }
    listArray.push(listItem)
    
    console.log(parsedProject)
    console.log(listArray)

     //TODO: parsedProject.lists needs to be set as array of List objects
    // localStorage.setItem(projectKey, JSON.stringify(parsedProject))

    // console.log(localStorage)
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