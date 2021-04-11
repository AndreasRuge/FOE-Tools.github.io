import moment from "dayjs";
import duration from "dayjs/plugin/duration";
import ageData from "../ages.json";
moment.extend(duration);
const age = ageData.SpaceAgeAsteroidBelt.key;

export default {
  key: "nickel",
  age,
  building: {
    resources: {
      coins: 450000,
      supplies: 900000,
    },
    time: moment.duration(15, "hours"),
    size: {
      length: 3,
      width: 3,
    },
    population: 5640,
    connection: 2,
  },
  unrefined: null,
};
