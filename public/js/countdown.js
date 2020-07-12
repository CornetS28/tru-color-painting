/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/*!
 * The Final Countdown for jQuery v2.0.4 (http://hilios.github.io/jQuery.countdown/)
 * Copyright (c) 2014 Edson Hilios
 * 
 
 */
!(function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery);
})(function (a) {
  function b(a) {
    if (a instanceof Date) return a;
    if (String(a).match(g))
      return (
        String(a).match(/^[0-9]*$/) && (a = Number(a)),
        String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")),
        new Date(a)
      );
    throw new Error("Couldn't cast `" + a + "` to a date object.");
  }
  function c(a) {
    return function (b) {
      var c = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
      if (c)
        for (var e = 0, f = c.length; f > e; ++e) {
          var g = c[e].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
            i = new RegExp(g[0]),
            j = g[1] || "",
            k = g[3] || "",
            l = null;
          (g = g[2]),
            h.hasOwnProperty(g) && ((l = h[g]), (l = Number(a[l]))),
            null !== l &&
              ("!" === j && (l = d(k, l)),
              "" === j && 10 > l && (l = "0" + l.toString()),
              (b = b.replace(i, l.toString())));
        }
      return (b = b.replace(/%%/, "%"));
    };
  }
  function d(a, b) {
    var c = "s",
      d = "";
    return (
      a &&
        ((a = a.replace(/(:|;|\s)/gi, "").split(/\,/)),
        1 === a.length ? (c = a[0]) : ((d = a[0]), (c = a[1]))),
      1 === Math.abs(b) ? d : c
    );
  }
  var e = 100,
    f = [],
    g = [];
  g.push(/^[0-9]*$/.source),
    g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),
    (g = new RegExp(g.join("|")));
  var h = {
      Y: "years",
      m: "months",
      w: "weeks",
      d: "days",
      D: "totalDays",
      H: "hours",
      M: "minutes",
      S: "seconds",
    },
    i = function (b, c, d) {
      (this.el = b),
        (this.$el = a(b)),
        (this.interval = null),
        (this.offset = {}),
        (this.instanceNumber = f.length),
        f.push(this),
        this.$el.data("countdown-instance", this.instanceNumber),
        d &&
          (this.$el.on("update.countdown", d),
          this.$el.on("stoped.countdown", d),
          this.$el.on("finish.countdown", d)),
        this.setFinalDate(c),
        this.start();
    };
  a.extend(i.prototype, {
    start: function () {
      null !== this.interval && clearInterval(this.interval);
      var a = this;
      this.update(),
        (this.interval = setInterval(function () {
          a.update.call(a);
        }, e));
    },
    stop: function () {
      clearInterval(this.interval),
        (this.interval = null),
        this.dispatchEvent("stoped");
    },
    pause: function () {
      this.stop.call(this);
    },
    resume: function () {
      this.start.call(this);
    },
    remove: function () {
      this.stop(),
        (f[this.instanceNumber] = null),
        delete this.$el.data().countdownInstance;
    },
    setFinalDate: function (a) {
      this.finalDate = b(a);
    },
    update: function () {
      return 0 === this.$el.closest("html").length
        ? void this.remove()
        : ((this.totalSecsLeft =
            this.finalDate.getTime() - new Date().getTime()),
          (this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1e3)),
          (this.totalSecsLeft =
            this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft),
          (this.offset = {
            seconds: this.totalSecsLeft % 60,
            minutes: Math.floor(this.totalSecsLeft / 60) % 60,
            hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
            days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
            totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
            weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
            months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30),
            years: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365),
          }),
          void (0 === this.totalSecsLeft
            ? (this.stop(), this.dispatchEvent("finish"))
            : this.dispatchEvent("update")));
    },
    dispatchEvent: function (b) {
      var d = a.Event(b + ".countdown");
      (d.finalDate = this.finalDate),
        (d.offset = a.extend({}, this.offset)),
        (d.strftime = c(this.offset)),
        this.$el.trigger(d);
    },
  }),
    (a.fn.countdown = function () {
      var b = Array.prototype.slice.call(arguments, 0);
      return this.each(function () {
        var c = a(this).data("countdown-instance");
        if (void 0 !== c) {
          var d = f[c],
            e = b[0];
          i.prototype.hasOwnProperty(e)
            ? d[e].apply(d, b.slice(1))
            : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)
            ? (d.setFinalDate.call(d, e), d.start())
            : a.error(
                "Method %s does not exist on jQuery.countdown".replace(
                  /\%s/gi,
                  e
                )
              );
        } else new i(this, b[0], b[1]);
      });
    });
});
