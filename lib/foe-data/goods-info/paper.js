import moment from "dayjs";
import duration from "dayjs/plugin/duration";
import ageData from "../ages.json";
moment.extend(duration);
const age = ageData.ColonialAge.key;

export default {
  key: "paper",
  age,
  building: {
    resources: {
      coins: 37000,
      supplies: 79000,
    },
    time: moment.duration({ hours: 13, minutes: 30 }),
    size: {
      length: 2,
      width: 3,
    },
    population: 720,
    connection: 1,
  },
  unrefined: null,
};
