import { defaultLocale } from "~/scripts/locales";
import { make } from "vuex-pathify";

export const state = () => ({
  cookieDisclaimerDisplayed: false,
  survey: [],
  gbSelectMode: "select",
  fixedMainMenu: true,
  haveReadLocaleInfoAvailable: false,
  customPromotionMessagesTemplates: [],
  displayTableCard: false,
  haveReadTipAboutAddInvestor: false,
  dayNightMode: "day",
  dayStart: "07:00",
  nightStart: "18:30",
  locale: defaultLocale,
  lastVisitVersion: "",
  donationConversion: "",
  currentProfile: "",
  profiles: [],
});

export const mutations = {
  ...make.mutations(state),
};

export const getters = {
  ...make.getters(state),
};
