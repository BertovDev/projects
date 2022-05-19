const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
let cont = 0;

burger.addEventListener("click",() => {
    if(cont === 1){
        navLinks.style.display = "none";
        cont = 0;
    } else {
        navLinks.style.display = "flex";
        cont = 1;
    }
})
