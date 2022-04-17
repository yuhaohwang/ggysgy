var t = function () {
  return (t =
    Object.assign ||
    function (t) {
      for (var e, i = 1, o = arguments.length; i < o; i++)
        for (var r in (e = arguments[i]))
          Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
      return t
    }).apply(this, arguments)
}
function e(t, e, i, o) {
  return new (i || (i = Promise))(function (r, n) {
    function s(t) {
      try {
        h(o.next(t))
      } catch (t) {
        n(t)
      }
    }
    function a(t) {
      try {
        h(o.throw(t))
      } catch (t) {
        n(t)
      }
    }
    function h(t) {
      var e
      t.done
        ? r(t.value)
        : ((e = t.value),
          e instanceof i
            ? e
            : new i(function (t) {
                t(e)
              })).then(s, a)
    }
    h((o = o.apply(t, e || [])).next())
  })
}
function i(t, e) {
  var i,
    o,
    r,
    n,
    s = {
      label: 0,
      sent: function () {
        if (1 & r[0]) throw r[1]
        return r[1]
      },
      trys: [],
      ops: [],
    }
  return (
    (n = { next: a(0), throw: a(1), return: a(2) }),
    'function' == typeof Symbol &&
      (n[Symbol.iterator] = function () {
        return this
      }),
    n
  )
  function a(n) {
    return function (a) {
      return (function (n) {
        if (i) throw new TypeError('Generator is already executing.')
        for (; s; )
          try {
            if (
              ((i = 1),
              o &&
                (r =
                  2 & n[0]
                    ? o.return
                    : n[0]
                    ? o.throw || ((r = o.return) && r.call(o), 0)
                    : o.next) &&
                !(r = r.call(o, n[1])).done)
            )
              return r
            switch (((o = 0), r && (n = [2 & n[0], r.value]), n[0])) {
              case 0:
              case 1:
                r = n
                break
              case 4:
                return s.label++, { value: n[1], done: !1 }
              case 5:
                s.label++, (o = n[1]), (n = [0])
                continue
              case 7:
                ;(n = s.ops.pop()), s.trys.pop()
                continue
              default:
                if (
                  !((r = s.trys),
                  (r = r.length > 0 && r[r.length - 1]) || (6 !== n[0] && 2 !== n[0]))
                ) {
                  s = 0
                  continue
                }
                if (3 === n[0] && (!r || (n[1] > r[0] && n[1] < r[3]))) {
                  s.label = n[1]
                  break
                }
                if (6 === n[0] && s.label < r[1]) {
                  ;(s.label = r[1]), (r = n)
                  break
                }
                if (r && s.label < r[2]) {
                  ;(s.label = r[2]), s.ops.push(n)
                  break
                }
                r[2] && s.ops.pop(), s.trys.pop()
                continue
            }
            n = e.call(t, s)
          } catch (t) {
            ;(n = [6, t]), (o = 0)
          } finally {
            i = r = 0
          }
        if (5 & n[0]) throw n[1]
        return { value: n[0] ? n[1] : void 0, done: !0 }
      })([n, a])
    }
  }
}
var o,
  r = {
    MP_WEIXIN: 'mp-weixin',
    MP_QQ: 'mp-qq',
    MP_ALIPAY: 'mp-alipay',
    MP_BAIDU: 'mp-baidu',
    MP_TOUTIAO: 'mp-toutiao',
    H5: 'h5',
    WEB: 'web',
    PLUS: 'plus',
  },
  n = 'view',
  s = 'text',
  a = 'image',
  h = 'qrcode',
  d = 'block',
  l = 'inline-block',
  c = 'none',
  f = { ABSOLUTE: 'absolute', FIXED: 'fixed', RELATIVE: 'relative' },
  u = {
    display: d,
    color: '#000000',
    lineHeight: '1.4em',
    fontSize: 14,
    fontWeight: 400,
    fontFamily: 'sans-serif',
    lineCap: 'butt',
    textAlign: 'left',
    position: 'static',
    transformOrigin: 'center center',
  },
  g = {
    upx2px: function (t) {
      return (window.innerWidth / 750) * t
    },
    getSystemInfoSync: function () {
      return { screenWidth: window.innerWidth }
    },
    getImageInfo: function (t) {
      var e = t.src,
        i = t.success,
        o = t.fail,
        r = new Image()
      ;(r.onload = function () {
        i({ width: this.naturalWidth, height: this.naturalHeight, path: this.src, src: e })
      }),
        (r.onerror = o),
        (r.src = e)
    },
  },
  v =
    'object' == typeof swan
      ? r.MP_ALIPAY
      : 'object' == typeof tt
      ? r.MP_TOUTIAO
      : 'object' == typeof plus
      ? r.PLUS
      : 'object' == typeof window
      ? 'undefined' == typeof uni || ('undefined' != typeof uni && !uni.addInterceptor)
        ? r.WEB
        : r.H5
      : r.MP_WEIXIN,
  p =
    v == r.MP_WEIXIN
      ? wx
      : v == r.MP_TOUTIAO
      ? tt
      : 'undefined' != typeof uni
      ? uni.upx2px
        ? uni
        : Object.assign(uni, g)
      : 'undefined' != typeof window
      ? g
      : uni
if (!p.upx2px) {
  var b =
    (null !== (o = (p.getSystemInfoSync && p.getSystemInfoSync()).screenWidth) && void 0 !== o
      ? o
      : 375) / 750
  p.upx2px = function (t) {
    return b * t
  }
}
function w(t) {
  return /^-?\d+(\.\d+)?$/.test(t)
}
function x(t, e, i) {
  if ('number' == typeof t) return t
  if (w(t)) return 1 * t
  if ('string' == typeof t) {
    var o = /^-?([0-9]+)?([.]{1}[0-9]+){0,1}(em|rpx|px|%)$/g.exec(t)
    if (!t || !o) return 0
    var r = o[3]
    t = parseFloat(t)
    var n = 0
    return (
      'rpx' === r
        ? (n = p.upx2px(t))
        : 'px' === r
        ? (n = 1 * t)
        : '%' === r && e
        ? (n = (t * x(e)) / 100)
        : 'em' === r && e && (n = t * x(e || 14)),
      1 * n.toFixed(2)
    )
  }
  return 0
}
function m(t) {
  return new Promise(function (e, i) {
    p.downloadFile({
      url: t,
      success: function (t) {
        e(t.tempFilePath)
      },
      fail: i,
    })
  })
}
var y = function (t) {
    return !(!t || (!t.startsWith('linear') && !t.startsWith('radial')))
  },
  S = function (t, e, i, o, r, n) {
    t.startsWith('linear')
      ? (function (t, e, i, o, r, n) {
          for (
            var s = (function (t, e, i, o, r) {
                void 0 === o && (o = 0)
                void 0 === r && (r = 0)
                var n = t.match(/([-]?\d{1,3})deg/),
                  s = n && n[1] ? parseFloat(n[1]) : 0
                s >= 360 && (s -= 360)
                s < 0 && (s += 360)
                if (0 === (s = Math.round(s)))
                  return { x0: Math.round(e / 2) + o, y0: i + r, x1: Math.round(e / 2) + o, y1: r }
                if (180 === s)
                  return { x0: Math.round(e / 2) + o, y0: r, x1: Math.round(e / 2) + o, y1: i + r }
                if (90 === s)
                  return { x0: o, y0: Math.round(i / 2) + r, x1: e + o, y1: Math.round(i / 2) + r }
                if (270 === s)
                  return { x0: e + o, y0: Math.round(i / 2) + r, x1: o, y1: Math.round(i / 2) + r }
                var a = Math.round(
                  (180 * Math.asin(e / Math.sqrt(Math.pow(e, 2) + Math.pow(i, 2)))) / Math.PI
                )
                if (s === a) return { x0: o, y0: i + r, x1: e + o, y1: r }
                if (s === 180 - a) return { x0: o, y0: r, x1: e + o, y1: i + r }
                if (s === 180 + a) return { x0: e + o, y0: r, x1: o, y1: i + r }
                if (s === 360 - a) return { x0: e + o, y0: i + r, x1: o, y1: r }
                var h = 0,
                  d = 0,
                  l = 0,
                  c = 0
                if (s < a || (s > 180 - a && s < 180) || (s > 180 && s < 180 + a) || s > 360 - a) {
                  var f = (s * Math.PI) / 180,
                    u = s < a || s > 360 - a ? i / 2 : -i / 2,
                    g = Math.tan(f) * u,
                    v = s < a || (s > 180 - a && s < 180) ? e / 2 - g : -e / 2 - g
                  ;(h = -(l = g + (p = Math.pow(Math.sin(f), 2) * v))),
                    (d = -(c = u + p / Math.tan(f)))
                }
                if (
                  (s > a && s < 90) ||
                  (s > 90 && s < 90 + a) ||
                  (s > 180 + a && s < 270) ||
                  (s > 270 && s < 360 - a)
                ) {
                  var p
                  ;(f = ((90 - s) * Math.PI) / 180),
                    (g = (s > a && s < 90) || (s > 90 && s < 90 + a) ? e / 2 : -e / 2),
                    (u = Math.tan(f) * g),
                    (v = (s > a && s < 90) || (s > 270 && s < 360 - a) ? i / 2 - u : -i / 2 - u)
                  ;(h = -(l = g + (p = Math.pow(Math.sin(f), 2) * v) / Math.tan(f))),
                    (d = -(c = u + p))
                }
                return (
                  (h = Math.round(h + e / 2) + o),
                  (d = Math.round(i / 2 - d) + r),
                  (l = Math.round(l + e / 2) + o),
                  (c = Math.round(i / 2 - c) + r),
                  { x0: h, y0: d, x1: l, y1: c }
                )
              })(r, t, e, i, o),
              a = s.x0,
              h = s.y0,
              d = s.x1,
              l = s.y1,
              c = n.createLinearGradient(a, h, d, l),
              f = r.match(/linear-gradient\((.+)\)/)[1],
              u = z(f.substring(f.indexOf(',') + 1)),
              g = 0;
            g < u.colors.length;
            g++
          )
            c.addColorStop(u.percents[g], u.colors[g])
          n.setFillStyle(c)
        })(e, i, o, r, t, n)
      : t.startsWith('radial') &&
        (function (t, e, i, o, r, n) {
          for (
            var s = z(r.match(/radial-gradient\((.+)\)/)[1]),
              a = Math.round(t / 2) + i,
              h = Math.round(e / 2) + o,
              d = n.createRadialGradient(a, h, 0, a, h, Math.max(t, e) / 2),
              l = 0;
            l < s.colors.length;
            l++
          )
            d.addColorStop(s.percents[l], s.colors[l])
          n.setFillStyle(d)
        })(e, i, o, r, t, n)
  }
