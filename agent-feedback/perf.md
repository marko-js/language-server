# Performance

Runtime speed and bundle size opportunities. Format and rules: [README.md](README.md).

## Plumb a cancellation token into the TS language-service host

`packages/language-server/src/service/script/index.ts` › `getTSProject` | 2026-07-28 | impact:med | effort:med

The language-service host provides no `getCancellationToken`, so TypeScript installs a no-op token and every TS call (`getSemanticDiagnostics`, `getEncodedSemanticClassifications`, completions) runs to completion even after the client cancels. Measured worst case for classification alone: ~128 ms uninterruptible at 137 KB of source (~380 ns per generated char); diagnostics are larger. The per-span cancellation check in the semantic-tokens mapping loop only covers ~3% of the work, and a pre-cancelled request still cost 127.7 of 128.0 ms. Wiring a per-request token through the host would make all TS-backed features responsive to cancellation. Re-verify: time any TS-backed request with an already-cancelled token; it currently costs the same as an uncancelled one.

## Narrow the classification span for semantic-token range requests

`packages/language-server/src/service/script/index.ts` › `getSemanticTokens` | 2026-07-28 | impact:low | effort:med

Range requests classify the entire generated file and filter afterwards. Per-version caching makes the second request of a version nearly free, but the first request, which paints the viewport, still pays full-document classification (~51 ms at 2,000 lines for a ~60-line viewport). Mapping the requested source range to a min/max generated span before calling `getEncodedSemanticClassifications` would cut that roughly proportionally, though the extractor hoists code, so generated ranges for a source range are non-contiguous and the span computation needs care. Re-verify: time a 60-line range request against a full request on a 2,000-line doc; they currently cost the same on a cold version.
