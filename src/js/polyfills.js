
//SVG POLYFILL******************************************************
(function () {
    if ("undefined" !== typeof window && window.addEventListener) {
        var e = Object.create(null),
            l, d = function () {
                clearTimeout(l);
                l = setTimeout(n, 100)
            },
            m = function () {},
            t = function () {
                window.addEventListener("resize", d, !1);
                window.addEventListener("orientationchange", d, !1);
                if (window.MutationObserver) {
                    var k = new MutationObserver(d);
                    k.observe(document.documentElement, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0
                    });
                    m = function () {
                        try {
                            k.disconnect(), window.removeEventListener("resize", d, !1), window.removeEventListener("orientationchange",
                                d, !1)
                        } catch (v) {}
                    }
                } else document.documentElement.addEventListener("DOMSubtreeModified", d, !1), m = function () {
                    document.documentElement.removeEventListener("DOMSubtreeModified", d, !1);
                    window.removeEventListener("resize", d, !1);
                    window.removeEventListener("orientationchange", d, !1)
                }
            },
            u = function (k) {
                function e(a) {
                    if (void 0 !== a.protocol) var c = a;
                    else c = document.createElement("a"), c.href = a;
                    return c.protocol.replace(/:/g, "") + c.host
                }
                if (window.XMLHttpRequest) {
                    var d = new XMLHttpRequest;
                    var m = e(location);
                    k = e(k);
                    d = void 0 ===
                        d.withCredentials && "" !== k && k !== m ? XDomainRequest || void 0 : XMLHttpRequest
                }
                return d
            };
        var n = function () {
            function d() {
                --q;
                0 === q && (m(), t())
            }

            function l(a) {
                return function () {
                    !0 !== e[a.base] && (a.useEl.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + a.hash), a.useEl.hasAttribute("href") && a.useEl.setAttribute("href", "#" + a.hash))
                }
            }

            function p(a) {
                return function () {
                    var c = document.body,
                        b = document.createElement("x");
                    a.onload = null;
                    b.innerHTML = a.responseText;
                    if (b = b.getElementsByTagName("svg")[0]) b.setAttribute("aria-hidden",
                        "true"), b.style.position = "absolute", b.style.width = 0, b.style.height = 0, b.style.overflow = "hidden", c.insertBefore(b, c.firstChild);
                    d()
                }
            }

            function n(a) {
                return function () {
                    a.onerror = null;
                    a.ontimeout = null;
                    d()
                }
            }
            var a, c, q = 0;
            m();
            var f = document.getElementsByTagName("use");
            for (c = 0; c < f.length; c += 1) {
                try {
                    var g = f[c].getBoundingClientRect()
                } catch (w) {
                    g = !1
                }
                var h = (a = f[c].getAttribute("href") || f[c].getAttributeNS("http://www.w3.org/1999/xlink", "href") || f[c].getAttribute("xlink:href")) && a.split ? a.split("#") : ["", ""];
                var b =
                    h[0];
                h = h[1];
                var r = g && 0 === g.left && 0 === g.right && 0 === g.top && 0 === g.bottom;
                g && 0 === g.width && 0 === g.height && !r ? (f[c].hasAttribute("href") && f[c].setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a), b.length && (a = e[b], !0 !== a && setTimeout(l({
                    useEl: f[c],
                    base: b,
                    hash: h
                }), 0), void 0 === a && (h = u(b), void 0 !== h && (a = new h, e[b] = a, a.onload = p(a), a.onerror = n(a), a.ontimeout = n(a), a.open("GET", b), a.send(), q += 1)))) : r ? b.length && e[b] && setTimeout(l({
                    useEl: f[c],
                    base: b,
                    hash: h
                }), 0) : void 0 === e[b] ? e[b] = !0 : e[b].onload && (e[b].abort(),
                    delete e[b].onload, e[b] = !0)
            }
            f = "";
            q += 1;
            d()
        };
        var p = function () {
            window.removeEventListener("load", p, !1);
            l = setTimeout(n, 0)
        };
        "complete" !== document.readyState ? window.addEventListener("load", p, !1) : p()
    }
})();

