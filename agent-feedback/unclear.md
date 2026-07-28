# Unclear Code & Docs

Things that were hard to understand, and what would have clarified them. Format and rules: [README.md](README.md).

## Document when to use `sourceRangeAt` vs `sourceRangesAt` on `Extracted`

`packages/language-tools/src/util/extractor.ts` › `Extracted` | 2026-07-27 | impact:med | effort:low

`Extracted` exposes both `sourceRangeAt` (lenient: pairs the first overlapping start token with the last end token, spanning unmapped glue and anchor expansions between them) and `sourceRangesAt` (precise: returns every overlapping token clipped to the query, plus the `linkedSources` alias), with no doc comment explaining the difference. The distinction decides correctness for any range-mapping feature: `sourceRangeAt` is only safe for approximate uses such as hover ranges, while token-precise consumers such as highlights and semantic tokens must use `sourceRangesAt` and validate widths. Add doc comments to both methods stating the leniency contract and pointing precise consumers at `sourceRangesAt`. Re-verify: read `rangeAt` in `GeneratedToSourceView`/`TokenView` and confirm the cross-token span behavior.

## Document why some `createService` merges dedupe overlaps and others concatenate

`packages/language-server/src/service/create-service.ts` › `createService` | 2026-07-27 | impact:low | effort:low

`findReferences` and `doRename` drop results whose ranges overlap one from an earlier plugin (via `rangesOverlap`), while `findDocumentHighlights`, `findDocumentColors`, `findDocumentLinks`, and `findDocumentSymbols` concatenate without any dedupe. The asymmetry has a plausible rationale, since duplicate highlights are cosmetically harmless while duplicate rename edits corrupt the edit, but nothing records it, and a contributor adding a new merge arm has no guidance on which pattern to follow. A short comment on the concat-style arms or on `rangesOverlap` stating the rule (dedupe only where duplicates are destructive) would settle it. Re-verify: compare the `findReferences` and `findDocumentHighlights` arms in `createService`.
