let container;

const ICONS = {
  success: '&#10003;',
  error: '&#10005;',
  info: '&#8505;&#65039;'
};

function getContainer() {
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  return container;
}

function dismiss(toast) {
  if (!toast.parentNode) return;
  toast.classList.remove('show');
  toast.classList.add('hide');
  toast.addEventListener('transitionend', () => toast.remove(), { once: true });
}

export function showToast(message, type = 'success', duration = 2600) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <span class="toast-icon">${ICONS[type] || ICONS.info}</span>
    <span class="toast-msg">${message}</span>
    <span class="toast-bar"></span>
  `;
  toast.style.setProperty('--toast-duration', `${duration}ms`);

  getContainer().appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  const timer = setTimeout(() => dismiss(toast), duration);
  toast.addEventListener('click', () => {
    clearTimeout(timer);
    dismiss(toast);
  });

  return toast;
}