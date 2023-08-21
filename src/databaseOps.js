export const ProjectsArray = []
export const ListArray = []
export const ListItemsArray = []

export function addProjectToLocalStorage() {
    deleteAllLocalObjects()

    const content = document.querySelector("#add-project-title-input")
    const project = new Project(content.value, JSON.stringify(["hello", "goodbye"]))
    localStorage.setItem("project-" + (parseInt(localStorage.length +1)), JSON.stringify(project))
    
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

export function addProjectItems() {

}

export function deleteLocalObject(index) {
    if (localStorage.key(index) !== undefined) {
        localStorage.removeItem(localStorage.key(index))
    }
}

export function deleteAllLocalObjects() {
    localStorage.clear()
}

export function retrieveProject(index) {
    const projectTitle = localStorage.getItem()
}

export function editProject(index, title, list) {
    const project = ProjectsArray[index]
    project.title = title
    project.list = list
}

export function addList(list) {
    ListArray.push(list)
}

export function addListItem(item) {
    ListItemsArray.push(item)
}

class Project {
    constructor (title, list) {
        this.title = title
        this.list = list
    }
}

class List {
    constructor (listName, listItems) {
       this.listName = listName
       this.listItems = listItems 
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