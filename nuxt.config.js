import { JSDOM } from "jsdom";

import { defaultLocale, supportedLocales } from "./scripts/locales";
import { i18next } from "./scripts/i18n";
import { gbs } from "./lib/foe-data/gbs";
import { bestFacebookLocaleFor } from "facebook-locales";

const extraSeoByPages = {
  gb_investment: {
    en: "gb leveler, gbleveler",
    de: "Rechner, foe arche rechner"
  }
};

/**
 * Return locale based on route
 * @param route {string} Route where get locale
 * @return {string} Renvoie les paramètres régionaux associés à cette route
 */
const getLocale = route => {
  for (let locale of supportedLocales) {
    if (route.indexOf("/" + locale) === 0) {
      return locale;
    }
  }
  return defaultLocale;
};

const getPageKey = path => {
  let result = path.replace(/-/g, "_");
  result = /(\/[a-z]{2})?\/(.*)/.exec(result);
  if (result[2] === "") {
    return ["home"];
  }

  result = result[2].split("/");

  if (result[0] === "gb_investment" && result.length === 1) {
    result[0] = "gb_investment_gb_chooser";
  }

  return result;
};

/**
 * Modify HTML to add some SEO attributes
 * @param page Reference of the page
 * @param locale Current locale
 * @return {string} Return the modified HTML raw
 */
