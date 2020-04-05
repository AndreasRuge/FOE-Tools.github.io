const moment = require("moment");
import ageData from "../ages";
const age = ageData.BronzeAge.key;

export default {
  key: "stone",
  age: age,
  building: {
    resources: {
      coins: 340,
      supplies: 490
    },
    time: moment.duration({ minutes: 30 }),
    size: {
      length: 4,
      width: 4
    },
    population: 108,
    connection: 1
  },
  unrefined: null
};
