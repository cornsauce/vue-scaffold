# vue-scaffold

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![TravisCI Status](https://travis-ci.com/cornsauce/vue-scaffold.svg?branch=dev)](https://travis-ci.com/cornsauce/vue-scaffold)
[![CircleCI Status](https://circleci.com/gh/cornsauce/vue-scaffold/tree/dev.svg?style=svg)]()

An engineering scaffold for Vue

Include these libraries
- `vuex`
- `vue-router`
- `vue-i18n`
- `axios`
- `vue-ioc`

More library supports are coming...

## Directory structure

```
-
|- app/                 # All user's settings should be placed into here
  |- api/               # API definitions
  |- lang/              # The language definitions, all language files should be named as [YOUR_CUSTOMIZE_LOCALE].ts
    |- en-us.ts         # The language for the locale 'en-us'
    |- zh-cn.ts         # The language for the locale 'zh-cn' 
    |- ...
  |- config.ts          # User's configuration for the project
|- core/                # Core support files. You MUST NOT modify them if you're not clear what do these files do. Error operation will lead the program to crash
|- support/             # Vendor supoort files. You MUST NOT modify them if you're not clear what do these files do. Error operation will lead the program to crash
|- store/               # Vuex files
|- router/              # Vue-Router files
|- components/          # Vue components
|- layouts/             # The layouts for the views
|- views/               # View files
|- assets/              # Assets (see 'vue-cli create' command)
|- Entry.vue            # Single page entrypoint view
|- 
|- main.ts              # Program entrypoint
|- *.d.ts               # Typescript declaration files
``` 

PRs welcome!!! Issues welcome!!! The code implementation is so easy to read, but I have no enough time to rich the 
documentations and guides. If you would use the scaffold to initialize your Vue project, you need to read and comprehend 
the source code. Please understand :)

