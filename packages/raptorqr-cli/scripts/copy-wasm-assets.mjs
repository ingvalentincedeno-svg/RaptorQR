import { copyFileSync, mkdirSync } from 'node:fs';
import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(here, '..');
const repoRoot = resolve(packageRoot, '..', '..');
const dist = resolve(packageRoot, 'dist');

const assets = [
  {
    source: resolve(repoRoot, 'packages', 'raptorqr-wasm', 'src', 'fast_qr', 'wasm', 'qrstream_fast_qr_wasm_bg.wasm'),
    target: resolve(dist, 'qrstream_fast_qr_wasm_bg.wasm'),
  },
  {
    source: resolve(repoRoot, 'packages', 'raptorqr-wasm', 'src', 'raptorq', 'wasm', 'qrstream_raptorq_wasm_bg.wasm'),
    target: resolve(dist, 'qrstream_raptorq_wasm_bg.wasm'),
  },
];

mkdirSync(dist, { recursive: true });

for (const asset of assets) {
  copyFileSync(asset.source, asset.target);
  console.log(`copied ${basename(asset.target)}`);
}
