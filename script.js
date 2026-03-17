// ==========================================
// ЗАРАБОТОК ШКОЛЬНИКОВ - JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен!');

    // 1. Прогресс-бар прокрутки
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // 2. Калькулятор заработка
    const calculatorModal = document.getElementById('calculatorModal');
    const openCalculatorBtn = document.getElementById('openCalculator');
    const closeCalculatorBtn = document.getElementById('closeCalculator');
    const calculateBtn = document.getElementById('calculateBtn');
    const workTypeSelect = document.getElementById('workType');
    const hoursPerWeekInput = document.getElementById('hoursPerWeek');
    const hoursValueSpan = document.getElementById('hoursValue');
    const calcResult = document.getElementById('calcResult');

    // Открыть калькулятор
    if (openCalculatorBtn) {
        openCalculatorBtn.addEventListener('click', () => {
            calculatorModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Закрыть калькулятор
    if (closeCalculatorBtn) {
        closeCalculatorBtn.addEventListener('click', closeCalculator);
    }

    if (calculatorModal) {
        calculatorModal.addEventListener('click', (e) => {
            if (e.target === calculatorModal) {
                closeCalculator();
            }
        });
    }

    function closeCalculator() {
        calculatorModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Обновление значения часов
    if (hoursPerWeekInput && hoursValueSpan) {
        hoursPerWeekInput.addEventListener('input', () => {
            hoursValueSpan.textContent = hoursPerWeekInput.value;
        });
    }

    // Расчет заработка
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const hourlyRate = parseInt(workTypeSelect.value);
            const hoursPerWeek = parseInt(hoursPerWeekInput.value);

            const weekly = hourlyRate * hoursPerWeek;
            const monthly = weekly * 4.33;
            const yearly = monthly * 12;

            document.getElementById('weeklyAmount').textContent = weekly.toLocaleString() + '₽';
            document.getElementById('monthlyAmount').textContent = Math.round(monthly).toLocaleString() + '₽';
            document.getElementById('yearlyAmount').textContent = Math.round(yearly).toLocaleString() + '₽';
            
            // Анимация числа
            animateValue(document.getElementById('resultAmount'), 0, Math.round(monthly), 1000, '₽');

            calcResult.style.display = 'block';
        });
    }

    // 3. Кнопка "Наверх"
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Переключение темы
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Проверка сохраненной темы
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 5. Плавная навигация
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // 6. Анимация появления при скролле
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Анимация счетчиков в карточках
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateValue(stat, 0, target, 2000, '');
                });
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Вспомогательная функция анимации чисел
    function animateValue(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString() + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});

// ==========================================
// ТЕСТ (глобальные функции)
// ==========================================

const testQuestions = [
    {
        question: 'Можно ли официально работать в России с 14 лет?',
        correct: true,
        explanation: 'Верно! С 14 лет можно работать с согласия родителей.'
    },
    {
        question: 'Максимальная продолжительность рабочего дня для школьников - 8 часов?',
        correct: false,
        explanation: 'Неверно! Для школьников рабочий день не более 4-5 часов.'
    },
    {
        question: 'Фриланс - это законный способ заработка для школьников?',
        correct: true,
        explanation: 'Верно! Фриланс не требует официального трудоустройства.'
    },
    {
        question: 'Можно ли переводить деньги "для получения" работы?',
        correct: false,
        explanation: 'Неверно! Это классический признак мошенничества.'
    },
    {
        question: 'С 16 лет наступает полная трудоспособность?',
        correct: true,
        explanation: 'Верно! С 16 лет можно работать без ограничений.'
    }
];

let currentQuestion = 0;
let correctAnswers = 0;

function loadQuestion() {
    const q = testQuestions[currentQuestion];
    document.getElementById('questionText').innerHTML = q.question;
    document.getElementById('testCounter').textContent = `Вопрос ${currentQuestion + 1} из ${testQuestions.length}`;
    document.getElementById('testProgress').style.width = ((currentQuestion + 1) / testQuestions.length * 100) + '%';
    
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').className = '';
    document.getElementById('testButtons').style.display = 'flex';
    document.getElementById('testNavigation').style.display = 'none';
}

function checkAnswer(userAnswer) {
    const q = testQuestions[currentQuestion];
    const isCorrect = userAnswer === q.correct;
    
    if (isCorrect) correctAnswers++;
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<i class="fas fa-${isCorrect ? 'check' : 'times'}-circle"></i> ${isCorrect ? 'Правильно!' : 'Неправильно!'} ${q.explanation}`;
    resultDiv.className = isCorrect ? 'result-correct' : 'result-wrong';
    
    document.getElementById('testButtons').style.display = 'none';
    document.getElementById('testNavigation').style.display = 'block';
}

function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < testQuestions.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    const percentage = Math.round((correctAnswers / testQuestions.length) * 100);
    let message = '';
    let icon = '';
    
    if (percentage === 100) {
        message = 'Отлично! Вы эксперт!';
        icon = '🏆';
    } else if (percentage >= 80) {
        message = 'Хороший результат!';
        icon = '👍';
    } else if (percentage >= 60) {
        message = 'Неплохо, но есть над чем поработать.';
        icon = '📚';
    } else {
        message = 'Стоит перечитать материал!';
        icon = '💪';
    }
    
    document.getElementById('questionText').innerHTML = `${icon} Тест завершен!`;
    document.getElementById('testCounter').textContent = 'Результат';
    document.getElementById('testProgress').style.width = '100%';
    
    document.getElementById('result').innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">${icon}</div>
        <div style="font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem;">
            ${correctAnswers} из ${testQuestions.length}
        </div>
        <div style="color: var(--text-light); margin-bottom: 1rem;">${message}</div>
        <button class="test-nav-btn" onclick="location.reload()">
            <i class="fas fa-redo"></i> Пройти снова
        </button>
    `;
    document.getElementById('result').className = 'result-correct';
    document.getElementById('testNavigation').style.display = 'none';
}

// Инициализация теста при загрузке
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('test')) {
        loadQuestion();
    }
});
