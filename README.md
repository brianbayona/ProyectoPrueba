# Donde Rey — Comidas Rápidas 🍔🌭🍟

Sitio web de pedidos de **Comidas Rápidas Donde Rey** (Floridablanca, Santander). Los clientes ven el menú real, arman su pedido en el carrito y lo envían por **WhatsApp** en un clic.

Frontend con **Vite (vanilla JS)** + backend **Express** con API de menú y configuración.

---

## Índice

1. [Requisitos](#requisitos)
2. [Puesta en marcha](#puesta-en-marcha)
3. [Acceso desde celular (red local)](#acceso-desde-celular-red-local)
4. [Estructura del proyecto](#estructura-del-proyecto)
5. [Menú real (32 productos)](#menú-real-32-productos)
6. [Cómo editar el menú](#cómo-editar-el-menú)
7. [Cómo cambiar el número de WhatsApp](#cómo-cambiar-el-número-de-whatsapp)
8. [Imágenes de los productos](#imágenes-de-los-productos)
9. [API](#api)
10. [Funcionalidades](#funcionalidades)
11. [Identidad visual](#identidad-visual)
12. [Publicar en internet (Cloudflare Pages)](#publicar-en-internet-cloudflare-pages)
13. [Solución de problemas](#solución-de-problemas)
14. [Pendientes](#pendientes)

---

## Requisitos

- **Node.js** 18 o superior (incluye `npm`)
- Un navegador moderno (Chrome, Edge, Firefox, Safari)

---

## Puesta en marcha

### 1) Instalar dependencias

```bash
npm install
```

### 2) Desarrollo (recomendado para editar)

Levanta el servidor API (puerto `3000`) y Vite con recarga en caliente (puerto `5173`):

```bash
npm run dev
```

Abrir **http://localhost:5173** — el cliente redirige `/api` al servidor automáticamente.

> El servidor usa `node --watch`: al guardar cambios en `server/` se reinicia solo.

### 3) Producción (simular el sitio final)

```bash
npm run build     # compila el cliente a dist/
npm start         # Express sirve la página + la API en :3000
```

Abrir **http://localhost:3000**

### Scripts disponibles

| Script | Qué hace |
|---|---|
| `npm run dev` | Server (`:3000`) + Vite (`:5173`) a la vez |
| `npm run dev:server` | Solo API con auto-reinicio |
| `npm run dev:client` | Solo Vite |
| `npm run build` | Compila el cliente a `dist/` |
| `npm start` | Sirve producción (build + API) |
| `npm run preview` | Vista previa del build con Vite |

---

## Acceso desde celular (red local)

Ambos servidores escuchan en `0.0.0.0`, así que la página se abre desde cualquier dispositivo en la misma red Wi-Fi:

1. Averiguá tu IP local: `ipconfig` (Windows) o `ifconfig` (macOS/Linux). Ejemplo: `192.168.1.39`
2. Desde el celular abrí:
   - Desarrollo: `http://192.168.1.39:5173`
   - Producción: `http://192.168.1.39:3000`
3. Si no carga, permití Node en el firewall de Windows (aviso al primer arranque) o agregá una regla de entrada para los puertos `5173`/`3000`.

---

## Estructura del proyecto

```
ProyectoPrueba/
├── package.json            # Scripts y dependencias
├── vite.config.js          # Config de Vite (proxy /api → :3000)
├── scripts/
│   └── export-data.mjs     # Genera menu.json + config.json (datos estáticos)
├── README.md               # Este manual
├── client/                 # Frontend (Vite)
│   ├── index.html          # Página principal (toda la estructura)
│   ├── public/
│   │   ├── data/           # Datos estáticos: menu.json + config.json (generados)
│   │   ├── _redirects      # Fallback SPA para Cloudflare Pages
│   │   └── products/       # Fotos de productos y logo de WhatsApp
│   └── src/
│       ├── assets/logo.jpg # Logotipo del negocio
│       ├── main.js         # Punto de entrada: carga menú, inicializa todo
│       ├── style.css       # Hoja de estilos (identidad Donde Rey)
│       └── js/
│           ├── data.js         # Fetch del menú desde /data/menu.json
│           ├── utils.js        # Utilidades (formatPrice)
│           ├── cart.js         # Estado del carrito (agregar, cantidades, total)
│           ├── cart-ui.js      # Modal del carrito + checkout por WhatsApp
│           ├── menu.js         # Render de tarjetas + pestañas + placeholders
│           ├── navigation.js   # Menú móvil + enlace de Licorería
│           ├── animations.js   # Animaciones de entrada (IntersectionObserver)
│           └── toast.js        # Notificaciones (toasts) de la marca
├── server/                 # Backend (Express, solo desarrollo local)
│   ├── index.js            # API (/api/menu, /api/config) + sirve dist/
│   └── data/
│       ├── menu.js         # CATÁLOGO REAL (fuente de verdad del menú)
│       └── config.js       # Config del negocio (WhatsApp, teléfono, dirección)
└── dist/                   # Build de producción (generado, no editar)
```

---

## Menú real (32 productos)

El catálogo está transcrito del menú físico de Donde Rey en `server/data/menu.js`, organizado en 4 categorías + Licorería:

### 🌭 Perros (8)
| Producto | Precio |
|---|---|
| Perro Tradicional | $15.000 |
| Perro Especial Rey | $27.000 |
| Perro Súper Rey | $29.000 |
| Perro Extra Rey | $34.000 |
| Perro Americano | $22.000 |
| Perro Americano Especial | $28.000 |
| Choriperro | $23.000 |
| Choriperro Especial | $28.000 |

### 🍔 Hamburguesas (7)
| Producto | Precio |
|---|---|
| Hamburguesa Tradicional | $19.000 |
| Hamburguesa Especial Rey | $27.000 |
| Hamburguesa Súper Rey | $29.000 |
| Hamburguesa Extra Rey | $34.000 |
| Hamburguesa Doble Carne | $25.000 |
| Hamburguesa Sólo Pollo | $23.000 |
| Hamburguesa Ranchera | $32.000 |

### 🍟 Para Picar (9)
| Producto | Precio |
|---|---|
| Choripapa | $20.000 |
| Salchipapa | $20.000 |
| Choripapa Americana | $30.000 |
| Salchipapa Americana | $26.000 |
| Papas Locas | $37.000 |
| Salchichoripapa | $26.000 |
| Salchichoripapa Especial | $32.000 |
| Choripapa Costeño | $29.000 |
| Porción de Papa | $14.000 |

### 🥩 Carne y Aves (8)
| Producto | Precio |
|---|---|
| Chatas | $34.000 |
| Mazorcadas | $36.000 |
| Costillas de Cerdo en BBQ | $32.000 |
| Filete de Pechuga | $26.000 |
| 2 Perniles Fritos | $26.000 |
| Alitas Fritas | $15.000 |
| Alitas BBQ | $15.000 |
| Picadas de Carne | **Desde** $95.000 |

### 🍾 Licorería
Sección "próximamente" (banner de marca). No tiene productos hasta que exista la carta real.

> **Nota de UX:** "Picadas de Carne" muestra **"Desde $95.000"** (no un precio fijo), gracias al flag `priceFrom: true` (ver más abajo).

---

## Cómo editar el menú

Todo el catálogo vive en **`server/data/menu.js`**. Cada producto es un objeto:

```js
{
  id: 16,                              // número único
  name: 'Choripapa',                   // nombre exacto del menú físico
  category: 'para-picar',              // perros | hamburguesas | para-picar | carne-aves
  desc: 'Chorizo, papas a la francesa, salsas y queso salado.',   // descripción real
  price: 20000,                        // precio en pesos (sin puntos ni $)
  priceFrom: false,                    // opcional: true muestra "Desde $X"
  img: '/products/mi-foto.jpg'         // opcional: ruta de la foto (ver imágenes)
}
```

Reglas:

- Los `id` deben ser **únicos**.
- La `category` define en qué pestaña aparece.
- Los **nombres, descripciones y precios deben ser los reales** (no inventar).
- Si el precio es "desde", usá `priceFrom: true`.
- Si no existe foto, **no pongas la propiedad `img`**: la tarjeta muestra el placeholder de marca automáticamente.

---

## Cómo cambiar el número de WhatsApp

El número oficial es **+57 301 387 2320** (`573013872320`). La **única fuente de verdad** es **`server/data/config.js`**:

```js
whatsapp: '573013872320',
```

Al cambiar ese archivo hay que regenerar los datos estáticos (o simplemente correr `npm run build`, que lo hace solo):

```bash
npm run build   # regenera client/public/data/config.json y empaqueta
```

El checkout del carrito **consulta el número en el momento del clic** (sin caché). Los enlaces directos (`wa.me/573013872320`) están en `client/index.html` (hero, strip de domicilios, contacto, botón flotante).

> ⚠️ Si al probar abre un número viejo, recargá con **Ctrl+F5**: la pestaña abierta antes del cambio guarda el código anterior.

---

## Imágenes de los productos

- Las fotos van en **`client/public/products/`** y se sirven como `/products/<archivo>` (funcionan en dev y producción; Vite las copia a `dist/`).
- Para asignar una foto a un producto, poné en `server/data/menu.js`:
  ```js
  img: '/products/489701640_1212349630890563_7028203771118626995_n.jpg'
  ```
- **Sin `img` = placeholder de marca**: fondo carbón con glow rosa, borde dorado punteado y el emoji de la categoría (se ve intencional, no roto).
- Archivos especiales:
  - `whatsapp.png` — logo del botón flotante y la tarjeta de contacto (no borrar).
  - La foto oscura `489191005_...jpg` alimenta el **banner de Licorería** (referenciada en `client/src/js/menu.js`).
- Regla: no asignar una foto a un producto si no corresponde; mejor placeholder.

---

## API

| Endpoint | Respuesta |
|---|---|
| `GET /data/menu.json` | Catálogo completo (32 productos) — lo que usa la página |
| `GET /data/config.json` | Datos del negocio (WhatsApp, teléfono, dirección, horarios) |
| `GET /api/menu` | Igual que menu.json, servido por Express (desarrollo/compat) |
| `GET /api/config` | Igual que config.json, servido por Express (desarrollo/compat) |

**La página lee los archivos estáticos `menu.json` y `config.json`** (generados por `scripts/export-data.mjs` desde `server/data/`). El servidor Express solo se necesita para desarrollo local y para servir `dist/` en producción local — la página funciona como sitio estático puro, que es lo que permite publicarla gratis en Cloudflare Pages.

---

## Funcionalidades

- **Pestañas de categorías**: Todo, Perros, Hamburguesas, Para Picar, Carne y Aves, Licorería. Con feedback visual (activa en rosa, tarjetas entran escalonadas).
- **Tarjetas de producto**: nombre → descripción → precio (rosa, destacado) → botón *Agregar* que cambia a "✓ Agregado" en verde.
- **Carrito (modal)**: cantidades +/−, subtotales por línea, **total bien visible**, vaciar, seguir comprando, eliminar, y botón **"Pedir por WhatsApp"** que abre WhatsApp con el pedido armado y el mensaje de domicilio.
- **Notificaciones (toasts)** de marca: al agregar (clic = abre el carrito), eliminar, vaciar y al enviar el pedido.
- **Contador del carrito** en el header con animación al cambiar.
- **Botón flotante de WhatsApp** con el logo del negocio.
- **Strip de domicilios** bajo el hero y CTA "Pedir a domicilio" en el hero.
- **Navegación móvil** con menú hamburguesa; enlace "Licorería" que abre la pestaña directo.
- **Accesibilidad**: foco visible, `prefers-reduced-motion`, teclas (Esc cierra el carrito), bloqueo de scroll con el modal abierto.
- **Estados**: skeletons al cargar el menú y pantalla de error con "Reintentar" si la API no responde.

---

## Identidad visual

Paleta extraída del logotipo (variables en `:root` de `client/src/style.css`):

- **Fucsia `#E9248D`** — acción principal: botones, precios, acentos
- **Negro/carbón `#1E1E1E`–`#3A3A3A`** — estructura: header, hero, contacto, footer
- **Dorado `#FECA28`** — acentos: teléfonos, chips de categoría, outlines
- **Crema `#F7F3E9`/`#F3EEE0`** — fondos claros y superficies
- Blanco `#FDFDFD` para tarjetas · Taupe `#6E645A` para texto secundario

Tipografías: **Inter** (textos) y **Pacifico** (acentos de marca). Diseño 100% responsive (breakpoints en `1024px`, `900px`, `768px` y `480px`).

---

## Publicar en internet (Cloudflare Pages)

> **Estado: preparado.** El proyecto ya está adaptado para publicarse gratis en Cloudflare Pages, pero **aún no se ha conectado** (la página está en desarrollo). Cuando esté lista, seguí estos pasos.

### Qué significa esto

- La página vive en la nube de Cloudflare con una URL pública (ej: `donderey.pages.dev`), accesible desde **cualquier celular y cualquier red**, **sin que tu PC esté prendida**.
- El plan gratis es **permanente**: sin tarjeta, ancho de banda ilimitado y **sin restricción de uso comercial**.
- Cada vez que hagas **push a GitHub**, el sitio se actualiza solo.

### Pasos para publicar (cuando la página esté lista)

1. Creá una cuenta gratuita en **dash.cloudflare.com**.
2. Entrá a **Workers & Pages → Create → Pages → Connect to Git**.
3. Conectá tu cuenta de GitHub y elegí el repositorio `ProyectoPrueba`.
4. Configuración del build:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Click **Save and Deploy**. En ~2 minutos tenés la URL pública (`https://<nombre>.pages.dev`).
6. (Opcional) Desde el panel: **Custom domains** → agregá un dominio propio si comprás uno.

### Flujo de trabajo después de publicar

1. Editás el catálogo o la configuración en `server/data/`.
2. Corrés `npm run build` (regenera los JSON) o directamente pusheás: el `_redirects` y los JSON viajan en el repo.
3. `git push` → Cloudflare compila solo (`npm run build`) y actualiza el sitio.

> Los archivos `client/public/data/*.json` y `client/public/_redirects` están commiteados, así que el deploy funciona aunque el build falle por otra razón.

---

## Solución de problemas

| Problema | Solución |
|---|---|
| `Error: listen EADDRINUSE` | El puerto está ocupado. Cerrá el proceso anterior (o matá el PID con `taskkill //PID <pid> //F` en Windows) y volvé a `npm run dev`. |
| "No se pudo cargar el menú" | El servidor no está corriendo o se cayó. Reiniciá `npm run dev`. |
| WhatsApp abre un número viejo | Recargá con **Ctrl+F5** (la pestaña guardaba el código anterior). |
| El celular no carga la página | Misma red Wi-Fi, permití Node en el firewall o agregá regla para los puertos `5173`/`3000`. |
| Fotos que no cargan | Verificá que el archivo exista en `client/public/products/` y que la ruta en `menu.js` empiece con `/products/`. |
| Build falla | Probablemente un error de sintaxis en `server/data/menu.js` o imports en `client/src/js/`. Revisá la consola. |

---

## Pendientes

- [ ] Asignar las fotos reales a cada producto (hoy usan placeholder de marca; el mapeo se hace en `server/data/menu.js`)
- [ ] Carta real de licorería (la sección está lista, espera datos)
- [ ] Verificar redes sociales reales para el footer
- [ ] Cuando la página esté lista: publicar en Cloudflare Pages (pasos en la sección correspondiente)