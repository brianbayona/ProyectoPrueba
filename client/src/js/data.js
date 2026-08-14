let menu = [];

export async function loadMenu() {
  const res = await fetch('/data/menu.json');
  if (!res.ok) throw new Error(`Error al cargar el menú: ${res.status}`);
  menu = await res.json();
  return menu;
}

export function getMenu() {
  return menu;
}