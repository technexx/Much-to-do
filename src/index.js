const ProjectsArray = []
const ListArray = []
const ListItemsArray = []

class Projects {
    constructor (projectName, list) {
        this.projectName = projectName
        this.list = list
    }
}

class Lists {
    constructor (listName, listItemsArray) {
       this.listName = listName
       this.listItems = listItems

    }
}

class ListItems {
    constructor (title, description, dueDate, priority, isCompleted) {
        this.title = title; this.description = description; this.dueDate = dueDate; this.priority = priority; this.isCompleted = isCompleted;
    }
}



console.log(new Projects("Test Project", ["item one", "item two", "item three"]))