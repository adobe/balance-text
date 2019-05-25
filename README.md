# BalanceText

A utility to provide an alternate text wrapping algorithm. I hope to get this into the CSS spec, so it's implemented as an optional "polyfill". It already appears in the [CSS Text Module Level 4 Editor's Draft.](https://drafts.csswg.org/css-text-4/#text-wrap)

The default text rendering algorithm is:

1. Add 1 word at a time to the current line until the next word won't fit.
2. Break text so that the next word starts on a new line.
3. Repeat until all text has been rendered.

That algorithm guarantees that the text is rendered using the least number of lines, but when text is centered and wraps to more than 1 line, it can produce visually undesirable results such as a long line of centered text followed by a short line of centered text. What I want is for the text to be balanced across lines. By "balanced across lines", I mean that the text is rendered so that the amount of text on each line is about the same. This plugin implements a line-breaking algorithm to do that automatically.

## How it works
Here is a simple Balance Text setup:

```html
  <style type="text/css">
  /* Plugin looks for elements with class named "balance-text" */
  .balance-text {
      text-wrap: balance;  /* Apply (proposed) CSS style */
  }
  </style>

  <script src="balancetext.min.js"></script>
  <script>
    balanceText();
  </script>
```

See the demo provided or [this online version for a working sample](http://adobe-webplatform.github.io/balance-text/demo/index.html).

If you call `balanceText()`, Balance Text will *automatically* run on any elements with <code>balance-text</code> class:

- when the page loads (DOM Ready event)
- when it is resized

You may also *manually* trigger it, e.g. if you're dynamically adding text to the DOM:

```javascript
    balanceText(el);       // Balance a single element
    balanceText([el, el]); // Balance a list of elements
    balanceText('.el');    // Balance a list of elements based on query selector
```

This will apply the balance-text formatting once.  If you'd like to re-apply automatically during window resize, you can use pass an options parameter instead:

```javascript
    balanceText(el, {watch: true});
```

If you need to manually re-balance all triggered elements, use:

```javascript
    balanceText.updateWatched();
```

## How to use with jQuery
This library used to be implemented as a jQuery plugin (as of v2.0.0) but was re-written as a native utility (as of 3.0.0).  If you'd like to continue using the jQuery interface, you can continue using 2.0.0 (link below).

You can also migrate to `balanceText()` from jQuery using this guide (shown compared to the 2.0.0 interface):
```javascript
    // Put the balanceText utility into "polyfill" mode
    // This was the default mode of the 2.0.0 jQuery plugin when it loaded
    $.ready(function() {
        balanceText(); 
    });

    // manually trigger on a list of elements
    balanceText($('.my-class')); // equivalent to $('.my-class').balanceText();

    // manually trigger on a list of elements and update on browser resize
    balanceText($('.my-class'), {watch: true}); // equivalent to $.balanceText('.my-class');

    // manually re-balance all triggered elements
    balanceText.updateWatched(); // equivalent to $.fn.balanceTextUpdate();

```

## Use from a CDN
[//cdnjs.cloudflare.com/ajax/libs/balance-text/3.3.0/balancetext.min.js](//cdnjs.cloudflare.com/ajax/libs/balance-text/3.3.0/balancetext.min.js)

[//cdn.jsdelivr.net/npm/balance-text@3.3.0/balancetext.min.js](//cdn.jsdelivr.net/npm/balance-text@3.3.0/balancetext.min.js)


### Legacy (2.0.0)
(Has a hard requirement on jQuery)

[//cdnjs.cloudflare.com/ajax/libs/balance-text/2.0.0/jquery.balancetext.min.js](//cdnjs.cloudflare.com/ajax/libs/balance-text/2.0.0/jquery.balancetext.min.js)

[//cdn.jsdelivr.net/jquery.balancetext/2.0.0/jquery.balancetext.min.js](//cdn.jsdelivr.net/jquery.balancetext/2.0.0/jquery.balancetext.min.js)

## Requirements
BalanceText does not have any dependencies.
BalanceText is designed to run in most common browsers.

## Development
### Linting
Make sure the code passes JSLint

```
npm run lint
```

### Minification
We minify using Uglify-JS

```
npm run build
```

### Creating a new Release

1. Pull Request:

    * Add a test
    * Update version numbers: package.json, bower.json
    * Update minifed version, if necessary: balancetext.min.js
    * Update README.md, including links to new not-yet-created CDNs

1. Create new github Release

    * cloudflare CDN is automatically created

1. Update npm

    * `npm publish` (may need to `npm adduser`)
    * jsdeliver CDN is automatically created

1. Update vanity page: gh-pages branch


## Changelog
* v 1.0.x - Initial Release, bug fix by chrisbank, better break point detection mmcgahan
* v 1.1.0 - Fix bugs submitted by rodneyrehm, colmjude
* v 1.2.x - text-align:justify (hunterjm) line-height (jonathanpatt), right aligned text fix
* v 1.3.x - Debounce resizing events, more accurate space width estimate
* v 1.4.0 - Add support for nested tags (rileyjshaw)
* v 1.5.0 - Re-balance text on resize for manually triggered selectors (rileyjshaw)
* v 1.6.x - Add balanceTextUpdate() method (rileyjshaw), bug fixes (bfred-it)
* v 1.7.0 - Hack for partially working with jQuery 3, remove deprecation warning
* v 2.0.0 - Fix automatic updating of custom selectors for jQuery 3 (bfred-it)
* v 3.0.0 - Remove the jQuery dependency (BrianGenisio, bfred-it)
* v 3.1.x - Support for hyphens, white-space:nowrap
* v 3.2.x - Support for unwatch (weotch), non-breaking-space fix (bjnsn)
* v 3.3.0 - Support Server Side rendering (jakimarks)
