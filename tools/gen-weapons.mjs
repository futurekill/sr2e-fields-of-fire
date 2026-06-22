// Generate Fields of Fire weapons into packs-src/ff-weapons.
// Stats transcribed from the Field Pack firearm entries (book p.26-38), each
// verified against the page render (stat lines zoom-checked; note SI .9 on the
// Ingram Warrior-10 was a decimal, not "9"). Descriptions are original
// one-liners. Re-run, then `npm run build-packs ff-weapons`.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/ff-weapons";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("ff-weapon:" + s).digest("hex").slice(0, 16);

const modes = (s) => {
  const p = (s || "").split("/");
  return { ss: p.includes("SS"), sa: p.includes("SA"), bf: p.includes("BF"), fa: p.includes("FA") };
};
// Standard SR2 range brackets (upper metre bound per bracket) by class.
const RANGE = {
  pistolL: { short: 5,  medium: 15,  long: 30,  extreme: 50 },
  pistolH: { short: 5,  medium: 20,  long: 40,  extreme: 60 },
  smg:     { short: 10, medium: 40,  long: 80,  extreme: 150 },
  assault: { short: 25, medium: 100, long: 250, extreme: 500 },
  sniper:  { short: 50, medium: 350, long: 800, extreme: 1500 },
  shotgun: { short: 10, medium: 20,  long: 40,  extreme: 60 },
  mg:      { short: 50, medium: 150, long: 350, extreme: 550 },
  // Heavy / launch weapons — Fields of Fire Weapon Range Table (book p.87).
  grenadeLauncher: { short: 50,  medium: 100,  long: 150,  extreme: 300 },
  missileLauncher: { short: 70,  medium: 150,  long: 450,  extreme: 1500 },
  atgm:            { short: 350, medium: 750,  long: 1500, extreme: 5000 },
  ballista:        { short: 100, medium: 500,  long: 2500, extreme: 5000 },
  mortar:          { short: 300, medium: 1000, long: 4000, extreme: 6000 },
  // FF p.87 firearm rows used by the lasers (Type Sniper / Type Assault).
  ffSniper:        { short: 40,  medium: 80,   long: 200,  extreme: 400 },
  ffAssault:       { short: 15,  medium: 40,   long: 100,  extreme: 250 }
};
const KIND = {
  firearm: { type: "firearm", skill: "firearms" },
  heavy:   { type: "heavy",   skill: "heavy_weapons" }
};

function weapon(w) {
  const _id = idFor(w.name);
  const k = KIND[w.kind ?? "firearm"];
  return {
    _id, name: w.name, type: "weapon", img: w.img ?? "icons/svg/explosion.svg",
    system: {
      weaponType: k.type, skill: w.skill ?? k.skill,
      damageCode: w.dmg, damageType: "physical",
      concealability: w.conceal ?? 99, reach: 0,
      firingModes: modes(w.mode ?? "SS"),
      ammo: { current: w.ammo ?? 0, max: w.ammo ?? 0, type: w.ammoType ?? "clip" },
      recoilComp: w.rc ?? 0, smartgunCompatible: w.smart ?? false,
      ranges: RANGE[w.range], strengthMin: 0, weight: w.wt ?? 0,
      cost: w.cost ?? 0, availability: w.avail ?? "", legality: w.legality ?? "Restricted",
      streetIndex: String(w.index ?? ""),
      equipped: false, accessories: [], notes: w.notes ?? ""
    },
    effects: [], flags: {}, folder: null, sort: 0,
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.0.1", createdTime: 1782000000000, modifiedTime: 1782000000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!items!${_id}`
  };
}

