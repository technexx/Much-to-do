export const ProjectsArray = []
export const ListArray = []
export const ListItemsArray = []

export function addProject() {
    deleteAllLocalObjects()

    const content = document.querySelector("#add-project-title-input")
    localStorage.setItem("project-title-" + (parseInt(localStorage.length +1)), (content.value))
    localStorage.setItem("project-items-" + (parseInt(localStorage.length )), JSON.stringify(["hello", "goodbye"]))

    console.log(localStorage)
}

export function addProjectItems() {
    
}

export function getProjectTitles() {
    let projectTitles = []

    for (let i=0; i<localStorage.length; i++) {
        if(localStorage.key(i).includes("project-title")) {
            projectTitles.push(localStorage.getItem(localStorage.key(i)))
        }
    }
    return projectTitles
}

export function getProjectItems() {
    let projectItems = []

    for (let i=0; i<localStorage.length; i++) {
        if (localStorage.key(i).includes("project-items")) {
            projectItems.push(localStorage.getItem(localStorage.key(i)))
        }
    }
    return projectItems
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

class Projects {
    constructor (title, list) {
        this.title = title
        this.list = list
    }
}

class Lists {
    constructor (listName, listItems) {
       this.listName = listName
       this.listItems = listItems 
    }
}

class ListItems {
    constructor (title, description, dueDate, priority, isCompleted) {
        this.title = title; this.description = description; this.dueDate = dueDate; this.priority = priority; this.isCompleted = isCompleted;
    }
}

function createAndLogDummyObjects() {
    const listItemOne = new ListItems("itemOne", "does stuff", "1/1/2024", "low", false)
    const listItemTwo = new ListItems("itemTwo", "does more stuff", "5/5/2054", "medium", true)
    const listItemThree = new ListItems("itemThree", "does so much stuff", "3/3/2034", "high", false)
    
    const listOne = new Lists("test list", [listItemOne, listItemTwo, listItemThree])
    
    const projectOne = new Projects("Test Project", listOne)
    
    console.log(projectOne)
}