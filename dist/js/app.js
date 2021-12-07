"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

document.addEventListener("DOMContentLoaded", function () {
  var modeBtns = document.querySelector('.theme__Btn');

  var setActiveColorMode = function setActiveColorMode(darkMode) {
    if (darkMode === "true") darkMode = true;

    if (darkMode == true) {
      document.querySelector('link[title="light"]').disabled = true;
      document.querySelector('link[title="dark"]').disabled = false;
      if (modeBtns) modeBtns.innerText = "TOGGLE LIGHT MODE";
    } else {
      document.querySelector('link[title="light"]').disabled = false;
      document.querySelector('link[title="dark"]').disabled = true;
      if (modeBtns) modeBtns.innerText = "TOGGLE DARK MODE";
    }
  };

  var savedSheet = localstModule.read("darkMode");

  if (savedSheet == "true") {
    setActiveColorMode(savedSheet);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme)').matches == "true") {
    localstModule.create("darkMode", true);
    setActiveColorMode(true);
  } else {
    localstModule.create("darkMode", false);
    setActiveColorMode(false);
  }

  if (modeBtns) {
    modeBtns.addEventListener("click", function (event) {
      var savedSheet = localstModule.read("darkMode") == "true";
      var newSheet = !savedSheet;
      localstModule.create("darkMode", newSheet);
      setActiveColorMode(newSheet);
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  var dropdown = document.getElementsByClassName("collapsible__btn");

  if (dropdown) {
    var i;

    for (i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", function () {
        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }

        var arrow = this.querySelector(".fa-chevron-right");

        if (arrow.classList.contains("rotated")) {
          arrow.classList.remove("rotated");
        } else {
          arrow.classList.add("rotated");
        }
      });
    }
  }
});
document.addEventListener("DOMContentLoaded", function () {
  var goBackElm = document.querySelector(".goBack");

  if (goBackElm) {
    goBackElm.addEventListener("click", function () {
      history.back();
    });
  }
});

var localstModule = function () {
  var create = function create(name, data) {
    if (_typeof(data) == "object") {
      console.log("Hey, du skriver et object!");
      data = JSON.stringify(data);
    }

    localStorage.setItem(name, data);
  };

  var read = function read(name) {
    var readValue = localStorage.getItem(name);

    if (readValue && readValue.charAt(0) === "{" && readValue.endsWith("}")) {
      readValue = JSON.parse(readValue);
    }

    if (readValue && !isNaN(readValue)) {
      readValue = Number(readValue);
    }

    return readValue;
  };

  var remove = function remove(name) {
    localStorage.removeItem(name);
  };

  return {
    create: create,
    read: read,
    remove: remove
  };
}();

function swipeCatch(swipeElm, swipeFunction) {
  var swipingLeft = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var startTouchValue;
  var moveTouchValue;
  var endTouchValue;
  var deadZone = 50;

  var touchStartHandler = function touchStartHandler(e) {
    startTouchValue = e.touches[0].clientX;
  };

  var touchMoveHandler = function touchMoveHandler(e) {
    moveTouchValue = e.touches[0].clientX;
  };

  var touchEndHandler = function touchEndHandler(e) {
    endTouchValue = startTouchValue - moveTouchValue;

    if (Math.abs(endTouchValue) < deadZone) {
      return;
    }

    if (endTouchValue > 0 && swipingLeft || endTouchValue < 0 && !swipingLeft) {
      swipeFunction();
    }
  };

  swipeElm.addEventListener("touchstart", touchStartHandler);
  swipeElm.addEventListener("touchmove", touchMoveHandler);
  swipeElm.addEventListener("touchend", touchEndHandler);
}

