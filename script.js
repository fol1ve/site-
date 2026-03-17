// Create floating particles
function createParticles() {
  const container = document.getElementById('particles');
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.width = particle.style.height = (Math.random() * 20 + 5) + 'px';
    container.appendChild(particle);
  }
}

// Scroll reveal animation
function reveal() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

let isDark = false;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  body.classList.toggle('dark-mode');
  icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';

  // Add rotation animation
  themeToggle.style.transform = 'scale(1.1) rotate(360deg)';
  setTimeout(() => {
    themeToggle.style.transform = '';
  }, 300);
});

// Test functionality
const testButtons = document.querySelectorAll('.test-btn');
const result = document.getElementById('result');

testButtons.forEach(button => {
  button.addEventListener('click', function() {
    const isCorrect = this.dataset.answer === 'true';

    // Reset styles
    testButtons.forEach(btn => {
      btn.style.transform = '';
      btn.style.boxShadow = '';
    });

    if (isCorrect) {
      result.textContent = '✅ Правильно! С 14 лет можно работать с согласия родителей.';
      result.className = 'result-correct';
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.6)';

      // Confetti effect
      createConfetti();
    } else {
      result.textContent = '❌ Неверно. В России с 14 лет можно официально трудоустроиться.';
      result.className = 'result-wrong';
      this.style.transform = 'scale(0.95)';
      this.style.animation = 'shake 0.5s';
      setTimeout(() => {
        this.style.animation = '';
      }, 500);
    }
  });
});

// Confetti effect
function createConfetti() {
  const colors = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6'];
  const container = document.querySelector('.test-container');

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.left = '50%';
    confetti.style.top = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    container.appendChild(confetti);

    const angle = (Math.PI * 2 * i) / 30;
    const velocity = 100 + Math.random() * 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    confetti.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
    ], {
      duration: 1000,
      easing: 'cubic-bezier(0, .9, .57, 1)'
    }).onfinish = () => confetti.remove();
  }
}

// Ripple effect on buttons
function createRipple(event) {
  const button = event.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = diameter + 'px';
  circle.style.left = event.clientX - button.getBoundingClientRect().left - radius + 'px';
  circle.style.top = event.clientY - button.getBoundingClientRect().top - radius + 'px';
  circle.classList.add('ripple');

  const existingRipple = button.getElementsByClassName('ripple')[0];
  if (existingRipple) {
    existingRipple.remove();
  }

  button.appendChild(circle);
}

// Add ripple to all buttons
document.querySelectorAll('.btn, .test-btn').forEach(button => {
  button.addEventListener('click', createRipple);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// Initialize
window.addEventListener('load', () => {
  createParticles();
  reveal();
});

window.addEventListener('scroll', reveal);
