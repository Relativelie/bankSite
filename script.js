// VIDEO
const videoOnPage = document.querySelector("video");
videoOnPage.playbackRate = 0.7;



// show items one by one
const mortgageBlock = document.querySelectorAll('.rectangularBlock');

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
        showTypesOfMortgages();
        observer.disconnect();
    }
}, { threshold: [0.38] });

observer.observe(document.querySelector(".tab-content"));


// STARS
const starsOnPage = document.querySelectorAll(".stars");

let startsWidth = document.querySelector(".stars1").offsetWidth;
let starsHeight = document.querySelector(".stars1").offsetHeight;


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


// CALCULATOR

const minValueOfRange = {
    "mortgageTerm": 10,
    "initialFee": 1000,
    "cost": 35000
}

function createMinValueForRange() {

    for (key in minValueOfRange) {
        document.querySelector(`#${key}`).min = minValueOfRange[key];     
    }

}

createMinValueForRange()

// calculator on front
const costRange = document.querySelector("#cost");
const showCostValue = document.querySelector(".showCostValue");
const initialFeeRange = document.querySelector("#initialFee");
const showInitialFeeValue = document.querySelector(".showInitialFeeValue");
const mortgageTermRange = document.querySelector("#mortgageTerm");
const showMortgageTermValue = document.querySelector(".showMortgageTermValue");



// range block for front
costRange.addEventListener("input", changeCostValueWhenChangeRange);
showCostValue.addEventListener("input", changeCostValueWhenChangeInput);


function changeCostValueWhenChangeInput() {
    let costInputValue = showCostValue.value.replaceAll(' ', '');
    costInputValue = parseInt(costInputValue);
    costRange.value = costInputValue;
}

function changeCostValueWhenChangeRange() {
    let costValue = costRange.value;
    // convert to local format
    showCostValue.value = costValue.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
};

function changeMaxInitialFeeValue(e) {
    initialFeeRange.max = parseInt(showCostValue.value.replaceAll(' ', '')) - 25000;
}


function changeInitialFeeValueWhenChangeRangeOrInput(e) {
    let valueForInitialFee = 0;
    if (e.target.classList[1] === "myRangeinitialFee") {
        valueForInitialFee = initialFeeRange.value;
        showInitialFeeValue.value = valueForInitialFee.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }
    else {
        valueForInitialFee = showInitialFeeValue.value.replaceAll(' ', '');
        initialFeeRange.value = valueForInitialFee;
    }
};

function changeMortgageTermValueWhenChangeRangeOrInput(e) {
    let mortgageTermValue
    if (e.target.classList[1] === "myRangeTerm") {
        mortgageTermValue = mortgageTermRange.value;
        showMortgageTermValue.value = mortgageTermValue.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }

    else {
        mortgageTermValue = showMortgageTermValue.value.replaceAll(' ', '');
        mortgageTermRange.value = mortgageTermValue.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
    }
    
}
mortgageTermRange.addEventListener("input", changeMortgageTermValueWhenChangeRangeOrInput);
showMortgageTermValue.addEventListener("input", changeMortgageTermValueWhenChangeRangeOrInput);

// taxes is depended on place
// interest rate
// interest rate for calculate monthly payment
let locationTaxes = document.querySelector(".locationTaxes");
let difCostAndInitialFee = 0;

function interestRate() {


    let creditPercent;

    difCostAndInitialFee =  parseInt(costRange.value) - parseInt(initialFeeRange.value);


    if (locationTaxes.options[locationTaxes.selectedIndex].text === "Earth") {
        if (difCostAndInitialFee < 80000) {
            creditPercent = 5.5;
        }

        else if (difCostAndInitialFee > 80000 && difCostAndInitialFee < 130000) {
            creditPercent = 4.5;
        }

        else creditPercent = 3;
    }

    else if (locationTaxes.options[locationTaxes.selectedIndex].text === "Mars") {
        if (difCostAndInitialFee < 80000) {
            creditPercent = 5;
        }

        else if (difCostAndInitialFee > 80000 && difCostAndInitialFee < 130000) {
            creditPercent = 4;
        }

        else creditPercent = 2.5;
    }

    else if (locationTaxes.options[locationTaxes.selectedIndex].text === "Venus") {
        if (difCostAndInitialFee < 80000) {
            creditPercent = 3.5;
        }

        else if (locationTaxes < 130000) {
            creditPercent = 3;
        }

        else creditPercent = 2.5;
    }

    else if (locationTaxes.options[locationTaxes.selectedIndex].text === "Universe") {
        if (difCostAndInitialFee < 80000) {
            creditPercent = 3;
        }

        else if (difCostAndInitialFee > 80000 && difCostAndInitialFee < 130000) {
            creditPercent = 2.5;
        }

        else creditPercent = 2;
    }
    return creditPercent;

}

