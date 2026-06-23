// Generate Fields of Fire vehicles & drones into packs-src/ff-vehicles (Actor
// type "vehicle"). Stat blocks from the Field Pack (book p.62-70), verified
// against the page renders. FF stat-block convention: "B/A" = Body/Armor,
// "Handling on/off-road", "Speed cruise/max", "APilot" = Pilot/autopilot rating.
// Re-run, then `npm run build-packs ff-vehicles`.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/ff-vehicles";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("ff-vehicle:" + s).digest("hex").slice(0, 16);

function vehicle(v) {
  const _id = idFor(v.name);
  const img = v.img ?? "icons/svg/explosion.svg";
  return {
    _id, name: v.name, type: "vehicle", img,
    system: {
      vehicleType: v.vtype ?? "ground", skill: v.skill ?? "",
      handling: v.handling, speed: v.speed, acceleration: v.accel ?? 0,
      body: v.body, armor: v.armor, signature: v.sig,
      pilot: v.pilot ?? 0, sensor: v.sensor ?? 0,
      cargo: v.cargo ?? 0, load: v.load ?? 0, seating: v.seating ?? "",
      cost: v.cost ?? 0, availability: v.avail ?? "", autonav: v.autonav ?? 0,
      conditionMonitor: { value: 0, max: 10 },
      notes: v.notes ?? ""
    },
    items: [], effects: [], folder: null, sort: 0, flags: {},
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.0.1", createdTime: 1782000000000, modifiedTime: 1782000000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    prototypeToken: {
      name: v.name, displayName: 0, actorLink: false, width: 1, height: 1,
      texture: { src: img, anchorX: 0.5, anchorY: 0.5, scaleX: 1, scaleY: 1, fit: "contain", tint: "#ffffff" },
      disposition: 0, displayBars: 0
    },
    ownership: { default: 0 }, _key: `!actors!${_id}`
  };
}

const VEHICLES = [
  { name: "Artemis Nightglider", vtype: "aircraft", handling: 3, speed: 60, body: 1, armor: 0, sig: 12, pilot: 1, cargo: 4, load: 400, seating: "1 underslung", cost: 45000,
    notes: "Medium-weight stealth infiltration glider: radar-absorbing mesh skin, low-noise electric turbofan, Effective VTOL. Cruise/max 15/60, Economy 1 PF/km, Power Elec/100, weight 200 kg, 400-kg load. Deploys from two bags; 5 min to assemble/disassemble; optional remote-operations package. Fields of Fire p.62." },
  { name: "GMC MPUV", vtype: "ground", handling: 5, speed: 120, body: 2, armor: 9, sig: 4, pilot: 0, cargo: 10, seating: "2 front buckets + 1 rear bench", cost: 22000,
    notes: "Multi-Purpose Utility Vehicle — the world's most popular light combat vehicle; 4WD, lightly armored against small arms. Handling 5/3, Speed 40/120 (off-road 30/90), Access 2+2, Economy 15 km/L, Fuel Multifuel/100. Accessories: radio transceiver, white-light searchlight, roll bars, roof pintle mount with access hatch; some come with a single hardpoint (weapons not included). Fields of Fire p.63." },

  { name: "Devil Rat APC", vtype: "ground", handling: 5, speed: 75, body: 3, armor: 12, sig: 6, pilot: 2, cargo: 12, seating: "3 crew + 3 benches", cost: 250000,
    notes: "Amphibious armored personnel carrier. Handling 5/3, Speed 25/75 (off-road 15/45, 10/30 in water), Access 3 top hatches + 1 double rear hatch, Economy 2 km/L, Fuel Multifuel/325 L. Comes with telecom system (Rating 0), EnviroSeal, and a small remote turret; weapons, sensors, and ECM/ECCM not included. Fields of Fire p.64." },
  { name: "Striker Light Tank", vtype: "ground", handling: 6, speed: 75, body: 5, armor: 15, sig: 6, pilot: 6, cargo: 5, seating: "3 bucket seats", cost: 480000,
    notes: "Popular light tank. Handling 6/4, Speed 25/75 (off-road 15/45), Access 2 front hatches + 1 turret hatch, Economy 1.5 km/L, Fuel Multifuel/600 L. Comes with telecom system (Rating 0), EnviroSeal, and a medium remote turret; weapons not included. Fields of Fire p.65." },
  { name: "Titan Transport", vtype: "aircraft", handling: 7, speed: 350, body: 3, armor: 4, sig: 4, pilot: 3, cargo: 3000, seating: "2 crew + 3 support", cost: 700000,
    notes: "STOL heavy cargo aircraft. Handling 7, Speed 150/350, Access 1 side hatch + rear ramp, Economy .04, Fuel 180,000 L, Max Range 7,600 km, Combat Radius 1,800 km. Telecom system (Rating 0); weapon mounts, sensors, ECM/ECCM not in standard configuration. Fields of Fire p.66." },
  { name: "Aerodesign Condor II", vtype: "drone", handling: 5, speed: 90, body: 1, armor: 3, sig: 11, pilot: 3, sensor: 1, cargo: 4, seating: "0", cost: 45000,
    notes: "Long-endurance recon drone — the Condor LDSD-23 with long-duration batteries in place of solar cells. Handling 5, Speed 30/90, VSTOL, Economy 5 km/PF, Power 25 PF (duration limited by power), Standard (I) sensor package, set-up 5 min. Remote-control gear; 3 CF free for sensors/ECM-ECCM/control gear. Fields of Fire p.67. (Rigger 2 lists a Condor II LDSD-41 with a slightly different stat block.)" },
  { name: "Steel Lynx", vtype: "drone", handling: 4, speed: 80, body: 4, armor: 12, sig: 5, pilot: 2, sensor: 1, cargo: 20, seating: "0", cost: 15000,
    notes: "Tracked ground combat drone. Handling 4/6, Speed 40/80, Economy 3 km/PF, Power 30 PF (duration limited by power), Standard (I) sensors, set-up 3 min. Remote-control gear; 8 CF free for sensors/ECM-ECCM/control gear/weapons — common fit is a micro-turret mounting an LMG, HVAR, or flechette cannon. Replaceable power pack 3,000¥. Fields of Fire p.68." },
  { name: "Ferret", vtype: "drone", handling: 3, speed: 30, body: 1, armor: 3, sig: 8, pilot: 3, sensor: 1, cargo: 1, seating: "0", cost: 154800,
    notes: "Small security/sentry drone — deploy several to cover acres. Handling 3/5, Speed 10/30, Economy 10 km/PF, Power 10 PF (duration limited by power), Security (I) sensor package, set-up 3 min. Remote-control gear + white-light searchlight; 3 CF free for sensors/ECM-ECCM/control gear; laser designator not included. Fields of Fire p.69." }
];

let n = 0;
for (const v of VEHICLES) {
  const safe = v.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(v.name)}.json`, JSON.stringify(vehicle(v), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} vehicles`);
