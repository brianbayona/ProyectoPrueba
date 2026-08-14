import { getMenu } from './data.js';
import { formatPrice } from './utils.js';
import { getCart, addToCart, changeQty, setLocked } from './cart.js';

const grid = document.getElementById('menuGrid');
const tabsContainer = document.getElementById('tabsContainer');

const COMING_SOON_HTML = `
  <div class="coming-soon">
    <img src="/products/489191005_1212349920890534_4855188808747625516_n.jpg" alt="Licorería Donde Rey" />
    <div class="coming-soon-content">
      <span class="coming-soon-tag">&#127870; Licorería</span>
      <h3>Nuestra carta de licores llega pronto</h3>
      <p>Estamos preparando la selección para que pidas todo con domicilio, directo por WhatsApp.</p>
    </div>
  </div>
`;

export const CATEGORY_META = {
  perros: { icon: '&#127789;', label: 'Perros' },
  hamburguesas: { icon: '&#127828;', label: 'Hamburguesas' },
  'para-picar': { icon: '&#127839;', label: 'Para Picar' },
  'carne-aves': { icon: '&#129385;', label: 'Carne y Aves' },
  licores: { icon: '&#127870;', label: 'Licorería' }
};

let activeCategory = 'all';

export function renderMenu(category = activeCategory, animate = false) {
  activeCategory = category;
  const menu = getMenu();
  const items = category === 'all' ? menu : menu.filter((m) => m.category === category);

  if (items.length === 0) {
    grid.innerHTML = COMING_SOON_HTML;
    return;
  }

  grid.innerHTML = items.map((item, i) => {
    const inCart = getCart().find((c) => c.id === item.id);
    const meta = CATEGORY_META[item.category] || { icon: '&#127829;', label: item.category };
    const photo = item.img
      ? `<img src="${item.img}" alt="${item.name}" loading="lazy" />`
      : `<div class="ph-badge">${meta.icon}</div>`;
    const priceLabel = item.priceFrom ? `Desde ${formatPrice(item.price)}` : formatPrice(item.price);
    const animStyle = animate
      ? ` style="animation-delay:${Math.min(i * 45, 400)}ms"`
      : ' style="animation:none"';
    const action = inCart
      ? inCart.locked
        ? `<button class="stepper-locked" data-id="${item.id}" aria-label="Desbloquear cantidad de ${item.name}">
             &#10003; ${inCart.qty} en tu pedido
           </button>`
        : `
        <div class="stepper" aria-label="Cantidad de ${item.name}">
          <button class="stepper-btn minus" data-id="${item.id}" aria-label="Quitar uno">-</button>
          <span class="stepper-qty">${inCart.qty}</span>
          <button class="stepper-btn plus" data-id="${item.id}" aria-label="Agregar uno">+</button>
          <button class="stepper-done" data-id="${item.id}" aria-label="Confirmar cantidad">Listo</button>
        </div>`
      : `<button class="btn-add" data-id="${item.id}">Agregar</button>`;
    return `
      <div class="menu-card"${animStyle}>
        <div class="menu-card-img ${item.img ? '' : 'is-placeholder'}">
          ${photo}
          <span class="menu-card-cat">${meta.icon} ${meta.label}</span>
        </div>
        <div class="menu-card-body">
          <h3>${item.name}</h3>
          <p class="desc">${item.desc}</p>
          <div class="menu-card-footer">
            <span class="price">${priceLabel}</span>
            ${action}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

export function getActiveCategory() {
  return activeCategory;
}

function onTabsClick(e) {
  const tab = e.target.closest('.tab');
  if (!tab) return;

  tabsContainer.querySelectorAll('.tab').forEach((t) => t.classList.remove('active'));
  tab.classList.add('active');
  renderMenu(tab.dataset.category, true);
}

function onGridClick(e) {
  const addBtn = e.target.closest('.btn-add');
  if (addBtn) {
    addToCart(Number(addBtn.dataset.id));
    return;
  }
  const plus = e.target.closest('.stepper-btn.plus');
  if (plus) {
    addToCart(Number(plus.dataset.id));
    return;
  }
  const minus = e.target.closest('.stepper-btn.minus');
  if (minus) {
    changeQty(Number(minus.dataset.id), -1);
    return;
  }
  const done = e.target.closest('.stepper-done');
  if (done) {
    setLocked(Number(done.dataset.id), true);
    return;
  }
  const locked = e.target.closest('.stepper-locked');
  if (locked) {
    setLocked(Number(locked.dataset.id), false);
  }
}

export function initMenu() {
  tabsContainer.addEventListener('click', onTabsClick);
  grid.addEventListener('click', onGridClick);
  renderMenu('all', true);
}