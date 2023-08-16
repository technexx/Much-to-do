const content = document.querySelector(".content")

export function createDomElements() {
    content.appendChild(projectHeader("Add a project!"))
    content.appendChild(addProjectButton())
    content.appendChild(projectCardContainer())
}

const projectHeader = (title) => {
    const div = document.createElement("div")
    div.classList.add("add-project-header")
    div.innerText = title
    return div
}

const addProjectButton = () => {
    const button = document.createElement("button")
    button.setAttribute("id", "add-project-button")
    button.innerHTML = "<img src='../src/images/plus-circle.svg'/>"
    button.style.width = "100px"
    button.style.backgroundColor = "white"
    return button
}

const projectCardContainer = () => {
    const div = document.createElement("div")
    div.classList.add("project-container")
    return div
}