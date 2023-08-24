export const ProjectsArray = []
export const ListArray = []
export const ListItemsArray = []

export function addProjectToLocalStorage() {
    deleteAllLocalObjects()

    const numberOfCurrentProject = getProjectsFromLocalStorage().length

    const content = document.querySelector("#add-project-title-input")
    const project = new Project(content.value, JSON.stringify([""]))
    localStorage.setItem(("project-" + numberOfCurrentProject), JSON.stringify(project))
    
    console.log(localStorage)
    console.log(JSON.parse(localStorage.getItem(localStorage.key(0))))
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
    const projectKeyArray = getProjectsFromLocalStorage()
    const projectKey = projectKeyArray[index]
    const project = localStorage.getItem(localStorage.key(projectKey))

    const title = document.querySelector("#add-list-title-input")
    const desc = document.querySelector("#add-list-desc-input")
    const dueDate = document.querySelector("#add-list-due-date")
    const prioritySelector = document.querySelector("#priority-selector")
    const priority = prioritySelector.options[prioritySelector.selectedIndex].text

    const listItem = new ListItem(title.value, desc.value, dueDate.value, priority, false)

    //Converts localStorage project to Project Object, and then pushes the new list into its array of lists.
    let convertedProject = JSON.parse(project)
    console.log("project is " + project)
    console.log("converted project is " + convertedProject)
    convertedProject.List.push(listItem)
    
    console.log(projectKeyArray)
    console.log(projectKey)
    console.log(project)
    console.log(convertedProject)

    localStorage.setItem(("project-" + projectIndex), JSON.stringify(convertedProject))

    console.log(localStorage)
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