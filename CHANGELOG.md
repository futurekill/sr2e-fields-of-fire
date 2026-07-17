# Changelog

## 0.1.1

Packaging only — no content change. Cut the first published GitHub release with an
idempotent release workflow, untracked the `packs/` LevelDB build (rebuilt in CI),
and moved the CI actions off the deprecated Node 20.

## 0.1.0

First release. The complete *Fields of Fire* (FASA 7114) **Field Pack** (book
p.26–72) as SR2E compendia — **89 items across 6 packs**, every value verified
against the page renders.

| Pack | Count |
|---|---|
| `ff-weapons` | 24 |
| `ff-ammo` | 21 |
| `ff-armor` | 7 |
| `ff-gear` | 22 |
| `ff-vehicles` | 8 |
| `ff-vehicle-mods` | 7 |

Firearm ranges use the FF Weapon Range Table (book p.87). Vehicle "B/A" =
Body/Armor. Only the narrative (p.5–24) and Rules (p.73–86) sections are
intentionally out of scope.

## 0.0.1 (development history)

### Firearms (`ff-weapons`, 13)
- All Field Pack firearms (book p.26-38): Walther PB-120, Hammerli Model 610s,
  Savalette Guardian, Ingram Warrior-10, Colt Cobra TZ-110, Ingram SuperMach
  100, Colt M-23 Assault Rifle, Ares Alpha Combat Gun, Ares HV Assault Rifle,
  Barret Model 121 Heavy Sniper Rifle, Remington 990 Shotgun, Franchi SPAS-22,
  Ares HV MP-LMG. Stat lines zoom-verified (e.g. Ingram Warrior-10 SI is .9, a
  decimal). Smartlink/recoil-reduction features noted per weapon.

- Scaffolded the `sr2e-fields-of-fire` content module: `module.json` requiring
  the `sr2e` system (≥ 0.9.0); packs for weapons, ammo, armor, gear, vehicles,
  and vehicle mods; pack-build/validate tooling; release workflow. Packs are
  committed (not gitignored). See `docs/PLAN.md`.
