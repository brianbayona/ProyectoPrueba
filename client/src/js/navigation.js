import { showToast } from './toast.js';

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  ta.remove();
  return Promise.resolve();
}

export function initPhoneLinks() {
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isDesktop) return;

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.title = 'Copiar número';
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const number = link.textContent.trim();
      copyToClipboard(number).then(() => {
        showToast(`Número copiado: ${number}`, 'info');
      });
    });
  });
}

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