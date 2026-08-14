import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { menu } from '../server/data/menu.js';
import { config } from '../server/data/config.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../client/public/data');

mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, 'menu.json'), JSON.stringify(menu, null, 2), 'utf8');
writeFileSync(resolve(outDir, 'config.json'), JSON.stringify(config, null, 2), 'utf8');

console.log(`Datos estáticos generados en client/public/data/ (${menu.length} productos)`);