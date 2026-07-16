# Fields of Fire Module — Development Notes

A FoundryVTT **V13** content module adding *Fields of Fire* (FASA 7114) mercenary
gear to the **Shadowrun 2nd Edition system** (`sr2e`). Separate package: own repo,
own packs, no shared code. Depends on the system via `module.json` →
`relationships.systems` (sr2e ≥ 0.9.0), so its items/actors use the system's data
models (`weapon`, `ammo`, `armor`, `gear`, `vehicle`, `vehicle_mod`).

The sibling system repo is `../sr2e-foundryvtt`; `../sr2e-rigger-2` and
`../sr2e-street-samurai-catalog` are the templates this was scaffolded from
(same tooling). Read the system `CLAUDE.md` for the data-model field contracts.

## Source material
The Fields of Fire PDF is a **scanned image** (111 pages) — but a noticeably
**cleaner** scan than Rigger 2, so stat tables are usually legible. Extraction
lives in `_work/` (git-ignored, never shipped): `_work/pages/pg-NN.png` (renders
via `pdftoppm -r 200`). Still **read the page render to verify every number**
before transcribing; when a value is genuinely unreadable, ask for a high-res
photo of the physical book rather than guessing (track open ones in
`docs/NEEDS-CAPTURE.md`). Page offset: front matter PDF page = book page (the
"Page N" header matches).

## Content scope (Field Pack, book p.26–72)
Only the **Field Pack** is item content; the *Fields of Fire* narrative (p.5–24)
and the *Rules* section (p.73–86) are flavour/mechanics, not compendium items.
- **Firearms** (p.26–38) → `ff-weapons`
- **Heavy Weapons** (p.39–51): launchers, ATGM, mortar, sentry guns, grenade
  launcher, lasers → `ff-weapons`; their rounds/grenades/ammunition → `ff-ammo`
- **Gear** (p.52–62): gel-pack & military-grade armor → `ff-armor`; the Cougar
  knife → `ff-weapons`; the rest (camo, climbing, smartlink II, comms, BattleTac,
  target designators, GPS, NightGlider) → `ff-gear`
- **Vehicles** (p.63–72): LAVs/transports/drones → `ff-vehicles`; vehicle smoke
  generator & ablative vehicle armor → `ff-vehicle-mods`

## Packs are a build artifact (gitignored)
`packs/` (the built LevelDB) is **gitignored**. Foundry recompacts it every
session, so committing it churns the tree with meaningless diffs. `packs-src/` is
the source of truth; the release workflow rebuilds `packs/` from it, so installed
users always get built compendia.

**A fresh clone has no `packs/` — run `npm run build-packs` before pointing
Foundry at this folder, or the compendiums show up empty.** Likewise, after
editing `packs-src/` (or re-running a generator), rebuild before testing: Foundry
reads the LevelDB, not the JSON, and a stale build silently serves old data.
Close Foundry before rebuilding (LevelDB locks).

## Authoring conventions
- **Stat blocks** (game facts) into per-document JSON, with **original/
  summarised** descriptions — never paste verbatim flavour text.
- Build batched **by category**; a generator per category (`tools/gen-*.mjs`).
  Commit each batch. `npm run validate` after every build.
- Match the system data-model fields exactly.

## Build workflow
`packs-src/` (JSON, source of truth) → `npm run build-packs [name]` → `packs/`
(built LevelDB, gitignored). `npm run extract-packs` pulls Foundry edits back.
`npm run validate` checks JSON/keys/dup-ids/counts.

## Copyright
*Fields of Fire* / *Shadowrun* are © FASA and rights holders. Personal table use
only, from a PDF the owner has; not for distribution. Keep `_work/` out of git;
keep the repo private.
