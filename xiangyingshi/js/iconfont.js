;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-sousuo" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M894.3872 819.013632 655.1552 576.60928c52.4288-55.12704 72.761344-122.871808 72.761344-205.053952 0-169.146368-130.610176-305.958912-298.596352-305.958912-167.962624 0-304.633856 137.617408-304.633856 306.763776 0 169.147392 134.541312 299.305984 302.50496 299.305984 70.132736 0 136.737792-16.780288 188.269568-57.020416l240.959488 244.130816c4.405248 4.451328 10.180608 6.677504 15.954944 6.677504 5.776384 0 15.337472-6.816768 19.739648-11.266048C900.921344 845.33248 903.1936 827.913216 894.3872 819.013632zM172.831744 368.572416c0-140.362752 113.378304-254.498816 252.724224-254.498816 139.368448 0 252.7488 114.136064 252.7488 254.498816 0 140.316672-113.381376 254.49984-252.7488 254.49984C286.210048 623.072256 172.831744 508.889088 172.831744 368.572416z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '<symbol id="icon-fenlei" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M93.696 228.07552h847.17056c6.50752 0 12.2112-2.44736 17.09056-7.32672 4.8896-4.87936 7.32672-10.7776 7.32672-17.69472 0-6.93248-2.43712-12.63104-7.32672-17.09568-4.87936-4.47488-10.57792-6.71232-17.09056-6.71232H93.696c-7.32672 0-13.22496 2.23744-17.70496 6.71232-4.47488 4.48-6.71232 10.17344-6.71232 17.09568 0 6.91712 2.23744 12.81536 6.71232 17.69472 4.48 4.87936 10.37824 7.32672 17.70496 7.32672zM940.86656 816.4352H93.696c-7.32672 0-13.22496 2.44224-17.70496 7.31648-4.47488 4.89472-6.71232 10.58304-6.71232 17.1008 0 6.50752 2.23744 12.20608 6.71232 17.09056 4.48 4.87424 10.37824 7.3216 17.70496 7.3216h847.17056c6.50752 0 12.2112-2.44736 17.09056-7.3216 4.8896-4.88448 7.32672-10.58304 7.32672-17.09056 0-6.51264-2.43712-12.20608-7.32672-17.1008-4.88448-4.87424-10.58304-7.31648-17.09056-7.31648z m0-318.592H93.696c-7.32672 0-13.22496 2.43712-17.70496 7.32672-4.47488 4.87936-6.71232 10.57792-6.71232 17.08544 0 6.50752 2.23744 12.20608 6.71232 17.09056 4.48 4.88448 10.37824 7.32672 17.70496 7.32672h847.17056c6.50752 0 12.2112-2.44224 17.09056-7.32672 4.8896-4.88448 7.32672-10.58304 7.32672-17.09056s-2.43712-12.20608-7.32672-17.08544c-4.88448-4.8896-10.58304-7.32672-17.09056-7.32672z" fill="" ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)