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
    for (let i = 0; i < starsItem.length; i++) {
        starsItem[i].style.marginTop = Math.floor(Math.random() * 25 + starsHeight / 10) + "px";
        starsItem[i].style.marginLeft = Math.floor(Math.random() * startsWidth / 4) + "px";
        let starSize = Math.floor(1 + Math.random() * 4) + "px";
        starsItem[i].style.height = starSize;
        starsItem[i].style.width = starSize;
    }
}

setInterval(changeStarPosition, 4000)


// calculator

const costRange = document.querySelector("#cost");
const showCostValue = document.querySelector(".showCostValue");
const initialFeeRange = document.querySelector("#initialFee");
const showInitialFeeValue = document.querySelector(".showInitialFeeValue");
const mortgageTerm = document.querySelector("#mortgageTerm");
const showMortgageTermValue = document.querySelector(".showMortgageTermValue");




costRange.addEventListener("mousedown", function () {
    costRange.addEventListener("mousemove", function () {
        let costValue = costRange.value;
        showCostValue.value = new Intl.NumberFormat('ru-RU').format(costValue);
        // initialFeeRange.max = costValue - 1000;

        // 'en-IN'

    })
});

initialFeeRange.addEventListener("mousedown", function () {
    initialFeeRange.addEventListener("mousemove", function () {

        let initialFeeValue = initialFeeRange.value;
        showInitialFeeValue.value = new Intl.NumberFormat('ru-RU').format(initialFeeValue);

        // if (showInitialFeeValue.value > costValue) {
        //     showInitialFeeValue.value = costValue % 2;
        // }
    })
});

costRange.addEventListener("mousedown", function () {
    mortgageTerm.addEventListener("mousemove", function () {
        let mortgageTermValue = mortgageTerm.value;
        showMortgageTermValue.value = new Intl.NumberFormat('ru-RU').format(mortgageTermValue);
    })
});

const earthTax = 600;
const marsTax = 450;
const venusTax = 300;
const universeTax = 0;
let creditPercent

if ((costRange.value - initialFeeRange.value) < 8000) {
    creditPercent = 3.5
}

else if ((costRange.value - initialFeeRange.value) > 8000 & (costRange.value - initialFeeRange.value) < 13000) {
    creditPercent = 3.5
}

else creditPercent = 2;

let creditAmount = costRange.value - initialFeeRange.value;