//OBJ-FIT Edge polyfill***********************************************
/*! npm.im/object-fit-images 3.2.3 */
var objectFitImages = function () {
    "use strict";

    function t(t, e) {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" + t + "' height='" + e + "'%3E%3C/svg%3E"
    }

    function e(t) {
        if (t.srcset && !m && window.picturefill) {
            var e = window.picturefill._;
            t[e.ns] && t[e.ns].evaled || e.fillImg(t, {
                reselect: !0
            }), t[e.ns].curSrc || (t[e.ns].supported = !1, e.fillImg(t, {
                reselect: !0
            })), t.currentSrc = t[e.ns].curSrc || t.src
        }
    }

    function i(t) {
        for (var e, i = getComputedStyle(t).fontFamily, r = {}; null !== (e = l.exec(i));) r[e[1]] = e[2];
        return r
    }

    function r(e, i, r) {
        var n = t(i || 1, r || 0);
        p.call(e, "src") !== n && b.call(e, "src", n)
    }

    function n(t, e) {
        t.naturalWidth ? e(t) : setTimeout(n, 100, t, e)
    }

    function c(t) {
        var c = i(t),
            o = t[a];
        if (c["object-fit"] = c["object-fit"] || "fill", !o.img) {
            if ("fill" === c["object-fit"]) return;
            if (!o.skipTest && g && !c["object-position"]) return
        }
        if (!o.img) {
            o.img = new Image(t.width, t.height), o.img.srcset = p.call(t, "data-ofi-srcset") || t.srcset, o.img.src = p.call(t, "data-ofi-src") || t.src, b.call(t, "data-ofi-src", t.src), t.srcset && b.call(t, "data-ofi-srcset", t.srcset), r(t, t.naturalWidth || t.width, t.naturalHeight || t.height), t.srcset && (t.srcset = "");
            try {
                s(t)
            } catch (t) {
                window.console && console.warn("https://bit.ly/ofi-old-browser")
            }
        }
        e(o.img), t.style.backgroundImage = 'url("' + (o.img.currentSrc || o.img.src).replace(/"/g, '\\"') + '")', t.style.backgroundPosition = c["object-position"] || "center", t.style.backgroundRepeat = "no-repeat", t.style.backgroundOrigin = "content-box", /scale-down/.test(c["object-fit"]) ? n(o.img, function () {
            o.img.naturalWidth > t.width || o.img.naturalHeight > t.height ? t.style.backgroundSize = "contain" : t.style.backgroundSize = "auto"
        }) : t.style.backgroundSize = c["object-fit"].replace("none", "auto").replace("fill", "100% 100%"), n(o.img, function (e) {
            r(t, e.naturalWidth, e.naturalHeight)
        })
    }

    function s(t) {
        var e = {
            get: function (e) {
                return t[a].img[e || "src"]
            },
            set: function (e, i) {
                return t[a].img[i || "src"] = e, b.call(t, "data-ofi-" + i, e), c(t), e
            }
        };
        Object.defineProperty(t, "src", e), Object.defineProperty(t, "currentSrc", {
            get: function () {
                return e.get("currentSrc")
            }
        }), Object.defineProperty(t, "srcset", {
            get: function () {
                return e.get("srcset")
            },
            set: function (t) {
                return e.set(t, "srcset")
            }
        })
    }

    function o(t, e) {
        var i = !h && !t;
        if (e = e || {}, t = t || "img", f && !e.skipTest || !d) return !1;
        "img" === t ? t = document.getElementsByTagName("img") : "string" == typeof t ? t = document.querySelectorAll(t) : "length" in t || (t = [t]);
        for (var r = 0; r < t.length; r++) t[r][a] = t[r][a] || {
            skipTest: e.skipTest
        }, c(t[r]);
        i && (document.body.addEventListener("load", function (t) {
            "IMG" === t.target.tagName && o(t.target, {
                skipTest: e.skipTest
            })
        }, !0), h = !0, t = "img"), e.watchMQ && window.addEventListener("resize", o.bind(null, t, {
            skipTest: e.skipTest
        }))
    }
    var a = "bfred-it:object-fit-images",
        l = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g,
        u = "undefined" == typeof Image ? {
            style: {
                "object-position": 1
            }
        } : new Image,
        g = "object-fit" in u.style,
        f = "object-position" in u.style,
        d = "background-size" in u.style,
        m = "string" == typeof u.currentSrc,
        p = u.getAttribute,
        b = u.setAttribute,
        h = !1;
    return o.supportsObjectFit = g, o.supportsObjectPosition = f,
        function () {
            function t(t, e) {
                return t[a] && t[a].img && ("src" === e || "srcset" === e) ? t[a].img : t
            }
            f || (HTMLImageElement.prototype.getAttribute = function (e) {
                return p.call(t(this, e), e)
            }, HTMLImageElement.prototype.setAttribute = function (e, i) {
                return b.call(t(this, e), e, String(i))
            })
        }(), o
}();

objectFitImages();

!function(t,e){"use strict";"function"==typeof define&&define.amd?define(["exports"],e):e("object"==typeof exports?exports:t)}(this,function(t){"use strict";function e(){return"clip-path-"+Math.random().toString(36).substring(7)}function i(t,i){i=i.replace(/px|%|em/g,"");var n=t.getAttribute("data-clip-path-id");if(n)document.querySelector("#"+n+" > polygon").setAttribute("points",i);else{var r=e(),o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("width","0"),o.setAttribute("height","0"),o.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");var a=document.createElementNS("http://www.w3.org/2000/svg","clipPath");a.setAttribute("id",r);var p=document.createElementNS("http://www.w3.org/2000/svg","polygon");p.setAttribute("points",i),a.appendChild(p),o.appendChild(a),document.body.appendChild(o),t.setAttribute("data-clip-path-id",r),setTimeout(function(){t.style.clipPath="url(#"+r+")"},0)}}function n(t,e,n){n=void 0!==n?n:o,void 0!==t.style.webkitClipPath?t.style.webkitClipPath="polygon("+e+")":n?t.style.clipPath="polygon("+e+")":i(t,e)}function r(t,e,i){if(!t)return console.error("Missing selector"),!1;var r=document.querySelectorAll(t||"");Array.prototype.forEach.call(r,function(t){var r=t.getAttribute("data-clip")||e;r?n(t,r,i):console.error("Missing clip-path parameters. Please check ClipPath() arguments or data-clip attribute.",t)})}var o=function(){var t=document.createElement("div");return t.style.clipPath="polygon(0 0, 0 0, 0 0, 0 0)","polygon(0 0, 0 0, 0 0, 0 0)"===t.style.clipPath}();r.applyClipPath=n,"undefined"!=typeof jQuery&&function(t,e){t.fn.ClipPath=function(i){return i===Object(i)&&i.path&&(i=i.path),this.each(function(){e.applyClipPath(this,t(this).attr("data-clip")||i)})}}(jQuery,r),t.ClipPath=r});

/*! picturefill - v3.0.2 - 2016-02-12
 * https://scottjehl.github.io/picturefill/
 * Copyright (c) 2016 https://github.com/scottjehl/picturefill/blob/master/Authors.txt; Licensed MIT
 */
