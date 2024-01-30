const highScore = JSON.parse(localStorage.getItem("highScore")) || [];

const list = document.querySelector("ol");

list.innerHTML = highScore.map((item, index) => {
    return `
        <li>
            <span>${index + 1}</span>
            <p>${item.name}</p>
            <span>${item.score}</span>
        </li>
    `
})