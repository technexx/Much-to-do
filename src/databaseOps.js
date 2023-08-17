const ProjectsArray = []
const ListArray = []
const ListItemsArray = []

export function addProject(projectName, list) {
    ProjectsArray.push(new Projects(projectName, list))
    console.log(ProjectsArray)
}

export function addList(list) {
    ListArray.push(list)
}

export function addListItem(item) {
    ListItemsArray.push(item)
}

class Projects {
    constructor (projectName, list) {
        this.projectName = projectName
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