const modifyHtml = (page, locale) => {
  const { window } = new JSDOM(page.html).window;
  const currentURL = hostname + page.route;
  let pageKey = getPageKey(page.route);
  let text;
  let node;
  let tmp;
  let title;
  let description;
  let image;
  let index = 0;

  // Set locale (lang attribute of html tag)
  window.document.querySelector("html").lang = locale;

  // Open Graph image
  node = window.document.createElement("meta");
  node.setAttribute("property", "og:image");
  node.setAttribute("name", "og:image");
  node.setAttribute("hid", "og:image");

  // Set the title
  if (pageKey[0] === "gb_investment") {
    text = i18next.t(`routes.${pageKey[0]}.title`, {
      lng: locale,
      gb_key: "foe_data.gb." + pageKey[1]
    });
    image = `${hostname}/img/foe/gb/${pageKey[1]}.png`;
    node.content = image;
  } else {
    text = i18next.t(`routes.${pageKey[0]}.title`, { lng: locale });
    node.content = `${hostname}/icon.png`;
  }
  title = text;
  window.document.querySelector("title").innerHTML = text;
  window.document.querySelector("head").appendChild(node);

  // Open Graph title
  node = window.document.createElement("meta");
  node.setAttribute("property", "og:title");
  node.setAttribute("name", "og:title");
  node.setAttribute("hid", "og:title");
  node.content = text;
  window.document.querySelector("head").appendChild(node);
  // Open Graph fb:app_id
  node = window.document.createElement("meta");
  node.setAttribute("property", "fb:app_id");
  node.setAttribute("name", "fb:app_id");
  node.setAttribute("hid", "fb:app_id");
  node.content = "2078456229119430";
  window.document.querySelector("head").appendChild(node);
  // Open Graph type
  node = window.document.createElement("meta");
  node.setAttribute("property", "og:type");
  node.setAttribute("name", "og:type");
  node.setAttribute("hid", "og:type");
  node.content = "website";
  window.document.querySelector("head").appendChild(node);
  // Open Graph url
  node = window.document.createElement("meta");
  node.setAttribute("property", "og:url");
  node.setAttribute("name", "og:url");
  node.setAttribute("hid", "og:url");
  node.content = currentURL;
  window.document.querySelector("head").appendChild(node);
  // Open Graph locale
  node = window.document.createElement("meta");
  node.setAttribute("property", "og:locale");
  node.setAttribute("name", "og:locale");
  node.setAttribute("hid", "og:locale");
  node.content = locale === "en" ? "en_US" : bestFacebookLocaleFor(`${locale}_${locale.toUpperCase()}`);
  window.document.querySelector("head").appendChild(node);
  // Twitter card
  node = window.document.createElement("meta");
  node.name = "twitter:card";
  node.content = "app";
  window.document.querySelector("head").appendChild(node);

  // Set meta description
  text = i18next.t(
    [
      `routes.${pageKey[0] === "gb_investment" ? "gb_investment_gb_chooser" : pageKey[0]}.hero.subtitle`,
      "components.site_layout.hero.slogan_html"
    ],
    { lng: locale }
  );
  description = text;
  node = window.document.createElement("p");
  node.innerHTML = text;
  text = node.textContent;
  node = window.document.createElement("meta");
  node.name = "description";
  node.content = text;
  window.document.querySelector("head").appendChild(node);

  // Open Graph description
  node = window.document.createElement("meta");
  node.setAttribute("property", "og:description");
  node.setAttribute("name", "og:description");
  node.setAttribute("hid", "og:description");
  node.content = text;
  window.document.querySelector("head").appendChild(node);

  const customKeyWords = pageKey[0] === "gb_investment_gb_chooser" ? "gb_investment" : pageKey[0];

  // Set keywords
  text = [
    "wiki",
    "faq",
    "foe",
    "forge of empires",
    "tools suite",
    "tool",
    "Arvahall",
    "Brisgard",
    "Cirgard",
    "Dinegu",
    "East-nagach",
    "Fel Dranghyr",
    "Greifental",
    "Houdsmoor",
    "Jaims",
    "Korch",
    "Langendorn",
    "Mount Killmore",
    "Noarsil",
    "Odhrovar",
    "Parkog",
    "Qunrir",
    "Rugnir",
    "Sinerania",
    "Tuulech",
    "Uceria",
    "Beta",
    "upgrade",
    i18next.t("seo.keywords.gb", { lng: locale }),
    i18next.t("seo.keywords.great_building", { lng: locale }),
    i18next.t("seo.keywords.fp", { lng: locale }),
    i18next.t("seo.keywords.forge_point", { lng: locale }),
    i18next.t("seo.keywords.medals", { lng: locale }),
    i18next.t("seo.keywords.military_units", { lng: locale }),
    i18next.t("foe_data.age.NoAge", { lng: locale }),
    i18next.t("foe_data.age.BronzeAge", { lng: locale }),
    i18next.t("foe_data.age.IronAge", { lng: locale }),
    i18next.t("foe_data.age.EarlyMiddleAges", { lng: locale }),
    i18next.t("foe_data.age.HighMiddleAges", { lng: locale }),
    i18next.t("foe_data.age.LateMiddleAges", { lng: locale }),
    i18next.t("foe_data.age.ColonialAge", { lng: locale }),
    i18next.t("foe_data.age.IndustrialAge", { lng: locale }),
    i18next.t("foe_data.age.ProgressiveEra", { lng: locale }),
    i18next.t("foe_data.age.ModernEra", { lng: locale }),
    i18next.t("foe_data.age.PostmodernEra", { lng: locale }),
    i18next.t("foe_data.age.ContemporaryEra", { lng: locale }),
    i18next.t("foe_data.age.Tomorrow", { lng: locale }),
    i18next.t("foe_data.age.TheFuture", { lng: locale }),
    i18next.t("foe_data.age.ArcticFuture", { lng: locale }),
    i18next.t("foe_data.age.OceanicFuture", { lng: locale })
  ].join(", ");
  text +=
    customKeyWords in extraSeoByPages && locale in extraSeoByPages[customKeyWords]
      ? ", " + extraSeoByPages[customKeyWords][locale]
      : "";

  node = window.document.createElement("meta");
  node.name = "keywords";
  node.content = text;
  window.document.querySelector("head").appendChild(node);

  node = window.document.createElement("link");
  node.rel = "canonical";
  node.href = currentURL;
  window.document.querySelector("head").appendChild(node);

  // Set alternatives lang
  for (let supportedLocale of supportedLocales) {
    if (supportedLocale === locale) {
      continue;
    }
    if (locale === defaultLocale) {
      tmp = `/${supportedLocale}${page.route}`;
    } else {
      if (supportedLocale === defaultLocale) {
        if (page.route === `/${locale}/`) {
          tmp = "/";
        } else {
          tmp = page.route.substr(locale.length + 1);
        }
      } else {
        if (page.route === `/${locale}/`) {
          tmp = `/${supportedLocale}/`;
        } else {
          tmp = `/${supportedLocale}${page.route.substr(locale.length + 1)}`;
        }
      }
    }
    node = window.document.createElement("link");
    node.rel = "alternate";
    node.hreflang = supportedLocale;
    node.href = tmp;
    window.document.querySelector("head").appendChild(node);
    // Open Graph locale:alternate
    node = window.document.createElement("meta");
    node.setAttribute("property", "og:locale:alternate");
    node.setAttribute("name", "og:locale:alternate");
    node.setAttribute("hid", "og:locale:alternate");
    node.content =
      supportedLocale === "en" ? "en_US" : bestFacebookLocaleFor(`${supportedLocale}_${supportedLocale.toUpperCase()}`);
    window.document.querySelector("head").appendChild(node);
  }

  // JSON-LD
  tmp = undefined;
  switch (pageKey[0]) {
    case "gb_investment":
      tmp = {
        "@type": "WebApplication",
        name: title,
        description,
        image,
        url: currentURL,
        applicationCategory: "Game",
        operatingSystem: "Any",
        inLanguage: {
          "@type": "Language",
          name: supportedLocales
        }
      };
      break;
    case "gb_investment_gb_chooser":
      tmp = {
        "@type": "ItemList",
        itemListElement: []
      };
      index = 0;
      for (let gbKey in gbs) {
        tmp.itemListElement.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@type": "WebApplication",
            name: i18next.t("routes.gb_investment.title", {
              lng: locale,
              gb_key: "foe_data.gb." + gbKey
            }),
            description,
            image: `${hostname}/img/foe/gb/${gbKey}.png`,
            url: `${currentURL}/${gbKey}`,
            applicationCategory: "Game",
            operatingSystem: "Any",
            inLanguage: {
              "@type": "Language",
              name: supportedLocales
            }
          }
        });
        index++;
      }
      break;
    case "secure_position":
    case "campaign_cost":
    case "cf_calculator":
    case "gb_forecast_cost":
    case "gb_statistics":
    case "trade":
      tmp = {
        "@type": "WebApplication",
        name: title,
        description,
        url: currentURL,
        applicationCategory: "Game",
        operatingSystem: "Any",
        inLanguage: {
          "@type": "Language",
          name: supportedLocales
        }
      };
      break;
  }
  if (tmp && typeof tmp === "object") {
    node = window.document.createElement("script");
    node.setAttribute("type", "application/ld+json");
    node.innerHTML = JSON.stringify({ "@context": "https://schema.org", ...tmp });
    window.document.querySelector("head").appendChild(node);
  }

  return "<!DOCTYPE html>\n" + window.document.querySelector("html").outerHTML;
};

