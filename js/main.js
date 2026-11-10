/**
 * COS 106 - Introduction to Web Technologies
 * Script: main.js
 * Author: Favour Adedokun (Matric: 301898902)
 * Purpose: Handles global site features (responsive mobile navigation,
 *          dynamic footer year, and smooth interactive UI behaviors).
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Hamburger Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a link is clicked on mobile
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // 2. Set Dynamic Year in Footer
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 3. Audio Player Feedback enhancement
  const welcomeAudio = document.getElementById('welcomeAudio');
  if (welcomeAudio) {
    welcomeAudio.addEventListener('play', () => {
      console.log('Favour\'s welcome audio note is playing ✨');
    });
  }
});
