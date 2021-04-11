import moment from "dayjs";
import duration from "dayjs/plugin/duration";
import ageData from "../ages.json";
moment.extend(duration);
const age = ageData.ArcticFuture.key;

export default {
  key: "ai_data",
  age,
  building: {
    resources: {
      coins: 293000,
      supplies: 638000,
    },
    time: moment.duration(15, "hours"),
    size: {
      length: 5,
      width: 6,
    },
    population: 5110,
    connection: 2,
  },
  unrefined: "robots",
};
