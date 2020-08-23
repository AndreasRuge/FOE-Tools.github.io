const moment = require("moment");
import ageData from "../ages";
const age = ageData.SpaceAgeMars.key;

export default {
  key: "biotech_crops",
  age: age,
  building: {
    resources: {
      coins: 1750000,
      supplies: 2100000,
    },
    time: moment.duration({ hours: 2 }),
    size: {
      length: 3,
      width: 4,
    },
    population: 817,
    connection: 1,
  },
  unrefined: null,
};
