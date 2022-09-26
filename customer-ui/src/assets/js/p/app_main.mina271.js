function showVideoModal() {
  videoIsShown = !0;
  var t = document.getElementById("video-modal-background-shadow"),
    n = document.getElementById("video-modal-container");
  t.classList.add("show");
  n.getElementsByTagName("iframe")[0].src =
    n.getElementsByTagName("iframe")[0].dataset.src;
  document.body.classList.add("body-hide-scroller");
  n.classList.add("show");
  window.setTimeout(function () {
    t.classList.add("animate");
    n.classList.add("animate");
  }, 0);
  n.getElementsByTagName("iframe")[0].contentWindow.postMessage(
    '{"event":"command","func":"playVideo","args":""}',
    "*"
  );
}
function closeVideoModal() {
  videoIsShown = !1;
  var t = document.getElementById("video-modal-background-shadow"),
    n = document.getElementById("video-modal-container");
  n.getElementsByTagName("iframe")[0].contentWindow.postMessage(
    '{"event":"command","func":"stopVideo","args":""}',
    "*"
  );
  window.setTimeout(function () {
    t.classList.remove("animate");
    n.classList.remove("animate");
  }, 300);
  window.setTimeout(function () {
    t.classList.remove("show");
    n.classList.remove("show");
    document.body.classList.remove("body-hide-scroller");
  }, 1050);
}
function GetUrlBasePath() {
  return (
    "/" +
    window.location.pathname.split("/").filter(function (n) {
      return n != "";
    })[0]
  );
}
function createEmptyLead(n, t) {
  var i = new XMLHttpRequest();
  i.open(
    "POST",
    window.location.origin +
      (GetUrlBasePath() != "/undefined" ? GetUrlBasePath() : "") +
      "/CreateEmptyLead"
  );
  i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  i.setRequestHeader("Cache-Control", "no-cache");
  i.send("zip=" + encodeURI(n) + "&status=" + encodeURI(t));
}
window.NodeList &&
  !NodeList.prototype.forEach &&
  (NodeList.prototype.forEach = function (n, t) {
    t = t || window;
    for (var i = 0; i < this.length; i++) n.call(t, this[i], i, this);
  }),
  (function () {
    function n(n, t) {
      t = t || { bubbles: !1, cancelable: !1, detail: null };
      var i = document.createEvent("CustomEvent");
      return i.initCustomEvent(n, t.bubbles, t.cancelable, t.detail), i;
    }
    if (typeof window.CustomEvent == "function") return !1;
    window.CustomEvent = n;
  })();
