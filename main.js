// Логика модального окна и валидации формы
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
let lastActive = null;

openBtn?.addEventListener('click', () => {
  lastActive = document.activeElement;
  dlg.showModal();
  dlg.querySelector('input,select,textarea,button')?.focus();
});

closeBtn?.addEventListener('click', () => dlg.close('cancel'));

form?.addEventListener('submit', (e) => {
  // Сбросим кастомные сообщения
  [...form.elements].forEach(el => el.setCustomValidity?.(''));

  if (!form.checkValidity()) {
    e.preventDefault();

    // Пример кастомного сообщения для email
    const email = form.elements.email;
    if (email?.validity.typeMismatch) {
      email.setCustomValidity('Введите корректный e-mail, например name@example.com');
    }

    form.reportValidity();

    // Подсветка невалидных полей
    [...form.elements].forEach(el => {
      if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
    });
    return;
  }

  // Успешная отправка (без сервера)
  e.preventDefault();
  dlg.close('success');
  form.reset();

  // Опционально: уведомление
  alert('Спасибо! Форма отправлена ✅');
});

dlg?.addEventListener('close', () => { lastActive?.focus(); });