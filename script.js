// плавная прокрутка

document.querySelectorAll("nav a").forEach(link => {

link.addEventListener("click", function(e){

e.preventDefault()

document.querySelector(this.getAttribute("href")).scrollIntoView({

behavior:"smooth"

})

})

})


// анимация карточек

const cards = document.querySelectorAll(".card")

window.addEventListener("scroll", () => {

cards.forEach(card => {

const position = card.getBoundingClientRect().top

const screen = window.innerHeight

if(position < screen - 100){

card.style.opacity = 1
card.style.transform = "translateY(0)"

}

})

})
