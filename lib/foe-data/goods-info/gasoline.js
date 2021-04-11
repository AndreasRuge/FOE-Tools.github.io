import moment from "dayjs";
import duration from "dayjs/plugin/duration";
import ageData from "../ages.json";
moment.extend(duration);
const age = ageData.ProgressiveEra.key;

export default {
  key: "gasoline",
  age,
  building: {
    resources: {
      coins: 54000,
      supplies: 129000,
    },
    time: moment.duration({ hours: 14, minutes: 50 }),
    size: {
      length: 7,
      width: 4,
    },
    population: 1200,
    connection: 2,
  },
  unrefined: null,
};
