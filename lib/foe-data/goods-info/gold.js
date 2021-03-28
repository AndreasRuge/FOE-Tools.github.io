import moment from "dayjs";
import duration from "dayjs/plugin/duration";
import ageData from "../ages.json";
moment.extend(duration);
const age = ageData.EarlyMiddleAges.key;

export default {
  key: "gold",
  age,
  building: {
    resources: {
      coins: 6000,
      supplies: 10300,
    },
    time: moment.duration({ hours: 3, minutes: 50 }),
    size: {
      length: 4,
      width: 3,
    },
    population: 340,
    connection: 1,
  },
  unrefined: null,
};
