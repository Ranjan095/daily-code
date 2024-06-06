let myname = document.getElementById("my-name");
let changeName = document.getElementById("changeName");
let body = document.getElementById("body-cont");

changeName.addEventListener("click", () => {
    // myname.style.color="red";
    // myname.innerText = "Ranjan yadav";
    body.innerHTML="<h1>Hiii this is Ranjan</h1>"
});
