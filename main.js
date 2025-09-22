// компактная версия без полифиллов и лишних эффектов
(function () {
  const dlg   = document.getElementById('contactDialog');
  const open  = document.getElementById('openDialog');
  const close = document.getElementById('closeDialog');
  const form  = document.getElementById('contactForm');

  if (!dlg || !open || !close || !form) return;

  function openDialog() {
    try {
      // предпочтительно нативно
      if (typeof dlg.showModal === 'function') dlg.showModal();
      else dlg.setAttribute('open', ''); // примитивный фолбэк
    } catch (_) {
      dlg.setAttribute('open', '');
    }
    // фокус в первое поле
    (dlg.querySelector('input,select,textarea,button') || dlg).focus();
  }

  function closeDialog() {
    try { dlg.close && dlg.close('cancel'); } catch (_) {}
    dlg.removeAttribute('open');
    open.focus();
  }

  open.addEventListener('click', openDialog);
  close.addEventListener('click', closeDialog);

  // клик по фону — закрыть (работает и для <dialog>, и для фолбэка)
  dlg.addEventListener('click', (e) => {
    const rect = dlg.getBoundingClientRect();
    const inBox = e.clientX >= rect.left && e.clientX <= rect.right &&
                  e.clientY >= rect.top  && e.clientY <= rect.bottom;
    if (!inBox) closeDialog();
  });

  // Esc — закрыть
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.preventDefault(); closeDialog(); }
  });

  // простая валидация
  form.addEventListener('submit', (e) => {
    // сброс кастомных сообщений
    [...form.elements].forEach(el => el.setCustomValidity && el.setCustomValidity(''));

    const email = form.elements.email;
    const phone = form.elements.phone;

    if (email && email.validity.typeMismatch) {
      email.setCustomValidity('Введите корректный e-mail, например name@example.com');
    }
    if (phone && phone.value && !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone.value)) {
      phone.setCustomValidity('Формат: +7 (900) 000-00-00');
    }

    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
      return;
    }

    e.preventDefault(); // имитация отправки без сервера
    form.reset();
    closeDialog();
    alert('Спасибо! Форма отправлена ✅');
  });
})();
// Переключатель темы (лайт/дарк) с сохранением в localStorage
(function(){
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const apply = (mode) => {
    document.documentElement.classList.toggle('theme-dark', mode === 'dark');
    btn.setAttribute('aria-pressed', String(mode === 'dark'));
    btn.textContent = (mode === 'dark') ? '☀️ Тема' : '🌙 Тема';
  };

  // начальная тема
  const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  apply(saved);

  btn.addEventListener('click', () => {
    const next = document.documentElement.classList.contains('theme-dark') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    apply(next);
  });
})();