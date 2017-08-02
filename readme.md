# webpack-vue-boilerplate

> kickstart a vue project with a lot of sugar

## Usage

install dependencies like `cd webpack-vue-boilerplate && yarn install`

start dev environment like `npm run watch`

build for production like `npm run build`


### Usage details

#### Installation

##### Use yarn!
Consider using [yarn](https://yarnpkg.com/lang/en/) instead of npm to speed up installation process and keep track of versioning via `yarn.lock`.
The system will work fine also with `npm i` installation command, but why waste time?


#### npm scripts

##### watch
This script will run the build script once and then start a dev server serving the static files (index.html). At the same time webpack will build in memory version of all of the `js` and compiled `css` that will override the static served files. This will allow a faster, more performant frontend dev.


##### build
Tis script will compile webpack by extracting the non `js` resources  (sass, svg(tbd)) and save them as separate files.
Basically the script you want to run before pushign updates


### Vue setup
tbd

### Sass setup
tbd

### Svg-icons setup
tbd

### Html
evaluate if it makes sense
