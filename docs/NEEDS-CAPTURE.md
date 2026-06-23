# Entries needing a high-res capture

Values that couldn't be read confidently off the scanned PDF. (The Fields of Fire
scan is fairly clean, so this should stay short.) When a physical-book capture is
available, fix these and remove them.

Format: **pack / item — field** — what's wrong, placeholder used.

## Open
- (none yet)

## Open — vehicle stat convention (confirm before batch 4)
- **FF vehicle stat-block "B/A" column.** The vehicle pages (p.62–70) print a
  combined column headed **B/A** with values like "2/9" (GMC MPUV, p.63) and a
  single "9" (Night Glider, p.62). By position B/A = **Body / Armor** (so MPUV =
  Body 2, Armor 9), but Body 2 on a 4-wheel personnel transport is mechanically
  odd. Confirm the convention (Body/Armor order + what a single value means)
  against a known FF vehicle or the FF vehicle rules before transcribing
  `ff-vehicles`, so the stats aren't baked in wrong. Read so far for the MPUV:
  Handling 5/3, Speed 40/120 (off-road 30/90), B/A 2/9, Sig 4, A/Pilot 0, Cost
  22,000¥, Seating 2+2, Cargo 10 CF, Economy 15 km/L, Fuel Multifuel/100.

## Resolved (rules-accuracy)
- **ff-weapons firearms — ranges aligned to the FF Weapon Range Table (p.87).**
  The `RANGE` table now uses the book's own brackets for every class. Re-stated:
  Assault Rifle 25/100/250/500 → **15/40/100/250**; Sniper Rifle 50/350/800/1500
  → **40/80/200/400**; LMG 50/150/350/550 → **20/40/80/150**; Shotgun 10/20/40/60
  → **10/20/50/100**. (Pistols + SMG already matched.) Affected 3 assault rifles,
  the Barret sniper, the Ares HV MP-LMG, and 2 shotguns.

## Resolved
- (none yet)
