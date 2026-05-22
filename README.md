# BurguerHouse — Landing Page

Página web de presentación para un emprendimiento de comidas rápidas.  
Desarrollada con HTML, CSS y JavaScript vanilla. Sin frameworks ni librerías externas.

---

## Stack

| Tecnología | Uso |
|---|---|
| HTML5 | Semántica y estructura |
| CSS3 | Diseño visual y responsive |
| JavaScript (ES6) | Lógica del menú, tabs e interacción |
| Google Fonts | Tipografía **Inter** |

---

## Archivos

```
proyecto/
├── index.html      # Página principal
├── style.css       # Hoja de estilos externa
└── README.md       # Documentación
```

---

## Estructura del HTML

### Header (`<header class="header">`)
- Logo con marca **Burguer<span>House</span>** a la izquierda.
- Navegación con 3 enlaces internos: `Menú`, `Nosotros`, `Contacto`.
- Botón hamburguesa (`#menuToggle`) visible solo en mobile.
- Sticky en la parte superior con sombra.

### Hero (`<section class="hero">`)
- Imagen de fondo con degradado oscuro superpuesto.
- Título principal: *"El sabor que enamora"* con acento amarillo.
- Subtítulo descriptivo.
- Botón CTA que redirige a `#menu`.

### Menú (`<section id="menu">`)
- Título + subtítulo.
- **Filtros por categoría** (tabs):
  - `Todo` (activo por defecto)
  - `Hamburguesas`
  - `Perros`
  - `Más`
- **Grid de productos** (`#menuGrid`) renderizado dinámicamente con JS.
- Cada card contiene:
  - Imagen (lazy loading)
  - Nombre del producto
  - Descripción breve
  - Precio en rojo
  - Botón *"Agregar"* con feedback visual

### Nosotros (`<section id="about">`)
- Grid de 2 columnas:
  - Izquierda: imagen decorativa de cocina.
  - Derecha: texto institucional (historia y valores).
  - Botón *"Ordená ahora"*.

### Contacto (`<section id="contact">`)
- Fondo oscuro, texto centrado.
- 4 canales de contacto:
  - Teléfono
  - WhatsApp
  - Email
  - Ubicación
- Botón *"Pedir por WhatsApp"* con enlace directo a `wa.me`.

### Footer (`<footer class="footer">`)
- Copyright con año y marca.

---

## Datos del menú (JavaScript)

10 productos organizados en 3 categorías dentro del array `menu`:

| # | Nombre | Categoría | Precio |
|---|---|---|---|
| 1 | Clásica | hamburguesas | $15.900 |
| 2 | Doble Queso | hamburguesas | $21.500 |
| 3 | Criolla | hamburguesas | $19.900 |
| 4 | Perro Sencillo | perros | $9.900 |
| 5 | Perro Especial | perros | $13.500 |
| 6 | Perro Ranchero | perros | $15.900 |
| 7 | Salchipapas | mas | $11.900 |
| 8 | Patacón Burger | mas | $16.500 |
| 9 | Nuggets + Papas | mas | $12.900 |
| 10 | Gaseosa 400ml | mas | $4.500 |

Todas las imágenes son de placeholder desde **Unsplash**.

---

## Funcionalidades JS

| Función / Evento | Descripción |
|---|---|
| `renderMenu(category)` | Toma una categoría, filtra el array `menu` y renderiza las cards en el grid. |
| Click en tabs | Remueve clase `active` de todos los tabs, agrega `active` al clickeado, ejecuta `renderMenu` con su `data-category`. |
| Click en ".btn-add" | Busca el producto por `data-id`, cambia el texto del botón a *"✓ Listo"* con fondo verde por 1.2 segundos y luego lo restaura. |
| Click en "#menuToggle" | Alterna la clase `open` en la navigación para mostrar/ocultar el menú en mobile. |

---

## Estilos CSS destacados

- **Reset global** con `box-sizing: border-box`.
- **Paleta de colores**:
  - `#f5c518` — amarillo (acento, botones, hover)
  - `#1a1a1a` — oscuro (header, footer, contacto)
  - `#c9462b` — rojo (precios)
  - `#faf7f2` — crema (fondo general)
- **Layouts**:
  - Header: `flex` con `space-between`.
  - Hero: `flex` centrado + `min-height: 70vh`.
  - Menú grid: `grid` con `auto-fill, minmax(280px, 1fr)`.
  - About: `grid 2 columnas` (se colapsa a 1 en mobile).
  - Contacto: `flex` centrado con wrap.
- **Cards** con `border-radius: 16px`, sombra suave y hover con elevación (`translateY(-6px)`).
- **Responsive**: media query a `768px`:
  - La navegación se oculta y se activa el menú hamburguesa.
  - Hero reduce tamaño de título.
  - About y contacto pasan a 1 columna.

---

## Cómo visualizar

1. Clonar o descargar el repositorio.
2. Abrir `index.html` en cualquier navegador moderno.
3. No requiere servidor ni build — es HTML plano.

---

## Contacto (ejemplo)

> **Teléfono:** +57 300 123 4567  
> **WhatsApp:** +57 300 123 4567  
> **Email:** pedidos@burguerhouse.co  
> **Ubicación:** Cra 15 # 48-32, Bogotá

---

## Próximos pasos sugeridos

- [ ] Carrito de compras funcional con localStorage
- [ ] Formulario de pedido con validación
- [ ] Integración con WhatsApp API real
- [ ] Galería de productos reales (fotos propias)
- [ ] Mapa embebido de Google Maps
- [ ] SEO y etiquetas Open Graph
