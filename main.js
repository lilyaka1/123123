// main.js — надёжная версия с фолбэком и логами
document.addEventListener('DOMContentLoaded', () => {
  console.log('[init] main.js loaded');

  const dlg = document.getElementById('contactDialog');
  const openBtn = document.getElementById('openDialog');
  const closeBtn = document.getElementById('closeDialog');
  const form = document.getElementById('contactForm');
  let lastActive = null;

  if (!dlg) {
    console.error('❌ Не найден <dialog id="contactDialog">. Проверь разметку index.html');
    return;
  }

  // Поддержка старых браузеров: регистрируем полифилл, если нативного showModal нет
  if (typeof dlg.showModal !== 'function') {
    console.warn('⚠️ Нет нативной поддержки <dialog>, пробуем polyfill');
    if (window.dialogPolyfill) {
      window.dialogPolyfill.registerDialog(dlg);
      console.log('✅ dialog-polyfill подключён');
    } else {
      console.warn('⚠️ dialog-polyfill не подключён — будет упрощённый фолбэк');
    }
  }

  const openDialog = () => {
    try {
      if (typeof dlg.showModal === 'function') {
        dlg.showModal();
      } else if (typeof dlg.show === 'function') {
        dlg.show();            // polyfill-режим
      } else {
        dlg.setAttribute('open', ''); // самый простой фолбэк
      }
    } catch (e) {
      console.error('showModal/show error:', e);
      dlg.setAttribute('open', '');
    }
    // Фокус на первое интерактивное поле
    dlg.querySelector('input,select,textarea,button')?.focus();
  };

  const closeDialog = (returnValue = 'cancel') => {
    try {
      if (typeof dlg.close === 'function') dlg.close(returnValue);
      else dlg.removeAttribute('open');
    } catch (e) {
      dlg.removeAttribute('open');
    }
  };

  openBtn?.addEventListener('click', () => {
    lastActive = document.activeElement;
    openDialog();
  });

  closeBtn?.addEventListener('click', () => closeDialog('cancel'));

  dlg?.addEventListener('close', () => { lastActive?.focus(); });

  // Валидация формы (Constraint Validation API)
  form?.addEventListener('submit', (e) => {
    // сбрасываем кастомные сообщения
    [...form.elements].forEach(el => el.setCustomValidity?.(''));

    if (!form.checkValidity()) {
      e.preventDefault();

      // Пользовательское сообщение для email
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

    // Успешная «отправка» без сервера
    e.preventDefault();
    closeDialog('success');
    form.reset();
    alert('Спасибо! Форма отправлена ✅');
  });

  console.log('[ready] handlers attached');
});