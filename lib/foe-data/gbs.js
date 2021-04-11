const ages = require("./ages.json");
const Observatory = require("./gbs-data/Observatory").default;
const Temple_of_Relics = require("./gbs-data/Temple_of_Relics").default;
const Oracle_of_Delphi = require("./gbs-data/Oracle_of_Delphi").default;
const Galata_Tower = require("./gbs-data/Galata_Tower").default;
const Tower_of_Babel = require("./gbs-data/Tower_of_Babel").default;
const Statue_of_Zeus = require("./gbs-data/Statue_of_Zeus").default;
const Colosseum = require("./gbs-data/Colosseum").default;
const Lighthouse_of_Alexandria = require("./gbs-data/Lighthouse_of_Alexandria").default;
const Hagia_Sophia = require("./gbs-data/Hagia_Sophia").default;
const Cathedral_of_Aachen = require("./gbs-data/Cathedral_of_Aachen").default;
const St_Mark_s_Basilica = require("./gbs-data/St_Mark_s_Basilica").default;
const Notre_Dame = require("./gbs-data/Notre_Dame").default;
const Saint_Basil_s_Cathedral = require("./gbs-data/Saint_Basil_s_Cathedral").default;
const Castel_del_Monte = require("./gbs-data/Castel_del_Monte").default;
const Deal_Castle = require("./gbs-data/Deal_Castle").default;
const Frauenkirche_of_Dresden = require("./gbs-data/Frauenkirche_of_Dresden").default;
const Capitol = require("./gbs-data/Capitol").default;
const Royal_Albert_Hall = require("./gbs-data/Royal_Albert_Hall").default;
const Chateau_Frontenac = require("./gbs-data/Chateau_Frontenac").default;
const Alcatraz = require("./gbs-data/Alcatraz").default;
const Space_Needle = require("./gbs-data/Space_Needle").default;
const Atomium = require("./gbs-data/Atomium").default;
const Cape_Canaveral = require("./gbs-data/Cape_Canaveral").default;
const The_Habitat = require("./gbs-data/The_Habitat").default;
const Lotus_Temple = require("./gbs-data/Lotus_Temple").default;
const Innovation_Tower = require("./gbs-data/Innovation_Tower").default;
const Truce_Tower = require("./gbs-data/Truce_Tower").default;
const Voyager_V1 = require("./gbs-data/Voyager_V1").default;
const The_Arc = require("./gbs-data/The_Arc").default;
const Rain_Forest_Project = require("./gbs-data/Rain_Forest_Project").default;
const Gaea_Statue = require("./gbs-data/Gaea_Statue").default;
const Arctic_Orangery = require("./gbs-data/Arctic_Orangery").default;
const Seed_Vault = require("./gbs-data/Seed_Vault").default;
const Atlantis_Museum = require("./gbs-data/Atlantis_Museum").default;
const The_Kraken = require("./gbs-data/The_Kraken").default;
const The_Blue_Galaxy = require("./gbs-data/The_Blue_Galaxy").default;
const Terracotta_Army = require("./gbs-data/Terracotta_Army").default;
const Himeji_Castle = require("./gbs-data/Himeji_Castle").default;
const The_Virgo_Project = require("./gbs-data/The_Virgo_Project").default;
const Star_Gazer = require("./gbs-data/Star_Gazer").default;
const Space_Carrier = require("./gbs-data/Space_Carrier").default;
const Flying_Island = require("./gbs-data/Flying_Island").default;

Object.defineProperty(exports, "__esModule", {
  value: true,
});

