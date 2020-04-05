const moment = require("moment");
import ageData from "../ages";
const age = ageData.ContemporaryEra.key;

export default {
  key: "plastics",
  age: age,
  building: {
    resources: {
      coins: 120000,
      supplies: 278000
    },
    time: moment.duration({ hours: 15 }),
    size: {
      length: 4,
      width: 6
    },
    population: 1980,
    connection: 2
  },
  unrefined: "gasoline"
};
