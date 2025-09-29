const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

// Открытие
openBtn?.addEventListener('click', () => {
  lastActive = document.activeElement;
  dlg.showModal();
  dlg.querySelector('input,select,textarea,button')?.focus();
});

// Закрытие
closeBtn?.addEventListener('click', () => dlg.close('cancel'));

// Валидация
form?.addEventListener('submit', (e) => {
  [...form.elements].forEach(el => el.setCustomValidity?.(''));

  if (!form.checkValidity()) {
    e.preventDefault();
    const email = form.elements.email;
    if (email?.validity.typeMismatch) {
      email.setCustomValidity('Введите корректный e-mail, например name@example.com');
    }
    form.reportValidity();
    [...form.elements].forEach(el => {
      if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
    });
    return;
  }

  e.preventDefault();
  alert("Форма успешно отправлена!");
  dlg.close('success');
  form.reset();
});

dlg?.addEventListener('close', () => { lastActive?.focus(); });

// Маска телефона
const phone = document.getElementById('phone');
phone?.addEventListener('input', () => {
  const digits = phone.value.replace(/\D/g, '').slice(0, 11);
  const d = digits.replace(/^8/, '7');
  const parts = [];
  if (d.length > 0) parts.push('+7');
  if (d.length > 1) parts.push(' (' + d.slice(1,4));
  if (d.length >= 4) parts[parts.length - 1] += ')';
  if (d.length >= 5) parts.push(' ' + d.slice(4,7));
  if (d.length >= 8) parts.push('-' + d.slice(7,9));
  if (d.length >= 10) parts.push('-' + d.slice(9,11));
  phone.value = parts.join('');
});
// Улучшенный переключатель темы с сохранением в localStorage
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('theme-dark');
  if (themeToggle) themeToggle.textContent = 'Светлая тема';
}
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('theme-dark');
  const isDark = document.body.classList.contains('theme-dark');
  themeToggle.textContent = isDark ? 'Светлая тема' : 'Тёмная тема';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
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
