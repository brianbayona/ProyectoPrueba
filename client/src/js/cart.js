import { getMenu } from './data.js';

const cart = [];
const listeners = new Set();

export function getCart() {
  return cart;
}

export function getCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

export function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

export function addToCart(id) {
  const item = getMenu().find((m) => m.id === id);
  if (!item) return;

  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  notify({ action: 'add', item });
}

export function changeQty(id, delta) {
  const item = cart.find((c) => c.id === id);
  if (!item) return;

  item.qty += delta;
  const removed = item.qty <= 0;
  if (removed) {
    cart.splice(cart.indexOf(item), 1);
  }

  notify(removed ? { action: 'remove', item } : { action: 'update', item });
}

export function removeItem(id) {
  const idx = cart.findIndex((c) => c.id === id);
  if (idx === -1) {
    notify(null);
    return;
  }
  const [item] = cart.splice(idx, 1);
  notify({ action: 'remove', item });
}

export function clearCart() {
  if (cart.length === 0) return;
  cart.splice(0, cart.length);
  notify({ action: 'clear' });
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify(payload) {
  listeners.forEach((listener) => listener(payload));
}