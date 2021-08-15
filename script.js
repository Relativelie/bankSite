// VIDEO
const videoOnPage = document.querySelector("video");

videoOnPage.playbackRate = 0.7;




// show items one by one
const mortgageBlock = document.querySelectorAll('.rectangularBlock');
let numberOfTimes

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
}, { threshold: [0.4] });

observer.observe(document.querySelector(".baseBlock"));


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

// calculator on front
const costRange = document.querySelector("#cost");
const showCostValue = document.querySelector(".showCostValue");
const initialFeeRange = document.querySelector("#initialFee");
const showInitialFeeValue = document.querySelector(".showInitialFeeValue");
const mortgageTerm = document.querySelector("#mortgageTerm");
const showMortgageTermValue = document.querySelector(".showMortgageTermValue");


costRange.addEventListener("input", changeCostValue);
costRange.addEventListener("click", changeMaxInitialFeeValue);

function changeCostValue() {
    let costValue = costRange.value;
    showCostValue.value = new Intl.NumberFormat('ru-RU').format(costValue);
};

function changeMaxInitialFeeValue() {
    let costValue = costRange.value;
    initialFeeRange.max = costValue - 1000;
    changeInitialFeeValue();
}


initialFeeRange.addEventListener("input", changeInitialFeeValue);

function changeInitialFeeValue() {
    let initialFeeValue = initialFeeRange.value;
    showInitialFeeValue.value = new Intl.NumberFormat('ru-RU').format(initialFeeValue);
};

function changeMortgageTermValue() {
    let mortgageTermValue = mortgageTerm.value;
    showMortgageTermValue.value = new Intl.NumberFormat('ru-RU').format(mortgageTermValue);
}
mortgageTerm.addEventListener("input", changeMortgageTermValue);

// calculations
// taxes is depended on place
const applyButton = document.querySelector(".btnApply");
let creditAmount;
let creditPercent;
let necessaryIncomeValue;

function interestRate() {

    let difCostAndInitialFee = costRange.value - initialFeeRange.value;
    let locationTaxes = document.querySelector(".locationTaxes");


    console.log(locationTaxes.value);

    
    if (document.querySelector(".calculateItems option").value === "earth") {
        if (difCostAndInitialFee < 80000) {
            creditPercent = 5.5;
        }
    
        else if (difCostAndInitialFee > 80000 && difCostAndInitialFee < 130000) {
            creditPercent = 4.5;
        }
    
        else creditPercent = 3;
    }

    else if (document.querySelector(".calculateItems option").value === "mars") {
        if (difCostAndInitialFee < 80000) {
            creditPercent = 5;
        }
    
        else if (difCostAndInitialFee > 80000 && difCostAndInitialFee < 130000) {
            creditPercent = 4;
        }
    
        else creditPercent = 2.5;
    }

    else if (document.querySelector(".calculateItems option").value === "venus") {
        if (difCostAndInitialFee < 80000) {
            creditPercent = 3.5;
        }
    
        else if (difCostAndInitialFee > 80000 && difCostAndInitialFee < 130000) {
            creditPercent = 3;
        }
    
        else creditPercent = 2.5;
    }

    else if (document.querySelector(".calculateItems option").value === "universe") {
        if (difCostAndInitialFee < 80000) {
            creditPercent = 3;
        }
    
        else if (difCostAndInitialFee > 80000 && difCostAndInitialFee < 130000) {
            creditPercent = 2.5;
        }
    
        else creditPercent = 2;
    }

}



applyButton.addEventListener("click", calculations);

function calculations() {
    creditAmount = new Intl.NumberFormat('ru-RU').format(costRange.value - initialFeeRange.value);
    document.querySelector(".creditAmount").textContent = `${creditAmount}$`;

    interestRate();
    document.querySelector(".interestRate").textContent = `${creditPercent}%`;

    monthlyPayment();
    document.querySelector(".monthlyPayment").textContent = `${monthlyPaymentValue}$`;


    necessaryIncomeValue = (parseInt(monthlyPaymentValue) + parseInt(monthlyPaymentValue) * 0.4/0.6).toFixed(2);
    document.querySelector(".necessaryIncome").textContent = `${necessaryIncomeValue}$`;
}

let monthlyRate;
let generalRate;
let monthlyPaymentValue;


function monthlyPayment() {
    interestRate();
    monthlyRate = creditPercent / 12 / 100;
    console.log(creditPercent);
    generalRate = (1 + monthlyRate) ^ (mortgageTerm.value * 12);
    monthlyPaymentValue = (costRange.value * monthlyRate * generalRate / (generalRate - 1)).toFixed(2);
}



// CONTACT ME
const contactMe = document.querySelector('.contactMe');
const contactMeLink = document.querySelector(".contactMeLink");
const textOfContact = ["If you like my site, you may contact me in ", "telegram"];


function showContactText(currentContactMe, item) {
    let i = 0;
    let lettersLeft = textOfContact[item].length;

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



