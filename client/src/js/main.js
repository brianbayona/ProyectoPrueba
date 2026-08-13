import { subscribe } from './cart.js';
import { initMenu, renderMenu, getActiveCategory } from './menu.js';
import { initCartUI, updateCartUI } from './cart-ui.js';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';

subscribe(() => {
  updateCartUI();
  renderMenu(getActiveCategory());
});

initMenu();
initCartUI();
initNavigation();
initAnimations();