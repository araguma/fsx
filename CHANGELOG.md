# Changelog

## [1.2.0](https://github.com/araguma/npm-dev-utils/compare/v1.1.1...v1.2.0) (2023-07-18)


### Features

* **concurrent:** Use spawn instead of exec for better logging ([f1a63d1](https://github.com/araguma/npm-dev-utils/commit/f1a63d1e4e9390eed02d6d4340b335756aa6e582))
* **watch:** Implement initial run option ([02cf6c8](https://github.com/araguma/npm-dev-utils/commit/02cf6c8cf801f6af8a4af48764e0b98c7ab0a809))


### Bug Fixes

* **watch:** Fix childProcess not being killed correctly ([2e71fc6](https://github.com/araguma/npm-dev-utils/commit/2e71fc68380343aad1fd216fc5a0a2f0045b9552))
* **watch:** Fix childProcess not being killed correctly ([2313cb8](https://github.com/araguma/npm-dev-utils/commit/2313cb834fb7a0be2dca6c791085bdc9089b856e))

## [1.1.1](https://github.com/araguma/npm-dev-utils/compare/v1.1.0...v1.1.1) (2023-07-17)


### Bug Fixes

* **watch:** Wait for user command to close before restarting ([d0ea3fa](https://github.com/araguma/npm-dev-utils/commit/d0ea3fad22a37dedee915e280fcad5a9c9611fab))

## [1.1.0](https://github.com/araguma/npm-dev-utils/compare/v1.0.1...v1.1.0) (2023-07-16)


### Features

* **watch:** Implement terminate option ([e3ca814](https://github.com/araguma/npm-dev-utils/commit/e3ca814855e0ad21dbe454a146e62501aafa2a20))

## [1.0.1](https://github.com/araguma/npm-dev-utils/compare/v1.0.0...v1.0.1) (2023-07-16)


### Bug Fixes

* Update watch command syntax ([7ec7a9e](https://github.com/araguma/npm-dev-utils/commit/7ec7a9efdba0dc2c7f3bebdf959367e0ad997781))

## 1.0.0 (2023-07-11)


### Features

* Add new watch option to cp command ([fdce41c](https://github.com/araguma/npm-dev-utils/commit/fdce41c79297790331f0e3c9ad21dc23b9249c85))
* Add server command & Remove unused commands ([b2dcc41](https://github.com/araguma/npm-dev-utils/commit/b2dcc41f5ade8cf9bea55ebfd71b5db7011d5725))
* Implement concurrent command ([dffd380](https://github.com/araguma/npm-dev-utils/commit/dffd380c336a497492d8a8176c69c22457af251d))
* Implement mkdir function and command ([6c394fe](https://github.com/araguma/npm-dev-utils/commit/6c394fefe59eba2fb567900a8eec9885bab9ceef))
* Implement watch command ([02f9f03](https://github.com/araguma/npm-dev-utils/commit/02f9f03157a3e4f2f07d7a67e29e3a4d20154d37))
* Improve logging ([b947cbc](https://github.com/araguma/npm-dev-utils/commit/b947cbc51c5efeb07e636999d846abd695e7657e))
* **mkdir:** :sparkles: Add mkdir command ([047900f](https://github.com/araguma/npm-dev-utils/commit/047900f0b372f4dfb8661709e5748ab0e41a2da4))
* **mkdir:** Add mkdir command ([e68700b](https://github.com/araguma/npm-dev-utils/commit/e68700b6dabd4bdd7aab2f844862d56d16777989))
* **mkdir:** Export mkdir function ([1650be3](https://github.com/araguma/npm-dev-utils/commit/1650be35c78c0100bd1af51d6e46a85f34652f90))
* Reimplement rm command ([a09357b](https://github.com/araguma/npm-dev-utils/commit/a09357bd75ed908d98fd44cd3d6b97c3c3078644))
* Remove unused options ([719873f](https://github.com/araguma/npm-dev-utils/commit/719873f49528005d6bf0558942c06d3812338586))
* **watch:** Add watch command ([a2599fd](https://github.com/araguma/npm-dev-utils/commit/a2599fdd5d5d11878ad7c9465b509d47eff82729))


### Bug Fixes

* Fix getFiles incorrectly traversing directories ([7f1c16a](https://github.com/araguma/npm-dev-utils/commit/7f1c16a7174a54a8dada6af44f549ca343c354a5))
* Prevent command stdout from generating additional new line ([8827b89](https://github.com/araguma/npm-dev-utils/commit/8827b89035e6a3fdf214756d1d5872fe60c6a989))


### Performance Improvements

* Use copy-on-write mode ([4469ea9](https://github.com/araguma/npm-dev-utils/commit/4469ea97c885024d5a20afe715e9b818fc512398))