const gbs = {
  Observatory: { key: "Observatory", age: ages.NoAge.key },
  Temple_of_Relics: { key: "Temple_of_Relics", age: ages.NoAge.key },
  Oracle_of_Delphi: { key: "Oracle_of_Delphi", age: ages.NoAge.key },
  Galata_Tower: { key: "Galata_Tower", age: ages.EarlyMiddleAges.key },
  Tower_of_Babel: { key: "Tower_of_Babel", age: ages.BronzeAge.key },
  Statue_of_Zeus: { key: "Statue_of_Zeus", age: ages.BronzeAge.key },
  Colosseum: { key: "Colosseum", age: ages.IronAge.key },
  Lighthouse_of_Alexandria: {
    key: "Lighthouse_of_Alexandria",
    age: ages.IronAge.key,
  },
  Hagia_Sophia: { key: "Hagia_Sophia", age: ages.EarlyMiddleAges.key },
  Cathedral_of_Aachen: {
    key: "Cathedral_of_Aachen",
    age: ages.EarlyMiddleAges.key,
  },
  St_Mark_s_Basilica: {
    key: "St_Mark_s_Basilica",
    age: ages.HighMiddleAges.key,
  },
  Notre_Dame: { key: "Notre_Dame", age: ages.HighMiddleAges.key },
  Saint_Basil_s_Cathedral: {
    key: "Saint_Basil_s_Cathedral",
    age: ages.LateMiddleAges.key,
  },
  Castel_del_Monte: { key: "Castel_del_Monte", age: ages.LateMiddleAges.key },
  Deal_Castle: { key: "Deal_Castle", age: ages.ColonialAge.key },
  Frauenkirche_of_Dresden: {
    key: "Frauenkirche_of_Dresden",
    age: ages.ColonialAge.key,
  },
  Capitol: { key: "Capitol", age: ages.IndustrialAge.key },
  Royal_Albert_Hall: { key: "Royal_Albert_Hall", age: ages.IndustrialAge.key },
  Chateau_Frontenac: { key: "Chateau_Frontenac", age: ages.ProgressiveEra.key },
  Alcatraz: { key: "Alcatraz", age: ages.ProgressiveEra.key },
  Space_Needle: { key: "Space_Needle", age: ages.ModernEra.key },
  Atomium: { key: "Atomium", age: ages.ModernEra.key },
  Cape_Canaveral: { key: "Cape_Canaveral", age: ages.PostmodernEra.key },
  The_Habitat: { key: "The_Habitat", age: ages.PostmodernEra.key },
  Lotus_Temple: { key: "Lotus_Temple", age: ages.ContemporaryEra.key },
  Innovation_Tower: { key: "Innovation_Tower", age: ages.ContemporaryEra.key },
  Truce_Tower: { key: "Truce_Tower", age: ages.Tomorrow.key },
  Voyager_V1: { key: "Voyager_V1", age: ages.Tomorrow.key },
  The_Arc: { key: "The_Arc", age: ages.TheFuture.key },
  Rain_Forest_Project: { key: "Rain_Forest_Project", age: ages.TheFuture.key },
  Gaea_Statue: { key: "Gaea_Statue", age: ages.ArcticFuture.key },
  Arctic_Orangery: { key: "Arctic_Orangery", age: ages.ArcticFuture.key },
  Seed_Vault: { key: "Seed_Vault", age: ages.ArcticFuture.key },
  Atlantis_Museum: { key: "Atlantis_Museum", age: ages.OceanicFuture.key },
  The_Kraken: { key: "The_Kraken", age: ages.OceanicFuture.key },
  The_Blue_Galaxy: { key: "The_Blue_Galaxy", age: ages.OceanicFuture.key },
  Terracotta_Army: { key: "Terracotta_Army", age: ages.VirtualFuture.key },
  Himeji_Castle: { key: "Himeji_Castle", age: ages.VirtualFuture.key },
  The_Virgo_Project: { key: "The_Virgo_Project", age: ages.SpaceAgeMars.key },
  Star_Gazer: { key: "Star_Gazer", age: ages.SpaceAgeMars.key },
  Space_Carrier: { key: "Space_Carrier", age: ages.SpaceAgeAsteroidBelt.key },
  Flying_Island: { key: "Flying_Island", age: ages.SpaceAgeVenus.key },
};

exports.gbs = gbs;

