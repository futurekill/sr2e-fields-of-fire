// Generate Fields of Fire munitions into packs-src/ff-ammo.
// Ballista rounds (book p.43), mortar rounds (p.45), grenades (p.48), and
// EXAmmo rounds (p.51), each verified against the page render (tables
// zoom-checked). The SR2E `ammo` data model is bullet-oriented (damage
// MODIFIERS), so self-contained warheads carry their damage code + blast in
// notes; only EX Explosive uses damageModifier (+2 Power). Re-run, then
// `npm run build-packs ff-ammo`.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/ff-ammo";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("ff-ammo:" + s).digest("hex").slice(0, 16);

function ammo(a) {
  const _id = idFor(a.name);
  return {
    _id, name: a.name, type: "ammo", img: a.img ?? "icons/svg/target.svg",
    system: {
      ammoType: a.ammoType ?? "regular", quantity: a.qty ?? 1,
      damageModifier: a.dmgMod ?? 0, armorModifier: a.armMod ?? 0,
      damageType: a.dmgType ?? "", armorCalc: a.armorCalc ?? "standard",
      cost: a.cost ?? 0, notes: a.notes ?? ""
    },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.0.1", createdTime: 1782000000000, modifiedTime: 1782000000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
}

const AMMO = [
  // --- Ballista rocket & missile rounds (book p.43). All: 14D, blast −7/meter,
  //     weight 2.75, Street Index 4. Mix-and-match within one magazine. ---
  { name: "Ballista Mk I Rocket", ammoType: "missile", qty: 1, cost: 1000,
    notes: "Armor-piercing dumb rocket for the Ballista launcher; direct or indirect fire (Intelligence 0). Damage 14D, blast −7/meter. Apply grenade rules (SRII p.96). Availability 12/21 days, Street Index 4, weight 2.75. Fields of Fire p.43." },
  { name: "Ballista Mk II Missile", ammoType: "missile", qty: 1, cost: 2000,
    notes: "Armor-piercing laser-tracking missile (Intelligence 5); direct or indirect fire. Requires a Reflected-Energy Designator (Rules p.85). Damage 14D, blast −7/meter. Availability 18/28 days, Street Index 4, weight 2.75. Fields of Fire p.43." },
  { name: "Ballista Mk III Missile", ammoType: "missile", qty: 1, cost: 2500,
    notes: "Armor-piercing semi-smart missile (Intelligence 6); direct fire only. Damage 14D, blast −7/meter. Availability 14/28 days, Street Index 4, weight 2.75. Fields of Fire p.43." },

  // --- M-12 mortar rounds (book p.45). Weight 4.0 unless noted. ---
  { name: "M-12 High-Explosive Mortar Round", ammoType: "mortar", qty: 1, cost: 200,
    notes: "HE mortar round. Damage 18D, blast −1/0.5 meter. Availability 18/14 days, Street Index 3, weight 4.0. Fields of Fire p.45." },
  { name: "M-12 Anti-Personnel Mortar Round", ammoType: "mortar", qty: 1, cost: 250,
    notes: "Fragmentation mortar round; determine damage by the Flechette rules (SRII p.93). Damage 18D, blast −1/meter. Availability 18/14 days, Street Index 3, weight 4.0. Fields of Fire p.45." },
  { name: "M-12 Smoke Mortar Round", ammoType: "mortar", qty: 1, cost: 175,
    notes: "Smoke screen mortar round (no damage); see the smoke rules (Rules p.85). Availability 14 days, Street Index 2, weight 3.5. Fields of Fire p.45." },
  { name: "M-12 White Phosphorus Mortar Round", ammoType: "mortar", qty: 1, cost: 350,
    notes: "White-phosphorus mortar round; see the WP rules (Rules p.86). Damage 15S (10L burn), blast −1/meter. Availability 18/14 days, Street Index 3, weight 4.0. Fields of Fire p.45." },
  { name: "M-12 Anti-Vehicle Mortar Round", ammoType: "mortar", qty: 1, cost: 1200,
    notes: "Armor-piercing mortar round with a laser-tracking seeker — requires a laser-marked target (Target Designators, Rules p.85). Damage 16D, blast −1/4 meters. Availability 21 days, Street Index 4, weight 4.0. Fields of Fire p.45." },

  // --- Grenades (book p.48). Weight .25, Concealability 6 unless noted. HE =
  //     standard grenade rules (SRII p.96); AP = same but damage per flechette
  //     rules (SRII p.93). IPE = improved (higher Power, higher cost). ---
  { name: "Offensive Grenade (HE/AP)", ammoType: "grenade", qty: 1, cost: 30,
    notes: "Offensive frag grenade (HE or anti-personnel). Damage 10S, blast −1/meter. Concealability 6, Availability 4 days, Street Index 2. Fields of Fire p.48." },
  { name: "IPE Offensive Grenade (HE/AP)", ammoType: "grenade", qty: 1, cost: 50,
    notes: "Improved offensive grenade (HE or AP). Damage 15S, blast −1/meter. Concealability 6, Availability 5/4 days, Street Index 2. Fields of Fire p.48." },
  { name: "Defensive Grenade (HE/AP)", ammoType: "grenade", qty: 1, cost: 30,
    notes: "Defensive grenade (HE or AP) — tighter blast falloff so a thrower behind cover is safer. Damage 10S, blast −1/0.5 meter. Concealability 6, Availability 4 days, Street Index 2. Fields of Fire p.48." },
  { name: "IPE Defensive Grenade (HE/AP)", ammoType: "grenade", qty: 1, cost: 50,
    notes: "Improved defensive grenade (HE or AP). Damage 15S, blast −1/0.5 meter. Concealability 6, Availability 5/4 days, Street Index 2. Fields of Fire p.48." },
  { name: "Concussion Grenade", ammoType: "grenade", qty: 1, cost: 30,
    notes: "Concussion (Stun) grenade. Damage 12M Stun, blast −1/meter. Concealability 6, Availability 5/4 days, Street Index 2. Fields of Fire p.48." },
  { name: "IPE Concussion Grenade", ammoType: "grenade", qty: 1, cost: 70,
    notes: "Improved concussion grenade. Damage 16M Stun, blast −1/meter. Concealability 6, Availability 5/4 days, Street Index 2. Fields of Fire p.48." },
  { name: "White Phosphorus Grenade", ammoType: "grenade", qty: 1, cost: 120,
    notes: "White-phosphorus grenade (Rules p.86). Damage 14M (10L burn), blast −1/meter. Concealability 6, Availability 6/5 days, Street Index 3. Fields of Fire p.48." },
  { name: "Smoke Grenade", ammoType: "grenade", qty: 1, cost: 30,
    notes: "Smoke screen grenade (no damage; smoke rules, Rules p.85). Concealability 6, Availability 3/24 hrs, Street Index 2. Fields of Fire p.48." },
  { name: "Smoke Grenade (IR)", ammoType: "grenade", qty: 1, cost: 40,
    notes: "Infrared-blocking smoke grenade (defeats thermographic vision; no damage). Concealability 6, Availability 4/48 hrs, Street Index 2. Fields of Fire p.48." },
  { name: "Flash Grenade", ammoType: "grenade", qty: 1, cost: 40,
    notes: "Flash-bang grenade — Special effect (see Street Samurai Catalog p.44), no Damage Code. Concealability 6, Availability 4/48 hrs, Street Index 1. Fields of Fire p.48." },
  { name: "Mini-Grenade Conversion", ammoType: "grenade", qty: 1, cost: 0,
    notes: "Mini-grenade form factor for grenade launchers (MGL-12 / Mini-6). Damage is the base grenade's; applies to the base grenade: Concealability 8, weight .1, Availability +2, Cost ×2, Street Index +1. Fields of Fire p.48." },

  // --- EXAmmo rounds (book p.51). Standard firearm ammunition. ---
  { name: "EX Explosive Rounds", ammoType: "explosive", qty: 10, dmgMod: 2, cost: 100,
    notes: "Explosive firearm rounds: +2 to the weapon's Power, all other standard rules. Concealability 8, Availability 6/72 hrs, Street Index 5, weight .75 (per box). Fields of Fire p.51." },
  { name: "Tracer Rounds", ammoType: "tracer", qty: 10, cost: 75,
    notes: "Tracer rounds for full-auto weapons only; loaded every third round. Non-smartgun users take a −1 TN modifier beyond Short range per tracer fired (−1 after the first 3, −2 after 6, …). In burst damage, the tracer adds no Power but does raise the Damage Level. Concealability 8, Availability 3/24 hrs, Street Index 1, weight .5 (per box). Fields of Fire p.51." }
];

let n = 0;
for (const a of AMMO) {
  const safe = a.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(a.name)}.json`, JSON.stringify(ammo(a), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} ammo items`);
