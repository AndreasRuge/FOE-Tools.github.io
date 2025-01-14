import { shallowMount } from "@vue/test-utils";
import Component from "../../../components/gb-investment-investors/GbInvestmentInvestors";
import { getView } from "../localVue";
import { gbsData } from "../../../lib/foe-data/gbs";
import { getDefaultStore } from "../utils";

const defaultGb = gbsData.Observatory;
const defaultTo = 10;

const defaultInvestorPercentageGlobal = 90;
const defaultInvestorPercentageCustom = Array.from(new Array(5), () => defaultInvestorPercentageGlobal);

const factory = (propsData = {}, mocks = {}) => {
  const { localVue, store } = getView(getDefaultStore());
  return shallowMount(Component, {
    propsData: {
      gb: defaultGb,
      ...propsData,
    },
    localVue: localVue,
    store: store,
    mocks: {
      $route: {
        name: "foo",
        query: {},
        params: {
          gb: "root",
        },
      },
      ...mocks,
    },
  });
};

let wrapper;

describe("GbInvestmentInvestors", () => {
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

  test("Initialize with URL query", () => {
    const showPlaceValues = [true, true, false, false, false];
    const investorPercentageCustom = [92, 91, 90, 85, 80];
    wrapper = factory(defaultGb, {
      $route: {
        name: "foo",
        query: {
          gbi_f: 10,
          gbi_t: 80,
          gbi_yab: 90,
          gbi_tpic: 0,
          gbi_sp: JSON.stringify(showPlaceValues),
          gbi_cp: 1,
          gbi_pc1: 92,
          gbi_pc2: 91,
          gbi_pc3: 90,
          gbi_pc4: 85,
          gbi_pc5: 80,
        },
        params: {
          gb: "root",
        },
      },
    });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.from).toBe(10);
      expect(wrapper.vm.to).toBe(80);
      expect(wrapper.vm.$data.yourArcBonus).toBe(90);
      expect(wrapper.vm.takingPlaceInConsideration).toBe(0);
      expect(wrapper.vm.$data.investorPercentageCustom).toEqual(investorPercentageCustom);

      expect(wrapper.vm.showPlace).toEqual(showPlaceValues);
    });
  });

  test('Change "from" value', () => {
    wrapper = factory();
    const newValue = 5;
    expect(wrapper.vm.from).toBe(1);
    wrapper.vm.from = newValue;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.from).toBe(newValue);
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_f`)).toBe(newValue);
    });
  });

  test('Change "fromInput" value', () => {
    wrapper = factory();
    const newValue = 5;
    expect(wrapper.vm.fromInput).toBe(0);
    wrapper.vm.fromInput = newValue;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.fromInput).toBe(newValue);
    });
  });

  test('Change "from" invalid value', () => {
    wrapper = factory();
    const newValue = -1;
    expect(wrapper.vm.from).toBe(1);
    wrapper.vm.from = newValue;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.from).toBe(newValue);
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_f`)).toBe(1);
    });
  });

  test('Change "from" invalid type', () => {
    wrapper = factory();
    const newValue = "foo";
    expect(wrapper.vm.from).toBe(1);
    wrapper.vm.from = newValue;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.from).toBe(newValue);
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_f`)).toBe(1);
    });
  });

  test('Change "to" value', () => {
    wrapper = factory();
    const newValue = 5;
    expect(wrapper.vm.to).toBe(defaultTo);
    expect(wrapper.vm.errors.from).toBe(false);
    wrapper.vm.to = newValue;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.to).toBe(newValue);
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_t`)).toBe(newValue);
      expect(wrapper.vm.errors.from).toBe(false);
    });
  });

  test('Change "to" value and from error', () => {
    wrapper = factory();
    const newValue = 15;
    expect(wrapper.vm.to).toBe(defaultTo);
    wrapper.vm.to = 10;
    wrapper.vm.from = wrapper.vm.to + 1;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.errors.from).toBe(true);
      wrapper.vm.to = newValue;
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.to).toBe(newValue);
        expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_t`)).toBe(newValue);
        expect(wrapper.vm.errors.from).toBe(false);
      });
    });
  });

  test('Change "to" invalid value', () => {
    wrapper = factory();
    const newValue = -1;
    expect(wrapper.vm.to).toBe(defaultTo);
    wrapper.vm.to = newValue;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.to).toBe(newValue);
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_t`)).toBe(defaultTo);
    });
  });

  test('Change "to" invalid type', () => {
    wrapper = factory();
    const newValue = "foo";
    expect(wrapper.vm.to).toBe(defaultTo);
    wrapper.vm.to = newValue;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.to).toBe(newValue);
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_t`)).toBe(defaultTo);
    });
  });

  test('Change "customPercentage" value', () => {
    wrapper = factory();
    let newValue = true;
    expect(wrapper.vm.customPercentage).toEqual(false);
    wrapper.vm.customPercentage = newValue;

    wrapper.vm.$nextTick(() => {
      for (let i = 0; i < wrapper.vm.investorPercentageCustom.length; i++) {
        expect(wrapper.vm.investorPercentageCustom[i]).toBe(wrapper.vm.investorPercentageGlobal);
        expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_pc${i + 1}`)).toBe(defaultInvestorPercentageGlobal);
      }

      newValue = false;
      expect(wrapper.vm.customPercentage).toEqual(true);
      wrapper.vm.customPercentage = newValue;

      wrapper.vm.$nextTick(() => {
        for (let i = 0; i < wrapper.vm.investorPercentageCustom.length; i++) {
          expect(wrapper.vm.investorPercentageCustom[i]).toBe(wrapper.vm.investorPercentageGlobal);
          expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_pc${i + 1}`)).toBe(defaultInvestorPercentageGlobal);
        }
      });
    });
  });

  test('Change "investorPercentageGlobal" value', () => {
    wrapper = factory();
    const newValue = 80;
    expect(wrapper.vm.investorPercentageGlobal).toBe(defaultInvestorPercentageGlobal);
    wrapper.vm.investorPercentageGlobal = newValue;

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.investorPercentageGlobal).toBe(newValue);

      for (let i = 0; i < wrapper.vm.investorPercentageCustom.length; i++) {
        expect(wrapper.vm.investorPercentageCustom[i]).toBe(newValue);
      }
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_ipg`)).toBe(newValue);
    });
  });

  test('Change "investorPercentageGlobal" invalid value', () => {
    wrapper = factory();
    const newValue = -1;
    expect(wrapper.vm.investorPercentageGlobal).toBe(defaultInvestorPercentageGlobal);
    wrapper.vm.investorPercentageGlobal = newValue;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.investorPercentageGlobal).toBe(newValue);

      for (let i = 0; i < wrapper.vm.investorPercentageCustom.length; i++) {
        expect(wrapper.vm.investorPercentageCustom[i]).toBe(defaultInvestorPercentageGlobal);
      }
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_ipg`)).toBe(defaultInvestorPercentageGlobal);
    });
  });

  test('Change "investorPercentageGlobal" invalid type', () => {
    wrapper = factory();
    const newValue = "foo";
    expect(wrapper.vm.investorPercentageGlobal).toBe(defaultInvestorPercentageGlobal);
    wrapper.vm.investorPercentageGlobal = newValue;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.investorPercentageGlobal).toBe(newValue);

      for (let i = 0; i < wrapper.vm.investorPercentageCustom.length; i++) {
        expect(wrapper.vm.investorPercentageCustom[i]).toBe(defaultInvestorPercentageGlobal);
      }
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_ipg`)).toBe(defaultInvestorPercentageGlobal);
    });
  });

  test('Change "investorPercentageCustom" value', () => {
    wrapper = factory();
    const newValue = [92, 91, 90, 85, 80];
    expect(wrapper.vm.investorPercentageCustom).toEqual(defaultInvestorPercentageCustom);
    wrapper.vm.investorPercentageCustom = newValue;

    wrapper.vm.$nextTick(() => {
      for (let i = 0; i < wrapper.vm.investorPercentageCustom.length; i++) {
        expect(wrapper.vm.investorPercentageCustom[i]).toBe(newValue[i]);
      }
    });
  });

  test('Change "investorPercentageCustom" invalid value', () => {
    wrapper = factory();
    const newValue = [90, -1, 90, 90, 90];
    expect(wrapper.vm.investorPercentageCustom).toEqual(defaultInvestorPercentageCustom);
    wrapper.vm.investorPercentageCustom = newValue;

    wrapper.vm.$nextTick(() => {
      for (let i = 0; i < wrapper.vm.investorPercentageCustom.length; i++) {
        expect(wrapper.vm.investorPercentageCustom[i]).toBe(newValue[i]);
      }
    });
  });

  test('Change "investorPercentageCustom" invalid type', () => {
    wrapper = factory();
    const newValue = [90, "foo", 90, 90, 90];
    expect(wrapper.vm.investorPercentageCustom).toEqual(defaultInvestorPercentageCustom);
    wrapper.vm.investorPercentageCustom = newValue;

    wrapper.vm.$nextTick(() => {
      for (let i = 0; i < wrapper.vm.investorPercentageCustom.length; i++) {
        expect(wrapper.vm.investorPercentageCustom[i]).toBe(newValue[i]);
      }
    });
  });

  test('Change "takingPlaceInConsideration" value', () => {
    wrapper = factory();
    let newValue = 1;
    expect(wrapper.vm.takingPlaceInConsideration).toBe(0);

    wrapper.vm.takingPlaceInConsideration = newValue;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.takingPlaceInConsideration).toBe(newValue);
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_tpic`)).toBe(newValue);
      newValue = 2;
      wrapper.vm.takingPlaceInConsideration = newValue;
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.takingPlaceInConsideration).toBe(newValue);
        expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_tpic`)).toBe(newValue);
      });
    });
  });

  test('Change "takingPlaceInConsideration" invalid value', () => {
    wrapper = factory();
    const newValue = -1;
    expect(wrapper.vm.takingPlaceInConsideration).toBe(0);
    wrapper.vm.takingPlaceInConsideration = newValue;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.takingPlaceInConsideration).toBe(newValue);
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_tpic`)).toBe(0);
    });
  });

  test('Change "yourArcBonus" value', () => {
    wrapper = factory();
    expect(wrapper.vm.yourArcBonus).toBe(90.6);
    expect(wrapper.vm.errors.yourArcBonus).toBeFalsy();
    wrapper.vm.yourArcBonus = 123;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.yourArcBonus).toBe(123);
      expect(wrapper.vm.errors.yourArcBonus).toBeFalsy();
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_yab`)).toBe(123);
    });
  });

  test('Change "yourArcBonus" invalid value', () => {
    wrapper = factory();
    expect(wrapper.vm.yourArcBonus).toBe(90.6);
    expect(wrapper.vm.errors.yourArcBonus).toBeFalsy();
    wrapper.vm.yourArcBonus = -1;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.yourArcBonus).toBe(-1);
      expect(wrapper.vm.errors.yourArcBonus).toBeTruthy();
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_yab`)).toBe(90.6);
    });
  });

  test('Change "yourArcBonus" invalid type', () => {
    wrapper = factory();
    const invalidValueType = "foo";
    expect(wrapper.vm.yourArcBonus).toBe(90.6);
    expect(wrapper.vm.errors.yourArcBonus).toBeFalsy();
    wrapper.vm.yourArcBonus = invalidValueType;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.yourArcBonus).toBe(invalidValueType);
      expect(wrapper.vm.errors.yourArcBonus).toBeFalsy();
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_yab`)).toBe(90.6);
    });
  });

  test('Change "showPlace" value', () => {
    wrapper = factory();
    let newValue = [true, true, false, false, false];
    expect(wrapper.vm.showPlace).toEqual([true, false, false, false, false]);
    wrapper.vm.showPlace = newValue;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.showPlace).toBe(newValue);
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_sp`)).toEqual(JSON.stringify(newValue));
    });
  });

  test('Call "goTo"', () => {
    wrapper = factory(
      {},
      {
        $router: {
          push: jest.fn(),
        },
      }
    );
    wrapper.vm.goTo("foo");
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$router.push.mock.calls.length).toBe(1);
      expect(wrapper.vm.$router.push.mock.calls[0][0])
        .toEqual("https://test.foe-tools.github.io/{\"name\":\"GbInvestment\",\"params\":{\"gb\":\"foo\"}}");
    });
  });

  test('Call "checkFrom" with empty string', () => {
    wrapper = factory();
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.errors.from).toBe(false);
      expect(wrapper.vm.checkFrom("")).toBe(false);
      expect(wrapper.vm.errors.from).toBe(true);
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_f`)).toBe(1);
    });
  });

  test('Call "checkFrom" with invalid value', () => {
    wrapper = factory();
    const newValue = -1;
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.errors.from).toBe(false);
      expect(wrapper.vm.checkFrom(newValue)).toBe(false);
      expect(wrapper.vm.errors.from).toBe(true);
      expect(wrapper.vm.$store.get(`urlQueryNamespace.gbii.gbi_f`)).toBe(1);
    });
  });
});
