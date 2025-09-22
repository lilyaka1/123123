// МОДАЛКА + ВАЛИДАЦИЯ (минимально, без полифиллов)
(function () {
  const dlg   = document.getElementById('contactDialog');
  const open  = document.getElementById('openDialog');
  const close = document.getElementById('closeDialog');
  const form  = document.getElementById('contactForm');
  if (!dlg || !open || !close || !form) return;

  function openDialog() {
    try { (typeof dlg.showModal === 'function') ? dlg.showModal() : dlg.setAttribute('open', ''); }
    catch (_) { dlg.setAttribute('open', ''); }
    (dlg.querySelector('input,select,textarea,button') || dlg).focus();
  }
  function closeDialog() {
    try { dlg.close && dlg.close('cancel'); } catch (_) {}
    dlg.removeAttribute('open');
    open.focus();
  }

  open.addEventListener('click', openDialog);
  close.addEventListener('click', closeDialog);
  dlg.addEventListener('click', (e) => {
    const r = dlg.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) closeDialog();
  });
  dlg.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); closeDialog(); } });

  form.addEventListener('submit', (e) => {
    [...form.elements].forEach(el => el.setCustomValidity?.(''));
    const email = form.elements.email;
    const phone = form.elements.phone;

    if (email?.validity.typeMismatch) {
      email.setCustomValidity('Введите корректный e-mail, например name@example.com');
    }
    if (phone && phone.value && !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone.value)) {
      phone.setCustomValidity('Формат: +7 (900) 000-00-00');
    }

    if (!form.checkValidity()) { e.preventDefault(); form.reportValidity(); return; }
    e.preventDefault();
    form.reset();
    closeDialog();
    alert('Спасибо! Форма отправлена ✅');
  });
})();

// ТЁМНАЯ ТЕМА (кнопка в шапке)
(function(){
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const apply = (mode) => {
    document.documentElement.classList.toggle('theme-dark', mode === 'dark');
    btn.setAttribute('aria-pressed', String(mode === 'dark'));
    btn.textContent = (mode === 'dark') ? '☀️ Тема' : '🌙 Тема';
  };

  const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  apply(saved);

  btn.addEventListener('click', () => {
    const next = document.documentElement.classList.contains('theme-dark') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    apply(next);
  });
})();