document.addEventListener("DOMContentLoaded", () => {

  // плавная прокрутка
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // анимация карточек
  const cards = document.querySelectorAll(".card");
  function animateCards() {
    cards.forEach(card => {
      const position = card.getBoundingClientRect().top;
      const screen = window.innerHeight;
      if (position < screen - 100) {
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
      }
    });
  }
  window.addEventListener("scroll", animateCards);
  animateCards(); // запуск сразу при загрузке

  // переключение темы
  const themeBtn = document.querySelector(".theme-btn");
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  // тест
  const testButtons = document.querySelectorAll("#test button");
  const result = document.getElementById("result");
  testButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const answer = btn.dataset.answer === "true";
      if (answer) {
        result.innerHTML = "✅ Правильно! С 14 лет можно работать.";
      } else {
        result.innerHTML = "❌ Неправильно. Работать можно с 14 лет.";
      }
    });
  });

});
