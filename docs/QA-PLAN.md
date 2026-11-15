# QA plan — Fields of Fire

Manual checks for a live Foundry world with the sr2e system and this module enabled.

## 0. Offline
- [ ] `npm run validate` passes (pack shape + every catalog entry cites its page); `npm run lint` is clean.

## 1. Compendia
- [ ] The six packs (Weapons, Ammunition, Armor, Gear, Vehicles & Drones, Vehicle Mods) open; every entry shows its art.
- [ ] Every item sheet shows its Fields of Fire page badge (sr2e 0.156.0+).

## 2. Weapons and ammunition
- [ ] **Barret Model 121**: semi-auto only, 14D, 14-round clip, ranges 40/80/200/400, Street Index 5 (p.35).
- [ ] Load **EX Explosive Rounds** into a firearm: the attack card shows +2 Power (p.51).
- [ ] The laser weapons (Ares MP Laser III, FireLance) attack and resist like the book says (pp.49–50).
- [ ] A **Ballista** rocket/missile shows its guidance data on a Rigger 2 world (0.3.0).

## 3. Armor and gear
- [ ] Military armor and helmets equip and add their Ballistic/Impact; **Gel-Pack Armor** matches p.53.
- [ ] Gear drops into the gear tab with its cost, Availability and Street Index.

## 4. Vehicles and mods
- [ ] Each vehicle (Devil Rat APC, Steel Lynx, Condor II…) drags onto a scene; the sheet's stats match the book page.
- [ ] Install **Ablative Vehicle Armor (Level 2)** on a vehicle: Armor rises by 4, never above the vehicle's Body (p.72).
- [ ] A smoke generator mod installs and is listed on the vehicle; the Workshop doesn't offer to edit these mods.
