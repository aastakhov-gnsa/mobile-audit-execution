# Version 1.2.6

## Fixes

* fixed filters error

# Version 1.2.5

## Fixes

* fixed selected filters string on standards view

# Version 1.2.4

## Fixes

* added ability to choose several filters on standards screen
 
# Version 1.2.3

## Fixes

* added translations to "delete comment" button
* changed "ASR" to "SvSR" naming in report
* changed 'edit comment' button naming

# Version 1.2.2

## Fixes

* fix(evaluation): changing 'open' status to 'in progress' is removed

# Version 1.2.1

## Fixes

* fix(i18n): external comment label

# Version 1.2.0

## Features

* feat(evaluation): ability to reset comment is added;

## Fixes

* fix(svsr): answers column values are fixed; 
* fix(i18n): translation of 'add comment' button is fixed; 
* fix(evaluation): standard name translations are used for NavigationBetweenStandards; 
* fix(svsr): text 'Description: null' is removed from svsr; 
* fix(svsr): auditor's full name
* fix(standard-list): 'in progress' filter is removed; 
* fix(evaluation): 'in progress' status is removed in favor of 'open'; 
* fix(errors): beautified error is displayed in case BusinessError (popup[0]); 
* fix(svsr): 'save and requested' is unlocked in case of an error

# Version 1.1.1

## Fixes

* fix(svsr): email error details are hidden; 
* fix(svsr): upload svsr from auditor tab is enabled; 
* fix(svsr): white screen error is fixed

# Version 1.1.0

## Features

* feat(standards): search bar is added
* feat(survey): gs-code and legal name are added to SurveyCard and AuditDetailsScreen
* feat(evaluation): resetting overrule standard result;

## Fixes

* fix(evaluation): max height of comment text input field is set;
* fix(evaluation): displaying of previously added comment is added to modal window;
* fix(filtering): now filter value could be an array of strings;
* fix(filtering): 'in progress' filter is added
* fix(evaluation): converting numbers to chars;
* fix(i18n): "Reset Overrule" button translations
* fix(svsr): header logo;
* fix(svsr): logo filter title

## Misc

* infrastructure(int): INT tenant configuration is added

# Version 1.0.2

## Fixes

* fix(auth): displaying of auth error is added
* fix(iOS): PROD production_name is added

# Version 1.0.1

## Fixes

* fix(svsr): partner name is sent to BE;
* fix(svsr): keyboardType is set to 'email-address' for emails field

# Version 1.0.0 

## Fixes

* hide internal comment in svsr

## Misc

**Production!** 🥳

# Version 0.0.21

## Fixes

* fix(upload): send 'Open' instead of 'In Progress'
* fix(download): standard's status from 'Open' to 'In progress' is replaced during survey downloading

# Version 0.0.20

## Fixes

* fix(svsr): double sending is prevented
* fix(i18n): 'sv' 'failed' filter

# Version 0.0.19

## Fixes

* fix(i18n): 'cn', 'de', 'fr', 'hu'
* fix(i18n): 'no' is activated as 'nb'
* fix(evaluation): set status 'Open' for not started survey
* fix(svsr): langMapping
* fix(i18n): svsr rest langs

# Version 0.0.18

## Fixes

* fix(android): navigation to LNaT screen is fixed
* fix(i18n): 'In Progress' status translation
* fix(auth): production clientId is added
* fix(i18n): 'fi', 'hu', 'no', 'pl', 'sv', 'th'

# Version 0.0.17

## Fixes

* fix(svsr): one more table is translated; 
* fix(svsr): language code is sent instead of locale code
* fix(logout): sso logout is fixed

# Version 0.0.16

## Fixes

* fix(i18n): de countries fix;
* fix(svsr): content translation are used for svsr;
* fix(i18n): status translation

# Version 0.0.15

## Fixes

* fix(alerts): app version displaying in error alerts
* fix(logout): logout is fixed

## Misc

* iOS minimum version is set to 14.1

# Version 0.0.14

## Fixes

* fix(survey-status): `resultCd` of not completed status must be `Open`;
* fix(i18n): 'pt', 'pt', 'cn', 'fr';

## Misc

* add gnsa-qa.i.daimler.com
* NSAllowsArbitraryLoads is YES
* iOS and Android configuration for production is added

# Version 0.0.13

## Fixes

* fix(i18n): 'es', 'da', 'it'
* fix(standard-status): status of unhandled standards is set to 'open'
* fix(Disclaimer): text is fixed

# Version 0.0.12

## Fixes

* fix(attach-document): file attachment is added; 
* fix(android): file viewing

# Version 0.0.11

## Fixes

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
