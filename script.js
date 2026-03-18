// ==========================================
// ЗАРАБОТОК ШКОЛЬНИКОВ - Improved JavaScript
// Fixes: 3, 6, 7, 11
// ==========================================

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle utility function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен! Улучшенная версия v2.0');

    // 1. Прогресс-бар прокрутки с debounce
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const updateProgressBar = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrolled + '%';
            progressBar.setAttribute('aria-valuenow', Math.round(scrolled));
        };

        window.addEventListener('scroll', throttle(updateProgressBar, 16)); // ~60fps
    }

    // 2. Калькулятор заработка - улучшенный
    const calculatorModal = document.getElementById('calculatorModal');
    const openCalculatorBtn = document.getElementById('openCalculator');
    const closeCalculatorBtn = document.getElementById('closeCalculator');
    const calculateBtn = document.getElementById('calculateBtn');
    const workTypeSelect = document.getElementById('workType');
    const hoursPerWeekInput = document.getElementById('hoursPerWeek');
    const hoursValueSpan = document.getElementById('hoursValue');
    const calcResult = document.getElementById('calcResult');
    const quickButtons = document.querySelectorAll('.calc-quick-btn');

    // Открыть калькулятор
    if (openCalculatorBtn) {
        openCalculatorBtn.addEventListener('click', () => {
            calculatorModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            closeCalculatorBtn.focus();
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

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && calculatorModal.classList.contains('active')) {
                closeCalculator();
            }
        });
    }

    function closeCalculator() {
        calculatorModal.classList.remove('active');
        document.body.style.overflow = '';
        openCalculatorBtn.focus();
    }

    // Обновление значения часов
    if (hoursPerWeekInput && hoursValueSpan) {
        hoursPerWeekInput.addEventListener('input', () => {
            hoursValueSpan.textContent = hoursPerWeekInput.value;
            updateQuickButtons(hoursPerWeekInput.value);
        });
    }

    // Quick buttons functionality
    quickButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const hours = btn.getAttribute('data-hours');
            hoursPerWeekInput.value = hours;
            hoursValueSpan.textContent = hours;
            updateQuickButtons(hours);
        });
    });

    function updateQuickButtons(currentValue) {
        quickButtons.forEach(btn => {
            if (btn.getAttribute('data-hours') === currentValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Расчет заработка - исправленная анимация
    let currentAnimation = null;

    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const hourlyRate = parseInt(workTypeSelect.value);
            const hoursPerWeek = parseInt(hoursPerWeekInput.value);

            if (isNaN(hourlyRate) || isNaN(hoursPerWeek)) {
                alert('Пожалуйста, выберите тип работы и количество часов');
                return;
            }

            const weekly = hourlyRate * hoursPerWeek;
            const monthly = weekly * 4.33;
            const yearly = monthly * 12;

            document.getElementById('weeklyAmount').textContent = weekly.toLocaleString() + '₽';
            document.getElementById('monthlyAmount').textContent = Math.round(monthly).toLocaleString() + '₽';
            document.getElementById('yearlyAmount').textContent = Math.round(yearly).toLocaleString() + '₽';

            // Cancel previous animation if exists
            if (currentAnimation) {
                cancelAnimationFrame(currentAnimation);
            }

            // Анимация числа - исправленная
            const resultElement = document.getElementById('resultAmount');
            animateValue(resultElement, 0, Math.round(monthly), 1000, '₽');

            calcResult.style.display = 'block';
            calcResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // 3. Кнопка "Наверх" с throttle
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        const toggleBackToTop = () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', throttle(toggleBackToTop, 100));

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

                // Close mobile menu if open
                const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
                if (mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
                    mobileMenuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // 6. Mobile Menu
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    if (mobileMenuToggle && mobileMenuOverlay) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            mobileMenuClose.focus();
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mobileMenuToggle.focus();
        });

        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.focus();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
                mobileMenuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.focus();
            }
        });
    }

    // 7. Анимация появления при скролле с IntersectionObserver
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

                // Unobserve after animation
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // Вспомогательная функция анимации чисел - улучшенная
    function animateValue(element, start, end, duration, suffix = '') {
        // Cancel any existing animation on this element
        if (element.dataset.animationId) {
            cancelAnimationFrame(parseInt(element.dataset.animationId));
        }

        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Easing function for smoother animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const value = Math.floor(easeOutQuart * (end - start) + start);

            element.textContent = value.toLocaleString() + suffix;

            if (progress < 1) {
                element.dataset.animationId = requestAnimationFrame(step);
            } else {
                delete element.dataset.animationId;
            }
        };
        element.dataset.animationId = requestAnimationFrame(step);
    }

    // Initialize quick buttons
    if (hoursPerWeekInput) {
        updateQuickButtons(hoursPerWeekInput.value);
    }
});

