// Generate Fields of Fire gear into packs-src/ff-gear.
// Climbing (p.56), Smartlink Level II (p.57), Tactical Comms (p.58), BattleTac
// Integration (p.59), Target Designators (p.60), GPS (p.61), and the Ares Sentry
// weapon platform (p.46), each verified against the page renders. The gear data
// model has no Street Index field, so SI lives in notes. Re-run, then
// `npm run build-packs ff-gear`.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/ff-gear";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("ff-gear:" + s).digest("hex").slice(0, 16);

function gear(g) {
  const _id = idFor(g.name);
  return {
    _id, name: g.name, type: "gear", img: g.img ?? "icons/svg/item-bag.svg",
    system: {
      category: g.category ?? "general",
      rating: g.rating ?? 0, quantity: 1, weight: g.wt ?? 0,
      cost: g.cost ?? 0, availability: g.avail ?? "", legality: g.legality ?? "Legal",
      equipped: false, concealability: g.conceal ?? 0,
      weaponAccessory: g.accessory ?? false, linkedWeaponId: "",
      combatTnMod: g.tn ?? 0, accessoryRecoilComp: g.rc ?? 0, requiresSmartgun: g.smart ?? false,
      notes: g.notes ?? ""
    },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.0.1", createdTime: 1782000000000, modifiedTime: 1782000000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
}

const GEAR = [
  // --- Climbing gear (book p.56). Ropes/harnesses hold 2,000 kg; quick-release.
  { name: "Ascent/Descent Harness", category: "climbing", wt: 0.25, avail: "Always", cost: 75,
    notes: "Duraflex quick-release climbing harness (holds 2,000 kg). Climbing rules p.75-76. Street Index 1. Fields of Fire p.56." },
  { name: "Ascent/Descent Kit", category: "climbing", wt: 2.0, avail: "Always", cost: 250,
    notes: "Duraflex kit: descenders, ascenders, carabiners, crampons, and so on. Street Index 1. Fields of Fire p.56." },
  { name: "Rappelling Gloves", category: "climbing", wt: 0, avail: "Always", cost: 70,
    notes: "Reinforced rappelling gloves. Street Index 1. Fields of Fire p.56." },
  { name: "Climbing Rope (50m)", category: "climbing", wt: 1.0, avail: "Always", cost: 125,
    notes: "50-meter climbing rope (holds 2,000 kg). Street Index 1. Fields of Fire p.56." },

  // --- Smartlink Level II (book p.57). To gain Level II advantages BOTH the
  //     smartlink and the smartgun must be Level II (rules p.84-85).
  { name: "Smartlink Level II (External)", category: "smartlink", accessory: true, conceal: -2, wt: 0.75, avail: "6/48 hrs", cost: 800, legality: "Restricted",
    notes: "External Smartlink II weapon unit (top/under mount). Faster, cleaner cross-vendor smartgun linkage per the ADVAT.328 protocol; back-compatible with Level I. Street Index 2. Fields of Fire p.57." },
  { name: "Smartlink Level II (Internal)", category: "smartlink", accessory: true, wt: 0.25, cost: 0, legality: "Restricted",
    notes: "Internal Smartlink II built into the weapon: cost +250% of the weapon's price; Availability and Street Index equal the weapon's. Fields of Fire p.57." },
  { name: "Smartgoggles Level II", category: "smartlink", conceal: 0, wt: 0.1, avail: "4/36 hrs", cost: 3500, legality: "Restricted",
    notes: "Level II smartgoggles — smartlink display without an implant. Street Index 2. Fields of Fire p.57." },
  { name: "Smartlink Level II (Cybernetic)", category: "cyberware", wt: 0, avail: "6/48 hrs", cost: 3200, legality: "Restricted",
    notes: "Implanted Smartlink II (cyberware: Essence Cost 0.5). Street Index 2. Fields of Fire p.57. (No ff-cyberware pack; modeled here as gear — treat as a 0.5-Essence implant.)" },

  // --- Phillips Tacticom tactical communication system (book p.58). Rating =
  //     signal encryption (up to 6 levels), Rating 14 on the units.
  { name: "Tacticom Master Unit", category: "comms", rating: 14, wt: 75, avail: "24/21 days", cost: 60000, legality: "Restricted",
    notes: "Phillips Tacticom master unit: 6 levels of signal encryption, custom encryption algorithms, accepts land-line/satellite/laser/microwave sources. Street Index 3. Fields of Fire p.58." },
  { name: "Tacticom Portable Master Unit", category: "comms", rating: 14, wt: 20, avail: "18/14 days", cost: 120000, legality: "Restricted",
    notes: "Portable version of the Tacticom master unit (Rating 14). Street Index 3. Fields of Fire p.58." },
  { name: "Tacticom Personal Comm Unit", category: "comms", rating: 14, conceal: 8, wt: 0.5, avail: "12/14 days", cost: 18500, legality: "Restricted",
    notes: "Soldier's personal Tacticom comm unit (Rating 14). Street Index 2. Fields of Fire p.58." },
  { name: "Tacticom Microwave Link", category: "comms", conceal: 3, wt: 1.0, avail: "18/21 days", cost: 4300,
    notes: "Microwave relay link for the Tacticom system. Street Index 2. Fields of Fire p.58." },
  { name: "Tacticom Laser Link", category: "comms", conceal: 4, wt: 1.0, avail: "14/21 days", cost: 2700,
    notes: "Dedicated laser-link for the Tacticom system. Street Index 2. Fields of Fire p.58." },
  { name: "Tacticom Satellite Uplink", category: "comms", wt: 2.0, avail: "12/21 days", cost: 7500, legality: "Restricted",
    notes: "Satellite uplink for the Tacticom system. Street Index 3. Fields of Fire p.58." },

  // --- BattleTac Integration System (book p.59). No purchasable stat line; a
  //     networked battlefield-management system.
  { name: "BattleTac Integration System", category: "tactical", cost: 0, legality: "Restricted",
    notes: "Sony BattleTac tactical telecom + data-transfer network linking allied soldiers. Requires the Special Skill: Small Unit Tactics (and a BattleTac unit). Users take a −2 modifier to all target numbers whenever the network is active (rules p.84). Fields of Fire p.59." },

  // --- Winter Systems target designators (book p.60). Laser sights are weapon
  //     accessories; designators mark targets for guided munitions.
  { name: "Low-Power Laser Sight", category: "targeting", accessory: true, conceal: -1, wt: 0.25, avail: "6/36 hrs", cost: 500,
    notes: "Low-power laser target sight, range 500 m. Street Index 0.9. Fields of Fire p.60." },
  { name: "High-Power Laser Sight", category: "targeting", accessory: true, conceal: -1, wt: 0.25, avail: "8/48 hrs", cost: 1400,
    notes: "High-power laser target sight, range 1,500 m. Street Index 1. Fields of Fire p.60." },
  { name: "Laser Designator", category: "targeting", conceal: -2, wt: 0.5, avail: "12/14 days", cost: 3700, legality: "Restricted",
    notes: "Laser target designator (range 5,000 m) — marks a target for laser-guided munitions (e.g. Ballista Mk II, Anti-Vehicle mortar). Rules p.85. Street Index 2. Fields of Fire p.60." },
  { name: "Microwave Designator", category: "targeting", wt: 4.5, avail: "24/1 mth", cost: 12500, legality: "Restricted",
    notes: "Microwave-pulse target designator (range ~8,000 km). Street Index 2. Fields of Fire p.60." },
  { name: "Radar Designator", category: "targeting", wt: 3, avail: "24/3 mths", cost: 48000, legality: "Restricted",
    notes: "Radar target designator (range 10,000+ km) — most accurate/reliable. Street Index 2. Fields of Fire p.60." },

  // --- Global Positioning System (book p.61).
  { name: "Sony Nav-Dat GPS", category: "navigation", conceal: 8, wt: 0.5, avail: "6/48 hrs", cost: 700,
    notes: "Sony Nav-Dat GPS: cross-references known navigational satellites, locating you within 2 m. Datasoft-jack maps, multiple coordinate systems; tracks the moon and sun; BattleTac-compatible. Street Index 1. Fields of Fire p.61." },

  // --- Ares Sentry weapon platform (book p.46). An automated robotic turret,
  //     not a damage-code weapon — modeled here as gear.
  { name: "Ares Sentry Weapon Platform", category: "weapon_platform", rating: 6, wt: 0, avail: "12/21 days", cost: 22000, legality: "Forbidden",
    notes: "Automated robotic weapon mount (Ares Sentry): Intelligence 6 (+1 per added sensor), Firearms Skill 5 (+1 per 5,000¥ or extra sensor), integral thermographic + pulse-radar sensors. Initiative 15+1D6 (raise to 20+2D6 for 10,000¥ or 25+3D6 for 20,000¥). Mounts a weapon up to a light machine gun; tripod or 300° rotation; Barrier Rating 12. Standard cost 22,000¥ +10% for customization; extra sensors 2,000¥; incline/decline targeting 3,000¥. Plus the weapon, ammo, and recoil comp. Street Index 4. Fields of Fire p.46." }
];

let n = 0;
for (const g of GEAR) {
  const safe = g.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(g.name)}.json`, JSON.stringify(gear(g), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} gear items`);
