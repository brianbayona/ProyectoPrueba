import express from 'express';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { menu } from './data/menu.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.use(express.json());

app.get('/api/menu', (_req, res) => {
  res.json(menu);
});

app.get('/api/config', (_req, res) => {
  res.json({
    storeName: 'Comidas Rápidas Donde Rey',
    whatsapp: '573013872320',
    phone: '76588040',
    email: 'pedidos@donderey.co',
    address: 'Cra. 45 #148a-2, Floridablanca, Santander',
    schedule: 'Lun - Dom: 5:00 PM - 2:00 AM'
  });
});

const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));
app.use((_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

function getLanIPs() {
  const ips = [];
  for (const ifaces of Object.values(os.networkInterfaces())) {
    for (const iface of ifaces || []) {
      if (iface.family === 'IPv4' && !iface.internal) ips.push(iface.address);
    }
  }
  return ips;
}

app.listen(PORT, HOST, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  for (const ip of getLanIPs()) {
    console.log(`Accesible desde tu red en: http://${ip}:${PORT}`);
  }
});