// ==========================================
// ТЕСТ (глобальные функции) - УЛУЧШЕННЫЙ
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
let userAnswers = []; // Store user answers for summary

function loadQuestion() {
    // Check if test element exists
    const testContainer = document.getElementById('test');
    if (!testContainer) return;

    const q = testQuestions[currentQuestion];
    document.getElementById('questionText').innerHTML = q.question;
    document.getElementById('testCounter').textContent = `Вопрос ${currentQuestion + 1} из ${testQuestions.length}`;
    document.getElementById('testProgress').style.width = ((currentQuestion + 1) / testQuestions.length * 100) + '%';
    document.getElementById('testProgress').setAttribute('aria-valuenow', Math.round((currentQuestion + 1) / testQuestions.length * 100));

    document.getElementById('result').innerHTML = '';
    document.getElementById('result').className = '';
    document.getElementById('testButtons').style.display = 'flex';
    document.getElementById('testNavigation').style.display = 'none';

    // Show/hide prev button
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
        prevBtn.style.display = currentQuestion > 0 ? 'inline-flex' : 'none';
    }
}

function checkAnswer(userAnswer) {
    const q = testQuestions[currentQuestion];
    const isCorrect = userAnswer === q.correct;

    if (isCorrect) correctAnswers++;

    // Store answer for summary
    userAnswers[currentQuestion] = {
        question: q.question,
        userAnswer: userAnswer,
        correct: isCorrect,
        correctAnswer: q.correct,
        explanation: q.explanation
    };

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<i class="fas fa-${isCorrect ? 'check' : 'times'}-circle"></i> ${isCorrect ? 'Правильно!' : 'Неправильно!'} ${q.explanation}`;
    resultDiv.className = isCorrect ? 'result-correct' : 'result-wrong';

    document.getElementById('testButtons').style.display = 'none';
    document.getElementById('testNavigation').style.display = 'flex';
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        // Adjust correct answers count if going back
        if (userAnswers[currentQuestion] && userAnswers[currentQuestion].correct) {
            correctAnswers--;
        }
        userAnswers.pop();
        loadQuestion();
    }
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
    document.getElementById('testProgress').setAttribute('aria-valuenow', 100);

    // Build summary
    let summaryHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">${icon}</div>
        <div style="font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem;">
            ${correctAnswers} из ${testQuestions.length}
        </div>
        <div style="color: var(--text-light); margin-bottom: 2rem;">${message}</div>
    `;

    // Add detailed summary
    summaryHTML += '<div class="test-summary"><h3>Разбор ответов:</h3>';
    userAnswers.forEach((answer, index) => {
        const answerIcon = answer.correct ? '✓' : '✗';
        const answerClass = answer.correct ? 'correct' : 'wrong';
        const userAnswerText = answer.userAnswer ? 'Да' : 'Нет';
        const correctAnswerText = answer.correctAnswer ? 'Да' : 'Нет';

        summaryHTML += `
            <div class="test-summary-item ${answerClass}">
                <span class="test-summary-icon">${answerIcon}</span>
                <div class="test-summary-text">
                    <div class="test-summary-question">${index + 1}. ${answer.question}</div>
                    <div class="test-summary-answer">
                        Ваш ответ: <strong>${userAnswerText}</strong> |
                        Правильно: <strong>${correctAnswerText}</strong>
                    </div>
                </div>
            </div>
        `;
    });
    summaryHTML += '</div>';

    summaryHTML += `
        <button class="test-nav-btn" onclick="restartTest()" style="margin-top: 2rem;">
            <i class="fas fa-redo"></i> Пройти снова
        </button>
    `;

    document.getElementById('result').innerHTML = summaryHTML;
    document.getElementById('result').className = 'result-correct';
    document.getElementById('testNavigation').style.display = 'none';
    document.getElementById('testButtons').style.display = 'none';
}

function restartTest() {
    currentQuestion = 0;
    correctAnswers = 0;
    userAnswers = [];
    loadQuestion();
}

// Инициализация теста при загрузке
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('test')) {
        loadQuestion();
    }
});
