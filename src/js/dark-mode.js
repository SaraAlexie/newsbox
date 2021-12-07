document.addEventListener("DOMContentLoaded", function () {
    const modeBtns = document.querySelector('.theme__Btn');

    //console.log(modeBtns);

    let setActiveColorMode = function (darkMode) {

        if (darkMode === "true") darkMode = true; //Tjekker datatypen alle steder funktionen bliver brugt. Skal være string
        
        if (darkMode == true) {
            //activate the darkmode stylesheet 
            document.querySelector('link[title="light"]').disabled = true
            document.querySelector('link[title="dark"]').disabled = false
            if(modeBtns) modeBtns.innerText = "TOGGLE LIGHT MODE"

        } else {
            //active the lightmode stylesheet
            //console.log(document.querySelector('link[title="dark"]'))
            document.querySelector('link[title="light"]').disabled = false
            document.querySelector('link[title="dark"]').disabled = true
            if(modeBtns) modeBtns.innerText = "TOGGLE DARK MODE"
        }
    }

    let savedSheet = localstModule.read("darkMode")
    //console.log(savedSheet);
    if (savedSheet == "true") {
        setActiveColorMode(savedSheet)
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme)').matches == "true") {
        localstModule.create("darkMode", true)
        setActiveColorMode(true)

    } else {
        localstModule.create("darkMode", false)
        setActiveColorMode(false)
    }

    if (modeBtns) {
        modeBtns.addEventListener("click", function (event) {
            let savedSheet = localstModule.read("darkMode") == "true"
            let newSheet = !savedSheet
            //console.log(newSheet)
            localstModule.create("darkMode", newSheet)
            setActiveColorMode(newSheet)

        })
    }


})