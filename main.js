// ============================
// МОДАЛКА + ВАЛИДАЦИЯ
// ============================
(function () {
  const dlg   = document.getElementById('contactDialog');
  const open  = document.getElementById('openDialog');
  const close = document.getElementById('closeDialog');
  const form  = document.getElementById('contactForm');
  if (!dlg || !open || !close || !form) return;

  // Открытие модалки
  open.addEventListener('click', () => {
    if (typeof dlg.showModal === 'function') {
      dlg.showModal();
    } else {
      dlg.setAttribute('open', '');
    }
    // Фокус на первом поле формы
    (dlg.querySelector('input, select, textarea, button') || dlg).focus();
  });

  // Закрытие модалки
  close.addEventListener('click', () => dlg.close());

  // Закрытие при клике вне модалки
  dlg.addEventListener('click', (e) => {
    const r = dlg.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      dlg.close();
    }
  });

  // Закрытие по Escape
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') dlg.close();
  });

  // Валидация формы
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Сброс кастомных ошибок
    [...form.elements].forEach(el => el.setCustomValidity?.(''));

    const email = form.elements.email;
    const phone = form.elements.phone;

    if (email?.validity.typeMismatch) {
      email.setCustomValidity('Введите корректный e-mail, например name@example.com');
    }
    if (phone && phone.value && !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone.value)) {
      phone.setCustomValidity('Формат: +7 (900) 000-00-00');
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Если всё ок
    form.reset();
    dlg.close();
    alert('Спасибо! Форма отправлена ✅');
  });
})();

// ============================
// ТЁМНАЯ ТЕМА
// ============================
(function () {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const apply = (mode) => {
    document.documentElement.classList.toggle('theme-dark', mode === 'dark');
    btn.setAttribute('aria-pressed', String(mode === 'dark'));
    btn.textContent = mode === 'dark' ? '☀️ Тема' : '🌙 Тема';
  };

  const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  apply(saved);

  btn.addEventListener('click', () => {
    const next = document.documentElement.classList.contains('theme-dark') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    apply(next);
  });
})();