// split value to triads
function splitToTriads(value) {
    return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
}

// animate value
function animatedValue(value, id) {
    let incrementValue = Math.floor(value / 100);
    let currentValue = 0;
    let i = 100;

    let obj = document.querySelector(id);
    let timer = setInterval(function () {
        currentValue += incrementValue;
        obj.textContent = `$${splitToTriads(currentValue)}`;
        i--;
        if (i == 0) {
            obj.textContent = `$${splitToTriads(value)}`;
            clearInterval(timer);
        }
    }, 3)
}


// value from the front
costRange.addEventListener("click", calculations);
initialFeeRange.addEventListener("click", calculations);
mortgageTermRange.addEventListener("click", calculations);
showCostValue.addEventListener("input", calculations);
showInitialFeeValue.addEventListener("input", calculations);
showMortgageTermValue.addEventListener("input", calculations);
document.querySelector('.locationTaxes').addEventListener("input", calculateMortgageValues);

const rangeSelectors = document.querySelectorAll(".myRange");



// adding all of value on the calculator(with restrictions)
function calculations(e) {
    if (e.target.classList[0] != "myRange") {
        if (!validationValueOnStrAndLength(e)) {
            return;
        }
        if (!validationOnMinValue()) {
            return;
        }
    }
    calculateMortgageValues(e);

}

function calculateMortgageValues(e) {
    changeMaxInitialFeeValue(e);
    changeInitialFeeValueWhenChangeRangeOrInput(e)

    difCostAndInitialFee =  parseInt(costRange.value) - parseInt(initialFeeRange.value);

    animatedValue(difCostAndInitialFee, ".creditAmount");


    document.querySelector(".interestRate").textContent = `${interestRate()}%`;

    animatedValue(monthlyPayment(), ".monthlyPayment");

    let necessaryIncomeValue = (parseInt(monthlyPayment()) + parseInt(monthlyPayment()) * 0.4 / 0.6).toFixed(0);
    animatedValue(necessaryIncomeValue, ".necessaryIncome");
}

function validationOnMinValue() {
    

    if (parseInt(showCostValue.value.replaceAll(' ', '')) >= 35000) {
        removeBorderColor("#costBlock", "redBorder");
    }

    if (showInitialFeeValue.value.replaceAll(' ', '') > 999) {
        removeBorderColor("#initialFeeBlock", "redBorder");
    }

    if (showMortgageTermValue.value >= 10) {
        removeBorderColor("#termBlock", "redBorder");
    }

    if (parseInt(showCostValue.value.replaceAll(' ', '')) >= 35000 && showInitialFeeValue.value.replaceAll(' ', '') >= 999 && showMortgageTermValue.value >= 10) {
        return true;
    }

    else {
        if (parseInt(showCostValue.value.replaceAll(' ', '')) < 35000) {
            changeBorderColor("#costBlock", "redBorder");
        }

        if (showInitialFeeValue.value.replaceAll(' ', '') < 999) {
            changeBorderColor("#initialFeeBlock", "redBorder");
        }

        if (showMortgageTermValue.value < 10) {
            changeBorderColor("#termBlock", "redBorder");
        }
    }

    return false
}

