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

//OBJ-FIT polyfill**************************************************

// this.fitie = function (node) {
//     // restrict to valid object-fit value
//     var objectFit = node.currentStyle ? node.currentStyle['object-fit'] : null;

//     if (!objectFit || !/^(contain|cover|fill)$/.test(objectFit)) return;

//     // prepare container styles
//     var outerWidth = node.clientWidth;
//     var outerHeight = node.clientHeight;
//     var outerRatio = outerWidth / outerHeight;

//     var name = node.nodeName.toLowerCase();

//     var setCSS = node.runtimeStyle;
//     var getCSS = node.currentStyle;

//     var addEventListener = node.addEventListener || node.attachEvent;
//     var removeEventListener = node.removeEventListener || node.detachEvent;
//     var on = node.addEventListener ? '' : 'on';
//     var img = name === 'img';
//     var type = img ? 'load' : 'loadedmetadata';

//     addEventListener.call(node, on + type, onload);

//     if (node.complete) onload();

//     function onload() {
//         removeEventListener.call(node, on + type, onload);

//         // prepare container styles
//         var imgCSS = {
//             boxSizing: 'content-box',
//             display: 'inline-block',
//             overflow: 'hidden'
//         };

//         'backgroundColor backgroundImage borderColor borderStyle borderWidth bottom fontSize lineHeight height left opacity margin position right top visibility width'.replace(/\w+/g, function (key) {
//             imgCSS[key] = getCSS[key];
//         });

//         // prepare image styles
//         setCSS.border = setCSS.margin = setCSS.padding = 0;
//         setCSS.display = 'block';
//         setCSS.height = setCSS.width = 'auto';
//         setCSS.opacity = 1;

//         var innerWidth = node.videoWidth || node.width;
//         var innerHeight = node.videoHeight || node.height;
//         var innerRatio = innerWidth / innerHeight;

//         // style container
//         var imgx = document.createElement('object-fit');

//         imgx.appendChild(node.parentNode.replaceChild(imgx, node));

//         for (var key in imgCSS) imgx.runtimeStyle[key] = imgCSS[key];

//         // style image
//         var newSize;

//         if (objectFit === 'fill') {
//             if (img) {
//                 setCSS.width = outerWidth;
//                 setCSS.height = outerHeight;
//             } else {
//                 setCSS['-ms-transform-origin'] = '0% 0%';
//                 setCSS['-ms-transform'] = 'scale(' + outerWidth / innerWidth + ',' + outerHeight / innerHeight + ')';
//             }
//         } else if (innerRatio < outerRatio ? objectFit === 'contain' : objectFit === 'cover') {
//             newSize = outerHeight * innerRatio;

//             setCSS.width = Math.round(newSize) + 'px';
//             setCSS.height = outerHeight + 'px';
//             setCSS.marginLeft = Math.round((outerWidth - newSize) / 2) + 'px';
//         } else {
//             newSize = outerWidth / innerRatio;

//             setCSS.width = outerWidth + 'px';
//             setCSS.height = Math.round(newSize) + 'px';
//             setCSS.marginTop = Math.round((outerHeight - newSize) / 2) + 'px';
//         }
//     }
// };
// this.fitie.init = function () {
//     if (document.body) {
//         var all = document.querySelectorAll('img,video');
//         var index = -1;

//         while (all[++index]) fitie(all[index]);
//     } else {
//         setTimeout(fitie.init);
//     }
// };

