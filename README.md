# Shadowrun 2E: Fields of Fire

A content module for the [SR2E FoundryVTT system](../sr2e-foundryvtt) adding the
mercenary weapons, ammunition, armor, gear, and vehicles from *Fields of Fire*
(FASA 7114) as compendia.

Private repo — contains copyrighted FASA content for personal table use only.

## Status
The Field Pack (book p.26–72) is **fully transcribed — 89 items across 6 packs**:
`ff-weapons` (24: firearms, heavy weapons, Cougar knives), `ff-ammo` (21:
Ballista/mortar rounds, grenades, EXAmmo), `ff-armor` (7: military-grade,
gel-pack, camo), `ff-gear` (22: comms, Smartlink II, designators, climbing,
Sentry…), `ff-vehicles` (8 vehicles/drones), `ff-vehicle-mods` (7). Every value
verified against the page renders; firearm ranges use the FF Weapon Range Table
(p.87).

## Build
```
npm install
npm run build-packs   # packs-src/ JSON -> packs/ LevelDB (close Foundry first)
npm run validate      # JSON/keys/dup-id/count checks
```
See `CLAUDE.md` and `docs/PLAN.md`.
