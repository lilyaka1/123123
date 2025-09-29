
(function () {
  const dlg   = document.getElementById('contactDialog');
const open  = document.getElementById('openDialog');
const close = document.getElementById('closeDialog');
const form  = document.getElementById('contactForm');

if (dlg && open && close && form) {

  open.addEventListener('click', () => {
    if (typeof dlg.showModal === 'function') {
      dlg.showModal();
    } else {
      dlg.setAttribute('open', '');
    }
    (dlg.querySelector('input, select, textarea, button') || dlg).focus();
  });

  close.addEventListener('click', () => dlg.close());

  dlg.addEventListener('click', e => {
    const rect = dlg.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right ||
        e.clientY < rect.top || e.clientY > rect.bottom) {
      dlg.close();
    }
  });

  dlg.addEventListener('keydown', e => { if (e.key === 'Escape') dlg.close(); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    [...form.elements].forEach(el => el.setCustomValidity?.(''));
    const email = form.elements.email;
    const phone = form.elements.phone;
    if (email?.validity.typeMismatch)
      email.setCustomValidity('Введите корректный e-mail, например name@example.com');
    if (phone && phone.value && !/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phone.value))
      phone.setCustomValidity('Формат: +7 (900) 000-00-00');
    if (!form.checkValidity()) { form.reportValidity(); return; }
    form.reset();
    dlg.close();
    alert('Спасибо! Форма отправлена ✅');
  });
}

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
