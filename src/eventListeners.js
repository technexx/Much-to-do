export function setEventListeners() {
    addProjectButtonListener()
    addProjectSubmitButtonListener()
}

const addProjectButtonListener = () => {
    const button = document.querySelector("#add-project-button")
    const popUp = document.querySelector(".add-project-popup")

    button.addEventListener("click", () => {
        if (popUp.getAttribute("id") === "invisible") {
            toggleAddProjectPopUpVisibility(true)
            console.log("is invisible")
        } else {
            toggleAddProjectPopUpVisibility(false)
            console.log("is visible")
        }
    })
}

const addProjectSubmitButtonListener = () => {
    const button = document.querySelector("#add-project-submit-button")
    button.addEventListener("click", () => {
        console.log("clicked!")
    })
}

const toggleAddProjectPopUpVisibility = (makeVisible) => {
    const popUp = document.querySelector(".add-project-popup")
    if (makeVisible) {
        popUp.setAttribute("id", "visible")
        popUp.style.display = "flex"
    } else {
        popUp.setAttribute("id", "invisible")
        popUp.style.display = "none"
    }
}