import Vue from "vue";
import { getBestOffersSplitted } from "~/scripts/trade";
import Utils from "~/scripts/utils";

const i18nPrefix = "components.trade.";
const MAX_SPLIT = 1000;

export default {
  name: "trade",
  props: {
    tradeInput: {
      type: Object,
      required: true
    }
  },
  data() {
    const firstElement = Object.keys(this.$props.tradeInput.value)[0];
    return {
      i18nPrefix,
      iHave: firstElement,
      iWant: firstElement,
      iHaveId: "iHave" + this._uid,
      iWantId: "iWant" + this._uid,
      splitValueId: "splitValue" + this._uid,
      splitValue: MAX_SPLIT,
      maxSplitValue: MAX_SPLIT,
      valueId: "iWantValue" + this._uid,
      value: 0,
      result: [],
      errors: {
        iHave: false,
        iWant: false,
        splitValue: false,
        value: false
      },
      warnings: {
        iHave: false,
        iWant: false,
        splitValue: false,
        value: false
      }
    };
  },
  watch: {
    iHave(val) {
      if (Object.keys(this.$props.tradeInput.value).indexOf(val) >= 0) {
        this.$data.errors.iHave = false;
        this.compute();
      } else {
        this.$data.errors.iHave = true;
      }
    },
    iWant(val) {
      if (Object.keys(this.$props.tradeInput.value).indexOf(val) >= 0) {
        this.$data.errors.iWant = false;
        this.compute();
      } else {
        this.$data.errors.iWant = true;
      }
    },
    splitValue(val) {
      if (Utils.inRange(val, 1, MAX_SPLIT)) {
        this.$data.errors.splitValue = false;
        this.compute();
      } else {
        this.$data.errors.splitValue = true;
      }
    },
    value(val) {
      if (val >= 0) {
        if (val <= 1000) {
          this.$data.errors.value = false;
          this.$data.warnings.value = false;
        } else {
          this.$data.errors.value = false;
          this.$data.warnings.value = true;
        }
        this.compute();
      } else {
        this.$data.errors.value = true;
      }
    }
  },
  methods: {
    haveError(key) {
      return this.$data.errors[key] ? "is-danger" : this.$data.warnings[key] ? "is-warning" : "";
    },

    compute() {
      if (this.$data.value === 0) {
        Vue.set(this.$data, "result", []);
      } else {
        Vue.set(
          this.$data,
          "result",
          getBestOffersSplitted(
            this.$props.tradeInput.value,
            this.$data.iHave,
            this.$data.iWant,
            this.$data.value,
            this.$data.splitValue
          )
        );
      }
    }
  }
};
