# Version 0.0.13

* fix(i18n): 'es', 'da', 'it'
* fix(standard-status): status of unhandled standards is set to 'open'
* fix(Disclaimer): text is fixed

# Version 0.0.12

* fix(attach-document): file attachment is added; 
* fix(android): file viewing

# Version 0.0.11

* replace unsupported `toLocaleString` function with `date-fns` to fix duplicate date insertion in SvSR report; add slash separator in `FIRST NAME / LAST NAME` label
* GNSA-1609 SvSR Translation

# Version 0.0.10

## Fixes

* fix(i18n): de to filters;
* fix(button-icon): margin between button's  icon anf lable is fixed;
* fix(date): 'updated at' date format is fixed;
* fix(standards-navigation): NavigationBetweenStandards.tsx design is fixed;
* fix(android): margin between screen header and content is added;
* fix(android): screen title is moved to center

# Version 0.0.9

## Fixes

* Missing polyfill for `atob` leads to real devices unable to parse JWT token and sign up

# Version 0.0.8

## Fixes

* fix(i18n): translations for filters are added
* fix(upload-svsr): 'language' is added to request params
* GNSA-1776 GNSA-1549 Fixed EPA 4.1.1 Privilege Escalation to Any User
* GNSA-1776 Fixed SCAS2 2.1.1.1 Vulnerable Minimum OS Version Supported (Android)

# Version 0.0.7

## Fixes

* SvSR: Missing cluster overview section
* SvSR: Question options not showing
* SvSR: Comments not showing
* SvSR: Attach partner name, date, city and check confirmation checkboxes
* SvSR: Show error alert if unable to send signed report to email

# Version 0.0.6

## Fixes

* fix(i18n): 'de' locale is added [#57](https://git.daimler.com/GNSA/gnsa-mobile-audit-execution/pull/57)
* multipart upload for SvSR email erroneously uses `fileName` instead of `filename`; navigation to surveys list after signing not working; missing successful signing notification; [#58](https://git.daimler.com/GNSA/gnsa-mobile-audit-execution/pull/58) 
* fix(i18n): duplications are removed; [#48](https://git.daimler.com/GNSA/gnsa-mobile-audit-execution/pull/48)
* fix(android): add photos popover items are clickable now; [#48](https://git.daimler.com/GNSA/gnsa-mobile-audit-execution/pull/48)
* fix(iOS, android): 'add photos' popover position; [#48](https://git.daimler.com/GNSA/gnsa-mobile-audit-execution/pull/48)

# Version 0.0.5

## Fixes

* SvSR signature scroll is broken
* SvSR filters translation breaks filtration login
* Empty SvSR section should not be shown as `false` tokens

# Version 0.0.4

## Fixes

* iOS not generating SvSR
* `Partner's name` field not editable
* missing auditor signature tab
* `Save and upload` button not calling survey uploading and not navigating to survey list

# Version 0.0.3

## Fixes

* fix(i18n): missed UI translations + survey filters fix [#49](https://git.daimler.com/GNSA/gnsa-mobile-audit-execution/pull/49)

# Version 0.0.2

## Fixes

* Signature not able to draw consistent lines on real devices due to conflict with `ScrollView`
* Enable hardware acceleration for `react-native-signature-canvas` on android 

# Version 0.0.1

* Initial release