// if (/MSIE|Trident/.test(navigator.userAgent)) this.fitie.init();

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
// OBJ POLY
// ! function () {
//     "use strict";
//     if ("undefined" != typeof window) {
//         var t = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
//             e = !!t && parseInt(t[1], 10) >= 16;
//         if ("objectFit" in document.documentElement.style != !1 && !e) return void(window.objectFitPolyfill = function () {
//             return !1
//         });
//         var i = function (t) {
//                 var e = window.getComputedStyle(t, null),
//                     i = e.getPropertyValue("position"),
//                     n = e.getPropertyValue("overflow"),
//                     o = e.getPropertyValue("display");
//                 i && "static" !== i || (t.style.position = "relative"), "hidden" !== n && (t.style.overflow = "hidden"), o && "inline" !== o || (t.style.display = "block"), 0 === t.clientHeight && (t.style.height = "100%"), -1 === t.className.indexOf("object-fit-polyfill") && (t.className = t.className + " object-fit-polyfill")
//             },
//             n = function (t) {
//                 var e = window.getComputedStyle(t, null),
//                     i = {
//                         "max-width": "none",
//                         "max-height": "none",
//                         "min-width": "0px",
//                         "min-height": "0px",
//                         top: "auto",
//                         right: "auto",
//                         bottom: "auto",
//                         left: "auto",
//                         "margin-top": "0px",
//                         "margin-right": "0px",
//                         "margin-bottom": "0px",
//                         "margin-left": "0px"
//                     };
//                 for (var n in i) {
//                     e.getPropertyValue(n) !== i[n] && (t.style[n] = i[n])
//                 }
//             },
//             o = function (t, e, i) {
//                 var n, o, l, a, d;
//                 if (i = i.split(" "), i.length < 2 && (i[1] = i[0]), "x" === t) n = i[0], o = i[1], l = "left", a = "right", d = e.clientWidth;
//                 else {
//                     if ("y" !== t) return;
//                     n = i[1], o = i[0], l = "top", a = "bottom", d = e.clientHeight
//                 }
//                 return n === l || o === l ? void(e.style[l] = "0") : n === a || o === a ? void(e.style[a] = "0") : "center" === n || "50%" === n ? (e.style[l] = "50%", void(e.style["margin-" + l] = d / -2 + "px")) : n.indexOf("%") >= 0 ? (n = parseInt(n), void(n < 50 ? (e.style[l] = n + "%", e.style["margin-" + l] = d * (n / -100) + "px") : (n = 100 - n, e.style[a] = n + "%", e.style["margin-" + a] = d * (n / -100) + "px"))) : void(e.style[l] = n)
//             },
//             l = function (t) {
//                 var e = t.dataset ? t.dataset.objectFit : t.getAttribute("data-object-fit"),
//                     l = t.dataset ? t.dataset.objectPosition : t.getAttribute("data-object-position");
//                 e = e || "cover", l = l || "50% 50%";
//                 var a = t.parentNode;
//                 i(a), n(t), t.style.position = "absolute", t.style.height = "100%", t.style.width = "auto", "scale-down" === e && (t.style.height = "auto", t.clientWidth < a.clientWidth && t.clientHeight < a.clientHeight ? (o("x", t, l), o("y", t, l)) : (e = "contain", t.style.height = "100%")), "none" === e ? (t.style.width = "auto", t.style.height = "auto", o("x", t, l), o("y", t, l)) : "cover" === e && t.clientWidth > a.clientWidth || "contain" === e && t.clientWidth < a.clientWidth ? (t.style.top = "0", t.style.marginTop = "0", o("x", t, l)) : "scale-down" !== e && (t.style.width = "100%", t.style.height = "auto", t.style.left = "0", t.style.marginLeft = "0", o("y", t, l))
//             },
//             a = function (t) {
//                 if (void 0 === t) t = document.querySelectorAll("[data-object-fit]");
//                 else if (t && t.nodeName) t = [t];
//                 else {
//                     if ("object" != typeof t || !t.length || !t[0].nodeName) return !1;
//                     t = t
//                 }
//                 for (var i = 0; i < t.length; i++)
//                     if (t[i].nodeName) {
//                         var n = t[i].nodeName.toLowerCase();
//                         "img" !== n || e ? "video" === n && (t[i].readyState > 0 ? l(t[i]) : t[i].addEventListener("loadedmetadata", function () {
//                             l(this)
//                         })) : t[i].complete ? l(t[i]) : t[i].addEventListener("load", function () {
//                             l(this)
//                         })
//                     }
//                 return !0
//             };
//         document.addEventListener("DOMContentLoaded", function () {
//             a()
//         }), window.addEventListener("resize", function () {
//             a()
//         }), window.objectFitPolyfill = a
//     }
// }();

//
!function(t,e){"use strict";"function"==typeof define&&define.amd?define(["exports"],e):e("object"==typeof exports?exports:t)}(this,function(t){"use strict";function e(){return"clip-path-"+Math.random().toString(36).substring(7)}function i(t,i){i=i.replace(/px|%|em/g,"");var n=t.getAttribute("data-clip-path-id");if(n)document.querySelector("#"+n+" > polygon").setAttribute("points",i);else{var r=e(),o=document.createElementNS("http://www.w3.org/2000/svg","svg");o.setAttribute("width","0"),o.setAttribute("height","0"),o.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink");var a=document.createElementNS("http://www.w3.org/2000/svg","clipPath");a.setAttribute("id",r);var p=document.createElementNS("http://www.w3.org/2000/svg","polygon");p.setAttribute("points",i),a.appendChild(p),o.appendChild(a),document.body.appendChild(o),t.setAttribute("data-clip-path-id",r),setTimeout(function(){t.style.clipPath="url(#"+r+")"},0)}}function n(t,e,n){n=void 0!==n?n:o,void 0!==t.style.webkitClipPath?t.style.webkitClipPath="polygon("+e+")":n?t.style.clipPath="polygon("+e+")":i(t,e)}function r(t,e,i){if(!t)return console.error("Missing selector"),!1;var r=document.querySelectorAll(t||"");Array.prototype.forEach.call(r,function(t){var r=t.getAttribute("data-clip")||e;r?n(t,r,i):console.error("Missing clip-path parameters. Please check ClipPath() arguments or data-clip attribute.",t)})}var o=function(){var t=document.createElement("div");return t.style.clipPath="polygon(0 0, 0 0, 0 0, 0 0)","polygon(0 0, 0 0, 0 0, 0 0)"===t.style.clipPath}();r.applyClipPath=n,"undefined"!=typeof jQuery&&function(t,e){t.fn.ClipPath=function(i){return i===Object(i)&&i.path&&(i=i.path),this.each(function(){e.applyClipPath(this,t(this).attr("data-clip")||i)})}}(jQuery,r),t.ClipPath=r});