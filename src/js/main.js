// Анимация счетчиков
function animateCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Модальное окно
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const form = document.getElementById('contactForm');
let lastActive = null;

// Открытие модалки
openBtn.addEventListener('click', () => {
    lastActive = document.activeElement;
    dlg.showModal();
    dlg.querySelector('input, select, textarea, button')?.focus();
});

// Закрытие модалки
closeBtn.addEventListener('click', () => dlg.close('cancel'));
closeDialogBtn.addEventListener('click', () => dlg.close('cancel'));

// Валидация формы
form.addEventListener('submit', (e) => {
    const elements = form.elements;
    
    // Сброс сообщений
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].setCustomValidity) {
            elements[i].setCustomValidity('');
        }
    }
    
    if (!form.checkValidity()) {
        e.preventDefault();
        
        // Кастомные сообщения
        const email = form.elements.email;
        if (email && email.validity.typeMismatch) {
            email.setCustomValidity('Введите корректный e-mail');
        }
        
        form.reportValidity();
        
        // Подсветка ошибок
        for (let i = 0; i < elements.length; i++) {
            const el = elements[i];
            if (el.willValidate) {
                el.toggleAttribute('aria-invalid', !el.checkValidity());
            }
        }
        return;
    }
    
    // Успешная отправка
    e.preventDefault();
    showSuccessMessage();
    dlg.close('success');
    form.reset();
});

// Сообщение об успехе
function showSuccessMessage() {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = 'Сообщение отправлено! Мы скоро свяжемся с вами.';
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Возврат фокуса
dlg.addEventListener('close', () => {
    lastActive?.focus();
});

// Закрытие по клику на backdrop
dlg.addEventListener('click', (e) => {
    if (e.target === dlg) {
        dlg.close('cancel');
    }
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    animateCounter();
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});