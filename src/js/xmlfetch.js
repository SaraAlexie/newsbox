document.addEventListener("DOMContentLoaded", function () {
    /**
 * This function coverts a DOM Tree into JavaScript Object. 
 * @param srcDOM: DOM Tree to be converted. 
 */
    function xml2json(srcDOM) {
        let children = [...srcDOM.children];

        // base case for recursion. 
        if (!children.length) {
            return srcDOM.innerHTML
        }

        // initializing object to be returned. 
        let jsonResult = {};

        for (let child of children) {

            // checking is child has siblings of same name. 
            let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;

            // if child is array, save the values as array, else as strings. 
            if (childIsArray) {
                if (jsonResult[child.nodeName] === undefined) {
                    jsonResult[child.nodeName] = [xml2json(child)];
                } else {
                    jsonResult[child.nodeName].push(xml2json(child));
                }
            } else {
                jsonResult[child.nodeName] = xml2json(child);
            }
        }

        return jsonResult;
    }

    function myFetch(url) {
        return fetch(url)
            .then(response => response.text())
            .then(result => {
                const parser = new DOMParser()
                const srcDOM = parser.parseFromString(result, "application/xml");
                return xml2json(srcDOM)
            })
    }

    function insertStories(storiesArray, domNode) {
        let list = document.createElement("ul")
        list.classList.add("newslist")
        storiesArray.forEach(story => {
            const listItem = document.createElement("li")
            listItem.classList.add("newslist__item")
            listItem.innerHTML = `
                <a href="${story.link}" target="blank" class="newslist__link">
                    <div class="newslist__news">
                        <img src="/img/news-photo.jpeg" alt="Picture of newspapers" class="newslist__img">
                        <div class="newslist__text">
                            <h2 class="newslist__title">${story.title}</h2>
                            <p class="newslist__description">${story.description}</p>
                        </div>
                    </div>
                </a>
                <div class="newslist__none">
                    <i class="fas fa-inbox save-inbox"></i>
                </div>
                `
            list.append(listItem)

            let newsLink = listItem.querySelector(".newslist__link")
            newsLink.addEventListener("click", function (e) {

                //console.log(listItem.classList.contains("newslist__item--swiped"))
                if (listItem.classList.contains("newslist__item--swiped"))
                    e.preventDefault()
            })

            swipeCatch(listItem, function () { //Når vi har swiped giver vi den styling fra det classname vi tilføjer
                //listItem.style.backgroundColor = "red";
                listItem.classList.add("newslist__item--swiped")
                let saveBtn = listItem.querySelector(".newslist__none")
                saveBtn.addEventListener("click", function () {
                    let title = listItem.querySelector(".newslist__title").textContent
                    let description = listItem.querySelector(".newslist__description").textContent
                    let newsContainer = listItem.closest(".collapsible__theme")
                    let category = newsContainer.querySelector(".collapsible__btn").textContent
                    var stored = JSON.parse(localStorage.getItem(category.trim())) || []
                    let object = {}
                    object.title = title
                    object.description = description
                    if (stored.findIndex(saved => saved.title == object.title) == -1)
                        stored.push(object)
                    localStorage.setItem(category.trim(), JSON.stringify(stored))
                    //console.log(category);
                    console.log(stored);

                })
            })

            swipeCatch(listItem, function () {
                listItem.classList.remove("newslist__item--swiped")
                listItem.classList.add("newslist__item--swipedBack")
            }, false)
        })

        domNode.append(list)
    }

    const businessElm = document.querySelector(".business")
    const healthElm = document.querySelector(".health")
    const sportsElm = document.querySelector(".sports")
    const technologyElm = document.querySelector(".technology")
    const travelElm = document.querySelector(".travel")
    const usElm = document.querySelector(".us")
    const worldElm = document.querySelector(".world")

    const arcBusiness = document.querySelector(".businessArc")
    const arcHealth = document.querySelector(".healthArc")
    const arcSports = document.querySelector(".sportsArc")
    const arcTechnology = document.querySelector(".technologyArc")
    const arcTravel = document.querySelector(".travelArc")
    const arcUs = document.querySelector(".usArc")
    const arcWorld = document.querySelector(".worldArc")

    if (arcBusiness, arcHealth, arcSports, arcTechnology, arcTravel, arcUs, arcWorld) {

        let catArray = ["BUSINESS", "HEALTH", "SPORTS", "TECHNOLOGY", "TRAVEL", "US", "WORLD"]
        catArray.forEach(category => {
            let savedArticles = localStorage.getItem(category)
            console.log(typeof (savedArticles))
            if (typeof (savedArticles) == "string") {
                let articlesArr = Array.from(JSON.parse(savedArticles))
                articlesArr.forEach(article => console.log(article.title))
                //console.log(typeof(bla))
                insertStories(articlesArr, "arc" + category.toLowerCase)
            }
        })

    }

    if (businessElm, healthElm, sportsElm, technologyElm, travelElm, usElm, worldElm) {

        if (localStorage.getItem("switch__business") === "false") {
            businessElm.parentElement.style.display = "none"
        } else {
            myFetch("https://rss.nytimes.com/services/xml/rss/nyt/Business.xml")
                .then(jsonResult => insertStories(jsonResult.rss.channel.item, businessElm))
        }

        if (localStorage.getItem("switch__health") === "false") {
            healthElm.parentElement.style.display = "none"
        } else {
            myFetch("https://rss.nytimes.com/services/xml/rss/nyt/Health.xml")
                .then(jsonResult => insertStories(jsonResult.rss.channel.item, healthElm))
        }

        if (localStorage.getItem("switch__sports") === "false") {
            sportsElm.parentElement.style.display = "none"
        } else {
            myFetch("https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml")
                .then(jsonResult => insertStories(jsonResult.rss.channel.item, sportsElm))
        }

        if (localStorage.getItem("switch__technology") === "false") {
            technologyElm.parentElement.style.display = "none"
        } else {
            myFetch("https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml")
                .then(jsonResult => insertStories(jsonResult.rss.channel.item, technologyElm))
        }

        if (localStorage.getItem("switch__travel") === "false") {
            travelElm.parentElement.style.display = "none"
        } else {
            myFetch("https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml")
                .then(jsonResult => insertStories(jsonResult.rss.channel.item, travelElm))
        }

        if (localStorage.getItem("switch__us") === "false") {
            usElm.parentElement.style.display = "none"
        } else {
            myFetch("https://rss.nytimes.com/services/xml/rss/nyt/US.xml")
                .then(jsonResult => insertStories(jsonResult.rss.channel.item, usElm))
        }

        if (localStorage.getItem("switch__world") === "false") {
            worldElm.parentElement.style.display = "none"
        } else {
            myFetch("https://rss.nytimes.com/services/xml/rss/nyt/World.xml")
                .then(jsonResult => insertStories(jsonResult.rss.channel.item, worldElm))
        }
    }


}) //Slutter DOMContentLoaded

