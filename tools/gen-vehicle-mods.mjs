// Generate Fields of Fire vehicle modifications into packs-src/ff-vehicle-mods.
// Wasp/Yellowjacket performance upgrades (book p.70), vehicle smoke generators
// (p.71), and ablative vehicle armor (p.72), verified against the page renders.
// Re-run, then `npm run build-packs ff-vehicle-mods`.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/ff-vehicle-mods";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("ff-vehicle-mod:" + s).digest("hex").slice(0, 16);

function mod(m) {
  const _id = idFor(m.name);
  return {
    _id, name: m.name, type: "vehicle_mod", img: m.img ?? "icons/svg/upgrade.svg",
    system: {
      modType: m.modType ?? "general", rating: m.rating ?? 0,
      cost: m.cost ?? 0, installed: false, notes: m.notes ?? ""
    },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.0.1", createdTime: 1782000000000, modifiedTime: 1782000000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
}

const MODS = [
  // Wasp / Yellowjacket performance upgrades (book p.70). Modify an existing
  // Wasp/Yellowjacket drone (base stats in Rigger Black Book / SSC p.74).
  { name: "Wasp Performance Upgrade", modType: "upgrade", cost: 74000,
    notes: "Northrup performance upgrade for the Wasp drone: Handling −1, Signature +2, and sets Body/Armor to 2/6. Fleet-upgrade discounts available. Base Wasp stats: Rigger Black Book p.70-71 / Street Samurai Catalog p.74. Fields of Fire p.70." },
  { name: "Yellowjacket Performance Upgrade", modType: "upgrade", cost: 110000,
    notes: "Northrup performance upgrade for the Yellowjacket drone: Handling −1, Signature +2, and sets Body/Armor to 3/9. Fleet-upgrade discounts available. Base Yellowjacket stats: Rigger Black Book p.70-71 / Street Samurai Catalog p.74. Fields of Fire p.70." },

  // Vehicle smoke generators (book p.71). Externally mounted, triggered from
  // inside; each charge covers an area (smoke rules p.85). Thermal (IR-blocking)
  // smoke is available at +20% cost.
  { name: "Small Vehicle Smoke Generator", modType: "smoke", cost: 700,
    notes: "Externally-mounted vehicle smoke generator, 6 charges. Triggered from inside; each charge covers a given area (smoke rules p.85). Thermal IR-blocking smoke available at +20% cost. Fields of Fire p.71." },
  { name: "Large Vehicle Smoke Generator", modType: "smoke", cost: 1000,
    notes: "Externally-mounted vehicle smoke generator, 12 charges. Triggered from inside; each charge covers a given area (smoke rules p.85). Thermal IR-blocking smoke available at +20% cost. Fields of Fire p.71." },

  // Ablative vehicle armor (book p.72). Adds 2×level to effective Armor (max =
  // Body); when hit by Power > 3×level, the Armor bonus drops by 1. 6 hrs to
  // install, can't be concealed, not Hardened, not usable on aircraft.
  { name: "Ablative Vehicle Armor (Level 1)", modType: "armor", rating: 1, cost: 700,
    notes: "EAW modular ablative armor, Level 1: adds +2 to effective Armor Rating (max = Body). When hit by an attack with Power > 3, reduce the Armor bonus by 1. 6 hrs to install; can't be concealed; not Hardened; not usable on aircraft. Availability 8/14 days, Street Index 2. Fields of Fire p.72." },
  { name: "Ablative Vehicle Armor (Level 2)", modType: "armor", rating: 2, cost: 1600,
    notes: "EAW modular ablative armor, Level 2: adds +4 to effective Armor Rating (max = Body). When hit by an attack with Power > 6, reduce the Armor bonus by 1. 6 hrs to install; can't be concealed; not Hardened; not usable on aircraft. Availability 12/14 days, Street Index 2. Fields of Fire p.72." },
  { name: "Ablative Vehicle Armor (Level 3)", modType: "armor", rating: 3, cost: 2500,
    notes: "EAW modular ablative armor, Level 3: adds +6 to effective Armor Rating (max = Body). When hit by an attack with Power > 9, reduce the Armor bonus by 1. 6 hrs to install; can't be concealed; not Hardened; not usable on aircraft. Availability 14/21 days, Street Index 2. Fields of Fire p.72." }
];

let n = 0;
for (const m of MODS) {
  const safe = m.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(m.name)}.json`, JSON.stringify(mod(m), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} vehicle mods`);