function validationValueOnStrAndLength(e) {

    if (e.target.classList[0] === "showCostValue") {
        if (document.querySelector(`.${e.target.classList[0]}`).value.replaceAll(' ', '').length <= 7) {
            if (validationValueOnStr(e)) {
                return true;
            }
        }
        else {
            deleteLastCharacter(e);
        }
    }

    if (e.target.classList[0] === "showInitialFeeValue") {
        if (parseInt(document.querySelector(`.${e.target.classList[0]}`).value.replaceAll(' ', '')) < parseInt(showCostValue.value.replaceAll(' ', ''))) {
            if (validationValueOnStr(e)) {
                return true;
            }
        }
        else {
            deleteLastCharacter(e);
        }
    }
    if (e.target.classList[0] === "showMortgageTermValue") {
        if (parseInt(document.querySelector(`.${e.target.classList[0]}`).value.replaceAll(' ', '')) <= 30) {
            if (validationValueOnStr(e)) {
                return true;
            }
        }
        else {
            deleteLastCharacter(e);
        }
    }
    return false;
}

function deleteLastCharacter(e) {
    document.querySelector(`.${e.target.classList[0]}`).value = document.querySelector(`.${e.target.classList[0]}`).value.substr(0, document.querySelector(`.${e.target.classList[0]}`).value.length - 1);
}

function validationValueOnStr(e) {

    if (isNaN(document.querySelector(`.${e.target.classList[0]}`).value.substr(document.querySelector(`.${e.target.classList[0]}`).value.length - 1)) === false) {
        return true;
    }

    else {
        document.querySelector(`.${e.target.classList[0]}`).value = document.querySelector(`.${e.target.classList[0]}`).value.substr(0, document.querySelector(`.${e.target.classList[0]}`).value.length - 1);
    }
}
// add red border 
function changeBorderColor(id, className) {
    document.querySelector(id).classList.add(className);
}

function removeBorderColor(id, className) {
    document.querySelector(id).classList.remove(className);
}

// calculations for monthly payment
function monthlyPayment() {

    let monthlyRate = interestRate() / (12 * 100);
    let creditSum = parseInt(showCostValue.value.replaceAll(' ', '')) - parseInt(showInitialFeeValue.value.replaceAll(' ', ''));
    let coefficient = (monthlyRate * ((1 + monthlyRate) ^ (mortgageTermRange.value * 12))) / (((1 + monthlyRate) ^ (mortgageTermRange.value * 12)) - 1);
    let monthlyPaymentValue = (coefficient * creditSum).toFixed(0);
    return monthlyPaymentValue
}

// CONTACT ME
const contactMe = document.querySelector('.contactMe');
const contactMeLink = document.querySelector(".contactMeLink");
const textOfContact = ["If you like my site, you may contact me in ", "telegram"];


function showContactText(currentContactMe, item) {
    let i = 0;

    let contactMeInterval = setInterval(function () {
        currentContactMe.textContent += textOfContact[item][i];
        i++
        if (i === textOfContact[item].length) {
            clearInterval(contactMeInterval);
            if (item === 0) {
                showContactText(contactMeLink, 1);
            }
        }
    }, 40)
}

let showContactTextObserver = new IntersectionObserver(function (e) {
    if (e[0].isIntersecting === true) {
        showContactText(contactMe, 0);
        showContactTextObserver.disconnect();
    }
}, { threshold: [0.4] });

showContactTextObserver.observe(document.querySelector(".footer"));




// CALCULATOR ANIMATION

function calculatorAnimation() {
    const backgroundWithChosenPlanet = document.querySelector(".backgroundWithchosenPlanet");

    if (locationTaxes.options[locationTaxes.selectedIndex].text === "Earth") {
        backgroundWithChosenPlanet.style.backgroundImage = 'url("images/earth2.png")';
        
    }

    else if (locationTaxes.options[locationTaxes.selectedIndex].text === "Mars") {
        backgroundWithChosenPlanet.style.backgroundImage = 'url("images/mars2.png")';

    }

    else if (locationTaxes.options[locationTaxes.selectedIndex].text === "Venus") {
        backgroundWithChosenPlanet.style.backgroundImage = 'url("images/venus2.png")'
    }

    else {
        // backgroundWithChosenPlanet.style.background = "images/venus2.png"
    }
}
 


document.querySelector('.locationTaxes').addEventListener("input", calculatorAnimation);
