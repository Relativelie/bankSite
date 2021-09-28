// import {showContactTextObserver} from "./script.js";

// import {showContactTextObserver} from "./script.js";
// showContactTextObserver.observe(document.querySelector(".footer"));

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
    ["Balanced Funds", "Fixed-Income Funds", "5-7%", "7-8%"],
    ["Specialty Funds", "Exchange Traded Funds(ETFs)", "8-11%", "12-15%"],
    ["International / Global Funds", "Exchange Traded Funds(ETFs)", "10-12%", "12-15%"]
];


function showResult(s) {
    document.querySelector(".resultOne h5").textContent = personalResult[s][0];
    document.querySelector(".resultTwo h5").textContent = personalResult[s][1];
    document.querySelector(".resultOne p").textContent = `Expected income: ${personalResult[s][2]}`;
    document.querySelector(".resultTwo p").textContent = `Expected income: ${personalResult[s][3]}`;
    document.querySelector(".results").style.display = "flex";
    document.querySelector(".testBlock").style.display = "none";
    document.querySelector(".resultImage").style.display = "block";
    document.querySelector(".testImage").style.display = "none";
}


let personalInfo = [];
let selectedRates = [];
let allOpeningBlock = document.querySelectorAll(".insideOpeningBlock");
let allSteps = document.querySelectorAll(".numberOfStep");
let allStepsText = document.querySelectorAll(".numberOfStep h4");
document.querySelector(".openBtn").addEventListener("click", showBlockWithOpeningAccount);
document.querySelector(".openingHeader img").addEventListener("click", closeBlockWithOpeningAccount);

function closeBlockWithOpeningAccount() {

    document.querySelector(".openingBlock").style.left = "-800px";
}

function showBlockWithOpeningAccount() {
    document.querySelector(".openingBlock").style.left = "0px";
}
function openingAccount(e) {
    console.log(e.target.classList[0])
    if (e.target.classList[0] === "methodButton") {
        if (document.querySelector("#flexRadioDefault1").checked) {

            getPersonalInfo();
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
            console.log(document.querySelectorAll(".personalInfo input")[info].classList[1])
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
                console.log(personalInfo);
            }

        }
    }
    if (e.target.classList[0] === "choosingRateButton") {
        console.log(1)
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
let countOfStep = 0;
function backOneStep(e) {
    if (e.path[0].classList.value != "disabled") {
        if (!(e.path[0].id === "openingMethodHeaderName" && countOfStep === 2)) {
            if (e.path[0].id === "openingMethodHeaderName") countOfStep = 0
            else if (e.path[0].id === "personalInfoHeaderName") countOfStep = 1
            else countOfStep = 2
            allOpeningBlock[countOfStep].style.display = "block";
            allOpeningBlock[countOfStep + 1].style.display = "none";
            allStepsText[countOfStep].textContent = countOfStep + 1;
            allSteps[countOfStep].classList.add("selected");
            allSteps[countOfStep].classList.remove("done");
            allSteps[countOfStep + 1].classList.remove("selected");
            allSteps[countOfStep + 1].classList.add("disabled");
        }
    }
}


document.querySelector(".method button").addEventListener("click", openingAccount);
document.querySelector(".personalInfo button").addEventListener("click", openingAccount);
document.querySelector(".choosingRate button").addEventListener("click", openingAccount);
document.querySelector("#openingMethodHeaderName").addEventListener("click", backOneStep);
document.querySelector("#personalInfoHeaderName").addEventListener("click", backOneStep);
document.querySelector("#choosingRateHeaderName").addEventListener("click", backOneStep);

async function getPersonalInfo() {
    const result = await fetch(`https://bankproject.free.beeceptor.com/personal_info`);
    const resultReceived = await result.json();
    console.log(resultReceived.status)
    if (resultReceived.status === "ok") {
        console.log(resultReceived)
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