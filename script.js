document.getElementById("check").checked = localStorage.getItem("isTipsDisabled") === "true";
document.getElementById("close-button").addEventListener("click", CloseButton);
document.getElementById("left-arrow").addEventListener("click", LeftArrowClick);
document.getElementById("right-arrow").addEventListener("click", RightArrowClick);
document.getElementById("check").addEventListener("click", changeCheckBox);

let quotes = ["List of available countries in 2021: Spain, Greece, Egypt, Switzerland, Turkey, Cyprus ...",
    "Remember to bring your medical mask !!!",
    "The top 4 safest airlines: Qantas Airways, Qatar Airways, Air New Zealand, Singapore Airlines",
    "Don't waste time while you traveling",
    "Aviasales - search for cheap flights"];
let index = 0;
let navigationList;

if (!document.getElementById("check").checked) {
    window.onload = () => {
        setTimeout(() => document.getElementById("component").removeAttribute("hidden"), 5000);
        initTips();
        keyDownInitialize();
    }
}

function onTips(element) {
    setIndex(element.id);
}

function changeCheckBox() {
    localStorage.setItem("isTipsDisabled", document.getElementById("check").checked);
}

function CloseButton() {
    document.getElementById("component").setAttribute("hidden", "hidden");
}

function LeftArrowClick() {
    setIndex((index - 1 + quotes.length) % quotes.length);
}

function RightArrowClick() {
    setIndex((index + 1) % quotes.length);
}

function createNavigationList() {
    let list = document.getElementById("tip");
    for (let i = 0; i < quotes.length; i++) {
        let element = document.createElement("li");
        element.setAttribute("id", i);
        element.setAttribute("onclick", "onTips(this)")
        list.appendChild(element);
    }
    navigationList = document.querySelectorAll("#tip li");
}

function initTips() {
    createNavigationList();
    setIndex(!Number.isNaN(+localStorage.getItem("currentIndex"))
        ? +localStorage.getItem("currentIndex") : 0);
}

function setIndex(newIndex) {
    navigationList[index].classList.remove("chosen");
    navigationList[newIndex].classList.add("chosen");
    document.getElementById("advice").innerText = quotes[newIndex];

    index = newIndex;
    localStorage.setItem("currentIndex", index);
}

function keyDownInitialize() {
    document.onkeydown = (event) => {
        if (event.key === "Escape") {
            document.getElementById("component").setAttribute("hidden", "true");
        } else if (event.code === "ArrowRight") {
            setIndex((index + 1) % quotes.length);
        } else if (event.code === "ArrowLeft") {
            setIndex((index - 1 + quotes.length) % quotes.length);
        }
    };
}