document.addEventListener("DOMContentLoaded", function () {
  var toggleNames = ["business", "health", "sports", "technology", "travel", "us", "world"];

  if (document.querySelector(".switch__" + toggleNames[0])) {
    toggleNames.forEach(function (category) {
      var toggle = document.querySelector(".switch__" + category);
      toggle.addEventListener("click", function () {
        localStorage.setItem("switch__" + category, toggle.checked);
      });

      if (localStorage.getItem("switch__" + category) === "false") {
        toggle.checked = false;
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  function xml2json(srcDOM) {
    var children = _toConsumableArray(srcDOM.children);

    if (!children.length) {
      return srcDOM.innerHTML;
    }

    var jsonResult = {};

    var _iterator = _createForOfIteratorHelper(children),
        _step;

    try {
      var _loop = function _loop() {
        var child = _step.value;
        var childIsArray = children.filter(function (eachChild) {
          return eachChild.nodeName === child.nodeName;
        }).length > 1;

        if (childIsArray) {
          if (jsonResult[child.nodeName] === undefined) {
            jsonResult[child.nodeName] = [xml2json(child)];
          } else {
            jsonResult[child.nodeName].push(xml2json(child));
          }
        } else {
          jsonResult[child.nodeName] = xml2json(child);
        }
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return jsonResult;
  }

  function myFetch(url) {
    return fetch(url).then(function (response) {
      return response.text();
    }).then(function (result) {
      var parser = new DOMParser();
      var srcDOM = parser.parseFromString(result, "application/xml");
      return xml2json(srcDOM);
    });
  }

  function insertStories(storiesArray, domNode) {
    var list = document.createElement("ul");
    list.classList.add("newslist");
    storiesArray.forEach(function (story) {
      var listItem = document.createElement("li");
      listItem.classList.add("newslist__item");
      listItem.innerHTML = "\n                <a href=\"".concat(story.link, "\" target=\"blank\" class=\"newslist__link\">\n                    <div class=\"newslist__news\">\n                        <img src=\"/img/news-photo.jpeg\" alt=\"Picture of newspapers\" class=\"newslist__img\">\n                        <div class=\"newslist__text\">\n                            <h2 class=\"newslist__title\">").concat(story.title, "</h2>\n                            <p class=\"newslist__description\">").concat(story.description, "</p>\n                        </div>\n                    </div>\n                </a>\n                <div class=\"newslist__none\">\n                    <i class=\"fas fa-inbox save-inbox\"></i>\n                </div>\n                ");
      list.append(listItem);
      var newsLink = listItem.querySelector(".newslist__link");
      newsLink.addEventListener("click", function (e) {
        if (listItem.classList.contains("newslist__item--swiped")) e.preventDefault();
      });
      swipeCatch(listItem, function () {
        listItem.classList.add("newslist__item--swiped");
        var saveBtn = listItem.querySelector(".newslist__none");
        saveBtn.addEventListener("click", function () {
          var title = listItem.querySelector(".newslist__title").textContent;
          var description = listItem.querySelector(".newslist__description").textContent;
          var newsContainer = listItem.closest(".collapsible__theme");
          var category = newsContainer.querySelector(".collapsible__btn").textContent;
          var stored = JSON.parse(localStorage.getItem(category.trim())) || [];
          var object = {};
          object.title = title;
          object.description = description;
          if (stored.findIndex(function (saved) {
            return saved.title == object.title;
          }) == -1) stored.push(object);
          localStorage.setItem(category.trim(), JSON.stringify(stored));
          console.log(stored);
        });
      });
      swipeCatch(listItem, function () {
        listItem.classList.remove("newslist__item--swiped");
        listItem.classList.add("newslist__item--swipedBack");
      }, false);
    });
    domNode.append(list);
  }

  var businessElm = document.querySelector(".business");
  var healthElm = document.querySelector(".health");
  var sportsElm = document.querySelector(".sports");
  var technologyElm = document.querySelector(".technology");
  var travelElm = document.querySelector(".travel");
  var usElm = document.querySelector(".us");
  var worldElm = document.querySelector(".world");
  var arcBusiness = document.querySelector(".businessArc");
  var arcHealth = document.querySelector(".healthArc");
  var arcSports = document.querySelector(".sportsArc");
  var arcTechnology = document.querySelector(".technologyArc");
  var arcTravel = document.querySelector(".travelArc");
  var arcUs = document.querySelector(".usArc");
  var arcWorld = document.querySelector(".worldArc");

  if (arcBusiness, arcHealth, arcSports, arcTechnology, arcTravel, arcUs, arcWorld) {
    var catArray = ["BUSINESS", "HEALTH", "SPORTS", "TECHNOLOGY", "TRAVEL", "US", "WORLD"];
    catArray.forEach(function (category) {
      var savedArticles = localStorage.getItem(category);
      console.log(_typeof(savedArticles));

      if (typeof savedArticles == "string") {
        var articlesArr = Array.from(JSON.parse(savedArticles));
        articlesArr.forEach(function (article) {
          return console.log(article.title);
        });
        insertStories(articlesArr, "arc" + category.toLowerCase);
      }
    });
  }

  if (businessElm, healthElm, sportsElm, technologyElm, travelElm, usElm, worldElm) {
    if (localStorage.getItem("switch__business") === "false") {
      businessElm.parentElement.style.display = "none";
    } else {
      myFetch("https://rss.nytimes.com/services/xml/rss/nyt/Business.xml").then(function (jsonResult) {
        return insertStories(jsonResult.rss.channel.item, businessElm);
      });
    }

    if (localStorage.getItem("switch__health") === "false") {
      healthElm.parentElement.style.display = "none";
    } else {
      myFetch("https://rss.nytimes.com/services/xml/rss/nyt/Health.xml").then(function (jsonResult) {
        return insertStories(jsonResult.rss.channel.item, healthElm);
      });
    }

    if (localStorage.getItem("switch__sports") === "false") {
      sportsElm.parentElement.style.display = "none";
    } else {
      myFetch("https://rss.nytimes.com/services/xml/rss/nyt/Sports.xml").then(function (jsonResult) {
        return insertStories(jsonResult.rss.channel.item, sportsElm);
      });
    }

    if (localStorage.getItem("switch__technology") === "false") {
      technologyElm.parentElement.style.display = "none";
    } else {
      myFetch("https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml").then(function (jsonResult) {
        return insertStories(jsonResult.rss.channel.item, technologyElm);
      });
    }

    if (localStorage.getItem("switch__travel") === "false") {
      travelElm.parentElement.style.display = "none";
    } else {
      myFetch("https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml").then(function (jsonResult) {
        return insertStories(jsonResult.rss.channel.item, travelElm);
      });
    }

    if (localStorage.getItem("switch__us") === "false") {
      usElm.parentElement.style.display = "none";
    } else {
      myFetch("https://rss.nytimes.com/services/xml/rss/nyt/US.xml").then(function (jsonResult) {
        return insertStories(jsonResult.rss.channel.item, usElm);
      });
    }

    if (localStorage.getItem("switch__world") === "false") {
      worldElm.parentElement.style.display = "none";
    } else {
      myFetch("https://rss.nytimes.com/services/xml/rss/nyt/World.xml").then(function (jsonResult) {
        return insertStories(jsonResult.rss.channel.item, worldElm);
      });
    }
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhcmstbW9kZS5qcyIsImRyb3Bkb3duLmpzIiwiZ29iYWNrLmpzIiwibG9jYWxzdG1vZHVsZS5qcyIsInN3aXBlci5qcyIsInRvZ2dsZXN3aXRjaC5qcyIsInhtbGZldGNoLmpzIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1vZGVCdG5zIiwicXVlcnlTZWxlY3RvciIsInNldEFjdGl2ZUNvbG9yTW9kZSIsImRhcmtNb2RlIiwiZGlzYWJsZWQiLCJpbm5lclRleHQiLCJzYXZlZFNoZWV0IiwibG9jYWxzdE1vZHVsZSIsInJlYWQiLCJ3aW5kb3ciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsImNyZWF0ZSIsImV2ZW50IiwibmV3U2hlZXQiLCJkcm9wZG93biIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpIiwibGVuZ3RoIiwiY29udGVudCIsIm5leHRFbGVtZW50U2libGluZyIsInN0eWxlIiwibWF4SGVpZ2h0Iiwic2Nyb2xsSGVpZ2h0IiwiYXJyb3ciLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInJlbW92ZSIsImFkZCIsImdvQmFja0VsbSIsImhpc3RvcnkiLCJiYWNrIiwibmFtZSIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJyZWFkVmFsdWUiLCJnZXRJdGVtIiwiY2hhckF0IiwiZW5kc1dpdGgiLCJwYXJzZSIsImlzTmFOIiwiTnVtYmVyIiwicmVtb3ZlSXRlbSIsInN3aXBlQ2F0Y2giLCJzd2lwZUVsbSIsInN3aXBlRnVuY3Rpb24iLCJzd2lwaW5nTGVmdCIsInN0YXJ0VG91Y2hWYWx1ZSIsIm1vdmVUb3VjaFZhbHVlIiwiZW5kVG91Y2hWYWx1ZSIsImRlYWRab25lIiwidG91Y2hTdGFydEhhbmRsZXIiLCJlIiwidG91Y2hlcyIsImNsaWVudFgiLCJ0b3VjaE1vdmVIYW5kbGVyIiwidG91Y2hFbmRIYW5kbGVyIiwiTWF0aCIsImFicyIsInRvZ2dsZU5hbWVzIiwiZm9yRWFjaCIsImNhdGVnb3J5IiwidG9nZ2xlIiwiY2hlY2tlZCIsInhtbDJqc29uIiwic3JjRE9NIiwiY2hpbGRyZW4iLCJpbm5lckhUTUwiLCJqc29uUmVzdWx0IiwiY2hpbGQiLCJjaGlsZElzQXJyYXkiLCJmaWx0ZXIiLCJlYWNoQ2hpbGQiLCJub2RlTmFtZSIsInVuZGVmaW5lZCIsInB1c2giLCJteUZldGNoIiwidXJsIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJ0ZXh0IiwicmVzdWx0IiwicGFyc2VyIiwiRE9NUGFyc2VyIiwicGFyc2VGcm9tU3RyaW5nIiwiaW5zZXJ0U3RvcmllcyIsInN0b3JpZXNBcnJheSIsImRvbU5vZGUiLCJsaXN0IiwiY3JlYXRlRWxlbWVudCIsInN0b3J5IiwibGlzdEl0ZW0iLCJsaW5rIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImFwcGVuZCIsIm5ld3NMaW5rIiwicHJldmVudERlZmF1bHQiLCJzYXZlQnRuIiwidGV4dENvbnRlbnQiLCJuZXdzQ29udGFpbmVyIiwiY2xvc2VzdCIsInN0b3JlZCIsInRyaW0iLCJvYmplY3QiLCJmaW5kSW5kZXgiLCJzYXZlZCIsImJ1c2luZXNzRWxtIiwiaGVhbHRoRWxtIiwic3BvcnRzRWxtIiwidGVjaG5vbG9neUVsbSIsInRyYXZlbEVsbSIsInVzRWxtIiwid29ybGRFbG0iLCJhcmNCdXNpbmVzcyIsImFyY0hlYWx0aCIsImFyY1Nwb3J0cyIsImFyY1RlY2hub2xvZ3kiLCJhcmNUcmF2ZWwiLCJhcmNVcyIsImFyY1dvcmxkIiwiY2F0QXJyYXkiLCJzYXZlZEFydGljbGVzIiwiYXJ0aWNsZXNBcnIiLCJBcnJheSIsImZyb20iLCJhcnRpY2xlIiwidG9Mb3dlckNhc2UiLCJwYXJlbnRFbGVtZW50IiwiZGlzcGxheSIsInJzcyIsImNoYW5uZWwiLCJpdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsUUFBQSxDQUFBQyxnQkFBQSxDQUFBLGtCQUFBLEVBQUEsWUFBQTtBQUNBLE1BQUFDLFFBQUEsR0FBQUYsUUFBQSxDQUFBRyxhQUFBLENBQUEsYUFBQSxDQUFBOztBQUlBLE1BQUFDLGtCQUFBLEdBQUEsU0FBQUEsa0JBQUEsQ0FBQUMsUUFBQSxFQUFBO0FBRUEsUUFBQUEsUUFBQSxLQUFBLE1BQUEsRUFBQUEsUUFBQSxHQUFBLElBQUE7O0FBRUEsUUFBQUEsUUFBQSxJQUFBLElBQUEsRUFBQTtBQUVBTCxNQUFBQSxRQUFBLENBQUFHLGFBQUEsQ0FBQSxxQkFBQSxFQUFBRyxRQUFBLEdBQUEsSUFBQTtBQUNBTixNQUFBQSxRQUFBLENBQUFHLGFBQUEsQ0FBQSxvQkFBQSxFQUFBRyxRQUFBLEdBQUEsS0FBQTtBQUNBLFVBQUFKLFFBQUEsRUFBQUEsUUFBQSxDQUFBSyxTQUFBLEdBQUEsbUJBQUE7QUFFQSxLQU5BLE1BTUE7QUFHQVAsTUFBQUEsUUFBQSxDQUFBRyxhQUFBLENBQUEscUJBQUEsRUFBQUcsUUFBQSxHQUFBLEtBQUE7QUFDQU4sTUFBQUEsUUFBQSxDQUFBRyxhQUFBLENBQUEsb0JBQUEsRUFBQUcsUUFBQSxHQUFBLElBQUE7QUFDQSxVQUFBSixRQUFBLEVBQUFBLFFBQUEsQ0FBQUssU0FBQSxHQUFBLGtCQUFBO0FBQ0E7QUFDQSxHQWpCQTs7QUFtQkEsTUFBQUMsVUFBQSxHQUFBQyxhQUFBLENBQUFDLElBQUEsQ0FBQSxVQUFBLENBQUE7O0FBRUEsTUFBQUYsVUFBQSxJQUFBLE1BQUEsRUFBQTtBQUNBSixJQUFBQSxrQkFBQSxDQUFBSSxVQUFBLENBQUE7QUFDQSxHQUZBLE1BRUEsSUFBQUcsTUFBQSxDQUFBQyxVQUFBLElBQUFELE1BQUEsQ0FBQUMsVUFBQSxDQUFBLHdCQUFBLEVBQUFDLE9BQUEsSUFBQSxNQUFBLEVBQUE7QUFDQUosSUFBQUEsYUFBQSxDQUFBSyxNQUFBLENBQUEsVUFBQSxFQUFBLElBQUE7QUFDQVYsSUFBQUEsa0JBQUEsQ0FBQSxJQUFBLENBQUE7QUFFQSxHQUpBLE1BSUE7QUFDQUssSUFBQUEsYUFBQSxDQUFBSyxNQUFBLENBQUEsVUFBQSxFQUFBLEtBQUE7QUFDQVYsSUFBQUEsa0JBQUEsQ0FBQSxLQUFBLENBQUE7QUFDQTs7QUFFQSxNQUFBRixRQUFBLEVBQUE7QUFDQUEsSUFBQUEsUUFBQSxDQUFBRCxnQkFBQSxDQUFBLE9BQUEsRUFBQSxVQUFBYyxLQUFBLEVBQUE7QUFDQSxVQUFBUCxVQUFBLEdBQUFDLGFBQUEsQ0FBQUMsSUFBQSxDQUFBLFVBQUEsS0FBQSxNQUFBO0FBQ0EsVUFBQU0sUUFBQSxHQUFBLENBQUFSLFVBQUE7QUFFQUMsTUFBQUEsYUFBQSxDQUFBSyxNQUFBLENBQUEsVUFBQSxFQUFBRSxRQUFBO0FBQ0FaLE1BQUFBLGtCQUFBLENBQUFZLFFBQUEsQ0FBQTtBQUVBLEtBUEE7QUFRQTtBQUdBLENBakRBO0FDQUFoQixRQUFBLENBQUFDLGdCQUFBLENBQUEsa0JBQUEsRUFBQSxZQUFBO0FBRUEsTUFBQWdCLFFBQUEsR0FBQWpCLFFBQUEsQ0FBQWtCLHNCQUFBLENBQUEsa0JBQUEsQ0FBQTs7QUFFQSxNQUFBRCxRQUFBLEVBQUE7QUFDQSxRQUFBRSxDQUFBOztBQUVBLFNBQUFBLENBQUEsR0FBQSxDQUFBLEVBQUFBLENBQUEsR0FBQUYsUUFBQSxDQUFBRyxNQUFBLEVBQUFELENBQUEsRUFBQSxFQUFBO0FBQ0FGLE1BQUFBLFFBQUEsQ0FBQUUsQ0FBQSxDQUFBLENBQUFsQixnQkFBQSxDQUFBLE9BQUEsRUFBQSxZQUFBO0FBR0EsWUFBQW9CLE9BQUEsR0FBQSxLQUFBQyxrQkFBQTs7QUFFQSxZQUFBRCxPQUFBLENBQUFFLEtBQUEsQ0FBQUMsU0FBQSxFQUFBO0FBQ0FILFVBQUFBLE9BQUEsQ0FBQUUsS0FBQSxDQUFBQyxTQUFBLEdBQUEsSUFBQTtBQUNBLFNBRkEsTUFFQTtBQUNBSCxVQUFBQSxPQUFBLENBQUFFLEtBQUEsQ0FBQUMsU0FBQSxHQUFBSCxPQUFBLENBQUFJLFlBQUEsR0FBQSxJQUFBO0FBQ0E7O0FBR0EsWUFBQUMsS0FBQSxHQUFBLEtBQUF2QixhQUFBLENBQUEsbUJBQUEsQ0FBQTs7QUFDQSxZQUFBdUIsS0FBQSxDQUFBQyxTQUFBLENBQUFDLFFBQUEsQ0FBQSxTQUFBLENBQUEsRUFBQTtBQUNBRixVQUFBQSxLQUFBLENBQUFDLFNBQUEsQ0FBQUUsTUFBQSxDQUFBLFNBQUE7QUFDQSxTQUZBLE1BRUE7QUFDQUgsVUFBQUEsS0FBQSxDQUFBQyxTQUFBLENBQUFHLEdBQUEsQ0FBQSxTQUFBO0FBQ0E7QUFDQSxPQWxCQTtBQW1CQTtBQUNBO0FBRUEsQ0E5QkE7QUNBQTlCLFFBQUEsQ0FBQUMsZ0JBQUEsQ0FBQSxrQkFBQSxFQUFBLFlBQUE7QUFFQSxNQUFBOEIsU0FBQSxHQUFBL0IsUUFBQSxDQUFBRyxhQUFBLENBQUEsU0FBQSxDQUFBOztBQUdBLE1BQUE0QixTQUFBLEVBQUE7QUFFQUEsSUFBQUEsU0FBQSxDQUFBOUIsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsWUFBQTtBQUNBK0IsTUFBQUEsT0FBQSxDQUFBQyxJQUFBO0FBQ0EsS0FGQTtBQUdBO0FBQ0EsQ0FYQTs7QUNBQSxJQUFBeEIsYUFBQSxHQUFBLFlBQUE7QUFFQSxNQUFBSyxNQUFBLEdBQUEsU0FBQUEsTUFBQSxDQUFBb0IsSUFBQSxFQUFBQyxJQUFBLEVBQUE7QUFFQSxRQUFBLFFBQUFBLElBQUEsS0FBQSxRQUFBLEVBQUE7QUFDQUMsTUFBQUEsT0FBQSxDQUFBQyxHQUFBLENBQUEsNEJBQUE7QUFDQUYsTUFBQUEsSUFBQSxHQUFBRyxJQUFBLENBQUFDLFNBQUEsQ0FBQUosSUFBQSxDQUFBO0FBQ0E7O0FBRUFLLElBQUFBLFlBQUEsQ0FBQUMsT0FBQSxDQUFBUCxJQUFBLEVBQUFDLElBQUE7QUFDQSxHQVJBOztBQVVBLE1BQUF6QixJQUFBLEdBQUEsU0FBQUEsSUFBQSxDQUFBd0IsSUFBQSxFQUFBO0FBQ0EsUUFBQVEsU0FBQSxHQUFBRixZQUFBLENBQUFHLE9BQUEsQ0FBQVQsSUFBQSxDQUFBOztBQUVBLFFBQUFRLFNBQUEsSUFBQUEsU0FBQSxDQUFBRSxNQUFBLENBQUEsQ0FBQSxNQUFBLEdBQUEsSUFBQUYsU0FBQSxDQUFBRyxRQUFBLENBQUEsR0FBQSxDQUFBLEVBQUE7QUFDQUgsTUFBQUEsU0FBQSxHQUFBSixJQUFBLENBQUFRLEtBQUEsQ0FBQUosU0FBQSxDQUFBO0FBQ0E7O0FBRUEsUUFBQUEsU0FBQSxJQUFBLENBQUFLLEtBQUEsQ0FBQUwsU0FBQSxDQUFBLEVBQUE7QUFDQUEsTUFBQUEsU0FBQSxHQUFBTSxNQUFBLENBQUFOLFNBQUEsQ0FBQTtBQUNBOztBQUVBLFdBQUFBLFNBQUE7QUFDQSxHQVpBOztBQWNBLE1BQUFiLE1BQUEsR0FBQSxTQUFBQSxNQUFBLENBQUFLLElBQUEsRUFBQTtBQUNBTSxJQUFBQSxZQUFBLENBQUFTLFVBQUEsQ0FBQWYsSUFBQTtBQUNBLEdBRkE7O0FBSUEsU0FBQTtBQUNBcEIsSUFBQUEsTUFBQSxFQUFBQSxNQURBO0FBRUFKLElBQUFBLElBQUEsRUFBQUEsSUFGQTtBQUdBbUIsSUFBQUEsTUFBQSxFQUFBQTtBQUhBLEdBQUE7QUFNQSxDQXBDQSxFQUFBOztBQ0FBLFNBQUFxQixVQUFBLENBQUFDLFFBQUEsRUFBQUMsYUFBQSxFQUFBO0FBQUEsTUFBQUMsV0FBQSx1RUFBQSxJQUFBO0FBRUEsTUFBQUMsZUFBQTtBQUNBLE1BQUFDLGNBQUE7QUFDQSxNQUFBQyxhQUFBO0FBQ0EsTUFBQUMsUUFBQSxHQUFBLEVBQUE7O0FBRUEsTUFBQUMsaUJBQUEsR0FBQSxTQUFBQSxpQkFBQSxDQUFBQyxDQUFBLEVBQUE7QUFDQUwsSUFBQUEsZUFBQSxHQUFBSyxDQUFBLENBQUFDLE9BQUEsQ0FBQSxDQUFBLEVBQUFDLE9BQUE7QUFDQSxHQUZBOztBQUlBLE1BQUFDLGdCQUFBLEdBQUEsU0FBQUEsZ0JBQUEsQ0FBQUgsQ0FBQSxFQUFBO0FBQ0FKLElBQUFBLGNBQUEsR0FBQUksQ0FBQSxDQUFBQyxPQUFBLENBQUEsQ0FBQSxFQUFBQyxPQUFBO0FBQ0EsR0FGQTs7QUFJQSxNQUFBRSxlQUFBLEdBQUEsU0FBQUEsZUFBQSxDQUFBSixDQUFBLEVBQUE7QUFDQUgsSUFBQUEsYUFBQSxHQUFBRixlQUFBLEdBQUFDLGNBQUE7O0FBRUEsUUFBQVMsSUFBQSxDQUFBQyxHQUFBLENBQUFULGFBQUEsSUFBQUMsUUFBQSxFQUFBO0FBQ0E7QUFDQTs7QUFFQSxRQUFBRCxhQUFBLEdBQUEsQ0FBQSxJQUFBSCxXQUFBLElBQUFHLGFBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQUgsV0FBQSxFQUFBO0FBQ0FELE1BQUFBLGFBQUE7QUFDQTtBQUNBLEdBVkE7O0FBWUFELEVBQUFBLFFBQUEsQ0FBQWxELGdCQUFBLENBQUEsWUFBQSxFQUFBeUQsaUJBQUE7QUFDQVAsRUFBQUEsUUFBQSxDQUFBbEQsZ0JBQUEsQ0FBQSxXQUFBLEVBQUE2RCxnQkFBQTtBQUNBWCxFQUFBQSxRQUFBLENBQUFsRCxnQkFBQSxDQUFBLFVBQUEsRUFBQThELGVBQUE7QUFDQTs7QUM5QkEvRCxRQUFBLENBQUFDLGdCQUFBLENBQUEsa0JBQUEsRUFBQSxZQUFBO0FBR0EsTUFBQWlFLFdBQUEsR0FBQSxDQUFBLFVBQUEsRUFBQSxRQUFBLEVBQUEsUUFBQSxFQUFBLFlBQUEsRUFBQSxRQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQTs7QUFFQSxNQUFBbEUsUUFBQSxDQUFBRyxhQUFBLENBQUEsY0FBQStELFdBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBO0FBQ0FBLElBQUFBLFdBQUEsQ0FBQUMsT0FBQSxDQUFBLFVBQUFDLFFBQUEsRUFBQTtBQUNBLFVBQUFDLE1BQUEsR0FBQXJFLFFBQUEsQ0FBQUcsYUFBQSxDQUFBLGNBQUFpRSxRQUFBLENBQUE7QUFDQUMsTUFBQUEsTUFBQSxDQUFBcEUsZ0JBQUEsQ0FBQSxPQUFBLEVBQUEsWUFBQTtBQUNBdUMsUUFBQUEsWUFBQSxDQUFBQyxPQUFBLENBQUEsYUFBQTJCLFFBQUEsRUFBQUMsTUFBQSxDQUFBQyxPQUFBO0FBQ0EsT0FGQTs7QUFJQSxVQUFBOUIsWUFBQSxDQUFBRyxPQUFBLENBQUEsYUFBQXlCLFFBQUEsTUFBQSxPQUFBLEVBQUE7QUFDQUMsUUFBQUEsTUFBQSxDQUFBQyxPQUFBLEdBQUEsS0FBQTtBQUNBO0FBQ0EsS0FUQTtBQVVBO0FBQ0EsQ0FqQkE7QUNBQXRFLFFBQUEsQ0FBQUMsZ0JBQUEsQ0FBQSxrQkFBQSxFQUFBLFlBQUE7QUFLQSxXQUFBc0UsUUFBQSxDQUFBQyxNQUFBLEVBQUE7QUFDQSxRQUFBQyxRQUFBLHNCQUFBRCxNQUFBLENBQUFDLFFBQUEsQ0FBQTs7QUFHQSxRQUFBLENBQUFBLFFBQUEsQ0FBQXJELE1BQUEsRUFBQTtBQUNBLGFBQUFvRCxNQUFBLENBQUFFLFNBQUE7QUFDQTs7QUFHQSxRQUFBQyxVQUFBLEdBQUEsRUFBQTs7QUFUQSwrQ0FXQUYsUUFYQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxZQVdBRyxLQVhBO0FBY0EsWUFBQUMsWUFBQSxHQUFBSixRQUFBLENBQUFLLE1BQUEsQ0FBQSxVQUFBQyxTQUFBO0FBQUEsaUJBQUFBLFNBQUEsQ0FBQUMsUUFBQSxLQUFBSixLQUFBLENBQUFJLFFBQUE7QUFBQSxTQUFBLEVBQUE1RCxNQUFBLEdBQUEsQ0FBQTs7QUFHQSxZQUFBeUQsWUFBQSxFQUFBO0FBQ0EsY0FBQUYsVUFBQSxDQUFBQyxLQUFBLENBQUFJLFFBQUEsQ0FBQSxLQUFBQyxTQUFBLEVBQUE7QUFDQU4sWUFBQUEsVUFBQSxDQUFBQyxLQUFBLENBQUFJLFFBQUEsQ0FBQSxHQUFBLENBQUFULFFBQUEsQ0FBQUssS0FBQSxDQUFBLENBQUE7QUFDQSxXQUZBLE1BRUE7QUFDQUQsWUFBQUEsVUFBQSxDQUFBQyxLQUFBLENBQUFJLFFBQUEsQ0FBQSxDQUFBRSxJQUFBLENBQUFYLFFBQUEsQ0FBQUssS0FBQSxDQUFBO0FBQ0E7QUFDQSxTQU5BLE1BTUE7QUFDQUQsVUFBQUEsVUFBQSxDQUFBQyxLQUFBLENBQUFJLFFBQUEsQ0FBQSxHQUFBVCxRQUFBLENBQUFLLEtBQUEsQ0FBQTtBQUNBO0FBekJBOztBQVdBLDBEQUFBO0FBQUE7QUFlQTtBQTFCQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTRCQSxXQUFBRCxVQUFBO0FBQ0E7O0FBRUEsV0FBQVEsT0FBQSxDQUFBQyxHQUFBLEVBQUE7QUFDQSxXQUFBQyxLQUFBLENBQUFELEdBQUEsQ0FBQSxDQUNBRSxJQURBLENBQ0EsVUFBQUMsUUFBQTtBQUFBLGFBQUFBLFFBQUEsQ0FBQUMsSUFBQSxFQUFBO0FBQUEsS0FEQSxFQUVBRixJQUZBLENBRUEsVUFBQUcsTUFBQSxFQUFBO0FBQ0EsVUFBQUMsTUFBQSxHQUFBLElBQUFDLFNBQUEsRUFBQTtBQUNBLFVBQUFuQixNQUFBLEdBQUFrQixNQUFBLENBQUFFLGVBQUEsQ0FBQUgsTUFBQSxFQUFBLGlCQUFBLENBQUE7QUFDQSxhQUFBbEIsUUFBQSxDQUFBQyxNQUFBLENBQUE7QUFDQSxLQU5BLENBQUE7QUFPQTs7QUFFQSxXQUFBcUIsYUFBQSxDQUFBQyxZQUFBLEVBQUFDLE9BQUEsRUFBQTtBQUNBLFFBQUFDLElBQUEsR0FBQWhHLFFBQUEsQ0FBQWlHLGFBQUEsQ0FBQSxJQUFBLENBQUE7QUFDQUQsSUFBQUEsSUFBQSxDQUFBckUsU0FBQSxDQUFBRyxHQUFBLENBQUEsVUFBQTtBQUNBZ0UsSUFBQUEsWUFBQSxDQUFBM0IsT0FBQSxDQUFBLFVBQUErQixLQUFBLEVBQUE7QUFDQSxVQUFBQyxRQUFBLEdBQUFuRyxRQUFBLENBQUFpRyxhQUFBLENBQUEsSUFBQSxDQUFBO0FBQ0FFLE1BQUFBLFFBQUEsQ0FBQXhFLFNBQUEsQ0FBQUcsR0FBQSxDQUFBLGdCQUFBO0FBQ0FxRSxNQUFBQSxRQUFBLENBQUF6QixTQUFBLHlDQUNBd0IsS0FBQSxDQUFBRSxJQURBLG9WQUtBRixLQUFBLENBQUFHLEtBTEEsbUZBTUFILEtBQUEsQ0FBQUksV0FOQTtBQWNBTixNQUFBQSxJQUFBLENBQUFPLE1BQUEsQ0FBQUosUUFBQTtBQUVBLFVBQUFLLFFBQUEsR0FBQUwsUUFBQSxDQUFBaEcsYUFBQSxDQUFBLGlCQUFBLENBQUE7QUFDQXFHLE1BQUFBLFFBQUEsQ0FBQXZHLGdCQUFBLENBQUEsT0FBQSxFQUFBLFVBQUEwRCxDQUFBLEVBQUE7QUFHQSxZQUFBd0MsUUFBQSxDQUFBeEUsU0FBQSxDQUFBQyxRQUFBLENBQUEsd0JBQUEsQ0FBQSxFQUNBK0IsQ0FBQSxDQUFBOEMsY0FBQTtBQUNBLE9BTEE7QUFPQXZELE1BQUFBLFVBQUEsQ0FBQWlELFFBQUEsRUFBQSxZQUFBO0FBRUFBLFFBQUFBLFFBQUEsQ0FBQXhFLFNBQUEsQ0FBQUcsR0FBQSxDQUFBLHdCQUFBO0FBQ0EsWUFBQTRFLE9BQUEsR0FBQVAsUUFBQSxDQUFBaEcsYUFBQSxDQUFBLGlCQUFBLENBQUE7QUFDQXVHLFFBQUFBLE9BQUEsQ0FBQXpHLGdCQUFBLENBQUEsT0FBQSxFQUFBLFlBQUE7QUFDQSxjQUFBb0csS0FBQSxHQUFBRixRQUFBLENBQUFoRyxhQUFBLENBQUEsa0JBQUEsRUFBQXdHLFdBQUE7QUFDQSxjQUFBTCxXQUFBLEdBQUFILFFBQUEsQ0FBQWhHLGFBQUEsQ0FBQSx3QkFBQSxFQUFBd0csV0FBQTtBQUNBLGNBQUFDLGFBQUEsR0FBQVQsUUFBQSxDQUFBVSxPQUFBLENBQUEscUJBQUEsQ0FBQTtBQUNBLGNBQUF6QyxRQUFBLEdBQUF3QyxhQUFBLENBQUF6RyxhQUFBLENBQUEsbUJBQUEsRUFBQXdHLFdBQUE7QUFDQSxjQUFBRyxNQUFBLEdBQUF4RSxJQUFBLENBQUFRLEtBQUEsQ0FBQU4sWUFBQSxDQUFBRyxPQUFBLENBQUF5QixRQUFBLENBQUEyQyxJQUFBLEVBQUEsQ0FBQSxLQUFBLEVBQUE7QUFDQSxjQUFBQyxNQUFBLEdBQUEsRUFBQTtBQUNBQSxVQUFBQSxNQUFBLENBQUFYLEtBQUEsR0FBQUEsS0FBQTtBQUNBVyxVQUFBQSxNQUFBLENBQUFWLFdBQUEsR0FBQUEsV0FBQTtBQUNBLGNBQUFRLE1BQUEsQ0FBQUcsU0FBQSxDQUFBLFVBQUFDLEtBQUE7QUFBQSxtQkFBQUEsS0FBQSxDQUFBYixLQUFBLElBQUFXLE1BQUEsQ0FBQVgsS0FBQTtBQUFBLFdBQUEsS0FBQSxDQUFBLENBQUEsRUFDQVMsTUFBQSxDQUFBNUIsSUFBQSxDQUFBOEIsTUFBQTtBQUNBeEUsVUFBQUEsWUFBQSxDQUFBQyxPQUFBLENBQUEyQixRQUFBLENBQUEyQyxJQUFBLEVBQUEsRUFBQXpFLElBQUEsQ0FBQUMsU0FBQSxDQUFBdUUsTUFBQSxDQUFBO0FBRUExRSxVQUFBQSxPQUFBLENBQUFDLEdBQUEsQ0FBQXlFLE1BQUE7QUFFQSxTQWZBO0FBZ0JBLE9BcEJBLENBQUE7QUFzQkE1RCxNQUFBQSxVQUFBLENBQUFpRCxRQUFBLEVBQUEsWUFBQTtBQUNBQSxRQUFBQSxRQUFBLENBQUF4RSxTQUFBLENBQUFFLE1BQUEsQ0FBQSx3QkFBQTtBQUNBc0UsUUFBQUEsUUFBQSxDQUFBeEUsU0FBQSxDQUFBRyxHQUFBLENBQUEsNEJBQUE7QUFDQSxPQUhBLEVBR0EsS0FIQSxDQUFBO0FBSUEsS0FyREE7QUF1REFpRSxJQUFBQSxPQUFBLENBQUFRLE1BQUEsQ0FBQVAsSUFBQTtBQUNBOztBQUVBLE1BQUFtQixXQUFBLEdBQUFuSCxRQUFBLENBQUFHLGFBQUEsQ0FBQSxXQUFBLENBQUE7QUFDQSxNQUFBaUgsU0FBQSxHQUFBcEgsUUFBQSxDQUFBRyxhQUFBLENBQUEsU0FBQSxDQUFBO0FBQ0EsTUFBQWtILFNBQUEsR0FBQXJILFFBQUEsQ0FBQUcsYUFBQSxDQUFBLFNBQUEsQ0FBQTtBQUNBLE1BQUFtSCxhQUFBLEdBQUF0SCxRQUFBLENBQUFHLGFBQUEsQ0FBQSxhQUFBLENBQUE7QUFDQSxNQUFBb0gsU0FBQSxHQUFBdkgsUUFBQSxDQUFBRyxhQUFBLENBQUEsU0FBQSxDQUFBO0FBQ0EsTUFBQXFILEtBQUEsR0FBQXhILFFBQUEsQ0FBQUcsYUFBQSxDQUFBLEtBQUEsQ0FBQTtBQUNBLE1BQUFzSCxRQUFBLEdBQUF6SCxRQUFBLENBQUFHLGFBQUEsQ0FBQSxRQUFBLENBQUE7QUFFQSxNQUFBdUgsV0FBQSxHQUFBMUgsUUFBQSxDQUFBRyxhQUFBLENBQUEsY0FBQSxDQUFBO0FBQ0EsTUFBQXdILFNBQUEsR0FBQTNILFFBQUEsQ0FBQUcsYUFBQSxDQUFBLFlBQUEsQ0FBQTtBQUNBLE1BQUF5SCxTQUFBLEdBQUE1SCxRQUFBLENBQUFHLGFBQUEsQ0FBQSxZQUFBLENBQUE7QUFDQSxNQUFBMEgsYUFBQSxHQUFBN0gsUUFBQSxDQUFBRyxhQUFBLENBQUEsZ0JBQUEsQ0FBQTtBQUNBLE1BQUEySCxTQUFBLEdBQUE5SCxRQUFBLENBQUFHLGFBQUEsQ0FBQSxZQUFBLENBQUE7QUFDQSxNQUFBNEgsS0FBQSxHQUFBL0gsUUFBQSxDQUFBRyxhQUFBLENBQUEsUUFBQSxDQUFBO0FBQ0EsTUFBQTZILFFBQUEsR0FBQWhJLFFBQUEsQ0FBQUcsYUFBQSxDQUFBLFdBQUEsQ0FBQTs7QUFFQSxNQUFBdUgsV0FBQSxFQUFBQyxTQUFBLEVBQUFDLFNBQUEsRUFBQUMsYUFBQSxFQUFBQyxTQUFBLEVBQUFDLEtBQUEsRUFBQUMsUUFBQSxFQUFBO0FBRUEsUUFBQUMsUUFBQSxHQUFBLENBQUEsVUFBQSxFQUFBLFFBQUEsRUFBQSxRQUFBLEVBQUEsWUFBQSxFQUFBLFFBQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBO0FBQ0FBLElBQUFBLFFBQUEsQ0FBQTlELE9BQUEsQ0FBQSxVQUFBQyxRQUFBLEVBQUE7QUFDQSxVQUFBOEQsYUFBQSxHQUFBMUYsWUFBQSxDQUFBRyxPQUFBLENBQUF5QixRQUFBLENBQUE7QUFDQWhDLE1BQUFBLE9BQUEsQ0FBQUMsR0FBQSxTQUFBNkYsYUFBQTs7QUFDQSxVQUFBLE9BQUFBLGFBQUEsSUFBQSxRQUFBLEVBQUE7QUFDQSxZQUFBQyxXQUFBLEdBQUFDLEtBQUEsQ0FBQUMsSUFBQSxDQUFBL0YsSUFBQSxDQUFBUSxLQUFBLENBQUFvRixhQUFBLENBQUEsQ0FBQTtBQUNBQyxRQUFBQSxXQUFBLENBQUFoRSxPQUFBLENBQUEsVUFBQW1FLE9BQUE7QUFBQSxpQkFBQWxHLE9BQUEsQ0FBQUMsR0FBQSxDQUFBaUcsT0FBQSxDQUFBakMsS0FBQSxDQUFBO0FBQUEsU0FBQTtBQUVBUixRQUFBQSxhQUFBLENBQUFzQyxXQUFBLEVBQUEsUUFBQS9ELFFBQUEsQ0FBQW1FLFdBQUEsQ0FBQTtBQUNBO0FBQ0EsS0FUQTtBQVdBOztBQUVBLE1BQUFwQixXQUFBLEVBQUFDLFNBQUEsRUFBQUMsU0FBQSxFQUFBQyxhQUFBLEVBQUFDLFNBQUEsRUFBQUMsS0FBQSxFQUFBQyxRQUFBLEVBQUE7QUFFQSxRQUFBakYsWUFBQSxDQUFBRyxPQUFBLENBQUEsa0JBQUEsTUFBQSxPQUFBLEVBQUE7QUFDQXdFLE1BQUFBLFdBQUEsQ0FBQXFCLGFBQUEsQ0FBQWpILEtBQUEsQ0FBQWtILE9BQUEsR0FBQSxNQUFBO0FBQ0EsS0FGQSxNQUVBO0FBQ0F0RCxNQUFBQSxPQUFBLENBQUEsMkRBQUEsQ0FBQSxDQUNBRyxJQURBLENBQ0EsVUFBQVgsVUFBQTtBQUFBLGVBQUFrQixhQUFBLENBQUFsQixVQUFBLENBQUErRCxHQUFBLENBQUFDLE9BQUEsQ0FBQUMsSUFBQSxFQUFBekIsV0FBQSxDQUFBO0FBQUEsT0FEQTtBQUVBOztBQUVBLFFBQUEzRSxZQUFBLENBQUFHLE9BQUEsQ0FBQSxnQkFBQSxNQUFBLE9BQUEsRUFBQTtBQUNBeUUsTUFBQUEsU0FBQSxDQUFBb0IsYUFBQSxDQUFBakgsS0FBQSxDQUFBa0gsT0FBQSxHQUFBLE1BQUE7QUFDQSxLQUZBLE1BRUE7QUFDQXRELE1BQUFBLE9BQUEsQ0FBQSx5REFBQSxDQUFBLENBQ0FHLElBREEsQ0FDQSxVQUFBWCxVQUFBO0FBQUEsZUFBQWtCLGFBQUEsQ0FBQWxCLFVBQUEsQ0FBQStELEdBQUEsQ0FBQUMsT0FBQSxDQUFBQyxJQUFBLEVBQUF4QixTQUFBLENBQUE7QUFBQSxPQURBO0FBRUE7O0FBRUEsUUFBQTVFLFlBQUEsQ0FBQUcsT0FBQSxDQUFBLGdCQUFBLE1BQUEsT0FBQSxFQUFBO0FBQ0EwRSxNQUFBQSxTQUFBLENBQUFtQixhQUFBLENBQUFqSCxLQUFBLENBQUFrSCxPQUFBLEdBQUEsTUFBQTtBQUNBLEtBRkEsTUFFQTtBQUNBdEQsTUFBQUEsT0FBQSxDQUFBLHlEQUFBLENBQUEsQ0FDQUcsSUFEQSxDQUNBLFVBQUFYLFVBQUE7QUFBQSxlQUFBa0IsYUFBQSxDQUFBbEIsVUFBQSxDQUFBK0QsR0FBQSxDQUFBQyxPQUFBLENBQUFDLElBQUEsRUFBQXZCLFNBQUEsQ0FBQTtBQUFBLE9BREE7QUFFQTs7QUFFQSxRQUFBN0UsWUFBQSxDQUFBRyxPQUFBLENBQUEsb0JBQUEsTUFBQSxPQUFBLEVBQUE7QUFDQTJFLE1BQUFBLGFBQUEsQ0FBQWtCLGFBQUEsQ0FBQWpILEtBQUEsQ0FBQWtILE9BQUEsR0FBQSxNQUFBO0FBQ0EsS0FGQSxNQUVBO0FBQ0F0RCxNQUFBQSxPQUFBLENBQUEsNkRBQUEsQ0FBQSxDQUNBRyxJQURBLENBQ0EsVUFBQVgsVUFBQTtBQUFBLGVBQUFrQixhQUFBLENBQUFsQixVQUFBLENBQUErRCxHQUFBLENBQUFDLE9BQUEsQ0FBQUMsSUFBQSxFQUFBdEIsYUFBQSxDQUFBO0FBQUEsT0FEQTtBQUVBOztBQUVBLFFBQUE5RSxZQUFBLENBQUFHLE9BQUEsQ0FBQSxnQkFBQSxNQUFBLE9BQUEsRUFBQTtBQUNBNEUsTUFBQUEsU0FBQSxDQUFBaUIsYUFBQSxDQUFBakgsS0FBQSxDQUFBa0gsT0FBQSxHQUFBLE1BQUE7QUFDQSxLQUZBLE1BRUE7QUFDQXRELE1BQUFBLE9BQUEsQ0FBQSx5REFBQSxDQUFBLENBQ0FHLElBREEsQ0FDQSxVQUFBWCxVQUFBO0FBQUEsZUFBQWtCLGFBQUEsQ0FBQWxCLFVBQUEsQ0FBQStELEdBQUEsQ0FBQUMsT0FBQSxDQUFBQyxJQUFBLEVBQUFyQixTQUFBLENBQUE7QUFBQSxPQURBO0FBRUE7O0FBRUEsUUFBQS9FLFlBQUEsQ0FBQUcsT0FBQSxDQUFBLFlBQUEsTUFBQSxPQUFBLEVBQUE7QUFDQTZFLE1BQUFBLEtBQUEsQ0FBQWdCLGFBQUEsQ0FBQWpILEtBQUEsQ0FBQWtILE9BQUEsR0FBQSxNQUFBO0FBQ0EsS0FGQSxNQUVBO0FBQ0F0RCxNQUFBQSxPQUFBLENBQUEscURBQUEsQ0FBQSxDQUNBRyxJQURBLENBQ0EsVUFBQVgsVUFBQTtBQUFBLGVBQUFrQixhQUFBLENBQUFsQixVQUFBLENBQUErRCxHQUFBLENBQUFDLE9BQUEsQ0FBQUMsSUFBQSxFQUFBcEIsS0FBQSxDQUFBO0FBQUEsT0FEQTtBQUVBOztBQUVBLFFBQUFoRixZQUFBLENBQUFHLE9BQUEsQ0FBQSxlQUFBLE1BQUEsT0FBQSxFQUFBO0FBQ0E4RSxNQUFBQSxRQUFBLENBQUFlLGFBQUEsQ0FBQWpILEtBQUEsQ0FBQWtILE9BQUEsR0FBQSxNQUFBO0FBQ0EsS0FGQSxNQUVBO0FBQ0F0RCxNQUFBQSxPQUFBLENBQUEsd0RBQUEsQ0FBQSxDQUNBRyxJQURBLENBQ0EsVUFBQVgsVUFBQTtBQUFBLGVBQUFrQixhQUFBLENBQUFsQixVQUFBLENBQUErRCxHQUFBLENBQUFDLE9BQUEsQ0FBQUMsSUFBQSxFQUFBbkIsUUFBQSxDQUFBO0FBQUEsT0FEQTtBQUVBO0FBQ0E7QUFHQSxDQWhNQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBtb2RlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50aGVtZV9fQnRuJyk7XHJcblxyXG4gICAgLy9jb25zb2xlLmxvZyhtb2RlQnRucyk7XHJcblxyXG4gICAgbGV0IHNldEFjdGl2ZUNvbG9yTW9kZSA9IGZ1bmN0aW9uIChkYXJrTW9kZSkge1xyXG5cclxuICAgICAgICBpZiAoZGFya01vZGUgPT09IFwidHJ1ZVwiKSBkYXJrTW9kZSA9IHRydWU7IC8vVGpla2tlciBkYXRhdHlwZW4gYWxsZSBzdGVkZXIgZnVua3Rpb25lbiBibGl2ZXIgYnJ1Z3QuIFNrYWwgdsOmcmUgc3RyaW5nXHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKGRhcmtNb2RlID09IHRydWUpIHtcclxuICAgICAgICAgICAgLy9hY3RpdmF0ZSB0aGUgZGFya21vZGUgc3R5bGVzaGVldCBcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGlua1t0aXRsZT1cImxpZ2h0XCJdJykuZGlzYWJsZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbdGl0bGU9XCJkYXJrXCJdJykuZGlzYWJsZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICBpZihtb2RlQnRucykgbW9kZUJ0bnMuaW5uZXJUZXh0ID0gXCJUT0dHTEUgTElHSFQgTU9ERVwiXHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vYWN0aXZlIHRoZSBsaWdodG1vZGUgc3R5bGVzaGVldFxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbdGl0bGU9XCJkYXJrXCJdJykpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xpbmtbdGl0bGU9XCJsaWdodFwiXScpLmRpc2FibGVkID0gZmFsc2VcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbGlua1t0aXRsZT1cImRhcmtcIl0nKS5kaXNhYmxlZCA9IHRydWVcclxuICAgICAgICAgICAgaWYobW9kZUJ0bnMpIG1vZGVCdG5zLmlubmVyVGV4dCA9IFwiVE9HR0xFIERBUksgTU9ERVwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBzYXZlZFNoZWV0ID0gbG9jYWxzdE1vZHVsZS5yZWFkKFwiZGFya01vZGVcIilcclxuICAgIC8vY29uc29sZS5sb2coc2F2ZWRTaGVldCk7XHJcbiAgICBpZiAoc2F2ZWRTaGVldCA9PSBcInRydWVcIikge1xyXG4gICAgICAgIHNldEFjdGl2ZUNvbG9yTW9kZShzYXZlZFNoZWV0KVxyXG4gICAgfSBlbHNlIGlmICh3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lKScpLm1hdGNoZXMgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICBsb2NhbHN0TW9kdWxlLmNyZWF0ZShcImRhcmtNb2RlXCIsIHRydWUpXHJcbiAgICAgICAgc2V0QWN0aXZlQ29sb3JNb2RlKHRydWUpXHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsb2NhbHN0TW9kdWxlLmNyZWF0ZShcImRhcmtNb2RlXCIsIGZhbHNlKVxyXG4gICAgICAgIHNldEFjdGl2ZUNvbG9yTW9kZShmYWxzZSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kZUJ0bnMpIHtcclxuICAgICAgICBtb2RlQnRucy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIGxldCBzYXZlZFNoZWV0ID0gbG9jYWxzdE1vZHVsZS5yZWFkKFwiZGFya01vZGVcIikgPT0gXCJ0cnVlXCJcclxuICAgICAgICAgICAgbGV0IG5ld1NoZWV0ID0gIXNhdmVkU2hlZXRcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhuZXdTaGVldClcclxuICAgICAgICAgICAgbG9jYWxzdE1vZHVsZS5jcmVhdGUoXCJkYXJrTW9kZVwiLCBuZXdTaGVldClcclxuICAgICAgICAgICAgc2V0QWN0aXZlQ29sb3JNb2RlKG5ld1NoZWV0KVxyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuXHJcbn0pIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGNvbnN0IGRyb3Bkb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbGxhcHNpYmxlX19idG5cIik7XHJcbiAgICBcclxuICAgIGlmIChkcm9wZG93bikge1xyXG4gICAgICAgIHZhciBpO1xyXG5cclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZHJvcGRvd24ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZHJvcGRvd25baV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy90aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29udGVudCA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjb250ZW50KVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IGNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYXJyb3cgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoXCIuZmEtY2hldnJvbi1yaWdodFwiKVxyXG4gICAgICAgICAgICAgICAgaWYoYXJyb3cuY2xhc3NMaXN0LmNvbnRhaW5zKFwicm90YXRlZFwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3cuY2xhc3NMaXN0LnJlbW92ZShcInJvdGF0ZWRcIilcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3cuY2xhc3NMaXN0LmFkZChcInJvdGF0ZWRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcclxuXHJcbiAgICBsZXQgZ29CYWNrRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nb0JhY2tcIik7XHJcbiAgICAvL2NvbnNvbGUubG9nKGdvQmFja0VsbSk7XHJcblxyXG4gICAgaWYoZ29CYWNrRWxtKXtcclxuXHJcbiAgICAgICAgZ29CYWNrRWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBoaXN0b3J5LmJhY2soKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59KSIsImNvbnN0IGxvY2Fsc3RNb2R1bGUgPSAoZnVuY3Rpb24gKCl7XHJcblxyXG4gICAgY29uc3QgY3JlYXRlID0gZnVuY3Rpb24obmFtZSwgZGF0YSl7XHJcblxyXG4gICAgICAgIGlmKHR5cGVvZihkYXRhKSA9PSBcIm9iamVjdFwiKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIZXksIGR1IHNrcml2ZXIgZXQgb2JqZWN0IVwiKVxyXG4gICAgICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBkYXRhKVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlYWQgPSBmdW5jdGlvbihuYW1lKXtcclxuICAgICAgICBsZXQgcmVhZFZhbHVlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZSk7XHJcblxyXG4gICAgICAgIGlmKHJlYWRWYWx1ZSAmJiByZWFkVmFsdWUuY2hhckF0KDApID09PSBcIntcIiAmJiByZWFkVmFsdWUuZW5kc1dpdGgoXCJ9XCIpKXtcclxuICAgICAgICAgICAgcmVhZFZhbHVlID0gSlNPTi5wYXJzZShyZWFkVmFsdWUpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihyZWFkVmFsdWUgJiYgIWlzTmFOKHJlYWRWYWx1ZSkpe1xyXG4gICAgICAgICAgICByZWFkVmFsdWUgPSBOdW1iZXIocmVhZFZhbHVlKVxyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgIHJldHVybiByZWFkVmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVtb3ZlID0gZnVuY3Rpb24obmFtZSl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0obmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjcmVhdGUsIFxyXG4gICAgICAgIHJlYWQsIFxyXG4gICAgICAgIHJlbW92ZVxyXG4gICAgfVxyXG5cclxufSkoKSIsImZ1bmN0aW9uIHN3aXBlQ2F0Y2goc3dpcGVFbG0sIHN3aXBlRnVuY3Rpb24sIHN3aXBpbmdMZWZ0ID0gdHJ1ZSl7XHJcblxyXG4gICAgbGV0IHN0YXJ0VG91Y2hWYWx1ZTtcclxuICAgIGxldCBtb3ZlVG91Y2hWYWx1ZTtcclxuICAgIGxldCBlbmRUb3VjaFZhbHVlO1xyXG4gICAgbGV0IGRlYWRab25lID0gNTA7IC8vRGVhZHpvbmUgYnJ1Z2VzIHRpbCBhdCBiZXNrcml2ZSBkZXQgb21yw6VkZSB1bmRlciBtaW5pbXVtLCBodm9yIGR1IGlra2Uga2FuIHN3aXBlIGVsbGVyIGhhdmUgYW5kZW4gZnVua3Rpb25cclxuXHJcbiAgICBsZXQgdG91Y2hTdGFydEhhbmRsZXIgPSBmdW5jdGlvbihlKXtcclxuICAgICAgICBzdGFydFRvdWNoVmFsdWUgPSBlLnRvdWNoZXNbMF0uY2xpZW50WDsgLy9EZXIgaHZvciB2aSBmw7hyc3QgcsO4cmUgdmVkIHNrw6ZybWVuXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRvdWNoTW92ZUhhbmRsZXIgPSBmdW5jdGlvbihlKXtcclxuICAgICAgICBtb3ZlVG91Y2hWYWx1ZSA9IGUudG91Y2hlc1swXS5jbGllbnRYOyAvL07DpXIgdmkgYmV2w6ZnZXIgZmluZ2VyZW4gb3ZlciBza8Omcm1lblxyXG4gICAgfVxyXG5cclxuICAgIGxldCB0b3VjaEVuZEhhbmRsZXIgPSBmdW5jdGlvbihlKXtcclxuICAgICAgICBlbmRUb3VjaFZhbHVlID0gc3RhcnRUb3VjaFZhbHVlIC0gbW92ZVRvdWNoVmFsdWU7IC8vSHZvciB2aSBlciBuw6VyIHZpIHNsaXBwZXIgZmluZ2VyZW4gZnJhIHNrw6ZybWVuLCBhZnN0YW5kZW4gdmkgaGFyIHN3aXBlZC5cclxuXHJcbiAgICAgICAgaWYoTWF0aC5hYnMoZW5kVG91Y2hWYWx1ZSkgPCBkZWFkWm9uZSl7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoKGVuZFRvdWNoVmFsdWUgPiAwICYmIHN3aXBpbmdMZWZ0KSB8fCAoZW5kVG91Y2hWYWx1ZSA8IDAgJiYgIXN3aXBpbmdMZWZ0KSl7XHJcbiAgICAgICAgICAgIHN3aXBlRnVuY3Rpb24oKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzd2lwZUVsbS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0b3VjaFN0YXJ0SGFuZGxlcik7XHJcbiAgICBzd2lwZUVsbS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHRvdWNoTW92ZUhhbmRsZXIpO1xyXG4gICAgc3dpcGVFbG0uYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRvdWNoRW5kSGFuZGxlcilcclxufSIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAvL2NvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3dpdGNoX19idXNpbmVzc1wiKVxyXG4gICAgY29uc3QgdG9nZ2xlTmFtZXMgPSBbXCJidXNpbmVzc1wiLCBcImhlYWx0aFwiLCBcInNwb3J0c1wiLCBcInRlY2hub2xvZ3lcIiwgXCJ0cmF2ZWxcIiwgXCJ1c1wiLCBcIndvcmxkXCJdXHJcblxyXG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3dpdGNoX19cIiArIHRvZ2dsZU5hbWVzWzBdKSkge1xyXG4gICAgICAgIHRvZ2dsZU5hbWVzLmZvckVhY2goY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zd2l0Y2hfX1wiICsgY2F0ZWdvcnkpXHJcbiAgICAgICAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJzd2l0Y2hfX1wiICsgY2F0ZWdvcnksIHRvZ2dsZS5jaGVja2VkKVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic3dpdGNoX19cIiArIGNhdGVnb3J5KSA9PT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgICAgICB0b2dnbGUuY2hlY2tlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59KSIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8qKlxyXG4gKiBUaGlzIGZ1bmN0aW9uIGNvdmVydHMgYSBET00gVHJlZSBpbnRvIEphdmFTY3JpcHQgT2JqZWN0LiBcclxuICogQHBhcmFtIHNyY0RPTTogRE9NIFRyZWUgdG8gYmUgY29udmVydGVkLiBcclxuICovXHJcbiAgICBmdW5jdGlvbiB4bWwyanNvbihzcmNET00pIHtcclxuICAgICAgICBsZXQgY2hpbGRyZW4gPSBbLi4uc3JjRE9NLmNoaWxkcmVuXTtcclxuXHJcbiAgICAgICAgLy8gYmFzZSBjYXNlIGZvciByZWN1cnNpb24uIFxyXG4gICAgICAgIGlmICghY2hpbGRyZW4ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzcmNET00uaW5uZXJIVE1MXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpbml0aWFsaXppbmcgb2JqZWN0IHRvIGJlIHJldHVybmVkLiBcclxuICAgICAgICBsZXQganNvblJlc3VsdCA9IHt9O1xyXG5cclxuICAgICAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xyXG5cclxuICAgICAgICAgICAgLy8gY2hlY2tpbmcgaXMgY2hpbGQgaGFzIHNpYmxpbmdzIG9mIHNhbWUgbmFtZS4gXHJcbiAgICAgICAgICAgIGxldCBjaGlsZElzQXJyYXkgPSBjaGlsZHJlbi5maWx0ZXIoZWFjaENoaWxkID0+IGVhY2hDaGlsZC5ub2RlTmFtZSA9PT0gY2hpbGQubm9kZU5hbWUpLmxlbmd0aCA+IDE7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiBjaGlsZCBpcyBhcnJheSwgc2F2ZSB0aGUgdmFsdWVzIGFzIGFycmF5LCBlbHNlIGFzIHN0cmluZ3MuIFxyXG4gICAgICAgICAgICBpZiAoY2hpbGRJc0FycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvblJlc3VsdFtjaGlsZC5ub2RlTmFtZV0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGpzb25SZXN1bHRbY2hpbGQubm9kZU5hbWVdID0gW3htbDJqc29uKGNoaWxkKV07XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGpzb25SZXN1bHRbY2hpbGQubm9kZU5hbWVdLnB1c2goeG1sMmpzb24oY2hpbGQpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGpzb25SZXN1bHRbY2hpbGQubm9kZU5hbWVdID0geG1sMmpzb24oY2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ganNvblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBteUZldGNoKHVybCkge1xyXG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3JjRE9NID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhyZXN1bHQsIFwiYXBwbGljYXRpb24veG1sXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHhtbDJqc29uKHNyY0RPTSlcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbnNlcnRTdG9yaWVzKHN0b3JpZXNBcnJheSwgZG9tTm9kZSkge1xyXG4gICAgICAgIGxldCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpXHJcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKFwibmV3c2xpc3RcIilcclxuICAgICAgICBzdG9yaWVzQXJyYXkuZm9yRWFjaChzdG9yeSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXHJcbiAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJuZXdzbGlzdF9faXRlbVwiKVxyXG4gICAgICAgICAgICBsaXN0SXRlbS5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtzdG9yeS5saW5rfVwiIHRhcmdldD1cImJsYW5rXCIgY2xhc3M9XCJuZXdzbGlzdF9fbGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZXdzbGlzdF9fbmV3c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9pbWcvbmV3cy1waG90by5qcGVnXCIgYWx0PVwiUGljdHVyZSBvZiBuZXdzcGFwZXJzXCIgY2xhc3M9XCJuZXdzbGlzdF9faW1nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJuZXdzbGlzdF9fdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVwibmV3c2xpc3RfX3RpdGxlXCI+JHtzdG9yeS50aXRsZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJuZXdzbGlzdF9fZGVzY3JpcHRpb25cIj4ke3N0b3J5LmRlc2NyaXB0aW9ufTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibmV3c2xpc3RfX25vbmVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1pbmJveCBzYXZlLWluYm94XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgIGxpc3QuYXBwZW5kKGxpc3RJdGVtKVxyXG5cclxuICAgICAgICAgICAgbGV0IG5ld3NMaW5rID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihcIi5uZXdzbGlzdF9fbGlua1wiKVxyXG4gICAgICAgICAgICBuZXdzTGluay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGxpc3RJdGVtLmNsYXNzTGlzdC5jb250YWlucyhcIm5ld3NsaXN0X19pdGVtLS1zd2lwZWRcIikpXHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdEl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwibmV3c2xpc3RfX2l0ZW0tLXN3aXBlZFwiKSlcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHN3aXBlQ2F0Y2gobGlzdEl0ZW0sIGZ1bmN0aW9uICgpIHsgLy9Ow6VyIHZpIGhhciBzd2lwZWQgZ2l2ZXIgdmkgZGVuIHN0eWxpbmcgZnJhIGRldCBjbGFzc25hbWUgdmkgdGlsZsO4amVyXHJcbiAgICAgICAgICAgICAgICAvL2xpc3RJdGVtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwibmV3c2xpc3RfX2l0ZW0tLXN3aXBlZFwiKVxyXG4gICAgICAgICAgICAgICAgbGV0IHNhdmVCdG4gPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKFwiLm5ld3NsaXN0X19ub25lXCIpXHJcbiAgICAgICAgICAgICAgICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpdGxlID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcihcIi5uZXdzbGlzdF9fdGl0bGVcIikudGV4dENvbnRlbnRcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZGVzY3JpcHRpb24gPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKFwiLm5ld3NsaXN0X19kZXNjcmlwdGlvblwiKS50ZXh0Q29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdzQ29udGFpbmVyID0gbGlzdEl0ZW0uY2xvc2VzdChcIi5jb2xsYXBzaWJsZV9fdGhlbWVcIilcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2F0ZWdvcnkgPSBuZXdzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuY29sbGFwc2libGVfX2J0blwiKS50ZXh0Q29udGVudFxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdG9yZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKGNhdGVnb3J5LnRyaW0oKSkpIHx8IFtdXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9iamVjdCA9IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnRpdGxlID0gdGl0bGVcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3QuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdG9yZWQuZmluZEluZGV4KHNhdmVkID0+IHNhdmVkLnRpdGxlID09IG9iamVjdC50aXRsZSkgPT0gLTEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3JlZC5wdXNoKG9iamVjdClcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShjYXRlZ29yeS50cmltKCksIEpTT04uc3RyaW5naWZ5KHN0b3JlZCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhjYXRlZ29yeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RvcmVkKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgc3dpcGVDYXRjaChsaXN0SXRlbSwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcIm5ld3NsaXN0X19pdGVtLS1zd2lwZWRcIilcclxuICAgICAgICAgICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJuZXdzbGlzdF9faXRlbS0tc3dpcGVkQmFja1wiKVxyXG4gICAgICAgICAgICB9LCBmYWxzZSlcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkb21Ob2RlLmFwcGVuZChsaXN0KVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ1c2luZXNzRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXNpbmVzc1wiKVxyXG4gICAgY29uc3QgaGVhbHRoRWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5oZWFsdGhcIilcclxuICAgIGNvbnN0IHNwb3J0c0VsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3BvcnRzXCIpXHJcbiAgICBjb25zdCB0ZWNobm9sb2d5RWxtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZWNobm9sb2d5XCIpXHJcbiAgICBjb25zdCB0cmF2ZWxFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRyYXZlbFwiKVxyXG4gICAgY29uc3QgdXNFbG0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnVzXCIpXHJcbiAgICBjb25zdCB3b3JsZEVsbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud29ybGRcIilcclxuXHJcbiAgICBjb25zdCBhcmNCdXNpbmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVzaW5lc3NBcmNcIilcclxuICAgIGNvbnN0IGFyY0hlYWx0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaGVhbHRoQXJjXCIpXHJcbiAgICBjb25zdCBhcmNTcG9ydHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNwb3J0c0FyY1wiKVxyXG4gICAgY29uc3QgYXJjVGVjaG5vbG9neSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGVjaG5vbG9neUFyY1wiKVxyXG4gICAgY29uc3QgYXJjVHJhdmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50cmF2ZWxBcmNcIilcclxuICAgIGNvbnN0IGFyY1VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi51c0FyY1wiKVxyXG4gICAgY29uc3QgYXJjV29ybGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndvcmxkQXJjXCIpXHJcblxyXG4gICAgaWYgKGFyY0J1c2luZXNzLCBhcmNIZWFsdGgsIGFyY1Nwb3J0cywgYXJjVGVjaG5vbG9neSwgYXJjVHJhdmVsLCBhcmNVcywgYXJjV29ybGQpIHtcclxuXHJcbiAgICAgICAgbGV0IGNhdEFycmF5ID0gW1wiQlVTSU5FU1NcIiwgXCJIRUFMVEhcIiwgXCJTUE9SVFNcIiwgXCJURUNITk9MT0dZXCIsIFwiVFJBVkVMXCIsIFwiVVNcIiwgXCJXT1JMRFwiXVxyXG4gICAgICAgIGNhdEFycmF5LmZvckVhY2goY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgc2F2ZWRBcnRpY2xlcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGNhdGVnb3J5KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0eXBlb2YgKHNhdmVkQXJ0aWNsZXMpKVxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChzYXZlZEFydGljbGVzKSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJ0aWNsZXNBcnIgPSBBcnJheS5mcm9tKEpTT04ucGFyc2Uoc2F2ZWRBcnRpY2xlcykpXHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlc0Fyci5mb3JFYWNoKGFydGljbGUgPT4gY29uc29sZS5sb2coYXJ0aWNsZS50aXRsZSkpXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHR5cGVvZihibGEpKVxyXG4gICAgICAgICAgICAgICAgaW5zZXJ0U3RvcmllcyhhcnRpY2xlc0FyciwgXCJhcmNcIiArIGNhdGVnb3J5LnRvTG93ZXJDYXNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJ1c2luZXNzRWxtLCBoZWFsdGhFbG0sIHNwb3J0c0VsbSwgdGVjaG5vbG9neUVsbSwgdHJhdmVsRWxtLCB1c0VsbSwgd29ybGRFbG0pIHtcclxuXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic3dpdGNoX19idXNpbmVzc1wiKSA9PT0gXCJmYWxzZVwiKSB7XHJcbiAgICAgICAgICAgIGJ1c2luZXNzRWxtLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbXlGZXRjaChcImh0dHBzOi8vcnNzLm55dGltZXMuY29tL3NlcnZpY2VzL3htbC9yc3Mvbnl0L0J1c2luZXNzLnhtbFwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oanNvblJlc3VsdCA9PiBpbnNlcnRTdG9yaWVzKGpzb25SZXN1bHQucnNzLmNoYW5uZWwuaXRlbSwgYnVzaW5lc3NFbG0pKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwic3dpdGNoX19oZWFsdGhcIikgPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICBoZWFsdGhFbG0ucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBteUZldGNoKFwiaHR0cHM6Ly9yc3Mubnl0aW1lcy5jb20vc2VydmljZXMveG1sL3Jzcy9ueXQvSGVhbHRoLnhtbFwiKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oanNvblJlc3VsdCA9PiBpbnNlcnRTdG9yaWVzKGpzb25SZXN1bHQucnNzLmNoYW5uZWwuaXRlbSwgaGVhbHRoRWxtKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN3aXRjaF9fc3BvcnRzXCIpID09PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgc3BvcnRzRWxtLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbXlGZXRjaChcImh0dHBzOi8vcnNzLm55dGltZXMuY29tL3NlcnZpY2VzL3htbC9yc3Mvbnl0L1Nwb3J0cy54bWxcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGpzb25SZXN1bHQgPT4gaW5zZXJ0U3Rvcmllcyhqc29uUmVzdWx0LnJzcy5jaGFubmVsLml0ZW0sIHNwb3J0c0VsbSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzd2l0Y2hfX3RlY2hub2xvZ3lcIikgPT09IFwiZmFsc2VcIikge1xyXG4gICAgICAgICAgICB0ZWNobm9sb2d5RWxtLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbXlGZXRjaChcImh0dHBzOi8vcnNzLm55dGltZXMuY29tL3NlcnZpY2VzL3htbC9yc3Mvbnl0L1RlY2hub2xvZ3kueG1sXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihqc29uUmVzdWx0ID0+IGluc2VydFN0b3JpZXMoanNvblJlc3VsdC5yc3MuY2hhbm5lbC5pdGVtLCB0ZWNobm9sb2d5RWxtKSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInN3aXRjaF9fdHJhdmVsXCIpID09PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgdHJhdmVsRWxtLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbXlGZXRjaChcImh0dHBzOi8vcnNzLm55dGltZXMuY29tL3NlcnZpY2VzL3htbC9yc3Mvbnl0L1RyYXZlbC54bWxcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKGpzb25SZXN1bHQgPT4gaW5zZXJ0U3Rvcmllcyhqc29uUmVzdWx0LnJzcy5jaGFubmVsLml0ZW0sIHRyYXZlbEVsbSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzd2l0Y2hfX3VzXCIpID09PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgdXNFbG0ucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBteUZldGNoKFwiaHR0cHM6Ly9yc3Mubnl0aW1lcy5jb20vc2VydmljZXMveG1sL3Jzcy9ueXQvVVMueG1sXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihqc29uUmVzdWx0ID0+IGluc2VydFN0b3JpZXMoanNvblJlc3VsdC5yc3MuY2hhbm5lbC5pdGVtLCB1c0VsbSkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJzd2l0Y2hfX3dvcmxkXCIpID09PSBcImZhbHNlXCIpIHtcclxuICAgICAgICAgICAgd29ybGRFbG0ucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBteUZldGNoKFwiaHR0cHM6Ly9yc3Mubnl0aW1lcy5jb20vc2VydmljZXMveG1sL3Jzcy9ueXQvV29ybGQueG1sXCIpXHJcbiAgICAgICAgICAgICAgICAudGhlbihqc29uUmVzdWx0ID0+IGluc2VydFN0b3JpZXMoanNvblJlc3VsdC5yc3MuY2hhbm5lbC5pdGVtLCB3b3JsZEVsbSkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbn0pIC8vU2x1dHRlciBET01Db250ZW50TG9hZGVkXHJcblxyXG4iXX0=
