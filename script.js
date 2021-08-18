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

// range block for front
costRange.addEventListener("input", changeCostValue);
costRange.addEventListener("click", changeMaxInitialFeeValue);



function changeCostValue() {
    let costValue = costRange.value;
    // convert to local format
    showCostValue.value = costValue.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
};

function changeMaxInitialFeeValue() {
    initialFeeRange.max = parseInt(showCostValue.value.replaceAll(' ', '')) - 2000;
    changeInitialFeeValue();
}


initialFeeRange.addEventListener("input", changeInitialFeeValue);

function changeInitialFeeValue() {
    let initialFeeValue = initialFeeRange.value;
    showInitialFeeValue.value = initialFeeValue.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
};

function changeMortgageTermValue() {
    let mortgageTermValue = mortgageTerm.value;
    showMortgageTermValue.value = mortgageTermValue.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');;
}
mortgageTerm.addEventListener("input", changeMortgageTermValue);


// taxes is depended on place
// interest rate
// interest rate for calculate monthly payment


function interestRate() {

    let creditPercent;

    let difCostAndInitialFee = parseInt(showCostValue.value.replaceAll(' ', '')) - parseInt(showInitialFeeValue.value.replaceAll(' ', ''));
    let locationTaxes = document.querySelector(".locationTaxes").value;


    if (locationTaxes === "earth") {
        if (difCostAndInitialFee < 80000) {
            creditPercent = 5.5;
        }

        else if (difCostAndInitialFee > 80000 && difCostAndInitialFee < 130000) {
            creditPercent = 4.5;
        }

        else creditPercent = 3;
    }

    else if (locationTaxes === "mars") {
        if (difCostAndInitialFee < 80000) {
            creditPercent = 5;
        }

        else if (difCostAndInitialFee > 80000 && difCostAndInitialFee < 130000) {
            creditPercent = 4;
        }

        else creditPercent = 2.5;
    }

    else if (locationTaxes === "venus") {
        if (difCostAndInitialFee < 80000) {
            creditPercent = 3.5;
        }

        else if (locationTaxes < 130000) {
            creditPercent = 3;
        }

        else creditPercent = 2.5;
    }

    else if (locationTaxes === "universe") {
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

function splitToTriads(value) {
    return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
}

// animate value
function animatedValue(value, id) {
    let incrementValue = Math.floor(value/100);
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

// value for front
// applyButton.addEventListener("click", calculations);
costRange.addEventListener("click", calculations);
initialFeeRange.addEventListener("click", calculations);
mortgageTerm.addEventListener("click", calculations);

function calculations() {

    let creditAmount = parseInt(showCostValue.value.replaceAll(' ', '')) - parseInt(showInitialFeeValue.value.replaceAll(' ', ''));
    animatedValue(creditAmount, ".creditAmount");

    document.querySelector(".interestRate").textContent = `${interestRate()}%`;

    animatedValue(monthlyPayment(), ".monthlyPayment");


    let necessaryIncomeValue = (parseInt(monthlyPayment()) + parseInt(monthlyPayment()) * 0.4 / 0.6).toFixed(0);
    animatedValue(necessaryIncomeValue, ".necessaryIncome");
}

// calculations for monthly payment
function monthlyPayment() {
    ;
    let monthlyRate = interestRate() / 12 / 100;
    let generalRate = (1 + monthlyRate) ^ (mortgageTerm.value * 12);
    let monthlyPaymentValue = (parseInt(showCostValue.value.replaceAll(' ', '')) * monthlyRate * generalRate / (generalRate - 1)).toFixed(0);
    return monthlyPaymentValue
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