function z(t) {
  for (var e = [], i = [], o = 0, r = t.substring(0, t.length - 1).split('%,'); o < r.length; o++) {
    var n = r[o]
    e.push(n.substring(0, n.lastIndexOf(' ')).trim()),
      i.push(n.substring(n.lastIndexOf(' '), n.length) / 100)
  }
  return { colors: e, percents: i }
}
function B(t, e, i) {
  return (
    e in t
      ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 })
      : (t[e] = i),
    t
  )
}
function M() {
  return (M =
    Object.assign ||
    function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var i = arguments[e]
        for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
      }
      return t
    }).apply(this, arguments)
}
var P = 0,
  L = { left: null, top: null, width: null, height: null },
  R = (function () {
    function t(t, e, i, o) {
      var r = this
      B(this, 'id', P++),
        B(this, 'style', { left: null, top: null, width: null, height: null }),
        B(this, 'computedStyle', {}),
        B(this, 'originStyle', {}),
        B(this, 'children', {}),
        B(this, 'layoutBox', M({}, L)),
        B(this, 'contentSize', M({}, L, { maxLineHeight: 0 })),
        B(this, 'clientSize', M({}, L)),
        B(this, 'borderSize', M({}, L)),
        B(this, 'offsetSize', M({}, L)),
        (this.ctx = o),
        (this.root = i),
        e && (this.parent = e),
        (this.name = t.name || t.type),
        (this.attributes = this.getAttributes(t))
      var n = this.getComputedStyle(t, null == e ? void 0 : e.computedStyle)
      ;(this.isAbsolute = n.position == f.ABSOLUTE),
        (this.isFixed = n.position == f.FIXED),
        (this.originStyle = n),
        Object.keys(n).forEach(function (t) {
          Object.defineProperty(r.style, t, {
            configurable: !0,
            enumerable: !0,
            get: function () {
              return n[t]
            },
            set: function (e) {
              n[t] = e
            },
          })
        })
      var s = {
        contentSize: M({}, this.contentSize),
        clientSize: M({}, this.clientSize),
        borderSize: M({}, this.borderSize),
        offsetSize: M({}, this.offsetSize),
      }
      Object.keys(s).forEach(function (t) {
        Object.keys(r[t]).forEach(function (e) {
          Object.defineProperty(r[t], e, {
            configurable: !0,
            enumerable: !0,
            get: function () {
              return s[t][e]
            },
            set: function (i) {
              s[t][e] = i
            },
          })
        })
      }),
        (this.computedStyle = this.style)
    }
    var e = t.prototype
    return (
      (e.add = function (t) {
        ;(t.parent = this), (this.children[t.id] = t)
      }),
      (e.getChildren = function () {
        var t = this
        return Object.keys(this.children).map(function (e) {
          return t.children[e]
        })
      }),
      (e.getComputedStyle = function (t, e) {
        var i = ['color', 'fontSize', 'lineHeight', 'verticalAlign', 'fontWeight', 'textAlign'],
          o = t.css,
          r = void 0 === o ? {} : o,
          s = t.type,
          a = void 0 === s ? n : s,
          h = M({}, u)
        if ((['text', 'image'].includes(a) && !r.display && (h.display = 'inline-block'), e))
          for (var d = 0; d < i.length; d++) {
            var l = i[d]
            ;(r[l] || e[l]) && (r[l] = r[l] || e[l])
          }
        for (
          var c = function () {
              var t = v[g],
                e = r[t]
              if (/^(box)?shadow$/i.test(t)) {
                var i = []
                return (
                  e.replace(/((\d+(rpx|px)?\s+?){3})(.+)/, function () {
                    for (var t = arguments.length, e = new Array(t), o = 0; o < t; o++)
                      e[o] = arguments[o]
                    i = e[1]
                      .match(/\d+(rpx|px)?/g)
                      .map(function (t) {
                        return x(t)
                      })
                      .concat(e[4])
                  }),
                  (h.boxShadow = i),
                  'continue'
                )
              }
              if (/^border/i.test(t) && !/radius$/i.test(t)) {
                var o,
                  n = t.match(/^border([BTRLa-z]+)?/)[0],
                  s = t.match(/[W|S|C][a-z]+/),
                  d = e
                    .replace(/([\(,])\s+|\s+([\),])/g, '$1$2')
                    .split(' ')
                    .map(function (t) {
                      return /^\d/.test(t) ? x(t, '') : t
                    })
                return (
                  (h[n] =
                    (((o = {})[n + 'Width'] = w(d[0]) ? d[0] : 0),
                    (o[n + 'Style'] = d[1] || 'solid'),
                    (o[n + 'Color'] = d[2] || 'black'),
                    o)),
                  1 == d.length && s && (h[n][n + s[0]] = d[0]),
                  'continue'
                )
              }
              if (/^background(color)?$/i.test(t)) return (h.backgroundColor = e), 'continue'
              if (/^objectPosition$/i.test(t)) return (h[t] = e.split(' ')), 'continue'
              if (/padding|margin|radius/i.test(t)) {
                var l = /radius$/i.test(t),
                  c = l ? 'borderRadius' : t.match(/[a-z]+/)[0],
                  u = [0, 0, 0, 0].map(function (t, e) {
                    return l
                      ? [
                          'borderTopLeftRadius',
                          'borderTopRightRadius',
                          'borderBottomRightRadius',
                          'borderBottomLeftRadius',
                        ][e]
                      : [c + 'Top', c + 'Right', c + 'Bottom', c + 'Left'][e]
                  }),
                  p = 'margin',
                  b = 'auto'
                if ('padding' === t || t === p || /^(border)?radius$/i.test(t)) {
                  var m,
                    y = (null == e
                      ? void 0
                      : e.split(' ').map(function (e) {
                          return /^\d+(rpx|px)?$/.test(e) ? x(e) : t != p && /auto/.test(e) ? 0 : e
                        }, [])) || [0],
                    S = l ? 'borderRadius' : t,
                    z = y[0],
                    B = y[1],
                    M = y[2],
                    P = y[3]
                  h[S] =
                    (((m = {})[u[0]] = z == b ? 0 : z),
                    (m[u[1]] = w(B) ? B : z),
                    (m[u[2]] = (w(M) ? M : z) == b ? 0 : w(M) ? M : z),
                    (m[u[3]] = w(P) ? P : B || z),
                    m)
                } else {
                  var L
                  if ('object' == typeof h[c])
                    h[c][t] = (c == p && e == b) || /%$/.test(e) ? e : x(e)
                  else
                    (h[c] =
                      (((L = {})[u[0]] = h[c] || 0),
                      (L[u[1]] = h[c] || 0),
                      (L[u[2]] = h[c] || 0),
                      (L[u[3]] = h[c] || 0),
                      L)),
                      (h[c][t] = (c == p && e == b) || /%$/.test(e) ? e : x(e))
                }
                return 'continue'
              }
              if (/^transform$/i.test(t))
                return (
                  (h[t] = {}),
                  e.replace(/([a-zA-Z]+)\(([0-9,-\.%rpxdeg\s]+)\)/g, function (e, i, o) {
                    var n = o.split(',').map(function (t) {
                        return t.replace(/(^\s*)|(\s*$)/g, '')
                      }),
                      s = function (t, e) {
                        return t.includes('deg') ? 1 * t : e && !/%$/.test(e) ? x(t, e) : t
                      }
                    i.includes('matrix')
                      ? (h[t][i] = n.map(function (t) {
                          return 1 * t
                        }))
                      : i.includes('rotate')
                      ? (h[t][i] = 1 * o.match(/^-?\d+(\.\d+)?/)[0])
                      : /[X, Y]/.test(i)
                      ? (h[t][i] = /[X]/.test(i) ? s(n[0], r.width) : s(n[0], r.height))
                      : ((h[t][i + 'X'] = s(n[0], r.width)),
                        (h[t][i + 'Y'] = s(n[1] || n[0], r.height)))
                  }),
                  'continue'
                )
              ;/^font$/i.test(t) && console.error('font 不支持简写'),
                /^left|top$/i.test(t) && ![f.ABSOLUTE, f.FIXED].includes(r.position)
                  ? (h[t] = 0)
                  : (h[t] = /^[\d\.]+(px|rpx)?$/.test(e)
                      ? x(e)
                      : /em$/.test(e) && 'text' == a
                      ? x(e, r.fontSize)
                      : e)
            },
            g = 0,
            v = Object.keys(r);
          g < v.length;
          g++
        )
          c()
        return h
      }),
      (e.setPosition = function (t, e) {
        var i = { left: 'width', top: 'height', right: 'width', bottom: 'height' }
        Object.keys(i).forEach(function (o) {
          var r = 'right' == o ? 'left' : 'top'
          ;['right', 'bottom'].includes(o) &&
          void 0 !== t.style[o] &&
          'number' != typeof t.originStyle[r]
            ? (t.style[r] = e[i[o]] - t.offsetSize[i[o]] - x(t.style[o], e[i[o]]))
            : (t.style[o] = x(t.style[o], e[i[o]]))
        })
      }),
      (e.getAttributes = function (t) {
        var e = t.attributes || {}
        return (
          (t.url || t.src) && (e.src = e.src || t.url || t.src),
          t.replace && (e.replace = t.replace),
          t.text && (e.text = t.text),
          e
        )
      }),
      (e.getOffsetSize = function (t, e, i) {
        void 0 === i && (i = 'offsetSize')
        var o = e || {},
          r = o.margin,
          n = (r = void 0 === r ? {} : r).marginLeft,
          s = void 0 === n ? 0 : n,
          a = r.marginTop,
          h = void 0 === a ? 0 : a,
          d = r.marginRight,
          l = void 0 === d ? 0 : d,
          c = r.marginBottom,
          f = void 0 === c ? 0 : c,
          u = o.padding,
          g = (u = void 0 === u ? {} : u).paddingLeft,
          v = void 0 === g ? 0 : g,
          p = u.paddingTop,
          b = void 0 === p ? 0 : p,
          w = u.paddingRight,
          x = void 0 === w ? 0 : w,
          m = u.paddingBottom,
          y = void 0 === m ? 0 : m,
          S = o.border,
          z = (S = void 0 === S ? {} : S).borderWidth,
          B = void 0 === z ? 0 : z,
          M = o.borderTop,
          P = (M = void 0 === M ? {} : M).borderTopWidth,
          L = void 0 === P ? B : P,
          R = o.borderBottom,
          I = (R = void 0 === R ? {} : R).borderBottomWidth,
          k = void 0 === I ? B : I,
          T = o.borderRight,
          W = (T = void 0 === T ? {} : T).borderRightWidth,
          O = void 0 === W ? B : W,
          A = o.borderLeft,
          F = (A = void 0 === A ? {} : A).borderLeftWidth,
          C = void 0 === F ? B : F,
          j = s < 0 && l < 0 ? Math.abs(s + l) : 0,
          E = h < 0 && f < 0 ? Math.abs(h + f) : 0,
          H = s >= 0 && l < 0,
          U = h >= 0 && f < 0
        return (
          'contentSize' == i &&
            ((this[i].left = t.left + s + v + C + (H ? 2 * -l : 0)),
            (this[i].top = t.top + h + b + L + (U ? 2 * -f : 0)),
            (this[i].width = t.width + (this[i].widthAdd ? 0 : j)),
            (this[i].height = t.height + (this[i].heightAdd ? 0 : E)),
            (this[i].widthAdd = j),
            (this[i].heightAdd = E)),
          'clientSize' == i &&
            ((this[i].left = t.left + s + C + (H < 0 ? -l : 0)),
            (this[i].top = t.top + h + L + (U ? -f : 0)),
            (this[i].width = t.width + v + x),
            (this[i].height = t.height + b + y)),
          'borderSize' == i &&
            ((this[i].left = t.left + s + C / 2 + (H < 0 ? -l : 0)),
            (this[i].top = t.top + h + L / 2 + (U ? -f : 0)),
            (this[i].width = t.width + v + x + C / 2 + O / 2),
            (this[i].height = t.height + b + y + k / 2 + L / 2)),
          'offsetSize' == i &&
            ((this[i].left = t.left + (H < 0 ? -l : 0)),
            (this[i].top = t.top + (U ? -f : 0)),
            (this[i].width = t.width + v + x + C + O + s + l),
            (this[i].height = t.height + b + y + k + L + f + h)),
          this[i]
        )
      }),
      (e.layoutBoxUpdate = function (t, e, i, o) {
        if ((void 0 === i && (i = -1), 'border-box' == e.boxSizing)) {
          var r = e || {},
            n = r.border,
            s = (n = void 0 === n ? {} : n).borderWidth,
            a = void 0 === s ? 0 : s,
            h = r.borderTop,
            d = (h = void 0 === h ? {} : h).borderTopWidth,
            l = void 0 === d ? a : d,
            c = r.borderBottom,
            f = (c = void 0 === c ? {} : c).borderBottomWidth,
            u = void 0 === f ? a : f,
            g = r.borderRight,
            v = (g = void 0 === g ? {} : g).borderRightWidth,
            p = void 0 === v ? a : v,
            b = r.borderLeft,
            w = (b = void 0 === b ? {} : b).borderLeftWidth,
            x = void 0 === w ? a : w,
            m = r.padding,
            y = (m = void 0 === m ? {} : m).paddingTop,
            S = void 0 === y ? 0 : y,
            z = m.paddingRight,
            B = void 0 === z ? 0 : z,
            M = m.paddingBottom,
            P = void 0 === M ? 0 : M,
            L = m.paddingLeft,
            R = void 0 === L ? 0 : L
          i || (t.width -= R + B + p + x), 1 !== i || o || (t.height -= S + P + l + u)
        }
        this.layoutBox &&
          ((this.layoutBox.contentSize = this.getOffsetSize(t, e, 'contentSize')),
          (this.layoutBox.clientSize = this.getOffsetSize(t, e, 'clientSize')),
          (this.layoutBox.borderSize = this.getOffsetSize(t, e, 'borderSize')),
          (this.layoutBox.offsetSize = this.getOffsetSize(t, e, 'offsetSize')),
          (this.layoutBox = Object.assign({}, this.layoutBox, this.layoutBox.borderSize)))
      }),
      (e.getBoxPosition = function (t) {
        var e = this.computedStyle,
          i = this.getChildren(),
          o = e.verticalAlign,
          r = e.left,
          n = void 0 === r ? 0 : r,
          s = e.top,
          a = void 0 === s ? 0 : s,
          h = e.textAlign,
          d = M({}, this.contentSize, { left: n, top: a }),
          l = this.contentSize.top - this.offsetSize.top,
          c = this.contentSize.left - this.offsetSize.left,
          f = 0
        if (
          ('bottom' == o && this.contentSize.maxLineHeight
            ? (f = this.contentSize.maxLineHeight - this.contentSize.height)
            : 'middle' == o &&
              this.contentSize.maxLineHeight &&
              (f = (this.contentSize.maxLineHeight - this.contentSize.height) / 2),
          (d.top += f),
          i.length)
        ) {
          ;(n += c), (a += l)
          for (var u = null, g = null, v = !1, p = 0, b = 0; b < i.length; b++) {
            var w = i[b]
            if (w.isAbsolute || w.isFixed)
              p++,
                w.isAbsolute
                  ? (w.setPosition(w, d),
                    (w.style.left += n),
                    (w.style.top += a),
                    w.getBoxPosition())
                  : (w.setPosition(w, this.root), w.getBoxPosition())
            else {
              var x = b - p,
                m = 0
              if (h && this.isInline(w)) {
                var y = this.contentSize.width - w.contentSize.maxLineWidth || 0
                'center' == h && y > 1 && (m = y / 2), 'right' == h && y > 1 && (m = y)
              }
              if (0 == x)
                (w.style.left += n + m), (w.style.top += a), w.getBoxPosition(), (u = w), (g = w)
              else {
                var S, z, B, P
                ;(null == (S = g) ? void 0 : S.offsetSize.height) <
                  (null == (z = u) ? void 0 : z.offsetSize.height) && (g = u)
                var L =
                  (null == (B = u) ? void 0 : B.offsetSize.left) +
                    (null == (P = u) ? void 0 : P.offsetSize.width) +
                    w.offsetSize.width >
                  d.left + d.width + c
                if (this.getBoxState(u, w) || L) {
                  var R, I, k, T, W, O
                  if (
                    ((w.style.left += n + m),
                    (null == (R = u) ? void 0 : R.offsetSize.height) >=
                      (null == (I = g) ? void 0 : I.offsetSize.height))
                  )
                    w.style.top +=
                      (null == (k = u) ? void 0 : k.offsetSize.top) +
                        (null == (T = u) ? void 0 : T.offsetSize.height) || 0
                  else
                    w.style.top +=
                      (null == (W = g) ? void 0 : W.offsetSize.top) +
                        (null == (O = g) ? void 0 : O.offsetSize.height) || 0
                  w.getBoxPosition(), (u = w), (g = w), (v = !0)
                } else {
                  var A, F, C
                  if (
                    ((w.style.left +=
                      (null == (A = u) ? void 0 : A.offsetSize.left) +
                        (null == (F = u) ? void 0 : F.offsetSize.width) || 0),
                    v)
                  )
                    w.style.top += null == (C = u) ? void 0 : C.offsetSize.top
                  else w.style.top += a
                  w.getBoxPosition(), (u = w)
                }
              }
            }
          }
          this.layoutBoxUpdate(d, e)
        } else this.layoutBoxUpdate(d, e)
        return this.layoutBox
      }),
      (e.setMaxLineHeight = function (t, e, i) {
        for (var o = t; o >= 0 && !e[o].contentSize.maxLineHeight; )
          (e[o].contentSize.maxLineHeight = i), o--
      }),
      (e.setMaxLineWidth = function (t, e, i) {
        for (
          var o = t;
          o >= 0 && (null == (r = e[o]) || null == (n = r.contentSize) || !n.maxLineWidth);

        ) {
          var r, n
          ;(e[o].contentSize.maxLineWidth = i), o--
        }
      }),
      (e.getBoxState = function (t, e) {
        return this.isBlock(t) || this.isBlock(e)
      }),
      (e.isBlock = function (t) {
        return t && t.style.display == d
      }),
      (e.isInline = function (t) {
        return !this.isBlock(t)
      }),
      (e.getBoxHieght = function () {
        var t,
          e = this,
          i = this.name,
          o = this.computedStyle,
          r = this.attributes,
          n = this.parent,
          h = this.getChildren(),
          d = o.top,
          l = o.bottom,
          c = o.height,
          f = void 0 === c ? 0 : c,
          u = o.fontSize,
          g = o.position,
          v = o.lineHeight,
          p = o.minHeight,
          b = o.maxHeight,
          w = M({}, this.contentSize)
        if (
          (/%$/.test(p) && n.contentSize.height && (p = x(p, n.contentSize.height)),
          /%$/.test(b) && n.contentSize.height && (b = x(b, n.contentSize.height)),
          i == a && null == f)
        ) {
          var m = r.width,
            y = r.height
          r.mode,
            (w.height = this.contrastSize(Math.round((w.width * y) / m) || 0, p, b)),
            this.layoutBoxUpdate(w, o, 1)
        } else if (f)
          if (h.length) {
            ;(w.height = this.contrastSize(w.height, p, b)), this.layoutBoxUpdate(w, o)
            var S = null,
              z = 0,
              B = 0
            h.forEach(function (t, i) {
              var o = i == h.length - 1
              if ((t.getBoxHieght(), t.isAbsolute || t.isFixed));
              else {
                var r = z + t.offsetSize.width > w.left + w.width,
                  n = e.getBoxState(S, t)
                if (r || n) {
                  if (r) {
                    for (var s = i - 1; s >= 0 && !h[s].contentSize.maxLineHeight; )
                      B < h[s].contentSize.height && (B = h[s].contentSize.height), s--
                    e.setMaxLineHeight(i - 1, h, B),
                      e.setMaxLineWidth(i - 1, h, z),
                      (B = 0),
                      (z = t.offsetSize.width)
                  }
                  o && e.setMaxLineWidth(i, h, t.offsetSize.width)
                } else {
                  if (((z += t.offsetSize.width), o)) {
                    for (var a = i; a >= 0 && !h[a].contentSize.maxLineHeight; )
                      B < h[a].contentSize.height && (B = h[a].contentSize.height), a--
                    e.setMaxLineHeight(i, h, B),
                      e.setMaxLineWidth(i, h, z),
                      (B = 0),
                      (z = t.offsetSize.width)
                  }
                  S = t
                }
              }
            })
          } else (w.height = this.contrastSize(w.height, p, b)), this.layoutBoxUpdate(w, o, 1)
        else {
          var P = 0
          if (null != d ? d : this.isAbsolute || (this.isFixed && n.contentSize.height)) {
            var L = 'absolute' == g ? n.contentSize.height : this.root.height
            P = L - (/%$/.test(d) ? x(d, L) : d) - (/%$/.test(l) ? x(l, L) : l)
          }
          if (i == s)
            (v = x(v, u)),
              (w.height = P || this.contrastSize(this.attributes.lines * v, p, b)),
              this.layoutBoxUpdate(w, o, 1, !0)
          else if (h.length) {
            var R = 0,
              I = null,
              k = 0
            ;(w.height = h.reduce(function (t, i, o) {
              var r = o == h.length - 1
              if (i.isAbsolute || i.isFixed) return i.getBoxHieght(), r ? t + R : t
              i.getBoxHieght()
              var n = e.getBoxState(I, i),
                s = k + i.offsetSize.width > w.width
              if (s || n) {
                var a = 0
                return s || (I && e.isInline(I))
                  ? (e.setMaxLineHeight(o - 1, h, R),
                    e.setMaxLineWidth(o - 1, h, k),
                    r &&
                      (e.setMaxLineHeight(o, h, R),
                      e.setMaxLineWidth(o, h, i.offsetSize.width),
                      (R += i.offsetSize.height)),
                    (a = t + R),
                    (R = i.offsetSize.height),
                    (k = i.offsetSize.width),
                    (I = i),
                    a)
                  : ((k = 0), (R = 0), t + i.offsetSize.height)
              }
              return (
                (k += i.offsetSize.width),
                (R = Math.max(R, i.offsetSize.height) || 0),
                r ? (e.setMaxLineHeight(o, h, R), e.setMaxLineWidth(o, h, k), t + R) : ((I = i), t)
              )
            }, 0)),
              P && (w.height = P),
              this.layoutBoxUpdate(w, o)
          } else P && (w.height = P), this.layoutBoxUpdate(w, o, 1)
        }
        if (o.borderRadius && null != (t = this.borderSize) && t.width)
          for (var T in o.borderRadius)
            Object.hasOwnProperty.call(o.borderRadius, T) &&
              (o.borderRadius[T] = x(o.borderRadius[T], this.borderSize.width))
        return this.layoutBox
      }),
      (e.contrastSize = function (t, e, i) {
        var o = t
        return i && (o = Math.min(o, i)), e && (o = Math.max(o, e)), o
      }),
      (e.measureText = function (t, e) {
        var i = this.ctx.measureText(t)
        return { width: i.width, fontHeight: (i.actualBoundingBoxAscent || 0.7 * e) + 1 }
      }),
      (e.getBoxWidth = function () {
        var t,
          e = this,
          i = this.name,
          o = this.computedStyle,
          r = this.attributes,
          h = this.parent,
          c = void 0 === h ? {} : h,
          f = this.ctx,
          u = this.getChildren(),
          g = o.left,
          v = void 0 === g ? 0 : g,
          p = o.top,
          b = void 0 === p ? 0 : p,
          w = o.right,
          m = o.width,
          y = void 0 === m ? 0 : m,
          S = o.minWidth,
          z = o.maxWidth,
          B = o.height,
          M = void 0 === B ? 0 : B,
          P = o.fontSize,
          L = void 0 === P ? 14 : P,
          R = o.fontWeight,
          I = o.fontFamily,
          k = o.fontStyle,
          T = o.position,
          W = o.display,
          O = o.lineClamp,
          A = o.padding,
          F = void 0 === A ? {} : A,
          C = o.margin,
          j = void 0 === C ? {} : C,
          E = o.border,
          H = (E = void 0 === E ? {} : E).borderWidth,
          U = void 0 === H ? 0 : H,
          $ = o.borderRight,
          _ = ($ = void 0 === $ ? {} : $).borderRightWidth,
          D = void 0 === _ ? U : _,
          X = o.borderLeft,
          N = (X = void 0 === X ? {} : X).borderLeftWidth,
          V = void 0 === N ? U : N
        if (
          (/%$/.test(y) && c.contentSize.width && (y = x(y, c.contentSize.width)),
          /%$/.test(M) && c.contentSize.height && (M = x(M, c.contentSize.height)),
          /%$/.test(S) && c.contentSize.width && (S = x(S, c.contentSize.width)),
          /%$/.test(z) && c.contentSize.width && (z = x(z, c.contentSize.width)),
          o.padding && null != (t = c.contentSize) && t.width)
        )
          for (var Y in o.padding)
            Object.hasOwnProperty.call(o.padding, Y) &&
              (o.padding[Y] = x(o.padding[Y], c.contentSize.width))
        var q = F.paddingRight,
          G = void 0 === q ? 0 : q,
          Q = F.paddingLeft,
          J = void 0 === Q ? 0 : Q
        if (o.margin && [o.margin.marginLeft, o.margin.marginRight].includes('auto'))
          if (y) {
            var Z = c.contentSize.width - y - G - J - V - D || 0
            o.margin.marginLeft == o.margin.marginRight
              ? (o.margin.marginLeft = o.margin.marginRight = Z / 2)
              : 'auto' == o.margin.marginLeft
              ? (o.margin.marginLeft = Z)
              : (o.margin.marginRight = Z)
          } else o.margin.marginLeft = o.margin.marginRight = 0
        var K = j.marginRight,
          tt = void 0 === K ? 0 : K,
          et = j.marginLeft,
          it = { width: y, height: M, left: 0, top: 0 },
          ot = J + G + V + D + (void 0 === et ? 0 : et) + tt
        if (i == s && !this.attributes.widths) {
          var rt = r.text || ''
          f.save(), f.setFonts({ fontFamily: I, fontSize: L, fontWeight: R, fontStyle: k })
          var nt = new Map()
          rt.split('\n').map(function (t) {
            var i = t.split('').map(function (t) {
              var i = nt.get(t)
              if (i) return i
              var o = e.measureText(t, L).width
              return nt.set(t, o), o
            })
            ;(e.attributes.fontHeight = e.measureText(t, L).fontHeight),
              e.attributes.widths || (e.attributes.widths = []),
              e.attributes.widths.push({
                widths: i,
                total: i.reduce(function (t, e) {
                  return t + e
                }, 0),
              })
          }),
            f.restore()
        }
        if (i == a && null == y) {
          var st = r.width,
            at = r.height
          ;(it.width = this.contrastSize(Math.round((st * M) / at) || 0, S, z)),
            this.layoutBoxUpdate(it, o, 0)
        } else if (y)
          u.length
            ? ((it.width = this.contrastSize(it.width, S, z)),
              this.layoutBoxUpdate(it, o, 0),
              u.forEach(function (t) {
                t.getBoxWidth()
              }))
            : ((it.width = this.contrastSize(it.width, S, z)), this.layoutBoxUpdate(it, o, 0))
        else {
          var ht = 0
          if ((this.isAbsolute || this.isFixed) && c.contentSize.width && i != s) {
            var dt = 'absolute' == T ? c.contentSize.width : this.root.width
            ht = dt - (/%$/.test(v) ? x(v, dt) : v) - (/%$/.test(w) ? x(w, dt) : w)
          }
          if (i == s) {
            var lt = this.attributes.widths,
              ct = Math.max.apply(
                Math,
                lt.map(function (t) {
                  return t.total
                })
              )
            if (
              c &&
              c.contentSize.width > 0 &&
              (ct > c.contentSize.width || W == d) &&
              !this.isAbsolute &&
              !this.isFixed
            )
              ct = c.contentSize.width - ot
            ;(it.width = ht || this.contrastSize(ct, S, z)), this.layoutBoxUpdate(it, o, 0)
          } else if (i != n || !c || W === l || this.isAbsolute || this.isFixed)
            if (u.length) {
              for (var ft = 0, ut = null, gt = 0; u.length > gt; ) {
                var vt = u[gt],
                  pt = gt == u.length - 1,
                  bt = this.getBoxState(ut, vt)
                if (vt.isFixed || vt.isAbsolute) vt.getBoxWidth()
                else if (!ut || bt) {
                  var wt = vt.getBoxWidth()
                  ;(ft = Math.max(ft, wt.width) || 0), (ut = vt)
                } else if (
                  ut.offsetSize.left + ut.offsetSize.width + vt.offsetSize.width <
                    c.contentSize.width &&
                  gt !== u.length - 1
                ) {
                  ;(ft += vt.getBoxWidth().width), (ut = vt)
                } else {
                  var xt = vt.getBoxWidth()
                  pt ? (ft += xt.width) : (ft = c.contentSize.width), (ut = null)
                }
                gt++
              }
              ;(it.width = ht && b ? ht : this.contrastSize(Math.ceil(ft), S, z)),
                u.forEach(function (t) {
                  t.style.display != d ||
                    t.name != s ||
                    t.isFixed ||
                    t.isAbsolute ||
                    t.style.width ||
                    ((t.style.width = it.width), t.getBoxWidth())
                }),
                this.layoutBoxUpdate(it, o, 0)
            } else (it.width = ht), this.layoutBoxUpdate(it, o, 0)
          else
            (it.width = this.contrastSize(c.contentSize.width - ot, S, z)),
              this.layoutBoxUpdate(it, o),
              u.length &&
                u.forEach(function (t) {
                  t.getBoxWidth()
                })
        }
        if (i == s && !this.attributes.lines) {
          var mt = this.attributes.widths.length
          this.attributes.widths.forEach(function (t) {
            return t.widths.reduce(function (t, e, i) {
              return t + e > it.width ? (mt++, e) : t + e
            }, 0)
          }),
            (mt = O && mt > O ? O : mt),
            (this.attributes.lines = mt)
        }
        return this.layoutBox
      }),
      (e.layout = function () {
        return this.getBoxWidth(), this.getBoxHieght(), this.getBoxPosition(), this.offsetSize
      }),
      t
    )
  })(),
  I = (function () {
    var t,
      e,
      i,
      o,
      r,
      n,
      s = [
        0, 11, 15, 19, 23, 27, 31, 16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24,
        24, 26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28,
      ],
      a = [
        3220, 1468, 2713, 1235, 3062, 1890, 2119, 1549, 2344, 2936, 1117, 2583, 1330, 2470, 1667,
        2249, 2028, 3780, 481, 4011, 142, 3098, 831, 3445, 592, 2517, 1776, 2234, 1951, 2827, 1070,
        2660, 1345, 3177,
      ],
      h = [
        30660, 29427, 32170, 30877, 26159, 25368, 27713, 26998, 21522, 20773, 24188, 23371, 17913,
        16590, 20375, 19104, 13663, 12392, 16177, 14854, 9396, 8579, 11994, 11245, 5769, 5054, 7399,
        6608, 1890, 597, 3340, 2107,
      ],
      d = [
        1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17, 1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22,
        22, 1, 0, 16, 28, 1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22, 1, 0, 80, 20, 2,
        0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16, 1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11,
        22, 2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28, 2, 0, 78, 20, 4, 0, 31, 18, 2,
        4, 14, 18, 4, 1, 13, 26, 2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26, 2, 0, 116,
        30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24, 2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6,
        2, 15, 28, 4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24, 2, 2, 92, 24, 6, 2, 36,
        22, 4, 6, 20, 26, 7, 4, 14, 28, 4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22, 3,
        1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24, 5, 1, 87, 22, 5, 5, 41, 24, 5, 7,
        24, 30, 11, 7, 12, 24, 5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30, 1, 5, 107,
        28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28, 5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28,
        2, 19, 14, 28, 3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26, 3, 5, 107, 28, 3,
        13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28, 4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19,
        6, 16, 30, 2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24, 4, 5, 121, 30, 4, 14,
        47, 28, 11, 14, 24, 30, 16, 14, 15, 30, 6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2,
        16, 30, 8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30, 10, 2, 114, 28, 19, 4,
        46, 28, 28, 6, 22, 28, 33, 4, 16, 30, 8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28,
        15, 30, 3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30, 7, 7, 116, 30, 21, 7,
        45, 28, 1, 37, 23, 30, 19, 26, 15, 30, 5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23,
        25, 15, 30, 13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30, 17, 0, 115, 30,
        10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30, 17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24,
        30, 11, 46, 15, 30, 13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30, 12, 7,
        121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30, 6, 14, 121, 30, 6, 34, 47, 28, 46,
        10, 24, 30, 2, 64, 15, 30, 17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30,
        4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30, 20, 4, 117, 30, 40, 7, 47,
        28, 43, 22, 24, 30, 10, 67, 15, 30, 19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61,
        15, 30,
      ],
      l = [
        255, 0, 1, 25, 2, 50, 26, 198, 3, 223, 51, 238, 27, 104, 199, 75, 4, 100, 224, 14, 52, 141,
        239, 129, 28, 193, 105, 248, 200, 8, 76, 113, 5, 138, 101, 47, 225, 36, 15, 33, 53, 147,
        142, 218, 240, 18, 130, 69, 29, 181, 194, 125, 106, 39, 249, 185, 201, 154, 9, 120, 77, 228,
        114, 166, 6, 191, 139, 98, 102, 221, 48, 253, 226, 152, 37, 179, 16, 145, 34, 136, 54, 208,
        148, 206, 143, 150, 219, 189, 241, 210, 19, 92, 131, 56, 70, 64, 30, 66, 182, 163, 195, 72,
        126, 110, 107, 58, 40, 84, 250, 133, 186, 61, 202, 94, 155, 159, 10, 21, 121, 43, 78, 212,
        229, 172, 115, 243, 167, 87, 7, 112, 192, 247, 140, 128, 99, 13, 103, 74, 222, 237, 49, 197,
        254, 24, 227, 165, 153, 119, 38, 184, 180, 124, 17, 68, 146, 217, 35, 32, 137, 46, 55, 63,
        209, 91, 149, 188, 207, 205, 144, 135, 151, 178, 220, 252, 190, 97, 242, 86, 211, 171, 20,
        42, 93, 158, 132, 60, 57, 83, 71, 109, 65, 162, 31, 45, 67, 216, 183, 123, 164, 118, 196,
        23, 73, 236, 127, 12, 111, 246, 108, 161, 59, 82, 41, 157, 85, 170, 251, 96, 134, 177, 187,
        204, 62, 90, 203, 89, 95, 176, 156, 169, 160, 81, 11, 245, 22, 235, 122, 117, 44, 215, 79,
        174, 213, 233, 230, 231, 173, 232, 116, 214, 244, 234, 168, 80, 88, 175,
      ],
      c = [
        1, 2, 4, 8, 16, 32, 64, 128, 29, 58, 116, 232, 205, 135, 19, 38, 76, 152, 45, 90, 180, 117,
        234, 201, 143, 3, 6, 12, 24, 48, 96, 192, 157, 39, 78, 156, 37, 74, 148, 53, 106, 212, 181,
        119, 238, 193, 159, 35, 70, 140, 5, 10, 20, 40, 80, 160, 93, 186, 105, 210, 185, 111, 222,
        161, 95, 190, 97, 194, 153, 47, 94, 188, 101, 202, 137, 15, 30, 60, 120, 240, 253, 231, 211,
        187, 107, 214, 177, 127, 254, 225, 223, 163, 91, 182, 113, 226, 217, 175, 67, 134, 17, 34,
        68, 136, 13, 26, 52, 104, 208, 189, 103, 206, 129, 31, 62, 124, 248, 237, 199, 147, 59, 118,
        236, 197, 151, 51, 102, 204, 133, 23, 46, 92, 184, 109, 218, 169, 79, 158, 33, 66, 132, 21,
        42, 84, 168, 77, 154, 41, 82, 164, 85, 170, 73, 146, 57, 114, 228, 213, 183, 115, 230, 209,
        191, 99, 198, 145, 63, 126, 252, 229, 215, 179, 123, 246, 241, 255, 227, 219, 171, 75, 150,
        49, 98, 196, 149, 55, 110, 220, 165, 87, 174, 65, 130, 25, 50, 100, 200, 141, 7, 14, 28, 56,
        112, 224, 221, 167, 83, 166, 81, 162, 89, 178, 121, 242, 249, 239, 195, 155, 43, 86, 172,
        69, 138, 9, 18, 36, 72, 144, 61, 122, 244, 245, 247, 243, 251, 235, 203, 139, 11, 22, 44,
        88, 176, 125, 250, 233, 207, 131, 27, 54, 108, 216, 173, 71, 142, 0,
      ],
      f = [],
      u = [],
      g = [],
      v = [],
      p = [],
      b = 2
    function w(t, e) {
      var i
      t > e && ((i = t), (t = e), (e = i)),
        (i = e),
        (i *= e),
        (i += e),
        (i >>= 1),
        (v[(i += t)] = 1)
    }
    function x(t, i) {
      var o
      for (g[t + e * i] = 1, o = -2; o < 2; o++)
        (g[t + o + e * (i - 2)] = 1),
          (g[t - 2 + e * (i + o + 1)] = 1),
          (g[t + 2 + e * (i + o)] = 1),
          (g[t + o + 1 + e * (i + 2)] = 1)
      for (o = 0; o < 2; o++) w(t - 1, i + o), w(t + 1, i - o), w(t - o, i - 1), w(t + o, i + 1)
    }
    function m(t) {
      for (; t >= 255; ) t = ((t -= 255) >> 8) + (255 & t)
      return t
    }
    var y = []
    function S(t, e, i, o) {
      var r, n, s
      for (r = 0; r < o; r++) f[i + r] = 0
      for (r = 0; r < e; r++) {
        if (255 != (s = l[f[t + r] ^ f[i]]))
          for (n = 1; n < o; n++) f[i + n - 1] = f[i + n] ^ c[m(s + y[o - n])]
        else for (n = i; n < i + o; n++) f[n] = f[n + 1]
        f[i + o - 1] = 255 == s ? 0 : c[m(s + y[0])]
      }
    }
    function z(t, e) {
      var i
      return t > e && ((i = t), (t = e), (e = i)), (i = e), (i += e * e), (i >>= 1), v[(i += t)]
    }
    function B(t) {
      var i, o, r, n
      switch (t) {
        case 0:
          for (o = 0; o < e; o++)
            for (i = 0; i < e; i++) (i + o) & 1 || z(i, o) || (g[i + o * e] ^= 1)
          break
        case 1:
          for (o = 0; o < e; o++) for (i = 0; i < e; i++) 1 & o || z(i, o) || (g[i + o * e] ^= 1)
          break
        case 2:
          for (o = 0; o < e; o++)
            for (r = 0, i = 0; i < e; i++, r++)
              3 == r && (r = 0), r || z(i, o) || (g[i + o * e] ^= 1)
          break
        case 3:
          for (n = 0, o = 0; o < e; o++, n++)
            for (3 == n && (n = 0), r = n, i = 0; i < e; i++, r++)
              3 == r && (r = 0), r || z(i, o) || (g[i + o * e] ^= 1)
          break
        case 4:
          for (o = 0; o < e; o++)
            for (r = 0, n = (o >> 1) & 1, i = 0; i < e; i++, r++)
              3 == r && ((r = 0), (n = !n)), n || z(i, o) || (g[i + o * e] ^= 1)
          break
        case 5:
          for (n = 0, o = 0; o < e; o++, n++)
            for (3 == n && (n = 0), r = 0, i = 0; i < e; i++, r++)
              3 == r && (r = 0), (i & o & 1) + !(!r | !n) || z(i, o) || (g[i + o * e] ^= 1)
          break
        case 6:
          for (n = 0, o = 0; o < e; o++, n++)
            for (3 == n && (n = 0), r = 0, i = 0; i < e; i++, r++)
              3 == r && (r = 0), ((i & o & 1) + (r && r == n)) & 1 || z(i, o) || (g[i + o * e] ^= 1)
          break
        case 7:
          for (n = 0, o = 0; o < e; o++, n++)
            for (3 == n && (n = 0), r = 0, i = 0; i < e; i++, r++)
              3 == r && (r = 0),
                ((r && r == n) + ((i + o) & 1)) & 1 || z(i, o) || (g[i + o * e] ^= 1)
      }
    }
    function M(t) {
      var e,
        i = 0
      for (e = 0; e <= t; e++) p[e] >= 5 && (i += 3 + p[e] - 5)
      for (e = 3; e < t - 1; e += 2)
        p[e - 2] == p[e + 2] &&
          p[e + 2] == p[e - 1] &&
          p[e - 1] == p[e + 1] &&
          3 * p[e - 1] == p[e] &&
          (0 == p[e - 3] || e + 3 > t || 3 * p[e - 3] >= 4 * p[e] || 3 * p[e + 3] >= 4 * p[e]) &&
          (i += 40)
      return i
    }
    function P() {
      var t,
        i,
        o,
        r,
        n,
        s = 0,
        a = 0
      for (i = 0; i < e - 1; i++)
        for (t = 0; t < e - 1; t++)
          ((g[t + e * i] && g[t + 1 + e * i] && g[t + e * (i + 1)] && g[t + 1 + e * (i + 1)]) ||
            !(g[t + e * i] || g[t + 1 + e * i] || g[t + e * (i + 1)] || g[t + 1 + e * (i + 1)])) &&
            (s += 3)
      for (i = 0; i < e; i++) {
        for (p[0] = 0, o = r = t = 0; t < e; t++)
          (n = g[t + e * i]) == r ? p[o]++ : (p[++o] = 1), (a += (r = n) ? 1 : -1)
        s += M(o)
      }
      a < 0 && (a = -a)
      var h = a,
        d = 0
      for (h += h << 2, h <<= 1; h > e * e; ) (h -= e * e), d++
      for (s += 10 * d, t = 0; t < e; t++) {
        for (p[0] = 0, o = r = i = 0; i < e; i++)
          (n = g[t + e * i]) == r ? p[o]++ : (p[++o] = 1), (r = n)
        s += M(o)
      }
      return s
    }
    var L = null
    return {
      api: {
        get ecclevel() {
          return b
        },
        set ecclevel(t) {
          b = t
        },
        get size() {
          return _size
        },
        set size(t) {
          _size = t
        },
        get canvas() {
          return L
        },
        set canvas(t) {
          L = t
        },
        getFrame: function (p) {
          return (function (p) {
            var M, L, R, I, k, T, W, O
            ;(I = p.length), (t = 0)
            do {
              if (
                (t++,
                (R = 4 * (b - 1) + 16 * (t - 1)),
                (i = d[R++]),
                (o = d[R++]),
                (r = d[R++]),
                (n = d[R]),
                I <= (R = r * (i + o) + o - 3 + (t <= 9)))
              )
                break
            } while (t < 40)
            for (e = 17 + 4 * t, k = r + (r + n) * (i + o) + o, I = 0; I < k; I++) u[I] = 0
            for (f = p.slice(0), I = 0; I < e * e; I++) g[I] = 0
            for (I = 0; I < (e * (e + 1) + 1) / 2; I++) v[I] = 0
            for (I = 0; I < 3; I++) {
              for (
                R = 0,
                  L = 0,
                  1 == I && (R = e - 7),
                  2 == I && (L = e - 7),
                  g[L + 3 + e * (R + 3)] = 1,
                  M = 0;
                M < 6;
                M++
              )
                (g[L + M + e * R] = 1),
                  (g[L + e * (R + M + 1)] = 1),
                  (g[L + 6 + e * (R + M)] = 1),
                  (g[L + M + 1 + e * (R + 6)] = 1)
              for (M = 1; M < 5; M++)
                w(L + M, R + 1), w(L + 1, R + M + 1), w(L + 5, R + M), w(L + M + 1, R + 5)
              for (M = 2; M < 4; M++)
                (g[L + M + e * (R + 2)] = 1),
                  (g[L + 2 + e * (R + M + 1)] = 1),
                  (g[L + 4 + e * (R + M)] = 1),
                  (g[L + M + 1 + e * (R + 4)] = 1)
            }
            if (t > 1)
              for (I = s[t], L = e - 7; ; ) {
                for (M = e - 7; M > I - 3 && (x(M, L), !(M < I)); ) M -= I
                if (L <= I + 9) break
                x(6, (L -= I)), x(L, 6)
              }
            for (g[8 + e * (e - 8)] = 1, L = 0; L < 7; L++) w(7, L), w(e - 8, L), w(7, L + e - 7)
            for (M = 0; M < 8; M++) w(M, 7), w(M + e - 8, 7), w(M, e - 8)
            for (M = 0; M < 9; M++) w(M, 8)
            for (M = 0; M < 8; M++) w(M + e - 8, 8), w(8, M)
            for (L = 0; L < 7; L++) w(8, L + e - 7)
            for (M = 0; M < e - 14; M++)
              1 & M
                ? (w(8 + M, 6), w(6, 8 + M))
                : ((g[8 + M + 6 * e] = 1), (g[6 + e * (8 + M)] = 1))
            if (t > 6)
              for (I = a[t - 7], R = 17, M = 0; M < 6; M++)
                for (L = 0; L < 3; L++, R--)
                  1 & (R > 11 ? t >> (R - 12) : I >> R)
                    ? ((g[5 - M + e * (2 - L + e - 11)] = 1), (g[2 - L + e - 11 + e * (5 - M)] = 1))
                    : (w(5 - M, 2 - L + e - 11), w(2 - L + e - 11, 5 - M))
            for (L = 0; L < e; L++) for (M = 0; M <= L; M++) g[M + e * L] && w(M, L)
            for (k = f.length, T = 0; T < k; T++) u[T] = f.charCodeAt(T)
            if (
              ((f = u.slice(0)),
              k >= (M = r * (i + o) + o) - 2 && ((k = M - 2), t > 9 && k--),
              (T = k),
              t > 9)
            ) {
              for (f[T + 2] = 0, f[T + 3] = 0; T--; )
                (I = f[T]), (f[T + 3] |= 255 & (I << 4)), (f[T + 2] = I >> 4)
              ;(f[2] |= 255 & (k << 4)), (f[1] = k >> 4), (f[0] = 64 | (k >> 12))
            } else {
              for (f[T + 1] = 0, f[T + 2] = 0; T--; )
                (I = f[T]), (f[T + 2] |= 255 & (I << 4)), (f[T + 1] = I >> 4)
              ;(f[1] |= 255 & (k << 4)), (f[0] = 64 | (k >> 4))
            }
            for (T = k + 3 - (t < 10); T < M; ) (f[T++] = 236), (f[T++] = 17)
            for (y[0] = 1, T = 0; T < n; T++) {
              for (y[T + 1] = 1, W = T; W > 0; W--)
                y[W] = y[W] ? y[W - 1] ^ c[m(l[y[W]] + T)] : y[W - 1]
              y[0] = c[m(l[y[0]] + T)]
            }
            for (T = 0; T <= n; T++) y[T] = l[y[T]]
            for (R = M, L = 0, T = 0; T < i; T++) S(L, r, R, n), (L += r), (R += n)
            for (T = 0; T < o; T++) S(L, r + 1, R, n), (L += r + 1), (R += n)
            for (L = 0, T = 0; T < r; T++) {
              for (W = 0; W < i; W++) u[L++] = f[T + W * r]
              for (W = 0; W < o; W++) u[L++] = f[i * r + T + W * (r + 1)]
            }
            for (W = 0; W < o; W++) u[L++] = f[i * r + T + W * (r + 1)]
            for (T = 0; T < n; T++) for (W = 0; W < i + o; W++) u[L++] = f[M + T + W * n]
            for (f = u, M = L = e - 1, R = k = 1, O = (r + n) * (i + o) + o, T = 0; T < O; T++)
              for (I = f[T], W = 0; W < 8; W++, I <<= 1) {
                128 & I && (g[M + e * L] = 1)
                do {
                  k
                    ? M--
                    : (M++,
                      R
                        ? 0 != L
                          ? L--
                          : ((R = !R), 6 == (M -= 2) && (M--, (L = 9)))
                        : L != e - 1
                        ? L++
                        : ((R = !R), 6 == (M -= 2) && (M--, (L -= 8)))),
                    (k = !k)
                } while (z(M, L))
              }
            for (
              f = g.slice(0), I = 0, L = 3e4, R = 0;
              R < 8 && (B(R), (M = P()) < L && ((L = M), (I = R)), 7 != I);
              R++
            )
              g = f.slice(0)
            for (I != R && B(I), L = h[I + ((b - 1) << 3)], R = 0; R < 8; R++, L >>= 1)
              1 & L &&
                ((g[e - 1 - R + 8 * e] = 1), R < 6 ? (g[8 + e * R] = 1) : (g[8 + e * (R + 1)] = 1))
            for (R = 0; R < 7; R++, L >>= 1)
              1 & L &&
                ((g[8 + e * (e - 7 + R)] = 1), R ? (g[6 - R + 8 * e] = 1) : (g[7 + 8 * e] = 1))
            return g
          })(p)
        },
        utf16to8: function (t) {
          var e, i, o, r
          for (e = '', o = t.length, i = 0; i < o; i++)
            (r = t.charCodeAt(i)) >= 1 && r <= 127
              ? (e += t.charAt(i))
              : r > 2047
              ? ((e += String.fromCharCode(224 | ((r >> 12) & 15))),
                (e += String.fromCharCode(128 | ((r >> 6) & 63))),
                (e += String.fromCharCode(128 | ((r >> 0) & 63))))
              : ((e += String.fromCharCode(192 | ((r >> 6) & 31))),
                (e += String.fromCharCode(128 | ((r >> 0) & 63))))
          return e
        },
        draw: function (t, i, o, r, n) {
          i.drawView(o, r)
          var s = i.ctx,
            a = o.contentSize,
            h = a.width,
            d = a.height,
            l = a.left,
            c = a.top
          r.borderRadius, r.backgroundColor
          var f = r.color,
            u = void 0 === f ? '#000000' : f
          r.border
          var g = o.contentSize.left - o.borderSize.left,
            v = o.contentSize.top - o.borderSize.top
          if (((b = n || b), s)) {
            s.save(), i.setOpacity(r), i.setTransform(o, r), (l += g), (c += v)
            var p = Math.min(h, d)
            t = this.utf16to8(t)
            var w = this.getFrame(t),
              x = p / e
            s.setFillStyle(u)
            for (var m = 0; m < e; m++)
              for (var y = 0; y < e; y++) w[y * e + m] && s.fillRect(l + x * m, c + x * y, x, x)
            s.restore(), i.setBorder(o, r)
          } else console.warn('No canvas provided to draw QR code in!')
        },
      },
    }
  })(),
  k = (function () {
    function o(e, i) {
      var o,
        n = this
      ;(this.id = null),
        (this.pixelRatio = 1),
        (this.width = 0),
        (this.height = 0),
        (this.sleep = 1e3 / 30),
        (this.count = 0),
        (this.isRate = !1),
        (this.isDraw = !0),
        (this.isCache = !0),
        (this.fixed = ''),
        (this.imageBus = []),
        (this.options = e),
        Object.assign(this, e),
        (this.component = i),
        (this.ctx =
          (((o = e.context).setFonts = function (t) {
            var e = t.fontFamily,
              i = void 0 === e ? 'sans-serif' : e,
              n = t.fontSize,
              s = void 0 === n ? 14 : n,
              a = t.fontWeight,
              h = void 0 === a ? 'normal' : a,
              d = t.fontStyle,
              l = void 0 === d ? 'normal' : d
            v == r.MP_TOUTIAO &&
              ((h = 'bold' == h ? 'bold' : ''), (l = 'italic' == l ? 'italic' : '')),
              (o.font = l + ' ' + h + ' ' + s + 'px ' + i)
          }),
          o.draw
            ? o
            : Object.assign(o, {
                setStrokeStyle: function (t) {
                  o.strokeStyle = t
                },
                setLineWidth: function (t) {
                  o.lineWidth = t
                },
                setLineCap: function (t) {
                  o.lineCap = t
                },
                setFillStyle: function (t) {
                  o.fillStyle = t
                },
                setFontSize: function (t) {
                  o.font = String(t) + 'px sans-serif'
                },
                setGlobalAlpha: function (t) {
                  o.globalAlpha = t
                },
                setLineJoin: function (t) {
                  o.lineJoin = t
                },
                setTextAlign: function (t) {
                  o.textAlign = t
                },
                setMiterLimit: function (t) {
                  o.miterLimit = t
                },
                setShadow: function (t, e, i, r) {
                  ;(o.shadowOffsetX = t),
                    (o.shadowOffsetY = e),
                    (o.shadowBlur = i),
                    (o.shadowColor = r)
                },
                setTextBaseline: function (t) {
                  o.textBaseline = t
                },
                createCircularGradient: function () {},
                draw: function () {},
              }))),
        (this.progress = 0),
        (this.root = { width: e.width, height: e.height, fontSizeRate: 1 })
      var s = t({}, this.size)
      Object.defineProperty(this, 'size', {
        configurable: !0,
        set: function (t) {
          Object.keys(t).forEach(function (e) {
            ;(s[e] = t[e]), n.fixed.includes(e) || (n.root[e] = t[e])
          })
        },
        get: function () {
          return s
        },
      })
      var a = 0
      Object.defineProperty(this, 'progress', {
        configurable: !0,
        set: function (t) {
          ;(a = t), n.lifecycle('onProgress', t / n.count)
        },
        get: function () {
          return a || 0
        },
      }),
        this.init()
    }
    return (
      (o.prototype.lifecycle = function (t, e) {
        this.options.listen && this.options.listen[t] && this.options.listen[t](e)
      }),
      (o.prototype.init = function () {
        ;(this.canvas.height || r.WEB == v) &&
          ((this.canvas.height = this.root.height * this.pixelRatio),
          (this.canvas.width = this.root.width * this.pixelRatio),
          this.ctx.scale(this.pixelRatio, this.pixelRatio))
      }),
      (o.prototype.clear = function () {
        this.ctx.clearRect(0, 0, this.root.width, this.root.height)
      }),
      (o.prototype.clipPath = function (t, e, i, o, r, n, s) {
        void 0 === n && (n = !1), void 0 === s && (s = !1)
        var a = this.ctx
        if (/polygon/.test(r)) {
          var h = r.match(/-?\d+(rpx|px|%)?\s+-?\d+(rpx|px|%)?/g) || []
          a.beginPath(),
            h
              .map(function (r) {
                var n = r.split(' '),
                  s = n[0],
                  a = n[1]
                return [x(s, i) + t, x(a, o) + e]
              })
              .forEach(function (t, e) {
                0 == e ? a.moveTo(t[0], t[1]) : a.lineTo(t[0], t[1])
              }),
            a.closePath(),
            s && a.stroke(),
            n && a.fill()
        }
      }),
      (o.prototype.roundRect = function (t, e, i, o, r, n, s) {
        if ((void 0 === n && (n = !1), void 0 === s && (s = !1), !(r < 0))) {
          var a = this.ctx
          if ((a.beginPath(), r)) {
            var h = r || {},
              d = h.borderTopLeftRadius,
              l = void 0 === d ? r || 0 : d,
              c = h.borderTopRightRadius,
              f = void 0 === c ? r || 0 : c,
              u = h.borderBottomRightRadius,
              g = void 0 === u ? r || 0 : u,
              v = h.borderBottomLeftRadius,
              p = void 0 === v ? r || 0 : v
            a.arc(t + i - g, e + o - g, g, 0, 0.5 * Math.PI),
              a.lineTo(t + p, e + o),
              a.arc(t + p, e + o - p, p, 0.5 * Math.PI, Math.PI),
              a.lineTo(t, e + l),
              a.arc(t + l, e + l, l, Math.PI, 1.5 * Math.PI),
              a.lineTo(t + i - f, e),
              a.arc(t + i - f, e + f, f, 1.5 * Math.PI, 2 * Math.PI),
              a.lineTo(t + i, e + o - g)
          } else a.rect(t, e, i, o)
          a.closePath(), s && a.stroke(), n && a.fill()
        }
      }),
      (o.prototype.setTransform = function (t, e) {
        var i = e.transform,
          o = e.transformOrigin,
          r = this.ctx,
          n = i || {},
          s = n.scaleX,
          a = void 0 === s ? 1 : s,
          h = n.scaleY,
          d = void 0 === h ? 1 : h,
          l = n.translateX,
          c = void 0 === l ? 0 : l,
          f = n.translateY,
          u = void 0 === f ? 0 : f,
          g = n.rotate,
          v = void 0 === g ? 0 : g,
          p = n.skewX,
          b = void 0 === p ? 0 : p,
          m = n.skewY,
          y = void 0 === m ? 0 : m,
          S = t.left,
          z = t.top,
          B = t.width,
          M = t.height
        ;(c = x(c, B) || 0), (u = x(u, M) || 0)
        var P = { top: x('0%', 1), center: x('50%', 1), bottom: x('100%', 1) },
          L = { left: x('0%', 1), center: x('50%', 1), right: x('100%', 1) }
        if (
          ((o = o
            .split(' ')
            .filter(function (t, e) {
              return e < 2
            })
            .reduce(function (t, e) {
              if (/\d+/.test(e)) {
                var i = x(e, 1) / (/px|rpx$/.test(e) ? (w(t.x) ? M : B) : 1)
                return w(t.x) ? Object.assign(t, { y: i }) : Object.assign(t, { x: i })
              }
              return w(L[e]) && !w(t.x)
                ? Object.assign(t, { x: L[e] })
                : Object.assign(t, { y: P[e] || 0.5 })
            }, {})),
          (c || u) && r.translate(c, u),
          (a || d) && r.scale(a, d),
          v)
        ) {
          var R = S + B * o.x,
            I = z + M * o.y
          r.translate(R, I), r.rotate((v * Math.PI) / 180), r.translate(-R, -I)
        }
        ;(b || y) &&
          r.transform(1, Math.tan((y * Math.PI) / 180), Math.tan((b * Math.PI) / 180), 1, 0, 0)
      }),
      (o.prototype.setBackground = function (t, e, i, o, n) {
        var s = this.ctx
        t && 'transparent' != t
          ? y(t)
            ? S(t, e, i, o, n, s)
            : s.setFillStyle(t)
          : [r.MP_TOUTIAO, r.MP_BAIDU].includes(v)
          ? s.setFillStyle('rgba(0,0,0,0)')
          : s.setFillStyle('transparent')
      }),
      (o.prototype.setShadow = function (t) {
        var e = t.boxShadow,
          i = void 0 === e ? [] : e,
          o = this.ctx
        if (i.length) {
          var r = i[0],
            n = i[1],
            s = i[2],
            a = i[3]
          o.setShadow(r, n, s, a)
        }
      }),
      (o.prototype.setBorder = function (t, e) {
        var i = this.ctx,
          o = t.width,
          r = t.height,
          n = t.left,
          s = t.top,
          a = e.border,
          h = e.borderBottom,
          d = e.borderTop,
          l = e.borderRight,
          c = e.borderLeft,
          f = e.borderRadius,
          u = e.lineCap,
          g = a || {},
          p = g.borderWidth,
          b = void 0 === p ? 0 : p,
          w = g.borderStyle,
          x = g.borderColor,
          m = h || {},
          y = m.borderBottomWidth,
          S = void 0 === y ? b : y,
          z = m.borderBottomStyle,
          B = void 0 === z ? w : z,
          M = m.borderBottomColor,
          P = void 0 === M ? x : M,
          L = d || {},
          R = L.borderTopWidth,
          I = void 0 === R ? b : R,
          k = L.borderTopStyle,
          T = void 0 === k ? w : k,
          W = L.borderTopColor,
          O = void 0 === W ? x : W,
          A = l || {},
          F = A.borderRightWidth,
          C = void 0 === F ? b : F,
          j = A.borderRightStyle,
          E = void 0 === j ? w : j,
          H = A.borderRightColor,
          U = void 0 === H ? x : H,
          $ = c || {},
          _ = $.borderLeftWidth,
          D = void 0 === _ ? b : _,
          X = $.borderLeftStyle,
          N = void 0 === X ? w : X,
          V = $.borderLeftColor,
          Y = void 0 === V ? x : V,
          q = f || {},
          G = q.borderTopLeftRadius,
          Q = void 0 === G ? f || 0 : G,
          J = q.borderTopRightRadius,
          Z = void 0 === J ? f || 0 : J,
          K = q.borderBottomRightRadius,
          tt = void 0 === K ? f || 0 : K,
          et = q.borderBottomLeftRadius,
          it = void 0 === et ? f || 0 : et
        if (h || c || d || l || a) {
          var ot = function (t, e, o) {
              'dashed' == e
                ? /mp/.test(v)
                  ? i.setLineDash([Math.ceil((4 * t) / 3), Math.ceil((4 * t) / 3)])
                  : i.setLineDash([Math.ceil(6 * t), Math.ceil(6 * t)])
                : 'dotted' == e && i.setLineDash([t, t]),
                i.setStrokeStyle(o)
            },
            rt = function (t, e, o, r, n, s, a, h, d, l, c, f, g, v, p) {
              i.save(),
                i.setLineCap(p ? 'square' : u),
                i.setLineWidth(f),
                ot(f, g, v),
                i.beginPath(),
                i.arc(t, e, a, Math.PI * d, Math.PI * l),
                i.lineTo(o, r),
                i.arc(n, s, h, Math.PI * l, Math.PI * c),
                i.stroke(),
                i.restore()
            }
          if ((i.save(), a && !h && !c && !d && !l))
            return (
              i.setLineWidth(b),
              ot(b, w, x),
              this.roundRect(n, s, o, r, f, !1, !!x),
              void i.restore()
            )
          S &&
            rt(
              n + o - tt,
              s + r - tt,
              n + it,
              s + r,
              n + it,
              s + r - it,
              tt,
              it,
              0.25,
              0.5,
              0.75,
              S,
              B,
              P,
              D && C
            ),
            D &&
              rt(n + it, s + r - it, n, s + Q, n + Q, s + Q, it, Q, 0.75, 1, 1.25, D, N, Y, I && S),
            I &&
              rt(
                n + Q,
                s + Q,
                n + o - Z,
                s,
                n + o - Z,
                s + Z,
                Q,
                Z,
                1.25,
                1.5,
                1.75,
                I,
                T,
                O,
                D && C
              ),
            C &&
              rt(
                n + o - Z,
                s + Z,
                n + o,
                s + r - tt,
                n + o - tt,
                s + r - tt,
                Z,
                tt,
                1.75,
                2,
                0.25,
                C,
                E,
                U,
                I && S
              )
        }
      }),
      (o.prototype.setOpacity = function (t) {
        var e = t.opacity,
          i = void 0 === e ? 1 : e
        this.ctx.setGlobalAlpha(i)
      }),
      (o.prototype.drawPattern = function (t, o, r) {
        return e(this, void 0, void 0, function () {
          var e = this
          return i(this, function (i) {
            return [
              2,
              new Promise(function (i, n) {
                e.drawView(o, r, !0, !1, !0)
                var s = e,
                  a = s.ctx
                s.canvas
                var h = o.width,
                  d = o.height,
                  l = o.left,
                  c = o.top,
                  f = r || {},
                  u = f.borderRadius,
                  g = void 0 === u ? 0 : u,
                  v = f.backgroundImage,
                  p = f.backgroundRepeat,
                  b = void 0 === p ? 'repeat' : p
                v &&
                  (function (t) {
                    var n = a.createPattern(t.src, b)
                    a.setFillStyle(n), e.roundRect(l, c, h, d, g, !0, !1), e.setBorder(o, r), i()
                  })(t)
              }),
            ]
          })
        })
      }),
      (o.prototype.drawView = function (t, e, i, o, r) {
        void 0 === i && (i = !0), void 0 === o && (o = !0), void 0 === r && (r = !0)
        var n = this.ctx,
          s = t.width,
          a = t.height,
          h = t.left,
          d = t.top,
          l = e || {},
          c = l.borderRadius,
          f = void 0 === c ? 0 : c,
          u = l.backgroundColor,
          g = void 0 === u ? 'transparent' : u,
          v = l.overflow
        e.opacity && this.setOpacity(e),
          this.setTransform(t, e),
          r && (n.save(), this.setShadow(e)),
          i && this.setBackground(g, s, a, h, d),
          e.clipPath
            ? this.clipPath(h, d, s, a, e.clipPath, i, !1)
            : this.roundRect(h, d, s, a, f, i, !1),
          r && n.restore(),
          o && this.setBorder(t, e),
          'hidden' == v && n.clip()
      }),
      (o.prototype.drawImage = function (t, o, n, s) {
        return (
          void 0 === o && (o = {}),
          void 0 === n && (n = {}),
          void 0 === s && (s = !0),
          e(this, void 0, void 0, function () {
            var a = this
            return i(this, function (h) {
              switch (h.label) {
                case 0:
                  return [
                    4,
                    new Promise(function (h, d) {
                      return e(a, void 0, void 0, function () {
                        var e,
                          a,
                          d,
                          l,
                          c,
                          f,
                          u,
                          g,
                          p,
                          b,
                          w,
                          m,
                          y,
                          S,
                          z,
                          B,
                          M,
                          P,
                          L,
                          R = this
                        return i(this, function (i) {
                          return (
                            n.boxShadow &&
                              this.drawView(
                                o,
                                Object.assign(n, {
                                  backgroundColor:
                                    n.backgroundColor ||
                                    (n.boxShadow && (n.backgroundColor || '#ffffff')),
                                }),
                                !0,
                                !1,
                                !0
                              ),
                            (e = this.ctx),
                            (a = n.borderRadius),
                            (d = void 0 === a ? 0 : a),
                            (l = n.backgroundColor),
                            (c = void 0 === l ? 'transparent' : l),
                            (f = n.objectFit),
                            (u = void 0 === f ? 'fill' : f),
                            (g = n.backgroundSize),
                            (p = void 0 === g ? 'fill' : g),
                            (b = n.objectPosition),
                            (w = n.backgroundPosition),
                            n.backgroundImage && ((u = p), (b = w)),
                            (m = o.width),
                            (y = o.height),
                            (S = o.left),
                            (z = o.top),
                            e.save(),
                            (B = o.contentSize.left - o.borderSize.left),
                            (M = o.contentSize.top - o.borderSize.top),
                            s ||
                              (this.setOpacity(n),
                              this.setTransform(o, n),
                              this.setBackground(c, m, y, S, z),
                              this.roundRect(S, z, m, y, d, !!d, !1)),
                            (S += B),
                            (z += M),
                            e.clip(),
                            (P = function (t) {
                              if ('fill' !== u) {
                                var i = (function (t, e, i) {
                                    var o = t.objectFit,
                                      r = t.objectPosition,
                                      n = e.width / e.height,
                                      s = i.width / i.height,
                                      a = 1
                                    ;('contain' == o && n >= s) || ('cover' == o && n < s)
                                      ? (a = e.height / i.height)
                                      : (('contain' == o && n < s) || ('cover' == o && n >= s)) &&
                                        (a = e.width / i.width)
                                    var h = i.width * a,
                                      d = i.height * a,
                                      l = /^\d+px|rpx$/.test(null == r ? void 0 : r[0])
                                        ? x(null == r ? void 0 : r[0], e.width)
                                        : (e.width - h) *
                                          (/%$/.test(null == r ? void 0 : r[0])
                                            ? x(null == r ? void 0 : r[0], 1)
                                            : { left: 0, center: 0.5, right: 1 }[
                                                (null == r ? void 0 : r[0]) || 'center'
                                              ]),
                                      c = /^\d+px|rpx$/.test(null == r ? void 0 : r[1])
                                        ? x(null == r ? void 0 : r[1], e.height)
                                        : (e.height - d) *
                                          (/%$/.test(null == r ? void 0 : r[1])
                                            ? x(null == r ? void 0 : r[1], 1)
                                            : { top: 0, center: 0.5, bottom: 1 }[
                                                (null == r ? void 0 : r[1]) || 'center'
                                              ]),
                                      f = function (t, e) {
                                        return [(t - l) / a, (e - c) / a]
                                      },
                                      u = f(0, 0),
                                      g = u[0],
                                      v = u[1],
                                      p = f(e.width, e.height),
                                      b = p[0],
                                      w = p[1]
                                    return {
                                      sx: Math.max(g, 0),
                                      sy: Math.max(v, 0),
                                      sw: Math.min(b - g, i.width),
                                      sh: Math.min(w - v, i.height),
                                      dx: Math.max(l, 0),
                                      dy: Math.max(c, 0),
                                      dw: Math.min(h, e.width),
                                      dh: Math.min(d, e.height),
                                    }
                                  })({ objectFit: u, objectPosition: b }, o.contentSize, t),
                                  n = i.sx,
                                  s = i.sy,
                                  a = i.sh,
                                  h = i.sw,
                                  d = i.dx,
                                  l = i.dy,
                                  c = i.dh,
                                  f = i.dw
                                v == r.MP_BAIDU
                                  ? e.drawImage(t.src, d + S, l + z, f, c, n, s, h, a)
                                  : e.drawImage(t.src, n, s, h, a, d + S, l + z, f, c)
                              } else e.drawImage(t.src, S, z, m, y)
                            }),
                            (L = function () {
                              e.restore(), R.drawView(o, n, !1, !0, !1), h(1)
                            }),
                            (function (t) {
                              P(t), L()
                            })(t),
                            [2]
                          )
                        })
                      })
                    }),
                  ]
                case 1:
                  return h.sent(), [2]
              }
            })
          })
        )
      }),
      (o.prototype.drawText = function (t, e, i, o) {
        var r, n
        this.drawView(e, i)
        var s = this.ctx,
          a = e.borderSize,
          h = e.contentSize,
          d = e.left,
          l = e.top,
          c = h.width,
          f = h.height,
          u = h.left - a.left,
          g = h.top - a.top,
          v = i.color,
          p = void 0 === v ? '#000000' : v,
          b = i.lineHeight,
          w = void 0 === b ? '1.4em' : b,
          m = i.fontSize,
          y = void 0 === m ? 14 : m,
          S = i.fontWeight,
          z = i.fontFamily,
          B = i.fontStyle,
          M = i.textAlign,
          P = void 0 === M ? 'left' : M,
          L = i.verticalAlign,
          R = void 0 === L ? 'middle' : L
        i.backgroundColor
        var I = i.lineClamp,
          k = i.textDecoration
        if (((w = x(w, y)), t)) {
          switch (
            (s.save(),
            (d += u),
            (l += g),
            s.setFonts({ fontFamily: z, fontSize: y, fontWeight: S, fontStyle: B }),
            s.setTextBaseline('middle'),
            s.setTextAlign(P),
            s.setFillStyle(p),
            (l += y / 2),
            P)
          ) {
            case 'left':
              break
            case 'center':
              d += 0.5 * c
              break
            case 'right':
              d += c
          }
          var T = o.lines * w,
            W = Math.ceil((f - T) / 2)
          switch ((W < 0 && (W = 0), R)) {
            case 'top':
              break
            case 'middle':
              l += W
              break
            case 'bottom':
              l += 2 * W
          }
          var O = (w - o.fontHeight) / 2,
            A = function (t, e, i) {
              var r = t
              switch (P) {
                case 'left':
                  ;(t = t), (r += i)
                  break
                case 'center':
                  r = (t -= i / 2) + i
                  break
                case 'right':
                  ;(r = t), (t -= i)
              }
              k &&
                (s.setLineWidth(y / 13),
                s.beginPath(),
                (e -= O),
                /\bunderline\b/.test(k) &&
                  (s.moveTo(t, e - 0.5 * o.fontHeight), s.lineTo(r, e - 0.5 * o.fontHeight)),
                /\boverline\b/.test(k) &&
                  (s.moveTo(t, e - 1.5 * o.fontHeight), s.lineTo(r, e - 1.5 * o.fontHeight)),
                /\bline-through\b/.test(k) &&
                  (s.moveTo(t, e - o.fontHeight), s.lineTo(r, e - o.fontHeight)),
                s.closePath(),
                s.setStrokeStyle(p),
                s.stroke())
            }
          if (!o.widths || (1 == o.widths.lenght && o.widths[0].total <= h.width))
            return (
              s.fillText(t, d, l + O),
              A(
                d,
                (l += w),
                (null ===
                  (n =
                    null === (r = null == o ? void 0 : o.widths) || void 0 === r ? void 0 : r[0]) ||
                void 0 === n
                  ? void 0
                  : n.total) || o.text
              ),
              s.restore(),
              void this.setBorder(e, i)
            )
          for (var F = t.split(''), C = l, j = d, E = '', H = 0, U = 0; U <= F.length; U++) {
            var $ = F[U] || '',
              _ = '\n' === $,
              D = '' == $,
              X = E + ($ = _ ? '' : $),
              N = s.measureText(X).width
            if (H >= I) break
            if (((j = d), (N = N) > h.width || _ || D)) {
              if ((H++, (E = D && N <= h.width ? X : E), H === I && N > c)) {
                for (; s.measureText(E + '...').width > h.width && !(E.length <= 1); )
                  E = E.substring(0, E.length - 1)
                E += '...'
              }
              if ((s.fillText(E, j, l + O), A(j, (l += w), N), (E = $), l + w > C + f)) break
            } else E = X
          }
          s.restore()
        }
      }),
      (o.prototype.source = function (t) {
        var o
        return e(this, void 0, void 0, function () {
          var e,
            r,
            s,
            a = this
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                if (((e = +new Date()), '{}' == JSON.stringify(t))) return [2]
                if (!t.type)
                  for (r in ((t.type = n), (t.css = t.css || {}), t))
                    ['views', 'children', 'type', 'css'].includes(r) ||
                      ((t.css[r] = t[r]), delete t[r])
                return (
                  (null === (o = t.css) || void 0 === o ? void 0 : o.width) ||
                    (t.css
                      ? (t.css.width = this.root.width)
                      : (t.css = { width: this.root.width })),
                  [4, this.create(t)]
                )
              case 1:
                return (
                  (s = i.sent()),
                  (this.size = (null == s ? void 0 : s.layout()) || {}),
                  (this.node = s),
                  this.onEffectFinished()
                    .then(function (t) {
                      return a.lifecycle('onEffectSuccess', t)
                    })
                    .catch(function (t) {
                      return a.lifecycle('onEffectFail', t)
                    }),
                  console.log('布局用时：' + (+new Date() - e) + 'ms'),
                  [2, this.root]
                )
            }
          })
        })
      }),
      (o.prototype.getImageInfo = function (t) {
        return (
          this.imageBus[t] ||
            (this.imageBus[t] = (function (t, o) {
              var n = this
              return new Promise(function (s, a) {
                return e(n, void 0, void 0, function () {
                  var e, n, h
                  return i(this, function (i) {
                    switch (i.label) {
                      case 0:
                        ;(e = t), (n = /data:image\/(\w+);base64,(.*)/.test(t)), (i.label = 1)
                      case 1:
                        return (
                          i.trys.push([1, 6, , 7]),
                          n || v != r.PLUS || /^\/?(static|_doc)\//.test(e) ? [3, 3] : [4, m(t)]
                        )
                      case 2:
                        return (e = i.sent()), [3, 5]
                      case 3:
                        return (v != r.PLUS && !/^mp/.test(v)) || !n
                          ? [3, 5]
                          : [
                              4,
                              ((d = t),
                              new Promise(function (t, e) {
                                var i = /data:image\/(\w+);base64,(.*)/.exec(d) || [],
                                  o = i[1]
                                if ((i[2], /^mp/.test(v))) {
                                  var n = p.getFileSystemManager()
                                  o || e(new Error('ERROR_BASE64SRC_PARSE'))
                                  var s = new Date().getTime(),
                                    a = p.env.USER_DATA_PATH + '/' + s + '.' + o
                                  n.writeFile({
                                    filePath: a,
                                    data: d.replace(/^data:\S+\/\S+;base64,/, ''),
                                    encoding: 'base64',
                                    success: function () {
                                      t(a)
                                    },
                                    fail: function (t) {
                                      e(t)
                                    },
                                  })
                                } else if (v != r.PLUS) e(new Error('not support'))
                                else {
                                  var h = d.split(',')[0].match(/data\:\S+\/(\S+);/)
                                  h ? (h = h[1]) : e(new Error('base64 error'))
                                  var l = Date.now() + '.' + h,
                                    c = '_doc',
                                    f = 'uniapp_temp',
                                    u = '_doc/uniapp_temp/' + l
                                  if (
                                    !(function (t, e) {
                                      for (
                                        var i = t.split('.'), o = e.split('.'), r = !1, n = 0;
                                        n < o.length;
                                        n++
                                      ) {
                                        var s = i[n] - o[n]
                                        if (0 !== s) {
                                          r = s > 0
                                          break
                                        }
                                      }
                                      return r
                                    })(
                                      'Android' === plus.os.name ? '1.9.9.80627' : '1.9.9.80472',
                                      plus.runtime.innerVersion
                                    )
                                  )
                                    return void plus.io.resolveLocalFileSystemURL(
                                      c,
                                      function (i) {
                                        i.getDirectory(
                                          f,
                                          { create: !0, exclusive: !1 },
                                          function (i) {
                                            i.getFile(
                                              l,
                                              { create: !0, exclusive: !1 },
                                              function (i) {
                                                i.createWriter(function (i) {
                                                  var o
                                                  ;(i.onwrite = function () {
                                                    t(u)
                                                  }),
                                                    (i.onerror = e),
                                                    i.seek(0),
                                                    i.writeAsBinary(
                                                      (o = d.split(','))[o.length - 1]
                                                    )
                                                }, e)
                                              },
                                              e
                                            )
                                          },
                                          e
                                        )
                                      },
                                      e
                                    )
                                  var g = new plus.nativeObj.Bitmap(l)
                                  g.loadBase64Data(
                                    d,
                                    function () {
                                      g.save(
                                        u,
                                        {},
                                        function () {
                                          g.clear(), t(u)
                                        },
                                        function (t) {
                                          g.clear(), e(t)
                                        }
                                      )
                                    },
                                    function (t) {
                                      g.clear(), e(t)
                                    }
                                  )
                                }
                              })),
                            ]
                      case 4:
                        ;(e = i.sent()), (i.label = 5)
                      case 5:
                        return [3, 7]
                      case 6:
                        return (h = i.sent()), a(h), [3, 7]
                      case 7:
                        return (
                          p.getImageInfo({
                            src: e,
                            success: function (t) {
                              if (['right', 'left'].includes(t.orientation)) {
                                var i = t.width,
                                  n = t.height
                                ;(t.width = n), (t.height = i)
                              }
                              if (
                                ([r.MP_WEIXIN, r.MP_BAIDU, r.MP_QQ, r.MP_TOUTIAO].includes(v) &&
                                  (t.path = /^\.|^\/(?=[^\/])/.test(e) ? '/' + t.path : t.path),
                                o)
                              ) {
                                var h = o
                                ;(h.onload = function () {
                                  ;(t.path = h), s(t)
                                }),
                                  (h.onerror = a),
                                  (h.src = t.path)
                              } else s(t)
                            },
                            fail: a,
                          }),
                          [2]
                        )
                    }
                    var d
                  })
                })
              })
            })(t, this.canvas.createImage || (v == r.WEB && new Image()))),
          this.imageBus[t]
        )
      }),
      (o.prototype.create = function (t, o) {
        var r, d, l, f
        return e(this, void 0, void 0, function () {
          var e, u, g, v, p, b, w, x, m, y, S
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                if (
                  (t.type == s && (t.text = String(t.text)),
                  (t.type == a && !t.src && !t.url) || ((t.type == h || t.type == s) && !t.text))
                )
                  return [2]
                if ((null === (r = t.css) || void 0 === r ? void 0 : r.display) == c) return [2]
                if (
                  !(
                    t.type == a ||
                    (t.type == n &&
                      (null === (d = t.css) || void 0 === d ? void 0 : d.backgroundImage))
                  )
                )
                  return [3, 4]
                ;(e = t.src),
                  (u = /url\((.+)\)/),
                  t.css.backgroundImage &&
                    (null === (l = u.exec(t.css.backgroundImage)) || void 0 === l
                      ? void 0
                      : l[1]) &&
                    (e =
                      null === (f = u.exec(t.css.backgroundImage)) || void 0 === f ? void 0 : f[1]),
                  (i.label = 1)
              case 1:
                return i.trys.push([1, 3, , 4]), [4, this.getImageInfo(e)]
              case 2:
                return (
                  (g = i.sent()),
                  (v = g.width),
                  (p = g.height),
                  (b = g.path) || t.type != a
                    ? (b &&
                        (t.attributes = Object.assign(t.attributes || {}, {
                          width: v,
                          height: p,
                          path: b,
                          src: b,
                          naturalSrc: e,
                        })),
                      [3, 4])
                    : [2]
                )
              case 3:
                return i.sent(), [2]
              case 4:
                if (
                  ((this.count += 1),
                  (w = new R(t, o, this.root, this.ctx)),
                  !(x = t.views || t.children))
                )
                  return [3, 8]
                ;(m = 0), (i.label = 5)
              case 5:
                return m < x.length ? ((y = x[m]), [4, this.create(y, w)]) : [3, 8]
              case 6:
                ;(S = i.sent()) && w.add(S), (i.label = 7)
              case 7:
                return m++, [3, 5]
              case 8:
                return [2, w]
            }
          })
        })
      }),
      (o.prototype.drawNode = function (t) {
        return e(this, void 0, void 0, function () {
          var e, o, r, d, l, c, f, u, g, v, p, b
          return i(this, function (i) {
            switch (i.label) {
              case 0:
                return (
                  (e = t.layoutBox),
                  (o = t.computedStyle),
                  (r = t.attributes),
                  (d = t.name),
                  (l = t.children),
                  (c = t.attributes),
                  (f = c.src),
                  (u = c.text),
                  this.ctx.save(),
                  d !== n
                    ? [3, 7]
                    : f
                    ? o.backgroundRepeat
                      ? [4, this.drawPattern(r, e, o)]
                      : [3, 2]
                    : [3, 5]
                )
              case 1:
                return i.sent(), [3, 4]
              case 2:
                return [4, this.drawImage(r, e, o, !1)]
              case 3:
                i.sent(), (i.label = 4)
              case 4:
                return [3, 6]
              case 5:
                this.drawView(e, o), (i.label = 6)
              case 6:
                return [3, 10]
              case 7:
                return d === a && f ? [4, this.drawImage(r, e, o, !1)] : [3, 9]
              case 8:
                return i.sent(), [3, 10]
              case 9:
                d === s ? this.drawText(u, e, o, r) : d === h && I.api && I.api.draw(u, this, e, o),
                  (i.label = 10)
              case 10:
                if (((this.progress += 1), !l)) return [3, 14]
                ;(g = Object.values
                  ? Object.values(l)
                  : Object.keys(l).map(function (t) {
                      return l[t]
                    })),
                  (v = 0),
                  (p = g),
                  (i.label = 11)
              case 11:
                return v < p.length ? ((b = p[v]), [4, this.drawNode(b)]) : [3, 14]
              case 12:
                i.sent(), (i.label = 13)
              case 13:
                return v++, [3, 11]
              case 14:
                return this.ctx.restore(), [2]
            }
          })
        })
      }),
      (o.prototype.render = function () {
        var t = this
        return new Promise(function (o, r) {
          return e(t, void 0, void 0, function () {
            var t, e
            return i(this, function (i) {
              switch (i.label) {
                case 0:
                  return (
                    (t = +new Date()),
                    this.init(),
                    [
                      4,
                      ((n = 30),
                      void 0 === n && (n = 0),
                      new Promise(function (t) {
                        return setTimeout(t, n)
                      })),
                    ]
                  )
                case 1:
                  i.sent(), (i.label = 2)
                case 2:
                  return (
                    i.trys.push([2, 6, , 7]), this.node ? [4, this.drawNode(this.node)] : [3, 4]
                  )
                case 3:
                  return i.sent(), o(this.node), [3, 5]
                case 4:
                  this.lifecycle('onEffectFail', 'node is empty'), (i.label = 5)
                case 5:
                  return [3, 7]
                case 6:
                  return (e = i.sent()), this.lifecycle('onEffectFail', e), r(e), [3, 7]
                case 7:
                  return console.log('渲染用时：' + (+new Date() - t - 30) + 'ms'), [2]
              }
              var n
            })
          })
        })
      }),
      (o.prototype.onEffectFinished = function () {
        var t = this,
          e = Object.keys(this.imageBus).map(function (e) {
            return t.imageBus[e]
          })
        return Promise.all(e)
      }),
      (o.prototype.destroy = function () {
        this.node = []
      }),
      (o.prototype.save = function (t) {
        try {
          var e = t || {},
            i = e.fileType,
            o = void 0 === i ? 'png' : i,
            r = e.quality,
            n = void 0 === r ? 1 : r
          return this.canvas.toDataURL('image/' + o, n)
        } catch (t) {
          return this.lifecycle('onEffectFail', 'image cross domain'), t
        }
      }),
      o
    )
  })()
r.WEB == v && (window.Painter = k)
export default k
export { k as Painter }
