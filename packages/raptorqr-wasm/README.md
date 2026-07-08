# @raptorqr/wasm

Generated WASM artifacts used by RaptorQR.

Most application code should use `@raptorqr/core` instead of importing this package directly. This package exposes the raw wasm-bindgen modules for low-level integration, tests, and core wrappers.

## Exports

### fast_qr

```ts
import init, {
  initSync,
  QrRenderer,
  type InitOutput,
} from '@raptorqr/wasm/fast-qr';
```

Exports:

```text
default init(module_or_path?) -> Promise<InitOutput>
initSync(module) -> InitOutput
QrRenderer
InitOutput
```

`QrRenderer` methods:

```text
new QrRenderer()
render(data, version, ecc, scale) -> sidePx
render_rgba(data, version, ecc, scale) -> sidePx
render_matrix(data, version, ecc) -> sideModules
rgba_ptr() / rgba_len()
buf_ptr() / buf_len()
matrix_ptr() / matrix_len()
last_matrix_size()
free()
```

ECC numeric mapping:

```text
0 = L
1 = M
2 = Q
3 = H
```

Render an RGBA QR image:

```ts
import init, { QrRenderer } from '@raptorqr/wasm/fast-qr';

const wasm = await init();
const renderer = new QrRenderer();

const sidePx = renderer.render_rgba(packetBytes, 10, 1, 4);
const byteLength = sidePx * sidePx * 4;

const rgba = new Uint8ClampedArray(
  wasm.memory.buffer,
  renderer.rgba_ptr(),
  byteLength,
);

// Copy before another render call if you need to keep the pixels.
const copy = new Uint8ClampedArray(rgba);
```

Render a raw QR module matrix:

```ts
const sideModules = renderer.render_matrix(packetBytes, 10, 1);
const modules = new Uint8Array(
  wasm.memory.buffer,
  renderer.matrix_ptr(),
  sideModules * sideModules,
);

// modules[row * sideModules + col] is 0 for light, 1 for dark.
```

### RaptorQ

```ts
import init, {
  initSync,
  encode_packets,
  RaptorQDecoder,
} from '@raptorqr/wasm/raptorq';
```

Exports:

```text
default init(module_or_path?) -> Promise<InitOutput>
initSync(module) -> InitOutput
encode_packets(data, max_transport_payload_size, repair_percent) -> Array<any>
RaptorQDecoder
```

`RaptorQDecoder` methods:

```text
new RaptorQDecoder(data_len, max_transport_payload_size)
push(serialized_packet) -> Uint8Array | null
free()
```

Encode and decode directly:

```ts
import init, {
  encode_packets,
  RaptorQDecoder,
} from '@raptorqr/wasm/raptorq';

await init();

const data = new TextEncoder().encode('hello');
const maxTransportPayloadSize = 201;
const repairPercent = 10;

const packets = Array.from(
  encode_packets(data, maxTransportPayloadSize, repairPercent),
  (packet) => new Uint8Array(packet),
);

const decoder = new RaptorQDecoder(data.length, maxTransportPayloadSize);

let decoded: Uint8Array | null = null;
for (const packet of packets) {
  const result = decoder.push(packet);
  if (result) {
    decoded = new Uint8Array(result);
    break;
  }
}
```

Direct RaptorQ packets are codec payloads only. They do not include the RaptorQR 8-byte transport header, CRC32C trailer, compression metadata, filename metadata, or QR scheduling semantics. Use `@raptorqr/core/sender/raptorq_packetizer` when you need complete RaptorQR transfer packets.

## WASM Asset Subpaths

The generated files are exported for bundlers and Node loaders:

```text
@raptorqr/wasm/fast-qr/wasm/*
@raptorqr/wasm/raptorq/wasm/*
```

The important binary sidecars are:

```text
src/fast_qr/wasm/qrstream_fast_qr_wasm_bg.wasm
src/raptorq/wasm/qrstream_raptorq_wasm_bg.wasm
```

## Verification

Verify the RaptorQ artifact:

```bash
pnpm --filter @raptorqr/wasm test
```

## Regeneration

The Colab build scripts are kept in:

```text
src/fast_qr/build_fast_qr_wasm_colab.py
src/raptorq/build_raptorq_wasm_colab.py
```

After regenerating artifacts, run:

```bash
pnpm test
pnpm build
```
