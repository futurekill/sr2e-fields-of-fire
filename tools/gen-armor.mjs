// Generate Fields of Fire armor into packs-src/ff-armor.
// Gel-Pack Armor (book p.53) and Military-Grade Armor (p.54), verified against
// the page renders. Re-run, then `npm run build-packs ff-armor`.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/ff-armor";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("ff-armor:" + s).digest("hex").slice(0, 16);

function armor(a) {
  const _id = idFor(a.name);
  return {
    _id, name: a.name, type: "armor", img: a.img ?? "icons/svg/shield.svg",
    system: {
      ballistic: a.ballistic ?? 0, impact: a.impact ?? 0,
      concealability: a.conceal ?? 0, weight: a.wt ?? 0,
      cost: a.cost ?? 0, availability: a.avail ?? "",
      legality: a.legality ?? "Forbidden", equipped: false,
      isLayered: false, notes: a.notes ?? ""
    },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.0.1", createdTime: 1782000000000, modifiedTime: 1782000000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
}

const ARMOR = [
  // Gel-Pack is an upgrade applied to any armor, not a fixed-rating piece —
  // ratings 0, rules in notes (book p.53).
  { name: "Gel-Pack Armor", ballistic: 0, impact: 0, cost: 0, avail: "",
    notes: "Mil-spec gel-pack upgrade added to ANY armor: treat that armor as Hardened at its normal Ballistic and Impact ratings (a hit whose Power doesn't exceed the rating does no damage; penetration reduces the rating by 1). Halves the armor's Concealability (round down). Multiplies the base armor by: weight ×1.25, cost ×5, Street Index ×2, Availability target number ×2 and time ×4. Forbidden. Fields of Fire p.53." },

  // Military-Grade Armor (book p.54). All Hardened; integrate combat electronics
  // (incl. BattleTac). Reduces Combat Pool by 1 per 2 points of Ballistic above
  // the wearer's Quickness. Weight is "base + Body" (base stored; +Body noted).
  { name: "Light Military Armor", ballistic: 10, impact: 7, wt: 12, cost: 25000, avail: "18/1 mth",
    notes: "Hardened military combat armor with integral combat electronics (incl. BattleTac). Weight 12 + Body. Reduces Combat Pool by 1 per 2 Ballistic points above the wearer's Quickness. Street Index 3. Forbidden. Fields of Fire p.54." },
  { name: "Medium Military Armor", ballistic: 12, impact: 8, wt: 14, cost: 45000, avail: "24/1 mth",
    notes: "Hardened military combat armor with integral combat electronics (incl. BattleTac). Weight 14 + Body. Reduces Combat Pool by 1 per 2 Ballistic points above the wearer's Quickness. Street Index 3. Forbidden. Fields of Fire p.54." },
  { name: "Heavy Military Armor", ballistic: 14, impact: 9, wt: 16, cost: 70000, avail: "28/1.5 mth",
    notes: "Hardened military combat armor with integral combat electronics (incl. BattleTac), energy dispersal, thermal dampening, intrusal wiring, antenna matrices. Weight 16 + Body. Reduces Combat Pool by 1 per 2 Ballistic points above the wearer's Quickness. Street Index 3. Forbidden. Fields of Fire p.54." },
  { name: "Heavy Military Helmet", ballistic: 2, impact: 3, wt: 3.0, cost: 2500, avail: "24/1 mth",
    notes: "Add-on military helmet: +2 Ballistic / +3 Impact to the suit. Street Index 3. Forbidden. Fields of Fire p.54." }
];

let n = 0;
for (const a of ARMOR) {
  const safe = a.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(a.name)}.json`, JSON.stringify(armor(a), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} armor items`);
