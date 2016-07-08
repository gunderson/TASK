# Tool Application Starter Kit (TASK)

TASK is based on loosely on the ethos of [Backbone.js](http://backbonejs.com), but has eliminated functionality that is unnecessary in a fully compiled, self contained build. We have extended it to be a full framework supporting multiple languages running on node.js.

## Environment setup

npm falafel currently only supports a very old version of acron that doesn't work well with es6 files. You'll need to manually bump versions in falafel, and acorn inside node_modules :(

We prefer [Atom](http://atom.io) as our IDE and have provided a number of package and configuration files to help ensure we're all using the same coding standards.

You will need node.js and git to be able to setup, build and run this project.

### Requirements on OS X

On **OS X** it's easy to install if you have [Homebrew](http://brew.sh). (if not you should definitely get it!)

````bash
brew install nodejs git
````

### Requirements on Ubuntu

Ubuntu is also fairly easy to setup:

````bash
sudo apt-get update && sudo apt-get install nodejs git
````

### Requirements on Windows

Windows is a but more difficult to setup due to poor availability of package managers. We strongly recommend upgrading to the most recent version of windows and enabling the new "[Windows Subsystem for Linux](http://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/)"

With this method, you can use the same commands as ubuntu to install your build dependencies:

````bash
apt-get update && apt-get install nodejs git
````

## Project setup

After you've cloned the repo, you'll want to also install all the project dependencies. From the project root, run the following command to get up and running.

````bash
npm install -g gulp && npm install && apm install --package-file atom-packages.txt
````

## Fundamentals

Inside of the `/js/` folder there are files named `server.js` & `index.js`. The application is spawned (and compiled from) `index.js` while the server is optionally deployable, but mainly intended for development purposes.

Likewise, inside of the `/sass` and `/pug/static` folders there are index files that will compile all included files at compile-time.

Javascript, stylesheets and template files are included for each part of the application, nested in their appropriate folders. Each file tree follows the same basic structure so files that are necessary for different modules are easy to find.

Modules should use a consistent naming scheme throughout the application from the module name itself, to the related sass and pug files, to the classnames and IDs in the HTML itself. A custom node module is included to create new Pages for convenience `npm add-page pagename`. This script will create necessary folder structure and add the created files to their relevant index files.

**TODO:** add a 'remove page' custom module

## Abstract classes

Abstract classes, located in `./src/TASK` are meant to be subclassed for convenience and framework functionality.

## Localization

**TODO:** UPDATE THIS SECTION TO HAVE ACCURATE PATHS TO COPY OBJECT

TASK supports multiple locales that can be defined by adding sub-folders to the `./data/copy` folder with the locale designation as the folder name. JSON files in this folder will be concatenated and accessible through the `window.GLOBALS.COPY` variable. Each locale must use a consistent variable name structure to ensure that templating works across all locales.

At compile-time each locale has a localized version of the static template files rendered for that locale, accessed to the root of the dist folder. For "en" or "es", you would get: `index.en.html` or `index.es.html`. Additionally, the hero language for the site is copied to `index.html`.

Javascript and CSS are shared between locales. The rendered pages are given a a class to designate their locale `<html class="en">` in order to account for any styling tweaks that need to happen between locales.

## Development & Deployment

You can spin up a local server equipped with livereload and file system watchers by using `$ npm run watch`

Running the `gulp` command will build the site and place compiled files into the appropriate domain folders in `/dist`.

There are presently three separate environments available, **dev**, **stage**, and **prod**. These have settings inside `./src/shared/data/env/*.js`. The js files that make up the settings for each environment all are extended from a `default.js` to keep the process as *DRY* as possible.

Simply pass the `gulp --env=dev` (or stage or prod) to build the site with the appropriate settings.
