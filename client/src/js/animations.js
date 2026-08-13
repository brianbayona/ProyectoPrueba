export function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.menu-card, .about-grid, .contact-card, .section-header').forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
}