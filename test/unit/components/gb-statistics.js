import { shallowMount } from "@vue/test-utils";
import Component from "../../../components/gb-statistics/GbStatistics";
import { getView } from "../localVue";

const factory = (mocks = {}) => {
  const { localVue, i18n, store } = getView();
  return shallowMount(Component, {
    localVue: localVue,
    i18n,
    store: store,
    stubs: ["router-link"],
    mocks: {
      name: "foo",
      $route: {
        query: {},
      },
      ...mocks,
    },
  });
};

const defaultHidden = () => [
  false,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
  true,
];

let wrapper;

describe("GbStatistics", () => {
  afterEach(() => {
    wrapper.destroy();
    wrapper = null;
  });

  test("Is a Vue instance", () => {
    wrapper = factory();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.isVueInstance()).toBeTruthy();
    });
  });

  test("Initialize with custom values", () => {
    wrapper = factory({
      $route: {
        name: "foo",
        query: {
          gbs_s: "reward_level",
          gbs_f: 10,
          gbs_t: 60,
          gbs_h: `0${"1".repeat(defaultHidden().length - 2)}0`,
        },
      },
    });

    expect(wrapper.vm.statSelector).toBe("reward_level");
    expect(wrapper.vm.$store.get(`urlQuery@["gbs_s"]`)).toBe("reward_level");

    expect(wrapper.vm.from).toBe(10);
    expect(wrapper.vm.errors.from).toBeFalsy();
    expect(wrapper.vm.$store.get(`urlQuery@["gbs_f"]`)).toBe(10);

    expect(wrapper.vm.to).toBe(60);
    expect(wrapper.vm.errors.to).toBeFalsy();
    expect(wrapper.vm.$store.get(`urlQuery@["gbs_t"]`)).toBe(60);

    let value = defaultHidden();
    value[value.length - 1] = false;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.hidden).toEqual(value);
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_h"]`)).toBe(value.map((k) => (k ? 1 : 0)).join(""));
    });
  });

  test('Change "statSelector" value', () => {
    wrapper = factory();
    expect(wrapper.vm.statSelector).toBe("cost_level");
    wrapper.vm.statSelector = "reward_level";
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.statSelector).toBe("reward_level");
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_s"]`)).toBe("reward_level");
    });
  });

  test('Change "statSelector" invalid value', () => {
    wrapper = factory();
    expect(wrapper.vm.statSelector).toBe("cost_level");
    wrapper.vm.statSelector = "foo";
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.statSelector).toBe("foo");
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_s"]`)).toBe("cost_level");
    });
  });

  test('Change "from" value', () => {
    wrapper = factory();
    expect(wrapper.vm.from).toBe(1);
    expect(wrapper.vm.errors.from).toBeFalsy();
    wrapper.vm.from = 42;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.from).toBe(42);
      expect(wrapper.vm.errors.from).toBeFalsy();
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_f"]`)).toBe(42);
    });
  });

  test('Change "from" value with "statSelector" set to "reward_cost"', () => {
    wrapper = factory();
    wrapper.vm.statSelector = "reward_cost";
    expect(wrapper.vm.from).toBe(1);
    expect(wrapper.vm.errors.from).toBeFalsy();
    wrapper.vm.from = 42;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.from).toBe(42);
      expect(wrapper.vm.errors.from).toBeFalsy();
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_f"]`)).toBe(42);
    });
  });

  test('Change "from" value with "statSelector" set to "cost_reward"', () => {
    wrapper = factory();
    const value = 42;
    wrapper.vm.statSelector = "cost_reward";
    expect(wrapper.vm.from).toBe(1);
    expect(wrapper.vm.errors.from).toBeFalsy();
    wrapper.vm.from = value;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.from).toBe(value);
      expect(wrapper.vm.errors.from).toBeFalsy();
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_f"]`)).toBe(value);
    });
  });

  test('Change "from" invalid value', () => {
    wrapper = factory();
    const value = -1;
    expect(wrapper.vm.from).toBe(1);
    expect(wrapper.vm.errors.from).toBeFalsy();
    wrapper.vm.from = value;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.from).toBe(value);
      expect(wrapper.vm.errors.from).toBeTruthy();
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_f"]`)).toBe(1);
    });
  });

  test('Change "from" invalid type', () => {
    wrapper = factory();
    const value = "foo";
    expect(wrapper.vm.from).toBe(1);
    expect(wrapper.vm.errors.from).toBeFalsy();
    wrapper.vm.from = value;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.from).toBe(value);
      expect(wrapper.vm.errors.from).toBeTruthy();
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_f"]`)).toBe(1);
    });
  });

  test('Change "to" value', () => {
    wrapper = factory();
    const value = 42;
    expect(wrapper.vm.to).toBe(80);
    expect(wrapper.vm.errors.to).toBeFalsy();
    wrapper.vm.to = value;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.to).toBe(value);
      expect(wrapper.vm.errors.to).toBeFalsy();
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_t"]`)).toBe(value);
    });
  });

  test('Change "to" invalid value', () => {
    wrapper = factory();
    const value = -1;
    expect(wrapper.vm.to).toBe(80);
    expect(wrapper.vm.errors.to).toBeFalsy();
    wrapper.vm.to = value;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.to).toBe(value);
      expect(wrapper.vm.errors.to).toBeTruthy();
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_t"]`)).toBe(80);
    });
  });

  test('Change "to" invalid type', () => {
    wrapper = factory();
    const value = "foo";
    expect(wrapper.vm.to).toBe(80);
    expect(wrapper.vm.errors.to).toBeFalsy();
    wrapper.vm.to = value;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.to).toBe(value);
      expect(wrapper.vm.errors.to).toBeTruthy();
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_t"]`)).toBe(80);
    });
  });

  test('Change "to" valid value and error with "from"', () => {
    wrapper = factory();
    wrapper.vm.errors.from = 21;
    expect(wrapper.vm.to).toBe(80);
    wrapper.vm.to = 42;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.to).toBe(42);
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_t"]`)).toBe(42);
      expect(wrapper.vm.errors.from).toBeFalsy();
      expect(wrapper.vm.errors.to).toBeFalsy();
    });
  });

  test('Change "hidden" value ', () => {
    wrapper = factory();
    let value = defaultHidden();
    expect(wrapper.vm.hidden).toEqual(value);
    value[value.length - 1] = false;
    wrapper.vm.hidden = value;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.hidden).toEqual(value);
      expect(wrapper.vm.$store.get(`urlQuery@["gbs_h"]`)).toBe(value.map((k) => (k ? 1 : 0)).join(""));
    });
  });

  test('Change "lang" value', async () => {
    wrapper = factory();
    expect(wrapper.vm.graphType.cost_level.title).toBe("Evolution of the cost of the levels according to the levels");

    wrapper.vm.$i18n.locale = "fr";
    wrapper.vm.$store.set("locale", "fr");

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.graphType.cost_level.title).toBe("Évolution du coût des niveaux en fonction des niveaux");
    });
  });

  test("Change visibility of age", () => {
    wrapper = factory();
    let value = defaultHidden();
    expect(wrapper.vm.hidden).toEqual(value);
    wrapper.vm.switchVisibility(wrapper.vm.hidden.length - 1);
    value[value.length - 1] = false;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.hidden).toEqual(value);
    });
  });

  test("Change visibility of age with invalid value", () => {
    wrapper = factory();
    let value = defaultHidden();
    expect(wrapper.vm.hidden).toEqual(value);
    wrapper.vm.switchVisibility(-1);
    expect(wrapper.vm.hidden).toEqual(value);
    wrapper.vm.switchVisibility(wrapper.vm.hidden.length);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.hidden).toEqual(value);
    });
  });
});
