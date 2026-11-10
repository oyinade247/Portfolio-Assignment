document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('emailAddress');
  const phoneInput = document.getElementById('phoneNumber');
  const messageInput = document.getElementById('messageText');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const messageError = document.getElementById('messageError');

  const alertSuccess = document.getElementById('alertSuccess');
  const alertError = document.getElementById('alertError');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneDigitsRegex = /^\d+$/;

  fullNameInput.addEventListener('input', () => clearFieldState(fullNameInput, nameError));
  emailInput.addEventListener('input', () => clearFieldState(emailInput, emailError));
  phoneInput.addEventListener('input', () => clearFieldState(phoneInput, phoneError));
  messageInput.addEventListener('input', () => clearFieldState(messageInput, messageError));

  function clearFieldState(inputEl, errorEl) {
    inputEl.classList.remove('is-invalid', 'is-valid');
    if (errorEl) errorEl.textContent = '';
    if (alertError) alertError.style.display = 'none';
  }

  function setFieldError(inputEl, errorEl, message) {
    inputEl.classList.add('is-invalid');
    inputEl.classList.remove('is-valid');
    if (errorEl) errorEl.textContent = message;
  }

  function setFieldValid(inputEl, errorEl) {
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');
    if (errorEl) errorEl.textContent = '';
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    alertSuccess.style.display = 'none';
    alertError.style.display = 'none';

    let isValid = true;

    const fullNameValue = fullNameInput.value.trim();
    if (fullNameValue === '') {
      setFieldError(fullNameInput, nameError, 'Full name is required.');
      isValid = false;
    } else if (fullNameValue.length < 2) {
      setFieldError(fullNameInput, nameError, 'Full name must contain at least 2 characters.');
      isValid = false;
    } else {
      setFieldValid(fullNameInput, nameError);
    }

    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
      setFieldError(emailInput, emailError, 'Email address is required.');
      isValid = false;
    } else if (!emailRegex.test(emailValue)) {
      setFieldError(emailInput, emailError, 'Please enter a valid email address (e.g. name@example.com).');
      isValid = false;
    } else {
      setFieldValid(emailInput, emailError);
    }

    const phoneValue = phoneInput.value.trim();
    if (phoneValue === '') {
      setFieldError(phoneInput, phoneError, 'Phone number is required.');
      isValid = false;
    } else if (!phoneDigitsRegex.test(phoneValue)) {
      setFieldError(phoneInput, phoneError, 'Phone number must contain only numeric digits (0-9).');
      isValid = false;
    } else if (phoneValue.length < 8 || phoneValue.length > 15) {
      setFieldError(phoneInput, phoneError, 'Phone number must be between 8 and 15 digits.');
      isValid = false;
    } else {
      setFieldValid(phoneInput, phoneError);
    }

    const messageValue = messageInput.value.trim();
    if (messageValue === '') {
      setFieldError(messageInput, messageError, 'Message content is required.');
      isValid = false;
    } else if (messageValue.length < 10) {
      setFieldError(messageInput, messageError, 'Message must be at least 10 characters long.');
      isValid = false;
    } else {
      setFieldValid(messageInput, messageError);
    }

    if (!isValid) {
      alertError.textContent = 'Please review and correct the highlighted fields above.';
      alertError.style.display = 'block';
      return;
    }

    alertSuccess.innerHTML = `
      <strong>Message Sent Successfully.</strong> Thank you, ${escapeHtml(fullNameValue)}. 
      Your submission has been received and will be replied to at <em>${escapeHtml(emailValue)}</em>.
    `;
    alertSuccess.style.display = 'block';

    contactForm.reset();
    [fullNameInput, emailInput, phoneInput, messageInput].forEach((input) => {
      input.classList.remove('is-valid');
    });

    alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  function escapeHtml(str) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }
});
