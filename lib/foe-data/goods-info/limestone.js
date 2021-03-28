import moment from "dayjs";
import duration from "dayjs/plugin/duration";
import ageData from "../ages.json";
moment.extend(duration);
const age = ageData.IronAge.key;

export default {
  key: "limestone",
  age,
  building: {
    resources: {
      coins: 1500,
      supplies: 2400,
    },
    time: moment.duration({ hours: 1, minutes: 30 }),
    size: {
      length: 4,
      width: 4,
    },
    population: 230,
    connection: 1,
  },
  unrefined: null,
};
