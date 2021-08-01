const mortgageBlock = document.querySelectorAll('.rectangularBlock');




// show items one by one
function showTypesOfMortgages() {
    let i = 0;
    let myInterval = setInterval(function () {
        mortgageBlock[i++].style.marginLeft = '0px';
        if (i == mortgageBlock.length) {
            clearInterval(myInterval);
        }
    }, 400)
}


let observer = new IntersectionObserver(function (e) {
    if (e[0].isIntersecting === true) {
        showTypesOfMortgages()
    }
}, { threshold: [0.4] });

observer.observe(document.querySelector(".baseBlock"));


// STARTS
const starsOnPage = document.querySelectorAll(".stars");

let startsWidth = document.querySelector(".stars1").offsetWidth;
let starsHeight = document.querySelector(".stars1").offsetHeight;


// for left

function starsShine() {
    for (let i = 0; i < starsOnPage.length; i++) {
        for (let stars = 10; stars > 0; stars--) {
            let starLeftItem = starsOnPage[i].appendChild(document.createElement("div"));
            starLeftItem.classList.add('starsItem');

        }
    }
}

starsShine()

function changeStarPosition() {
    let starsItem = document.querySelectorAll(".stars div");
    console.log(starsItem)
    for (let i = 0; i < starsItem.length; i++) {
        starsItem[i].style.marginTop = Math.floor(Math.random() * 25 + starsHeight / 10) + "px";
        starsItem[i].style.marginLeft = Math.floor(Math.random() * startsWidth / 4) + "px";
        let starSize = Math.floor(1 + Math.random() * 4) + "px";
        starsItem[i].style.height = starSize;
        starsItem[i].style.width = starSize;
    }
}

setInterval(changeStarPosition, 4000)