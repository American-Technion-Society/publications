'use strict';
var pdfflip = pdfflip || {},
  PRESENTATION = pdfflip;
!(function (e, t) {
  (e.version = '1.4.31'),
    (e.PAGE_MODE = { SINGLE: 1, DOUBLE: 2, AUTO: null }),
    (e.SINGLE_PAGE_MODE = { ZOOM: 1, BOOKLET: 2, AUTO: null }),
    (e.CONTROLSPOSITION = { HIDDEN: 'hide', TOP: 'top', BOTTOM: 'bottom' }),
    (e.DIRECTION = { LTR: 1, RTL: 2 }),
    (e.CORNERS = {
      TL: 'tl',
      TR: 'tr',
      BL: 'bl',
      BR: 'br',
      L: 'l',
      R: 'r',
      NONE: null,
    }),
    (e.SOURCE_TYPE = { IMAGE: 'image', PDF: 'pdf', HTML: 'html' }),
    (e.DISPLAY_TYPE = { WEBGL: '3D', HTML: '2D' }),
    (e.PAGE_SIZE = { AUTO: 0, SINGLE: 1, DOUBLEINTERNAL: 2 });
  var n,
    i,
    o,
    a,
    r = (e.defaults = {
      webgl: !0,
      webglShadow: !0,
      enableSound: !0,
      height: '100%',
      autoEnableOutline: !1,
      autoEnableThumbnail: !1,
      overwritePDFOutline: !0,
      downloadEnable: !0,
      duration: 800,
      direction: e.DIRECTION.LTR,
      pageMode: e.PAGE_MODE.AUTO,
      singlePageMode: e.SINGLE_PAGE_MODE.AUTO,
      backgroundColor: '#fff',
      forceFit: !0,
      transparent: !1,
      hard: 'none',
      openPage: 1,
      annotationClass: '',
      autoPlay: !0,
      autoPlayDuration: 3e3,
      autoPlayStart: !1,
      maxTextureSize: 1600,
      minTextureSize: 256,
      rangeChunkSize: 524288,
      icons: {
        altnext: 'ti-angle-right',
        altprev: 'ti-angle-right',
        next: 'fa fa-chevron-right',
        prev: 'fa fa-chevron-left',
        end: 'ti-angle-double-right',
        start: 'ti-angle-double-left',
        share: 'fa fa-share',
        help: 'ti-help-alt',
        more: 'ti-more-alt',
        download: 'fa fa-file-ppdff-o',
        zoomin: 'ti-zoom-in',
        zoomout: 'ti-zoom-out',
        fullscreen: 'fa fa-arrows-alt',
        fitscreen: 'ti-arrows-corner',
        thumbnail: 'ti-layout-grid2',
        outline: 'ti-menu-alt',
        close: 'ti-close',
        doublepage: 'ti-book',
        singlepage: 'ti-file',
        sound: 'ti-volume',
        facebook: 'ti-facebook',
        google: 'ti-google',
        twitter: 'ti-twitter-alt',
        mail: 'ti-email',
        play: 'ti-control-play',
        pause: 'ti-control-pause',
      },
      text: {
        toggleSound: 'Sound',
        toggleThumbnails: 'Thumbnails',
        toggleOutline: 'Contents',
        previousPage: 'Previous Page',
        nextPage: 'Next Page',
        toggleFullscreen: 'Fullscreen',
        zoomIn: 'Zoom In',
        zoomOut: 'Zoom Out',
        downloadPDFFile: 'Download PDF',
        gotoFirstPage: 'First Page',
        gotoLastPage: 'Last Page',
        play: 'AutoPlay On',
        pause: 'AutoPlay Off',
        share: 'Share',
      },
      allControls:
        'startPage,altPrev,pageNumber,altNext,endPage,play,outline,thumbnail,zoomIn,zoomOut,fullScreen,share,download,sound',
      moreControls: '',
      hideControls: '',
      controlsPosition: e.CONTROLSPOSITION.BOTTOM,
      paddingTop: 15,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: -10,
      scrollWheel: !0,
      onCreate: function (e) {},
      onCreateUI: function (e) {},
      onFlip: function (e) {},
      beforeFlip: function (e) {},
      onReady: function (e) {},
      zoomRatio: 1.5,
      pageSize: e.PAGE_SIZE.AUTO,
      pdfjsSrc: 'js/libs/pdf.min.js',
      pdfjsCompatibilitySrc: 'js/libs/compatibility.js',
      pdfjsWorkerSrc: 'js/libs/pdf.worker.min.js',
      threejsSrc: 'js/libs/three.min.js',
      utilsSrc: 'js/libs/utils.min.js',
      soundFile: 'sound/turn.mp3',
      imagesLocation: 'images',
      imageResourcesPath: 'images/pdfjs/',
      cMapUrl: 'cmaps/',
      enableDebugLog: !1,
      canvasToBlob: !1,
      enableAnnotation: !0,
      pdfRenderQuality: 0.9,
      textureLoadFallback: 'blank',
      stiffness: 3,
      backgroundImage: 'pflip/background.jpg',
      pageRatio: null,
      pixelRatio: window.devicePixelRatio || 1,
      thumbElement: 'div',
      spotLightIntensity: 0.22,
      ambientLightColor: '#fff',
      ambientLightIntensity: 0.8,
      shadowOpacity: 0.08,
    }),
    s =
      'WebKitCSSMatrix' in window ||
      (document.body && 'MozPerspective' in document.body.style),
    l = 'onmousedown' in window,
    c = (window, navigator.userAgent),
    d = (e.utils = {
      drag: { left: 0, right: 1, none: -1 },
      mouseEvents: l
        ? {
            type: 'mouse',
            start: 'mousedown',
            move: 'mousemove',
            end: 'mouseup',
          }
        : {
            type: 'touch',
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend',
          },
      html: {
        div: '<div/>',
        img: '<img/>',
        a: '<a>',
        input: "<input type='text'/>",
      },
      toRad: function (e) {
        return (e * Math.PI) / 180;
      },
      isset: function (e, t) {
        return null == e ? t : e;
      },
      isnull: function (e) {
        return null == e || null == e;
      },
      toDeg: function (e) {
        return (180 * e) / Math.PI;
      },
      transition: function (e, t) {
        return e ? t / 1e3 + 's ease-out' : '0s none';
      },
      display: function (e) {
        return e ? 'block' : 'none';
      },
      resetTranslate: function () {
        return b(0, 0);
      },
      translateStr: function (e, t) {
        return s
          ? ' translate3d(' + e + 'px,' + t + 'px, 0px) '
          : ' translate(' + e + 'px, ' + t + 'px) ';
      },
      httpsCorrection: function (e) {
        var t = window.location;
        return (
          t.href.indexOf('https://') > -1 &&
            e.indexOf(t.hostname) > -1 &&
            (e = e.replace('http://', 'https://')),
          e
        );
      },
      resetBoxShadow: function () {
        return 'rgba(0, 0, 0, 0) 0px 0px 20px';
      },
      rotateStr: function (e) {
        return ' rotateZ(' + e + 'deg) ';
      },
      bg: function (e) {
        return '#fff' + y(e);
      },
      bgImage: function (e) {
        return null == e || 'blank' == e ? '' : ' url(' + e + ')';
      },
      src: function (e) {
        return null != e ? '' + e : '';
      },
      limitAt: function (e, t, n) {
        return e < t ? t : e > n ? n : e;
      },
      distOrigin: function (e, t) {
        return Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2));
      },
      distPoints: function (e, t, n, i) {
        return Math.sqrt(Math.pow(n - e, 2) + Math.pow(i - t, 2));
      },
      calculateScale: function (e, t) {
        var n = C(e[0].x, e[0].y, e[1].x, e[1].y);
        return C(t[0].x, t[0].y, t[1].x, t[1].y) / n;
      },
      getVectorAvg: function (e) {
        return {
          x:
            e
              .map(function (e) {
                return e.x;
              })
              .reduce(d.sum) / e.length,
          y:
            e
              .map(function (e) {
                return e.y;
              })
              .reduce(d.sum) / e.length,
        };
      },
      sum: function (e, t) {
        return e + t;
      },
      getTouches: function (e, t) {
        return (
          (t = t || { left: 0, top: 0 }),
          Array.prototype.slice.call(e.touches).map(function (e) {
            return { x: e.pageX - t.left, y: e.pageY - t.top };
          })
        );
      },
      angleByDistance: function (e, t) {
        var n = t / 2,
          i = P(e, 0, t);
        return i < n ? v(Math.asin(i / n)) : 90 + v(Math.asin((i - n) / n));
      },
      log: function (e) {
        1 == r.enableDebugLog && window.console && console.log(e);
      },
      lowerPowerOfTwo: function (e) {
        return Math.pow(2, Math.floor(Math.log(e) / Math.LN2));
      },
      nearestPowerOfTwo: function (e, t) {
        return Math.min(
          t || 2048,
          Math.pow(2, Math.ceil(Math.log(e) / Math.LN2))
        );
      },
      zoomStops: function (e, t, n, i, o) {
        null == i && (i = 256), null == o && (o = 2048);
        var a = Math.log(e / i) / Math.log(t);
        return (
          i *
          Math.pow(
            t,
            null == n ? Math.round(a) : 1 == n ? Math.ceil(a) : Math.floor(a)
          )
        );
      },
      extendOptions: function (e, n) {
        return t.extend(!0, {}, e, n);
      },
      getFullscreenElement: function () {
        return (
          document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement
        );
      },
      hasFullscreenEnabled: function () {
        return (
          document.fullscreenEnabled ||
          document.mozFullScreenEnabled ||
          document.webkitFullscreenEnabled ||
          document.msFullscreenEnabled
        );
      },
      getBasePage: function (e) {
        return 2 * Math.floor(e / 2);
      },
      loadResources: function (e, t, n) {
        var i = document,
          o = i.createElement(e),
          a = i.getElementsByTagName(e)[0];
        (o.async = !0),
          n &&
            o.addEventListener(
              'load',
              function (e) {
                n(null, e);
              },
              !1
            ),
          (o.src = t),
          a.parentNode.insertBefore(o, a);
      },
      getScript: function (e, t, n) {
        var i = document.createElement('script'),
          o = document.body.getElementsByTagName('script')[0];
        function a(e, o) {
          null != i &&
            (o || !i.readyState || /loaded|complete/.test(i.readyState)) &&
            ((i.onload = i.onreadystatechange = null),
            (i = null),
            (i = null),
            o || (t && t(), (t = null), (n = null)));
        }
        (i.async = 1),
          i.setAttribute('data-cfasync', !1),
          null != o
            ? (o.parentNode.insertBefore(i, o), (o = null))
            : document.body.appendChild(i),
          i.addEventListener('load', a, !1),
          i.addEventListener('readystatechange', a, !1),
          i.addEventListener('complete', a, !1),
          n && i.addEventListener('error', n, !1),
          (i.src = e + ('MS' == R.dom ? '?' + Math.random(1) : ''));
      },
      isHardPage: function (e, t, n, i) {
        if (null != e) {
          if ('cover' == e)
            return (
              0 == t ||
              (i && 1 == t) ||
              t == Math.floor(n / (i ? 1 : 2)) - (i ? 0 : 1)
            );
          if ('all' == e) return !0;
          var o = (',' + e + ',').indexOf(',' + (2 * t + 1) + ',') > -1,
            a = (',' + e + ',').indexOf(',' + (2 * t + 2) + ',') > -1;
          return o || a;
        }
        return !1;
      },
      fixMouseEvent: function (e) {
        if (e) {
          var n = e.originalEvent || e;
          if (n.changedTouches && n.changedTouches.length > 0) {
            var i = t.event.fix(e),
              o = n.changedTouches[0];
            return (
              (i.clientX = o.clientX),
              (i.clientY = o.clientY),
              (i.pageX = o.pageX),
              (i.touches = n.touches),
              (i.pageY = o.pageY),
              (i.movementX = o.movementX),
              (i.movementY = o.movementY),
              i
            );
          }
          return e;
        }
        return e;
      },
      hasWebgl: (function () {
        try {
          var e = document.createElement('canvas');
          return !(
            !window.WebGLRenderingContext ||
            (!e.getContext('webgl') && !e.getContext('experimental-webgl'))
          );
        } catch (e) {
          return !1;
        }
      })(),
      isBookletMode: function (t) {
        return (
          t.pageMode == e.PAGE_MODE.SINGLE &&
          t.singlePageMode == e.SINGLE_PAGE_MODE.BOOKLET
        );
      },
      isRTLMode: function (t) {
        return t.direction == e.DIRECTION.RTL;
      },
      isMobile:
        ((a = !1),
        (o = c || navigator.vendor || window.opera),
        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          o
        ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
            o.substr(0, 4)
          )) &&
          (a = !0),
        a),
      isIOS: /(iPad|iPhone|iPod)/g.test(c),
      isSafari:
        /constructor/i.test(window.HTMLElement) ||
        '[object SafariRemoteNotification]' ===
          (!window.safari || safari.pushNotification).toString(),
      prefix:
        ((n = window.getComputedStyle(document.documentElement, '')),
        (i = Array.prototype.slice
          .call(n)
          .join('')
          .match(/-(moz|webkit|ms)-/)[1]),
        {
          dom: 'WebKit|Moz|MS'.match(new RegExp('(' + i + ')', 'i'))[1],
          lowercase: i,
          css: '-' + i + '-',
          js: i[0].toUpperCase() + i.substr(1),
        }),
      __extends: function (e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        function i() {
          this.constructor = e;
        }
        return (
          (i.prototype = t.prototype),
          (e.prototype = new i()),
          (e.__super = t.prototype),
          e
        );
      },
    }),
    u = e.SOURCE_TYPE,
    p = (e.DISPLAY_TYPE, d.drag),
    h = d.mouseEvents,
    f = d.html,
    g = d.isset,
    m = (d.isnull, d.toRad),
    v = d.toDeg,
    b = (d.transition, d.translateStr),
    w = (d.resetBoxShadow, d.rotateStr),
    y = (d.bg, d.bgImage),
    P = (d.src, d.limitAt),
    x = d.distOrigin,
    C = d.distPoints,
    E = d.angleByDistance,
    S = d.log,
    k = d.nearestPowerOfTwo,
    T = d.extendOptions,
    L = d.getBasePage,
    O = d.getScript,
    I = d.fixMouseEvent,
    R = d.prefix,
    M = d.isBookletMode,
    D = d.isRTLMode,
    F = d.isMobile,
    z = d.hasWebgl,
    N = d.isSafari,
    A = d.isIOS,
    B = d.__extends;
  !(function () {
    if (window.CanvasPixelArray)
      'function' != typeof window.CanvasPixelArray.prototype.set &&
        (window.CanvasPixelArray.prototype.set = function (e) {
          for (var t = 0, n = this.length; t < n; t++) this[t] = e[t];
        });
    else {
      var e,
        t = !1;
      if (
        (N &&
          (t =
            (e = c.match(/Version\/([0-9]+)\.([0-9]+)\.([0-9]+) Safari\//)) &&
            parseInt(e[1]) < 6),
        t)
      ) {
        var n = window.CanvasRenderingContext2D.prototype,
          i = n.createImageData;
        (n.createImageData = function (e, t) {
          var n = i.call(this, e, t);
          return (
            (n.data.set = function (e) {
              for (var t = 0, n = this.length; t < n; t++) this[t] = e[t];
            }),
            n
          );
        }),
          (n = null);
      }
    }
  })(),
    'requestAnimationFrame' in window ||
      (window.requestAnimationFrame =
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (e) {
          window.setTimeout(e, 20);
        }),
    (function () {
      if ('undefined' != typeof Uint8Array)
        return (
          void 0 === Uint8Array.prototype.subarray &&
            ((Uint8Array.prototype.subarray = function (e, t) {
              return new Uint8Array(this.slice(e, t));
            }),
            (Float32Array.prototype.subarray = function (e, t) {
              return new Float32Array(this.slice(e, t));
            })),
          void (
            'undefined' == typeof Float64Array &&
            (window.Float64Array = Float32Array)
          )
        );
      function e(e, t) {
        return new n(this.slice(e, t));
      }
      function t(e, t) {
        arguments.length < 2 && (t = 0);
        for (var n = 0, i = e.length; n < i; ++n, ++t) this[t] = 255 & e[n];
      }
      function n(n) {
        var i, o, a;
        if ('number' == typeof n) for (i = [], o = 0; o < n; ++o) i[o] = 0;
        else if ('slice' in n) i = n.slice(0);
        else for (i = [], o = 0, a = n.length; o < a; ++o) i[o] = n[o];
        return (
          (i.subarray = e),
          (i.buffer = i),
          (i.byteLength = i.length),
          (i.set = t),
          'object' == typeof n && n.buffer && (i.buffer = n.buffer),
          i
        );
      }
      (window.Uint8Array = n),
        (window.Int8Array = n),
        (window.Uint32Array = n),
        (window.Int32Array = n),
        (window.Uint16Array = n),
        (window.Float32Array = n),
        (window.Float64Array = n);
    })();
  var j = function (n, i) {
      var o = 'pdff-ui',
        a = 'pdff-ui-wrapper',
        r = o + '-btn',
        s = (i.ui = t(f.div, { class: o })),
        l = i.options;
      s.dispose = function () {
        n.find('.' + r).each(function () {
          t(this).off();
        }),
          y.off(),
          u.off(),
          p.off(),
          h.off(),
          g.off(),
          m.off(),
          v.off(),
          b.off(),
          P.off(),
          x.off(),
          T.off(),
          L.off(),
          I.off(),
          R.off(),
          M.off(),
          D.off(),
          F.off(),
          z.off(),
          N.off(),
          A.off(),
          O.remove(),
          w.remove(),
          p.remove(),
          u.remove(),
          g.remove(),
          s.shareBox &&
            (s.shareBox.dispose && s.shareBox.dispose(), (s.shareBox = null)),
          document.removeEventListener('keyup', X, !1),
          window.removeEventListener('click', C, !1),
          (s.update = null),
          (i = null);
      };
      var c = function (e) {
          return (
            isNaN(e)
              ? (e = i.target._activePage)
              : e < 1
              ? (e = 1)
              : e > i.target.pageCount && (e = i.target.pageCount),
            e
          );
        },
        u = (s.next = t(f.div, {
          class: r + ' ' + o + '-next ' + l.icons.next,
          title: l.text.nextPage,
          html: '<span>' + l.text.nextPage + '</span>',
        }).on('click', function () {
          i.next();
        })),
        p = (s.prev = t(f.div, {
          class: r + ' ' + o + '-prev ' + l.icons.prev,
          title: l.text.previousPage,
          html: '<span>' + l.text.previousPage + '</span>',
        }).on('click', function () {
          i.prev();
        })),
        h = t(f.div, {
          class: r + ' ' + o + '-play ' + l.icons.play,
          title: l.text.play,
          html: '<span>' + l.text.play + '</span>',
        }).on('click', function () {
          var e = t(this);
          i.setAutoPlay(!e.hasClass(l.icons.pause));
        });
      1 == l.autoPlay && ((s.play = h), i.setAutoPlay(l.autoPlayStart));
      var g = t(f.div, { class: a + ' ' + o + '-zoom' }),
        m = (s.zoomIn = t(f.div, {
          class: r + ' ' + o + '-zoomin ' + l.icons.zoomin,
          title: l.text.zoomIn,
          html: '<span>' + l.text.zoomIn + '</span>',
        }).on('click', function () {
          i.zoom(1),
            s.update(),
            i.target.startPoint &&
              i.target.pan &&
              i.target.pan(i.target.startPoint);
        })),
        v = (s.zoomOut = t(f.div, {
          class: r + ' ' + o + '-zoomout ' + l.icons.zoomout,
          title: l.text.zoomOut,
          html: '<span>' + l.text.zoomOut + '</span>',
        }).on('click', function () {
          i.zoom(-1),
            s.update(),
            i.target.startPoint &&
              i.target.pan &&
              i.target.pan(i.target.startPoint);
        }));
      g.append(m).append(v);
      var b = (s.pageNumber = t(f.div, { class: r + ' ' + o + '-page' })
        .on('change', function () {
          var e = parseInt(s.pageInput.val(), 10);
          (e = c(e)), i.gotoPage(e);
        })
        .on('keyup', function (e) {
          if (13 == e.keyCode) {
            var t = parseInt(s.pageInput.val(), 10);
            (t = c(t)) !== c(i.target._activePage || i._activePage) &&
              i.gotoPage(t);
          }
        }));
      (s.pageInput = t(
        '<input id="df_book_page_number" type="text"/>'
      ).appendTo(b)),
        (s.pageLabel = t('<label for="df_book_page_number"/>').appendTo(b));
      var w = t(f.div, { class: a + ' ' + o + '-size' }),
        y = t(f.div, {
          class: r + ' ' + o + '-help ' + l.icons.help,
          title: l.text.toggleHelp,
          html: '<span>' + l.text.toggleHelp + '</span>',
        }).on('click', function () {}),
        P = (s.sound = t(f.div, {
          class: r + ' ' + o + '-sound ' + l.icons.sound,
          title: l.text.toggleSound,
          html: '<span>' + l.text.toggleSound + '</span>',
        }).on('click', function () {
          (l.enableSound = !l.enableSound), s.updateSound();
        }));
      (s.updateSound = function () {
        0 == l.enableSound || 'false' == l.enableSound
          ? P.addClass('disabled')
          : P.removeClass('disabled');
      }),
        s.updateSound();
      var x = (s.more = t(f.div, {
        class: r + ' ' + o + '-more ' + l.icons.more,
      }).on('click', function (e) {
        x.hasClass('pdff-active') ||
          (t(this).addClass('pdff-active'), e.stopPropagation());
      }));
      function C(e) {
        x.removeClass('pdff-active');
      }
      window.addEventListener('click', C, !1);
      var E = t(f.div, { class: 'more-container' });
      if ((x.append(E), 'string' == typeof l.source && 1 == l.downloadEnable)) {
        var k = r + ' ' + o + '-download ' + l.icons.download;
        (s.download = t(
          '<a download target="_blank" class="' +
            k +
            '"><span>' +
            l.text.downloadPDFFile +
            '</span></a>'
        ))
          .attr('href', l.source)
          .attr('title', l.text.downloadPDFFile);
      }
      d.hasFullscreenEnabled() || n.addClass('pdff-custom-fullscreen'),
        (s.switchFullscreen = function () {
          d.getFullscreenElement();
          var e = i.container[0];
          1 != s.isFullscreen
            ? (i.container.addClass('pdff-fullscreen'),
              e.requestFullscreen
                ? e.requestFullscreen()
                : e.msRequestFullscreen
                ? e.msRequestFullscreen()
                : e.mozRequestFullScreen
                ? e.mozRequestFullScreen()
                : e.webkitRequestFullscreen && e.webkitRequestFullscreen(),
              (s.isFullscreen = !0))
            : (i.container.removeClass('pdff-fullscreen'),
              (s.isFullscreen = !1),
              document.exitFullscreen
                ? document.exitFullscreen()
                : document.msExitFullscreen
                ? document.msExitFullscreen()
                : document.mozCancelFullScreen
                ? document.mozCancelFullScreen()
                : document.webkitExitFullscreen &&
                  document.webkitExitFullscreen()),
            d.hasFullscreenEnabled() ||
              setTimeout(function () {
                i.resize();
              }, 50);
        });
      var T = (s.fullScreen = t(f.div, {
          class: r + ' ' + o + '-fullscreen ' + l.icons.fullscreen,
          title: l.text.toggleFullscreen,
          html: '<span>' + l.text.toggleFullscreen + '</span>',
        }).on('click', s.switchFullscreen)),
        L = (s.fit = t(f.div, {
          class: r + ' ' + o + '-fit ' + l.icons.fitscreen,
        }).on('click', function () {
          t(this).toggleClass('pdff-button-fit-active');
        }));
      w.append(T);
      var O = t(f.div, { class: a + ' ' + o + '-controls' }),
        I =
          ((s.shareBox = new e.Share(n, l)),
          (s.share = t(f.div, {
            class: r + ' ' + o + '-share ' + l.icons.share,
            title: l.text.share,
            html: '<span>' + l.text.share + '</span>',
          }).on('click', function (e) {
            1 == s.shareBox.isOpen
              ? s.shareBox.close()
              : (s.shareBox.update(i.getURLHash()), s.shareBox.show());
          }))),
        R = (s.startPage = t(f.div, {
          class: r + ' ' + o + '-start ' + l.icons.start,
          title: l.text.gotoFirstPage,
          html: '<span>' + l.text.gotoFirstPage + '</span>',
        }).on('click', function () {
          i.start();
        })),
        M = (s.endPage = t(f.div, {
          class: r + ' ' + o + '-end ' + l.icons.end,
          title: l.text.gotoLastPage,
          html: '<span>' + l.text.gotoLastPage + '</span>',
        }).on('click', function () {
          i.end();
        })),
        D = (s.pageMode = t(f.div, {
          class: r + ' ' + o + '-pagemode ' + l.icons.singlepage,
          html: '<span>' + l.text.singlePageMode + '</span>',
        }).on('click', function () {
          var e = t(this);
          i.setPageMode(!e.hasClass(l.icons.doublepage));
        }));
      i.setPageMode(i.target.pageMode == e.PAGE_MODE.SINGLE);
      for (
        var F = (s.altPrev = t(f.div, {
            class: r + ' ' + o + '-prev ' + o + '-alt ' + l.icons.prev,
            title: l.text.previousPage,
            html: '<span>' + l.text.previousPage + '</span>',
          }).on('click', function () {
            i.prev();
          })),
          z = (s.altNext = t(f.div, {
            class: r + ' ' + o + '-next ' + o + '-alt ' + l.icons.next,
            title: l.text.nextPage,
            html: '<span>' + l.text.nextPage + '</span>',
          }).on('click', function () {
            i.next();
          })),
          N = (s.thumbnail = t(f.div, {
            class: r + ' ' + o + '-thumbnail ' + l.icons.thumbnail,
            title: l.text.toggleThumbnails,
            html: '<span>' + l.text.toggleThumbnails + '</span>',
          }).on('click', function () {
            var e = t(this);
            i.target.thumbContainer
              ? (i.target.thumbContainer.toggleClass('pdff-sidemenu-visible'),
                e.toggleClass('pdff-active'))
              : (i.contentProvider.initThumbs(), e.toggleClass('pdff-active')),
              e.hasClass('pdff-active') &&
                e.siblings('.pdff-active').trigger('click'),
              s.update(!0);
          })),
          A = (s.outline = t(f.div, {
            class: r + ' ' + o + '-outline ' + l.icons.outline,
            title: l.text.toggleOutline,
            html: '<span>' + l.text.toggleOutline + '</span>',
          }).on('click', function () {
            var e = t(this);
            if (i.target.outlineContainer) {
              var n = i.target.outlineContainer;
              e.toggleClass('pdff-active'),
                n.toggleClass('pdff-sidemenu-visible'),
                e.hasClass('pdff-active') &&
                  e.siblings('.pdff-active').trigger('click'),
                s.update(!0);
            }
          })),
          B = l.allControls.replace(/ /g, '').split(','),
          j = ',' + l.moreControls.replace(/ /g, '') + ',',
          _ = ',' + l.hideControls.replace(/ /g, '') + ',',
          U = (j.split(','), 0);
        U < B.length;
        U++
      ) {
        var H = B[U];
        if (_.indexOf(',' + H + ',') < 0) {
          var W = s[H];
          null != W &&
            (j.indexOf(',' + H + ',') > -1 && 'more' !== H && 'pageNumber' !== H
              ? E.append(W)
              : O.append(W));
        }
      }
      n.append(O).append(p).append(u).append(g);
      var G = 16,
        V = 17,
        q = 18,
        Z = 39,
        Y = 37,
        K = 27;
      function X(e) {
        switch (e.keyCode) {
          case K:
            1 == s.isFullscreen && s.fullScreen.trigger('click');
            break;
          case G:
          case V:
          case q:
            break;
          case Y:
            i.prev();
            break;
          case Z:
            i.next();
        }
      }
      document.addEventListener('keyup', X, !1),
        (s.update = function (t) {
          S('ui update');
          var o = i.target,
            a = c(o._activePage || i._activePage),
            r = o.pageCount || i.pageCount,
            l = o.direction == e.DIRECTION.RTL,
            d = 1 == a || 0 == a,
            u = a == r;
          s.next.show(),
            s.prev.show(),
            s.altNext.removeClass('disabled'),
            s.altPrev.removeClass('disabled'),
            ((d && !l) || (u && l)) &&
              (s.prev.hide(), s.altPrev.addClass('disabled')),
            ((u && !l) || (d && l)) &&
              (s.next.hide(), s.altNext.addClass('disabled')),
            s.pageInput.val(a),
            s.pageLabel.html(a + '/' + r),
            n.find('.pdff-sidemenu-visible').length > 0
              ? n.addClass('pdff-sidemenu-open')
              : n.removeClass('pdff-sidemenu-open'),
            1 == t && i.resize(),
            o.contentProvider.zoomScale == o.contentProvider.maxZoom
              ? s.zoomIn.addClass('disabled')
              : s.zoomIn.removeClass('disabled'),
            1 == o.contentProvider.zoomScale
              ? s.zoomOut.addClass('disabled')
              : s.zoomOut.removeClass('disabled');
        }),
        null != i.target && (i.target.ui = s),
        null != l.onCreateUI && l.onCreateUI(i);
    },
    _ = null;
  var U = (function (n) {
    function i(t) {
      (t = t || {}), (this.type = 'PreviewObject');
      var n = this;
      function i() {
        setTimeout(function () {
          n.resize();
        }, 50);
      }
      (n.zoomValue = 1),
        window.addEventListener('resize', i, !1),
        (this.sound = document.createElement('audio')),
        this.sound.setAttribute('src', t.soundFile + '?ver=' + e.version),
        this.sound.setAttribute('type', 'audio/mpeg'),
        (this.autoPlayFunction = function () {
          n &&
            n.target.autoPlay &&
            (n.target.direction == e.DIRECTION.RTL
              ? n.target.prev()
              : n.target.next());
        }),
        (this.dispose = function () {
          if (
            (clearInterval(this.autoPlayTimer),
            (this.autoPlayTimer = null),
            (this.autoPlayFunction = null),
            this.target && this.target.children)
          )
            for (var e = 0; e < this.target.children.length; e++) {
              var t = this.target.children[e];
              t && t.currentTween && t.currentTween.stop();
            }
          this.zoomTween &&
            (this.zoomTween.stop && this.zoomTween.stop(),
            (this.zoomTween = null)),
            this.container &&
              this.container.info &&
              this.container.info.remove &&
              this.container.info.remove(),
            this.target && this.target.dispose && this.target.dispose(),
            (this.target = null),
            this.stage && this.stage.dispose && this.stage.dispose(),
            (this.stage = null),
            this.ui && this.ui.dispose && this.ui.dispose(),
            (this.ui = null),
            this.contentProvider &&
              this.contentProvider.dispose &&
              this.contentProvider.dispose(),
            (this.contentProvider = null),
            window.removeEventListener('resize', i);
        });
    }
    return (
      (i.prototype = {
        start: function () {
          this.target.gotoPage(this.target.startPage);
        },
        end: function () {
          this.target.gotoPage(this.target.endPage);
        },
        next: function () {},
        prev: function () {},
        zoom: function (e) {
          (this.pendingZoom = !0),
            (this.zoomDelta = e),
            this.resize(),
            this.ui.update();
        },
        resize: function () {
          var n = this;
          if (
            null != n.target &&
            null != n.target.ui &&
            null != n.target.contentProvider &&
            null != n.target.contentProvider.viewport &&
            null != n.target.stage
          ) {
            this.ui &&
              1 == this.ui.isFullscreen &&
              1 == d.hasFullscreenEnabled() &&
              null == d.getFullscreenElement() &&
              this.ui.switchFullscreen();
            var i,
              o,
              a,
              r,
              s,
              l,
              c = n.target,
              p = n.container,
              h = n.options,
              f = c.stage,
              g = c.contentProvider,
              m = g.pageRatio,
              v = (g.zoomViewport, D(c)),
              b = 'css' !== c.mode,
              w = (g.pageRatio, p.hasClass('pdff-sidemenu-open') ? 220 : 0),
              y = this.target.pageMode == e.PAGE_MODE.SINGLE;
            p.height(h.height);
            var C = Math.min(p.height(), t(window).height());
            p.height(C);
            var E = p.width();
            E < 400
              ? n.container.addClass('pdff-xs')
              : n.container.removeClass('pdff-xs');
            var S = p.find('.pdff-ui-controls').height(),
              k =
                h.paddingTop +
                (h.controlsPosition == e.CONTROLSPOSITION.TOP ? S : 0),
              T = h.paddingRight,
              L =
                h.paddingBottom +
                (h.controlsPosition == e.CONTROLSPOSITION.BOTTOM ? S : 0),
              O = h.paddingLeft,
              I = E - w,
              R = C,
              M =
                (k = isNaN(k) ? 0 : P(k, 0, k)) +
                (L = isNaN(L) ? 0 : P(L, 0, L)),
              F =
                (O = isNaN(O) ? 0 : P(O, 0, O)) +
                (T = isNaN(T) ? 0 : P(T, 0, T)),
              z = I - F,
              N = R - M;
            if (
              ((a = Math.floor(y ? z : z / 2)),
              (i = (o = Math.floor(a / m)) > N) && (a = (o = N) * m),
              (l = g.maxZoom = g.zoomViewport.height / o),
              null == n.zoomValue && (n.zoomValue = 1),
              null == g.zoomScale && (g.zoomScale = 1),
              1 == n.pendingZoom && null != n.zoomDelta)
            ) {
              n.zoomDelta;
              var A,
                B = Math.max(o, a);
              (n.zoomValue =
                n.zoomDelta > 0
                  ? n.zoomValue * n.options.zoomRatio
                  : n.zoomValue / n.options.zoomRatio),
                (n.zoomValue = P(n.zoomValue, 1, l)),
                1 == n.zoomValue
                  ? (g.zoomScale = 1)
                  : ((A = o * n.zoomValue),
                    (A = d.zoomStops(
                      A,
                      n.options.zoomRatio,
                      n.zoomDelta > 0,
                      Math.max(a, o)
                    )),
                    (g.zoomScale = P(A / B, 1, l)));
            }
            (s = g.zoomScale),
              g.checkViewportSize(a, o, s),
              g.contentSourceType == u.PDF &&
                ((a = g.imageViewport.width / s),
                (o = g.imageViewport.height / s)),
              1 != g.zoomScale &&
                this.target.container.addClass('pdff-zoom-enabled');
            var j = (c.zoomWidth = Math.floor(a * s)),
              _ = (c.zoomHeight = Math.floor(o * s)),
              U = 2 * j;
            if (b) {
              var H = _ / c.height,
                W = i
                  ? (s * (o + M)) / H
                  : (s * (a * (y ? 1 : 2) + F)) / H / (I / R);
              f.resizeCanvas(I, R),
                (r =
                  1 /
                    ((2 * Math.tan((Math.PI * f.camera.fov * 0.5) / 180)) /
                      (W / s)) +
                  2.2),
                f.camera.updateProjectionMatrix(),
                (f.renderRequestPending = !0);
              var G = ((k - L) * (c.height / o)) / s / 2,
                V = 1 == g.zoomScale;
              f.camera.position.z !== r && 1 == n.pendingZoom
                ? (null != n.zoomTween && n.zoomTween.stop(),
                  (n.zoomTween = new TWEEN.Tween({
                    campos: f.camera.position.z,
                    otx: f.orbitControl.target.x,
                    oty: f.orbitControl.target.y,
                    otz: f.orbitControl.target.z,
                  })
                    .delay(0)
                    .to({ campos: r, otx: 0, oty: G, otz: 0 }, 100)
                    .onUpdate(function () {
                      (f.camera.position.z = this.campos),
                        V &&
                          ((f.camera.position.y = this.oty),
                          (f.orbitControl.target = new THREE.Vector3(
                            this.otx,
                            this.oty,
                            this.otz
                          ))),
                        f.orbitControl.update();
                    })
                    .easing(TWEEN.Easing.Linear.None)
                    .onComplete(function () {
                      (f.camera.position.z = r),
                        1 == g.zoomScale &&
                          (f.camera.position.set(0, G, r),
                          (f.orbitControl.target = new THREE.Vector3(0, G, 0))),
                        f.orbitControl.update();
                    })
                    .start()))
                : (1 == g.zoomScale &&
                    (f.camera.position.set(0, G, r),
                    (f.orbitControl.target = new THREE.Vector3(0, G, 0))),
                  f.orbitControl.update()),
                f.orbitControl.update(),
                (f.orbitControl.mouseButtons.ORBIT =
                  1 != s ? -1 : THREE.MOUSE.RIGHT),
                (f.orbitControl.mouseButtons.PAN =
                  1 != s ? THREE.MOUSE.LEFT : -1);
            } else {
              (c.pageWidth = Math.round(a)),
                (c.fullWidth = 2 * c.pageWidth),
                (c.height = Math.round(o));
              var q = (c.shiftHeight = Math.round(P((_ - R + M) / 2, 0, _))),
                Z = (c.shiftWidth = Math.round(P((U - I + F) / 2, 0, U)));
              1 == s && ((c.left = 0), (c.top = 0)),
                c.stage.css({
                  top: -q,
                  bottom: -q,
                  right: -Z + (v ? w : 0),
                  left: -Z + (v ? 0 : w),
                  paddingTop: k,
                  paddingRight: T,
                  paddingBottom: L,
                  paddingLeft: O,
                  transform: 'translate3d(' + c.left + 'px,' + c.top + 'px,0)',
                }),
                (c.stageHeight = f.height()),
                c.wrapper.css({
                  width: U,
                  height: _,
                  marginTop: C - _ - M > 0 ? (C - M - _) / 2 : 0,
                });
              var Y = Math.floor(x(a, o) * s);
              c.stage.find('.pdff-page-wrapper').width(Y).height(Y),
                c.stage
                  .find(
                    '.ppdff-flipbook-page, .pdff-page-front , .pdff-page-back, .pdff-page-fold-inner-shadow'
                  )
                  .height(_)
                  .width(j);
            }
            n.checkCenter({ type: 'resize' }),
              1 == g.zoomScale &&
                this.target.container.removeClass('pdff-zoom-enabled'),
              c.thumblist &&
                c.thumblist.reset(t(c.thumblist.container).height()),
              (n.pendingZoom = !1);
          }
        },
        playSound: function () {
          try {
            this.options &&
              1 == this.options.enableSound &&
              ((this.sound.currentTime = 0), this.sound.play());
          } catch (e) {}
        },
        setPageMode: function (t) {
          1 == t
            ? (this.ui.pageMode.addClass(this.options.icons.doublepage),
              this.ui.pageMode.html(
                '<span>' + this.options.text.doublePageMode + '</span>'
              ),
              this.ui.pageMode.attr('title', this.options.text.doublePageMode),
              (this.target.pageMode = e.PAGE_MODE.SINGLE))
            : (this.ui.pageMode.removeClass(this.options.icons.doublepage),
              this.ui.pageMode.html(
                '<span>' + this.options.text.singlePageMode + '</span>'
              ),
              this.ui.pageMode.attr('title', this.options.text.singlePageMode),
              (this.target.pageMode = e.PAGE_MODE.DOUBLE)),
            this.target &&
              this.target.singlePageMode == e.SINGLE_PAGE_MODE.BOOKLET &&
              this.target.reset(),
            this.resize();
        },
        setAutoPlay: function (e) {
          if (this.options.autoPlay) {
            var t = (e = 1 == e)
              ? this.options.text.pause
              : this.options.text.play;
            this.ui.play.toggleClass(this.options.icons.pause, e),
              this.ui.play.html('<span>' + t + '</span>'),
              this.ui.play.attr('title', t),
              clearInterval(this.autoPlayTimer),
              e &&
                (this.autoPlayTimer = setInterval(
                  this.autoPlayFunction,
                  this.options.autoPlayDuration
                )),
              (this.target.autoPlay = e);
          }
        },
        height: function (e) {
          if (null == e) return this.container.height();
          (this.options.height = e), this.container.height(e), this.resize();
        },
        checkCenter: function (t) {
          (t = null == t ? {} : t),
            (this.centerType = this.centerType || 'start');
          var n,
            i = this.target,
            o = 0,
            a = 0,
            r = 0,
            s = d.getBasePage(i._activePage),
            l = i._activePage % 2 == 0,
            c = i.direction == e.DIRECTION.RTL,
            u = i.pageMode == e.PAGE_MODE.SINGLE,
            p = u && i.singlePageMode == e.SINGLE_PAGE_MODE.BOOKLET,
            h = i.stage.width();
          if ('css' == i.mode)
            (n = i.wrapper.width()),
              (o = Math.max((n - h) / 2, 0)),
              (a = -n / 4),
              (r = n / 4),
              0 == s || p
                ? (i.wrapper.css({ left: u ? (c ? r - o : a - o) : c ? r : a }),
                  i.shadow.css({
                    width: '50%',
                    left: c ? 0 : '50%',
                    transitionDelay: '',
                  }))
                : s == i.pageCount
                ? (i.wrapper.css({ left: u ? (c ? a - o : r - o) : c ? a : r }),
                  i.shadow.css({
                    width: '50%',
                    left: c ? '50%' : 0,
                    transitionDelay: '',
                  }))
                : (i.wrapper.css({
                    left: u ? (c ? (l ? a - o : r - o) : l ? r - o : a - o) : 0,
                  }),
                  i.shadow.css({
                    width: '100%',
                    left: 0,
                    transitionDelay: parseInt(i.duration, 10) + 50 + 'ms',
                  })),
              i.wrapper.css({ transition: 'resize' == t.type ? 'none' : '' });
          else if (null != i.stage) {
            var f,
              g = i.position.x;
            (o = i.width / 4),
              (a = -(n = i.width) / 2),
              (r = n / 2),
              (f =
                0 == s || p
                  ? c
                    ? r
                    : a
                  : s == i.pageCount
                  ? c
                    ? a
                    : r
                  : u
                  ? c
                    ? l
                      ? a
                      : r
                    : l
                    ? r
                    : a
                  : 0) !== this.centerEnd &&
                ((this.centerTween = new TWEEN.Tween({ x: g })
                  .delay(0)
                  .to({ x: f }, i.duration)
                  .onUpdate(function () {
                    (i.position.x = this.x),
                      (i.stage.cssScene.position.x = this.x);
                  })
                  .easing(i.ease)
                  .start()),
                (this.centerEnd = f));
          }
        },
        width: function (e) {
          if (null == e) return this.container.width();
          (this.options.width = e), this.container.width(e), this.resize();
        },
      }),
      i
    );
  })();
  e.PreviewObject = U;
  var H = (function (n) {
      function i(n, i, o, a) {
        o = o || {};
        var s = this;
        if (
          ((s.contentRawSource = n || [r.textureLoadFallback]),
          (s.contentSource = s.contentRawSource),
          (s.contentSourceType = null),
          (s.minDimension = o.minTextureSize || 256),
          (s.maxDimension = o.maxTextureSize || 2048),
          (s.pdfRenderQuality =
            o.pdfRenderQuality || e.defaults.pdfRenderQuality),
          (s.flipbook = a),
          (s.waitPeriod = 50),
          (s.maxLength = 297),
          (s.enableDebug = !1),
          (s.zoomScale = 1),
          (s.maxZoom = 2),
          (s.options = o),
          (s.outline = o.outline),
          (s.links = o.links),
          (s.html = o.html),
          (s.isCrossOrigin = o.isCrossOrigin),
          (s.normalViewport = { height: 297, width: 210, scale: 1 }),
          (s.viewport = { height: 297, width: 210, scale: 1 }),
          (s.imageViewport = { height: 297, width: 210, scale: 1 }),
          (s.bookSize = { height: 297, width: 210 }),
          (s.zoomViewport = { height: 297, width: 210 }),
          (s.thumbsize = 128),
          (s.cacheIndex = 256),
          (s.cache = []),
          (s.pageRatio = o.pageRatio || s.viewport.width / s.viewport.height),
          (s.textureLoadTimeOut = null),
          (s.type = 'TextureLibrary'),
          Array === s.contentSource.constructor ||
            Array.isArray(s.contentSource) ||
            s.contentSource instanceof Array)
        )
          (s.contentSourceType = u.IMAGE),
            (s.pageCount = s.contentSource.length),
            t('<img/>')
              .attr('src', s.contentSource[0])
              .on('load', function () {
                (s.viewport.height = this.height),
                  (s.viewport.width = this.width),
                  (s.pageRatio = s.viewport.width / s.viewport.height),
                  (s.bookSize = {
                    width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxLength,
                    height: s.maxLength / (s.pageRatio < 1 ? 1 : s.pageRatio),
                  }),
                  (s.zoomViewport = {
                    width: (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxDimension,
                    height:
                      s.maxDimension / (s.pageRatio < 1 ? 1 : s.pageRatio),
                  }),
                  (s.linkService = new PDFLinkService()),
                  t(this).off(),
                  s.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL &&
                    ((s.pageCount = 2 * s.contentSource.length - 2),
                    1 == s.options.webgl &&
                      (s.requiresImageTextureScaling = !0)),
                  null != i && (i(s), (i = null)),
                  S(this.height + ':' + this.width);
              });
        else if (
          'string' == typeof s.contentSource ||
          s.contentSource instanceof String
        ) {
          var l = function () {
              if (s) {
                (PDFJS.workerSrc = r.pdfjsWorkerSrc),
                  (s.contentSourceType = u.PDF),
                  (PDFJS.disableAutoFetch = !0),
                  (PDFJS.disableStream = !0),
                  (N || A || 1 == s.options.disableFontFace) &&
                    (PDFJS.disableFontFace =
                      N || A || 1 == s.options.disableFontFace),
                  (PDFJS.imageResourcesPath = r.imageResourcesPath),
                  (PDFJS.cMapUrl = r.cMapUrl),
                  (PDFJS.cMapPacked = !0),
                  (PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK);
                var t = (s.loading = PDFJS.getDocument(
                  s.options.docParameters
                    ? s.options.docParameters
                    : {
                        url: d.httpsCorrection(n),
                        rangeChunkSize: isNaN(e.defaults.rangeChunkSize)
                          ? 524288
                          : e.defaults.rangeChunkSize,
                      }
                ));
                t.then(
                  function (t) {
                    (s.pdfDocument = t),
                      t.getPage(1).then(function (n) {
                        (s.normalViewport = n.getViewport(1)),
                          (s.viewport = n.getViewport(1)),
                          (s.viewport.height = s.viewport.height / 10),
                          (s.viewport.width = s.viewport.width / 10),
                          (s.pageRatio = s.viewport.width / s.viewport.height),
                          (s.bookSize = {
                            width:
                              (s.pageRatio > 1 ? 1 : s.pageRatio) * s.maxLength,
                            height:
                              s.maxLength / (s.pageRatio < 1 ? 1 : s.pageRatio),
                          }),
                          (s.zoomViewport = {
                            width:
                              (s.pageRatio > 1 ? 1 : s.pageRatio) *
                              s.maxDimension,
                            height:
                              s.maxDimension /
                              (s.pageRatio < 1 ? 1 : s.pageRatio),
                          }),
                          (s.refPage = n),
                          t.numPages > 1
                            ? t.getPage(2).then(function (n) {
                                if (s.options.pageSize == e.PAGE_SIZE.AUTO) {
                                  var o = n.getViewport(1);
                                  o.width / o.height > 1.5 * s.pageRatio
                                    ? ((s.options.pageSize =
                                        e.PAGE_SIZE.DOUBLEINTERNAL),
                                      (s.pageCount = 2 * t.numPages - 2))
                                    : (s.options.pageSize = e.PAGE_SIZE.SINGLE);
                                }
                                null != i && (i(s), (i = null));
                              })
                            : null != i && (i(s), (i = null));
                      }),
                      (s.linkService = new PDFLinkService()),
                      s.linkService.setDocument(t, null),
                      (s.pageCount = t.numPages),
                      (s.contentSource = t);
                  },
                  function (e) {
                    if (s) {
                      var t = '',
                        n = document.createElement('a');
                      (n.href = s.contentSource),
                        n.hostname !== window.location.hostname &&
                          (t = 'CROSS ORIGIN!! '),
                        s.updateInfo(
                          t + 'Error Loading File -  ' + s.contentSource
                        );
                    }
                  }
                ),
                  (t.onProgress = function (e) {
                    if (s) {
                      var t = (100 * e.loaded) / e.total;
                      isNaN(t)
                        ? e && e.loaded
                          ? s.updateInfo(
                              'Loading Pages ' +
                                (Math.ceil(e.loaded / 1e4) / 100).toString() +
                                'MB ...'
                            )
                          : s.updateInfo('Loading Pages ...')
                        : s.updateInfo(
                            'Loading Pages ' +
                              t.toString().split('.')[0] +
                              '% ...'
                          );
                    }
                  });
              }
            },
            c = function () {
              if (s) {
                (r.pdfjsWorkerSrc += '?ver=' + e.version),
                  s.updateInfo('Loading Interface ...');
                var n = document.createElement('a');
                (n.href = r.pdfjsWorkerSrc),
                  n.hostname !== window.location.hostname
                    ? (s.updateInfo('Loading Interface ...'),
                      t.ajax({
                        url: r.pdfjsWorkerSrc,
                        cache: !0,
                        success: function (t) {
                          (r.pdfjsWorkerSrc = e.createObjectURL(
                            t,
                            'text/javascript'
                          )),
                            l();
                        },
                      }))
                    : l();
              }
            };
          null == window.PDFJS
            ? s &&
              (s.updateInfo('Loading Interface ...'),
              O(
                r.pdfjsSrc + '?ver=' + e.version,
                function () {
                  'function' == typeof define && define.amd
                    ? (s.updateInfo('Loading Interface ...'),
                      require.config({
                        paths: {
                          'pdfjs-dist/build/pdf.worker': r.pdfjsWorkerSrc.replace(
                            '.js',
                            ''
                          ),
                        },
                      }),
                      require(['pdfjs-dist/build/pdf'], function (e) {
                        c();
                      }))
                    : c();
                },
                function () {
                  s.updateInfo('Unable to load Interface ..');
                }
              ))
            : l();
        } else
          console.error(
            'Unsupported source type. Please load a valid PDF file.'
          );
        return (
          (this.dispose = function () {
            s.loading && s.loading.destroy && s.loading.destroy(),
              (s.loading = null),
              s.textureLoadTimeOut &&
                (clearTimeout(s.textureLoadTimeOut),
                (s.textureLoadTimeOut = null)),
              this.targetObject &&
                (this.targetObject.thumbContainer &&
                  this.targetObject.thumbContainer.remove &&
                  this.targetObject.thumbContainer.remove(),
                this.targetObject.outlineContainer &&
                  this.targetObject.outlineContainer.remove &&
                  this.targetObject.outlineContainer.remove(),
                this.targetObject.dispose && this.targetObject.dispose(),
                (this.targetObject.processPage = null),
                (this.targetObject.requestPage = null),
                this.targetObject.container &&
                  this.targetObject.container.off &&
                  this.targetObject.container.off()),
              this.pdfDocument &&
                this.pdfDocument.destroy &&
                this.pdfDocument.destroy(),
              this.linkService &&
                this.linkService.dispose &&
                this.linkService.dispose(),
              this.outlineViewer &&
                this.outlineViewer.dispose &&
                this.outlineViewer.dispose(),
              this.thumblist &&
                this.thumblist.dispose &&
                ((this.thumblist.review = null), this.thumblist.dispose()),
              (this.activeThumb = null),
              (this.targetObject = null),
              (this.pdfDocument = null),
              (this.linkService = null),
              (this.outlineViewer = null),
              (this.thumblist = null),
              (s = null);
          }),
          this
        );
      }
      return (
        B(i, {}),
        (i.prototype.updateInfo = function (e) {
          this.flipbook &&
            this.flipbook.updateInfo &&
            this.flipbook.updateInfo(e);
        }),
        (i.prototype.initThumbs = function () {
          var e,
            n = this;
          null == n.cache[n.thumbsize] && (n.cache[n.thumbsize] = []);
          var i = function () {
              clearTimeout(e),
                (e = setTimeout(function () {
                  e = setTimeout(o, n.waitPeriod / 2);
                }, n.waitPeriod));
            },
            o = function () {
              var o = 0;
              if (
                (Date.now() - n.thumblist.lastScrolled < 100
                  ? (o = 1)
                  : (n.targetObject.container
                      .find('.pdff-thumb-container .pdff-vrow')
                      .each(function () {
                        var e = t(this);
                        if (!e.hasClass('pdff-thumb-loaded')) {
                          o++;
                          var a = t(this).attr('id').replace('pdff-thumb', '');
                          return (
                            n.getPage(a, i, !0),
                            e.addClass('pdff-thumb-loaded'),
                            !1
                          );
                        }
                      }),
                    0 == o && clearTimeout(e)),
                o > 0 && i(),
                n.activeThumb != n.targetObject._activePage &&
                  null != n.targetObject.thumbContainer &&
                  n.targetObject.thumbContainer.hasClass(
                    'pdff-sidemenu-visible'
                  ))
              ) {
                var a = n.thumblist.container,
                  r = a.scrollTop,
                  s = a.getBoundingClientRect().height,
                  l = n.targetObject.thumbContainer.find(
                    '#pdff-thumb' + n.targetObject._activePage
                  );
                l.length > 0
                  ? (n.targetObject.thumbContainer
                      .find('.pdff-selected')
                      .removeClass('pdff-selected'),
                    l.addClass('pdff-selected'),
                    r + s < (l = l[0]).offsetTop + l.scrollHeight
                      ? l.scrollIntoView(!1)
                      : r > l.offsetTop && l.scrollIntoView(),
                    (n.activeThumb = n.targetObject._activePage))
                  : (t(a).scrollTop(124 * n.targetObject._activePage), i());
              }
            };
          (n.thumblist = n.targetObject.thumblist = new ThumbList({
            h: 500,
            addFn: function (e) {},
            scrollFn: i,
            itemHeight: 128,
            totalRows: n.pageCount,
            generatorFn: function (e) {
              var t = document.createElement('div'),
                n = e + 1;
              t.id = 'pdff-thumb' + n;
              var i = document.createElement('div');
              return (i.innerHTML = n), t.appendChild(i), t;
            },
          })),
            (n.thumblist.lastScrolled = Date.now()),
            (n.thumblist.review = i),
            i();
          var a = t('<div>').addClass(
            'pdff-thumb-container pdff-sidemenu-visible pdff-sidemenu'
          );
          a.append(t(n.thumblist.container).addClass('pdff-thumb-wrapper')),
            (n.targetObject.thumbContainer = a),
            n.targetObject.container.append(a);
          var r = t(f.div, {
            class: 'pdff-ui-btn pdff-ui-sidemenu-close ti-close',
          });
          a.append(r),
            n.thumblist.reset(t(n.thumblist.container).height()),
            n.targetObject.container.on(
              'click',
              '.pdff-thumb-container .pdff-vrow',
              function (e) {
                e.stopPropagation();
                var i = t(this).attr('id').replace('pdff-thumb', '');
                n.targetObject.gotoPage(parseInt(i, 10));
              }
            );
        }),
        (i.prototype.initOutline = function () {
          var e = this,
            n = t('<div>').addClass('pdff-outline-container pdff-sidemenu'),
            i = t('<div>').addClass('pdff-outline-wrapper'),
            o = t(f.div, {
              class: 'pdff-ui-btn pdff-ui-sidemenu-close ti-close',
            });
          function a(t) {
            if (
              (1 == e.options.overwritePDFOutline && (t = []),
              (t = t || []),
              e.outline)
            )
              for (var n = 0; n < e.outline.length; n++)
                (e.outline[n].custom = !0), t && t.push(e.outline[n]);
            e.outlineViewer.render({ outline: t });
          }
          n.append(o).append(i),
            e.targetObject.container.append(n),
            (e.targetObject.outlineContainer = n),
            (e.outlineViewer = new BookMarkViewer({
              container: i[0],
              linkService: e.linkService,
              outlineItemClass: 'pdff-outline-item',
              outlineToggleClass: 'pdff-outline-toggle',
              outlineToggleHiddenClass: 'pdff-outlines-hidden',
            })),
            e.pdfDocument
              ? e.pdfDocument.getOutline().then(function (e) {
                  a(e);
                })
              : a([]),
            1 == e.options.autoEnableOutline &&
              e.targetObject.ui.outline.trigger('click'),
            1 == e.options.autoEnableThumbnail &&
              e.targetObject.ui.thumbnail.trigger('click');
        }),
        (i.prototype.checkViewportSize = function (e, t, n) {
          var i = this,
            o = i.targetObject,
            a = e * n,
            s = t * n,
            l = i.cacheIndex;
          if (i.contentSourceType == u.PDF) {
            if (
              ((i.cacheIndex = Math.ceil(Math.max(a, s))),
              (i.cacheIndex = Math.floor(Math.max(a, s))),
              (i.cacheIndex = P(
                i.cacheIndex * r.pixelRatio,
                i.minDimension,
                i.maxDimension
              )),
              null == i.cache[i.cacheIndex] && (i.cache[i.cacheIndex] = []),
              l !== i.cacheIndex)
            ) {
              for (var c = 0; c < o.children.length; c++) o.children[c];
              o.refresh();
            }
            (i.imageViewport = i.refPage.getViewport(
              s / i.normalViewport.height
            )),
              (i.viewport =
                'css' == o.mode
                  ? i.imageViewport
                  : i.refPage.getViewport(
                      i.bookSize.height / i.normalViewport.height
                    )),
              S(i.cacheIndex);
            var d = o.container.find('.linkAnnotation'),
              p = i.viewport.clone({ dontFlip: !0 });
            d.css({ transform: 'matrix(' + p.transform.join(',') + ')' });
          } else null == i.cache[i.cacheIndex] && (i.cache[i.cacheIndex] = []);
        }),
        (i.prototype.getCache = function (e, t) {
          return 1 == t
            ? null == this.cache[this.thumbsize]
              ? null
              : this.cache[this.thumbsize][e]
            : null == this.cache[this.cacheIndex]
            ? null
            : this.cache[this.cacheIndex][e];
        }),
        (i.prototype.setCache = function (e, t, n, i) {
          if (1 == n)
            null != this.cache[this.thumbsize] &&
              (this.cache[this.thumbsize][e] = t);
          else {
            var o = null == i ? this.cacheIndex : i;
            null != this.cache[o] && (this.cache[o][e] = t);
          }
        }),
        (i.prototype.setTarget = function (e) {
          var t = this;
          if (null == e) return this.targetObject;
          (this.targetObject = e),
            (e.contentProvider = this),
            e.container.removeClass('pdff-loading pdff-init'),
            null != t.linkService &&
              (t.linkService.setViewer(e), t.initOutline()),
            (e.processPage = function (e, n) {
              e > 0 && e <= t.pageCount
                ? t.getPage(e, n)
                : t.setPage(e, r.textureLoadFallback, n);
            }),
            (e.requestPage = function () {
              t.review('Request');
            }),
            null != e.resize && e.resize();
        }),
        (i.prototype.review = function (e) {
          var t = this;
          (e = e || 'timer review'),
            clearTimeout(t.textureLoadTimeOut),
            (t.textureLoadTimeOut = setTimeout(function () {
              t.textureLoadTimeOut = setTimeout(
                t.reviewPages,
                t.waitPeriod / 2,
                t,
                e
              );
            }, t.waitPeriod));
        }),
        (i.prototype.reviewPages = function (e, n) {
          var i = (e = e || this).targetObject;
          if (null != i) {
            var o = M(i);
            null != n && S(n);
            var a,
              r = !1;
            for (a = 0; a < e.targetObject.children.length; a++)
              if (1 == i.children[a].isFlipping) {
                r = !0;
                break;
              }
            if (0 == r) {
              var s = i.children.length > 3 ? 3 : i.children.length,
                l = o ? i._activePage : L(i._activePage);
              for (
                e.baseNumber = l, e.zoomScale > 1 && (s = 1), a = 0;
                a < s;
                a++
              ) {
                var c = Math.floor(a / 2),
                  d =
                    a % 2 == 0
                      ? -c * (o ? 1 : 2)
                      : (0 == c ? 1 : c) * (o ? 1 : 2),
                  u = l + d,
                  p = l + d + 1,
                  h = i.getPageByNumber(u),
                  f = i.getPageByNumber(p),
                  g = u + '|' + e.cacheIndex,
                  m = p + '|' + e.cacheIndex,
                  v = 0;
                if (
                  (null != h &&
                    h.frontPageStamp != g &&
                    1 == h.visible &&
                    ((h.frontTextureLoaded = !1),
                    i.processPage(u, function () {
                      e.review('Batch Call');
                    }),
                    (h.frontPageStamp = g),
                    v++),
                  null == f ||
                    f.backPageStamp == m ||
                    1 != f.visible ||
                    o ||
                    ((f.backTextureLoaded = !1),
                    i.processPage(p, function () {
                      e.review('Batch Call');
                    }),
                    (f.backPageStamp = m),
                    v++),
                  0 == d &&
                    e.annotedPage !== l &&
                    (e.getAnnotations(u),
                    o || e.getAnnotations(p),
                    (e.annotedPage = l)),
                  v > 0)
                )
                  break;
              }
              0 == v && 'css' !== i.mode && e.setLoading(l);
            } else if (
              (e.review('Revisit request'),
              null != e.annotedPage && 'css' !== i.mode)
            ) {
              var b = L(i._activePage);
              t(i.getContentLayer(b)).html(''),
                t(i.getContentLayer(b + 1)).html(''),
                (e.annotedPage = null);
            }
          }
        }),
        (i.prototype.getPage = function (t, n, i) {
          var o,
            a,
            s,
            l,
            c = this,
            d = (t = parseInt(t, 10)),
            p = c.contentSource;
          t <= 0 && t >= c.pageCount
            ? c.setPage(t, r.textureLoadFallback, n, i)
            : c.contentSourceType == u.PDF
            ? null != c.getCache(t, i)
              ? (c.setPage(t, c.getCache(t, i), n, i),
                S('Page ' + t + ' loaded from cache'))
              : (!0 !== i && c.setLoading(t, !0),
                c.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL &&
                  t > 2 &&
                  (d = Math.ceil((t - 1) / 2) + 1),
                p.getPage(d, i).then(function (o) {
                  !(function (t, n, i, o) {
                    var a = c.options.forceFit,
                      r =
                        c.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL &&
                        n > 1 &&
                        n < c.pageCount,
                      s = r && a ? 2 : 1,
                      l = a ? t.getViewport(1) : c.normalViewport,
                      d = c.cacheIndex / Math.max(l.width / s, l.height);
                    1 == c.webgl &&
                      (d =
                        k(c.cacheIndex) /
                        (c.pageRatio > 1 ? l.width / s : l.height));
                    var u = document.createElement('canvas'),
                      p = performance.now(),
                      h = c.cacheIndex,
                      f = u.getContext('2d');
                    1 == o && (d = c.thumbsize / c.normalViewport.height),
                      (u.height = Math.round(l.height * d)),
                      (u.width = Math.round((l.width / s) * d)),
                      'css' == c.targetObject.mode &&
                        Math.abs(c.targetObject.zoomHeight - u.height) < 2 &&
                        ((u.height = c.targetObject.zoomHeight + 0),
                        (u.width = c.targetObject.zoomWidth + 0)),
                      (l = t.getViewport(d)),
                      S('rendering ' + n + ' at ' + u.width + 'x' + u.height),
                      r &&
                        (D(c.targetObject)
                          ? n % 2 == 0 && (l.transform[4] = -u.width)
                          : n % 2 == 1 && (l.transform[4] = -u.width));
                    var g = { canvasContext: f, viewport: l };
                    (t.cleanupAfterRender = !0),
                      t.render(g).promise.then(function () {
                        S(performance.now() - p),
                          (p = performance.now()),
                          1 == o ||
                          (1 == c.options.canvasToBlob && !0 !== c.webgl)
                            ? u.toBlob(
                                function (t) {
                                  var a = e.createObjectURL(t, 'image/jpeg');
                                  S(performance.now() - p),
                                    c.setCache(n, a, o, h),
                                    c.setPage(n, a, i, o);
                                },
                                'image/jpeg',
                                c.pdfRenderQuality
                              )
                            : (S('Setting Page ' + n), c.setPage(n, u, i, o)),
                          (g = null);
                      });
                  })(o, t, n, i);
                }))
            : (c.contentSourceType != u.IMAGE &&
                c.contentSourceType != u.HTML) ||
              (null != c.getCache(t, i)
                ? (c.setPage(t, c.getCache(t, i), n, i),
                  S('Page ' + t + ' loaded from cache'))
                : (!0 !== i && c.setLoading(t, !0),
                  c.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL &&
                    t > 2 &&
                    (d = Math.ceil((t - 1) / 2) + 1),
                  (o = p[d - 1]),
                  (a = function (e) {
                    c.setCache(t, e, i, c.cacheIndex),
                      c.setPage(t, e, n, i),
                      null != n && n();
                  }),
                  (s = c.isCrossOrigin),
                  ((l = new Image()).crossOrigin = 'Anonymous'),
                  (l.onload = function () {
                    if (1 == s) {
                      var t = document.createElement('canvas'),
                        n = t.getContext('2d');
                      (t.width = l.width),
                        (t.height = l.height),
                        n.drawImage(l, 0, 0),
                        1 == r.canvasToBlob
                          ? t.toBlob(
                              function (t) {
                                var n = e.createObjectURL(t, 'image/jpeg');
                                null != a && a(n);
                              },
                              'image/jpeg',
                              0.85
                            )
                          : null != a && a(t);
                    } else null != a && a(o);
                    (l.onload = null), (l = null);
                  }),
                  (l.src = o),
                  (l.complete || void 0 === l.complete) &&
                    ((l.src =
                      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='),
                    (l.src = o))));
        }),
        (i.prototype.getTargetPage = function (e) {}),
        (i.prototype.setLoading = function (e, n) {
          if (null != this.targetObject)
            if (1 == this.webgl) {
              var i = this.targetObject.container;
              1 == n
                ? !0 !== i.isLoading &&
                  (i.addClass('pdff-loading'),
                  (i.isLoading = !0),
                  S('Loading icon at ' + e + ' as ' + n))
                : null != i.isLoading &&
                  (i.removeClass('pdff-loading'),
                  (i.isLoading = null),
                  S('Loading icon at ' + e + ' as ' + n));
            } else {
              var o = t(this.targetObject.getContentLayer(e));
              null != o &&
                (1 == n
                  ? o.addClass('pdff-page-loading')
                  : o.removeClass('pdff-page-loading'),
                S('Loading icon at ' + e + ' as ' + n));
            }
        }),
        (i.prototype.getAnnotations = function (n) {
          var i = this;
          if (0 != i.options.enableAnnotation) {
            var o = i.targetObject;
            n = parseInt(n, 10);
            var a = i.contentSource,
              r = t(o.getContentLayer(n));
            if ((r.empty(), n > 0 && n <= i.pageCount)) {
              if (i.contentSourceType == u.PDF) {
                L(n);
                var s = n;
                i.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL &&
                  n > 2 &&
                  (s = Math.ceil((n - 1) / 2) + 1),
                  a.getPage(s).then(function (e) {
                    null != r &&
                      r.length > 0 &&
                      i.setupAnnotations(e, i.viewport, r, n);
                  });
              }
              if (null != i.links && null != i.links[n])
                for (var l = i.links[n], c = 0; c < l.length; c++) {
                  var d,
                    p = l[c];
                  p.dest && p.dest.indexOf && 0 == p.dest.indexOf('[html]')
                    ? (((d = document.createElement(
                        'div'
                      )).innerHTML = p.dest.substr(6)),
                      (d.className = 'customHtmlAnnotation'))
                    : ((d = document.createElement('a')).setAttribute(
                        'dest',
                        p.dest
                      ),
                      (d.className = 'customLinkAnnotation'),
                      (d.href = '#' + p.dest),
                      (d.onclick = function () {
                        var e = this.getAttribute('dest');
                        return e && i.linkService.customNavigateTo(e), !1;
                      })),
                    (d.style.left = p.x + '%'),
                    (d.style.top = p.y + '%'),
                    (d.style.width = p.w + '%'),
                    (d.style.height = p.h + '%'),
                    r[0].appendChild(d);
                }
              if (null != i.html && null != i.html[n]) {
                var h = i.html[n];
                r.append(t("<div class='customHTMLAnnotation'>").html(h));
              }
            }
          }
        }),
        (i.prototype.setPage = function (e, t, n, i) {
          var o = this,
            a = o.targetObject,
            s = D(a),
            l = M(a);
          if (1 == i)
            o.targetObject.container
              .find('#pdff-thumb' + e)
              .css({ backgroundImage: y(t) });
          else {
            t == r.textureLoadFallback && S('Fallback on ' + e);
            var c = a.getPageByNumber(e);
            null != c
              ? (e % 2 != 0 && !s) || (e % 2 != 1 && s && !l) || (l && !s)
                ? (S(e + 'rendered to back of ' + c.color),
                  c.backImage(t, function (t, i) {
                    (c.backTextureLoaded = !0),
                      o.setLoading(e),
                      o.requiresImageTextureScaling &&
                        i &&
                        1 != e &&
                        e != o.pageCount &&
                        ((i.repeat.x = 0.5), (i.offset.x = 0.5)),
                      null != n && n();
                  }))
                : (S(e + 'rendered to front of ' + c.color),
                  c.frontImage(t, function (t, i) {
                    (c.frontTextureLoaded = !0),
                      o.setLoading(e),
                      o.requiresImageTextureScaling &&
                        i &&
                        1 != e &&
                        e != o.pageCount &&
                        (i.repeat.x = 0.5),
                      null != n && n();
                  }))
              : S('Invalid set request on Page ' + e);
          }
        }),
        (i.prototype.setupAnnotations = function (n, i, o, a) {
          if (null != o && 0 != t(o).length) {
            var r = this;
            return n.getAnnotations().then(function (s) {
              if (
                ((i = i.clone({ dontFlip: !0 })),
                r.options.pageSize,
                e.PAGE_SIZE.DOUBLEINTERNAL,
                null != o)
              ) {
                0 == (o = t(o)).find('.annotationDiv').length &&
                  o.append(t("<div class='annotationDiv'>"));
                var l = o.find('.annotationDiv');
                l.empty(),
                  r.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL &&
                  a > 2 &&
                  a % 2 == 1
                    ? l.css({ left: '-100%' })
                    : 1 == a && l.css({ left: '' }),
                  PDFJS.AnnotationLayer.render({
                    annotations: s,
                    div: l[0],
                    page: n,
                    viewport: i,
                    linkService: r.linkService,
                  }),
                  r.options.annotationClass &&
                    '' !== r.options.annotationClass &&
                    l.find(' > section').addClass(r.options.annotationClass);
              }
            });
          }
        }),
        i
      );
    })(),
    W = (function () {
      function n(e) {
        (this.angles = e.angles || [0, 0, 0, 0, 0, 0]),
          (this.stiffness = e.angles || 0.1),
          (this.segments = e.segments || 1),
          (this.canvasMode =
            e.contentSourceType !== u.IMAGE && 0 == e.canvasToBlob),
          this.initDOM();
      }
      function i(e) {
        var n = (e.contentLayer = t(f.div, { class: 'pdff-page-content' }));
        e.append(n);
      }
      return (
        (n.prototype = {
          initDOM: function () {
            var e = (this.element = t(f.div, { class: 'ppdff-flipbook-page' })),
              n = (this.wrapper = t(f.div, { class: 'pdff-page-wrapper' })),
              o = (this.front = t(f.div, { class: 'pdff-page-front' })),
              a = (this.back = t(f.div, { class: 'pdff-page-back' })),
              r = (this.foldInnerShadow = t(f.div, {
                class: 'pdff-page-fold-inner-shadow',
              })),
              s = (this.foldOuterShadow = t(f.div, {
                class: 'pdff-page-fold-outer-shadow',
              }));
            (this.frontIMG = new Image()),
              (this.backIMG = new Image()),
              i(o, this.segments),
              i(a, this.segments),
              e.append(n).append(s),
              n.append(o).append(a).append(r);
          },
          updatePoint: function (t) {
            if (null != t) {
              var n =
                  null != this.parent.dragPage
                    ? this.parent.dragPage
                    : null != t.page
                    ? t.page
                    : this,
                i = n.element.width(),
                o = n.element.height(),
                a = null != this.parent.corner ? this.parent.corner : t.corner,
                r = e.CORNERS,
                s = n.side == p.right,
                l = a == r.BL || a == r.BR;
              (t.rx = 1 == s ? 2 * i - t.x : t.x),
                (t.ry = 1 == l ? o - t.y : t.y);
              var c = Math.atan2(t.ry, t.rx);
              c = Math.PI / 2 - P(c, 0, m(90));
              var d = s ? t.x / 2 : i - t.x / 2,
                u = t.ry / 2,
                h = Math.max(0, Math.sin(c - Math.atan2(u, d)) * x(d, u)),
                f = 0.5 * x(t.rx, t.ry),
                g = Math.round(i - h * Math.sin(c)),
                y = Math.round(h * Math.cos(c)),
                C = v(c),
                E = l ? (s ? 90 - C + 180 : 180 + C) : s ? C : 90 - C,
                S = l ? (s ? 90 - C + 180 : C) : s ? C + 180 : E,
                k = l ? (s ? 90 - C : C + 90) : s ? E - 90 : E + 180,
                T = s ? i - g : g,
                L = l ? o + y : -y,
                O = s ? -g : g - i,
                I = l ? -o - y : y,
                M = P((0.5 * t.distance) / i, 0, 0.5),
                D = P((0.5 * (2 * i - t.rx)) / i, 0.05, 0.3);
              n.element.addClass('pdff-folding');
              var F = s ? n.back : n.front,
                z = s ? n.front : n.back,
                N = n.foldOuterShadow,
                A = n.foldInnerShadow;
              n.wrapper.css({ transform: b(T, L) + w(E) }),
                F.css({ transform: w(-E) + b(-T, -L) }),
                z.css({
                  transform: w(S) + b(O, I),
                  boxShadow: 'rgba(0, 0, 0, ' + M + ') 0px 0px 20px',
                }),
                A.css({
                  transform: w(S) + b(O, I),
                  opacity: D / 2,
                  backgroundImage:
                    R.css +
                    'linear-gradient( ' +
                    k +
                    'deg, rgba(0, 0, 0, 0.25) , rgb(0, 0, 0) ' +
                    0.7 * f +
                    'px, rgb(255, 255, 255) ' +
                    f +
                    'px)',
                }),
                N.css({
                  opacity: D / 2,
                  left: s ? 'auto' : 0,
                  right: s ? 0 : 'auto',
                  backgroundImage:
                    R.css +
                    'linear-gradient( ' +
                    (180 - k) +
                    'deg, rgba(0, 0, 0,0) ' +
                    f / 3 +
                    'px, rgb(0, 0, 0) ' +
                    f +
                    'px)',
                });
            }
          },
          updateAngle: function (e, t) {
            var n = 5 * this.element.width();
            this.wrapper.css({
              perspective: n,
              perspectiveOrigin: 1 == t ? '0% 50%' : '100% 50%',
            }),
              this.front.css({
                display:
                  1 == t
                    ? e <= -90
                      ? 'block'
                      : 'none'
                    : e < 90
                    ? 'block'
                    : 'none',
                transform:
                  ('MfS' !== R.dom ? '' : 'perspective(' + n + 'px) ') +
                  (1 == t ? 'translateX(-100%) ' : '') +
                  'rotateY(' +
                  ((1 == t ? 180 : 0) + e) +
                  'deg)',
              }),
              this.back.css({
                display:
                  1 == t
                    ? e > -90
                      ? 'block'
                      : 'none'
                    : e >= 90
                    ? 'block'
                    : 'none',
                transform:
                  ('MSd' !== R.dom ? '' : 'perspective(' + n + 'px) ') +
                  (0 == t ? 'translateX(100%) ' : '') +
                  'rotateY(' +
                  ((0 == t ? -180 : 0) + e) +
                  'deg)',
              });
          },
          tween: function (t) {
            var n = this;
            if (null != n && null != n.parent) {
              var i,
                o = M(n.parent),
                a = n.side == p.right,
                r = n.parent.direction == e.DIRECTION.RTL,
                s =
                  n.parent.corner == e.CORNERS.BL ||
                  n.parent.corner == e.CORNERS.BR,
                l = 1 == n.magnetic,
                c = s ? n.parent.height : 0,
                d = 0,
                u = (n.end =
                  n && 1 == n.animateToReset
                    ? { x: a ? n.parent.fullWidth : 0, y: c }
                    : { x: a ? 0 : n.parent.fullWidth, y: c });
              n.ease = n.isHard
                ? TWEEN.Easing.Quadratic.InOut
                : TWEEN.Easing.Linear.None;
              var h = n.parent.duration;
              1 == n.isHard
                ? (null != t && (d = E(t.distance, t.fullWidth)),
                  (i = n.init = { angle: d * (a ? -1 : 1) }),
                  (u = n.end =
                    n && 1 == n.animateToReset
                      ? { angle: a ? 0 : -0 }
                      : { angle: a ? -180 : 180 }))
                : null == t
                ? ((i = n.init =
                    n && 1 == n.animateToReset
                      ? { x: a ? 0 : n.parent.fullWidth, y: 0 }
                      : { x: a ? n.parent.fullWidth : 0, y: 0 }),
                  (n.first = {
                    x: ((a ? 3 : 1) * n.parent.fullWidth) / 4,
                    y: 0,
                  }),
                  (n.mid = { x: ((a ? 1 : 3) * n.parent.fullWidth) / 4, y: 0 }))
                : ((i = n.init = { x: t.x, y: t.y, opacity: 1 }),
                  (n.first = {
                    x: (3 * t.x) / 4,
                    y: (3 * t.y) / 4,
                    opacity: 1,
                  }),
                  (n.mid = { x: t.x / 4, y: t.y / 4, opacity: 1 }),
                  (h =
                    (n.parent.duration * C(i.x, i.y, u.x, u.y)) /
                    n.parent.fullWidth),
                  (h = P(h, n.parent.duration / 3, n.parent.duration))),
                (i.index = 0),
                (u.index = 1),
                (n.isFlipping = !0);
              var f = function (e) {
                1 == n.isHard
                  ? (n.updateAngle(e.angle, a), (n.angle = e.angle))
                  : (n.updatePoint({ x: e.x, y: e.y }),
                    (n.x = e.x),
                    (n.y = e.y)),
                  o &&
                    !l &&
                    (n.element[0].style.opacity =
                      (a && !r) || (!a && r)
                        ? e.index > 0.5
                          ? 2 * (1 - e.index)
                          : 1
                        : e.index < 0.5
                        ? 2 * e.index
                        : 1);
              };
              o && ((!a && !r) || (a && r)) && (n.element[0].style.opacity = 0),
                (n.completeTween =
                  n.completeTween ||
                  function (t) {
                    (n.isFlipping = !1),
                      1 == n.isHard
                        ? (n.updateAngle(n.end.angle),
                          n.back.css({ display: 'block' }),
                          n.front.css({ display: 'block' }))
                        : n.updatePoint({ x: n.end.x, y: n.end.y }),
                      (n.element[0].style.opacity = 1),
                      !0 !== n.animateToReset
                        ? (n.side = n.side == p.right ? p.left : p.right)
                        : (n.animateToReset = null),
                      (n.currentTween = null),
                      (n.pendingPoint = null),
                      (n.magnetic = !1),
                      (n.parent.dragPage = null),
                      (n.parent.corner = e.CORNERS.NONE),
                      1 != t && n.parent.refresh();
                  }),
                1 == n.isHard
                  ? (n.currentTween = new TWEEN.Tween(i)
                      .delay(0)
                      .to(u, n.parent.duration)
                      .onUpdate(function () {
                        f(this);
                      })
                      .easing(n.ease)
                      .onComplete(n.completeTween)
                      .start())
                  : null == t
                  ? (n.currentTween = new TWEEN.Tween(i)
                      .delay(0)
                      .to(u, n.parent.duration)
                      .onUpdate(function () {
                        f(this);
                      })
                      .easing(TWEEN.Easing.Sinusoidal.Out)
                      .onComplete(n.completeTween)
                      .start())
                  : ((n.currentTween = new TWEEN.Tween(i)
                      .delay(0)
                      .to(u, h)
                      .onUpdate(function () {
                        f(this);
                      })
                      .easing(TWEEN.Easing.Sinusoidal.Out)
                      .onComplete(n.completeTween)),
                    n.currentTween.start());
            }
          },
          frontImage: function (e, n) {
            var i = this;
            function o() {
              i.front.css({ backgroundImage: y(e) }), null != n && n();
            }
            1 == i.canvasMode
              ? (i.front.find('>canvas').remove(),
                e !== r.textureLoadFallback && i.front.append(t(e)),
                null != n && n())
              : e == r.textureLoadFallback
              ? o()
              : ((i.frontIMG.onload = o), (i.frontIMG.src = e));
          },
          backImage: function (e, n) {
            var i = this;
            function o() {
              i.back.css({ backgroundImage: y(e) }), null != n && n();
            }
            1 == i.canvasMode
              ? (i.back.find('>canvas').remove(),
                e !== r.textureLoadFallback && i.back.append(t(e)),
                null != n && n())
              : e == r.textureLoadFallback
              ? o()
              : ((i.backIMG.onload = o), (i.backIMG.src = e));
          },
          updateCSS: function (e) {
            this.element.css(e);
          },
          resetCSS: function () {
            this.wrapper.css({ transform: '' }),
              this.front.css({ transform: '', boxShadow: '' }),
              this.back.css({ transform: '', boxShadow: '' });
          },
          clearTween: function (e) {
            this.currentTween.stop(),
              this.completeTween(1 == e),
              this.resetCSS();
          },
        }),
        n
      );
    })(),
    G = (function (n) {
      function i(e) {
        for (var t = !1, n = 0; n < e.pages.length; n++)
          if (1 == e.pages[n].isFlipping) {
            t = !0;
            break;
          }
        return t;
      }
      function o(n, o) {
        var a = this;
        function r(e) {
          a.dragPage != e.page &&
            1 == e.page.visible &&
            (a.dragPage.clearTween(!0),
            (a.dragPage = e.page),
            (a.corner = e.corner),
            (a.dragPage.pendingPoint = e));
        }
        (a.type = 'BookCSS'),
          (a.images = n.images || []),
          (a.pageCount = n.pageCount || 2),
          (a.foldSense = 50),
          (a.stackCount = 4),
          (a.mode = 'css'),
          (a.pages = []),
          (a.duration = n.duration),
          (a.container = t(o)),
          (a.options = n),
          (a.drag = p.none),
          (a.pageCount =
            1 == a.pageCount ? a.pageCount : 2 * Math.ceil(a.pageCount / 2)),
          (a.pageMode =
            n.pageMode ||
            (F || a.pageCount <= 2 ? e.PAGE_MODE.SINGLE : e.PAGE_MODE.DOUBLE)),
          (a.singlePageMode =
            n.singlePageMode ||
            (F ? e.SINGLE_PAGE_MODE.BOOKLET : e.SINGLE_PAGE_MODE.ZOOM)),
          (a.swipe_threshold = F ? 15 : 50),
          (a.direction = n.direction || e.DIRECTION.LTR),
          (a.startPage = 1),
          (a.endPage = a.pageCount),
          (a._activePage = n.openPage || a.startPage),
          (a.hardConfig = n.hard),
          (s =
            'WebKitCSSMatrix' in window ||
            (document.body && 'MozPerspective' in document.body.style)),
          (a.animateF = function () {
            TWEEN.getAll().length > 0
              ? TWEEN.update()
              : clearInterval(a.animate);
          }),
          a.init(n),
          (a.skipDrag = !1);
        var l = function (t) {
            var n = a.eventToPoint(t);
            if (
              null != t.touches &&
              2 == t.touches.length &&
              null != a.startTouches
            ) {
              a.zoomDirty = !0;
              var o = d.getVectorAvg(d.getTouches(t, a.container.offset())),
                r = d.calculateScale(a.startTouches, d.getTouches(t));
              a.lastScale,
                a.contentProvider.zoomScale,
                o.x,
                o.y,
                a.stage.css({
                  transform:
                    'translate3d(' +
                    a.left +
                    'px,' +
                    a.top +
                    'px,0) scale3d(' +
                    r +
                    ',' +
                    r +
                    ',1)',
                }),
                (a.lastScale = r),
                (a.lastZoomCenter = o),
                t.preventDefault();
            }
            if (
              !(
                (null != t.touches && t.touches.length > 1) ||
                null == a.startPoint ||
                null != a.startTouches
              )
            ) {
              var s = a.dragPage || n.page;
              if (1 !== a.contentProvider.zoomScale)
                (null == t.touches && 1 != a.isPanning) ||
                  (a.pan(n), t.preventDefault());
              else if (!0 !== a.skipDrag && (n.distance, !i(a))) {
                if (null != a.dragPage || 1 == n.isInside) {
                  null != a.dragPage
                    ? S('set mouse down move')
                    : ((n.y = P(n.y, 1, a.height - 1)),
                      (n.x = P(n.x, 1, n.fullWidth - 1)));
                  var l = a.corner || n.corner;
                  if (s.isHard) {
                    var c = l == e.CORNERS.BR || l == e.CORNERS.TR,
                      u = E(n.distance, n.fullWidth);
                    s.updateAngle(u * (c ? -1 : 1), c);
                  } else s.updatePoint(n, a);
                  (s.magnetic = !0),
                    (s.magneticCorner = n.corner),
                    t.preventDefault();
                }
                if (
                  (null == a.dragPage &&
                    null != s &&
                    0 == n.isInside &&
                    1 == s.magnetic &&
                    ((s.pendingPoint = n),
                    (s.animateToReset = !0),
                    (a.corner = s.magneticCorner),
                    a.animatePage(s),
                    (s.pendingPoint = null),
                    (s.magnetic = !1),
                    (s.magneticCorner = null)),
                  1 == a.isPanning &&
                    null == a.dragPage &&
                    1 == a.contentProvider.zoomScale)
                ) {
                  var h = n.x - a.lastPos;
                  performance.now(),
                    a.lastTime,
                    Math.abs(h) > a.swipe_threshold &&
                      (h < 0 ? a.next() : a.prev(),
                      (a.drag = p.none),
                      (a.isPanning = !1),
                      t.preventDefault()),
                    (a.lastPos = n.x),
                    (a.lastTime = performance.now());
                }
              }
            }
          },
          c = function (t) {
            if (
              (null != t.touches &&
                0 == t.touches.length &&
                (a.contentProvider.zoomScale,
                1 == a.zoomDirty &&
                  ((a.previewObject.contentProvider.zoomScale = d.limitAt(
                    a.previewObject.contentProvider.zoomScale * a.lastScale,
                    1,
                    a.previewObject.contentProvider.maxZoom
                  )),
                  (a.previewObject.zoomValue =
                    1 * a.previewObject.contentProvider.zoomScale),
                  a.previewObject.resize(),
                  (a.zoomDirty = !1)),
                a.wrapper.css({ transform: '' }),
                (a.lastScale = null),
                (a.startTouches = null)),
              (a.isPanning = !1),
              !(null != t.touches && t.touches.length > 1) && !0 !== a.skipDrag)
            ) {
              var n = a.eventToPoint(t);
              a.dragPage &&
                (t.preventDefault(),
                (a.dragPage.pendingPoint = n),
                n.x == a.startPoint.x &&
                n.y == a.startPoint.y &&
                1 == n.isInside
                  ? a.corner == e.CORNERS.BR || a.corner == e.CORNERS.TR
                    ? (r(n), !0 !== a.dragPage.isFlipping && a.next())
                    : (a.corner != e.CORNERS.BL && a.corner != e.CORNERS.TL) ||
                      (r(n), !0 !== a.dragPage.isFlipping && a.prev())
                  : !0 !== a.dragPage.isFlipping &&
                    (n.distance > n.fullWidth / 2
                      ? n.x > n.fullWidth / 2
                        ? a.prev()
                        : a.next()
                      : ((a.dragPage.animateToReset = !0),
                        a.animatePage(a.dragPage))),
                a.dragPage &&
                  ((a.dragPage.pendingPoint = null),
                  (a.dragPage.magnetic = !1))),
                (a.drag = p.none);
            }
          },
          u = function (t) {
            var n = a.eventToPoint(t),
              i = t.srcElement || t.originalTarget;
            (a.dragPage && a.dragPage.magnetic) ||
              (a.wrapper[0].contains(t.target) &&
                1 == a.contentProvider.zoomScale &&
                n.x == a.startPoint.x &&
                n.y == a.startPoint.y &&
                n.isInsidePage &&
                a.startPoint.page == n.page &&
                !n.page.isFlipping &&
                'A' !== i.nodeName &&
                (0 == a.startPoint.page.side
                  ? ((a.corner = e.CORNERS.TL),
                    a.prev(),
                    (a.startPoint.page = null))
                  : ((a.corner = e.CORNERS.TR),
                    a.next(),
                    (a.startPoint.page = null)),
                (a.isPanning = !1)));
          },
          h = function (t) {
            if (
              (null != t.touches &&
                2 == t.touches.length &&
                null == a.startTouches &&
                ((a.startTouches = d.getTouches(t)), (a.lastScale = 1)),
              !(
                (null != t.touches && t.touches.length > 1) ||
                (null == t.touches && 0 !== t.button)
              ))
            ) {
              var n,
                o = a.eventToPoint(t);
              (a.startPoint = o),
                (a.left = a.left || 0),
                (a.top = a.top || 0),
                (a.isPanning = !0),
                (a.lastPos = o.x),
                (a.lastTime = performance.now()),
                !0 !== a.skipDrag &&
                  (1 != o.isInside ||
                    i(a) ||
                    ((a.startPoint = o),
                    (a.drag = o.drag),
                    (a.dragPage = o.page),
                    (a.corner = o.corner),
                    S(a.corner),
                    (n = a.dragPage).parent.container
                      .find('.pdff-folding')
                      .removeClass('pdff-folding'),
                    n.element.addClass('pdff-folding'),
                    o.page.isHard || o.page.updatePoint(o, a),
                    '0' == o.page.name
                      ? a.shadow.css({
                          width: '50%',
                          left: a.direction == e.DIRECTION.RTL ? 0 : '50%',
                          transitionDelay: '',
                        })
                      : o.page.name == Math.ceil(a.pageCount / 2) - 1 &&
                        a.shadow.css({
                          width: '50%',
                          left: a.direction == e.DIRECTION.RTL ? '50%' : 0,
                          transitionDelay: '',
                        })));
            }
          },
          f = function (e) {
            var t = 0;
            null != e.wheelDelta
              ? (t = e.wheelDelta / 120)
              : null != e.detail && (t = -e.detail / 3);
            var n = a.contentProvider.zoomScale,
              i = a.contentProvider.maxZoom;
            if (t && ((t > 0 && n < i) || (t < 0 && n > 1))) {
              e.stopPropagation(), e.preventDefault();
              var o = a.eventToPoint(e),
                r = a.eventToPoint(e),
                s = a.container.width() / 2,
                l = a.container.height() / 2 - 23;
              a.previewObject.zoom(t);
              var c = a.contentProvider.zoomScale;
              if (n !== c) {
                var d = c / n;
                1 == c
                  ? ((a.left = 0), (a.top = 0))
                  : ((a.left *= d), (a.top *= d));
                var u = (o.raw.x - s) * d,
                  p = (o.raw.y - l) * d;
                (r.raw.x = s + u),
                  (r.raw.y = l + p),
                  (a.startPoint = r),
                  a.pan(o);
                var h = a.dragPage || o.page;
                null == a.dragPage &&
                  null != h &&
                  1 == o.isInside &&
                  1 == h.magnetic &&
                  ((h.pendingPoint = o),
                  (h.animateToReset = !0),
                  (a.corner = h.magneticCorner),
                  a.animatePage(h),
                  (h.pendingPoint = null),
                  (h.magnetic = !1),
                  (h.magneticCorner = null));
              }
            }
          },
          g = a.container[0],
          m = a.stage[0];
        g &&
          (m.addEventListener('mousemove', l, !1),
          m.addEventListener('touchmove', l, !1),
          m.addEventListener('mousedown', h, !1),
          m.addEventListener('click', u, !1),
          m.addEventListener('mouseup', c, !1),
          m.addEventListener('touchend', c, !1),
          m.addEventListener('touchstart', h, !1),
          1 == a.options.scrollWheel &&
            (m.addEventListener('mousewheel', f, !1),
            m.addEventListener('DOMMouseScroll', f, !1))),
          (this.dispose = function () {
            m.removeEventListener('mousemove', l, !1),
              m.removeEventListener('touchmove', l, !1),
              m.removeEventListener('mousedown', h, !1),
              m.removeEventListener('click', u, !1),
              m.removeEventListener('mouseup', c, !1),
              m.removeEventListener('touchend', c, !1),
              m.removeEventListener('touchstart', h, !1),
              1 == a.options.scrollWheel &&
                (m.removeEventListener('mousewheel', f, !1),
                m.removeEventListener('DOMMouseScroll', f, !1)),
              (a.updatePageCallback = null),
              (a.flipCallback = null),
              (a.animateF = null),
              a.stage.remove();
          });
      }
      return (
        B(o, {}),
        (o.prototype = {
          add: function (e) {
            e instanceof W
              ? this.container.append(t(e.element))
              : this.container.append(t(e));
          },
          pan: function (e) {
            var t = this.startPoint,
              n = this.contentProvider.zoomScale,
              i = this.left + (e.raw.x - t.raw.x),
              o = this.top + (e.raw.y - t.raw.y);
            (this.left = Math.round(P(i, -this.shiftWidth, this.shiftWidth))),
              (this.top = Math.round(
                P(o, -this.shiftHeight, this.shiftHeight)
              )),
              1 == n && ((this.left = 0), (this.top = 0)),
              (this.startPoint = e),
              this.stage.css({
                transform:
                  'translate3d(' + this.left + 'px,' + this.top + 'px,0)',
              });
          },
          getPageByNumber: function (e) {
            for (
              var t,
                n = M(this) ? (D(this) ? e + 1 : e) : Math.floor((e - 1) / 2),
                i = 0;
              i < this.pages.length;
              i++
            )
              n == parseInt(this.pages[i].name, 10) && (t = this.pages[i]);
            return t;
          },
          getPageSide: function (t) {
            var n = this.direction == e.DIRECTION.RTL,
              i = this.getPageByNumber(t);
            if (null != i)
              return M(this)
                ? n
                  ? i.front
                  : i.back
                : t % 2 == 0
                ? n
                  ? i.back
                  : i.front
                : n
                ? i.front
                : i.back;
          },
          getContentLayer: function (e) {
            var t = this.getPageSide(e);
            return null == t ? null : t.contentLayer;
          },
        }),
        (o.prototype.init = function (e) {
          var n = this;
          (n.stage = t(f.div, { class: 'ppdff-flipbook-stage' })),
            (n.wrapper = t(f.div, { class: 'ppdff-flipbook-wrapper' })),
            (n.shadow = t(f.div, { class: 'ppdff-flipbook-shadow' })),
            n.container.append(n.stage),
            n.stage.append(n.wrapper),
            n.wrapper.append(n.shadow),
            n.createStack(e);
        }),
        (o.prototype.createStack = function (e) {
          for (
            var t = 'red,green,blue,yellow,orange,black'.split(','), n = 0;
            n < this.stackCount;
            n++
          ) {
            (e.angles = [, this.stackCount - n]),
              (e.stiffness = (this.stackCount - n) / 100);
            var i = new W(e);
            (i.angles[1] = 180),
              (i.index = n),
              (i.parent = this),
              (i.textureReady = !1),
              (i.textureRequested = !1),
              this.wrapper.append(i.element),
              (i.isFlipping = !1),
              this.pages.push(i),
              (i.color = t[n]);
          }
          this.children = this.pages;
        }),
        (o.prototype.isPageHard = function (e) {
          return d.isHardPage(this.hardConfig, e, this.pageCount, M(this));
        }),
        (o.prototype.setDuration = function (e) {
          this.duration = e;
        }),
        (o.prototype.moveBy = function (e) {
          var t = this._activePage + e;
          (t = P(t, this.startPage, this.endPage)), this.gotoPage(t);
        }),
        (o.prototype.next = function (t) {
          null == t &&
            (t =
              this.direction == e.DIRECTION.RTL
                ? -this.pageMode
                : this.pageMode),
            this.moveBy(t);
        }),
        (o.prototype.prev = function (t) {
          null == t &&
            (t =
              this.direction == e.DIRECTION.RTL
                ? this.pageMode
                : -this.pageMode),
            this.moveBy(t);
        }),
        (o.prototype.eventToPoint = function (n) {
          n = I(n);
          var i = this.wrapper,
            o = this.pages,
            a = this.pageWidth,
            r = this.fullWidth,
            s = this.height,
            l = (t(window), { x: n.clientX, y: n.clientY }),
            c = l.x - i[0].getBoundingClientRect().left,
            d = l.y - i[0].getBoundingClientRect().top;
          (l.x = l.x - this.container[0].getBoundingClientRect().left),
            (l.y = l.y - this.container[0].getBoundingClientRect().top);
          var u,
            h =
              this.drag == p.none
                ? c < a
                  ? c
                  : r - c
                : this.drag == p.left
                ? c
                : r - c,
            f = c < a ? o[this.stackCount / 2 - 1] : o[this.stackCount / 2],
            g =
              c < this.foldSense
                ? p.left
                : c > r - this.foldSense
                ? p.right
                : p.none,
            m = c,
            v = d,
            b = s,
            w = r,
            y = this.foldSense,
            P = e.CORNERS;
          return (
            (u =
              m >= 0 && m < y
                ? v >= 0 && v <= y
                  ? P.TL
                  : v >= b - y && v <= b
                  ? P.BL
                  : v > y && v < b - y
                  ? P.L
                  : P.NONE
                : m >= w - y && m <= w
                ? v >= 0 && v <= y
                  ? P.TR
                  : v >= b - y && v <= b
                  ? P.BR
                  : v > y && v < b - y
                  ? P.R
                  : P.NONE
                : P.NONE),
            {
              isInsidePage: m >= 0 && m <= w && v >= 0 && v <= b,
              isInside: u !== P.NONE && u !== P.L && u !== P.R,
              x: c,
              y: d,
              fullWidth: r,
              rawDistance: r - c,
              distance: h,
              page: f,
              drag: g,
              foldSense: this.foldSense,
              event: n,
              raw: l,
              corner: u,
            }
          );
        }),
        (o.prototype.gotoPage = function (e) {
          (e = parseInt(e, 10)),
            (this._activePage = e),
            1 == this.autoPlay && this.previewObject.setAutoPlay(this.autoPlay),
            this.updatePage(e),
            this &&
              this.thumblist &&
              this.thumblist.review &&
              this.thumblist.review();
        }),
        (o.prototype.refresh = function () {
          this.updatePage(this._activePage),
            null != this.flipCallback && this.flipCallback();
        }),
        (o.prototype.updatePage = function (n) {
          var i = this.direction == e.DIRECTION.RTL,
            o = M(this),
            a = (L(n), o ? 1 : 2);
          (n = Math.floor(n / a)), i && (n = this.pageCount / a - n);
          var s = this.oldBaseNumber || 0,
            l = this.pageCount / a,
            c = this.stackCount,
            d = Math.floor(c / 2);
          s > n
            ? ((this.children[c - 1].skipFlip = !0),
              this.children.unshift(this.children.pop()))
            : s < n &&
              ((this.children[0].skipFlip = !0),
              this.children.push(this.children.shift()));
          for (var u = 0; u < c; u++) {
            var h = this.children[u];
            s !== n && null != h.currentTween && h.clearTween(!0);
            var f,
              g = h.side,
              m = n - d + u;
            i &&
              (m = o
                ? this.pageCount - m
                : Math.floor(this.pageCount / 2) - m - 1);
            var v = h.name;
            (h.isHard = this.isPageHard(m)),
              h.isHard
                ? h.element.addClass('pdff-hard-page')
                : (h.element.removeClass('pdff-hard-page'),
                  h.front.css({ display: 'block' }),
                  h.back.css({ display: 'block' })),
              0 == m || m == l
                ? h.element.addClass('pdff-cover-page')
                : h.element.removeClass('pdff-cover-page'),
              t(h.element).attr('pageNumber') != m &&
                (h.front.contentLayer.empty(), h.back.contentLayer.empty()),
              t(h.element).attr('pageNumber', m),
              (h.isEdge = !1),
              0 == u || u == c - 1 || (h.isEdge = !1),
              (f = u < d ? p.left : p.right),
              0 == h.isFlipping &&
                (f !== g && 0 == h.skipFlip
                  ? (this.animatePage(h),
                    null != this.preFlipCallback && this.preFlipCallback())
                  : ((h.skipFlip = !1),
                    h.element.removeClass(
                      'pdff-flipping pdff-quick-turn pdff-folding pdff-left-side pdff-right-side'
                    ),
                    h.element.addClass(
                      u < d ? 'pdff-left-side' : 'pdff-right-side'
                    ),
                    (h.side = f))),
              (h.visible = o
                ? i
                  ? u < d || h.isFlipping
                  : u >= d || h.isFlipping
                : (m >= 0 && m < l) || (o && m == l)),
              null != this.requestPage &&
                1 == h.visible &&
                ((h.name = m.toString()),
                h.name != v &&
                  ((h.backTextureLoaded = !1),
                  (h.frontTextureLoaded = !1),
                  (h.backPageStamp = '-1'),
                  (h.frontPageStamp = '-1'),
                  (h.thumbLoaded = !1),
                  h.front.contentLayer.html(''),
                  h.back.contentLayer.html(''),
                  h.frontImage(r.textureLoadFallback),
                  h.backImage(r.textureLoadFallback),
                  this.requestPage())),
              (h.oldDepth = h.depth),
              h.updateCSS({
                display: 1 == h.visible ? 'block' : 'none',
                zIndex: 6 + (u < d ? u - d : d - u),
                transform: '',
              }),
              null == h.pendingPoint && 0 == h.isFlipping && h.resetCSS();
          }
          0 == TWEEN.getAll().length && clearInterval(this.animate),
            t('.quick-hint').html(n),
            (this.oldBaseNumber = n),
            this.updatePageCallback && this.updatePageCallback();
        }),
        (o.prototype.animatePage = function (e) {
          e.element.addClass('pdff-flipping'),
            (e.isFlipping = !0),
            null != this.animate && clearInterval(this.animate),
            (this.animate = setInterval(this.animateF, 30)),
            e.tween(e.pendingPoint);
        }),
        o
      );
    })(),
    V = (function (n) {
      function i(i, o, a) {
        n.call(this, a);
        var r = this;
        (r.type = 'FlipBook'),
          (r.container = i),
          (r.options = a),
          (r.options.source = o),
          (r.contentSource = o),
          null != a.height && a.height.toString().indexOf('%') < 0
            ? r.container.height(Math.min(a.height, t(window).height()))
            : r.container.height(a.height),
          r.options.isLightBox &&
            window.dfLightBox.closeButton.addClass(r.options.icons.close),
          r.options.pageSize == e.PAGE_SIZE.DOUBLEINTERNAL &&
            ((Array === r.contentSource.constructor ||
              Array.isArray(r.contentSource) ||
              r.contentSource instanceof Array) &&
              (r.options.singlePageMode = e.SINGLE_PAGE_MODE.ZOOM),
            r.container.addClass('pdff-double-internal')),
          r.options.isLightBox ||
            null == r.container.attr('id') ||
            (r.options.id = r.container.attr('id')),
          !0 !== r.options.parsed &&
            null != r.options.links &&
            e.parseLinks(r.options.links);
        var s = (r.webgl = 1 == a.webgl && 1 == z);
        if (
          (i.addClass(
            'pdff-container pdff-loading pdff-init pdff-floating pdff-controls-' +
              r.options.controlsPosition
          ),
          1 == r.options.transparent && i.addClass('pdff-transparent'),
          r.options.direction == e.DIRECTION.RTL && i.addClass('pdff-rtl'),
          (r.container.info = t(f.div, { class: 'loading-info' })
            .appendTo(r.container)
            .html('Loading...')),
          (-1 !== c.indexOf('MSIE') ||
            navigator.appVersion.indexOf('Trident/') > 0 ||
            (N && !A)) &&
            (r.options.webgl = !1),
          c.match(/msie\s[5-9]/i))
        )
          return (
            r.container.info
              .html(
                "Your browser (Internet Explorer) is out of date to run pdfflip Flipbook Plugin. <br><a href='http://browsehappy.com/'>Upgrade to a new one</a>"
              )
              .addClass('pdff-old-browser'),
            i.removeClass('pdff-loading'),
            r
          );
        var l =
          null == a.backgroundImage || '' == a.backgroundImage
            ? ''
            : "url('" + a.backgroundImage + "')";
        return (
          r.container.css({
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: a.backgroundColor,
            backgroundImage: l,
          }),
          r.init(s, o),
          null != r.options.onCreate && r.options.onCreate(r),
          r
        );
      }
      return (
        B(i, n),
        (i.prototype.init = function (n) {
          var i,
            o,
            a = this,
            s = a.target,
            l = a.options;
          1 == n
            ? ((i = function () {
                a.container.css({ minHeight: 300, minWidth: 300 }),
                  (a.stage = new _(T(a.options, { container: a.container }))),
                  (a.stage.previewObject = a),
                  (a.contentProvider = new H(
                    a.contentSource,
                    function (i) {
                      var o = {
                        pageCount: i.pageCount,
                        stackCount: 6,
                        segments: 20,
                        width: i.bookSize.width,
                        height: i.bookSize.height,
                      };
                      a.checkOpenPage(),
                        (a.target = s = a.stage.target = new MOCKUP.Book(
                          T(a.options, o),
                          a.stage
                        )),
                        a.extendtarget(),
                        j(a.container, a),
                        (s.ui = a.ui),
                        (s.container = a.container),
                        (i.webgl = n),
                        i.setTarget(a.target),
                        (s.getContentLayer = function (t) {
                          var n = s.direction == e.DIRECTION.RTL,
                            i = a.stage.cssScene.divLeft.element,
                            o = a.stage.cssScene.divRight.element;
                          return (
                            L(s._activePage),
                            M(s)
                              ? n
                                ? i
                                : o
                              : t % 2 == 0
                              ? n
                                ? o
                                : i
                              : n
                              ? i
                              : o
                          );
                        }),
                        (s.stage = a.stage),
                        (s.flipCallback = function () {
                          if (a.contentProvider) {
                            a.contentProvider.review('flipCallback');
                            var n,
                              i,
                              o = L(s._activePage),
                              r = s.getPageByNumber(o),
                              l = s.getPageByNumber(o + 1),
                              c = s.parent.cssScene.divLeft,
                              d = s.parent.cssScene.divRight;
                            s.pageMode,
                              e.PAGE_MODE.SINGLE,
                              s.direction,
                              e.DIRECTION.RTL,
                              null != r &&
                                null != c &&
                                ((n = Math.abs(
                                  r.geometry.boundingBox.max.x -
                                    r.geometry.boundingBox.min.x
                                )),
                                (i = Math.abs(
                                  r.geometry.boundingBox.max.z -
                                    r.geometry.boundingBox.min.z
                                )),
                                (c.rotation.y = 0.9 * -Math.atan2(i, n)),
                                (c.position.z = 0.8 * i),
                                (c.position.x = i / 2.5),
                                t(c.element).css({ width: n, left: -n / 2 })),
                              null != l &&
                                null != d &&
                                ((n = Math.abs(
                                  l.geometry.boundingBox.max.x -
                                    l.geometry.boundingBox.min.x
                                )),
                                (i = Math.abs(
                                  l.geometry.boundingBox.max.z -
                                    l.geometry.boundingBox.min.z
                                )),
                                (d.rotation.y = 0.9 * Math.atan2(i, n)),
                                (d.position.z = 0.8 * i),
                                (d.position.x = -i / 2.5),
                                t(d.element).css({ width: n, left: n / 2 })),
                              null != a.options.onFlip && a.options.onFlip(a);
                          }
                        }),
                        (s.resize = void a.resize()),
                        (s.updatePageCallback = function () {
                          a.ui.update(),
                            a.checkCenter(),
                            (a.stage.renderRequestPending = !0);
                        });
                      var r = t(a.stage.cssScene.divLeft.element),
                        l = t(a.stage.cssScene.divRight.element);
                      (s.preFlipCallback = function () {
                        r.empty(),
                          l.empty(),
                          null != a.options.beforeFlip &&
                            a.options.beforeFlip(a),
                          a.playSound();
                      }),
                        t(window).trigger('resize'),
                        r.css({
                          width: i.bookSize.width,
                          height: i.bookSize.height,
                          left: -i.bookSize.width / 2,
                        }),
                        l.css({
                          width: i.bookSize.width,
                          height: i.bookSize.height,
                          left: i.bookSize.width / 2,
                        }),
                        (s.ease = TWEEN.Easing.Cubic.InOut),
                        (s.contentProvider = i),
                        (s.duration = a.options.duration),
                        s.gotoPage(s._activePage),
                        s.flipCallback(),
                        null != a.options.onReady && a.options.onReady(a);
                    },
                    l,
                    a
                  ));
              }),
              (o = function () {
                (MOCKUP.defaults.anisotropy = 0),
                  (MOCKUP.defaults.groundTexture = 'blank'),
                  (THREE.skipPowerOfTwo = !0),
                  (function () {
                    (_ = (function (e) {
                      function n(n) {
                        n = n || {};
                        var i = this;
                        e.call(this, n),
                          (i.options = n),
                          (i.canvas = t(i.renderer.domElement).addClass(
                            'pdff-3dcanvas'
                          )),
                          (i.container = n.container),
                          i.container.append(i.canvas),
                          (i.type = 'PreviewStage'),
                          (i.mouse = new THREE.Vector2()),
                          (i.raycaster = new THREE.Raycaster()),
                          i.camera.position.set(0, 20, 600),
                          i.camera.lookAt(new THREE.Vector3(0, 0, 0)),
                          i.spotLight.position.set(-220, 330, 550),
                          (i.spotLight.castShadow = !F && n.webglShadow),
                          i.spotLight.shadow &&
                            (i.spotLight.shadow.bias = -8e-4),
                          (i.spotLight.intensity = g(
                            n.spotLightIntensity,
                            r.spotLightIntensity
                          )),
                          (i.ambientLight.color = new THREE.Color(
                            g(n.ambientLightColor, r.ambientLightColor)
                          )),
                          (i.ambientLight.intensity = g(
                            n.ambientLightIntensity,
                            r.ambientLightIntensity
                          ));
                        var o = new THREE.ShadowMaterial();
                        (o.opacity = g(n.shadowOpacity, r.shadowOpacity)),
                          (i.ground.material = o),
                          (i.ground.position.z = -2),
                          (i.orbitControl.maxAzimuthAngle = 0),
                          (i.orbitControl.minAzimuthAngle = 0),
                          (i.orbitControl.minPolarAngle = 1.57),
                          (i.orbitControl.maxPolarAngle = 1.57),
                          (i.orbitControl.mouseButtons.ORBIT =
                            THREE.MOUSE.RIGHT),
                          (i.orbitControl.mouseButtons.PAN = -1),
                          (i.orbitControl.maxDistance = 5e3),
                          (i.orbitControl.minDistance = 50),
                          (i.orbitControl.noZoom = !0),
                          (i.selectiveRendering = !0),
                          (i.orbitControl.zoomSpeed = 5),
                          (i.orbitControl.keyPanSpeed = 0),
                          i.orbitControl.center.set(0, 0, 0),
                          i.orbitControl.update(),
                          (i.swipe_threshold = F ? 15 : 20);
                        var a = (i.cssRenderer = new THREE.CSS3DRenderer());
                        t(a.domElement)
                          .css({
                            position: 'absolute',
                            top: 0,
                            pointerEvents: 'none',
                          })
                          .addClass('pdff-3dcanvas pdff-csscanvas'),
                          i.container[0].appendChild(a.domElement);
                        var s = (i.cssScene = new THREE.Scene()),
                          l = document.createElement('div');
                        l.className =
                          'pdff-page-content pdff-page-content-left';
                        var c = document.createElement('div');
                        c.className =
                          'pdff-page-content pdff-page-content-right';
                        var u = (s.divLeft = new THREE.CSS3DObject(l)),
                          p = (s.divRight = new THREE.CSS3DObject(c));
                        function f() {
                          i.renderRequestPending = !0;
                        }
                        s.add(u),
                          s.add(p),
                          (i.resizeCallback = function () {
                            a.setSize(i.canvas.width(), i.canvas.height());
                          }),
                          window.addEventListener(h.move, f, !1),
                          window.addEventListener('keyup', f, !1),
                          (i.dispose = function () {
                            i.clearChild(),
                              i.render(),
                              window.removeEventListener(h.move, f, !1),
                              1 == i.options.scrollWheel &&
                                (i.renderer.domElement.removeEventListener(
                                  'mousewheel',
                                  m,
                                  !1
                                ),
                                i.renderer.domElement.removeEventListener(
                                  'DOMMouseScroll',
                                  m,
                                  !1
                                )),
                              window.removeEventListener('keyup', f, !1),
                              i.renderer.domElement.removeEventListener(
                                'mousemove',
                                v,
                                !1
                              ),
                              i.renderer.domElement.removeEventListener(
                                'touchmove',
                                v,
                                !1
                              ),
                              i.renderer.domElement.removeEventListener(
                                'mousedown',
                                b,
                                !1
                              ),
                              i.renderer.domElement.removeEventListener(
                                'touchstart',
                                b,
                                !1
                              ),
                              i.renderer.domElement.removeEventListener(
                                'mouseup',
                                w,
                                !1
                              ),
                              i.renderer.domElement.removeEventListener(
                                'touchend',
                                w,
                                !1
                              ),
                              i.canvas.remove(),
                              a.domElement.parentNode.removeChild(a.domElement),
                              (a = null),
                              (i.renderCallback = null),
                              (i.renderCallback = null),
                              i.orbitControl.dispose(),
                              (i.orbitControl = null),
                              i.renderer.dispose(),
                              i.cancelRAF();
                          }),
                          (i.renderCallback = function () {
                            TWEEN.getAll().length > 0 &&
                              (i.renderRequestPending = !0),
                              TWEEN.update(),
                              a.render(s, i.camera);
                          });
                        var m = function (e) {
                            var t = 0;
                            if (
                              (null != e.wheelDelta
                                ? (t = e.wheelDelta)
                                : null != e.detail && (t = -e.detail),
                              t)
                            ) {
                              var n = i.previewObject.contentProvider.zoomScale;
                              ((t > 0 && 1 == n) || (t < 0 && n > 1)) &&
                                e.preventDefault(),
                                i.previewObject.zoom(t > 0 ? 1 : -1);
                            }
                            f();
                          },
                          v = function (e) {
                            if (
                              ((i.renderRequestPending = !0),
                              (e = I(e)),
                              i.isMouseDown &&
                                0 != e.movementX &&
                                0 != e.movementY &&
                                (i.isMouseMoving = !0),
                              null != e.touches &&
                                2 == e.touches.length &&
                                null != i.startTouches)
                            ) {
                              i.zoomDirty = !0;
                              var t = d.getVectorAvg(
                                  d.getTouches(e, i.container.offset())
                                ),
                                n = d.calculateScale(
                                  i.startTouches,
                                  d.getTouches(e)
                                );
                              return (
                                i.lastScale,
                                i.previewObject.contentProvider.zoomScale,
                                t.x,
                                t.y,
                                (i.camera.position.z = i.originalZ / n),
                                (i.lastScale = n),
                                (i.lastZoomCenter = t),
                                void e.preventDefault()
                              );
                            }
                            if (
                              1 == i.isMouseDown &&
                              1 == i.previewObject.contentProvider.zoomScale
                            ) {
                              var o = e.pageX - i.lastPos;
                              performance.now(),
                                i.lastTime,
                                Math.abs(o) > i.swipe_threshold &&
                                  (o < 0 ? i.target.next() : i.target.prev(),
                                  e.preventDefault(),
                                  (i.isMouseDown = !1)),
                                (i.lastPos = e.pageX),
                                (i.lastTime = performance.now());
                            }
                          },
                          b = function (e) {
                            null != (e = I(e)).touches &&
                              2 == e.touches.length &&
                              null == i.startTouches &&
                              ((i.startTouches = d.getTouches(e)),
                              (i.lastScale = 1),
                              (i.originalZ = 1 * i.camera.position.z)),
                              document.activeElement.blur(),
                              (i.mouseValue = e.pageX + ',' + e.pageY),
                              (i.isMouseMoving = !1),
                              (i.isMouseDown = !0),
                              (i.lastPos = e.pageX),
                              (i.lastTime = performance.now());
                          },
                          w = function (e) {
                            null != (e = I(e)).touches &&
                              0 == e.touches.length &&
                              (i.previewObject.contentProvider.zoomScale,
                              1 == i.zoomDirty &&
                                ((i.previewObject.contentProvider.zoomScale = d.limitAt(
                                  i.previewObject.contentProvider.zoomScale *
                                    i.lastScale,
                                  1,
                                  i.previewObject.contentProvider.maxZoom
                                )),
                                (i.previewObject.zoomValue =
                                  1 *
                                  i.previewObject.contentProvider.zoomScale),
                                i.previewObject.resize(),
                                (i.zoomDirty = !1)),
                              (i.lastScale = null),
                              (i.startTouches = null)),
                              (null != e.touches && e.touches.length > 1) ||
                                (function (e) {
                                  if (((i.isMouseDown = !1), 0 !== e.button))
                                    return this;
                                  var n = e.pageX + ',' + e.pageY;
                                  if (i.isMouseMoving);
                                  else if (n == i.mouseValue) {
                                    (e = e || window.event),
                                      (e = t.event.fix(e));
                                    var o = i.mouse,
                                      a = i.raycaster;
                                    (o.x =
                                      (e.offsetX / i.canvas.innerWidth()) * 2 -
                                      1),
                                      (o.y =
                                        1 -
                                        (e.offsetY / i.canvas.innerHeight()) *
                                          2),
                                      a.setFromCamera(o, i.camera);
                                    var r = a.intersectObjects(
                                      i.target instanceof MOCKUP.Bundle
                                        ? i.target.children
                                        : [i.target],
                                      !0
                                    );
                                    if (r.length > 0) {
                                      var s,
                                        l = 0;
                                      do {
                                        (s = null != r[l] ? r[l].object : null),
                                          l++;
                                      } while (
                                        (s instanceof THREE.BoxHelper ||
                                          !(s instanceof MOCKUP.Paper) ||
                                          1 == s.isFlipping) &&
                                        l < r.length
                                      );
                                      null != s.userData.object ||
                                        (s.angles[1] > 90
                                          ? 1 != s.isEdge && i.target.next()
                                          : 1 != s.isEdge && i.target.prev());
                                    }
                                  }
                                })(e);
                          };
                        return (
                          i.renderer.domElement.addEventListener(
                            'mousemove',
                            v,
                            !1
                          ),
                          i.renderer.domElement.addEventListener(
                            'touchmove',
                            v,
                            !1
                          ),
                          i.renderer.domElement.addEventListener(
                            'mousedown',
                            b,
                            !1
                          ),
                          i.renderer.domElement.addEventListener(
                            'touchstart',
                            b,
                            !1
                          ),
                          i.renderer.domElement.addEventListener(
                            'mouseup',
                            w,
                            !1
                          ),
                          i.renderer.domElement.addEventListener(
                            'touchend',
                            w,
                            !1
                          ),
                          1 == i.options.scrollWheel &&
                            (i.renderer.domElement.addEventListener(
                              'mousewheel',
                              m,
                              !1
                            ),
                            i.renderer.domElement.addEventListener(
                              'DOMMouseScroll',
                              m,
                              !1
                            )),
                          t(i.renderer.domElement).css({ display: 'block' }),
                          t(window).trigger('resize'),
                          this
                        );
                      }
                      return (
                        B(n, e),
                        (n.prototype.width = function () {
                          return this.container.width();
                        }),
                        (n.prototype.height = function () {
                          return this.container.height();
                        }),
                        n
                      );
                    })(MOCKUP.Stage)),
                      (MOCKUP.PreviewStage = _);
                    var n = (function (t) {
                      function n(e, n) {
                        ((e = e || {}).folds = 1),
                          t.call(this, e, n),
                          (this.angle = 0),
                          (this.isFlipping = !1),
                          (this.material.materials[5].transparent = !0),
                          (this.material.materials[4].transparent = !0),
                          (this.type = 'BookPaper');
                      }
                      return (
                        B(n, t),
                        (n.prototype.tween = function (t, n) {
                          var i = this;
                          i.originalStiff = i.stiffness;
                          var o = i.newStiffness,
                            a = M(i.parent),
                            r = n - t,
                            s = t > 90,
                            l = i.parent.direction == e.DIRECTION.RTL;
                          (i.init = {
                            angle: t,
                            angle2: t < 90 ? 0 : 180,
                            stiff: i.originalStiff,
                            index: (s && !l) || (!s && l) ? 1 : 0,
                          }),
                            (i.first = {
                              angle: t + r / 4,
                              angle2: 90,
                              stiff: i.originalStiff,
                              index: (s && !l) || (!s && l) ? 1 : 0.25,
                            }),
                            (i.mid = {
                              angle: t + (2 * r) / 4,
                              angle2: t < 90 ? 135 : 45,
                              stiff: i.newStiffness,
                              index: 0.5,
                            }),
                            (i.mid2 = {
                              angle: t + (3 * r) / 4,
                              angle2: t < 90 ? 180 : 0,
                              stiff: i.newStiffness,
                              index: (s && !l) || (!s && l) ? 0.25 : 1,
                            }),
                            (i.end = {
                              angle: n,
                              angle2: t < 90 ? 180 : 0,
                              stiff: i.newStiffness,
                              index: (s && !l) || (!s && l) ? 0 : 1,
                            }),
                            (i.isFlipping = !0),
                            a &&
                              ((!s && !l) || (s && l)) &&
                              ((i.material.materials[5].opacity = i.material.materials[4].opacity = 0),
                              (i.castShadow = !1)),
                            (i.currentTween = new TWEEN.Tween(i.init)
                              .to(
                                {
                                  angle: [
                                    i.first.angle,
                                    i.mid.angle,
                                    i.mid2.angle,
                                    i.end.angle,
                                  ],
                                  angle2: [
                                    i.first.angle2,
                                    i.mid.angle2,
                                    i.mid2.angle2,
                                    i.end.angle2,
                                  ],
                                  stiff: [
                                    i.first.stiff,
                                    i.mid.stiff,
                                    i.mid2.stiff,
                                    i.end.stiff,
                                  ],
                                  index: [
                                    i.first.index,
                                    i.mid.index,
                                    i.mid2.index,
                                    i.end.index,
                                  ],
                                },
                                i.parent.duration
                              )
                              .onUpdate(function (e) {
                                var t;
                                (t = this),
                                  (i.angles[1] = t.angle),
                                  (i.angles[4] = i.isHard ? t.angle : t.angle2),
                                  1 == i.isHard
                                    ? (i.stiffness = 0)
                                    : ((i.stiffness =
                                        (t.stiff / (o + 1e-5)) *
                                        (i.newStiffness + 1e-5)),
                                      (i.stiffness = isNaN(i.stiffness)
                                        ? 0
                                        : t.stiff)),
                                  a &&
                                    ((i.material.materials[5].opacity = i.material.materials[4].opacity =
                                      t.index),
                                    (i.castShadow = t.index > 0.5)),
                                  i.updateAngle(!0);
                              })
                              .easing(TWEEN.Easing.Sinusoidal.Out)
                              .onComplete(function (e) {
                                (i.stiffness = i.newStiffness),
                                  i.updateAngle(),
                                  (i.material.materials[5].opacity = i.material.materials[4].opacity = 1),
                                  (i.castShadow = !0),
                                  (i.isFlipping = !1),
                                  i.parent &&
                                    i.parent.refresh &&
                                    i.parent.refresh();
                              })
                              .start());
                        }),
                        n
                      );
                    })(MOCKUP.FlexBoxPaper);
                    MOCKUP.BookPaper = n;
                    var i = (function (t) {
                      function n(n, i) {
                        ((n = n || {}).segments = n.segments || 50),
                          (this.pageCount = n.pageCount),
                          (this.height = n.height),
                          (this.width = n.width),
                          (this.pageCount =
                            1 == this.pageCount
                              ? this.pageCount
                              : 2 * Math.ceil(this.pageCount / 2)),
                          (this.direction = n.direction || e.DIRECTION.LTR),
                          (this.startPage = 1),
                          (this.endPage = this.pageCount),
                          (this.stackCount = n.stackCount || 6),
                          (this.materials = []),
                          t.call(this, n, i),
                          (this.angles = [0, 0, 0, 0, 0, 0]),
                          (this.stiffness =
                            null == n.stiffness ? 1.5 : n.stiffness),
                          (this.hardConfig = n.hard),
                          (this._activePage = n.openPage || this.startPage),
                          this.createStack(n),
                          (this.pageMode =
                            n.pageMode ||
                            (F || this.pageCount <= 2
                              ? e.PAGE_MODE.SINGLE
                              : e.PAGE_MODE.DOUBLE)),
                          (this.singlePageMode =
                            n.singlePageMode ||
                            (F
                              ? e.SINGLE_PAGE_MODE.BOOKLET
                              : e.SINGLE_PAGE_MODE.ZOOM)),
                          (this.type = 'Book');
                      }
                      return (
                        B(n, t),
                        (n.prototype.getPageByNumber = function (e) {
                          var t = M(this)
                            ? D(this)
                              ? e + 1
                              : e
                            : Math.floor((e - 1) / 2);
                          return this.getObjectByName(t.toString());
                        }),
                        (n.prototype.isPageHard = function (e) {
                          return d.isHardPage(
                            this.hardConfig,
                            e,
                            this.pageCount
                          );
                        }),
                        (n.prototype.activePage = function (e) {
                          if (null == e) return this._activePage;
                          this.gotoPage(e);
                        }),
                        (n.prototype.gotoPage = function (e) {
                          (e = parseInt(e, 10)),
                            (this._activePage = e),
                            1 == this.autoPlay &&
                              this.previewObject.setAutoPlay(this.autoPlay),
                            this.updatePage(e),
                            this &&
                              this.thumblist &&
                              this.thumblist.review &&
                              this.thumblist.review();
                        }),
                        (n.prototype.moveBy = function (e) {
                          var t = this._activePage + e;
                          (t = P(t, this.startPage, this.endPage)),
                            this.gotoPage(t);
                        }),
                        (n.prototype.next = function (t) {
                          null == t &&
                            (t =
                              this.direction == e.DIRECTION.RTL
                                ? -this.pageMode
                                : this.pageMode),
                            this.moveBy(t);
                        }),
                        (n.prototype.prev = function (t) {
                          null == t &&
                            (t =
                              this.direction == e.DIRECTION.RTL
                                ? this.pageMode
                                : -this.pageMode),
                            this.moveBy(t);
                        }),
                        (n.prototype.updateAngle = function () {
                          for (
                            var e = this.angles[1],
                              t = this.angles[4] - e,
                              n = this.stackCount,
                              i = 0;
                            i < n;
                            i++
                          ) {
                            var o = this.children[i];
                            (o.angles[1] = e + (i * t) / (100 * n)),
                              (o.stiffness = this.stiffness),
                              o.updateAngle();
                          }
                        }),
                        (n.prototype.refresh = function () {
                          this.updatePage(this._activePage),
                            null != this.flipCallback && this.flipCallback();
                        }),
                        (n.prototype.updatePage = function (t) {
                          var n = this.direction == e.DIRECTION.RTL,
                            i = M(this),
                            o = (L(t), i ? 1 : 2);
                          (t = Math.floor(t / o)),
                            n && (t = this.pageCount / o - t);
                          var a = this.oldBaseNumber || 0,
                            s = this.pageCount / o,
                            l = this.stackCount,
                            c = i
                              ? 0
                              : (0.5 - Math.abs(s / 2 - t) / s) /
                                this.stiffness,
                            d = Math.floor(l / 2),
                            u = !1;
                          a > t
                            ? ((u = !0),
                              (this.children[l - 1].skipFlip = !0),
                              this.children.unshift(this.children.pop()))
                            : a < t &&
                              ((this.children[0].skipFlip = !0),
                              this.children.push(this.children.shift()));
                          for (
                            var p = 5 / s,
                              h = (p * t) / 2,
                              f = (p * (s - t)) / 2,
                              g = h < f ? f : h,
                              m = 0;
                            m < l;
                            m++
                          ) {
                            var v,
                              b = this.children[m],
                              w = (b.color, b.angles[1]),
                              y = t - d + m;
                            n &&
                              (y = i
                                ? this.pageCount - y
                                : Math.floor(this.pageCount / 2) - y - 1);
                            var P = (b.isHard = this.isPageHard(y)),
                              x = b.name;
                            (b.isEdge = !1),
                              0 == m
                                ? (b.depth = h < 0.4 ? 0.4 : h)
                                : m == l - 1
                                ? (b.depth = f < 0.4 ? 0.4 : f)
                                : ((b.depth = 0.4), (b.isEdge = !1)),
                              1 == b.isFlipping && (b.depth = 0.4),
                              (b.position.x = 0);
                            var C = 0.02 * m,
                              E = 180 - 0.02 * (m - d) + 0.02 * m;
                            if (
                              (m < d
                                ? ((b.newStiffness =
                                    P || 0 == this.stiffness
                                      ? 0
                                      : c / (t / s) / 4),
                                  (v = C),
                                  (b.position.z = g - 0.4 * (-m + d)),
                                  1 == u && (b.position.z -= 0.4))
                                : ((v = E),
                                  (b.newStiffness =
                                    P || 0 == this.stiffness
                                      ? 0
                                      : c / (Math.abs(s - t) / s) / 4),
                                  (b.position.z =
                                    g - 0.4 * (-l + m + d + 1) - b.depth)),
                              0 == b.isFlipping)
                            )
                              if (Math.abs(w - v) > 20 && 0 == b.skipFlip) {
                                b.depth = 0.4;
                                var S = b.stiffness;
                                (S =
                                  w > v
                                    ? c / (Math.abs(s - t) / s) / 4
                                    : c / (t / s) / 4),
                                  (b.position.z += 0.4),
                                  (b.stiffness = isNaN(S) ? b.stiffness : S),
                                  b.updateAngle(!0),
                                  (b.targetStiffness = P
                                    ? 0
                                    : m < t
                                    ? c / (Math.abs(s - t) / s) / 4
                                    : c / (t / s) / 4),
                                  (b.targetStiffness = P
                                    ? 0
                                    : isNaN(b.targetStiffness)
                                    ? b.stiffness
                                    : b.targetStiffness),
                                  (b.isFlipping = !0),
                                  b.tween(w, v),
                                  null != this.preFlipCallback &&
                                    this.preFlipCallback();
                              } else
                                (b.skipFlip = !1),
                                  (b.newStiffness = isNaN(b.newStiffness)
                                    ? 0
                                    : b.newStiffness),
                                  (b.angles[1] == v &&
                                    b.stiffness == b.newStiffness &&
                                    b.depth == b.oldDepth) ||
                                    ((b.angles[1] = b.angles[4] = v),
                                    (b.stiffness = b.newStiffness),
                                    b.updateAngle(!0));
                            (b.visible = i
                              ? n
                                ? m < d || b.isFlipping
                                : m >= d || b.isFlipping
                              : (y >= 0 && y < s) || (i && y == s)),
                              null != this.requestPage &&
                                1 == b.visible &&
                                ((b.name = y.toString()),
                                b.name != x &&
                                  ((b.textureLoaded = !1),
                                  b.frontImage(r.textureLoadFallback),
                                  (b.frontPageStamp = '-1'),
                                  (b.frontTextureLoaded = !1),
                                  (b.thumbLoaded = !1),
                                  b.backImage(r.textureLoadFallback),
                                  (b.backPageStamp = '-1'),
                                  (b.backTextureLoaded = !1),
                                  this.requestPage())),
                              (b.oldDepth = b.depth);
                            var k =
                              Math.abs(b.geometry.boundingBox.max.x) <
                              Math.abs(b.geometry.boundingBox.min.x)
                                ? b.geometry.boundingBox.max.x
                                : b.geometry.boundingBox.min.x;
                            b.position.x =
                              1 == b.isEdge && 0 == b.isFlipping
                                ? m < d
                                  ? k
                                  : -k
                                : 0;
                          }
                          (this.oldBaseNumber = t),
                            null != this.updatePageCallback &&
                              this.updatePageCallback();
                        }),
                        (n.prototype.createCover = function (e) {
                          (e.width = 2 * e.width),
                            (this.cover = new MOCKUP.BiFold(e)),
                            this.add(this.cover);
                        }),
                        (n.prototype.createStack = function (e) {
                          for (
                            var t = 'red,green,blue,yellow,orange,black'.split(
                                ','
                              ),
                              n = 0;
                            n < this.stackCount;
                            n++
                          ) {
                            (e.angles = [, this.stackCount - n]),
                              (e.stiffness = (this.stackCount - n) / 100);
                            var i = new MOCKUP.BookPaper(e);
                            (i.angles[1] = 180),
                              (i.index = n),
                              i.updateAngle(),
                              (i.textureReady = !1),
                              (i.textureRequested = !1),
                              this.add(i),
                              (i.color = t[n]),
                              (i.position.z = -1 * n);
                          }
                        }),
                        (n.prototype.shininess = function (e) {
                          if (null == e) return this.mainObject.shininess();
                          this.mainObject.shininess(e);
                        }),
                        (n.prototype.bumpScale = function (e) {
                          if (null == e) return this.mainObject.bumpScale();
                          this.mainObject.bumpScale(e);
                        }),
                        (n.prototype.frontImage = function (e) {
                          if (null == e) return this.mainObject.frontImage();
                          this.mainObject.frontImage(e);
                        }),
                        (n.prototype.backImage = function (e) {
                          if (null == e) return this.mainObject.backImage();
                          this.mainObject.backImage(e);
                        }),
                        n
                      );
                    })(MOCKUP.Bundle);
                    MOCKUP.Book = i;
                  })(),
                  null != i && i();
              }),
              null == window.MOCKUP
                ? (a.updateInfo('Loading Interface ...'),
                  'function' == typeof define && define.amd
                    ? (requirejs.config({
                        paths: { three: r.threejsSrc.replace('.js', '') },
                        shim: { three: { exports: 'THREE' } },
                      }),
                      require(['three'], function (t) {
                        return (
                          (window.THREE = t),
                          O(r.utilsSrc + '?ver=' + e.version, function () {
                            o();
                          }),
                          t
                        );
                      }))
                    : O(r.threejsSrc + '?ver=' + e.version, function () {
                        O(r.utilsSrc + '?ver=' + e.version, function () {
                          o();
                        });
                      }))
                : o())
            : (a.contentProvider = new H(
                a.contentSource,
                function (e) {
                  var i = {
                    pageCount: e.pageCount,
                    contentSourceType: e.contentSourceType,
                  };
                  a.checkOpenPage(),
                    (a.target = s = new G(T(a.options, i), a.container)),
                    (a.target.previewObject = a),
                    a.extendtarget(),
                    j(a.container, a),
                    (e.webgl = n),
                    e.setTarget(a.target),
                    (e.waitPeriod = 2),
                    (s.ease = TWEEN.Easing.Quadratic.InOut),
                    (s.duration = a.options.duration),
                    (s.container = a.container),
                    (s.updatePageCallback = function () {
                      a.ui.update(), a.checkCenter();
                    }),
                    (s.resize = void a.resize()),
                    t(window).trigger('resize'),
                    (s.flipCallback = function () {
                      a.contentProvider &&
                        (a.contentProvider.review('flipCallback'),
                        null != a.options.onFlip && a.options.onFlip(a));
                    }),
                    (s.preFlipCallback = function () {
                      null != a.options.beforeFlip && a.options.beforeFlip(a),
                        a.playSound();
                    }),
                    s.gotoPage(s._activePage),
                    s.flipCallback(),
                    null != a.options.onReady && a.options.onReady(a);
                },
                l,
                a
              ));
        }),
        (i.prototype.extendtarget = function () {
          var e = this;
          (e.target.previewObject = e),
            (e.target.reset = function () {
              for (var t = 0; t < e.target.children.length; t++) {
                var n = e.target.children[t];
                (n.skipFlip = !0), (n.name = '-2');
              }
              (e.contentProvider.annotedPage = '-2'), e.target.refresh();
            });
        }),
        (i.prototype.getURLHash = function () {
          if (null != this.options.id) {
            var e =
              'pdfflip-' +
              (null != this.options.slug
                ? this.options.slug
                : this.options.id) +
              '/';
            null != this.target &&
              null != this.target._activePage &&
              (e += this.target._activePage + '/'),
              (window.location.hash = e);
          }
          return window.location.href;
        }),
        (i.prototype.checkOpenPage = function () {
          if (null != this.options.id) {
            var e = t('#' + this.options.id);
            if (e.length > 0 && null != e.data('page')) {
              var n = parseInt(e.data('page'), 10);
              isNaN(n) || (this.options.openPage = n);
            }
          }
        }),
        (i.prototype.end = function () {
          this.target.gotoPage(this.target.endPage);
        }),
        (i.prototype.gotoPage = function (e) {
          this.target.gotoPage(e), null != this.ui && this.ui.update();
        }),
        (i.prototype.prev = function () {
          this.target.prev();
        }),
        (i.prototype.next = function () {
          this.target.next();
        }),
        (i.prototype.updateInfo = function (e) {
          this.container &&
            this.container.info &&
            this.container.info.html &&
            this.container.info.html(e);
        }),
        i
      );
    })(U);
  t.fn.extend({
    shelf: function () {},
    flipBook: function (e, n) {
      return new V(t(this), e, ((i = n), t.extend(!0, {}, r, i)));
      var i;
    },
  });
})(pdfflip, jQuery),
  (function (e) {
    if (((e.URL = e.URL || e.webkitURL), e.Blob && e.URL))
      try {
        return void new Blob();
      } catch (e) {}
    var t =
      e.BlobBuilder ||
      e.WebKitBlobBuilder ||
      e.MozBlobBuilder ||
      (function (e) {
        var t = function (e) {
            return Object.prototype.toString
              .call(e)
              .match(/^\[object\s(.*)\]$/)[1];
          },
          n = function () {
            this.data = [];
          },
          i = function (e, t, n) {
            (this.data = e),
              (this.size = e.length),
              (this.type = t),
              (this.encoding = n);
          },
          o = n.prototype,
          a = i.prototype,
          r = e.FileReaderSync,
          s = function (e) {
            this.code = this[(this.name = e)];
          },
          l = 'NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR'.split(
            ' '
          ),
          c = l.length,
          d = e.URL || e.webkitURL || e,
          u = d.createObjectURL,
          p = d.revokeObjectURL,
          h = d,
          f = e.btoa,
          g = e.atob,
          m = e.ArrayBuffer,
          v = e.Uint8Array,
          b = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;
        for (i.fake = a.fake = !0; c--; ) s.prototype[l[c]] = c + 1;
        return (
          d.createObjectURL ||
            (h = e.URL = function (e) {
              var t,
                n = document.createElementNS(
                  'http://www.w3.org/1999/xhtml',
                  'a'
                );
              return (
                (n.href = e),
                'origin' in n ||
                  ('data:' === n.protocol.toLowerCase()
                    ? (n.origin = null)
                    : ((t = e.match(b)), (n.origin = t && t[1]))),
                n
              );
            }),
          (h.createObjectURL = function (e) {
            var t,
              n = e.type;
            return (
              null === n && (n = 'application/octet-stream'),
              e instanceof i
                ? ((t = 'data:' + n),
                  'base64' === e.encoding
                    ? t + ';base64,' + e.data
                    : 'URI' === e.encoding
                    ? t + ',' + decodeURIComponent(e.data)
                    : f
                    ? t + ';base64,' + f(e.data)
                    : t + ',' + encodeURIComponent(e.data))
                : u
                ? u.call(d, e)
                : void 0
            );
          }),
          (h.revokeObjectURL = function (e) {
            'data:' !== e.substring(0, 5) && p && p.call(d, e);
          }),
          (o.append = function (e) {
            var n = this.data;
            if (v && (e instanceof m || e instanceof v)) {
              for (var o = '', a = new v(e), l = 0, c = a.length; l < c; l++)
                o += String.fromCharCode(a[l]);
              n.push(o);
            } else if ('Blob' === t(e) || 'File' === t(e)) {
              if (!r) throw new s('NOT_READABLE_ERR');
              var d = new r();
              n.push(d.readAsBinaryString(e));
            } else
              e instanceof i
                ? 'base64' === e.encoding && g
                  ? n.push(g(e.data))
                  : 'URI' === e.encoding
                  ? n.push(decodeURIComponent(e.data))
                  : 'raw' === e.encoding && n.push(e.data)
                : ('string' != typeof e && (e += ''),
                  n.push(unescape(encodeURIComponent(e))));
          }),
          (o.getBlob = function (e) {
            return (
              arguments.length || (e = null),
              new i(this.data.join(''), e, 'raw')
            );
          }),
          (o.toString = function () {
            return '[object BlobBuilder]';
          }),
          (a.slice = function (e, t, n) {
            var o = arguments.length;
            return (
              o < 3 && (n = null),
              new i(
                this.data.slice(e, o > 1 ? t : this.data.length),
                n,
                this.encoding
              )
            );
          }),
          (a.toString = function () {
            return '[object Blob]';
          }),
          (a.close = function () {
            (this.size = 0), delete this.data;
          }),
          n
        );
      })(e);
    e.Blob = function (e, n) {
      var i = (n && n.type) || '',
        o = new t();
      if (e)
        for (var a = 0, r = e.length; a < r; a++)
          Uint8Array && e[a] instanceof Uint8Array
            ? o.append(e[a].buffer)
            : o.append(e[a]);
      var s = o.getBlob(i);
      return !s.slice && s.webkitSlice && (s.slice = s.webkitSlice), s;
    };
    var n =
      Object.getPrototypeOf ||
      function (e) {
        return e.__proto__;
      };
    e.Blob.prototype = n(new e.Blob());
  })(window),
  (function (e) {
    var t,
      n = e.Uint8Array,
      i = e.HTMLCanvasElement,
      o = i && i.prototype,
      a = /\s*;\s*base64\s*(?:;|$)/i,
      r = 'toDataURL';
    n &&
      (t = new n([
        62,
        -1,
        -1,
        -1,
        63,
        52,
        53,
        54,
        55,
        56,
        57,
        58,
        59,
        60,
        61,
        -1,
        -1,
        -1,
        0,
        -1,
        -1,
        -1,
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
      ])),
      i &&
        !o.toBlob &&
        ((o.toBlob = function (e, i) {
          if ((i || (i = 'image/png'), this.mozGetAsFile))
            e(this.mozGetAsFile('canvas', i));
          else if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(i))
            e(this.msToBlob());
          else {
            var o,
              s = Array.prototype.slice.call(arguments, 1),
              l = this[r].apply(this, s),
              c = l.indexOf(','),
              d = l.substring(c + 1),
              u = a.test(l.substring(0, c));
            Blob.fake
              ? (((o = new Blob()).encoding = u ? 'base64' : 'URI'),
                (o.data = d),
                (o.size = d.length))
              : n &&
                (o = u
                  ? new Blob(
                      [
                        (function (e) {
                          for (
                            var i,
                              o,
                              a = e.length,
                              r = new n(((a / 4) * 3) | 0),
                              s = 0,
                              l = 0,
                              c = [0, 0],
                              d = 0,
                              u = 0;
                            a--;

                          )
                            (o = e.charCodeAt(s++)),
                              255 !== (i = t[o - 43]) &&
                                null != i &&
                                ((c[1] = c[0]),
                                (c[0] = o),
                                (u = (u << 6) | i),
                                4 == ++d &&
                                  ((r[l++] = u >>> 16),
                                  61 !== c[1] && (r[l++] = u >>> 8),
                                  61 !== c[0] && (r[l++] = u),
                                  (d = 0)));
                          return r;
                        })(d),
                      ],
                      { type: i }
                    )
                  : new Blob([decodeURIComponent(d)], { type: i })),
              e(o);
          }
        }),
        o.toDataURLHD
          ? (o.toBlobHD = function () {
              r = 'toDataURLHD';
              var e = this.toBlob();
              return (r = 'toDataURL'), e;
            })
          : (o.toBlobHD = o.toBlob));
  })(window),
  (function () {
    if (
      ('performance' in window == 0 && (window.performance = {}),
      (Date.now =
        Date.now ||
        function () {
          return new Date().getTime();
        }),
      'now' in window.performance == 0)
    ) {
      var e =
        window.performance.timing && window.performance.timing.navigationStart
          ? window.performance.timing.navigationStart
          : Date.now();
      window.performance.now = function () {
        return Date.now() - e;
      };
    }
  })(),
  (function () {
    var e,
      t,
      n =
        n ||
        ((e = []),
        {
          getAll: function () {
            return e;
          },
          removeAll: function () {
            e = [];
          },
          add: function (t) {
            e.push(t);
          },
          remove: function (t) {
            var n = e.indexOf(t);
            -1 !== n && e.splice(n, 1);
          },
          update: function (t) {
            if (0 === e.length) return !1;
            var n = 0;
            for (t = null != t ? t : window.performance.now(); n < e.length; )
              e[n].update(t) ? n++ : e.splice(n, 1);
            return !0;
          },
        });
    (n.Tween = function (e) {
      var t = e,
        i = {},
        o = {},
        a = {},
        r = 1e3,
        s = 0,
        l = !1,
        c = !1,
        d = !1,
        u = 0,
        p = null,
        h = n.Easing.Linear.None,
        f = n.Interpolation.Linear,
        g = [],
        m = null,
        v = !1,
        b = null,
        w = null,
        y = null;
      for (var P in e) i[P] = parseFloat(e[P], 10);
      (this.to = function (e, t) {
        return null != t && (r = t), (o = e), this;
      }),
        (this.start = function (e) {
          n.add(this),
            (c = !0),
            (v = !1),
            (p = null != e ? e : window.performance.now()),
            (p += u);
          for (var r in o) {
            if (o[r] instanceof Array) {
              if (0 === o[r].length) continue;
              o[r] = [t[r]].concat(o[r]);
            }
            null !== i[r] &&
              ((i[r] = t[r]),
              i[r] instanceof Array == 0 && (i[r] *= 1),
              (a[r] = i[r] || 0));
          }
          return this;
        }),
        (this.stop = function () {
          return c
            ? (n.remove(this),
              (c = !1),
              null !== y && y.call(t),
              this.stopChainedTweens(),
              this)
            : this;
        }),
        (this.stopChainedTweens = function () {
          for (var e = 0, t = g.length; e < t; e++) g[e].stop();
        }),
        (this.complete = function () {
          return c
            ? (n.remove(this),
              (c = !1),
              null !== w && w.call(t),
              this.completeChainedTweens(),
              this)
            : this;
        }),
        (this.completeChainedTweens = function () {
          for (var e = 0, t = g.length; e < t; e++) g[e].complete();
        }),
        (this.delay = function (e) {
          return (u = e), this;
        }),
        (this.repeat = function (e) {
          return (s = e), this;
        }),
        (this.yoyo = function (e) {
          return (l = e), this;
        }),
        (this.easing = function (e) {
          return (h = null == e ? h : e), this;
        }),
        (this.interpolation = function (e) {
          return (f = e), this;
        }),
        (this.chain = function () {
          return (g = arguments), this;
        }),
        (this.onStart = function (e) {
          return (m = e), this;
        }),
        (this.onUpdate = function (e) {
          return (b = e), this;
        }),
        (this.onComplete = function (e) {
          return (w = e), this;
        }),
        (this.onStop = function (e) {
          return (y = e), this;
        }),
        (this.update = function (e) {
          var n, c, y;
          if (e < p) return !0;
          !1 === v && (null !== m && m.call(t), (v = !0)),
            (y = h((c = (c = (e - p) / r) > 1 ? 1 : c)));
          for (n in o)
            if (null !== i[n]) {
              var P = i[n] || 0,
                x = o[n];
              x instanceof Array
                ? (t[n] = f(x, y))
                : ('string' == typeof x &&
                    (x =
                      x.startsWith('+') || x.startsWith('-')
                        ? P + parseFloat(x, 10)
                        : parseFloat(x, 10)),
                  'number' == typeof x && (t[n] = P + (x - P) * y));
            }
          if ((null !== b && b.call(t, y), 1 === c)) {
            if (s > 0) {
              isFinite(s) && s--;
              for (n in a) {
                if (
                  ('string' == typeof o[n] &&
                    (a[n] = a[n] + parseFloat(o[n], 10)),
                  l)
                ) {
                  var C = a[n];
                  (a[n] = o[n]), (o[n] = C);
                }
                i[n] = a[n];
              }
              return l && (d = !d), (p = e + u), !0;
            }
            null !== w && w.call(t);
            for (var E = 0, S = g.length; E < S; E++) g[E].start(p + r);
            return !1;
          }
          return !0;
        });
    }),
      (n.Easing = {
        Linear: {
          None: function (e) {
            return e;
          },
        },
        Quadratic: {
          In: function (e) {
            return e * e;
          },
          Out: function (e) {
            return e * (2 - e);
          },
          InOut: function (e) {
            return (e *= 2) < 1 ? 0.5 * e * e : -0.5 * (--e * (e - 2) - 1);
          },
        },
        Quartic: {
          In: function (e) {
            return e * e * e * e;
          },
          Out: function (e) {
            return 1 - --e * e * e * e;
          },
          InOut: function (e) {
            return (e *= 2) < 1
              ? 0.5 * e * e * e * e
              : -0.5 * ((e -= 2) * e * e * e - 2);
          },
        },
        Sinusoidal: {
          In: function (e) {
            return 1 - Math.cos((e * Math.PI) / 2);
          },
          Out: function (e) {
            return Math.sin((e * Math.PI) / 2);
          },
          InOut: function (e) {
            return 0.5 * (1 - Math.cos(Math.PI * e));
          },
        },
        Cubic: {
          In: function (e) {
            return e * e * e;
          },
          Out: function (e) {
            return --e * e * e + 1;
          },
          InOut: function (e) {
            return (e *= 2) < 1
              ? 0.5 * e * e * e
              : 0.5 * ((e -= 2) * e * e + 2);
          },
        },
      }),
      (n.Interpolation = {
        Linear: function (e, t) {
          var i = e.length - 1,
            o = i * t,
            a = Math.floor(o),
            r = n.Interpolation.Utils.Linear;
          return t < 0
            ? r(e[0], e[1], o)
            : t > 1
            ? r(e[i], e[i - 1], i - o)
            : r(e[a], e[a + 1 > i ? i : a + 1], o - a);
        },
        Bezier: function (e, t) {
          for (
            var i = 0,
              o = e.length - 1,
              a = Math.pow,
              r = n.Interpolation.Utils.Bernstein,
              s = 0;
            s <= o;
            s++
          )
            i += a(1 - t, o - s) * a(t, s) * e[s] * r(o, s);
          return i;
        },
        Utils: {
          Linear: function (e, t, n) {
            return (t - e) * n + e;
          },
          Bernstein: function (e, t) {
            var i = n.Interpolation.Utils.Factorial;
            return i(e) / i(t) / i(e - t);
          },
          Factorial:
            ((t = [1]),
            function (e) {
              var n = 1;
              if (t[e]) return t[e];
              for (var i = e; i > 1; i--) n *= i;
              return (t[e] = n), n;
            }),
          CatmullRom: function (e, t, n, i, o) {
            var a = 0.5 * (n - e),
              r = 0.5 * (i - t),
              s = o * o;
            return (
              (2 * t - 2 * n + a + r) * (o * s) +
              (-3 * t + 3 * n - 2 * a - r) * s +
              a * o +
              t
            );
          },
        },
      }),
      (window.TWEEN = n);
  })(),
  (pdfflip.createBlob = function (e, t) {
    if ('undefined' != typeof Blob) return new Blob([e], { type: t });
    var n = new MozBlobBuilder();
    return n.append(e), n.getBlob(t);
  }),
  (pdfflip.createObjectURL = (function () {
    var e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    return function (t, n) {
      if ('undefined' != typeof URL && URL.createObjectURL) {
        var i = pdfflip.createBlob(t, n);
        return URL.createObjectURL(i);
      }
      for (
        var o = 'data:' + n + ';base64,', a = 0, r = t.length;
        a < r;
        a += 3
      ) {
        var s = 255 & t[a],
          l = 255 & t[a + 1],
          c = 255 & t[a + 2];
        o +=
          e[s >> 2] +
          e[((3 & s) << 4) | (l >> 4)] +
          e[a + 1 < r ? ((15 & l) << 2) | (c >> 6) : 64] +
          e[a + 2 < r ? 63 & c : 64];
      }
      return o;
    };
  })());
var ThumbList = (function () {
    function e(t) {
      var n = (t && t.w + 'px') || '100%',
        i = (t && t.h + 'px') || '100%',
        o = (this.itemHeight = t.itemHeight);
      (this.items = t.items),
        (this.generatorFn = t.generatorFn),
        (this.totalRows = t.totalRows || (t.items && t.items.length)),
        (this.addFn = t.addFn),
        (this.scrollFn = t.scrollFn);
      var a = e.createScroller(o * this.totalRows);
      (this.container = e.createContainer(n, i)),
        this.container.appendChild(a),
        (this.screenItemsLen = Math.ceil(t.h / o)),
        (this.offsetItems = this.screenItemsLen),
        (this.cachedItemsLen = this.screenItemsLen + 2 * this.offsetItems),
        this._renderChunk(this.container, 0);
      var r = this;
      function s(e) {
        var t = e.target.scrollTop;
        if (
          !r.lastRepaintY ||
          Math.abs(t - r.lastRepaintY) >= r.offsetItems * r.itemHeight
        ) {
          var n = parseInt(t / o, 10) - r.offsetItems;
          r._renderChunk(r.container, n < 0 ? 0 : n), (r.lastRepaintY = t);
        }
        (r.lastScrolled = Date.now()),
          null != r.scrollFn && r.scrollFn(),
          e.preventDefault && e.preventDefault();
      }
      (r.lastRepaintY = 0),
        this.screenItemsLen,
        (r.dispose = function () {
          r.container &&
            r.container.parentNode &&
            r.container.parentNode.removeChild(r.container),
            r.container.removeEventListener('scroll', s);
        }),
        r.container.addEventListener('scroll', s);
    }
    return (
      (e.prototype.reset = function (e) {
        (this.screenItemsLen = Math.ceil(e / this.itemHeight)),
          (this.cachedItemsLen = this.screenItemsLen + 2 * this.offsetItems);
        var t =
          parseInt(this.lastRepaintY / this.itemHeight, 10) - this.offsetItems;
        (this.needReset = !0),
          this._renderChunk(this.container, Math.max(t, 0));
      }),
      (e.prototype.createRow = function (e) {
        var t;
        return (
          this.generatorFn &&
            ((t = this.generatorFn(e)).classList.add('pdff-vrow'),
            (t.style.position = 'absolute'),
            (t.style.top = e * this.itemHeight + 'px'),
            t.setAttribute('index', e)),
          t
        );
      }),
      (e.prototype._renderChunk = function (e, t) {
        var n = null == this.range;
        this.range = this.range || { min: 0, max: this.cachedItemsLen };
        var i = this.range,
          o = i.min,
          a = i.max,
          r = !!n || t >= o;
        if (n || t != o || 0 != this.needReset) {
          var s,
            l = n ? o : r ? a : t;
          l = l > this.totalRows ? this.totalRows : l < 0 ? 0 : l;
          var c = t + this.cachedItemsLen;
          for (c = c > this.totalRows ? this.totalRows : c, s = l; s < c; s++)
            r
              ? e.appendChild(this.createRow(s))
              : e.insertBefore(this.createRow(s), e.childNodes[1 + s - l]),
              null != this.addFn && this.addFn(s);
          if (
            (Math.abs(t - o),
            (this.needReset = !1),
            !n && e.childNodes.length > this.cachedItemsLen + 1)
          )
            for (
              var d = r ? 1 : 1 + this.cachedItemsLen, u = d + (c - l);
              u > d;
              u--
            )
              e.childNodes[d] && this.container.removeChild(e.childNodes[d]);
          (this.range.min = t), (this.range.max = c);
        }
      }),
      (e.createContainer = function (e, t) {
        var n = document.createElement('div');
        return (
          (n.style.width = e),
          (n.style.height = t),
          (n.style.overflow = 'auto'),
          (n.style.position = 'relative'),
          (n.style.padding = 0),
          n
        );
      }),
      (e.createScroller = function (e) {
        var t = document.createElement('div');
        return (
          (t.style.opacity = 0),
          (t.style.position = 'absolute'),
          (t.style.top = 0),
          (t.style.left = 0),
          (t.style.width = '1px'),
          (t.style.height = e + 'px'),
          t
        );
      }),
      e
    );
  })(),
  BookMarkViewer = (function () {
    function e(e) {
      (this.outline = null),
        (this.lastToggleIsShow = !0),
        (this.container = e.container),
        (this.linkService = e.linkService),
        (this.outlineItemClass = e.outlineItemClass || 'outlineItem'),
        (this.outlineToggleClass =
          e.outlineToggleClass || 'outlineItemToggler'),
        (this.outlineToggleHiddenClass =
          e.outlineToggleHiddenClass || 'outlineItemsHidden');
    }
    return (
      (e.prototype = {
        dispose: function () {
          this.container &&
            this.container.parentNode &&
            this.container.parentNode.removeChild(this.container),
            (this.linkService = null);
        },
        reset: function () {
          (this.outline = null), (this.lastToggleIsShow = !0);
          for (var e = this.container; e.firstChild; )
            e.removeChild(e.firstChild);
        },
        _dispatchEvent: function (e) {
          var t = document.createEvent('CustomEvent');
          t.initCustomEvent('outlineloaded', !0, !0, { outlineCount: e }),
            this.container.dispatchEvent(t);
        },
        _bindLink: function (e, t) {
          var n = this.linkService;
          if (1 == t.custom)
            (e.href = n.getCustomDestinationHash(t.dest)),
              (e.onclick = function (e) {
                return n.customNavigateTo(t.dest), !1;
              });
          else {
            if (t.url) return void PDFJS.addLinkAttributes(e, { url: t.url });
            (e.href = n.getDestinationHash(t.dest)),
              (e.onclick = function (e) {
                return n.navigateTo(t.dest), !1;
              });
          }
        },
        _addToggleButton: function (e) {
          var t = document.createElement('div');
          (t.className =
            this.outlineToggleClass + ' ' + this.outlineToggleHiddenClass),
            (t.onclick = function (n) {
              if (
                (n.stopPropagation(),
                t.classList.toggle(this.outlineToggleHiddenClass),
                n.shiftKey)
              ) {
                var i = !t.classList.contains(this.outlineToggleHiddenClass);
                this._toggleOutlineItem(e, i);
              }
            }.bind(this)),
            e.insertBefore(t, e.firstChild);
        },
        _toggleOutlineItem: function (e, t) {
          this.lastToggleIsShow = t;
          for (
            var n = e.querySelectorAll('.' + this.outlineToggleClass),
              i = 0,
              o = n.length;
            i < o;
            ++i
          )
            n[i].classList[t ? 'remove' : 'add'](this.outlineToggleHiddenClass);
        },
        toggleOutlineTree: function () {
          this.outline &&
            this._toggleOutlineItem(this.container, !this.lastToggleIsShow);
        },
        render: function (e) {
          var t = (e && e.outline) || null,
            n = 0;
          if ((this.outline && this.reset(), (this.outline = t), t)) {
            for (
              var i = document.createDocumentFragment(),
                o = [{ parent: i, items: this.outline }],
                a = !1;
              o.length > 0;

            )
              for (
                var r = o.shift(), s = r.custom, l = 0, c = r.items.length;
                l < c;
                l++
              ) {
                var d = r.items[l],
                  u = document.createElement('div');
                u.className = this.outlineItemClass;
                var p = document.createElement('a');
                if (
                  (null == d.custom && null != s && (d.custom = s),
                  this._bindLink(p, d),
                  (p.textContent = d.title.replace(/\x00/g, '')),
                  u.appendChild(p),
                  d.items && d.items.length > 0)
                ) {
                  (a = !0), this._addToggleButton(u);
                  var h = document.createElement('div');
                  (h.className = this.outlineItemClass + 's'),
                    u.appendChild(h),
                    o.push({ parent: h, custom: d.custom, items: d.items });
                }
                r.parent.appendChild(u), n++;
              }
            a &&
              (null != this.container.classList
                ? this.container.classList.add(this.outlineItemClass + 's')
                : null != this.container.className &&
                  (this.container.className += ' picWindow')),
              this.container.appendChild(i),
              this._dispatchEvent(n);
          }
        },
      }),
      e
    );
  })(),
  DFLightBox = (function (e) {
    function t(t, n) {
      this.duration = 300;
      var i = this;
      return (
        (i.lightboxWrapper = e('<div>').addClass('pdff-lightbox-wrapper')),
        (i.container = e('<div>')
          .addClass('pdff-container')
          .appendTo(i.lightboxWrapper)),
        (i.controls = e('<div>')
          .addClass('pdff-lightbox-controls')
          .appendTo(i.lightboxWrapper)),
        (i.closeButton = e('<div>')
          .addClass('pdff-lightbox-close pdff-ui-btn')
          .on('click', function () {
            $('body').css('overflow', 'visible'), i.close(t);
          })
          .appendTo(i.controls)),
        i.lightboxWrapper.append(i.container),
        i
      );
    }
    return (
      (t.prototype.show = function (t) {
        return (
          0 == this.lightboxWrapper.parent().length &&
            e('body').append(this.lightboxWrapper),
          this.lightboxWrapper.fadeIn(this.duration, t),
          this
        );
      }),
      (t.prototype.close = function (e) {
        return (
          this.lightboxWrapper.fadeOut(this.duration),
          setTimeout(e, this.duration),
          this
        );
      }),
      t
    );
  })(jQuery);
(pdfflip.Share = (function (e) {
  function t(t, n) {
    var i = this,
      o = '<div>',
      a = 'pdff-share-button',
      r = 'width=500,height=400';
    (i.isOpen = !1),
      (i.shareUrl = ''),
      (i.wrapper = e(
        '<div class="pdff-share-wrapper" style="display: none;">'
      ).on('click', function (e) {
        i.close();
      })),
      (i.box = e('<div class="pdff-share-box">')
        .on('click', function (e) {
          e.preventDefault(), e.stopPropagation();
        })
        .appendTo(i.wrapper)
        .html('<span class="pdff-share-title">' + n.text.share + '</span>')),
      (i.urlInput = e('<textarea class="pdff-share-url">').on(
        'click',
        function () {
          e(this).select();
        }
      )),
      (i.facebook = e(o, {
        class: a + ' pdff-share-facebook ' + n.icons.facebook,
      }).on('click', function (e) {
        window.open(
          'https://www.facebook.com/sharer/sharer.php?u=' +
            encodeURIComponent(i.shareUrl),
          'Sharer',
          r
        );
      })),
      (i.twitter = e(o, {
        class: a + ' pdff-share-twitter ' + n.icons.twitter,
      }).on('click', function (e) {
        window.open(
          'http://twitter.com/share?url=' + encodeURIComponent(i.shareUrl),
          'Sharer',
          r
        );
      })),
      (i.mail = e('<a>', {
        class: a + ' pdff-share-mail ' + n.icons.mail,
        href:
          'mailto:?subject=I wanted you to see this FlipBook&body=Check out this site ' +
          encodeURIComponent(i.shareUrl),
        target: '_blank',
      }).on('click', function (t) {
        e(this).attr(
          'href',
          'mailto:?subject=I wanted you to see this FlipBook&body=Check out this site ' +
            encodeURIComponent(i.shareUrl)
        ),
          t.stopPropagation();
      })),
      i.box
        .append(i.urlInput)
        .append(i.facebook)
        .append(i.google)
        .append(i.twitter)
        .append(i.mail),
      e(t).append(i.wrapper);
  }
  return (
    (t.prototype.show = function () {
      this.wrapper.fadeIn(300),
        this.urlInput.val(this.shareUrl),
        this.urlInput.trigger('click'),
        (this.isOpen = !0);
    }),
    (t.prototype.dispose = function () {
      var e = this;
      e.box.off(),
        e.google.off(),
        e.twitter.off(),
        e.facebook.off(),
        e.mail.off(),
        e.urlInput.off(),
        e.wrapper.off().remove();
    }),
    (t.prototype.close = function () {
      this.wrapper.fadeOut(300), (this.isOpen = !1);
    }),
    (t.prototype.update = function (e) {
      this.shareUrl = e;
    }),
    t
  );
})(jQuery)),
  (pdfflip.Popup = (function (e) {
    function t(t, n) {
      var i = this;
      (i.isOpen = !1),
        (i.wrapper = e(
          '<div class="pdff-popup-wrapper" style="display: none;">'
        ).on('click', function (e) {
          i.close();
        })),
        (i.box = e('<div class="pdff-popup-box">')
          .on('click', function (e) {
            e.preventDefault(), e.stopPropagation();
          })
          .appendTo(i.wrapper)),
        e(t).append(i.wrapper);
    }
    return (
      (t.prototype.show = function () {
        this.wrapper.fadeIn(300), (this.isOpen = !0);
      }),
      (t.prototype.dispose = function () {
        this.box.off(), this.wrapper.off().remove();
      }),
      (t.prototype.close = function () {
        this.wrapper.fadeOut(300), (this.isOpen = !1);
      }),
      t
    );
  })(jQuery));
var PDFLinkService = (function () {
  function e() {
    (this.baseUrl = null),
      (this.pdfDocument = null),
      (this.pdfViewer = null),
      (this.pdfHistory = null),
      (this._pagesRefCache = null);
  }
  return (
    (e.prototype = {
      dispose: function () {
        (this.baseUrl = null),
          (this.pdfDocument = null),
          (this.pdfViewer = null),
          (this.pdfHistory = null),
          (this._pagesRefCache = null);
      },
      setDocument: function (e, t) {
        (this.baseUrl = t),
          (this.pdfDocument = e),
          (this._pagesRefCache = Object.create(null));
      },
      setViewer: function (e) {
        this.pdfViewer = e;
      },
      setHistory: function (e) {
        this.pdfHistory = e;
      },
      get pagesCount() {
        return this.pdfDocument.numPages;
      },
      get page() {
        return this.pdfViewer.currentPageNumber;
      },
      set page(e) {
        this.pdfViewer.currentPageNumber = e;
      },
      navigateTo: function (e) {
        var t,
          n = '',
          i = this,
          o = function (t) {
            var a =
              t instanceof Object
                ? i._pagesRefCache[t.num + ' ' + t.gen + ' R']
                : t + 1;
            a
              ? (i.pdfViewer.contentProvider.options.pageSize ==
                  pdfflip.PAGE_SIZE.DOUBLEINTERNAL &&
                  a > 2 &&
                  (a = 2 * a - 1),
                a > i.pdfViewer.pageCount && (a = i.pdfViewer.pageCount),
                i.pdfViewer.gotoPage(a),
                i.pdfHistory &&
                  i.pdfHistory.push({ dest: e, hash: n, page: a }))
              : i.pdfDocument.getPageIndex(t).then(function (e) {
                  var n = e + 1,
                    a = t.num + ' ' + t.gen + ' R';
                  (i._pagesRefCache[a] = n), o(t);
                });
          };
        'string' == typeof e
          ? ((n = e), (t = this.pdfDocument.getDestination(e)))
          : (t = Promise.resolve(e)),
          t.then(function (t) {
            (e = t), t instanceof Array && o(t[0]);
          });
      },
      customNavigateTo: function (e) {
        if ('' != e && null != e && 'null' != e) {
          var t = null;
          if (isNaN(Math.round(e))) {
            if (
              'string' == typeof e &&
              ((t = parseInt(e.replace('#', ''), 10)), isNaN(t))
            )
              return void window.open(e);
          } else t = e;
          null != t && this.pdfViewer.gotoPage(t);
        }
      },
      getDestinationHash: function (e) {
        if ('string' == typeof e) return this.getAnchorUrl('#' + escape(e));
        if (e instanceof Array) {
          var t = e[0],
            n =
              t instanceof Object
                ? this._pagesRefCache[t.num + ' ' + t.gen + ' R']
                : t + 1;
          if (n) {
            var i = this.getAnchorUrl('#page=' + n),
              o = e[1];
            if ('object' == typeof o && 'name' in o && 'XYZ' === o.name) {
              var a = e[4] || this.pdfViewer.currentScaleValue,
                r = parseFloat(a);
              r && (a = 100 * r),
                (i += '&zoom=' + a),
                (e[2] || e[3]) && (i += ',' + (e[2] || 0) + ',' + (e[3] || 0));
            }
            return i;
          }
        }
        return this.getAnchorUrl('');
      },
      getCustomDestinationHash: function (e) {
        return '#' + escape(e);
      },
      getAnchorUrl: function (e) {
        return (this.baseUrl || '') + e;
      },
      setHash: function (e) {
        if (e.indexOf('=') >= 0) {
          var t,
            n,
            i = parseQueryString(e);
          if ('nameddest' in i)
            return (
              this.pdfHistory &&
                this.pdfHistory.updateNextHashParam(i.nameddest),
              void this.navigateTo(i.nameddest)
            );
          if (('page' in i && (t = 0 | i.page || 1), 'zoom' in i)) {
            var o = i.zoom.split(','),
              a = o[0],
              r = parseFloat(a);
            -1 === a.indexOf('Fit')
              ? (n = [
                  null,
                  { name: 'XYZ' },
                  o.length > 1 ? 0 | o[1] : null,
                  o.length > 2 ? 0 | o[2] : null,
                  r ? r / 100 : a,
                ])
              : 'Fit' === a || 'FitB' === a
              ? (n = [null, { name: a }])
              : 'FitH' === a || 'FitBH' === a || 'FitV' === a || 'FitBV' === a
              ? (n = [null, { name: a }, o.length > 1 ? 0 | o[1] : null])
              : 'FitR' === a
              ? 5 !== o.length
                ? console.error(
                    "PDFLinkService_setHash: Not enough parameters for 'FitR'."
                  )
                : (n = [
                    null,
                    { name: a },
                    0 | o[1],
                    0 | o[2],
                    0 | o[3],
                    0 | o[4],
                  ])
              : console.error(
                  "PDFLinkService_setHash: '" +
                    a +
                    "' is not a valid zoom value."
                );
          }
          if (
            (n
              ? this.pdfViewer.scrollPageIntoView(t || this.page, n)
              : t && (this.page = t),
            'pagemode' in i)
          ) {
            var s = document.createEvent('CustomEvent');
            s.initCustomEvent('pagemode', !0, !0, { mode: i.pagemode }),
              this.pdfViewer.container.dispatchEvent(s);
          }
        } else
          /^\d+$/.test(e)
            ? (this.page = e)
            : (this.pdfHistory &&
                this.pdfHistory.updateNextHashParam(unescape(e)),
              this.navigateTo(unescape(e)));
      },
      executeNamedAction: function (e) {
        switch (e) {
          case 'GoBack':
            this.pdfHistory && this.pdfHistory.back();
            break;
          case 'GoForward':
            this.pdfHistory && this.pdfHistory.forward();
            break;
          case 'NextPage':
            this.page++;
            break;
          case 'PrevPage':
            this.page--;
            break;
          case 'LastPage':
            this.page = this.pagesCount;
            break;
          case 'FirstPage':
            this.page = 1;
        }
        var t = document.createEvent('CustomEvent');
        t.initCustomEvent('namedaction', !0, !0, { action: e }),
          this.pdfViewer.container.dispatchEvent(t);
      },
      cachePageRef: function (e, t) {
        var n = t.num + ' ' + t.gen + ' R';
        this._pagesRefCache[n] = e;
      },
    }),
    e
  );
})();
(pdfflip.TextLayerBuilder = (function () {
  function e(e) {
    (this.textLayerDiv = e.textLayerDiv),
      (this.renderingDone = !1),
      (this.divContentDone = !1),
      (this.pageIdx = e.pageIndex),
      (this.pageNumber = this.pageIdx + 1),
      (this.matches = []),
      (this.viewport = e.viewport),
      (this.textDivs = []),
      (this.findController = e.findController || null),
      (this.textLayerRenderTask = null),
      (this.enhanceTextSelection = e.enhanceTextSelection),
      this._bindMouse();
  }
  return (
    (e.prototype = {
      _finishRendering: function () {
        if (((this.renderingDone = !0), !this.enhanceTextSelection)) {
          var e = document.createElement('div');
          (e.className = 'endOfContent'), this.textLayerDiv.appendChild(e);
        }
      },
      render: function (e) {
        if (this.divContentDone && !this.renderingDone) {
          this.textLayerRenderTask &&
            (this.textLayerRenderTask.cancel(),
            (this.textLayerRenderTask = null)),
            (this.textDivs = []);
          var t = document.createDocumentFragment();
          (this.textLayerRenderTask = PDFJS.renderTextLayer({
            textContent: this.textContent,
            container: t,
            viewport: this.viewport,
            textDivs: this.textDivs,
            timeout: e,
            enhanceTextSelection: this.enhanceTextSelection,
          })),
            this.textLayerRenderTask.promise.then(
              function () {
                this.textLayerDiv.appendChild(t),
                  this._finishRendering(),
                  this.updateMatches();
              }.bind(this),
              function (e) {}
            );
        }
      },
      setTextContent: function (e) {
        this.textLayerRenderTask &&
          (this.textLayerRenderTask.cancel(),
          (this.textLayerRenderTask = null)),
          (this.textContent = e),
          (this.divContentDone = !0);
      },
      convertMatches: function (e, t) {
        var n = 0,
          i = 0,
          o = this.textContent.items,
          a = o.length - 1,
          r =
            null === this.findController
              ? 0
              : this.findController.state.query.length,
          s = [];
        if (!e) return s;
        for (var l = 0, c = e.length; l < c; l++) {
          for (var d = e[l]; n !== a && d >= i + o[n].str.length; )
            (i += o[n].str.length), n++;
          n === o.length && console.error('Could not find a matching mapping');
          var u = { begin: { divIdx: n, offset: d - i } };
          for (d += t ? t[l] : r; n !== a && d > i + o[n].str.length; )
            (i += o[n].str.length), n++;
          (u.end = { divIdx: n, offset: d - i }), s.push(u);
        }
        return s;
      },
      renderMatches: function (e) {
        if (0 !== e.length) {
          var t = this.textContent.items,
            n = this.textDivs,
            i = null,
            o = this.pageIdx,
            a =
              null !== this.findController &&
              o === this.findController.selected.pageIdx,
            r =
              null === this.findController
                ? -1
                : this.findController.selected.matchIdx,
            s = void 0,
            l = r,
            c = l + 1;
          if (
            null !== this.findController &&
            this.findController.state.highlightAll
          )
            (l = 0), (c = e.length);
          else if (!a) return;
          for (var d = l; d < c; d++) {
            var u = e[d],
              p = u.begin,
              h = u.end,
              f = a && d === r ? ' selected' : '';
            if (
              (this.findController &&
                this.findController.updateMatchPosition(o, d, n, p.divIdx),
              i && p.divIdx === i.divIdx
                ? b(i.divIdx, i.offset, p.offset)
                : (null !== i && b(i.divIdx, i.offset, s), v(p)),
              p.divIdx === h.divIdx)
            )
              b(p.divIdx, p.offset, h.offset, 'highlight' + f);
            else {
              b(p.divIdx, p.offset, s, 'highlight begin' + f);
              for (var g = p.divIdx + 1, m = h.divIdx; g < m; g++)
                n[g].className = 'highlight middle' + f;
              v(h, 'highlight end' + f);
            }
            i = h;
          }
          i && b(i.divIdx, i.offset, s);
        }
        function v(e, t) {
          var i = e.divIdx;
          (n[i].textContent = ''), b(i, 0, e.offset, t);
        }
        function b(e, i, o, a) {
          var r = n[e],
            s = t[e].str.substring(i, o),
            l = document.createTextNode(s);
          if (a) {
            var c = document.createElement('span');
            return (c.className = a), c.appendChild(l), void r.appendChild(c);
          }
          r.appendChild(l);
        }
      },
      updateMatches: function () {
        if (this.renderingDone) {
          for (
            var e,
              t,
              n = this.matches,
              i = this.textDivs,
              o = this.textContent.items,
              a = -1,
              r = 0,
              s = n.length;
            r < s;
            r++
          ) {
            for (
              var l = n[r], c = Math.max(a, l.begin.divIdx), d = l.end.divIdx;
              c <= d;
              c++
            ) {
              var u = i[c];
              (u.textContent = o[c].str), (u.className = '');
            }
            a = l.end.divIdx + 1;
          }
          null !== this.findController &&
            this.findController.active &&
            (null !== this.findController &&
              ((e = this.findController.pageMatches[this.pageIdx] || null),
              (t =
                (this.findController.pageMatchesLength &&
                  this.findController.pageMatchesLength[this.pageIdx]) ||
                null)),
            (this.matches = this.convertMatches(e, t)),
            this.renderMatches(this.matches));
        }
      },
      _bindMouse: function () {
        var e = this.textLayerDiv,
          t = this;
        e.addEventListener('mousedown', function (n) {
          if (t.enhanceTextSelection && t.textLayerRenderTask)
            t.textLayerRenderTask.expandTextDivs(!0);
          else {
            var i = e.querySelector('.endOfContent');
            if (i) {
              var o = n.target !== e;
              if (
                (o =
                  o &&
                  'none' !==
                    window
                      .getComputedStyle(i)
                      .getPropertyValue('-moz-user-select'))
              ) {
                var a = e.getBoundingClientRect(),
                  r = Math.max(0, (n.pageY - a.top) / a.height);
                i.style.top = (100 * r).toFixed(2) + '%';
              }
              i.classList.add('active');
            }
          }
        }),
          e.addEventListener('mouseup', function (n) {
            if (t.enhanceTextSelection && t.textLayerRenderTask)
              t.textLayerRenderTask.expandTextDivs(!1);
            else {
              var i = e.querySelector('.endOfContent');
              i && ((i.style.top = ''), i.classList.remove('active'));
            }
          });
      },
    }),
    e
  );
})()),
  (pdfflip.ConvertPageLinks = function () {
    for (
      var e,
        t = arguments[0] / 100,
        n = arguments[1] / 100,
        i = function (e, i, o, a, r) {
          return { x: e / t, y: i / n, w: o / t, h: a / n, dest: r };
        },
        o = [],
        a = 2;
      a < arguments.length;
      a++
    )
      (e = arguments[a]), (o[a - 2] = i.apply(this, e));
    return o;
  }),
  (pdfflip.parseLinks = function (e) {
    var t;
    if (null != e && e.length > 0)
      for (var n = 0; n < e.length; n++)
        null != (t = e[n]) &&
          null != t[0] &&
          null == t[0].dest &&
          ((t = pdfflip.ConvertPageLinks.apply(this, t)), (e[n] = t));
    return e;
  }),
  (function (e) {
    function t(e) {
      return 'true' == e || 1 == e;
    }
    function n(e) {
      null != e.webgl && (e.webgl = t(e.webgl)),
        null != e.downloadEnable && (e.downloadEnable = t(e.downloadEnable)),
        null != e.scrollWheel && (e.scrollWheel = t(e.scrollWheel)),
        null != e.autoEnableOutline &&
          (e.autoEnableOutline = t(e.autoEnableOutline)),
        null != e.autoEnableThumbnail &&
          (e.autoEnableThumbnail = t(e.autoEnableThumbnail)),
        null != e.transparent && (e.transparent = t(e.transparent)),
        null != e.overwritePDFOutline &&
          (e.overwritePDFOutline = t(e.overwritePDFOutline)),
        null != e.enableSound && (e.enableSound = t(e.enableSound)),
        null != e.forceFit && (e.forceFit = t(e.forceFit)),
        null != e.enableAnnotation &&
          (e.enableAnnotation = t(e.enableAnnotation)),
        null != e.webglShadow && (e.webglShadow = t(e.webglShadow)),
        null != e.autoPlay && (e.autoPlay = t(e.autoPlay)),
        null != e.autoPlayStart && (e.autoPlayStart = t(e.autoPlayStart)),
        null != e.paddingTop && (e.paddingTop = parseInt(e.paddingTop, 10)),
        null != e.paddingRight &&
          (e.paddingRight = parseInt(e.paddingRight, 10)),
        null != e.paddingBottom &&
          (e.paddingBottom = parseInt(e.paddingBottom, 10)),
        null != e.paddingLeft && (e.paddingLeft = parseInt(e.paddingLeft, 10)),
        null != e.zoomRatio && (e.zoomRatio = parseFloat(e.zoomRatio, 10)),
        null != e.stiffness && (e.stiffness = parseFloat(e.stiffness, 10)),
        null != e.autoPlayDuration &&
          (e.autoPlayDuration = parseInt(e.autoPlayDuration, 10)),
        (0 != e.pageMode && '0' != e.pageMode) || (e.pageMode = null),
        (0 != e.singlePageMode && '0' != e.singlePageMode) ||
          (e.singlePageMode = null);
    }
    (pdfflip.getOptions = function (t) {
      var i = 'option_' + (t = e(t)).attr('id'),
        o = t.attr('source') || t.attr('pdff-source');
      (i = null == i || '' == i || null == window[i] ? {} : window[i]).source =
        null == o || '' == o ? i.source : o;
      var a = {
        webgl: t.attr('webgl'),
        height: t.attr('height'),
        enableSound: t.attr('sound'),
        transparent: t.attr('transparent'),
        downloadEnable: t.attr('download'),
        duration: t.attr('duration'),
        hard: t.attr('hard'),
        pageMode: t.attr('pagemode'),
        direction: t.attr('direction'),
        backgroundColor: t.attr('backgroundcolor'),
        scrollWheel: t.attr('scrollwheel'),
        backgroundImage: t.attr('backgroundimage'),
        paddingTop: t.attr('paddingtop'),
        paddingRight: t.attr('paddingright'),
        paddingBottom: t.attr('paddingbottom'),
        paddingLeft: t.attr('paddingleft'),
        wpOptions: t.attr('wpoptions'),
      };
      return (
        (function (e) {
          if (1 != e.parsed) {
            e.parsed = !0;
            var t = [];
            if (
              (n(e),
              'undefined' != typeof pdfflipWPGlobal && 'true' == e.wpOptions)
            ) {
              try {
                for (var i in e.links) {
                  for (
                    var o = e.links[i], a = [100, 100], r = 0;
                    r < o.length;
                    r++
                  ) {
                    for (
                      var s = o[r].substr(1).slice(0, -1).split(','),
                        l = [],
                        c = 0;
                      c < 5;
                      c++
                    )
                      l[c] = s[c];
                    a.push(l);
                  }
                  t[parseInt(i, 10) + 1] = a;
                }
              } catch (e) {
                console.error(e.stack);
              }
              e.links = pdfflip.parseLinks(t);
            } else e.links = pdfflip.parseLinks(e.links);
          }
        })((i = e.extend(!0, {}, i, a))),
        i
      );
    }),
      (pdfflip.parseBooks = function () {
        e('._PDFF_btt, ._pdff_thumb, ._PDFF_link, .PDFFlip').each(function () {
          var t = e(this);
          if ('true' !== (t.attr('parsed') || t.attr('pdff-parsed')))
            if ((t.attr('pdff-parsed', 'true'), t.hasClass('PDFFlip'))) {
              var n = t.attr('id'),
                i = t.attr('slug'),
                o = pdfflip.getOptions(t);
              (o.id = n),
                null != i && (o.slug = i),
                n
                  ? (window[n.toString()] = e(t).flipBook(o.source, o))
                  : e(t).flipBook(o.source, o);
            } else if (t.hasClass('_pdff_thumb')) {
              var a = e("<div class='PDFFlip-cover'>"),
                r = t.html().trim();
              t.html(''), e("<span class='PDFFlip-title'>").html(r).appendTo(a);
              var s = t.attr('thumb') || t.attr('pdff-thumb'),
                l =
                  t.attr('thumbtype') || pdfflip.defaults.thumbElement || 'div',
                c = t.attr('tags') || t.attr('pdff-tags');
              if (c && (c = c.split(',')).length > 0)
                for (var d = 0; d < c.length; d++)
                  t.append("<span class='PDFFlip-tag'>" + c[d] + '</span>');
              null != s && '' != s.toString().trim()
                ? 'img' == l
                  ? (a.append('<img src="' + s + '" alt="' + r + '"/>'),
                    t.attr('thumb-type', 'img'))
                  : a.css({ backgroundImage: 'url(' + s + ')' })
                : a.addClass('_pdff_thumb-not-found'),
                t.append(a);
            }
        });
      }),
      e(document).ready(function () {
        if (
          ('undefined' == typeof pdfflipLocation &&
            0 != pdfflip.autoDetectLocation &&
            e('script').each(function () {
              var t = e(this)[0].src;
              if (
                (t.indexOf('/pdfflip.js') > -1 ||
                  t.indexOf('/pdfflip.min.js') > -1) &&
                (t.indexOf('https://') > -1 || t.indexOf('http://') > -1) &&
                t.indexOf('js/pdfflip.') > -1
              ) {
                var n = t.split('/');
                window.pdfflipLocation = n.slice(0, -2).join('/');
              }
            }),
          'undefined' != typeof pdfflipLocation &&
            (pdfflipLocation.length > 2 &&
              '/' !== pdfflipLocation.slice(-1) &&
              (window.pdfflipLocation += '/'),
            (pdfflip.defaults.utilsSrc =
              pdfflipLocation + 'js/libs/utils.min.js'),
            (pdfflip.defaults.pdfjsSrc =
              pdfflipLocation + 'js/libs/pdf.min.js'),
            (pdfflip.defaults.pdfjsCompatibilitySrc =
              pdfflipLocation + 'js/libs/compatibility.js'),
            (pdfflip.defaults.threejsSrc =
              pdfflipLocation + 'js/libs/three.min.js'),
            (pdfflip.defaults.pdfjsWorkerSrc =
              pdfflipLocation + 'js/libs/pdf.worker.min.js'),
            (pdfflip.defaults.soundFile = pdfflipLocation + 'sound/turn.mp3'),
            (pdfflip.defaults.imagesLocation = pdfflipLocation + 'images'),
            (pdfflip.defaults.imageResourcesPath =
              pdfflipLocation + 'images/pdfjs/'),
            (pdfflip.defaults.cMapUrl = pdfflipLocation + 'js/libs/cmaps/'),
            'undefined' != typeof pdfflipWPGlobal &&
              (n(pdfflipWPGlobal),
              e.extend(pdfflip.defaults, pdfflipWPGlobal))),
          (pdfflip.preParseHash = window.location.hash),
          pdfflip.parseBooks(),
          e('body').on(
            'click',
            '._PDFF_btt, ._pdff_thumb, ._PDFF_link',
            function () {
              $('body').css('overflow', 'hidden');
              var t = e(this);
              window.dfLightBox ||
                (window.dfLightBox = new DFLightBox(function () {
                  0 == window.location.hash.indexOf('#pdfflip-') &&
                    (window.location.hash = '#_'),
                    window.dfActiveLightBoxBook.dispose(),
                    (window.dfActiveLightBoxBook = null);
                })),
                (window.dfLightBox.duration = 500),
                window.dfActiveLightBoxBook &&
                window.dfActiveLightBoxBook.dispose
                  ? window.dfActiveLightBoxBook.dispose()
                  : window.dfLightBox.show(function () {
                      var n = pdfflip.getOptions(t);
                      (n.transparent = !1), (n.id = t.attr('id'));
                      var i = t.attr('slug');
                      null != i && (n.slug = i),
                        (n.isLightBox = !0),
                        (window.dfActiveLightBoxBook = e(
                          window.dfLightBox.container
                        ).flipBook(n.source, n));
                    });
            }
          ),
          (pdfflip.utils.isSafari || pdfflip.utils.isIOS) &&
            e('body').addClass('pdff-webkit'),
          pdfflip.preParseHash && pdfflip.preParseHash.indexOf('pdfflip-') >= 0)
        ) {
          var t,
            i = pdfflip.preParseHash.split('pdfflip-')[1].split('/')[0],
            o = pdfflip.preParseHash.split('pdfflip-')[1].split('/')[1];
          null != o && (o = o.split('/')[0]),
            0 == (t = e('[slug=' + i + ']')).length && (t = e('#' + i)),
            t.length > 0 &&
              (null != o && t.data('page', o),
              t.is('._PDFF_btt, ._pdff_thumb, ._PDFF_link') &&
                t.trigger('click'));
        }
        e('body').on('click', '.pdff-ui-sidemenu-close', function () {
          e(this)
            .closest('.pdff-container')
            .find(
              '.pdff-ui-outline.pdff-active , .pdff-ui-thumbnail.pdff-active'
            )
            .trigger('click');
        });
      });
  })(jQuery);
