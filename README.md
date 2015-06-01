Famo.us Divider
==============

A simple and cool way to segment your app (any app) into as many rows and columns (bound to hardware limitations) and animate them any way you desire.

That said, I may be doing a tutorial, along with the same functionality with the new Famo.us Engine (that uses WebGL), for performance, usability and features comparisons. This project is in its early stages and still has many things left to do. If something is not working or you would like a new feature, please use the issues page.

## Demo

Click for a simple demo using [one] app in sync across 5 rows and 5 columns: <a href="http://farhadg.github.io/famous-divider/public/" target="_blank">Famo.us Divider</a>.

## Installation

You can simply fork or clone (download); then follow the given commands.

```
  $ git clone https://github.com/FarhadG/famous-divider.git
  $ npm install
  $ npm run start
```

## Usage

Once you've installed all of the dependencies and issued the command `npm run start`, npm will automatically fire up a server at `http://localhost:1337`.

Go to the `src` directory and find `index.js` for the entry file. You will, then, see the simple API to instantiante your app with the Famou.us Divider:

```javascript
/*
 *  The Famo.us Divider instantiation that takes is various
 *  inputs for configuring your app with
 */
var divider = new Divider({
    // Your app
    app: SampleAd,
    // Width and height for the app
    appWidth: window.innerWidth,
    appHeight: window.innerHeight,
    // Controllers that are passed down to keep your app in sync
    transitionables: controllers.transitionables,
    // Number of rows and columns to divide your app
    column: 5,
    row: 5,
    // Debugger view for showing the divides cutout
    debug: true,
    // Sample modifier showing the power of the Famo.us Divider :)
    badass: true
});
```
