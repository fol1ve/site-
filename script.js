// ==========================================
// ЗАРАБОТОК ШКОЛЬНИКОВ - Основной JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. Прогресс-бар прокрутки
    // ==========================================
    const progressBar = document.getElementById('progressBar');

    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ==========================================
    // 2. Плавающие частицы (particles)
    // ==========================================
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    function createParticles() {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Случайные параметры для каждой частицы
            const size = Math.random() * 10 + 5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = Math.random() * 5 + 's';

            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // ==========================================
    // 3. Калькулятор заработка (Модальное окно)
    // ==========================================
    const calculatorModal = document.getElementById('calculatorModal');
    const openCalculatorBtn = document.getElementById('openCalculator');
    const closeCalculatorBtn = document.getElementById('closeCalculator');
    const calculateBtn = document.getElementById('calculateBtn');
    const workTypeSelect = document.getElementById('workType');
    const hoursPerWeekInput = document.getElementById('hoursPerWeek');
    const hoursValueSpan = document.getElementById('hoursValue');
    const calcResult = document.getElementById('calcResult');
    const resultAmount = document.getElementById('resultAmount');
    const weeklyAmount = document.getElementById('weeklyAmount');
    const monthlyAmount = document.getElementById('monthlyAmount');
    const yearlyAmount = document.getElementById('yearlyAmount');

    // Открыть модальное окно
    openCalculatorBtn.addEventListener('click', () => {
        calculatorModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Закрыть модальное окно
    function closeCalculator() {
        calculatorModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeCalculatorBtn.addEventListener('click', closeCalculator);

    // Закрытие по клику на оверлей
    calculatorModal.addEventListener('click', (e) => {
        if (e.target === calculatorModal) {
            closeCalculator();
        }
    });

    // Обновление значения часов при движении слайдера
    hoursPerWeekInput.addEventListener('input', () => {
        hoursValueSpan.textContent = hoursPerWeekInput.value;
    });

    // Расчет заработка
    calculateBtn.addEventListener('click', () => {
        const hourlyRate = parseInt(workTypeSelect.value);
        const hoursPerWeek = parseInt(hoursPerWeekInput.value);

        const weekly = hourlyRate * hoursPerWeek;
        const monthly = weekly * 4.33; // Среднее количество недель в месяце
        const yearly = monthly * 12;

        // Анимация чисел
        animateValue(resultAmount, 0, Math.round(monthly), 1000, '₽');
        weeklyAmount.textContent = weekly.toLocaleString() + '₽';
        monthlyAmount.textContent = Math.round(monthly).toLocaleString() + '₽';
        yearlyAmount.textContent = Math.round(yearly).toLocaleString() + '₽';

        calcResult.style.display = 'block';
        calcResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    // ==========================================
    // 4. Кнопка "Наверх"
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // 5. Переключение темы (Тёмная/Светлая)
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;

    // Проверка сохраненной темы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // ==========================================
    // 6. Плавная навигация по якорям
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 7. Анимация появления элементов при скролле
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Если это карточка истории с цифрами - запускаем анимацию счетчика
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateValue(stat, 0, target, 2000, '');
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 8. Тест знаний
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

    const questionText = document.getElementById('questionText');
    const testButtons = document.getElementById('testButtons');
    const testCounter = document.getElementById('testCounter');
    const testProgress = document.getElementById('testProgress');
    const resultDiv = document.getElementById('result');
    const testNavigation = document.getElementById('testNavigation');
    const nextQuestionBtn = document.getElementById('nextQuestion');

    function loadQuestion() {
        const q = testQuestions[currentQuestion];
        questionText.innerHTML = `<i class="fas fa-question-circle" style="color: var(--primary); margin-right: 0.5rem;"></i>${q.question}`;
        testCounter.textContent = `Вопрос ${currentQuestion + 1} из ${testQuestions.length}`;
        testProgress.style.width = ((currentQuestion + 1) / testQuestions.length * 100) + '%';

        // Сброс состояния
        resultDiv.innerHTML = '';
        resultDiv.className = '';
        testButtons.style.display = 'flex';
        testNavigation.style.display = 'none';

        // Обновляем обработчики кнопок
        const yesBtn = testButtons.querySelector('.test-btn-yes');
        const noBtn = testButtons.querySelector('.test-btn-no');

        yesBtn.onclick = () => checkAnswer(true);
        noBtn.onclick = () => checkAnswer(false);
    }

    function checkAnswer(userAnswer) {
        const q = testQuestions[currentQuestion];
        const isCorrect = userAnswer === q.correct;

        if (isCorrect) correctAnswers++;

        // Показываем результат
        resultDiv.innerHTML = `
            <i class="fas fa-${isCorrect ? 'check-circle' : 'times-circle'}"></i>
            ${isCorrect ? 'Правильно!' : 'Неправильно!'} ${q.explanation}
        `;
        resultDiv.className = isCorrect ? 'result-correct' : 'result-wrong';

        // Скрываем кнопки ответов, показываем кнопку "Далее"
        testButtons.style.display = 'none';
        testNavigation.style.display = 'block';
    }

    nextQuestionBtn.addEventListener('click', () => {
        currentQuestion++;

        if (currentQuestion < testQuestions.length) {
            loadQuestion();
        } else {
            showFinalResult();
        }
    });

    function showFinalResult() {
        const percentage = Math.round((correctAnswers / testQuestions.length) * 100);
        let message = '';
        let icon = '';

        if (percentage === 100) {
            message = 'Отлично! Вы эксперт в финансовой безопасности!';
            icon = '🏆';
        } else if (percentage >= 80) {
            message = 'Хороший результат! Вы хорошо разбираетесь.';
            icon = '👍';
        } else if (percentage >= 60) {
            message = 'Неплохо, но есть над чем поработать.';
            icon = '📚';
        } else {
            message = 'Стоит перечитать материал и попробовать снова!';
            icon = '💪';
        }

        questionText.innerHTML = `${icon} Тест завершен!`;
        testCounter.textContent = 'Результат';
        testProgress.style.width = '100%';

        resultDiv.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">${icon}</div>
            <div style="font-size: 2rem; font-weight: 800; margin-bottom: 0.5rem;">
                ${correctAnswers} из ${testQuestions.length}
            </div>
            <div style="color: var(--text-light); margin-bottom: 1rem;">${message}</div>
            <button class="test-nav-btn" onclick="location.reload()">
                <i class="fas fa-redo"></i> Пройти снова
            </button>
        `;
        resultDiv.className = 'result-correct';
        testNavigation.style.display = 'none';
    }

    // Инициализация теста
    if (document.getElementById('test')) {
        loadQuestion();
    }

    // ==========================================
    // 9. Эффект ripple для кнопок
    // ==========================================
    document.querySelectorAll('.btn, .calc-btn, .test-btn, .test-nav-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ==========================================
    // 10. Фиксация навигации при скролле
    // ==========================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // ==========================================
    // Вспомогательная функция: Анимация чисел
    // ==========================================
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

    // ==========================================
    // 11. Параллакс эффект для плавающих карточек
    // ==========================================
    document.addEventListener('mousemove', (e) => {
        const floatCards = document.querySelectorAll('.float-card');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        floatCards.forEach((card, index) => {
            const speed = (index + 1) * 10;
            const xOffset = (0.5 - x) * speed;
            const yOffset = (0.5 - y) * speed;
            card.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    console.log('🚀 Сайт "Заработок школьников" успешно загружен!');
});
