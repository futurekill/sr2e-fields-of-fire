# Fields of Fire — Survey & Transcription Plan

Source: *Fields of Fire* (FASA 7114), 111-page scanned PDF (clean scan). Page
offset 0 (PDF page = book page in the front matter / Field Pack).

## What's item content vs not
- **Field Pack (p.26–72)** — the items. Transcribe.
- *Fields of Fire* narrative (p.5–24) — merc setting/flavour. Skip.
- *Rules* (p.73–86) — combat rule expansions (mostly in the system or GM ref).
  Skip as items; revisit if any table is item-worthy (e.g. Smartlink II,
  BattleTac already appear as Gear).

## Packs
| Pack | Type | Contents |
|---|---|---|
| `ff-weapons` | Item `weapon` | Firearms (p.26–38), heavy weapons (p.39–50), Cougar knife (p.55) |
| `ff-ammo` | Item `ammo` | Ballista rocket/missile rounds (43), mortar rounds (45), grenades (48), ammunition (51) |
| `ff-armor` | Item `armor` | Gel-Pack Armor (53), Military Grade Armor (54) |
| `ff-gear` | Item `gear` | Camo (52), climbing (56), Smartlink II (57), Tactical Comms (58), BattleTac Integration (59), Target Designators (60), GPS (61), NightGlider (62) |
| `ff-vehicles` | Actor `vehicle` | GMC MPUV (63), Devil Rat APC (64), Striker Light Tank (65), Titan Transport (66), Condor II (67), Steel Lynx drone (68), Ferret drone (69), Wasp/Yellowjacket upgrade (70) |
| `ff-vehicle-mods` | Item `vehicle_mod` | Vehicle Smoke Generator (71), Ablative Vehicle Armor (72) |

## Batch order
1. ✅ **Firearms** (p.26–38) → `ff-weapons`. 13 weapons.
2. ✅ **Heavy weapons** (p.39–50) → `ff-weapons`. 9 weapons: M79B1 LAW, Arbelast
   II MAW, Great Dragon ATGM, Ballista launcher, M-12 mortar, ArmTech MGL-12 &
   Mini-6 grenade launchers, Ares MP Laser III, Ares FireLance vehicle laser.
   Ranges from the FF Weapon Range Table (p.87). **Still open for batch 2:** the
   **rounds/grenades** (p.43 Ballista Mk I/II/III, p.45 mortar rounds, p.48
   grenades, p.51 ammunition) → `ff-ammo`; the **Ares Sentry weapon platform**
   (p.46) is an automated turret (Intelligence 6, 22,000¥), not a damage-code
   weapon — model it as `ff-gear` in batch 3.
3. **Gear & armor** (p.52–62) → `ff-armor` + `ff-gear` (+ Sentry platform p.46).
4. **Vehicles & drones** (p.63–70) → `ff-vehicles`. Cross-check vs Rigger 2 /
   core (the Condor II LDSD-41 also appears in Rigger 2 as `r2-vehicles`; the
   Devil Rat / Striker LAVs are FF-native, referenced "FF" in Rigger 2's list).
5. **Vehicle mods** (p.71–72) → `ff-vehicle-mods`.

## Notes / watch-outs
- Some FF vehicles overlap Rigger 2 (Condor II) — this is the FF-native source;
  keep the FF entry, note the overlap.
- Smartlink Level II & BattleTac appear in both FF (Gear) and Rigger 2 — FF is
  arguably the origin; transcribe FF's version, note the overlap.
