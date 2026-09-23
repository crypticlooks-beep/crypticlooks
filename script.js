/**
 * Samarth Gupta - Portfolio Website Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Highlight Navigation Links on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-list a[href*='${sectionId}']`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  });

  // 4. Contact Form Handler (Client-side interactive experience)
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name')?.value || 'there';
      const topic = document.getElementById('topic')?.value || 'your inquiry';

      // Friendly success response
      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = `
        <strong>Thank you, ${name}!</strong> Your note regarding <em>${topic}</em> has been noted. 
        You can also email Samarth directly at <a href="mailto:crypticlooks@gmail.com" style="color:#f59e0b; text-decoration:underline;">crypticlooks@gmail.com</a> or connect on LinkedIn.
      `;

      contactForm.reset();

      // Clear notification after 10 seconds
      setTimeout(() => {
        formFeedback.innerHTML = '';
        formFeedback.className = 'form-feedback';
      }, 10000);
    });
  }

  // 5. Automatic Profile Photo Detection (Fallback to monogram)
  // If the user drops a file named "photo.jpg", "photo.png", or "profile.jpg" into the folder,
  // the page will automatically show it instead of the initials badge!
  const photoCandidates = ['photo.jpg', 'profile.jpg', 'photo.png', 'profile.png'];
  const monogramEl = document.querySelector('.profile-monogram');

  if (monogramEl) {
    function tryLoadImage(index) {
      if (index >= photoCandidates.length) return;
      const candidate = photoCandidates[index];
      const img = new Image();
      img.onload = () => {
        monogramEl.innerHTML = '';
        monogramEl.style.backgroundImage = `url('${candidate}')`;
        monogramEl.style.backgroundSize = 'cover';
        monogramEl.style.backgroundPosition = 'center';
        monogramEl.style.border = '2px solid #f59e0b';
      };
      img.onerror = () => {
        tryLoadImage(index + 1);
      };
      img.src = candidate;
    }
    tryLoadImage(0);
  }
});
