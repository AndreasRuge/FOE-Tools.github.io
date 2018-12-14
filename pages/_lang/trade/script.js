import SimpleTrade from "~/components/simple-trade/SimpleTrade";
import Trade from "~/components/trade/Trade";
import { TradeArrayType, fairTradeArray, simpleTradeArray } from "~/scripts/trade";

const i18nPrefix = "routes.trade.";

export default {
  head() {
    this.$store.commit("SET_HERO", {
      title: i18nPrefix + "hero.title",
      subtitle: i18nPrefix + "hero.subtitle"
    });

    return { title: this.$t(i18nPrefix + "title") };
  },
  data() {
    this.$store.commit("SET_CURRENT_LOCATION", "trade");
    this.$store.commit("RESTORE_HERO");

    return {
      i18nPrefix,
      TradeArrayType,
      tab: 1,
      fairTradeArray,
      simpleTradeArray
    };
  },
  components: {
    SimpleTrade,
    Trade
  }
};
