import VueHcaptcha from '@hcaptcha/vue-hcaptcha';
import Utils from "~/scripts/utils";

const i18nPrefix = "routes.survey.";

export default {
  name: "Survey",
  head() {
    this.$store.set("hero", {
      title: i18nPrefix + "hero.title",
      subtitle: i18nPrefix + "hero.subtitle",
    });

    return {
      title: this.$t(i18nPrefix + "title"),
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!vm.$store.get("survey") || vm.$store.get("survey").length === 0) {
        vm.$router.push(this.localePath({ name: "Home" }));
      }
    });
  },
  data() {
    this.$store.commit("RESTORE_HERO");

    return {
      i18nPrefix,
      result: {},
      errors: {},
      loading: false,
    };
  },
  computed: {
    survey() {
      let obj = {
        survey:
          this.$store.get("survey") && this.$store.get("survey").length
            ? this.$store.get("survey@[0].survey.questions")
            : [],
        result: {},
      };
      for (let question of obj.survey) {
        this.$data.errors[question.name] = false;
        if (question.type === "checkbox") {
          obj.result[question.name] = [];
        } else if (question.type === "matrix") {
          obj.result[question.name] = {};
          for (let row of question.rows) {
            obj.result[question.name][row.value] = null;
          }
        } else if (["html"].indexOf(question.type) < 0) {
          obj.result[question.name] = null;
        }
      }

      this.$data.result = obj.result;

      return obj.survey;
    },
    sitekey() {
      return process.env.sitekey;
    },
  },
  methods: {
    getSurveyLocal(locales) {
      return this.$store.get("locale") in locales ? locales[this.$store.get("locale")] : locales["default"];
    },
    getConstraint(question, constraint) {
      return question.validators.filter((k) => constraint in k).map((k) => k[constraint])[0];
    },
    checkCondition(question) {
      if (!question.visibleIf) {
        return true;
      }

      let r;
      const simpleExpression = /{(\w+)}\s*=\s*('?\w+'?)/;
      const containsExpression = /{(\w+)}\s*contains\s*"?'?(\w+)'?"?/;
      const customExpression = /\{([^{]+)\}/g;
      if (simpleExpression.test(question.visibleIf)) {
        r = simpleExpression.exec(question.visibleIf);
        return eval(`${this.$data.result[r[1]]}===${r[2]}`);
      } else if (containsExpression.test(question.visibleIf)) {
        r = containsExpression.exec(question.visibleIf);
        return this.$data.result[r[1]] && this.$data.result[r[1]].indexOf(r[2]) >= 0;
      }

      return eval(
        question.visibleIf.replace(customExpression, (match, text) => {
          return this.$data.result[text] ? `'${this.$data.result[text].replace(/\n/gm, "")}'` : "''";
        })
      );
    },
    callback(key) {
      this.$axios
        .post(process.env.surveySubmitURL, {
          response: {
            response: this.$data.result,
            survey: this.$store.get("survey@[0].id"),
          },
          captcha: key,
        })
        .then(() => {
          // handle success
          this.$data.loading = false;
          this.complete({
            message: this.$t(i18nPrefix + "survey_complete"),
            type: "is-success",
            indefinite: true,
          });
        })
        .catch((error) => {
          // handle error
          this.$data.loading = false;
          if (error.response.status === 400) {
            this.$buefy.notification.open({
              message: this.$t(i18nPrefix + "error"),
              type: "is-danger",
              indefinite: true,
            });
          } else {
            this.$buefy.notification.open({
              message: this.$t(i18nPrefix + "unknown_error"),
              type: "is-danger",
              indefinite: true,
            });
          }
          console.error("error: ", error);
        });
    },

    prepare() {
      let validity = this.$refs.formSurvey.reportValidity();
      if (!validity) {
        return false;
      }
      for (let question of this.survey) {
        this.$data.errors[question.name] = false;
      }

      for (const formFieldName in this.$data.result) {
        const question = this.survey.find((elt) => elt.name === formFieldName);
        if (
          // Check required array
          (this.$data.result[formFieldName] instanceof Array &&
            question.isRequired &&
            this.checkCondition(question) &&
            this.$data.result[formFieldName].length === 0) ||
          // Check other fields
          (this.survey.find((elt) => elt.name === formFieldName).isRequired &&
            this.checkCondition(question) &&
            this.$data.result[formFieldName] === null)
        ) {
          this.$data.errors[formFieldName] = true;
          validity = false;
        } else if (
          typeof this.$data.result[formFieldName] === "object" &&
          question.isRequired &&
          this.checkCondition(question)
        ) {
          // Check required object
          for (let subElt in this.$data.result[formFieldName]) {
            if (this.$data.result[formFieldName][subElt] === null) {
              this.$data.errors[formFieldName] = true;
              validity = false;
              break;
            }
          }
        }
      }
      this.$forceUpdate();

      if (validity) {
        this.$data.loading = true;
        return true;
      }
      return false;
    },
    getErrorMessage(question) {
      return question.isRequired && this.$data.errors[question.name] ? this.$t(i18nPrefix + "required_field") : "";
    },
    complete(notifParams) {
      let result = this.$cookies.get("survey");
      if (!result) {
        result = [];
      }
      result.push(this.$store.get("survey@[0].id"));
      this.$cookies.set("survey", result, {
        path: "/",
        expires: Utils.getDefaultCookieExpireTime(),
      });
      this.$buefy.notification.open(notifParams);
      this.$router.push(this.localePath({ name: "Home" }));
      this.$store.dispatch("nuxtServerInit");
    },
    onExpire() {
      this.$refs.invisibleHcaptcha.reset();
    },
    onSubmit() {
      if (this.prepare()) {
        this.$refs.invisibleHcaptcha.execute();
      }
    }
  },
  components: {
    VueHcaptcha
  }
};
