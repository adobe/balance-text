/*
 * Copyright (c) 2011 Adobe Systems Incorporated. All rights reserved.
 *  
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 *  
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *  
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 * 
 */
/**    
 * jquery.balancetext.js
 *
 * Author: Randy Edmunds
 */

/*jslint vars: true, plusplus: true, devel: true, browser: true, nomen: true, indent: 4, maxerr: 50 */
/*global jQuery: false */

(function ($) {
    "use strict";

    var style = document.documentElement.style,
        hasTextWrap = (style.textWrap   || style.WebktTextWrap || style.MoxTextWrap || style.MsTextWrap || style.OTextWrap);

    $.fn.balanceText = function () {
        if (hasTextWrap) {
            // browser supports text-wrap, so do nothing
            return this;
        } else {
            return this.each(function () {
                var $this = $(this);
        
                function NextWS_params() {
                    this.reset();
                }
                NextWS_params.prototype.reset = function () {
                    this.char = 0;
                    this.width = 0;
                };
                var isWS = function (c) {
                    return (" \t\n\r\v".indexOf(c) !== -1);
                };
                var removeBR = function (s) {
                    return s.replace(/<br\s*\/?>/g, " ");
                };
                var nextWS = function (el, remText, conWidth, desWidth, dir, c, f) {
                    var w = (dir < 0) ? conWidth : 0;
                    var tmpText = "";
                    
                    while ((dir < 0 && w > 0) || (dir > 0 && w < conWidth)) {
                        
                        if (((dir < 0) && (w <= desWidth)) || ((dir > 0) && (w >= desWidth))) {
                            f.char = c;
                            f.width = w;
                            break;
                        }
                        
                        while (isWS(remText.charAt(c)) && (c >= 0)) {
                            c += dir;
                        }
                        while (!isWS(remText.charAt(c)) && (c >= 0)) {
                            c += dir;
                        }
                    
                        tmpText = remText.substr(0, c);
                        el.text(tmpText);
                        w = el.width();
                    }
                };
        
                // reflow() inserts breaks into text to balance text acros multiple lines
                var reflow = function () {
                    
                    var maxTextWidth = 5000;
                    $this.html(removeBR($this.html()));        // strip <br> tags
                    var containerWidth = $this.width();
                    var containerHeight = $this.height();
                    
                    // save settings
                    var oldWS = $this.css('white-space');
                    var oldDisplay = $this.css('display');
        
                    // temporary settings
                    $this.css('white-space', 'nowrap');
                    $this.css('display', 'inline');
        
                    var nowrapWidth = $this.width();
                    var nowrapHeight = $this.height();
        
                    if (containerWidth > 0 &&                  // prevent divide by zero
                            nowrapWidth > containerWidth &&    // text is more than 1 line
                            nowrapWidth < maxTextWidth) {      // text is less than arbitrary limit (make this a param?)
    
                        var remainingText = $this.text();
                        var newText = "";
                        var totLines = Math.round(containerHeight / nowrapHeight);
                        var remLines = totLines;
        
                        // Determine where to break:
                        while (remLines > 1) {
    
                            var desiredWidth = Math.round(nowrapWidth / remLines);
                            var tmpChar = Math.round(remainingText.length / remLines);
                            var finalGT = new NextWS_params();
        
                            // Find any breaking space before desired length
                            nextWS($this, remainingText, containerWidth, desiredWidth, -1, tmpChar, finalGT);
                            tmpChar = finalGT.char;
                            
                            // Find first breaking char after desired length
                            finalGT.reset();
                            nextWS($this, remainingText, containerWidth, desiredWidth, +1, tmpChar, finalGT);
        
                            // Find first breaking char before desired length
                            var finalLT = new NextWS_params();
                            tmpChar = finalGT.char;
                            nextWS($this, remainingText, containerWidth, desiredWidth, -1, tmpChar, finalLT);
        
                            // Bail if no breaking points found
                            if (finalLT.char === 0 && finalGT.char === 0) {
                                break;
                            }
        
                            // Find closest string to desired length
                            var splitChar = 0;
                            if (finalLT.char === 0) {
                                splitChar = finalGT.char;
                            } else if (finalGT.char === 0 || finalLT.char === finalGT.char) {
                                splitChar = finalLT.char;
                            } else {
                                splitChar = (Math.abs(desiredWidth - finalLT.width) < Math.abs(finalGT.width - desiredWidth))
                                                ? finalLT.char : finalGT.char;
                            }
        
                            // Break string
                            newText += remainingText.substr(0, splitChar);
                            newText += "<br/>";
                            remainingText = remainingText.substr(splitChar + 1);
        
                            // update counters
                            remLines--;
                            $this.text(remainingText);
                            nowrapWidth = $this.width();
                        }
        
                        $this.html(newText + remainingText);
                    }
        
                    // restore settings
                    $this.css('display', oldDisplay);
                    $this.css('white-space', oldWS);
                };
                
                // Call once to set.
                reflow();
            });
        }
    };

}(jQuery));
