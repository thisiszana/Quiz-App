const score = JSON.parse(localStorage.getItem("score"));
const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

const scoreEle = document.querySelector("p");
const saveBtn = document.querySelector("button");
const input = document.querySelector("input");
const warning = document.getElementById("warning");

scoreEle.innerText = score;

const saveHandler = () => {
    if (!input.value || !score) {
        warning.classList.add("active");
        setTimeout(() => {
            warning.classList.remove("active")
        }, 3000);
    } else {
        const finalScore = { name: input.value, score, };
        highScore.push(finalScore);
        highScore.sort((a, b) => b.score - a.score);
        highScore.splice(10);
        input.value = "";

        localStorage.setItem("highScore", JSON.stringify(highScore));
        window.location.assign("/");
    }
}

saveBtn.addEventListener("click", saveHandler)