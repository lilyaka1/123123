// Ожидание загрузки DOM
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal');
  const open = document.getElementById('openModal');
  const close = document.getElementById('closeModal');
  const form = document.getElementById('contactForm');

  // Открытие модального окна
  open?.addEventListener('click', () => {
    modal.hidden = false;
    modal.querySelector('input,select,textarea,button')?.focus();
  });

  // Закрытие модального окна
  close?.addEventListener('click', () => {
    modal.hidden = true;
    form?.reset();
  });

  // Закрытие по клику вне окна
  modal?.addEventListener('click', (e) => {
    if (e.target.dataset.close !== undefined) {
      modal.hidden = true;
      form?.reset();
    }
  });

  // Валидация формы
  form?.addEventListener('submit', (e) => {
    // Сброс кастомных сообщений
    [...form.elements].forEach(el => el.setCustomValidity?.(''));
    // Проверка встроенных ограничений
    if (!form.checkValidity()) {
      e.preventDefault();
      // Пример: таргетированное сообщение
      const email = form.elements.email;
      if (email?.validity.typeMismatch) {
        email.setCustomValidity('Введите корректный e-mail, например name@example.com');
      }
      form.reportValidity();
      // Подсветка проблемных полей
      [...form.elements].forEach(el => {
        if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
      });
      return;
    }
    // Успешная «отправка» (без сервера)
    e.preventDefault();
    modal.hidden = true;
    form.reset();
  });
});