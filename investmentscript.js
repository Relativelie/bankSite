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