const WEAPONS = [
  // --- Firearms (book p.26-38) ---
  { name: "Walther PB-120", conceal: 8, ammo: 10, mode: "SA", dmg: "6L", wt: 0.75, avail: "6/36 hrs", cost: 700, index: 2, range: "pistolL", legality: "Restricted",
    notes: "Low-profile composite back-up light pistol; 15-round extended clip available. Mounts standard barrel + top accessories, no under-barrel. Fields of Fire p.26." },
  { name: "Hammerli Model 610s", conceal: 4, ammo: 6, mode: "SA", dmg: "6L", wt: 2.5, avail: "8/24 hrs", cost: 1295, index: 2.5, range: "pistolH", rc: 1, legality: "Legal",
    notes: "Match-target pistol (technically a light pistol but uses the Heavy Pistol range table); customizable grips/weights give +1 Recoil Reduction. Top accessories only. Fields of Fire p.27." },
  { name: "Savalette Guardian", conceal: 5, ammo: 12, mode: "SA/BF", dmg: "9M", wt: 3.25, avail: "6/36 hrs", cost: 900, index: 2.5, range: "pistolH", rc: 1, smart: true, legality: "Restricted",
    notes: "High-powered heavy pistol with integral smartgun link, micro-gyro recoil (+1 RR) and burst fire (3-round burst as a Complex Action). No under-barrel accessories. Fields of Fire p.28." },
  { name: "Ingram Warrior-10", conceal: 4, ammo: 30, mode: "SA/BF", dmg: "7M", wt: 3, avail: "3/24 hrs", cost: 650, index: 0.9, range: "smg", legality: "Forbidden",
    notes: "Cheap, durable SMG that keeps firing in any conditions; mounts all barrel, under-barrel, and top accessories. Fields of Fire p.29." },
  { name: "Colt Cobra TZ-110", conceal: 5, ammo: 32, mode: "SA/BF/FA", dmg: "6M", wt: 3, avail: "6/36 hrs", cost: 700, index: 2, range: "smg", rc: 1, legality: "Forbidden",
    notes: "Best-selling SMG; folding stock + integral Gas-Vent II (+1 RR). Variants: TZ-115 adds an integral laser sight (+850¥), TZ-118 an integral smartlink (+1,000¥). Standard under-barrel + top accessories, no barrel-mounted. Fields of Fire p.30." },
  { name: "Ingram SuperMach 100", conceal: 5, ammo: 40, mode: "SA/BF/FA", dmg: "6L", wt: 3, avail: "9/48 hrs", cost: 850, index: 3, range: "smg", rc: 3, legality: "Forbidden",
    notes: "'Super-machinegun' SMG firing light-pistol rounds with +3 Recoil Reduction; six-round bursts do 12S, max autofire 5. 60-round high-density clip (25¥) available. Under-barrel + top accessories. Fields of Fire p.31." },
  { name: "Colt M-23 Assault Rifle", conceal: 3, ammo: 40, mode: "SA/BF/FA", dmg: "8M", wt: 4.5, avail: "6/36 hrs", cost: 950, index: 2, range: "assault", legality: "Forbidden",
    notes: "Stripped-down, budget version of the M-22A2 assault rifle; mounts standard barrel, under-barrel, and top accessories. Fields of Fire p.32." },
  { name: "Ares Alpha Combat Gun", conceal: 2, ammo: 42, mode: "SA/BF/FA", dmg: "8M", wt: 5.25, avail: "8/48 hrs", cost: 2000, index: 4, range: "assault", rc: 2, smart: true, legality: "Forbidden",
    notes: "Premium assault rifle with integral full-function Smartlink Level II, an integral mini-grenade launcher (8 mini-grenades, fired SS), and chamber-based recoil (+2 RR). Under-barrel + top accessories, no barrel-mounted. Fields of Fire p.33." },
  { name: "Ares HV Assault Rifle", conceal: 2, ammo: 50, mode: "SA/BF/FA", dmg: "6M", wt: 5.0, avail: "14/7 days", cost: 3200, index: 4, range: "assault", rc: 3, smart: true, legality: "Forbidden",
    notes: "High-velocity assault rifle (HVAR) with minigun firing rates; integral Smartlink II and +3 Recoil Reduction. Fires light-pistol rounds; six-round bursts do 12D, max autofire 15. Under-barrel + top accessories. Fields of Fire p.34." },
  { name: "Barret Model 121 Heavy Sniper Rifle", conceal: 99, ammo: 14, mode: "SA", dmg: "14D", wt: 10, avail: "14/30 days", cost: 4800, index: 4, range: "sniper", rc: 2, smart: true, legality: "Forbidden",
    notes: "Heavy anti-materiel sniper rifle with an integral silencer (+2 RR) and Smartlink I (+2). Fires custom armor-piercing rounds (treat as APDS; 200¥ per box of 10, separate acquisition test). Fields of Fire p.35." },
  { name: "Remington 990 Shotgun", conceal: 2, ammo: 8, mode: "SA", dmg: "8S", wt: 4, avail: "3/48 hrs", cost: 650, index: 2, range: "shotgun", ammoType: "magazine", legality: "Restricted",
    notes: "Common, affordable pump/semi shotgun firing slug or shot (8S; see the SR2 shotgun rules). Sawed-off version: Concealability 4 and all Damage Codes −2. Fields of Fire p.36." },
  { name: "Franchi SPAS-22", conceal: 2, ammo: 10, mode: "SA/BF", dmg: "10S", wt: 4, avail: "6/48 hrs", cost: 1000, index: 2, range: "shotgun", ammoType: "magazine", rc: 1, smart: true, legality: "Restricted",
    notes: "Selective-fire combat shotgun (single-action or burst); custom folding stock (+1 RR when extended; −2 recoil modifier) and Smartlink II hardware. Top accessories. Fields of Fire p.37." },
  { name: "Ares HV MP-LMG", kind: "heavy", conceal: 99, ammo: 80, mode: "SA/BF/FA", dmg: "6S", wt: 8.0, avail: "20/14 days", cost: 4500, index: 4, range: "mg", ammoType: "belt", rc: 3, smart: true, legality: "Forbidden",
    notes: "Super-machinegun version of the man-portable LMG; works as a personal or mounted weapon, belt-fed, with integral Smartlink II and +3 Recoil Reduction. Fires light-pistol rounds; six-round bursts do 15D, max autofire 15. Under-barrel + top accessories. Fields of Fire p.38." },

  // --- Heavy Weapons (book p.39-50). Launchers/mortar/grenade use Launch
  //     Weapons; the man-portable laser uses Heavy Weapons; the vehicle laser
  //     Gunnery. Ranges from the FF Weapon Range Table (book p.87). "*" damage =
  //     set by the loaded round/grenade (see ff-ammo, a later batch).
  { name: "M79B1 Light Anti-Armor Weapon", kind: "heavy", skill: "launch_weapons", conceal: 4, ammo: 1, mode: "SS", dmg: "12D", wt: 2.5, avail: "6/36", cost: 700, index: 2, range: "missileLauncher", ammoType: "round", legality: "Forbidden",
    notes: "Disposable single-shot telescoping LAW; accepts no accessories and must be fully opened to fire (drops Concealability to 0; firing is a Complex Action). Standard rocket rules (SRII p.99); not AVR-compatible, no armor-piercing. 10m back-blast (10M, −1/m). Fields of Fire p.39." },
  { name: "Arbelast II Medium Anti-Armor Weapon", kind: "heavy", skill: "launch_weapons", conceal: 99, ammo: 1, mode: "SS", dmg: "15D", wt: 2.75, avail: "8/48", cost: 1200, index: 2, range: "missileLauncher", ammoType: "round", legality: "Forbidden",
    notes: "Heavier disposable rocket launcher (MAW) with a permanent fixed-magnification sight and pop-up hard sights; non-telescoping, no accessories. Warhead 15D (Scatter 2D6+2, Power −1/half-meter). Not AVR-compatible, no AP. 12m back-blast (12M, −1/m). Fields of Fire p.40." },
  { name: "Great Dragon ATGM", kind: "heavy", skill: "launch_weapons", conceal: 4, ammo: 1, mode: "SS", dmg: "20D", wt: 2.75, avail: "8/48", cost: 1200, index: 2, range: "atgm", ammoType: "round", legality: "Forbidden",
    notes: "Tripod-mounted, reusable ground-based anti-tank guided missile (semi-active tracking, Optical Mag II). Shaped-charge AP warhead stops armor of any size; 20D, reduces target Power by Body. Standard missile rules (SRII p.99); no accessories. 12m exhaust blast (−1/m). Fields of Fire p.41." },
  { name: "Ballista Multi-Role Missile Launcher", kind: "heavy", skill: "launch_weapons", conceal: 99, ammo: 4, mode: "SS", dmg: "14D", wt: 6.5, avail: "18/30 days", cost: 10500, index: 4, range: "ballista", ammoType: "magazine", legality: "Forbidden",
    notes: "Saeder-Krupp shoulder/balanced launcher firing Ballista Mk I/II/III missiles, direct- or indirect-fire. 4-round magazine (swap 10s; full reload 30s). Ships with a Type I Laser Designator (direct-fire mode). Base 14D varies by missile round (see ff-ammo). Fields of Fire p.42." },
  { name: "M-12 Man-Portable Mortar", kind: "heavy", skill: "launch_weapons", conceal: 99, ammo: 1, mode: "SS", dmg: "*", wt: 30, avail: "12/14 days", cost: 3000, index: 2, range: "mortar", ammoType: "round", legality: "Forbidden",
    notes: "Bipod-braced man-portable mortar firing dumb rounds, or laser-tracking 'smart' rounds with a spotter's data. Setup 18 turns (3 min); breakdown 18 turns. Up to 2 rounds per Combat Turn. Damage depends on the loaded round (see ff-ammo). Fields of Fire p.44." },
  { name: "ArmTech MGL-12", kind: "heavy", skill: "launch_weapons", conceal: 3, ammo: 12, mode: "SA", dmg: "*", wt: 5.0, avail: "6/36", cost: 2200, index: 3, range: "grenadeLauncher", ammoType: "clip", legality: "Forbidden",
    notes: "Bull-pup multi-grenade launcher; 12-round clip of standard mini-grenades, accurate to 300m. Standard grenade rules (SRII p.96). Recoil modifier +2 (compensation only via gyro-mounts). Accepts targeting + sighting accessories. Damage per grenade (see ff-ammo). Fields of Fire p.47." },
  { name: "ArmTech Mini-6 Grenade Launcher", kind: "heavy", skill: "launch_weapons", conceal: 6, ammo: 6, mode: "SA", dmg: "*", wt: 2.5, avail: "6/36", cost: 1600, index: 3, range: "grenadeLauncher", ammoType: "clip", legality: "Forbidden",
    notes: "Pistol-style version of the MGL-12; 6-round clip of mini-grenades. Standard grenade rules (SRII p.96), recoil modifier +2 (gyro-mount only). Targeting + sighting accessories. Damage per grenade (see ff-ammo). Fields of Fire p.47." },
  { name: "Ares MP Laser III", kind: "heavy", skill: "heavy_weapons", conceal: 99, ammo: 20, mode: "SA", dmg: "15M", wt: 25, avail: "24/21 days", cost: 120000, index: 3, range: "ffSniper", ammoType: "battery", legality: "Forbidden",
    notes: "Self-contained man-portable laser with detachable rapid-swap battery packs. Range via the FF Weapon Range Table (Sniper Rifle row); Power −2 per range band beyond Short. Ignores Ballistic Armor, halves Impact Armor (round down); −1 Damage vs vehicles; smoke −1 Power per 2m. Recoil modifiers don't apply. Fields of Fire p.49." },
  { name: "Ares FireLance Vehicle Laser", kind: "heavy", skill: "gunnery", conceal: 99, ammo: 40, mode: "SA", dmg: "15S", wt: 48, avail: "", cost: 300000, index: "", range: "ffAssault", ammoType: "battery", legality: "Forbidden",
    notes: "Turret-mounted vehicle laser for small/medium vehicles; high recharge rate engages multiple targets, long mean time between failures. Range via the FF Weapon Range Table (Assault Rifle row); Power −2 per band beyond Short. Ignores Ballistic Armor, halves Impact (round down); −1 Damage vs vehicles; smoke −1 Power per 4m. Vehicle-mounted (Gunnery). Availability/Street Index unknown. Fields of Fire p.50." }
];

let n = 0;
for (const w of WEAPONS) {
  const safe = w.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(w.name)}.json`, JSON.stringify(weapon(w), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} weapons`);
