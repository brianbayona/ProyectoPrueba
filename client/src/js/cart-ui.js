import { formatPrice } from './utils.js';
import { getCart, getCount, getTotal, changeQty, removeItem, clearCart } from './cart.js';
import { showToast } from './toast.js';
import { CATEGORY_META } from './menu.js';

const overlay = document.getElementById('cartOverlay');
const countEl = document.getElementById('cartCount');
const bodyEl = document.getElementById('cartBody');
const footerEl = document.getElementById('cartFooter');
const totalEl = document.getElementById('cartTotal');
const clearBtn = document.getElementById('cartClear');

const EMPTY_CART_HTML = `
  <div class="cart-empty">
    <span class="cart-empty-icon">&#128722;</span>
    <p>Tu carrito está vacío</p>
    <p class="cart-empty-sub">Agregá productos del menú para empezar</p>
  </div>
`;

const DEFAULT_WHATSAPP = '573013872320';
let whatsapp = DEFAULT_WHATSAPP;

async function loadConfig() {
  try {
    const res = await fetch('/api/config', { cache: 'no-store' });
    if (!res.ok) return;
    const config = await res.json();
    if (config.whatsapp) whatsapp = config.whatsapp;
  } catch (err) {
    console.warn('No se pudo cargar la configuración, usando valor por defecto:', err);
  }
}

export function updateCartUI() {
  countEl.textContent = getCount();
  countEl.classList.remove('bump');
  void countEl.offsetWidth;
  countEl.classList.add('bump');

  const cart = getCart();

  if (cart.length === 0) {
    bodyEl.innerHTML = EMPTY_CART_HTML;
    footerEl.style.display = 'none';
    clearBtn.style.display = 'none';
    return;
  }

  footerEl.style.display = 'block';
  clearBtn.style.display = 'inline-block';
  totalEl.textContent = formatPrice(getTotal());

  bodyEl.innerHTML = cart.map((item) => {
    const subtotal = item.price * item.qty;
    const meta = CATEGORY_META[item.category] || { icon: '&#127829;', label: item.category };
    const thumb = item.img
      ? `<img src="${item.img}" alt="${item.name}" />`
      : `<div class="cart-item-thumb ph">${meta.icon}</div>`;
    const priceLabel = item.priceFrom ? `Desde ${formatPrice(item.price)}` : formatPrice(item.price);
    return `
      <div class="cart-item">
        ${thumb}
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <span class="cart-item-price">${priceLabel}</span>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn minus" data-id="${item.id}">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn plus" data-id="${item.id}">+</button>
        </div>
        <span class="cart-item-subtotal">${item.priceFrom ? 'Desde ' : ''}${formatPrice(subtotal)}</span>
        <button class="cart-item-remove" data-id="${item.id}">&times;</button>
      </div>
    `;
  }).join('');

  bodyEl.querySelectorAll('.qty-btn.minus').forEach((btn) => {
    btn.onclick = () => changeQty(Number(btn.dataset.id), -1);
  });
  bodyEl.querySelectorAll('.qty-btn.plus').forEach((btn) => {
    btn.onclick = () => changeQty(Number(btn.dataset.id), 1);
  });
  bodyEl.querySelectorAll('.cart-item-remove').forEach((btn) => {
    btn.onclick = () => removeItem(Number(btn.dataset.id));
  });
}

export function openCart() {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function onOverlayClick(e) {
  if (e.target === overlay) closeCart();
}

async function onCheckout() {
  await loadConfig();
  const cart = getCart();
  if (cart.length === 0) return;

  const lines = cart.map((i) => `- ${i.name} x${i.qty} = ${formatPrice(i.price * i.qty)}`).join('%0A');
  const finalMsg = `¡Hola! Quiero hacer un pedido:%0A%0A${lines}%0A%0ATotal: ${formatPrice(getTotal())}%0A%0A¿Está disponible para entregar?`;

  window.open(`https://wa.me/${whatsapp}?text=${finalMsg}`, '_blank');
  showToast('Abrimos WhatsApp con tu pedido. ¡Gracias!', 'success');
}

export async function initCartUI() {
  await loadConfig();
  document.getElementById('cartBtn').onclick = openCart;
  document.getElementById('cartClose').onclick = closeCart;
  document.getElementById('cartClear').onclick = () => {
    clearCart();
    showToast('Tu carrito fue vaciado', 'info');
  };
  document.getElementById('cartContinue').onclick = closeCart;
  document.getElementById('cartGoMenu').onclick = () => {
    closeCart();
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
  };
  overlay.addEventListener('click', onOverlayClick);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });
  document.getElementById('checkoutBtn').onclick = onCheckout;
  updateCartUI();
}