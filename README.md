# Peak Experiential Application Kit (PEAK)

PEAK is based on loosely on the ethos of [Backbone.js](http://backbonejs.com), but has eliminated functionality that is unnecessary in a fully compiled, self contained build. We have extended it to be a full framework supporting multiple languages running on node.js.

## Environment setup

npm falafel currently only supports a very old version of acorn that doesn't work well with [ES2015] files. You'll need to manually bump versions in falafel, and acorn inside node_modules :(

We prefer [Atom](http://atom.io) as our IDE and have provided a number of package and configuration files to help ensure we're all using the same coding standards.

You will need node.js and git to be able to setup, build and run this project.

### Requirements on OS X

On **OS X** it's easy to install if you have [Homebrew]. (if not you should definitely get it!)

````bash
$ brew install nodejs git
````

### Requirements on Ubuntu

Ubuntu is also fairly easy to setup:

````bash
$ sudo apt-get update && sudo apt-get install nodejs git
````

### Requirements on Windows

Windows is a but more difficult to setup due to poor availability of package managers. We strongly recommend upgrading to the most recent version of windows and enabling the new "[Windows Subsystem for Linux](http://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/)"

With this method, you can use the same commands as ubuntu to install your build dependencies:

````bash
$ apt-get update && apt-get install nodejs git
````

## Project setup

After you've cloned the repo, you'll want to also install all the project dependencies. From the project root, run the following command to get up and running.

````bash
$ npm install -g gulp && npm install && apm install --package-file atom-packages.txt
````

## Fundamentals

PEAK is a way of organizing a project as much as it is a helper framework. There are a number of assumptions conventions that will make running the project go very smoothly.

PEAK is built to be a front-end framework that is a quick-start for a page that has some basic needs. We know that, for most sites we need to start with a menu, header, footer and the concept of multiple pages of content. PEAK provides these components pre-built and ready to use.

### Languages

PEAK uses a build system and compiles **[ES2015]**, **[PUG]** & **[Sass]** to Javascript, HTML and CSS respectively, for the site front-end.

We chose **[PUG]** & **[Sass]** because the syntaxes are similar enough that once you've created your **[PUG]** markup, you can mostly copy and paste that code directly to create **[Sass]** code, instantly giving you an identical hierarchy to style against your markup.

### Views

Anything you can interact with, or that is contains dynamic content, should be made into a view. Views are made up of 3 parts distributed into three locations. The file name and folder structure of each location should be identical.

* `js/views` A Javascript Class file that subclasses `_PEAK/View`.
* `/pug` A template that defines the objects in your view (markup).
	* `/pug/static` if your markup will only be included once (something you don't intend to make multiples of), it doesn't need to be made into a dynamic template. Instead, it is rendered and placed at compile-time. We can render multiple passes with multiple copy decks. This is what makes TASK able to support multiple languages, and greatly improves
	* `/pug/dynamic` if your component must be created dynamically with dynamic data, you
* `/sass` A stylesheet that makes it look pretty.

Inside of the `/sass` and `/pug/static` folders there are index files that link to each necessary dependency.

These index files must reference any that define your components.

### Conventions
Inside of the `/js/` folder there are files named `server.js` & `index.js`. The application is spawned (and compiled from) `index.js` while the server is optionally deployable, but mainly intended for development purposes.

Javascript, stylesheets and template files are included for each part of the application, nested in their appropriate folders. Each file tree follows the same basic structure so files that are necessary for different modules are easy to find.

Modules should use a consistent naming scheme throughout the application from the module name itself, to the related sass and pug files, to the classnames and IDs in the HTML itself. A custom node module is included to create new Pages for convenience `$ npm add-page <Pagename>`. This script will create necessary folder structure and add the created files to their relevant index files. Conventionally every word in a Pagenames is capitalized and words are separated by hyphens.

To remove a page from the site you should use `$ npm run add-page <Pagename> -d`.

## Abstract classes

PEAK provides basic MVC components via Abstract Classes in the PEAK folder. They are meant to be subclassed for convenience and framework functionality. To access PEAK classes via `import` or `require()` refer to the `_PEAK` package. ex `import Base from '_PEAK/Base'`

## PEAK Class Structure

### Base
PEAK Components all inherit from the `Base` class which primarily provides the event system ( [backbone-events-standalone] ) and a few utilities.

Extending the prototype of the `Base` class is a convenient way to inject global variables into all PEAK objects.

### Base -> View

Views are used to control pixels on screen, and receive user input.

**TODO:** UPDATE THIS SECTION TO DESCRIBE SPECIAL OBJECTS


## Localization

**TODO:** UPDATE THIS SECTION TO HAVE ACCURATE PATHS TO COPY OBJECT

PEAK supports multiple locales that can be defined by adding sub-folders to the `./data/copy` folder with the locale designation as the folder name. JSON files in this folder will be concatenated and accessible through the `window.GLOBALS.COPY` variable. Each locale must use a consistent variable name structure to ensure that templating works across all locales.

At compile-time each locale has a localized version of the static template files rendered for that locale, accessed to the root of the dist folder. For "en" or "es", you would get: `index.en.html` or `index.es.html`. Additionally, the hero language for the site is copied to `index.html`.

Javascript and CSS are shared between locales. The rendered pages are given a a class to designate their locale `<html class="en">` in order to account for any styling tweaks that need to happen between locales.

## Development & Deployment

You can spin up a local server equipped with livereload and file system watchers by using `$ npm run watch`

Running the `$ gulp` command will build the site and place compiled files into the appropriate domain folders in `/dist`.

There are presently three separate environments available, **dev**, **stage**, and **prod**. These have settings inside `./src/shared/data/env/*.js`. The js files that make up the settings for each environment all are extended from a `default.js` to keep the process as *DRY* as possible.

Simply pass the `$ gulp --env=dev` (or stage or prod) to build the site with the appropriate settings.

[Homebrew]: http://brew.sh
[backbone-events-standalone]: https://www.npmjs.com/package/backbone-events-standalone
[ES2015]: https://babeljs.io/docs/learn-es2015/
[PUG]: http://jade-lang.com
[Sass]: http://sass-lang.com
