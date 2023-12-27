# Sea Battle Paper
<!-- [![Build](https://github.com/valentk777/MyChallenges/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/valentk777/MyChallenges/actions/workflows/main.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=valentk777_ChallengeTracker&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=valentk777_ChallengeTracker)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=valentk777_ChallengeTracker&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=valentk777_ChallengeTracker)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=valentk777_ChallengeTracker&metric=bugs)](https://sonarcloud.io/summary/new_code?id=valentk777_ChallengeTracker)

<a href='https://play.google.com/store/apps/details?id=com.baitupasaulis.MyChallenges&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'>
  <img alt='Get it on Google Play' src='https://github.com/valentk777/MyChallenges/blob/a13b767cb0c3e90c112971bf98efb2ea90462474/Design/Screenshots%20-%20v2/feature%20graphic.jpg'/>
</a>
-->

## What is this?
<div align="left">
  <img alt='Logo' src='https://github.com/valentk777/SeaBattlePaper/blob/f0a422086034b20f818d739c66996d083c1cdf73/Design/Icon%20v1/Icon-v1.png' height="100"  />
This is a mobile app with React Native as a simple alternative for paper version of sea battle. 

Target features:
- [❌] Play with friends with simple private game number
- [❌] Create any form ship (you can make a square with 4 points ship)
- [❌] Rules configuration
- [❌] Anonymous login option (no login)
- [❌] Google login option

</div> 

<!-- ## Screenshots -->

<!-- <div align="center">
  <img alt='screen' src='https://github.com/valentk777/MyChallenges/blob/a13b767cb0c3e90c112971bf98efb2ea90462474/Design/Screenshots%20-%20v2/Screenshot_1696347994.png' height="400" />
  <img alt='screen' src='https://github.com/valentk777/MyChallenges/blob/a13b767cb0c3e90c112971bf98efb2ea90462474/Design/Screenshots%20-%20v2/Screenshot_1696347478.png' height="400" />
  <img alt='screen' src='https://github.com/valentk777/MyChallenges/blob/a13b767cb0c3e90c112971bf98efb2ea90462474/Design/Screenshots%20-%20v2/Screenshot_1696347449.png' height="400" />
  <img alt='screen' src='https://github.com/valentk777/MyChallenges/blob/a13b767cb0c3e90c112971bf98efb2ea90462474/Design/Screenshots%20-%20v2/Screenshot_1696347622.png' height="400" />
  <img alt='screen' src='https://github.com/valentk777/MyChallenges/blob/a13b767cb0c3e90c112971bf98efb2ea90462474/Design/Screenshots%20-%20v2/Screenshot_1696347280.png' height="400" />
</div> -->

## Tech stack:

- Node.Js v18.14.0
- npm 9.8.1
- Java 19.0.2

## Setting up environment:
- `npx react-native info`
- `git lfs install` (used for large files)
- Install Node.Js v18.17.0
- Install Android studio

## Start an app

`npx react-native start --reset-cache`
`npm run android`

## Versioning
https://github.com/gustarus/react-native-version-up
npm run version:up -- --patch
`git tag -a v1.0.X -m 'release 1.0.X: increase versions and build numbers'`
`git commit -m 'release 1.0.X: increase versions and build numbers'`
`git push origin --tags`
<!-- `npm install -g react-native-version`
change version in packages.json. then run command
`react-native-version --never-amend` 

# json to base64 in git bash
cat google-services.json | base64

Icons:
https://www.svgrepo.com/
https://developers.facebook.com/apps/1681157749072450/dashboard/
-->

## Release

### Andoid Play Store
To release an application run this command under 'android' folder
`./gradlew bundleRelease`
Bundle appears in ...\SeaBattlePaper\android\app\build\outputs\bundle\release
<!-- https://play.google.com/console/u/0/developers/6969098457648081136/app-list -->

