# BalanceText

A jQuery plugin to provide an alternate text wrapping algorithm. I hope to get this into the CSS spec, so it's implemented as a polyfill.

The default text rendering algorithm is:

1. Add 1 word at a time to the current line until the next word won't fit.
2. Break text so that the next word starts on a new line.
3. Repeat until all text has been rendered.

That algorithm guarantees that the text is rendered using the least number of lines, but when text is centered and wraps to more than 1 line, it can produce visually undesirable results such as a long line of centered text followed by a short line of centered text. What I want is for the text to be balanced across lines. By "balanced across lines", I mean that the text is rendered so that the amount of text on each line is about the same. This plugin implements a line-breaking algorithm to do that automatically.

## How it works
Here is a simple Balance Text setup:

```
  <style type="text/css">
  /* Plugin looks for elements with class named "balance-text" */
  .balance-text {
      text-wrap: balanced;  /* Apply (proposed) CSS style */
  }
  </style>

  <script src="jquery-1.8.0.min.js"></script>
  <script src="jquery.balancetext.min.js"></script>
```

See the demo provided or [this online version for a working sample](http://adobe-webplatform.github.io/balance-text/demo/index.html).

Balance Text will *automatically* run on any elements with <code>.balance-text</code> class:

- when the page loads (DOM Ready event)
- when it is resized

You may also *manually* trigger it, e.g. if you're dynamically adding text to the DOM:

```
    $('.my-class').balanceText();
```

You can use any selector of your choice (you may wish to use an ID or restrict the scope for performance). These will re-balance on resize.

If you need to manually re-balance all triggered elements, use:

```
    $.balanceTextUpdate();
```

## Use from a CDN

[//cdnjs.cloudflare.com/ajax/libs/balance-text/1.3.0/jquery.balancetext.min.js](//cdnjs.cloudflare.com/ajax/libs/balance-text/1.3.0/jquery.balancetext.min.js)

[//cdn.jsdelivr.net/jquery.balancetext/1.3.0/jquery.balancetext.min.js](//cdn.jsdelivr.net/jquery.balancetext/1.3.0/jquery.balancetext.min.js)

## Requirements
BalanceText is designed to run in most common browsers and implemented as a jQuery plugin. This means that the standard jQuery library is required for it to work. This plugin was last updated using jQuery 1.8, but it should work with all newer (and some older) versions of jQuery.

jQuery was used so that the code would be easier to write to work in most common browsers. None of the novel ideas introduced by this code require jQuery.

Code is minified using: http://marijnhaverbeke.nl/uglifyjs

## Changelog
* v 1.0.x - Initial Release, bug fix by chrisbank, better break point detection mmcgahan
* v 1.1.0 - Fix bugs submitted by rodneyrehm, colmjude
* v 1.2.x - text-align:justify (hunterjm) line-height (jonathanpatt), right aligned text fix
* v 1.3.x - Debounce resizing events, more accurate space width estimate
* v 1.4.0 - Add support for nested tags (rileyjshaw)
* v 1.5.0 - Re-balance text on resize for manually triggered selectors (rileyjshaw)
* v 1.6.0 - Add balanceTextUpdate() method (rileyjshaw)
