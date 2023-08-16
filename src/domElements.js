const content = document.querySelector(".content")

export function createDomElements() {
    content.appendChild(projectHeader("Add a project!"))
}

function projectHeader(title) {
    const div = document.createElement("div")
    div.classList.add("add-project-header")
    div.innerText = title
    return div
}