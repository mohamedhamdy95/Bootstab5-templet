/**
 * lightgallery | 2.2.1 | September 4th 2021
 * http://www.lightgalleryjs.com/
 * Copyright (c) 2020 Sachin Neravath;
 * @license GPLv3
 */

!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t =
        "undefined" != typeof globalThis
          ? globalThis
          : t || self).lightGallery = e());
})(this, function () {
  "use strict";
  var t = function () {
    return (t =
      Object.assign ||
      function (t) {
        for (var e, i = 1, s = arguments.length; i < s; i++)
          for (var n in (e = arguments[i]))
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t;
      }).apply(this, arguments);
  };
  !(function () {
    if ("function" == typeof window.CustomEvent) return !1;
    window.CustomEvent = function (t, e) {
      e = e || { bubbles: !1, cancelable: !1, detail: null };
      var i = document.createEvent("CustomEvent");
      return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i;
    };
  })(),
    Element.prototype.matches ||
      (Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector);
  var e = (function () {
    function t(t) {
      return (
        (this.cssVenderPrefixes = [
          "TransitionDuration",
          "TransitionTimingFunction",
          "Transform",
          "Transition",
        ]),
        (this.selector = this._getSelector(t)),
        (this.firstElement = this._getFirstEl()),
        this
      );
    }
    return (
      (t.generateUUID = function () {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (t) {
            var e = (16 * Math.random()) | 0;
            return ("x" == t ? e : (3 & e) | 8).toString(16);
          }
        );
      }),
      (t.prototype._getSelector = function (t, e) {
        return (
          void 0 === e && (e = document),
          "string" != typeof t
            ? t
            : ((e = e || document),
              "#" === t.substring(0, 1)
                ? e.querySelector(t)
                : e.querySelectorAll(t))
        );
      }),
      (t.prototype._each = function (t) {
        return this.selector
          ? (void 0 !== this.selector.length
              ? [].forEach.call(this.selector, t)
              : t(this.selector, 0),
            this)
          : this;
      }),
      (t.prototype._setCssVendorPrefix = function (t, e, i) {
        var s = e.replace(/-([a-z])/gi, function (t, e) {
          return e.toUpperCase();
        });
        -1 !== this.cssVenderPrefixes.indexOf(s)
          ? ((t.style[s.charAt(0).toLowerCase() + s.slice(1)] = i),
            (t.style["webkit" + s] = i),
            (t.style["moz" + s] = i),
            (t.style["ms" + s] = i),
            (t.style["o" + s] = i))
          : (t.style[s] = i);
      }),
      (t.prototype._getFirstEl = function () {
        return this.selector && void 0 !== this.selector.length
          ? this.selector[0]
          : this.selector;
      }),
      (t.prototype.isEventMatched = function (t, e) {
        var i = e.split(".");
        return t
          .split(".")
          .filter(function (t) {
            return t;
          })
          .every(function (t) {
            return -1 !== i.indexOf(t);
          });
      }),
      (t.prototype.attr = function (t, e) {
        return void 0 === e
          ? this.firstElement
            ? this.firstElement.getAttribute(t)
            : ""
          : (this._each(function (i) {
              i.setAttribute(t, e);
            }),
            this);
      }),
      (t.prototype.find = function (t) {
        return i(this._getSelector(t, this.selector));
      }),
      (t.prototype.first = function () {
        return this.selector && void 0 !== this.selector.length
          ? i(this.selector[0])
          : i(this.selector);
      }),
      (t.prototype.eq = function (t) {
        return i(this.selector[t]);
      }),
      (t.prototype.parent = function () {
        return i(this.selector.parentElement);
      }),
      (t.prototype.get = function () {
        return this._getFirstEl();
      }),
      (t.prototype.removeAttr = function (t) {
        var e = t.split(" ");
        return (
          this._each(function (t) {
            e.forEach(function (e) {
              return t.removeAttribute(e);
            });
          }),
          this
        );
      }),
      (t.prototype.wrap = function (t) {
        if (!this.firstElement) return this;
        var e = document.createElement("div");
        return (
          (e.className = t),
          this.firstElement.parentNode.insertBefore(e, this.firstElement),
          this.firstElement.parentNode.removeChild(this.firstElement),
          e.appendChild(this.firstElement),
          this
        );
      }),
      (t.prototype.addClass = function (t) {
        return (
          void 0 === t && (t = ""),
          this._each(function (e) {
            t.split(" ").forEach(function (t) {
              e.classList.add(t);
            });
          }),
          this
        );
      }),
      (t.prototype.removeClass = function (t) {
        return (
          this._each(function (e) {
            t.split(" ").forEach(function (t) {
              e.classList.remove(t);
            });
          }),
          this
        );
      }),
      (t.prototype.hasClass = function (t) {
        return !!this.firstElement && this.firstElement.classList.contains(t);
      }),
      (t.prototype.hasAttribute = function (t) {
        return !!this.firstElement && this.firstElement.hasAttribute(t);
      }),
      (t.prototype.toggleClass = function (t) {
        return this.firstElement
          ? (this.hasClass(t) ? this.removeClass(t) : this.addClass(t), this)
          : this;
      }),
      (t.prototype.css = function (t, e) {
        var i = this;
        return (
          this._each(function (s) {
            i._setCssVendorPrefix(s, t, e);
          }),
          this
        );
      }),
      (t.prototype.on = function (e, i) {
        var s = this;
        return this.selector
          ? (e.split(" ").forEach(function (e) {
              Array.isArray(t.eventListeners[e]) || (t.eventListeners[e] = []),
                t.eventListeners[e].push(i),
                s.selector.addEventListener(e.split(".")[0], i);
            }),
            this)
          : this;
      }),
      (t.prototype.once = function (t, e) {
        var i = this;
        return (
          this.on(t, function () {
            i.off(t), e(t);
          }),
          this
        );
      }),
      (t.prototype.off = function (e) {
        var i = this;
        return this.selector
          ? (Object.keys(t.eventListeners).forEach(function (s) {
              i.isEventMatched(e, s) &&
                (t.eventListeners[s].forEach(function (t) {
                  i.selector.removeEventListener(s.split(".")[0], t);
                }),
                (t.eventListeners[s] = []));
            }),
            this)
          : this;
      }),
      (t.prototype.trigger = function (t, e) {
        if (!this.firstElement) return this;
        var i = new CustomEvent(t.split(".")[0], { detail: e || null });
        return this.firstElement.dispatchEvent(i), this;
      }),
      (t.prototype.load = function (t) {
        var e = this;
        return (
          fetch(t).then(function (t) {
            e.selector.innerHTML = t;
          }),
          this
        );
      }),
      (t.prototype.html = function (t) {
        return void 0 === t
          ? this.firstElement
            ? this.firstElement.innerHTML
            : ""
          : (this._each(function (e) {
              e.innerHTML = t;
            }),
            this);
      }),
      (t.prototype.append = function (t) {
        return (
          this._each(function (e) {
            "string" == typeof t
              ? e.insertAdjacentHTML("beforeend", t)
              : e.appendChild(t);
          }),
          this
        );
      }),
      (t.prototype.prepend = function (t) {
        return (
          this._each(function (e) {
            e.insertAdjacentHTML("afterbegin", t);
          }),
          this
        );
      }),
      (t.prototype.remove = function () {
        return (
          this._each(function (t) {
            t.parentNode.removeChild(t);
          }),
          this
        );
      }),
      (t.prototype.empty = function () {
        return (
          this._each(function (t) {
            t.innerHTML = "";
          }),
          this
        );
      }),
      (t.prototype.scrollTop = function (t) {
        return void 0 !== t
          ? ((document.body.scrollTop = t),
            (document.documentElement.scrollTop = t),
            this)
          : window.pageYOffset ||
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0;
      }),
      (t.prototype.scrollLeft = function (t) {
        return void 0 !== t
          ? ((document.body.scrollLeft = t),
            (document.documentElement.scrollLeft = t),
            this)
          : window.pageXOffset ||
              document.documentElement.scrollLeft ||
              document.body.scrollLeft ||
              0;
      }),
      (t.prototype.offset = function () {
        if (!this.firstElement) return { left: 0, top: 0 };
        var t = this.firstElement.getBoundingClientRect(),
          e = i("body").style().marginLeft;
        return {
          left: t.left - parseFloat(e) + this.scrollLeft(),
          top: t.top + this.scrollTop(),
        };
      }),
      (t.prototype.style = function () {
        return this.firstElement
          ? this.firstElement.currentStyle ||
              window.getComputedStyle(this.firstElement)
          : {};
      }),
      (t.prototype.width = function () {
        var t = this.style();
        return (
          this.firstElement.clientWidth -
          parseFloat(t.paddingLeft) -
          parseFloat(t.paddingRight)
        );
      }),
      (t.prototype.height = function () {
        var t = this.style();
        return (
          this.firstElement.clientHeight -
          parseFloat(t.paddingTop) -
          parseFloat(t.paddingBottom)
        );
      }),
      (t.eventListeners = {}),
      t
    );
  })();
  function i(t) {
    return new e(t);
  }
  var s = [
    "src",
    "sources",
    "subHtml",
    "subHtmlUrl",
    "html",
    "video",
    "poster",
    "slideName",
    "responsive",
    "srcset",
    "sizes",
    "iframe",
    "downloadUrl",
    "download",
    "width",
    "facebookShareUrl",
    "tweetText",
    "iframeTitle",
    "twitterShareUrl",
    "pinterestShareUrl",
    "pinterestText",
    "fbHtml",
    "disqusIdentifier",
    "disqusUrl",
  ];
  function n(t) {
    return "href" === t
      ? "src"
      : (t = (t =
          (t = t.replace("data-", "")).charAt(0).toLowerCase() +
          t.slice(1)).replace(/-([a-z])/g, function (t) {
          return t[1].toUpperCase();
        }));
  }
  var o = function (t, e, s, n) {
      void 0 === s && (s = 0);
      var o = i(t).attr("data-lg-size") || n;
      if (o) {
        var r = o.split(",");
        if (r[1])
          for (var l = window.innerWidth, a = 0; a < r.length; a++) {
            var g = r[a];
            if (parseInt(g.split("-")[2], 10) > l) {
              o = g;
              break;
            }
            a === r.length - 1 && (o = g);
          }
        var d = o.split("-"),
          h = parseInt(d[0], 10),
          c = parseInt(d[1], 10),
          u = e.width(),
          m = e.height() - s,
          p = Math.min(u, h),
          f = Math.min(m, c),
          v = Math.min(p / h, f / c);
        return { width: h * v, height: c * v };
      }
    },
    r = function (t, e, s, n, o) {
      if (o) {
        var r = i(t).find("img").first();
        if (r.get()) {
          var l = e.get().getBoundingClientRect(),
            a = l.width,
            g = e.height() - (s + n),
            d = r.width(),
            h = r.height(),
            c = r.style(),
            u =
              (a - d) / 2 -
              r.offset().left +
              (parseFloat(c.paddingLeft) || 0) +
              (parseFloat(c.borderLeft) || 0) +
              i(window).scrollLeft() +
              l.left,
            m =
              (g - h) / 2 -
              r.offset().top +
              (parseFloat(c.paddingTop) || 0) +
              (parseFloat(c.borderTop) || 0) +
              i(window).scrollTop() +
              s;
          return (
            "translate3d(" +
            (u *= -1) +
            "px, " +
            (m *= -1) +
            "px, 0) scale3d(" +
            d / o.width +
            ", " +
            h / o.height +
            ", 1)"
          );
        }
      }
    },
    l = function (t, e, i, s) {
      return (
        '<div class="lg-video-cont lg-has-iframe" style="width:' +
        t +
        "; height: " +
        e +
        '">\n                    <iframe class="lg-object" frameborder="0" ' +
        (s ? 'title="' + s + '"' : "") +
        ' src="' +
        i +
        '"  allowfullscreen="true"></iframe>\n                </div>'
      );
    },
    a = function (t, e, i, s, n, o) {
      var r =
          "<img " +
          i +
          " " +
          (s ? 'srcset="' + s + '"' : "") +
          "  " +
          (n ? 'sizes="' + n + '"' : "") +
          ' class="lg-object lg-image" data-index="' +
          t +
          '" src="' +
          e +
          '" />',
        l = "";
      o &&
        (l = ("string" == typeof o ? JSON.parse(o) : o).map(function (t) {
          var e = "";
          return (
            Object.keys(t).forEach(function (i) {
              e += " " + i + '="' + t[i] + '"';
            }),
            "<source " + e + "></source>"
          );
        }));
      return "" + l + r;
    },
    g = function (t) {
      for (var e = [], i = [], s = "", n = 0; n < t.length; n++) {
        var o = t[n].split(" ");
        "" === o[0] && o.splice(0, 1), i.push(o[0]), e.push(o[1]);
      }
      for (var r = window.innerWidth, l = 0; l < e.length; l++)
        if (parseInt(e[l], 10) > r) {
          s = i[l];
          break;
        }
      return s;
    },
    d = function (t) {
      return !!t && !!t.complete && 0 !== t.naturalWidth;
    },
    h = function (t, e, i, s) {
      return (
        '<div class="lg-video-cont ' +
        (s && s.youtube
          ? "lg-has-youtube"
          : s && s.vimeo
          ? "lg-has-vimeo"
          : "lg-has-html5") +
        '" style="' +
        i +
        '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="Play video"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>Play video</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
        (e || "") +
        '\n            <img class="lg-object lg-video-poster" src="' +
        t +
        '" />\n        </div>'
      );
    },
    c = function (t, e, o, r) {
      var l = [],
        a = (function () {
          for (var t = 0, e = 0, i = arguments.length; e < i; e++)
            t += arguments[e].length;
          var s = Array(t),
            n = 0;
          for (e = 0; e < i; e++)
            for (var o = arguments[e], r = 0, l = o.length; r < l; r++, n++)
              s[n] = o[r];
          return s;
        })(s, e);
      return (
        [].forEach.call(t, function (t) {
          for (var e = {}, s = 0; s < t.attributes.length; s++) {
            var g = t.attributes[s];
            if (g.specified) {
              var d = n(g.name),
                h = "";
              a.indexOf(d) > -1 && (h = d), h && (e[h] = g.value);
            }
          }
          var c = i(t),
            u = c.find("img").first().attr("alt"),
            m = c.attr("title"),
            p = r ? c.attr(r) : c.find("img").first().attr("src");
          (e.thumb = p),
            o && !e.subHtml && (e.subHtml = m || u || ""),
            (e.alt = u || m || ""),
            l.push(e);
        }),
        l
      );
    },
    u = function () {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    },
    m = {
      mode: "lg-slide",
      easing: "ease",
      speed: 400,
      licenseKey: "0000-0000-000-0000",
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 300,
      container: document.body,
      startAnimationDuration: 400,
      zoomFromOrigin: !0,
      hideBarsDelay: 0,
      showBarsAfter: 1e4,
      slideDelay: 0,
      supportLegacyBrowser: !0,
      allowMediaOverlap: !1,
      videoMaxSize: "1280-720",
      defaultCaptionHeight: 0,
      ariaLabelledby: "",
      ariaDescribedby: "",
      closable: !0,
      swipeToClose: !0,
      closeOnTap: !0,
      showCloseIcon: !0,
      showMaximizeIcon: !1,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      controls: !0,
      slideEndAnimation: !0,
      hideControlOnEnd: !1,
      mousewheel: !1,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 2,
      numberOfSlideItemsInDom: 10,
      showAfterLoad: !0,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: 0,
      iframeWidth: "100%",
      iframeHeight: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      extraProps: [],
      exThumbImage: "",
      isMobile: void 0,
      mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
      plugins: [],
    },
    p = "lgAfterAppendSlide",
    f = "lgInit",
    v = "lgHasVideo",
    y = "lgContainerResize",
    b = "lgUpdateSlides",
    C = "lgAfterAppendSubHtml",
    I = "lgBeforeOpen",
    w = "lgAfterOpen",
    x = "lgSlideItemLoad",
    S = "lgBeforeSlide",
    T = "lgAfterSlide",
    E = "lgPosterClick",
    O = "lgDragStart",
    L = "lgDragMove",
    D = "lgDragEnd",
    z = "lgBeforeNextSlide",
    G = "lgBeforePrevSlide",
    M = "lgBeforeClose",
    k = "lgAfterClose",
    A = 0,
    B = (function () {
      function s(t, e) {
        if (
          ((this.lgOpened = !1),
          (this.index = 0),
          (this.plugins = []),
          (this.lGalleryOn = !1),
          (this.lgBusy = !1),
          (this.currentItemsInDom = []),
          (this.prevScrollTop = 0),
          (this.isDummyImageRemoved = !1),
          (this.dragOrSwipeEnabled = !1),
          (this.mediaContainerPosition = { top: 0, bottom: 0 }),
          !t)
        )
          return this;
        if (
          (A++,
          (this.lgId = A),
          (this.el = t),
          (this.LGel = i(t)),
          this.generateSettings(e),
          this.buildModules(),
          this.settings.dynamic &&
            void 0 !== this.settings.dynamicEl &&
            !Array.isArray(this.settings.dynamicEl))
        )
          throw "When using dynamic mode, you must also define dynamicEl as an Array.";
        return (
          (this.galleryItems = this.getItems()),
          this.normalizeSettings(),
          this.init(),
          this.validateLicense(),
          this
        );
      }
      return (
        (s.prototype.generateSettings = function (e) {
          if (
            ((this.settings = t(t({}, m), e)),
            this.settings.isMobile &&
            "function" == typeof this.settings.isMobile
              ? this.settings.isMobile()
              : u())
          ) {
            var i = t(
              t({}, this.settings.mobileSettings),
              this.settings.mobileSettings
            );
            this.settings = t(t({}, this.settings), i);
          }
        }),
        (s.prototype.normalizeSettings = function () {
          this.settings.slideEndAnimation &&
            (this.settings.hideControlOnEnd = !1),
            this.settings.closable || (this.settings.swipeToClose = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            this.settings.dynamic && (this.zoomFromOrigin = !1),
            this.settings.container ||
              (this.settings.container = document.body),
            (this.settings.preload = Math.min(
              this.settings.preload,
              this.galleryItems.length
            ));
        }),
        (s.prototype.init = function () {
          var t = this;
          this.addSlideVideoInfo(this.galleryItems),
            this.buildStructure(),
            this.LGel.trigger(f, { instance: this }),
            this.settings.keyPress && this.keyPress(),
            setTimeout(function () {
              t.enableDrag(), t.enableSwipe(), t.triggerPosterClick();
            }, 50),
            this.arrow(),
            this.settings.mousewheel && this.mousewheel(),
            this.settings.dynamic || this.openGalleryOnItemClick();
        }),
        (s.prototype.openGalleryOnItemClick = function () {
          for (
            var t = this,
              s = function (s) {
                var o = n.items[s],
                  r = i(o),
                  l = e.generateUUID();
                r.attr("data-lg-id", l).on(
                  "click.lgcustom-item-" + l,
                  function (e) {
                    e.preventDefault();
                    var i = t.settings.index || s;
                    t.openGallery(i, o);
                  }
                );
              },
              n = this,
              o = 0;
            o < this.items.length;
            o++
          )
            s(o);
        }),
        (s.prototype.buildModules = function () {
          var t = this;
          this.settings.plugins.forEach(function (e) {
            t.plugins.push(new e(t, i));
          });
        }),
        (s.prototype.validateLicense = function () {
          this.settings.licenseKey
            ? "0000-0000-000-0000" === this.settings.licenseKey &&
              console.warn(
                "lightGallery: " +
                  this.settings.licenseKey +
                  " license key is not valid for production use"
              )
            : console.error("Please provide a valid license key");
        }),
        (s.prototype.getSlideItem = function (t) {
          return i(this.getSlideItemId(t));
        }),
        (s.prototype.getSlideItemId = function (t) {
          return "#lg-item-" + this.lgId + "-" + t;
        }),
        (s.prototype.getIdName = function (t) {
          return t + "-" + this.lgId;
        }),
        (s.prototype.getElementById = function (t) {
          return i("#" + this.getIdName(t));
        }),
        (s.prototype.manageSingleSlideClassName = function () {
          this.galleryItems.length < 2
            ? this.outer.addClass("lg-single-item")
            : this.outer.removeClass("lg-single-item");
        }),
        (s.prototype.buildStructure = function () {
          var t = this;
          if (!(this.$container && this.$container.get())) {
            var e = "",
              s = "";
            this.settings.controls &&
              (e =
                '<button type="button" id="' +
                this.getIdName("lg-prev") +
                '" aria-label="Previous slide" class="lg-prev lg-icon"> ' +
                this.settings.prevHtml +
                ' </button>\n                <button type="button" id="' +
                this.getIdName("lg-next") +
                '" aria-label="Next slide" class="lg-next lg-icon"> ' +
                this.settings.nextHtml +
                " </button>"),
              ".lg-item" !== this.settings.appendSubHtmlTo &&
                (s =
                  '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
            var n = "";
            this.settings.allowMediaOverlap && (n += "lg-media-overlap ");
            var o = this.settings.ariaLabelledby
                ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                : "",
              r = this.settings.ariaDescribedby
                ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                : "",
              l =
                "lg-container " +
                this.settings.addClass +
                " " +
                (document.body !== this.settings.container ? "lg-inline" : ""),
              a =
                this.settings.closable && this.settings.showCloseIcon
                  ? '<button type="button" aria-label="Close gallery" id="' +
                    this.getIdName("lg-close") +
                    '" class="lg-close lg-icon"></button>'
                  : "",
              g = this.settings.showMaximizeIcon
                ? '<button type="button" aria-label="Toggle maximize" id="' +
                  this.getIdName("lg-maximize") +
                  '" class="lg-maximize lg-icon"></button>'
                : "",
              d =
                '\n        <div class="' +
                l +
                '" id="' +
                this.getIdName("lg-container") +
                '" tabindex="-1" aria-modal="true" ' +
                o +
                " " +
                r +
                ' role="dialog"\n        >\n            <div id="' +
                this.getIdName("lg-backdrop") +
                '" class="lg-backdrop"></div>\n\n            <div id="' +
                this.getIdName("lg-outer") +
                '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                n +
                ' ">\n\n              <div id="' +
                this.getIdName("lg-content") +
                '" class="lg-content">\n                <div id="' +
                this.getIdName("lg-inner") +
                '" class="lg-inner">\n                </div>\n                ' +
                e +
                '\n              </div>\n                <div id="' +
                this.getIdName("lg-toolbar") +
                '" class="lg-toolbar lg-group">\n                    ' +
                g +
                "\n                    " +
                a +
                "\n                    </div>\n                    " +
                (".lg-outer" === this.settings.appendSubHtmlTo ? s : "") +
                '\n                <div id="' +
                this.getIdName("lg-components") +
                '" class="lg-components">\n                    ' +
                (".lg-sub-html" === this.settings.appendSubHtmlTo ? s : "") +
                "\n                </div>\n            </div>\n        </div>\n        ";
            i(this.settings.container).css("position", "relative").append(d),
              (this.outer = this.getElementById("lg-outer")),
              (this.$lgComponents = this.getElementById("lg-components")),
              (this.$backdrop = this.getElementById("lg-backdrop")),
              (this.$container = this.getElementById("lg-container")),
              (this.$inner = this.getElementById("lg-inner")),
              (this.$content = this.getElementById("lg-content")),
              (this.$toolbar = this.getElementById("lg-toolbar")),
              this.$backdrop.css(
                "transition-duration",
                this.settings.backdropDuration + "ms"
              );
            var h = this.settings.mode + " ";
            this.manageSingleSlideClassName(),
              this.settings.enableDrag && (h += "lg-grab "),
              this.settings.showAfterLoad && (h += "lg-show-after-load"),
              this.outer.addClass(h),
              this.$inner.css(
                "transition-timing-function",
                this.settings.easing
              ),
              this.$inner.css(
                "transition-duration",
                this.settings.speed + "ms"
              ),
              this.settings.download &&
                this.$toolbar.append(
                  '<a id="' +
                    this.getIdName("lg-download") +
                    '" target="_blank" rel="noopener" aria-label="Download" download class="lg-download lg-icon"></a>'
                ),
              this.counter(),
              i(window).on(
                "resize.lg.global" +
                  this.lgId +
                  " orientationchange.lg.global" +
                  this.lgId,
                function () {
                  t.refreshOnResize();
                }
              ),
              this.hideBars(),
              this.manageCloseGallery(),
              this.toggleMaximize(),
              this.initModules();
          }
        }),
        (s.prototype.refreshOnResize = function () {
          if (this.lgOpened) {
            var t = this.galleryItems[this.index].__slideVideoInfo;
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var e = this.mediaContainerPosition,
              i = e.top,
              s = e.bottom;
            if (
              ((this.currentImageSize = o(
                this.items[this.index],
                this.outer,
                i + s,
                t && this.settings.videoMaxSize
              )),
              t && this.resizeVideoSlide(this.index, this.currentImageSize),
              this.zoomFromOrigin && !this.isDummyImageRemoved)
            ) {
              var n = this.getDummyImgStyles(this.currentImageSize);
              this.outer
                .find(".lg-current .lg-dummy-img")
                .first()
                .attr("style", n);
            }
            this.LGel.trigger(y);
          }
        }),
        (s.prototype.resizeVideoSlide = function (t, e) {
          var i = this.getVideoContStyle(e);
          this.getSlideItem(t).find(".lg-video-cont").attr("style", i);
        }),
        (s.prototype.updateSlides = function (t, e) {
          if (
            (this.index > t.length - 1 && (this.index = t.length - 1),
            1 === t.length && (this.index = 0),
            t.length)
          ) {
            var i = this.galleryItems[e].src;
            (this.galleryItems = t),
              this.updateControls(),
              this.$inner.empty(),
              (this.currentItemsInDom = []);
            var s = 0;
            this.galleryItems.some(function (t, e) {
              return t.src === i && ((s = e), !0);
            }),
              (this.currentItemsInDom = this.organizeSlideItems(s, -1)),
              this.loadContent(s, !0),
              this.getSlideItem(s).addClass("lg-current"),
              (this.index = s),
              this.updateCurrentCounter(s),
              this.LGel.trigger(b);
          } else this.closeGallery();
        }),
        (s.prototype.getItems = function () {
          if (((this.items = []), this.settings.dynamic))
            return this.settings.dynamicEl || [];
          if ("this" === this.settings.selector) this.items.push(this.el);
          else if (this.settings.selector)
            if ("string" == typeof this.settings.selector)
              if (this.settings.selectWithin) {
                var t = i(this.settings.selectWithin);
                this.items = t.find(this.settings.selector).get();
              } else
                this.items = this.el.querySelectorAll(this.settings.selector);
            else this.items = this.settings.selector;
          else this.items = this.el.children;
          return c(
            this.items,
            this.settings.extraProps,
            this.settings.getCaptionFromTitleOrAlt,
            this.settings.exThumbImage
          );
        }),
        (s.prototype.openGallery = function (t, e) {
          var s = this;
          if ((void 0 === t && (t = this.settings.index), !this.lgOpened)) {
            (this.lgOpened = !0),
              this.outer.get().focus(),
              this.outer.removeClass("lg-hide-items"),
              this.$container.addClass("lg-show");
            var n = this.getItemsToBeInsertedToDom(t, t);
            this.currentItemsInDom = n;
            var l = "";
            n.forEach(function (t) {
              l = l + '<div id="' + t + '" class="lg-item"></div>';
            }),
              this.$inner.append(l),
              this.addHtml(t);
            var a = "";
            this.mediaContainerPosition = this.getMediaContainerPosition();
            var g = this.mediaContainerPosition,
              d = g.top,
              h = g.bottom;
            this.settings.allowMediaOverlap ||
              this.setMediaContainerPosition(d, h),
              this.zoomFromOrigin &&
                e &&
                ((this.currentImageSize = o(
                  e,
                  this.outer,
                  d + h,
                  this.galleryItems[t].__slideVideoInfo &&
                    this.settings.videoMaxSize
                )),
                (a = r(e, this.outer, d, h, this.currentImageSize))),
              (this.zoomFromOrigin && a) ||
                (this.outer.addClass(this.settings.startClass),
                this.getSlideItem(t).removeClass("lg-complete"));
            var c = this.settings.zoomFromOrigin
              ? 100
              : this.settings.backdropDuration;
            setTimeout(function () {
              s.outer.addClass("lg-components-open");
            }, c),
              (this.index = t),
              this.LGel.trigger(I),
              this.getSlideItem(t).addClass("lg-current"),
              (this.lGalleryOn = !1),
              (this.prevScrollTop = i(window).scrollTop()),
              setTimeout(function () {
                if (s.zoomFromOrigin && a) {
                  var e = s.getSlideItem(t);
                  e.css("transform", a),
                    setTimeout(function () {
                      e
                        .addClass("lg-start-progress lg-start-end-progress")
                        .css(
                          "transition-duration",
                          s.settings.startAnimationDuration + "ms"
                        ),
                        s.outer.addClass("lg-zoom-from-image");
                    }),
                    setTimeout(function () {
                      e.css("transform", "translate3d(0, 0, 0)");
                    }, 100);
                }
                setTimeout(function () {
                  s.$backdrop.addClass("in"),
                    s.$container.addClass("lg-show-in");
                }, 10),
                  (s.zoomFromOrigin && a) ||
                    setTimeout(function () {
                      s.outer.addClass("lg-visible");
                    }, s.settings.backdropDuration),
                  s.slide(t, !1, !1, !1),
                  s.LGel.trigger(w);
              }),
              document.body === this.settings.container &&
                i("html").addClass("lg-on");
          }
        }),
        (s.prototype.getMediaContainerPosition = function () {
          if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
          var t = this.$toolbar.get().clientHeight || 0,
            e = this.outer.find(".lg-components .lg-sub-html").get(),
            i =
              this.settings.defaultCaptionHeight || (e && e.clientHeight) || 0,
            s = this.outer.find(".lg-thumb-outer").get();
          return { top: t, bottom: (s ? s.clientHeight : 0) + i };
        }),
        (s.prototype.setMediaContainerPosition = function (t, e) {
          void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            this.$content.css("top", t + "px").css("bottom", e + "px");
        }),
        (s.prototype.hideBars = function () {
          var t = this;
          setTimeout(function () {
            t.outer.removeClass("lg-hide-items"),
              t.settings.hideBarsDelay > 0 &&
                (t.outer.on("mousemove.lg click.lg touchstart.lg", function () {
                  t.outer.removeClass("lg-hide-items"),
                    clearTimeout(t.hideBarTimeout),
                    (t.hideBarTimeout = setTimeout(function () {
                      t.outer.addClass("lg-hide-items");
                    }, t.settings.hideBarsDelay));
                }),
                t.outer.trigger("mousemove.lg"));
          }, this.settings.showBarsAfter);
        }),
        (s.prototype.initPictureFill = function (t) {
          if (this.settings.supportLegacyBrowser)
            try {
              picturefill({ elements: [t.get()] });
            } catch (t) {
              console.warn(
                "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
              );
            }
        }),
        (s.prototype.counter = function () {
          if (this.settings.counter) {
            var t =
              '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
              this.getIdName("lg-counter-current") +
              '" class="lg-counter-current">' +
              (this.index + 1) +
              ' </span> /\n                <span id="' +
              this.getIdName("lg-counter-all") +
              '" class="lg-counter-all">' +
              this.galleryItems.length +
              " </span></div>";
            this.outer.find(this.settings.appendCounterTo).append(t);
          }
        }),
        (s.prototype.addHtml = function (t) {
          var e, s;
          if (
            (this.galleryItems[t].subHtmlUrl
              ? (s = this.galleryItems[t].subHtmlUrl)
              : (e = this.galleryItems[t].subHtml),
            !s)
          )
            if (e) {
              var n = e.substring(0, 1);
              ("." !== n && "#" !== n) ||
                (e =
                  this.settings.subHtmlSelectorRelative &&
                  !this.settings.dynamic
                    ? i(this.items).eq(t).find(e).first().html()
                    : i(e).first().html());
            } else e = "";
          if (".lg-item" !== this.settings.appendSubHtmlTo)
            s
              ? this.outer.find(".lg-sub-html").load(s)
              : this.outer.find(".lg-sub-html").html(e);
          else {
            var o = i(this.getSlideItemId(t));
            s
              ? o.load(s)
              : o.append('<div class="lg-sub-html">' + e + "</div>");
          }
          null != e &&
            ("" === e
              ? this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .addClass("lg-empty-html")
              : this.outer
                  .find(this.settings.appendSubHtmlTo)
                  .removeClass("lg-empty-html")),
            this.LGel.trigger(C, { index: t });
        }),
        (s.prototype.preload = function (t) {
          for (
            var e = 1;
            e <= this.settings.preload && !(e >= this.galleryItems.length - t);
            e++
          )
            this.loadContent(t + e, !1);
          for (var i = 1; i <= this.settings.preload && !(t - i < 0); i++)
            this.loadContent(t - i, !1);
        }),
        (s.prototype.getDummyImgStyles = function (t) {
          return t
            ? "width:" +
                t.width +
                "px;\n                margin-left: -" +
                t.width / 2 +
                "px;\n                margin-top: -" +
                t.height / 2 +
                "px;\n                height:" +
                t.height +
                "px"
            : "";
        }),
        (s.prototype.getVideoContStyle = function (t) {
          return t
            ? "width:" +
                t.width +
                "px;\n                height:" +
                t.height +
                "px"
            : "";
        }),
        (s.prototype.getDummyImageContent = function (t, e, s) {
          var n;
          if ((this.settings.dynamic || (n = i(this.items).eq(e)), n)) {
            var o = void 0;
            if (
              !(o = this.settings.exThumbImage
                ? n.attr(this.settings.exThumbImage)
                : n.find("img").first().attr("src"))
            )
              return "";
            var r =
              "<img " +
              s +
              ' style="' +
              this.getDummyImgStyles(this.currentImageSize) +
              '" class="lg-dummy-img" src="' +
              o +
              '" />';
            return (
              t.addClass("lg-first-slide"),
              this.outer.addClass("lg-first-slide-loading"),
              r
            );
          }
          return "";
        }),
        (s.prototype.setImgMarkup = function (t, e, i) {
          var s = this.galleryItems[i],
            n = s.alt,
            o = s.srcset,
            r = s.sizes,
            l = s.sources,
            g = n ? 'alt="' + n + '"' : "",
            d =
              '<picture class="lg-img-wrap"> ' +
              (!this.lGalleryOn && this.zoomFromOrigin && this.currentImageSize
                ? this.getDummyImageContent(e, i, g)
                : a(i, t, g, o, r, l)) +
              "</picture>";
          e.prepend(d);
        }),
        (s.prototype.onLgObjectLoad = function (t, e, i, s, n) {
          var o = this;
          n && this.LGel.trigger(x, { index: e, delay: i || 0 }),
            t
              .find(".lg-object")
              .first()
              .on("load.lg", function () {
                o.handleLgObjectLoad(t, e, i, s, n);
              }),
            setTimeout(function () {
              t.find(".lg-object")
                .first()
                .on("error.lg", function () {
                  t.addClass("lg-complete lg-complete_"),
                    t.html(
                      '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                    );
                });
            }, s);
        }),
        (s.prototype.handleLgObjectLoad = function (t, e, i, s, n) {
          var o = this;
          setTimeout(function () {
            t.addClass("lg-complete lg-complete_"),
              n || o.LGel.trigger(x, { index: e, delay: i || 0 });
          }, s);
        }),
        (s.prototype.isVideo = function (t, e) {
          if (!t)
            return this.galleryItems[e].video
              ? { html5: !0 }
              : void console.error(
                  "lightGallery :- data-src is not provided on slide item " +
                    (e + 1) +
                    ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
                );
          var i = t.match(
              /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i
            ),
            s = t.match(
              /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)/i
            ),
            n = t.match(
              /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
            );
          return i
            ? { youtube: i }
            : s
            ? { vimeo: s }
            : n
            ? { wistia: n }
            : void 0;
        }),
        (s.prototype.addSlideVideoInfo = function (t) {
          var e = this;
          t.forEach(function (t, i) {
            t.__slideVideoInfo = e.isVideo(t.src, i);
          });
        }),
        (s.prototype.loadContent = function (t, e) {
          var s = this,
            n = this.galleryItems[t],
            r = i(this.getSlideItemId(t)),
            c = n.poster,
            u = n.srcset,
            m = n.sizes,
            f = n.sources,
            y = n.src,
            b = n.video,
            C = b && "string" == typeof b ? JSON.parse(b) : b;
          if (n.responsive) {
            var I = n.responsive.split(",");
            y = g(I) || y;
          }
          var w = n.__slideVideoInfo,
            x = "",
            S = !!n.iframe;
          if (!r.hasClass("lg-loaded")) {
            if (w) {
              var T = this.mediaContainerPosition,
                E = T.top,
                O = T.bottom,
                L = o(
                  this.items[t],
                  this.outer,
                  E + O,
                  w && this.settings.videoMaxSize
                );
              x = this.getVideoContStyle(L);
            }
            if (S) {
              var D = l(
                this.settings.iframeWidth,
                this.settings.iframeHeight,
                y,
                n.iframeTitle
              );
              r.prepend(D);
            } else if (c) {
              var z = "",
                G = !this.lGalleryOn,
                M =
                  !this.lGalleryOn &&
                  this.zoomFromOrigin &&
                  this.currentImageSize;
              M && (z = this.getDummyImageContent(r, t, ""));
              D = h(c, z || "", x, w);
              r.prepend(D);
              var k =
                (M
                  ? this.settings.startAnimationDuration
                  : this.settings.backdropDuration) + 100;
              setTimeout(function () {
                s.LGel.trigger(v, {
                  index: t,
                  src: y,
                  html5Video: C,
                  hasPoster: !0,
                  isFirstSlide: G,
                });
              }, k);
            } else if (w) {
              D = '<div class="lg-video-cont " style="' + x + '"></div>';
              r.prepend(D),
                this.LGel.trigger(v, {
                  index: t,
                  src: y,
                  html5Video: C,
                  hasPoster: !1,
                });
            } else if ((this.setImgMarkup(y, r, t), u || f)) {
              var A = r.find(".lg-object");
              this.initPictureFill(A);
            }
            this.LGel.trigger(p, { index: t }),
              this.lGalleryOn &&
                ".lg-item" === this.settings.appendSubHtmlTo &&
                this.addHtml(t);
          }
          var B = 0,
            P = 0;
          this.lGalleryOn ||
            (P =
              this.zoomFromOrigin && this.currentImageSize
                ? this.settings.startAnimationDuration + 10
                : this.settings.backdropDuration + 10),
            P && !i(document.body).hasClass("lg-from-hash") && (B = P),
            !this.lGalleryOn &&
              this.zoomFromOrigin &&
              this.currentImageSize &&
              (setTimeout(function () {
                r.removeClass(
                  "lg-start-end-progress lg-start-progress"
                ).removeAttr("style");
              }, this.settings.startAnimationDuration + 100),
              r.hasClass("lg-loaded") ||
                setTimeout(function () {
                  if (
                    (r
                      .find(".lg-img-wrap")
                      .append(a(t, y, "", u, m, n.sources)),
                    u || f)
                  ) {
                    var e = r.find(".lg-object");
                    s.initPictureFill(e);
                  }
                  s.onLgObjectLoad(r, t, P, B, !0);
                  var i = r.find(".lg-object").first();
                  d(i.get())
                    ? s.loadContentOnLoad(t, r, B)
                    : i.on("load.lg error.lg", function () {
                        s.loadContentOnLoad(t, r, B);
                      });
                }, this.settings.startAnimationDuration + 100)),
            r.addClass("lg-loaded"),
            this.onLgObjectLoad(r, t, P, B, !1),
            w && w.html5 && !c && r.addClass("lg-complete lg-complete_"),
            (this.zoomFromOrigin && this.currentImageSize) ||
              !r.hasClass("lg-complete_") ||
              this.lGalleryOn ||
              setTimeout(function () {
                r.addClass("lg-complete");
              }, this.settings.backdropDuration),
            (this.lGalleryOn = !0),
            !0 === e &&
              (r.hasClass("lg-complete_")
                ? this.preload(t)
                : r
                    .find(".lg-object")
                    .first()
                    .on("load.lg error.lg", function () {
                      s.preload(t);
                    }));
        }),
        (s.prototype.loadContentOnLoad = function (t, e, i) {
          var s = this;
          setTimeout(function () {
            e.find(".lg-dummy-img").remove(),
              e.removeClass("lg-first-slide"),
              s.outer.removeClass("lg-first-slide-loading"),
              (s.isDummyImageRemoved = !0),
              s.preload(t);
          }, i + 300);
        }),
        (s.prototype.getItemsToBeInsertedToDom = function (t, e, i) {
          var s = this;
          void 0 === i && (i = 0);
          var n = [],
            o = Math.max(i, 3);
          o = Math.min(o, this.galleryItems.length);
          var r = "lg-item-" + this.lgId + "-" + e;
          if (this.galleryItems.length <= 3)
            return (
              this.galleryItems.forEach(function (t, e) {
                n.push("lg-item-" + s.lgId + "-" + e);
              }),
              n
            );
          if (t < (this.galleryItems.length - 1) / 2) {
            for (var l = t; l > t - o / 2 && l >= 0; l--)
              n.push("lg-item-" + this.lgId + "-" + l);
            var a = n.length;
            for (l = 0; l < o - a; l++)
              n.push("lg-item-" + this.lgId + "-" + (t + l + 1));
          } else {
            for (l = t; l <= this.galleryItems.length - 1 && l < t + o / 2; l++)
              n.push("lg-item-" + this.lgId + "-" + l);
            for (a = n.length, l = 0; l < o - a; l++)
              n.push("lg-item-" + this.lgId + "-" + (t - l - 1));
          }
          return (
            this.settings.loop &&
              (t === this.galleryItems.length - 1
                ? n.push("lg-item-" + this.lgId + "-0")
                : 0 === t &&
                  n.push(
                    "lg-item-" +
                      this.lgId +
                      "-" +
                      (this.galleryItems.length - 1)
                  )),
            -1 === n.indexOf(r) && n.push("lg-item-" + this.lgId + "-" + e),
            n
          );
        }),
        (s.prototype.organizeSlideItems = function (t, e) {
          var s = this,
            n = this.getItemsToBeInsertedToDom(
              t,
              e,
              this.settings.numberOfSlideItemsInDom
            );
          return (
            n.forEach(function (t) {
              -1 === s.currentItemsInDom.indexOf(t) &&
                s.$inner.append('<div id="' + t + '" class="lg-item"></div>');
            }),
            this.currentItemsInDom.forEach(function (t) {
              -1 === n.indexOf(t) && i("#" + t).remove();
            }),
            n
          );
        }),
        (s.prototype.getPreviousSlideIndex = function () {
          var t = 0;
          try {
            var e = this.outer.find(".lg-current").first().attr("id");
            t = parseInt(e.split("-")[3]) || 0;
          } catch (e) {
            t = 0;
          }
          return t;
        }),
        (s.prototype.setDownloadValue = function (t) {
          if (this.settings.download) {
            var e = this.galleryItems[t];
            if (!1 === e.downloadUrl || "false" === e.downloadUrl)
              this.outer.addClass("lg-hide-download");
            else {
              var i = this.getElementById("lg-download");
              this.outer.removeClass("lg-hide-download"),
                i.attr("href", e.downloadUrl || e.src),
                e.download && i.attr("download", e.download);
            }
          }
        }),
        (s.prototype.makeSlideAnimation = function (t, e, i) {
          var s = this;
          this.lGalleryOn && i.addClass("lg-slide-progress"),
            setTimeout(
              function () {
                s.outer.addClass("lg-no-trans"),
                  s.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-next-slide"),
                  "prev" === t
                    ? (e.addClass("lg-prev-slide"), i.addClass("lg-next-slide"))
                    : (e.addClass("lg-next-slide"),
                      i.addClass("lg-prev-slide")),
                  setTimeout(function () {
                    s.outer.find(".lg-item").removeClass("lg-current"),
                      e.addClass("lg-current"),
                      s.outer.removeClass("lg-no-trans");
                  }, 50);
              },
              this.lGalleryOn ? this.settings.slideDelay : 0
            );
        }),
        (s.prototype.slide = function (t, e, i, s) {
          var n = this,
            r = this.getPreviousSlideIndex();
          if (
            ((this.currentItemsInDom = this.organizeSlideItems(t, r)),
            !this.lGalleryOn || r !== t)
          ) {
            var l = this.galleryItems.length;
            if (!this.lgBusy) {
              this.settings.counter && this.updateCurrentCounter(t);
              var a = this.getSlideItem(t),
                g = this.getSlideItem(r),
                d = this.galleryItems[t],
                h = d.__slideVideoInfo;
              if (
                (this.outer.attr("data-lg-slide-type", this.getSlideType(d)),
                this.setDownloadValue(t),
                h)
              ) {
                var c = this.mediaContainerPosition,
                  u = c.top,
                  m = c.bottom,
                  p = o(
                    this.items[t],
                    this.outer,
                    u + m,
                    h && this.settings.videoMaxSize
                  );
                this.resizeVideoSlide(t, p);
              }
              if (
                (this.LGel.trigger(S, {
                  prevIndex: r,
                  index: t,
                  fromTouch: !!e,
                  fromThumb: !!i,
                }),
                (this.lgBusy = !0),
                clearTimeout(this.hideBarTimeout),
                this.arrowDisable(t),
                s || (t < r ? (s = "prev") : t > r && (s = "next")),
                e)
              ) {
                this.outer
                  .find(".lg-item")
                  .removeClass("lg-prev-slide lg-current lg-next-slide");
                var f = void 0,
                  v = void 0;
                l > 2
                  ? ((f = t - 1),
                    (v = t + 1),
                    ((0 === t && r === l - 1) || (t === l - 1 && 0 === r)) &&
                      ((v = 0), (f = l - 1)))
                  : ((f = 0), (v = 1)),
                  "prev" === s
                    ? this.getSlideItem(v).addClass("lg-next-slide")
                    : this.getSlideItem(f).addClass("lg-prev-slide"),
                  a.addClass("lg-current");
              } else this.makeSlideAnimation(s, a, g);
              this.lGalleryOn || this.loadContent(t, !0),
                setTimeout(function () {
                  n.lGalleryOn && n.loadContent(t, !0),
                    ".lg-item" !== n.settings.appendSubHtmlTo && n.addHtml(t);
                }, (this.lGalleryOn ? this.settings.speed + 50 : 50) +
                  (e ? 0 : this.settings.slideDelay)),
                setTimeout(function () {
                  (n.lgBusy = !1),
                    g.removeClass("lg-slide-progress"),
                    n.LGel.trigger(T, {
                      prevIndex: r,
                      index: t,
                      fromTouch: e,
                      fromThumb: i,
                    });
                }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                  (e ? 0 : this.settings.slideDelay));
            }
            this.index = t;
          }
        }),
        (s.prototype.updateCurrentCounter = function (t) {
          this.getElementById("lg-counter-current").html(t + 1 + "");
        }),
        (s.prototype.updateCounterTotal = function () {
          this.getElementById("lg-counter-all").html(
            this.galleryItems.length + ""
          );
        }),
        (s.prototype.getSlideType = function (t) {
          return t.__slideVideoInfo ? "video" : t.iframe ? "iframe" : "image";
        }),
        (s.prototype.touchMove = function (t, e, i) {
          var s = e.pageX - t.pageX,
            n = e.pageY - t.pageY,
            o = !1;
          if (
            (this.swipeDirection
              ? (o = !0)
              : Math.abs(s) > 15
              ? ((this.swipeDirection = "horizontal"), (o = !0))
              : Math.abs(n) > 15 &&
                ((this.swipeDirection = "vertical"), (o = !0)),
            o)
          ) {
            var r = this.getSlideItem(this.index);
            if ("horizontal" === this.swipeDirection) {
              null == i || i.preventDefault(),
                this.outer.addClass("lg-dragging"),
                this.setTranslate(r, s, 0);
              var l = r.get().offsetWidth,
                a = (15 * l) / 100 - Math.abs((10 * s) / 100);
              this.setTranslate(
                this.outer.find(".lg-prev-slide").first(),
                -l + s - a,
                0
              ),
                this.setTranslate(
                  this.outer.find(".lg-next-slide").first(),
                  l + s + a,
                  0
                );
            } else if (
              "vertical" === this.swipeDirection &&
              this.settings.swipeToClose
            ) {
              null == i || i.preventDefault(),
                this.$container.addClass("lg-dragging-vertical");
              var g = 1 - Math.abs(n) / window.innerHeight;
              this.$backdrop.css("opacity", g);
              var d = 1 - Math.abs(n) / (2 * window.innerWidth);
              this.setTranslate(r, 0, n, d, d),
                Math.abs(n) > 100 &&
                  this.outer
                    .addClass("lg-hide-items")
                    .removeClass("lg-components-open");
            }
          }
        }),
        (s.prototype.touchEnd = function (t, e, s) {
          var n,
            o = this;
          "lg-slide" !== this.settings.mode && this.outer.addClass("lg-slide"),
            setTimeout(function () {
              o.$container.removeClass("lg-dragging-vertical"),
                o.outer
                  .removeClass("lg-dragging lg-hide-items")
                  .addClass("lg-components-open");
              var r = !0;
              if ("horizontal" === o.swipeDirection) {
                n = t.pageX - e.pageX;
                var l = Math.abs(t.pageX - e.pageX);
                n < 0 && l > o.settings.swipeThreshold
                  ? (o.goToNextSlide(!0), (r = !1))
                  : n > 0 &&
                    l > o.settings.swipeThreshold &&
                    (o.goToPrevSlide(!0), (r = !1));
              } else if ("vertical" === o.swipeDirection) {
                if (
                  ((n = Math.abs(t.pageY - e.pageY)),
                  o.settings.closable && o.settings.swipeToClose && n > 100)
                )
                  return void o.closeGallery();
                o.$backdrop.css("opacity", 1);
              }
              if (
                (o.outer.find(".lg-item").removeAttr("style"),
                r && Math.abs(t.pageX - e.pageX) < 5)
              ) {
                var a = i(s.target);
                o.isPosterElement(a) && o.LGel.trigger(E);
              }
              o.swipeDirection = void 0;
            }),
            setTimeout(function () {
              o.outer.hasClass("lg-dragging") ||
                "lg-slide" === o.settings.mode ||
                o.outer.removeClass("lg-slide");
            }, this.settings.speed + 100);
        }),
        (s.prototype.enableSwipe = function () {
          var t = this,
            e = {},
            s = {},
            n = !1,
            o = !1;
          this.settings.enableSwipe &&
            (this.$inner.on("touchstart.lg", function (s) {
              t.dragOrSwipeEnabled = !0;
              var n = t.getSlideItem(t.index);
              (!i(s.target).hasClass("lg-item") &&
                !n.get().contains(s.target)) ||
                t.outer.hasClass("lg-zoomed") ||
                t.lgBusy ||
                1 !== s.targetTouches.length ||
                ((o = !0),
                (t.touchAction = "swipe"),
                t.manageSwipeClass(),
                (e = {
                  pageX: s.targetTouches[0].pageX,
                  pageY: s.targetTouches[0].pageY,
                }));
            }),
            this.$inner.on("touchmove.lg", function (i) {
              o &&
                "swipe" === t.touchAction &&
                1 === i.targetTouches.length &&
                ((s = {
                  pageX: i.targetTouches[0].pageX,
                  pageY: i.targetTouches[0].pageY,
                }),
                t.touchMove(e, s, i),
                (n = !0));
            }),
            this.$inner.on("touchend.lg", function (r) {
              if ("swipe" === t.touchAction) {
                if (n) (n = !1), t.touchEnd(s, e, r);
                else if (o) {
                  var l = i(r.target);
                  t.isPosterElement(l) && t.LGel.trigger(E);
                }
                (t.touchAction = void 0), (o = !1);
              }
            }));
        }),
        (s.prototype.enableDrag = function () {
          var t = this,
            e = {},
            s = {},
            n = !1,
            o = !1;
          this.settings.enableDrag &&
            (this.outer.on("mousedown.lg", function (s) {
              t.dragOrSwipeEnabled = !0;
              var o = t.getSlideItem(t.index);
              (i(s.target).hasClass("lg-item") || o.get().contains(s.target)) &&
                (t.outer.hasClass("lg-zoomed") ||
                  t.lgBusy ||
                  (s.preventDefault(),
                  t.lgBusy ||
                    (t.manageSwipeClass(),
                    (e = { pageX: s.pageX, pageY: s.pageY }),
                    (n = !0),
                    (t.outer.get().scrollLeft += 1),
                    (t.outer.get().scrollLeft -= 1),
                    t.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                    t.LGel.trigger(O))));
            }),
            i(window).on("mousemove.lg.global" + this.lgId, function (i) {
              n &&
                t.lgOpened &&
                ((o = !0),
                (s = { pageX: i.pageX, pageY: i.pageY }),
                t.touchMove(e, s),
                t.LGel.trigger(L));
            }),
            i(window).on("mouseup.lg.global" + this.lgId, function (r) {
              if (t.lgOpened) {
                var l = i(r.target);
                o
                  ? ((o = !1), t.touchEnd(s, e, r), t.LGel.trigger(D))
                  : t.isPosterElement(l) && t.LGel.trigger(E),
                  n &&
                    ((n = !1),
                    t.outer.removeClass("lg-grabbing").addClass("lg-grab"));
              }
            }));
        }),
        (s.prototype.triggerPosterClick = function () {
          var t = this;
          this.$inner.on("click.lg", function (e) {
            !t.dragOrSwipeEnabled &&
              t.isPosterElement(i(e.target)) &&
              t.LGel.trigger(E);
          });
        }),
        (s.prototype.manageSwipeClass = function () {
          var t = this.index + 1,
            e = this.index - 1;
          this.settings.loop &&
            this.galleryItems.length > 2 &&
            (0 === this.index
              ? (e = this.galleryItems.length - 1)
              : this.index === this.galleryItems.length - 1 && (t = 0)),
            this.outer
              .find(".lg-item")
              .removeClass("lg-next-slide lg-prev-slide"),
            e > -1 && this.getSlideItem(e).addClass("lg-prev-slide"),
            this.getSlideItem(t).addClass("lg-next-slide");
        }),
        (s.prototype.goToNextSlide = function (t) {
          var e = this,
            i = this.settings.loop;
          t && this.galleryItems.length < 3 && (i = !1),
            this.lgBusy ||
              (this.index + 1 < this.galleryItems.length
                ? (this.index++,
                  this.LGel.trigger(z, { index: this.index }),
                  this.slide(this.index, !!t, !1, "next"))
                : i
                ? ((this.index = 0),
                  this.LGel.trigger(z, { index: this.index }),
                  this.slide(this.index, !!t, !1, "next"))
                : this.settings.slideEndAnimation &&
                  !t &&
                  (this.outer.addClass("lg-right-end"),
                  setTimeout(function () {
                    e.outer.removeClass("lg-right-end");
                  }, 400)));
        }),
        (s.prototype.goToPrevSlide = function (t) {
          var e = this,
            i = this.settings.loop;
          t && this.galleryItems.length < 3 && (i = !1),
            this.lgBusy ||
              (this.index > 0
                ? (this.index--,
                  this.LGel.trigger(G, { index: this.index, fromTouch: t }),
                  this.slide(this.index, !!t, !1, "prev"))
                : i
                ? ((this.index = this.galleryItems.length - 1),
                  this.LGel.trigger(G, { index: this.index, fromTouch: t }),
                  this.slide(this.index, !!t, !1, "prev"))
                : this.settings.slideEndAnimation &&
                  !t &&
                  (this.outer.addClass("lg-left-end"),
                  setTimeout(function () {
                    e.outer.removeClass("lg-left-end");
                  }, 400)));
        }),
        (s.prototype.keyPress = function () {
          var t = this;
          i(window).on("keydown.lg.global" + this.lgId, function (e) {
            t.lgOpened &&
              !0 === t.settings.escKey &&
              27 === e.keyCode &&
              (e.preventDefault(),
              t.settings.allowMediaOverlap &&
              t.outer.hasClass("lg-can-toggle") &&
              t.outer.hasClass("lg-components-open")
                ? t.outer.removeClass("lg-components-open")
                : t.closeGallery()),
              t.lgOpened &&
                t.galleryItems.length > 1 &&
                (37 === e.keyCode && (e.preventDefault(), t.goToPrevSlide()),
                39 === e.keyCode && (e.preventDefault(), t.goToNextSlide()));
          });
        }),
        (s.prototype.arrow = function () {
          var t = this;
          this.getElementById("lg-prev").on("click.lg", function () {
            t.goToPrevSlide();
          }),
            this.getElementById("lg-next").on("click.lg", function () {
              t.goToNextSlide();
            });
        }),
        (s.prototype.arrowDisable = function (t) {
          if (!this.settings.loop && this.settings.hideControlOnEnd) {
            var e = this.getElementById("lg-prev"),
              i = this.getElementById("lg-next");
            t + 1 === this.galleryItems.length
              ? i.attr("disabled", "disabled").addClass("disabled")
              : i.removeAttr("disabled").removeClass("disabled"),
              0 === t
                ? e.attr("disabled", "disabled").addClass("disabled")
                : e.removeAttr("disabled").removeClass("disabled");
          }
        }),
        (s.prototype.setTranslate = function (t, e, i, s, n) {
          void 0 === s && (s = 1),
            void 0 === n && (n = 1),
            t.css(
              "transform",
              "translate3d(" +
                e +
                "px, " +
                i +
                "px, 0px) scale3d(" +
                s +
                ", " +
                n +
                ", 1)"
            );
        }),
        (s.prototype.mousewheel = function () {
          var t = this;
          this.outer.on("mousewheel.lg", function (e) {
            !e.deltaY ||
              t.galleryItems.length < 2 ||
              (e.deltaY > 0 ? t.goToPrevSlide() : t.goToNextSlide(),
              e.preventDefault());
          });
        }),
        (s.prototype.isSlideElement = function (t) {
          return (
            t.hasClass("lg-outer") ||
            t.hasClass("lg-item") ||
            t.hasClass("lg-img-wrap")
          );
        }),
        (s.prototype.isPosterElement = function (t) {
          var e = this.getSlideItem(this.index)
            .find(".lg-video-play-button")
            .get();
          return (
            t.hasClass("lg-video-poster") ||
            t.hasClass("lg-video-play-button") ||
            (e && e.contains(t.get()))
          );
        }),
        (s.prototype.toggleMaximize = function () {
          var t = this;
          this.getElementById("lg-maximize").on("click.lg", function () {
            t.$container.toggleClass("lg-inline"), t.refreshOnResize();
          });
        }),
        (s.prototype.invalidateItems = function () {
          for (var t = 0; t < this.items.length; t++) {
            var e = i(this.items[t]);
            e.off("click.lgcustom-item-" + e.attr("data-lg-id"));
          }
        }),
        (s.prototype.manageCloseGallery = function () {
          var t = this;
          if (this.settings.closable) {
            var e = !1;
            this.getElementById("lg-close").on("click.lg", function () {
              t.closeGallery();
            }),
              this.settings.closeOnTap &&
                (this.outer.on("mousedown.lg", function (s) {
                  var n = i(s.target);
                  e = !!t.isSlideElement(n);
                }),
                this.outer.on("mousemove.lg", function () {
                  e = !1;
                }),
                this.outer.on("mouseup.lg", function (s) {
                  var n = i(s.target);
                  t.isSlideElement(n) &&
                    e &&
                    (t.outer.hasClass("lg-dragging") || t.closeGallery());
                }));
          }
        }),
        (s.prototype.closeGallery = function (t) {
          var e = this;
          if (!this.lgOpened || (!this.settings.closable && !t)) return 0;
          this.LGel.trigger(M), i(window).scrollTop(this.prevScrollTop);
          var s,
            n = this.items[this.index];
          if (this.zoomFromOrigin && n) {
            var l = this.mediaContainerPosition,
              a = l.top,
              g = l.bottom,
              d = o(
                n,
                this.outer,
                a + g,
                this.galleryItems[this.index].__slideVideoInfo &&
                  this.settings.videoMaxSize
              );
            s = r(n, this.outer, a, g, d);
          }
          this.zoomFromOrigin && s
            ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
              this.getSlideItem(this.index)
                .addClass("lg-start-end-progress")
                .css(
                  "transition-duration",
                  this.settings.startAnimationDuration + "ms"
                )
                .css("transform", s))
            : (this.outer.addClass("lg-hide-items"),
              this.outer.removeClass("lg-zoom-from-image")),
            this.destroyModules(),
            (this.lGalleryOn = !1),
            (this.isDummyImageRemoved = !1),
            (this.zoomFromOrigin = this.settings.zoomFromOrigin),
            clearTimeout(this.hideBarTimeout),
            (this.hideBarTimeout = !1),
            i("html").removeClass("lg-on"),
            this.outer.removeClass("lg-visible lg-components-open"),
            this.$backdrop.removeClass("in").css("opacity", 0);
          var h =
            this.zoomFromOrigin && s
              ? Math.max(
                  this.settings.startAnimationDuration,
                  this.settings.backdropDuration
                )
              : this.settings.backdropDuration;
          return (
            this.$container.removeClass("lg-show-in"),
            setTimeout(function () {
              e.zoomFromOrigin &&
                s &&
                e.outer.removeClass("lg-zoom-from-image"),
                e.$container.removeClass("lg-show"),
                e.$backdrop
                  .removeAttr("style")
                  .css(
                    "transition-duration",
                    e.settings.backdropDuration + "ms"
                  ),
                e.outer.removeClass("lg-closing " + e.settings.startClass),
                e.getSlideItem(e.index).removeClass("lg-start-end-progress"),
                e.$inner.empty(),
                e.lgOpened && e.LGel.trigger(k, { instance: e }),
                e.outer.get() && e.outer.get().blur(),
                (e.lgOpened = !1);
            }, h + 100),
            h + 100
          );
        }),
        (s.prototype.initModules = function () {
          this.plugins.forEach(function (t) {
            try {
              t.init();
            } catch (t) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly initiated"
              );
            }
          });
        }),
        (s.prototype.destroyModules = function (t) {
          this.plugins.forEach(function (e) {
            try {
              t ? e.destroy() : e.closeGallery && e.closeGallery();
            } catch (t) {
              console.warn(
                "lightGallery:- make sure lightGallery module is properly destroyed"
              );
            }
          });
        }),
        (s.prototype.refresh = function (t) {
          this.settings.dynamic || this.invalidateItems(),
            (this.galleryItems = t || this.getItems()),
            this.updateControls(),
            this.openGalleryOnItemClick(),
            this.LGel.trigger(b);
        }),
        (s.prototype.updateControls = function () {
          this.addSlideVideoInfo(this.galleryItems),
            this.updateCounterTotal(),
            this.manageSingleSlideClassName();
        }),
        (s.prototype.destroy = function () {
          var t = this,
            e = this.closeGallery(!0);
          return (
            setTimeout(function () {
              t.destroyModules(!0),
                t.settings.dynamic || t.invalidateItems(),
                i(window).off(".lg.global" + t.lgId),
                t.LGel.off(".lg"),
                t.$container.remove();
            }, e),
            e
          );
        }),
        s
      );
    })();
  return function (t, e) {
    return new B(t, e);
  };
});
