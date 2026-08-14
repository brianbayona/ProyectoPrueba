import './style.css';
import { loadMenu } from './js/data.js';
import { subscribe } from './js/cart.js';
import { initMenu, renderMenu, getActiveCategory } from './js/menu.js';
import { initCartUI, updateCartUI, openCart } from './js/cart-ui.js';
import { initNavigation } from './js/navigation.js';
import { initAnimations } from './js/animations.js';
import { showToast } from './js/toast.js';

const SKELETON_CARD = `
  <div class="menu-card skeleton-card">
    <div class="skeleton skeleton-img"></div>
    <div class="menu-card-body">
      <div class="skeleton skeleton-line w-60"></div>
      <div class="skeleton skeleton-line w-90"></div>
      <div class="skeleton skeleton-line w-75"></div>
      <div class="menu-card-footer">
        <div class="skeleton skeleton-line w-40"></div>
        <div class="skeleton skeleton-btn"></div>
      </div>
    </div>
  </div>
`;

const SKELETON_GRID = SKELETON_CARD.repeat(6);

const ERROR_HTML = `
  <div class="error-message">
    <span class="error-icon">&#9888;&#65039;</span>
    <strong>No se pudo cargar el menú</strong>
    <span class="error-sub">Asegurate de que el servidor esté corriendo e intentá de nuevo.</span>
    <button class="btn btn-small" onclick="location.reload()">Reintentar</button>
  </div>
`;

subscribe((payload) => {
  updateCartUI();
  renderMenu();
  if (!payload) return;
  if (payload.action === 'add') {
    const toast = showToast(payload.item.name + ' agregado al pedido', 'success');
    toast.addEventListener('click', openCart);
  } else if (payload.action === 'remove') {
    showToast(payload.item.name + ' eliminado del pedido', 'error');
  } else if (payload.action === 'clear') {
    showToast('Tu carrito fue vaciado', 'info');
  }
});

async function init() {
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = SKELETON_GRID;

  try {
    await loadMenu();
    initMenu();
    await initCartUI();
    initNavigation();
    initAnimations();
  } catch (err) {
    console.error('No se pudo inicializar la aplicación:', err);
    grid.innerHTML = ERROR_HTML;
  }
}

init();