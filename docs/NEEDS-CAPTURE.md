# Entries needing a high-res capture

Values that couldn't be read confidently off the scanned PDF. (The Fields of Fire
scan is fairly clean, so this should stay short.) When a physical-book capture is
available, fix these and remove them.

Format: **pack / item — field** — what's wrong, placeholder used.

## Open
- (none yet)

## Rules-accuracy follow-ups (not a capture — a decision)
- **ff-weapons firearms — range brackets don't match the FF Weapon Range Table
  (book p.87).** The firearms batch (gen-weapons.mjs `RANGE`) used generic SR2
  brackets for `assault`, `sniper`, `mg`, `shotgun` that differ from FF p.87:
  - Assault Rifle: used 25/100/250/500 → **FF p.87 is 15/40/100/250**
  - Sniper Rifle: used 50/350/800/1500 → **FF p.87 is 40/80/200/400**
  - Light Machine Gun: `mg` 50/150/350/550 → **FF p.87 LMG is 20/40/80/150**
  - Shotgun: used 10/20/40/60 → **FF p.87 is 10/20/50/100**
  (Pistols + SMG already match.) The heavy-weapons batch uses the correct FF p.87
  values. **Decision needed:** align the firearms to FF p.87 too (recommended —
  it's the book's own table) vs. keep the current brackets. Affects 3 assault
  rifles, the Barret sniper, the Ares HV MP-LMG, and 2 shotguns.

## Resolved
- (none yet)
