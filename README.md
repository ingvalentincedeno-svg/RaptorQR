# RaptorQR

Transfer files and text between devices by displaying high-throughput animated QR codes and reading them with a camera.

Everything runs locally in the browser or terminal: no upload server, no Bluetooth, no cable.

Live demo: https://qr.linkto.host/

## Packages

```text
packages/raptorqr-core   protocol, packetization, FEC, QR encode/decode APIs
packages/raptorqr-wasm   fast_qr and RaptorQ WASM artifacts plus Colab scripts
packages/raptorqr-cli    raptorqr terminal CLI
apps/web                 Preact/Vite web app
```

## Features

* Browser sender/receiver for text and file transfer
* Terminal sender via the `raptorqr` CLI
* Primary RaptorQ WASM fountain codec
* Deprecated JS RLNC compatible codec kept for explicit comparison and old flows
* fast_qr WASM QR rendering, plus ZXing WASM writer option
* ZXing WASM QR scanning with configurable decoder settings
* Parallel QR playback, live Canvas rendering, and optional GIF export
* Adjustable QR version, ECC level, playback FPS, scan FPS, and repair overhead

## Development

Install dependencies:

```bash
pnpm install
```

Run the web app:

```bash
pnpm dev:web
```

Build everything:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

Run the CLI from source:

```bash
pnpm --filter @raptorqr/cli cli
```

Smoke-test the built CLI:

```bash
node packages/raptorqr-cli/dist/raptorqr.js --help
```

## CLI

```bash
raptorqr document.pdf
echo "Hello, world!" | raptorqr
raptorqr --serve --port 8080
```

The CLI bundle is built at:

```text
packages/raptorqr-cli/dist/raptorqr.js
```

The CLI copies its required WASM sidecars into the same `dist/` directory.

## WASM Artifacts

The generated artifacts live under:

```text
packages/raptorqr-wasm/src/fast_qr/wasm
packages/raptorqr-wasm/src/raptorq/wasm
```

The Colab build scripts are:

```text
packages/raptorqr-wasm/src/fast_qr/build_fast_qr_wasm_colab.py
packages/raptorqr-wasm/src/raptorq/build_raptorq_wasm_colab.py
```

## Implementation Notes

The protocol keeps the existing fixed 8-byte transport header. RaptorQ packets use the reserved symbol index sentinel, while JS RLNC packets use the legacy symbol index range.

`wasm-raptorq` is the default FEC codec. `js-rlnc` is still exported and test-covered, but it is deprecated and is never used as an automatic fallback.

For a deeper protocol and package overview, see [ARCHITECTURE.md](ARCHITECTURE.md).