const gbList = [
  {
    key: "NoAge",
    gbs: ["Observatory", "Temple_of_Relics", "Oracle_of_Delphi"],
  },
  { key: "BronzeAge", gbs: ["Tower_of_Babel", "Statue_of_Zeus"] },
  { key: "IronAge", gbs: ["Colosseum", "Lighthouse_of_Alexandria"] },
  { key: "EarlyMiddleAges", gbs: ["Hagia_Sophia", "Cathedral_of_Aachen", "Galata_Tower"] },
  { key: "HighMiddleAges", gbs: ["St_Mark_s_Basilica", "Notre_Dame"] },
  {
    key: "LateMiddleAges",
    gbs: ["Saint_Basil_s_Cathedral", "Castel_del_Monte"],
  },
  { key: "ColonialAge", gbs: ["Deal_Castle", "Frauenkirche_of_Dresden"] },
  { key: "IndustrialAge", gbs: ["Capitol", "Royal_Albert_Hall"] },
  { key: "ProgressiveEra", gbs: ["Chateau_Frontenac", "Alcatraz"] },
  { key: "ModernEra", gbs: ["Space_Needle", "Atomium"] },
  { key: "PostmodernEra", gbs: ["Cape_Canaveral", "The_Habitat"] },
  { key: "ContemporaryEra", gbs: ["Lotus_Temple", "Innovation_Tower"] },
  { key: "Tomorrow", gbs: ["Truce_Tower", "Voyager_V1"] },
  { key: "TheFuture", gbs: ["The_Arc", "Rain_Forest_Project"] },
  {
    key: "ArcticFuture",
    gbs: ["Gaea_Statue", "Arctic_Orangery", "Seed_Vault"],
  },
  {
    key: "OceanicFuture",
    gbs: ["Atlantis_Museum", "The_Kraken", "The_Blue_Galaxy"],
  },
  { key: "VirtualFuture", gbs: ["Terracotta_Army", "Himeji_Castle"] },
  { key: "SpaceAgeMars", gbs: ["The_Virgo_Project", "Star_Gazer"] },
  { key: "SpaceAgeAsteroidBelt", gbs: ["Space_Carrier"] },
  { key: "SpaceAgeVenus", gbs: ["Flying_Island"] },
];

exports.gbList = gbList;

const gbsData = {
  Observatory,
  Temple_of_Relics,
  Oracle_of_Delphi,
  Galata_Tower,
  Tower_of_Babel,
  Statue_of_Zeus,
  Colosseum,
  Lighthouse_of_Alexandria,
  Hagia_Sophia,
  Cathedral_of_Aachen,
  St_Mark_s_Basilica,
  Notre_Dame,
  Saint_Basil_s_Cathedral,
  Castel_del_Monte,
  Deal_Castle,
  Frauenkirche_of_Dresden,
  Capitol,
  Royal_Albert_Hall,
  Chateau_Frontenac,
  Alcatraz,
  Space_Needle,
  Atomium,
  Cape_Canaveral,
  The_Habitat,
  Lotus_Temple,
  Innovation_Tower,
  Truce_Tower,
  Voyager_V1,
  The_Arc,
  Rain_Forest_Project,
  Gaea_Statue,
  Arctic_Orangery,
  Seed_Vault,
  Atlantis_Museum,
  The_Kraken,
  The_Blue_Galaxy,
  Terracotta_Army,
  Himeji_Castle,
  The_Virgo_Project,
  Star_Gazer,
  Space_Carrier,
  Flying_Island,
};

exports.gbsData = gbsData;

const agesCost = {
  Oracle: [...require("./ages-cost/Oracle"), ...require("./ages-cost/defaultCost")],
  NoAge: [...require("./ages-cost/NoAge"), ...require("./ages-cost/defaultCost")],
  BronzeAge: require("./ages-cost/BronzeAge"),
  IronAge: require("./ages-cost/IronAge"),
  EarlyMiddleAges: require("./ages-cost/EarlyMiddleAges"),
  HighMiddleAges: [...require("./ages-cost/HighMiddleAges"), ...require("./ages-cost/defaultCost")],
  LateMiddleAges: require("./ages-cost/LateMiddleAges"),
  ColonialAge: require("./ages-cost/ColonialAge"),
  IndustrialAge: require("./ages-cost/IndustrialAge"),
  ProgressiveEra: require("./ages-cost/ProgressiveEra"),
  ModernEra: require("./ages-cost/ModernEra"),
  PostmodernEra: require("./ages-cost/PostmodernEra"),
  ContemporaryEra: require("./ages-cost/ContemporaryEra"),
  Tomorrow: require("./ages-cost/Tomorrow"),
  TheFuture: require("./ages-cost/TheFuture"),
  ArcticFuture: require("./ages-cost/ArcticFuture"),
  OceanicFuture: require("./ages-cost/OceanicFuture"),
  VirtualFuture: require("./ages-cost/VirtualFuture"),
  SpaceAgeMars: require("./ages-cost/SpaceAgeMars"),
  SpaceAgeAsteroidBelt: require("./ages-cost/SpaceAgeAsteroidBelt"),
  SpaceAgeVenus: require("./ages-cost/SpaceAgeVenus"),
};

exports.agesCost = agesCost;
