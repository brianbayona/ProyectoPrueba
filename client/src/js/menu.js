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

let activeCategory = 'all';

export function renderMenu(category = activeCategory) {
  activeCategory = category;
  const menu = getMenu();
  const items = category === 'all' ? menu : menu.filter((m) => m.category === category);

  if (items.length === 0) {
    grid.innerHTML = COMING_SOON_HTML;
    return;
  }

  grid.innerHTML = items.map((item) => {
    const inCart = getCart().find((c) => c.id === item.id);
    return `
      <div class="menu-card">
        <div class="menu-card-img">
          <img src="${item.img}" alt="${item.name}" loading="lazy" />
          <span class="menu-card-cat">${categoryIcon(item.category)} ${item.category}</span>
        </div>
        <div class="menu-card-body">
          <h3>${item.name}</h3>
          <p class="desc">${item.desc}</p>
          <div class="menu-card-footer">
            <span class="price">${formatPrice(item.price)}</span>
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

function categoryIcon(category) {
  if (category === 'hamburguesas') return '&#127828;';
  if (category === 'perros') return '&#127798;';
  if (category === 'acompanamientos') return '&#127839;';
  if (category === 'licores') return '&#127870;';
  return '&#127829;';
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