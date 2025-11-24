// Управление модальным окном
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const openButtons = document.querySelectorAll('.open-modal-btn');
const closeButton = document.querySelector('.close-btn');

function openModal() {
    modal.style.display = 'block';
    overlay.style.display = 'block';
    closeButton.focus();
}

function closeModal() {
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

// Обработчики событий
openButtons.forEach(btn => {
    btn.addEventListener('click', openModal);
});

closeButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Закрытие по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Управление темой
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Проверяем сохраненную тему
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeButton(savedTheme);

themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
});

function updateThemeButton(theme) {
    if (theme === 'dark') {
        themeToggle.textContent = '☀️';
        themeToggle.setAttribute('aria-label', 'Переключить на светлую тему');
    } else {
        themeToggle.textContent = '🌙';
        themeToggle.setAttribute('aria-label', 'Переключить на темную тему');
    }
}

// Валидация формы
const form = document.querySelector('.contact-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Простая валидация
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    if (!name || !email) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    alert('Форма успешно отправлена!');
    form.reset();
});

// Захват фокуса в модальном окне
modal.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

console.log('Сайт загружен и готов к работе!');