function generateSitemapRoutes(locales, routes) {
  const result = [];
  const baseURL = "";
  const lastmodISO = new Date().toISOString();
  for (let route of routes) {
    let obj = {};
    obj.url = `${baseURL}${route.route}`;
    obj.changefreq = "weekly";
    obj.lastmodISO = lastmodISO;
    const links = [];
    for (let locale of locales) {
      if (locale === defaultLocale) {
        links.push({ lang: locale, url: `${baseURL}${route.route}` });
      } else {
        links.push({ lang: locale, url: `${baseURL}/${locale}${route.route}` });
      }
    }
    obj.links = links;

    result.push(obj);
    for (let subRoute of route.dynamic) {
      let subObj = {};
      subObj.url = `${baseURL}${route.route}/${subRoute}`;
      subObj.changefreq = "weekly";
      subObj.lastmodISO = lastmodISO;
      const links = [];
      for (let locale of locales) {
        if (locale === defaultLocale) {
          links.push({ lang: locale, url: `${baseURL}${route.route}/${subRoute}` });
        } else {
          links.push({ lang: locale, url: `${baseURL}/${locale}${route.route}/${subRoute}` });
        }
      }
      subObj.links = links;

      result.push(subObj);
    }
  }

  return result;
}

function generateRobotTxt(SitemapURL) {
  const result = [{ UserAgent: "*" }];
  let prefix;

  for (let locale of supportedLocales) {
    prefix = locale === defaultLocale ? "" : `/${locale}`;
    result.push({ Disallow: `${prefix}/survey` });
  }

  result.push({ Sitemap: SitemapURL });

  return result;
}

// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        router: {
          base: "/"
        }
      }
    : {};

const hostname = process.env.DEPLOY_ENV === "GH_PAGES" ? "https://foe-tools.github.io" : "";

