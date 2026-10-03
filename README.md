# Shadowrun 2E: Fields of Fire

A Foundry VTT V13 module bringing *Fields of Fire* (FASA 7114) to the [Shadowrun 2nd Edition system](https://github.com/futurekill/sr2e-foundryvtt) (`sr2e`). The mercenary Field Pack (book p.26–72): weapons, ammunition, armor, gear, vehicles and vehicle mods.

## Contents

| Pack | Contents |
|---|---|
| FF Weapons | 24 items |
| FF Ammunition | 21 items |
| FF Armor | 7 items |
| FF Gear | 22 items |
| FF Vehicles & Drones | 8 actors |
| FF Vehicle Mods | 7 items |

## Notes

- Firearm ranges use the Fields of Fire Weapon Range Table (p.87).
- Every value was checked against page renders of the book.

## Requirements

- Foundry VTT V13
- The `sr2e` system, version 0.9.0 or later

## Installation

In Foundry, **Add-on Modules → Install Module**, and paste this manifest URL:

```
https://github.com/futurekill/sr2e-fields-of-fire/releases/latest/download/module.json
```

Then enable it in your world (**Game Settings → Manage Modules**).

## Development

`packs-src/` (one JSON file per document) is the source of truth. `packs/` is built from it, gitignored, and rebuilt by the release workflow.

```bash
npm install
npm run build-packs     # packs-src/ JSON -> packs/ LevelDB (close Foundry first)
npm run extract-packs   # pull edits made in Foundry back to packs-src/
npm run validate        # pre-flight checks on the pack sources
npm run lint
```

To release: add a `## X.Y.Z — date` section to `CHANGELOG.md` (the release notes come from it), bump `module.json`, then tag and push `vX.Y.Z`.

## Copyright

*Fields of Fire* and *Shadowrun* are © FASA and their rights holders. This is a fan-made, non-commercial module for personal table use by owners of the book.
