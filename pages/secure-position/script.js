import securePosition from "~/components/secure-position/SecurePosition";

const i18nPrefix = "routes.secure_position.";

export default {
  name: "SecurePosition",
  head() {
    this.$store.set("hero", {
      title: i18nPrefix + "hero.title",
      subtitle: i18nPrefix + "hero.subtitle",
    });

    return { title: this.$t(i18nPrefix + "title") };
  },
  data() {
    return {};
  },
  components: {
    securePosition,
  },
};
