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
  <!-- put this at the end of the <body> element -->
  <script src="jquery-1.8.0.min.js"></script>
  <script src="jquery.balancetext.js"></script>
  <script>
    // Call the balanceText plugin on all the elements with the "balance-text" class applied.
    function applyBalanceText() {
      $(".balance-text").balanceText();
    }
	
    applyBalanceText();

    $(window).resize(applyBalanceText);
  </script>
```

See the demo provided for a working sample.


## Requirements
BalanceText is designed to run in most common browsers and implemented as a jQuery plugin. This means that the standard jQuery library is required for it to work.

jQuery was used so that the code would be easier to write to work in most common browsers. None of the novel ideas introduced by this code require jQuery.

## Changelog
* v 1.0 - Initial Release
