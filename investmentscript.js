const testQuestions = [
    "How long have you been investing?",
    "Imagine the stock market has taken a dive. The Dow is down more than 15%. What do you do?",
    "What’s your main goal with your investments?",
    "Another hypothetical here: After a few years of saving, you’re ready to buy a new car. But the day before your trip to the dealership, your boss tells you you’re being laid off. What are you going to do?",
    "When it comes to saving, you:",
    "How old are you?",
    "When will you need to cash in on most of your investments?",
    "What’s the main thing you’re saving up for?",
    "When are you planning on making another big purchase like a house?"
];

const testAnswers = [
    ["I haven’t started yet", "For a while now", "A long, long time"],
    ["I have to sell it all", "I’m holding onto mostly everything, but selling a little", "I’m buying more. These stocks will rebound"],
    ["Staying in the black and losing nothing", "Making a little bit on top of what I have", "Turning a big profit"],
    ["Keep my old car", "Find a similar but more inexpensive car than the one I had picked out", "Buy the car I want"],
    ["Save a certain percentage every month, no matter what", "Save what you can each month, but not a set amount", "Hope to save something every month, but never seem to find any money left over"],
    ["45+", "30 to 45", "Under 30"],
    ["Less than 5 years", "5 to 10 years", "11+ years"],
    ["Something like a new home, where the money will be spent quickly", "Something like college, where the money will be spent over a few years", "Something like retirement, where the money will be spread out over many years"],
    ["Less than 5 years", "5 to 10 years", "11+ years"]
];

// selectors
const question = document.querySelector(".question");
const answers = document.querySelectorAll(".answers");
const continueBtn = document.querySelector(".continue");
const backBtn = document.querySelector(".backBtn");
const numberOfquestionSelector = document.querySelector(".nuberOfQuestion");
const answerOne = document.querySelector("#answerOne");
const answerTwo = document.querySelector("#answerTwo");
const answerThree = document.querySelector("#answerThree");




answerOne.addEventListener("click", enableContinueBtn);
answerTwo.addEventListener("click", enableContinueBtn);
answerThree.addEventListener("click", enableContinueBtn);
continueBtn.addEventListener("click", onContinue);
backBtn.addEventListener("click", OnBack);



// redraw current question
function currentAnswers(item) {

    let answer = 0;
    while (answer < 3) {
        answers[answer].textContent = testAnswers[item][answer];
        answer++;
    }
    question.textContent = testQuestions[questionNumber];
    numberOfquestionSelector.textContent = `${questionNumber + 1}/9`;
}


//  enable continue button when answer is selected 
continueBtn.disabled = "disabled";
function enableContinueBtn() {
    continueBtn.disabled = "";
    continueBtn.classList.remove("disabledBtn");
}


// add checked on checkbox after transitioning to previous question
let dictOfAnswers = {};
let questionNumber = 0;


function onContinue(e) {
    e.preventDefault();
    if (questionNumber < 8) {
        dictOfAnswers[questionNumber] = document.querySelector('input[name="answer"]:checked').value;

        questionNumber++;
        currentAnswers(questionNumber);

        if (questionNumber in dictOfAnswers) {
            document.querySelector(`input[name="answer"][value="${dictOfAnswers[questionNumber]}"]`).checked = true;
        }
        else {
            answerOne.checked = false;
            answerTwo.checked = false;
            answerThree.checked = false;
            continueBtn.disabled = "disabled";
            continueBtn.classList.add("disabledBtn");
        }

        backBtn.style.visibility = "visible";
    }


    else if (questionNumber === 8) {
        let results = 0;
        Object.values(dictOfAnswers).forEach(element => {
            results += parseInt(element);

        });

        // [1,8]
        if (results >= 1 && results <= 8) {
            showResult(0);
        }


        // [9,18]
        else if (results >= 9 && results <= 18) {
            showResult(1);
        }

        // [19,27]
        else if (results >= 19 && results <= 27) {
            showResult(2);
        }

    }
}


function OnBack(e) {
    e.preventDefault();

    questionNumber--;

    currentAnswers(questionNumber);

    // hiding back button when we located on first question
    if (questionNumber === 0) {
        backBtn.style.visibility = "hidden";
    }

    document.querySelector(`input[name="answer"][value="${dictOfAnswers[questionNumber]}"]`).checked = true;

    enableContinueBtn();
}


