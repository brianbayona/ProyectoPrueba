export function initNavigation() {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('menuToggle');

  toggle.onclick = () => nav.classList.toggle('open');

  document.querySelectorAll('.nav a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      const category = a.dataset.navCategory;
      if (category) {
        const tab = document.querySelector(`.tab[data-category="${category}"]`);
        if (tab) tab.click();
      }
    });
  });
}