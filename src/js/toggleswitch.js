document.addEventListener("DOMContentLoaded", function () {

    //const toggle = document.querySelector(".switch__business")
    const toggleNames = ["business", "health", "sports", "technology", "travel", "us", "world"]

    if (document.querySelector(".switch__" + toggleNames[0])) {
        toggleNames.forEach(category => {
            let toggle = document.querySelector(".switch__" + category)
            toggle.addEventListener("click", function () {
                localStorage.setItem("switch__" + category, toggle.checked)
            })

            if (localStorage.getItem("switch__" + category) === "false") {
                toggle.checked = false
            }
        })
    }
})