const personalResult = [
    ["Balanced Funds", "Fixed-Income Funds", "5-7%", "7-8%", "Ideal as an additional family income",
        "Ideal for those who were afraid to start trading", ["Low expense ratios", "Less volatility", "Low-risk"], ["Priority on liquidation", "Regular Income", "Safe deal"], ["happyPeople"], ["happyPerson"]],
    ["Mutual Funds", "Exchange Traded Funds(ETFs)", "8-11%", "12-15%", "Ideal for those who have an trading experience",
        "Ideal for those who have an trading experience", ["Dividend Reinvestment", "Risk Reduction", "Fair Pricing"], ["Premium in Price", "Diversification", "Lower Fees"], ["happyPerson"], ["extreme"]],
    ["International / Global Funds", "Exchange Traded Funds(ETFs)", "10-12%", "12-15%", "Ideal for those who have an trading experience",
        "Ideal for those who have an trading experience", ["World’s Best Companies", "Diversification", "Liquidity"], ["Priority on liquidation", "Regular Income", "Safe deal"], ["sport"], ["extreme"]]
];


function showResult(s) {
    document.querySelector(".testImage").style.display = "none";
    document.querySelector(".resultOne h5").textContent = personalResult[s][0];
    document.querySelector(".resultTwo h5").textContent = personalResult[s][1];
    document.querySelector(".resultOne .statement").textContent = personalResult[s][4];
    document.querySelector(".resultTwo .statement").textContent = personalResult[s][5];
    document.querySelector(".resultOne .conditionOneItem p").textContent = personalResult[s][6][0];
    document.querySelector(".resultOne .conditionTwoItem p").textContent = personalResult[s][6][1];
    document.querySelector(".resultOne .conditionThreeItem p").textContent = personalResult[s][6][2];
    document.querySelector(".resultTwo .conditionOneItem p").textContent = personalResult[s][7][0];
    document.querySelector(".resultTwo .conditionTwoItem p").textContent = personalResult[s][7][1];
    document.querySelector(".resultTwo .conditionThreeItem p").textContent = personalResult[s][7][2];
    document.querySelector(".resultOne .conditionOneItem .insideItem").style.backgroundImage = `url("imagesForInvestment/${personalResult[s][8][0]}One.jpg")`;
    document.querySelector(".resultOne .conditionTwoItem .insideItem").style.backgroundImage = `url("imagesForInvestment/${personalResult[s][8][0]}Two.jpg")`;
    document.querySelector(".resultOne .conditionThreeItem .insideItem").style.backgroundImage = `url("imagesForInvestment/${personalResult[s][8][0]}Three.jpg")`;
    document.querySelector(".resultTwo .conditionOneItem .insideItem").style.backgroundImage = `url("imagesForInvestment/${personalResult[s][9][0]}One.jpg")`;
    document.querySelector(".resultTwo .conditionTwoItem .insideItem").style.backgroundImage = `url("imagesForInvestment/${personalResult[s][9][0]}Two.jpg")`;
    document.querySelector(".resultTwo .conditionThreeItem .insideItem").style.backgroundImage = `url("imagesForInvestment/${personalResult[s][9][0]}Three.jpg")`;
    document.querySelector(".resultOne .testResult p").textContent = `Expected income: ${personalResult[s][2]}`;
    document.querySelector(".resultTwo .testResult p").textContent = `Expected income: ${personalResult[s][3]}`;
    document.querySelector(".results").style.display = "flex";
    document.querySelector(".testBlock").style.display = "none";
    document.querySelector(".testImage").style.display = "none";
}

let countOfStep;
let personalInfo = [];
let selectedRates = [];
let allOpeningBlock = document.querySelectorAll(".insideOpeningBlock");
let allSteps = document.querySelectorAll(".numberOfStep");
let allStepsText = document.querySelectorAll(".numberOfStep h4");
document.querySelector(".openBtn").addEventListener("click", showBlockWithOpeningAccount);
document.querySelector(".lastOpenButton").addEventListener("click", showBlockWithOpeningAccount);
document.querySelector(".openingHeader img").addEventListener("click", closeBlockWithOpeningAccount);

function closeBlockWithOpeningAccount() {

    document.querySelector(".openingBlock").style.left = "-800px";
}

function showBlockWithOpeningAccount() {
    document.querySelector(".openingBlock").style.left = "0px";
}


