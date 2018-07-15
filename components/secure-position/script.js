import Utils from "~/scripts/utils";
import gbProcess from "~/scripts/foe-gb-investment";

const i18nPrefix = "components.secure_position.";
const urlPrefix = "sp_";

const queryKey = {
  levelCost: urlPrefix + "lc",
  currentDeposits: urlPrefix + "cd",
  yourParticipation: urlPrefix + "yp",
  otherParticipation: urlPrefix + "op",
  yourArcBonus: urlPrefix + "yab",
  fpTargetReward: urlPrefix + "ftr"
};

const inputComparator = {
  levelCost: { comparator: [">", 0], type: "int" },
  currentDeposits: { comparator: [">=", 0], type: "int" },
  yourParticipation: { comparator: [">=", 0], type: "int" },
  otherParticipation: { comparator: [">=", 0], type: "int" },
  yourArcBonus: { comparator: [">=", 0], type: "float" },
  fpTargetReward: { comparator: [">=", 0], type: "int" }
};

export default {
  name: "SecurePosition",
  props: {
    levelData: {
      type: Object,
      default: null
    },
    canPermalink: {
      type: Boolean,
      default: false
    },
    ns: {
      type: String,
      default: ""
    }
  },
  data() {
    const data = {
      i18nPrefix: i18nPrefix,
      fp: 0,
      yourParticipation: 0,
      otherParticipation: 0,
      levelCost: this.haveInputLevelCost() ? this.$props.levelData.cost : 0,
      currentDeposits: 0,
      yourArcBonus: this.$cookies.get("yourArcBonus") === undefined ? 0 : this.$cookies.get("yourArcBonus"),
      fpTargetReward: 0,
      roi: 0,
      formValid: false,
      errors: {
        levelCost: false,
        currentDeposits: false,
        yourParticipation: false,
        otherParticipation: false,
        yourArcBonus: false,
        fpTargetReward: false
      },
      change: this.haveInputLevelCost()
    };

    Object.assign(data, this.checkQuery());

    this.$store.commit("ADD_URL_QUERY", {
      key: queryKey.levelCost,
      value: data.levelCost,
      ns: this.$props.ns
    });
    this.$store.commit("ADD_URL_QUERY", {
      key: queryKey.currentDeposits,
      value: data.currentDeposits,
      ns: this.$props.ns
    });
    this.$store.commit("ADD_URL_QUERY", {
      key: queryKey.yourParticipation,
      value: data.yourParticipation,
      ns: this.$props.ns
    });
    this.$store.commit("ADD_URL_QUERY", {
      key: queryKey.otherParticipation,
      value: data.otherParticipation,
      ns: this.$props.ns
    });
    this.$store.commit("ADD_URL_QUERY", {
      key: queryKey.yourArcBonus,
      value: data.yourArcBonus,
      ns: this.$props.ns
    });
    this.$store.commit("ADD_URL_QUERY", {
      key: queryKey.fpTargetReward,
      value: data.fpTargetReward,
      ns: this.$props.ns
    });

    return data;
  },
  computed: {
    isPermalink() {
      return this.$store.state.isPermalink;
    },
    permaLink() {
      return {
        path: this.$i18n.path("secure-position/"),
        query: this.$store.getters.getUrlQuery(this.$props.ns)
      };
    }
  },
  watch: {
    levelData(val) {
      this.$data.change = true;
      this.$data.levelCost = val.cost;
    },
    levelCost(val, oldVal) {
      this.$data.change = true;
      if (
        Utils.handlerForm(
          this,
          "levelCost",
          val.length === 0 ? 0 : val,
          oldVal,
          inputComparator.levelCost.comparator
        ) === Utils.FormCheck.VALID
      ) {
        this.$store.commit("UPDATE_URL_QUERY", {
          key: queryKey.levelCost,
          value: val,
          ns: this.$props.ns
        });
        this.calculate();
      }
    },
    currentDeposits(val, oldVal) {
      this.$data.change = true;
      if (
        Utils.handlerForm(
          this,
          "currentDeposits",
          val.length === 0 ? 0 : val,
          oldVal,
          inputComparator.currentDeposits.comparator
        ) === Utils.FormCheck.VALID
      ) {
        this.$store.commit("UPDATE_URL_QUERY", {
          key: queryKey.currentDeposits,
          value: val,
          ns: this.$props.ns
        });
        this.calculate();
      }
    },
    yourParticipation(val, oldVal) {
      this.$data.change = true;
      if (
        Utils.handlerForm(
          this,
          "yourParticipation",
          val.length === 0 ? 0 : val,
          oldVal,
          inputComparator.yourParticipation.comparator
        ) === Utils.FormCheck.VALID
      ) {
        this.$store.commit("UPDATE_URL_QUERY", {
          key: queryKey.yourParticipation,
          value: val,
          ns: this.$props.ns
        });
        this.calculate();
      }
    },
    otherParticipation(val, oldVal) {
      this.$data.change = true;
      if (val === "") {
        this.$data.otherParticipation = 0;
      } else if (
        Utils.handlerForm(
          this,
          "otherParticipation",
          val.length === 0 ? 0 : val,
          oldVal,
          inputComparator.otherParticipation.comparator
        ) === Utils.FormCheck.VALID
      ) {
        this.$store.commit("UPDATE_URL_QUERY", {
          key: queryKey.otherParticipation,
          value: val,
          ns: this.$props.ns
        });
        this.calculate();
      }
    },
    yourArcBonus(val, oldVal) {
      this.$data.change = true;
      if (
        Utils.handlerForm(
          this,
          "yourArcBonus",
          val.length === 0 ? 0 : val,
          oldVal,
          inputComparator.yourArcBonus.comparator,
          !this.isPermalink,
          "/",
          "float"
        ) === Utils.FormCheck.VALID
      ) {
        this.$store.commit("UPDATE_URL_QUERY", {
          key: queryKey.yourArcBonus,
          value: val,
          ns: this.$props.ns
        });
        this.calculate();
      }
    },
    fpTargetReward(val, oldVal) {
      this.$data.change = true;
      if (this.haveInputLevelCost()) {
        if (this.$props.levelData.investment.map(k => k.reward).indexOf(val) >= 0) {
          this.$data.errors.fpTargetReward = false;
          this.$store.commit("UPDATE_URL_QUERY", {
            key: queryKey.fpTargetReward,
            value: val,
            ns: this.$props.ns
          });
          this.calculate();
        } else {
          this.$data.errors.fpTargetReward = true;
        }
      }
      if (
        Utils.handlerForm(
          this,
          "fpTargetReward",
          val.length === 0 ? 0 : val,
          oldVal,
          inputComparator.fpTargetReward.comparator
        ) === Utils.FormCheck.VALID
      ) {
        this.$store.commit("UPDATE_URL_QUERY", {
          key: queryKey.fpTargetReward,
          value: val,
          ns: this.$props.ns
        });
        this.calculate();
      }
    }
  },
  methods: {
    haveInputLevelCost() {
      return this.$props.levelData !== null;
    },

    getNumberOfRemainingPoints() {
      if (
        isNaN(this.$data.levelCost) ||
        isNaN(this.$data.currentDeposits) ||
        this.$data.levelCost - this.$data.currentDeposits < 0
      ) {
        return this.$t("components.secure_position.block_place.unknown");
      }
      return this.$data.levelCost - this.$data.currentDeposits;
    },

    calculate() {
      if (this.$data.change && this.checkFormValid()) {
        const result = gbProcess.ComputeSecurePlace(
          this.$data["levelCost"],
          this.$data["currentDeposits"],
          this.$data["yourParticipation"],
          this.$data["otherParticipation"],
          this.$data["yourArcBonus"],
          this.$data["fpTargetReward"]
        );

        this.$data.fp = result.fp;
        this.$data.roi = result.roi;
      }
    },

    checkFormValid() {
      this.$data.formValid = true;

      this.$data.errors["levelCost"] = false;
      this.$data.errors["currentDeposits"] = false;
      this.$data.errors["yourParticipation"] = false;
      this.$data.errors["otherParticipation"] = false;

      if (
        ((this.$data["levelCost"] === this.$data["currentDeposits"]) === this.$data["yourParticipation"]) ===
          this.$data["otherParticipation"] &&
        this.$data["levelCost"] === 0
      ) {
        return true;
      }

      if (!(this.$data["levelCost"] > 0)) {
        this.$data.formValid = false;
        this.$data.errors["levelCost"] = true;
      }

      if (!(this.$data["currentDeposits"] < this.$data["levelCost"])) {
        this.$data.formValid = false;
        this.$data.errors["levelCost"] = true;
        this.$data.errors["currentDeposits"] = true;
      }

      if (!(this.$data["yourParticipation"] < this.$data["levelCost"])) {
        this.$data.formValid = false;
        this.$data.errors["yourParticipation"] = true;
        this.$data.errors["levelCost"] = true;
      }

      if (!(this.$data["otherParticipation"] < this.$data["levelCost"])) {
        this.$data.formValid = false;
        this.$data.errors["otherParticipation"] = true;
        this.$data.errors["levelCost"] = true;
      }

      if (!(this.$data["yourParticipation"] + this.$data["otherParticipation"] <= this.$data["currentDeposits"])) {
        this.$data.formValid = false;
        this.$data.errors["yourParticipation"] = true;
        this.$data.errors["otherParticipation"] = true;
        this.$data.errors["currentDeposits"] = true;
      }

      return this.$data.formValid;
    },

    haveError(input) {
      return this.$data.errors[input] ? "is-danger" : "";
    },

    submitSecurePosition() {
      let change = Utils.FormCheck.NO_CHANGE;
      let listCheck = true;
      for (let key in inputComparator) {
        let result = Utils.handlerForm(
          this,
          key,
          this.$data[key],
          this.$data[key],
          inputComparator[key].comparator,
          false,
          "",
          inputComparator[key].type
        );
        if (result.state === Utils.FormCheck.VALID) {
          change = listCheck ? Utils.FormCheck.VALID : change;
        } else if (result.state === Utils.FormCheck.INVALID) {
          listCheck = false;
          change = Utils.FormCheck.INVALID;
        }
      }

      if (change !== Utils.FormCheck.INVALID) {
        this.calculate();
      }
    },
    /**
     * Check URL query and return query data
     * @return {Object} Return an object with 'isPermalink' set to False if URI no contains query, otherwise it return
     * an object with corresponding values
     */
    checkQuery() {
      let result = {};
      let change = Utils.FormCheck.NO_CHANGE;
      let tmp;
      for (let key in inputComparator) {
        tmp = Utils.checkFormNumeric(
          this.$route.query[queryKey[key]],
          -1,
          inputComparator[key].comparator,
          inputComparator[key].type
        );
        if (tmp.state === Utils.FormCheck.VALID) {
          change = Utils.FormCheck.VALID;
          result[key] = tmp.value;
        }
      }

      if (change === Utils.FormCheck.VALID) {
        this.$store.commit("IS_PERMALINK", true);
        result.change = true;
      }

      return result;
    }
  },
  mounted() {
    this.calculate();
  }
};
