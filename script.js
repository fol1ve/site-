// плавная прокрутка
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// анимация появления карточек
const cards = document.querySelectorAll(".card");
window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const position = card.getBoundingClientRect().top;
    const screen = window.innerHeight;
    if (position < screen - 100) {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }
  });
});

// запуск анимации при загрузке страницы
window.addEventListener("load", () => {
  cards.forEach(card => {
    const position = card.getBoundingClientRect().top;
    const screen = window.innerHeight;
    if (position < screen - 100) {
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }
  });
});

// переключение темы
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// тест
function checkAnswer(correct) {
  let result = document.getElementById("result");
  if (correct) {
    result.innerHTML = "✅ Правильно! С 14 лет можно работать.";
  } else {
    result.innerHTML = "❌ Неправильно. Работать можно с 14 лет.";
  }
}