async function loginAccount() {
    let loginValue = document.querySelector("#login").value;
    let password = document.querySelector("#password").value;
    const result = await fetch(`https://bankproject.free.beeceptor.com/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: loginValue, pass: password })
    });
    const resultReceived = await result.json();
    if (resultReceived.status === "ok") {
        document.querySelector(".login").style.opacity = "0";
        setTimeout(function () {
            document.querySelector(".login").style.display = "none";
        }, 1000)
        getPersonalInfo();
    }

    else {
        wrongLogOrPass()
    }
}

function wrongLogOrPass() {
    document.querySelector("#wrongLogOrPass").style.display = "block";
    setTimeout(function () {
        document.querySelector("#wrongLogOrPass").style.opacity = "1";
    }, 500)
    setTimeout(function () {
        document.querySelector("#wrongLogOrPass").style.opacity = "0";

        setTimeout(function () {
            document.querySelector("#wrongLogOrPass").style.display = "none";
        }, 1000)
    }, 2500)
}


const countOfStepDict = {
    "openingMethodHeaderName": [0, "methods"],
    "personalInfoHeaderName": [1, "personalInfoForm"],
    "choosingRateHeaderName": [2, "rates"],
    "methods": 0,
    "personalInfoForm": 1,
    "rates": 2
}

function openingAccount(e) {
    if (e.target.classList[0] === "methodButton") {
        if (document.querySelector("#flexRadioDefault2").checked) {
            document.querySelector(".login").style.opacity = "1";
            document.querySelector(".login").style.display = "block";
        }

        else {
            allOpeningBlock[0].style.display = "none";
            allStepsText[0].textContent = "✓";
            allSteps[0].classList.remove("selected");
            document.querySelector("#openingMethodHeaderName").classList.remove("disabled");
            allSteps[0].classList.add("done");
            allSteps[1].classList.add("selected");
            allOpeningBlock[1].style.display = "block";
        }


    }

    if (e.target.classList[0] === "personalInfoButton") {

        for (let info = 0; info < document.querySelectorAll(".personalInfo input").length; info++) {
            if (document.querySelectorAll(".personalInfo input")[info].value === "") {
                document.querySelectorAll(".personalInfo input")[info].classList.add("redBorder");
            }
            else {
                document.querySelectorAll(".personalInfo input")[info].classList.remove("redBorder");
            }
        }
        for (let field = 0; field < document.querySelectorAll(".personalInfo input").length; field++) {
            if (document.querySelectorAll(".personalInfo input")[field].value === "") {
                break
            }
            else if (document.querySelectorAll(".personalInfo input")[document.querySelectorAll(".personalInfo input").length - 1] === document.querySelectorAll(".personalInfo input")[field]) {
                for (let fieldValue = 0; fieldValue < document.querySelectorAll(".personalInfo input").length; fieldValue++) {
                    personalInfo.push(document.querySelectorAll(".personalInfo input")[fieldValue].value);
                }

                allOpeningBlock[1].style.display = "none";
                allOpeningBlock[2].style.display = "block";
                allSteps[1].classList.remove("selected");
                document.querySelector("#personalInfoHeaderName").classList.remove("disabled");
                allSteps[2].classList.add("selected");
                allSteps[1].classList.add("done");
                allStepsText[1].textContent = "✓";
            }

        }
    }
    if (e.target.classList[0] === "choosingRateButton") {

        let rates = document.querySelectorAll(".rates :checked");
        if (document.querySelectorAll(".rates .form-check-input:checked").length === 0) {

            document.querySelector(".ratesModal").style.display = "block";
            setTimeout(function () {
                document.querySelector(".ratesModal").style.opacity = "1";
            }, 500)

            setTimeout(function () {
                document.querySelector(".ratesModal").style.opacity = "0";
                setTimeout(function () {
                    document.querySelector(".ratesModal").style.display = "none";
                }, 3000)
            }, 3500)

        }
        else {
            for (let rate = 0; rate < rates.length; rate++) {
                selectedRates.push(rates[rate].value)
            }
        }
    }
    let clearPersonalInfo = setTimeout(function () {
        personalInfo = [];
        clearTimeout(clearPersonalInfo);
    }, 3600000)

}


function backOneStep(e) {

    let currentStep
    let backStep = e.srcElement.id;
    for (let step = 0; step < allOpeningBlock.length; step++) {
        if (allOpeningBlock[step].style.display === "block") {
            currentStep = allOpeningBlock[step].querySelector("form").classList.value;
        }
    }

    if (!(currentStep === "rates" && backStep === "openingMethodHeaderName") && currentStep != countOfStepDict[backStep][1] && countOfStepDict[backStep][0] < countOfStepDict[currentStep]) {
        allOpeningBlock[countOfStepDict[backStep][0]].style.display = "block";
        allOpeningBlock[countOfStepDict[backStep][0] + 1].style.display = "none";
        allStepsText[countOfStepDict[backStep][0]].textContent = countOfStepDict[backStep][0] + 1;
        allSteps[countOfStepDict[backStep][0]].classList.add("selected");
        allSteps[countOfStepDict[backStep][0]].classList.remove("done");
        allSteps[countOfStepDict[backStep][0] + 1].classList.remove("selected");
        allSteps[countOfStepDict[backStep][0] + 1].classList.add("disabled");

        for (let info = 0; info < document.querySelectorAll(".personalInfo input").length; info++) {
            document.querySelectorAll(".personalInfo input")[info].classList.remove("redBorder");
        }
    }

}


document.querySelector(".method button").addEventListener("click", openingAccount);
document.querySelector(".personalInfo button").addEventListener("click", openingAccount);
document.querySelector(".choosingRate button").addEventListener("click", openingAccount);
document.querySelector("#openingMethodHeaderName").addEventListener("click", backOneStep);
document.querySelector("#personalInfoHeaderName").addEventListener("click", backOneStep);
document.querySelector("#choosingRateHeaderName").addEventListener("click", backOneStep);
document.querySelector(".finishOpeningAccount").addEventListener("click", finishOpeningAccount);
document.querySelector(".finishOpeningAccountModal .closeModal").addEventListener("click", closeModal);
document.querySelector(".login .closeModal").addEventListener("click", closeModal);
document.querySelector("#signIn").addEventListener("click", checkLoginAndPass);
document.querySelector(".resultButtons .openBtn").addEventListener("click", showBlockWithOpeningAccount);


function checkLoginAndPass(e) {

    e.preventDefault();
    let logPass = document.querySelectorAll(".login .modalBlock input");
    for (let logPassItem = 0; logPassItem < logPass.length; logPassItem++) {
        if (logPass[logPassItem].value === "") {
            logPass[logPassItem].classList.add("redBorder");
            wrongLogOrPass()
        }

        else {
            logPass[logPassItem].classList.remove("redBorder");
            loginAccount()
        }
    }
}


// modal window after 3th step in opening account
function finishOpeningAccount() {
    document.querySelector(".finishOpeningAccountModal").style.opacity = "1";
    document.querySelector(".finishOpeningAccountModal").style.display = "block";
    closeBlockWithOpeningAccount();
}

function closeModal(e) {

    if (e.target.id === "closelogin") {
        document.querySelector(".login").style.opacity = "0";
        setTimeout(function () {
            document.querySelector(".login").style.display = "none";
        }, 1000)
    }
    else {
        document.querySelector(".finishOpeningAccountModal").style.opacity = "0";
        setTimeout(function () {
            document.querySelector(".finishOpeningAccountModal").style.display = "none";
            window.location.reload();
        }, 1000)

    }
}

async function getPersonalInfo() {
    const result = await fetch(`https://bankproject.free.beeceptor.com/personal_info`);
    const resultReceived = await result.json();
    if (resultReceived.status === "ok") {
        document.querySelector("#firstName").value = resultReceived.first_name;
        document.querySelector("#lastName").value = resultReceived.last_name;
        document.querySelector("#birthday").value = resultReceived.birthday;
        document.querySelector("#phoneNumber").value = resultReceived.phone_number;
        document.querySelector("#passNumber").value = resultReceived.pass_num;
        allOpeningBlock[0].style.display = "none";
        allStepsText[0].textContent = "✓";
        allSteps[0].classList.remove("selected");
        document.querySelector("#openingMethodHeaderName").classList.remove("disabled");
        allSteps[0].classList.add("done");
        allSteps[1].classList.add("selected");
        allOpeningBlock[1].style.display = "block";
    }
    else {
        document.querySelector(".somethingWrong").style.display = "block";
        setTimeout(function () {
            document.querySelector(".somethingWrong").style.opacity = "1";
        }, 500)

        setTimeout(function () {
            document.querySelector(".somethingWrong").style.opacity = "0";
            setTimeout(function () {
                document.querySelector(".somethingWrong").style.display = "none";
            }, 2000)
        }, 2500)
    }
}




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



function calculateTimeBeforeClosing() {

    const msInSecond = 1000;
    const msInMinute = 60 * 1000;
    const msInHour = 60 * 60 * 1000;
    const msInDay = 24 * 60 * 60 * 1000;


    const today = new Date();
    let hours = parseInt(today.getHours());
    let minutes = parseInt(today.getMinutes());
    let seconds = parseInt(today.getSeconds());

    let sleepingTime = [23, 0, 1, 2, 3, 4, 5, 6, 7];
    if (sleepingTime.indexOf(hours) === -1 ) {
        document.querySelector(".timeToSleep").style.display = "none";
        document.querySelector(".timeToWork").style.display = "block";
        document.querySelector(".workHoursLeft").textContent = 23 - hours;
        document.querySelector(".workMinutesLeft").textContent = 60 - minutes;
        document.querySelector(".workSecondsLeft").textContent = 60 - seconds;
    }
    
    else {
        document.querySelector(".timeToSleep").style.display = "block";
        document.querySelector(".timeToWork").style.display = "none";
    }


    


}

let myInterval = setInterval(function () {
    calculateTimeBeforeClosing();
}, 1000)