Array.from ||
  (Array.from = (function () {
    var t = Object.prototype.toString,
      n = function (n) {
        return typeof n == "function" || t.call(n) === "[object Function]";
      },
      i = function (n) {
        var t = Number(n);
        return isNaN(t)
          ? 0
          : t === 0 || !isFinite(t)
          ? t
          : (t > 0 ? 1 : -1) * Math.floor(Math.abs(t));
      },
      r = Math.pow(2, 53) - 1,
      u = function (n) {
        var t = i(n);
        return Math.min(Math.max(t, 0), r);
      };
    return function (t) {
      var h = this,
        c = Object(t),
        i,
        o;
      if (t == null)
        throw new TypeError(
          "Array.from requires an array-like object - not null or undefined"
        );
      if (
        ((i = arguments.length > 1 ? arguments[1] : void undefined),
        typeof i != "undefined")
      ) {
        if (!n(i))
          throw new TypeError(
            "Array.from: when provided, the second argument must be a function"
          );
        arguments.length > 2 && (o = arguments[2]);
      }
      for (
        var f = u(c.length),
          s = n(h) ? Object(new h(f)) : new Array(f),
          r = 0,
          e;
        r < f;

      )
        (e = c[r]),
          (s[r] = i
            ? typeof o == "undefined"
              ? i(e, r)
              : i.call(o, e, r)
            : e),
          (r += 1);
      return (s.length = f), s;
    };
  })()),
  (function () {
    var n = {
      init: function () {
        n.addListeners();
        n.headerClassOnScroll();
        n.mobileMenu();
      },
      addListeners: function () {},
      headerClassOnScroll: function () {
        window.addEventListener("scroll", function () {
          window.pageYOffset > "0"
            ? document
                .querySelector(".page-header")
                .classList.add("page-header--with-shadow")
            : document
                .querySelector(".page-header")
                .classList.remove("page-header--with-shadow");
        });
      },
      mobileMenu: function () {
        try {
          var n = document.querySelector("#menuToggle"),
            t = document.querySelector(".page-header"),
            i = document.querySelector(".page-header__menu"),
            r =
              (document.querySelector("body"),
              document.querySelector(".l-wrapper")),
            u = document.querySelectorAll(".main-menu__item");
          n &&
            n.addEventListener("click", function () {
              n.classList.contains("is-active")
                ? (r.classList.remove("overlay-locked"),
                  t.classList.remove("page-header--inverse"),
                  n.classList.remove("is-active"),
                  i.classList.remove("is-visible"))
                : (r.classList.add("overlay-locked"),
                  t.classList.add("page-header--inverse"),
                  n.classList.add("is-active"),
                  i.classList.add("is-visible"));
            });
          window.innerWidth < 1199 &&
            Array.from(u).forEach(function (n) {
              n.addEventListener("click", function () {
                n.classList.contains("is-active")
                  ? (n.classList.remove("is-active"),
                    n
                      .querySelector(".main-menu__submenu")
                      .classList.remove("is-visible"))
                  : (Array.from(u).forEach(function (n) {
                      n.classList.remove("is-active");
                      n.querySelector(".main-menu__submenu").classList.remove(
                        "is-visible"
                      );
                    }),
                    n.classList.add("is-active"),
                    n
                      .querySelector(".main-menu__submenu")
                      .classList.add("is-visible"));
              });
            });
        } catch (n) {
          console.error("Some error occured:", n);
        }
      },
    };
    document.addEventListener("DOMContentLoaded", function () {
      n.init();
    });
  })(),
  (function () {
    function s(n) {
      if (r) return !0;
      if (t !== null) return t;
      r = !0;
      t = null;
      var u = new XMLHttpRequest();
      return (
        u.open("POST", "/data/checkzipcode/", !0),
        u.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
        u.setRequestHeader("Cache-Control", "no-cache"),
        (u.onloadend = function () {
          if (u.status === 200) {
            t = u.response === "true";
            var f = i("zip-state");
            t &&
              f &&
              document
                .querySelectorAll(".fill-zip-state")
                .forEach(function (n) {
                  n.innerHTML = f;
                });
          } else t = !1;
          r = !1;
          n.setCustomValidity(t ? "" : "Invalid zip code");
        }),
        u.send("ziptest=" + encodeURI(n.value)),
        !0
      );
    }
    function h(n, t) {
      if (r && f > 0)
        f--,
          window.setTimeout(function () {
            h(n, t);
          }, 500),
          t && (t.preventDefault(), t.target.classList.add("loading"));
      else if ((t.target.classList.remove("loading"), n.reportValidity())) {
        var i = new CustomEvent("submit");
        n.dispatchEvent(i);
      }
    }
    function c(n, t) {
      if (u && e > 0)
        e--,
          window.setTimeout(function () {
            c(n, t);
          }, 500),
          t && (t.preventDefault(), t.target.classList.add("loading"));
      else if (
        (t.target.classList.remove("loading"), n.reportValidity() && !r)
      ) {
        var i = new CustomEvent("submit");
        n.dispatchEvent(i);
      }
    }
    function a() {
      var i = o(),
        t;
      i.pf &&
        i.cmp === "qs" &&
        i.spa !== "1" &&
        ((u = !0),
        (t = new XMLHttpRequest()),
        t.open("POST", "/auto-insurance/GetTokenData", !0),
        t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
        t.setRequestHeader("Cache-Control", "no-cache"),
        (t.timeout = 5e3),
        (t.onloadend = function () {
          t.status === 200
            ? (console.info("token data loaded"), n("tdl", "1"))
            : (console.error("error loading token data"),
              t.status !== 0 &&
                n("cx_prefill_error", "qs_" + t.status + "_" + t.statusText));
          u = !1;
        }),
        (t.ontimeout = function () {
          n("cx_prefill_error", "qs_timeout");
        }),
        t.send("token=" + encodeURI(i.pf) + "&useValidator=" + i.usevalidator));
    }
    function i(n) {
      for (
        var t, r = n + "=", u = document.cookie.split(";"), i = 0;
        i < u.length;
        i++
      ) {
        for (t = u[i]; t.charAt(0) === " "; ) t = t.substring(1, t.length);
        if (t.indexOf(r) === 0) return t.substring(r.length, t.length);
      }
      return null;
    }
    function n(n, t, i) {
      var u = "",
        r;
      i &&
        ((r = new Date()),
        r.setTime(r.getTime() + i * 864e5),
        (u = "; expires=" + r.toUTCString()));
      t && (document.cookie = n + "=" + t + u + "; path=/");
    }
    function l(n) {
      var t = new Date();
      t.setTime(t.getTime() - 1e4);
      document.cookie = n + "=;expires=" + t.toUTCString() + ";path=/";
    }
    function o() {
      return (
        document.location.search
          .replace(/(^\?)/, "")
          .split("&")
          .filter(function (n) {
            return n != "";
          })
          .map(
            function (n) {
              return (n = n.split("=")), (this[n[0]] = n[1]), this;
            }.bind({})
          )[0] || {}
      );
    }
    function v() {
      var t = o(),
        f,
        u,
        r,
        e;
      for (
        n("zip", t.zip || "", 1),
          n("fname", t.fname || "", 1),
          n("lname", t.lname || "", 1),
          n("add", t.add || "", 1),
          n("education", t.edu || "", 1),
          n("credit_rating", t.credrate || "", 1),
          n("od_referrer", document.referrer, 365),
          n("od_localreferer", window.location.href, 365),
          f = [
            "eid",
            "clickid",
            "utm_source",
            "utm_medium",
            "utm_term",
            "utm_campaign",
            "s",
            "s1",
            "s2",
            "device",
            "adposition",
            "gclid",
            "ref",
            "ijsbid",
            "emailtracking",
          ],
          u = 0;
        u < f.length;
        u++
      )
        (r = f[u]),
          typeof t[r] != "undefined"
            ? ((e = t[r]),
              t.ns && r === "s" && (e = t.ns),
              (document.cookie = "od_" + r + "=" + e + "; path=/"))
            : i("od_" + r) === null &&
              i("d_od_" + r) !== null &&
              (document.cookie = "od_" + r + "=" + i("d_od_" + r) + "; path=/");
      t.msclkid && n("cx_msclkid", t.msclkid);
      y();
    }
    function y() {
      var t, n, i;
      try {
        t = o();
        for (n in t)
          (i = encodeURIComponent(t[n])),
            n.indexOf("cx_") === 0 &&
              (document.cookie = n + "=" + i + "; path=/");
      } catch (r) {
        console.error("error saving tracking variables", r);
      }
    }
    var r = !1,
      u = !1,
      t,
      f,
      e;
    document.querySelectorAll(".insurance-select").forEach(function (n) {
      n.addEventListener("change", function () {
        this.form.action = "/" + this.value + "/form";
      });
    });
    document.querySelectorAll(".zip").forEach(
      (setParentFilled = function (n) {
        n.addEventListener("input", function (n) {
          n.target.value != ""
            ? n.target.parentElement.classList.add("filled")
            : n.target.parentElement.classList.remove("filled");
          n.target.checkValidity() && n.target.classList.remove("invalid");
        });
      })
    );
    document.querySelectorAll(".insurance-select").forEach(setParentFilled);
    document.querySelectorAll(".btn--big").forEach(function (n) {
      n.addEventListener("click", function (n) {
        var i = this.form.querySelector(".zip"),
          t;
        i && !i.checkValidity() && i.classList.add("invalid");
        t = this.form.querySelector(".insurance-select");
        t && !t.checkValidity() && t.classList.add("invalid");
        this.form.checkValidity() &&
          (l("leadId"), l("carLeadId"), h(this.form, n), c(this.form, n));
      });
    });
    document.addEventListener("input", function (n) {
      n.target.setCustomValidity("");
      n.target.tagName == "INPUT" &&
        n.target.name == "zip" &&
        n.target.checkValidity() &&
        ((t = null),
        n.target.value.length < 5 &&
          n.target.setCustomValidity("Please enter 5 digits"),
        s(n.target) || n.target.setCustomValidity("Invalid zip code"));
    });
    window.addEventListener("load", function () {
      document
        .querySelectorAll("img[data-src],source[data-srcset]")
        .forEach(function (n) {
          n.dataset && n.dataset.src && (n.src = n.dataset.src);
          n.dataset && n.dataset.srcset && (n.srcset = n.dataset.srcset);
        });
    });
    document.addEventListener("DOMContentLoaded", function () {
      i("od_s") === null && n("d_od_s", "421");
      i("od_utm_source") === null && n("d_od_utm_source", "organic");
      i("od_utm_term") === null && n("d_od_utm_term", window.location.pathname);
      v();
      a();
    //   document.getElementsByClassName("zip")[0].value.length === 5 &&
    //     s(document.getElementsByClassName("zip")[0]);
    });
    document.querySelectorAll("form[data-medium]").forEach(function (t) {
      t.addEventListener("submit", function () {
        i("od_utm_medium") === null && n("d_od_utm_medium", t.dataset.medium);
      });
    });
    t = null;
    f = 60;
    e = 60;
  })();
// var videoIsShown = !1;
// document.getElementById("video-modal-background-shadow") &&
//   document
//     .getElementById("video-modal-background-shadow")
//     .addEventListener("click", function () {
//       videoIsShown && closeVideoModal();
//     });
