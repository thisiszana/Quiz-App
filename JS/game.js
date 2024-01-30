import formatedData from "./formatedData.js";

const loader = document.getElementById("loader");
const container = document.querySelector(".container");

const URL = "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple";

let formatData = null;

const fetchData = async () => {
    const response = await fetch(URL);
    const json = await response.json();
    console.log(json);
    formatData = formatedData(json.results);
    start();
}

const start = () => {
    loader.style.display = "none";
    container.style.display = "block";
}

window.addEventListener("DOMContentLoaded", fetchData)