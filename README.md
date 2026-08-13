# BurguerHouse — Landing Page

Página web de presentación para un emprendimiento de comidas rápidas.  
Desarrollada con HTML, CSS y JavaScript vanilla. Sin frameworks ni librerías externas.

---

## Stack

| Tecnología | Uso |
|---|---|
| HTML5 | Semántica y estructura |
| CSS3 | Diseño visual y responsive |
| JavaScript (ES6 + ES Modules) | Lógica del menú, tabs, carrito e interacción |
| Vite | Bundler y dev server del cliente |
| Express | API REST y servidor de producción |
| Google Fonts | Tipografía **Inter** |

---

## Archivos

```
ProyectoPrueba/
├── package.json          # Scripts y dependencias (raíz)
├── vite.config.js        # Configuración de Vite (proxy /api → server)
├── client/               # Frontend (Vite)
│   ├── index.html        # Página principal
│   └── src/
│       ├── style.css     # Hoja de estilos
│       ├── main.js       # Punto de entrada, inicializa todo
│       └── js/
│           ├── data.js          # Fetch del menú desde /api/menu
│           ├── utils.js         # Utilidades (formatPrice)
│           ├── cart.js          # Estado del carrito (add, qty, total, subscribe)
│           ├── menu.js          # Render del menú + filtros por tabs
│           ├── cart-ui.js       # UI del carrito (modal, checkout, WhatsApp)
│           ├── navigation.js    # Menú hamburguesa mobile
│           └── animations.js    # Animaciones de scroll (IntersectionObserver)
├── server/               # Backend (Express)
│   ├── index.js          # API + sirve el build de producción
│   └── data/
│       └── menu.js       # Datos del menú (fuente de verdad)
└── README.md             # Documentación
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

## Datos del menú (API del servidor)

8 productos organizados en 3 categorías dentro de `server/data/menu.js`:

| # | Nombre | Categoría | Precio |
|---|---|---|---|
| 1 | Clásica | hamburguesas | $15.900 |
| 2 | Doble Queso | hamburguesas | $21.500 |
| 3 | Criolla | hamburguesas | $19.900 |
| 4 | Perro Sencillo | perros | $9.900 |
| 5 | Perro Especial | perros | $13.500 |
| 6 | Perro Ranchero | perros | $15.900 |
| 7 | Salchipapas | acompanamientos | $11.900 |
| 8 | Patacón Burger | acompanamientos | $16.500 |

- Existe una 4.ª categoría **Licores** (próximamente) que se muestra con banner de próxima apertura hasta tener el catálogo real.
- Las imágenes locales viven en `client/public/products/` y se sirven como `/products/<archivo>.jpg` (funcionan en dev y en producción; los productos sin foto local aún usan stock/Unsplash hasta recibir las fotos definitivas).
- La licorería y el servicio de domicilios se comunican mediante el strip de domicilios y el banner de licores.

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
- **Paleta extraída del logotipo** (variables en `:root`, analizada por código desde `client/src/assets/logo.jpg`):
  - Fucsia `#E9248D` — identidad principal: botones, precios, cinta, acentos
  - Rosa profundo `#D72B8F` / `#B81E6F` — gradientes y hover
  - Gris carbón `#1E1E1E` / `#222222` / `#3A3A3A` — estructura: header, hero, contacto, footer
  - Dorado `#FECA28` — acentos: teléfono, chips de categoría, outlines
  - Crema `#F7F3E9` / `#F3EEE0` — fondos claros (reemplaza el blanco genérico)
  - Blanco del logo `#FDFDFD` — tarjetas y superficies
  - Taupe cálido `#6E645A` — texto secundario
- **Elementos destacados**: logotipo de la empresa (`client/src/assets/logo.jpg`, en el header y el hero), cinta rosa del hero, número de teléfono en header/footer y logos de pago Mastercard + Visa (SVG inline).
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

## API del servidor

| Endpoint | Descripción |
|---|---|
| `GET /api/menu` | Devuelve los productos del menú (JSON) |
| `GET /api/config` | Configuración del negocio (WhatsApp, teléfono, email) |

En desarrollo, Vite (puerto `5173`) hace proxy de `/api` hacia Express (puerto `3000`).
En producción, Express sirve el build estático (`client/` compilado a `dist/`) y la API.

## Cómo visualizar

### Desarrollo (client + server a la vez)

1. `npm install`
2. `npm run dev` — levanta Express (`:3000`) y Vite (`:5173`) con hot reload
3. Abrir `http://localhost:5173`

### Producción

1. `npm install`
2. `npm run build` — compila el cliente a `dist/`
3. `npm start` — Express sirve la app y la API en `http://localhost:3000`

### Acceso desde cualquier dispositivo (celular, tablet, portátil)

Ambos servidores escuchan en `0.0.0.0`, por lo que son accesibles desde tu red local:

1. Averiguá tu IP local: `ipconfig` (Windows) o `ifconfig` (macOS/Linux).
   Ejemplo: `192.168.1.39`
2. Desde cualquier dispositivo conectado a la **misma red Wi-Fi** abrí:
   - Desarrollo: `http://<TU-IP>:5173`
   - Producción: `http://<TU-IP>:3000`
3. El proxy de Vite redirige `/api` a Express automáticamente, así que el menú y el checkout funcionan igual desde la IP.
4. Si no carga, permití Node en el firewall de Windows (aparece un aviso al primer arranque) o agregá una regla de entrada para los puertos `5173`/`3000`.

El diseño es 100% responsive: se adapta a celular, tablet, portátil y pantallas grandes, con tipografía fluida (`clamp()`) y breakpoints en `1024px`, `900px`, `768px` y `480px`.

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
