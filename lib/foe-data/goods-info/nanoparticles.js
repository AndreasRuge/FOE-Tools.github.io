const moment = require("moment");
const age = require("../ages").TheFuture.key;

module.exports = {
  key: "nanoparticles",
  age: age,
  building: {
    resources: {
      coins: 220000,
      supplies: 481000
    },
    time: moment.duration({ hours: 15 }),
    size: {
      length: 5,
      width: 5
    },
    population: 3620,
    connection: 2
  },
  unrefined: "steel"
};
