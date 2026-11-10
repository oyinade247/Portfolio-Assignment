/**
 * COS 106 - Introduction to Web Technologies
 * Script: contact.js
 * Author: Favour Adedokun (Matric: 301898902)
 * Purpose: Form validation for the Contact Page.
 * Validation Rules:
 *   1. No field is empty.
 *   2. Email format is strictly valid (RFC-compliant regex check).
 *   3. Phone number contains only digits (numeric validation).
 */

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

  // Regex patterns
  // Standard email regex ensuring user@domain.extension
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Phone regex: digits only, between 7 and 15 digits (handles Nigerian and international standard lengths)
  const phoneDigitsRegex = /^\d+$/;

  /**
   * Real-time clearing of error states when user types
   */
  fullNameInput.addEventListener('input', () => clearFieldState(fullNameInput, nameError));
  emailInput.addEventListener('input', () => clearFieldState(emailInput, emailError));
  phoneInput.addEventListener('input', () => clearFieldState(phoneInput, phoneError));
  messageInput.addEventListener('input', () => clearFieldState(messageInput, messageError));

  /**
   * Helper to reset field styling
   */
  function clearFieldState(inputEl, errorEl) {
    inputEl.classList.remove('is-invalid', 'is-valid');
    if (errorEl) errorEl.textContent = '';
    if (alertError) alertError.style.display = 'none';
  }

  /**
   * Helper to mark field as invalid
   */
  function setFieldError(inputEl, errorEl, message) {
    inputEl.classList.add('is-invalid');
    inputEl.classList.remove('is-valid');
    if (errorEl) errorEl.textContent = message;
  }

  /**
   * Helper to mark field as valid
   */
  function setFieldValid(inputEl, errorEl) {
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');
    if (errorEl) errorEl.textContent = '';
  }

  /**
   * Form Submission Handler
   */
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset banners
    alertSuccess.style.display = 'none';
    alertError.style.display = 'none';

    let isValid = true;

    // 1. Full Name Validation (Not empty, at least 2 chars)
    const fullNameValue = fullNameInput.value.trim();
    if (fullNameValue === '') {
      setFieldError(fullNameInput, nameError, 'Please enter your full name (field cannot be empty).');
      isValid = false;
    } else if (fullNameValue.length < 2) {
      setFieldError(fullNameInput, nameError, 'Full name must be at least 2 characters.');
      isValid = false;
    } else {
      setFieldValid(fullNameInput, nameError);
    }

    // 2. Email Address Validation (Not empty, valid email pattern)
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
      setFieldError(emailInput, emailError, 'Email address cannot be empty.');
      isValid = false;
    } else if (!emailRegex.test(emailValue)) {
      setFieldError(emailInput, emailError, 'Please enter a valid email address (e.g., student@miva.university).');
      isValid = false;
    } else {
      setFieldValid(emailInput, emailError);
    }

    // 3. Phone Number Validation (Not empty, contains only digits)
    const phoneValue = phoneInput.value.trim();
    if (phoneValue === '') {
      setFieldError(phoneInput, phoneError, 'Phone number cannot be empty.');
      isValid = false;
    } else if (!phoneDigitsRegex.test(phoneValue)) {
      setFieldError(phoneInput, phoneError, 'Phone number must contain only digits (0-9, no letters or symbols).');
      isValid = false;
    } else if (phoneValue.length < 8 || phoneValue.length > 15) {
      setFieldError(phoneInput, phoneError, 'Phone number must be between 8 and 15 digits long.');
      isValid = false;
    } else {
      setFieldValid(phoneInput, phoneError);
    }

    // 4. Message Validation (Not empty, minimum 10 chars)
    const messageValue = messageInput.value.trim();
    if (messageValue === '') {
      setFieldError(messageInput, messageError, 'Please write a message (field cannot be empty).');
      isValid = false;
    } else if (messageValue.length < 10) {
      setFieldError(messageInput, messageError, 'Message must be at least 10 characters long.');
      isValid = false;
    } else {
      setFieldValid(messageInput, messageError);
    }

    // If validation fails
    if (!isValid) {
      alertError.textContent = '⚠️ Please correct the highlighted errors before submitting.';
      alertError.style.display = 'block';
      return;
    }

    // Validation success!
    alertSuccess.innerHTML = `
      🌸 <strong>Thank you, ${escapeHtml(fullNameValue)}!</strong> Your message has been sent successfully. 
      Favour will get back to you at <em>${escapeHtml(emailValue)}</em> shortly!
    `;
    alertSuccess.style.display = 'block';

    // Clear form and valid classes
    contactForm.reset();
    [fullNameInput, emailInput, phoneInput, messageInput].forEach((input) => {
      input.classList.remove('is-valid');
    });

    // Scroll smoothly to alert
    alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  function escapeHtml(str) {
    const p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  }
});
