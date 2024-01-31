const button = document.querySelectorAll("button");


const changeDifiHandler = event => {
    const value = event.target.innerText.toLowerCase();
    localStorage.setItem("level", value);
    window.location.assign("/");
}

button.forEach(btn => {
    btn.addEventListener("click", changeDifiHandler)
});