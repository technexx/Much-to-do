import { createDomElements } from "./domElements.js"
import { setEventListeners } from "./domElements.js"
import { compareAsc, format } from 'date-fns'
import './style.css';

createDomElements()
setEventListeners()

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

const ProjectsArray = []
const ListArray = []
const ListItemsArray = []

function addProject(project) {
    ProjectsArray.push(project)
}

function addList(list) {
    ListArray.push(list)
}

function addListItem(item) {
    ListItemsArray.push(item)
}

function createAndLogDummyObjects() {
    const listItemOne = new ListItems("itemOne", "does stuff", "1/1/2024", "low", false)
    const listItemTwo = new ListItems("itemTwo", "does more stuff", "5/5/2054", "medium", true)
    const listItemThree = new ListItems("itemThree", "does so much stuff", "3/3/2034", "high", false)
    
    const listOne = new Lists("test list", [listItemOne, listItemTwo, listItemThree])
    
    const projectOne = new Projects("Test Project", listOne)
    
    console.log(projectOne)
}