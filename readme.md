# webpack-vue-boilerplate

> kickstart a vue project with a lot of sugar

## Usage

install dependencies like `cd webpack-vue-boilerplate && yarn install`

start dev environment like `npm run watch`

build for production like `npm run build`

> Note: this boilerplate is designed to work at best in an [atom](https://atom.io/) editor environment

### Usage details

#### Installation

##### Use yarn!
Consider using [yarn](https://yarnpkg.com/lang/en/) instead of npm to speed up installation process and keep track of versioning via `yarn.lock`.
The system will work fine also with `npm i` installation command, but why waste time?


#### npm scripts

##### watch
This script will run the build script once and then start a dev server serving the static files (index.html). At the same time webpack will build in memory version of all of the `js` and compiled `css` that will override the static served files. This will allow a faster, more performant frontend dev.


##### build
Tis script will compile webpack by extracting the non `js` resources  (sass, svg, html) and save them as separate files.
Basically the script you want to run before pushign updates


#### webpack configuration

In order to provide a clearer overview of the webpack config this is splitted in three different files, all located at `.webpack/` folder

##### webpack-settings.js

this file contains some general setup for webpack:

- all entry points and folder structure
- aliases for webpack to now where to look for modules

##### webpack-plugins.js

this file manages all the plugins in use for webpack and also decides depending on node environment. Generally speaking environment is used to decide how to run webpack.

##### webpack-config.js

this is the **actual** webpack config which will pull plugins and settings variables from the other files. So consider editing this only if the other two files do not provide you with options.

### Details

#### Vue setup
All vue partials file can be found within the `src/js/vue/` folder, already scaffolded to match atomic design patterns. The only exception is the main vue entry point called `app.vue` and lcoated in the main `src/js/` folder.
Eslint is configured and ready to handle also vue files (as well as webpack, of course)

#### Sass setup
Sass main file located in `src/sass/` will be compiled in memory for the `watch` script, this will allow you to have hot module replacement event for styles. Same as for the `vue/` fodler, sass is scaffolded to match atomic design approach.
When running `build` the css file will be extracted from Js and pi

#### Svg-icons setup
Svg icons can be safely used from an svg sprite with a use tag. You can just drop you icons in `src/svg-icons/` and they will be combined into a sprite.
Please refer to the `src/js/vue/atoms/icon.vue` component to see an example on how to use the sprite.

#### Html
In order to allow a bit of modularity also on HTML generation one entry point file is available in `src/html/index.html`. This file will be compiled and served into the designed distribution folder.
You can use includes, refer to present example: `<%=require('html-loader!./partials/head.html') %>`
