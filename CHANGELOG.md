# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.3.0"></a>
# 2.3.0 (2018-06-10)

*Note: this release note contains old missing commit message.*

### Bug Fixes

* :bug: Fix bad i18n key for permalink in About ([695caf6](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/695caf6)), closes [#31](https://github.com/FOE-Tools/FOE-Tools.github.io/issues/31)
* :bug: Fix bad redirect in english in gb-investment ([83bc37f](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/83bc37f)), closes [#34](https://github.com/FOE-Tools/FOE-Tools.github.io/issues/34)
* :bug: Fix copy button not working on iOS ([0b0c6ab](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/0b0c6ab)), closes [#40](https://github.com/FOE-Tools/FOE-Tools.github.io/issues/40)
* **foe-data:** Fix bad level cost for level 82 of Arctic Future ([ca7d704](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/ca7d704))
* :bug: Fix From input in "Forecast cost GB" ([9b48859](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/9b48859)), closes [#39](https://github.com/FOE-Tools/FOE-Tools.github.io/issues/39)
* :bug: Fix Graph is show in gb-forecast-cost when we estimate a single level bug ([dcc67d7](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/dcc67d7)), closes [#35](https://github.com/FOE-Tools/FOE-Tools.github.io/issues/35)
* :bug: Fix issue in "Forecast cost GB" when "From" input is empty ([9c9b2d6](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/9c9b2d6))
* :bug: Fix table overflow ([297d954](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/297d954)), closes [#33](https://github.com/FOE-Tools/FOE-Tools.github.io/issues/33)
* ArcticFuture corrected reward value for cost 120 ([2892edf](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/2892edf))
* **gb-investment:** :bug: Fix wrong rounding of reward in gb-investment ([5b13f32](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/5b13f32)), closes [#42](https://github.com/FOE-Tools/FOE-Tools.github.io/issues/42)
* **gb-statistics:** :bug: Fix gb-statistcs crash for high levels ([931dd67](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/931dd67))


### Features

* Externalize markdown component and add support of emoji in markdown ([4ce7046](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/4ce7046)), closes [#52](https://github.com/FOE-Tools/FOE-Tools.github.io/issues/52)



<a name="2.2.0"></a>
# 2.2.0 (2018-05-27)

### Bug Fixes

* ArcticFuture corrected reward value for cost 120 ([2892edf](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/2892edf))


### Features

* Externalize markdown component and add support of emoji in markdown ([4ce7046](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/4ce7046)), closes [#52](https://github.com/FOE-Tools/FOE-Tools.github.io/issues/52)



<a name="2.1.2"></a>
## 2.1.2 (2018-05-20)

### Bug Fixes

* **gb-investment:** :bug: Fix wrong rounding of reward in gb-investment ([5b13f32](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/5b13f32)), closes [#42](https://github.com/FOE-Tools/FOE-Tools.github.io/issues/42)
* **gb-statistics:** :bug: Fix gb-statistcs crash for high levels ([931dd67](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/931dd67))

### Chores

- **foe-data**: :package: Add level 81 to 152 of progressive era

### Refactor

- **foe-data**: :recycle: Refactor foe-data

## 2.1.1 (2018-05-09)

- Fix From input in "Forecast cost GB" [9b48859](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/9b488590c44a89c518ad24ece46f5e647fe60851)
- Fix copy button not working on iOS [0b0c6ab](https://github.com/FOE-Tools/FOE-Tools.github.io/commit/0b0c6abd653753c6b27c2a55373666352726f110)

# 2.1.0 (2018-05-06)

- Fix issue in "Forecast cost GB" when "From" input is empty
- Update Tomorrow data, add level 26 to 70


## 2.0.1 (2018-05-06)

- Fix graph is show in "Forecast cost GB" when we estimate a single level
- Fix bad redirect in english in "GB Investment"
- Fix table overflow
- Fix bad i18n key for permalink in "About"

# 2.0.0 (2018-05-05)

This version using [Nuxt.js](https://nuxtjs.org/) (Universal [Vue.js](https://vuejs.org/) Applications).

- Migrate from [Marko](https://markojs.com/) to [Vue](https://vuejs.org/) ([Nuxt](https://nuxtjs.org/))
- Add tool: "GB Statistics"
- Add tool: "Forcast cost GB" and have permalink
- Add information message when an user visited a perma-link to signal that these changes will not be saved in cookies
- Add a cookie disclaimer message
- Add `noscript`  tag to notify users that the site needs JavaScript to work
- Add a switch for each place in GB Investment to add this place in promotion message or not
- Add GB: "The Blue Galaxy"
- Add permalink in "secure place" and "Château Frontenac Calculator"
- Add sub-route by path
- Add meta tags for SEO
- Improve promotion message in GB Investment, add button to automatically copy the message, prefix and suffix input
- Fix bad value for reward of level 52 of Oceanic Future
- Fix cookies expiration
- Fix infinity calculation in "Château Frontenac Calculator"
- Update GB data [#25](https://github.com/FOE-Tools/FOE-Tools.github.io/pull/25)

## 1.5.1 (2018-03-02)

-   Fix cost and rewards of Oracle of Delphi [#24](https://github.com/FOE-Tools/FOE-Tools.github.io/pull/24)

# 1.5.0 (2018-02-22)

- Add changelog page [#21](https://github.com/FOE-Tools/FOE-Tools.github.io/pull/21)
- Add contributor page [#20](https://github.com/FOE-Tools/FOE-Tools.github.io/pull/20)
- Add Chateau Frontenac Calculator [#15](https://github.com/FOE-Tools/FOE-Tools.github.io/pull/15)
- Add support of Russian (by [aviriel](https://github.com/aviriel)) [#14](https://github.com/FOE-Tools/FOE-Tools.github.io/pull/14)
- Add return on investment in secure-position tool [#12](https://github.com/FOE-Tools/FOE-Tools.github.io/pull/12)

# 1.4.0 (2018-02-05)

-   Added support of German (by [Nlossae](https://github.com/Nlossae)) [#6](https://github.com/FOE-Tools/FOE-Tools.github.io/pull/6)
-   Fix selected option in GB select list [#7](https://github.com/FOE-Tools/FOE-Tools.github.io/pull/7)

## 1.3.3 (2018-01-22)

- Fix reward

## 1.3.2 (2018-01-07)

- Fix English translation
- Update French translation

## 1.3.1 (2018-01-06)

- Fix permalink i18n key in about

# 1.3.0 (2018-01-01)

-   Added support of internationalization
-   Added support of English
-   Fix issue with secure position (bad checking for rest of cost of level)

## 1.2.2 (2017-12-23)

- Improve readability of secure-position

## 1.2.1 (2017-12-23)

- Updated home page

# 1.2.0 (2017-12-23)

- Added tool: Secure position (and integrating it to GB Investment)
- Added cookies for improve UX
- Imporved display of GB
- Correction of mistakes in texts
- Prevent bugs (GB Investment and Cookie)

# 1.1.0 (2017-12-22)

- Added a select to switch quickly between GB in GB-Investment
- Added indication for input data in GB-Investment
- Added buttons for running calculation if auto-mode not work
- Updated GB values for Future Era

## 1.0.1 (2017-12-20)

- Add focus on level input
- Add autocomplete to off (because it is useless here)
- Fix trouble with level input on GB-Investment (User can't delete last digit of level input)

# 1.0.0 (2017-12-20)

Initial version of the website.
This version using [Marko](https://markojs.com/).

- home
- about
- GB Investment
