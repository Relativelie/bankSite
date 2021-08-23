// import {showContactTextObserver} from "./script.js";
// showContactTextObserver.observe(document.querySelector(".footer"));


const testQuestions = [
    "How long have you been investing?",
    "Imagine the stock market has taken a dive. The Dow is down more than 15%. What do you do?",
    "What’s your main goal with your investments?",
    "Of these investments, which looks the most enticing to you?",
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
    ["table", "table", "table"],
    ["Keep my old car", "Find a similar but more inexpensive car than the one I had picked out", "Buy the car I want"],
    ["Save a certain percentage every month, no matter what", "Save what you can each month, but not a set amount", "Hope to save something every month, but never seem to find any money left over"],
    ["45+", "30 to 45", "Under 30"],
    ["Less than 5 years", "5 to 10 years", "11+ years"],
    ["Something like a new home, where the money will be spent quickly", "Something like college, where the money will be spent over a few years"],
    ["Less than 5 years", "5 to 10 years", "11+ years"]
];

// selectors
const question = document.querySelector(".question");
const answers = document.querySelectorAll(".answers");
const continueBtn = document.querySelector(".continue");
const backBtn = document.querySelector(".back");

continueBtn.addEventListener("click", nextQuestion);
backBtn.addEventListener("click", previousQuestion);

let i = 0;

function nextQuestion(e) {
    e.preventDefault();
    i++
    question.textContent = testQuestions[i];
    curentAnswers(i);
}

function previousQuestion(e) {
    e.preventDefault();
    i--;
    question.textContent = testQuestions[i];
    curentAnswers(i);
}

function curentAnswers(item) {
    let answer = 0;
    while (answer < 3) {
        console.log(1);
        answers[answer].textContent = testAnswers[item][answer];
        answer++;
    }
}

// displaing buttons when we located on first question
function displayTestBtn(i) {
    if (i===0) {

    }

    else {

    }
}