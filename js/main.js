let mainColor = localStorage.getItem("color_option")
let backgroundOption = true;
let backgroundInterval;
var buttelParent = document.querySelector(".nav-bullet");
window.onscroll = function () {
    let windowScrollTop = window.scrollY;
    let hightSkill = document.querySelector(".our-skill").offsetTop
    if (windowScrollTop >= hightSkill) {
        let allSkill = document.querySelectorAll(".our-skill .skill-box .skill-progress span")
        allSkill.forEach(skill => {
            skill.style.width = skill.dataset.width;
        })
    }
}





if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor)
    document.querySelectorAll(".setting-container ul li").forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === mainColor) {
            element.classList.add("active")
        }
    })
}
let backgroundLocation = localStorage.getItem("background_option");
if (backgroundLocation !== null) {
    if (backgroundLocation === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;

    }
    document.querySelectorAll(".setting-container span").forEach(element => {
        element.classList.remove("active")
    })
    if (backgroundLocation === 'true') {
        document.querySelector(".setting-container .yes").classList.add("active")
    } else {
        document.querySelector(".setting-container .no").classList.add("active")

    }


}
let buttelOption = localStorage.getItem("buttel_option");

if (buttelOption !== null) {
    if (buttelOption === 'show') {
        buttelParent.style.display = "block";
        document.querySelector(".show-option .yes").classList.add("active")


    } else {
        buttelParent.style.display = "none";
        document.querySelector(".show-option .no").classList.add("active")


    }


}
document.querySelector(".icon-setting .fa-cog").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-page").classList.toggle("open")
};




let landingPages = document.querySelector(".landing-page");
let imgpage = ["1.jpg", "2.jpg", "3.jpeg", "4.jpg"];


function randomOption() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(function () {
            let randomNumber = Math.floor(Math.random() * imgpage.length);
            landingPages.style.backgroundImage = `url("img/${imgpage[randomNumber]}")`
        }, 1000)
    }
}
randomOption()
const colorList = document.querySelectorAll(".setting-container ul li");
colorList.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("color_option", e.target.dataset.color)
        activeEle(e);
    })
})
const randomBackground = document.querySelectorAll(".setting-container span");
randomBackground.forEach(span => {
    span.addEventListener("click", (e) => {
        activeEle(e);
        if (e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomOption()
            localStorage.setItem("background_option", true)
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval)

            localStorage.setItem("background_option", false)

        }
    })
})
let ourSkill = document.querySelector(".our-skill")


let ourGallery = document.querySelectorAll(".gallery img")
ourGallery.forEach(img => {
    img.addEventListener('click', (e) => {
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        if (img.alt !== null) {
            let imgHeading = document.createElement("h2");
            imgHeading.innerHTML = img.alt;
            popupBox.appendChild(imgHeading)
        }
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);
        let closeButton = document.createElement("span")
        let closeButtonText = document.createTextNode("x");
        closeButton.appendChild(closeButtonText);
        closeButton.className = "close-button";
        popupBox.appendChild(closeButton)

    })
})
document.addEventListener('click', function (e) {
    if (e.target.className == 'close-button') {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove()
    }
})
const toolEle = document.querySelectorAll(".nav-bullet .bullet")
const links = document.querySelectorAll(".overlay .head a")

function scrollToSomehere(elemet) {
    elemet.forEach(ele => {
        ele.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(e.target.dataset.target).scrollIntoView({
                behavior: "smooth"
            })
        })
    })
}
scrollToSomehere(toolEle);
scrollToSomehere(links);

function activeEle(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    })
    ev.target.classList.add("active")

}
var buttelSpan = document.querySelectorAll(".show-option span");

buttelSpan.forEach(buttel => {
    buttel.addEventListener("click", function (e) {
        if (e.target.dataset.display == "show") {
            buttelParent.style.display = "block";
            localStorage.setItem("buttel_option", "show")
        } else {
            buttelParent.style.display = "none";
            localStorage.setItem("buttel_option", "hide");
        }
    })
})
document.querySelector(".reset-option").onclick = function () {
    // localStorage.clear();
    localStorage.removeItem("color_option")
    localStorage.removeItem("background_option")
    localStorage.removeItem("buttel_option")
    window.location.reload()
}
var menu = document.querySelector(".toggle-menu");
var menuList = document.querySelector(".head ul");

menu.addEventListener("click", function (e) {

    e.stopPropagation();
    e.target.classList.add("menu-active");
    menuList.classList.add("open");
})
menuList.onclick = function (e) {
    e.stopPropagation()
}
document.addEventListener("click", function (e) {
    if (e.target != menu && e.target != menuList) {
        if (menuList.classList.contains("open")) {
            menu.classList.toggle("menu-active");
            menuList.classList.toggle("open");
        }
    }
})