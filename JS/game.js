import formatedData from "./formatedData.js";

const loader = document.getElementById("loader");
const container = document.querySelector(".container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreCount = document.getElementById("score-count");
const nextBtn = document.getElementById("next-button");
const questionCount = document.getElementById("question-count");
const finishButton = document.getElementById("finish-button");
const errorBox = document.querySelector(".error-box");
const errorButton = document.getElementById("error-btn");

const level = localStorage.getItem("level") || "medium";


const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let formatData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0
let isAccepted = true;

const fetchData = async () => {
    try {
        const response = await fetch(URL);
        const json = await response.json();
        formatData = formatedData(json.results);
        start();
    } catch (err) {
        loader.style.display = "none";
        errorBox.classList.add("active")
    }
};

const start = () => {
    showQuestion();
    loader.style.display = "none";
    container.style.display = "block";
};

const showQuestion = () => {
    const { question, answer, correctAnswerIndex } = formatData[questionIndex];
    questionCount.innerText = questionIndex + 1;
    questionText.innerText = question;
    correctAnswer = correctAnswerIndex;
    console.log(correctAnswer);
    answerList.forEach((answerBtn, index) => {
        answerBtn.innerText = answer[index];
    })
};

const checkAnswer = (event, index) => {
    if (!isAccepted) return;
    isAccepted = false;

    const isCorrect = index === correctAnswer ? true : false;

    if (isCorrect) {
        event.target.classList.add("correct");
        score += CORRECT_BONUS;
        scoreCount.innerText = score;
    } else {
        event.target.classList.add("incorrect");
        answerList[correctAnswer].classList.add("correct");
    }
};

const nextBtnHandler = () => {
    questionIndex++;

    if (questionIndex < formatData.length) {
        isAccepted = true;
        removeClassName();
        showQuestion();
    } else {
        finishHandler();
    }
};

const removeClassName = () => {
    answerList.forEach(item => item.className = "answer-text");
};

const finishHandler = () => {
    localStorage.setItem("score", JSON.stringify(score));
    window.location.assign("/html/end.html");
}

window.addEventListener("DOMContentLoaded", fetchData);
nextBtn.addEventListener("click", nextBtnHandler);
finishButton.addEventListener("click", finishHandler);
errorButton.addEventListener("click", () => {
    window.location.assign("/")
})
answerList.forEach((answerBtn, index) => {
    answerBtn.addEventListener("click", (event) => checkAnswer(event, index))
})