const defaultRoutes = [
  { route: "/", dynamic: [] },
  { route: "/about", dynamic: [] },
  { route: "/contributors", dynamic: [] },
  { route: "/changelog", dynamic: [] },
  {
    route: "/gb-investment",
    dynamic: Object.keys(gbs),
    payload(gb) {
      return require("./lib/foe-data/gbs-data/" + gb);
    }
  },
  { route: "/secure-position", dynamic: [] },
  { route: "/cf-calculator", dynamic: [] },
  { route: "/gb-statistics", dynamic: [] },
  { route: "/gb-forecast-cost", dynamic: [] },
  { route: "/trade", dynamic: [] },
  { route: "/campaign-cost", dynamic: [] }
];

const sitemap =
  process.env.DEPLOY_ENV === "GH_PAGES"
    ? {
        sitemap: {
          hostname,
          routes: generateSitemapRoutes(supportedLocales, defaultRoutes),
          exclude: ["/survey", "/**/survey"]
        }
      }
    : {};

const apiURL = process.env.DEPLOY_ENV === "GH_PAGES" ? "https://ns382954.ip-5-196-72.eu" : "http://localhost:1337";

module.exports = {
  ...routerBase,
  ...sitemap,

  env: {
    surveyURL: `${apiURL}/surveys`,
    surveySubmitURL: `${apiURL}/surveyresponses`,
    sitekey:
      process.env.DEPLOY_ENV === "GH_PAGES"
        ? "6Le0qqAUAAAAADcXlFuBa9hfCXfdUi53i85sWzSp"
        : "6LdzDKAUAAAAAKVUJf-Po_iaYTdnOzjkvusHF6ie"
  },

  loading: {
    color: "#3498db",
    failedColor: "#e74c3c"
  },

  router: {
    middleware: ["i18next"]
  },
  plugins: [
    { src: "~/plugins/vuex-persist", mode: "client" },
    { src: "~/plugins/clone.js" },
    { src: "~/plugins/i18next.js" },
    { src: "~/plugins/clipboard.js" },
    { src: "~/plugins/numeral-plugin.js" },
    { src: "~/plugins/moment.js" }
  ],
  generate: {
    fallback: true,
    routes: function() {
      let result = [];
      let prefix;
      for (let locale of supportedLocales) {
        prefix = locale === defaultLocale ? "" : `/${locale}`;
        for (let route of defaultRoutes) {
          result.push(prefix + route.route);
          for (let subRoute of route.dynamic) {
            if (route.payload) {
              result.push({
                route: `${prefix}${route.route}/${subRoute}`,
                payload: route.payload(subRoute)
              });
            } else {
              result.push(`${prefix}${route.route}/${subRoute}`);
            }
          }
        }
      }
      return result;
    }
  },

  modules: [
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "cookie-universal-nuxt",
    "@nuxtjs/axios",
    { src: "~/modules/i18next/module.js" },
    { src: "~/modules/buefy/module.js" },
    { src: "~/modules/foe-data/module.js" },
    "@nuxtjs/pwa"
  ],
  robots: generateRobotTxt(`${hostname}/sitemap.xml`),
  buefy: { defaultIconPack: "fas", materialDesignIcons: false },
  mode: "spa",
  hooks(hook) {
    /**
     * This hook will add some SEO attributes for each generated files
     */
    hook("generate:page", page => {
      page.html = modifyHtml(page, getLocale(page.route));
    });
  },

  head: {
    title: "FOE-Tools",
    meta: [
      { charset: "utf-8" },
      {
        hid: "google-site-verification",
        name: "google-site-verification",
        content: "Hw0veaLyPnzkFUmcgHozLpLMGX17y65E_fp5-o2UmbU"
      },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "og:site_name", name: "og:site_name", content: "FOE-Tools" },
      { name: "msapplication-TileColor", content: "#2b5797" },
      { name: "theme-color", content: "#fdf8f0" }
    ],
    script: [
      {
        defer: true,
        src: "https://use.fontawesome.com/releases/v5.0.10/js/all.js",
        integrity: "sha384-slN8GvtUJGnv6ca26v8EzVaR9DC58QEwsIk9q1QXdCU8Yu8ck/tL/5szYlBbqmS+",
        crossorigin: "anonymous"
      },
      {
        defer: true,
        type: "text/javascript",
        src: "//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5c802f960d12380b"
      }
    ]
  },

  pwa: {
    manifest: {
      name: "FOE Tools"
    }
  }
};
