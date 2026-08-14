import { getMenu } from './data.js';
import { formatPrice } from './utils.js';
import { getCart, addToCart } from './cart.js';

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

export function renderMenu(category = activeCategory) {
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
    return `
      <div class="menu-card" style="animation-delay:${Math.min(i * 45, 400)}ms">
        <div class="menu-card-img ${item.img ? '' : 'is-placeholder'}">
          ${photo}
          <span class="menu-card-cat">${meta.icon} ${meta.label}</span>
        </div>
        <div class="menu-card-body">
          <h3>${item.name}</h3>
          <p class="desc">${item.desc}</p>
          <div class="menu-card-footer">
            <span class="price">${priceLabel}</span>
            <button class="btn-add ${inCart ? 'in-cart' : ''}" data-id="${item.id}">
              ${inCart ? '&#10003; Agregado' : 'Agregar'}
            </button>
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
  renderMenu(tab.dataset.category);
}

function onGridClick(e) {
  const btn = e.target.closest('.btn-add');
  if (!btn) return;
  addToCart(Number(btn.dataset.id));
}

export function initMenu() {
  tabsContainer.addEventListener('click', onTabsClick);
  grid.addEventListener('click', onGridClick);
  renderMenu('all');
}