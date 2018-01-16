var $jscomp = {
    scope: {}
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(d, p, v) {
    if (v.get || v.set) throw new TypeError("ES3 does not support getters and setters.");
    d != Array.prototype && d != Object.prototype && (d[p] = v.value)
};
$jscomp.getGlobal = function(d) {
    return "undefined" != typeof window && window === d ? d : "undefined" != typeof global ? global : d
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {};
    $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(d) {
    return $jscomp.SYMBOL_PREFIX + (d || "") + $jscomp.symbolCounter_++
};
$jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var d = $jscomp.global.Symbol.iterator;
    d || (d = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
    "function" != typeof Array.prototype[d] && $jscomp.defineProperty(Array.prototype, d, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.arrayIterator(this)
        }
    });
    $jscomp.initSymbolIterator = function() {}
};
$jscomp.arrayIterator = function(d) {
    var p = 0;
    return $jscomp.iteratorPrototype(function() {
        return p < d.length ? {
            done: !1,
            value: d[p++]
        } : {
            done: !0
        }
    })
};
$jscomp.iteratorPrototype = function(d) {
    $jscomp.initSymbolIterator();
    d = {
        next: d
    };
    d[$jscomp.global.Symbol.iterator] = function() {
        return this
    };
    return d
};
$jscomp.polyfill = function(d, p, v, u) {
    if (p) {
        v = $jscomp.global;
        d = d.split(".");
        for (u = 0; u < d.length - 1; u++) {
            var z = d[u];
            z in v || (v[z] = {});
            v = v[z]
        }
        d = d[d.length - 1];
        u = v[d];
        p = p(u);
        p != u && null != p && $jscomp.defineProperty(v, d, {
            configurable: !0,
            writable: !0,
            value: p
        })
    }
};
$jscomp.polyfill("Number.EPSILON", function(d) {
    return Math.pow(2, -52)
}, "es6-impl", "es3");
$jscomp.polyfill("Math.sign", function(d) {
    return d ? d : function(d) {
        d = Number(d);
        return 0 === d || isNaN(d) ? d : 0 < d ? 1 : -1
    }
}, "es6-impl", "es3");
$jscomp.owns = function(d, p) {
    return Object.prototype.hasOwnProperty.call(d, p)
};
$jscomp.polyfill("Object.assign", function(d) {
    return d ? d : function(d, v) {
        for (var u = 1; u < arguments.length; u++) {
            var z = arguments[u];
            if (z)
                for (var x in z) $jscomp.owns(z, x) && (d[x] = z[x])
        }
        return d
    }
}, "es6-impl", "es3");
$jscomp.checkStringArgs = function(d, p, v) {
    if (null == d) throw new TypeError("The 'this' value for String.prototype." + v + " must not be null or undefined");
    if (p instanceof RegExp) throw new TypeError("First argument to String.prototype." + v + " must not be a regular expression");
    return d + ""
};
$jscomp.polyfill("String.prototype.repeat", function(d) {
    return d ? d : function(d) {
        var v = $jscomp.checkStringArgs(this, null, "repeat");
        if (0 > d || 1342177279 < d) throw new RangeError("Invalid count value");
        d |= 0;
        for (var u = ""; d;)
            if (d & 1 && (u += v), d >>>= 1) v += v;
        return u
    }
}, "es6-impl", "es3");
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function(d, p) {
    $jscomp.initSymbolIterator();
    d instanceof String && (d += "");
    var v = 0,
        u = {
            next: function() {
                if (v < d.length) {
                    var z = v++;
                    return {
                        value: p(z, d[z]),
                        done: !1
                    }
                }
                u.next = function() {
                    return {
                        done: !0,
                        value: void 0
                    }
                };
                return u.next()
            }
        };
    u[Symbol.iterator] = function() {
        return u
    };
    return u
};
$jscomp.polyfill("Array.prototype.values", function(d) {
    return d ? d : function() {
        return $jscomp.iteratorFromArray(this, function(d, v) {
            return v
        })
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.keys", function(d) {
    return d ? d : function() {
        return $jscomp.iteratorFromArray(this, function(d) {
            return d
        })
    }
}, "es6-impl", "es3");
$jscomp.polyfill("Number.isFinite", function(d) {
    return d ? d : function(d) {
        return "number" !== typeof d ? !1 : !isNaN(d) && Infinity !== d && -Infinity !== d
    }
}, "es6-impl", "es3");
$jscomp.polyfill("Number.isInteger", function(d) {
    return d ? d : function(d) {
        return Number.isFinite(d) ? d === Math.floor(d) : !1
    }
}, "es6-impl", "es3");
$jscomp.findInternal = function(d, p, v) {
    d instanceof String && (d = String(d));
    for (var u = d.length, z = 0; z < u; z++) {
        var x = d[z];
        if (p.call(v, x, z, d)) return {
            i: z,
            v: x
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.polyfill("Array.prototype.find", function(d) {
    return d ? d : function(d, v) {
        return $jscomp.findInternal(this, d, v).v
    }
}, "es6-impl", "es3");
(function(d, p) {
    "object" === typeof exports && "undefined" !== typeof module ? p(exports) : "function" === typeof define && define.amd ? define(["exports"], p) : p(d.THREE = d.THREE || {})
})(this, function(d) {
    function p() {}

    function v(a, b) {
        this.x = a || 0;
        this.y = b || 0
    }

    function u(a, b, e, f, q, D, C, c, k, g) {
        Object.defineProperty(this, "id", {
            value: ve++
        });
        this.uuid = d.Math.generateUUID();
        this.sourceFile = this.name = "";
        this.image = void 0 !== a ? a : u.DEFAULT_IMAGE;
        this.mipmaps = [];
        this.mapping = void 0 !== b ? b : u.DEFAULT_MAPPING;
        this.wrapS = void 0 !== e ? e :
            1001;
        this.wrapT = void 0 !== f ? f : 1001;
        this.magFilter = void 0 !== q ? q : 1006;
        this.minFilter = void 0 !== D ? D : 1008;
        this.anisotropy = void 0 !== k ? k : 1;
        this.format = void 0 !== C ? C : 1023;
        this.type = void 0 !== c ? c : 1009;
        this.offset = new v(0, 0);
        this.repeat = new v(1, 1);
        this.generateMipmaps = !0;
        this.premultiplyAlpha = !1;
        this.flipY = !0;
        this.unpackAlignment = 4;
        this.encoding = void 0 !== g ? g : 3E3;
        this.version = 0;
        this.onUpdate = null
    }

    function z() {
        this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        0 < arguments.length && console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
    }

    function x(a, b, e, f) {
        this._x = a || 0;
        this._y = b || 0;
        this._z = e || 0;
        this._w = void 0 !== f ? f : 1
    }

    function r(a, b, e) {
        this.x = a || 0;
        this.y = b || 0;
        this.z = e || 0
    }

    function Q(a, b) {
        var e, f, q, D, C, c, d, k, g, h, y, l, m, n, w, t, pa;

        function nd(a, b) {
            return a.renderOrder !== b.renderOrder ? a.renderOrder - b.renderOrder : a.z !== b.z ? b.z - a.z : b.id - a.id
        }
        var S = a.context,
            A = a.state,
            ab, v, p, z, E = new r,
            B = new x,
            O = new r;
        this.render = function(r, x) {
            if (0 !== b.length) {
                if (void 0 === p) {
                    var H = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]),
                        T = new Uint16Array([0,
                            1, 2, 0, 2, 3
                        ]);
                    ab = S.createBuffer();
                    v = S.createBuffer();
                    S.bindBuffer(S.ARRAY_BUFFER, ab);
                    S.bufferData(S.ARRAY_BUFFER, H, S.STATIC_DRAW);
                    S.bindBuffer(S.ELEMENT_ARRAY_BUFFER, v);
                    S.bufferData(S.ELEMENT_ARRAY_BUFFER, T, S.STATIC_DRAW);
                    var H = S.createProgram(),
                        T = S.createShader(S.VERTEX_SHADER),
                        N = S.createShader(S.FRAGMENT_SHADER);
                    S.shaderSource(T, ["precision " + a.getPrecision() + " float;", "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position * scale;\nvec2 rotatedPosition;\nrotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\nrotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\nvec4 finalPosition;\nfinalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition;\nfinalPosition = projectionMatrix * finalPosition;\ngl_Position = finalPosition;\n}"].join("\n"));
                    S.shaderSource(N, ["precision " + a.getPrecision() + " float;", "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"].join("\n"));
                    S.compileShader(T);
                    S.compileShader(N);
                    S.attachShader(H, T);
                    S.attachShader(H, N);
                    S.linkProgram(H);
                    p = H;
                    t = S.getAttribLocation(p, "position");
                    pa = S.getAttribLocation(p, "uv");
                    e = S.getUniformLocation(p, "uvOffset");
                    f = S.getUniformLocation(p, "uvScale");
                    q = S.getUniformLocation(p, "rotation");
                    D = S.getUniformLocation(p, "scale");
                    C = S.getUniformLocation(p, "color");
                    c = S.getUniformLocation(p, "map");
                    d = S.getUniformLocation(p, "opacity");
                    k = S.getUniformLocation(p, "modelViewMatrix");
                    g = S.getUniformLocation(p, "projectionMatrix");
                    h = S.getUniformLocation(p, "fogType");
                    y = S.getUniformLocation(p, "fogDensity");
                    l = S.getUniformLocation(p, "fogNear");
                    m = S.getUniformLocation(p, "fogFar");
                    n = S.getUniformLocation(p, "fogColor");
                    w = S.getUniformLocation(p, "alphaTest");
                    H = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                    H.width = 8;
                    H.height = 8;
                    T = H.getContext("2d");
                    T.fillStyle = "white";
                    T.fillRect(0, 0, 8, 8);
                    z = new u(H);
                    z.needsUpdate = !0
                }
                S.useProgram(p);
                A.initAttributes();
                A.enableAttribute(t);
                A.enableAttribute(pa);
                A.disableUnusedAttributes();
                A.disable(S.CULL_FACE);
                A.enable(S.BLEND);
                S.bindBuffer(S.ARRAY_BUFFER, ab);
                S.vertexAttribPointer(t, 2, S.FLOAT, !1, 16, 0);
                S.vertexAttribPointer(pa, 2, S.FLOAT, !1, 16, 8);
                S.bindBuffer(S.ELEMENT_ARRAY_BUFFER, v);
                S.uniformMatrix4fv(g, !1, x.projectionMatrix.elements);
                A.activeTexture(S.TEXTURE0);
                S.uniform1i(c, 0);
                T = H = 0;
                (N = r.fog) ? (S.uniform3f(n, N.color.r, N.color.g, N.color.b), N && N.isFog ? (S.uniform1f(l, N.near), S.uniform1f(m, N.far), S.uniform1i(h, 1), T = H = 1) : N && N.isFogExp2 && (S.uniform1f(y, N.density), S.uniform1i(h, 2), T = H =
                    2)) : (S.uniform1i(h, 0), T = H = 0);
                for (var N = 0, Y = b.length; N < Y; N++) {
                    var L = b[N];
                    L.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse, L.matrixWorld);
                    L.z = -L.modelViewMatrix.elements[14]
                }
                b.sort(nd);
                x = [];
                N = 0;
                for (Y = b.length; N < Y; N++) {
                    var L = b[N],
                        ca = L.material;
                    !1 !== ca.visible && (S.uniform1f(w, ca.alphaTest), S.uniformMatrix4fv(k, !1, L.modelViewMatrix.elements), L.matrixWorld.decompose(E, B, O), x[0] = O.x, x[1] = O.y, L = 0, r.fog && ca.fog && (L = T), H !== L && (S.uniform1i(h, L), H = L), null !== ca.map ? (S.uniform2f(e, ca.map.offset.x, ca.map.offset.y),
                        S.uniform2f(f, ca.map.repeat.x, ca.map.repeat.y)) : (S.uniform2f(e, 0, 0), S.uniform2f(f, 1, 1)), S.uniform1f(d, ca.opacity), S.uniform3f(C, ca.color.r, ca.color.g, ca.color.b), S.uniform1f(q, ca.rotation), S.uniform2fv(D, x), A.setBlending(ca.blending, ca.blendEquation, ca.blendSrc, ca.blendDst), A.setDepthTest(ca.depthTest), A.setDepthWrite(ca.depthWrite), ca.map ? a.setTexture2D(ca.map, 0) : a.setTexture2D(z, 0), S.drawElements(S.TRIANGLES, 6, S.UNSIGNED_SHORT, 0))
                }
                A.enable(S.CULL_FACE);
                a.resetGLState()
            }
        }
    }

    function R(a, b) {
        this.min =
            void 0 !== a ? a : new v(Infinity, Infinity);
        this.max = void 0 !== b ? b : new v(-Infinity, -Infinity)
    }

    function da(a, b) {
        var e, f, q, D, C, c, d, k, g, h, y = a.context,
            l = a.state,
            m, n, w, t, pa, nd;
        this.render = function(S, p, ab) {
            if (0 !== b.length) {
                S = new r;
                var A = ab.w / ab.z,
                    z = .5 * ab.z,
                    u = .5 * ab.w,
                    E = 16 / ab.w,
                    B = new v(E * A, E),
                    H = new r(1, 1, 0),
                    T = new v(1, 1),
                    x = new R;
                x.min.set(0, 0);
                x.max.set(ab.z - 16, ab.w - 16);
                if (void 0 === t) {
                    var E = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1]),
                        O = new Uint16Array([0, 1, 2, 0, 2, 3]);
                    m = y.createBuffer();
                    n = y.createBuffer();
                    y.bindBuffer(y.ARRAY_BUFFER, m);
                    y.bufferData(y.ARRAY_BUFFER, E, y.STATIC_DRAW);
                    y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, n);
                    y.bufferData(y.ELEMENT_ARRAY_BUFFER, O, y.STATIC_DRAW);
                    pa = y.createTexture();
                    nd = y.createTexture();
                    l.bindTexture(y.TEXTURE_2D, pa);
                    y.texImage2D(y.TEXTURE_2D, 0, y.RGB, 16, 16, 0, y.RGB, y.UNSIGNED_BYTE, null);
                    y.texParameteri(y.TEXTURE_2D, y.TEXTURE_WRAP_S, y.CLAMP_TO_EDGE);
                    y.texParameteri(y.TEXTURE_2D, y.TEXTURE_WRAP_T, y.CLAMP_TO_EDGE);
                    y.texParameteri(y.TEXTURE_2D, y.TEXTURE_MAG_FILTER, y.NEAREST);
                    y.texParameteri(y.TEXTURE_2D,
                        y.TEXTURE_MIN_FILTER, y.NEAREST);
                    l.bindTexture(y.TEXTURE_2D, nd);
                    y.texImage2D(y.TEXTURE_2D, 0, y.RGBA, 16, 16, 0, y.RGBA, y.UNSIGNED_BYTE, null);
                    y.texParameteri(y.TEXTURE_2D, y.TEXTURE_WRAP_S, y.CLAMP_TO_EDGE);
                    y.texParameteri(y.TEXTURE_2D, y.TEXTURE_WRAP_T, y.CLAMP_TO_EDGE);
                    y.texParameteri(y.TEXTURE_2D, y.TEXTURE_MAG_FILTER, y.NEAREST);
                    y.texParameteri(y.TEXTURE_2D, y.TEXTURE_MIN_FILTER, y.NEAREST);
                    var E = w = {
                            vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif ( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );\nvisibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility =        visibility.r / 9.0;\nvVisibility *= 1.0 - visibility.g / 9.0;\nvVisibility *=       visibility.b / 9.0;\nvVisibility *= 1.0 - visibility.a / 9.0;\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
                            fragmentShader: "uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif ( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if ( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
                        },
                        O = y.createProgram(),
                        N = y.createShader(y.FRAGMENT_SHADER),
                        L = y.createShader(y.VERTEX_SHADER),
                        Y = "precision " + a.getPrecision() + " float;\n";
                    y.shaderSource(N, Y + E.fragmentShader);
                    y.shaderSource(L, Y + E.vertexShader);
                    y.compileShader(N);
                    y.compileShader(L);
                    y.attachShader(O, N);
                    y.attachShader(O, L);
                    y.linkProgram(O);
                    t = O;
                    g = y.getAttribLocation(t, "position");
                    h = y.getAttribLocation(t, "uv");
                    e = y.getUniformLocation(t, "renderType");
                    f = y.getUniformLocation(t, "map");
                    q = y.getUniformLocation(t, "occlusionMap");
                    D = y.getUniformLocation(t, "opacity");
                    C = y.getUniformLocation(t, "color");
                    c = y.getUniformLocation(t,
                        "scale");
                    d = y.getUniformLocation(t, "rotation");
                    k = y.getUniformLocation(t, "screenPosition")
                }
                y.useProgram(t);
                l.initAttributes();
                l.enableAttribute(g);
                l.enableAttribute(h);
                l.disableUnusedAttributes();
                y.uniform1i(q, 0);
                y.uniform1i(f, 1);
                y.bindBuffer(y.ARRAY_BUFFER, m);
                y.vertexAttribPointer(g, 2, y.FLOAT, !1, 16, 0);
                y.vertexAttribPointer(h, 2, y.FLOAT, !1, 16, 8);
                y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, n);
                l.disable(y.CULL_FACE);
                l.setDepthWrite(!1);
                O = 0;
                for (N = b.length; O < N; O++)
                    if (E = 16 / ab.w, B.set(E * A, E), L = b[O], S.set(L.matrixWorld.elements[12],
                            L.matrixWorld.elements[13], L.matrixWorld.elements[14]), S.applyMatrix4(p.matrixWorldInverse), S.applyProjection(p.projectionMatrix), H.copy(S), T.x = ab.x + H.x * z + z - 8, T.y = ab.y + H.y * u + u - 8, !0 === x.containsPoint(T)) {
                        l.activeTexture(y.TEXTURE0);
                        l.bindTexture(y.TEXTURE_2D, null);
                        l.activeTexture(y.TEXTURE1);
                        l.bindTexture(y.TEXTURE_2D, pa);
                        y.copyTexImage2D(y.TEXTURE_2D, 0, y.RGB, T.x, T.y, 16, 16, 0);
                        y.uniform1i(e, 0);
                        y.uniform2f(c, B.x, B.y);
                        y.uniform3f(k, H.x, H.y, H.z);
                        l.disable(y.BLEND);
                        l.enable(y.DEPTH_TEST);
                        y.drawElements(y.TRIANGLES,
                            6, y.UNSIGNED_SHORT, 0);
                        l.activeTexture(y.TEXTURE0);
                        l.bindTexture(y.TEXTURE_2D, nd);
                        y.copyTexImage2D(y.TEXTURE_2D, 0, y.RGBA, T.x, T.y, 16, 16, 0);
                        y.uniform1i(e, 1);
                        l.disable(y.DEPTH_TEST);
                        l.activeTexture(y.TEXTURE1);
                        l.bindTexture(y.TEXTURE_2D, pa);
                        y.drawElements(y.TRIANGLES, 6, y.UNSIGNED_SHORT, 0);
                        L.positionScreen.copy(H);
                        L.customUpdateCallback ? L.customUpdateCallback(L) : L.updateLensFlares();
                        y.uniform1i(e, 2);
                        l.enable(y.BLEND);
                        for (var Y = 0, ca = L.lensFlares.length; Y < ca; Y++) {
                            var P = L.lensFlares[Y];.001 < P.opacity && .001 <
                                P.scale && (H.x = P.x, H.y = P.y, H.z = P.z, E = P.size * P.scale / ab.w, B.x = E * A, B.y = E, y.uniform3f(k, H.x, H.y, H.z), y.uniform2f(c, B.x, B.y), y.uniform1f(d, P.rotation), y.uniform1f(D, P.opacity), y.uniform3f(C, P.color.r, P.color.g, P.color.b), l.setBlending(P.blending, P.blendEquation, P.blendSrc, P.blendDst), a.setTexture2D(P.texture, 1), y.drawElements(y.TRIANGLES, 6, y.UNSIGNED_SHORT, 0))
                        }
                    }
                l.enable(y.CULL_FACE);
                l.enable(y.DEPTH_TEST);
                l.setDepthWrite(!0);
                a.resetGLState()
            }
        }
    }

    function aa(a, b, e, f, q, D, C, c, d, k) {
        a = void 0 !== a ? a : [];
        u.call(this,
            a, void 0 !== b ? b : 301, e, f, q, D, C, c, d, k);
        this.flipY = !1
    }

    function ma(a, b, e) {
        var f = a[0];
        if (0 >= f || 0 < f) return a;
        var q = b * e,
            D = we[q];
        void 0 === D && (D = new Float32Array(q), we[q] = D);
        if (0 !== b)
            for (f.toArray(D, 0), f = 1, q = 0; f !== b; ++f) q += e, a[f].toArray(D, q);
        return D
    }

    function ka(a, b) {
        var e = xe[b];
        void 0 === e && (e = new Int32Array(b), xe[b] = e);
        for (var f = 0; f !== b; ++f) e[f] = a.allocTextureUnit();
        return e
    }

    function ea(a, b) {
        a.uniform1f(this.addr, b)
    }

    function tb(a, b) {
        a.uniform1i(this.addr, b)
    }

    function za(a, b) {
        void 0 === b.x ? a.uniform2fv(this.addr,
            b) : a.uniform2f(this.addr, b.x, b.y)
    }

    function B(a, b) {
        void 0 !== b.x ? a.uniform3f(this.addr, b.x, b.y, b.z) : void 0 !== b.r ? a.uniform3f(this.addr, b.r, b.g, b.b) : a.uniform3fv(this.addr, b)
    }

    function xc(a, b) {
        void 0 === b.x ? a.uniform4fv(this.addr, b) : a.uniform4f(this.addr, b.x, b.y, b.z, b.w)
    }

    function yb(a, b) {
        a.uniformMatrix2fv(this.addr, !1, b.elements || b)
    }

    function ob(a, b) {
        a.uniformMatrix3fv(this.addr, !1, b.elements || b)
    }

    function ra(a, b) {
        a.uniformMatrix4fv(this.addr, !1, b.elements || b)
    }

    function qa(a, b, e) {
        var f = e.allocTextureUnit();
        a.uniform1i(this.addr, f);
        e.setTexture2D(b || ye, f)
    }

    function yc(a, b, e) {
        var f = e.allocTextureUnit();
        a.uniform1i(this.addr, f);
        e.setTextureCube(b || ze, f)
    }

    function Ga(a, b) {
        a.uniform2iv(this.addr, b)
    }

    function Ha(a, b) {
        a.uniform3iv(this.addr, b)
    }

    function ub(a, b) {
        a.uniform4iv(this.addr, b)
    }

    function jb(a) {
        switch (a) {
            case 5126:
                return ea;
            case 35664:
                return za;
            case 35665:
                return B;
            case 35666:
                return xc;
            case 35674:
                return yb;
            case 35675:
                return ob;
            case 35676:
                return ra;
            case 35678:
                return qa;
            case 35680:
                return yc;
            case 5124:
            case 35670:
                return tb;
            case 35667:
            case 35671:
                return Ga;
            case 35668:
            case 35672:
                return Ha;
            case 35669:
            case 35673:
                return ub
        }
    }

    function Yb(a, b) {
        a.uniform1fv(this.addr, b)
    }

    function fb(a, b) {
        a.uniform1iv(this.addr, b)
    }

    function Bb(a, b) {
        a.uniform2fv(this.addr, ma(b, this.size, 2))
    }

    function Cb(a, b) {
        a.uniform3fv(this.addr, ma(b, this.size, 3))
    }

    function Db(a, b) {
        a.uniform4fv(this.addr, ma(b, this.size, 4))
    }

    function Eb(a, b) {
        a.uniformMatrix2fv(this.addr, !1, ma(b, this.size, 4))
    }

    function Fb(a, b) {
        a.uniformMatrix3fv(this.addr, !1, ma(b, this.size, 9))
    }

    function Aa(a,
        b) {
        a.uniformMatrix4fv(this.addr, !1, ma(b, this.size, 16))
    }

    function Ob(a, b, e) {
        var f = b.length,
            q = ka(e, f);
        a.uniform1iv(this.addr, q);
        for (a = 0; a !== f; ++a) e.setTexture2D(b[a] || ye, q[a])
    }

    function ic(a, b, e) {
        var f = b.length,
            q = ka(e, f);
        a.uniform1iv(this.addr, q);
        for (a = 0; a !== f; ++a) e.setTextureCube(b[a] || ze, q[a])
    }

    function Zb(a) {
        switch (a) {
            case 5126:
                return Yb;
            case 35664:
                return Bb;
            case 35665:
                return Cb;
            case 35666:
                return Db;
            case 35674:
                return Eb;
            case 35675:
                return Fb;
            case 35676:
                return Aa;
            case 35678:
                return Ob;
            case 35680:
                return ic;
            case 5124:
            case 35670:
                return fb;
            case 35667:
            case 35671:
                return Ga;
            case 35668:
            case 35672:
                return Ha;
            case 35669:
            case 35673:
                return ub
        }
    }

    function zc(a, b, e) {
        this.id = a;
        this.addr = e;
        this.setValue = jb(b.type)
    }

    function Ia(a, b, e) {
        this.id = a;
        this.addr = e;
        this.size = b.size;
        this.setValue = Zb(b.type)
    }

    function fa(a) {
        this.id = a;
        this.seq = [];
        this.map = {}
    }

    function Ka(a, b, e) {
        this.seq = [];
        this.map = {};
        this.renderer = e;
        e = a.getProgramParameter(b, a.ACTIVE_UNIFORMS);
        for (var f = 0; f !== e; ++f) {
            var q = a.getActiveUniform(b, f),
                D = a.getUniformLocation(b,
                    q.name),
                C = this,
                c = q.name,
                d = c.length;
            for (ae.lastIndex = 0;;) {
                var k = ae.exec(c),
                    g = ae.lastIndex,
                    h = k[1],
                    l = k[3];
                "]" === k[2] && (h |= 0);
                if (void 0 === l || "[" === l && g + 2 === d) {
                    c = C;
                    q = void 0 === l ? new zc(h, q, D) : new Ia(h, q, D);
                    c.seq.push(q);
                    c.map[q.id] = q;
                    break
                } else l = C.map[h], void 0 === l && (l = new fa(h), h = C, C = l, h.seq.push(C), h.map[C.id] = C), C = l
            }
        }
    }

    function $b(a, b, e, f, q, D, C) {
        function c(a, b) {
            if (a.width > b || a.height > b) {
                b /= Math.max(a.width, a.height);
                var e = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
                e.width = Math.floor(a.width *
                    b);
                e.height = Math.floor(a.height * b);
                e.getContext("2d").drawImage(a, 0, 0, a.width, a.height, 0, 0, e.width, e.height);
                console.warn("THREE.WebGLRenderer: image is too big (" + a.width + "x" + a.height + "). Resized to " + e.width + "x" + e.height, a);
                return e
            }
            return a
        }

        function k(a) {
            return d.Math.isPowerOfTwo(a.width) && d.Math.isPowerOfTwo(a.height)
        }

        function g(b) {
            return 1003 === b || 1004 === b || 1005 === b ? a.NEAREST : a.LINEAR
        }

        function h(b) {
            b = b.target;
            b.removeEventListener("dispose", h);
            a: {
                var e = f.get(b);
                if (b.image && e.__image__webglTextureCube) a.deleteTexture(e.__image__webglTextureCube);
                else {
                    if (void 0 === e.__webglInit) break a;
                    a.deleteTexture(e.__webglTexture)
                }
                f.delete(b)
            }
            t.textures--
        }

        function l(b) {
            b = b.target;
            b.removeEventListener("dispose", l);
            var e = f.get(b),
                q = f.get(b.texture);
            if (b) {
                void 0 !== q.__webglTexture && a.deleteTexture(q.__webglTexture);
                b.depthTexture && b.depthTexture.dispose();
                if (b && b.isWebGLRenderTargetCube)
                    for (q = 0; 6 > q; q++) a.deleteFramebuffer(e.__webglFramebuffer[q]), e.__webglDepthbuffer && a.deleteRenderbuffer(e.__webglDepthbuffer[q]);
                else a.deleteFramebuffer(e.__webglFramebuffer),
                    e.__webglDepthbuffer && a.deleteRenderbuffer(e.__webglDepthbuffer);
                f.delete(b.texture);
                f.delete(b)
            }
            t.textures--
        }

        function y(b, C) {
            var g = f.get(b);
            if (0 < b.version && g.__version !== b.version) {
                var l = b.image;
                if (void 0 === l) console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined", b);
                else if (!1 === l.complete) console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete", b);
                else {
                    void 0 === g.__webglInit && (g.__webglInit = !0, b.addEventListener("dispose", h), g.__webglTexture =
                        a.createTexture(), t.textures++);
                    e.activeTexture(a.TEXTURE0 + C);
                    e.bindTexture(a.TEXTURE_2D, g.__webglTexture);
                    a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, b.flipY);
                    a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL, b.premultiplyAlpha);
                    a.pixelStorei(a.UNPACK_ALIGNMENT, b.unpackAlignment);
                    var V = c(b.image, q.maxTextureSize);
                    (1001 !== b.wrapS || 1001 !== b.wrapT || 1003 !== b.minFilter && 1006 !== b.minFilter) && !1 === k(V) && (C = V, C instanceof HTMLImageElement || C instanceof HTMLCanvasElement ? (l = document.createElementNS("http://www.w3.org/1999/xhtml",
                        "canvas"), l.width = d.Math.nearestPowerOfTwo(C.width), l.height = d.Math.nearestPowerOfTwo(C.height), l.getContext("2d").drawImage(C, 0, 0, l.width, l.height), console.warn("THREE.WebGLRenderer: image is not power of two (" + C.width + "x" + C.height + "). Resized to " + l.width + "x" + l.height, C), V = l) : V = C);
                    C = k(V);
                    var l = D(b.format),
                        y = D(b.type);
                    m(a.TEXTURE_2D, b, C);
                    var ha = b.mipmaps;
                    if (b && b.isDepthTexture) {
                        ha = a.DEPTH_COMPONENT;
                        if (1015 === b.type) {
                            if (!r) throw Error("Float Depth Texture only supported in WebGL2.0");
                            ha = a.DEPTH_COMPONENT32F
                        } else r &&
                            (ha = a.DEPTH_COMPONENT16);
                        1027 === b.format && (ha = a.DEPTH_STENCIL);
                        e.texImage2D(a.TEXTURE_2D, 0, ha, V.width, V.height, 0, l, y, null)
                    } else if (b && b.isDataTexture)
                        if (0 < ha.length && C) {
                            for (var n = 0, w = ha.length; n < w; n++) V = ha[n], e.texImage2D(a.TEXTURE_2D, n, l, V.width, V.height, 0, l, y, V.data);
                            b.generateMipmaps = !1
                        } else e.texImage2D(a.TEXTURE_2D, 0, l, V.width, V.height, 0, l, y, V.data);
                    else if (b && b.isCompressedTexture)
                        for (n = 0, w = ha.length; n < w; n++) V = ha[n], 1023 !== b.format && 1022 !== b.format ? -1 < e.getCompressedTextureFormats().indexOf(l) ?
                            e.compressedTexImage2D(a.TEXTURE_2D, n, l, V.width, V.height, 0, V.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : e.texImage2D(a.TEXTURE_2D, n, l, V.width, V.height, 0, l, y, V.data);
                    else if (0 < ha.length && C) {
                        n = 0;
                        for (w = ha.length; n < w; n++) V = ha[n], e.texImage2D(a.TEXTURE_2D, n, l, l, y, V);
                        b.generateMipmaps = !1
                    } else e.texImage2D(a.TEXTURE_2D, 0, l, l, y, V);
                    b.generateMipmaps && C && a.generateMipmap(a.TEXTURE_2D);
                    g.__version = b.version;
                    if (b.onUpdate) b.onUpdate(b);
                    return
                }
            }
            e.activeTexture(a.TEXTURE0 + C);
            e.bindTexture(a.TEXTURE_2D, g.__webglTexture)
        }

        function m(e, C, c) {
            c ? (a.texParameteri(e, a.TEXTURE_WRAP_S, D(C.wrapS)), a.texParameteri(e, a.TEXTURE_WRAP_T, D(C.wrapT)), a.texParameteri(e, a.TEXTURE_MAG_FILTER, D(C.magFilter)), a.texParameteri(e, a.TEXTURE_MIN_FILTER, D(C.minFilter))) : (a.texParameteri(e, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE), a.texParameteri(e, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE), 1001 === C.wrapS && 1001 === C.wrapT || console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.",
                C), a.texParameteri(e, a.TEXTURE_MAG_FILTER, g(C.magFilter)), a.texParameteri(e, a.TEXTURE_MIN_FILTER, g(C.minFilter)), 1003 !== C.minFilter && 1006 !== C.minFilter && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.", C));
            !(c = b.get("EXT_texture_filter_anisotropic")) || 1015 === C.type && null === b.get("OES_texture_float_linear") || 1016 === C.type && null === b.get("OES_texture_half_float_linear") || !(1 < C.anisotropy || f.get(C).__currentAnisotropy) ||
                (a.texParameterf(e, c.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(C.anisotropy, q.getMaxAnisotropy())), f.get(C).__currentAnisotropy = C.anisotropy)
        }

        function n(b, q, C, c) {
            var I = D(q.texture.format),
                d = D(q.texture.type);
            e.texImage2D(c, 0, I, q.width, q.height, 0, I, d, null);
            a.bindFramebuffer(a.FRAMEBUFFER, b);
            a.framebufferTexture2D(a.FRAMEBUFFER, C, c, f.get(q.texture).__webglTexture, 0);
            a.bindFramebuffer(a.FRAMEBUFFER, null)
        }

        function w(b, e) {
            a.bindRenderbuffer(a.RENDERBUFFER, b);
            e.depthBuffer && !e.stencilBuffer ? (a.renderbufferStorage(a.RENDERBUFFER,
                a.DEPTH_COMPONENT16, e.width, e.height), a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_ATTACHMENT, a.RENDERBUFFER, b)) : e.depthBuffer && e.stencilBuffer ? (a.renderbufferStorage(a.RENDERBUFFER, a.DEPTH_STENCIL, e.width, e.height), a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_STENCIL_ATTACHMENT, a.RENDERBUFFER, b)) : a.renderbufferStorage(a.RENDERBUFFER, a.RGBA4, e.width, e.height);
            a.bindRenderbuffer(a.RENDERBUFFER, null)
        }
        var t = C.memory,
            r = "undefined" !== typeof WebGL2RenderingContext && a instanceof WebGL2RenderingContext;
        this.setTexture2D = y;
        this.setTextureCube = function(b, C) {
            var d = f.get(b);
            if (6 === b.image.length)
                if (0 < b.version && d.__version !== b.version) {
                    d.__image__webglTextureCube || (b.addEventListener("dispose", h), d.__image__webglTextureCube = a.createTexture(), t.textures++);
                    e.activeTexture(a.TEXTURE0 + C);
                    e.bindTexture(a.TEXTURE_CUBE_MAP, d.__image__webglTextureCube);
                    a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, b.flipY);
                    C = b && b.isCompressedTexture;
                    for (var g = b.image[0] && b.image[0].isDataTexture, l = [], V = 0; 6 > V; V++) l[V] = C || g ? g ? b.image[V].image :
                        b.image[V] : c(b.image[V], q.maxCubemapSize);
                    var y = k(l[0]),
                        ha = D(b.format),
                        n = D(b.type);
                    m(a.TEXTURE_CUBE_MAP, b, y);
                    for (V = 0; 6 > V; V++)
                        if (C)
                            for (var w, Nb = l[V].mipmaps, r = 0, Rc = Nb.length; r < Rc; r++) w = Nb[r], 1023 !== b.format && 1022 !== b.format ? -1 < e.getCompressedTextureFormats().indexOf(ha) ? e.compressedTexImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + V, r, ha, w.width, w.height, 0, w.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X +
                                V, r, ha, w.width, w.height, 0, ha, n, w.data);
                        else g ? e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + V, 0, ha, l[V].width, l[V].height, 0, ha, n, l[V].data) : e.texImage2D(a.TEXTURE_CUBE_MAP_POSITIVE_X + V, 0, ha, ha, n, l[V]);
                    b.generateMipmaps && y && a.generateMipmap(a.TEXTURE_CUBE_MAP);
                    d.__version = b.version;
                    if (b.onUpdate) b.onUpdate(b)
                } else e.activeTexture(a.TEXTURE0 + C), e.bindTexture(a.TEXTURE_CUBE_MAP, d.__image__webglTextureCube)
        };
        this.setTextureCubeDynamic = function(b, q) {
            e.activeTexture(a.TEXTURE0 + q);
            e.bindTexture(a.TEXTURE_CUBE_MAP,
                f.get(b).__webglTexture)
        };
        this.setupRenderTarget = function(b) {
            var q = f.get(b),
                D = f.get(b.texture);
            b.addEventListener("dispose", l);
            D.__webglTexture = a.createTexture();
            t.textures++;
            var C = b && b.isWebGLRenderTargetCube,
                c = k(b);
            if (C) {
                q.__webglFramebuffer = [];
                for (var I = 0; 6 > I; I++) q.__webglFramebuffer[I] = a.createFramebuffer()
            } else q.__webglFramebuffer = a.createFramebuffer();
            if (C) {
                e.bindTexture(a.TEXTURE_CUBE_MAP, D.__webglTexture);
                m(a.TEXTURE_CUBE_MAP, b.texture, c);
                for (I = 0; 6 > I; I++) n(q.__webglFramebuffer[I], b, a.COLOR_ATTACHMENT0,
                    a.TEXTURE_CUBE_MAP_POSITIVE_X + I);
                b.texture.generateMipmaps && c && a.generateMipmap(a.TEXTURE_CUBE_MAP);
                e.bindTexture(a.TEXTURE_CUBE_MAP, null)
            } else e.bindTexture(a.TEXTURE_2D, D.__webglTexture), m(a.TEXTURE_2D, b.texture, c), n(q.__webglFramebuffer, b, a.COLOR_ATTACHMENT0, a.TEXTURE_2D), b.texture.generateMipmaps && c && a.generateMipmap(a.TEXTURE_2D), e.bindTexture(a.TEXTURE_2D, null);
            if (b.depthBuffer) {
                q = f.get(b);
                D = b && b.isWebGLRenderTargetCube;
                if (b.depthTexture) {
                    if (D) throw Error("target.depthTexture not supported in Cube render targets");
                    if (b && b.isWebGLRenderTargetCube) throw Error("Depth Texture with cube render targets is not supported!");
                    a.bindFramebuffer(a.FRAMEBUFFER, q.__webglFramebuffer);
                    if (!b.depthTexture || !b.depthTexture.isDepthTexture) throw Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
                    f.get(b.depthTexture).__webglTexture && b.depthTexture.image.width === b.width && b.depthTexture.image.height === b.height || (b.depthTexture.image.width = b.width, b.depthTexture.image.height = b.height, b.depthTexture.needsUpdate = !0);
                    y(b.depthTexture, 0);
                    q = f.get(b.depthTexture).__webglTexture;
                    if (1026 === b.depthTexture.format) a.framebufferTexture2D(a.FRAMEBUFFER, a.DEPTH_ATTACHMENT, a.TEXTURE_2D, q, 0);
                    else if (1027 === b.depthTexture.format) a.framebufferTexture2D(a.FRAMEBUFFER, a.DEPTH_STENCIL_ATTACHMENT, a.TEXTURE_2D, q, 0);
                    else throw Error("Unknown depthTexture format");
                } else if (D)
                    for (q.__webglDepthbuffer = [], D = 0; 6 > D; D++) a.bindFramebuffer(a.FRAMEBUFFER, q.__webglFramebuffer[D]), q.__webglDepthbuffer[D] = a.createRenderbuffer(), w(q.__webglDepthbuffer[D],
                        b);
                else a.bindFramebuffer(a.FRAMEBUFFER, q.__webglFramebuffer), q.__webglDepthbuffer = a.createRenderbuffer(), w(q.__webglDepthbuffer, b);
                a.bindFramebuffer(a.FRAMEBUFFER, null)
            }
        };
        this.updateRenderTargetMipmap = function(b) {
            var q = b.texture;
            q.generateMipmaps && k(b) && 1003 !== q.minFilter && 1006 !== q.minFilter && (b = b && b.isWebGLRenderTargetCube ? a.TEXTURE_CUBE_MAP : a.TEXTURE_2D, q = f.get(q).__webglTexture, e.bindTexture(b, q), a.generateMipmap(b), e.bindTexture(b, null))
        }
    }

    function na(a, b, e, f) {
        this.x = a || 0;
        this.y = b || 0;
        this.z = e ||
            0;
        this.w = void 0 !== f ? f : 1
    }

    function ac(a, b, e) {
        function f(b, e, f) {
            var q = new Uint8Array(4),
                D = a.createTexture();
            a.bindTexture(b, D);
            a.texParameteri(b, a.TEXTURE_MIN_FILTER, a.NEAREST);
            a.texParameteri(b, a.TEXTURE_MAG_FILTER, a.NEAREST);
            for (b = 0; b < f; b++) a.texImage2D(e + b, 0, a.RGBA, 1, 1, 0, a.RGBA, a.UNSIGNED_BYTE, q);
            return D
        }

        function q(b) {
            !0 !== v[b] && (a.enable(b), v[b] = !0)
        }

        function D(b) {
            !1 !== v[b] && (a.disable(b), v[b] = !1)
        }

        function C(b, f, C, c, I, d, k, ia) {
            if (0 !== b) {
                q(a.BLEND);
                if (b !== H || ia !== N) 2 === b ? ia ? (a.blendEquationSeparate(a.FUNC_ADD,
                        a.FUNC_ADD), a.blendFuncSeparate(a.ONE, a.ONE, a.ONE, a.ONE)) : (a.blendEquation(a.FUNC_ADD), a.blendFunc(a.SRC_ALPHA, a.ONE)) : 3 === b ? ia ? (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.ZERO, a.ZERO, a.ONE_MINUS_SRC_COLOR, a.ONE_MINUS_SRC_ALPHA)) : (a.blendEquation(a.FUNC_ADD), a.blendFunc(a.ZERO, a.ONE_MINUS_SRC_COLOR)) : 4 === b ? ia ? (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.ZERO, a.SRC_COLOR, a.ZERO, a.SRC_ALPHA)) : (a.blendEquation(a.FUNC_ADD), a.blendFunc(a.ZERO, a.SRC_COLOR)) :
                    1 == b && (ia ? (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.ONE, a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE_MINUS_SRC_ALPHA)) : (a.blendEquationSeparate(a.FUNC_ADD, a.FUNC_ADD), a.blendFuncSeparate(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE_MINUS_SRC_ALPHA))), H = b, N = ia;
                if (5 === b) {
                    I = I || f;
                    d = d || C;
                    k = k || c;
                    if (f !== z || I !== T) a.blendEquationSeparate(e(f), e(I)), z = f, T = I;
                    if (C !== u || c !== B || d !== O || k !== x) a.blendFuncSeparate(e(C), e(c), e(d), e(k)), u = C, B = c, O = d, x = k
                } else x = O = T = B = u = z = null
            } else D(a.BLEND), H = b
        }

        function c(a) {
            w.setFunc(a)
        }

        function d(b) {
            L !== b && (b ? a.frontFace(a.CW) : a.frontFace(a.CCW), L = b)
        }

        function k(b) {
            0 !== b ? (q(a.CULL_FACE), b !== Y && (1 === b ? a.cullFace(a.BACK) : 2 === b ? a.cullFace(a.FRONT) : a.cullFace(a.FRONT_AND_BACK))) : D(a.CULL_FACE);
            Y = b
        }

        function g(b) {
            void 0 === b && (b = a.TEXTURE0 + wa - 1);
            X !== b && (a.activeTexture(b), X = b)
        }

        function l(a, b, e, f) {
            n.setClear(a, b, e, f)
        }

        function h(a) {
            w.setClear(a)
        }

        function m(a) {
            t.setClear(a)
        }
        var n = new function() {
                var b = !1,
                    e = new na,
                    f = null,
                    q = new na;
                return {
                    setMask: function(e) {
                        f === e || b || (a.colorMask(e, e, e, e), f =
                            e)
                    },
                    setLocked: function(a) {
                        b = a
                    },
                    setClear: function(b, f, D, C) {
                        e.set(b, f, D, C);
                        !1 === q.equals(e) && (a.clearColor(b, f, D, C), q.copy(e))
                    },
                    reset: function() {
                        b = !1;
                        f = null;
                        q.set(0, 0, 0, 1)
                    }
                }
            },
            w = new function() {
                var b = !1,
                    e = null,
                    f = null,
                    C = null;
                return {
                    setTest: function(b) {
                        b ? q(a.DEPTH_TEST) : D(a.DEPTH_TEST)
                    },
                    setMask: function(f) {
                        e === f || b || (a.depthMask(f), e = f)
                    },
                    setFunc: function(b) {
                        if (f !== b) {
                            if (b) switch (b) {
                                case 0:
                                    a.depthFunc(a.NEVER);
                                    break;
                                case 1:
                                    a.depthFunc(a.ALWAYS);
                                    break;
                                case 2:
                                    a.depthFunc(a.LESS);
                                    break;
                                case 3:
                                    a.depthFunc(a.LEQUAL);
                                    break;
                                case 4:
                                    a.depthFunc(a.EQUAL);
                                    break;
                                case 5:
                                    a.depthFunc(a.GEQUAL);
                                    break;
                                case 6:
                                    a.depthFunc(a.GREATER);
                                    break;
                                case 7:
                                    a.depthFunc(a.NOTEQUAL);
                                    break;
                                default:
                                    a.depthFunc(a.LEQUAL)
                            } else a.depthFunc(a.LEQUAL);
                            f = b
                        }
                    },
                    setLocked: function(a) {
                        b = a
                    },
                    setClear: function(b) {
                        C !== b && (a.clearDepth(b), C = b)
                    },
                    reset: function() {
                        b = !1;
                        C = f = e = null
                    }
                }
            },
            t = new function() {
                var b = !1,
                    e = null,
                    f = null,
                    C = null,
                    c = null,
                    I = null,
                    d = null,
                    k = null,
                    ia = null;
                return {
                    setTest: function(b) {
                        b ? q(a.STENCIL_TEST) : D(a.STENCIL_TEST)
                    },
                    setMask: function(f) {
                        e === f ||
                            b || (a.stencilMask(f), e = f)
                    },
                    setFunc: function(b, e, q) {
                        if (f !== b || C !== e || c !== q) a.stencilFunc(b, e, q), f = b, C = e, c = q
                    },
                    setOp: function(b, e, f) {
                        if (I !== b || d !== e || k !== f) a.stencilOp(b, e, f), I = b, d = e, k = f
                    },
                    setLocked: function(a) {
                        b = a
                    },
                    setClear: function(b) {
                        ia !== b && (a.clearStencil(b), ia = b)
                    },
                    reset: function() {
                        b = !1;
                        ia = k = d = I = c = C = f = e = null
                    }
                }
            },
            r = a.getParameter(a.MAX_VERTEX_ATTRIBS),
            pa = new Uint8Array(r),
            p = new Uint8Array(r),
            A = new Uint8Array(r),
            v = {},
            E = null,
            H = null,
            z = null,
            u = null,
            B = null,
            T = null,
            O = null,
            x = null,
            N = !1,
            L = null,
            Y = null,
            ca = null,
            P = null,
            G = null,
            Pa = null,
            wa = a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),
            X = null,
            Ca = {},
            Da = new na,
            M = new na,
            K = {};
        K[a.TEXTURE_2D] = f(a.TEXTURE_2D, a.TEXTURE_2D, 1);
        K[a.TEXTURE_CUBE_MAP] = f(a.TEXTURE_CUBE_MAP, a.TEXTURE_CUBE_MAP_POSITIVE_X, 6);
        return {
            buffers: {
                color: n,
                depth: w,
                stencil: t
            },
            init: function() {
                l(0, 0, 0, 1);
                h(1);
                m(0);
                q(a.DEPTH_TEST);
                c(3);
                d(!1);
                k(1);
                q(a.CULL_FACE);
                q(a.BLEND);
                C(1)
            },
            initAttributes: function() {
                for (var a = 0, b = pa.length; a < b; a++) pa[a] = 0
            },
            enableAttribute: function(e) {
                pa[e] = 1;
                0 === p[e] && (a.enableVertexAttribArray(e),
                    p[e] = 1);
                0 !== A[e] && (b.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(e, 0), A[e] = 0)
            },
            enableAttributeAndDivisor: function(b, e, f) {
                pa[b] = 1;
                0 === p[b] && (a.enableVertexAttribArray(b), p[b] = 1);
                A[b] !== e && (f.vertexAttribDivisorANGLE(b, e), A[b] = e)
            },
            disableUnusedAttributes: function() {
                for (var b = 0, e = p.length; b !== e; ++b) p[b] !== pa[b] && (a.disableVertexAttribArray(b), p[b] = 0)
            },
            enable: q,
            disable: D,
            getCompressedTextureFormats: function() {
                if (null === E && (E = [], b.get("WEBGL_compressed_texture_pvrtc") || b.get("WEBGL_compressed_texture_s3tc") ||
                        b.get("WEBGL_compressed_texture_etc1")))
                    for (var e = a.getParameter(a.COMPRESSED_TEXTURE_FORMATS), f = 0; f < e.length; f++) E.push(e[f]);
                return E
            },
            setBlending: C,
            setColorWrite: function(a) {
                n.setMask(a)
            },
            setDepthTest: function(a) {
                w.setTest(a)
            },
            setDepthWrite: function(a) {
                w.setMask(a)
            },
            setDepthFunc: c,
            setStencilTest: function(a) {
                t.setTest(a)
            },
            setStencilWrite: function(a) {
                t.setMask(a)
            },
            setStencilFunc: function(a, b, e) {
                t.setFunc(a, b, e)
            },
            setStencilOp: function(a, b, e) {
                t.setOp(a, b, e)
            },
            setFlipSided: d,
            setCullFace: k,
            setLineWidth: function(b) {
                b !==
                    ca && (a.lineWidth(b), ca = b)
            },
            setPolygonOffset: function(b, e, f) {
                if (b) {
                    if (q(a.POLYGON_OFFSET_FILL), P !== e || G !== f) a.polygonOffset(e, f), P = e, G = f
                } else D(a.POLYGON_OFFSET_FILL)
            },
            getScissorTest: function() {
                return Pa
            },
            setScissorTest: function(b) {
                (Pa = b) ? q(a.SCISSOR_TEST): D(a.SCISSOR_TEST)
            },
            activeTexture: g,
            bindTexture: function(b, e) {
                null === X && g();
                var f = Ca[X];
                void 0 === f && (f = {
                    type: void 0,
                    texture: void 0
                }, Ca[X] = f);
                if (f.type !== b || f.texture !== e) a.bindTexture(b, e || K[b]), f.type = b, f.texture = e
            },
            compressedTexImage2D: function() {
                try {
                    a.compressedTexImage2D.apply(a,
                        arguments)
                } catch (b) {
                    console.error(b)
                }
            },
            texImage2D: function() {
                try {
                    a.texImage2D.apply(a, arguments)
                } catch (b) {
                    console.error(b)
                }
            },
            clearColor: l,
            clearDepth: h,
            clearStencil: m,
            scissor: function(b) {
                !1 === Da.equals(b) && (a.scissor(b.x, b.y, b.z, b.w), Da.copy(b))
            },
            viewport: function(b) {
                !1 === M.equals(b) && (a.viewport(b.x, b.y, b.z, b.w), M.copy(b))
            },
            reset: function() {
                for (var b = 0; b < p.length; b++) 1 === p[b] && (a.disableVertexAttribArray(b), p[b] = 0);
                v = {};
                X = E = null;
                Ca = {};
                Y = L = H = null;
                n.reset();
                w.reset();
                t.reset()
            }
        }
    }

    function P(a, b, e) {
        this.uuid =
            d.Math.generateUUID();
        this.width = a;
        this.height = b;
        this.scissor = new na(0, 0, a, b);
        this.scissorTest = !1;
        this.viewport = new na(0, 0, a, b);
        e = e || {};
        void 0 === e.minFilter && (e.minFilter = 1006);
        this.texture = new u(void 0, void 0, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.encoding);
        this.depthBuffer = void 0 !== e.depthBuffer ? e.depthBuffer : !0;
        this.stencilBuffer = void 0 !== e.stencilBuffer ? e.stencilBuffer : !0;
        this.depthTexture = void 0 !== e.depthTexture ? e.depthTexture : null
    }

    function K() {
        Object.defineProperty(this,
            "id", {
                value: Ae++
            });
        this.uuid = d.Math.generateUUID();
        this.name = "";
        this.type = "Material";
        this.lights = this.fog = !0;
        this.blending = 1;
        this.side = 0;
        this.shading = 2;
        this.vertexColors = 0;
        this.opacity = 1;
        this.transparent = !1;
        this.blendSrc = 204;
        this.blendDst = 205;
        this.blendEquation = 100;
        this.blendEquationAlpha = this.blendDstAlpha = this.blendSrcAlpha = null;
        this.depthFunc = 3;
        this.depthWrite = this.depthTest = !0;
        this.clippingPlanes = null;
        this.clipShadows = !1;
        this.colorWrite = !0;
        this.precision = null;
        this.polygonOffset = !1;
        this.alphaTest =
            this.polygonOffsetUnits = this.polygonOffsetFactor = 0;
        this.premultipliedAlpha = !1;
        this.overdraw = 0;
        this._needsUpdate = this.visible = !0
    }

    function sa(a) {
        K.call(this);
        this.type = "ShaderMaterial";
        this.defines = {};
        this.uniforms = {};
        this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}";
        this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}";
        this.linewidth = 1;
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.morphNormals = this.morphTargets =
            this.skinning = this.clipping = this.lights = this.fog = !1;
        this.extensions = {
            derivatives: !1,
            fragDepth: !1,
            drawBuffers: !1,
            shaderTextureLOD: !1
        };
        this.defaultAttributeValues = {
            color: [1, 1, 1],
            uv: [0, 0],
            uv2: [0, 0]
        };
        this.index0AttributeName = void 0;
        void 0 !== a && (void 0 !== a.attributes && console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."), this.setValues(a))
    }

    function G(a, b, e) {
        return void 0 === b && void 0 === e ? this.set(a) : this.setRGB(a, b, e)
    }

    function Ea(a) {
        K.call(this);
        this.type =
            "MeshDepthMaterial";
        this.depthPacking = 3200;
        this.morphTargets = this.skinning = !1;
        this.displacementMap = this.alphaMap = this.map = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.lights = this.fog = !1;
        this.setValues(a)
    }

    function Qa(a, b) {
        this.min = void 0 !== a ? a : new r(Infinity, Infinity, Infinity);
        this.max = void 0 !== b ? b : new r(-Infinity, -Infinity, -Infinity)
    }

    function La(a, b) {
        this.center = void 0 !== a ? a : new r;
        this.radius = void 0 !== b ? b : 0
    }

    function Ta() {
        this.elements = new Float32Array([1,
            0, 0, 0, 1, 0, 0, 0, 1
        ]);
        0 < arguments.length && console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
    }

    function Za(a, b) {
        this.normal = void 0 !== a ? a : new r(1, 0, 0);
        this.constant = void 0 !== b ? b : 0
    }

    function Pb(a, b, e, f, q, D) {
        this.planes = [void 0 !== a ? a : new Za, void 0 !== b ? b : new Za, void 0 !== e ? e : new Za, void 0 !== f ? f : new Za, void 0 !== q ? q : new Za, void 0 !== D ? D : new Za]
    }

    function Sc(a, b, e, f) {
        function q(b, e, f, q) {
            var D = b.geometry,
                C;
            C = t;
            var c = b.customDepthMaterial;
            f && (C = p, c = b.customDistanceMaterial);
            c ? C = c : (c = !1, e.morphTargets && (D && D.isBufferGeometry ? c = D.morphAttributes && D.morphAttributes.position && 0 < D.morphAttributes.position.length : D && D.isGeometry && (c = D.morphTargets && 0 < D.morphTargets.length)), b = b.isSkinnedMesh && e.skinning, D = 0, c && (D |= 1), b && (D |= 2), C = C[D]);
            a.localClippingEnabled && !0 === e.clipShadows && 0 !== e.clippingPlanes.length && (D = C.uuid, c = e.uuid, b = pa[D], void 0 === b && (b = {}, pa[D] = b), D = b[c], void 0 === D && (D = C.clone(), b[c] = D), C = D);
            C.visible = e.visible;
            C.wireframe = e.wireframe;
            c = e.side;
            x.renderSingleSided &&
                2 == c && (c = 0);
            x.renderReverseSided && (0 === c ? c = 1 : 1 === c && (c = 0));
            C.side = c;
            C.clipShadows = e.clipShadows;
            C.clippingPlanes = e.clippingPlanes;
            C.wireframeLinewidth = e.wireframeLinewidth;
            C.linewidth = e.linewidth;
            f && void 0 !== C.uniforms.lightPos && C.uniforms.lightPos.value.copy(q);
            return C
        }

        function D(a, b, e) {
            if (!1 !== a.visible) {
                0 !== (a.layers.mask & b.layers.mask) && (a.isMesh || a.isLine || a.isPoints) && a.castShadow && (!1 === a.frustumCulled || !0 === k.intersectsObject(a)) && !0 === a.material.visible && (a.modelViewMatrix.multiplyMatrices(e.matrixWorldInverse,
                    a.matrixWorld), w.push(a));
                a = a.children;
                for (var f = 0, q = a.length; f < q; f++) D(a[f], b, e)
            }
        }
        var C = a.context,
            c = a.state,
            k = new Pb,
            g = new z,
            l = b.shadows,
            h = new v,
            y = new v(f.maxTextureSize, f.maxTextureSize),
            m = new r,
            n = new r,
            w = [],
            t = Array(4),
            p = Array(4),
            pa = {},
            A = [new r(1, 0, 0), new r(-1, 0, 0), new r(0, 0, 1), new r(0, 0, -1), new r(0, 1, 0), new r(0, -1, 0)],
            S = [new r(0, 1, 0), new r(0, 1, 0), new r(0, 1, 0), new r(0, 1, 0), new r(0, 0, 1), new r(0, 0, -1)],
            E = [new na, new na, new na, new na, new na, new na];
        b = new Ea;
        b.depthPacking = 3201;
        b.clipping = !0;
        f = Tc.distanceRGBA;
        for (var H = d.UniformsUtils.clone(f.uniforms), u = 0; 4 !== u; ++u) {
            var B = 0 !== (u & 1),
                T = 0 !== (u & 2),
                O = b.clone();
            O.morphTargets = B;
            O.skinning = T;
            t[u] = O;
            B = new sa({
                defines: {
                    USE_SHADOWMAP: ""
                },
                uniforms: H,
                vertexShader: f.vertexShader,
                fragmentShader: f.fragmentShader,
                morphTargets: B,
                skinning: T,
                clipping: !0
            });
            p[u] = B
        }
        var x = this;
        this.enabled = !1;
        this.autoUpdate = !0;
        this.needsUpdate = !1;
        this.type = 1;
        this.renderSingleSided = this.renderReverseSided = !0;
        this.render = function(b, f) {
            if (!1 !== x.enabled && (!1 !== x.autoUpdate || !1 !== x.needsUpdate) &&
                0 !== l.length) {
                c.clearColor(1, 1, 1, 1);
                c.disable(C.BLEND);
                c.setDepthTest(!0);
                c.setScissorTest(!1);
                for (var d, t, r = 0, pa = l.length; r < pa; r++) {
                    var p = l[r],
                        sb = p.shadow;
                    if (void 0 === sb) console.warn("THREE.WebGLShadowMap:", p, "has no shadow.");
                    else {
                        var Ya = sb.camera;
                        h.copy(sb.mapSize);
                        h.min(y);
                        if (p && p.isPointLight) {
                            d = 6;
                            t = !0;
                            var v = h.x,
                                u = h.y;
                            E[0].set(2 * v, u, v, u);
                            E[1].set(0, u, v, u);
                            E[2].set(3 * v, u, v, u);
                            E[3].set(v, u, v, u);
                            E[4].set(3 * v, 0, v, u);
                            E[5].set(v, 0, v, u);
                            h.x *= 4;
                            h.y *= 2
                        } else d = 1, t = !1;
                        null === sb.map && (sb.map = new P(h.x, h.y, {
                            minFilter: 1003,
                            magFilter: 1003,
                            format: 1023
                        }), Ya.updateProjectionMatrix());
                        sb && sb.isSpotLightShadow && sb.update(p);
                        v = sb.map;
                        sb = sb.matrix;
                        n.setFromMatrixPosition(p.matrixWorld);
                        Ya.position.copy(n);
                        a.setRenderTarget(v);
                        a.clear();
                        for (v = 0; v < d; v++) {
                            t ? (m.copy(Ya.position), m.add(A[v]), Ya.up.copy(S[v]), Ya.lookAt(m), c.viewport(E[v])) : (m.setFromMatrixPosition(p.target.matrixWorld), Ya.lookAt(m));
                            Ya.updateMatrixWorld();
                            Ya.matrixWorldInverse.getInverse(Ya.matrixWorld);
                            sb.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0,
                                1);
                            sb.multiply(Ya.projectionMatrix);
                            sb.multiply(Ya.matrixWorldInverse);
                            g.multiplyMatrices(Ya.projectionMatrix, Ya.matrixWorldInverse);
                            k.setFromMatrix(g);
                            w.length = 0;
                            D(b, f, Ya);
                            for (var u = 0, H = w.length; u < H; u++) {
                                var B = w[u],
                                    z = e.update(B),
                                    O = B.material;
                                if (O && O.isMultiMaterial)
                                    for (var T = z.groups, O = O.materials, ab = 0, N = T.length; ab < N; ab++) {
                                        var L = T[ab],
                                            Y = O[L.materialIndex];
                                        !0 === Y.visible && (Y = q(B, Y, t, n), a.renderBufferDirect(Ya, null, z, Y, B, L))
                                    } else Y = q(B, O, t, n), a.renderBufferDirect(Ya, null, z, Y, B, null)
                            }
                        }
                    }
                }
                b = a.getClearColor();
                f = a.getClearAlpha();
                a.setClearColor(b, f);
                x.needsUpdate = !1
            }
        }
    }

    function Uc(a) {
        a = a.split("\n");
        for (var b = 0; b < a.length; b++) a[b] = b + 1 + ": " + a[b];
        return a.join("\n")
    }

    function Vc(a, b, e) {
        var f = a.createShader(b);
        a.shaderSource(f, e);
        a.compileShader(f);
        !1 === a.getShaderParameter(f, a.COMPILE_STATUS) && console.error("THREE.WebGLShader: Shader couldn't compile.");
        "" !== a.getShaderInfoLog(f) && console.warn("THREE.WebGLShader: gl.getShaderInfoLog()", b === a.VERTEX_SHADER ? "vertex" : "fragment", a.getShaderInfoLog(f), Uc(e));
        return f
    }

    function Hd() {
        var a = {};
        return {
            get: function(b) {
                b = b.uuid;
                var e = a[b];
                void 0 === e && (e = {}, a[b] = e);
                return e
            },
            delete: function(b) {
                delete a[b.uuid]
            },
            clear: function() {
                a = {}
            }
        }
    }

    function Ba(a) {
        switch (a) {
            case 3E3:
                return ["Linear", "( value )"];
            case 3001:
                return ["sRGB", "( value )"];
            case 3002:
                return ["RGBE", "( value )"];
            case 3004:
                return ["RGBM", "( value, 7.0 )"];
            case 3005:
                return ["RGBM", "( value, 16.0 )"];
            case 3006:
                return ["RGBD", "( value, 256.0 )"];
            case 3007:
                return ["Gamma", "( value, float( GAMMA_FACTOR ) )"];
            default:
                throw Error("unsupported encoding: " +
                    a);
        }
    }

    function h(a, b) {
        b = Ba(b);
        return "vec4 " + a + "( vec4 value ) { return " + b[0] + "ToLinear" + b[1] + "; }"
    }

    function be(a, b) {
        b = Ba(b);
        return "vec4 " + a + "( vec4 value ) { return LinearTo" + b[0] + b[1] + "; }"
    }

    function ce(a, b) {
        switch (b) {
            case 1:
                b = "Linear";
                break;
            case 2:
                b = "Reinhard";
                break;
            case 3:
                b = "Uncharted2";
                break;
            case 4:
                b = "OptimizedCineon";
                break;
            default:
                throw Error("unsupported toneMapping: " + b);
        }
        return "vec3 " + a + "( vec3 color ) { return " + b + "ToneMapping( color ); }"
    }

    function de(a, b, e) {
        a = a || {};
        return [a.derivatives ||
            b.envMapCubeUV || b.bumpMap || b.normalMap || b.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", (a.fragDepth || b.logarithmicDepthBuffer) && e.get("EXT_frag_depth") ? "#extension GL_EXT_frag_depth : enable" : "", a.drawBuffers && e.get("WEBGL_draw_buffers") ? "#extension GL_EXT_draw_buffers : require" : "", (a.shaderTextureLOD || b.envMap) && e.get("EXT_shader_texture_lod") ? "#extension GL_EXT_shader_texture_lod : enable" : ""
        ].filter(kb).join("\n")
    }

    function ee(a) {
        var b = [],
            e;
        for (e in a) {
            var f = a[e];
            !1 !== f && b.push("#define " +
                e + " " + f)
        }
        return b.join("\n")
    }

    function kb(a) {
        return "" !== a
    }

    function bc(a, b) {
        return a.replace(/NUM_DIR_LIGHTS/g, b.numDirLights).replace(/NUM_SPOT_LIGHTS/g, b.numSpotLights).replace(/NUM_POINT_LIGHTS/g, b.numPointLights).replace(/NUM_HEMI_LIGHTS/g, b.numHemiLights)
    }

    function Wc(a) {
        return a.replace(/#include +<([\w\d.]+)>/g, function(a, e) {
            a = va[e];
            if (void 0 === a) throw Error("Can not resolve #include <" + e + ">");
            return Wc(a)
        })
    }

    function od(a) {
        return a.replace(/for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
            function(a, e, f, q) {
                a = "";
                for (e = parseInt(e); e < parseInt(f); e++) a += q.replace(/\[ i \]/g, "[ " + e + " ]");
                return a
            })
    }

    function pd(a, b, e, f) {
        var q = a.context,
            D = e.extensions,
            C = e.defines,
            c = e.__webglShader.vertexShader,
            d = e.__webglShader.fragmentShader,
            k = "SHADOWMAP_TYPE_BASIC";
        1 === f.shadowMapType ? k = "SHADOWMAP_TYPE_PCF" : 2 === f.shadowMapType && (k = "SHADOWMAP_TYPE_PCF_SOFT");
        var g = "ENVMAP_TYPE_CUBE",
            l = "ENVMAP_MODE_REFLECTION",
            y = "ENVMAP_BLENDING_MULTIPLY";
        if (f.envMap) {
            switch (e.envMap.mapping) {
                case 301:
                case 302:
                    g = "ENVMAP_TYPE_CUBE";
                    break;
                case 306:
                case 307:
                    g = "ENVMAP_TYPE_CUBE_UV";
                    break;
                case 303:
                case 304:
                    g = "ENVMAP_TYPE_EQUIREC";
                    break;
                case 305:
                    g = "ENVMAP_TYPE_SPHERE"
            }
            switch (e.envMap.mapping) {
                case 302:
                case 304:
                    l = "ENVMAP_MODE_REFRACTION"
            }
            switch (e.combine) {
                case 0:
                    y = "ENVMAP_BLENDING_MULTIPLY";
                    break;
                case 1:
                    y = "ENVMAP_BLENDING_MIX";
                    break;
                case 2:
                    y = "ENVMAP_BLENDING_ADD"
            }
        }
        var m = 0 < a.gammaFactor ? a.gammaFactor : 1,
            D = de(D, f, a.extensions),
            n = ee(C),
            w = q.createProgram();
        e.isRawShaderMaterial ? (C = [n, "\n"].filter(kb).join("\n"), k = [D, n, "\n"].filter(kb).join("\n")) :
            (C = ["precision " + f.precision + " float;", "precision " + f.precision + " int;", "#define SHADER_NAME " + e.__webglShader.name, n, f.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", "#define GAMMA_FACTOR " + m, "#define MAX_BONES " + f.maxBones, f.map ? "#define USE_MAP" : "", f.envMap ? "#define USE_ENVMAP" : "", f.envMap ? "#define " + l : "", f.lightMap ? "#define USE_LIGHTMAP" : "", f.aoMap ? "#define USE_AOMAP" : "", f.emissiveMap ? "#define USE_EMISSIVEMAP" : "", f.bumpMap ? "#define USE_BUMPMAP" : "", f.normalMap ? "#define USE_NORMALMAP" : "", f.displacementMap &&
                f.supportsVertexTextures ? "#define USE_DISPLACEMENTMAP" : "", f.specularMap ? "#define USE_SPECULARMAP" : "", f.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", f.metalnessMap ? "#define USE_METALNESSMAP" : "", f.alphaMap ? "#define USE_ALPHAMAP" : "", f.vertexColors ? "#define USE_COLOR" : "", f.flatShading ? "#define FLAT_SHADED" : "", f.skinning ? "#define USE_SKINNING" : "", f.useVertexTexture ? "#define BONE_TEXTURE" : "", f.morphTargets ? "#define USE_MORPHTARGETS" : "", f.morphNormals && !1 === f.flatShading ? "#define USE_MORPHNORMALS" : "", f.doubleSided ?
                "#define DOUBLE_SIDED" : "", f.flipSided ? "#define FLIP_SIDED" : "", "#define NUM_CLIPPING_PLANES " + f.numClippingPlanes, f.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", f.shadowMapEnabled ? "#define " + k : "", f.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", f.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", f.logarithmicDepthBuffer && a.extensions.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;",
                "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;",
                "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"
            ].filter(kb).join("\n"), k = [D, "precision " + f.precision + " float;", "precision " + f.precision + " int;", "#define SHADER_NAME " + e.__webglShader.name, n, f.alphaTest ? "#define ALPHATEST " + f.alphaTest : "", "#define GAMMA_FACTOR " + m, f.useFog && f.fog ? "#define USE_FOG" :
                "", f.useFog && f.fogExp ? "#define FOG_EXP2" : "", f.map ? "#define USE_MAP" : "", f.envMap ? "#define USE_ENVMAP" : "", f.envMap ? "#define " + g : "", f.envMap ? "#define " + l : "", f.envMap ? "#define " + y : "", f.lightMap ? "#define USE_LIGHTMAP" : "", f.aoMap ? "#define USE_AOMAP" : "", f.emissiveMap ? "#define USE_EMISSIVEMAP" : "", f.bumpMap ? "#define USE_BUMPMAP" : "", f.normalMap ? "#define USE_NORMALMAP" : "", f.specularMap ? "#define USE_SPECULARMAP" : "", f.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", f.metalnessMap ? "#define USE_METALNESSMAP" : "", f.alphaMap ?
                "#define USE_ALPHAMAP" : "", f.vertexColors ? "#define USE_COLOR" : "", f.flatShading ? "#define FLAT_SHADED" : "", f.doubleSided ? "#define DOUBLE_SIDED" : "", f.flipSided ? "#define FLIP_SIDED" : "", "#define NUM_CLIPPING_PLANES " + f.numClippingPlanes, f.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", f.shadowMapEnabled ? "#define " + k : "", f.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", f.physicallyCorrectLights ? "#define PHYSICALLY_CORRECT_LIGHTS" : "", f.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", f.logarithmicDepthBuffer &&
                a.extensions.get("EXT_frag_depth") ? "#define USE_LOGDEPTHBUF_EXT" : "", f.envMap && a.extensions.get("EXT_shader_texture_lod") ? "#define TEXTURE_LOD_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", 0 !== f.toneMapping ? "#define TONE_MAPPING" : "", 0 !== f.toneMapping ? va.tonemapping_pars_fragment : "", 0 !== f.toneMapping ? ce("toneMapping", f.toneMapping) : "", f.outputEncoding || f.mapEncoding || f.envMapEncoding || f.emissiveMapEncoding ? va.encodings_pars_fragment : "", f.mapEncoding ? h("mapTexelToLinear", f.mapEncoding) :
                "", f.envMapEncoding ? h("envMapTexelToLinear", f.envMapEncoding) : "", f.emissiveMapEncoding ? h("emissiveMapTexelToLinear", f.emissiveMapEncoding) : "", f.outputEncoding ? be("linearToOutputTexel", f.outputEncoding) : "", f.depthPacking ? "#define DEPTH_PACKING " + e.depthPacking : "", "\n"
            ].filter(kb).join("\n"));
        c = Wc(c, f);
        c = bc(c, f);
        d = Wc(d, f);
        d = bc(d, f);
        e.isShaderMaterial || (c = od(c), d = od(d));
        d = k + d;
        c = Vc(q, q.VERTEX_SHADER, C + c);
        d = Vc(q, q.FRAGMENT_SHADER, d);
        q.attachShader(w, c);
        q.attachShader(w, d);
        void 0 !== e.index0AttributeName ?
            q.bindAttribLocation(w, 0, e.index0AttributeName) : !0 === f.morphTargets && q.bindAttribLocation(w, 0, "position");
        q.linkProgram(w);
        f = q.getProgramInfoLog(w);
        g = q.getShaderInfoLog(c);
        l = q.getShaderInfoLog(d);
        m = y = !0;
        if (!1 === q.getProgramParameter(w, q.LINK_STATUS)) y = !1, console.error("THREE.WebGLProgram: shader error: ", q.getError(), "gl.VALIDATE_STATUS", q.getProgramParameter(w, q.VALIDATE_STATUS), "gl.getProgramInfoLog", f, g, l);
        else if ("" !== f) console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()", f);
        else if ("" ===
            g || "" === l) m = !1;
        m && (this.diagnostics = {
            runnable: y,
            material: e,
            programLog: f,
            vertexShader: {
                log: g,
                prefix: C
            },
            fragmentShader: {
                log: l,
                prefix: k
            }
        });
        q.deleteShader(c);
        q.deleteShader(d);
        var t;
        this.getUniforms = function() {
            void 0 === t && (t = new Ka(q, w, a));
            return t
        };
        var r;
        this.getAttributes = function() {
            if (void 0 === r) {
                for (var a = {}, b = q.getProgramParameter(w, q.ACTIVE_ATTRIBUTES), e = 0; e < b; e++) {
                    var f = q.getActiveAttrib(w, e).name;
                    a[f] = q.getAttribLocation(w, f)
                }
                r = a
            }
            return r
        };
        this.destroy = function() {
            q.deleteProgram(w);
            this.program =
                void 0
        };
        Object.defineProperties(this, {
            uniforms: {
                get: function() {
                    console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms().");
                    return this.getUniforms()
                }
            },
            attributes: {
                get: function() {
                    console.warn("THREE.WebGLProgram: .attributes is now .getAttributes().");
                    return this.getAttributes()
                }
            }
        });
        this.id = Ke++;
        this.code = b;
        this.usedTimes = 1;
        this.program = w;
        this.vertexShader = c;
        this.fragmentShader = d;
        return this
    }

    function Id(a, b) {
        function e(a, b) {
            var e;
            a ? a && a.isTexture ? e = a.encoding : a && a.isWebGLRenderTarget && (console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),
                e = a.texture.encoding) : e = 3E3;
            3E3 === e && b && (e = 3007);
            return e
        }
        var f = [],
            q = {
                MeshDepthMaterial: "depth",
                MeshNormalMaterial: "normal",
                MeshBasicMaterial: "basic",
                MeshLambertMaterial: "lambert",
                MeshPhongMaterial: "phong",
                MeshStandardMaterial: "physical",
                MeshPhysicalMaterial: "physical",
                LineBasicMaterial: "basic",
                LineDashedMaterial: "dashed",
                PointsMaterial: "points"
            },
            D = "precision supportsVertexTextures map mapEncoding envMap envMapMode envMapEncoding lightMap aoMap emissiveMap emissiveMapEncoding bumpMap normalMap displacementMap specularMap roughnessMap metalnessMap alphaMap combine vertexColors fog useFog fogExp flatShading sizeAttenuation logarithmicDepthBuffer skinning maxBones useVertexTexture morphTargets morphNormals maxMorphTargets maxMorphNormals premultipliedAlpha numDirLights numPointLights numSpotLights numHemiLights shadowMapEnabled shadowMapType toneMapping physicallyCorrectLights alphaTest doubleSided flipSided numClippingPlanes depthPacking".split(" ");
        this.getParameters = function(f, D, c, d, k) {
            var g = q[f.type],
                l;
            b.floatVertexTextures && k && k.skeleton && k.skeleton.useVertexTexture ? l = 1024 : (l = Math.floor((b.maxVertexUniforms - 20) / 4), void 0 !== k && k && k.isSkinnedMesh && (l = Math.min(k.skeleton.bones.length, l), l < k.skeleton.bones.length && console.warn("WebGLRenderer: too many bones - " + k.skeleton.bones.length + ", this GPU supports just " + l + " (try OpenGL instead of ANGLE)")));
            var h = a.getPrecision();
            null !== f.precision && (h = b.getMaxPrecision(f.precision), h !== f.precision &&
                console.warn("THREE.WebGLProgram.getParameters:", f.precision, "not supported, using", h, "instead."));
            var m = a.getCurrentRenderTarget();
            return {
                shaderID: g,
                precision: h,
                supportsVertexTextures: b.vertexTextures,
                outputEncoding: e(m ? m.texture : null, a.gammaOutput),
                map: !!f.map,
                mapEncoding: e(f.map, a.gammaInput),
                envMap: !!f.envMap,
                envMapMode: f.envMap && f.envMap.mapping,
                envMapEncoding: e(f.envMap, a.gammaInput),
                envMapCubeUV: !!f.envMap && (306 === f.envMap.mapping || 307 === f.envMap.mapping),
                lightMap: !!f.lightMap,
                aoMap: !!f.aoMap,
                emissiveMap: !!f.emissiveMap,
                emissiveMapEncoding: e(f.emissiveMap, a.gammaInput),
                bumpMap: !!f.bumpMap,
                normalMap: !!f.normalMap,
                displacementMap: !!f.displacementMap,
                roughnessMap: !!f.roughnessMap,
                metalnessMap: !!f.metalnessMap,
                specularMap: !!f.specularMap,
                alphaMap: !!f.alphaMap,
                combine: f.combine,
                vertexColors: f.vertexColors,
                fog: !!c,
                useFog: f.fog,
                fogExp: c && c.isFogExp2,
                flatShading: 1 === f.shading,
                sizeAttenuation: f.sizeAttenuation,
                logarithmicDepthBuffer: b.logarithmicDepthBuffer,
                skinning: f.skinning,
                maxBones: l,
                useVertexTexture: b.floatVertexTextures &&
                    k && k.skeleton && k.skeleton.useVertexTexture,
                morphTargets: f.morphTargets,
                morphNormals: f.morphNormals,
                maxMorphTargets: a.maxMorphTargets,
                maxMorphNormals: a.maxMorphNormals,
                numDirLights: D.directional.length,
                numPointLights: D.point.length,
                numSpotLights: D.spot.length,
                numHemiLights: D.hemi.length,
                numClippingPlanes: d,
                shadowMapEnabled: a.shadowMap.enabled && k.receiveShadow && 0 < D.shadows.length,
                shadowMapType: a.shadowMap.type,
                toneMapping: a.toneMapping,
                physicallyCorrectLights: a.physicallyCorrectLights,
                premultipliedAlpha: f.premultipliedAlpha,
                alphaTest: f.alphaTest,
                doubleSided: 2 === f.side,
                flipSided: 1 === f.side,
                depthPacking: void 0 !== f.depthPacking ? f.depthPacking : !1
            }
        };
        this.getProgramCode = function(a, b) {
            var e = [];
            b.shaderID ? e.push(b.shaderID) : (e.push(a.fragmentShader), e.push(a.vertexShader));
            if (void 0 !== a.defines)
                for (var f in a.defines) e.push(f), e.push(a.defines[f]);
            for (a = 0; a < D.length; a++) e.push(b[D[a]]);
            return e.join()
        };
        this.acquireProgram = function(b, e, q) {
            for (var D, c = 0, d = f.length; c < d; c++) {
                var k = f[c];
                if (k.code === q) {
                    D = k;
                    ++D.usedTimes;
                    break
                }
            }
            void 0 ===
                D && (D = new pd(a, q, b, e), f.push(D));
            return D
        };
        this.releaseProgram = function(a) {
            if (0 === --a.usedTimes) {
                var b = f.indexOf(a);
                f[b] = f[f.length - 1];
                f.pop();
                a.destroy()
            }
        };
        this.programs = f
    }

    function J(a, b, e) {
        if (Array.isArray(a)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
        this.uuid = d.Math.generateUUID();
        this.array = a;
        this.itemSize = b;
        this.normalized = !0 === e;
        this.dynamic = !1;
        this.updateRange = {
            offset: 0,
            count: -1
        };
        this.version = 0
    }

    function Jd(a, b) {
        return new J(new Uint16Array(a), b)
    }

    function Kd(a,
        b) {
        return new J(new Uint32Array(a), b)
    }

    function bb(a, b) {
        return new J(new Float32Array(a), b)
    }

    function ja(a, b, e, f, q, D) {
        this.a = a;
        this.b = b;
        this.c = e;
        this.normal = f && f.isVector3 ? f : new r;
        this.vertexNormals = Array.isArray(f) ? f : [];
        this.color = q && q.isColor ? q : new G;
        this.vertexColors = Array.isArray(q) ? q : [];
        this.materialIndex = void 0 !== D ? D : 0
    }

    function Qb(a, b, e, f) {
        this._x = a || 0;
        this._y = b || 0;
        this._z = e || 0;
        this._order = f || Qb.DefaultOrder
    }

    function jc() {
        this.mask = 1
    }

    function M() {
        Object.defineProperty(this, "id", {
            value: Be++
        });
        this.uuid = d.Math.generateUUID();
        this.name = "";
        this.type = "Object3D";
        this.parent = null;
        this.children = [];
        this.up = M.DefaultUp.clone();
        var a = new r,
            b = new Qb,
            e = new x,
            f = new r(1, 1, 1);
        b.onChange(function() {
            e.setFromEuler(b, !1)
        });
        e.onChange(function() {
            b.setFromQuaternion(e, void 0, !1)
        });
        Object.defineProperties(this, {
            position: {
                enumerable: !0,
                value: a
            },
            rotation: {
                enumerable: !0,
                value: b
            },
            quaternion: {
                enumerable: !0,
                value: e
            },
            scale: {
                enumerable: !0,
                value: f
            },
            modelViewMatrix: {
                value: new z
            },
            normalMatrix: {
                value: new Ta
            }
        });
        this.matrix =
            new z;
        this.matrixWorld = new z;
        this.matrixAutoUpdate = M.DefaultMatrixAutoUpdate;
        this.matrixWorldNeedsUpdate = !1;
        this.layers = new jc;
        this.visible = !0;
        this.receiveShadow = this.castShadow = !1;
        this.frustumCulled = !0;
        this.renderOrder = 0;
        this.userData = {}
    }

    function ba() {
        Object.defineProperty(this, "id", {
            value: Ld++
        });
        this.uuid = d.Math.generateUUID();
        this.name = "";
        this.type = "Geometry";
        this.vertices = [];
        this.colors = [];
        this.faces = [];
        this.faceVertexUvs = [
            []
        ];
        this.morphTargets = [];
        this.morphNormals = [];
        this.skinWeights = [];
        this.skinIndices = [];
        this.lineDistances = [];
        this.boundingSphere = this.boundingBox = null;
        this.groupsNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate = this.uvsNeedUpdate = this.verticesNeedUpdate = this.elementsNeedUpdate = !1
    }

    function Z() {
        Object.defineProperty(this, "id", {
            value: Ld++
        });
        this.uuid = d.Math.generateUUID();
        this.name = "";
        this.type = "DirectGeometry";
        this.indices = [];
        this.vertices = [];
        this.normals = [];
        this.colors = [];
        this.uvs = [];
        this.uvs2 = [];
        this.groups = [];
        this.morphTargets = {};
        this.skinWeights = [];
        this.skinIndices = [];
        this.boundingSphere = this.boundingBox = null;
        this.groupsNeedUpdate = this.uvsNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate = this.verticesNeedUpdate = !1
    }

    function W() {
        Object.defineProperty(this, "id", {
            value: Ld++
        });
        this.uuid = d.Math.generateUUID();
        this.name = "";
        this.type = "BufferGeometry";
        this.index = null;
        this.attributes = {};
        this.morphAttributes = {};
        this.groups = [];
        this.boundingSphere = this.boundingBox = null;
        this.drawRange = {
            start: 0,
            count: Infinity
        }
    }

    function Md(a, b, e) {
        function f(a) {
            var c =
                a.target;
            a = D[c.id];
            null !== a.index && q(a.index);
            var d = a.attributes,
                k;
            for (k in d) q(d[k]);
            c.removeEventListener("dispose", f);
            delete D[c.id];
            k = b.get(c);
            k.wireframe && q(k.wireframe);
            b.delete(c);
            c = b.get(a);
            c.wireframe && q(c.wireframe);
            b.delete(a);
            e.memory.geometries--
        }

        function q(e) {
            var f;
            f = e.isInterleavedBufferAttribute ? b.get(e.data).__webglBuffer : b.get(e).__webglBuffer;
            void 0 !== f && (a.deleteBuffer(f), e.isInterleavedBufferAttribute ? b.delete(e.data) : b.delete(e))
        }
        var D = {};
        return {
            get: function(a) {
                var b = a.geometry;
                if (void 0 !== D[b.id]) return D[b.id];
                b.addEventListener("dispose", f);
                var q;
                b.isBufferGeometry ? q = b : b.isGeometry && (void 0 === b._bufferGeometry && (b._bufferGeometry = (new W).setFromObject(a)), q = b._bufferGeometry);
                D[b.id] = q;
                e.memory.geometries++;
                return q
            }
        }
    }

    function Nd(a, b, e) {
        function f(e, f) {
            e = e.isInterleavedBufferAttribute ? e.data : e;
            var q = b.get(e);
            void 0 === q.__webglBuffer ? (q.__webglBuffer = a.createBuffer(), a.bindBuffer(f, q.__webglBuffer), a.bufferData(f, e.array, e.dynamic ? a.DYNAMIC_DRAW : a.STATIC_DRAW), q.version =
                e.version) : q.version !== e.version && (a.bindBuffer(f, q.__webglBuffer), !1 === e.dynamic || -1 === e.updateRange.count ? a.bufferSubData(f, 0, e.array) : 0 === e.updateRange.count ? console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually.") : (a.bufferSubData(f, e.updateRange.offset * e.array.BYTES_PER_ELEMENT, e.array.subarray(e.updateRange.offset, e.updateRange.offset + e.updateRange.count)), e.updateRange.count =
                0), q.version = e.version)
        }

        function q(a, b, e) {
            if (b > e) {
                var f = b;
                b = e;
                e = f
            }
            f = a[b];
            return void 0 === f ? (a[b] = [e], !0) : -1 === f.indexOf(e) ? (f.push(e), !0) : !1
        }
        var D = new Md(a, b, e);
        return {
            getAttributeBuffer: function(a) {
                return a.isInterleavedBufferAttribute ? b.get(a.data).__webglBuffer : b.get(a).__webglBuffer
            },
            getWireframeAttribute: function(e) {
                var D = b.get(e);
                if (void 0 !== D.wireframe) return D.wireframe;
                var c = [],
                    d = e.index,
                    k = e.attributes;
                e = k.position;
                if (null !== d)
                    for (var k = {}, d = d.array, g = 0, l = d.length; g < l; g += 3) {
                        var h = d[g + 0],
                            m = d[g + 1],
                            n = d[g + 2];
                        q(k, h, m) && c.push(h, m);
                        q(k, m, n) && c.push(m, n);
                        q(k, n, h) && c.push(n, h)
                    } else
                        for (d = k.position.array, g = 0, l = d.length / 3 - 1; g < l; g += 3) h = g + 0, m = g + 1, n = g + 2, c.push(h, m, m, n, n, h);
                c = new J(new(65535 < e.count ? Uint32Array : Uint16Array)(c), 1);
                f(c, a.ELEMENT_ARRAY_BUFFER);
                return D.wireframe = c
            },
            update: function(b) {
                var e = D.get(b);
                b.geometry.isGeometry && e.updateFromObject(b);
                b = e.index;
                var q = e.attributes;
                null !== b && f(b, a.ELEMENT_ARRAY_BUFFER);
                for (var c in q) f(q[c], a.ARRAY_BUFFER);
                b = e.morphAttributes;
                for (c in b)
                    for (var q =
                            b[c], d = 0, k = q.length; d < k; d++) f(q[d], a.ARRAY_BUFFER);
                return e
            }
        }
    }

    function qd() {
        var a = {};
        return {
            get: function(b) {
                if (void 0 !== a[b.id]) return a[b.id];
                var e;
                switch (b.type) {
                    case "DirectionalLight":
                        e = {
                            direction: new r,
                            color: new G,
                            shadow: !1,
                            shadowBias: 0,
                            shadowRadius: 1,
                            shadowMapSize: new v
                        };
                        break;
                    case "SpotLight":
                        e = {
                            position: new r,
                            direction: new r,
                            color: new G,
                            distance: 0,
                            coneCos: 0,
                            penumbraCos: 0,
                            decay: 0,
                            shadow: !1,
                            shadowBias: 0,
                            shadowRadius: 1,
                            shadowMapSize: new v
                        };
                        break;
                    case "PointLight":
                        e = {
                            position: new r,
                            color: new G,
                            distance: 0,
                            decay: 0,
                            shadow: !1,
                            shadowBias: 0,
                            shadowRadius: 1,
                            shadowMapSize: new v
                        };
                        break;
                    case "HemisphereLight":
                        e = {
                            direction: new r,
                            skyColor: new G,
                            groundColor: new G
                        }
                }
                return a[b.id] = e
            }
        }
    }

    function kc(a, b, e) {
        function f(b) {
            if ("highp" === b) {
                if (0 < a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.HIGH_FLOAT).precision && 0 < a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT).precision) return "highp";
                b = "mediump"
            }
            return "mediump" === b && 0 < a.getShaderPrecisionFormat(a.VERTEX_SHADER, a.MEDIUM_FLOAT).precision && 0 < a.getShaderPrecisionFormat(a.FRAGMENT_SHADER,
                a.MEDIUM_FLOAT).precision ? "mediump" : "lowp"
        }
        var q, D = void 0 !== e.precision ? e.precision : "highp",
            c = f(D);
        c !== D && (console.warn("THREE.WebGLRenderer:", D, "not supported, using", c, "instead."), D = c);
        e = !0 === e.logarithmicDepthBuffer && !!b.get("EXT_frag_depth");
        var c = a.getParameter(a.MAX_TEXTURE_IMAGE_UNITS),
            d = a.getParameter(a.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
            k = a.getParameter(a.MAX_TEXTURE_SIZE),
            g = a.getParameter(a.MAX_CUBE_MAP_TEXTURE_SIZE),
            l = a.getParameter(a.MAX_VERTEX_ATTRIBS),
            h = a.getParameter(a.MAX_VERTEX_UNIFORM_VECTORS),
            y = a.getParameter(a.MAX_VARYING_VECTORS),
            m = a.getParameter(a.MAX_FRAGMENT_UNIFORM_VECTORS),
            n = 0 < d,
            w = !!b.get("OES_texture_float");
        return {
            getMaxAnisotropy: function() {
                if (void 0 !== q) return q;
                var e = b.get("EXT_texture_filter_anisotropic");
                return q = null !== e ? a.getParameter(e.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
            },
            getMaxPrecision: f,
            precision: D,
            logarithmicDepthBuffer: e,
            maxTextures: c,
            maxVertexTextures: d,
            maxTextureSize: k,
            maxCubemapSize: g,
            maxAttributes: l,
            maxVertexUniforms: h,
            maxVaryings: y,
            maxFragmentUniforms: m,
            vertexTextures: n,
            floatFragmentTextures: w,
            floatVertexTextures: n && w
        }
    }

    function Rb(a) {
        var b = {};
        return {
            get: function(e) {
                if (void 0 !== b[e]) return b[e];
                var f;
                switch (e) {
                    case "WEBGL_depth_texture":
                        f = a.getExtension("WEBGL_depth_texture") || a.getExtension("MOZ_WEBGL_depth_texture") || a.getExtension("WEBKIT_WEBGL_depth_texture");
                        break;
                    case "EXT_texture_filter_anisotropic":
                        f = a.getExtension("EXT_texture_filter_anisotropic") || a.getExtension("MOZ_EXT_texture_filter_anisotropic") || a.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
                        break;
                    case "WEBGL_compressed_texture_s3tc":
                        f = a.getExtension("WEBGL_compressed_texture_s3tc") || a.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || a.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
                        break;
                    case "WEBGL_compressed_texture_pvrtc":
                        f = a.getExtension("WEBGL_compressed_texture_pvrtc") || a.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
                        break;
                    case "WEBGL_compressed_texture_etc1":
                        f = a.getExtension("WEBGL_compressed_texture_etc1");
                        break;
                    default:
                        f = a.getExtension(e)
                }
                null === f && console.warn("THREE.WebGLRenderer: " +
                    e + " extension not supported.");
                return b[e] = f
            }
        }
    }

    function Ac(a, b, e) {
        var f, q, D;
        return {
            setMode: function(a) {
                f = a
            },
            setIndex: function(e) {
                e.array instanceof Uint32Array && b.get("OES_element_index_uint") ? (q = a.UNSIGNED_INT, D = 4) : (q = a.UNSIGNED_SHORT, D = 2)
            },
            render: function(b, c) {
                a.drawElements(f, c, q, b * D);
                e.calls++;
                e.vertices += c;
                f === a.TRIANGLES && (e.faces += c / 3)
            },
            renderInstances: function(c, d, k) {
                var g = b.get("ANGLE_instanced_arrays");
                null === g ? console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.") :
                    (g.drawElementsInstancedANGLE(f, k, q, d * D, c.maxInstancedCount), e.calls++, e.vertices += k * c.maxInstancedCount, f === a.TRIANGLES && (e.faces += c.maxInstancedCount * k / 3))
            }
        }
    }

    function rd() {
        function a() {
            g.value !== f && (g.value = f, g.needsUpdate = 0 < q);
            e.numPlanes = q
        }

        function b(a, b, f, q) {
            var D = null !== a ? a.length : 0,
                c = null;
            if (0 !== D) {
                c = g.value;
                if (!0 !== q || null === c) {
                    q = f + 4 * D;
                    b = b.matrixWorldInverse;
                    k.getNormalMatrix(b);
                    if (null === c || c.length < q) c = new Float32Array(q);
                    for (q = 0; q !== D; ++q, f += 4) d.copy(a[q]).applyMatrix4(b, k), d.normal.toArray(c,
                        f), c[f + 3] = d.constant
                }
                g.value = c;
                g.needsUpdate = !0
            }
            e.numPlanes = D;
            return c
        }
        var e = this,
            f = null,
            q = 0,
            D = !1,
            c = !1,
            d = new Za,
            k = new Ta,
            g = {
                value: null,
                needsUpdate: !1
            };
        this.uniform = g;
        this.numPlanes = 0;
        this.init = function(a, e, c) {
            var C = 0 !== a.length || e || 0 !== q || D;
            D = e;
            f = b(a, c, 0);
            q = a.length;
            return C
        };
        this.beginShadows = function() {
            c = !0;
            b(null)
        };
        this.endShadows = function() {
            c = !1;
            a()
        };
        this.setState = function(e, d, I, k, l) {
            if (!D || null === e || 0 === e.length || c && !d) c ? b(null) : a();
            else {
                d = c ? 0 : q;
                var h = 4 * d,
                    ia = k.clippingState || null;
                g.value = ia;
                ia = b(e, I, h, l);
                for (e = 0; e !== h; ++e) ia[e] = f[e];
                k.clippingState = ia;
                this.numPlanes += d
            }
        }
    }

    function sd(a, b, e) {
        var f;
        return {
            setMode: function(a) {
                f = a
            },
            render: function(b, D) {
                a.drawArrays(f, b, D);
                e.calls++;
                e.vertices += D;
                f === a.TRIANGLES && (e.faces += D / 3)
            },
            renderInstances: function(q) {
                var D = b.get("ANGLE_instanced_arrays");
                if (null === D) console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                else {
                    var c = q.attributes.position,
                        c = c && c.isInterleavedBufferAttribute ?
                        c.data.count : c.count;
                    D.drawArraysInstancedANGLE(f, 0, c, q.maxInstancedCount);
                    e.calls++;
                    e.vertices += c * q.maxInstancedCount;
                    f === a.TRIANGLES && (e.faces += q.maxInstancedCount * c / 3)
                }
            }
        }
    }

    function cc(a, b, e) {
        P.call(this, a, b, e);
        this.activeMipMapLevel = this.activeCubeFace = 0
    }

    function dc(a, b, e, f, q, D) {
        function c(a, b, e, f, q, D, C, k, g, ia, V) {
            var v = D / g,
                A = C / ia,
                u = D / 2,
                E = C / 2,
                B = k / 2;
            C = g + 1;
            for (var H = ia + 1, z = D = 0, O = new r, T = 0; T < H; T++)
                for (var x = T * A - E, L = 0; L < C; L++) O[a] = (L * v - u) * f, O[b] = x * q, O[e] = B, h[n] = O.x, h[n + 1] = O.y, h[n + 2] = O.z, O[a] = 0, O[b] =
                    0, O[e] = 0 < k ? 1 : -1, y[n] = O.x, y[n + 1] = O.y, y[n + 2] = O.z, m[w] = L / g, m[w + 1] = 1 - T / ia, n += 3, w += 2, D += 1;
            for (T = 0; T < ia; T++)
                for (L = 0; L < g; L++) a = p + L + C * (T + 1), b = p + (L + 1) + C * (T + 1), e = p + (L + 1) + C * T, l[t] = p + L + C * T, l[t + 1] = a, l[t + 2] = e, l[t + 3] = a, l[t + 4] = b, l[t + 5] = e, t += 6, z += 6;
            d.addGroup(pa, z, V);
            pa += z;
            p += D
        }
        W.call(this);
        this.type = "BoxBufferGeometry";
        this.parameters = {
            width: a,
            height: b,
            depth: e,
            widthSegments: f,
            heightSegments: q,
            depthSegments: D
        };
        var d = this;
        f = Math.floor(f) || 1;
        q = Math.floor(q) || 1;
        D = Math.floor(D) || 1;
        var k = function(a, b, e) {
                return a = 0 + (a +
                    1) * (b + 1) * 2 + (a + 1) * (e + 1) * 2 + (e + 1) * (b + 1) * 2
            }(f, q, D),
            g = function(a, b, e) {
                a = 0 + a * b * 2 + a * e * 2 + e * b * 2;
                return 6 * a
            }(f, q, D),
            l = new(65535 < g ? Uint32Array : Uint16Array)(g),
            h = new Float32Array(3 * k),
            y = new Float32Array(3 * k),
            m = new Float32Array(2 * k),
            n = 0,
            w = 0,
            t = 0,
            p = 0,
            pa = 0;
        c("z", "y", "x", -1, -1, e, b, a, D, q, 0);
        c("z", "y", "x", 1, -1, e, b, -a, D, q, 1);
        c("x", "z", "y", 1, 1, a, e, b, f, D, 2);
        c("x", "z", "y", 1, -1, a, e, -b, f, D, 3);
        c("x", "y", "z", 1, -1, a, b, e, f, q, 4);
        c("x", "y", "z", -1, -1, a, b, -e, f, q, 5);
        this.setIndex(new J(l, 1));
        this.addAttribute("position", new J(h,
            3));
        this.addAttribute("normal", new J(y, 3));
        this.addAttribute("uv", new J(m, 2))
    }

    function Gb(a, b) {
        this.origin = void 0 !== a ? a : new r;
        this.direction = void 0 !== b ? b : new r
    }

    function Va(a, b) {
        this.start = void 0 !== a ? a : new r;
        this.end = void 0 !== b ? b : new r
    }

    function hb(a, b, e) {
        this.a = void 0 !== a ? a : new r;
        this.b = void 0 !== b ? b : new r;
        this.c = void 0 !== e ? e : new r
    }

    function cb(a) {
        K.call(this);
        this.type = "MeshBasicMaterial";
        this.color = new G(16777215);
        this.aoMap = this.map = null;
        this.aoMapIntensity = 1;
        this.envMap = this.alphaMap = this.specularMap =
            null;
        this.combine = 0;
        this.reflectivity = 1;
        this.refractionRatio = .98;
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.wireframeLinejoin = this.wireframeLinecap = "round";
        this.lights = this.morphTargets = this.skinning = !1;
        this.setValues(a)
    }

    function Na(a, b) {
        M.call(this);
        this.type = "Mesh";
        this.geometry = void 0 !== a ? a : new W;
        this.material = void 0 !== b ? b : new cb({
            color: 16777215 * Math.random()
        });
        this.drawMode = 0;
        this.updateMorphTargets()
    }

    function lc(a, b, e, f) {
        W.call(this);
        this.type = "PlaneBufferGeometry";
        this.parameters = {
            width: a,
            height: b,
            widthSegments: e,
            heightSegments: f
        };
        var q = a / 2,
            D = b / 2;
        e = Math.floor(e) || 1;
        f = Math.floor(f) || 1;
        var c = e + 1,
            d = f + 1,
            k = a / e,
            g = b / f;
        b = new Float32Array(c * d * 3);
        a = new Float32Array(c * d * 3);
        for (var l = new Float32Array(c * d * 2), h = 0, y = 0, m = 0; m < d; m++)
            for (var n = m * g - D, w = 0; w < c; w++) b[h] = w * k - q, b[h + 1] = -n, a[h + 2] = 1, l[y] = w / e, l[y + 1] = 1 - m / f, h += 3, y += 2;
        h = 0;
        q = new(65535 < b.length / 3 ? Uint32Array : Uint16Array)(e * f * 6);
        for (m = 0; m < f; m++)
            for (w = 0; w < e; w++) D = w + c * (m + 1), d = w + 1 + c * (m + 1), k = w + 1 + c * m, q[h] = w + c * m, q[h + 1] = D, q[h + 2] = k, q[h + 3] = D, q[h + 4] = d, q[h + 5] =
                k, h += 6;
        this.setIndex(new J(q, 1));
        this.addAttribute("position", new J(b, 3));
        this.addAttribute("normal", new J(a, 3));
        this.addAttribute("uv", new J(l, 2))
    }

    function Wa() {
        M.call(this);
        this.type = "Camera";
        this.matrixWorldInverse = new z;
        this.projectionMatrix = new z
    }

    function Ra(a, b, e, f) {
        Wa.call(this);
        this.type = "PerspectiveCamera";
        this.fov = void 0 !== a ? a : 50;
        this.zoom = 1;
        this.near = void 0 !== e ? e : .1;
        this.far = void 0 !== f ? f : 2E3;
        this.focus = 10;
        this.aspect = void 0 !== b ? b : 1;
        this.view = null;
        this.filmGauge = 35;
        this.filmOffset = 0;
        this.updateProjectionMatrix()
    }

    function mc(a, b, e, f, q, D) {
        Wa.call(this);
        this.type = "OrthographicCamera";
        this.zoom = 1;
        this.view = null;
        this.left = a;
        this.right = b;
        this.top = e;
        this.bottom = f;
        this.near = void 0 !== q ? q : .1;
        this.far = void 0 !== D ? D : 2E3;
        this.updateProjectionMatrix()
    }

    function td(a) {
        function b(a, b, e, f) {
            !0 === H && (a *= f, b *= f, e *= f);
            oa.clearColor(a, b, e, f)
        }

        function e() {
            oa.init();
            oa.scissor(R.copy(ma).multiplyScalar(nb));
            oa.viewport(gb.copy(aa).multiplyScalar(nb));
            b(Ma.r, Ma.g, Ma.b, Xa)
        }

        function f() {
            J = Da = null;
            ga = "";
            X = -1;
            oa.reset()
        }

        function q(a) {
            a.preventDefault();
            f();
            e();
            ib.clear()
        }

        function D(a) {
            a = a.target;
            a.removeEventListener("dispose", D);
            c(a);
            ib.delete(a)
        }

        function c(a) {
            var b = ib.get(a).program;
            a.program = void 0;
            void 0 !== b && za.releaseProgram(b)
        }

        function k(a, b) {
            return Math.abs(b[0]) - Math.abs(a[0])
        }

        function g(a, b) {
            return a.object.renderOrder !== b.object.renderOrder ? a.object.renderOrder - b.object.renderOrder : a.material.program && b.material.program && a.material.program !== b.material.program ? a.material.program.id - b.material.program.id : a.material.id !== b.material.id ?
                a.material.id - b.material.id : a.z !== b.z ? a.z - b.z : a.id - b.id
        }

        function l(a, b) {
            return a.object.renderOrder !== b.object.renderOrder ? a.object.renderOrder - b.object.renderOrder : a.z !== b.z ? b.z - a.z : a.id - b.id
        }

        function h(a, b, e, f, q) {
            var D;
            e.transparent ? (f = Y, D = ++ca) : (f = L, D = ++N);
            D = f[D];
            void 0 !== D ? (D.id = a.id, D.object = a, D.geometry = b, D.material = e, D.z = fa.z, D.group = q) : (D = {
                id: a.id,
                object: a,
                geometry: b,
                material: e,
                z: fa.z,
                group: q
            }, f.push(D))
        }

        function m(a) {
            if (!Z.intersectsSphere(a)) return !1;
            var b = ba.numPlanes;
            if (0 === b) return !0;
            var e = wa.clippingPlanes,
                f = a.center;
            a = -a.radius;
            var q = 0;
            do
                if (e[q].distanceToPoint(f) < a) return !1;
            while (++q !== b);
            return !0
        }

        function y(a, b) {
            if (!1 !== a.visible) {
                if (0 !== (a.layers.mask & b.layers.mask))
                    if (a.isLight) x.push(a);
                    else if (a.isSprite) {
                    var e;
                    (e = !1 === a.frustumCulled) || (db.center.set(0, 0, 0), db.radius = .7071067811865476, db.applyMatrix4(a.matrixWorld), e = !0 === m(db));
                    e && Pa.push(a)
                } else if (a.isLensFlare) Ca.push(a);
                else if (a.isImmediateRenderObject) !0 === wa.sortObjects && (fa.setFromMatrixPosition(a.matrixWorld),
                    fa.applyProjection(ka)), h(a, null, a.material, fa.z, null);
                else if (a.isMesh || a.isLine || a.isPoints)
                    if (a.isSkinnedMesh && a.skeleton.update(), (e = !1 === a.frustumCulled) || (e = a.geometry, null === e.boundingSphere && e.computeBoundingSphere(), db.copy(e.boundingSphere).applyMatrix4(a.matrixWorld), e = !0 === m(db)), e) {
                        var f = a.material;
                        if (!0 === f.visible)
                            if (!0 === wa.sortObjects && (fa.setFromMatrixPosition(a.matrixWorld), fa.applyProjection(ka)), e = xb.update(a), f.isMultiMaterial)
                                for (var q = e.groups, D = f.materials, f = 0, c = q.length; f <
                                    c; f++) {
                                    var C = q[f],
                                        d = D[C.materialIndex];
                                    !0 === d.visible && h(a, e, d, fa.z, C)
                                } else h(a, e, f, fa.z, null)
                    }
                a = a.children;
                f = 0;
                for (c = a.length; f < c; f++) y(a[f], b)
            }
        }

        function n(a, b, e, f) {
            for (var q = 0, D = a.length; q < D; q++) {
                var c = a[q],
                    C = c.object,
                    d = c.geometry,
                    k = void 0 === f ? c.material : f,
                    c = c.group;
                C.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, C.matrixWorld);
                C.normalMatrix.getNormalMatrix(C.modelViewMatrix);
                if (C.isImmediateRenderObject) {
                    w(k);
                    var I = t(b, e, k, C);
                    ga = "";
                    C.render(function(a) {
                        wa.renderBufferImmediate(a, I, k)
                    })
                } else wa.renderBufferDirect(b,
                    e, d, k, C, c)
            }
        }

        function w(a) {
            2 === a.side ? oa.disable(F.CULL_FACE) : oa.enable(F.CULL_FACE);
            oa.setFlipSided(1 === a.side);
            !0 === a.transparent ? oa.setBlending(a.blending, a.blendEquation, a.blendSrc, a.blendDst, a.blendEquationAlpha, a.blendSrcAlpha, a.blendDstAlpha, a.premultipliedAlpha) : oa.setBlending(0);
            oa.setDepthFunc(a.depthFunc);
            oa.setDepthTest(a.depthTest);
            oa.setDepthWrite(a.depthWrite);
            oa.setColorWrite(a.colorWrite);
            oa.setPolygonOffset(a.polygonOffset, a.polygonOffsetFactor, a.polygonOffsetUnits)
        }

        function t(a,
            b, e, f) {
            Lb = 0;
            var q = ib.get(e);
            ya && (Oa || a !== J) && ba.setState(e.clippingPlanes, e.clipShadows, a, q, a === J && e.id === X);
            !1 === e.needsUpdate && (void 0 === q.program ? e.needsUpdate = !0 : e.fog && q.fog !== b ? e.needsUpdate = !0 : e.lights && q.lightsHash !== ua.hash ? e.needsUpdate = !0 : void 0 !== q.numClippingPlanes && q.numClippingPlanes !== ba.numPlanes && (e.needsUpdate = !0));
            if (e.needsUpdate) {
                a: {
                    var k = ib.get(e),
                        I = za.getParameters(e, ua, b, ba.numPlanes, f),
                        g = za.getProgramCode(e, I),
                        h = k.program,
                        l = !0;
                    if (void 0 === h) e.addEventListener("dispose", D);
                    else if (h.code !== g) c(e);
                    else if (void 0 !== I.shaderID) break a;
                    else l = !1;
                    l && (I.shaderID ? (h = Tc[I.shaderID], k.__webglShader = {
                        name: e.type,
                        uniforms: d.UniformsUtils.clone(h.uniforms),
                        vertexShader: h.vertexShader,
                        fragmentShader: h.fragmentShader
                    }) : k.__webglShader = {
                        name: e.type,
                        uniforms: e.uniforms,
                        vertexShader: e.vertexShader,
                        fragmentShader: e.fragmentShader
                    }, e.__webglShader = k.__webglShader, h = za.acquireProgram(e, I, g), k.program = h, e.program = h);
                    I = h.getAttributes();
                    if (e.morphTargets)
                        for (g = e.numSupportedMorphTargets =
                            0; g < wa.maxMorphTargets; g++) 0 <= I["morphTarget" + g] && e.numSupportedMorphTargets++;
                    if (e.morphNormals)
                        for (g = e.numSupportedMorphNormals = 0; g < wa.maxMorphNormals; g++) 0 <= I["morphNormal" + g] && e.numSupportedMorphNormals++;
                    I = k.__webglShader.uniforms;
                    !e.isShaderMaterial && !e.isRawShaderMaterial | !0 === e.clipping && (k.numClippingPlanes = ba.numPlanes, I.clippingPlanes = ba.uniform);
                    k.fog = b;
                    k.lightsHash = ua.hash;
                    e.lights && (I.ambientLightColor.value = ua.ambient, I.directionalLights.value = ua.directional, I.spotLights.value = ua.spot,
                        I.pointLights.value = ua.point, I.hemisphereLights.value = ua.hemi, I.directionalShadowMap.value = ua.directionalShadowMap, I.directionalShadowMatrix.value = ua.directionalShadowMatrix, I.spotShadowMap.value = ua.spotShadowMap, I.spotShadowMatrix.value = ua.spotShadowMatrix, I.pointShadowMap.value = ua.pointShadowMap, I.pointShadowMatrix.value = ua.pointShadowMatrix);
                    g = k.program.getUniforms();
                    g = Ka.seqWithValue(g.seq, I);
                    k.uniformsList = g;
                    k.dynamicUniforms = Ka.splitDynamic(g, I)
                }
                e.needsUpdate = !1
            }
            var ia = !1,
                l = h = !1,
                k = q.program,
                g = k.getUniforms(),
                I = q.__webglShader.uniforms;
            k.id !== Da && (F.useProgram(k.program), Da = k.id, l = h = ia = !0);
            e.id !== X && (X = e.id, h = !0);
            if (ia || a !== J) {
                g.set(F, a, "projectionMatrix");
                rb.logarithmicDepthBuffer && g.setValue(F, "logDepthBufFC", 2 / (Math.log(a.far + 1) / Math.LN2));
                a !== J && (J = a, l = h = !0);
                if (e.isShaderMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.envMap) ia = g.map.cameraPosition, void 0 !== ia && ia.setValue(F, fa.setFromMatrixPosition(a.matrixWorld));
                (e.isMeshPhongMaterial || e.isMeshLambertMaterial || e.isMeshBasicMaterial ||
                    e.isMeshStandardMaterial || e.isShaderMaterial || e.skinning) && g.setValue(F, "viewMatrix", a.matrixWorldInverse);
                g.set(F, wa, "toneMappingExposure");
                g.set(F, wa, "toneMappingWhitePoint")
            }
            e.skinning && (g.setOptional(F, f, "bindMatrix"), g.setOptional(F, f, "bindMatrixInverse"), ia = f.skeleton) && (rb.floatVertexTextures && ia.useVertexTexture ? (g.set(F, ia, "boneTexture"), g.set(F, ia, "boneTextureWidth"), g.set(F, ia, "boneTextureHeight")) : g.setOptional(F, ia, "boneMatrices"));
            if (h) {
                e.lights && (h = l, I.ambientLightColor.needsUpdate =
                    h, I.directionalLights.needsUpdate = h, I.pointLights.needsUpdate = h, I.spotLights.needsUpdate = h, I.hemisphereLights.needsUpdate = h);
                b && e.fog && (I.fogColor.value = b.color, b.isFog ? (I.fogNear.value = b.near, I.fogFar.value = b.far) : b.isFogExp2 && (I.fogDensity.value = b.density));
                if (e.isMeshBasicMaterial || e.isMeshLambertMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isMeshDepthMaterial) {
                    I.opacity.value = e.opacity;
                    I.diffuse.value = e.color;
                    e.emissive && I.emissive.value.copy(e.emissive).multiplyScalar(e.emissiveIntensity);
                    I.map.value = e.map;
                    I.specularMap.value = e.specularMap;
                    I.alphaMap.value = e.alphaMap;
                    e.aoMap && (I.aoMap.value = e.aoMap, I.aoMapIntensity.value = e.aoMapIntensity);
                    var V;
                    e.map ? V = e.map : e.specularMap ? V = e.specularMap : e.displacementMap ? V = e.displacementMap : e.normalMap ? V = e.normalMap : e.bumpMap ? V = e.bumpMap : e.roughnessMap ? V = e.roughnessMap : e.metalnessMap ? V = e.metalnessMap : e.alphaMap ? V = e.alphaMap : e.emissiveMap && (V = e.emissiveMap);
                    void 0 !== V && (V.isWebGLRenderTarget && (V = V.texture), b = V.offset, V = V.repeat, I.offsetRepeat.value.set(b.x,
                        b.y, V.x, V.y));
                    I.envMap.value = e.envMap;
                    I.flipEnvMap.value = e.envMap && e.envMap.isCubeTexture ? -1 : 1;
                    I.reflectivity.value = e.reflectivity;
                    I.refractionRatio.value = e.refractionRatio
                }
                e.isLineBasicMaterial ? (I.diffuse.value = e.color, I.opacity.value = e.opacity) : e.isLineDashedMaterial ? (I.diffuse.value = e.color, I.opacity.value = e.opacity, I.dashSize.value = e.dashSize, I.totalSize.value = e.dashSize + e.gapSize, I.scale.value = e.scale) : e.isPointsMaterial ? (I.diffuse.value = e.color, I.opacity.value = e.opacity, I.size.value = e.size *
                        nb, I.scale.value = .5 * pa.clientHeight, I.map.value = e.map, null !== e.map && (V = e.map.offset, e = e.map.repeat, I.offsetRepeat.value.set(V.x, V.y, e.x, e.y))) : e.isMeshLambertMaterial ? (e.lightMap && (I.lightMap.value = e.lightMap, I.lightMapIntensity.value = e.lightMapIntensity), e.emissiveMap && (I.emissiveMap.value = e.emissiveMap)) : e.isMeshPhongMaterial ? (I.specular.value = e.specular, I.shininess.value = Math.max(e.shininess, 1E-4), e.lightMap && (I.lightMap.value = e.lightMap, I.lightMapIntensity.value = e.lightMapIntensity), e.emissiveMap &&
                        (I.emissiveMap.value = e.emissiveMap), e.bumpMap && (I.bumpMap.value = e.bumpMap, I.bumpScale.value = e.bumpScale), e.normalMap && (I.normalMap.value = e.normalMap, I.normalScale.value.copy(e.normalScale)), e.displacementMap && (I.displacementMap.value = e.displacementMap, I.displacementScale.value = e.displacementScale, I.displacementBias.value = e.displacementBias)) : e.isMeshPhysicalMaterial ? (I.clearCoat.value = e.clearCoat, I.clearCoatRoughness.value = e.clearCoatRoughness, p(I, e)) : e.isMeshStandardMaterial ? p(I, e) : e.isMeshDepthMaterial ?
                    e.displacementMap && (I.displacementMap.value = e.displacementMap, I.displacementScale.value = e.displacementScale, I.displacementBias.value = e.displacementBias) : e.isMeshNormalMaterial && (I.opacity.value = e.opacity);
                Ka.upload(F, q.uniformsList, I, wa)
            }
            g.set(F, f, "modelViewMatrix");
            g.set(F, f, "normalMatrix");
            g.setValue(F, "modelMatrix", f.matrixWorld);
            q = q.dynamicUniforms;
            null !== q && (Ka.evalDynamic(q, I, f, a), Ka.upload(F, q, I, wa));
            return k
        }

        function p(a, b) {
            a.roughness.value = b.roughness;
            a.metalness.value = b.metalness;
            b.roughnessMap &&
                (a.roughnessMap.value = b.roughnessMap);
            b.metalnessMap && (a.metalnessMap.value = b.metalnessMap);
            b.lightMap && (a.lightMap.value = b.lightMap, a.lightMapIntensity.value = b.lightMapIntensity);
            b.emissiveMap && (a.emissiveMap.value = b.emissiveMap);
            b.bumpMap && (a.bumpMap.value = b.bumpMap, a.bumpScale.value = b.bumpScale);
            b.normalMap && (a.normalMap.value = b.normalMap, a.normalScale.value.copy(b.normalScale));
            b.displacementMap && (a.displacementMap.value = b.displacementMap, a.displacementScale.value = b.displacementScale, a.displacementBias.value =
                b.displacementBias);
            b.envMap && (a.envMapIntensity.value = b.envMapIntensity)
        }

        function v(a) {
            var b;
            if (1E3 === a) return F.REPEAT;
            if (1001 === a) return F.CLAMP_TO_EDGE;
            if (1002 === a) return F.MIRRORED_REPEAT;
            if (1003 === a) return F.NEAREST;
            if (1004 === a) return F.NEAREST_MIPMAP_NEAREST;
            if (1005 === a) return F.NEAREST_MIPMAP_LINEAR;
            if (1006 === a) return F.LINEAR;
            if (1007 === a) return F.LINEAR_MIPMAP_NEAREST;
            if (1008 === a) return F.LINEAR_MIPMAP_LINEAR;
            if (1009 === a) return F.UNSIGNED_BYTE;
            if (1017 === a) return F.UNSIGNED_SHORT_4_4_4_4;
            if (1018 === a) return F.UNSIGNED_SHORT_5_5_5_1;
            if (1019 === a) return F.UNSIGNED_SHORT_5_6_5;
            if (1010 === a) return F.BYTE;
            if (1011 === a) return F.SHORT;
            if (1012 === a) return F.UNSIGNED_SHORT;
            if (1013 === a) return F.INT;
            if (1014 === a) return F.UNSIGNED_INT;
            if (1015 === a) return F.FLOAT;
            b = Fa.get("OES_texture_half_float");
            if (null !== b && 1016 === a) return b.HALF_FLOAT_OES;
            if (1021 === a) return F.ALPHA;
            if (1022 === a) return F.RGB;
            if (1023 === a) return F.RGBA;
            if (1024 === a) return F.LUMINANCE;
            if (1025 === a) return F.LUMINANCE_ALPHA;
            if (1026 === a) return F.DEPTH_COMPONENT;
            if (1027 === a) return F.DEPTH_STENCIL;
            if (100 === a) return F.FUNC_ADD;
            if (101 === a) return F.FUNC_SUBTRACT;
            if (102 === a) return F.FUNC_REVERSE_SUBTRACT;
            if (200 === a) return F.ZERO;
            if (201 === a) return F.ONE;
            if (202 === a) return F.SRC_COLOR;
            if (203 === a) return F.ONE_MINUS_SRC_COLOR;
            if (204 === a) return F.SRC_ALPHA;
            if (205 === a) return F.ONE_MINUS_SRC_ALPHA;
            if (206 === a) return F.DST_ALPHA;
            if (207 === a) return F.ONE_MINUS_DST_ALPHA;
            if (208 === a) return F.DST_COLOR;
            if (209 === a) return F.ONE_MINUS_DST_COLOR;
            if (210 === a) return F.SRC_ALPHA_SATURATE;
            b = Fa.get("WEBGL_compressed_texture_s3tc");
            if (null !== b) {
                if (2001 === a) return b.COMPRESSED_RGB_S3TC_DXT1_EXT;
                if (2002 === a) return b.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                if (2003 === a) return b.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                if (2004 === a) return b.COMPRESSED_RGBA_S3TC_DXT5_EXT
            }
            b = Fa.get("WEBGL_compressed_texture_pvrtc");
            if (null !== b) {
                if (2100 === a) return b.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                if (2101 === a) return b.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                if (2102 === a) return b.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                if (2103 === a) return b.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
            }
            b =
                Fa.get("WEBGL_compressed_texture_etc1");
            if (null !== b && 2151 === a) return b.COMPRESSED_RGB_ETC1_WEBGL;
            b = Fa.get("EXT_blend_minmax");
            if (null !== b) {
                if (103 === a) return b.MIN_EXT;
                if (104 === a) return b.MAX_EXT
            }
            b = Fa.get("WEBGL_depth_texture");
            return null !== b && 1020 === a ? b.UNSIGNED_INT_24_8_WEBGL : 0
        }
        console.log("THREE.WebGLRenderer", "80");
        a = a || {};
        var pa = void 0 !== a.canvas ? a.canvas : document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"),
            A = void 0 !== a.context ? a.context : null,
            u = void 0 !== a.alpha ? a.alpha : !1,
            E = void 0 !==
            a.depth ? a.depth : !0,
            O = void 0 !== a.stencil ? a.stencil : !0,
            B = void 0 !== a.antialias ? a.antialias : !1,
            H = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha : !0,
            T = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer : !1,
            x = [],
            L = [],
            N = -1,
            Y = [],
            ca = -1,
            P = new Float32Array(8),
            Pa = [],
            Ca = [];
        this.domElement = pa;
        this.context = null;
        this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0;
        this.clippingPlanes = [];
        this.localClippingEnabled = !1;
        this.gammaFactor = 2;
        this.physicallyCorrectLights =
            this.gammaOutput = this.gammaInput = !1;
        this.toneMappingWhitePoint = this.toneMappingExposure = this.toneMapping = 1;
        this.maxMorphTargets = 8;
        this.maxMorphNormals = 4;
        var wa = this,
            Da = null,
            K = null,
            M = null,
            X = -1,
            ga = "",
            J = null,
            R = new na,
            U = null,
            gb = new na,
            Lb = 0,
            Ma = new G(0),
            Xa = 0,
            ea = pa.width,
            fc = pa.height,
            nb = 1,
            ma = new na(0, 0, ea, fc),
            ta = !1,
            aa = new na(0, 0, ea, fc),
            Z = new Pb,
            ba = new rd,
            ya = !1,
            Oa = !1,
            db = new La,
            ka = new z,
            fa = new r,
            ua = {
                hash: "",
                ambient: [0, 0, 0],
                directional: [],
                directionalShadowMap: [],
                directionalShadowMatrix: [],
                spot: [],
                spotShadowMap: [],
                spotShadowMatrix: [],
                point: [],
                pointShadowMap: [],
                pointShadowMatrix: [],
                hemi: [],
                shadows: []
            },
            la = {
                calls: 0,
                vertices: 0,
                faces: 0,
                points: 0
            };
        this.info = {
            render: la,
            memory: {
                geometries: 0,
                textures: 0
            },
            programs: null
        };
        var F;
        try {
            u = {
                alpha: u,
                depth: E,
                stencil: O,
                antialias: B,
                premultipliedAlpha: H,
                preserveDrawingBuffer: T
            };
            F = A || pa.getContext("webgl", u) || pa.getContext("experimental-webgl", u);
            if (null === F) {
                if (null !== pa.getContext("webgl")) throw "Error creating WebGL context with your selected attributes.";
                throw "Error creating WebGL context.";
            }
            void 0 === F.getShaderPrecisionFormat && (F.getShaderPrecisionFormat = function() {
                return {
                    rangeMin: 1,
                    rangeMax: 1,
                    precision: 1
                }
            });
            pa.addEventListener("webglcontextlost", q, !1)
        } catch (Ce) {
            throw console.error("THREE.WebGLRenderer: " + Ce), Ce;
        }
        var Fa = new Rb(F);
        Fa.get("WEBGL_depth_texture");
        Fa.get("OES_texture_float");
        Fa.get("OES_texture_float_linear");
        Fa.get("OES_texture_half_float");
        Fa.get("OES_texture_half_float_linear");
        Fa.get("OES_standard_derivatives");
        Fa.get("ANGLE_instanced_arrays");
        Fa.get("OES_element_index_uint") &&
            (W.MaxIndex = 4294967296);
        var rb = new kc(F, Fa, a),
            oa = new ac(F, Fa, v),
            ib = new Hd,
            Ea = new $b(F, Fa, oa, ib, rb, v, this.info),
            xb = new Nd(F, ib, this.info),
            za = new Id(this, rb),
            ja = new qd;
        this.info.programs = za.programs;
        var bd = new sd(F, Fa, la),
            Mb = new Ac(F, Fa, la),
            ra = new mc(-1, 1, 1, -1, 0, 1),
            qa = new Ra,
            va = new Na(new lc(2, 2), new cb({
                depthTest: !1,
                depthWrite: !1,
                fog: !1
            }));
        a = Tc.cube;
        var Ab = new Na(new dc(5, 5, 5), new sa({
            uniforms: a.uniforms,
            vertexShader: a.vertexShader,
            fragmentShader: a.fragmentShader,
            side: 1,
            depthTest: !1,
            depthWrite: !1,
            fog: !1
        }));
        e();
        this.context = F;
        this.capabilities = rb;
        this.extensions = Fa;
        this.properties = ib;
        this.state = oa;
        var Ba = new Sc(this, ua, xb, rb);
        this.shadowMap = Ba;
        var ld = new Q(this, Pa),
            Qa = new da(this, Ca);
        this.getContext = function() {
            return F
        };
        this.getContextAttributes = function() {
            return F.getContextAttributes()
        };
        this.forceContextLoss = function() {
            Fa.get("WEBGL_lose_context").loseContext()
        };
        this.getMaxAnisotropy = function() {
            return rb.getMaxAnisotropy()
        };
        this.getPrecision = function() {
            return rb.precision
        };
        this.getPixelRatio =
            function() {
                return nb
            };
        this.setPixelRatio = function(a) {
            void 0 !== a && (nb = a, this.setSize(aa.z, aa.w, !1))
        };
        this.getSize = function() {
            return {
                width: ea,
                height: fc
            }
        };
        this.setSize = function(a, b, e) {
            ea = a;
            fc = b;
            pa.width = a * nb;
            pa.height = b * nb;
            !1 !== e && (pa.style.width = a + "px", pa.style.height = b + "px");
            this.setViewport(0, 0, a, b)
        };
        this.setViewport = function(a, b, e, f) {
            oa.viewport(aa.set(a, b, e, f))
        };
        this.setScissor = function(a, b, e, f) {
            oa.scissor(ma.set(a, b, e, f))
        };
        this.setScissorTest = function(a) {
            oa.setScissorTest(ta = a)
        };
        this.getClearColor =
            function() {
                return Ma
            };
        this.setClearColor = function(a, e) {
            Ma.set(a);
            Xa = void 0 !== e ? e : 1;
            b(Ma.r, Ma.g, Ma.b, Xa)
        };
        this.getClearAlpha = function() {
            return Xa
        };
        this.setClearAlpha = function(a) {
            Xa = a;
            b(Ma.r, Ma.g, Ma.b, Xa)
        };
        this.clear = function(a, b, e) {
            var f = 0;
            if (void 0 === a || a) f |= F.COLOR_BUFFER_BIT;
            if (void 0 === b || b) f |= F.DEPTH_BUFFER_BIT;
            if (void 0 === e || e) f |= F.STENCIL_BUFFER_BIT;
            F.clear(f)
        };
        this.clearColor = function() {
            this.clear(!0, !1, !1)
        };
        this.clearDepth = function() {
            this.clear(!1, !0, !1)
        };
        this.clearStencil = function() {
            this.clear(!1, !1, !0)
        };
        this.clearTarget = function(a, b, e, f) {
            this.setRenderTarget(a);
            this.clear(b, e, f)
        };
        this.resetGLState = f;
        this.dispose = function() {
            Y = [];
            ca = -1;
            L = [];
            N = -1;
            pa.removeEventListener("webglcontextlost", q, !1)
        };
        this.renderBufferImmediate = function(a, b, e) {
            oa.initAttributes();
            var f = ib.get(a);
            a.hasPositions && !f.position && (f.position = F.createBuffer());
            a.hasNormals && !f.normal && (f.normal = F.createBuffer());
            a.hasUvs && !f.uv && (f.uv = F.createBuffer());
            a.hasColors && !f.color && (f.color = F.createBuffer());
            b = b.getAttributes();
            a.hasPositions && (F.bindBuffer(F.ARRAY_BUFFER, f.position), F.bufferData(F.ARRAY_BUFFER, a.positionArray, F.DYNAMIC_DRAW), oa.enableAttribute(b.position), F.vertexAttribPointer(b.position, 3, F.FLOAT, !1, 0, 0));
            if (a.hasNormals) {
                F.bindBuffer(F.ARRAY_BUFFER, f.normal);
                if (!e.isMeshPhongMaterial && !e.isMeshStandardMaterial && 1 === e.shading)
                    for (var q = 0, D = 3 * a.count; q < D; q += 9) {
                        var c = a.normalArray,
                            C = (c[q + 0] + c[q + 3] + c[q + 6]) / 3,
                            I = (c[q + 1] + c[q + 4] + c[q + 7]) / 3,
                            d = (c[q + 2] + c[q + 5] + c[q + 8]) / 3;
                        c[q + 0] = C;
                        c[q + 1] = I;
                        c[q + 2] = d;
                        c[q + 3] = C;
                        c[q + 4] =
                            I;
                        c[q + 5] = d;
                        c[q + 6] = C;
                        c[q + 7] = I;
                        c[q + 8] = d
                    }
                F.bufferData(F.ARRAY_BUFFER, a.normalArray, F.DYNAMIC_DRAW);
                oa.enableAttribute(b.normal);
                F.vertexAttribPointer(b.normal, 3, F.FLOAT, !1, 0, 0)
            }
            a.hasUvs && e.map && (F.bindBuffer(F.ARRAY_BUFFER, f.uv), F.bufferData(F.ARRAY_BUFFER, a.uvArray, F.DYNAMIC_DRAW), oa.enableAttribute(b.uv), F.vertexAttribPointer(b.uv, 2, F.FLOAT, !1, 0, 0));
            a.hasColors && 0 !== e.vertexColors && (F.bindBuffer(F.ARRAY_BUFFER, f.color), F.bufferData(F.ARRAY_BUFFER, a.colorArray, F.DYNAMIC_DRAW), oa.enableAttribute(b.color),
                F.vertexAttribPointer(b.color, 3, F.FLOAT, !1, 0, 0));
            oa.disableUnusedAttributes();
            F.drawArrays(F.TRIANGLES, 0, a.count);
            a.count = 0
        };
        this.renderBufferDirect = function(a, b, e, f, q, D) {
            w(f);
            var c = t(a, b, f, q),
                C = !1;
            a = e.id + "_" + c.id + "_" + f.wireframe;
            a !== ga && (ga = a, C = !0);
            b = q.morphTargetInfluences;
            if (void 0 !== b) {
                a = [];
                for (var d = 0, C = b.length; d < C; d++) {
                    var g = b[d];
                    a.push([g, d])
                }
                a.sort(k);
                8 < a.length && (a.length = 8);
                for (var h = e.morphAttributes, d = 0, C = a.length; d < C; d++) g = a[d], P[d] = g[0], 0 !== g[0] ? (b = g[1], !0 === f.morphTargets && h.position &&
                    e.addAttribute("morphTarget" + d, h.position[b]), !0 === f.morphNormals && h.normal && e.addAttribute("morphNormal" + d, h.normal[b])) : (!0 === f.morphTargets && e.removeAttribute("morphTarget" + d), !0 === f.morphNormals && e.removeAttribute("morphNormal" + d));
                c.getUniforms().setValue(F, "morphTargetInfluences", P);
                C = !0
            }
            b = e.index;
            d = e.attributes.position;
            !0 === f.wireframe && (b = xb.getWireframeAttribute(e));
            null !== b ? (a = Mb, a.setIndex(b)) : a = bd;
            if (C) {
                a: {
                    var C = void 0,
                        l;
                    if (e && e.isInstancedBufferGeometry && (l = Fa.get("ANGLE_instanced_arrays"),
                            null === l)) {
                        console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
                        break a
                    }
                    void 0 === C && (C = 0);
                    oa.initAttributes();
                    var g = e.attributes,
                        c = c.getAttributes(),
                        h = f.defaultAttributeValues,
                        ia;
                    for (ia in c) {
                        var V = c[ia];
                        if (0 <= V) {
                            var y = g[ia];
                            if (void 0 !== y) {
                                var m = F.FLOAT,
                                    ha = y.array,
                                    n = y.normalized;
                                ha instanceof Float32Array ? m = F.FLOAT : ha instanceof Float64Array ? console.warn("Unsupported data buffer format: Float64Array") :
                                    ha instanceof Uint16Array ? m = F.UNSIGNED_SHORT : ha instanceof Int16Array ? m = F.SHORT : ha instanceof Uint32Array ? m = F.UNSIGNED_INT : ha instanceof Int32Array ? m = F.INT : ha instanceof Int8Array ? m = F.BYTE : ha instanceof Uint8Array && (m = F.UNSIGNED_BYTE);
                                var ha = y.itemSize,
                                    $a = xb.getAttributeBuffer(y);
                                if (y && y.isInterleavedBufferAttribute) {
                                    var hc = y.data,
                                        r = hc.stride,
                                        y = y.offset;
                                    hc && hc.isInstancedInterleavedBuffer ? (oa.enableAttributeAndDivisor(V, hc.meshPerAttribute, l), void 0 === e.maxInstancedCount && (e.maxInstancedCount = hc.meshPerAttribute *
                                        hc.count)) : oa.enableAttribute(V);
                                    F.bindBuffer(F.ARRAY_BUFFER, $a);
                                    F.vertexAttribPointer(V, ha, m, n, r * hc.array.BYTES_PER_ELEMENT, (C * r + y) * hc.array.BYTES_PER_ELEMENT)
                                } else y && y.isInstancedBufferAttribute ? (oa.enableAttributeAndDivisor(V, y.meshPerAttribute, l), void 0 === e.maxInstancedCount && (e.maxInstancedCount = y.meshPerAttribute * y.count)) : oa.enableAttribute(V), F.bindBuffer(F.ARRAY_BUFFER, $a), F.vertexAttribPointer(V, ha, m, n, 0, C * ha * y.array.BYTES_PER_ELEMENT)
                            } else if (void 0 !== h && (m = h[ia], void 0 !== m)) switch (m.length) {
                                case 2:
                                    F.vertexAttrib2fv(V,
                                        m);
                                    break;
                                case 3:
                                    F.vertexAttrib3fv(V, m);
                                    break;
                                case 4:
                                    F.vertexAttrib4fv(V, m);
                                    break;
                                default:
                                    F.vertexAttrib1fv(V, m)
                            }
                        }
                    }
                    oa.disableUnusedAttributes()
                }
                null !== b && F.bindBuffer(F.ELEMENT_ARRAY_BUFFER, xb.getAttributeBuffer(b))
            }
            l = Infinity;
            null !== b ? l = b.count : void 0 !== d && (l = d.count);
            b = e.drawRange.start;
            d = null !== D ? D.start : 0;
            ia = Math.max(0, b, d);
            D = Math.max(0, Math.min(0 + l, b + e.drawRange.count, d + (null !== D ? D.count : Infinity)) - 1 - ia + 1);
            if (q.isMesh)
                if (!0 === f.wireframe) oa.setLineWidth(f.wireframeLinewidth * (null === K ? nb : 1)), a.setMode(F.LINES);
                else switch (q.drawMode) {
                    case 0:
                        a.setMode(F.TRIANGLES);
                        break;
                    case 1:
                        a.setMode(F.TRIANGLE_STRIP);
                        break;
                    case 2:
                        a.setMode(F.TRIANGLE_FAN)
                } else q.isLine ? (f = f.linewidth, void 0 === f && (f = 1), oa.setLineWidth(f * (null === K ? nb : 1)), q.isLineSegments ? a.setMode(F.LINES) : a.setMode(F.LINE_STRIP)) : q.isPoints && a.setMode(F.POINTS);
            e && e.isInstancedBufferGeometry ? 0 < e.maxInstancedCount && a.renderInstances(e, ia, D) : a.render(ia, D)
        };
        this.render = function(a, e, f, q) {
            if (!1 === (e && e.isCamera)) console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
            else {
                var D = a.fog;
                ga = "";
                X = -1;
                J = null;
                !0 === a.autoUpdate && a.updateMatrixWorld();
                null === e.parent && e.updateMatrixWorld();
                e.matrixWorldInverse.getInverse(e.matrixWorld);
                ka.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse);
                Z.setFromMatrix(ka);
                x.length = 0;
                ca = N = -1;
                Pa.length = 0;
                Ca.length = 0;
                Oa = this.localClippingEnabled;
                ya = ba.init(this.clippingPlanes, Oa, e);
                y(a, e);
                L.length = N + 1;
                Y.length = ca + 1;
                !0 === wa.sortObjects && (L.sort(g), Y.sort(l));
                ya && ba.beginShadows();
                for (var c = x, C = 0, I = 0, d = c.length; I < d; I++) {
                    var k = c[I];
                    k.castShadow && (ua.shadows[C++] = k)
                }
                ua.shadows.length = C;
                Ba.render(a, e);
                for (var c = x, h = k = 0, m = 0, ha, $a, w, t, r = e.matrixWorldInverse, p = 0, Nb = 0, pa = 0, v = 0, C = 0, I = c.length; C < I; C++)
                    if (d = c[C], ha = d.color, $a = d.intensity, w = d.distance, t = d.shadow && d.shadow.map ? d.shadow.map.texture : null, d.isAmbientLight) k += ha.r * $a, h += ha.g * $a, m += ha.b * $a;
                    else if (d.isDirectionalLight) {
                    var A = ja.get(d);
                    A.color.copy(d.color).multiplyScalar(d.intensity);
                    A.direction.setFromMatrixPosition(d.matrixWorld);
                    fa.setFromMatrixPosition(d.target.matrixWorld);
                    A.direction.sub(fa);
                    A.direction.transformDirection(r);
                    if (A.shadow = d.castShadow) A.shadowBias = d.shadow.bias, A.shadowRadius = d.shadow.radius, A.shadowMapSize = d.shadow.mapSize;
                    ua.directionalShadowMap[p] = t;
                    ua.directionalShadowMatrix[p] = d.shadow.matrix;
                    ua.directional[p++] = A
                } else if (d.isSpotLight) {
                    A = ja.get(d);
                    A.position.setFromMatrixPosition(d.matrixWorld);
                    A.position.applyMatrix4(r);
                    A.color.copy(ha).multiplyScalar($a);
                    A.distance = w;
                    A.direction.setFromMatrixPosition(d.matrixWorld);
                    fa.setFromMatrixPosition(d.target.matrixWorld);
                    A.direction.sub(fa);
                    A.direction.transformDirection(r);
                    A.coneCos = Math.cos(d.angle);
                    A.penumbraCos = Math.cos(d.angle * (1 - d.penumbra));
                    A.decay = 0 === d.distance ? 0 : d.decay;
                    if (A.shadow = d.castShadow) A.shadowBias = d.shadow.bias, A.shadowRadius = d.shadow.radius, A.shadowMapSize = d.shadow.mapSize;
                    ua.spotShadowMap[pa] = t;
                    ua.spotShadowMatrix[pa] = d.shadow.matrix;
                    ua.spot[pa++] = A
                } else if (d.isPointLight) {
                    A = ja.get(d);
                    A.position.setFromMatrixPosition(d.matrixWorld);
                    A.position.applyMatrix4(r);
                    A.color.copy(d.color).multiplyScalar(d.intensity);
                    A.distance = d.distance;
                    A.decay = 0 === d.distance ? 0 : d.decay;
                    if (A.shadow = d.castShadow) A.shadowBias = d.shadow.bias, A.shadowRadius = d.shadow.radius, A.shadowMapSize = d.shadow.mapSize;
                    ua.pointShadowMap[Nb] = t;
                    void 0 === ua.pointShadowMatrix[Nb] && (ua.pointShadowMatrix[Nb] = new z);
                    fa.setFromMatrixPosition(d.matrixWorld).negate();
                    ua.pointShadowMatrix[Nb].identity().setPosition(fa);
                    ua.point[Nb++] = A
                } else d.isHemisphereLight && (A = ja.get(d), A.direction.setFromMatrixPosition(d.matrixWorld), A.direction.transformDirection(r),
                    A.direction.normalize(), A.skyColor.copy(d.color).multiplyScalar($a), A.groundColor.copy(d.groundColor).multiplyScalar($a), ua.hemi[v++] = A);
                ua.ambient[0] = k;
                ua.ambient[1] = h;
                ua.ambient[2] = m;
                ua.directional.length = p;
                ua.spot.length = pa;
                ua.point.length = Nb;
                ua.hemi.length = v;
                ua.hash = p + "," + Nb + "," + pa + "," + v + "," + ua.shadows.length;
                ya && ba.endShadows();
                la.calls = 0;
                la.vertices = 0;
                la.faces = 0;
                la.points = 0;
                void 0 === f && (f = null);
                this.setRenderTarget(f);
                c = a.background;
                null === c ? b(Ma.r, Ma.g, Ma.b, Xa) : c && c.isColor && (b(c.r, c.g, c.b,
                    1), q = !0);
                (this.autoClear || q) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
                c && c.isCubeTexture ? (qa.projectionMatrix.copy(e.projectionMatrix), qa.matrixWorld.extractRotation(e.matrixWorld), qa.matrixWorldInverse.getInverse(qa.matrixWorld), Ab.material.uniforms.tCube.value = c, Ab.modelViewMatrix.multiplyMatrices(qa.matrixWorldInverse, Ab.matrixWorld), xb.update(Ab), wa.renderBufferDirect(qa, null, Ab.geometry, Ab.material, Ab, null)) : c && c.isTexture && (va.material.map = c, xb.update(va), wa.renderBufferDirect(ra,
                    null, va.geometry, va.material, va, null));
                a.overrideMaterial ? (q = a.overrideMaterial, n(L, e, D, q), n(Y, e, D, q)) : (oa.setBlending(0), n(L, e, D), n(Y, e, D));
                ld.render(a, e);
                Qa.render(a, e, gb);
                f && Ea.updateRenderTargetMipmap(f);
                oa.setDepthTest(!0);
                oa.setDepthWrite(!0);
                oa.setColorWrite(!0)
            }
        };
        this.setFaceCulling = function(a, b) {
            oa.setCullFace(a);
            oa.setFlipSided(0 === b)
        };
        this.allocTextureUnit = function() {
            var a = Lb;
            a >= rb.maxTextures && console.warn("WebGLRenderer: trying to use " + a + " texture units while this GPU supports only " +
                rb.maxTextures);
            Lb += 1;
            return a
        };
        this.setTexture2D = function() {
            var a = !1;
            return function(b, e) {
                b && b.isWebGLRenderTarget && (a || (console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."), a = !0), b = b.texture);
                Ea.setTexture2D(b, e)
            }
        }();
        this.setTexture = function() {
            var a = !1;
            return function(b, e) {
                a || (console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."), a = !0);
                Ea.setTexture2D(b, e)
            }
        }();
        this.setTextureCube = function() {
            var a = !1;
            return function(b, e) {
                b && b.isWebGLRenderTargetCube && (a || (console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."), a = !0), b = b.texture);
                b && b.isCubeTexture || Array.isArray(b.image) && 6 === b.image.length ? Ea.setTextureCube(b, e) : Ea.setTextureCubeDynamic(b, e)
            }
        }();
        this.getCurrentRenderTarget = function() {
            return K
        };
        this.setRenderTarget = function(a) {
            (K = a) && void 0 === ib.get(a).__webglFramebuffer && Ea.setupRenderTarget(a);
            var b = a && a.isWebGLRenderTargetCube,
                e;
            a ? (e = ib.get(a), e = b ? e.__webglFramebuffer[a.activeCubeFace] : e.__webglFramebuffer, R.copy(a.scissor), U = a.scissorTest, gb.copy(a.viewport)) : (e = null, R.copy(ma).multiplyScalar(nb), U = ta, gb.copy(aa).multiplyScalar(nb));
            M !== e && (F.bindFramebuffer(F.FRAMEBUFFER, e), M = e);
            oa.scissor(R);
            oa.setScissorTest(U);
            oa.viewport(gb);
            b && (b = ib.get(a.texture), F.framebufferTexture2D(F.FRAMEBUFFER, F.COLOR_ATTACHMENT0, F.TEXTURE_CUBE_MAP_POSITIVE_X + a.activeCubeFace, b.__webglTexture, a.activeMipMapLevel))
        };
        this.readRenderTargetPixels =
            function(a, b, e, f, q, D) {
                if (!1 === (a && a.isWebGLRenderTarget)) console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
                else {
                    var c = ib.get(a).__webglFramebuffer;
                    if (c) {
                        var C = !1;
                        c !== M && (F.bindFramebuffer(F.FRAMEBUFFER, c), C = !0);
                        try {
                            var d = a.texture,
                                I = d.format,
                                k = d.type;
                            1023 !== I && v(I) !== F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT) ? console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.") : 1009 ===
                                k || v(k) === F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE) || 1015 === k && (Fa.get("OES_texture_float") || Fa.get("WEBGL_color_buffer_float")) || 1016 === k && Fa.get("EXT_color_buffer_half_float") ? F.checkFramebufferStatus(F.FRAMEBUFFER) === F.FRAMEBUFFER_COMPLETE ? 0 <= b && b <= a.width - f && 0 <= e && e <= a.height - q && F.readPixels(b, e, f, q, v(I), v(k), D) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.") : console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.")
                        } finally {
                            C &&
                                F.bindFramebuffer(F.FRAMEBUFFER, M)
                        }
                    }
                }
            }
    }

    function nc(a, b) {
        this.name = "";
        this.color = new G(a);
        this.density = void 0 !== b ? b : 2.5E-4
    }

    function oc(a, b, e) {
        this.name = "";
        this.color = new G(a);
        this.near = void 0 !== b ? b : 1;
        this.far = void 0 !== e ? e : 1E3
    }

    function Sb() {
        M.call(this);
        this.type = "Scene";
        this.overrideMaterial = this.fog = this.background = null;
        this.autoUpdate = !0
    }

    function Bc(a, b, e, f, q) {
        M.call(this);
        this.lensFlares = [];
        this.positionScreen = new r;
        this.customUpdateCallback = void 0;
        void 0 !== a && this.add(a, b, e, f, q)
    }

    function Hb(a) {
        K.call(this);
        this.type = "SpriteMaterial";
        this.color = new G(16777215);
        this.map = null;
        this.rotation = 0;
        this.lights = this.fog = !1;
        this.setValues(a)
    }

    function Cc(a) {
        M.call(this);
        this.type = "Sprite";
        this.material = void 0 !== a ? a : new Hb
    }

    function Dc() {
        M.call(this);
        this.type = "LOD";
        Object.defineProperties(this, {
            levels: {
                enumerable: !0,
                value: []
            }
        })
    }

    function Tb(a, b, e, f, q, D, c, d, k, g, h, l) {
        u.call(this, null, D, c, d, k, g, f, q, h, l);
        this.image = {
            data: a,
            width: b,
            height: e
        };
        this.magFilter = void 0 !== k ? k : 1003;
        this.minFilter = void 0 !== g ? g : 1003;
        this.generateMipmaps =
            this.flipY = !1
    }

    function Ec(a, b, e) {
        this.useVertexTexture = void 0 !== e ? e : !0;
        this.identityMatrix = new z;
        a = a || [];
        this.bones = a.slice(0);
        this.useVertexTexture ? (a = Math.sqrt(4 * this.bones.length), a = d.Math.nextPowerOfTwo(Math.ceil(a)), this.boneTextureHeight = this.boneTextureWidth = a = Math.max(a, 4), this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4), this.boneTexture = new Tb(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, 1023, 1015)) : this.boneMatrices = new Float32Array(16 *
            this.bones.length);
        if (void 0 === b) this.calculateInverses();
        else if (this.bones.length === b.length) this.boneInverses = b.slice(0);
        else
            for (console.warn("THREE.Skeleton bonInverses is the wrong length."), this.boneInverses = [], b = 0, a = this.bones.length; b < a; b++) this.boneInverses.push(new z)
    }

    function Fc(a) {
        M.call(this);
        this.type = "Bone";
        this.skin = a
    }

    function Ib(a, b, e) {
        Na.call(this, a, b);
        this.type = "SkinnedMesh";
        this.bindMode = "attached";
        this.bindMatrix = new z;
        this.bindMatrixInverse = new z;
        a = [];
        if (this.geometry && void 0 !==
            this.geometry.bones) {
            for (var f, q = 0, D = this.geometry.bones.length; q < D; ++q) f = this.geometry.bones[q], b = new Fc(this), a.push(b), b.name = f.name, b.position.fromArray(f.pos), b.quaternion.fromArray(f.rotq), void 0 !== f.scl && b.scale.fromArray(f.scl);
            q = 0;
            for (D = this.geometry.bones.length; q < D; ++q) f = this.geometry.bones[q], -1 !== f.parent && null !== f.parent && void 0 !== a[f.parent] ? a[f.parent].add(a[q]) : this.add(a[q])
        }
        this.normalizeSkinWeights();
        this.updateMatrixWorld(!0);
        this.bind(new Ec(a, void 0, e), this.matrixWorld)
    }

    function xa(a) {
        K.call(this);
        this.type = "LineBasicMaterial";
        this.color = new G(16777215);
        this.linewidth = 1;
        this.linejoin = this.linecap = "round";
        this.lights = !1;
        this.setValues(a)
    }

    function Jb(a, b, e) {
        if (1 === e) return console.warn("THREE.Line: parameter THREE.LinePieces no longer supported. Created THREE.LineSegments instead."), new Ja(a, b);
        M.call(this);
        this.type = "Line";
        this.geometry = void 0 !== a ? a : new W;
        this.material = void 0 !== b ? b : new xa({
            color: 16777215 * Math.random()
        })
    }

    function Ja(a, b) {
        Jb.call(this, a, b);
        this.type = "LineSegments"
    }

    function pb(a) {
        K.call(this);
        this.type = "PointsMaterial";
        this.color = new G(16777215);
        this.map = null;
        this.size = 1;
        this.sizeAttenuation = !0;
        this.lights = !1;
        this.setValues(a)
    }

    function zb(a, b) {
        M.call(this);
        this.type = "Points";
        this.geometry = void 0 !== a ? a : new W;
        this.material = void 0 !== b ? b : new pb({
            color: 16777215 * Math.random()
        })
    }

    function Gc() {
        M.call(this);
        this.type = "Group"
    }

    function Xc(a, b, e, f, q, D, c, d, k) {
        function g() {
            requestAnimationFrame(g);
            a.readyState >= a.HAVE_CURRENT_DATA && (h.needsUpdate = !0)
        }
        u.call(this, a, b, e, f, q, D, c, d, k);
        this.generateMipmaps = !1;
        var h = this;
        g()
    }

    function Ub(a, b, e, f, q, c, C, d, k, g, h, l) {
        u.call(this, null, c, C, d, k, g, f, q, h, l);
        this.image = {
            width: b,
            height: e
        };
        this.mipmaps = a;
        this.generateMipmaps = this.flipY = !1
    }

    function Yc(a, b, e, f, q, c, C, d, k) {
        u.call(this, a, b, e, f, q, c, C, d, k);
        this.needsUpdate = !0
    }

    function Hc(a, b, e, f, q, c, C, d, k, g) {
        g = void 0 !== g ? g : 1026;
        if (1026 !== g && 1027 !== g) throw Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
        u.call(this, null, f, q, c, C, d, g, e, k);
        this.image = {
            width: a,
            height: b
        };
        this.type = void 0 !==
            e ? e : 1012;
        this.magFilter = void 0 !== C ? C : 1003;
        this.minFilter = void 0 !== d ? d : 1003;
        this.generateMipmaps = this.flipY = !1
    }

    function pc() {
        sa.call(this, {
            uniforms: d.UniformsUtils.merge([la.lights, {
                opacity: {
                    value: 1
                }
            }]),
            vertexShader: va.shadow_vert,
            fragmentShader: va.shadow_frag
        });
        this.transparent = this.lights = !0;
        Object.defineProperties(this, {
            opacity: {
                enumerable: !0,
                get: function() {
                    return this.uniforms.opacity.value
                },
                set: function(a) {
                    this.uniforms.opacity.value = a
                }
            }
        })
    }

    function Kb(a) {
        sa.call(this, a);
        this.type = "RawShaderMaterial"
    }

    function Ic(a) {
        this.uuid = d.Math.generateUUID();
        this.type = "MultiMaterial";
        this.materials = a instanceof Array ? a : [];
        this.visible = !0
    }

    function vb(a) {
        K.call(this);
        this.defines = {
            STANDARD: ""
        };
        this.type = "MeshStandardMaterial";
        this.color = new G(16777215);
        this.metalness = this.roughness = .5;
        this.lightMap = this.map = null;
        this.lightMapIntensity = 1;
        this.aoMap = null;
        this.aoMapIntensity = 1;
        this.emissive = new G(0);
        this.emissiveIntensity = 1;
        this.bumpMap = this.emissiveMap = null;
        this.bumpScale = 1;
        this.normalMap = null;
        this.normalScale =
            new v(1, 1);
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.envMap = this.alphaMap = this.metalnessMap = this.roughnessMap = null;
        this.envMapIntensity = 1;
        this.refractionRatio = .98;
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.wireframeLinejoin = this.wireframeLinecap = "round";
        this.morphNormals = this.morphTargets = this.skinning = !1;
        this.setValues(a)
    }

    function qc(a) {
        vb.call(this);
        this.defines = {
            PHYSICAL: ""
        };
        this.type = "MeshPhysicalMaterial";
        this.reflectivity = .5;
        this.clearCoatRoughness =
            this.clearCoat = 0;
        this.setValues(a)
    }

    function Vb(a) {
        K.call(this);
        this.type = "MeshPhongMaterial";
        this.color = new G(16777215);
        this.specular = new G(1118481);
        this.shininess = 30;
        this.lightMap = this.map = null;
        this.lightMapIntensity = 1;
        this.aoMap = null;
        this.aoMapIntensity = 1;
        this.emissive = new G(0);
        this.emissiveIntensity = 1;
        this.bumpMap = this.emissiveMap = null;
        this.bumpScale = 1;
        this.normalMap = null;
        this.normalScale = new v(1, 1);
        this.displacementMap = null;
        this.displacementScale = 1;
        this.displacementBias = 0;
        this.envMap = this.alphaMap =
            this.specularMap = null;
        this.combine = 0;
        this.reflectivity = 1;
        this.refractionRatio = .98;
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.wireframeLinejoin = this.wireframeLinecap = "round";
        this.morphNormals = this.morphTargets = this.skinning = !1;
        this.setValues(a)
    }

    function rc(a) {
        K.call(this, a);
        this.type = "MeshNormalMaterial";
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.morphTargets = this.lights = this.fog = !1;
        this.setValues(a)
    }

    function sc(a) {
        K.call(this);
        this.type = "MeshLambertMaterial";
        this.color = new G(16777215);
        this.lightMap = this.map = null;
        this.lightMapIntensity = 1;
        this.aoMap = null;
        this.aoMapIntensity = 1;
        this.emissive = new G(0);
        this.emissiveIntensity = 1;
        this.envMap = this.alphaMap = this.specularMap = this.emissiveMap = null;
        this.combine = 0;
        this.reflectivity = 1;
        this.refractionRatio = .98;
        this.wireframe = !1;
        this.wireframeLinewidth = 1;
        this.wireframeLinejoin = this.wireframeLinecap = "round";
        this.morphNormals = this.morphTargets = this.skinning = !1;
        this.setValues(a)
    }

    function tc(a) {
        K.call(this);
        this.type = "LineDashedMaterial";
        this.color =
            new G(16777215);
        this.scale = this.linewidth = 1;
        this.dashSize = 3;
        this.gapSize = 1;
        this.lights = !1;
        this.setValues(a)
    }

    function ud(a, b, e) {
        var f = this,
            q = !1,
            c = 0,
            C = 0;
        this.onStart = void 0;
        this.onLoad = a;
        this.onProgress = b;
        this.onError = e;
        this.itemStart = function(a) {
            C++;
            if (!1 === q && void 0 !== f.onStart) f.onStart(a, c, C);
            q = !0
        };
        this.itemEnd = function(a) {
            c++;
            if (void 0 !== f.onProgress) f.onProgress(a, c, C);
            if (c === C && (q = !1, void 0 !== f.onLoad)) f.onLoad()
        };
        this.itemError = function(a) {
            if (void 0 !== f.onError) f.onError(a)
        }
    }

    function wb(a) {
        this.manager =
            void 0 !== a ? a : d.DefaultLoadingManager
    }

    function Od(a) {
        this.manager = void 0 !== a ? a : d.DefaultLoadingManager;
        this._parser = null
    }

    function vd(a) {
        this.manager = void 0 !== a ? a : d.DefaultLoadingManager;
        this._parser = null
    }

    function Jc(a) {
        this.manager = void 0 !== a ? a : d.DefaultLoadingManager
    }

    function Zc(a) {
        this.manager = void 0 !== a ? a : d.DefaultLoadingManager
    }

    function uc(a) {
        this.manager = void 0 !== a ? a : d.DefaultLoadingManager
    }

    function Sa(a, b) {
        M.call(this);
        this.type = "Light";
        this.color = new G(a);
        this.intensity = void 0 !== b ? b : 1;
        this.receiveShadow =
            void 0
    }

    function vc(a, b, e) {
        Sa.call(this, a, e);
        this.type = "HemisphereLight";
        this.castShadow = void 0;
        this.position.copy(M.DefaultUp);
        this.updateMatrix();
        this.groundColor = new G(b)
    }

    function ec(a) {
        this.camera = a;
        this.bias = 0;
        this.radius = 1;
        this.mapSize = new v(512, 512);
        this.map = null;
        this.matrix = new z
    }

    function Wb() {
        ec.call(this, new Ra(50, 1, .5, 500))
    }

    function Kc(a, b, e, f, q, c) {
        Sa.call(this, a, b);
        this.type = "SpotLight";
        this.position.copy(M.DefaultUp);
        this.updateMatrix();
        this.target = new M;
        Object.defineProperty(this, "power", {
            get: function() {
                return this.intensity * Math.PI
            },
            set: function(a) {
                this.intensity = a / Math.PI
            }
        });
        this.distance = void 0 !== e ? e : 0;
        this.angle = void 0 !== f ? f : Math.PI / 3;
        this.penumbra = void 0 !== q ? q : 0;
        this.decay = void 0 !== c ? c : 1;
        this.shadow = new Wb
    }

    function wc(a, b, e, f) {
        Sa.call(this, a, b);
        this.type = "PointLight";
        Object.defineProperty(this, "power", {
            get: function() {
                return 4 * this.intensity * Math.PI
            },
            set: function(a) {
                this.intensity = a / (4 * Math.PI)
            }
        });
        this.distance = void 0 !== e ? e : 0;
        this.decay = void 0 !== f ? f : 1;
        this.shadow = new ec(new Ra(90,
            1, .5, 500))
    }

    function $c(a) {
        ec.call(this, new mc(-5, 5, 5, -5, .5, 500))
    }

    function ad(a, b) {
        Sa.call(this, a, b);
        this.type = "DirectionalLight";
        this.position.copy(M.DefaultUp);
        this.updateMatrix();
        this.target = new M;
        this.shadow = new $c
    }

    function c(a, b) {
        Sa.call(this, a, b);
        this.type = "AmbientLight";
        this.castShadow = void 0
    }

    function k(a, b, e, f) {
        this.parameterPositions = a;
        this._cachedIndex = 0;
        this.resultBuffer = void 0 !== f ? f : new b.constructor(e);
        this.sampleValues = b;
        this.valueSize = e
    }

    function g(a, b, e, f) {
        k.call(this, a, b, e, f);
        this._offsetNext =
            this._weightNext = this._offsetPrev = this._weightPrev = -0
    }

    function l(a, b, e, f) {
        k.call(this, a, b, e, f)
    }

    function m(a, b, e, f) {
        k.call(this, a, b, e, f)
    }

    function n(a, b, e, f) {
        if (void 0 === a) throw Error("track name is undefined");
        if (void 0 === b || 0 === b.length) throw Error("no keyframes in track named " + a);
        this.name = a;
        this.times = d.AnimationUtils.convertArray(b, this.TimeBufferType);
        this.values = d.AnimationUtils.convertArray(e, this.ValueBufferType);
        this.setInterpolation(f || this.DefaultInterpolation);
        this.validate();
        this.optimize()
    }

    function t(a, b, e, f) {
        n.call(this, a, b, e, f)
    }

    function E(a, b, e, f) {
        k.call(this, a, b, e, f)
    }

    function H(a, b, e, f) {
        n.call(this, a, b, e, f)
    }

    function L(a, b, e, f) {
        n.call(this, a, b, e, f)
    }

    function ca(a, b, e, f) {
        n.call(this, a, b, e, f)
    }

    function Ca(a, b, e) {
        n.call(this, a, b, e)
    }

    function Y(a, b, e, f) {
        n.call(this, a, b, e, f)
    }

    function Lb(a, b, e, f) {
        n.apply(this, arguments)
    }

    function Xa(a, b, e) {
        this.name = a;
        this.tracks = e;
        this.duration = void 0 !== b ? b : -1;
        this.uuid = d.Math.generateUUID();
        0 > this.duration && this.resetDuration();
        this.trim();
        this.optimize()
    }

    function bd(a) {
        this.manager = void 0 !== a ? a : d.DefaultLoadingManager;
        this.textures = {}
    }

    function ib(a) {
        this.manager = void 0 !== a ? a : d.DefaultLoadingManager
    }

    function Lc() {
        this.onLoadStart = function() {};
        this.onLoadProgress = function() {};
        this.onLoadComplete = function() {}
    }

    function fe(a) {
        "boolean" === typeof a && (console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."), a = void 0);
        this.manager = void 0 !== a ? a : d.DefaultLoadingManager;
        this.withCredentials = !1
    }

    function De(a) {
        this.manager = void 0 !==
            a ? a : d.DefaultLoadingManager;
        this.texturePath = ""
    }

    function lb() {}

    function U(a, b) {
        this.v1 = a;
        this.v2 = b
    }

    function ga() {
        this.curves = [];
        this.autoClose = !1
    }

    function Mb(a, b, e, f, q, c, C, d) {
        this.aX = a;
        this.aY = b;
        this.xRadius = e;
        this.yRadius = f;
        this.aStartAngle = q;
        this.aEndAngle = c;
        this.aClockwise = C;
        this.aRotation = d || 0
    }

    function Mc(a) {
        this.points = void 0 === a ? [] : a
    }

    function Nc(a, b, e, f) {
        this.v0 = a;
        this.v1 = b;
        this.v2 = e;
        this.v3 = f
    }

    function Oc(a, b, e) {
        this.v0 = a;
        this.v1 = b;
        this.v2 = e
    }

    function Xb(a, b, e, f, q, c) {
        ba.call(this);
        this.type =
            "TubeGeometry";
        this.parameters = {
            path: a,
            segments: b,
            radius: e,
            radialSegments: f,
            closed: q,
            taper: c
        };
        b = b || 64;
        e = e || 1;
        f = f || 8;
        q = q || !1;
        c = c || Xb.NoTaper;
        var C = [],
            d, k, g = b + 1,
            h, l, y, m, n, w = new r,
            t, A, p;
        t = new Xb.FrenetFrames(a, b, q);
        A = t.normals;
        p = t.binormals;
        this.tangents = t.tangents;
        this.normals = A;
        this.binormals = p;
        for (t = 0; t < g; t++)
            for (C[t] = [], h = t / (g - 1), n = a.getPointAt(h), d = A[t], k = p[t], y = e * c(h), h = 0; h < f; h++) l = h / f * 2 * Math.PI, m = -y * Math.cos(l), l = y * Math.sin(l), w.copy(n), w.x += m * d.x + l * k.x, w.y += m * d.y + l * k.y, w.z += m * d.z + l * k.z, C[t][h] =
                this.vertices.push(new r(w.x, w.y, w.z)) - 1;
        for (t = 0; t < b; t++)
            for (h = 0; h < f; h++) c = q ? (t + 1) % b : t + 1, g = (h + 1) % f, a = C[t][h], e = C[c][h], c = C[c][g], g = C[t][g], w = new v(t / b, h / f), A = new v((t + 1) / b, h / f), p = new v((t + 1) / b, (h + 1) / f), d = new v(t / b, (h + 1) / f), this.faces.push(new ja(a, e, g)), this.faceVertexUvs[0].push([w, A, d]), this.faces.push(new ja(e, c, g)), this.faceVertexUvs[0].push([A.clone(), p, d.clone()]);
        this.computeFaceNormals();
        this.computeVertexNormals()
    }

    function db(a, b) {
        "undefined" !== typeof a && (ba.call(this), this.type = "ExtrudeGeometry",
            a = Array.isArray(a) ? a : [a], this.addShapeList(a, b), this.computeFaceNormals())
    }

    function Pc(a, b) {
        ba.call(this);
        this.type = "ShapeGeometry";
        !1 === Array.isArray(a) && (a = [a]);
        this.addShapeList(a, b);
        this.computeFaceNormals()
    }

    function cd() {
        wd.apply(this, arguments);
        this.holes = []
    }

    function wd(a) {
        ga.call(this);
        this.currentPoint = new v;
        a && this.fromPoints(a)
    }

    function ta() {
        this.subPaths = [];
        this.currentPath = null
    }

    function ge(a) {
        this.data = a
    }

    function Ee(a) {
        this.manager = void 0 !== a ? a : d.DefaultLoadingManager
    }

    function Oa() {
        void 0 ===
            he && (he = new(window.AudioContext || window.webkitAudioContext));
        return he
    }

    function ie(a) {
        this.manager = void 0 !== a ? a : d.DefaultLoadingManager
    }

    function Fe() {
        this.type = "StereoCamera";
        this.aspect = 1;
        this.eyeSep = .064;
        this.cameraL = new Ra;
        this.cameraL.layers.enable(1);
        this.cameraL.matrixAutoUpdate = !1;
        this.cameraR = new Ra;
        this.cameraR.layers.enable(2);
        this.cameraR.matrixAutoUpdate = !1
    }

    function Pd(a, b, e) {
        M.call(this);
        this.type = "CubeCamera";
        var f = new Ra(90, 1, a, b);
        f.up.set(0, -1, 0);
        f.lookAt(new r(1, 0, 0));
        this.add(f);
        var q = new Ra(90, 1, a, b);
        q.up.set(0, -1, 0);
        q.lookAt(new r(-1, 0, 0));
        this.add(q);
        var c = new Ra(90, 1, a, b);
        c.up.set(0, 0, 1);
        c.lookAt(new r(0, 1, 0));
        this.add(c);
        var C = new Ra(90, 1, a, b);
        C.up.set(0, 0, -1);
        C.lookAt(new r(0, -1, 0));
        this.add(C);
        var d = new Ra(90, 1, a, b);
        d.up.set(0, -1, 0);
        d.lookAt(new r(0, 0, 1));
        this.add(d);
        var k = new Ra(90, 1, a, b);
        k.up.set(0, -1, 0);
        k.lookAt(new r(0, 0, -1));
        this.add(k);
        this.renderTarget = new cc(e, e, {
            format: 1022,
            magFilter: 1006,
            minFilter: 1006
        });
        this.updateCubeMap = function(a, b) {
            null === this.parent &&
                this.updateMatrixWorld();
            var e = this.renderTarget,
                g = e.texture.generateMipmaps;
            e.texture.generateMipmaps = !1;
            e.activeCubeFace = 0;
            a.render(b, f, e);
            e.activeCubeFace = 1;
            a.render(b, q, e);
            e.activeCubeFace = 2;
            a.render(b, c, e);
            e.activeCubeFace = 3;
            a.render(b, C, e);
            e.activeCubeFace = 4;
            a.render(b, d, e);
            e.texture.generateMipmaps = g;
            e.activeCubeFace = 5;
            a.render(b, k, e);
            a.setRenderTarget(null)
        }
    }

    function ya() {
        M.call(this);
        this.type = "AudioListener";
        this.context = Oa();
        this.gain = this.context.createGain();
        this.gain.connect(this.context.destination);
        this.filter = null
    }

    function dd(a) {
        M.call(this);
        this.type = "Audio";
        this.context = a.context;
        this.source = this.context.createBufferSource();
        this.source.onended = this.onEnded.bind(this);
        this.gain = this.context.createGain();
        this.gain.connect(a.getInput());
        this.autoplay = !1;
        this.startTime = 0;
        this.playbackRate = 1;
        this.isPlaying = !1;
        this.hasPlaybackControl = !0;
        this.sourceType = "empty";
        this.filters = []
    }

    function je(a) {
        dd.call(this, a);
        this.panner = this.context.createPanner();
        this.panner.connect(this.gain)
    }

    function ke(a, b) {
        this.analyser =
            a.context.createAnalyser();
        this.analyser.fftSize = void 0 !== b ? b : 2048;
        this.data = new Uint8Array(this.analyser.frequencyBinCount);
        a.getOutput().connect(this.analyser)
    }

    function Qd(a, b, e) {
        this.binding = a;
        this.valueSize = e;
        a = Float64Array;
        switch (b) {
            case "quaternion":
                b = this._slerp;
                break;
            case "string":
            case "bool":
                a = Array;
                b = this._select;
                break;
            default:
                b = this._lerp
        }
        this.buffer = new a(4 * e);
        this._mixBufferRegion = b;
        this.referenceCount = this.useCount = this.cumulativeWeight = 0
    }

    function Ua(a, b, e) {
        this.path = b;
        this.parsedPath =
            e || Ua.parseTrackName(b);
        this.node = Ua.findNode(a, this.parsedPath.nodeName) || a;
        this.rootNode = a
    }

    function le(a) {
        this.uuid = d.Math.generateUUID();
        this._objects = Array.prototype.slice.call(arguments);
        this.nCachedObjects_ = 0;
        var b = {};
        this._indicesByUUID = b;
        for (var e = 0, f = arguments.length; e !== f; ++e) b[arguments[e].uuid] = e;
        this._paths = [];
        this._parsedPaths = [];
        this._bindings = [];
        this._bindingsIndicesByPath = {};
        var q = this;
        this.stats = {
            objects: {get total() {
                    return q._objects.length
                },
                get inUse() {
                    return this.total - q.nCachedObjects_
                }
            },
            get bindingsPerObject() {
                return q._bindings.length
            }
        }
    }

    function me(a, b, e) {
        this._mixer = a;
        this._clip = b;
        this._localRoot = e || null;
        a = b.tracks;
        b = a.length;
        e = Array(b);
        for (var f = {
                endingStart: 2400,
                endingEnd: 2400
            }, q = 0; q !== b; ++q) {
            var c = a[q].createInterpolant(null);
            e[q] = c;
            c.settings = f
        }
        this._interpolantSettings = f;
        this._interpolants = e;
        this._propertyBindings = Array(b);
        this._weightInterpolant = this._timeScaleInterpolant = this._byClipCacheIndex = this._cacheIndex = null;
        this.loop = 2201;
        this._loopCount = -1;
        this._startTime = null;
        this.time = 0;
        this._effectiveWeight = this.weight = this._effectiveTimeScale = this.timeScale = 1;
        this.repetitions = Infinity;
        this.paused = !1;
        this.enabled = !0;
        this.clampWhenFinished = !1;
        this.zeroSlopeAtEnd = this.zeroSlopeAtStart = !0
    }

    function ne(a) {
        this._root = a;
        this._initMemoryManager();
        this.time = this._accuIndex = 0;
        this.timeScale = 1
    }

    function oe(a, b) {
        "string" === typeof a && (console.warn("THREE.Uniform: Type parameter is no longer needed."), a = b);
        this.value = a;
        this.dynamic = !1
    }

    function Qc() {
        W.call(this);
        this.type = "InstancedBufferGeometry";
        this.maxInstancedCount = void 0
    }

    function pe(a, b, e, f) {
        this.uuid = d.Math.generateUUID();
        this.data = a;
        this.itemSize = b;
        this.offset = e;
        this.normalized = !0 === f
    }

    function ed(a, b) {
        this.uuid = d.Math.generateUUID();
        this.array = a;
        this.stride = b;
        this.dynamic = !1;
        this.updateRange = {
            offset: 0,
            count: -1
        };
        this.version = 0
    }

    function fd(a, b, e) {
        ed.call(this, a, b);
        this.meshPerAttribute = e || 1
    }

    function gd(a, b, e) {
        J.call(this, a, b);
        this.meshPerAttribute = e || 1
    }

    function qe(a, b, e, f) {
        this.ray = new Gb(a, b);
        this.near = e || 0;
        this.far = f || Infinity;
        this.params = {
            Mesh: {},
            Line: {},
            LOD: {},
            Points: {
                threshold: 1
            },
            Sprite: {}
        };
        Object.defineProperties(this.params, {
            PointCloud: {
                get: function() {
                    console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points.");
                    return this.Points
                }
            }
        })
    }

    function Ge(a, b) {
        return a.distance - b.distance
    }

    function re(a, b, e, f) {
        if (!1 !== a.visible && (a.raycast(b, e), !0 === f)) {
            a = a.children;
            f = 0;
            for (var q = a.length; f < q; f++) re(a[f], b, e, !0)
        }
    }

    function se(a) {
        this.autoStart = void 0 !== a ? a : !0;
        this.elapsedTime = this.oldTime = this.startTime = 0;
        this.running = !1
    }

    function te(a, b, e) {
        this.radius = void 0 !== a ? a : 1;
        this.phi = void 0 !== b ? b : 0;
        this.theta = void 0 !== e ? e : 0;
        return this
    }

    function eb(a, b) {
        Na.call(this, a, b);
        this.animationsMap = {};
        this.animationsList = [];
        a = this.geometry.morphTargets.length;
        this.createAnimation("__default", 0, a - 1, a / 1);
        this.setAnimationWeight("__default", 1)
    }

    function xd(a) {
        M.call(this);
        this.material = a;
        this.render = function(a) {}
    }

    function yd(a) {
        function b(a, b) {
            return a - b
        }
        W.call(this);
        var e = [0, 0],
            f = {},
            q = ["a", "b", "c"];
        if (a && a.isGeometry) {
            var c = a.vertices,
                C = a.faces,
                d = 0,
                k = new Uint32Array(6 * C.length);
            a = 0;
            for (var g = C.length; a < g; a++)
                for (var h = C[a], l = 0; 3 > l; l++) {
                    e[0] = h[q[l]];
                    e[1] = h[q[(l + 1) % 3]];
                    e.sort(b);
                    var y = e.toString();
                    void 0 === f[y] && (k[2 * d] = e[0], k[2 * d + 1] = e[1], f[y] = !0, d++)
                }
            e = new Float32Array(6 * d);
            a = 0;
            for (g = d; a < g; a++)
                for (l = 0; 2 > l; l++) f = c[k[2 * a + l]], d = 6 * a + 3 * l, e[d + 0] = f.x, e[d + 1] = f.y, e[d + 2] = f.z;
            this.addAttribute("position", new J(e, 3))
        } else if (a && a.isBufferGeometry) {
            if (null !== a.index) {
                g = a.index.array;
                c = a.attributes.position;
                q = a.groups;
                d = 0;
                0 === q.length && a.addGroup(0,
                    g.length);
                k = new Uint32Array(2 * g.length);
                C = 0;
                for (h = q.length; C < h; ++C) {
                    a = q[C];
                    l = a.start;
                    y = a.count;
                    a = l;
                    for (var m = l + y; a < m; a += 3)
                        for (l = 0; 3 > l; l++) e[0] = g[a + l], e[1] = g[a + (l + 1) % 3], e.sort(b), y = e.toString(), void 0 === f[y] && (k[2 * d] = e[0], k[2 * d + 1] = e[1], f[y] = !0, d++)
                }
                e = new Float32Array(6 * d);
                a = 0;
                for (g = d; a < g; a++)
                    for (l = 0; 2 > l; l++) d = 6 * a + 3 * l, f = k[2 * a + l], e[d + 0] = c.getX(f), e[d + 1] = c.getY(f), e[d + 2] = c.getZ(f)
            } else
                for (c = a.attributes.position.array, d = c.length / 3, k = d / 3, e = new Float32Array(6 * d), a = 0, g = k; a < g; a++)
                    for (l = 0; 3 > l; l++) d = 18 * a +
                        6 * l, k = 9 * a + 3 * l, e[d + 0] = c[k], e[d + 1] = c[k + 1], e[d + 2] = c[k + 2], f = 9 * a + (l + 1) % 3 * 3, e[d + 3] = c[f], e[d + 4] = c[f + 1], e[d + 5] = c[f + 2];
            this.addAttribute("position", new J(e, 3))
        }
    }

    function Rd(a, b) {
        b = void 0 !== b ? b : 16777215;
        Ja.call(this, new yd(a.geometry), new xa({
            color: b
        }));
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1
    }

    function zd(a, b, e, f) {
        this.object = a;
        this.size = void 0 !== b ? b : 1;
        a = void 0 !== e ? e : 16711680;
        f = void 0 !== f ? f : 1;
        b = 0;
        (e = this.object.geometry) && e.isGeometry ? b = 3 * e.faces.length : e && e.isBufferGeometry && (b = e.attributes.normal.count);
        e = new W;
        b = new bb(6 * b, 3);
        e.addAttribute("position", b);
        Ja.call(this, e, new xa({
            color: a,
            linewidth: f
        }));
        this.matrixAutoUpdate = !1;
        this.update()
    }

    function hd(a) {
        M.call(this);
        this.light = a;
        this.light.updateMatrixWorld();
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1;
        a = new W;
        for (var b = [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, -1, 1], e = 0, f = 1; 32 > e; e++, f++) {
            var q = e / 32 * Math.PI * 2,
                c = f / 32 * Math.PI * 2;
            b.push(Math.cos(q), Math.sin(q), 1, Math.cos(c), Math.sin(c), 1)
        }
        a.addAttribute("position", new bb(b, 3));
        b = new xa({
            fog: !1
        });
        this.cone = new Ja(a, b);
        this.add(this.cone);
        this.update()
    }

    function id(a) {
        this.bones = this.getBoneList(a);
        for (var b = new ba, e = 0; e < this.bones.length; e++) {
            var f = this.bones[e];
            f.parent && f.parent.isBone && (b.vertices.push(new r), b.vertices.push(new r), b.colors.push(new G(0, 0, 1)), b.colors.push(new G(0, 1, 0)))
        }
        b.dynamic = !0;
        e = new xa({
            vertexColors: 2,
            depthTest: !1,
            depthWrite: !1,
            transparent: !0
        });
        Ja.call(this, b, e);
        this.root = a;
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1;
        this.update()
    }

    function jd(a,
        b, e, f, q, c, C) {
        W.call(this);
        this.type = "SphereBufferGeometry";
        this.parameters = {
            radius: a,
            widthSegments: b,
            heightSegments: e,
            phiStart: f,
            phiLength: q,
            thetaStart: c,
            thetaLength: C
        };
        a = a || 50;
        b = Math.max(3, Math.floor(b) || 8);
        e = Math.max(2, Math.floor(e) || 6);
        f = void 0 !== f ? f : 0;
        q = void 0 !== q ? q : 2 * Math.PI;
        c = void 0 !== c ? c : 0;
        C = void 0 !== C ? C : Math.PI;
        for (var d = c + C, k = (b + 1) * (e + 1), g = new J(new Float32Array(3 * k), 3), h = new J(new Float32Array(3 * k), 3), k = new J(new Float32Array(2 * k), 2), l = 0, y = [], m = new r, n = 0; n <= e; n++) {
            for (var w = [], t = n / e, A = 0; A <=
                b; A++) {
                var p = A / b,
                    v = -a * Math.cos(f + p * q) * Math.sin(c + t * C),
                    u = a * Math.cos(c + t * C),
                    E = a * Math.sin(f + p * q) * Math.sin(c + t * C);
                m.set(v, u, E).normalize();
                g.setXYZ(l, v, u, E);
                h.setXYZ(l, m.x, m.y, m.z);
                k.setXY(l, p, 1 - t);
                w.push(l);
                l++
            }
            y.push(w)
        }
        f = [];
        for (n = 0; n < e; n++)
            for (A = 0; A < b; A++) q = y[n][A + 1], C = y[n][A], l = y[n + 1][A], m = y[n + 1][A + 1], (0 !== n || 0 < c) && f.push(q, C, m), (n !== e - 1 || d < Math.PI) && f.push(C, l, m);
        this.setIndex(new(65535 < g.count ? Kd : Jd)(f, 1));
        this.addAttribute("position", g);
        this.addAttribute("normal", h);
        this.addAttribute("uv", k);
        this.boundingSphere = new La(new r, a)
    }

    function mb(a, b) {
        this.light = a;
        this.light.updateMatrixWorld();
        a = new jd(b, 4, 2);
        b = new cb({
            wireframe: !0,
            fog: !1
        });
        b.color.copy(this.light.color).multiplyScalar(this.light.intensity);
        Na.call(this, a, b);
        this.matrix = this.light.matrixWorld;
        this.matrixAutoUpdate = !1
    }

    function qb(a, b, e, f, q, c, C) {
        ba.call(this);
        this.type = "SphereGeometry";
        this.parameters = {
            radius: a,
            widthSegments: b,
            heightSegments: e,
            phiStart: f,
            phiLength: q,
            thetaStart: c,
            thetaLength: C
        };
        this.fromBufferGeometry(new jd(a,
            b, e, f, q, c, C))
    }

    function kd(a, b) {
        M.call(this);
        this.light = a;
        this.light.updateMatrixWorld();
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1;
        this.colors = [new G, new G];
        a = new qb(b, 4, 2);
        a.rotateX(-Math.PI / 2);
        for (b = 0; 8 > b; b++) a.faces[b].color = this.colors[4 > b ? 0 : 1];
        b = new cb({
            vertexColors: 1,
            wireframe: !0
        });
        this.lightSphere = new Na(a, b);
        this.add(this.lightSphere);
        this.update()
    }

    function Ad(a, b, e, f) {
        b = b || 1;
        e = new G(void 0 !== e ? e : 4473924);
        f = new G(void 0 !== f ? f : 8947848);
        for (var q = b / 2, c = 2 * a / b, C = [], d = [], k = 0, g = 0, h = -a; k <=
            b; k++, h += c) {
            C.push(-a, 0, h, a, 0, h);
            C.push(h, 0, -a, h, 0, a);
            var l = k === q ? e : f;
            l.toArray(d, g);
            g += 3;
            l.toArray(d, g);
            g += 3;
            l.toArray(d, g);
            g += 3;
            l.toArray(d, g);
            g += 3
        }
        a = new W;
        a.addAttribute("position", new bb(C, 3));
        a.addAttribute("color", new bb(d, 3));
        C = new xa({
            vertexColors: 2
        });
        Ja.call(this, a, C)
    }

    function Bd(a, b, e, f) {
        this.object = a;
        this.size = void 0 !== b ? b : 1;
        a = void 0 !== e ? e : 16776960;
        f = void 0 !== f ? f : 1;
        b = 0;
        (e = this.object.geometry) && e.isGeometry ? b = e.faces.length : console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");
        e = new W;
        b = new bb(6 * b, 3);
        e.addAttribute("position", b);
        Ja.call(this, e, new xa({
            color: a,
            linewidth: f
        }));
        this.matrixAutoUpdate = !1;
        this.update()
    }

    function Cd(a, b) {
        function e(a, b) {
            return a - b
        }
        W.call(this);
        b = Math.cos(d.Math.DEG2RAD * (void 0 !== b ? b : 1));
        var f = [0, 0],
            q = {},
            c = ["a", "b", "c"],
            C;
        a && a.isBufferGeometry ? (C = new ba, C.fromBufferGeometry(a)) : C = a.clone();
        C.mergeVertices();
        C.computeFaceNormals();
        a = C.vertices;
        C = C.faces;
        for (var k = 0, g = C.length; k < g; k++)
            for (var h = C[k], l = 0; 3 > l; l++) {
                f[0] = h[c[l]];
                f[1] = h[c[(l + 1) % 3]];
                f.sort(e);
                var m = f.toString();
                void 0 === q[m] ? q[m] = {
                    vert1: f[0],
                    vert2: f[1],
                    face1: k,
                    face2: void 0
                } : q[m].face2 = k
            }
        f = [];
        for (m in q)
            if (c = q[m], void 0 === c.face2 || C[c.face1].normal.dot(C[c.face2].normal) <= b) k = a[c.vert1], f.push(k.x), f.push(k.y), f.push(k.z), k = a[c.vert2], f.push(k.x), f.push(k.y), f.push(k.z);
        this.addAttribute("position", new J(new Float32Array(f), 3))
    }

    function w(a, b, e) {
        b = void 0 !== b ? b : 16777215;
        Ja.call(this, new Cd(a.geometry, e), new xa({
            color: b
        }));
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1
    }

    function A(a, b) {
        M.call(this);
        this.light = a;
        this.light.updateMatrixWorld();
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1;
        void 0 === b && (b = 1);
        a = new W;
        a.addAttribute("position", new bb([-b, b, 0, b, b, 0, b, -b, 0, -b, -b, 0, -b, b, 0], 3));
        b = new xa({
            fog: !1
        });
        this.add(new Jb(a, b));
        a = new W;
        a.addAttribute("position", new bb([0, 0, 0, 0, 0, 1], 3));
        this.add(new Jb(a, b));
        this.update()
    }

    function O(a) {
        function b(a, b, f) {
            e(a, f);
            e(b, f)
        }

        function e(a, b) {
            f.vertices.push(new r);
            f.colors.push(new G(b));
            void 0 === c[a] && (c[a] = []);
            c[a].push(f.vertices.length - 1)
        }
        var f =
            new ba,
            q = new xa({
                color: 16777215,
                vertexColors: 1
            }),
            c = {};
        b("n1", "n2", 16755200);
        b("n2", "n4", 16755200);
        b("n4", "n3", 16755200);
        b("n3", "n1", 16755200);
        b("f1", "f2", 16755200);
        b("f2", "f4", 16755200);
        b("f4", "f3", 16755200);
        b("f3", "f1", 16755200);
        b("n1", "f1", 16755200);
        b("n2", "f2", 16755200);
        b("n3", "f3", 16755200);
        b("n4", "f4", 16755200);
        b("p", "n1", 16711680);
        b("p", "n2", 16711680);
        b("p", "n3", 16711680);
        b("p", "n4", 16711680);
        b("u1", "u2", 43775);
        b("u2", "u3", 43775);
        b("u3", "u1", 43775);
        b("c", "t", 16777215);
        b("p", "c", 3355443);
        b("cn1",
            "cn2", 3355443);
        b("cn3", "cn4", 3355443);
        b("cf1", "cf2", 3355443);
        b("cf3", "cf4", 3355443);
        Ja.call(this, f, q);
        this.camera = a;
        this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix();
        this.matrix = a.matrixWorld;
        this.matrixAutoUpdate = !1;
        this.pointMap = c;
        this.update()
    }

    function T(a, b, e, f, q, c) {
        ba.call(this);
        this.type = "BoxGeometry";
        this.parameters = {
            width: a,
            height: b,
            depth: e,
            widthSegments: f,
            heightSegments: q,
            depthSegments: c
        };
        this.fromBufferGeometry(new dc(a, b, e, f, q, c));
        this.mergeVertices()
    }

    function N(a,
        b) {
        b = void 0 !== b ? b : 8947848;
        this.object = a;
        this.box = new Qa;
        Na.call(this, new T(1, 1, 1), new cb({
            color: b,
            wireframe: !0
        }))
    }

    function Pa(a, b) {
        void 0 === b && (b = 16776960);
        var e = new Uint16Array([0, 1, 1, 2, 2, 3, 3, 0, 4, 5, 5, 6, 6, 7, 7, 4, 0, 4, 1, 5, 2, 6, 3, 7]),
            f = new Float32Array(24),
            q = new W;
        q.setIndex(new J(e, 1));
        q.addAttribute("position", new J(f, 3));
        Ja.call(this, q, new xa({
            color: b
        }));
        void 0 !== a && this.update(a)
    }

    function wa(a, b, e, f, q, c, C, d) {
        function k(e) {
            var q, c, D, h = new v,
                l = new r,
                ia = 0,
                y = !0 === e ? a : b,
                ha = !0 === e ? 1 : -1;
            c = A;
            for (q = 1; q <= f; q++) n.setXYZ(A,
                0, E * ha, 0), w.setXYZ(A, 0, ha, 0), h.x = .5, h.y = .5, t.setXY(A, h.x, h.y), A++;
            D = A;
            for (q = 0; q <= f; q++) {
                var $a = q / f * d + C,
                    u = Math.cos($a),
                    $a = Math.sin($a);
                l.x = y * $a;
                l.y = E * ha;
                l.z = y * u;
                n.setXYZ(A, l.x, l.y, l.z);
                w.setXYZ(A, 0, ha, 0);
                h.x = .5 * u + .5;
                h.y = .5 * $a * ha + .5;
                t.setXY(A, h.x, h.y);
                A++
            }
            for (q = 0; q < f; q++) h = c + q, l = D + q, !0 === e ? (m.setX(p, l), p++, m.setX(p, l + 1)) : (m.setX(p, l + 1), p++, m.setX(p, l)), p++, m.setX(p, h), p++, ia += 3;
            g.addGroup(O, ia, !0 === e ? 1 : 2);
            O += ia
        }
        W.call(this);
        this.type = "CylinderBufferGeometry";
        this.parameters = {
            radiusTop: a,
            radiusBottom: b,
            height: e,
            radialSegments: f,
            heightSegments: q,
            openEnded: c,
            thetaStart: C,
            thetaLength: d
        };
        var g = this;
        a = void 0 !== a ? a : 20;
        b = void 0 !== b ? b : 20;
        e = void 0 !== e ? e : 100;
        f = Math.floor(f) || 8;
        q = Math.floor(q) || 1;
        c = void 0 !== c ? c : !1;
        C = void 0 !== C ? C : 0;
        d = void 0 !== d ? d : 2 * Math.PI;
        var h = 0;
        !1 === c && (0 < a && h++, 0 < b && h++);
        var l = function() {
                var a = (f + 1) * (q + 1);
                !1 === c && (a += (f + 1) * h + f * h);
                return a
            }(),
            y = function() {
                var a = f * q * 6;
                !1 === c && (a += f * h * 3);
                return a
            }(),
            m = new J(new(65535 < y ? Uint32Array : Uint16Array)(y), 1),
            n = new J(new Float32Array(3 * l), 3),
            w = new J(new Float32Array(3 *
                l), 3),
            t = new J(new Float32Array(2 * l), 2),
            A = 0,
            p = 0,
            u = [],
            E = e / 2,
            O = 0;
        (function() {
            var c, D, k = new r,
                h = new r,
                l = 0,
                ia = (b - a) / e;
            for (D = 0; D <= q; D++) {
                var y = [],
                    ha = D / q,
                    $a = ha * (b - a) + a;
                for (c = 0; c <= f; c++) {
                    var v = c / f;
                    h.x = $a * Math.sin(v * d + C);
                    h.y = -ha * e + E;
                    h.z = $a * Math.cos(v * d + C);
                    n.setXYZ(A, h.x, h.y, h.z);
                    k.copy(h);
                    if (0 === a && 0 === D || 0 === b && D === q) k.x = Math.sin(v * d + C), k.z = Math.cos(v * d + C);
                    k.setY(Math.sqrt(k.x * k.x + k.z * k.z) * ia).normalize();
                    w.setXYZ(A, k.x, k.y, k.z);
                    t.setXY(A, v, 1 - ha);
                    y.push(A);
                    A++
                }
                u.push(y)
            }
            for (c = 0; c < f; c++)
                for (D = 0; D < q; D++) k =
                    u[D + 1][c], h = u[D + 1][c + 1], ia = u[D][c + 1], m.setX(p, u[D][c]), p++, m.setX(p, k), p++, m.setX(p, ia), p++, m.setX(p, k), p++, m.setX(p, h), p++, m.setX(p, ia), p++, l += 6;
            g.addGroup(O, l, 0);
            O += l
        })();
        !1 === c && (0 < a && k(!0), 0 < b && k(!1));
        this.setIndex(m);
        this.addAttribute("position", n);
        this.addAttribute("normal", w);
        this.addAttribute("uv", t)
    }

    function Ma(a, b, e, f, q, c) {
        M.call(this);
        void 0 === f && (f = 16776960);
        void 0 === e && (e = 1);
        void 0 === q && (q = .2 * e);
        void 0 === c && (c = .2 * q);
        this.position.copy(b);
        this.line = new Jb(He, new xa({
            color: f
        }));
        this.line.matrixAutoUpdate = !1;
        this.add(this.line);
        this.cone = new Na(Ie, new cb({
            color: f
        }));
        this.cone.matrixAutoUpdate = !1;
        this.add(this.cone);
        this.setDirection(a);
        this.setLength(e, q, c)
    }

    function Da(a) {
        a = a || 1;
        var b = new Float32Array([0, 0, 0, a, 0, 0, 0, 0, 0, 0, a, 0, 0, 0, 0, 0, 0, a]),
            e = new Float32Array([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1]);
        a = new W;
        a.addAttribute("position", new J(b, 3));
        a.addAttribute("color", new J(e, 3));
        b = new xa({
            vertexColors: 2
        });
        Ja.call(this, a, b)
    }

    function nb(a, b, e) {
        ba.call(this);
        this.type = "ParametricGeometry";
        this.parameters = {
            func: a,
            slices: b,
            stacks: e
        };
        var f = this.vertices,
            q = this.faces,
            c = this.faceVertexUvs[0],
            C, d, k, g, h = b + 1;
        for (C = 0; C <= e; C++)
            for (g = C / e, d = 0; d <= b; d++) k = d / b, k = a(k, g), f.push(k);
        var l, y, m, n;
        for (C = 0; C < e; C++)
            for (d = 0; d < b; d++) a = C * h + d, f = C * h + d + 1, g = (C + 1) * h + d + 1, k = (C + 1) * h + d, l = new v(d / b, C / e), y = new v((d + 1) / b, C / e), m = new v((d + 1) / b, (C + 1) / e), n = new v(d / b, (C + 1) / e), q.push(new ja(a, f, k)), c.push([l, y, n]), q.push(new ja(f, g, k)), c.push([y.clone(), m, n.clone()]);
        this.computeFaceNormals();
        this.computeVertexNormals()
    }

    function gb(a, b, e, f) {
        function q(a) {
            var b =
                a.normalize().clone();
            b.index = g.vertices.push(b) - 1;
            b.uv = new v(Math.atan2(a.z, -a.x) / 2 / Math.PI + .5, 1 - (Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + .5));
            return b
        }

        function c(a, b, e) {
            var f = new ja(a.index, b.index, e.index, [a.clone(), b.clone(), e.clone()]);
            g.faces.push(f);
            A.copy(a).add(b).add(e).divideScalar(3);
            f = Math.atan2(A.z, -A.x);
            g.faceVertexUvs[0].push([k(a.uv, a, f), k(b.uv, b, f), k(e.uv, e, f)])
        }

        function d(a, b) {
            b = Math.pow(2, b);
            var e = q(g.vertices[a.a]),
                f = q(g.vertices[a.b]),
                C = q(g.vertices[a.c]);
            a = [];
            for (var k =
                    0; k <= b; k++) {
                a[k] = [];
                for (var I = q(e.clone().lerp(C, k / b)), h = q(f.clone().lerp(C, k / b)), l = b - k, y = 0; y <= l; y++) a[k][y] = 0 === y && k === b ? I : q(I.clone().lerp(h, y / l))
            }
            for (k = 0; k < b; k++)
                for (y = 0; y < 2 * (b - k) - 1; y++) e = Math.floor(y / 2), 0 === y % 2 ? c(a[k][e + 1], a[k + 1][e], a[k][e]) : c(a[k][e + 1], a[k + 1][e + 1], a[k + 1][e])
        }

        function k(a, b, e) {
            0 > e && 1 === a.x && (a = new v(a.x - 1, a.y));
            0 === b.x && 0 === b.z && (a = new v(e / 2 / Math.PI + .5, a.y));
            return a.clone()
        }
        ba.call(this);
        this.type = "PolyhedronGeometry";
        this.parameters = {
            vertices: a,
            indices: b,
            radius: e,
            detail: f
        };
        e = e || 1;
        f = f || 0;
        for (var g = this, h = 0, l = a.length; h < l; h += 3) q(new r(a[h], a[h + 1], a[h + 2]));
        a = this.vertices;
        for (var m = [], y = h = 0, l = b.length; h < l; h += 3, y++) {
            var n = a[b[h]],
                w = a[b[h + 1]],
                t = a[b[h + 2]];
            m[y] = new ja(n.index, w.index, t.index, [n.clone(), w.clone(), t.clone()])
        }
        for (var A = new r, h = 0, l = m.length; h < l; h++) d(m[h], f);
        h = 0;
        for (l = this.faceVertexUvs[0].length; h < l; h++) b = this.faceVertexUvs[0][h], f = b[0].x, a = b[1].x, m = b[2].x, y = Math.min(f, a, m), .9 < Math.max(f, a, m) && .1 > y && (.2 > f && (b[0].x += 1), .2 > a && (b[1].x += 1), .2 > m && (b[2].x += 1));
        h =
            0;
        for (l = this.vertices.length; h < l; h++) this.vertices[h].multiplyScalar(e);
        this.mergeVertices();
        this.computeFaceNormals();
        this.boundingSphere = new La(new r, e)
    }

    function rb(a, b) {
        gb.call(this, [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], a, b);
        this.type = "TetrahedronGeometry";
        this.parameters = {
            radius: a,
            detail: b
        }
    }

    function Ab(a, b) {
        gb.call(this, [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], a, b);
        this.type = "OctahedronGeometry";
        this.parameters = {
            radius: a,
            detail: b
        }
    }

    function ld(a, b) {
        var e = (1 + Math.sqrt(5)) / 2;
        gb.call(this, [-1, e, 0, 1, e, 0, -1, -e, 0, 1, -e, 0, 0, -1, e, 0, 1, e, 0, -1, -e, 0, 1, -e, e, 0, -1, e, 0, 1, -e, 0, -1, -e, 0, 1], [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], a, b);
        this.type = "IcosahedronGeometry";
        this.parameters = {
            radius: a,
            detail: b
        }
    }

    function fc(a, b) {
        var e = (1 + Math.sqrt(5)) / 2,
            f = 1 / e;
        gb.call(this, [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -f, -e, 0, -f, e, 0, f, -e, 0, f, e, -f, -e,
            0, -f, e, 0, f, -e, 0, f, e, 0, -e, 0, -f, e, 0, -f, -e, 0, f, e, 0, f
        ], [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], a, b);
        this.type = "DodecahedronGeometry";
        this.parameters = {
            radius: a,
            detail: b
        }
    }

    function xb(a, b, e, f, q, c) {
        function d(a, b, e, f, q) {
            var c = Math.sin(a);
            b = e / b * a;
            e = Math.cos(b);
            q.x = f * (2 + e) * .5 * Math.cos(a);
            q.y = f * (2 + e) * c * .5;
            q.z = f * Math.sin(b) * .5
        }
        W.call(this);
        this.type = "TorusKnotBufferGeometry";
        this.parameters = {
            radius: a,
            tube: b,
            tubularSegments: e,
            radialSegments: f,
            p: q,
            q: c
        };
        a = a || 100;
        b = b || 40;
        e = Math.floor(e) || 64;
        f = Math.floor(f) || 8;
        q = q || 2;
        c = c || 3;
        var k = (f + 1) * (e + 1),
            g = f * e * 6,
            g = new J(new(65535 < g ? Uint32Array : Uint16Array)(g), 1),
            h = new J(new Float32Array(3 * k), 3),
            l = new J(new Float32Array(3 * k), 3),
            k = new J(new Float32Array(2 * k), 2),
            m, y, n = 0,
            w = 0,
            t = new r,
            A = new r,
            p = new v,
            u = new r,
            E = new r,
            O = new r,
            B = new r,
            H = new r;
        for (m = 0; m <= e; ++m)
            for (y =
                m / e * q * Math.PI * 2, d(y, q, c, a, u), d(y + .01, q, c, a, E), B.subVectors(E, u), H.addVectors(E, u), O.crossVectors(B, H), H.crossVectors(O, B), O.normalize(), H.normalize(), y = 0; y <= f; ++y) {
                var T = y / f * Math.PI * 2,
                    z = -b * Math.cos(T),
                    T = b * Math.sin(T);
                t.x = u.x + (z * H.x + T * O.x);
                t.y = u.y + (z * H.y + T * O.y);
                t.z = u.z + (z * H.z + T * O.z);
                h.setXYZ(n, t.x, t.y, t.z);
                A.subVectors(t, u).normalize();
                l.setXYZ(n, A.x, A.y, A.z);
                p.x = m / e;
                p.y = y / f;
                k.setXY(n, p.x, p.y);
                n++
            }
        for (y = 1; y <= e; y++)
            for (m = 1; m <= f; m++) a = (f + 1) * y + (m - 1), b = (f + 1) * y + m, q = (f + 1) * (y - 1) + m, g.setX(w, (f + 1) * (y - 1) + (m -
                1)), w++, g.setX(w, a), w++, g.setX(w, q), w++, g.setX(w, a), w++, g.setX(w, b), w++, g.setX(w, q), w++;
        this.setIndex(g);
        this.addAttribute("position", h);
        this.addAttribute("normal", l);
        this.addAttribute("uv", k)
    }

    function Fa(a, b, e, f, q, c, d) {
        ba.call(this);
        this.type = "TorusKnotGeometry";
        this.parameters = {
            radius: a,
            tube: b,
            tubularSegments: e,
            radialSegments: f,
            p: q,
            q: c
        };
        void 0 !== d && console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead.");
        this.fromBufferGeometry(new xb(a, b, e, f, q, c));
        this.mergeVertices()
    }

    function Dd(a, b, e, f, q) {
        W.call(this);
        this.type = "TorusBufferGeometry";
        this.parameters = {
            radius: a,
            tube: b,
            radialSegments: e,
            tubularSegments: f,
            arc: q
        };
        a = a || 100;
        b = b || 40;
        e = Math.floor(e) || 8;
        f = Math.floor(f) || 6;
        q = q || 2 * Math.PI;
        var c = (e + 1) * (f + 1),
            d = e * f * 6,
            d = new(65535 < d ? Uint32Array : Uint16Array)(d),
            k = new Float32Array(3 * c),
            g = new Float32Array(3 * c),
            c = new Float32Array(2 * c),
            h = 0,
            l = 0,
            m = 0,
            y = new r,
            n = new r,
            w = new r,
            t, A;
        for (t = 0; t <= e; t++)
            for (A = 0; A <= f; A++) {
                var p = A / f * q,
                    v = t / e * Math.PI * 2;
                n.x = (a + b * Math.cos(v)) * Math.cos(p);
                n.y = (a + b * Math.cos(v)) * Math.sin(p);
                n.z = b * Math.sin(v);
                k[h] = n.x;
                k[h + 1] = n.y;
                k[h + 2] = n.z;
                y.x = a * Math.cos(p);
                y.y = a * Math.sin(p);
                w.subVectors(n, y).normalize();
                g[h] = w.x;
                g[h + 1] = w.y;
                g[h + 2] = w.z;
                c[l] = A / f;
                c[l + 1] = t / e;
                h += 3;
                l += 2
            }
        for (t = 1; t <= e; t++)
            for (A = 1; A <= f; A++) a = (f + 1) * (t - 1) + A - 1, b = (f + 1) * (t - 1) + A, q = (f + 1) * t + A, d[m] = (f + 1) * t + A - 1, d[m + 1] = a, d[m + 2] = q, d[m + 3] = a, d[m + 4] = b, d[m + 5] = q, m += 6;
        this.setIndex(new J(d, 1));
        this.addAttribute("position", new J(k, 3));
        this.addAttribute("normal", new J(g, 3));
        this.addAttribute("uv", new J(c, 2))
    }

    function Sd(a,
        b, e, f, q) {
        ba.call(this);
        this.type = "TorusGeometry";
        this.parameters = {
            radius: a,
            tube: b,
            radialSegments: e,
            tubularSegments: f,
            arc: q
        };
        this.fromBufferGeometry(new Dd(a, b, e, f, q))
    }

    function Td(a, b) {
        b = b || {};
        var e = b.font;
        if (!1 === (e && e.isFont)) return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."), new ba;
        a = e.generateShapes(a, b.size, b.curveSegments);
        b.amount = void 0 !== b.height ? b.height : 50;
        void 0 === b.bevelThickness && (b.bevelThickness = 10);
        void 0 === b.bevelSize && (b.bevelSize = 8);
        void 0 ===
            b.bevelEnabled && (b.bevelEnabled = !1);
        db.call(this, a, b);
        this.type = "TextGeometry"
    }

    function Ed(a, b, e, f, q, c) {
        W.call(this);
        this.type = "RingBufferGeometry";
        this.parameters = {
            innerRadius: a,
            outerRadius: b,
            thetaSegments: e,
            phiSegments: f,
            thetaStart: q,
            thetaLength: c
        };
        a = a || 20;
        b = b || 50;
        q = void 0 !== q ? q : 0;
        c = void 0 !== c ? c : 2 * Math.PI;
        e = void 0 !== e ? Math.max(3, e) : 8;
        f = void 0 !== f ? Math.max(1, f) : 1;
        var d = (e + 1) * (f + 1),
            k = e * f * 6,
            k = new J(new(65535 < k ? Uint32Array : Uint16Array)(k), 1),
            g = new J(new Float32Array(3 * d), 3),
            h = new J(new Float32Array(3 *
                d), 3),
            d = new J(new Float32Array(2 * d), 2),
            l = 0,
            m = 0,
            y, n = a,
            w = (b - a) / f,
            t = new r,
            A = new v,
            p;
        for (a = 0; a <= f; a++) {
            for (p = 0; p <= e; p++) y = q + p / e * c, t.x = n * Math.cos(y), t.y = n * Math.sin(y), g.setXYZ(l, t.x, t.y, t.z), h.setXYZ(l, 0, 0, 1), A.x = (t.x / b + 1) / 2, A.y = (t.y / b + 1) / 2, d.setXY(l, A.x, A.y), l++;
            n += w
        }
        for (a = 0; a < f; a++)
            for (b = a * (e + 1), p = 0; p < e; p++) q = y = p + b, c = y + e + 1, l = y + e + 2, y += 1, k.setX(m, q), m++, k.setX(m, c), m++, k.setX(m, l), m++, k.setX(m, q), m++, k.setX(m, l), m++, k.setX(m, y), m++;
        this.setIndex(k);
        this.addAttribute("position", g);
        this.addAttribute("normal",
            h);
        this.addAttribute("uv", d)
    }

    function Ud(a, b, e, f, q, c) {
        ba.call(this);
        this.type = "RingGeometry";
        this.parameters = {
            innerRadius: a,
            outerRadius: b,
            thetaSegments: e,
            phiSegments: f,
            thetaStart: q,
            thetaLength: c
        };
        this.fromBufferGeometry(new Ed(a, b, e, f, q, c))
    }

    function Vd(a, b, e, f) {
        ba.call(this);
        this.type = "PlaneGeometry";
        this.parameters = {
            width: a,
            height: b,
            widthSegments: e,
            heightSegments: f
        };
        this.fromBufferGeometry(new lc(a, b, e, f))
    }

    function Fd(a, b, e, f) {
        W.call(this);
        this.type = "LatheBufferGeometry";
        this.parameters = {
            points: a,
            segments: b,
            phiStart: e,
            phiLength: f
        };
        b = Math.floor(b) || 12;
        e = e || 0;
        f = f || 2 * Math.PI;
        f = d.Math.clamp(f, 0, 2 * Math.PI);
        for (var q = (b + 1) * a.length, c = b * a.length * 6, C = new J(new(65535 < c ? Uint32Array : Uint16Array)(c), 1), k = new J(new Float32Array(3 * q), 3), g = new J(new Float32Array(2 * q), 2), h = 0, l = 0, m = 1 / b, y = new r, n = new v, q = 0; q <= b; q++)
            for (var c = e + q * m * f, w = Math.sin(c), t = Math.cos(c), c = 0; c <= a.length - 1; c++) y.x = a[c].x * w, y.y = a[c].y, y.z = a[c].x * t, k.setXYZ(h, y.x, y.y, y.z), n.x = q / b, n.y = c / (a.length - 1), g.setXY(h, n.x, n.y), h++;
        for (q = 0; q < b; q++)
            for (c =
                0; c < a.length - 1; c++) e = c + q * a.length, h = e + a.length, m = e + a.length + 1, y = e + 1, C.setX(l, e), l++, C.setX(l, h), l++, C.setX(l, y), l++, C.setX(l, h), l++, C.setX(l, m), l++, C.setX(l, y), l++;
        this.setIndex(C);
        this.addAttribute("position", k);
        this.addAttribute("uv", g);
        this.computeVertexNormals();
        if (f === 2 * Math.PI)
            for (f = this.attributes.normal.array, C = new r, k = new r, g = new r, e = b * a.length * 3, c = q = 0; q < a.length; q++, c += 3) C.x = f[c + 0], C.y = f[c + 1], C.z = f[c + 2], k.x = f[e + c + 0], k.y = f[e + c + 1], k.z = f[e + c + 2], g.addVectors(C, k).normalize(), f[c + 0] = f[e + c + 0] =
                g.x, f[c + 1] = f[e + c + 1] = g.y, f[c + 2] = f[e + c + 2] = g.z
    }

    function Wd(a, b, e, f) {
        ba.call(this);
        this.type = "LatheGeometry";
        this.parameters = {
            points: a,
            segments: b,
            phiStart: e,
            phiLength: f
        };
        this.fromBufferGeometry(new Fd(a, b, e, f));
        this.mergeVertices()
    }

    function md(a, b, e, f, q, c, d, k) {
        ba.call(this);
        this.type = "CylinderGeometry";
        this.parameters = {
            radiusTop: a,
            radiusBottom: b,
            height: e,
            radialSegments: f,
            heightSegments: q,
            openEnded: c,
            thetaStart: d,
            thetaLength: k
        };
        this.fromBufferGeometry(new wa(a, b, e, f, q, c, d, k));
        this.mergeVertices()
    }

    function Xd(a,
        b, e, f, q, c, d) {
        md.call(this, 0, a, b, e, f, q, c, d);
        this.type = "ConeGeometry";
        this.parameters = {
            radius: a,
            height: b,
            radialSegments: e,
            heightSegments: f,
            openEnded: q,
            thetaStart: c,
            thetaLength: d
        }
    }

    function Yd(a, b, e, f, q, c, d) {
        wa.call(this, 0, a, b, e, f, q, c, d);
        this.type = "ConeBufferGeometry";
        this.parameters = {
            radius: a,
            height: b,
            radialSegments: e,
            heightSegments: f,
            thetaStart: c,
            thetaLength: d
        }
    }

    function Gd(a, b, e, f) {
        W.call(this);
        this.type = "CircleBufferGeometry";
        this.parameters = {
            radius: a,
            segments: b,
            thetaStart: e,
            thetaLength: f
        };
        a = a || 50;
        b = void 0 !== b ? Math.max(3, b) : 8;
        e = void 0 !== e ? e : 0;
        f = void 0 !== f ? f : 2 * Math.PI;
        var q = b + 2,
            c = new Float32Array(3 * q),
            d = new Float32Array(3 * q),
            q = new Float32Array(2 * q);
        d[2] = 1;
        q[0] = .5;
        q[1] = .5;
        for (var k = 0, g = 3, h = 2; k <= b; k++, g += 3, h += 2) {
            var l = e + k / b * f;
            c[g] = a * Math.cos(l);
            c[g + 1] = a * Math.sin(l);
            d[g + 2] = 1;
            q[h] = (c[g] / a + 1) / 2;
            q[h + 1] = (c[g + 1] / a + 1) / 2
        }
        e = [];
        for (g = 1; g <= b; g++) e.push(g, g + 1, 0);
        this.setIndex(new J(new Uint16Array(e), 1));
        this.addAttribute("position", new J(c, 3));
        this.addAttribute("normal", new J(d, 3));
        this.addAttribute("uv",
            new J(q, 2));
        this.boundingSphere = new La(new r, a)
    }

    function Zd(a, b, e, f) {
        ba.call(this);
        this.type = "CircleGeometry";
        this.parameters = {
            radius: a,
            segments: b,
            thetaStart: e,
            thetaLength: f
        };
        this.fromBufferGeometry(new Gd(a, b, e, f))
    }

    function Je(a) {
        console.warn("THREE.ClosedSplineCurve3 has been deprecated. Please use THREE.CatmullRomCurve3.");
        d.CatmullRomCurve3.call(this, a);
        this.type = "catmullrom";
        this.closed = !0
    }

    function $d(a, b, e, f, q, c) {
        Mb.call(this, a, b, e, e, f, q, c)
    }
    void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52));
    void 0 === Math.sign && (Math.sign = function(a) {
        return 0 > a ? -1 : 0 < a ? 1 : +a
    });
    void 0 === Function.prototype.name && Object.defineProperty(Function.prototype, "name", {
        get: function() {
            return this.toString().match(/^\s*function\s*(\S*)\s*\(/)[1]
        }
    });
    void 0 === Object.assign && function() {
        Object.assign = function(a) {
            if (void 0 === a || null === a) throw new TypeError("Cannot convert undefined or null to object");
            for (var b = Object(a), e = 1; e < arguments.length; e++) {
                var f = arguments[e];
                if (void 0 !== f && null !== f)
                    for (var q in f) Object.prototype.hasOwnProperty.call(f,
                        q) && (b[q] = f[q])
            }
            return b
        }
    }();
    Object.assign(p.prototype, {
        addEventListener: function(a, b) {
            void 0 === this._listeners && (this._listeners = {});
            var e = this._listeners;
            void 0 === e[a] && (e[a] = []); - 1 === e[a].indexOf(b) && e[a].push(b)
        },
        hasEventListener: function(a, b) {
            if (void 0 === this._listeners) return !1;
            var e = this._listeners;
            return void 0 !== e[a] && -1 !== e[a].indexOf(b) ? !0 : !1
        },
        removeEventListener: function(a, b) {
            void 0 !== this._listeners && (a = this._listeners[a], void 0 !== a && (b = a.indexOf(b), -1 !== b && a.splice(b, 1)))
        },
        dispatchEvent: function(a) {
            if (void 0 !==
                this._listeners) {
                var b = this._listeners[a.type];
                if (void 0 !== b) {
                    a.target = this;
                    var e = [],
                        f, q = b.length;
                    for (f = 0; f < q; f++) e[f] = b[f];
                    for (f = 0; f < q; f++) e[f].call(this, a)
                }
            }
        }
    });
    d.Math = {
        DEG2RAD: Math.PI / 180,
        RAD2DEG: 180 / Math.PI,
        generateUUID: function() {
            var a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
                b = Array(36),
                e = 0,
                f;
            return function() {
                for (var q = 0; 36 > q; q++) 8 === q || 13 === q || 18 === q || 23 === q ? b[q] = "-" : 14 === q ? b[q] = "4" : (2 >= e && (e = 33554432 + 16777216 * Math.random() | 0), f = e & 15, e >>= 4, b[q] = a[19 === q ? f &
                    3 | 8 : f]);
                return b.join("")
            }
        }(),
        clamp: function(a, b, e) {
            return Math.max(b, Math.min(e, a))
        },
        euclideanModulo: function(a, b) {
            return (a % b + b) % b
        },
        mapLinear: function(a, b, e, f, q) {
            return f + (a - b) * (q - f) / (e - b)
        },
        smoothstep: function(a, b, e) {
            if (a <= b) return 0;
            if (a >= e) return 1;
            a = (a - b) / (e - b);
            return a * a * (3 - 2 * a)
        },
        smootherstep: function(a, b, e) {
            if (a <= b) return 0;
            if (a >= e) return 1;
            a = (a - b) / (e - b);
            return a * a * a * (a * (6 * a - 15) + 10)
        },
        random16: function() {
            console.warn("THREE.Math.random16() has been deprecated. Use Math.random() instead.");
            return Math.random()
        },
        randInt: function(a, b) {
            return a + Math.floor(Math.random() * (b - a + 1))
        },
        randFloat: function(a, b) {
            return a + Math.random() * (b - a)
        },
        randFloatSpread: function(a) {
            return a * (.5 - Math.random())
        },
        degToRad: function(a) {
            return a * d.Math.DEG2RAD
        },
        radToDeg: function(a) {
            return a * d.Math.RAD2DEG
        },
        isPowerOfTwo: function(a) {
            return 0 === (a & a - 1) && 0 !== a
        },
        nearestPowerOfTwo: function(a) {
            return Math.pow(2, Math.round(Math.log(a) / Math.LN2))
        },
        nextPowerOfTwo: function(a) {
            a--;
            a |= a >> 1;
            a |= a >> 2;
            a |= a >> 4;
            a |= a >> 8;
            a |= a >> 16;
            a++;
            return a
        }
    };
    v.prototype = {
        constructor: v,
        isVector2: !0,
        get width() {
            return this.x
        },
        set width(a) {
            this.x = a
        },
        get height() {
            return this.y
        },
        set height(a) {
            this.y = a
        },
        set: function(a, b) {
            this.x = a;
            this.y = b;
            return this
        },
        setScalar: function(a) {
            this.y = this.x = a;
            return this
        },
        setX: function(a) {
            this.x = a;
            return this
        },
        setY: function(a) {
            this.y = a;
            return this
        },
        setComponent: function(a, b) {
            switch (a) {
                case 0:
                    this.x = b;
                    break;
                case 1:
                    this.y = b;
                    break;
                default:
                    throw Error("index is out of range: " + a);
            }
        },
        getComponent: function(a) {
            switch (a) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                default:
                    throw Error("index is out of range: " + a);
            }
        },
        clone: function() {
            return new this.constructor(this.x, this.y)
        },
        copy: function(a) {
            this.x = a.x;
            this.y = a.y;
            return this
        },
        add: function(a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
            this.x += a.x;
            this.y += a.y;
            return this
        },
        addScalar: function(a) {
            this.x += a;
            this.y += a;
            return this
        },
        addVectors: function(a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            return this
        },
        addScaledVector: function(a,
            b) {
            this.x += a.x * b;
            this.y += a.y * b;
            return this
        },
        sub: function(a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
            this.x -= a.x;
            this.y -= a.y;
            return this
        },
        subScalar: function(a) {
            this.x -= a;
            this.y -= a;
            return this
        },
        subVectors: function(a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            return this
        },
        multiply: function(a) {
            this.x *= a.x;
            this.y *= a.y;
            return this
        },
        multiplyScalar: function(a) {
            isFinite(a) ? (this.x *= a, this.y *= a) : this.y = this.x = 0;
            return this
        },
        divide: function(a) {
            this.x /= a.x;
            this.y /= a.y;
            return this
        },
        divideScalar: function(a) {
            return this.multiplyScalar(1 / a)
        },
        min: function(a) {
            this.x = Math.min(this.x, a.x);
            this.y = Math.min(this.y, a.y);
            return this
        },
        max: function(a) {
            this.x = Math.max(this.x, a.x);
            this.y = Math.max(this.y, a.y);
            return this
        },
        clamp: function(a, b) {
            this.x = Math.max(a.x, Math.min(b.x, this.x));
            this.y = Math.max(a.y, Math.min(b.y, this.y));
            return this
        },
        clampScalar: function() {
            var a, b;
            return function(e, f) {
                void 0 === a && (a = new v, b = new v);
                a.set(e,
                    e);
                b.set(f, f);
                return this.clamp(a, b)
            }
        }(),
        clampLength: function(a, b) {
            var e = this.length();
            return this.multiplyScalar(Math.max(a, Math.min(b, e)) / e)
        },
        floor: function() {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this
        },
        ceil: function() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this
        },
        round: function() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            return this
        },
        roundToZero: function() {
            this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
            return this
        },
        negate: function() {
            this.x = -this.x;
            this.y = -this.y;
            return this
        },
        dot: function(a) {
            return this.x * a.x + this.y * a.y
        },
        lengthSq: function() {
            return this.x * this.x + this.y * this.y
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
        lengthManhattan: function() {
            return Math.abs(this.x) + Math.abs(this.y)
        },
        normalize: function() {
            return this.divideScalar(this.length())
        },
        angle: function() {
            var a = Math.atan2(this.y, this.x);
            0 > a && (a += 2 * Math.PI);
            return a
        },
        distanceTo: function(a) {
            return Math.sqrt(this.distanceToSquared(a))
        },
        distanceToSquared: function(a) {
            var b = this.x - a.x;
            a = this.y - a.y;
            return b * b + a * a
        },
        distanceToManhattan: function(a) {
            return Math.abs(this.x - a.x) + Math.abs(this.y - a.y)
        },
        setLength: function(a) {
            return this.multiplyScalar(a / this.length())
        },
        lerp: function(a, b) {
            this.x += (a.x - this.x) * b;
            this.y += (a.y - this.y) * b;
            return this
        },
        lerpVectors: function(a, b, e) {
            return this.subVectors(b, a).multiplyScalar(e).add(a)
        },
        equals: function(a) {
            return a.x === this.x && a.y === this.y
        },
        fromArray: function(a, b) {
            void 0 === b && (b = 0);
            this.x = a[b];
            this.y = a[b +
                1];
            return this
        },
        toArray: function(a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            a[b] = this.x;
            a[b + 1] = this.y;
            return a
        },
        fromAttribute: function(a, b, e) {
            void 0 === e && (e = 0);
            b = b * a.itemSize + e;
            this.x = a.array[b];
            this.y = a.array[b + 1];
            return this
        },
        rotateAround: function(a, b) {
            var e = Math.cos(b);
            b = Math.sin(b);
            var f = this.x - a.x,
                q = this.y - a.y;
            this.x = f * e - q * b + a.x;
            this.y = f * b + q * e + a.y;
            return this
        }
    };
    u.DEFAULT_IMAGE = void 0;
    u.DEFAULT_MAPPING = 300;
    u.prototype = {
        constructor: u,
        isTexture: !0,
        set needsUpdate(a) {
            !0 === a && this.version++
        },
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            this.image = a.image;
            this.mipmaps = a.mipmaps.slice(0);
            this.mapping = a.mapping;
            this.wrapS = a.wrapS;
            this.wrapT = a.wrapT;
            this.magFilter = a.magFilter;
            this.minFilter = a.minFilter;
            this.anisotropy = a.anisotropy;
            this.format = a.format;
            this.type = a.type;
            this.offset.copy(a.offset);
            this.repeat.copy(a.repeat);
            this.generateMipmaps = a.generateMipmaps;
            this.premultiplyAlpha = a.premultiplyAlpha;
            this.flipY = a.flipY;
            this.unpackAlignment = a.unpackAlignment;
            this.encoding = a.encoding;
            return this
        },
        toJSON: function(a) {
            if (void 0 !==
                a.textures[this.uuid]) return a.textures[this.uuid];
            var b = {
                metadata: {
                    version: 4.4,
                    type: "Texture",
                    generator: "Texture.toJSON"
                },
                uuid: this.uuid,
                name: this.name,
                mapping: this.mapping,
                repeat: [this.repeat.x, this.repeat.y],
                offset: [this.offset.x, this.offset.y],
                wrap: [this.wrapS, this.wrapT],
                minFilter: this.minFilter,
                magFilter: this.magFilter,
                anisotropy: this.anisotropy,
                flipY: this.flipY
            };
            if (void 0 !== this.image) {
                var e = this.image;
                void 0 === e.uuid && (e.uuid = d.Math.generateUUID());
                if (void 0 === a.images[e.uuid]) {
                    var f = a.images,
                        q = e.uuid,
                        c = e.uuid,
                        k;
                    void 0 !== e.toDataURL ? k = e : (k = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas"), k.width = e.width, k.height = e.height, k.getContext("2d").drawImage(e, 0, 0, e.width, e.height));
                    k = 2048 < k.width || 2048 < k.height ? k.toDataURL("image/jpeg", .6) : k.toDataURL("image/png");
                    f[q] = {
                        uuid: c,
                        url: k
                    }
                }
                b.image = e.uuid
            }
            return a.textures[this.uuid] = b
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            })
        },
        transformUv: function(a) {
            if (300 === this.mapping) {
                a.multiply(this.repeat);
                a.add(this.offset);
                if (0 >
                    a.x || 1 < a.x) switch (this.wrapS) {
                    case 1E3:
                        a.x -= Math.floor(a.x);
                        break;
                    case 1001:
                        a.x = 0 > a.x ? 0 : 1;
                        break;
                    case 1002:
                        a.x = 1 === Math.abs(Math.floor(a.x) % 2) ? Math.ceil(a.x) - a.x : a.x - Math.floor(a.x)
                }
                if (0 > a.y || 1 < a.y) switch (this.wrapT) {
                    case 1E3:
                        a.y -= Math.floor(a.y);
                        break;
                    case 1001:
                        a.y = 0 > a.y ? 0 : 1;
                        break;
                    case 1002:
                        a.y = 1 === Math.abs(Math.floor(a.y) % 2) ? Math.ceil(a.y) - a.y : a.y - Math.floor(a.y)
                }
                this.flipY && (a.y = 1 - a.y)
            }
        }
    };
    Object.assign(u.prototype, p.prototype);
    var ve = 0;
    z.prototype = {
        constructor: z,
        isMatrix4: !0,
        set: function(a, b, e,
            f, q, c, d, k, g, h, l, m, y, n, w, t) {
            var A = this.elements;
            A[0] = a;
            A[4] = b;
            A[8] = e;
            A[12] = f;
            A[1] = q;
            A[5] = c;
            A[9] = d;
            A[13] = k;
            A[2] = g;
            A[6] = h;
            A[10] = l;
            A[14] = m;
            A[3] = y;
            A[7] = n;
            A[11] = w;
            A[15] = t;
            return this
        },
        identity: function() {
            this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            return this
        },
        clone: function() {
            return (new z).fromArray(this.elements)
        },
        copy: function(a) {
            this.elements.set(a.elements);
            return this
        },
        copyPosition: function(a) {
            var b = this.elements;
            a = a.elements;
            b[12] = a[12];
            b[13] = a[13];
            b[14] = a[14];
            return this
        },
        extractBasis: function(a,
            b, e) {
            a.setFromMatrixColumn(this, 0);
            b.setFromMatrixColumn(this, 1);
            e.setFromMatrixColumn(this, 2);
            return this
        },
        makeBasis: function(a, b, e) {
            this.set(a.x, b.x, e.x, 0, a.y, b.y, e.y, 0, a.z, b.z, e.z, 0, 0, 0, 0, 1);
            return this
        },
        extractRotation: function() {
            var a;
            return function(b) {
                void 0 === a && (a = new r);
                var e = this.elements,
                    f = b.elements,
                    q = 1 / a.setFromMatrixColumn(b, 0).length(),
                    c = 1 / a.setFromMatrixColumn(b, 1).length();
                b = 1 / a.setFromMatrixColumn(b, 2).length();
                e[0] = f[0] * q;
                e[1] = f[1] * q;
                e[2] = f[2] * q;
                e[4] = f[4] * c;
                e[5] = f[5] * c;
                e[6] = f[6] *
                    c;
                e[8] = f[8] * b;
                e[9] = f[9] * b;
                e[10] = f[10] * b;
                return this
            }
        }(),
        makeRotationFromEuler: function(a) {
            !1 === (a && a.isEuler) && console.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
            var b = this.elements,
                e = a.x,
                f = a.y,
                q = a.z,
                c = Math.cos(e),
                e = Math.sin(e),
                d = Math.cos(f),
                f = Math.sin(f),
                k = Math.cos(q),
                q = Math.sin(q);
            if ("XYZ" === a.order) {
                a = c * k;
                var g = c * q,
                    h = e * k,
                    l = e * q;
                b[0] = d * k;
                b[4] = -d * q;
                b[8] = f;
                b[1] = g + h * f;
                b[5] = a - l * f;
                b[9] = -e * d;
                b[2] = l - a * f;
                b[6] = h + g * f;
                b[10] = c * d
            } else "YXZ" ===
                a.order ? (a = d * k, g = d * q, h = f * k, l = f * q, b[0] = a + l * e, b[4] = h * e - g, b[8] = c * f, b[1] = c * q, b[5] = c * k, b[9] = -e, b[2] = g * e - h, b[6] = l + a * e, b[10] = c * d) : "ZXY" === a.order ? (a = d * k, g = d * q, h = f * k, l = f * q, b[0] = a - l * e, b[4] = -c * q, b[8] = h + g * e, b[1] = g + h * e, b[5] = c * k, b[9] = l - a * e, b[2] = -c * f, b[6] = e, b[10] = c * d) : "ZYX" === a.order ? (a = c * k, g = c * q, h = e * k, l = e * q, b[0] = d * k, b[4] = h * f - g, b[8] = a * f + l, b[1] = d * q, b[5] = l * f + a, b[9] = g * f - h, b[2] = -f, b[6] = e * d, b[10] = c * d) : "YZX" === a.order ? (a = c * d, g = c * f, h = e * d, l = e * f, b[0] = d * k, b[4] = l - a * q, b[8] = h * q + g, b[1] = q, b[5] = c * k, b[9] = -e * k, b[2] = -f * k, b[6] = g *
                    q + h, b[10] = a - l * q) : "XZY" === a.order && (a = c * d, g = c * f, h = e * d, l = e * f, b[0] = d * k, b[4] = -q, b[8] = f * k, b[1] = a * q + l, b[5] = c * k, b[9] = g * q - h, b[2] = h * q - g, b[6] = e * k, b[10] = l * q + a);
            b[3] = 0;
            b[7] = 0;
            b[11] = 0;
            b[12] = 0;
            b[13] = 0;
            b[14] = 0;
            b[15] = 1;
            return this
        },
        makeRotationFromQuaternion: function(a) {
            var b = this.elements,
                e = a.x,
                f = a.y,
                q = a.z,
                c = a.w,
                d = e + e,
                k = f + f,
                g = q + q;
            a = e * d;
            var h = e * k,
                e = e * g,
                l = f * k,
                f = f * g,
                q = q * g,
                d = c * d,
                k = c * k,
                c = c * g;
            b[0] = 1 - (l + q);
            b[4] = h - c;
            b[8] = e + k;
            b[1] = h + c;
            b[5] = 1 - (a + q);
            b[9] = f - d;
            b[2] = e - k;
            b[6] = f + d;
            b[10] = 1 - (a + l);
            b[3] = 0;
            b[7] = 0;
            b[11] = 0;
            b[12] = 0;
            b[13] =
                0;
            b[14] = 0;
            b[15] = 1;
            return this
        },
        lookAt: function() {
            var a, b, e;
            return function(f, q, c) {
                void 0 === a && (a = new r, b = new r, e = new r);
                var d = this.elements;
                e.subVectors(f, q).normalize();
                0 === e.lengthSq() && (e.z = 1);
                a.crossVectors(c, e).normalize();
                0 === a.lengthSq() && (e.z += 1E-4, a.crossVectors(c, e).normalize());
                b.crossVectors(e, a);
                d[0] = a.x;
                d[4] = b.x;
                d[8] = e.x;
                d[1] = a.y;
                d[5] = b.y;
                d[9] = e.y;
                d[2] = a.z;
                d[6] = b.z;
                d[10] = e.z;
                return this
            }
        }(),
        multiply: function(a, b) {
            return void 0 !== b ? (console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),
                this.multiplyMatrices(a, b)) : this.multiplyMatrices(this, a)
        },
        premultiply: function(a) {
            return this.multiplyMatrices(a, this)
        },
        multiplyMatrices: function(a, b) {
            var e = a.elements,
                f = b.elements;
            b = this.elements;
            a = e[0];
            var q = e[4],
                c = e[8],
                d = e[12],
                k = e[1],
                g = e[5],
                h = e[9],
                l = e[13],
                m = e[2],
                y = e[6],
                n = e[10],
                w = e[14],
                t = e[3],
                A = e[7],
                r = e[11],
                e = e[15],
                p = f[0],
                v = f[4],
                u = f[8],
                E = f[12],
                O = f[1],
                H = f[5],
                T = f[9],
                B = f[13],
                z = f[2],
                x = f[6],
                L = f[10],
                N = f[14],
                Y = f[3],
                ca = f[7],
                P = f[11],
                f = f[15];
            b[0] = a * p + q * O + c * z + d * Y;
            b[4] = a * v + q * H + c * x + d * ca;
            b[8] = a * u + q * T + c * L + d *
                P;
            b[12] = a * E + q * B + c * N + d * f;
            b[1] = k * p + g * O + h * z + l * Y;
            b[5] = k * v + g * H + h * x + l * ca;
            b[9] = k * u + g * T + h * L + l * P;
            b[13] = k * E + g * B + h * N + l * f;
            b[2] = m * p + y * O + n * z + w * Y;
            b[6] = m * v + y * H + n * x + w * ca;
            b[10] = m * u + y * T + n * L + w * P;
            b[14] = m * E + y * B + n * N + w * f;
            b[3] = t * p + A * O + r * z + e * Y;
            b[7] = t * v + A * H + r * x + e * ca;
            b[11] = t * u + A * T + r * L + e * P;
            b[15] = t * E + A * B + r * N + e * f;
            return this
        },
        multiplyToArray: function(a, b, e) {
            var f = this.elements;
            this.multiplyMatrices(a, b);
            e[0] = f[0];
            e[1] = f[1];
            e[2] = f[2];
            e[3] = f[3];
            e[4] = f[4];
            e[5] = f[5];
            e[6] = f[6];
            e[7] = f[7];
            e[8] = f[8];
            e[9] = f[9];
            e[10] = f[10];
            e[11] = f[11];
            e[12] =
                f[12];
            e[13] = f[13];
            e[14] = f[14];
            e[15] = f[15];
            return this
        },
        multiplyScalar: function(a) {
            var b = this.elements;
            b[0] *= a;
            b[4] *= a;
            b[8] *= a;
            b[12] *= a;
            b[1] *= a;
            b[5] *= a;
            b[9] *= a;
            b[13] *= a;
            b[2] *= a;
            b[6] *= a;
            b[10] *= a;
            b[14] *= a;
            b[3] *= a;
            b[7] *= a;
            b[11] *= a;
            b[15] *= a;
            return this
        },
        applyToVector3Array: function() {
            var a;
            return function(b, e, f) {
                void 0 === a && (a = new r);
                void 0 === e && (e = 0);
                void 0 === f && (f = b.length);
                for (var q = 0; q < f; q += 3, e += 3) a.fromArray(b, e), a.applyMatrix4(this), a.toArray(b, e);
                return b
            }
        }(),
        applyToBuffer: function() {
            var a;
            return function(b,
                e, f) {
                void 0 === a && (a = new r);
                void 0 === e && (e = 0);
                void 0 === f && (f = b.length / b.itemSize);
                for (var q = 0; q < f; q++, e++) a.x = b.getX(e), a.y = b.getY(e), a.z = b.getZ(e), a.applyMatrix4(this), b.setXYZ(a.x, a.y, a.z);
                return b
            }
        }(),
        determinant: function() {
            var a = this.elements,
                b = a[0],
                e = a[4],
                f = a[8],
                q = a[12],
                c = a[1],
                d = a[5],
                k = a[9],
                g = a[13],
                h = a[2],
                l = a[6],
                m = a[10],
                y = a[14];
            return a[3] * (+q * k * l - f * g * l - q * d * m + e * g * m + f * d * y - e * k * y) + a[7] * (+b * k * y - b * g * m + q * c * m - f * c * y + f * g * h - q * k * h) + a[11] * (+b * g * l - b * d * y - q * c * l + e * c * y + q * d * h - e * g * h) + a[15] * (-f * d * h - b * k * l + b * d * m + f *
                c * l - e * c * m + e * k * h)
        },
        transpose: function() {
            var a = this.elements,
                b;
            b = a[1];
            a[1] = a[4];
            a[4] = b;
            b = a[2];
            a[2] = a[8];
            a[8] = b;
            b = a[6];
            a[6] = a[9];
            a[9] = b;
            b = a[3];
            a[3] = a[12];
            a[12] = b;
            b = a[7];
            a[7] = a[13];
            a[13] = b;
            b = a[11];
            a[11] = a[14];
            a[14] = b;
            return this
        },
        flattenToArrayOffset: function(a, b) {
            console.warn("THREE.Matrix3: .flattenToArrayOffset is deprecated - just use .toArray instead.");
            return this.toArray(a, b)
        },
        getPosition: function() {
            var a;
            return function() {
                void 0 === a && (a = new r);
                console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
                return a.setFromMatrixColumn(this, 3)
            }
        }(),
        setPosition: function(a) {
            var b = this.elements;
            b[12] = a.x;
            b[13] = a.y;
            b[14] = a.z;
            return this
        },
        getInverse: function(a, b) {
            var e = this.elements,
                f = a.elements;
            a = f[0];
            var q = f[1],
                c = f[2],
                d = f[3],
                k = f[4],
                g = f[5],
                h = f[6],
                l = f[7],
                m = f[8],
                y = f[9],
                n = f[10],
                w = f[11],
                t = f[12],
                A = f[13],
                r = f[14],
                f = f[15],
                p = y * r * l - A * n * l + A * h * w - g * r * w - y * h * f + g * n * f,
                v = t * n * l - m * r * l - t * h * w + k * r * w + m * h * f - k * n * f,
                u = m * A * l - t * y * l + t * g * w - k * A * w - m * g * f + k * y * f,
                E = t * y * h - m * A * h - t * g * n + k * A * n + m * g * r - k * y * r,
                O = a * p + q * v + c * u + d * E;
            if (0 === O) {
                if (!0 === b) throw Error("THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0");
                console.warn("THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0");
                return this.identity()
            }
            b = 1 / O;
            e[0] = p * b;
            e[1] = (A * n * d - y * r * d - A * c * w + q * r * w + y * c * f - q * n * f) * b;
            e[2] = (g * r * d - A * h * d + A * c * l - q * r * l - g * c * f + q * h * f) * b;
            e[3] = (y * h * d - g * n * d - y * c * l + q * n * l + g * c * w - q * h * w) * b;
            e[4] = v * b;
            e[5] = (m * r * d - t * n * d + t * c * w - a * r * w - m * c * f + a * n * f) * b;
            e[6] = (t * h * d - k * r * d - t * c * l + a * r * l + k * c * f - a * h * f) * b;
            e[7] = (k * n * d - m * h * d + m * c * l - a * n * l - k * c * w + a * h * w) * b;
            e[8] = u * b;
            e[9] = (t * y * d - m * A * d - t * q * w + a * A * w + m * q * f - a * y * f) * b;
            e[10] = (k * A * d - t * g * d + t * q * l - a * A * l - k * q * f + a * g * f) * b;
            e[11] =
                (m * g * d - k * y * d - m * q * l + a * y * l + k * q * w - a * g * w) * b;
            e[12] = E * b;
            e[13] = (m * A * c - t * y * c + t * q * n - a * A * n - m * q * r + a * y * r) * b;
            e[14] = (t * g * c - k * A * c - t * q * h + a * A * h + k * q * r - a * g * r) * b;
            e[15] = (k * y * c - m * g * c + m * q * h - a * y * h - k * q * n + a * g * n) * b;
            return this
        },
        scale: function(a) {
            var b = this.elements,
                e = a.x,
                f = a.y;
            a = a.z;
            b[0] *= e;
            b[4] *= f;
            b[8] *= a;
            b[1] *= e;
            b[5] *= f;
            b[9] *= a;
            b[2] *= e;
            b[6] *= f;
            b[10] *= a;
            b[3] *= e;
            b[7] *= f;
            b[11] *= a;
            return this
        },
        getMaxScaleOnAxis: function() {
            var a = this.elements;
            return Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1] + a[2] * a[2], a[4] * a[4] + a[5] * a[5] + a[6] * a[6],
                a[8] * a[8] + a[9] * a[9] + a[10] * a[10]))
        },
        makeTranslation: function(a, b, e) {
            this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, e, 0, 0, 0, 1);
            return this
        },
        makeRotationX: function(a) {
            var b = Math.cos(a);
            a = Math.sin(a);
            this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
            return this
        },
        makeRotationY: function(a) {
            var b = Math.cos(a);
            a = Math.sin(a);
            this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
            return this
        },
        makeRotationZ: function(a) {
            var b = Math.cos(a);
            a = Math.sin(a);
            this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            return this
        },
        makeRotationAxis: function(a, b) {
            var e =
                Math.cos(b);
            b = Math.sin(b);
            var f = 1 - e,
                q = a.x,
                c = a.y;
            a = a.z;
            var d = f * q,
                k = f * c;
            this.set(d * q + e, d * c - b * a, d * a + b * c, 0, d * c + b * a, k * c + e, k * a - b * q, 0, d * a - b * c, k * a + b * q, f * a * a + e, 0, 0, 0, 0, 1);
            return this
        },
        makeScale: function(a, b, e) {
            this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, e, 0, 0, 0, 0, 1);
            return this
        },
        compose: function(a, b, e) {
            this.makeRotationFromQuaternion(b);
            this.scale(e);
            this.setPosition(a);
            return this
        },
        decompose: function() {
            var a, b;
            return function(e, f, q) {
                void 0 === a && (a = new r, b = new z);
                var c = this.elements,
                    d = a.set(c[0], c[1], c[2]).length(),
                    k = a.set(c[4],
                        c[5], c[6]).length(),
                    g = a.set(c[8], c[9], c[10]).length();
                0 > this.determinant() && (d = -d);
                e.x = c[12];
                e.y = c[13];
                e.z = c[14];
                b.elements.set(this.elements);
                e = 1 / d;
                var c = 1 / k,
                    h = 1 / g;
                b.elements[0] *= e;
                b.elements[1] *= e;
                b.elements[2] *= e;
                b.elements[4] *= c;
                b.elements[5] *= c;
                b.elements[6] *= c;
                b.elements[8] *= h;
                b.elements[9] *= h;
                b.elements[10] *= h;
                f.setFromRotationMatrix(b);
                q.x = d;
                q.y = k;
                q.z = g;
                return this
            }
        }(),
        makeFrustum: function(a, b, e, f, q, c) {
            var d = this.elements;
            d[0] = 2 * q / (b - a);
            d[4] = 0;
            d[8] = (b + a) / (b - a);
            d[12] = 0;
            d[1] = 0;
            d[5] = 2 * q / (f - e);
            d[9] = (f + e) / (f - e);
            d[13] = 0;
            d[2] = 0;
            d[6] = 0;
            d[10] = -(c + q) / (c - q);
            d[14] = -2 * c * q / (c - q);
            d[3] = 0;
            d[7] = 0;
            d[11] = -1;
            d[15] = 0;
            return this
        },
        makePerspective: function(a, b, e, f) {
            a = e * Math.tan(d.Math.DEG2RAD * a * .5);
            var q = -a;
            return this.makeFrustum(q * b, a * b, q, a, e, f)
        },
        makeOrthographic: function(a, b, e, f, q, c) {
            var d = this.elements,
                k = 1 / (b - a),
                g = 1 / (e - f),
                h = 1 / (c - q);
            d[0] = 2 * k;
            d[4] = 0;
            d[8] = 0;
            d[12] = -((b + a) * k);
            d[1] = 0;
            d[5] = 2 * g;
            d[9] = 0;
            d[13] = -((e + f) * g);
            d[2] = 0;
            d[6] = 0;
            d[10] = -2 * h;
            d[14] = -((c + q) * h);
            d[3] = 0;
            d[7] = 0;
            d[11] = 0;
            d[15] = 1;
            return this
        },
        equals: function(a) {
            var b =
                this.elements;
            a = a.elements;
            for (var e = 0; 16 > e; e++)
                if (b[e] !== a[e]) return !1;
            return !0
        },
        fromArray: function(a) {
            this.elements.set(a);
            return this
        },
        toArray: function(a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            var e = this.elements;
            a[b] = e[0];
            a[b + 1] = e[1];
            a[b + 2] = e[2];
            a[b + 3] = e[3];
            a[b + 4] = e[4];
            a[b + 5] = e[5];
            a[b + 6] = e[6];
            a[b + 7] = e[7];
            a[b + 8] = e[8];
            a[b + 9] = e[9];
            a[b + 10] = e[10];
            a[b + 11] = e[11];
            a[b + 12] = e[12];
            a[b + 13] = e[13];
            a[b + 14] = e[14];
            a[b + 15] = e[15];
            return a
        }
    };
    x.prototype = {
        constructor: x,
        get x() {
            return this._x
        },
        set x(a) {
            this._x = a;
            this.onChangeCallback()
        },
        get y() {
            return this._y
        },
        set y(a) {
            this._y = a;
            this.onChangeCallback()
        },
        get z() {
            return this._z
        },
        set z(a) {
            this._z = a;
            this.onChangeCallback()
        },
        get w() {
            return this._w
        },
        set w(a) {
            this._w = a;
            this.onChangeCallback()
        },
        set: function(a, b, e, f) {
            this._x = a;
            this._y = b;
            this._z = e;
            this._w = f;
            this.onChangeCallback();
            return this
        },
        clone: function() {
            return new this.constructor(this._x, this._y, this._z, this._w)
        },
        copy: function(a) {
            this._x = a.x;
            this._y = a.y;
            this._z = a.z;
            this._w = a.w;
            this.onChangeCallback();
            return this
        },
        setFromEuler: function(a,
            b) {
            if (!1 === (a && a.isEuler)) throw Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
            var e = Math.cos(a._x / 2),
                f = Math.cos(a._y / 2),
                q = Math.cos(a._z / 2),
                c = Math.sin(a._x / 2),
                d = Math.sin(a._y / 2),
                k = Math.sin(a._z / 2);
            a = a.order;
            "XYZ" === a ? (this._x = c * f * q + e * d * k, this._y = e * d * q - c * f * k, this._z = e * f * k + c * d * q, this._w = e * f * q - c * d * k) : "YXZ" === a ? (this._x = c * f * q + e * d * k, this._y = e * d * q - c * f * k, this._z = e * f * k - c * d * q, this._w = e * f * q + c * d * k) : "ZXY" === a ? (this._x = c * f * q - e * d * k, this._y = e * d * q + c * f * k, this._z =
                e * f * k + c * d * q, this._w = e * f * q - c * d * k) : "ZYX" === a ? (this._x = c * f * q - e * d * k, this._y = e * d * q + c * f * k, this._z = e * f * k - c * d * q, this._w = e * f * q + c * d * k) : "YZX" === a ? (this._x = c * f * q + e * d * k, this._y = e * d * q + c * f * k, this._z = e * f * k - c * d * q, this._w = e * f * q - c * d * k) : "XZY" === a && (this._x = c * f * q - e * d * k, this._y = e * d * q - c * f * k, this._z = e * f * k + c * d * q, this._w = e * f * q + c * d * k);
            if (!1 !== b) this.onChangeCallback();
            return this
        },
        setFromAxisAngle: function(a, b) {
            b /= 2;
            var e = Math.sin(b);
            this._x = a.x * e;
            this._y = a.y * e;
            this._z = a.z * e;
            this._w = Math.cos(b);
            this.onChangeCallback();
            return this
        },
        setFromRotationMatrix: function(a) {
            var b = a.elements,
                e = b[0];
            a = b[4];
            var f = b[8],
                q = b[1],
                c = b[5],
                d = b[9],
                k = b[2],
                g = b[6],
                b = b[10],
                h = e + c + b;
            0 < h ? (e = .5 / Math.sqrt(h + 1), this._w = .25 / e, this._x = (g - d) * e, this._y = (f - k) * e, this._z = (q - a) * e) : e > c && e > b ? (e = 2 * Math.sqrt(1 + e - c - b), this._w = (g - d) / e, this._x = .25 * e, this._y = (a + q) / e, this._z = (f + k) / e) : c > b ? (e = 2 * Math.sqrt(1 + c - e - b), this._w = (f - k) / e, this._x = (a + q) / e, this._y = .25 * e, this._z = (d + g) / e) : (e = 2 * Math.sqrt(1 + b - e - c), this._w = (q - a) / e, this._x = (f + k) / e, this._y = (d + g) / e, this._z = .25 * e);
            this.onChangeCallback();
            return this
        },
        setFromUnitVectors: function() {
            var a, b;
            return function(e, f) {
                void 0 === a && (a = new r);
                b = e.dot(f) + 1;
                1E-6 > b ? (b = 0, Math.abs(e.x) > Math.abs(e.z) ? a.set(-e.y, e.x, 0) : a.set(0, -e.z, e.y)) : a.crossVectors(e, f);
                this._x = a.x;
                this._y = a.y;
                this._z = a.z;
                this._w = b;
                return this.normalize()
            }
        }(),
        inverse: function() {
            return this.conjugate().normalize()
        },
        conjugate: function() {
            this._x *= -1;
            this._y *= -1;
            this._z *= -1;
            this.onChangeCallback();
            return this
        },
        dot: function(a) {
            return this._x * a._x + this._y * a._y + this._z * a._z + this._w * a._w
        },
        lengthSq: function() {
            return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
        },
        length: function() {
            return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
        },
        normalize: function() {
            var a = this.length();
            0 === a ? (this._z = this._y = this._x = 0, this._w = 1) : (a = 1 / a, this._x *= a, this._y *= a, this._z *= a, this._w *= a);
            this.onChangeCallback();
            return this
        },
        multiply: function(a, b) {
            return void 0 !== b ? (console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),
                this.multiplyQuaternions(a, b)) : this.multiplyQuaternions(this, a)
        },
        premultiply: function(a) {
            return this.multiplyQuaternions(a, this)
        },
        multiplyQuaternions: function(a, b) {
            var e = a._x,
                f = a._y,
                q = a._z;
            a = a._w;
            var c = b._x,
                d = b._y,
                k = b._z;
            b = b._w;
            this._x = e * b + a * c + f * k - q * d;
            this._y = f * b + a * d + q * c - e * k;
            this._z = q * b + a * k + e * d - f * c;
            this._w = a * b - e * c - f * d - q * k;
            this.onChangeCallback();
            return this
        },
        slerp: function(a, b) {
            if (0 === b) return this;
            if (1 === b) return this.copy(a);
            var e = this._x,
                f = this._y,
                q = this._z,
                c = this._w,
                d = c * a._w + e * a._x + f * a._y + q * a._z;
            0 > d ? (this._w = -a._w, this._x = -a._x, this._y = -a._y, this._z = -a._z, d = -d) : this.copy(a);
            if (1 <= d) return this._w = c, this._x = e, this._y = f, this._z = q, this;
            a = Math.sqrt(1 - d * d);
            if (.001 > Math.abs(a)) return this._w = .5 * (c + this._w), this._x = .5 * (e + this._x), this._y = .5 * (f + this._y), this._z = .5 * (q + this._z), this;
            var k = Math.atan2(a, d),
                d = Math.sin((1 - b) * k) / a;
            b = Math.sin(b * k) / a;
            this._w = c * d + this._w * b;
            this._x = e * d + this._x * b;
            this._y = f * d + this._y * b;
            this._z = q * d + this._z * b;
            this.onChangeCallback();
            return this
        },
        equals: function(a) {
            return a._x ===
                this._x && a._y === this._y && a._z === this._z && a._w === this._w
        },
        fromArray: function(a, b) {
            void 0 === b && (b = 0);
            this._x = a[b];
            this._y = a[b + 1];
            this._z = a[b + 2];
            this._w = a[b + 3];
            this.onChangeCallback();
            return this
        },
        toArray: function(a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            a[b] = this._x;
            a[b + 1] = this._y;
            a[b + 2] = this._z;
            a[b + 3] = this._w;
            return a
        },
        onChange: function(a) {
            this.onChangeCallback = a;
            return this
        },
        onChangeCallback: function() {}
    };
    Object.assign(x, {
        slerp: function(a, b, e, f) {
            return e.copy(a).slerp(b, f)
        },
        slerpFlat: function(a,
            b, e, f, q, c, d) {
            var k = e[f + 0],
                g = e[f + 1],
                h = e[f + 2];
            e = e[f + 3];
            f = q[c + 0];
            var l = q[c + 1],
                m = q[c + 2];
            q = q[c + 3];
            if (e !== q || k !== f || g !== l || h !== m) {
                c = 1 - d;
                var y = k * f + g * l + h * m + e * q,
                    n = 0 <= y ? 1 : -1,
                    w = 1 - y * y;
                w > Number.EPSILON && (w = Math.sqrt(w), y = Math.atan2(w, y * n), c = Math.sin(c * y) / w, d = Math.sin(d * y) / w);
                n *= d;
                k = k * c + f * n;
                g = g * c + l * n;
                h = h * c + m * n;
                e = e * c + q * n;
                c === 1 - d && (d = 1 / Math.sqrt(k * k + g * g + h * h + e * e), k *= d, g *= d, h *= d, e *= d)
            }
            a[b] = k;
            a[b + 1] = g;
            a[b + 2] = h;
            a[b + 3] = e
        }
    });
    r.prototype = {
        constructor: r,
        isVector3: !0,
        set: function(a, b, e) {
            this.x = a;
            this.y = b;
            this.z = e;
            return this
        },
        setScalar: function(a) {
            this.z = this.y = this.x = a;
            return this
        },
        setX: function(a) {
            this.x = a;
            return this
        },
        setY: function(a) {
            this.y = a;
            return this
        },
        setZ: function(a) {
            this.z = a;
            return this
        },
        setComponent: function(a, b) {
            switch (a) {
                case 0:
                    this.x = b;
                    break;
                case 1:
                    this.y = b;
                    break;
                case 2:
                    this.z = b;
                    break;
                default:
                    throw Error("index is out of range: " + a);
            }
        },
        getComponent: function(a) {
            switch (a) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                default:
                    throw Error("index is out of range: " + a);
            }
        },
        clone: function() {
            return new this.constructor(this.x,
                this.y, this.z)
        },
        copy: function(a) {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
            return this
        },
        add: function(a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b);
            this.x += a.x;
            this.y += a.y;
            this.z += a.z;
            return this
        },
        addScalar: function(a) {
            this.x += a;
            this.y += a;
            this.z += a;
            return this
        },
        addVectors: function(a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            this.z = a.z + b.z;
            return this
        },
        addScaledVector: function(a, b) {
            this.x += a.x * b;
            this.y += a.y * b;
            this.z +=
                a.z * b;
            return this
        },
        sub: function(a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b);
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
            return this
        },
        subScalar: function(a) {
            this.x -= a;
            this.y -= a;
            this.z -= a;
            return this
        },
        subVectors: function(a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z = a.z - b.z;
            return this
        },
        multiply: function(a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),
                this.multiplyVectors(a, b);
            this.x *= a.x;
            this.y *= a.y;
            this.z *= a.z;
            return this
        },
        multiplyScalar: function(a) {
            isFinite(a) ? (this.x *= a, this.y *= a, this.z *= a) : this.z = this.y = this.x = 0;
            return this
        },
        multiplyVectors: function(a, b) {
            this.x = a.x * b.x;
            this.y = a.y * b.y;
            this.z = a.z * b.z;
            return this
        },
        applyEuler: function() {
            var a;
            return function(b) {
                !1 === (b && b.isEuler) && console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.");
                void 0 === a && (a = new x);
                return this.applyQuaternion(a.setFromEuler(b))
            }
        }(),
        applyAxisAngle: function() {
            var a;
            return function(b, e) {
                void 0 === a && (a = new x);
                return this.applyQuaternion(a.setFromAxisAngle(b, e))
            }
        }(),
        applyMatrix3: function(a) {
            var b = this.x,
                e = this.y,
                f = this.z;
            a = a.elements;
            this.x = a[0] * b + a[3] * e + a[6] * f;
            this.y = a[1] * b + a[4] * e + a[7] * f;
            this.z = a[2] * b + a[5] * e + a[8] * f;
            return this
        },
        applyMatrix4: function(a) {
            var b = this.x,
                e = this.y,
                f = this.z;
            a = a.elements;
            this.x = a[0] * b + a[4] * e + a[8] * f + a[12];
            this.y = a[1] * b + a[5] * e + a[9] * f + a[13];
            this.z = a[2] * b + a[6] * e + a[10] * f + a[14];
            return this
        },
        applyProjection: function(a) {
            var b =
                this.x,
                e = this.y,
                f = this.z;
            a = a.elements;
            var q = 1 / (a[3] * b + a[7] * e + a[11] * f + a[15]);
            this.x = (a[0] * b + a[4] * e + a[8] * f + a[12]) * q;
            this.y = (a[1] * b + a[5] * e + a[9] * f + a[13]) * q;
            this.z = (a[2] * b + a[6] * e + a[10] * f + a[14]) * q;
            return this
        },
        applyQuaternion: function(a) {
            var b = this.x,
                e = this.y,
                f = this.z,
                q = a.x,
                c = a.y,
                d = a.z;
            a = a.w;
            var k = a * b + c * f - d * e,
                g = a * e + d * b - q * f,
                h = a * f + q * e - c * b,
                b = -q * b - c * e - d * f;
            this.x = k * a + b * -q + g * -d - h * -c;
            this.y = g * a + b * -c + h * -q - k * -d;
            this.z = h * a + b * -d + k * -c - g * -q;
            return this
        },
        project: function() {
            var a;
            return function(b) {
                void 0 === a && (a = new z);
                a.multiplyMatrices(b.projectionMatrix, a.getInverse(b.matrixWorld));
                return this.applyProjection(a)
            }
        }(),
        unproject: function() {
            var a;
            return function(b) {
                void 0 === a && (a = new z);
                a.multiplyMatrices(b.matrixWorld, a.getInverse(b.projectionMatrix));
                return this.applyProjection(a)
            }
        }(),
        transformDirection: function(a) {
            var b = this.x,
                e = this.y,
                f = this.z;
            a = a.elements;
            this.x = a[0] * b + a[4] * e + a[8] * f;
            this.y = a[1] * b + a[5] * e + a[9] * f;
            this.z = a[2] * b + a[6] * e + a[10] * f;
            return this.normalize()
        },
        divide: function(a) {
            this.x /= a.x;
            this.y /= a.y;
            this.z /=
                a.z;
            return this
        },
        divideScalar: function(a) {
            return this.multiplyScalar(1 / a)
        },
        min: function(a) {
            this.x = Math.min(this.x, a.x);
            this.y = Math.min(this.y, a.y);
            this.z = Math.min(this.z, a.z);
            return this
        },
        max: function(a) {
            this.x = Math.max(this.x, a.x);
            this.y = Math.max(this.y, a.y);
            this.z = Math.max(this.z, a.z);
            return this
        },
        clamp: function(a, b) {
            this.x = Math.max(a.x, Math.min(b.x, this.x));
            this.y = Math.max(a.y, Math.min(b.y, this.y));
            this.z = Math.max(a.z, Math.min(b.z, this.z));
            return this
        },
        clampScalar: function() {
            var a, b;
            return function(e,
                f) {
                void 0 === a && (a = new r, b = new r);
                a.set(e, e, e);
                b.set(f, f, f);
                return this.clamp(a, b)
            }
        }(),
        clampLength: function(a, b) {
            var e = this.length();
            return this.multiplyScalar(Math.max(a, Math.min(b, e)) / e)
        },
        floor: function() {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            this.z = Math.floor(this.z);
            return this
        },
        ceil: function() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            this.z = Math.ceil(this.z);
            return this
        },
        round: function() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.z = Math.round(this.z);
            return this
        },
        roundToZero: function() {
            this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
            this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z);
            return this
        },
        negate: function() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            return this
        },
        dot: function(a) {
            return this.x * a.x + this.y * a.y + this.z * a.z
        },
        lengthSq: function() {
            return this.x * this.x + this.y * this.y + this.z * this.z
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        },
        lengthManhattan: function() {
            return Math.abs(this.x) +
                Math.abs(this.y) + Math.abs(this.z)
        },
        normalize: function() {
            return this.divideScalar(this.length())
        },
        setLength: function(a) {
            return this.multiplyScalar(a / this.length())
        },
        lerp: function(a, b) {
            this.x += (a.x - this.x) * b;
            this.y += (a.y - this.y) * b;
            this.z += (a.z - this.z) * b;
            return this
        },
        lerpVectors: function(a, b, e) {
            return this.subVectors(b, a).multiplyScalar(e).add(a)
        },
        cross: function(a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(a,
                b);
            b = this.x;
            var e = this.y,
                f = this.z;
            this.x = e * a.z - f * a.y;
            this.y = f * a.x - b * a.z;
            this.z = b * a.y - e * a.x;
            return this
        },
        crossVectors: function(a, b) {
            var e = a.x,
                f = a.y;
            a = a.z;
            var c = b.x,
                d = b.y;
            b = b.z;
            this.x = f * b - a * d;
            this.y = a * c - e * b;
            this.z = e * d - f * c;
            return this
        },
        projectOnVector: function(a) {
            var b = a.dot(this) / a.lengthSq();
            return this.copy(a).multiplyScalar(b)
        },
        projectOnPlane: function() {
            var a;
            return function(b) {
                void 0 === a && (a = new r);
                a.copy(this).projectOnVector(b);
                return this.sub(a)
            }
        }(),
        reflect: function() {
            var a;
            return function(b) {
                void 0 ===
                    a && (a = new r);
                return this.sub(a.copy(b).multiplyScalar(2 * this.dot(b)))
            }
        }(),
        angleTo: function(a) {
            a = this.dot(a) / Math.sqrt(this.lengthSq() * a.lengthSq());
            return Math.acos(d.Math.clamp(a, -1, 1))
        },
        distanceTo: function(a) {
            return Math.sqrt(this.distanceToSquared(a))
        },
        distanceToSquared: function(a) {
            var b = this.x - a.x,
                e = this.y - a.y;
            a = this.z - a.z;
            return b * b + e * e + a * a
        },
        distanceToManhattan: function(a) {
            return Math.abs(this.x - a.x) + Math.abs(this.y - a.y) + Math.abs(this.z - a.z)
        },
        setFromSpherical: function(a) {
            var b = Math.sin(a.phi) *
                a.radius;
            this.x = b * Math.sin(a.theta);
            this.y = Math.cos(a.phi) * a.radius;
            this.z = b * Math.cos(a.theta);
            return this
        },
        setFromMatrixPosition: function(a) {
            return this.setFromMatrixColumn(a, 3)
        },
        setFromMatrixScale: function(a) {
            var b = this.setFromMatrixColumn(a, 0).length(),
                e = this.setFromMatrixColumn(a, 1).length();
            a = this.setFromMatrixColumn(a, 2).length();
            this.x = b;
            this.y = e;
            this.z = a;
            return this
        },
        setFromMatrixColumn: function(a, b) {
            if ("number" === typeof a) {
                console.warn("THREE.Vector3: setFromMatrixColumn now expects ( matrix, index ).");
                var e = a;
                a = b;
                b = e
            }
            return this.fromArray(a.elements, 4 * b)
        },
        equals: function(a) {
            return a.x === this.x && a.y === this.y && a.z === this.z
        },
        fromArray: function(a, b) {
            void 0 === b && (b = 0);
            this.x = a[b];
            this.y = a[b + 1];
            this.z = a[b + 2];
            return this
        },
        toArray: function(a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            a[b] = this.x;
            a[b + 1] = this.y;
            a[b + 2] = this.z;
            return a
        },
        fromAttribute: function(a, b, e) {
            void 0 === e && (e = 0);
            b = b * a.itemSize + e;
            this.x = a.array[b];
            this.y = a.array[b + 1];
            this.z = a.array[b + 2];
            return this
        }
    };
    R.prototype = {
        constructor: R,
        set: function(a,
            b) {
            this.min.copy(a);
            this.max.copy(b);
            return this
        },
        setFromPoints: function(a) {
            this.makeEmpty();
            for (var b = 0, e = a.length; b < e; b++) this.expandByPoint(a[b]);
            return this
        },
        setFromCenterAndSize: function() {
            var a = new v;
            return function(b, e) {
                e = a.copy(e).multiplyScalar(.5);
                this.min.copy(b).sub(e);
                this.max.copy(b).add(e);
                return this
            }
        }(),
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            this.min.copy(a.min);
            this.max.copy(a.max);
            return this
        },
        makeEmpty: function() {
            this.min.x = this.min.y = Infinity;
            this.max.x = this.max.y = -Infinity;
            return this
        },
        isEmpty: function() {
            return this.max.x < this.min.x || this.max.y < this.min.y
        },
        center: function(a) {
            return (a || new v).addVectors(this.min, this.max).multiplyScalar(.5)
        },
        size: function(a) {
            return (a || new v).subVectors(this.max, this.min)
        },
        expandByPoint: function(a) {
            this.min.min(a);
            this.max.max(a);
            return this
        },
        expandByVector: function(a) {
            this.min.sub(a);
            this.max.add(a);
            return this
        },
        expandByScalar: function(a) {
            this.min.addScalar(-a);
            this.max.addScalar(a);
            return this
        },
        containsPoint: function(a) {
            return a.x <
                this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y ? !1 : !0
        },
        containsBox: function(a) {
            return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y ? !0 : !1
        },
        getParameter: function(a, b) {
            return (b || new v).set((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y))
        },
        intersectsBox: function(a) {
            return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y ? !1 : !0
        },
        clampPoint: function(a, b) {
            return (b || new v).copy(a).clamp(this.min,
                this.max)
        },
        distanceToPoint: function() {
            var a = new v;
            return function(b) {
                return a.copy(b).clamp(this.min, this.max).sub(b).length()
            }
        }(),
        intersect: function(a) {
            this.min.max(a.min);
            this.max.min(a.max);
            return this
        },
        union: function(a) {
            this.min.min(a.min);
            this.max.max(a.max);
            return this
        },
        translate: function(a) {
            this.min.add(a);
            this.max.add(a);
            return this
        },
        equals: function(a) {
            return a.min.equals(this.min) && a.max.equals(this.max)
        }
    };
    aa.prototype = Object.create(u.prototype);
    aa.prototype.constructor = aa;
    aa.prototype.isCubeTexture = !0;
    Object.defineProperty(aa.prototype, "images", {
        get: function() {
            return this.image
        },
        set: function(a) {
            this.image = a
        }
    });
    var ye = new u,
        ze = new aa,
        we = [],
        xe = [];
    fa.prototype.setValue = function(a, b) {
        for (var e = this.seq, f = 0, c = e.length; f !== c; ++f) {
            var d = e[f];
            d.setValue(a, b[d.id])
        }
    };
    var ae = /([\w\d_]+)(\])?(\[|\.)?/g;
    Ka.prototype.setValue = function(a, b, e) {
        b = this.map[b];
        void 0 !== b && b.setValue(a, e, this.renderer)
    };
    Ka.prototype.set = function(a, b, e) {
        var f = this.map[e];
        void 0 !== f && f.setValue(a, b[e], this.renderer)
    };
    Ka.prototype.setOptional =
        function(a, b, e) {
            b = b[e];
            void 0 !== b && this.setValue(a, e, b)
        };
    Ka.upload = function(a, b, e, f) {
        for (var c = 0, d = b.length; c !== d; ++c) {
            var k = b[c],
                g = e[k.id];
            !1 !== g.needsUpdate && k.setValue(a, g.value, f)
        }
    };
    Ka.seqWithValue = function(a, b) {
        for (var e = [], f = 0, c = a.length; f !== c; ++f) {
            var d = a[f];
            d.id in b && e.push(d)
        }
        return e
    };
    Ka.splitDynamic = function(a, b) {
        for (var e = null, f = a.length, c = 0, d = 0; d !== f; ++d) {
            var k = a[d],
                g = b[k.id];
            g && !0 === g.dynamic ? (null === e && (e = []), e.push(k)) : (c < d && (a[c] = k), ++c)
        }
        c < f && (a.length = c);
        return e
    };
    Ka.evalDynamic =
        function(a, b, e, f) {
            for (var c = 0, d = a.length; c !== d; ++c) {
                var k = b[a[c].id],
                    g = k.onUpdateCallback;
                void 0 !== g && g.call(k, e, f)
            }
        };
    na.prototype = {
        constructor: na,
        isVector4: !0,
        set: function(a, b, e, f) {
            this.x = a;
            this.y = b;
            this.z = e;
            this.w = f;
            return this
        },
        setScalar: function(a) {
            this.w = this.z = this.y = this.x = a;
            return this
        },
        setX: function(a) {
            this.x = a;
            return this
        },
        setY: function(a) {
            this.y = a;
            return this
        },
        setZ: function(a) {
            this.z = a;
            return this
        },
        setW: function(a) {
            this.w = a;
            return this
        },
        setComponent: function(a, b) {
            switch (a) {
                case 0:
                    this.x =
                        b;
                    break;
                case 1:
                    this.y = b;
                    break;
                case 2:
                    this.z = b;
                    break;
                case 3:
                    this.w = b;
                    break;
                default:
                    throw Error("index is out of range: " + a);
            }
        },
        getComponent: function(a) {
            switch (a) {
                case 0:
                    return this.x;
                case 1:
                    return this.y;
                case 2:
                    return this.z;
                case 3:
                    return this.w;
                default:
                    throw Error("index is out of range: " + a);
            }
        },
        clone: function() {
            return new this.constructor(this.x, this.y, this.z, this.w)
        },
        copy: function(a) {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
            this.w = void 0 !== a.w ? a.w : 1;
            return this
        },
        add: function(a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
                this.addVectors(a, b);
            this.x += a.x;
            this.y += a.y;
            this.z += a.z;
            this.w += a.w;
            return this
        },
        addScalar: function(a) {
            this.x += a;
            this.y += a;
            this.z += a;
            this.w += a;
            return this
        },
        addVectors: function(a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            this.z = a.z + b.z;
            this.w = a.w + b.w;
            return this
        },
        addScaledVector: function(a, b) {
            this.x += a.x * b;
            this.y += a.y * b;
            this.z += a.z * b;
            this.w += a.w * b;
            return this
        },
        sub: function(a, b) {
            if (void 0 !== b) return console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a,
                b);
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
            this.w -= a.w;
            return this
        },
        subScalar: function(a) {
            this.x -= a;
            this.y -= a;
            this.z -= a;
            this.w -= a;
            return this
        },
        subVectors: function(a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z = a.z - b.z;
            this.w = a.w - b.w;
            return this
        },
        multiplyScalar: function(a) {
            isFinite(a) ? (this.x *= a, this.y *= a, this.z *= a, this.w *= a) : this.w = this.z = this.y = this.x = 0;
            return this
        },
        applyMatrix4: function(a) {
            var b = this.x,
                e = this.y,
                f = this.z,
                c = this.w;
            a = a.elements;
            this.x = a[0] * b + a[4] * e + a[8] * f + a[12] * c;
            this.y = a[1] * b + a[5] * e + a[9] *
                f + a[13] * c;
            this.z = a[2] * b + a[6] * e + a[10] * f + a[14] * c;
            this.w = a[3] * b + a[7] * e + a[11] * f + a[15] * c;
            return this
        },
        divideScalar: function(a) {
            return this.multiplyScalar(1 / a)
        },
        setAxisAngleFromQuaternion: function(a) {
            this.w = 2 * Math.acos(a.w);
            var b = Math.sqrt(1 - a.w * a.w);
            1E-4 > b ? (this.x = 1, this.z = this.y = 0) : (this.x = a.x / b, this.y = a.y / b, this.z = a.z / b);
            return this
        },
        setAxisAngleFromRotationMatrix: function(a) {
            var b, e, f;
            a = a.elements;
            var c = a[0];
            f = a[4];
            var d = a[8],
                k = a[1],
                g = a[5],
                h = a[9];
            e = a[2];
            b = a[6];
            var l = a[10];
            if (.01 > Math.abs(f - k) && .01 >
                Math.abs(d - e) && .01 > Math.abs(h - b)) {
                if (.1 > Math.abs(f + k) && .1 > Math.abs(d + e) && .1 > Math.abs(h + b) && .1 > Math.abs(c + g + l - 3)) return this.set(1, 0, 0, 0), this;
                a = Math.PI;
                c = (c + 1) / 2;
                g = (g + 1) / 2;
                l = (l + 1) / 2;
                f = (f + k) / 4;
                d = (d + e) / 4;
                h = (h + b) / 4;
                c > g && c > l ? .01 > c ? (b = 0, f = e = .707106781) : (b = Math.sqrt(c), e = f / b, f = d / b) : g > l ? .01 > g ? (b = .707106781, e = 0, f = .707106781) : (e = Math.sqrt(g), b = f / e, f = h / e) : .01 > l ? (e = b = .707106781, f = 0) : (f = Math.sqrt(l), b = d / f, e = h / f);
                this.set(b, e, f, a);
                return this
            }
            a = Math.sqrt((b - h) * (b - h) + (d - e) * (d - e) + (k - f) * (k - f));.001 > Math.abs(a) &&
                (a = 1);
            this.x = (b - h) / a;
            this.y = (d - e) / a;
            this.z = (k - f) / a;
            this.w = Math.acos((c + g + l - 1) / 2);
            return this
        },
        min: function(a) {
            this.x = Math.min(this.x, a.x);
            this.y = Math.min(this.y, a.y);
            this.z = Math.min(this.z, a.z);
            this.w = Math.min(this.w, a.w);
            return this
        },
        max: function(a) {
            this.x = Math.max(this.x, a.x);
            this.y = Math.max(this.y, a.y);
            this.z = Math.max(this.z, a.z);
            this.w = Math.max(this.w, a.w);
            return this
        },
        clamp: function(a, b) {
            this.x = Math.max(a.x, Math.min(b.x, this.x));
            this.y = Math.max(a.y, Math.min(b.y, this.y));
            this.z = Math.max(a.z, Math.min(b.z,
                this.z));
            this.w = Math.max(a.w, Math.min(b.w, this.w));
            return this
        },
        clampScalar: function() {
            var a, b;
            return function(e, f) {
                void 0 === a && (a = new na, b = new na);
                a.set(e, e, e, e);
                b.set(f, f, f, f);
                return this.clamp(a, b)
            }
        }(),
        floor: function() {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            this.z = Math.floor(this.z);
            this.w = Math.floor(this.w);
            return this
        },
        ceil: function() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            this.z = Math.ceil(this.z);
            this.w = Math.ceil(this.w);
            return this
        },
        round: function() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.z = Math.round(this.z);
            this.w = Math.round(this.w);
            return this
        },
        roundToZero: function() {
            this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x);
            this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y);
            this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z);
            this.w = 0 > this.w ? Math.ceil(this.w) : Math.floor(this.w);
            return this
        },
        negate: function() {
            this.x = -this.x;
            this.y = -this.y;
            this.z = -this.z;
            this.w = -this.w;
            return this
        },
        dot: function(a) {
            return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
        },
        lengthSq: function() {
            return this.x *
                this.x + this.y * this.y + this.z * this.z + this.w * this.w
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
        },
        lengthManhattan: function() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
        },
        normalize: function() {
            return this.divideScalar(this.length())
        },
        setLength: function(a) {
            return this.multiplyScalar(a / this.length())
        },
        lerp: function(a, b) {
            this.x += (a.x - this.x) * b;
            this.y += (a.y - this.y) * b;
            this.z += (a.z - this.z) * b;
            this.w += (a.w - this.w) * b;
            return this
        },
        lerpVectors: function(a,
            b, e) {
            return this.subVectors(b, a).multiplyScalar(e).add(a)
        },
        equals: function(a) {
            return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w
        },
        fromArray: function(a, b) {
            void 0 === b && (b = 0);
            this.x = a[b];
            this.y = a[b + 1];
            this.z = a[b + 2];
            this.w = a[b + 3];
            return this
        },
        toArray: function(a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            a[b] = this.x;
            a[b + 1] = this.y;
            a[b + 2] = this.z;
            a[b + 3] = this.w;
            return a
        },
        fromAttribute: function(a, b, e) {
            void 0 === e && (e = 0);
            b = b * a.itemSize + e;
            this.x = a.array[b];
            this.y = a.array[b + 1];
            this.z = a.array[b + 2];
            this.w =
                a.array[b + 3];
            return this
        }
    };
    Object.assign(P.prototype, p.prototype, {
        isWebGLRenderTarget: !0,
        setSize: function(a, b) {
            if (this.width !== a || this.height !== b) this.width = a, this.height = b, this.dispose();
            this.viewport.set(0, 0, a, b);
            this.scissor.set(0, 0, a, b)
        },
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            this.width = a.width;
            this.height = a.height;
            this.viewport.copy(a.viewport);
            this.texture = a.texture.clone();
            this.depthBuffer = a.depthBuffer;
            this.stencilBuffer = a.stencilBuffer;
            this.depthTexture =
                a.depthTexture;
            return this
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    });
    K.prototype = {
        constructor: K,
        isMaterial: !0,
        get needsUpdate() {
            return this._needsUpdate
        },
        set needsUpdate(a) {
            !0 === a && this.update();
            this._needsUpdate = a
        },
        setValues: function(a) {
            if (void 0 !== a)
                for (var b in a) {
                    var e = a[b];
                    if (void 0 === e) console.warn("THREE.Material: '" + b + "' parameter is undefined.");
                    else {
                        var f = this[b];
                        void 0 === f ? console.warn("THREE." + this.type + ": '" + b + "' is not a property of this material.") : f && f.isColor ? f.set(e) :
                            f && f.isVector3 && e && e.isVector3 ? f.copy(e) : this[b] = "overdraw" === b ? Number(e) : e
                    }
                }
        },
        toJSON: function(a) {
            function b(a) {
                var b = [],
                    e;
                for (e in a) {
                    var f = a[e];
                    delete f.metadata;
                    b.push(f)
                }
                return b
            }
            var e = void 0 === a;
            e && (a = {
                textures: {},
                images: {}
            });
            var f = {
                metadata: {
                    version: 4.4,
                    type: "Material",
                    generator: "Material.toJSON"
                }
            };
            f.uuid = this.uuid;
            f.type = this.type;
            "" !== this.name && (f.name = this.name);
            this.color && this.color.isColor && (f.color = this.color.getHex());
            void 0 !== this.roughness && (f.roughness = this.roughness);
            void 0 !== this.metalness &&
                (f.metalness = this.metalness);
            this.emissive && this.emissive.isColor && (f.emissive = this.emissive.getHex());
            this.specular && this.specular.isColor && (f.specular = this.specular.getHex());
            void 0 !== this.shininess && (f.shininess = this.shininess);
            this.map && this.map.isTexture && (f.map = this.map.toJSON(a).uuid);
            this.alphaMap && this.alphaMap.isTexture && (f.alphaMap = this.alphaMap.toJSON(a).uuid);
            this.lightMap && this.lightMap.isTexture && (f.lightMap = this.lightMap.toJSON(a).uuid);
            this.bumpMap && this.bumpMap.isTexture && (f.bumpMap =
                this.bumpMap.toJSON(a).uuid, f.bumpScale = this.bumpScale);
            this.normalMap && this.normalMap.isTexture && (f.normalMap = this.normalMap.toJSON(a).uuid, f.normalScale = this.normalScale.toArray());
            this.displacementMap && this.displacementMap.isTexture && (f.displacementMap = this.displacementMap.toJSON(a).uuid, f.displacementScale = this.displacementScale, f.displacementBias = this.displacementBias);
            this.roughnessMap && this.roughnessMap.isTexture && (f.roughnessMap = this.roughnessMap.toJSON(a).uuid);
            this.metalnessMap && this.metalnessMap.isTexture &&
                (f.metalnessMap = this.metalnessMap.toJSON(a).uuid);
            this.emissiveMap && this.emissiveMap.isTexture && (f.emissiveMap = this.emissiveMap.toJSON(a).uuid);
            this.specularMap && this.specularMap.isTexture && (f.specularMap = this.specularMap.toJSON(a).uuid);
            this.envMap && this.envMap.isTexture && (f.envMap = this.envMap.toJSON(a).uuid, f.reflectivity = this.reflectivity);
            void 0 !== this.size && (f.size = this.size);
            void 0 !== this.sizeAttenuation && (f.sizeAttenuation = this.sizeAttenuation);
            1 !== this.blending && (f.blending = this.blending);
            2 !== this.shading && (f.shading = this.shading);
            0 !== this.side && (f.side = this.side);
            0 !== this.vertexColors && (f.vertexColors = this.vertexColors);
            1 > this.opacity && (f.opacity = this.opacity);
            !0 === this.transparent && (f.transparent = this.transparent);
            f.depthFunc = this.depthFunc;
            f.depthTest = this.depthTest;
            f.depthWrite = this.depthWrite;
            0 < this.alphaTest && (f.alphaTest = this.alphaTest);
            !0 === this.premultipliedAlpha && (f.premultipliedAlpha = this.premultipliedAlpha);
            !0 === this.wireframe && (f.wireframe = this.wireframe);
            1 < this.wireframeLinewidth &&
                (f.wireframeLinewidth = this.wireframeLinewidth);
            "round" !== this.wireframeLinecap && (f.wireframeLinecap = this.wireframeLinecap);
            "round" !== this.wireframeLinejoin && (f.wireframeLinejoin = this.wireframeLinejoin);
            f.skinning = this.skinning;
            f.morphTargets = this.morphTargets;
            e && (e = b(a.textures), a = b(a.images), 0 < e.length && (f.textures = e), 0 < a.length && (f.images = a));
            return f
        },
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            this.name = a.name;
            this.fog = a.fog;
            this.lights = a.lights;
            this.blending = a.blending;
            this.side = a.side;
            this.shading = a.shading;
            this.vertexColors = a.vertexColors;
            this.opacity = a.opacity;
            this.transparent = a.transparent;
            this.blendSrc = a.blendSrc;
            this.blendDst = a.blendDst;
            this.blendEquation = a.blendEquation;
            this.blendSrcAlpha = a.blendSrcAlpha;
            this.blendDstAlpha = a.blendDstAlpha;
            this.blendEquationAlpha = a.blendEquationAlpha;
            this.depthFunc = a.depthFunc;
            this.depthTest = a.depthTest;
            this.depthWrite = a.depthWrite;
            this.colorWrite = a.colorWrite;
            this.precision = a.precision;
            this.polygonOffset = a.polygonOffset;
            this.polygonOffsetFactor = a.polygonOffsetFactor;
            this.polygonOffsetUnits = a.polygonOffsetUnits;
            this.alphaTest = a.alphaTest;
            this.premultipliedAlpha = a.premultipliedAlpha;
            this.overdraw = a.overdraw;
            this.visible = a.visible;
            this.clipShadows = a.clipShadows;
            a = a.clippingPlanes;
            var b = null;
            if (null !== a)
                for (var e = a.length, b = Array(e), f = 0; f !== e; ++f) b[f] = a[f].clone();
            this.clippingPlanes = b;
            return this
        },
        update: function() {
            this.dispatchEvent({
                type: "update"
            })
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    };
    Object.assign(K.prototype,
        p.prototype);
    var Ae = 0;
    d.UniformsUtils = {
        merge: function(a) {
            for (var b = {}, e = 0; e < a.length; e++) {
                var f = this.clone(a[e]),
                    c;
                for (c in f) b[c] = f[c]
            }
            return b
        },
        clone: function(a) {
            var b = {},
                e;
            for (e in a) {
                b[e] = {};
                for (var f in a[e]) {
                    var c = a[e][f];
                    c && c.isColor || c && c.isVector2 || c && c.isVector3 || c && c.isVector4 || c && c.isMatrix3 || c && c.isMatrix4 || c && c.isTexture ? b[e][f] = c.clone() : Array.isArray(c) ? b[e][f] = c.slice() : b[e][f] = c
                }
            }
            return b
        }
    };
    sa.prototype = Object.create(K.prototype);
    sa.prototype.constructor = sa;
    sa.prototype.isShaderMaterial = !0;
    sa.prototype.copy = function(a) {
        K.prototype.copy.call(this, a);
        this.fragmentShader = a.fragmentShader;
        this.vertexShader = a.vertexShader;
        this.uniforms = d.UniformsUtils.clone(a.uniforms);
        this.defines = a.defines;
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        this.lights = a.lights;
        this.clipping = a.clipping;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        this.morphNormals = a.morphNormals;
        this.extensions = a.extensions;
        return this
    };
    sa.prototype.toJSON = function(a) {
        a = K.prototype.toJSON.call(this,
            a);
        a.uniforms = this.uniforms;
        a.vertexShader = this.vertexShader;
        a.fragmentShader = this.fragmentShader;
        return a
    };
    var va = {
        alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",
        alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n",
        alphatest_fragment: "#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",
        aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n",
        aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
        begin_vertex: "\nvec3 transformed = vec3( position );\n",
        beginnormal_vertex: "\nvec3 objectNormal = vec3( normal );\n",
        bsdfs: "bool testLightInRange( const in float lightDistance, const in float cutoffDistance ) {\n\treturn any( bvec2( cutoffDistance == 0.0, lightDistance < cutoffDistance ) );\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\t\tif( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n#else\n\t\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n\t\t}\n\t\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",
        bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = dFdx( surf_pos );\n\t\tvec3 vSigmaY = dFdy( surf_pos );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n",
        clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tfor ( int i = 0; i < NUM_CLIPPING_PLANES; ++ i ) {\n\t\tvec4 plane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n#endif\n",
        clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",
        clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n",
        clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n",
        color_fragment: "#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",
        color_pars_fragment: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n",
        color_pars_vertex: "#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",
        color_vertex: "#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",
        common: "#define PI 3.14159265359\n#define PI2 6.28318530718\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\n",
        cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ?  0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n",
        defaultnormal_vertex: "#ifdef FLIP_SIDED\n\tobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;\n",
        displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n",
        displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normal * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",
        emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",
        emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n",
        encodings_fragment: "  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",
        encodings_pars_fragment: "\nvec4 LinearToLinear( in vec4 value ) {\n  return value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n  return vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n  return vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n  return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n  return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n  return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n  float maxComponent = max( max( value.r, value.g ), value.b );\n  float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n  return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n  return vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n  float maxRGB = max( value.x, max( value.g, value.b ) );\n  float M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n  M            = ceil( M * 255.0 ) / 255.0;\n  return vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n    return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n    float maxRGB = max( value.x, max( value.g, value.b ) );\n    float D      = max( maxRange / maxRGB, 1.0 );\n    D            = min( floor( D ) / 255.0, 1.0 );\n    return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n  vec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n  Xp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n  vec4 vResult;\n  vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n  float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n  vResult.w = fract(Le);\n  vResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n  return vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n  float Le = value.z * 255.0 + value.w;\n  vec3 Xp_Y_XYZp;\n  Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n  Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n  Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n  vec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n  return vec4( max(vRGB, 0.0), 1.0 );\n}\n",
        envmap_fragment: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\tsampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n\t\tsampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\tvec3 reflectView = flipNormal * normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n",
        envmap_pars_fragment: "#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntenstiy;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n",
        envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n",
        envmap_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n",
        fog_fragment: "#ifdef USE_FOG\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\t#else\n\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\t#endif\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * depth * depth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",
        fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
        lightmap_fragment: "#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",
        lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
        lights_lambert_vertex: "vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n",
        lights_pars: "uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tif ( testLightInRange( lightDistance, pointLight.distance ) ) {\n\t\t\tdirectLight.color = pointLight.color;\n\t\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( all( bvec2( angleCos > spotLight.coneCos, testLightInRange( lightDistance, spotLight.distance ) ) ) ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\t#include <normal_flip>\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = flipNormal * vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = flipNormal * vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar - 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\t#include <normal_flip>\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n\t\t\tsampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = flipNormal * normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n",
        lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",
        lights_phong_pars_fragment: "varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n",
        lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n",
        lights_physical_pars_fragment: "struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",
        lights_template: "\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t \tirradiance += getLightProbeIndirectIrradiance( geometry, 8 );\n\t#endif\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tvec3 radiance = getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), 8 );\n\t#ifndef STANDARD\n\t\tvec3 clearCoatRadiance = getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), 8 );\n\t#else\n\t\tvec3 clearCoatRadiance = vec3( 0.0 );\n\t#endif\n\t\t\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n",
        logdepthbuf_fragment: "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\tgl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n#endif",
        logdepthbuf_pars_fragment: "#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n#endif\n",
        logdepthbuf_pars_vertex: "#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif",
        logdepthbuf_vertex: "#ifdef USE_LOGDEPTHBUF\n\tgl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\t#endif\n#endif\n",
        map_fragment: "#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n",
        map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n",
        map_particle_fragment: "#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",
        map_particle_pars_fragment: "#ifdef USE_MAP\n\tuniform vec4 offsetRepeat;\n\tuniform sampler2D map;\n#endif\n",
        metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.r;\n#endif\n",
        metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
        morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",
        morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",
        morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n",
        normal_flip: "#ifdef DOUBLE_SIDED\n\tfloat flipNormal = ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n#else\n\tfloat flipNormal = 1.0;\n#endif\n",
        normal_fragment: "#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal ) * flipNormal;\n#endif\n#ifdef USE_NORMALMAP\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",
        normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif\n",
        packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n  return normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n  return 1.0 - 2.0 * rgb.xyz;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n  return ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n  return linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n  return (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n  return ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",
        premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",
        project_vertex: "#ifdef USE_SKINNING\n\tvec4 mvPosition = modelViewMatrix * skinned;\n#else\n\tvec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;\n",
        roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.r;\n#endif\n",
        roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
        shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\treturn (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn 1.0;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\tfloat dp = ( length( lightToPosition ) - shadowBias ) / 1000.0;\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n",
        shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n",
        shadowmap_vertex: "#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n",
        shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n",
        skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
        skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureWidth;\n\t\tuniform int boneTextureHeight;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureWidth ) );\n\t\t\tfloat y = floor( j / float( boneTextureWidth ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureWidth );\n\t\t\tfloat dy = 1.0 / float( boneTextureHeight );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",
        skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\tskinned  = bindMatrixInverse * skinned;\n#endif\n",
        skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",
        specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
        specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
        tonemapping_fragment: "#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",
        tonemapping_pars_fragment: "#define saturate(a) clamp( a, 0.0, 1.0 )\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n  return toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n  color *= toneMappingExposure;\n  return saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n  color *= toneMappingExposure;\n  return saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n  color *= toneMappingExposure;\n  color = max( vec3( 0.0 ), color - 0.004 );\n  return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",
        uv_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",
        uv_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform vec4 offsetRepeat;\n#endif\n",
        uv_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
        uv2_pars_fragment: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",
        uv2_pars_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",
        uv2_vertex: "#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",
        worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( PHYSICAL ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\t#ifdef USE_SKINNING\n\t\tvec4 worldPosition = modelMatrix * skinned;\n\t#else\n\t\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n\t#endif\n#endif\n",
        cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n",
        cube_vert: "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
        depth_frag: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n",
        depth_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
        distanceRGBA_frag: "uniform vec3 lightPos;\nvarying vec4 vWorldPosition;\n#include <common>\n#include <packing>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tgl_FragColor = packDepthToRGBA( length( vWorldPosition.xyz - lightPos.xyz ) / 1000.0 );\n}\n",
        distanceRGBA_vert: "varying vec4 vWorldPosition;\n#include <common>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <skinbase_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition;\n}\n",
        equirect_frag: "uniform sampler2D tEquirect;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n",
        equirect_vert: "varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",
        linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
        meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight;\n\treflectedLight.directDiffuse = vec3( 0.0 );\n\treflectedLight.directSpecular = vec3( 0.0 );\n\treflectedLight.indirectDiffuse = diffuseColor.rgb;\n\treflectedLight.indirectSpecular = vec3( 0.0 );\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <normal_flip>\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        meshbasic_vert: "#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n}\n",
        meshlambert_frag: "uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <normal_flip>\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        meshlambert_vert: "#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n}\n",
        meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n}\n",
        meshphysical_frag: "#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nuniform float envMapIntensity;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_flip>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        meshphysical_vert: "#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <displacementmap_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n}\n",
        normal_frag: "uniform float opacity;\nvarying vec3 vNormal;\n#include <common>\n#include <packing>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tgl_FragColor = vec4( packNormalToRGB( vNormal ), opacity );\n\t#include <logdepthbuf_fragment>\n}\n",
        normal_vert: "varying vec3 vNormal;\n#include <common>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvNormal = normalize( normalMatrix * normal );\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",
        points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",
        points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n}\n",
        shadow_frag: "uniform float opacity;\n#include <common>\n#include <packing>\n#include <bsdfs>\n#include <lights_pars>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( 0.0, 0.0, 0.0, opacity * ( 1.0  - getShadowMask() ) );\n}\n",
        shadow_vert: "#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n}\n"
    };
    G.prototype = {
        constructor: G,
        isColor: !0,
        r: 1,
        g: 1,
        b: 1,
        set: function(a) {
            a && a.isColor ? this.copy(a) : "number" === typeof a ? this.setHex(a) : "string" === typeof a && this.setStyle(a);
            return this
        },
        setScalar: function(a) {
            this.b = this.g = this.r = a
        },
        setHex: function(a) {
            a = Math.floor(a);
            this.r = (a >> 16 & 255) / 255;
            this.g = (a >> 8 & 255) / 255;
            this.b = (a & 255) / 255;
            return this
        },
        setRGB: function(a, b, e) {
            this.r = a;
            this.g = b;
            this.b = e;
            return this
        },
        setHSL: function() {
            function a(a, e, f) {
                0 > f && (f += 1);
                1 < f && --f;
                return f < 1 / 6 ? a + 6 * (e - a) * f : .5 > f ? e : f < 2 / 3 ? a + 6 * (e - a) * (2 / 3 - f) : a
            }
            return function(b,
                e, f) {
                b = d.Math.euclideanModulo(b, 1);
                e = d.Math.clamp(e, 0, 1);
                f = d.Math.clamp(f, 0, 1);
                0 === e ? this.r = this.g = this.b = f : (e = .5 >= f ? f * (1 + e) : f + e - f * e, f = 2 * f - e, this.r = a(f, e, b + 1 / 3), this.g = a(f, e, b), this.b = a(f, e, b - 1 / 3));
                return this
            }
        }(),
        setStyle: function(a) {
            function b(b) {
                void 0 !== b && 1 > parseFloat(b) && console.warn("THREE.Color: Alpha component of " + a + " will be ignored.")
            }
            var e;
            if (e = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(a)) {
                var f = e[2];
                switch (e[1]) {
                    case "rgb":
                    case "rgba":
                        if (e = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(f)) return this.r =
                            Math.min(255, parseInt(e[1], 10)) / 255, this.g = Math.min(255, parseInt(e[2], 10)) / 255, this.b = Math.min(255, parseInt(e[3], 10)) / 255, b(e[5]), this;
                        if (e = /^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(f)) return this.r = Math.min(100, parseInt(e[1], 10)) / 100, this.g = Math.min(100, parseInt(e[2], 10)) / 100, this.b = Math.min(100, parseInt(e[3], 10)) / 100, b(e[5]), this;
                        break;
                    case "hsl":
                    case "hsla":
                        if (e = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(f)) {
                            var f = parseFloat(e[1]) /
                                360,
                                c = parseInt(e[2], 10) / 100,
                                k = parseInt(e[3], 10) / 100;
                            b(e[5]);
                            return this.setHSL(f, c, k)
                        }
                }
            } else if (e = /^\#([A-Fa-f0-9]+)$/.exec(a)) {
                e = e[1];
                f = e.length;
                if (3 === f) return this.r = parseInt(e.charAt(0) + e.charAt(0), 16) / 255, this.g = parseInt(e.charAt(1) + e.charAt(1), 16) / 255, this.b = parseInt(e.charAt(2) + e.charAt(2), 16) / 255, this;
                if (6 === f) return this.r = parseInt(e.charAt(0) + e.charAt(1), 16) / 255, this.g = parseInt(e.charAt(2) + e.charAt(3), 16) / 255, this.b = parseInt(e.charAt(4) + e.charAt(5), 16) / 255, this
            }
            a && 0 < a.length && (e = d.ColorKeywords[a],
                void 0 !== e ? this.setHex(e) : console.warn("THREE.Color: Unknown color " + a));
            return this
        },
        clone: function() {
            return new this.constructor(this.r, this.g, this.b)
        },
        copy: function(a) {
            this.r = a.r;
            this.g = a.g;
            this.b = a.b;
            return this
        },
        copyGammaToLinear: function(a, b) {
            void 0 === b && (b = 2);
            this.r = Math.pow(a.r, b);
            this.g = Math.pow(a.g, b);
            this.b = Math.pow(a.b, b);
            return this
        },
        copyLinearToGamma: function(a, b) {
            void 0 === b && (b = 2);
            b = 0 < b ? 1 / b : 1;
            this.r = Math.pow(a.r, b);
            this.g = Math.pow(a.g, b);
            this.b = Math.pow(a.b, b);
            return this
        },
        convertGammaToLinear: function() {
            var a =
                this.r,
                b = this.g,
                e = this.b;
            this.r = a * a;
            this.g = b * b;
            this.b = e * e;
            return this
        },
        convertLinearToGamma: function() {
            this.r = Math.sqrt(this.r);
            this.g = Math.sqrt(this.g);
            this.b = Math.sqrt(this.b);
            return this
        },
        getHex: function() {
            return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
        },
        getHexString: function() {
            return ("000000" + this.getHex().toString(16)).slice(-6)
        },
        getHSL: function(a) {
            a = a || {
                h: 0,
                s: 0,
                l: 0
            };
            var b = this.r,
                e = this.g,
                f = this.b,
                c = Math.max(b, e, f),
                d = Math.min(b, e, f),
                k, g = (d + c) / 2;
            if (d === c) d = k = 0;
            else {
                var h = c - d,
                    d = .5 >= g ? h / (c + d) :
                    h / (2 - c - d);
                switch (c) {
                    case b:
                        k = (e - f) / h + (e < f ? 6 : 0);
                        break;
                    case e:
                        k = (f - b) / h + 2;
                        break;
                    case f:
                        k = (b - e) / h + 4
                }
                k /= 6
            }
            a.h = k;
            a.s = d;
            a.l = g;
            return a
        },
        getStyle: function() {
            return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
        },
        offsetHSL: function(a, b, e) {
            var f = this.getHSL();
            f.h += a;
            f.s += b;
            f.l += e;
            this.setHSL(f.h, f.s, f.l);
            return this
        },
        add: function(a) {
            this.r += a.r;
            this.g += a.g;
            this.b += a.b;
            return this
        },
        addColors: function(a, b) {
            this.r = a.r + b.r;
            this.g = a.g + b.g;
            this.b = a.b + b.b;
            return this
        },
        addScalar: function(a) {
            this.r +=
                a;
            this.g += a;
            this.b += a;
            return this
        },
        sub: function(a) {
            this.r = Math.max(0, this.r - a.r);
            this.g = Math.max(0, this.g - a.g);
            this.b = Math.max(0, this.b - a.b);
            return this
        },
        multiply: function(a) {
            this.r *= a.r;
            this.g *= a.g;
            this.b *= a.b;
            return this
        },
        multiplyScalar: function(a) {
            this.r *= a;
            this.g *= a;
            this.b *= a;
            return this
        },
        lerp: function(a, b) {
            this.r += (a.r - this.r) * b;
            this.g += (a.g - this.g) * b;
            this.b += (a.b - this.b) * b;
            return this
        },
        equals: function(a) {
            return a.r === this.r && a.g === this.g && a.b === this.b
        },
        fromArray: function(a, b) {
            void 0 === b && (b =
                0);
            this.r = a[b];
            this.g = a[b + 1];
            this.b = a[b + 2];
            return this
        },
        toArray: function(a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            a[b] = this.r;
            a[b + 1] = this.g;
            a[b + 2] = this.b;
            return a
        },
        toJSON: function() {
            return this.getHex()
        }
    };
    d.ColorKeywords = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    };
    var la = {
            common: {
                diffuse: {
                    value: new G(15658734)
                },
                opacity: {
                    value: 1
                },
                map: {
                    value: null
                },
                offsetRepeat: {
                    value: new na(0, 0, 1, 1)
                },
                specularMap: {
                    value: null
                },
                alphaMap: {
                    value: null
                },
                envMap: {
                    value: null
                },
                flipEnvMap: {
                    value: -1
                },
                reflectivity: {
                    value: 1
                },
                refractionRatio: {
                    value: .98
                }
            },
            aomap: {
                aoMap: {
                    value: null
                },
                aoMapIntensity: {
                    value: 1
                }
            },
            lightmap: {
                lightMap: {
                    value: null
                },
                lightMapIntensity: {
                    value: 1
                }
            },
            emissivemap: {
                emissiveMap: {
                    value: null
                }
            },
            bumpmap: {
                bumpMap: {
                    value: null
                },
                bumpScale: {
                    value: 1
                }
            },
            normalmap: {
                normalMap: {
                    value: null
                },
                normalScale: {
                    value: new v(1, 1)
                }
            },
            displacementmap: {
                displacementMap: {
                    value: null
                },
                displacementScale: {
                    value: 1
                },
                displacementBias: {
                    value: 0
                }
            },
            roughnessmap: {
                roughnessMap: {
                    value: null
                }
            },
            metalnessmap: {
                metalnessMap: {
                    value: null
                }
            },
            fog: {
                fogDensity: {
                    value: 2.5E-4
                },
                fogNear: {
                    value: 1
                },
                fogFar: {
                    value: 2E3
                },
                fogColor: {
                    value: new G(16777215)
                }
            },
            lights: {
                ambientLightColor: {
                    value: []
                },
                directionalLights: {
                    value: [],
                    properties: {
                        direction: {},
                        color: {},
                        shadow: {},
                        shadowBias: {},
                        shadowRadius: {},
                        shadowMapSize: {}
                    }
                },
                directionalShadowMap: {
                    value: []
                },
                directionalShadowMatrix: {
                    value: []
                },
                spotLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        direction: {},
                        distance: {},
                        coneCos: {},
                        penumbraCos: {},
                        decay: {},
                        shadow: {},
                        shadowBias: {},
                        shadowRadius: {},
                        shadowMapSize: {}
                    }
                },
                spotShadowMap: {
                    value: []
                },
                spotShadowMatrix: {
                    value: []
                },
                pointLights: {
                    value: [],
                    properties: {
                        color: {},
                        position: {},
                        decay: {},
                        distance: {},
                        shadow: {},
                        shadowBias: {},
                        shadowRadius: {},
                        shadowMapSize: {}
                    }
                },
                pointShadowMap: {
                    value: []
                },
                pointShadowMatrix: {
                    value: []
                },
                hemisphereLights: {
                    value: [],
                    properties: {
                        direction: {},
                        skyColor: {},
                        groundColor: {}
                    }
                }
            },
            points: {
                diffuse: {
                    value: new G(15658734)
                },
                opacity: {
                    value: 1
                },
                size: {
                    value: 1
                },
                scale: {
                    value: 1
                },
                map: {
                    value: null
                },
                offsetRepeat: {
                    value: new na(0, 0, 1, 1)
                }
            }
        },
        Tc = {
            basic: {
                uniforms: d.UniformsUtils.merge([la.common, la.aomap, la.fog]),
                vertexShader: va.meshbasic_vert,
                fragmentShader: va.meshbasic_frag
            },
            lambert: {
                uniforms: d.UniformsUtils.merge([la.common, la.aomap, la.lightmap, la.emissivemap, la.fog, la.lights, {
                    emissive: {
                        value: new G(0)
                    }
                }]),
                vertexShader: va.meshlambert_vert,
                fragmentShader: va.meshlambert_frag
            },
            phong: {
                uniforms: d.UniformsUtils.merge([la.common, la.aomap, la.lightmap, la.emissivemap, la.bumpmap, la.normalmap, la.displacementmap, la.fog, la.lights, {
                    emissive: {
                        value: new G(0)
                    },
                    specular: {
                        value: new G(1118481)
                    },
                    shininess: {
                        value: 30
                    }
                }]),
                vertexShader: va.meshphong_vert,
                fragmentShader: va.meshphong_frag
            },
            standard: {
                uniforms: d.UniformsUtils.merge([la.common, la.aomap, la.lightmap, la.emissivemap, la.bumpmap, la.normalmap, la.displacementmap, la.roughnessmap, la.metalnessmap, la.fog, la.lights, {
                    emissive: {
                        value: new G(0)
                    },
                    roughness: {
                        value: .5
                    },
                    metalness: {
                        value: 0
                    },
                    envMapIntensity: {
                        value: 1
                    }
                }]),
                vertexShader: va.meshphysical_vert,
                fragmentShader: va.meshphysical_frag
            },
            points: {
                uniforms: d.UniformsUtils.merge([la.points,
                    la.fog
                ]),
                vertexShader: va.points_vert,
                fragmentShader: va.points_frag
            },
            dashed: {
                uniforms: d.UniformsUtils.merge([la.common, la.fog, {
                    scale: {
                        value: 1
                    },
                    dashSize: {
                        value: 1
                    },
                    totalSize: {
                        value: 2
                    }
                }]),
                vertexShader: va.linedashed_vert,
                fragmentShader: va.linedashed_frag
            },
            depth: {
                uniforms: d.UniformsUtils.merge([la.common, la.displacementmap]),
                vertexShader: va.depth_vert,
                fragmentShader: va.depth_frag
            },
            normal: {
                uniforms: {
                    opacity: {
                        value: 1
                    }
                },
                vertexShader: va.normal_vert,
                fragmentShader: va.normal_frag
            },
            cube: {
                uniforms: {
                    tCube: {
                        value: null
                    },
                    tFlip: {
                        value: -1
                    },
                    opacity: {
                        value: 1
                    }
                },
                vertexShader: va.cube_vert,
                fragmentShader: va.cube_frag
            },
            equirect: {
                uniforms: {
                    tEquirect: {
                        value: null
                    },
                    tFlip: {
                        value: -1
                    }
                },
                vertexShader: va.equirect_vert,
                fragmentShader: va.equirect_frag
            },
            distanceRGBA: {
                uniforms: {
                    lightPos: {
                        value: new r
                    }
                },
                vertexShader: va.distanceRGBA_vert,
                fragmentShader: va.distanceRGBA_frag
            }
        };
    Tc.physical = {
        uniforms: d.UniformsUtils.merge([Tc.standard.uniforms, {
            clearCoat: {
                value: 0
            },
            clearCoatRoughness: {
                value: 0
            }
        }]),
        vertexShader: va.meshphysical_vert,
        fragmentShader: va.meshphysical_frag
    };
    Ea.prototype = Object.create(K.prototype);
    Ea.prototype.constructor = Ea;
    Ea.prototype.isMeshDepthMaterial = !0;
    Ea.prototype.copy = function(a) {
        K.prototype.copy.call(this, a);
        this.depthPacking = a.depthPacking;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        this.map = a.map;
        this.alphaMap = a.alphaMap;
        this.displacementMap = a.displacementMap;
        this.displacementScale = a.displacementScale;
        this.displacementBias = a.displacementBias;
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        return this
    };
    Qa.prototype = {
        constructor: Qa,
        isBox3: !0,
        set: function(a, b) {
            this.min.copy(a);
            this.max.copy(b);
            return this
        },
        setFromArray: function(a) {
            for (var b = Infinity, e = Infinity, f = Infinity, c = -Infinity, d = -Infinity, k = -Infinity, g = 0, h = a.length; g < h; g += 3) {
                var l = a[g],
                    m = a[g + 1],
                    n = a[g + 2];
                l < b && (b = l);
                m < e && (e = m);
                n < f && (f = n);
                l > c && (c = l);
                m > d && (d = m);
                n > k && (k = n)
            }
            this.min.set(b, e, f);
            this.max.set(c, d, k)
        },
        setFromPoints: function(a) {
            this.makeEmpty();
            for (var b = 0, e = a.length; b < e; b++) this.expandByPoint(a[b]);
            return this
        },
        setFromCenterAndSize: function() {
            var a =
                new r;
            return function(b, e) {
                e = a.copy(e).multiplyScalar(.5);
                this.min.copy(b).sub(e);
                this.max.copy(b).add(e);
                return this
            }
        }(),
        setFromObject: function() {
            var a = new r;
            return function(b) {
                var e = this;
                b.updateMatrixWorld(!0);
                this.makeEmpty();
                b.traverse(function(b) {
                    var c = b.geometry;
                    if (void 0 !== c)
                        if (c && c.isGeometry)
                            for (var c = c.vertices, d = 0, k = c.length; d < k; d++) a.copy(c[d]), a.applyMatrix4(b.matrixWorld), e.expandByPoint(a);
                        else if (c && c.isBufferGeometry && (k = c.attributes.position, void 0 !== k)) {
                        var g;
                        k && k.isInterleavedBufferAttribute ?
                            (c = k.data.array, d = k.offset, g = k.data.stride) : (c = k.array, d = 0, g = 3);
                        for (k = c.length; d < k; d += g) a.fromArray(c, d), a.applyMatrix4(b.matrixWorld), e.expandByPoint(a)
                    }
                });
                return this
            }
        }(),
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            this.min.copy(a.min);
            this.max.copy(a.max);
            return this
        },
        makeEmpty: function() {
            this.min.x = this.min.y = this.min.z = Infinity;
            this.max.x = this.max.y = this.max.z = -Infinity;
            return this
        },
        isEmpty: function() {
            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z <
                this.min.z
        },
        center: function(a) {
            return (a || new r).addVectors(this.min, this.max).multiplyScalar(.5)
        },
        size: function(a) {
            return (a || new r).subVectors(this.max, this.min)
        },
        expandByPoint: function(a) {
            this.min.min(a);
            this.max.max(a);
            return this
        },
        expandByVector: function(a) {
            this.min.sub(a);
            this.max.add(a);
            return this
        },
        expandByScalar: function(a) {
            this.min.addScalar(-a);
            this.max.addScalar(a);
            return this
        },
        containsPoint: function(a) {
            return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z ||
                a.z > this.max.z ? !1 : !0
        },
        containsBox: function(a) {
            return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y && this.min.z <= a.min.z && a.max.z <= this.max.z ? !0 : !1
        },
        getParameter: function(a, b) {
            return (b || new r).set((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z))
        },
        intersectsBox: function(a) {
            return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z ?
                !1 : !0
        },
        intersectsSphere: function() {
            var a;
            return function(b) {
                void 0 === a && (a = new r);
                this.clampPoint(b.center, a);
                return a.distanceToSquared(b.center) <= b.radius * b.radius
            }
        }(),
        intersectsPlane: function(a) {
            var b, e;
            0 < a.normal.x ? (b = a.normal.x * this.min.x, e = a.normal.x * this.max.x) : (b = a.normal.x * this.max.x, e = a.normal.x * this.min.x);
            0 < a.normal.y ? (b += a.normal.y * this.min.y, e += a.normal.y * this.max.y) : (b += a.normal.y * this.max.y, e += a.normal.y * this.min.y);
            0 < a.normal.z ? (b += a.normal.z * this.min.z, e += a.normal.z * this.max.z) :
                (b += a.normal.z * this.max.z, e += a.normal.z * this.min.z);
            return b <= a.constant && e >= a.constant
        },
        clampPoint: function(a, b) {
            return (b || new r).copy(a).clamp(this.min, this.max)
        },
        distanceToPoint: function() {
            var a = new r;
            return function(b) {
                return a.copy(b).clamp(this.min, this.max).sub(b).length()
            }
        }(),
        getBoundingSphere: function() {
            var a = new r;
            return function(b) {
                b = b || new La;
                b.center = this.center();
                b.radius = .5 * this.size(a).length();
                return b
            }
        }(),
        intersect: function(a) {
            this.min.max(a.min);
            this.max.min(a.max);
            this.isEmpty() &&
                this.makeEmpty();
            return this
        },
        union: function(a) {
            this.min.min(a.min);
            this.max.max(a.max);
            return this
        },
        applyMatrix4: function() {
            var a = [new r, new r, new r, new r, new r, new r, new r, new r];
            return function(b) {
                if (this.isEmpty()) return this;
                a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(b);
                a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(b);
                a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(b);
                a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(b);
                a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(b);
                a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(b);
                a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(b);
                a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(b);
                this.setFromPoints(a);
                return this
            }
        }(),
        translate: function(a) {
            this.min.add(a);
            this.max.add(a);
            return this
        },
        equals: function(a) {
            return a.min.equals(this.min) && a.max.equals(this.max)
        }
    };
    La.prototype = {
        constructor: La,
        set: function(a, b) {
            this.center.copy(a);
            this.radius = b;
            return this
        },
        setFromPoints: function() {
            var a = new Qa;
            return function(b,
                e) {
                var f = this.center;
                void 0 !== e ? f.copy(e) : a.setFromPoints(b).center(f);
                for (var c = e = 0, d = b.length; c < d; c++) e = Math.max(e, f.distanceToSquared(b[c]));
                this.radius = Math.sqrt(e);
                return this
            }
        }(),
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            this.center.copy(a.center);
            this.radius = a.radius;
            return this
        },
        empty: function() {
            return 0 >= this.radius
        },
        containsPoint: function(a) {
            return a.distanceToSquared(this.center) <= this.radius * this.radius
        },
        distanceToPoint: function(a) {
            return a.distanceTo(this.center) -
                this.radius
        },
        intersectsSphere: function(a) {
            var b = this.radius + a.radius;
            return a.center.distanceToSquared(this.center) <= b * b
        },
        intersectsBox: function(a) {
            return a.intersectsSphere(this)
        },
        intersectsPlane: function(a) {
            return Math.abs(this.center.dot(a.normal) - a.constant) <= this.radius
        },
        clampPoint: function(a, b) {
            var e = this.center.distanceToSquared(a);
            b = b || new r;
            b.copy(a);
            e > this.radius * this.radius && (b.sub(this.center).normalize(), b.multiplyScalar(this.radius).add(this.center));
            return b
        },
        getBoundingBox: function(a) {
            a =
                a || new Qa;
            a.set(this.center, this.center);
            a.expandByScalar(this.radius);
            return a
        },
        applyMatrix4: function(a) {
            this.center.applyMatrix4(a);
            this.radius *= a.getMaxScaleOnAxis();
            return this
        },
        translate: function(a) {
            this.center.add(a);
            return this
        },
        equals: function(a) {
            return a.center.equals(this.center) && a.radius === this.radius
        }
    };
    Ta.prototype = {
        constructor: Ta,
        isMatrix3: !0,
        set: function(a, b, e, f, c, d, k, g, h) {
            var l = this.elements;
            l[0] = a;
            l[1] = f;
            l[2] = k;
            l[3] = b;
            l[4] = c;
            l[5] = g;
            l[6] = e;
            l[7] = d;
            l[8] = h;
            return this
        },
        identity: function() {
            this.set(1,
                0, 0, 0, 1, 0, 0, 0, 1);
            return this
        },
        clone: function() {
            return (new this.constructor).fromArray(this.elements)
        },
        copy: function(a) {
            a = a.elements;
            this.set(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]);
            return this
        },
        setFromMatrix4: function(a) {
            a = a.elements;
            this.set(a[0], a[4], a[8], a[1], a[5], a[9], a[2], a[6], a[10]);
            return this
        },
        applyToVector3Array: function() {
            var a;
            return function(b, e, f) {
                void 0 === a && (a = new r);
                void 0 === e && (e = 0);
                void 0 === f && (f = b.length);
                for (var c = 0; c < f; c += 3, e += 3) a.fromArray(b, e), a.applyMatrix3(this), a.toArray(b,
                    e);
                return b
            }
        }(),
        applyToBuffer: function() {
            var a;
            return function(b, e, f) {
                void 0 === a && (a = new r);
                void 0 === e && (e = 0);
                void 0 === f && (f = b.length / b.itemSize);
                for (var c = 0; c < f; c++, e++) a.x = b.getX(e), a.y = b.getY(e), a.z = b.getZ(e), a.applyMatrix3(this), b.setXYZ(a.x, a.y, a.z);
                return b
            }
        }(),
        multiplyScalar: function(a) {
            var b = this.elements;
            b[0] *= a;
            b[3] *= a;
            b[6] *= a;
            b[1] *= a;
            b[4] *= a;
            b[7] *= a;
            b[2] *= a;
            b[5] *= a;
            b[8] *= a;
            return this
        },
        determinant: function() {
            var a = this.elements,
                b = a[0],
                e = a[1],
                f = a[2],
                c = a[3],
                d = a[4],
                k = a[5],
                g = a[6],
                h = a[7],
                a =
                a[8];
            return b * d * a - b * k * h - e * c * a + e * k * g + f * c * h - f * d * g
        },
        getInverse: function(a, b) {
            a && a.isMatrix4 && console.error("THREE.Matrix3.getInverse no longer takes a Matrix4 argument.");
            var e = a.elements;
            a = this.elements;
            var f = e[0],
                c = e[1],
                d = e[2],
                k = e[3],
                g = e[4],
                h = e[5],
                l = e[6],
                m = e[7],
                e = e[8],
                n = e * g - h * m,
                y = h * l - e * k,
                w = m * k - g * l,
                t = f * n + c * y + d * w;
            if (0 === t) {
                if (!0 === b) throw Error("THREE.Matrix3.getInverse(): can't invert matrix, determinant is 0");
                console.warn("THREE.Matrix3.getInverse(): can't invert matrix, determinant is 0");
                return this.identity()
            }
            b =
                1 / t;
            a[0] = n * b;
            a[1] = (d * m - e * c) * b;
            a[2] = (h * c - d * g) * b;
            a[3] = y * b;
            a[4] = (e * f - d * l) * b;
            a[5] = (d * k - h * f) * b;
            a[6] = w * b;
            a[7] = (c * l - m * f) * b;
            a[8] = (g * f - c * k) * b;
            return this
        },
        transpose: function() {
            var a, b = this.elements;
            a = b[1];
            b[1] = b[3];
            b[3] = a;
            a = b[2];
            b[2] = b[6];
            b[6] = a;
            a = b[5];
            b[5] = b[7];
            b[7] = a;
            return this
        },
        flattenToArrayOffset: function(a, b) {
            console.warn("THREE.Matrix3: .flattenToArrayOffset is deprecated - just use .toArray instead.");
            return this.toArray(a, b)
        },
        getNormalMatrix: function(a) {
            return this.setFromMatrix4(a).getInverse(this).transpose()
        },
        transposeIntoArray: function(a) {
            var b = this.elements;
            a[0] = b[0];
            a[1] = b[3];
            a[2] = b[6];
            a[3] = b[1];
            a[4] = b[4];
            a[5] = b[7];
            a[6] = b[2];
            a[7] = b[5];
            a[8] = b[8];
            return this
        },
        fromArray: function(a) {
            this.elements.set(a);
            return this
        },
        toArray: function(a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            var e = this.elements;
            a[b] = e[0];
            a[b + 1] = e[1];
            a[b + 2] = e[2];
            a[b + 3] = e[3];
            a[b + 4] = e[4];
            a[b + 5] = e[5];
            a[b + 6] = e[6];
            a[b + 7] = e[7];
            a[b + 8] = e[8];
            return a
        }
    };
    Za.prototype = {
        constructor: Za,
        set: function(a, b) {
            this.normal.copy(a);
            this.constant = b;
            return this
        },
        setComponents: function(a, b, e, f) {
            this.normal.set(a, b, e);
            this.constant = f;
            return this
        },
        setFromNormalAndCoplanarPoint: function(a, b) {
            this.normal.copy(a);
            this.constant = -b.dot(this.normal);
            return this
        },
        setFromCoplanarPoints: function() {
            var a = new r,
                b = new r;
            return function(e, f, c) {
                f = a.subVectors(c, f).cross(b.subVectors(e, f)).normalize();
                this.setFromNormalAndCoplanarPoint(f, e);
                return this
            }
        }(),
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            this.normal.copy(a.normal);
            this.constant = a.constant;
            return this
        },
        normalize: function() {
            var a = 1 / this.normal.length();
            this.normal.multiplyScalar(a);
            this.constant *= a;
            return this
        },
        negate: function() {
            this.constant *= -1;
            this.normal.negate();
            return this
        },
        distanceToPoint: function(a) {
            return this.normal.dot(a) + this.constant
        },
        distanceToSphere: function(a) {
            return this.distanceToPoint(a.center) - a.radius
        },
        projectPoint: function(a, b) {
            return this.orthoPoint(a, b).sub(a).negate()
        },
        orthoPoint: function(a, b) {
            a = this.distanceToPoint(a);
            return (b || new r).copy(this.normal).multiplyScalar(a)
        },
        intersectLine: function() {
            var a = new r;
            return function(b, e) {
                e = e || new r;
                var f = b.delta(a),
                    c = this.normal.dot(f);
                if (0 === c) {
                    if (0 === this.distanceToPoint(b.start)) return e.copy(b.start)
                } else return c = -(b.start.dot(this.normal) + this.constant) / c, 0 > c || 1 < c ? void 0 : e.copy(f).multiplyScalar(c).add(b.start)
            }
        }(),
        intersectsLine: function(a) {
            var b = this.distanceToPoint(a.start);
            a = this.distanceToPoint(a.end);
            return 0 > b && 0 < a || 0 > a && 0 < b
        },
        intersectsBox: function(a) {
            return a.intersectsPlane(this)
        },
        intersectsSphere: function(a) {
            return a.intersectsPlane(this)
        },
        coplanarPoint: function(a) {
            return (a || new r).copy(this.normal).multiplyScalar(-this.constant)
        },
        applyMatrix4: function() {
            var a = new r,
                b = new Ta;
            return function(e, f) {
                var c = this.coplanarPoint(a).applyMatrix4(e);
                e = f || b.getNormalMatrix(e);
                e = this.normal.applyMatrix3(e).normalize();
                this.constant = -c.dot(e);
                return this
            }
        }(),
        translate: function(a) {
            this.constant -= a.dot(this.normal);
            return this
        },
        equals: function(a) {
            return a.normal.equals(this.normal) && a.constant === this.constant
        }
    };
    Pb.prototype = {
        constructor: Pb,
        set: function(a,
            b, e, f, c, d) {
            var k = this.planes;
            k[0].copy(a);
            k[1].copy(b);
            k[2].copy(e);
            k[3].copy(f);
            k[4].copy(c);
            k[5].copy(d);
            return this
        },
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            for (var b = this.planes, e = 0; 6 > e; e++) b[e].copy(a.planes[e]);
            return this
        },
        setFromMatrix: function(a) {
            var b = this.planes,
                e = a.elements;
            a = e[0];
            var f = e[1],
                c = e[2],
                d = e[3],
                k = e[4],
                g = e[5],
                h = e[6],
                l = e[7],
                m = e[8],
                n = e[9],
                y = e[10],
                w = e[11],
                t = e[12],
                A = e[13],
                r = e[14],
                e = e[15];
            b[0].setComponents(d - a, l - k, w - m, e - t).normalize();
            b[1].setComponents(d +
                a, l + k, w + m, e + t).normalize();
            b[2].setComponents(d + f, l + g, w + n, e + A).normalize();
            b[3].setComponents(d - f, l - g, w - n, e - A).normalize();
            b[4].setComponents(d - c, l - h, w - y, e - r).normalize();
            b[5].setComponents(d + c, l + h, w + y, e + r).normalize();
            return this
        },
        intersectsObject: function() {
            var a = new La;
            return function(b) {
                var e = b.geometry;
                null === e.boundingSphere && e.computeBoundingSphere();
                a.copy(e.boundingSphere).applyMatrix4(b.matrixWorld);
                return this.intersectsSphere(a)
            }
        }(),
        intersectsSprite: function() {
            var a = new La;
            return function(b) {
                a.center.set(0,
                    0, 0);
                a.radius = .7071067811865476;
                a.applyMatrix4(b.matrixWorld);
                return this.intersectsSphere(a)
            }
        }(),
        intersectsSphere: function(a) {
            var b = this.planes,
                e = a.center;
            a = -a.radius;
            for (var f = 0; 6 > f; f++)
                if (b[f].distanceToPoint(e) < a) return !1;
            return !0
        },
        intersectsBox: function() {
            var a = new r,
                b = new r;
            return function(e) {
                for (var f = this.planes, c = 0; 6 > c; c++) {
                    var d = f[c];
                    a.x = 0 < d.normal.x ? e.min.x : e.max.x;
                    b.x = 0 < d.normal.x ? e.max.x : e.min.x;
                    a.y = 0 < d.normal.y ? e.min.y : e.max.y;
                    b.y = 0 < d.normal.y ? e.max.y : e.min.y;
                    a.z = 0 < d.normal.z ? e.min.z :
                        e.max.z;
                    b.z = 0 < d.normal.z ? e.max.z : e.min.z;
                    var k = d.distanceToPoint(a),
                        d = d.distanceToPoint(b);
                    if (0 > k && 0 > d) return !1
                }
                return !0
            }
        }(),
        containsPoint: function(a) {
            for (var b = this.planes, e = 0; 6 > e; e++)
                if (0 > b[e].distanceToPoint(a)) return !1;
            return !0
        }
    };
    var Ke = 0;
    J.prototype = {
        constructor: J,
        isBufferAttribute: !0,
        get count() {
            return this.array.length / this.itemSize
        },
        set needsUpdate(a) {
            !0 === a && this.version++
        },
        setDynamic: function(a) {
            this.dynamic = a;
            return this
        },
        copy: function(a) {
            this.array = new a.array.constructor(a.array);
            this.itemSize =
                a.itemSize;
            this.normalized = a.normalized;
            this.dynamic = a.dynamic;
            return this
        },
        copyAt: function(a, b, e) {
            a *= this.itemSize;
            e *= b.itemSize;
            for (var f = 0, c = this.itemSize; f < c; f++) this.array[a + f] = b.array[e + f];
            return this
        },
        copyArray: function(a) {
            this.array.set(a);
            return this
        },
        copyColorsArray: function(a) {
            for (var b = this.array, e = 0, f = 0, c = a.length; f < c; f++) {
                var d = a[f];
                void 0 === d && (console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined", f), d = new G);
                b[e++] = d.r;
                b[e++] = d.g;
                b[e++] = d.b
            }
            return this
        },
        copyIndicesArray: function(a) {
            for (var b =
                    this.array, e = 0, f = 0, c = a.length; f < c; f++) {
                var d = a[f];
                b[e++] = d.a;
                b[e++] = d.b;
                b[e++] = d.c
            }
            return this
        },
        copyVector2sArray: function(a) {
            for (var b = this.array, e = 0, f = 0, c = a.length; f < c; f++) {
                var d = a[f];
                void 0 === d && (console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined", f), d = new v);
                b[e++] = d.x;
                b[e++] = d.y
            }
            return this
        },
        copyVector3sArray: function(a) {
            for (var b = this.array, e = 0, f = 0, c = a.length; f < c; f++) {
                var d = a[f];
                void 0 === d && (console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",
                    f), d = new r);
                b[e++] = d.x;
                b[e++] = d.y;
                b[e++] = d.z
            }
            return this
        },
        copyVector4sArray: function(a) {
            for (var b = this.array, e = 0, f = 0, c = a.length; f < c; f++) {
                var d = a[f];
                void 0 === d && (console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined", f), d = new na);
                b[e++] = d.x;
                b[e++] = d.y;
                b[e++] = d.z;
                b[e++] = d.w
            }
            return this
        },
        set: function(a, b) {
            void 0 === b && (b = 0);
            this.array.set(a, b);
            return this
        },
        getX: function(a) {
            return this.array[a * this.itemSize]
        },
        setX: function(a, b) {
            this.array[a * this.itemSize] = b;
            return this
        },
        getY: function(a) {
            return this.array[a *
                this.itemSize + 1]
        },
        setY: function(a, b) {
            this.array[a * this.itemSize + 1] = b;
            return this
        },
        getZ: function(a) {
            return this.array[a * this.itemSize + 2]
        },
        setZ: function(a, b) {
            this.array[a * this.itemSize + 2] = b;
            return this
        },
        getW: function(a) {
            return this.array[a * this.itemSize + 3]
        },
        setW: function(a, b) {
            this.array[a * this.itemSize + 3] = b;
            return this
        },
        setXY: function(a, b, e) {
            a *= this.itemSize;
            this.array[a + 0] = b;
            this.array[a + 1] = e;
            return this
        },
        setXYZ: function(a, b, e, f) {
            a *= this.itemSize;
            this.array[a + 0] = b;
            this.array[a + 1] = e;
            this.array[a + 2] =
                f;
            return this
        },
        setXYZW: function(a, b, e, f, c) {
            a *= this.itemSize;
            this.array[a + 0] = b;
            this.array[a + 1] = e;
            this.array[a + 2] = f;
            this.array[a + 3] = c;
            return this
        },
        clone: function() {
            return (new this.constructor).copy(this)
        }
    };
    ja.prototype = {
        constructor: ja,
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            this.a = a.a;
            this.b = a.b;
            this.c = a.c;
            this.normal.copy(a.normal);
            this.color.copy(a.color);
            this.materialIndex = a.materialIndex;
            for (var b = 0, e = a.vertexNormals.length; b < e; b++) this.vertexNormals[b] = a.vertexNormals[b].clone();
            b = 0;
            for (e = a.vertexColors.length; b < e; b++) this.vertexColors[b] = a.vertexColors[b].clone();
            return this
        }
    };
    Qb.RotationOrders = "XYZ YZX ZXY XZY YXZ ZYX".split(" ");
    Qb.DefaultOrder = "XYZ";
    Qb.prototype = {
        constructor: Qb,
        isEuler: !0,
        get x() {
            return this._x
        },
        set x(a) {
            this._x = a;
            this.onChangeCallback()
        },
        get y() {
            return this._y
        },
        set y(a) {
            this._y = a;
            this.onChangeCallback()
        },
        get z() {
            return this._z
        },
        set z(a) {
            this._z = a;
            this.onChangeCallback()
        },
        get order() {
            return this._order
        },
        set order(a) {
            this._order = a;
            this.onChangeCallback()
        },
        set: function(a, b, e, f) {
            this._x = a;
            this._y = b;
            this._z = e;
            this._order = f || this._order;
            this.onChangeCallback();
            return this
        },
        clone: function() {
            return new this.constructor(this._x, this._y, this._z, this._order)
        },
        copy: function(a) {
            this._x = a._x;
            this._y = a._y;
            this._z = a._z;
            this._order = a._order;
            this.onChangeCallback();
            return this
        },
        setFromRotationMatrix: function(a, b, e) {
            var f = d.Math.clamp,
                c = a.elements;
            a = c[0];
            var k = c[4],
                g = c[8],
                h = c[1],
                l = c[5],
                m = c[9],
                n = c[2],
                w = c[6],
                c = c[10];
            b = b || this._order;
            "XYZ" === b ? (this._y = Math.asin(f(g, -1, 1)), .99999 > Math.abs(g) ? (this._x = Math.atan2(-m, c), this._z = Math.atan2(-k, a)) : (this._x = Math.atan2(w, l), this._z = 0)) : "YXZ" === b ? (this._x = Math.asin(-f(m, -1, 1)), .99999 > Math.abs(m) ? (this._y = Math.atan2(g, c), this._z = Math.atan2(h, l)) : (this._y = Math.atan2(-n, a), this._z = 0)) : "ZXY" === b ? (this._x = Math.asin(f(w, -1, 1)), .99999 > Math.abs(w) ? (this._y = Math.atan2(-n, c), this._z = Math.atan2(-k, l)) : (this._y = 0, this._z = Math.atan2(h, a))) : "ZYX" === b ? (this._y = Math.asin(-f(n, -1, 1)), .99999 > Math.abs(n) ? (this._x = Math.atan2(w, c), this._z =
                Math.atan2(h, a)) : (this._x = 0, this._z = Math.atan2(-k, l))) : "YZX" === b ? (this._z = Math.asin(f(h, -1, 1)), .99999 > Math.abs(h) ? (this._x = Math.atan2(-m, l), this._y = Math.atan2(-n, a)) : (this._x = 0, this._y = Math.atan2(g, c))) : "XZY" === b ? (this._z = Math.asin(-f(k, -1, 1)), .99999 > Math.abs(k) ? (this._x = Math.atan2(w, l), this._y = Math.atan2(g, a)) : (this._x = Math.atan2(-m, c), this._y = 0)) : console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + b);
            this._order = b;
            if (!1 !== e) this.onChangeCallback();
            return this
        },
        setFromQuaternion: function() {
            var a;
            return function(b, e, f) {
                void 0 === a && (a = new z);
                a.makeRotationFromQuaternion(b);
                return this.setFromRotationMatrix(a, e, f)
            }
        }(),
        setFromVector3: function(a, b) {
            return this.set(a.x, a.y, a.z, b || this._order)
        },
        reorder: function() {
            var a = new x;
            return function(b) {
                a.setFromEuler(this);
                return this.setFromQuaternion(a, b)
            }
        }(),
        equals: function(a) {
            return a._x === this._x && a._y === this._y && a._z === this._z && a._order === this._order
        },
        fromArray: function(a) {
            this._x = a[0];
            this._y = a[1];
            this._z = a[2];
            void 0 !== a[3] && (this._order = a[3]);
            this.onChangeCallback();
            return this
        },
        toArray: function(a, b) {
            void 0 === a && (a = []);
            void 0 === b && (b = 0);
            a[b] = this._x;
            a[b + 1] = this._y;
            a[b + 2] = this._z;
            a[b + 3] = this._order;
            return a
        },
        toVector3: function(a) {
            return a ? a.set(this._x, this._y, this._z) : new r(this._x, this._y, this._z)
        },
        onChange: function(a) {
            this.onChangeCallback = a;
            return this
        },
        onChangeCallback: function() {}
    };
    jc.prototype = {
        constructor: jc,
        set: function(a) {
            this.mask = 1 << a
        },
        enable: function(a) {
            this.mask |= 1 << a
        },
        toggle: function(a) {
            this.mask ^= 1 << a
        },
        disable: function(a) {
            this.mask &= ~(1 << a)
        },
        test: function(a) {
            return 0 !==
                (this.mask & a.mask)
        }
    };
    M.DefaultUp = new r(0, 1, 0);
    M.DefaultMatrixAutoUpdate = !0;
    Object.assign(M.prototype, p.prototype, {
        isObject3D: !0,
        applyMatrix: function(a) {
            this.matrix.multiplyMatrices(a, this.matrix);
            this.matrix.decompose(this.position, this.quaternion, this.scale)
        },
        setRotationFromAxisAngle: function(a, b) {
            this.quaternion.setFromAxisAngle(a, b)
        },
        setRotationFromEuler: function(a) {
            this.quaternion.setFromEuler(a, !0)
        },
        setRotationFromMatrix: function(a) {
            this.quaternion.setFromRotationMatrix(a)
        },
        setRotationFromQuaternion: function(a) {
            this.quaternion.copy(a)
        },
        rotateOnAxis: function() {
            var a = new x;
            return function(b, e) {
                a.setFromAxisAngle(b, e);
                this.quaternion.multiply(a);
                return this
            }
        }(),
        rotateX: function() {
            var a = new r(1, 0, 0);
            return function(b) {
                return this.rotateOnAxis(a, b)
            }
        }(),
        rotateY: function() {
            var a = new r(0, 1, 0);
            return function(b) {
                return this.rotateOnAxis(a, b)
            }
        }(),
        rotateZ: function() {
            var a = new r(0, 0, 1);
            return function(b) {
                return this.rotateOnAxis(a, b)
            }
        }(),
        translateOnAxis: function() {
            var a = new r;
            return function(b, e) {
                a.copy(b).applyQuaternion(this.quaternion);
                this.position.add(a.multiplyScalar(e));
                return this
            }
        }(),
        translateX: function() {
            var a = new r(1, 0, 0);
            return function(b) {
                return this.translateOnAxis(a, b)
            }
        }(),
        translateY: function() {
            var a = new r(0, 1, 0);
            return function(b) {
                return this.translateOnAxis(a, b)
            }
        }(),
        translateZ: function() {
            var a = new r(0, 0, 1);
            return function(b) {
                return this.translateOnAxis(a, b)
            }
        }(),
        localToWorld: function(a) {
            return a.applyMatrix4(this.matrixWorld)
        },
        worldToLocal: function() {
            var a = new z;
            return function(b) {
                return b.applyMatrix4(a.getInverse(this.matrixWorld))
            }
        }(),
        lookAt: function() {
            var a = new z;
            return function(b) {
                a.lookAt(b, this.position, this.up);
                this.quaternion.setFromRotationMatrix(a)
            }
        }(),
        add: function(a) {
            if (1 < arguments.length) {
                for (var b = 0; b < arguments.length; b++) this.add(arguments[b]);
                return this
            }
            if (a === this) return console.error("THREE.Object3D.add: object can't be added as a child of itself.", a), this;
            a && a.isObject3D ? (null !== a.parent && a.parent.remove(a), a.parent = this, a.dispatchEvent({
                type: "added"
            }), this.children.push(a)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",
                a);
            return this
        },
        remove: function(a) {
            if (1 < arguments.length)
                for (var b = 0; b < arguments.length; b++) this.remove(arguments[b]);
            b = this.children.indexOf(a); - 1 !== b && (a.parent = null, a.dispatchEvent({
                type: "removed"
            }), this.children.splice(b, 1))
        },
        getObjectById: function(a) {
            return this.getObjectByProperty("id", a)
        },
        getObjectByName: function(a) {
            return this.getObjectByProperty("name", a)
        },
        getObjectByProperty: function(a, b) {
            if (this[a] === b) return this;
            for (var e = 0, f = this.children.length; e < f; e++) {
                var c = this.children[e].getObjectByProperty(a,
                    b);
                if (void 0 !== c) return c
            }
        },
        getWorldPosition: function(a) {
            a = a || new r;
            this.updateMatrixWorld(!0);
            return a.setFromMatrixPosition(this.matrixWorld)
        },
        getWorldQuaternion: function() {
            var a = new r,
                b = new r;
            return function(e) {
                e = e || new x;
                this.updateMatrixWorld(!0);
                this.matrixWorld.decompose(a, e, b);
                return e
            }
        }(),
        getWorldRotation: function() {
            var a = new x;
            return function(b) {
                b = b || new Qb;
                this.getWorldQuaternion(a);
                return b.setFromQuaternion(a, this.rotation.order, !1)
            }
        }(),
        getWorldScale: function() {
            var a = new r,
                b = new x;
            return function(e) {
                e =
                    e || new r;
                this.updateMatrixWorld(!0);
                this.matrixWorld.decompose(a, b, e);
                return e
            }
        }(),
        getWorldDirection: function() {
            var a = new x;
            return function(b) {
                b = b || new r;
                this.getWorldQuaternion(a);
                return b.set(0, 0, 1).applyQuaternion(a)
            }
        }(),
        raycast: function() {},
        traverse: function(a) {
            a(this);
            for (var b = this.children, e = 0, f = b.length; e < f; e++) b[e].traverse(a)
        },
        traverseVisible: function(a) {
            if (!1 !== this.visible) {
                a(this);
                for (var b = this.children, e = 0, f = b.length; e < f; e++) b[e].traverseVisible(a)
            }
        },
        traverseAncestors: function(a) {
            var b =
                this.parent;
            null !== b && (a(b), b.traverseAncestors(a))
        },
        updateMatrix: function() {
            this.matrix.compose(this.position, this.quaternion, this.scale);
            this.matrixWorldNeedsUpdate = !0
        },
        updateMatrixWorld: function(a) {
            !0 === this.matrixAutoUpdate && this.updateMatrix();
            if (!0 === this.matrixWorldNeedsUpdate || !0 === a) null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0;
            for (var b = this.children, e = 0, f = b.length; e < f; e++) b[e].updateMatrixWorld(a)
        },
        toJSON: function(a) {
            function b(a) {
                var b = [],
                    e;
                for (e in a) {
                    var f = a[e];
                    delete f.metadata;
                    b.push(f)
                }
                return b
            }
            var e = void 0 === a || "" === a,
                f = {};
            e && (a = {
                geometries: {},
                materials: {},
                textures: {},
                images: {}
            }, f.metadata = {
                version: 4.4,
                type: "Object",
                generator: "Object3D.toJSON"
            });
            var c = {};
            c.uuid = this.uuid;
            c.type = this.type;
            "" !== this.name && (c.name = this.name);
            "{}" !== JSON.stringify(this.userData) && (c.userData = this.userData);
            !0 === this.castShadow && (c.castShadow = !0);
            !0 === this.receiveShadow && (c.receiveShadow = !0);
            !1 === this.visible &&
                (c.visible = !1);
            c.matrix = this.matrix.toArray();
            void 0 !== this.geometry && (void 0 === a.geometries[this.geometry.uuid] && (a.geometries[this.geometry.uuid] = this.geometry.toJSON(a)), c.geometry = this.geometry.uuid);
            void 0 !== this.material && (void 0 === a.materials[this.material.uuid] && (a.materials[this.material.uuid] = this.material.toJSON(a)), c.material = this.material.uuid);
            if (0 < this.children.length) {
                c.children = [];
                for (var d = 0; d < this.children.length; d++) c.children.push(this.children[d].toJSON(a).object)
            }
            if (e) {
                var e =
                    b(a.geometries),
                    d = b(a.materials),
                    k = b(a.textures);
                a = b(a.images);
                0 < e.length && (f.geometries = e);
                0 < d.length && (f.materials = d);
                0 < k.length && (f.textures = k);
                0 < a.length && (f.images = a)
            }
            f.object = c;
            return f
        },
        clone: function(a) {
            return (new this.constructor).copy(this, a)
        },
        copy: function(a, b) {
            void 0 === b && (b = !0);
            this.name = a.name;
            this.up.copy(a.up);
            this.position.copy(a.position);
            this.quaternion.copy(a.quaternion);
            this.scale.copy(a.scale);
            this.matrix.copy(a.matrix);
            this.matrixWorld.copy(a.matrixWorld);
            this.matrixAutoUpdate =
                a.matrixAutoUpdate;
            this.matrixWorldNeedsUpdate = a.matrixWorldNeedsUpdate;
            this.visible = a.visible;
            this.castShadow = a.castShadow;
            this.receiveShadow = a.receiveShadow;
            this.frustumCulled = a.frustumCulled;
            this.renderOrder = a.renderOrder;
            this.userData = JSON.parse(JSON.stringify(a.userData));
            if (!0 === b)
                for (b = 0; b < a.children.length; b++) this.add(a.children[b].clone());
            return this
        }
    });
    var Be = 0;
    Object.assign(ba.prototype, p.prototype, {
        isGeometry: !0,
        applyMatrix: function(a) {
            for (var b = (new Ta).getNormalMatrix(a), e = 0, f = this.vertices.length; e <
                f; e++) this.vertices[e].applyMatrix4(a);
            e = 0;
            for (f = this.faces.length; e < f; e++) {
                a = this.faces[e];
                a.normal.applyMatrix3(b).normalize();
                for (var c = 0, d = a.vertexNormals.length; c < d; c++) a.vertexNormals[c].applyMatrix3(b).normalize()
            }
            null !== this.boundingBox && this.computeBoundingBox();
            null !== this.boundingSphere && this.computeBoundingSphere();
            this.normalsNeedUpdate = this.verticesNeedUpdate = !0;
            return this
        },
        rotateX: function() {
            var a;
            return function(b) {
                void 0 === a && (a = new z);
                a.makeRotationX(b);
                this.applyMatrix(a);
                return this
            }
        }(),
        rotateY: function() {
            var a;
            return function(b) {
                void 0 === a && (a = new z);
                a.makeRotationY(b);
                this.applyMatrix(a);
                return this
            }
        }(),
        rotateZ: function() {
            var a;
            return function(b) {
                void 0 === a && (a = new z);
                a.makeRotationZ(b);
                this.applyMatrix(a);
                return this
            }
        }(),
        translate: function() {
            var a;
            return function(b, e, f) {
                void 0 === a && (a = new z);
                a.makeTranslation(b, e, f);
                this.applyMatrix(a);
                return this
            }
        }(),
        scale: function() {
            var a;
            return function(b, e, f) {
                void 0 === a && (a = new z);
                a.makeScale(b, e, f);
                this.applyMatrix(a);
                return this
            }
        }(),
        lookAt: function() {
            var a;
            return function(b) {
                void 0 === a && (a = new M);
                a.lookAt(b);
                a.updateMatrix();
                this.applyMatrix(a.matrix)
            }
        }(),
        fromBufferGeometry: function(a) {
            function b(a, b, f, c) {
                var q = void 0 !== k ? [m[a].clone(), m[b].clone(), m[f].clone()] : [],
                    d = void 0 !== g ? [e.colors[a].clone(), e.colors[b].clone(), e.colors[f].clone()] : [];
                c = new ja(a, b, f, q, d, c);
                e.faces.push(c);
                void 0 !== h && e.faceVertexUvs[0].push([n[a].clone(), n[b].clone(), n[f].clone()]);
                void 0 !== l && e.faceVertexUvs[1].push([y[a].clone(), y[b].clone(), y[f].clone()])
            }
            var e = this,
                f = null !==
                a.index ? a.index.array : void 0,
                c = a.attributes,
                d = c.position.array,
                k = void 0 !== c.normal ? c.normal.array : void 0,
                g = void 0 !== c.color ? c.color.array : void 0,
                h = void 0 !== c.uv ? c.uv.array : void 0,
                l = void 0 !== c.uv2 ? c.uv2.array : void 0;
            void 0 !== l && (this.faceVertexUvs[1] = []);
            for (var m = [], n = [], y = [], w = c = 0; c < d.length; c += 3, w += 2) e.vertices.push(new r(d[c], d[c + 1], d[c + 2])), void 0 !== k && m.push(new r(k[c], k[c + 1], k[c + 2])), void 0 !== g && e.colors.push(new G(g[c], g[c + 1], g[c + 2])), void 0 !== h && n.push(new v(h[w], h[w + 1])), void 0 !== l && y.push(new v(l[w],
                l[w + 1]));
            if (void 0 !== f)
                if (d = a.groups, 0 < d.length)
                    for (c = 0; c < d.length; c++)
                        for (var t = d[c], A = t.start, p = t.count, w = A, A = A + p; w < A; w += 3) b(f[w], f[w + 1], f[w + 2], t.materialIndex);
                else
                    for (c = 0; c < f.length; c += 3) b(f[c], f[c + 1], f[c + 2]);
            else
                for (c = 0; c < d.length / 3; c += 3) b(c, c + 1, c + 2);
            this.computeFaceNormals();
            null !== a.boundingBox && (this.boundingBox = a.boundingBox.clone());
            null !== a.boundingSphere && (this.boundingSphere = a.boundingSphere.clone());
            return this
        },
        center: function() {
            this.computeBoundingBox();
            var a = this.boundingBox.center().negate();
            this.translate(a.x, a.y, a.z);
            return a
        },
        normalize: function() {
            this.computeBoundingSphere();
            var a = this.boundingSphere.center,
                b = this.boundingSphere.radius,
                b = 0 === b ? 1 : 1 / b,
                e = new z;
            e.set(b, 0, 0, -b * a.x, 0, b, 0, -b * a.y, 0, 0, b, -b * a.z, 0, 0, 0, 1);
            this.applyMatrix(e);
            return this
        },
        computeFaceNormals: function() {
            for (var a = new r, b = new r, e = 0, f = this.faces.length; e < f; e++) {
                var c = this.faces[e],
                    d = this.vertices[c.a],
                    k = this.vertices[c.b];
                a.subVectors(this.vertices[c.c], k);
                b.subVectors(d, k);
                a.cross(b);
                a.normalize();
                c.normal.copy(a)
            }
        },
        computeVertexNormals: function(a) {
            void 0 === a && (a = !0);
            var b, e, f;
            f = Array(this.vertices.length);
            b = 0;
            for (e = this.vertices.length; b < e; b++) f[b] = new r;
            if (a) {
                var c, d, k, g = new r,
                    h = new r;
                a = 0;
                for (b = this.faces.length; a < b; a++) e = this.faces[a], c = this.vertices[e.a], d = this.vertices[e.b], k = this.vertices[e.c], g.subVectors(k, d), h.subVectors(c, d), g.cross(h), f[e.a].add(g), f[e.b].add(g), f[e.c].add(g)
            } else
                for (a = 0, b = this.faces.length; a < b; a++) e = this.faces[a], f[e.a].add(e.normal), f[e.b].add(e.normal), f[e.c].add(e.normal);
            b = 0;
            for (e = this.vertices.length; b < e; b++) f[b].normalize();
            a = 0;
            for (b = this.faces.length; a < b; a++) e = this.faces[a], c = e.vertexNormals, 3 === c.length ? (c[0].copy(f[e.a]), c[1].copy(f[e.b]), c[2].copy(f[e.c])) : (c[0] = f[e.a].clone(), c[1] = f[e.b].clone(), c[2] = f[e.c].clone());
            0 < this.faces.length && (this.normalsNeedUpdate = !0)
        },
        computeMorphNormals: function() {
            var a, b, e, f, c;
            e = 0;
            for (f = this.faces.length; e < f; e++)
                for (c = this.faces[e], c.__originalFaceNormal ? c.__originalFaceNormal.copy(c.normal) : c.__originalFaceNormal = c.normal.clone(),
                    c.__originalVertexNormals || (c.__originalVertexNormals = []), a = 0, b = c.vertexNormals.length; a < b; a++) c.__originalVertexNormals[a] ? c.__originalVertexNormals[a].copy(c.vertexNormals[a]) : c.__originalVertexNormals[a] = c.vertexNormals[a].clone();
            var d = new ba;
            d.faces = this.faces;
            a = 0;
            for (b = this.morphTargets.length; a < b; a++) {
                if (!this.morphNormals[a]) {
                    this.morphNormals[a] = {};
                    this.morphNormals[a].faceNormals = [];
                    this.morphNormals[a].vertexNormals = [];
                    c = this.morphNormals[a].faceNormals;
                    var k = this.morphNormals[a].vertexNormals,
                        g, h;
                    e = 0;
                    for (f = this.faces.length; e < f; e++) g = new r, h = {
                        a: new r,
                        b: new r,
                        c: new r
                    }, c.push(g), k.push(h)
                }
                k = this.morphNormals[a];
                d.vertices = this.morphTargets[a].vertices;
                d.computeFaceNormals();
                d.computeVertexNormals();
                e = 0;
                for (f = this.faces.length; e < f; e++) c = this.faces[e], g = k.faceNormals[e], h = k.vertexNormals[e], g.copy(c.normal), h.a.copy(c.vertexNormals[0]), h.b.copy(c.vertexNormals[1]), h.c.copy(c.vertexNormals[2])
            }
            e = 0;
            for (f = this.faces.length; e < f; e++) c = this.faces[e], c.normal = c.__originalFaceNormal, c.vertexNormals =
                c.__originalVertexNormals
        },
        computeTangents: function() {
            console.warn("THREE.Geometry: .computeTangents() has been removed.")
        },
        computeLineDistances: function() {
            for (var a = 0, b = this.vertices, e = 0, f = b.length; e < f; e++) 0 < e && (a += b[e].distanceTo(b[e - 1])), this.lineDistances[e] = a
        },
        computeBoundingBox: function() {
            null === this.boundingBox && (this.boundingBox = new Qa);
            this.boundingBox.setFromPoints(this.vertices)
        },
        computeBoundingSphere: function() {
            null === this.boundingSphere && (this.boundingSphere = new La);
            this.boundingSphere.setFromPoints(this.vertices)
        },
        merge: function(a, b, e) {
            if (!1 === (a && a.isGeometry)) console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", a);
            else {
                var f, c = this.vertices.length,
                    d = this.vertices,
                    k = a.vertices,
                    g = this.faces,
                    h = a.faces,
                    l = this.faceVertexUvs[0];
                a = a.faceVertexUvs[0];
                void 0 === e && (e = 0);
                void 0 !== b && (f = (new Ta).getNormalMatrix(b));
                for (var m = 0, n = k.length; m < n; m++) {
                    var y = k[m].clone();
                    void 0 !== b && y.applyMatrix4(b);
                    d.push(y)
                }
                m = 0;
                for (n = h.length; m < n; m++) {
                    var k = h[m],
                        w, t = k.vertexNormals,
                        A = k.vertexColors,
                        y = new ja(k.a +
                            c, k.b + c, k.c + c);
                    y.normal.copy(k.normal);
                    void 0 !== f && y.normal.applyMatrix3(f).normalize();
                    b = 0;
                    for (d = t.length; b < d; b++) w = t[b].clone(), void 0 !== f && w.applyMatrix3(f).normalize(), y.vertexNormals.push(w);
                    y.color.copy(k.color);
                    b = 0;
                    for (d = A.length; b < d; b++) w = A[b], y.vertexColors.push(w.clone());
                    y.materialIndex = k.materialIndex + e;
                    g.push(y)
                }
                m = 0;
                for (n = a.length; m < n; m++)
                    if (e = a[m], f = [], void 0 !== e) {
                        b = 0;
                        for (d = e.length; b < d; b++) f.push(e[b].clone());
                        l.push(f)
                    }
            }
        },
        mergeMesh: function(a) {
            !1 === (a && a.isMesh) ? console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.",
                a) : (a.matrixAutoUpdate && a.updateMatrix(), this.merge(a.geometry, a.matrix))
        },
        mergeVertices: function() {
            var a = {},
                b = [],
                e = [],
                f, c = Math.pow(10, 4),
                d, k;
            d = 0;
            for (k = this.vertices.length; d < k; d++) f = this.vertices[d], f = Math.round(f.x * c) + "_" + Math.round(f.y * c) + "_" + Math.round(f.z * c), void 0 === a[f] ? (a[f] = d, b.push(this.vertices[d]), e[d] = b.length - 1) : e[d] = e[a[f]];
            a = [];
            d = 0;
            for (k = this.faces.length; d < k; d++)
                for (c = this.faces[d], c.a = e[c.a], c.b = e[c.b], c.c = e[c.c], c = [c.a, c.b, c.c], f = 0; 3 > f; f++)
                    if (c[f] === c[(f + 1) % 3]) {
                        a.push(d);
                        break
                    }
            for (d =
                a.length - 1; 0 <= d; d--)
                for (c = a[d], this.faces.splice(c, 1), e = 0, k = this.faceVertexUvs.length; e < k; e++) this.faceVertexUvs[e].splice(c, 1);
            d = this.vertices.length - b.length;
            this.vertices = b;
            return d
        },
        sortFacesByMaterialIndex: function() {
            for (var a = this.faces, b = a.length, e = 0; e < b; e++) a[e]._id = e;
            a.sort(function(a, b) {
                return a.materialIndex - b.materialIndex
            });
            var f = this.faceVertexUvs[0],
                c = this.faceVertexUvs[1],
                d, k;
            f && f.length === b && (d = []);
            c && c.length === b && (k = []);
            for (e = 0; e < b; e++) {
                var g = a[e]._id;
                d && d.push(f[g]);
                k && k.push(c[g])
            }
            d &&
                (this.faceVertexUvs[0] = d);
            k && (this.faceVertexUvs[1] = k)
        },
        toJSON: function() {
            function a(a, b, e) {
                return e ? a | 1 << b : a & ~(1 << b)
            }

            function b(a) {
                var b = a.x.toString() + a.y.toString() + a.z.toString();
                if (void 0 !== l[b]) return l[b];
                l[b] = h.length / 3;
                h.push(a.x, a.y, a.z);
                return l[b]
            }

            function e(a) {
                var b = a.r.toString() + a.g.toString() + a.b.toString();
                if (void 0 !== n[b]) return n[b];
                n[b] = m.length;
                m.push(a.getHex());
                return n[b]
            }

            function f(a) {
                var b = a.x.toString() + a.y.toString();
                if (void 0 !== w[b]) return w[b];
                w[b] = y.length / 2;
                y.push(a.x,
                    a.y);
                return w[b]
            }
            var c = {
                metadata: {
                    version: 4.4,
                    type: "Geometry",
                    generator: "Geometry.toJSON"
                }
            };
            c.uuid = this.uuid;
            c.type = this.type;
            "" !== this.name && (c.name = this.name);
            if (void 0 !== this.parameters) {
                var d = this.parameters,
                    k;
                for (k in d) void 0 !== d[k] && (c[k] = d[k]);
                return c
            }
            d = [];
            for (k = 0; k < this.vertices.length; k++) {
                var g = this.vertices[k];
                d.push(g.x, g.y, g.z)
            }
            var g = [],
                h = [],
                l = {},
                m = [],
                n = {},
                y = [],
                w = {};
            for (k = 0; k < this.faces.length; k++) {
                var t = this.faces[k],
                    A = void 0 !== this.faceVertexUvs[0][k],
                    r = 0 < t.normal.length(),
                    p = 0 < t.vertexNormals.length,
                    v = 1 !== t.color.r || 1 !== t.color.g || 1 !== t.color.b,
                    u = 0 < t.vertexColors.length,
                    E = 0,
                    E = a(E, 0, 0),
                    E = a(E, 1, !0),
                    E = a(E, 2, !1),
                    E = a(E, 3, A),
                    E = a(E, 4, r),
                    E = a(E, 5, p),
                    E = a(E, 6, v),
                    E = a(E, 7, u);
                g.push(E);
                g.push(t.a, t.b, t.c);
                g.push(t.materialIndex);
                A && (A = this.faceVertexUvs[0][k], g.push(f(A[0]), f(A[1]), f(A[2])));
                r && g.push(b(t.normal));
                p && (r = t.vertexNormals, g.push(b(r[0]), b(r[1]), b(r[2])));
                v && g.push(e(t.color));
                u && (t = t.vertexColors, g.push(e(t[0]), e(t[1]), e(t[2])))
            }
            c.data = {};
            c.data.vertices = d;
            c.data.normals = h;
            0 < m.length && (c.data.colors =
                m);
            0 < y.length && (c.data.uvs = [y]);
            c.data.faces = g;
            return c
        },
        clone: function() {
            return (new ba).copy(this)
        },
        copy: function(a) {
            this.vertices = [];
            this.faces = [];
            this.faceVertexUvs = [
                []
            ];
            for (var b = a.vertices, e = 0, f = b.length; e < f; e++) this.vertices.push(b[e].clone());
            b = a.faces;
            e = 0;
            for (f = b.length; e < f; e++) this.faces.push(b[e].clone());
            e = 0;
            for (f = a.faceVertexUvs.length; e < f; e++) {
                b = a.faceVertexUvs[e];
                void 0 === this.faceVertexUvs[e] && (this.faceVertexUvs[e] = []);
                for (var c = 0, d = b.length; c < d; c++) {
                    for (var k = b[c], g = [], h = 0, l = k.length; h <
                        l; h++) g.push(k[h].clone());
                    this.faceVertexUvs[e].push(g)
                }
            }
            return this
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    });
    var Ld = 0;
    Object.assign(Z.prototype, p.prototype, {
        computeBoundingBox: ba.prototype.computeBoundingBox,
        computeBoundingSphere: ba.prototype.computeBoundingSphere,
        computeFaceNormals: function() {
            console.warn("THREE.DirectGeometry: computeFaceNormals() is not a method of this type of geometry.")
        },
        computeVertexNormals: function() {
            console.warn("THREE.DirectGeometry: computeVertexNormals() is not a method of this type of geometry.")
        },
        computeGroups: function(a) {
            var b, e = [],
                f;
            a = a.faces;
            for (var c = 0; c < a.length; c++) {
                var d = a[c];
                d.materialIndex !== f && (f = d.materialIndex, void 0 !== b && (b.count = 3 * c - b.start, e.push(b)), b = {
                    start: 3 * c,
                    materialIndex: f
                })
            }
            void 0 !== b && (b.count = 3 * c - b.start, e.push(b));
            this.groups = e
        },
        fromGeometry: function(a) {
            var b = a.faces,
                e = a.vertices,
                f = a.faceVertexUvs,
                c = f[0] && 0 < f[0].length,
                d = f[1] && 0 < f[1].length,
                k = a.morphTargets,
                g = k.length,
                h;
            if (0 < g) {
                h = [];
                for (var l = 0; l < g; l++) h[l] = [];
                this.morphTargets.position = h
            }
            var m = a.morphNormals,
                n = m.length,
                y;
            if (0 < n) {
                y = [];
                for (l = 0; l < n; l++) y[l] = [];
                this.morphTargets.normal = y
            }
            for (var w = a.skinIndices, t = a.skinWeights, A = w.length === e.length, r = t.length === e.length, l = 0; l < b.length; l++) {
                var p = b[l];
                this.vertices.push(e[p.a], e[p.b], e[p.c]);
                var u = p.vertexNormals;
                3 === u.length ? this.normals.push(u[0], u[1], u[2]) : (u = p.normal, this.normals.push(u, u, u));
                u = p.vertexColors;
                3 === u.length ? this.colors.push(u[0], u[1], u[2]) : (u = p.color, this.colors.push(u, u, u));
                !0 === c && (u = f[0][l], void 0 !== u ? this.uvs.push(u[0], u[1], u[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ",
                    l), this.uvs.push(new v, new v, new v)));
                !0 === d && (u = f[1][l], void 0 !== u ? this.uvs2.push(u[0], u[1], u[2]) : (console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ", l), this.uvs2.push(new v, new v, new v)));
                for (u = 0; u < g; u++) {
                    var E = k[u].vertices;
                    h[u].push(E[p.a], E[p.b], E[p.c])
                }
                for (u = 0; u < n; u++) E = m[u].vertexNormals[l], y[u].push(E.a, E.b, E.c);
                A && this.skinIndices.push(w[p.a], w[p.b], w[p.c]);
                r && this.skinWeights.push(t[p.a], t[p.b], t[p.c])
            }
            this.computeGroups(a);
            this.verticesNeedUpdate = a.verticesNeedUpdate;
            this.normalsNeedUpdate = a.normalsNeedUpdate;
            this.colorsNeedUpdate = a.colorsNeedUpdate;
            this.uvsNeedUpdate = a.uvsNeedUpdate;
            this.groupsNeedUpdate = a.groupsNeedUpdate;
            return this
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    });
    Object.assign(W.prototype, p.prototype, {
        isBufferGeometry: !0,
        getIndex: function() {
            return this.index
        },
        setIndex: function(a) {
            this.index = a
        },
        addAttribute: function(a, b, e) {
            if (!1 === (b && b.isBufferAttribute) && !1 === (b && b.isInterleavedBufferAttribute)) console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),
                this.addAttribute(a, new J(b, e));
            else if ("index" === a) console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."), this.setIndex(b);
            else return this.attributes[a] = b, this
        },
        getAttribute: function(a) {
            return this.attributes[a]
        },
        removeAttribute: function(a) {
            delete this.attributes[a];
            return this
        },
        addGroup: function(a, b, e) {
            this.groups.push({
                start: a,
                count: b,
                materialIndex: void 0 !== e ? e : 0
            })
        },
        clearGroups: function() {
            this.groups = []
        },
        setDrawRange: function(a, b) {
            this.drawRange.start = a;
            this.drawRange.count =
                b
        },
        applyMatrix: function(a) {
            var b = this.attributes.position;
            void 0 !== b && (a.applyToVector3Array(b.array), b.needsUpdate = !0);
            b = this.attributes.normal;
            void 0 !== b && ((new Ta).getNormalMatrix(a).applyToVector3Array(b.array), b.needsUpdate = !0);
            null !== this.boundingBox && this.computeBoundingBox();
            null !== this.boundingSphere && this.computeBoundingSphere();
            return this
        },
        rotateX: function() {
            var a;
            return function(b) {
                void 0 === a && (a = new z);
                a.makeRotationX(b);
                this.applyMatrix(a);
                return this
            }
        }(),
        rotateY: function() {
            var a;
            return function(b) {
                void 0 ===
                    a && (a = new z);
                a.makeRotationY(b);
                this.applyMatrix(a);
                return this
            }
        }(),
        rotateZ: function() {
            var a;
            return function(b) {
                void 0 === a && (a = new z);
                a.makeRotationZ(b);
                this.applyMatrix(a);
                return this
            }
        }(),
        translate: function() {
            var a;
            return function(b, e, f) {
                void 0 === a && (a = new z);
                a.makeTranslation(b, e, f);
                this.applyMatrix(a);
                return this
            }
        }(),
        scale: function() {
            var a;
            return function(b, e, f) {
                void 0 === a && (a = new z);
                a.makeScale(b, e, f);
                this.applyMatrix(a);
                return this
            }
        }(),
        lookAt: function() {
            var a;
            return function(b) {
                void 0 === a && (a =
                    new M);
                a.lookAt(b);
                a.updateMatrix();
                this.applyMatrix(a.matrix)
            }
        }(),
        center: function() {
            this.computeBoundingBox();
            var a = this.boundingBox.center().negate();
            this.translate(a.x, a.y, a.z);
            return a
        },
        setFromObject: function(a) {
            var b = a.geometry;
            if (a && a.isPoints || a && a.isLine) {
                a = new bb(3 * b.vertices.length, 3);
                var e = new bb(3 * b.colors.length, 3);
                this.addAttribute("position", a.copyVector3sArray(b.vertices));
                this.addAttribute("color", e.copyColorsArray(b.colors));
                b.lineDistances && b.lineDistances.length === b.vertices.length &&
                    (a = new bb(b.lineDistances.length, 1), this.addAttribute("lineDistance", a.copyArray(b.lineDistances)));
                null !== b.boundingSphere && (this.boundingSphere = b.boundingSphere.clone());
                null !== b.boundingBox && (this.boundingBox = b.boundingBox.clone())
            } else a && a.isMesh && b && b.isGeometry && this.fromGeometry(b);
            return this
        },
        updateFromObject: function(a) {
            var b = a.geometry;
            if (a && a.isMesh) {
                var e = b.__directGeometry;
                !0 === b.elementsNeedUpdate && (e = void 0, b.elementsNeedUpdate = !1);
                if (void 0 === e) return this.fromGeometry(b);
                e.verticesNeedUpdate =
                    b.verticesNeedUpdate;
                e.normalsNeedUpdate = b.normalsNeedUpdate;
                e.colorsNeedUpdate = b.colorsNeedUpdate;
                e.uvsNeedUpdate = b.uvsNeedUpdate;
                e.groupsNeedUpdate = b.groupsNeedUpdate;
                b.verticesNeedUpdate = !1;
                b.normalsNeedUpdate = !1;
                b.colorsNeedUpdate = !1;
                b.uvsNeedUpdate = !1;
                b.groupsNeedUpdate = !1;
                b = e
            }!0 === b.verticesNeedUpdate && (e = this.attributes.position, void 0 !== e && (e.copyVector3sArray(b.vertices), e.needsUpdate = !0), b.verticesNeedUpdate = !1);
            !0 === b.normalsNeedUpdate && (e = this.attributes.normal, void 0 !== e && (e.copyVector3sArray(b.normals),
                e.needsUpdate = !0), b.normalsNeedUpdate = !1);
            !0 === b.colorsNeedUpdate && (e = this.attributes.color, void 0 !== e && (e.copyColorsArray(b.colors), e.needsUpdate = !0), b.colorsNeedUpdate = !1);
            b.uvsNeedUpdate && (e = this.attributes.uv, void 0 !== e && (e.copyVector2sArray(b.uvs), e.needsUpdate = !0), b.uvsNeedUpdate = !1);
            b.lineDistancesNeedUpdate && (e = this.attributes.lineDistance, void 0 !== e && (e.copyArray(b.lineDistances), e.needsUpdate = !0), b.lineDistancesNeedUpdate = !1);
            b.groupsNeedUpdate && (b.computeGroups(a.geometry), this.groups =
                b.groups, b.groupsNeedUpdate = !1);
            return this
        },
        fromGeometry: function(a) {
            a.__directGeometry = (new Z).fromGeometry(a);
            return this.fromDirectGeometry(a.__directGeometry)
        },
        fromDirectGeometry: function(a) {
            var b = new Float32Array(3 * a.vertices.length);
            this.addAttribute("position", (new J(b, 3)).copyVector3sArray(a.vertices));
            0 < a.normals.length && (b = new Float32Array(3 * a.normals.length), this.addAttribute("normal", (new J(b, 3)).copyVector3sArray(a.normals)));
            0 < a.colors.length && (b = new Float32Array(3 * a.colors.length),
                this.addAttribute("color", (new J(b, 3)).copyColorsArray(a.colors)));
            0 < a.uvs.length && (b = new Float32Array(2 * a.uvs.length), this.addAttribute("uv", (new J(b, 2)).copyVector2sArray(a.uvs)));
            0 < a.uvs2.length && (b = new Float32Array(2 * a.uvs2.length), this.addAttribute("uv2", (new J(b, 2)).copyVector2sArray(a.uvs2)));
            0 < a.indices.length && (b = new(65535 < a.vertices.length ? Uint32Array : Uint16Array)(3 * a.indices.length), this.setIndex((new J(b, 1)).copyIndicesArray(a.indices)));
            this.groups = a.groups;
            for (var e in a.morphTargets) {
                for (var b = [], f = a.morphTargets[e], c = 0, d = f.length; c < d; c++) {
                    var k = f[c],
                        g = new bb(3 * k.length, 3);
                    b.push(g.copyVector3sArray(k))
                }
                this.morphAttributes[e] = b
            }
            0 < a.skinIndices.length && (e = new bb(4 * a.skinIndices.length, 4), this.addAttribute("skinIndex", e.copyVector4sArray(a.skinIndices)));
            0 < a.skinWeights.length && (e = new bb(4 * a.skinWeights.length, 4), this.addAttribute("skinWeight", e.copyVector4sArray(a.skinWeights)));
            null !== a.boundingSphere && (this.boundingSphere = a.boundingSphere.clone());
            null !== a.boundingBox && (this.boundingBox =
                a.boundingBox.clone());
            return this
        },
        computeBoundingBox: function() {
            null === this.boundingBox && (this.boundingBox = new Qa);
            var a = this.attributes.position.array;
            void 0 !== a ? this.boundingBox.setFromArray(a) : this.boundingBox.makeEmpty();
            (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
        },
        computeBoundingSphere: function() {
            var a =
                new Qa,
                b = new r;
            return function() {
                null === this.boundingSphere && (this.boundingSphere = new La);
                var e = this.attributes.position;
                if (e) {
                    var e = e.array,
                        f = this.boundingSphere.center;
                    a.setFromArray(e);
                    a.center(f);
                    for (var c = 0, d = 0, k = e.length; d < k; d += 3) b.fromArray(e, d), c = Math.max(c, f.distanceToSquared(b));
                    this.boundingSphere.radius = Math.sqrt(c);
                    isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
                        this)
                }
            }
        }(),
        computeFaceNormals: function() {},
        computeVertexNormals: function() {
            var a = this.index,
                b = this.attributes,
                e = this.groups;
            if (b.position) {
                var f = b.position.array;
                if (void 0 === b.normal) this.addAttribute("normal", new J(new Float32Array(f.length), 3));
                else
                    for (var c = b.normal.array, d = 0, k = c.length; d < k; d++) c[d] = 0;
                var c = b.normal.array,
                    g, h, l, m = new r,
                    n = new r,
                    y = new r,
                    w = new r,
                    t = new r;
                if (a) {
                    a = a.array;
                    0 === e.length && this.addGroup(0, a.length);
                    for (var A = 0, p = e.length; A < p; ++A)
                        for (d = e[A], k = d.start, g = d.count, d = k, k += g; d <
                            k; d += 3) g = 3 * a[d + 0], h = 3 * a[d + 1], l = 3 * a[d + 2], m.fromArray(f, g), n.fromArray(f, h), y.fromArray(f, l), w.subVectors(y, n), t.subVectors(m, n), w.cross(t), c[g] += w.x, c[g + 1] += w.y, c[g + 2] += w.z, c[h] += w.x, c[h + 1] += w.y, c[h + 2] += w.z, c[l] += w.x, c[l + 1] += w.y, c[l + 2] += w.z
                } else
                    for (d = 0, k = f.length; d < k; d += 9) m.fromArray(f, d), n.fromArray(f, d + 3), y.fromArray(f, d + 6), w.subVectors(y, n), t.subVectors(m, n), w.cross(t), c[d] = w.x, c[d + 1] = w.y, c[d + 2] = w.z, c[d + 3] = w.x, c[d + 4] = w.y, c[d + 5] = w.z, c[d + 6] = w.x, c[d + 7] = w.y, c[d + 8] = w.z;
                this.normalizeNormals();
                b.normal.needsUpdate = !0
            }
        },
        merge: function(a, b) {
            if (!1 === (a && a.isBufferGeometry)) console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", a);
            else {
                void 0 === b && (b = 0);
                var e = this.attributes,
                    f;
                for (f in e)
                    if (void 0 !== a.attributes[f])
                        for (var c = e[f].array, d = a.attributes[f], k = d.array, g = 0, d = d.itemSize * b; g < k.length; g++, d++) c[d] = k[g];
                return this
            }
        },
        normalizeNormals: function() {
            for (var a = this.attributes.normal.array, b, e, f, c = 0, d = a.length; c < d; c += 3) b = a[c], e = a[c + 1], f = a[c + 2], b = 1 / Math.sqrt(b * b + e * e + f * f),
                a[c] *= b, a[c + 1] *= b, a[c + 2] *= b
        },
        toNonIndexed: function() {
            if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."), this;
            var a = new W,
                b = this.index.array,
                e = this.attributes,
                f;
            for (f in e) {
                for (var c = e[f], d = c.array, c = c.itemSize, k = new d.constructor(b.length * c), g, h = 0, l = 0, m = b.length; l < m; l++) {
                    g = b[l] * c;
                    for (var n = 0; n < c; n++) k[h++] = d[g++]
                }
                a.addAttribute(f, new J(k, c))
            }
            return a
        },
        toJSON: function() {
            var a = {
                metadata: {
                    version: 4.4,
                    type: "BufferGeometry",
                    generator: "BufferGeometry.toJSON"
                }
            };
            a.uuid = this.uuid;
            a.type = this.type;
            "" !== this.name && (a.name = this.name);
            if (void 0 !== this.parameters) {
                var b = this.parameters,
                    e;
                for (e in b) void 0 !== b[e] && (a[e] = b[e]);
                return a
            }
            a.data = {
                attributes: {}
            };
            var f = this.index;
            null !== f && (b = Array.prototype.slice.call(f.array), a.data.index = {
                type: f.array.constructor.name,
                array: b
            });
            f = this.attributes;
            for (e in f) {
                var c = f[e],
                    b = Array.prototype.slice.call(c.array);
                a.data.attributes[e] = {
                    itemSize: c.itemSize,
                    type: c.array.constructor.name,
                    array: b,
                    normalized: c.normalized
                }
            }
            e = this.groups;
            0 < e.length && (a.data.groups = JSON.parse(JSON.stringify(e)));
            e = this.boundingSphere;
            null !== e && (a.data.boundingSphere = {
                center: e.center.toArray(),
                radius: e.radius
            });
            return a
        },
        clone: function() {
            return (new W).copy(this)
        },
        copy: function(a) {
            var b = a.index;
            null !== b && this.setIndex(b.clone());
            var b = a.attributes,
                e;
            for (e in b) this.addAttribute(e, b[e].clone());
            a = a.groups;
            e = 0;
            for (b = a.length; e < b; e++) {
                var f = a[e];
                this.addGroup(f.start, f.count, f.materialIndex)
            }
            return this
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            })
        }
    });
    W.MaxIndex = 65535;
    cc.prototype = Object.create(P.prototype);
    cc.prototype.constructor = cc;
    cc.prototype.isWebGLRenderTargetCube = !0;
    dc.prototype = Object.create(W.prototype);
    dc.prototype.constructor = dc;
    Gb.prototype = {
        constructor: Gb,
        set: function(a, b) {
            this.origin.copy(a);
            this.direction.copy(b);
            return this
        },
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            this.origin.copy(a.origin);
            this.direction.copy(a.direction);
            return this
        },
        at: function(a, b) {
            return (b || new r).copy(this.direction).multiplyScalar(a).add(this.origin)
        },
        lookAt: function(a) {
            this.direction.copy(a).sub(this.origin).normalize();
            return this
        },
        recast: function() {
            var a = new r;
            return function(b) {
                this.origin.copy(this.at(b, a));
                return this
            }
        }(),
        closestPointToPoint: function(a, b) {
            b = b || new r;
            b.subVectors(a, this.origin);
            a = b.dot(this.direction);
            return 0 > a ? b.copy(this.origin) : b.copy(this.direction).multiplyScalar(a).add(this.origin)
        },
        distanceToPoint: function(a) {
            return Math.sqrt(this.distanceSqToPoint(a))
        },
        distanceSqToPoint: function() {
            var a = new r;
            return function(b) {
                var e =
                    a.subVectors(b, this.origin).dot(this.direction);
                if (0 > e) return this.origin.distanceToSquared(b);
                a.copy(this.direction).multiplyScalar(e).add(this.origin);
                return a.distanceToSquared(b)
            }
        }(),
        distanceSqToSegment: function() {
            var a = new r,
                b = new r,
                e = new r;
            return function(f, c, d, k) {
                a.copy(f).add(c).multiplyScalar(.5);
                b.copy(c).sub(f).normalize();
                e.copy(this.origin).sub(a);
                var g = .5 * f.distanceTo(c),
                    h = -this.direction.dot(b),
                    l = e.dot(this.direction),
                    m = -e.dot(b),
                    n = e.lengthSq(),
                    y = Math.abs(1 - h * h),
                    w;
                0 < y ? (f = h * m - l, c = h *
                    l - m, w = g * y, 0 <= f ? c >= -w ? c <= w ? (g = 1 / y, f *= g, c *= g, h = f * (f + h * c + 2 * l) + c * (h * f + c + 2 * m) + n) : (c = g, f = Math.max(0, -(h * c + l)), h = -f * f + c * (c + 2 * m) + n) : (c = -g, f = Math.max(0, -(h * c + l)), h = -f * f + c * (c + 2 * m) + n) : c <= -w ? (f = Math.max(0, -(-h * g + l)), c = 0 < f ? -g : Math.min(Math.max(-g, -m), g), h = -f * f + c * (c + 2 * m) + n) : c <= w ? (f = 0, c = Math.min(Math.max(-g, -m), g), h = c * (c + 2 * m) + n) : (f = Math.max(0, -(h * g + l)), c = 0 < f ? g : Math.min(Math.max(-g, -m), g), h = -f * f + c * (c + 2 * m) + n)) : (c = 0 < h ? -g : g, f = Math.max(0, -(h * c + l)), h = -f * f + c * (c + 2 * m) + n);
                d && d.copy(this.direction).multiplyScalar(f).add(this.origin);
                k && k.copy(b).multiplyScalar(c).add(a);
                return h
            }
        }(),
        intersectSphere: function() {
            var a = new r;
            return function(b, e) {
                a.subVectors(b.center, this.origin);
                var f = a.dot(this.direction),
                    c = a.dot(a) - f * f;
                b = b.radius * b.radius;
                if (c > b) return null;
                b = Math.sqrt(b - c);
                c = f - b;
                f += b;
                return 0 > c && 0 > f ? null : 0 > c ? this.at(f, e) : this.at(c, e)
            }
        }(),
        intersectsSphere: function(a) {
            return this.distanceToPoint(a.center) <= a.radius
        },
        distanceToPlane: function(a) {
            var b = a.normal.dot(this.direction);
            if (0 === b) return 0 === a.distanceToPoint(this.origin) ?
                0 : null;
            a = -(this.origin.dot(a.normal) + a.constant) / b;
            return 0 <= a ? a : null
        },
        intersectPlane: function(a, b) {
            a = this.distanceToPlane(a);
            return null === a ? null : this.at(a, b)
        },
        intersectsPlane: function(a) {
            var b = a.distanceToPoint(this.origin);
            return 0 === b || 0 > a.normal.dot(this.direction) * b ? !0 : !1
        },
        intersectBox: function(a, b) {
            var e, f, c, d;
            f = 1 / this.direction.x;
            d = 1 / this.direction.y;
            var k = 1 / this.direction.z,
                g = this.origin;
            0 <= f ? (e = (a.min.x - g.x) * f, f *= a.max.x - g.x) : (e = (a.max.x - g.x) * f, f *= a.min.x - g.x);
            0 <= d ? (c = (a.min.y - g.y) * d, d *=
                a.max.y - g.y) : (c = (a.max.y - g.y) * d, d *= a.min.y - g.y);
            if (e > d || c > f) return null;
            if (c > e || e !== e) e = c;
            if (d < f || f !== f) f = d;
            0 <= k ? (c = (a.min.z - g.z) * k, a = (a.max.z - g.z) * k) : (c = (a.max.z - g.z) * k, a = (a.min.z - g.z) * k);
            if (e > a || c > f) return null;
            if (c > e || e !== e) e = c;
            if (a < f || f !== f) f = a;
            return 0 > f ? null : this.at(0 <= e ? e : f, b)
        },
        intersectsBox: function() {
            var a = new r;
            return function(b) {
                return null !== this.intersectBox(b, a)
            }
        }(),
        intersectTriangle: function() {
            var a = new r,
                b = new r,
                e = new r,
                f = new r;
            return function(c, d, k, g, h) {
                b.subVectors(d, c);
                e.subVectors(k,
                    c);
                f.crossVectors(b, e);
                d = this.direction.dot(f);
                if (0 < d) {
                    if (g) return null;
                    g = 1
                } else if (0 > d) g = -1, d = -d;
                else return null;
                a.subVectors(this.origin, c);
                c = g * this.direction.dot(e.crossVectors(a, e));
                if (0 > c) return null;
                k = g * this.direction.dot(b.cross(a));
                if (0 > k || c + k > d) return null;
                c = -g * a.dot(f);
                return 0 > c ? null : this.at(c / d, h)
            }
        }(),
        applyMatrix4: function(a) {
            this.direction.add(this.origin).applyMatrix4(a);
            this.origin.applyMatrix4(a);
            this.direction.sub(this.origin);
            this.direction.normalize();
            return this
        },
        equals: function(a) {
            return a.origin.equals(this.origin) &&
                a.direction.equals(this.direction)
        }
    };
    Va.prototype = {
        constructor: Va,
        set: function(a, b) {
            this.start.copy(a);
            this.end.copy(b);
            return this
        },
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            this.start.copy(a.start);
            this.end.copy(a.end);
            return this
        },
        center: function(a) {
            return (a || new r).addVectors(this.start, this.end).multiplyScalar(.5)
        },
        delta: function(a) {
            return (a || new r).subVectors(this.end, this.start)
        },
        distanceSq: function() {
            return this.start.distanceToSquared(this.end)
        },
        distance: function() {
            return this.start.distanceTo(this.end)
        },
        at: function(a, b) {
            b = b || new r;
            return this.delta(b).multiplyScalar(a).add(this.start)
        },
        closestPointToPointParameter: function() {
            var a = new r,
                b = new r;
            return function(e, f) {
                a.subVectors(e, this.start);
                b.subVectors(this.end, this.start);
                e = b.dot(b);
                e = b.dot(a) / e;
                f && (e = d.Math.clamp(e, 0, 1));
                return e
            }
        }(),
        closestPointToPoint: function(a, b, e) {
            a = this.closestPointToPointParameter(a, b);
            e = e || new r;
            return this.delta(e).multiplyScalar(a).add(this.start)
        },
        applyMatrix4: function(a) {
            this.start.applyMatrix4(a);
            this.end.applyMatrix4(a);
            return this
        },
        equals: function(a) {
            return a.start.equals(this.start) && a.end.equals(this.end)
        }
    };
    hb.normal = function() {
        var a = new r;
        return function(b, e, f, c) {
            c = c || new r;
            c.subVectors(f, e);
            a.subVectors(b, e);
            c.cross(a);
            b = c.lengthSq();
            return 0 < b ? c.multiplyScalar(1 / Math.sqrt(b)) : c.set(0, 0, 0)
        }
    }();
    hb.barycoordFromPoint = function() {
        var a = new r,
            b = new r,
            e = new r;
        return function(f, c, d, k, g) {
            a.subVectors(k, c);
            b.subVectors(d, c);
            e.subVectors(f, c);
            f = a.dot(a);
            c = a.dot(b);
            d = a.dot(e);
            var h = b.dot(b);
            k = b.dot(e);
            var l = f * h - c * c;
            g =
                g || new r;
            if (0 === l) return g.set(-2, -1, -1);
            l = 1 / l;
            h = (h * d - c * k) * l;
            f = (f * k - c * d) * l;
            return g.set(1 - h - f, f, h)
        }
    }();
    hb.containsPoint = function() {
        var a = new r;
        return function(b, e, f, c) {
            b = hb.barycoordFromPoint(b, e, f, c, a);
            return 0 <= b.x && 0 <= b.y && 1 >= b.x + b.y
        }
    }();
    hb.prototype = {
        constructor: hb,
        set: function(a, b, e) {
            this.a.copy(a);
            this.b.copy(b);
            this.c.copy(e);
            return this
        },
        setFromPointsAndIndices: function(a, b, e, f) {
            this.a.copy(a[b]);
            this.b.copy(a[e]);
            this.c.copy(a[f]);
            return this
        },
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            this.a.copy(a.a);
            this.b.copy(a.b);
            this.c.copy(a.c);
            return this
        },
        area: function() {
            var a = new r,
                b = new r;
            return function() {
                a.subVectors(this.c, this.b);
                b.subVectors(this.a, this.b);
                return .5 * a.cross(b).length()
            }
        }(),
        midpoint: function(a) {
            return (a || new r).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
        },
        normal: function(a) {
            return hb.normal(this.a, this.b, this.c, a)
        },
        plane: function(a) {
            return (a || new Za).setFromCoplanarPoints(this.a, this.b, this.c)
        },
        barycoordFromPoint: function(a, b) {
            return hb.barycoordFromPoint(a,
                this.a, this.b, this.c, b)
        },
        containsPoint: function(a) {
            return hb.containsPoint(a, this.a, this.b, this.c)
        },
        closestPointToPoint: function() {
            var a, b, e, f;
            return function(c, d) {
                void 0 === a && (a = new Za, b = [new Va, new Va, new Va], e = new r, f = new r);
                d = d || new r;
                var k = Infinity;
                a.setFromCoplanarPoints(this.a, this.b, this.c);
                a.projectPoint(c, e);
                if (!0 === this.containsPoint(e)) d.copy(e);
                else
                    for (b[0].set(this.a, this.b), b[1].set(this.b, this.c), b[2].set(this.c, this.a), c = 0; c < b.length; c++) {
                        b[c].closestPointToPoint(e, !0, f);
                        var g = e.distanceToSquared(f);
                        g < k && (k = g, d.copy(f))
                    }
                return d
            }
        }(),
        equals: function(a) {
            return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c)
        }
    };
    cb.prototype = Object.create(K.prototype);
    cb.prototype.constructor = cb;
    cb.prototype.isMeshBasicMaterial = !0;
    cb.prototype.copy = function(a) {
        K.prototype.copy.call(this, a);
        this.color.copy(a.color);
        this.map = a.map;
        this.aoMap = a.aoMap;
        this.aoMapIntensity = a.aoMapIntensity;
        this.specularMap = a.specularMap;
        this.alphaMap = a.alphaMap;
        this.envMap = a.envMap;
        this.combine = a.combine;
        this.reflectivity = a.reflectivity;
        this.refractionRatio = a.refractionRatio;
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        this.wireframeLinecap = a.wireframeLinecap;
        this.wireframeLinejoin = a.wireframeLinejoin;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        return this
    };
    Na.prototype = Object.assign(Object.create(M.prototype), {
        constructor: Na,
        isMesh: !0,
        setDrawMode: function(a) {
            this.drawMode = a
        },
        copy: function(a) {
            M.prototype.copy.call(this, a);
            this.drawMode = a.drawMode;
            return this
        },
        updateMorphTargets: function() {
            if (void 0 !==
                this.geometry.morphTargets && 0 < this.geometry.morphTargets.length) {
                this.morphTargetBase = -1;
                this.morphTargetInfluences = [];
                this.morphTargetDictionary = {};
                for (var a = 0, b = this.geometry.morphTargets.length; a < b; a++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[a].name] = a
            }
        },
        getMorphTargetIndexByName: function(a) {
            if (void 0 !== this.morphTargetDictionary[a]) return this.morphTargetDictionary[a];
            console.warn("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0.");
            return 0
        },
        raycast: function() {
            function a(a, b, e, f, c, d, k) {
                hb.barycoordFromPoint(a, b, e, f, A);
                c.multiplyScalar(A.x);
                d.multiplyScalar(A.y);
                k.multiplyScalar(A.z);
                c.add(d).add(k);
                return c.clone()
            }

            function b(a, b, e, f, c, d, k) {
                var q = a.material;
                if (null === (1 === q.side ? e.intersectTriangle(d, c, f, !0, k) : e.intersectTriangle(f, c, d, 2 !== q.side, k))) return null;
                u.copy(k);
                u.applyMatrix4(a.matrixWorld);
                e = b.ray.origin.distanceTo(u);
                return e < b.near || e > b.far ? null : {
                    distance: e,
                    point: u.clone(),
                    object: a
                }
            }

            function e(e, f, c, d, q, l, D, m) {
                k.fromArray(d,
                    3 * l);
                g.fromArray(d, 3 * D);
                h.fromArray(d, 3 * m);
                if (e = b(e, f, c, k, g, h, p)) q && (y.fromArray(q, 2 * l), w.fromArray(q, 2 * D), t.fromArray(q, 2 * m), e.uv = a(p, k, g, h, y, w, t)), e.face = new ja(l, D, m, hb.normal(k, g, h)), e.faceIndex = l;
                return e
            }
            var f = new z,
                c = new Gb,
                d = new La,
                k = new r,
                g = new r,
                h = new r,
                l = new r,
                m = new r,
                n = new r,
                y = new v,
                w = new v,
                t = new v,
                A = new r,
                p = new r,
                u = new r;
            return function(A, r) {
                var u = this.geometry,
                    v = this.material,
                    E = this.matrixWorld;
                if (void 0 !== v && (null === u.boundingSphere && u.computeBoundingSphere(), d.copy(u.boundingSphere),
                        d.applyMatrix4(E), !1 !== A.ray.intersectsSphere(d) && (f.getInverse(E), c.copy(A.ray).applyMatrix4(f), null === u.boundingBox || !1 !== c.intersectsBox(u.boundingBox)))) {
                    var O, H;
                    if (u && u.isBufferGeometry) {
                        var T, B, v = u.index,
                            E = u.attributes,
                            u = E.position.array;
                        void 0 !== E.uv && (O = E.uv.array);
                        if (null !== v)
                            for (var E = v.array, z = 0, x = E.length; z < x; z += 3) {
                                if (v = E[z], T = E[z + 1], B = E[z + 2], H = e(this, A, c, u, O, v, T, B)) H.faceIndex = Math.floor(z / 3), r.push(H)
                            } else
                                for (z = 0, x = u.length; z < x; z += 9)
                                    if (v = z / 3, T = v + 1, B = v + 2, H = e(this, A, c, u, O, v, T, B)) H.index =
                                        v, r.push(H)
                    } else if (u && u.isGeometry) {
                        var L, N, E = v && v.isMultiMaterial,
                            z = !0 === E ? v.materials : null,
                            x = u.vertices;
                        T = u.faces;
                        B = u.faceVertexUvs[0];
                        0 < B.length && (O = B);
                        for (var Y = 0, ca = T.length; Y < ca; Y++) {
                            var P = T[Y];
                            H = !0 === E ? z[P.materialIndex] : v;
                            if (void 0 !== H) {
                                B = x[P.a];
                                L = x[P.b];
                                N = x[P.c];
                                if (!0 === H.morphTargets) {
                                    H = u.morphTargets;
                                    var G = this.morphTargetInfluences;
                                    k.set(0, 0, 0);
                                    g.set(0, 0, 0);
                                    h.set(0, 0, 0);
                                    for (var Rc = 0, Pa = H.length; Rc < Pa; Rc++) {
                                        var wa = G[Rc];
                                        if (0 !== wa) {
                                            var Ya = H[Rc].vertices;
                                            k.addScaledVector(l.subVectors(Ya[P.a],
                                                B), wa);
                                            g.addScaledVector(m.subVectors(Ya[P.b], L), wa);
                                            h.addScaledVector(n.subVectors(Ya[P.c], N), wa)
                                        }
                                    }
                                    k.add(B);
                                    g.add(L);
                                    h.add(N);
                                    B = k;
                                    L = g;
                                    N = h
                                }
                                if (H = b(this, A, c, B, L, N, p)) O && (G = O[Y], y.copy(G[0]), w.copy(G[1]), t.copy(G[2]), H.uv = a(p, B, L, N, y, w, t)), H.face = P, H.faceIndex = Y, r.push(H)
                            }
                        }
                    }
                }
            }
        }(),
        clone: function() {
            return (new this.constructor(this.geometry, this.material)).copy(this)
        }
    });
    lc.prototype = Object.create(W.prototype);
    lc.prototype.constructor = lc;
    Wa.prototype = Object.create(M.prototype);
    Wa.prototype.constructor = Wa;
    Wa.prototype.isCamera = !0;
    Wa.prototype.getWorldDirection = function() {
        var a = new x;
        return function(b) {
            b = b || new r;
            this.getWorldQuaternion(a);
            return b.set(0, 0, -1).applyQuaternion(a)
        }
    }();
    Wa.prototype.lookAt = function() {
        var a = new z;
        return function(b) {
            a.lookAt(this.position, b, this.up);
            this.quaternion.setFromRotationMatrix(a)
        }
    }();
    Wa.prototype.clone = function() {
        return (new this.constructor).copy(this)
    };
    Wa.prototype.copy = function(a) {
        M.prototype.copy.call(this, a);
        this.matrixWorldInverse.copy(a.matrixWorldInverse);
        this.projectionMatrix.copy(a.projectionMatrix);
        return this
    };
    Ra.prototype = Object.assign(Object.create(Wa.prototype), {
        constructor: Ra,
        isPerspectiveCamera: !0,
        copy: function(a) {
            Wa.prototype.copy.call(this, a);
            this.fov = a.fov;
            this.zoom = a.zoom;
            this.near = a.near;
            this.far = a.far;
            this.focus = a.focus;
            this.aspect = a.aspect;
            this.view = null === a.view ? null : Object.assign({}, a.view);
            this.filmGauge = a.filmGauge;
            this.filmOffset = a.filmOffset;
            return this
        },
        setFocalLength: function(a) {
            a = .5 * this.getFilmHeight() / a;
            this.fov = 2 * d.Math.RAD2DEG *
                Math.atan(a);
            this.updateProjectionMatrix()
        },
        getFocalLength: function() {
            var a = Math.tan(.5 * d.Math.DEG2RAD * this.fov);
            return .5 * this.getFilmHeight() / a
        },
        getEffectiveFOV: function() {
            return 2 * d.Math.RAD2DEG * Math.atan(Math.tan(.5 * d.Math.DEG2RAD * this.fov) / this.zoom)
        },
        getFilmWidth: function() {
            return this.filmGauge * Math.min(this.aspect, 1)
        },
        getFilmHeight: function() {
            return this.filmGauge / Math.max(this.aspect, 1)
        },
        setViewOffset: function(a, b, e, f, c, d) {
            this.aspect = a / b;
            this.view = {
                fullWidth: a,
                fullHeight: b,
                offsetX: e,
                offsetY: f,
                width: c,
                height: d
            };
            this.updateProjectionMatrix()
        },
        clearViewOffset: function() {
            this.view = null;
            this.updateProjectionMatrix()
        },
        updateProjectionMatrix: function() {
            var a = this.near,
                b = a * Math.tan(.5 * d.Math.DEG2RAD * this.fov) / this.zoom,
                e = 2 * b,
                f = this.aspect * e,
                c = -.5 * f,
                k = this.view;
            if (null !== k) var g = k.fullWidth,
                h = k.fullHeight,
                c = c + k.offsetX * f / g,
                b = b - k.offsetY * e / h,
                f = k.width / g * f,
                e = k.height / h * e;
            k = this.filmOffset;
            0 !== k && (c += a * k / this.getFilmWidth());
            this.projectionMatrix.makeFrustum(c, c + f, b - e, b, a, this.far)
        },
        toJSON: function(a) {
            a =
                M.prototype.toJSON.call(this, a);
            a.object.fov = this.fov;
            a.object.zoom = this.zoom;
            a.object.near = this.near;
            a.object.far = this.far;
            a.object.focus = this.focus;
            a.object.aspect = this.aspect;
            null !== this.view && (a.object.view = Object.assign({}, this.view));
            a.object.filmGauge = this.filmGauge;
            a.object.filmOffset = this.filmOffset;
            return a
        }
    });
    mc.prototype = Object.assign(Object.create(Wa.prototype), {
        constructor: mc,
        isOrthographicCamera: !0,
        copy: function(a) {
            Wa.prototype.copy.call(this, a);
            this.left = a.left;
            this.right = a.right;
            this.top = a.top;
            this.bottom = a.bottom;
            this.near = a.near;
            this.far = a.far;
            this.zoom = a.zoom;
            this.view = null === a.view ? null : Object.assign({}, a.view);
            return this
        },
        setViewOffset: function(a, b, e, f, c, d) {
            this.view = {
                fullWidth: a,
                fullHeight: b,
                offsetX: e,
                offsetY: f,
                width: c,
                height: d
            };
            this.updateProjectionMatrix()
        },
        clearViewOffset: function() {
            this.view = null;
            this.updateProjectionMatrix()
        },
        updateProjectionMatrix: function() {
            var a = (this.right - this.left) / (2 * this.zoom),
                b = (this.top - this.bottom) / (2 * this.zoom),
                e = (this.right + this.left) /
                2,
                f = (this.top + this.bottom) / 2,
                c = e - a,
                e = e + a,
                a = f + b,
                b = f - b;
            if (null !== this.view) var e = this.zoom / (this.view.width / this.view.fullWidth),
                b = this.zoom / (this.view.height / this.view.fullHeight),
                d = (this.right - this.left) / this.view.width,
                f = (this.top - this.bottom) / this.view.height,
                c = c + this.view.offsetX / e * d,
                e = c + this.view.width / e * d,
                a = a - this.view.offsetY / b * f,
                b = a - this.view.height / b * f;
            this.projectionMatrix.makeOrthographic(c, e, a, b, this.near, this.far)
        },
        toJSON: function(a) {
            a = M.prototype.toJSON.call(this, a);
            a.object.zoom = this.zoom;
            a.object.left = this.left;
            a.object.right = this.right;
            a.object.top = this.top;
            a.object.bottom = this.bottom;
            a.object.near = this.near;
            a.object.far = this.far;
            null !== this.view && (a.object.view = Object.assign({}, this.view));
            return a
        }
    });
    nc.prototype.isFogExp2 = !0;
    nc.prototype.clone = function() {
        return new nc(this.color.getHex(), this.density)
    };
    nc.prototype.toJSON = function(a) {
        return {
            type: "FogExp2",
            color: this.color.getHex(),
            density: this.density
        }
    };
    oc.prototype.isFog = !0;
    oc.prototype.clone = function() {
        return new oc(this.color.getHex(),
            this.near, this.far)
    };
    oc.prototype.toJSON = function(a) {
        return {
            type: "Fog",
            color: this.color.getHex(),
            near: this.near,
            far: this.far
        }
    };
    Sb.prototype = Object.create(M.prototype);
    Sb.prototype.constructor = Sb;
    Sb.prototype.copy = function(a, b) {
        M.prototype.copy.call(this, a, b);
        null !== a.background && (this.background = a.background.clone());
        null !== a.fog && (this.fog = a.fog.clone());
        null !== a.overrideMaterial && (this.overrideMaterial = a.overrideMaterial.clone());
        this.autoUpdate = a.autoUpdate;
        this.matrixAutoUpdate = a.matrixAutoUpdate;
        return this
    };
    Sb.prototype.toJSON = function(a) {
        var b = M.prototype.toJSON.call(this, a);
        null !== this.background && (b.object.background = this.background.toJSON(a));
        null !== this.fog && (b.object.fog = this.fog.toJSON());
        return b
    };
    Bc.prototype = Object.assign(Object.create(M.prototype), {
        constructor: Bc,
        isLensFlare: !0,
        copy: function(a) {
            M.prototype.copy.call(this, a);
            this.positionScreen.copy(a.positionScreen);
            this.customUpdateCallback = a.customUpdateCallback;
            for (var b = 0, e = a.lensFlares.length; b < e; b++) this.lensFlares.push(a.lensFlares[b]);
            return this
        },
        add: function(a, b, e, f, c, d) {
            void 0 === b && (b = -1);
            void 0 === e && (e = 0);
            void 0 === d && (d = 1);
            void 0 === c && (c = new G(16777215));
            void 0 === f && (f = 1);
            e = Math.min(e, Math.max(0, e));
            this.lensFlares.push({
                texture: a,
                size: b,
                distance: e,
                x: 0,
                y: 0,
                z: 0,
                scale: 1,
                rotation: 0,
                opacity: d,
                color: c,
                blending: f
            })
        },
        updateLensFlares: function() {
            var a, b = this.lensFlares.length,
                e, f = 2 * -this.positionScreen.x,
                c = 2 * -this.positionScreen.y;
            for (a = 0; a < b; a++) e = this.lensFlares[a], e.x = this.positionScreen.x + f * e.distance, e.y = this.positionScreen.y +
                c * e.distance, e.wantedRotation = e.x * Math.PI * .25, e.rotation += .25 * (e.wantedRotation - e.rotation)
        }
    });
    Hb.prototype = Object.create(K.prototype);
    Hb.prototype.constructor = Hb;
    Hb.prototype.copy = function(a) {
        K.prototype.copy.call(this, a);
        this.color.copy(a.color);
        this.map = a.map;
        this.rotation = a.rotation;
        return this
    };
    Cc.prototype = Object.assign(Object.create(M.prototype), {
        constructor: Cc,
        isSprite: !0,
        raycast: function() {
            var a = new r;
            return function(b, e) {
                a.setFromMatrixPosition(this.matrixWorld);
                b = b.ray.distanceSqToPoint(a);
                b > this.scale.x * this.scale.y / 4 || e.push({
                    distance: Math.sqrt(b),
                    point: this.position,
                    face: null,
                    object: this
                })
            }
        }(),
        clone: function() {
            return (new this.constructor(this.material)).copy(this)
        }
    });
    Dc.prototype = Object.assign(Object.create(M.prototype), {
        constructor: Dc,
        copy: function(a) {
            M.prototype.copy.call(this, a, !1);
            a = a.levels;
            for (var b = 0, e = a.length; b < e; b++) {
                var f = a[b];
                this.addLevel(f.object.clone(), f.distance)
            }
            return this
        },
        addLevel: function(a, b) {
            void 0 === b && (b = 0);
            b = Math.abs(b);
            for (var e = this.levels, f = 0; f < e.length &&
                !(b < e[f].distance); f++);
            e.splice(f, 0, {
                distance: b,
                object: a
            });
            this.add(a)
        },
        getObjectForDistance: function(a) {
            for (var b = this.levels, e = 1, f = b.length; e < f && !(a < b[e].distance); e++);
            return b[e - 1].object
        },
        raycast: function() {
            var a = new r;
            return function(b, e) {
                a.setFromMatrixPosition(this.matrixWorld);
                var f = b.ray.origin.distanceTo(a);
                this.getObjectForDistance(f).raycast(b, e)
            }
        }(),
        update: function() {
            var a = new r,
                b = new r;
            return function(e) {
                var f = this.levels;
                if (1 < f.length) {
                    a.setFromMatrixPosition(e.matrixWorld);
                    b.setFromMatrixPosition(this.matrixWorld);
                    e = a.distanceTo(b);
                    f[0].object.visible = !0;
                    for (var c = 1, d = f.length; c < d; c++)
                        if (e >= f[c].distance) f[c - 1].object.visible = !1, f[c].object.visible = !0;
                        else break;
                    for (; c < d; c++) f[c].object.visible = !1
                }
            }
        }(),
        toJSON: function(a) {
            a = M.prototype.toJSON.call(this, a);
            a.object.levels = [];
            for (var b = this.levels, e = 0, f = b.length; e < f; e++) {
                var c = b[e];
                a.object.levels.push({
                    object: c.object.uuid,
                    distance: c.distance
                })
            }
            return a
        }
    });
    Tb.prototype = Object.create(u.prototype);
    Tb.prototype.constructor = Tb;
    Tb.prototype.isDataTexture = !0;
    Object.assign(Ec.prototype, {
        calculateInverses: function() {
            this.boneInverses = [];
            for (var a = 0, b = this.bones.length; a < b; a++) {
                var e = new z;
                this.bones[a] && e.getInverse(this.bones[a].matrixWorld);
                this.boneInverses.push(e)
            }
        },
        pose: function() {
            for (var a, b = 0, e = this.bones.length; b < e; b++)(a = this.bones[b]) && a.matrixWorld.getInverse(this.boneInverses[b]);
            b = 0;
            for (e = this.bones.length; b < e; b++)
                if (a = this.bones[b]) a.parent && a.parent.isBone ? (a.matrix.getInverse(a.parent.matrixWorld), a.matrix.multiply(a.matrixWorld)) : a.matrix.copy(a.matrixWorld), a.matrix.decompose(a.position,
                    a.quaternion, a.scale)
        },
        update: function() {
            var a = new z;
            return function() {
                for (var b = 0, e = this.bones.length; b < e; b++) a.multiplyMatrices(this.bones[b] ? this.bones[b].matrixWorld : this.identityMatrix, this.boneInverses[b]), a.toArray(this.boneMatrices, 16 * b);
                this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
            }
        }(),
        clone: function() {
            return new Ec(this.bones, this.boneInverses, this.useVertexTexture)
        }
    });
    Fc.prototype = Object.assign(Object.create(M.prototype), {
        constructor: Fc,
        isBone: !0,
        copy: function(a) {
            M.prototype.copy.call(this,
                a);
            this.skin = a.skin;
            return this
        }
    });
    Ib.prototype = Object.assign(Object.create(Na.prototype), {
        constructor: Ib,
        isSkinnedMesh: !0,
        bind: function(a, b) {
            this.skeleton = a;
            void 0 === b && (this.updateMatrixWorld(!0), this.skeleton.calculateInverses(), b = this.matrixWorld);
            this.bindMatrix.copy(b);
            this.bindMatrixInverse.getInverse(b)
        },
        pose: function() {
            this.skeleton.pose()
        },
        normalizeSkinWeights: function() {
            if (this.geometry && this.geometry.isGeometry)
                for (var a = 0; a < this.geometry.skinWeights.length; a++) {
                    var b = this.geometry.skinWeights[a],
                        e = 1 / b.lengthManhattan();
                    Infinity !== e ? b.multiplyScalar(e) : b.set(1, 0, 0, 0)
                } else if (this.geometry && this.geometry.isBufferGeometry)
                    for (var b = new na, f = this.geometry.attributes.skinWeight, a = 0; a < f.count; a++) b.x = f.getX(a), b.y = f.getY(a), b.z = f.getZ(a), b.w = f.getW(a), e = 1 / b.lengthManhattan(), Infinity !== e ? b.multiplyScalar(e) : b.set(1, 0, 0, 0), f.setXYZW(a, b.x, b.y, b.z, b.w)
        },
        updateMatrixWorld: function(a) {
            Na.prototype.updateMatrixWorld.call(this, !0);
            "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) :
                "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : console.warn("THREE.SkinnedMesh unrecognized bindMode: " + this.bindMode)
        },
        clone: function() {
            return (new this.constructor(this.geometry, this.material, this.skeleton.useVertexTexture)).copy(this)
        }
    });
    xa.prototype = Object.create(K.prototype);
    xa.prototype.constructor = xa;
    xa.prototype.isLineBasicMaterial = !0;
    xa.prototype.copy = function(a) {
        K.prototype.copy.call(this, a);
        this.color.copy(a.color);
        this.linewidth = a.linewidth;
        this.linecap = a.linecap;
        this.linejoin = a.linejoin;
        return this
    };
    Jb.prototype = Object.assign(Object.create(M.prototype), {
        constructor: Jb,
        isLine: !0,
        raycast: function() {
            var a = new z,
                b = new Gb,
                e = new La;
            return function(f, c) {
                var d = f.linePrecision,
                    d = d * d,
                    k = this.geometry,
                    g = this.matrixWorld;
                null === k.boundingSphere && k.computeBoundingSphere();
                e.copy(k.boundingSphere);
                e.applyMatrix4(g);
                if (!1 !== f.ray.intersectsSphere(e)) {
                    a.getInverse(g);
                    b.copy(f.ray).applyMatrix4(a);
                    var h = new r,
                        l = new r,
                        g = new r,
                        m = new r,
                        n = this && this.isLineSegments ? 2 : 1;
                    if (k && k.isBufferGeometry) {
                        var w =
                            k.index,
                            t = k.attributes.position.array;
                        if (null !== w)
                            for (var w = w.array, k = 0, A = w.length - 1; k < A; k += n) {
                                var p = w[k + 1];
                                h.fromArray(t, 3 * w[k]);
                                l.fromArray(t, 3 * p);
                                p = b.distanceSqToSegment(h, l, m, g);
                                p > d || (m.applyMatrix4(this.matrixWorld), p = f.ray.origin.distanceTo(m), p < f.near || p > f.far || c.push({
                                    distance: p,
                                    point: g.clone().applyMatrix4(this.matrixWorld),
                                    index: k,
                                    face: null,
                                    faceIndex: null,
                                    object: this
                                }))
                            } else
                                for (k = 0, A = t.length / 3 - 1; k < A; k += n) h.fromArray(t, 3 * k), l.fromArray(t, 3 * k + 3), p = b.distanceSqToSegment(h, l, m, g), p > d || (m.applyMatrix4(this.matrixWorld),
                                    p = f.ray.origin.distanceTo(m), p < f.near || p > f.far || c.push({
                                        distance: p,
                                        point: g.clone().applyMatrix4(this.matrixWorld),
                                        index: k,
                                        face: null,
                                        faceIndex: null,
                                        object: this
                                    }))
                    } else if (k && k.isGeometry)
                        for (h = k.vertices, l = h.length, k = 0; k < l - 1; k += n) p = b.distanceSqToSegment(h[k], h[k + 1], m, g), p > d || (m.applyMatrix4(this.matrixWorld), p = f.ray.origin.distanceTo(m), p < f.near || p > f.far || c.push({
                            distance: p,
                            point: g.clone().applyMatrix4(this.matrixWorld),
                            index: k,
                            face: null,
                            faceIndex: null,
                            object: this
                        }))
                }
            }
        }(),
        clone: function() {
            return (new this.constructor(this.geometry,
                this.material)).copy(this)
        }
    });
    Ja.prototype = Object.assign(Object.create(Jb.prototype), {
        constructor: Ja,
        isLineSegments: !0
    });
    pb.prototype = Object.create(K.prototype);
    pb.prototype.constructor = pb;
    pb.prototype.isPointsMaterial = !0;
    pb.prototype.copy = function(a) {
        K.prototype.copy.call(this, a);
        this.color.copy(a.color);
        this.map = a.map;
        this.size = a.size;
        this.sizeAttenuation = a.sizeAttenuation;
        return this
    };
    zb.prototype = Object.assign(Object.create(M.prototype), {
        constructor: zb,
        isPoints: !0,
        raycast: function() {
            var a = new z,
                b = new Gb,
                e = new La;
            return function(f, c) {
                function d(a, e) {
                    var g = b.distanceSqToPoint(a);
                    if (g < m) {
                        a = b.closestPointToPoint(a);
                        a.applyMatrix4(h);
                        var l = f.ray.origin.distanceTo(a);
                        l < f.near || l > f.far || c.push({
                            distance: l,
                            distanceToRay: Math.sqrt(g),
                            point: a.clone(),
                            index: e,
                            face: null,
                            object: k
                        })
                    }
                }
                var k = this,
                    g = this.geometry,
                    h = this.matrixWorld,
                    l = f.params.Points.threshold;
                null === g.boundingSphere && g.computeBoundingSphere();
                e.copy(g.boundingSphere);
                e.applyMatrix4(h);
                if (!1 !== f.ray.intersectsSphere(e)) {
                    a.getInverse(h);
                    b.copy(f.ray).applyMatrix4(a);
                    var l = l / ((this.scale.x + this.scale.y + this.scale.z) / 3),
                        m = l * l,
                        l = new r;
                    if (g && g.isBufferGeometry) {
                        var n = g.index,
                            g = g.attributes.position.array;
                        if (null !== n)
                            for (var w = n.array, n = 0, t = w.length; n < t; n++) {
                                var A = w[n];
                                l.fromArray(g, 3 * A);
                                d(l, A)
                            } else
                                for (n = 0, w = g.length / 3; n < w; n++) l.fromArray(g, 3 * n), d(l, n)
                    } else
                        for (l = g.vertices, n = 0, w = l.length; n < w; n++) d(l[n], n)
                }
            }
        }(),
        clone: function() {
            return (new this.constructor(this.geometry, this.material)).copy(this)
        }
    });
    Gc.prototype = Object.assign(Object.create(M.prototype), {
        constructor: Gc
    });
    Xc.prototype = Object.create(u.prototype);
    Xc.prototype.constructor = Xc;
    Ub.prototype = Object.create(u.prototype);
    Ub.prototype.constructor = Ub;
    Ub.prototype.isCompressedTexture = !0;
    Yc.prototype = Object.create(u.prototype);
    Yc.prototype.constructor = Yc;
    Hc.prototype = Object.create(u.prototype);
    Hc.prototype.constructor = Hc;
    Hc.prototype.isDepthTexture = !0;
    pc.prototype = Object.create(sa.prototype);
    pc.prototype.constructor = pc;
    pc.prototype.isShadowMaterial = !0;
    Kb.prototype = Object.create(sa.prototype);
    Kb.prototype.constructor =
        Kb;
    Kb.prototype.isRawShaderMaterial = !0;
    Ic.prototype = {
        constructor: Ic,
        isMultiMaterial: !0,
        toJSON: function(a) {
            for (var b = {
                    metadata: {
                        version: 4.2,
                        type: "material",
                        generator: "MaterialExporter"
                    },
                    uuid: this.uuid,
                    type: this.type,
                    materials: []
                }, e = this.materials, f = 0, c = e.length; f < c; f++) {
                var d = e[f].toJSON(a);
                delete d.metadata;
                b.materials.push(d)
            }
            b.visible = this.visible;
            return b
        },
        clone: function() {
            for (var a = new this.constructor, b = 0; b < this.materials.length; b++) a.materials.push(this.materials[b].clone());
            a.visible = this.visible;
            return a
        }
    };
    vb.prototype = Object.create(K.prototype);
    vb.prototype.constructor = vb;
    vb.prototype.isMeshStandardMaterial = !0;
    vb.prototype.copy = function(a) {
        K.prototype.copy.call(this, a);
        this.defines = {
            STANDARD: ""
        };
        this.color.copy(a.color);
        this.roughness = a.roughness;
        this.metalness = a.metalness;
        this.map = a.map;
        this.lightMap = a.lightMap;
        this.lightMapIntensity = a.lightMapIntensity;
        this.aoMap = a.aoMap;
        this.aoMapIntensity = a.aoMapIntensity;
        this.emissive.copy(a.emissive);
        this.emissiveMap = a.emissiveMap;
        this.emissiveIntensity =
            a.emissiveIntensity;
        this.bumpMap = a.bumpMap;
        this.bumpScale = a.bumpScale;
        this.normalMap = a.normalMap;
        this.normalScale.copy(a.normalScale);
        this.displacementMap = a.displacementMap;
        this.displacementScale = a.displacementScale;
        this.displacementBias = a.displacementBias;
        this.roughnessMap = a.roughnessMap;
        this.metalnessMap = a.metalnessMap;
        this.alphaMap = a.alphaMap;
        this.envMap = a.envMap;
        this.envMapIntensity = a.envMapIntensity;
        this.refractionRatio = a.refractionRatio;
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        this.wireframeLinecap = a.wireframeLinecap;
        this.wireframeLinejoin = a.wireframeLinejoin;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        this.morphNormals = a.morphNormals;
        return this
    };
    qc.prototype = Object.create(vb.prototype);
    qc.prototype.constructor = qc;
    qc.prototype.isMeshPhysicalMaterial = !0;
    qc.prototype.copy = function(a) {
        vb.prototype.copy.call(this, a);
        this.defines = {
            PHYSICAL: ""
        };
        this.reflectivity = a.reflectivity;
        this.clearCoat = a.clearCoat;
        this.clearCoatRoughness = a.clearCoatRoughness;
        return this
    };
    Vb.prototype = Object.create(K.prototype);
    Vb.prototype.constructor = Vb;
    Vb.prototype.isMeshPhongMaterial = !0;
    Vb.prototype.copy = function(a) {
        K.prototype.copy.call(this, a);
        this.color.copy(a.color);
        this.specular.copy(a.specular);
        this.shininess = a.shininess;
        this.map = a.map;
        this.lightMap = a.lightMap;
        this.lightMapIntensity = a.lightMapIntensity;
        this.aoMap = a.aoMap;
        this.aoMapIntensity = a.aoMapIntensity;
        this.emissive.copy(a.emissive);
        this.emissiveMap = a.emissiveMap;
        this.emissiveIntensity = a.emissiveIntensity;
        this.bumpMap =
            a.bumpMap;
        this.bumpScale = a.bumpScale;
        this.normalMap = a.normalMap;
        this.normalScale.copy(a.normalScale);
        this.displacementMap = a.displacementMap;
        this.displacementScale = a.displacementScale;
        this.displacementBias = a.displacementBias;
        this.specularMap = a.specularMap;
        this.alphaMap = a.alphaMap;
        this.envMap = a.envMap;
        this.combine = a.combine;
        this.reflectivity = a.reflectivity;
        this.refractionRatio = a.refractionRatio;
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        this.wireframeLinecap = a.wireframeLinecap;
        this.wireframeLinejoin = a.wireframeLinejoin;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        this.morphNormals = a.morphNormals;
        return this
    };
    rc.prototype = Object.create(K.prototype);
    rc.prototype.constructor = rc;
    rc.prototype.isMeshNormalMaterial = !0;
    rc.prototype.copy = function(a) {
        K.prototype.copy.call(this, a);
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        return this
    };
    sc.prototype = Object.create(K.prototype);
    sc.prototype.constructor = sc;
    sc.prototype.isMeshLambertMaterial = !0;
    sc.prototype.copy = function(a) {
        K.prototype.copy.call(this, a);
        this.color.copy(a.color);
        this.map = a.map;
        this.lightMap = a.lightMap;
        this.lightMapIntensity = a.lightMapIntensity;
        this.aoMap = a.aoMap;
        this.aoMapIntensity = a.aoMapIntensity;
        this.emissive.copy(a.emissive);
        this.emissiveMap = a.emissiveMap;
        this.emissiveIntensity = a.emissiveIntensity;
        this.specularMap = a.specularMap;
        this.alphaMap = a.alphaMap;
        this.envMap = a.envMap;
        this.combine = a.combine;
        this.reflectivity = a.reflectivity;
        this.refractionRatio = a.refractionRatio;
        this.wireframe = a.wireframe;
        this.wireframeLinewidth = a.wireframeLinewidth;
        this.wireframeLinecap = a.wireframeLinecap;
        this.wireframeLinejoin = a.wireframeLinejoin;
        this.skinning = a.skinning;
        this.morphTargets = a.morphTargets;
        this.morphNormals = a.morphNormals;
        return this
    };
    tc.prototype = Object.create(K.prototype);
    tc.prototype.constructor = tc;
    tc.prototype.isLineDashedMaterial = !0;
    tc.prototype.copy = function(a) {
        K.prototype.copy.call(this, a);
        this.color.copy(a.color);
        this.linewidth = a.linewidth;
        this.scale = a.scale;
        this.dashSize =
            a.dashSize;
        this.gapSize = a.gapSize;
        return this
    };
    d.Cache = {
        enabled: !1,
        files: {},
        add: function(a, b) {
            !1 !== this.enabled && (this.files[a] = b)
        },
        get: function(a) {
            if (!1 !== this.enabled) return this.files[a]
        },
        remove: function(a) {
            delete this.files[a]
        },
        clear: function() {
            this.files = {}
        }
    };
    d.DefaultLoadingManager = new ud;
    Object.assign(wb.prototype, {
        load: function(a, b, e, f) {
            void 0 !== this.path && (a = this.path + a);
            var c = this,
                k = d.Cache.get(a);
            if (void 0 !== k) return c.manager.itemStart(a), setTimeout(function() {
                    b && b(k);
                    c.manager.itemEnd(a)
                },
                0), k;
            var g = new XMLHttpRequest;
            g.open("GET", a, !0);
            g.addEventListener("load", function(e) {
                var k = e.target.response;
                d.Cache.add(a, k);
                200 === this.status ? (b && b(k), c.manager.itemEnd(a)) : 0 === this.status ? (console.warn("THREE.XHRLoader: HTTP Status 0 received."), b && b(k), c.manager.itemEnd(a)) : (f && f(e), c.manager.itemError(a))
            }, !1);
            void 0 !== e && g.addEventListener("progress", function(a) {
                e(a)
            }, !1);
            g.addEventListener("error", function(b) {
                f && f(b);
                c.manager.itemError(a)
            }, !1);
            void 0 !== this.responseType && (g.responseType =
                this.responseType);
            void 0 !== this.withCredentials && (g.withCredentials = this.withCredentials);
            g.overrideMimeType && g.overrideMimeType("text/plain");
            g.send(null);
            c.manager.itemStart(a);
            return g
        },
        setPath: function(a) {
            this.path = a;
            return this
        },
        setResponseType: function(a) {
            this.responseType = a;
            return this
        },
        setWithCredentials: function(a) {
            this.withCredentials = a;
            return this
        }
    });
    Object.assign(Od.prototype, {
        load: function(a, b, e, f) {
            function c(q) {
                h.load(a[q], function(a) {
                    a = d._parser(a, !0);
                    k[q] = {
                        width: a.width,
                        height: a.height,
                        format: a.format,
                        mipmaps: a.mipmaps
                    };
                    l += 1;
                    6 === l && (1 === a.mipmapCount && (g.minFilter = 1006), g.format = a.format, g.needsUpdate = !0, b && b(g))
                }, e, f)
            }
            var d = this,
                k = [],
                g = new Ub;
            g.image = k;
            var h = new wb(this.manager);
            h.setPath(this.path);
            h.setResponseType("arraybuffer");
            if (Array.isArray(a))
                for (var l = 0, m = 0, n = a.length; m < n; ++m) c(m);
            else h.load(a, function(a) {
                a = d._parser(a, !0);
                if (a.isCubemap)
                    for (var e = a.mipmaps.length / a.mipmapCount, f = 0; f < e; f++) {
                        k[f] = {
                            mipmaps: []
                        };
                        for (var c = 0; c < a.mipmapCount; c++) k[f].mipmaps.push(a.mipmaps[f *
                            a.mipmapCount + c]), k[f].format = a.format, k[f].width = a.width, k[f].height = a.height
                    } else g.image.width = a.width, g.image.height = a.height, g.mipmaps = a.mipmaps;
                1 === a.mipmapCount && (g.minFilter = 1006);
                g.format = a.format;
                g.needsUpdate = !0;
                b && b(g)
            }, e, f);
            return g
        },
        setPath: function(a) {
            this.path = a;
            return this
        }
    });
    Object.assign(vd.prototype, {
        load: function(a, b, e, f) {
            var c = this,
                d = new Tb,
                k = new wb(this.manager);
            k.setResponseType("arraybuffer");
            k.load(a, function(a) {
                if (a = c._parser(a)) void 0 !== a.image ? d.image = a.image : void 0 !==
                    a.data && (d.image.width = a.width, d.image.height = a.height, d.image.data = a.data), d.wrapS = void 0 !== a.wrapS ? a.wrapS : 1001, d.wrapT = void 0 !== a.wrapT ? a.wrapT : 1001, d.magFilter = void 0 !== a.magFilter ? a.magFilter : 1006, d.minFilter = void 0 !== a.minFilter ? a.minFilter : 1008, d.anisotropy = void 0 !== a.anisotropy ? a.anisotropy : 1, void 0 !== a.format && (d.format = a.format), void 0 !== a.type && (d.type = a.type), void 0 !== a.mipmaps && (d.mipmaps = a.mipmaps), 1 === a.mipmapCount && (d.minFilter = 1006), d.needsUpdate = !0, b && b(d, a)
            }, e, f);
            return d
        }
    });
    Object.assign(Jc.prototype, {
        load: function(a, b, e, f) {
            var c = this,
                d = document.createElementNS("http://www.w3.org/1999/xhtml", "img");
            d.onload = function() {
                URL.revokeObjectURL(d.src);
                b && b(d);
                c.manager.itemEnd(a)
            };
            if (0 === a.indexOf("data:")) d.src = a;
            else {
                var k = new wb;
                k.setPath(this.path);
                k.setResponseType("blob");
                k.setWithCredentials(this.withCredentials);
                k.load(a, function(a) {
                    d.src = URL.createObjectURL(a)
                }, e, f)
            }
            c.manager.itemStart(a);
            return d
        },
        setCrossOrigin: function(a) {
            this.crossOrigin = a;
            return this
        },
        setWithCredentials: function(a) {
            this.withCredentials =
                a;
            return this
        },
        setPath: function(a) {
            this.path = a;
            return this
        }
    });
    Object.assign(Zc.prototype, {
        load: function(a, b, e, f) {
            function c(e) {
                k.load(a[e], function(a) {
                    d.images[e] = a;
                    g++;
                    6 === g && (d.needsUpdate = !0, b && b(d))
                }, void 0, f)
            }
            var d = new aa,
                k = new Jc(this.manager);
            k.setCrossOrigin(this.crossOrigin);
            k.setPath(this.path);
            var g = 0;
            for (e = 0; e < a.length; ++e) c(e);
            return d
        },
        setCrossOrigin: function(a) {
            this.crossOrigin = a;
            return this
        },
        setPath: function(a) {
            this.path = a;
            return this
        }
    });
    Object.assign(uc.prototype, {
        load: function(a,
            b, e, f) {
            var c = new u,
                d = new Jc(this.manager);
            d.setCrossOrigin(this.crossOrigin);
            d.setWithCredentials(this.withCredentials);
            d.setPath(this.path);
            d.load(a, function(e) {
                var f = 0 < a.search(/\.(jpg|jpeg)$/) || 0 === a.search(/^data\:image\/jpeg/);
                c.format = f ? 1022 : 1023;
                c.image = e;
                c.needsUpdate = !0;
                void 0 !== b && b(c)
            }, e, f);
            return c
        },
        setCrossOrigin: function(a) {
            this.crossOrigin = a;
            return this
        },
        setWithCredentials: function(a) {
            this.withCredentials = a;
            return this
        },
        setPath: function(a) {
            this.path = a;
            return this
        }
    });
    Sa.prototype = Object.assign(Object.create(M.prototype), {
        constructor: Sa,
        isLight: !0,
        copy: function(a) {
            M.prototype.copy.call(this, a);
            this.color.copy(a.color);
            this.intensity = a.intensity;
            return this
        },
        toJSON: function(a) {
            a = M.prototype.toJSON.call(this, a);
            a.object.color = this.color.getHex();
            a.object.intensity = this.intensity;
            void 0 !== this.groundColor && (a.object.groundColor = this.groundColor.getHex());
            void 0 !== this.distance && (a.object.distance = this.distance);
            void 0 !== this.angle && (a.object.angle = this.angle);
            void 0 !== this.decay && (a.object.decay = this.decay);
            void 0 !==
                this.penumbra && (a.object.penumbra = this.penumbra);
            void 0 !== this.shadow && (a.object.shadow = this.shadow.toJSON());
            return a
        }
    });
    vc.prototype = Object.assign(Object.create(Sa.prototype), {
        constructor: vc,
        isHemisphereLight: !0,
        copy: function(a) {
            Sa.prototype.copy.call(this, a);
            this.groundColor.copy(a.groundColor);
            return this
        }
    });
    Object.assign(ec.prototype, {
        copy: function(a) {
            this.camera = a.camera.clone();
            this.bias = a.bias;
            this.radius = a.radius;
            this.mapSize.copy(a.mapSize);
            return this
        },
        clone: function() {
            return (new this.constructor).copy(this)
        },
        toJSON: function() {
            var a = {};
            0 !== this.bias && (a.bias = this.bias);
            1 !== this.radius && (a.radius = this.radius);
            if (512 !== this.mapSize.x || 512 !== this.mapSize.y) a.mapSize = this.mapSize.toArray();
            a.camera = this.camera.toJSON(!1).object;
            delete a.camera.matrix;
            return a
        }
    });
    Wb.prototype = Object.assign(Object.create(ec.prototype), {
        constructor: Wb,
        isSpotLightShadow: !0,
        update: function(a) {
            var b = 2 * d.Math.RAD2DEG * a.angle,
                e = this.mapSize.width / this.mapSize.height;
            a = a.distance || 500;
            var f = this.camera;
            if (b !== f.fov || e !== f.aspect ||
                a !== f.far) f.fov = b, f.aspect = e, f.far = a, f.updateProjectionMatrix()
        }
    });
    Kc.prototype = Object.assign(Object.create(Sa.prototype), {
        constructor: Kc,
        isSpotLight: !0,
        copy: function(a) {
            Sa.prototype.copy.call(this, a);
            this.distance = a.distance;
            this.angle = a.angle;
            this.penumbra = a.penumbra;
            this.decay = a.decay;
            this.target = a.target.clone();
            this.shadow = a.shadow.clone();
            return this
        }
    });
    wc.prototype = Object.assign(Object.create(Sa.prototype), {
        constructor: wc,
        isPointLight: !0,
        copy: function(a) {
            Sa.prototype.copy.call(this, a);
            this.distance =
                a.distance;
            this.decay = a.decay;
            this.shadow = a.shadow.clone();
            return this
        }
    });
    $c.prototype = Object.assign(Object.create(ec.prototype), {
        constructor: $c
    });
    ad.prototype = Object.assign(Object.create(Sa.prototype), {
        constructor: ad,
        isDirectionalLight: !0,
        copy: function(a) {
            Sa.prototype.copy.call(this, a);
            this.target = a.target.clone();
            this.shadow = a.shadow.clone();
            return this
        }
    });
    c.prototype = Object.assign(Object.create(Sa.prototype), {
        constructor: c,
        isAmbientLight: !0
    });
    d.AnimationUtils = {
        arraySlice: function(a, b, e) {
            return d.AnimationUtils.isTypedArray(a) ?
                new a.constructor(a.subarray(b, e)) : a.slice(b, e)
        },
        convertArray: function(a, b, e) {
            return !a || !e && a.constructor === b ? a : "number" === typeof b.BYTES_PER_ELEMENT ? new b(a) : Array.prototype.slice.call(a)
        },
        isTypedArray: function(a) {
            return ArrayBuffer.isView(a) && !(a instanceof DataView)
        },
        getKeyframeOrder: function(a) {
            for (var b = a.length, e = Array(b), f = 0; f !== b; ++f) e[f] = f;
            e.sort(function(b, e) {
                return a[b] - a[e]
            });
            return e
        },
        sortedArray: function(a, b, e) {
            for (var f = a.length, c = new a.constructor(f), d = 0, k = 0; k !== f; ++d)
                for (var g = e[d] *
                        b, h = 0; h !== b; ++h) c[k++] = a[g + h];
            return c
        },
        flattenJSON: function(a, b, e, f) {
            for (var c = 1, d = a[0]; void 0 !== d && void 0 === d[f];) d = a[c++];
            if (void 0 !== d) {
                var k = d[f];
                if (void 0 !== k)
                    if (Array.isArray(k)) {
                        do k = d[f], void 0 !== k && (b.push(d.time), e.push.apply(e, k)), d = a[c++]; while (void 0 !== d)
                    } else if (void 0 !== k.toArray) {
                    do k = d[f], void 0 !== k && (b.push(d.time), k.toArray(e, e.length)), d = a[c++]; while (void 0 !== d)
                } else {
                    do k = d[f], void 0 !== k && (b.push(d.time), e.push(k)), d = a[c++]; while (void 0 !== d)
                }
            }
        }
    };
    k.prototype = {
        constructor: k,
        evaluate: function(a) {
            var b =
                this.parameterPositions,
                e = this._cachedIndex,
                f = b[e],
                c = b[e - 1];
            a: {
                b: {
                    c: {
                        d: if (!(a < f)) {
                            for (var d = e + 2;;) {
                                if (void 0 === f) {
                                    if (a < c) break d;
                                    this._cachedIndex = e = b.length;
                                    return this.afterEnd_(e - 1, a, c)
                                }
                                if (e === d) break;
                                c = f;
                                f = b[++e];
                                if (a < f) break b
                            }
                            f = b.length;
                            break c
                        }if (a >= c) break a;
                        else {
                            d = b[1];
                            a < d && (e = 2, c = d);
                            for (d = e - 2;;) {
                                if (void 0 === c) return this._cachedIndex = 0, this.beforeStart_(0, a, f);
                                if (e === d) break;
                                f = c;
                                c = b[--e - 1];
                                if (a >= c) break b
                            }
                            f = e;
                            e = 0
                        }
                    }
                    for (; e < f;) c = e + f >>> 1,
                    a < b[c] ? f = c : e = c + 1;f = b[e];c = b[e - 1];
                    if (void 0 === c) return this._cachedIndex =
                        0, this.beforeStart_(0, a, f);
                    if (void 0 === f) return this._cachedIndex = e = b.length, this.afterEnd_(e - 1, c, a)
                }
                this._cachedIndex = e;this.intervalChanged_(e, c, f)
            }
            return this.interpolate_(e, c, a, f)
        },
        settings: null,
        DefaultSettings_: {},
        getSettings_: function() {
            return this.settings || this.DefaultSettings_
        },
        copySampleValue_: function(a) {
            var b = this.resultBuffer,
                e = this.sampleValues,
                f = this.valueSize;
            a *= f;
            for (var c = 0; c !== f; ++c) b[c] = e[a + c];
            return b
        },
        interpolate_: function(a, b, e, f) {
            throw Error("call to abstract method");
        },
        intervalChanged_: function(a,
            b, e) {}
    };
    Object.assign(k.prototype, {
        beforeStart_: k.prototype.copySampleValue_,
        afterEnd_: k.prototype.copySampleValue_
    });
    g.prototype = Object.assign(Object.create(k.prototype), {
        constructor: g,
        DefaultSettings_: {
            endingStart: 2400,
            endingEnd: 2400
        },
        intervalChanged_: function(a, b, e) {
            var f = this.parameterPositions,
                c = a - 2,
                d = a + 1,
                k = f[c],
                g = f[d];
            if (void 0 === k) switch (this.getSettings_().endingStart) {
                case 2401:
                    c = a;
                    k = 2 * b - e;
                    break;
                case 2402:
                    c = f.length - 2;
                    k = b + f[c] - f[c + 1];
                    break;
                default:
                    c = a, k = e
            }
            if (void 0 === g) switch (this.getSettings_().endingEnd) {
                case 2401:
                    d =
                        a;
                    g = 2 * e - b;
                    break;
                case 2402:
                    d = 1;
                    g = e + f[1] - f[0];
                    break;
                default:
                    d = a - 1, g = b
            }
            a = .5 * (e - b);
            f = this.valueSize;
            this._weightPrev = a / (b - k);
            this._weightNext = a / (g - e);
            this._offsetPrev = c * f;
            this._offsetNext = d * f
        },
        interpolate_: function(a, b, e, f) {
            var c = this.resultBuffer,
                d = this.sampleValues,
                k = this.valueSize;
            a *= k;
            var g = a - k,
                h = this._offsetPrev,
                l = this._offsetNext,
                m = this._weightPrev,
                n = this._weightNext,
                w = (e - b) / (f - b);
            e = w * w;
            f = e * w;
            b = -m * f + 2 * m * e - m * w;
            m = (1 + m) * f + (-1.5 - 2 * m) * e + (-.5 + m) * w + 1;
            w = (-1 - n) * f + (1.5 + n) * e + .5 * w;
            n = n * f - n * e;
            for (e = 0; e !== k; ++e) c[e] =
                b * d[h + e] + m * d[g + e] + w * d[a + e] + n * d[l + e];
            return c
        }
    });
    l.prototype = Object.assign(Object.create(k.prototype), {
        constructor: l,
        interpolate_: function(a, b, e, f) {
            var c = this.resultBuffer,
                d = this.sampleValues,
                k = this.valueSize;
            a *= k;
            var g = a - k;
            b = (e - b) / (f - b);
            e = 1 - b;
            for (f = 0; f !== k; ++f) c[f] = d[g + f] * e + d[a + f] * b;
            return c
        }
    });
    m.prototype = Object.assign(Object.create(k.prototype), {
        constructor: m,
        interpolate_: function(a, b, e, f) {
            return this.copySampleValue_(a - 1)
        }
    });
    var gc;
    gc = {
        TimeBufferType: Float32Array,
        ValueBufferType: Float32Array,
        DefaultInterpolation: 2301,
        InterpolantFactoryMethodDiscrete: function(a) {
            return new m(this.times, this.values, this.getValueSize(), a)
        },
        InterpolantFactoryMethodLinear: function(a) {
            return new l(this.times, this.values, this.getValueSize(), a)
        },
        InterpolantFactoryMethodSmooth: function(a) {
            return new g(this.times, this.values, this.getValueSize(), a)
        },
        setInterpolation: function(a) {
            var b;
            switch (a) {
                case 2300:
                    b = this.InterpolantFactoryMethodDiscrete;
                    break;
                case 2301:
                    b = this.InterpolantFactoryMethodLinear;
                    break;
                case 2302:
                    b = this.InterpolantFactoryMethodSmooth
            }
            if (void 0 ===
                b) {
                b = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
                if (void 0 === this.createInterpolant)
                    if (a !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
                    else throw Error(b);
                console.warn(b)
            } else this.createInterpolant = b
        },
        getInterpolation: function() {
            switch (this.createInterpolant) {
                case this.InterpolantFactoryMethodDiscrete:
                    return 2300;
                case this.InterpolantFactoryMethodLinear:
                    return 2301;
                case this.InterpolantFactoryMethodSmooth:
                    return 2302
            }
        },
        getValueSize: function() {
            return this.values.length /
                this.times.length
        },
        shift: function(a) {
            if (0 !== a)
                for (var b = this.times, e = 0, f = b.length; e !== f; ++e) b[e] += a;
            return this
        },
        scale: function(a) {
            if (1 !== a)
                for (var b = this.times, e = 0, f = b.length; e !== f; ++e) b[e] *= a;
            return this
        },
        trim: function(a, b) {
            for (var e = this.times, f = e.length, c = 0, k = f - 1; c !== f && e[c] < a;) ++c;
            for (; - 1 !== k && e[k] > b;) --k;
            ++k;
            if (0 !== c || k !== f) c >= k && (k = Math.max(k, 1), c = k - 1), a = this.getValueSize(), this.times = d.AnimationUtils.arraySlice(e, c, k), this.values = d.AnimationUtils.arraySlice(this.values, c * a, k * a);
            return this
        },
        validate: function() {
            var a = !0,
                b = this.getValueSize();
            0 !== b - Math.floor(b) && (console.error("invalid value size in track", this), a = !1);
            var e = this.times,
                b = this.values,
                f = e.length;
            0 === f && (console.error("track is empty", this), a = !1);
            for (var c = null, k = 0; k !== f; k++) {
                var g = e[k];
                if ("number" === typeof g && isNaN(g)) {
                    console.error("time is not a valid number", this, k, g);
                    a = !1;
                    break
                }
                if (null !== c && c > g) {
                    console.error("out of order keys", this, k, g, c);
                    a = !1;
                    break
                }
                c = g
            }
            if (void 0 !== b && d.AnimationUtils.isTypedArray(b))
                for (k = 0, e = b.length; k !==
                    e; ++k)
                    if (f = b[k], isNaN(f)) {
                        console.error("value is not a valid number", this, k, f);
                        a = !1;
                        break
                    }
            return a
        },
        optimize: function() {
            for (var a = this.times, b = this.values, e = this.getValueSize(), f = 1, c = 1, k = a.length - 1; c <= k; ++c) {
                var g = !1,
                    h = a[c];
                if (h !== a[c + 1] && (1 !== c || h !== h[0]))
                    for (var l = c * e, m = l - e, n = l + e, h = 0; h !== e; ++h) {
                        var w = b[l + h];
                        if (w !== b[m + h] || w !== b[n + h]) {
                            g = !0;
                            break
                        }
                    }
                if (g) {
                    if (c !== f)
                        for (a[f] = a[c], g = c * e, l = f * e, h = 0; h !== e; ++h) b[l + h] = b[g + h];
                    ++f
                }
            }
            f !== a.length && (this.times = d.AnimationUtils.arraySlice(a, 0, f), this.values = d.AnimationUtils.arraySlice(b,
                0, f * e));
            return this
        }
    };
    t.prototype = Object.assign(Object.create(gc), {
        constructor: t,
        ValueTypeName: "vector"
    });
    E.prototype = Object.assign(Object.create(k.prototype), {
        constructor: E,
        interpolate_: function(a, b, e, f) {
            var c = this.resultBuffer,
                d = this.sampleValues,
                k = this.valueSize;
            a *= k;
            b = (e - b) / (f - b);
            for (e = a + k; a !== e; a += 4) x.slerpFlat(c, 0, d, a - k, d, a, b);
            return c
        }
    });
    H.prototype = Object.assign(Object.create(gc), {
        constructor: H,
        ValueTypeName: "quaternion",
        DefaultInterpolation: 2301,
        InterpolantFactoryMethodLinear: function(a) {
            return new E(this.times,
                this.values, this.getValueSize(), a)
        },
        InterpolantFactoryMethodSmooth: void 0
    });
    L.prototype = Object.assign(Object.create(gc), {
        constructor: L,
        ValueTypeName: "number"
    });
    ca.prototype = Object.assign(Object.create(gc), {
        constructor: ca,
        ValueTypeName: "string",
        ValueBufferType: Array,
        DefaultInterpolation: 2300,
        InterpolantFactoryMethodLinear: void 0,
        InterpolantFactoryMethodSmooth: void 0
    });
    Ca.prototype = Object.assign(Object.create(gc), {
        constructor: Ca,
        ValueTypeName: "bool",
        ValueBufferType: Array,
        DefaultInterpolation: 2300,
        InterpolantFactoryMethodLinear: void 0,
        InterpolantFactoryMethodSmooth: void 0
    });
    Y.prototype = Object.assign(Object.create(gc), {
        constructor: Y,
        ValueTypeName: "color"
    });
    Lb.prototype = gc;
    gc.constructor = Lb;
    Object.assign(Lb, {
        parse: function(a) {
            if (void 0 === a.type) throw Error("track type undefined, can not parse");
            var b = Lb._getTrackTypeForValueTypeName(a.type);
            if (void 0 === a.times) {
                var e = [],
                    f = [];
                d.AnimationUtils.flattenJSON(a.keys, e, f, "value");
                a.times = e;
                a.values = f
            }
            return void 0 !== b.parse ? b.parse(a) : new b(a.name, a.times, a.values, a.interpolation)
        },
        toJSON: function(a) {
            var b =
                a.constructor;
            if (void 0 !== b.toJSON) b = b.toJSON(a);
            else {
                var b = {
                        name: a.name,
                        times: d.AnimationUtils.convertArray(a.times, Array),
                        values: d.AnimationUtils.convertArray(a.values, Array)
                    },
                    e = a.getInterpolation();
                e !== a.DefaultInterpolation && (b.interpolation = e)
            }
            b.type = a.ValueTypeName;
            return b
        },
        _getTrackTypeForValueTypeName: function(a) {
            switch (a.toLowerCase()) {
                case "scalar":
                case "double":
                case "float":
                case "number":
                case "integer":
                    return L;
                case "vector":
                case "vector2":
                case "vector3":
                case "vector4":
                    return t;
                case "color":
                    return Y;
                case "quaternion":
                    return H;
                case "bool":
                case "boolean":
                    return Ca;
                case "string":
                    return ca
            }
            throw Error("Unsupported typeName: " + a);
        }
    });
    Xa.prototype = {
        constructor: Xa,
        resetDuration: function() {
            for (var a = 0, b = 0, e = this.tracks.length; b !== e; ++b) var f = this.tracks[b],
                a = Math.max(a, f.times[f.times.length - 1]);
            this.duration = a
        },
        trim: function() {
            for (var a = 0; a < this.tracks.length; a++) this.tracks[a].trim(0, this.duration);
            return this
        },
        optimize: function() {
            for (var a = 0; a < this.tracks.length; a++) this.tracks[a].optimize();
            return this
        }
    };
    Object.assign(Xa, {
        parse: function(a) {
            for (var b = [], e = a.tracks, f = 1 / (a.fps || 1), c = 0, d = e.length; c !== d; ++c) b.push(Lb.parse(e[c]).scale(f));
            return new Xa(a.name, a.duration, b)
        },
        toJSON: function(a) {
            var b = [],
                e = a.tracks;
            a = {
                name: a.name,
                duration: a.duration,
                tracks: b
            };
            for (var f = 0, c = e.length; f !== c; ++f) b.push(Lb.toJSON(e[f]));
            return a
        },
        CreateFromMorphTargetSequence: function(a, b, e, f) {
            for (var c = b.length, k = [], g = 0; g < c; g++) {
                var h = [],
                    l = [];
                h.push((g + c - 1) % c, g, (g + 1) % c);
                l.push(0, 1, 0);
                var m = d.AnimationUtils.getKeyframeOrder(h),
                    h = d.AnimationUtils.sortedArray(h, 1, m),
                    l = d.AnimationUtils.sortedArray(l, 1, m);
                f || 0 !== h[0] || (h.push(c), l.push(l[0]));
                k.push((new L(".morphTargetInfluences[" + b[g].name + "]", h, l)).scale(1 / e))
            }
            return new Xa(a, -1, k)
        },
        findByName: function(a, b) {
            var e = a;
            Array.isArray(a) || (e = a.geometry && a.geometry.animations || a.animations);
            for (a = 0; a < e.length; a++)
                if (e[a].name === b) return e[a];
            return null
        },
        CreateClipsFromMorphTargetSequences: function(a, b, e) {
            for (var c = {}, d = /^([\w-]*?)([\d]+)$/, k = 0, g = a.length; k < g; k++) {
                var h = a[k],
                    l =
                    h.name.match(d);
                if (l && 1 < l.length) {
                    var m = l[1];
                    (l = c[m]) || (c[m] = l = []);
                    l.push(h)
                }
            }
            a = [];
            for (m in c) a.push(Xa.CreateFromMorphTargetSequence(m, c[m], b, e));
            return a
        },
        parseAnimation: function(a, b, e) {
            if (!a) return console.error("  no animation in JSONLoader data"), null;
            e = function(a, b, e, c, f) {
                if (0 !== e.length) {
                    var k = [],
                        g = [];
                    d.AnimationUtils.flattenJSON(e, k, g, c);
                    0 !== k.length && f.push(new a(b, k, g))
                }
            };
            var c = [],
                k = a.name || "default",
                g = a.length || -1,
                h = a.fps || 30;
            a = a.hierarchy || [];
            for (var l = 0; l < a.length; l++) {
                var m = a[l].keys;
                if (m && 0 !== m.length)
                    if (m[0].morphTargets) {
                        for (var g = {}, n = 0; n < m.length; n++)
                            if (m[n].morphTargets)
                                for (var w = 0; w < m[n].morphTargets.length; w++) g[m[n].morphTargets[w]] = -1;
                        for (var A in g) {
                            for (var y = [], p = [], w = 0; w !== m[n].morphTargets.length; ++w) {
                                var r = m[n];
                                y.push(r.time);
                                p.push(r.morphTarget === A ? 1 : 0)
                            }
                            c.push(new L(".morphTargetInfluence[" + A + "]", y, p))
                        }
                        g = g.length * (h || 1)
                    } else n = ".bones[" + b[l].name + "]", e(t, n + ".position", m, "pos", c), e(H, n + ".quaternion", m, "rot", c), e(t, n + ".scale", m, "scl", c)
            }
            return 0 === c.length ? null :
                new Xa(k, g, c)
        }
    });
    Object.assign(bd.prototype, {
        load: function(a, b, e, c) {
            var d = this;
            (new wb(d.manager)).load(a, function(a) {
                b(d.parse(JSON.parse(a)))
            }, e, c)
        },
        setTextures: function(a) {
            this.textures = a
        },
        parse: function(a) {
            function b(a) {
                void 0 === e[a] && console.warn("THREE.MaterialLoader: Undefined texture", a);
                return e[a]
            }
            var e = this.textures,
                c = new THREE[a.type];
            void 0 !== a.uuid && (c.uuid = a.uuid);
            void 0 !== a.name && (c.name = a.name);
            void 0 !== a.color && c.color.setHex(a.color);
            void 0 !== a.roughness && (c.roughness = a.roughness);
            void 0 !== a.metalness && (c.metalness = a.metalness);
            void 0 !== a.emissive && c.emissive.setHex(a.emissive);
            void 0 !== a.specular && c.specular.setHex(a.specular);
            void 0 !== a.shininess && (c.shininess = a.shininess);
            void 0 !== a.uniforms && (c.uniforms = a.uniforms);
            void 0 !== a.vertexShader && (c.vertexShader = a.vertexShader);
            void 0 !== a.fragmentShader && (c.fragmentShader = a.fragmentShader);
            void 0 !== a.vertexColors && (c.vertexColors = a.vertexColors);
            void 0 !== a.fog && (c.fog = a.fog);
            void 0 !== a.shading && (c.shading = a.shading);
            void 0 !==
                a.blending && (c.blending = a.blending);
            void 0 !== a.side && (c.side = a.side);
            void 0 !== a.opacity && (c.opacity = a.opacity);
            void 0 !== a.transparent && (c.transparent = a.transparent);
            void 0 !== a.alphaTest && (c.alphaTest = a.alphaTest);
            void 0 !== a.depthTest && (c.depthTest = a.depthTest);
            void 0 !== a.depthWrite && (c.depthWrite = a.depthWrite);
            void 0 !== a.colorWrite && (c.colorWrite = a.colorWrite);
            void 0 !== a.wireframe && (c.wireframe = a.wireframe);
            void 0 !== a.wireframeLinewidth && (c.wireframeLinewidth = a.wireframeLinewidth);
            void 0 !== a.wireframeLinecap &&
                (c.wireframeLinecap = a.wireframeLinecap);
            void 0 !== a.wireframeLinejoin && (c.wireframeLinejoin = a.wireframeLinejoin);
            void 0 !== a.skinning && (c.skinning = a.skinning);
            void 0 !== a.morphTargets && (c.morphTargets = a.morphTargets);
            void 0 !== a.size && (c.size = a.size);
            void 0 !== a.sizeAttenuation && (c.sizeAttenuation = a.sizeAttenuation);
            void 0 !== a.map && (c.map = b(a.map));
            void 0 !== a.alphaMap && (c.alphaMap = b(a.alphaMap), c.transparent = !0);
            void 0 !== a.bumpMap && (c.bumpMap = b(a.bumpMap));
            void 0 !== a.bumpScale && (c.bumpScale = a.bumpScale);
            void 0 !== a.normalMap && (c.normalMap = b(a.normalMap));
            if (void 0 !== a.normalScale) {
                var d = a.normalScale;
                !1 === Array.isArray(d) && (d = [d, d]);
                c.normalScale = (new v).fromArray(d)
            }
            void 0 !== a.displacementMap && (c.displacementMap = b(a.displacementMap));
            void 0 !== a.displacementScale && (c.displacementScale = a.displacementScale);
            void 0 !== a.displacementBias && (c.displacementBias = a.displacementBias);
            void 0 !== a.roughnessMap && (c.roughnessMap = b(a.roughnessMap));
            void 0 !== a.metalnessMap && (c.metalnessMap = b(a.metalnessMap));
            void 0 !==
                a.emissiveMap && (c.emissiveMap = b(a.emissiveMap));
            void 0 !== a.emissiveIntensity && (c.emissiveIntensity = a.emissiveIntensity);
            void 0 !== a.specularMap && (c.specularMap = b(a.specularMap));
            void 0 !== a.envMap && (c.envMap = b(a.envMap));
            void 0 !== a.reflectivity && (c.reflectivity = a.reflectivity);
            void 0 !== a.lightMap && (c.lightMap = b(a.lightMap));
            void 0 !== a.lightMapIntensity && (c.lightMapIntensity = a.lightMapIntensity);
            void 0 !== a.aoMap && (c.aoMap = b(a.aoMap));
            void 0 !== a.aoMapIntensity && (c.aoMapIntensity = a.aoMapIntensity);
            if (void 0 !==
                a.materials)
                for (var d = 0, k = a.materials.length; d < k; d++) c.materials.push(this.parse(a.materials[d]));
            return c
        }
    });
    Object.assign(ib.prototype, {
        load: function(a, b, e, c) {
            var d = this;
            (new wb(d.manager)).load(a, function(a) {
                b(d.parse(JSON.parse(a)))
            }, e, c)
        },
        parse: function(a) {
            var b = new W,
                e = a.data.index,
                c = {
                    Int8Array: Int8Array,
                    Uint8Array: Uint8Array,
                    Uint8ClampedArray: Uint8ClampedArray,
                    Int16Array: Int16Array,
                    Uint16Array: Uint16Array,
                    Int32Array: Int32Array,
                    Uint32Array: Uint32Array,
                    Float32Array: Float32Array,
                    Float64Array: Float64Array
                };
            void 0 !== e && (e = new c[e.type](e.array), b.setIndex(new J(e, 1)));
            var d = a.data.attributes,
                k;
            for (k in d) {
                var g = d[k],
                    e = new c[g.type](g.array);
                b.addAttribute(k, new J(e, g.itemSize, g.normalized))
            }
            c = a.data.groups || a.data.drawcalls || a.data.offsets;
            if (void 0 !== c)
                for (k = 0, e = c.length; k !== e; ++k) d = c[k], b.addGroup(d.start, d.count, d.materialIndex);
            a = a.data.boundingSphere;
            void 0 !== a && (c = new r, void 0 !== a.center && c.fromArray(a.center), b.boundingSphere = new La(c, a.radius));
            return b
        }
    });
    Lc.prototype = {
        constructor: Lc,
        crossOrigin: void 0,
        extractUrlBase: function(a) {
            a = a.split("/");
            if (1 === a.length) return "./";
            a.pop();
            return a.join("/") + "/"
        },
        initMaterials: function(a, b, e) {
            for (var c = [], d = 0; d < a.length; ++d) c[d] = this.createMaterial(a[d], b, e);
            return c
        },
        createMaterial: function() {
            var a, b, e;
            return function(c, k, g) {
                function h(a, e, c, f, m) {
                    a = k + a;
                    var n = Lc.Handlers.get(a);
                    null !== n ? a = n.load(a) : (b.setCrossOrigin(g), a = b.load(a));
                    void 0 !== e && (a.repeat.fromArray(e), 1 !== e[0] && (a.wrapS = 1E3), 1 !== e[1] && (a.wrapT = 1E3));
                    void 0 !== c && a.offset.fromArray(c);
                    void 0 !==
                        f && ("repeat" === f[0] && (a.wrapS = 1E3), "mirror" === f[0] && (a.wrapS = 1002), "repeat" === f[1] && (a.wrapT = 1E3), "mirror" === f[1] && (a.wrapT = 1002));
                    void 0 !== m && (a.anisotropy = m);
                    e = d.Math.generateUUID();
                    l[e] = a;
                    return e
                }
                void 0 === a && (a = new G);
                void 0 === b && (b = new uc);
                void 0 === e && (e = new bd);
                var l = {},
                    m = {
                        uuid: d.Math.generateUUID(),
                        type: "MeshLambertMaterial"
                    },
                    n;
                for (n in c) {
                    var w = c[n];
                    switch (n) {
                        case "DbgColor":
                        case "DbgIndex":
                        case "opticalDensity":
                        case "illumination":
                            break;
                        case "DbgName":
                            m.name = w;
                            break;
                        case "blending":
                            m.blending =
                                THREE[w];
                            break;
                        case "colorAmbient":
                        case "mapAmbient":
                            console.warn("THREE.Loader.createMaterial:", n, "is no longer supported.");
                            break;
                        case "colorDiffuse":
                            m.color = a.fromArray(w).getHex();
                            break;
                        case "colorSpecular":
                            m.specular = a.fromArray(w).getHex();
                            break;
                        case "colorEmissive":
                            m.emissive = a.fromArray(w).getHex();
                            break;
                        case "specularCoef":
                            m.shininess = w;
                            break;
                        case "shading":
                            "basic" === w.toLowerCase() && (m.type = "MeshBasicMaterial");
                            "phong" === w.toLowerCase() && (m.type = "MeshPhongMaterial");
                            "standard" === w.toLowerCase() &&
                                (m.type = "MeshStandardMaterial");
                            break;
                        case "mapDiffuse":
                            m.map = h(w, c.mapDiffuseRepeat, c.mapDiffuseOffset, c.mapDiffuseWrap, c.mapDiffuseAnisotropy);
                            break;
                        case "mapDiffuseRepeat":
                        case "mapDiffuseOffset":
                        case "mapDiffuseWrap":
                        case "mapDiffuseAnisotropy":
                            break;
                        case "mapEmissive":
                            m.emissiveMap = h(w, c.mapEmissiveRepeat, c.mapEmissiveOffset, c.mapEmissiveWrap, c.mapEmissiveAnisotropy);
                            break;
                        case "mapEmissiveRepeat":
                        case "mapEmissiveOffset":
                        case "mapEmissiveWrap":
                        case "mapEmissiveAnisotropy":
                            break;
                        case "mapLight":
                            m.lightMap =
                                h(w, c.mapLightRepeat, c.mapLightOffset, c.mapLightWrap, c.mapLightAnisotropy);
                            break;
                        case "mapLightRepeat":
                        case "mapLightOffset":
                        case "mapLightWrap":
                        case "mapLightAnisotropy":
                            break;
                        case "mapAO":
                            m.aoMap = h(w, c.mapAORepeat, c.mapAOOffset, c.mapAOWrap, c.mapAOAnisotropy);
                            break;
                        case "mapAORepeat":
                        case "mapAOOffset":
                        case "mapAOWrap":
                        case "mapAOAnisotropy":
                            break;
                        case "mapBump":
                            m.bumpMap = h(w, c.mapBumpRepeat, c.mapBumpOffset, c.mapBumpWrap, c.mapBumpAnisotropy);
                            break;
                        case "mapBumpScale":
                            m.bumpScale = w;
                            break;
                        case "mapBumpRepeat":
                        case "mapBumpOffset":
                        case "mapBumpWrap":
                        case "mapBumpAnisotropy":
                            break;
                        case "mapNormal":
                            m.normalMap = h(w, c.mapNormalRepeat, c.mapNormalOffset, c.mapNormalWrap, c.mapNormalAnisotropy);
                            break;
                        case "mapNormalFactor":
                            m.normalScale = [w, w];
                            break;
                        case "mapNormalRepeat":
                        case "mapNormalOffset":
                        case "mapNormalWrap":
                        case "mapNormalAnisotropy":
                            break;
                        case "mapSpecular":
                            m.specularMap = h(w, c.mapSpecularRepeat, c.mapSpecularOffset, c.mapSpecularWrap, c.mapSpecularAnisotropy);
                            break;
                        case "mapSpecularRepeat":
                        case "mapSpecularOffset":
                        case "mapSpecularWrap":
                        case "mapSpecularAnisotropy":
                            break;
                        case "mapMetalness":
                            m.metalnessMap =
                                h(w, c.mapMetalnessRepeat, c.mapMetalnessOffset, c.mapMetalnessWrap, c.mapMetalnessAnisotropy);
                            break;
                        case "mapMetalnessRepeat":
                        case "mapMetalnessOffset":
                        case "mapMetalnessWrap":
                        case "mapMetalnessAnisotropy":
                            break;
                        case "mapRoughness":
                            m.roughnessMap = h(w, c.mapRoughnessRepeat, c.mapRoughnessOffset, c.mapRoughnessWrap, c.mapRoughnessAnisotropy);
                            break;
                        case "mapRoughnessRepeat":
                        case "mapRoughnessOffset":
                        case "mapRoughnessWrap":
                        case "mapRoughnessAnisotropy":
                            break;
                        case "mapAlpha":
                            m.alphaMap = h(w, c.mapAlphaRepeat,
                                c.mapAlphaOffset, c.mapAlphaWrap, c.mapAlphaAnisotropy);
                            break;
                        case "mapAlphaRepeat":
                        case "mapAlphaOffset":
                        case "mapAlphaWrap":
                        case "mapAlphaAnisotropy":
                            break;
                        case "flipSided":
                            m.side = 1;
                            break;
                        case "doubleSided":
                            m.side = 2;
                            break;
                        case "transparency":
                            console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity");
                            m.opacity = w;
                            break;
                        case "depthTest":
                        case "depthWrite":
                        case "colorWrite":
                        case "opacity":
                        case "reflectivity":
                        case "transparent":
                        case "visible":
                        case "wireframe":
                            m[n] = w;
                            break;
                        case "vertexColors":
                            !0 ===
                                w && (m.vertexColors = 2);
                            "face" === w && (m.vertexColors = 1);
                            break;
                        default:
                            console.error("THREE.Loader.createMaterial: Unsupported", n, w)
                    }
                }
                "MeshBasicMaterial" === m.type && delete m.emissive;
                "MeshPhongMaterial" !== m.type && delete m.specular;
                1 > m.opacity && (m.transparent = !0);
                e.setTextures(l);
                return e.parse(m)
            }
        }()
    };
    Lc.Handlers = {
        handlers: [],
        add: function(a, b) {
            this.handlers.push(a, b)
        },
        get: function(a) {
            for (var b = this.handlers, e = 0, c = b.length; e < c; e += 2) {
                var d = b[e + 1];
                if (b[e].test(a)) return d
            }
            return null
        }
    };
    Object.assign(fe.prototype, {
        load: function(a, b, e, c) {
            var d = this,
                k = this.texturePath && "string" === typeof this.texturePath ? this.texturePath : Lc.prototype.extractUrlBase(a),
                g = new wb(this.manager);
            g.setWithCredentials(this.withCredentials);
            g.load(a, function(e) {
                e = JSON.parse(e);
                var c = e.metadata;
                if (void 0 !== c && (c = c.type, void 0 !== c)) {
                    if ("object" === c.toLowerCase()) {
                        console.error("THREE.JSONLoader: " + a + " should be loaded with THREE.ObjectLoader instead.");
                        return
                    }
                    if ("scene" === c.toLowerCase()) {
                        console.error("THREE.JSONLoader: " + a + " should be loaded with THREE.SceneLoader instead.");
                        return
                    }
                }
                e = d.parse(e, k);
                b(e.geometry, e.materials)
            }, e, c)
        },
        setTexturePath: function(a) {
            this.texturePath = a
        },
        parse: function(a, b) {
            var e = new ba,
                c = void 0 !== a.scale ? 1 / a.scale : 1;
            (function(b) {
                var c, f, d, k, g, h, l, m, n, w, t, A, p, u = a.faces;
                h = a.vertices;
                var E = a.normals,
                    H = a.colors,
                    O = 0;
                if (void 0 !== a.uvs) {
                    for (c = 0; c < a.uvs.length; c++) a.uvs[c].length && O++;
                    for (c = 0; c < O; c++) e.faceVertexUvs[c] = []
                }
                k = 0;
                for (g = h.length; k < g;) c = new r, c.x = h[k++] * b, c.y = h[k++] * b, c.z = h[k++] * b, e.vertices.push(c);
                k = 0;
                for (g = u.length; k < g;)
                    if (b = u[k++], n = b & 1,
                        d = b & 2, c = b & 8, l = b & 16, w = b & 32, h = b & 64, b &= 128, n) {
                        n = new ja;
                        n.a = u[k];
                        n.b = u[k + 1];
                        n.c = u[k + 3];
                        t = new ja;
                        t.a = u[k + 1];
                        t.b = u[k + 2];
                        t.c = u[k + 3];
                        k += 4;
                        d && (d = u[k++], n.materialIndex = d, t.materialIndex = d);
                        d = e.faces.length;
                        if (c)
                            for (c = 0; c < O; c++)
                                for (A = a.uvs[c], e.faceVertexUvs[c][d] = [], e.faceVertexUvs[c][d + 1] = [], f = 0; 4 > f; f++) m = u[k++], p = A[2 * m], m = A[2 * m + 1], p = new v(p, m), 2 !== f && e.faceVertexUvs[c][d].push(p), 0 !== f && e.faceVertexUvs[c][d + 1].push(p);
                        l && (l = 3 * u[k++], n.normal.set(E[l++], E[l++], E[l]), t.normal.copy(n.normal));
                        if (w)
                            for (c = 0; 4 >
                                c; c++) l = 3 * u[k++], w = new r(E[l++], E[l++], E[l]), 2 !== c && n.vertexNormals.push(w), 0 !== c && t.vertexNormals.push(w);
                        h && (h = u[k++], h = H[h], n.color.setHex(h), t.color.setHex(h));
                        if (b)
                            for (c = 0; 4 > c; c++) h = u[k++], h = H[h], 2 !== c && n.vertexColors.push(new G(h)), 0 !== c && t.vertexColors.push(new G(h));
                        e.faces.push(n);
                        e.faces.push(t)
                    } else {
                        n = new ja;
                        n.a = u[k++];
                        n.b = u[k++];
                        n.c = u[k++];
                        d && (d = u[k++], n.materialIndex = d);
                        d = e.faces.length;
                        if (c)
                            for (c = 0; c < O; c++)
                                for (A = a.uvs[c], e.faceVertexUvs[c][d] = [], f = 0; 3 > f; f++) m = u[k++], p = A[2 * m], m = A[2 * m +
                                    1], p = new v(p, m), e.faceVertexUvs[c][d].push(p);
                        l && (l = 3 * u[k++], n.normal.set(E[l++], E[l++], E[l]));
                        if (w)
                            for (c = 0; 3 > c; c++) l = 3 * u[k++], w = new r(E[l++], E[l++], E[l]), n.vertexNormals.push(w);
                        h && (h = u[k++], n.color.setHex(H[h]));
                        if (b)
                            for (c = 0; 3 > c; c++) h = u[k++], n.vertexColors.push(new G(H[h]));
                        e.faces.push(n)
                    }
            })(c);
            (function() {
                var b = void 0 !== a.influencesPerVertex ? a.influencesPerVertex : 2;
                if (a.skinWeights)
                    for (var c = 0, f = a.skinWeights.length; c < f; c += b) e.skinWeights.push(new na(a.skinWeights[c], 1 < b ? a.skinWeights[c + 1] : 0,
                        2 < b ? a.skinWeights[c + 2] : 0, 3 < b ? a.skinWeights[c + 3] : 0));
                if (a.skinIndices)
                    for (c = 0, f = a.skinIndices.length; c < f; c += b) e.skinIndices.push(new na(a.skinIndices[c], 1 < b ? a.skinIndices[c + 1] : 0, 2 < b ? a.skinIndices[c + 2] : 0, 3 < b ? a.skinIndices[c + 3] : 0));
                e.bones = a.bones;
                e.bones && 0 < e.bones.length && (e.skinWeights.length !== e.skinIndices.length || e.skinIndices.length !== e.vertices.length) && console.warn("When skinning, number of vertices (" + e.vertices.length + "), skinIndices (" + e.skinIndices.length + "), and skinWeights (" + e.skinWeights.length +
                    ") should match.")
            })();
            (function(b) {
                if (void 0 !== a.morphTargets)
                    for (var c = 0, f = a.morphTargets.length; c < f; c++) {
                        e.morphTargets[c] = {};
                        e.morphTargets[c].name = a.morphTargets[c].name;
                        e.morphTargets[c].vertices = [];
                        for (var d = e.morphTargets[c].vertices, k = a.morphTargets[c].vertices, g = 0, h = k.length; g < h; g += 3) {
                            var l = new r;
                            l.x = k[g] * b;
                            l.y = k[g + 1] * b;
                            l.z = k[g + 2] * b;
                            d.push(l)
                        }
                    }
                if (void 0 !== a.morphColors && 0 < a.morphColors.length)
                    for (console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.'),
                        b = e.faces, d = a.morphColors[0].colors, c = 0, f = b.length; c < f; c++) b[c].color.fromArray(d, 3 * c)
            })(c);
            (function() {
                var b = [],
                    c = [];
                void 0 !== a.animation && c.push(a.animation);
                void 0 !== a.animations && (a.animations.length ? c = c.concat(a.animations) : c.push(a.animations));
                for (var f = 0; f < c.length; f++) {
                    var d = Xa.parseAnimation(c[f], e.bones);
                    d && b.push(d)
                }
                e.morphTargets && (c = Xa.CreateClipsFromMorphTargetSequences(e.morphTargets, 10), b = b.concat(c));
                0 < b.length && (e.animations = b)
            })();
            e.computeFaceNormals();
            e.computeBoundingSphere();
            if (void 0 === a.materials || 0 === a.materials.length) return {
                geometry: e
            };
            b = Lc.prototype.initMaterials(a.materials, b, this.crossOrigin);
            return {
                geometry: e,
                materials: b
            }
        }
    });
    Object.assign(De.prototype, {
        load: function(a, b, e, c) {
            "" === this.texturePath && (this.texturePath = a.substring(0, a.lastIndexOf("/") + 1));
            var d = this;
            (new wb(d.manager)).load(a, function(a) {
                d.parse(JSON.parse(a), b)
            }, e, c)
        },
        setTexturePath: function(a) {
            this.texturePath = a
        },
        setCrossOrigin: function(a) {
            this.crossOrigin = a
        },
        parse: function(a, b) {
            var e = this.parseGeometries(a.geometries),
                c = this.parseImages(a.images, function() {
                    void 0 !== b && b(d)
                }),
                c = this.parseTextures(a.textures, c),
                c = this.parseMaterials(a.materials, c),
                d = this.parseObject(a.object, e, c);
            a.animations && (d.animations = this.parseAnimations(a.animations));
            void 0 !== a.images && 0 !== a.images.length || void 0 === b || b(d);
            return d
        },
        parseGeometries: function(a) {
            var b = {};
            if (void 0 !== a)
                for (var e = new fe, c = new ib, d = 0, k = a.length; d < k; d++) {
                    var g, h = a[d];
                    switch (h.type) {
                        case "PlaneGeometry":
                        case "PlaneBufferGeometry":
                            g = new THREE[h.type](h.width, h.height,
                                h.widthSegments, h.heightSegments);
                            break;
                        case "BoxGeometry":
                        case "BoxBufferGeometry":
                        case "CubeGeometry":
                            g = new THREE[h.type](h.width, h.height, h.depth, h.widthSegments, h.heightSegments, h.depthSegments);
                            break;
                        case "CircleGeometry":
                        case "CircleBufferGeometry":
                            g = new THREE[h.type](h.radius, h.segments, h.thetaStart, h.thetaLength);
                            break;
                        case "CylinderGeometry":
                        case "CylinderBufferGeometry":
                            g = new THREE[h.type](h.radiusTop, h.radiusBottom, h.height, h.radialSegments, h.heightSegments, h.openEnded, h.thetaStart, h.thetaLength);
                            break;
                        case "ConeGeometry":
                        case "ConeBufferGeometry":
                            g = new THREE[h.type](h.radius, h.height, h.radialSegments, h.heightSegments, h.openEnded, h.thetaStart, h.thetaLength);
                            break;
                        case "SphereGeometry":
                        case "SphereBufferGeometry":
                            g = new THREE[h.type](h.radius, h.widthSegments, h.heightSegments, h.phiStart, h.phiLength, h.thetaStart, h.thetaLength);
                            break;
                        case "DodecahedronGeometry":
                        case "IcosahedronGeometry":
                        case "OctahedronGeometry":
                        case "TetrahedronGeometry":
                            g = new THREE[h.type](h.radius, h.detail);
                            break;
                        case "RingGeometry":
                        case "RingBufferGeometry":
                            g =
                                new THREE[h.type](h.innerRadius, h.outerRadius, h.thetaSegments, h.phiSegments, h.thetaStart, h.thetaLength);
                            break;
                        case "TorusGeometry":
                        case "TorusBufferGeometry":
                            g = new THREE[h.type](h.radius, h.tube, h.radialSegments, h.tubularSegments, h.arc);
                            break;
                        case "TorusKnotGeometry":
                        case "TorusKnotBufferGeometry":
                            g = new THREE[h.type](h.radius, h.tube, h.tubularSegments, h.radialSegments, h.p, h.q);
                            break;
                        case "LatheGeometry":
                        case "LatheBufferGeometry":
                            g = new THREE[h.type](h.points, h.segments, h.phiStart, h.phiLength);
                            break;
                        case "BufferGeometry":
                            g = c.parse(h);
                            break;
                        case "Geometry":
                            g = e.parse(h.data, this.texturePath).geometry;
                            break;
                        default:
                            console.warn('THREE.ObjectLoader: Unsupported geometry type "' + h.type + '"');
                            continue
                    }
                    g.uuid = h.uuid;
                    void 0 !== h.name && (g.name = h.name);
                    b[h.uuid] = g
                }
            return b
        },
        parseMaterials: function(a, b) {
            var e = {};
            if (void 0 !== a) {
                var c = new bd;
                c.setTextures(b);
                b = 0;
                for (var d = a.length; b < d; b++) {
                    var k = c.parse(a[b]);
                    e[k.uuid] = k
                }
            }
            return e
        },
        parseAnimations: function(a) {
            for (var b = [], e = 0; e < a.length; e++) {
                var c = Xa.parse(a[e]);
                b.push(c)
            }
            return b
        },
        parseImages: function(a, b) {
            function e(a) {
                c.manager.itemStart(a);
                return k.load(a, function() {
                    c.manager.itemEnd(a)
                }, void 0, function() {
                    c.manager.itemError(a)
                })
            }
            var c = this,
                d = {};
            if (void 0 !== a && 0 < a.length) {
                b = new ud(b);
                var k = new Jc(b);
                k.setCrossOrigin(this.crossOrigin);
                b = 0;
                for (var g = a.length; b < g; b++) {
                    var h = a[b],
                        l = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(h.url) ? h.url : c.texturePath + h.url;
                    d[h.uuid] = e(l)
                }
            }
            return d
        },
        parseTextures: function(a, b) {
            function e(a) {
                if ("number" === typeof a) return a;
                console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",
                    a);
                return THREE[a]
            }
            var c = {};
            if (void 0 !== a)
                for (var d = 0, k = a.length; d < k; d++) {
                    var g = a[d];
                    void 0 === g.image && console.warn('THREE.ObjectLoader: No "image" specified for', g.uuid);
                    void 0 === b[g.image] && console.warn("THREE.ObjectLoader: Undefined image", g.image);
                    var h = new u(b[g.image]);
                    h.needsUpdate = !0;
                    h.uuid = g.uuid;
                    void 0 !== g.name && (h.name = g.name);
                    void 0 !== g.mapping && (h.mapping = e(g.mapping));
                    void 0 !== g.offset && h.offset.fromArray(g.offset);
                    void 0 !== g.repeat && h.repeat.fromArray(g.repeat);
                    void 0 !== g.wrap && (h.wrapS =
                        e(g.wrap[0]), h.wrapT = e(g.wrap[1]));
                    void 0 !== g.minFilter && (h.minFilter = e(g.minFilter));
                    void 0 !== g.magFilter && (h.magFilter = e(g.magFilter));
                    void 0 !== g.anisotropy && (h.anisotropy = g.anisotropy);
                    void 0 !== g.flipY && (h.flipY = g.flipY);
                    c[g.uuid] = h
                }
            return c
        },
        parseObject: function() {
            var a = new z;
            return function(b, e, f) {
                function d(a) {
                    void 0 === e[a] && console.warn("THREE.ObjectLoader: Undefined geometry", a);
                    return e[a]
                }

                function k(a) {
                    if (void 0 !== a) return void 0 === f[a] && console.warn("THREE.ObjectLoader: Undefined material",
                        a), f[a]
                }
                var g;
                switch (b.type) {
                    case "Scene":
                        g = new Sb;
                        void 0 !== b.background && Number.isInteger(b.background) && (g.background = new THREE.Color(b.background));
                        void 0 !== b.fog && ("Fog" === b.fog.type ? g.fog = new oc(b.fog.color, b.fog.near, b.fog.far) : "FogExp2" === b.fog.type && (g.fog = new nc(b.fog.color, b.fog.density)));
                        break;
                    case "PerspectiveCamera":
                        g = new Ra(b.fov, b.aspect, b.near, b.far);
                        void 0 !== b.focus && (g.focus = b.focus);
                        void 0 !== b.zoom && (g.zoom = b.zoom);
                        void 0 !== b.filmGauge && (g.filmGauge = b.filmGauge);
                        void 0 !== b.filmOffset &&
                            (g.filmOffset = b.filmOffset);
                        void 0 !== b.view && (g.view = Object.assign({}, b.view));
                        break;
                    case "OrthographicCamera":
                        g = new mc(b.left, b.right, b.top, b.bottom, b.near, b.far);
                        break;
                    case "AmbientLight":
                        g = new c(b.color, b.intensity);
                        break;
                    case "DirectionalLight":
                        g = new ad(b.color, b.intensity);
                        break;
                    case "PointLight":
                        g = new wc(b.color, b.intensity, b.distance, b.decay);
                        break;
                    case "SpotLight":
                        g = new Kc(b.color, b.intensity, b.distance, b.angle, b.penumbra, b.decay);
                        break;
                    case "HemisphereLight":
                        g = new vc(b.color, b.groundColor,
                            b.intensity);
                        break;
                    case "Mesh":
                        g = d(b.geometry);
                        var h = k(b.material);
                        g = g.bones && 0 < g.bones.length ? new Ib(g, h) : new Na(g, h);
                        break;
                    case "LOD":
                        g = new Dc;
                        break;
                    case "Line":
                        g = new Jb(d(b.geometry), k(b.material), b.mode);
                        break;
                    case "LineSegments":
                        g = new Ja(d(b.geometry), k(b.material));
                        break;
                    case "PointCloud":
                    case "Points":
                        g = new zb(d(b.geometry), k(b.material));
                        break;
                    case "Sprite":
                        g = new Cc(k(b.material));
                        break;
                    case "Group":
                        g = new Gc;
                        break;
                    default:
                        g = new M
                }
                g.uuid = b.uuid;
                void 0 !== b.name && (g.name = b.name);
                void 0 !== b.matrix ?
                    (a.fromArray(b.matrix), a.decompose(g.position, g.quaternion, g.scale)) : (void 0 !== b.position && g.position.fromArray(b.position), void 0 !== b.rotation && g.rotation.fromArray(b.rotation), void 0 !== b.quaternion && g.quaternion.fromArray(b.quaternion), void 0 !== b.scale && g.scale.fromArray(b.scale));
                void 0 !== b.castShadow && (g.castShadow = b.castShadow);
                void 0 !== b.receiveShadow && (g.receiveShadow = b.receiveShadow);
                b.shadow && (void 0 !== b.shadow.bias && (g.shadow.bias = b.shadow.bias), void 0 !== b.shadow.radius && (g.shadow.radius =
                    b.shadow.radius), void 0 !== b.shadow.mapSize && g.shadow.mapSize.fromArray(b.shadow.mapSize), void 0 !== b.shadow.camera && (g.shadow.camera = this.parseObject(b.shadow.camera)));
                void 0 !== b.visible && (g.visible = b.visible);
                void 0 !== b.userData && (g.userData = b.userData);
                if (void 0 !== b.children)
                    for (var l in b.children) g.add(this.parseObject(b.children[l], e, f));
                if ("LOD" === b.type)
                    for (b = b.levels, h = 0; h < b.length; h++) {
                        var m = b[h];
                        l = g.getObjectByProperty("uuid", m.object);
                        void 0 !== l && g.addLevel(l, m.distance)
                    }
                return g
            }
        }()
    });
    d.ShapeUtils = {
        area: function(a) {
            for (var b = a.length, e = 0, c = b - 1, d = 0; d < b; c = d++) e += a[c].x * a[d].y - a[d].x * a[c].y;
            return .5 * e
        },
        triangulate: function() {
            return function(a, b) {
                var e = a.length;
                if (3 > e) return null;
                var c = [],
                    k = [],
                    g = [],
                    h, l, m;
                if (0 < d.ShapeUtils.area(a))
                    for (l = 0; l < e; l++) k[l] = l;
                else
                    for (l = 0; l < e; l++) k[l] = e - 1 - l;
                var n = 2 * e;
                for (l = e - 1; 2 < e;) {
                    if (0 >= n--) {
                        console.warn("THREE.ShapeUtils: Unable to triangulate polygon! in triangulate()");
                        break
                    }
                    h = l;
                    e <= h && (h = 0);
                    l = h + 1;
                    e <= l && (l = 0);
                    m = l + 1;
                    e <= m && (m = 0);
                    var w;
                    a: {
                        var t, y, A, p, r,
                            u, E, v;
                        t = a[k[h]].x;
                        y = a[k[h]].y;
                        A = a[k[l]].x;
                        p = a[k[l]].y;
                        r = a[k[m]].x;
                        u = a[k[m]].y;
                        if (Number.EPSILON > (A - t) * (u - y) - (p - y) * (r - t)) w = !1;
                        else {
                            var H, O, B, T, z, x, L, N, Y, ca;
                            H = r - A;
                            O = u - p;
                            B = t - r;
                            T = y - u;
                            z = A - t;
                            x = p - y;
                            for (w = 0; w < e; w++)
                                if (E = a[k[w]].x, v = a[k[w]].y, !(E === t && v === y || E === A && v === p || E === r && v === u) && (L = E - t, N = v - y, Y = E - A, ca = v - p, E -= r, v -= u, Y = H * ca - O * Y, L = z * N - x * L, N = B * v - T * E, Y >= -Number.EPSILON && N >= -Number.EPSILON && L >= -Number.EPSILON)) {
                                    w = !1;
                                    break a
                                }
                            w = !0
                        }
                    }
                    if (w) {
                        c.push([a[k[h]], a[k[l]], a[k[m]]]);
                        g.push([k[h], k[l], k[m]]);
                        h = l;
                        for (m =
                            l + 1; m < e; h++, m++) k[h] = k[m];
                        e--;
                        n = 2 * e
                    }
                }
                return b ? g : c
            }
        }(),
        triangulateShape: function(a, b) {
            function e(a) {
                var b = a.length;
                2 < b && a[b - 1].equals(a[0]) && a.pop()
            }

            function c(a, b, e) {
                return a.x !== b.x ? a.x < b.x ? a.x <= e.x && e.x <= b.x : b.x <= e.x && e.x <= a.x : a.y < b.y ? a.y <= e.y && e.y <= b.y : b.y <= e.y && e.y <= a.y
            }

            function k(a, b, e, d, g) {
                var h = b.x - a.x,
                    l = b.y - a.y,
                    q = d.x - e.x,
                    m = d.y - e.y,
                    n = a.x - e.x,
                    w = a.y - e.y,
                    t = l * q - h * m,
                    D = l * n - h * w;
                if (Math.abs(t) > Number.EPSILON) {
                    if (0 < t) {
                        if (0 > D || D > t) return [];
                        q = m * n - q * w;
                        if (0 > q || q > t) return []
                    } else {
                        if (0 < D || D < t) return [];
                        q = m *
                            n - q * w;
                        if (0 < q || q < t) return []
                    }
                    if (0 === q) return !g || 0 !== D && D !== t ? [a] : [];
                    if (q === t) return !g || 0 !== D && D !== t ? [b] : [];
                    if (0 === D) return [e];
                    if (D === t) return [d];
                    g = q / t;
                    return [{
                        x: a.x + g * h,
                        y: a.y + g * l
                    }]
                }
                if (0 !== D || m * n !== q * w) return [];
                l = 0 === h && 0 === l;
                q = 0 === q && 0 === m;
                if (l && q) return a.x !== e.x || a.y !== e.y ? [] : [a];
                if (l) return c(e, d, a) ? [a] : [];
                if (q) return c(a, b, e) ? [e] : [];
                0 !== h ? (a.x < b.x ? (h = a, q = a.x, l = b, a = b.x) : (h = b, q = b.x, l = a, a = a.x), e.x < d.x ? (b = e, t = e.x, m = d, e = d.x) : (b = d, t = d.x, m = e, e = e.x)) : (a.y < b.y ? (h = a, q = a.y, l = b, a = b.y) : (h = b, q = b.y, l = a, a = a.y),
                    e.y < d.y ? (b = e, t = e.y, m = d, e = d.y) : (b = d, t = d.y, m = e, e = e.y));
                return q <= t ? a < t ? [] : a === t ? g ? [] : [b] : a <= e ? [b, l] : [b, m] : q > e ? [] : q === e ? g ? [] : [h] : a <= e ? [h, l] : [h, m]
            }

            function g(a, b, e, c) {
                var f = b.x - a.x,
                    d = b.y - a.y;
                b = e.x - a.x;
                e = e.y - a.y;
                var k = c.x - a.x;
                c = c.y - a.y;
                a = f * e - d * b;
                f = f * c - d * k;
                return Math.abs(a) > Number.EPSILON ? (b = k * e - c * b, 0 < a ? 0 <= f && 0 <= b : 0 <= f || 0 <= b) : 0 < f
            }
            e(a);
            b.forEach(e);
            var h, l, m, n = {},
                w = a.concat();
            h = 0;
            for (l = b.length; h < l; h++) Array.prototype.push.apply(w, b[h]);
            h = 0;
            for (l = w.length; h < l; h++) m = w[h].x + ":" + w[h].y, void 0 !== n[m] && console.warn("THREE.ShapeUtils: Duplicate point",
                m, h), n[m] = h;
            h = function(a, b) {
                function e(a, b) {
                    var c = d.length - 1,
                        f = a - 1;
                    0 > f && (f = c);
                    var k = a + 1;
                    k > c && (k = 0);
                    c = g(d[a], d[f], d[k], h[b]);
                    if (!c) return !1;
                    c = h.length - 1;
                    f = b - 1;
                    0 > f && (f = c);
                    k = b + 1;
                    k > c && (k = 0);
                    return (c = g(h[b], h[f], h[k], d[a])) ? !0 : !1
                }

                function c(a, b) {
                    var e, f;
                    for (e = 0; e < d.length; e++)
                        if (f = e + 1, f %= d.length, f = k(a, b, d[e], d[f], !0), 0 < f.length) return !0;
                    return !1
                }

                function f(a, e) {
                    var c, d, g, h;
                    for (c = 0; c < l.length; c++)
                        for (d = b[l[c]], g = 0; g < d.length; g++)
                            if (h = g + 1, h %= d.length, h = k(a, e, d[g], d[h], !0), 0 < h.length) return !0;
                    return !1
                }
                var d =
                    a.concat(),
                    h, l = [],
                    m, n, w, t, C;
                a = [];
                var A, p, r, u = 0;
                for (m = b.length; u < m; u++) l.push(u);
                A = 0;
                for (var E = 2 * l.length; 0 < l.length;) {
                    E--;
                    if (0 > E) {
                        console.log("Infinite Loop! Holes left:" + l.length + ", Probably Hole outside Shape!");
                        break
                    }
                    for (n = A; n < d.length; n++) {
                        w = d[n];
                        m = -1;
                        for (u = 0; u < l.length; u++)
                            if (t = l[u], C = w.x + ":" + w.y + ":" + t, void 0 === a[C]) {
                                h = b[t];
                                for (p = 0; p < h.length; p++)
                                    if (t = h[p], e(n, p) && !c(w, t) && !f(w, t)) {
                                        m = p;
                                        l.splice(u, 1);
                                        A = d.slice(0, n + 1);
                                        t = d.slice(n);
                                        p = h.slice(m);
                                        r = h.slice(0, m + 1);
                                        d = A.concat(p).concat(r).concat(t);
                                        A = n;
                                        break
                                    }
                                if (0 <= m) break;
                                a[C] = !0
                            }
                        if (0 <= m) break
                    }
                }
                return d
            }(a, b);
            w = d.ShapeUtils.triangulate(h, !1);
            h = 0;
            for (l = w.length; h < l; h++)
                for (b = w[h], a = 0; 3 > a; a++) m = b[a].x + ":" + b[a].y, m = n[m], void 0 !== m && (b[a] = m);
            return w.concat()
        },
        isClockWise: function(a) {
            return 0 > d.ShapeUtils.area(a)
        },
        b2: function() {
            return function(a, b, e, c) {
                var d = 1 - a;
                return d * d * b + 2 * (1 - a) * a * e + a * a * c
            }
        }(),
        b3: function() {
            return function(a, b, e, c, d) {
                var k = 1 - a,
                    g = 1 - a;
                return k * k * k * b + 3 * g * g * a * e + 3 * (1 - a) * a * a * c + a * a * a * d
            }
        }()
    };
    lb.prototype = {
        constructor: lb,
        getPoint: function(a) {
            console.warn("THREE.Curve: Warning, getPoint() not implemented!");
            return null
        },
        getPointAt: function(a) {
            a = this.getUtoTmapping(a);
            return this.getPoint(a)
        },
        getPoints: function(a) {
            a || (a = 5);
            for (var b = [], e = 0; e <= a; e++) b.push(this.getPoint(e / a));
            return b
        },
        getSpacedPoints: function(a) {
            a || (a = 5);
            for (var b = [], e = 0; e <= a; e++) b.push(this.getPointAt(e / a));
            return b
        },
        getLength: function() {
            var a = this.getLengths();
            return a[a.length - 1]
        },
        getLengths: function(a) {
            a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200);
            if (this.cacheArcLengths && this.cacheArcLengths.length === a + 1 && !this.needsUpdate) return this.cacheArcLengths;
            this.needsUpdate = !1;
            var b = [],
                e, c = this.getPoint(0),
                d, k = 0;
            b.push(0);
            for (d = 1; d <= a; d++) e = this.getPoint(d / a), k += e.distanceTo(c), b.push(k), c = e;
            return this.cacheArcLengths = b
        },
        updateArcLengths: function() {
            this.needsUpdate = !0;
            this.getLengths()
        },
        getUtoTmapping: function(a, b) {
            var e = this.getLengths(),
                c = e.length;
            b = b ? b : a * e[c - 1];
            for (var d = 0, k = c - 1, g; d <= k;)
                if (a = Math.floor(d + (k - d) / 2), g = e[a] - b, 0 > g) d = a + 1;
                else if (0 < g) k = a - 1;
            else {
                k = a;
                break
            }
            a = k;
            if (e[a] === b) return a / (c - 1);
            d = e[a];
            return (a + (b - d) / (e[a + 1] - d)) / (c - 1)
        },
        getTangent: function(a) {
            var b =
                a - 1E-4;
            a += 1E-4;
            0 > b && (b = 0);
            1 < a && (a = 1);
            b = this.getPoint(b);
            return this.getPoint(a).clone().sub(b).normalize()
        },
        getTangentAt: function(a) {
            a = this.getUtoTmapping(a);
            return this.getTangent(a)
        }
    };
    lb.create = function(a, b) {
        a.prototype = Object.create(lb.prototype);
        a.prototype.constructor = a;
        a.prototype.getPoint = b;
        return a
    };
    U.prototype = Object.create(lb.prototype);
    U.prototype.constructor = U;
    U.prototype.isLineCurve = !0;
    U.prototype.getPoint = function(a) {
        if (1 === a) return this.v2.clone();
        var b = this.v2.clone().sub(this.v1);
        b.multiplyScalar(a).add(this.v1);
        return b
    };
    U.prototype.getPointAt = function(a) {
        return this.getPoint(a)
    };
    U.prototype.getTangent = function(a) {
        return this.v2.clone().sub(this.v1).normalize()
    };
    ga.prototype = Object.assign(Object.create(lb.prototype), {
        constructor: ga,
        add: function(a) {
            this.curves.push(a)
        },
        closePath: function() {
            var a = this.curves[0].getPoint(0),
                b = this.curves[this.curves.length - 1].getPoint(1);
            a.equals(b) || this.curves.push(new U(b, a))
        },
        getPoint: function(a) {
            var b = a * this.getLength(),
                e = this.getCurveLengths();
            for (a = 0; a < e.length;) {
                if (e[a] >= b) return b = e[a] - b, a = this.curves[a], e = a.getLength(), a.getPointAt(0 === e ? 0 : 1 - b / e);
                a++
            }
            return null
        },
        getLength: function() {
            var a = this.getCurveLengths();
            return a[a.length - 1]
        },
        updateArcLengths: function() {
            this.needsUpdate = !0;
            this.cacheLengths = null;
            this.getLengths()
        },
        getCurveLengths: function() {
            if (this.cacheLengths && this.cacheLengths.length === this.curves.length) return this.cacheLengths;
            for (var a = [], b = 0, e = 0, c = this.curves.length; e < c; e++) b += this.curves[e].getLength(), a.push(b);
            return this.cacheLengths =
                a
        },
        getSpacedPoints: function(a) {
            a || (a = 40);
            for (var b = [], e = 0; e <= a; e++) b.push(this.getPoint(e / a));
            this.autoClose && b.push(b[0]);
            return b
        },
        getPoints: function(a) {
            a = a || 12;
            for (var b = [], e, c = 0, d = this.curves; c < d.length; c++)
                for (var k = d[c], k = k.getPoints(k && k.isEllipseCurve ? 2 * a : k && k.isLineCurve ? 1 : k && k.isSplineCurve ? a * k.points.length : a), g = 0; g < k.length; g++) {
                    var h = k[g];
                    e && e.equals(h) || (b.push(h), e = h)
                }
            this.autoClose && 1 < b.length && !b[b.length - 1].equals(b[0]) && b.push(b[0]);
            return b
        },
        createPointsGeometry: function(a) {
            a =
                this.getPoints(a);
            return this.createGeometry(a)
        },
        createSpacedPointsGeometry: function(a) {
            a = this.getSpacedPoints(a);
            return this.createGeometry(a)
        },
        createGeometry: function(a) {
            for (var b = new ba, e = 0, c = a.length; e < c; e++) {
                var d = a[e];
                b.vertices.push(new r(d.x, d.y, d.z || 0))
            }
            return b
        }
    });
    Mb.prototype = Object.create(lb.prototype);
    Mb.prototype.constructor = Mb;
    Mb.prototype.isEllipseCurve = !0;
    Mb.prototype.getPoint = function(a) {
        for (var b = 2 * Math.PI, e = this.aEndAngle - this.aStartAngle, c = Math.abs(e) < Number.EPSILON; 0 > e;) e += b;
        for (; e > b;) e -= b;
        e < Number.EPSILON && (e = c ? 0 : b);
        !0 !== this.aClockwise || c || (e = e === b ? -b : e - b);
        b = this.aStartAngle + a * e;
        a = this.aX + this.xRadius * Math.cos(b);
        var d = this.aY + this.yRadius * Math.sin(b);
        0 !== this.aRotation && (b = Math.cos(this.aRotation), e = Math.sin(this.aRotation), c = a - this.aX, d -= this.aY, a = c * b - d * e + this.aX, d = c * e + d * b + this.aY);
        return new v(a, d)
    };
    d.CurveUtils = {
        tangentQuadraticBezier: function(a, b, e, c) {
            return 2 * (1 - a) * (e - b) + 2 * a * (c - e)
        },
        tangentCubicBezier: function(a, b, e, c, d) {
            return -3 * b * (1 - a) * (1 - a) + 3 * e * (1 - a) * (1 - a) -
                6 * a * e * (1 - a) + 6 * a * c * (1 - a) - 3 * a * a * c + 3 * a * a * d
        },
        tangentSpline: function(a, b, e, c, d) {
            return 6 * a * a - 6 * a + (3 * a * a - 4 * a + 1) + (-6 * a * a + 6 * a) + (3 * a * a - 2 * a)
        },
        interpolate: function(a, b, e, c, d) {
            a = .5 * (e - a);
            c = .5 * (c - b);
            var k = d * d;
            return (2 * b - 2 * e + a + c) * d * k + (-3 * b + 3 * e - 2 * a - c) * k + a * d + b
        }
    };
    Mc.prototype = Object.create(lb.prototype);
    Mc.prototype.constructor = Mc;
    Mc.prototype.isSplineCurve = !0;
    Mc.prototype.getPoint = function(a) {
        var b = this.points;
        a *= b.length - 1;
        var e = Math.floor(a);
        a -= e;
        var c = b[0 === e ? e : e - 1],
            k = b[e],
            g = b[e > b.length - 2 ? b.length - 1 : e + 1],
            b = b[e >
                b.length - 3 ? b.length - 1 : e + 2],
            e = d.CurveUtils.interpolate;
        return new v(e(c.x, k.x, g.x, b.x, a), e(c.y, k.y, g.y, b.y, a))
    };
    Nc.prototype = Object.create(lb.prototype);
    Nc.prototype.constructor = Nc;
    Nc.prototype.getPoint = function(a) {
        var b = d.ShapeUtils.b3;
        return new v(b(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), b(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y))
    };
    Nc.prototype.getTangent = function(a) {
        var b = d.CurveUtils.tangentCubicBezier;
        return (new v(b(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), b(a, this.v0.y, this.v1.y, this.v2.y,
            this.v3.y))).normalize()
    };
    Oc.prototype = Object.create(lb.prototype);
    Oc.prototype.constructor = Oc;
    Oc.prototype.getPoint = function(a) {
        var b = d.ShapeUtils.b2;
        return new v(b(a, this.v0.x, this.v1.x, this.v2.x), b(a, this.v0.y, this.v1.y, this.v2.y))
    };
    Oc.prototype.getTangent = function(a) {
        var b = d.CurveUtils.tangentQuadraticBezier;
        return (new v(b(a, this.v0.x, this.v1.x, this.v2.x), b(a, this.v0.y, this.v1.y, this.v2.y))).normalize()
    };
    var ue = Object.assign(Object.create(ga.prototype), {
        fromPoints: function(a) {
            this.moveTo(a[0].x,
                a[0].y);
            for (var b = 1, e = a.length; b < e; b++) this.lineTo(a[b].x, a[b].y)
        },
        moveTo: function(a, b) {
            this.currentPoint.set(a, b)
        },
        lineTo: function(a, b) {
            var e = new U(this.currentPoint.clone(), new v(a, b));
            this.curves.push(e);
            this.currentPoint.set(a, b)
        },
        quadraticCurveTo: function(a, b, e, c) {
            a = new Oc(this.currentPoint.clone(), new v(a, b), new v(e, c));
            this.curves.push(a);
            this.currentPoint.set(e, c)
        },
        bezierCurveTo: function(a, b, e, c, d, k) {
            a = new Nc(this.currentPoint.clone(), new v(a, b), new v(e, c), new v(d, k));
            this.curves.push(a);
            this.currentPoint.set(d, k)
        },
        splineThru: function(a) {
            var b = [this.currentPoint.clone()].concat(a),
                b = new Mc(b);
            this.curves.push(b);
            this.currentPoint.copy(a[a.length - 1])
        },
        arc: function(a, b, e, c, d, k) {
            this.absarc(a + this.currentPoint.x, b + this.currentPoint.y, e, c, d, k)
        },
        absarc: function(a, b, e, c, d, k) {
            this.absellipse(a, b, e, e, c, d, k)
        },
        ellipse: function(a, b, e, c, d, k, g, h) {
            this.absellipse(a + this.currentPoint.x, b + this.currentPoint.y, e, c, d, k, g, h)
        },
        absellipse: function(a, b, e, c, d, k, g, h) {
            a = new Mb(a, b, e, c, d, k, g, h);
            0 < this.curves.length &&
                (b = a.getPoint(0), b.equals(this.currentPoint) || this.lineTo(b.x, b.y));
            this.curves.push(a);
            a = a.getPoint(1);
            this.currentPoint.copy(a)
        }
    });
    Xb.prototype = Object.create(ba.prototype);
    Xb.prototype.constructor = Xb;
    Xb.NoTaper = function(a) {
        return 1
    };
    Xb.SinusoidalTaper = function(a) {
        return Math.sin(Math.PI * a)
    };
    Xb.FrenetFrames = function(a, b, e) {
        var c = new r,
            k = [],
            g = [],
            h = [],
            l = new r,
            m = new z;
        b += 1;
        var n, w, t;
        this.tangents = k;
        this.normals = g;
        this.binormals = h;
        for (n = 0; n < b; n++) w = n / (b - 1), k[n] = a.getTangentAt(w), k[n].normalize();
        g[0] =
            new r;
        h[0] = new r;
        a = Number.MAX_VALUE;
        n = Math.abs(k[0].x);
        w = Math.abs(k[0].y);
        t = Math.abs(k[0].z);
        n <= a && (a = n, c.set(1, 0, 0));
        w <= a && (a = w, c.set(0, 1, 0));
        t <= a && c.set(0, 0, 1);
        l.crossVectors(k[0], c).normalize();
        g[0].crossVectors(k[0], l);
        h[0].crossVectors(k[0], g[0]);
        for (n = 1; n < b; n++) g[n] = g[n - 1].clone(), h[n] = h[n - 1].clone(), l.crossVectors(k[n - 1], k[n]), l.length() > Number.EPSILON && (l.normalize(), c = Math.acos(d.Math.clamp(k[n - 1].dot(k[n]), -1, 1)), g[n].applyMatrix4(m.makeRotationAxis(l, c))), h[n].crossVectors(k[n], g[n]);
        if (e)
            for (c =
                Math.acos(d.Math.clamp(g[0].dot(g[b - 1]), -1, 1)), c /= b - 1, 0 < k[0].dot(l.crossVectors(g[0], g[b - 1])) && (c = -c), n = 1; n < b; n++) g[n].applyMatrix4(m.makeRotationAxis(k[n], c * n)), h[n].crossVectors(k[n], g[n])
    };
    db.prototype = Object.create(ba.prototype);
    db.prototype.constructor = db;
    db.prototype.addShapeList = function(a, b) {
        for (var e = a.length, c = 0; c < e; c++) this.addShape(a[c], b)
    };
    db.prototype.addShape = function(a, b) {
        function e(a, b, e) {
            b || console.error("THREE.ExtrudeGeometry: vec does not exist");
            return b.clone().multiplyScalar(e).add(a)
        }

        function c(a, b, e) {
            var f, d, k;
            d = a.x - b.x;
            k = a.y - b.y;
            f = e.x - a.x;
            var g = e.y - a.y,
                h = d * d + k * k;
            if (Math.abs(d * g - k * f) > Number.EPSILON) {
                var l = Math.sqrt(h),
                    q = Math.sqrt(f * f + g * g),
                    h = b.x - k / l;
                b = b.y + d / l;
                g = ((e.x - g / q - h) * g - (e.y + f / q - b) * f) / (d * g - k * f);
                f = h + d * g - a.x;
                d = b + k * g - a.y;
                k = f * f + d * d;
                if (2 >= k) return new v(f, d);
                k = Math.sqrt(k / 2)
            } else a = !1, d > Number.EPSILON ? f > Number.EPSILON && (a = !0) : d < -Number.EPSILON ? f < -Number.EPSILON && (a = !0) : Math.sign(k) === Math.sign(g) && (a = !0), a ? (f = -k, k = Math.sqrt(h)) : (f = d, d = k, k = Math.sqrt(h / 2));
            return new v(f / k, d / k)
        }

        function k(a, b) {
            var e, c;
            for (X = a.length; 0 <= --X;) {
                e = X;
                c = X - 1;
                0 > c && (c = a.length - 1);
                var f, d = p + 2 * w;
                for (f = 0; f < d; f++) {
                    var g = ga * f,
                        h = ga * (f + 1),
                        l = b + e + g,
                        g = b + c + g,
                        q = b + c + h,
                        h = b + e + h,
                        l = l + P,
                        g = g + P,
                        q = q + P,
                        h = h + P;
                    ca.faces.push(new ja(l, g, h, null, null, 1));
                    ca.faces.push(new ja(g, q, h, null, null, 1));
                    l = O.generateSideWallUV(ca, l, g, q, h);
                    ca.faceVertexUvs[0].push([l[0], l[1], l[3]]);
                    ca.faceVertexUvs[0].push([l[1], l[2], l[3]])
                }
            }
        }

        function g(a, b, e) {
            ca.vertices.push(new r(a, b, e))
        }

        function h(a, b, e) {
            a += P;
            b += P;
            e += P;
            ca.faces.push(new ja(a, b, e,
                null, null, 0));
            a = O.generateTopUV(ca, a, b, e);
            ca.faceVertexUvs[0].push(a)
        }
        var l = void 0 !== b.amount ? b.amount : 100,
            m = void 0 !== b.bevelThickness ? b.bevelThickness : 6,
            n = void 0 !== b.bevelSize ? b.bevelSize : m - 2,
            w = void 0 !== b.bevelSegments ? b.bevelSegments : 3,
            t = void 0 !== b.bevelEnabled ? b.bevelEnabled : !0,
            A = void 0 !== b.curveSegments ? b.curveSegments : 12,
            p = void 0 !== b.steps ? b.steps : 1,
            u = b.extrudePath,
            E, H = !1,
            O = void 0 !== b.UVGenerator ? b.UVGenerator : db.WorldUVGenerator,
            B, T, z, x;
        u && (E = u.getSpacedPoints(p), H = !0, t = !1, B = void 0 !== b.frames ?
            b.frames : new Xb.FrenetFrames(u, p, !1), T = new r, z = new r, x = new r);
        t || (n = m = w = 0);
        var L, N, Y, ca = this,
            P = this.vertices.length;
        b = a.extractPoints(A);
        a = b.shape;
        var G = b.holes;
        if (b = !d.ShapeUtils.isClockWise(a)) {
            a = a.reverse();
            N = 0;
            for (Y = G.length; N < Y; N++) L = G[N], d.ShapeUtils.isClockWise(L) && (G[N] = L.reverse());
            b = !1
        }
        var wa = d.ShapeUtils.triangulateShape(a, G),
            Pa = a;
        N = 0;
        for (Y = G.length; N < Y; N++) L = G[N], a = a.concat(L);
        var Ca, Da, K, M, J, ga = a.length,
            R, Ma = wa.length;
        b = [];
        var X = 0;
        K = Pa.length;
        Ca = K - 1;
        for (Da = X + 1; X < K; X++, Ca++, Da++) Ca ===
            K && (Ca = 0), Da === K && (Da = 0), b[X] = c(Pa[X], Pa[Ca], Pa[Da]);
        var A = [],
            U, u = b.concat();
        N = 0;
        for (Y = G.length; N < Y; N++) {
            L = G[N];
            U = [];
            X = 0;
            K = L.length;
            Ca = K - 1;
            for (Da = X + 1; X < K; X++, Ca++, Da++) Ca === K && (Ca = 0), Da === K && (Da = 0), U[X] = c(L[X], L[Ca], L[Da]);
            A.push(U);
            u = u.concat(U)
        }
        for (Ca = 0; Ca < w; Ca++) {
            K = Ca / w;
            M = m * Math.cos(K * Math.PI / 2);
            Da = n * Math.sin(K * Math.PI / 2);
            X = 0;
            for (K = Pa.length; X < K; X++) J = e(Pa[X], b[X], Da), g(J.x, J.y, -M);
            N = 0;
            for (Y = G.length; N < Y; N++)
                for (L = G[N], U = A[N], X = 0, K = L.length; X < K; X++) J = e(L[X], U[X], Da), g(J.x, J.y, -M)
        }
        Da = n;
        for (X = 0; X <
            ga; X++) J = t ? e(a[X], u[X], Da) : a[X], H ? (z.copy(B.normals[0]).multiplyScalar(J.x), T.copy(B.binormals[0]).multiplyScalar(J.y), x.copy(E[0]).add(z).add(T), g(x.x, x.y, x.z)) : g(J.x, J.y, 0);
        for (K = 1; K <= p; K++)
            for (X = 0; X < ga; X++) J = t ? e(a[X], u[X], Da) : a[X], H ? (z.copy(B.normals[K]).multiplyScalar(J.x), T.copy(B.binormals[K]).multiplyScalar(J.y), x.copy(E[K]).add(z).add(T), g(x.x, x.y, x.z)) : g(J.x, J.y, l / p * K);
        for (Ca = w - 1; 0 <= Ca; Ca--) {
            K = Ca / w;
            M = m * Math.cos(K * Math.PI / 2);
            Da = n * Math.sin(K * Math.PI / 2);
            X = 0;
            for (K = Pa.length; X < K; X++) J = e(Pa[X],
                b[X], Da), g(J.x, J.y, l + M);
            N = 0;
            for (Y = G.length; N < Y; N++)
                for (L = G[N], U = A[N], X = 0, K = L.length; X < K; X++) J = e(L[X], U[X], Da), H ? g(J.x, J.y + E[p - 1].y, E[p - 1].x + M) : g(J.x, J.y, l + M)
        }(function() {
            if (t) {
                var a = 0 * ga;
                for (X = 0; X < Ma; X++) R = wa[X], h(R[2] + a, R[1] + a, R[0] + a);
                a = ga * (p + 2 * w);
                for (X = 0; X < Ma; X++) R = wa[X], h(R[0] + a, R[1] + a, R[2] + a)
            } else {
                for (X = 0; X < Ma; X++) R = wa[X], h(R[2], R[1], R[0]);
                for (X = 0; X < Ma; X++) R = wa[X], h(R[0] + ga * p, R[1] + ga * p, R[2] + ga * p)
            }
        })();
        (function() {
            var a = 0;
            k(Pa, a);
            a += Pa.length;
            N = 0;
            for (Y = G.length; N < Y; N++) L = G[N], k(L, a), a += L.length
        })()
    };
    db.WorldUVGenerator = {
        generateTopUV: function(a, b, e, c) {
            a = a.vertices;
            b = a[b];
            e = a[e];
            c = a[c];
            return [new v(b.x, b.y), new v(e.x, e.y), new v(c.x, c.y)]
        },
        generateSideWallUV: function(a, b, e, c, d) {
            a = a.vertices;
            b = a[b];
            e = a[e];
            c = a[c];
            d = a[d];
            return .01 > Math.abs(b.y - e.y) ? [new v(b.x, 1 - b.z), new v(e.x, 1 - e.z), new v(c.x, 1 - c.z), new v(d.x, 1 - d.z)] : [new v(b.y, 1 - b.z), new v(e.y, 1 - e.z), new v(c.y, 1 - c.z), new v(d.y, 1 - d.z)]
        }
    };
    Pc.prototype = Object.create(ba.prototype);
    Pc.prototype.constructor = Pc;
    Pc.prototype.addShapeList = function(a, b) {
        for (var e =
                0, c = a.length; e < c; e++) this.addShape(a[e], b);
        return this
    };
    Pc.prototype.addShape = function(a, b) {
        void 0 === b && (b = {});
        var e = b.material,
            c = void 0 === b.UVGenerator ? db.WorldUVGenerator : b.UVGenerator,
            k, g, h = this.vertices.length;
        a = a.extractPoints(void 0 !== b.curveSegments ? b.curveSegments : 12);
        var l = a.shape,
            m = a.holes;
        if (!d.ShapeUtils.isClockWise(l))
            for (l = l.reverse(), a = 0, k = m.length; a < k; a++) g = m[a], d.ShapeUtils.isClockWise(g) && (m[a] = g.reverse());
        b = d.ShapeUtils.triangulateShape(l, m);
        a = 0;
        for (k = m.length; a < k; a++) g = m[a], l =
            l.concat(g);
        m = l.length;
        k = b.length;
        for (a = 0; a < m; a++) g = l[a], this.vertices.push(new r(g.x, g.y, 0));
        for (a = 0; a < k; a++) m = b[a], l = m[0] + h, g = m[1] + h, m = m[2] + h, this.faces.push(new ja(l, g, m, null, null, e)), this.faceVertexUvs[0].push(c.generateTopUV(this, l, g, m))
    };
    cd.prototype = Object.assign(Object.create(ue), {
        constructor: cd,
        extrude: function(a) {
            return new db(this, a)
        },
        makeGeometry: function(a) {
            return new Pc(this, a)
        },
        getPointsHoles: function(a) {
            for (var b = [], e = 0, c = this.holes.length; e < c; e++) b[e] = this.holes[e].getPoints(a);
            return b
        },
        extractAllPoints: function(a) {
            return {
                shape: this.getPoints(a),
                holes: this.getPointsHoles(a)
            }
        },
        extractPoints: function(a) {
            return this.extractAllPoints(a)
        }
    });
    wd.prototype = ue;
    ue.constructor = wd;
    ta.prototype = {
        moveTo: function(a, b) {
            this.currentPath = new wd;
            this.subPaths.push(this.currentPath);
            this.currentPath.moveTo(a, b)
        },
        lineTo: function(a, b) {
            this.currentPath.lineTo(a, b)
        },
        quadraticCurveTo: function(a, b, e, c) {
            this.currentPath.quadraticCurveTo(a, b, e, c)
        },
        bezierCurveTo: function(a, b, e, c, d, k) {
            this.currentPath.bezierCurveTo(a,
                b, e, c, d, k)
        },
        splineThru: function(a) {
            this.currentPath.splineThru(a)
        },
        toShapes: function(a, b) {
            function e(a) {
                for (var b = [], e = 0, c = a.length; e < c; e++) {
                    var f = a[e],
                        d = new cd;
                    d.curves = f.curves;
                    b.push(d)
                }
                return b
            }

            function c(a, b) {
                for (var e = b.length, f = !1, d = e - 1, k = 0; k < e; d = k++) {
                    var g = b[d],
                        h = b[k],
                        l = h.x - g.x,
                        q = h.y - g.y;
                    if (Math.abs(q) > Number.EPSILON) {
                        if (0 > q && (g = b[k], l = -l, h = b[d], q = -q), !(a.y < g.y || a.y > h.y))
                            if (a.y === g.y) {
                                if (a.x === g.x) return !0
                            } else {
                                d = q * (a.x - g.x) - l * (a.y - g.y);
                                if (0 === d) return !0;
                                0 > d || (f = !f)
                            }
                    } else if (a.y === g.y && (h.x <=
                            a.x && a.x <= g.x || g.x <= a.x && a.x <= h.x)) return !0
                }
                return f
            }
            var k = d.ShapeUtils.isClockWise,
                g = this.subPaths;
            if (0 === g.length) return [];
            if (!0 === b) return e(g);
            var h, l, m;
            b = [];
            if (1 === g.length) return l = g[0], m = new cd, m.curves = l.curves, b.push(m), b;
            var n = !k(g[0].getPoints()),
                n = a ? !n : n;
            m = [];
            var w = [],
                t = [],
                A = 0,
                p;
            w[A] = void 0;
            t[A] = [];
            for (var r = 0, u = g.length; r < u; r++) l = g[r], p = l.getPoints(), h = k(p), (h = a ? !h : h) ? (!n && w[A] && A++, w[A] = {
                s: new cd,
                p: p
            }, w[A].s.curves = l.curves, n && A++, t[A] = []) : t[A].push({
                h: l,
                p: p[0]
            });
            if (!w[0]) return e(g);
            if (1 < w.length) {
                r = !1;
                a = [];
                k = 0;
                for (g = w.length; k < g; k++) m[k] = [];
                k = 0;
                for (g = w.length; k < g; k++)
                    for (l = t[k], h = 0; h < l.length; h++) {
                        n = l[h];
                        A = !0;
                        for (p = 0; p < w.length; p++) c(n.p, w[p].p) && (k !== p && a.push({
                            froms: k,
                            tos: p,
                            hole: h
                        }), A ? (A = !1, m[p].push(n)) : r = !0);
                        A && m[k].push(n)
                    }
                0 < a.length && (r || (t = m))
            }
            r = 0;
            for (k = w.length; r < k; r++)
                for (m = w[r].s, b.push(m), a = t[r], g = 0, l = a.length; g < l; g++) m.holes.push(a[g].h);
            return b
        }
    };
    Object.assign(ge.prototype, {
        isFont: !0,
        generateShapes: function(a, b, e) {
            void 0 === b && (b = 100);
            void 0 === e && (e = 4);
            var c = this.data;
            a = String(a).split("");
            var k = b / c.resolution,
                g = 0;
            b = [];
            for (var h = 0; h < a.length; h++) {
                var l;
                l = k;
                var m = g,
                    n = c.glyphs[a[h]] || c.glyphs["?"];
                if (n) {
                    var w = new ta,
                        t = [],
                        A = d.ShapeUtils.b2,
                        p = d.ShapeUtils.b3,
                        r, u, E, v, H, O, B, T;
                    if (n.o)
                        for (var z = n._cachedOutline || (n._cachedOutline = n.o.split(" ")), x = 0, L = z.length; x < L;) switch (z[x++]) {
                            case "m":
                                r = z[x++] * l + m;
                                u = z[x++] * l;
                                w.moveTo(r, u);
                                break;
                            case "l":
                                r = z[x++] * l + m;
                                u = z[x++] * l;
                                w.lineTo(r, u);
                                break;
                            case "q":
                                r = z[x++] * l + m;
                                u = z[x++] * l;
                                H = z[x++] * l + m;
                                O = z[x++] * l;
                                w.quadraticCurveTo(H, O, r, u);
                                if (v = t[t.length - 1]) {
                                    E = v.x;
                                    v = v.y;
                                    for (var N = 1; N <= e; N++) {
                                        var Y = N / e;
                                        A(Y, E, H, r);
                                        A(Y, v, O, u)
                                    }
                                }
                                break;
                            case "b":
                                if (r = z[x++] * l + m, u = z[x++] * l, H = z[x++] * l + m, O = z[x++] * l, B = z[x++] * l + m, T = z[x++] * l, w.bezierCurveTo(H, O, B, T, r, u), v = t[t.length - 1])
                                    for (E = v.x, v = v.y, N = 1; N <= e; N++) Y = N / e, p(Y, E, H, B, r), p(Y, v, O, T, u)
                        }
                    l = {
                        offset: n.ha * l,
                        path: w
                    }
                } else l = void 0;
                g += l.offset;
                b.push(l.path)
            }
            e = [];
            c = 0;
            for (a = b.length; c < a; c++) Array.prototype.push.apply(e, b[c].toShapes());
            return e
        }
    });
    Object.assign(Ee.prototype, {
        load: function(a, b, e, c) {
            var d = this;
            (new wb(this.manager)).load(a, function(a) {
                var e;
                try {
                    e = JSON.parse(a)
                } catch (c) {
                    console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."), e = JSON.parse(a.substring(65, a.length - 2))
                }
                a = d.parse(e);
                b && b(a)
            }, e, c)
        },
        parse: function(a) {
            return new ge(a)
        }
    });
    var he;
    Object.assign(ie.prototype, {
        load: function(a, b, e, c) {
            var d = new wb(this.manager);
            d.setResponseType("arraybuffer");
            d.load(a, function(a) {
                Oa().decodeAudioData(a, function(a) {
                    b(a)
                })
            }, e, c)
        }
    });
    Object.assign(Fe.prototype, {
        update: function() {
            var a, b, e, c, k, g = new z,
                h = new z;
            return function(l) {
                if (a !== l.focus || b !== l.fov || e !== l.aspect * this.aspect || c !== l.near || k !== l.far) {
                    a = l.focus;
                    b = l.fov;
                    e = l.aspect * this.aspect;
                    c = l.near;
                    k = l.far;
                    var m = l.projectionMatrix.clone(),
                        n = this.eyeSep / 2,
                        w = n * c / a,
                        t = c * Math.tan(d.Math.DEG2RAD * b * .5),
                        A;
                    h.elements[12] = -n;
                    g.elements[12] = n;
                    n = -t * e + w;
                    A = t * e + w;
                    m.elements[0] = 2 * c / (A - n);
                    m.elements[8] = (A + n) / (A - n);
                    this.cameraL.projectionMatrix.copy(m);
                    n = -t * e - w;
                    A = t * e - w;
                    m.elements[0] = 2 * c / (A - n);
                    m.elements[8] = (A + n) / (A - n);
                    this.cameraR.projectionMatrix.copy(m)
                }
                this.cameraL.matrixWorld.copy(l.matrixWorld).multiply(h);
                this.cameraR.matrixWorld.copy(l.matrixWorld).multiply(g)
            }
        }()
    });
    Pd.prototype = Object.create(M.prototype);
    Pd.prototype.constructor = Pd;
    ya.prototype = Object.assign(Object.create(M.prototype), {
        constructor: ya,
        getInput: function() {
            return this.gain
        },
        removeFilter: function() {
            null !== this.filter && (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination), this.gain.connect(this.context.destination),
                this.filter = null)
        },
        getFilter: function() {
            return this.filter
        },
        setFilter: function(a) {
            null !== this.filter ? (this.gain.disconnect(this.filter), this.filter.disconnect(this.context.destination)) : this.gain.disconnect(this.context.destination);
            this.filter = a;
            this.gain.connect(this.filter);
            this.filter.connect(this.context.destination)
        },
        getMasterVolume: function() {
            return this.gain.gain.value
        },
        setMasterVolume: function(a) {
            this.gain.gain.value = a
        },
        updateMatrixWorld: function() {
            var a = new r,
                b = new x,
                e = new r,
                c = new r;
            return function(d) {
                M.prototype.updateMatrixWorld.call(this,
                    d);
                d = this.context.listener;
                var k = this.up;
                this.matrixWorld.decompose(a, b, e);
                c.set(0, 0, -1).applyQuaternion(b);
                d.setPosition(a.x, a.y, a.z);
                d.setOrientation(c.x, c.y, c.z, k.x, k.y, k.z)
            }
        }()
    });
    dd.prototype = Object.assign(Object.create(M.prototype), {
        constructor: dd,
        getOutput: function() {
            return this.gain
        },
        setNodeSource: function(a) {
            this.hasPlaybackControl = !1;
            this.sourceType = "audioNode";
            this.source = a;
            this.connect();
            return this
        },
        setBuffer: function(a) {
            this.source.buffer = a;
            this.sourceType = "buffer";
            this.autoplay && this.play();
            return this
        },
        play: function() {
            if (!0 === this.isPlaying) console.warn("THREE.Audio: Audio is already playing.");
            else if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");
            else {
                var a = this.context.createBufferSource();
                a.buffer = this.source.buffer;
                a.loop = this.source.loop;
                a.onended = this.source.onended;
                a.start(0, this.startTime);
                a.playbackRate.value = this.playbackRate;
                this.isPlaying = !0;
                this.source = a;
                return this.connect()
            }
        },
        pause: function() {
            if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");
            else return this.source.stop(), this.startTime = this.context.currentTime, this.isPlaying = !1, this
        },
        stop: function() {
            if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");
            else return this.source.stop(), this.startTime = 0, this.isPlaying = !1, this
        },
        connect: function() {
            if (0 < this.filters.length) {
                this.source.connect(this.filters[0]);
                for (var a = 1, b = this.filters.length; a < b; a++) this.filters[a - 1].connect(this.filters[a]);
                this.filters[this.filters.length - 1].connect(this.getOutput())
            } else this.source.connect(this.getOutput());
            return this
        },
        disconnect: function() {
            if (0 < this.filters.length) {
                this.source.disconnect(this.filters[0]);
                for (var a = 1, b = this.filters.length; a < b; a++) this.filters[a - 1].disconnect(this.filters[a]);
                this.filters[this.filters.length - 1].disconnect(this.getOutput())
            } else this.source.disconnect(this.getOutput());
            return this
        },
        getFilters: function() {
            return this.filters
        },
        setFilters: function(a) {
            a || (a = []);
            !0 === this.isPlaying ? (this.disconnect(), this.filters = a, this.connect()) : this.filters = a;
            return this
        },
        getFilter: function() {
            return this.getFilters()[0]
        },
        setFilter: function(a) {
            return this.setFilters(a ? [a] : [])
        },
        setPlaybackRate: function(a) {
            if (!1 === this.hasPlaybackControl) console.warn("THREE.Audio: this Audio has no playback control.");
            else return this.playbackRate = a, !0 === this.isPlaying && (this.source.playbackRate.value = this.playbackRate), this
        },
        getPlaybackRate: function() {
            return this.playbackRate
        },
        onEnded: function() {
            this.isPlaying = !1
        },
        getLoop: function() {
            return !1 === this.hasPlaybackControl ? (console.warn("THREE.Audio: this Audio has no playback control."), !1) : this.source.loop
        },
        setLoop: function(a) {
            !1 === this.hasPlaybackControl ? console.warn("THREE.Audio: this Audio has no playback control.") : this.source.loop = a
        },
        getVolume: function() {
            return this.gain.gain.value
        },
        setVolume: function(a) {
            this.gain.gain.value = a;
            return this
        }
    });
    je.prototype = Object.assign(Object.create(dd.prototype), {
        constructor: je,
        getOutput: function() {
            return this.panner
        },
        getRefDistance: function() {
            return this.panner.refDistance
        },
        setRefDistance: function(a) {
            this.panner.refDistance = a
        },
        getRolloffFactor: function() {
            return this.panner.rolloffFactor
        },
        setRolloffFactor: function(a) {
            this.panner.rolloffFactor = a
        },
        getDistanceModel: function() {
            return this.panner.distanceModel
        },
        setDistanceModel: function(a) {
            this.panner.distanceModel = a
        },
        getMaxDistance: function() {
            return this.panner.maxDistance
        },
        setMaxDistance: function(a) {
            this.panner.maxDistance = a
        },
        updateMatrixWorld: function() {
            var a = new r;
            return function(b) {
                M.prototype.updateMatrixWorld.call(this, b);
                a.setFromMatrixPosition(this.matrixWorld);
                this.panner.setPosition(a.x, a.y, a.z)
            }
        }()
    });
    Object.assign(ke.prototype, {
        getFrequencyData: function() {
            this.analyser.getByteFrequencyData(this.data);
            return this.data
        },
        getAverageFrequency: function() {
            for (var a = 0, b = this.getFrequencyData(), e = 0; e < b.length; e++) a += b[e];
            return a / b.length
        }
    });
    Qd.prototype = {
        constructor: Qd,
        accumulate: function(a, b) {
            var e = this.buffer,
                c = this.valueSize;
            a = a * c + c;
            var d = this.cumulativeWeight;
            if (0 === d) {
                for (d = 0; d !== c; ++d) e[a + d] = e[d];
                d = b
            } else d += b, this._mixBufferRegion(e, a, 0, b / d, c);
            this.cumulativeWeight = d
        },
        apply: function(a) {
            var b = this.valueSize,
                e = this.buffer;
            a = a * b + b;
            var c = this.cumulativeWeight,
                d = this.binding;
            this.cumulativeWeight = 0;
            1 > c && this._mixBufferRegion(e, a, 3 * b, 1 - c, b);
            for (var c = b, k = b + b; c !== k; ++c)
                if (e[c] !== e[c + b]) {
                    d.setValue(e, a);
                    break
                }
        },
        saveOriginalState: function() {
            var a = this.buffer,
                b = this.valueSize,
                e = 3 * b;
            this.binding.getValue(a, e);
            for (var c = b; c !== e; ++c) a[c] = a[e + c % b];
            this.cumulativeWeight = 0
        },
        restoreOriginalState: function() {
            this.binding.setValue(this.buffer, 3 * this.valueSize)
        },
        _select: function(a, b, e, c, d) {
            if (.5 <= c)
                for (c = 0; c !== d; ++c) a[b + c] = a[e + c]
        },
        _slerp: function(a,
            b, e, c, d) {
            x.slerpFlat(a, b, a, b, a, e, c)
        },
        _lerp: function(a, b, e, c, d) {
            for (var k = 1 - c, g = 0; g !== d; ++g) {
                var h = b + g;
                a[h] = a[h] * k + a[e + g] * c
            }
        }
    };
    Ua.prototype = {
        constructor: Ua,
        getValue: function(a, b) {
            this.bind();
            this.getValue(a, b)
        },
        setValue: function(a, b) {
            this.bind();
            this.setValue(a, b)
        },
        bind: function() {
            var a = this.node,
                b = this.parsedPath,
                e = b.objectName,
                c = b.propertyName,
                d = b.propertyIndex;
            a || (this.node = a = Ua.findNode(this.rootNode, b.nodeName) || this.rootNode);
            this.getValue = this._getValue_unavailable;
            this.setValue = this._setValue_unavailable;
            if (a) {
                if (e) {
                    var k = b.objectIndex;
                    switch (e) {
                        case "materials":
                            if (!a.material) {
                                console.error("  can not bind to material as node does not have a material", this);
                                return
                            }
                            if (!a.material.materials) {
                                console.error("  can not bind to material.materials as node.material does not have a materials array", this);
                                return
                            }
                            a = a.material.materials;
                            break;
                        case "bones":
                            if (!a.skeleton) {
                                console.error("  can not bind to bones as node does not have a skeleton", this);
                                return
                            }
                            a = a.skeleton.bones;
                            for (e = 0; e < a.length; e++)
                                if (a[e].name ===
                                    k) {
                                    k = e;
                                    break
                                }
                            break;
                        default:
                            if (void 0 === a[e]) {
                                console.error("  can not bind to objectName of node, undefined", this);
                                return
                            }
                            a = a[e]
                    }
                    if (void 0 !== k) {
                        if (void 0 === a[k]) {
                            console.error("  trying to bind to objectIndex of objectName, but is undefined:", this, a);
                            return
                        }
                        a = a[k]
                    }
                }
                k = a[c];
                if (void 0 === k) console.error("  trying to update property for track: " + b.nodeName + "." + c + " but it wasn't found.", a);
                else {
                    b = this.Versioning.None;
                    void 0 !== a.needsUpdate ? (b = this.Versioning.NeedsUpdate, this.targetObject = a) : void 0 !== a.matrixWorldNeedsUpdate &&
                        (b = this.Versioning.MatrixWorldNeedsUpdate, this.targetObject = a);
                    e = this.BindingType.Direct;
                    if (void 0 !== d) {
                        if ("morphTargetInfluences" === c) {
                            if (!a.geometry) {
                                console.error("  can not bind to morphTargetInfluences becasuse node does not have a geometry", this);
                                return
                            }
                            if (!a.geometry.morphTargets) {
                                console.error("  can not bind to morphTargetInfluences becasuse node does not have a geometry.morphTargets", this);
                                return
                            }
                            for (e = 0; e < this.node.geometry.morphTargets.length; e++)
                                if (a.geometry.morphTargets[e].name === d) {
                                    d =
                                        e;
                                    break
                                }
                        }
                        e = this.BindingType.ArrayElement;
                        this.resolvedProperty = k;
                        this.propertyIndex = d
                    } else void 0 !== k.fromArray && void 0 !== k.toArray ? (e = this.BindingType.HasFromToArray, this.resolvedProperty = k) : void 0 !== k.length ? (e = this.BindingType.EntireArray, this.resolvedProperty = k) : this.propertyName = c;
                    this.getValue = this.GetterByBindingType[e];
                    this.setValue = this.SetterByBindingTypeAndVersioning[e][b]
                }
            } else console.error("  trying to update node for track: " + this.path + " but it wasn't found.")
        },
        unbind: function() {
            this.node =
                null;
            this.getValue = this._getValue_unbound;
            this.setValue = this._setValue_unbound
        }
    };
    Object.assign(Ua.prototype, {
        _getValue_unavailable: function() {},
        _setValue_unavailable: function() {},
        _getValue_unbound: Ua.prototype.getValue,
        _setValue_unbound: Ua.prototype.setValue,
        BindingType: {
            Direct: 0,
            EntireArray: 1,
            ArrayElement: 2,
            HasFromToArray: 3
        },
        Versioning: {
            None: 0,
            NeedsUpdate: 1,
            MatrixWorldNeedsUpdate: 2
        },
        GetterByBindingType: [function(a, b) {
            a[b] = this.node[this.propertyName]
        }, function(a, b) {
            for (var e = this.resolvedProperty,
                    c = 0, d = e.length; c !== d; ++c) a[b++] = e[c]
        }, function(a, b) {
            a[b] = this.resolvedProperty[this.propertyIndex]
        }, function(a, b) {
            this.resolvedProperty.toArray(a, b)
        }],
        SetterByBindingTypeAndVersioning: [
            [function(a, b) {
                this.node[this.propertyName] = a[b]
            }, function(a, b) {
                this.node[this.propertyName] = a[b];
                this.targetObject.needsUpdate = !0
            }, function(a, b) {
                this.node[this.propertyName] = a[b];
                this.targetObject.matrixWorldNeedsUpdate = !0
            }],
            [function(a, b) {
                for (var e = this.resolvedProperty, c = 0, d = e.length; c !== d; ++c) e[c] = a[b++]
            }, function(a,
                b) {
                for (var e = this.resolvedProperty, c = 0, d = e.length; c !== d; ++c) e[c] = a[b++];
                this.targetObject.needsUpdate = !0
            }, function(a, b) {
                for (var e = this.resolvedProperty, c = 0, d = e.length; c !== d; ++c) e[c] = a[b++];
                this.targetObject.matrixWorldNeedsUpdate = !0
            }],
            [function(a, b) {
                this.resolvedProperty[this.propertyIndex] = a[b]
            }, function(a, b) {
                this.resolvedProperty[this.propertyIndex] = a[b];
                this.targetObject.needsUpdate = !0
            }, function(a, b) {
                this.resolvedProperty[this.propertyIndex] = a[b];
                this.targetObject.matrixWorldNeedsUpdate = !0
            }],
            [function(a,
                b) {
                this.resolvedProperty.fromArray(a, b)
            }, function(a, b) {
                this.resolvedProperty.fromArray(a, b);
                this.targetObject.needsUpdate = !0
            }, function(a, b) {
                this.resolvedProperty.fromArray(a, b);
                this.targetObject.matrixWorldNeedsUpdate = !0
            }]
        ]
    });
    Ua.Composite = function(a, b, e) {
        e = e || Ua.parseTrackName(b);
        this._targetGroup = a;
        this._bindings = a.subscribe_(b, e)
    };
    Ua.Composite.prototype = {
        constructor: Ua.Composite,
        getValue: function(a, b) {
            this.bind();
            var e = this._bindings[this._targetGroup.nCachedObjects_];
            void 0 !== e && e.getValue(a, b)
        },
        setValue: function(a, b) {
            for (var e = this._bindings, c = this._targetGroup.nCachedObjects_, d = e.length; c !== d; ++c) e[c].setValue(a, b)
        },
        bind: function() {
            for (var a = this._bindings, b = this._targetGroup.nCachedObjects_, e = a.length; b !== e; ++b) a[b].bind()
        },
        unbind: function() {
            for (var a = this._bindings, b = this._targetGroup.nCachedObjects_, e = a.length; b !== e; ++b) a[b].unbind()
        }
    };
    Ua.create = function(a, b, e) {
        return a && a.isAnimationObjectGroup ? new Ua.Composite(a, b, e) : new Ua(a, b, e)
    };
    Ua.parseTrackName = function(a) {
        var b = /^((?:\w+\/)*)(\w+)?(?:\.(\w+)(?:\[(.+)\])?)?\.(\w+)(?:\[(.+)\])?$/.exec(a);
        if (!b) throw Error("cannot parse trackName at all: " + a);
        b = {
            nodeName: b[2],
            objectName: b[3],
            objectIndex: b[4],
            propertyName: b[5],
            propertyIndex: b[6]
        };
        if (null === b.propertyName || 0 === b.propertyName.length) throw Error("can not parse propertyName from trackName: " + a);
        return b
    };
    Ua.findNode = function(a, b) {
        if (!b || "" === b || "root" === b || "." === b || -1 === b || b === a.name || b === a.uuid) return a;
        if (a.skeleton) {
            var e = function(a) {
                for (var e = 0; e < a.bones.length; e++) {
                    var c = a.bones[e];
                    if (c.name === b) return c
                }
                return null
            }(a.skeleton);
            if (e) return e
        }
        if (a.children) {
            var c =
                function(a) {
                    for (var e = 0; e < a.length; e++) {
                        var d = a[e];
                        if (d.name === b || d.uuid === b || (d = c(d.children))) return d
                    }
                    return null
                };
            if (a = c(a.children)) return a
        }
        return null
    };
    le.prototype = {
        constructor: le,
        isAnimationObjectGroup: !0,
        add: function(a) {
            for (var b = this._objects, e = b.length, c = this.nCachedObjects_, d = this._indicesByUUID, k = this._paths, g = this._parsedPaths, h = this._bindings, l = h.length, m = 0, n = arguments.length; m !== n; ++m) {
                var w = arguments[m],
                    t = w.uuid,
                    A = d[t];
                if (void 0 === A) {
                    A = e++;
                    d[t] = A;
                    b.push(w);
                    for (var t = 0, p = l; t !== p; ++t) h[t].push(new Ua(w,
                        k[t], g[t]))
                } else if (A < c) {
                    var r = b[A],
                        u = --c,
                        p = b[u];
                    d[p.uuid] = A;
                    b[A] = p;
                    d[t] = u;
                    b[u] = w;
                    t = 0;
                    for (p = l; t !== p; ++t) {
                        var E = h[t],
                            v = E[A];
                        E[A] = E[u];
                        void 0 === v && (v = new Ua(w, k[t], g[t]));
                        E[u] = v
                    }
                } else b[A] !== r && console.error("Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes...")
            }
            this.nCachedObjects_ = c
        },
        remove: function(a) {
            for (var b = this._objects, e = this.nCachedObjects_, c = this._indicesByUUID, d = this._bindings, k = d.length, g = 0, h = arguments.length; g !== h; ++g) {
                var l =
                    arguments[g],
                    m = l.uuid,
                    n = c[m];
                if (void 0 !== n && n >= e) {
                    var w = e++,
                        t = b[w];
                    c[t.uuid] = n;
                    b[n] = t;
                    c[m] = w;
                    b[w] = l;
                    l = 0;
                    for (m = k; l !== m; ++l) {
                        var t = d[l],
                            A = t[n];
                        t[n] = t[w];
                        t[w] = A
                    }
                }
            }
            this.nCachedObjects_ = e
        },
        uncache: function(a) {
            for (var b = this._objects, e = b.length, c = this.nCachedObjects_, d = this._indicesByUUID, k = this._bindings, g = k.length, h = 0, l = arguments.length; h !== l; ++h) {
                var m = arguments[h].uuid,
                    n = d[m];
                if (void 0 !== n)
                    if (delete d[m], n < c) {
                        var m = --c,
                            w = b[m],
                            t = --e,
                            A = b[t];
                        d[w.uuid] = n;
                        b[n] = w;
                        d[A.uuid] = m;
                        b[m] = A;
                        b.pop();
                        w = 0;
                        for (A = g; w !==
                            A; ++w) {
                            var p = k[w],
                                r = p[t];
                            p[n] = p[m];
                            p[m] = r;
                            p.pop()
                        }
                    } else
                        for (t = --e, A = b[t], d[A.uuid] = n, b[n] = A, b.pop(), w = 0, A = g; w !== A; ++w) p = k[w], p[n] = p[t], p.pop()
            }
            this.nCachedObjects_ = c
        },
        subscribe_: function(a, b) {
            var e = this._bindingsIndicesByPath,
                c = e[a],
                d = this._bindings;
            if (void 0 !== c) return d[c];
            var k = this._paths,
                g = this._parsedPaths,
                h = this._objects,
                l = this.nCachedObjects_,
                m = Array(h.length),
                c = d.length;
            e[a] = c;
            k.push(a);
            g.push(b);
            d.push(m);
            e = l;
            for (c = h.length; e !== c; ++e) m[e] = new Ua(h[e], a, b);
            return m
        },
        unsubscribe_: function(a) {
            var b =
                this._bindingsIndicesByPath,
                e = b[a];
            if (void 0 !== e) {
                var c = this._paths,
                    d = this._parsedPaths,
                    k = this._bindings,
                    g = k.length - 1,
                    h = k[g];
                b[a[g]] = e;
                k[e] = h;
                k.pop();
                d[e] = d[g];
                d.pop();
                c[e] = c[g];
                c.pop()
            }
        }
    };
    me.prototype = {
        constructor: me,
        play: function() {
            this._mixer._activateAction(this);
            return this
        },
        stop: function() {
            this._mixer._deactivateAction(this);
            return this.reset()
        },
        reset: function() {
            this.paused = !1;
            this.enabled = !0;
            this.time = 0;
            this._loopCount = -1;
            this._startTime = null;
            return this.stopFading().stopWarping()
        },
        isRunning: function() {
            return this.enabled &&
                !this.paused && 0 !== this.timeScale && null === this._startTime && this._mixer._isActiveAction(this)
        },
        isScheduled: function() {
            return this._mixer._isActiveAction(this)
        },
        startAt: function(a) {
            this._startTime = a;
            return this
        },
        setLoop: function(a, b) {
            this.loop = a;
            this.repetitions = b;
            return this
        },
        setEffectiveWeight: function(a) {
            this.weight = a;
            this._effectiveWeight = this.enabled ? a : 0;
            return this.stopFading()
        },
        getEffectiveWeight: function() {
            return this._effectiveWeight
        },
        fadeIn: function(a) {
            return this._scheduleFading(a, 0, 1)
        },
        fadeOut: function(a) {
            return this._scheduleFading(a,
                1, 0)
        },
        crossFadeFrom: function(a, b, e) {
            a.fadeOut(b);
            this.fadeIn(b);
            if (e) {
                e = this._clip.duration;
                var c = a._clip.duration,
                    d = e / c;
                a.warp(1, c / e, b);
                this.warp(d, 1, b)
            }
            return this
        },
        crossFadeTo: function(a, b, e) {
            return a.crossFadeFrom(this, b, e)
        },
        stopFading: function() {
            var a = this._weightInterpolant;
            null !== a && (this._weightInterpolant = null, this._mixer._takeBackControlInterpolant(a));
            return this
        },
        setEffectiveTimeScale: function(a) {
            this.timeScale = a;
            this._effectiveTimeScale = this.paused ? 0 : a;
            return this.stopWarping()
        },
        getEffectiveTimeScale: function() {
            return this._effectiveTimeScale
        },
        setDuration: function(a) {
            this.timeScale = this._clip.duration / a;
            return this.stopWarping()
        },
        syncWith: function(a) {
            this.time = a.time;
            this.timeScale = a.timeScale;
            return this.stopWarping()
        },
        halt: function(a) {
            return this.warp(this._effectiveTimeScale, 0, a)
        },
        warp: function(a, b, e) {
            var c = this._mixer,
                d = c.time,
                k = this._timeScaleInterpolant,
                g = this.timeScale;
            null === k && (this._timeScaleInterpolant = k = c._lendControlInterpolant());
            c = k.parameterPositions;
            k = k.sampleValues;
            c[0] = d;
            c[1] = d + e;
            k[0] = a / g;
            k[1] = b / g;
            return this
        },
        stopWarping: function() {
            var a =
                this._timeScaleInterpolant;
            null !== a && (this._timeScaleInterpolant = null, this._mixer._takeBackControlInterpolant(a));
            return this
        },
        getMixer: function() {
            return this._mixer
        },
        getClip: function() {
            return this._clip
        },
        getRoot: function() {
            return this._localRoot || this._mixer._root
        },
        _update: function(a, b, e, c) {
            var d = this._startTime;
            if (null !== d) {
                b = (a - d) * e;
                if (0 > b || 0 === e) return;
                this._startTime = null;
                b *= e
            }
            b *= this._updateTimeScale(a);
            e = this._updateTime(b);
            a = this._updateWeight(a);
            if (0 < a) {
                b = this._interpolants;
                for (var d = this._propertyBindings,
                        k = 0, g = b.length; k !== g; ++k) b[k].evaluate(e), d[k].accumulate(c, a)
            }
        },
        _updateWeight: function(a) {
            var b = 0;
            if (this.enabled) {
                var b = this.weight,
                    e = this._weightInterpolant;
                if (null !== e) {
                    var c = e.evaluate(a)[0],
                        b = b * c;
                    a > e.parameterPositions[1] && (this.stopFading(), 0 === c && (this.enabled = !1))
                }
            }
            return this._effectiveWeight = b
        },
        _updateTimeScale: function(a) {
            var b = 0;
            if (!this.paused) {
                var b = this.timeScale,
                    e = this._timeScaleInterpolant;
                if (null !== e) {
                    var c = e.evaluate(a)[0],
                        b = b * c;
                    a > e.parameterPositions[1] && (this.stopWarping(), 0 ===
                        b ? this.paused = !0 : this.timeScale = b)
                }
            }
            return this._effectiveTimeScale = b
        },
        _updateTime: function(a) {
            var b = this.time + a;
            if (0 === a) return b;
            var e = this._clip.duration,
                c = this.loop,
                d = this._loopCount;
            if (2200 === c) a: {
                if (-1 === d && (this.loopCount = 0, this._setEndings(!0, !0, !1)), b >= e) b = e;
                else if (0 > b) b = 0;
                else break a;
                this.clampWhenFinished ? this.paused = !0 : this.enabled = !1;
                this._mixer.dispatchEvent({
                    type: "finished",
                    action: this,
                    direction: 0 > a ? -1 : 1
                })
            } else {
                c = 2202 === c; - 1 === d && (0 <= a ? (d = 0, this._setEndings(!0, 0 === this.repetitions,
                    c)) : this._setEndings(0 === this.repetitions, !0, c));
                if (b >= e || 0 > b) {
                    var k = Math.floor(b / e),
                        b = b - e * k,
                        d = d + Math.abs(k),
                        g = this.repetitions - d;
                    0 > g ? (this.clampWhenFinished ? this.paused = !0 : this.enabled = !1, b = 0 < a ? e : 0, this._mixer.dispatchEvent({
                        type: "finished",
                        action: this,
                        direction: 0 < a ? 1 : -1
                    })) : (0 === g ? (a = 0 > a, this._setEndings(a, !a, c)) : this._setEndings(!1, !1, c), this._loopCount = d, this._mixer.dispatchEvent({
                        type: "loop",
                        action: this,
                        loopDelta: k
                    }))
                }
                if (c && 1 === (d & 1)) return this.time = b, e - b
            }
            return this.time = b
        },
        _setEndings: function(a,
            b, e) {
            var c = this._interpolantSettings;
            e ? (c.endingStart = 2401, c.endingEnd = 2401) : (c.endingStart = a ? this.zeroSlopeAtStart ? 2401 : 2400 : 2402, c.endingEnd = b ? this.zeroSlopeAtEnd ? 2401 : 2400 : 2402)
        },
        _scheduleFading: function(a, b, e) {
            var c = this._mixer,
                d = c.time,
                k = this._weightInterpolant;
            null === k && (this._weightInterpolant = k = c._lendControlInterpolant());
            c = k.parameterPositions;
            k = k.sampleValues;
            c[0] = d;
            k[0] = b;
            c[1] = d + a;
            k[1] = e;
            return this
        }
    };
    Object.assign(ne.prototype, p.prototype, {
        clipAction: function(a, b) {
            var e = b || this._root,
                c = e.uuid,
                e = "string" === typeof a ? Xa.findByName(e, a) : a;
            a = null !== e ? e.uuid : a;
            var d = this._actionsByClip[a],
                k = null;
            if (void 0 !== d) {
                k = d.actionByRoot[c];
                if (void 0 !== k) return k;
                k = d.knownActions[0];
                null === e && (e = k._clip)
            }
            if (null === e) return null;
            b = new me(this, e, b);
            this._bindAction(b, k);
            this._addInactiveAction(b, a, c);
            return b
        },
        existingAction: function(a, b) {
            var e = b || this._root;
            b = e.uuid;
            e = "string" === typeof a ? Xa.findByName(e, a) : a;
            a = this._actionsByClip[e ? e.uuid : a];
            return void 0 !== a ? a.actionByRoot[b] || null : null
        },
        stopAllAction: function() {
            for (var a =
                    this._actions, b = this._nActiveActions, e = this._bindings, c = this._nActiveBindings, d = this._nActiveBindings = this._nActiveActions = 0; d !== b; ++d) a[d].reset();
            for (d = 0; d !== c; ++d) e[d].useCount = 0;
            return this
        },
        update: function(a) {
            a *= this.timeScale;
            for (var b = this._actions, e = this._nActiveActions, c = this.time += a, d = Math.sign(a), k = this._accuIndex ^= 1, g = 0; g !== e; ++g) {
                var h = b[g];
                h.enabled && h._update(c, a, d, k)
            }
            a = this._bindings;
            b = this._nActiveBindings;
            for (g = 0; g !== b; ++g) a[g].apply(k);
            return this
        },
        getRoot: function() {
            return this._root
        },
        uncacheClip: function(a) {
            var b = this._actions;
            a = a.uuid;
            var e = this._actionsByClip,
                c = e[a];
            if (void 0 !== c) {
                for (var c = c.knownActions, d = 0, k = c.length; d !== k; ++d) {
                    var g = c[d];
                    this._deactivateAction(g);
                    var h = g._cacheIndex,
                        l = b[b.length - 1];
                    g._cacheIndex = null;
                    g._byClipCacheIndex = null;
                    l._cacheIndex = h;
                    b[h] = l;
                    b.pop();
                    this._removeInactiveBindingsForAction(g)
                }
                delete e[a]
            }
        },
        uncacheRoot: function(a) {
            a = a.uuid;
            var b = this._actionsByClip,
                e;
            for (e in b) {
                var c = b[e].actionByRoot[a];
                void 0 !== c && (this._deactivateAction(c), this._removeInactiveAction(c))
            }
            e =
                this._bindingsByRootAndName[a];
            if (void 0 !== e)
                for (var d in e) a = e[d], a.restoreOriginalState(), this._removeInactiveBinding(a)
        },
        uncacheAction: function(a, b) {
            a = this.existingAction(a, b);
            null !== a && (this._deactivateAction(a), this._removeInactiveAction(a))
        }
    });
    Object.assign(ne.prototype, {
        _bindAction: function(a, b) {
            var e = a._localRoot || this._root,
                c = a._clip.tracks,
                d = c.length,
                k = a._propertyBindings;
            a = a._interpolants;
            var g = e.uuid,
                h = this._bindingsByRootAndName,
                l = h[g];
            void 0 === l && (l = {}, h[g] = l);
            for (h = 0; h !== d; ++h) {
                var m =
                    c[h],
                    n = m.name,
                    w = l[n];
                if (void 0 === w) {
                    w = k[h];
                    if (void 0 !== w) {
                        null === w._cacheIndex && (++w.referenceCount, this._addInactiveBinding(w, g, n));
                        continue
                    }
                    w = new Qd(Ua.create(e, n, b && b._propertyBindings[h].binding.parsedPath), m.ValueTypeName, m.getValueSize());
                    ++w.referenceCount;
                    this._addInactiveBinding(w, g, n)
                }
                k[h] = w;
                a[h].resultBuffer = w.buffer
            }
        },
        _activateAction: function(a) {
            if (!this._isActiveAction(a)) {
                if (null === a._cacheIndex) {
                    var b = (a._localRoot || this._root).uuid,
                        e = a._clip.uuid,
                        c = this._actionsByClip[e];
                    this._bindAction(a,
                        c && c.knownActions[0]);
                    this._addInactiveAction(a, e, b)
                }
                b = a._propertyBindings;
                e = 0;
                for (c = b.length; e !== c; ++e) {
                    var d = b[e];
                    0 === d.useCount++ && (this._lendBinding(d), d.saveOriginalState())
                }
                this._lendAction(a)
            }
        },
        _deactivateAction: function(a) {
            if (this._isActiveAction(a)) {
                for (var b = a._propertyBindings, e = 0, c = b.length; e !== c; ++e) {
                    var d = b[e];
                    0 === --d.useCount && (d.restoreOriginalState(), this._takeBackBinding(d))
                }
                this._takeBackAction(a)
            }
        },
        _initMemoryManager: function() {
            this._actions = [];
            this._nActiveActions = 0;
            this._actionsByClip = {};
            this._bindings = [];
            this._nActiveBindings = 0;
            this._bindingsByRootAndName = {};
            this._controlInterpolants = [];
            this._nActiveControlInterpolants = 0;
            var a = this;
            this.stats = {
                actions: {get total() {
                        return a._actions.length
                    },
                    get inUse() {
                        return a._nActiveActions
                    }
                },
                bindings: {get total() {
                        return a._bindings.length
                    },
                    get inUse() {
                        return a._nActiveBindings
                    }
                },
                controlInterpolants: {get total() {
                        return a._controlInterpolants.length
                    },
                    get inUse() {
                        return a._nActiveControlInterpolants
                    }
                }
            }
        },
        _isActiveAction: function(a) {
            a = a._cacheIndex;
            return null !== a && a < this._nActiveActions
        },
        _addInactiveAction: function(a, b, e) {
            var c = this._actions,
                d = this._actionsByClip,
                k = d[b];
            void 0 === k ? (k = {
                knownActions: [a],
                actionByRoot: {}
            }, a._byClipCacheIndex = 0, d[b] = k) : (b = k.knownActions, a._byClipCacheIndex = b.length, b.push(a));
            a._cacheIndex = c.length;
            c.push(a);
            k.actionByRoot[e] = a
        },
        _removeInactiveAction: function(a) {
            var b = this._actions,
                e = b[b.length - 1],
                c = a._cacheIndex;
            e._cacheIndex = c;
            b[c] = e;
            b.pop();
            a._cacheIndex = null;
            var e = a._clip.uuid,
                c = this._actionsByClip,
                d = c[e],
                k =
                d.knownActions,
                g = k[k.length - 1],
                h = a._byClipCacheIndex;
            g._byClipCacheIndex = h;
            k[h] = g;
            k.pop();
            a._byClipCacheIndex = null;
            delete d.actionByRoot[(b._localRoot || this._root).uuid];
            0 === k.length && delete c[e];
            this._removeInactiveBindingsForAction(a)
        },
        _removeInactiveBindingsForAction: function(a) {
            a = a._propertyBindings;
            for (var b = 0, e = a.length; b !== e; ++b) {
                var c = a[b];
                0 === --c.referenceCount && this._removeInactiveBinding(c)
            }
        },
        _lendAction: function(a) {
            var b = this._actions,
                e = a._cacheIndex,
                c = this._nActiveActions++,
                d = b[c];
            a._cacheIndex =
                c;
            b[c] = a;
            d._cacheIndex = e;
            b[e] = d
        },
        _takeBackAction: function(a) {
            var b = this._actions,
                e = a._cacheIndex,
                c = --this._nActiveActions,
                d = b[c];
            a._cacheIndex = c;
            b[c] = a;
            d._cacheIndex = e;
            b[e] = d
        },
        _addInactiveBinding: function(a, b, e) {
            var c = this._bindingsByRootAndName,
                d = c[b],
                k = this._bindings;
            void 0 === d && (d = {}, c[b] = d);
            d[e] = a;
            a._cacheIndex = k.length;
            k.push(a)
        },
        _removeInactiveBinding: function(a) {
            var b = this._bindings,
                e = a.binding,
                c = e.rootNode.uuid,
                e = e.path,
                d = this._bindingsByRootAndName,
                k = d[c],
                g = b[b.length - 1];
            a = a._cacheIndex;
            g._cacheIndex = a;
            b[a] = g;
            b.pop();
            delete k[e];
            a: {
                for (var h in k) break a;
                delete d[c]
            }
        },
        _lendBinding: function(a) {
            var b = this._bindings,
                e = a._cacheIndex,
                c = this._nActiveBindings++,
                d = b[c];
            a._cacheIndex = c;
            b[c] = a;
            d._cacheIndex = e;
            b[e] = d
        },
        _takeBackBinding: function(a) {
            var b = this._bindings,
                e = a._cacheIndex,
                c = --this._nActiveBindings,
                d = b[c];
            a._cacheIndex = c;
            b[c] = a;
            d._cacheIndex = e;
            b[e] = d
        },
        _lendControlInterpolant: function() {
            var a = this._controlInterpolants,
                b = this._nActiveControlInterpolants++,
                e = a[b];
            void 0 === e && (e = new l(new Float32Array(2),
                new Float32Array(2), 1, this._controlInterpolantsResultBuffer), e.__cacheIndex = b, a[b] = e);
            return e
        },
        _takeBackControlInterpolant: function(a) {
            var b = this._controlInterpolants,
                e = a.__cacheIndex,
                c = --this._nActiveControlInterpolants,
                d = b[c];
            a.__cacheIndex = c;
            b[c] = a;
            d.__cacheIndex = e;
            b[e] = d
        },
        _controlInterpolantsResultBuffer: new Float32Array(1)
    });
    oe.prototype = {
        constructor: oe,
        onUpdate: function(a) {
            this.dynamic = !0;
            this.onUpdateCallback = a;
            return this
        }
    };
    Qc.prototype = Object.create(W.prototype);
    Qc.prototype.constructor =
        Qc;
    Qc.prototype.isInstancedBufferGeometry = !0;
    Qc.prototype.addGroup = function(a, b, e) {
        this.groups.push({
            start: a,
            count: b,
            instances: e
        })
    };
    Qc.prototype.copy = function(a) {
        var b = a.index;
        null !== b && this.setIndex(b.clone());
        var b = a.attributes,
            e;
        for (e in b) this.addAttribute(e, b[e].clone());
        a = a.groups;
        e = 0;
        for (b = a.length; e < b; e++) {
            var c = a[e];
            this.addGroup(c.start, c.count, c.instances)
        }
        return this
    };
    pe.prototype = {
        constructor: pe,
        isInterleavedBufferAttribute: !0,
        get length() {
            console.warn("THREE.BufferAttribute: .length has been deprecated. Please use .count.");
            return this.array.length
        },
        get count() {
            return this.data.count
        },
        get array() {
            return this.data.array
        },
        setX: function(a, b) {
            this.data.array[a * this.data.stride + this.offset] = b;
            return this
        },
        setY: function(a, b) {
            this.data.array[a * this.data.stride + this.offset + 1] = b;
            return this
        },
        setZ: function(a, b) {
            this.data.array[a * this.data.stride + this.offset + 2] = b;
            return this
        },
        setW: function(a, b) {
            this.data.array[a * this.data.stride + this.offset + 3] = b;
            return this
        },
        getX: function(a) {
            return this.data.array[a * this.data.stride + this.offset]
        },
        getY: function(a) {
            return this.data.array[a * this.data.stride + this.offset + 1]
        },
        getZ: function(a) {
            return this.data.array[a * this.data.stride + this.offset + 2]
        },
        getW: function(a) {
            return this.data.array[a * this.data.stride + this.offset + 3]
        },
        setXY: function(a, b, e) {
            a = a * this.data.stride + this.offset;
            this.data.array[a + 0] = b;
            this.data.array[a + 1] = e;
            return this
        },
        setXYZ: function(a, b, e, c) {
            a = a * this.data.stride + this.offset;
            this.data.array[a + 0] = b;
            this.data.array[a + 1] = e;
            this.data.array[a + 2] = c;
            return this
        },
        setXYZW: function(a, b, e,
            c, d) {
            a = a * this.data.stride + this.offset;
            this.data.array[a + 0] = b;
            this.data.array[a + 1] = e;
            this.data.array[a + 2] = c;
            this.data.array[a + 3] = d;
            return this
        }
    };
    ed.prototype = {
        constructor: ed,
        isInterleavedBuffer: !0,
        get length() {
            return this.array.length
        },
        get count() {
            return this.array.length / this.stride
        },
        set needsUpdate(a) {
            !0 === a && this.version++
        },
        setDynamic: function(a) {
            this.dynamic = a;
            return this
        },
        copy: function(a) {
            this.array = new a.array.constructor(a.array);
            this.stride = a.stride;
            this.dynamic = a.dynamic;
            return this
        },
        copyAt: function(a,
            b, e) {
            a *= this.stride;
            e *= b.stride;
            for (var c = 0, d = this.stride; c < d; c++) this.array[a + c] = b.array[e + c];
            return this
        },
        set: function(a, b) {
            void 0 === b && (b = 0);
            this.array.set(a, b);
            return this
        },
        clone: function() {
            return (new this.constructor).copy(this)
        }
    };
    fd.prototype = Object.create(ed.prototype);
    fd.prototype.constructor = fd;
    fd.prototype.isInstancedInterleavedBuffer = !0;
    fd.prototype.copy = function(a) {
        ed.prototype.copy.call(this, a);
        this.meshPerAttribute = a.meshPerAttribute;
        return this
    };
    gd.prototype = Object.create(J.prototype);
    gd.prototype.constructor = gd;
    gd.prototype.isInstancedBufferAttribute = !0;
    gd.prototype.copy = function(a) {
        J.prototype.copy.call(this, a);
        this.meshPerAttribute = a.meshPerAttribute;
        return this
    };
    qe.prototype = {
        constructor: qe,
        linePrecision: 1,
        set: function(a, b) {
            this.ray.set(a, b)
        },
        setFromCamera: function(a, b) {
            b && b.isPerspectiveCamera ? (this.ray.origin.setFromMatrixPosition(b.matrixWorld), this.ray.direction.set(a.x, a.y, .5).unproject(b).sub(this.ray.origin).normalize()) : b && b.isOrthographicCamera ? (this.ray.origin.set(a.x,
                a.y, (b.near + b.far) / (b.near - b.far)).unproject(b), this.ray.direction.set(0, 0, -1).transformDirection(b.matrixWorld)) : console.error("THREE.Raycaster: Unsupported camera type.")
        },
        intersectObject: function(a, b) {
            var e = [];
            re(a, this, e, b);
            e.sort(Ge);
            return e
        },
        intersectObjects: function(a, b) {
            var e = [];
            if (!1 === Array.isArray(a)) return console.warn("THREE.Raycaster.intersectObjects: objects is not an Array."), e;
            for (var c = 0, d = a.length; c < d; c++) re(a[c], this, e, b);
            e.sort(Ge);
            return e
        }
    };
    se.prototype = {
        constructor: se,
        start: function() {
            this.oldTime =
                this.startTime = (performance || Date).now();
            this.running = !0
        },
        stop: function() {
            this.getElapsedTime();
            this.running = !1
        },
        getElapsedTime: function() {
            this.getDelta();
            return this.elapsedTime
        },
        getDelta: function() {
            var a = 0;
            this.autoStart && !this.running && this.start();
            if (this.running) {
                var b = (performance || Date).now(),
                    a = (b - this.oldTime) / 1E3;
                this.oldTime = b;
                this.elapsedTime += a
            }
            return a
        }
    };
    te.prototype = {
        constructor: te,
        set: function(a, b, e) {
            this.radius = a;
            this.phi = b;
            this.theta = e;
            return this
        },
        clone: function() {
            return (new this.constructor).copy(this)
        },
        copy: function(a) {
            this.radius.copy(a.radius);
            this.phi.copy(a.phi);
            this.theta.copy(a.theta);
            return this
        },
        makeSafe: function() {
            this.phi = Math.max(1E-6, Math.min(Math.PI - 1E-6, this.phi));
            return this
        },
        setFromVector3: function(a) {
            this.radius = a.length();
            0 === this.radius ? this.phi = this.theta = 0 : (this.theta = Math.atan2(a.x, a.z), this.phi = Math.acos(d.Math.clamp(a.y / this.radius, -1, 1)));
            return this
        }
    };
    eb.prototype = Object.create(Na.prototype);
    eb.prototype.constructor = eb;
    eb.prototype.createAnimation = function(a, b, e, c) {
        b = {
            start: b,
            end: e,
            length: e - b + 1,
            fps: c,
            duration: (e - b) / c,
            lastFrame: 0,
            currentFrame: 0,
            active: !1,
            time: 0,
            direction: 1,
            weight: 1,
            directionBackwards: !1,
            mirroredLoop: !1
        };
        this.animationsMap[a] = b;
        this.animationsList.push(b)
    };
    eb.prototype.autoCreateAnimations = function(a) {
        for (var b = /([a-z]+)_?(\d+)/i, e, c = {}, d = this.geometry, k = 0, g = d.morphTargets.length; k < g; k++) {
            var h = d.morphTargets[k].name.match(b);
            if (h && 1 < h.length) {
                var l = h[1];
                c[l] || (c[l] = {
                    start: Infinity,
                    end: -Infinity
                });
                h = c[l];
                k < h.start && (h.start = k);
                k > h.end && (h.end = k);
                e || (e = l)
            }
        }
        for (l in c) h =
            c[l], this.createAnimation(l, h.start, h.end, a);
        this.firstAnimation = e
    };
    eb.prototype.setAnimationDirectionForward = function(a) {
        if (a = this.animationsMap[a]) a.direction = 1, a.directionBackwards = !1
    };
    eb.prototype.setAnimationDirectionBackward = function(a) {
        if (a = this.animationsMap[a]) a.direction = -1, a.directionBackwards = !0
    };
    eb.prototype.setAnimationFPS = function(a, b) {
        if (a = this.animationsMap[a]) a.fps = b, a.duration = (a.end - a.start) / a.fps
    };
    eb.prototype.setAnimationDuration = function(a, b) {
        if (a = this.animationsMap[a]) a.duration =
            b, a.fps = (a.end - a.start) / a.duration
    };
    eb.prototype.setAnimationWeight = function(a, b) {
        if (a = this.animationsMap[a]) a.weight = b
    };
    eb.prototype.setAnimationTime = function(a, b) {
        if (a = this.animationsMap[a]) a.time = b
    };
    eb.prototype.getAnimationTime = function(a) {
        var b = 0;
        if (a = this.animationsMap[a]) b = a.time;
        return b
    };
    eb.prototype.getAnimationDuration = function(a) {
        var b = -1;
        if (a = this.animationsMap[a]) b = a.duration;
        return b
    };
    eb.prototype.playAnimation = function(a) {
        var b = this.animationsMap[a];
        b ? (b.time = 0, b.active = !0) : console.warn("THREE.MorphBlendMesh: animation[" +
            a + "] undefined in .playAnimation()")
    };
    eb.prototype.stopAnimation = function(a) {
        if (a = this.animationsMap[a]) a.active = !1
    };
    eb.prototype.update = function(a) {
        for (var b = 0, e = this.animationsList.length; b < e; b++) {
            var c = this.animationsList[b];
            if (c.active) {
                var k = c.duration / c.length;
                c.time += c.direction * a;
                if (c.mirroredLoop) {
                    if (c.time > c.duration || 0 > c.time) c.direction *= -1, c.time > c.duration && (c.time = c.duration, c.directionBackwards = !0), 0 > c.time && (c.time = 0, c.directionBackwards = !1)
                } else c.time %= c.duration, 0 > c.time && (c.time +=
                    c.duration);
                var g = c.start + d.Math.clamp(Math.floor(c.time / k), 0, c.length - 1),
                    h = c.weight;
                g !== c.currentFrame && (this.morphTargetInfluences[c.lastFrame] = 0, this.morphTargetInfluences[c.currentFrame] = 1 * h, this.morphTargetInfluences[g] = 0, c.lastFrame = c.currentFrame, c.currentFrame = g);
                k = c.time % k / k;
                c.directionBackwards && (k = 1 - k);
                c.currentFrame !== c.lastFrame ? (this.morphTargetInfluences[c.currentFrame] = k * h, this.morphTargetInfluences[c.lastFrame] = (1 - k) * h) : this.morphTargetInfluences[c.currentFrame] = h
            }
        }
    };
    xd.prototype =
        Object.create(M.prototype);
    xd.prototype.constructor = xd;
    xd.prototype.isImmediateRenderObject = !0;
    yd.prototype = Object.create(W.prototype);
    yd.prototype.constructor = yd;
    Rd.prototype = Object.create(Ja.prototype);
    Rd.prototype.constructor = Rd;
    zd.prototype = Object.create(Ja.prototype);
    zd.prototype.constructor = zd;
    zd.prototype.update = function() {
        var a = new r,
            b = new r,
            e = new Ta;
        return function() {
            var c = ["a", "b", "c"];
            this.object.updateMatrixWorld(!0);
            e.getNormalMatrix(this.object.matrixWorld);
            var d = this.object.matrixWorld,
                k = this.geometry.attributes.position,
                g = this.object.geometry;
            if (g && g.isGeometry)
                for (var h = g.vertices, l = g.faces, m = g = 0, n = l.length; m < n; m++)
                    for (var w = l[m], t = 0, A = w.vertexNormals.length; t < A; t++) {
                        var p = w.vertexNormals[t];
                        a.copy(h[w[c[t]]]).applyMatrix4(d);
                        b.copy(p).applyMatrix3(e).normalize().multiplyScalar(this.size).add(a);
                        k.setXYZ(g, a.x, a.y, a.z);
                        g += 1;
                        k.setXYZ(g, b.x, b.y, b.z);
                        g += 1
                    } else if (g && g.isBufferGeometry)
                        for (c = g.attributes.position, h = g.attributes.normal, t = g = 0, A = c.count; t < A; t++) a.set(c.getX(t), c.getY(t),
                            c.getZ(t)).applyMatrix4(d), b.set(h.getX(t), h.getY(t), h.getZ(t)), b.applyMatrix3(e).normalize().multiplyScalar(this.size).add(a), k.setXYZ(g, a.x, a.y, a.z), g += 1, k.setXYZ(g, b.x, b.y, b.z), g += 1;
            k.needsUpdate = !0;
            return this
        }
    }();
    hd.prototype = Object.create(M.prototype);
    hd.prototype.constructor = hd;
    hd.prototype.dispose = function() {
        this.cone.geometry.dispose();
        this.cone.material.dispose()
    };
    hd.prototype.update = function() {
        var a = new r,
            b = new r;
        return function() {
            var e = this.light.distance ? this.light.distance : 1E3,
                c = e * Math.tan(this.light.angle);
            this.cone.scale.set(c, c, e);
            a.setFromMatrixPosition(this.light.matrixWorld);
            b.setFromMatrixPosition(this.light.target.matrixWorld);
            this.cone.lookAt(b.sub(a));
            this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
        }
    }();
    id.prototype = Object.create(Ja.prototype);
    id.prototype.constructor = id;
    id.prototype.getBoneList = function(a) {
        var b = [];
        a && a.isBone && b.push(a);
        for (var e = 0; e < a.children.length; e++) b.push.apply(b, this.getBoneList(a.children[e]));
        return b
    };
    id.prototype.update = function() {
        for (var a =
                this.geometry, b = (new z).getInverse(this.root.matrixWorld), e = new z, c = 0, d = 0; d < this.bones.length; d++) {
            var k = this.bones[d];
            k.parent && k.parent.isBone && (e.multiplyMatrices(b, k.matrixWorld), a.vertices[c].setFromMatrixPosition(e), e.multiplyMatrices(b, k.parent.matrixWorld), a.vertices[c + 1].setFromMatrixPosition(e), c += 2)
        }
        a.verticesNeedUpdate = !0;
        a.computeBoundingSphere()
    };
    jd.prototype = Object.create(W.prototype);
    jd.prototype.constructor = jd;
    mb.prototype = Object.create(Na.prototype);
    mb.prototype.constructor = mb;
    mb.prototype.dispose =
        function() {
            this.geometry.dispose();
            this.material.dispose()
        };
    mb.prototype.update = function() {
        this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
    };
    qb.prototype = Object.create(ba.prototype);
    qb.prototype.constructor = qb;
    kd.prototype = Object.create(M.prototype);
    kd.prototype.constructor = kd;
    kd.prototype.dispose = function() {
        this.lightSphere.geometry.dispose();
        this.lightSphere.material.dispose()
    };
    kd.prototype.update = function() {
        var a = new r;
        return function() {
            this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity);
            this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity);
            this.lightSphere.lookAt(a.setFromMatrixPosition(this.light.matrixWorld).negate());
            this.lightSphere.geometry.colorsNeedUpdate = !0
        }
    }();
    Ad.prototype = Object.create(Ja.prototype);
    Ad.prototype.constructor = Ad;
    Ad.prototype.setColors = function() {
        console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")
    };
    Bd.prototype = Object.create(Ja.prototype);
    Bd.prototype.constructor = Bd;
    Bd.prototype.update =
        function() {
            var a = new r,
                b = new r,
                e = new Ta;
            return function() {
                this.object.updateMatrixWorld(!0);
                e.getNormalMatrix(this.object.matrixWorld);
                for (var c = this.object.matrixWorld, d = this.geometry.attributes.position, k = this.object.geometry, g = k.vertices, k = k.faces, h = 0, l = 0, m = k.length; l < m; l++) {
                    var n = k[l],
                        w = n.normal;
                    a.copy(g[n.a]).add(g[n.b]).add(g[n.c]).divideScalar(3).applyMatrix4(c);
                    b.copy(w).applyMatrix3(e).normalize().multiplyScalar(this.size).add(a);
                    d.setXYZ(h, a.x, a.y, a.z);
                    h += 1;
                    d.setXYZ(h, b.x, b.y, b.z);
                    h += 1
                }
                d.needsUpdate = !0;
                return this
            }
        }();
    Cd.prototype = Object.create(W.prototype);
    Cd.prototype.constructor = Cd;
    w.prototype = Object.create(Ja.prototype);
    w.prototype.constructor = w;
    A.prototype = Object.create(M.prototype);
    A.prototype.constructor = A;
    A.prototype.dispose = function() {
        var a = this.children[0],
            b = this.children[1];
        a.geometry.dispose();
        a.material.dispose();
        b.geometry.dispose();
        b.material.dispose()
    };
    A.prototype.update = function() {
        var a = new r,
            b = new r,
            e = new r;
        return function() {
            a.setFromMatrixPosition(this.light.matrixWorld);
            b.setFromMatrixPosition(this.light.target.matrixWorld);
            e.subVectors(b, a);
            var c = this.children[0],
                d = this.children[1];
            c.lookAt(e);
            c.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
            d.lookAt(e);
            d.scale.z = e.length()
        }
    }();
    O.prototype = Object.create(Ja.prototype);
    O.prototype.constructor = O;
    O.prototype.update = function() {
        function a(a, k, g, h) {
            c.set(k, g, h).unproject(d);
            a = e[a];
            if (void 0 !== a)
                for (k = 0, g = a.length; k < g; k++) b.vertices[a[k]].copy(c)
        }
        var b, e, c = new r,
            d = new Wa;
        return function() {
            b = this.geometry;
            e = this.pointMap;
            d.projectionMatrix.copy(this.camera.projectionMatrix);
            a("c", 0, 0, -1);
            a("t", 0, 0, 1);
            a("n1", -1, -1, -1);
            a("n2", 1, -1, -1);
            a("n3", -1, 1, -1);
            a("n4", 1, 1, -1);
            a("f1", -1, -1, 1);
            a("f2", 1, -1, 1);
            a("f3", -1, 1, 1);
            a("f4", 1, 1, 1);
            a("u1", .7, 1.1, -1);
            a("u2", -.7, 1.1, -1);
            a("u3", 0, 2, -1);
            a("cf1", -1, 0, 1);
            a("cf2", 1, 0, 1);
            a("cf3", 0, -1, 1);
            a("cf4", 0, 1, 1);
            a("cn1", -1, 0, -1);
            a("cn2", 1, 0, -1);
            a("cn3", 0, -1, -1);
            a("cn4", 0, 1, -1);
            b.verticesNeedUpdate = !0
        }
    }();
    T.prototype = Object.create(ba.prototype);
    T.prototype.constructor = T;
    N.prototype = Object.create(Na.prototype);
    N.prototype.constructor = N;
    N.prototype.update =
        function() {
            this.box.setFromObject(this.object);
            this.box.size(this.scale);
            this.box.center(this.position)
        };
    Pa.prototype = Object.create(Ja.prototype);
    Pa.prototype.constructor = Pa;
    Pa.prototype.update = function() {
        var a = new Qa;
        return function(b) {
            b && b.isBox3 ? a.copy(b) : a.setFromObject(b);
            if (!a.isEmpty()) {
                b = a.min;
                var e = a.max,
                    c = this.geometry.attributes.position,
                    d = c.array;
                d[0] = e.x;
                d[1] = e.y;
                d[2] = e.z;
                d[3] = b.x;
                d[4] = e.y;
                d[5] = e.z;
                d[6] = b.x;
                d[7] = b.y;
                d[8] = e.z;
                d[9] = e.x;
                d[10] = b.y;
                d[11] = e.z;
                d[12] = e.x;
                d[13] = e.y;
                d[14] = b.z;
                d[15] = b.x;
                d[16] = e.y;
                d[17] = b.z;
                d[18] = b.x;
                d[19] = b.y;
                d[20] = b.z;
                d[21] = e.x;
                d[22] = b.y;
                d[23] = b.z;
                c.needsUpdate = !0;
                this.geometry.computeBoundingSphere()
            }
        }
    }();
    wa.prototype = Object.create(W.prototype);
    wa.prototype.constructor = wa;
    var He = new W;
    He.addAttribute("position", new bb([0, 0, 0, 0, 1, 0], 3));
    var Ie = new wa(0, .5, 1, 5, 1);
    Ie.translate(0, -.5, 0);
    Ma.prototype = Object.create(M.prototype);
    Ma.prototype.constructor = Ma;
    Ma.prototype.setDirection = function() {
        var a = new r,
            b;
        return function(e) {.99999 < e.y ? this.quaternion.set(0,
                0, 0, 1) : -.99999 > e.y ? this.quaternion.set(1, 0, 0, 0) : (a.set(e.z, 0, -e.x).normalize(), b = Math.acos(e.y), this.quaternion.setFromAxisAngle(a, b))
        }
    }();
    Ma.prototype.setLength = function(a, b, e) {
        void 0 === b && (b = .2 * a);
        void 0 === e && (e = .2 * b);
        this.line.scale.set(1, Math.max(0, a - b), 1);
        this.line.updateMatrix();
        this.cone.scale.set(e, b, e);
        this.cone.position.y = a;
        this.cone.updateMatrix()
    };
    Ma.prototype.setColor = function(a) {
        this.line.material.color.copy(a);
        this.cone.material.color.copy(a)
    };
    Da.prototype = Object.create(Ja.prototype);
    Da.prototype.constructor = Da;
    nb.prototype = Object.create(ba.prototype);
    nb.prototype.constructor = nb;
    gb.prototype = Object.create(ba.prototype);
    gb.prototype.constructor = gb;
    rb.prototype = Object.create(gb.prototype);
    rb.prototype.constructor = rb;
    Ab.prototype = Object.create(gb.prototype);
    Ab.prototype.constructor = Ab;
    ld.prototype = Object.create(gb.prototype);
    ld.prototype.constructor = ld;
    fc.prototype = Object.create(gb.prototype);
    fc.prototype.constructor = fc;
    xb.prototype = Object.create(W.prototype);
    xb.prototype.constructor =
        xb;
    Fa.prototype = Object.create(ba.prototype);
    Fa.prototype.constructor = Fa;
    Dd.prototype = Object.create(W.prototype);
    Dd.prototype.constructor = Dd;
    Sd.prototype = Object.create(ba.prototype);
    Sd.prototype.constructor = Sd;
    Td.prototype = Object.create(db.prototype);
    Td.prototype.constructor = Td;
    Ed.prototype = Object.create(W.prototype);
    Ed.prototype.constructor = Ed;
    Ud.prototype = Object.create(ba.prototype);
    Ud.prototype.constructor = Ud;
    Vd.prototype = Object.create(ba.prototype);
    Vd.prototype.constructor = Vd;
    Fd.prototype = Object.create(W.prototype);
    Fd.prototype.constructor = Fd;
    Wd.prototype = Object.create(ba.prototype);
    Wd.prototype.constructor = Wd;
    md.prototype = Object.create(ba.prototype);
    md.prototype.constructor = md;
    Xd.prototype = Object.create(md.prototype);
    Xd.prototype.constructor = Xd;
    Yd.prototype = Object.create(W.prototype);
    Yd.prototype.constructor = Yd;
    Gd.prototype = Object.create(W.prototype);
    Gd.prototype.constructor = Gd;
    Zd.prototype = Object.create(ba.prototype);
    Zd.prototype.constructor = Zd;
    d.CatmullRomCurve3 = function() {
        function a() {}
        var b = new r,
            e = new a,
            c = new a,
            d = new a;
        a.prototype.init = function(a, b, e, c) {
            this.c0 = a;
            this.c1 = e;
            this.c2 = -3 * a + 3 * b - 2 * e - c;
            this.c3 = 2 * a - 2 * b + e + c
        };
        a.prototype.initNonuniformCatmullRom = function(a, b, e, c, d, k, f) {
            this.init(b, e, ((b - a) / d - (e - a) / (d + k) + (e - b) / k) * k, ((e - b) / k - (c - b) / (k + f) + (c - e) / f) * k)
        };
        a.prototype.initCatmullRom = function(a, b, e, c, d) {
            this.init(b, e, d * (e - a), d * (c - b))
        };
        a.prototype.calc = function(a) {
            var b = a * a;
            return this.c0 + this.c1 * a + this.c2 * b + this.c3 * b * a
        };
        return lb.create(function(a) {
            this.points = a || [];
            this.closed = !1
        }, function(a) {
            var k =
                this.points,
                g, h;
            h = k.length;
            2 > h && console.log("duh, you need at least 2 points");
            a *= h - (this.closed ? 0 : 1);
            g = Math.floor(a);
            a -= g;
            this.closed ? g += 0 < g ? 0 : (Math.floor(Math.abs(g) / k.length) + 1) * k.length : 0 === a && g === h - 1 && (g = h - 2, a = 1);
            var l, m, n;
            this.closed || 0 < g ? l = k[(g - 1) % h] : (b.subVectors(k[0], k[1]).add(k[0]), l = b);
            m = k[g % h];
            n = k[(g + 1) % h];
            this.closed || g + 2 < h ? k = k[(g + 2) % h] : (b.subVectors(k[h - 1], k[h - 2]).add(k[h - 1]), k = b);
            if (void 0 === this.type || "centripetal" === this.type || "chordal" === this.type) {
                var w = "chordal" === this.type ? .5 :
                    .25;
                h = Math.pow(l.distanceToSquared(m), w);
                g = Math.pow(m.distanceToSquared(n), w);
                w = Math.pow(n.distanceToSquared(k), w);
                1E-4 > g && (g = 1);
                1E-4 > h && (h = g);
                1E-4 > w && (w = g);
                e.initNonuniformCatmullRom(l.x, m.x, n.x, k.x, h, g, w);
                c.initNonuniformCatmullRom(l.y, m.y, n.y, k.y, h, g, w);
                d.initNonuniformCatmullRom(l.z, m.z, n.z, k.z, h, g, w)
            } else "catmullrom" === this.type && (h = void 0 !== this.tension ? this.tension : .5, e.initCatmullRom(l.x, m.x, n.x, k.x, h), c.initCatmullRom(l.y, m.y, n.y, k.y, h), d.initCatmullRom(l.z, m.z, n.z, k.z, h));
            return new r(e.calc(a),
                c.calc(a), d.calc(a))
        })
    }();
    Je.prototype = Object.create(d.CatmullRomCurve3.prototype);
    var Le = lb.create(function(a) {
        console.warn("THREE.SplineCurve3 will be deprecated. Please use THREE.CatmullRomCurve3");
        this.points = void 0 === a ? [] : a
    }, function(a) {
        var b = this.points;
        a *= b.length - 1;
        var e = Math.floor(a);
        a -= e;
        var c = b[0 == e ? e : e - 1],
            k = b[e],
            g = b[e > b.length - 2 ? b.length - 1 : e + 1],
            b = b[e > b.length - 3 ? b.length - 1 : e + 2],
            e = d.CurveUtils.interpolate;
        return new r(e(c.x, k.x, g.x, b.x, a), e(c.y, k.y, g.y, b.y, a), e(c.z, k.z, g.z, b.z, a))
    });
    d.CubicBezierCurve3 =
        lb.create(function(a, b, e, c) {
            this.v0 = a;
            this.v1 = b;
            this.v2 = e;
            this.v3 = c
        }, function(a) {
            var b = d.ShapeUtils.b3;
            return new r(b(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), b(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y), b(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z))
        });
    d.QuadraticBezierCurve3 = lb.create(function(a, b, e) {
        this.v0 = a;
        this.v1 = b;
        this.v2 = e
    }, function(a) {
        var b = d.ShapeUtils.b2;
        return new r(b(a, this.v0.x, this.v1.x, this.v2.x), b(a, this.v0.y, this.v1.y, this.v2.y), b(a, this.v0.z, this.v1.z, this.v2.z))
    });
    d.LineCurve3 =
        lb.create(function(a, b) {
            this.v1 = a;
            this.v2 = b
        }, function(a) {
            if (1 === a) return this.v2.clone();
            var b = new r;
            b.subVectors(this.v2, this.v1);
            b.multiplyScalar(a);
            b.add(this.v1);
            return b
        });
    $d.prototype = Object.create(Mb.prototype);
    $d.prototype.constructor = $d;
    d.SceneUtils = {
        createMultiMaterialObject: function(a, b) {
            for (var e = new Gc, c = 0, d = b.length; c < d; c++) e.add(new Na(a, b[c]));
            return e
        },
        detach: function(a, b, e) {
            a.applyMatrix(b.matrixWorld);
            b.remove(a);
            e.add(a)
        },
        attach: function(a, b, e) {
            var c = new z;
            c.getInverse(e.matrixWorld);
            a.applyMatrix(c);
            b.remove(a);
            e.add(a)
        }
    };
    Object.assign(R.prototype, {
        empty: function() {
            console.warn("THREE.Box2: .empty() has been renamed to .isEmpty().");
            return this.isEmpty()
        },
        isIntersectionBox: function(a) {
            console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox().");
            return this.intersectsBox(a)
        }
    });
    Object.assign(Qa.prototype, {
        empty: function() {
            console.warn("THREE.Box3: .empty() has been renamed to .isEmpty().");
            return this.isEmpty()
        },
        isIntersectionBox: function(a) {
            console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox().");
            return this.intersectsBox(a)
        },
        isIntersectionSphere: function(a) {
            console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere().");
            return this.intersectsSphere(a)
        }
    });
    Object.assign(Ta.prototype, {
        multiplyVector3: function(a) {
            console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.");
            return a.applyMatrix3(this)
        },
        multiplyVector3Array: function(a) {
            console.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.");
            return this.applyToVector3Array(a)
        }
    });
    Object.assign(z.prototype, {
        extractPosition: function(a) {
            console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().");
            return this.copyPosition(a)
        },
        setRotationFromQuaternion: function(a) {
            console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().");
            return this.makeRotationFromQuaternion(a)
        },
        multiplyVector3: function(a) {
            console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead.");
            return a.applyProjection(this)
        },
        multiplyVector4: function(a) {
            console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.");
            return a.applyMatrix4(this)
        },
        multiplyVector3Array: function(a) {
            console.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead.");
            return this.applyToVector3Array(a)
        },
        rotateAxis: function(a) {
            console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.");
            a.transformDirection(this)
        },
        crossVector: function(a) {
            console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.");
            return a.applyMatrix4(this)
        },
        translate: function(a) {
            console.error("THREE.Matrix4: .translate() has been removed.")
        },
        rotateX: function(a) {
            console.error("THREE.Matrix4: .rotateX() has been removed.")
        },
        rotateY: function(a) {
            console.error("THREE.Matrix4: .rotateY() has been removed.")
        },
        rotateZ: function(a) {
            console.error("THREE.Matrix4: .rotateZ() has been removed.")
        },
        rotateByAxis: function(a, b) {
            console.error("THREE.Matrix4: .rotateByAxis() has been removed.")
        }
    });
    Object.assign(Za.prototype, {
        isIntersectionLine: function(a) {
            console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine().");
            return this.intersectsLine(a)
        }
    });
    Object.assign(x.prototype, {
        multiplyVector3: function(a) {
            console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.");
            return a.applyQuaternion(this)
        }
    });
    Object.assign(Gb.prototype, {
        isIntersectionBox: function(a) {
            console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox().");
            return this.intersectsBox(a)
        },
        isIntersectionPlane: function(a) {
            console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane().");
            return this.intersectsPlane(a)
        },
        isIntersectionSphere: function(a) {
            console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere().");
            return this.intersectsSphere(a)
        }
    });
    Object.assign(r.prototype, {
        setEulerFromRotationMatrix: function() {
            console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
        },
        setEulerFromQuaternion: function() {
            console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
        },
        getPositionFromMatrix: function(a) {
            console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().");
            return this.setFromMatrixPosition(a)
        },
        getScaleFromMatrix: function(a) {
            console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().");
            return this.setFromMatrixScale(a)
        },
        getColumnFromMatrix: function(a,
            b) {
            console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().");
            return this.setFromMatrixColumn(b, a)
        }
    });
    Object.assign(M.prototype, {
        getChildByName: function(a) {
            console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().");
            return this.getObjectByName(a)
        },
        renderDepth: function(a) {
            console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")
        },
        translate: function(a, b) {
            console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.");
            return this.translateOnAxis(b, a)
        }
    });
    Object.defineProperties(M.prototype, {
        eulerOrder: {
            get: function() {
                console.warn("THREE.Object3D: .eulerOrder is now .rotation.order.");
                return this.rotation.order
            },
            set: function(a) {
                console.warn("THREE.Object3D: .eulerOrder is now .rotation.order.");
                this.rotation.order = a
            }
        },
        useQuaternion: {
            get: function() {
                console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
            },
            set: function(a) {
                console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
            }
        }
    });
    Object.defineProperties(Dc.prototype, {
        objects: {
            get: function() {
                console.warn("THREE.LOD: .objects has been renamed to .levels.");
                return this.levels
            }
        }
    });
    Ra.prototype.setLens = function(a, b) {
        console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup.");
        void 0 !== b && (this.filmGauge = b);
        this.setFocalLength(a)
    };
    Object.defineProperties(Sa.prototype, {
        onlyShadow: {
            set: function(a) {
                console.warn("THREE.Light: .onlyShadow has been removed.")
            }
        },
        shadowCameraFov: {
            set: function(a) {
                console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov.");
                this.shadow.camera.fov = a
            }
        },
        shadowCameraLeft: {
            set: function(a) {
                console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left.");
                this.shadow.camera.left = a
            }
        },
        shadowCameraRight: {
            set: function(a) {
                console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right.");
                this.shadow.camera.right = a
            }
        },
        shadowCameraTop: {
            set: function(a) {
                console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top.");
                this.shadow.camera.top = a
            }
        },
        shadowCameraBottom: {
            set: function(a) {
                console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom.");
                this.shadow.camera.bottom = a
            }
        },
        shadowCameraNear: {
            set: function(a) {
                console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near.");
                this.shadow.camera.near = a
            }
        },
        shadowCameraFar: {
            set: function(a) {
                console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far.");
                this.shadow.camera.far = a
            }
        },
        shadowCameraVisible: {
            set: function(a) {
                console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")
            }
        },
        shadowBias: {
            set: function(a) {
                console.warn("THREE.Light: .shadowBias is now .shadow.bias.");
                this.shadow.bias = a
            }
        },
        shadowDarkness: {
            set: function(a) {
                console.warn("THREE.Light: .shadowDarkness has been removed.")
            }
        },
        shadowMapWidth: {
            set: function(a) {
                console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width.");
                this.shadow.mapSize.width = a
            }
        },
        shadowMapHeight: {
            set: function(a) {
                console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height.");
                this.shadow.mapSize.height = a
            }
        }
    });
    Object.defineProperties(J.prototype, {
        length: {
            get: function() {
                console.warn("THREE.BufferAttribute: .length has been deprecated. Please use .count.");
                return this.array.length
            }
        }
    });
    Object.assign(W.prototype, {
        addIndex: function(a) {
            console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex().");
            this.setIndex(a)
        },
        addDrawCall: function(a, b, e) {
            void 0 !== e && console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset.");
            console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup().");
            this.addGroup(a, b)
        },
        clearDrawCalls: function() {
            console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups().");
            this.clearGroups()
        },
        computeTangents: function() {
            console.warn("THREE.BufferGeometry: .computeTangents() has been removed.")
        },
        computeOffsets: function() {
            console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")
        }
    });
    Object.defineProperties(W.prototype, {
        drawcalls: {
            get: function() {
                console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups.");
                return this.groups
            }
        },
        offsets: {
            get: function() {
                console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups.");
                return this.groups
            }
        }
    });
    Object.defineProperties(K.prototype, {
        wrapAround: {
            get: function() {
                console.warn("THREE." + this.type + ": .wrapAround has been removed.")
            },
            set: function(a) {
                console.warn("THREE." + this.type + ": .wrapAround has been removed.")
            }
        },
        wrapRGB: {
            get: function() {
                console.warn("THREE." + this.type + ": .wrapRGB has been removed.");
                return new G
            }
        }
    });
    Object.defineProperties(Vb.prototype, {
        metal: {
            get: function() {
                console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead.");
                return !1
            },
            set: function(a) {
                console.warn("THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead")
            }
        }
    });
    Object.defineProperties(sa.prototype, {
        derivatives: {
            get: function() {
                console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives.");
                return this.extensions.derivatives
            },
            set: function(a) {
                console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives.");
                this.extensions.derivatives = a
            }
        }
    });
    p.prototype = Object.assign(Object.create({
        constructor: p,
        apply: function(a) {
            console.warn("THREE.EventDispatcher: .apply is deprecated, just inherit or Object.assign the prototype to mix-in.");
            Object.assign(a, this)
        }
    }), p.prototype);
    Object.assign(td.prototype, {
        supportsFloatTextures: function() {
            console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' ).");
            return this.extensions.get("OES_texture_float")
        },
        supportsHalfFloatTextures: function() {
            console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' ).");
            return this.extensions.get("OES_texture_half_float")
        },
        supportsStandardDerivatives: function() {
            console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' ).");
            return this.extensions.get("OES_standard_derivatives")
        },
        supportsCompressedTextureS3TC: function() {
            console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' ).");
            return this.extensions.get("WEBGL_compressed_texture_s3tc")
        },
        supportsCompressedTexturePVRTC: function() {
            console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' ).");
            return this.extensions.get("WEBGL_compressed_texture_pvrtc")
        },
        supportsBlendMinMax: function() {
            console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' ).");
            return this.extensions.get("EXT_blend_minmax")
        },
        supportsVertexTextures: function() {
            return this.capabilities.vertexTextures
        },
        supportsInstancedArrays: function() {
            console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' ).");
            return this.extensions.get("ANGLE_instanced_arrays")
        },
        enableScissorTest: function(a) {
            console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest().");
            this.setScissorTest(a)
        },
        initMaterial: function() {
            console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
        },
        addPrePlugin: function() {
            console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
        },
        addPostPlugin: function() {
            console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
        },
        updateShadowMap: function() {
            console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
        }
    });
    Object.defineProperties(td.prototype, {
        shadowMapEnabled: {
            get: function() {
                return this.shadowMap.enabled
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled.");
                this.shadowMap.enabled = a
            }
        },
        shadowMapType: {
            get: function() {
                return this.shadowMap.type
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type.");
                this.shadowMap.type = a
            }
        },
        shadowMapCullFace: {
            get: function() {
                return this.shadowMap.cullFace
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderer: .shadowMapCullFace is now .shadowMap.cullFace.");
                this.shadowMap.cullFace = a
            }
        }
    });
    Object.defineProperties(Sc.prototype, {
        cullFace: {
            get: function() {
                return this.renderReverseSided ? 2 : 1
            },
            set: function(a) {
                a = 1 !== a;
                console.warn("WebGLRenderer: .shadowMap.cullFace is deprecated. Set .shadowMap.renderReverseSided to " + a + ".");
                this.renderReverseSided = a
            }
        }
    });
    Object.defineProperties(P.prototype, {
        wrapS: {
            get: function() {
                console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.");
                return this.texture.wrapS
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.");
                this.texture.wrapS = a
            }
        },
        wrapT: {
            get: function() {
                console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.");
                return this.texture.wrapT
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.");
                this.texture.wrapT = a
            }
        },
        magFilter: {
            get: function() {
                console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.");
                return this.texture.magFilter
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.");
                this.texture.magFilter = a
            }
        },
        minFilter: {
            get: function() {
                console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.");
                return this.texture.minFilter
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.");
                this.texture.minFilter = a
            }
        },
        anisotropy: {
            get: function() {
                console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.");
                return this.texture.anisotropy
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.");
                this.texture.anisotropy = a
            }
        },
        offset: {
            get: function() {
                console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset.");
                return this.texture.offset
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset.");
                this.texture.offset = a
            }
        },
        repeat: {
            get: function() {
                console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat.");
                return this.texture.repeat
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat.");
                this.texture.repeat = a
            }
        },
        format: {
            get: function() {
                console.warn("THREE.WebGLRenderTarget: .format is now .texture.format.");
                return this.texture.format
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderTarget: .format is now .texture.format.");
                this.texture.format = a
            }
        },
        type: {
            get: function() {
                console.warn("THREE.WebGLRenderTarget: .type is now .texture.type.");
                return this.texture.type
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderTarget: .type is now .texture.type.");
                this.texture.type = a
            }
        },
        generateMipmaps: {
            get: function() {
                console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.");
                return this.texture.generateMipmaps
            },
            set: function(a) {
                console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.");
                this.texture.generateMipmaps = a
            }
        }
    });
    Object.assign(dd.prototype, {
        load: function(a) {
            console.warn("THREE.Audio: .load has been deprecated. Please use THREE.AudioLoader.");
            var b = this;
            (new ie).load(a, function(a) {
                b.setBuffer(a)
            });
            return this
        }
    });
    Object.assign(ke.prototype, {
        getData: function(a) {
            console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData().");
            return this.getFrequencyData()
        }
    });
    Object.defineProperty(d, "AudioContext", {
        get: function() {
            return d.getAudioContext()
        }
    });
    d.SpritePlugin = Q;
    d.LensFlarePlugin =
        da;
    d.WebGLUniforms = Ka;
    d.WebGLTextures = $b;
    d.WebGLState = ac;
    d.WebGLShadowMap = Sc;
    d.WebGLShader = Vc;
    d.WebGLProperties = Hd;
    d.WebGLPrograms = Id;
    d.WebGLProgram = pd;
    d.WebGLObjects = Nd;
    d.WebGLLights = qd;
    d.WebGLGeometries = Md;
    d.WebGLCapabilities = kc;
    d.WebGLExtensions = Rb;
    d.WebGLIndexedBufferRenderer = Ac;
    d.WebGLClipping = rd;
    d.WebGLBufferRenderer = sd;
    d.WebGLRenderTargetCube = cc;
    d.WebGLRenderTarget = P;
    d.WebGLRenderer = td;
    d.ShaderLib = Tc;
    d.UniformsLib = la;
    d.ShaderChunk = va;
    d.FogExp2 = nc;
    d.Fog = oc;
    d.Scene = Sb;
    d.LensFlare = Bc;
    d.Sprite =
        Cc;
    d.LOD = Dc;
    d.SkinnedMesh = Ib;
    d.Skeleton = Ec;
    d.Bone = Fc;
    d.Mesh = Na;
    d.LineSegments = Ja;
    d.Line = Jb;
    d.Points = zb;
    d.Group = Gc;
    d.VideoTexture = Xc;
    d.DataTexture = Tb;
    d.CompressedTexture = Ub;
    d.CubeTexture = aa;
    d.CanvasTexture = Yc;
    d.DepthTexture = Hc;
    d.TextureIdCount = function() {
        return ve++
    };
    d.Texture = u;
    d.ShadowMaterial = pc;
    d.SpriteMaterial = Hb;
    d.RawShaderMaterial = Kb;
    d.ShaderMaterial = sa;
    d.PointsMaterial = pb;
    d.MultiMaterial = Ic;
    d.MeshPhysicalMaterial = qc;
    d.MeshStandardMaterial = vb;
    d.MeshPhongMaterial = Vb;
    d.MeshNormalMaterial = rc;
    d.MeshLambertMaterial =
        sc;
    d.MeshDepthMaterial = Ea;
    d.MeshBasicMaterial = cb;
    d.LineDashedMaterial = tc;
    d.LineBasicMaterial = xa;
    d.MaterialIdCount = function() {
        return Ae++
    };
    d.Material = K;
    d.CompressedTextureLoader = Od;
    d.BinaryTextureLoader = vd;
    d.DataTextureLoader = vd;
    d.CubeTextureLoader = Zc;
    d.TextureLoader = uc;
    d.ObjectLoader = De;
    d.MaterialLoader = bd;
    d.BufferGeometryLoader = ib;
    d.LoadingManager = ud;
    d.JSONLoader = fe;
    d.ImageLoader = Jc;
    d.FontLoader = Ee;
    d.XHRLoader = wb;
    d.Loader = Lc;
    d.AudioLoader = ie;
    d.SpotLightShadow = Wb;
    d.SpotLight = Kc;
    d.PointLight = wc;
    d.HemisphereLight =
        vc;
    d.DirectionalLightShadow = $c;
    d.DirectionalLight = ad;
    d.AmbientLight = c;
    d.LightShadow = ec;
    d.Light = Sa;
    d.StereoCamera = Fe;
    d.PerspectiveCamera = Ra;
    d.OrthographicCamera = mc;
    d.CubeCamera = Pd;
    d.Camera = Wa;
    d.AudioListener = ya;
    d.PositionalAudio = je;
    d.getAudioContext = Oa;
    d.AudioAnalyser = ke;
    d.Audio = dd;
    d.VectorKeyframeTrack = t;
    d.StringKeyframeTrack = ca;
    d.QuaternionKeyframeTrack = H;
    d.NumberKeyframeTrack = L;
    d.ColorKeyframeTrack = Y;
    d.BooleanKeyframeTrack = Ca;
    d.PropertyMixer = Qd;
    d.PropertyBinding = Ua;
    d.KeyframeTrack = Lb;
    d.AnimationObjectGroup =
        le;
    d.AnimationMixer = ne;
    d.AnimationClip = Xa;
    d.Uniform = oe;
    d.InstancedBufferGeometry = Qc;
    d.BufferGeometry = W;
    d.DirectGeometry = Z;
    d.GeometryIdCount = function() {
        return Ld++
    };
    d.Geometry = ba;
    d.InterleavedBufferAttribute = pe;
    d.InstancedInterleavedBuffer = fd;
    d.InterleavedBuffer = ed;
    d.InstancedBufferAttribute = gd;
    d.DynamicBufferAttribute = function(a, b) {
        console.warn("THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead.");
        return (new J(a, b)).setDynamic(!0)
    };
    d.Float64Attribute =
        function(a, b) {
            return new J(new Float64Array(a), b)
        };
    d.Float32Attribute = bb;
    d.Uint32Attribute = Kd;
    d.Int32Attribute = function(a, b) {
        return new J(new Int32Array(a), b)
    };
    d.Uint16Attribute = Jd;
    d.Int16Attribute = function(a, b) {
        return new J(new Int16Array(a), b)
    };
    d.Uint8ClampedAttribute = function(a, b) {
        return new J(new Uint8ClampedArray(a), b)
    };
    d.Uint8Attribute = function(a, b) {
        return new J(new Uint8Array(a), b)
    };
    d.Int8Attribute = function(a, b) {
        return new J(new Int8Array(a), b)
    };
    d.BufferAttribute = J;
    d.Face3 = ja;
    d.Object3DIdCount =
        function() {
            return Be++
        };
    d.Object3D = M;
    d.Raycaster = qe;
    d.Layers = jc;
    d.EventDispatcher = p;
    d.Clock = se;
    d.QuaternionLinearInterpolant = E;
    d.LinearInterpolant = l;
    d.DiscreteInterpolant = m;
    d.CubicInterpolant = g;
    d.Interpolant = k;
    d.Triangle = hb;
    d.Spline = function(a) {
        function b(a, b, e, c, d, k, f) {
            a = .5 * (e - a);
            c = .5 * (c - b);
            return (2 * (b - e) + a + c) * f + (-3 * (b - e) - 2 * a - c) * k + a * d + b
        }
        this.points = a;
        var e = [],
            c = {
                x: 0,
                y: 0,
                z: 0
            },
            d, k, g, h, l, m, n, w, t;
        this.initFromArray = function(a) {
            this.points = [];
            for (var b = 0; b < a.length; b++) this.points[b] = {
                x: a[b][0],
                y: a[b][1],
                z: a[b][2]
            }
        };
        this.getPoint = function(a) {
            d = (this.points.length - 1) * a;
            k = Math.floor(d);
            g = d - k;
            e[0] = 0 === k ? k : k - 1;
            e[1] = k;
            e[2] = k > this.points.length - 2 ? this.points.length - 1 : k + 1;
            e[3] = k > this.points.length - 3 ? this.points.length - 1 : k + 2;
            m = this.points[e[0]];
            n = this.points[e[1]];
            w = this.points[e[2]];
            t = this.points[e[3]];
            h = g * g;
            l = g * h;
            c.x = b(m.x, n.x, w.x, t.x, g, h, l);
            c.y = b(m.y, n.y, w.y, t.y, g, h, l);
            c.z = b(m.z, n.z, w.z, t.z, g, h, l);
            return c
        };
        this.getControlPointsArray = function() {
            var a, b, e = this.points.length,
                c = [];
            for (a = 0; a < e; a++) b = this.points[a],
                c[a] = [b.x, b.y, b.z];
            return c
        };
        this.getLength = function(a) {
            var b, e, c, d = 0,
                k = new r,
                f = new r,
                g = [],
                h = 0;
            g[0] = 0;
            a || (a = 100);
            e = this.points.length * a;
            k.copy(this.points[0]);
            for (a = 1; a < e; a++) b = a / e, c = this.getPoint(b), f.copy(c), h += f.distanceTo(k), k.copy(c), b *= this.points.length - 1, b = Math.floor(b), b !== d && (g[b] = h, d = b);
            g[g.length] = h;
            return {
                chunks: g,
                total: h
            }
        };
        this.reparametrizeByArcLength = function(a) {
            var b, e, c, d, k, f, g = [],
                h = new r,
                l = this.getLength();
            g.push(h.copy(this.points[0]).clone());
            for (b = 1; b < this.points.length; b++) {
                e =
                    l.chunks[b] - l.chunks[b - 1];
                f = Math.ceil(a * e / l.total);
                d = (b - 1) / (this.points.length - 1);
                k = b / (this.points.length - 1);
                for (e = 1; e < f - 1; e++) c = d + 1 / f * e * (k - d), c = this.getPoint(c), g.push(h.copy(c).clone());
                g.push(h.copy(this.points[b]).clone())
            }
            this.points = g
        }
    };
    d.Spherical = te;
    d.Plane = Za;
    d.Frustum = Pb;
    d.Sphere = La;
    d.Ray = Gb;
    d.Matrix4 = z;
    d.Matrix3 = Ta;
    d.Box3 = Qa;
    d.Box2 = R;
    d.Line3 = Va;
    d.Euler = Qb;
    d.Vector4 = na;
    d.Vector3 = r;
    d.Vector2 = v;
    d.Quaternion = x;
    d.Color = G;
    d.MorphBlendMesh = eb;
    d.ImmediateRenderObject = xd;
    d.WireframeHelper = Rd;
    d.VertexNormalsHelper =
        zd;
    d.SpotLightHelper = hd;
    d.SkeletonHelper = id;
    d.PointLightHelper = mb;
    d.HemisphereLightHelper = kd;
    d.GridHelper = Ad;
    d.FaceNormalsHelper = Bd;
    d.EdgesHelper = w;
    d.DirectionalLightHelper = A;
    d.CameraHelper = O;
    d.BoundingBoxHelper = N;
    d.BoxHelper = Pa;
    d.ArrowHelper = Ma;
    d.AxisHelper = Da;
    d.WireframeGeometry = yd;
    d.ParametricGeometry = nb;
    d.TetrahedronGeometry = rb;
    d.OctahedronGeometry = Ab;
    d.IcosahedronGeometry = ld;
    d.DodecahedronGeometry = fc;
    d.PolyhedronGeometry = gb;
    d.TubeGeometry = Xb;
    d.TorusKnotGeometry = Fa;
    d.TorusKnotBufferGeometry = xb;
    d.TorusGeometry = Sd;
    d.TorusBufferGeometry = Dd;
    d.TextGeometry = Td;
    d.SphereBufferGeometry = jd;
    d.SphereGeometry = qb;
    d.RingGeometry = Ud;
    d.RingBufferGeometry = Ed;
    d.PlaneBufferGeometry = lc;
    d.PlaneGeometry = Vd;
    d.LatheGeometry = Wd;
    d.LatheBufferGeometry = Fd;
    d.ShapeGeometry = Pc;
    d.ExtrudeGeometry = db;
    d.EdgesGeometry = Cd;
    d.ConeGeometry = Xd;
    d.ConeBufferGeometry = Yd;
    d.CylinderGeometry = md;
    d.CylinderBufferGeometry = wa;
    d.CircleBufferGeometry = Gd;
    d.CircleGeometry = Zd;
    d.BoxBufferGeometry = dc;
    d.BoxGeometry = T;
    d.ClosedSplineCurve3 = Je;
    d.SplineCurve3 =
        Le;
    d.ArcCurve = $d;
    d.EllipseCurve = Mb;
    d.SplineCurve = Mc;
    d.CubicBezierCurve = Nc;
    d.QuadraticBezierCurve = Oc;
    d.LineCurve = U;
    d.Shape = cd;
    d.ShapePath = ta;
    d.Path = wd;
    d.Font = ge;
    d.CurvePath = ga;
    d.Curve = lb;
    d.REVISION = "80";
    d.MOUSE = {
        LEFT: 0,
        MIDDLE: 1,
        RIGHT: 2
    };
    d.CullFaceNone = 0;
    d.CullFaceBack = 1;
    d.CullFaceFront = 2;
    d.CullFaceFrontBack = 3;
    d.FrontFaceDirectionCW = 0;
    d.FrontFaceDirectionCCW = 1;
    d.BasicShadowMap = 0;
    d.PCFShadowMap = 1;
    d.PCFSoftShadowMap = 2;
    d.FrontSide = 0;
    d.BackSide = 1;
    d.DoubleSide = 2;
    d.FlatShading = 1;
    d.SmoothShading = 2;
    d.NoColors =
        0;
    d.FaceColors = 1;
    d.VertexColors = 2;
    d.NoBlending = 0;
    d.NormalBlending = 1;
    d.AdditiveBlending = 2;
    d.SubtractiveBlending = 3;
    d.MultiplyBlending = 4;
    d.CustomBlending = 5;
    d.AddEquation = 100;
    d.SubtractEquation = 101;
    d.ReverseSubtractEquation = 102;
    d.MinEquation = 103;
    d.MaxEquation = 104;
    d.ZeroFactor = 200;
    d.OneFactor = 201;
    d.SrcColorFactor = 202;
    d.OneMinusSrcColorFactor = 203;
    d.SrcAlphaFactor = 204;
    d.OneMinusSrcAlphaFactor = 205;
    d.DstAlphaFactor = 206;
    d.OneMinusDstAlphaFactor = 207;
    d.DstColorFactor = 208;
    d.OneMinusDstColorFactor = 209;
    d.SrcAlphaSaturateFactor =
        210;
    d.NeverDepth = 0;
    d.AlwaysDepth = 1;
    d.LessDepth = 2;
    d.LessEqualDepth = 3;
    d.EqualDepth = 4;
    d.GreaterEqualDepth = 5;
    d.GreaterDepth = 6;
    d.NotEqualDepth = 7;
    d.MultiplyOperation = 0;
    d.MixOperation = 1;
    d.AddOperation = 2;
    d.NoToneMapping = 0;
    d.LinearToneMapping = 1;
    d.ReinhardToneMapping = 2;
    d.Uncharted2ToneMapping = 3;
    d.CineonToneMapping = 4;
    d.UVMapping = 300;
    d.CubeReflectionMapping = 301;
    d.CubeRefractionMapping = 302;
    d.EquirectangularReflectionMapping = 303;
    d.EquirectangularRefractionMapping = 304;
    d.SphericalReflectionMapping = 305;
    d.CubeUVReflectionMapping =
        306;
    d.CubeUVRefractionMapping = 307;
    d.RepeatWrapping = 1E3;
    d.ClampToEdgeWrapping = 1001;
    d.MirroredRepeatWrapping = 1002;
    d.NearestFilter = 1003;
    d.NearestMipMapNearestFilter = 1004;
    d.NearestMipMapLinearFilter = 1005;
    d.LinearFilter = 1006;
    d.LinearMipMapNearestFilter = 1007;
    d.LinearMipMapLinearFilter = 1008;
    d.UnsignedByteType = 1009;
    d.ByteType = 1010;
    d.ShortType = 1011;
    d.UnsignedShortType = 1012;
    d.IntType = 1013;
    d.UnsignedIntType = 1014;
    d.FloatType = 1015;
    d.HalfFloatType = 1016;
    d.UnsignedShort4444Type = 1017;
    d.UnsignedShort5551Type = 1018;
    d.UnsignedShort565Type = 1019;
    d.UnsignedInt248Type = 1020;
    d.AlphaFormat = 1021;
    d.RGBFormat = 1022;
    d.RGBAFormat = 1023;
    d.LuminanceFormat = 1024;
    d.LuminanceAlphaFormat = 1025;
    d.RGBEFormat = 1023;
    d.DepthFormat = 1026;
    d.DepthStencilFormat = 1027;
    d.RGB_S3TC_DXT1_Format = 2001;
    d.RGBA_S3TC_DXT1_Format = 2002;
    d.RGBA_S3TC_DXT3_Format = 2003;
    d.RGBA_S3TC_DXT5_Format = 2004;
    d.RGB_PVRTC_4BPPV1_Format = 2100;
    d.RGB_PVRTC_2BPPV1_Format = 2101;
    d.RGBA_PVRTC_4BPPV1_Format = 2102;
    d.RGBA_PVRTC_2BPPV1_Format = 2103;
    d.RGB_ETC1_Format = 2151;
    d.LoopOnce = 2200;
    d.LoopRepeat = 2201;
    d.LoopPingPong = 2202;
    d.InterpolateDiscrete = 2300;
    d.InterpolateLinear = 2301;
    d.InterpolateSmooth = 2302;
    d.ZeroCurvatureEnding = 2400;
    d.ZeroSlopeEnding = 2401;
    d.WrapAroundEnding = 2402;
    d.TrianglesDrawMode = 0;
    d.TriangleStripDrawMode = 1;
    d.TriangleFanDrawMode = 2;
    d.LinearEncoding = 3E3;
    d.sRGBEncoding = 3001;
    d.GammaEncoding = 3007;
    d.RGBEEncoding = 3002;
    d.LogLuvEncoding = 3003;
    d.RGBM7Encoding = 3004;
    d.RGBM16Encoding = 3005;
    d.RGBDEncoding = 3006;
    d.BasicDepthPacking = 3200;
    d.RGBADepthPacking = 3201;
    d.CubeGeometry = T;
    d.Face4 =
        function(a, b, e, c, d, k, g) {
            console.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead.");
            return new ja(a, b, e, d, k, g)
        };
    d.LineStrip = 0;
    d.LinePieces = 1;
    d.MeshFaceMaterial = Ic;
    d.PointCloud = function(a, b) {
        console.warn("THREE.PointCloud has been renamed to THREE.Points.");
        return new zb(a, b)
    };
    d.Particle = Cc;
    d.ParticleSystem = function(a, b) {
        console.warn("THREE.ParticleSystem has been renamed to THREE.Points.");
        return new zb(a, b)
    };
    d.PointCloudMaterial = function(a) {
        console.warn("THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial.");
        return new pb(a)
    };
    d.ParticleBasicMaterial = function(a) {
        console.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial.");
        return new pb(a)
    };
    d.ParticleSystemMaterial = function(a) {
        console.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial.");
        return new pb(a)
    };
    d.Vertex = function(a, b, e) {
        console.warn("THREE.Vertex has been removed. Use THREE.Vector3 instead.");
        return new r(a, b, e)
    };
    d.GeometryUtils = {
        merge: function(a, b, e) {
            console.warn("THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.");
            var c;
            b.isMesh && (b.matrixAutoUpdate && b.updateMatrix(), c = b.matrix, b = b.geometry);
            a.merge(b, c, e)
        },
        center: function(a) {
            console.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.");
            return a.center()
        }
    };
    d.ImageUtils = {
        crossOrigin: void 0,
        loadTexture: function(a, b, e, c) {
            console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");
            var d = new uc;
            d.setCrossOrigin(this.crossOrigin);
            a = d.load(a, e, void 0, c);
            b && (a.mapping = b);
            return a
        },
        loadTextureCube: function(a, b, e, c) {
            console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");
            var d = new Zc;
            d.setCrossOrigin(this.crossOrigin);
            a = d.load(a, e, void 0, c);
            b && (a.mapping = b);
            return a
        },
        loadCompressedTexture: function() {
            console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
        },
        loadCompressedTextureCube: function() {
            console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
        }
    };
    d.Projector = function() {
        console.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js.");
        this.projectVector = function(a, b) {
            console.warn("THREE.Projector: .projectVector() is now vector.project().");
            a.project(b)
        };
        this.unprojectVector = function(a, b) {
            console.warn("THREE.Projector: .unprojectVector() is now vector.unproject().");
            a.unproject(b)
        };
        this.pickingRay = function(a, b) {
            console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
        }
    };
    d.CanvasRenderer = function() {
        console.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js");
        this.domElement = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
        this.clear = function() {};
        this.render = function() {};
        this.setClearColor = function() {};
        this.setSize = function() {}
    };
    Object.defineProperty(d, "__esModule", {
        value: !0
    })
});
! function(d, p) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = d.document ? p(d, !0) : function(d) {
        if (!d.document) throw Error("jQuery requires a window with a document");
        return p(d)
    } : p(d)
}("undefined" != typeof window ? window : this, function(d, p) {
    function v(c, d) {
        d = d || G;
        var g = d.createElement("script");
        g.text = c;
        d.head.appendChild(g).parentNode.removeChild(g)
    }

    function u(c) {
        var d = !!c && "length" in c && c.length,
            g = h.type(c);
        return "function" !== g && !h.isWindow(c) && ("array" === g || 0 === d || "number" ==
            typeof d && 0 < d && d - 1 in c)
    }

    function z(c, d, g) {
        if (h.isFunction(d)) return h.grep(c, function(c, h) {
            return !!d.call(c, h, c) !== g
        });
        if (d.nodeType) return h.grep(c, function(c) {
            return c === d !== g
        });
        if ("string" == typeof d) {
            if (Id.test(d)) return h.filter(d, c, g);
            d = h.filter(d, c)
        }
        return h.grep(c, function(c) {
            return -1 < Za.call(d, c) !== g && 1 === c.nodeType
        })
    }

    function x(c, d) {
        for (;
            (c = c[d]) && 1 !== c.nodeType;);
        return c
    }

    function r(c) {
        var d = {};
        return h.each(c.match(ja) || [], function(c, h) {
            d[h] = !0
        }), d
    }

    function Q(c) {
        return c
    }

    function R(c) {
        throw c;
    }

    function da(c, d, g) {
        var l;
        try {
            c && h.isFunction(l = c.promise) ? l.call(c).done(d).fail(g) : c && h.isFunction(l = c.then) ? l.call(c, d, g) : d.call(void 0, c)
        } catch (m) {
            g.call(void 0, m)
        }
    }

    function aa() {
        G.removeEventListener("DOMContentLoaded", aa);
        d.removeEventListener("load", aa);
        h.ready()
    }

    function ma() {
        this.expando = h.expando + ma.uid++
    }

    function ka(c, d, g) {
        var h;
        if (void 0 === g && 1 === c.nodeType)
            if (h = "data-" + d.replace(Nd, "-$&").toLowerCase(), g = c.getAttribute(h), "string" == typeof g) {
                try {
                    g = "true" === g || "false" !== g && ("null" === g ?
                        null : +g + "" === g ? +g : Md.test(g) ? JSON.parse(g) : g)
                } catch (m) {}
                W.set(c, d, g)
            } else g = void 0;
        return g
    }

    function ea(c, d, g, l) {
        var m, n = 1,
            t = 20,
            p = l ? function() {
                return l.cur()
            } : function() {
                return h.css(c, d, "")
            },
            r = p(),
            u = g && g[3] || (h.cssNumber[d] ? "" : "px"),
            v = (h.cssNumber[d] || "px" !== u && +r) && kc.exec(h.css(c, d));
        if (v && v[3] !== u) {
            u = u || v[3];
            g = g || [];
            v = +r || 1;
            do n = n || ".5", v /= n, h.style(c, d, v + u); while (n !== (n = p() / r) && 1 !== n && --t)
        }
        return g && (v = +v || +r || 0, m = g[1] ? v + (g[1] + 1) * g[2] : +g[2], l && (l.unit = u, l.start = v, l.end = m)), m
    }

    function tb(c, d) {
        for (var g,
                l, m = [], n = 0, t = c.length; n < t; n++)
            if (l = c[n], l.style)
                if (g = l.style.display, d) {
                    if ("none" === g && (m[n] = Z.get(l, "display") || null, m[n] || (l.style.display = "")), "" === l.style.display && Ac(l)) {
                        g = n;
                        var p, r = void 0;
                        p = l.ownerDocument;
                        var u = l.nodeName;
                        p = (l = sd[u]) ? l : (r = p.body.appendChild(p.createElement(u)), l = h.css(r, "display"), r.parentNode.removeChild(r), "none" === l && (l = "block"), sd[u] = l, l);
                        m[g] = p
                    }
                } else "none" !== g && (m[n] = "none", Z.set(l, "display", g));
        for (n = 0; n < t; n++) null != m[n] && (c[n].style.display = m[n]);
        return c
    }

    function za(c,
        d) {
        var g = "undefined" != typeof c.getElementsByTagName ? c.getElementsByTagName(d || "*") : "undefined" != typeof c.querySelectorAll ? c.querySelectorAll(d || "*") : [];
        return void 0 === d || d && h.nodeName(c, d) ? h.merge([c], g) : g
    }

    function B(c, d) {
        for (var g = 0, h = c.length; g < h; g++) Z.set(c[g], "globalEval", !d || Z.get(d[g], "globalEval"))
    }

    function xc(c, d, g, l, m) {
        for (var n, t, p, r, u = d.createDocumentFragment(), v = [], z = 0, x = c.length; z < x; z++)
            if (n = c[z], n || 0 === n)
                if ("object" === h.type(n)) h.merge(v, n.nodeType ? [n] : n);
                else if (hb.test(n)) {
            t = t || u.appendChild(d.createElement("div"));
            p = (dc.exec(n) || ["", ""])[1].toLowerCase();
            p = Va[p] || Va._default;
            t.innerHTML = p[1] + h.htmlPrefilter(n) + p[2];
            for (p = p[0]; p--;) t = t.lastChild;
            h.merge(v, t.childNodes);
            t = u.firstChild;
            t.textContent = ""
        } else v.push(d.createTextNode(n));
        u.textContent = "";
        for (z = 0; n = v[z++];)
            if (l && -1 < h.inArray(n, l)) m && m.push(n);
            else if (r = h.contains(n.ownerDocument, n), t = za(u.appendChild(n), "script"), r && B(t), g)
            for (p = 0; n = t[p++];) Gb.test(n.type || "") && g.push(n);
        return u
    }

    function yb() {
        return !0
    }

    function ob() {
        return !1
    }

    function ra() {
        try {
            return G.activeElement
        } catch (c) {}
    }

    function qa(c, d, g, l, m, n) {
        var t, p;
        if ("object" == typeof d) {
            "string" != typeof g && (l = l || g, g = void 0);
            for (p in d) qa(c, p, g, l, d[p], n);
            return c
        }
        if (null == l && null == m ? (m = g, l = g = void 0) : null == m && ("string" == typeof g ? (m = l, l = void 0) : (m = l, l = g, g = void 0)), !1 === m) m = ob;
        else if (!m) return c;
        return 1 === n && (t = m, m = function(c) {
            return h().off(c), t.apply(this, arguments)
        }, m.guid = t.guid || (t.guid = h.guid++)), c.each(function() {
            h.event.add(this, d, m, l, g)
        })
    }

    function yc(c, d) {
        return h.nodeName(c, "table") && h.nodeName(11 !== d.nodeType ? d : d.firstChild,
            "tr") ? c.getElementsByTagName("tbody")[0] || c : c
    }

    function Ga(c) {
        return c.type = (null !== c.getAttribute("type")) + "/" + c.type, c
    }

    function Ha(c) {
        var d = nc.exec(c.type);
        return d ? c.type = d[1] : c.removeAttribute("type"), c
    }

    function ub(c, d) {
        var g, l, m, n, t, p;
        if (1 === d.nodeType) {
            if (Z.hasData(c) && (g = Z.access(c), l = Z.set(d, g), p = g.events))
                for (m in delete l.handle, l.events = {}, p)
                    for (g = 0, l = p[m].length; g < l; g++) h.event.add(d, m, p[m][g]);
            W.hasData(c) && (n = W.access(c), t = h.extend({}, n), W.set(d, t))
        }
    }

    function jb(c, d, g, l) {
        d = La.apply([],
            d);
        var m, n, t, p, r = 0,
            u = c.length,
            z = u - 1,
            B = d[0],
            x = h.isFunction(B);
        if (x || 1 < u && "string" == typeof B && !Ba.checkClone && td.test(B)) return c.each(function(h) {
            var m = c.eq(h);
            x && (d[0] = B.call(this, h, m.html()));
            jb(m, d, g, l)
        });
        if (u && (m = xc(d, c[0].ownerDocument, !1, c, l), n = m.firstChild, 1 === m.childNodes.length && (m = n), n || l)) {
            n = h.map(za(m, "script"), Ga);
            for (t = n.length; r < u; r++) p = m, r !== z && (p = h.clone(p, !0, !0), t && h.merge(n, za(p, "script"))), g.call(c[r], p, r);
            if (t)
                for (m = n[n.length - 1].ownerDocument, h.map(n, Ha), r = 0; r < t; r++) p = n[r], Gb.test(p.type ||
                    "") && !Z.access(p, "globalEval") && h.contains(m, p) && (p.src ? h._evalUrl && h._evalUrl(p.src) : v(p.textContent.replace(oc, ""), m))
        }
        return c
    }

    function Yb(c, d, g) {
        for (var l = d ? h.filter(d, c) : c, m = 0; null != (d = l[m]); m++) g || 1 !== d.nodeType || h.cleanData(za(d)), d.parentNode && (g && h.contains(d.ownerDocument, d) && B(za(d, "script")), d.parentNode.removeChild(d));
        return c
    }

    function fb(c, d, g) {
        var l, m, n, t, p = c.style;
        return g = g || Hb(c), g && (t = g.getPropertyValue(d) || g[d], "" !== t || h.contains(c.ownerDocument, c) || (t = h.style(c, d)), !Ba.pixelMarginRight() &&
            Bc.test(t) && Sb.test(d) && (l = p.width, m = p.minWidth, n = p.maxWidth, p.minWidth = p.maxWidth = p.width = t, t = g.width, p.width = l, p.minWidth = m, p.maxWidth = n)), void 0 !== t ? t + "" : t
    }

    function Bb(c, d) {
        return {
            get: function() {
                return c() ? void delete this.get : (this.get = d).apply(this, arguments)
            }
        }
    }

    function Cb(c) {
        if (c in Fc) return c;
        for (var d = c[0].toUpperCase() + c.slice(1), g = Ec.length; g--;)
            if (c = Ec[g] + d, c in Fc) return c
    }

    function Db(c, d, g) {
        return (c = kc.exec(d)) ? Math.max(0, c[2] - (g || 0)) + (c[3] || "px") : d
    }

    function Eb(c, d, g, l, m) {
        d = g === (l ? "border" :
            "content") ? 4 : "width" === d ? 1 : 0;
        for (var n = 0; 4 > d; d += 2) "margin" === g && (n += h.css(c, g + Rb[d], !0, m)), l ? ("content" === g && (n -= h.css(c, "padding" + Rb[d], !0, m)), "margin" !== g && (n -= h.css(c, "border" + Rb[d] + "Width", !0, m))) : (n += h.css(c, "padding" + Rb[d], !0, m), "padding" !== g && (n += h.css(c, "border" + Rb[d] + "Width", !0, m)));
        return n
    }

    function Fb(c, d, g) {
        var l, m = !0,
            n = Hb(c),
            t = "border-box" === h.css(c, "boxSizing", !1, n);
        if (c.getClientRects().length && (l = c.getBoundingClientRect()[d]), 0 >= l || null == l) {
            if (l = fb(c, d, n), (0 > l || null == l) && (l = c.style[d]),
                Bc.test(l)) return l;
            m = t && (Ba.boxSizingReliable() || l === c.style[d]);
            l = parseFloat(l) || 0
        }
        return l + Eb(c, d, g || (t ? "border" : "content"), m, n) + "px"
    }

    function Aa(c, d, g, h, m) {
        return new Aa.prototype.init(c, d, g, h, m)
    }

    function Ob() {
        xa && (d.requestAnimationFrame(Ob), h.fx.tick())
    }

    function ic() {
        return d.setTimeout(function() {
            Ib = void 0
        }), Ib = h.now()
    }

    function Zb(c, d) {
        var g, h = 0,
            m = {
                height: c
            };
        for (d = d ? 1 : 0; 4 > h; h += 2 - d) g = Rb[h], m["margin" + g] = m["padding" + g] = c;
        return d && (m.opacity = m.width = c), m
    }

    function zc(c, d, g) {
        for (var h, m = (fa.tweeners[d] || []).concat(fa.tweeners["*"]), n = 0, t = m.length; n < t; n++)
            if (h = m[n].call(g, d, c)) return h
    }

    function Ia(c, d) {
        var g, l, m, n, t;
        for (g in c)
            if (l = h.camelCase(g), m = d[l], n = c[g], h.isArray(n) && (m = n[1], n = c[g] = n[0]), g !== l && (c[l] = n, delete c[g]), t = h.cssHooks[l], t && "expand" in t)
                for (g in n = t.expand(n), delete c[l], n) g in c || (c[g] = n[g], d[g] = m);
            else d[l] = m
    }

    function fa(c, d, g) {
        var l, m = 0,
            n = fa.prefilters.length,
            t = h.Deferred().always(function() {
                delete p.elem
            }),
            p = function() {
                if (l) return !1;
                for (var d = Ib || ic(), d = Math.max(0, r.startTime +
                        r.duration - d), k = 1 - (d / r.duration || 0), g = 0, h = r.tweens.length; g < h; g++) r.tweens[g].run(k);
                return t.notifyWith(c, [r, k, d]), 1 > k && h ? d : (t.resolveWith(c, [r]), !1)
            },
            r = t.promise({
                elem: c,
                props: h.extend({}, d),
                opts: h.extend(!0, {
                    specialEasing: {},
                    easing: h.easing._default
                }, g),
                originalProperties: d,
                originalOptions: g,
                startTime: Ib || ic(),
                duration: g.duration,
                tweens: [],
                createTween: function(d, k) {
                    d = h.Tween(c, r.opts, d, k, r.opts.specialEasing[d] || r.opts.easing);
                    return r.tweens.push(d), d
                },
                stop: function(d) {
                    var k = 0,
                        g = d ? r.tweens.length :
                        0;
                    if (l) return this;
                    for (l = !0; k < g; k++) r.tweens[k].run(1);
                    return d ? (t.notifyWith(c, [r, 1, 0]), t.resolveWith(c, [r, d])) : t.rejectWith(c, [r, d]), this
                }
            });
        g = r.props;
        for (Ia(g, r.opts.specialEasing); m < n; m++)
            if (d = fa.prefilters[m].call(r, c, g, r.opts)) return h.isFunction(d.stop) && (h._queueHooks(r.elem, r.opts.queue).stop = h.proxy(d.stop, d)), d;
        return h.map(g, zc, r), h.isFunction(r.opts.start) && r.opts.start.call(c, r), h.fx.timer(h.extend(p, {
            elem: c,
            anim: r,
            queue: r.opts.queue
        })), r.progress(r.opts.progress).done(r.opts.done, r.opts.complete).fail(r.opts.fail).always(r.opts.always)
    }

    function Ka(c) {
        return c.getAttribute && c.getAttribute("class") || ""
    }

    function $b(c, d, g, l) {
        var m;
        if (h.isArray(d)) h.each(d, function(d, k) {
            g || qc.test(c) ? l(c, k) : $b(c + "[" + ("object" == typeof k && null != k ? d : "") + "]", k, g, l)
        });
        else if (g || "object" !== h.type(d)) l(c, d);
        else
            for (m in d) $b(c + "[" + m + "]", d[m], g, l)
    }

    function na(c) {
        return function(d, g) {
            "string" != typeof d && (g = d, d = "*");
            var l = 0,
                m = d.toLowerCase().match(ja) || [];
            if (h.isFunction(g))
                for (; d = m[l++];) "+" === d[0] ? (d = d.slice(1) || "*", (c[d] = c[d] || []).unshift(g)) : (c[d] = c[d] || []).push(g)
        }
    }

    function ac(c, d, g, l) {
        function m(p) {
            var r;
            return n[p] = !0, h.each(c[p] || [], function(c, h) {
                c = h(d, g, l);
                return "string" != typeof c || t || n[c] ? t ? !(r = c) : void 0 : (d.dataTypes.unshift(c), m(c), !1)
            }), r
        }
        var n = {},
            t = c === uc;
        return m(d.dataTypes[0]) || !n["*"] && m("*")
    }

    function P(c, d) {
        var g, l, m = h.ajaxSettings.flatOptions || {};
        for (g in d) void 0 !== d[g] && ((m[g] ? c : l || (l = {}))[g] = d[g]);
        return l && h.extend(!0, c, l), c
    }

    function K(c) {
        return h.isWindow(c) ? c : 9 === c.nodeType && c.defaultView
    }
    var sa = [],
        G = d.document,
        Ea = Object.getPrototypeOf,
        Qa = sa.slice,
        La = sa.concat,
        Ta = sa.push,
        Za = sa.indexOf,
        Pb = {},
        Sc = Pb.toString,
        Uc = Pb.hasOwnProperty,
        Vc = Uc.toString,
        Hd = Vc.call(Object),
        Ba = {},
        h = function(c, d) {
            return new h.fn.init(c, d)
        },
        be = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ce = /^-ms-/,
        de = /-([a-z])/g,
        ee = function(c, d) {
            return d.toUpperCase()
        };
    $jscomp.initSymbol();
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    $jscomp.initSymbol();
    $jscomp.initSymbolIterator();
    h.fn = h.prototype = {
        jquery: "3.1.0",
        constructor: h,
        length: 0,
        toArray: function() {
            return Qa.call(this)
        },
        get: function(c) {
            return null !=
                c ? 0 > c ? this[c + this.length] : this[c] : Qa.call(this)
        },
        pushStack: function(c) {
            c = h.merge(this.constructor(), c);
            return c.prevObject = this, c
        },
        each: function(c) {
            return h.each(this, c)
        },
        map: function(c) {
            return this.pushStack(h.map(this, function(d, g) {
                return c.call(d, g, d)
            }))
        },
        slice: function() {
            return this.pushStack(Qa.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(c) {
            var d = this.length;
            c = +c + (0 > c ? d : 0);
            return this.pushStack(0 <= c && c < d ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject ||
                this.constructor()
        },
        push: Ta,
        sort: sa.sort,
        splice: sa.splice
    };
    h.extend = h.fn.extend = function() {
        var c, d, g, l, m, n, t = arguments[0] || {},
            p = 1,
            r = arguments.length,
            u = !1;
        "boolean" == typeof t && (u = t, t = arguments[p] || {}, p++);
        "object" == typeof t || h.isFunction(t) || (t = {});
        for (p === r && (t = this, p--); p < r; p++)
            if (null != (c = arguments[p]))
                for (d in c) g = t[d], l = c[d], t !== l && (u && l && (h.isPlainObject(l) || (m = h.isArray(l))) ? (m ? (m = !1, n = g && h.isArray(g) ? g : []) : n = g && h.isPlainObject(g) ? g : {}, t[d] = h.extend(u, n, l)) : void 0 !== l && (t[d] = l));
        return t
    };
    h.extend({
        expando: "jQuery" +
            ("3.1.0" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(c) {
            throw Error(c);
        },
        noop: function() {},
        isFunction: function(c) {
            return "function" === h.type(c)
        },
        isArray: Array.isArray,
        isWindow: function(c) {
            return null != c && c === c.window
        },
        isNumeric: function(c) {
            var d = h.type(c);
            return ("number" === d || "string" === d) && !isNaN(c - parseFloat(c))
        },
        isPlainObject: function(c) {
            var d, g;
            return !(!c || "[object Object]" !== Sc.call(c)) && (!(d = Ea(c)) || (g = Uc.call(d, "constructor") && d.constructor, "function" == typeof g && Vc.call(g) ===
                Hd))
        },
        isEmptyObject: function(c) {
            for (var d in c) return !1;
            return !0
        },
        type: function(c) {
            return null == c ? c + "" : "object" == typeof c || "function" == typeof c ? Pb[Sc.call(c)] || "object" : typeof c
        },
        globalEval: function(c) {
            v(c)
        },
        camelCase: function(c) {
            return c.replace(ce, "ms-").replace(de, ee)
        },
        nodeName: function(c, d) {
            return c.nodeName && c.nodeName.toLowerCase() === d.toLowerCase()
        },
        each: function(c, d) {
            var g, h = 0;
            if (u(c))
                for (g = c.length; h < g && !1 !== d.call(c[h], h, c[h]); h++);
            else
                for (h in c)
                    if (!1 === d.call(c[h], h, c[h])) break; return c
        },
        trim: function(c) {
            return null == c ? "" : (c + "").replace(be, "")
        },
        makeArray: function(c, d) {
            d = d || [];
            return null != c && (u(Object(c)) ? h.merge(d, "string" == typeof c ? [c] : c) : Ta.call(d, c)), d
        },
        inArray: function(c, d, g) {
            return null == d ? -1 : Za.call(d, c, g)
        },
        merge: function(c, d) {
            for (var g = +d.length, h = 0, m = c.length; h < g; h++) c[m++] = d[h];
            return c.length = m, c
        },
        grep: function(c, d, g) {
            for (var h = [], m = 0, n = c.length, t = !g; m < n; m++) g = !d(c[m], m), g !== t && h.push(c[m]);
            return h
        },
        map: function(c, d, g) {
            var h, m, n = 0,
                t = [];
            if (u(c))
                for (h = c.length; n < h; n++) m =
                    d(c[n], n, g), null != m && t.push(m);
            else
                for (n in c) m = d(c[n], n, g), null != m && t.push(m);
            return La.apply([], t)
        },
        guid: 1,
        proxy: function(c, d) {
            var g, l, m;
            if ("string" == typeof d && (g = c[d], d = c, c = g), h.isFunction(c)) return l = Qa.call(arguments, 2), m = function() {
                return c.apply(d || this, l.concat(Qa.call(arguments)))
            }, m.guid = c.guid = c.guid || h.guid++, m
        },
        now: Date.now,
        support: Ba
    });
    "function" == typeof Symbol && (h.fn[Symbol.iterator] = sa[Symbol.iterator]);
    h.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function(c, d) {
            Pb["[object " + d + "]"] = d.toLowerCase()
        });
    var kb = function(c) {
        function d(c, k, g, h) {
            var l, m, n, t, p, r = k && k.ownerDocument,
                u = k ? k.nodeType : 9;
            if (g = g || [], "string" != typeof c || !c || 1 !== u && 9 !== u && 11 !== u) return g;
            if (!h && ((k ? k.ownerDocument || k : ja) !== ta && Z(k), k = k || ta, Ea)) {
                if (11 !== u && (t = ub.exec(c)))
                    if (l = t[1])
                        if (9 === u) {
                            if (!(m = k.getElementById(l))) return g;
                            if (m.id === l) return g.push(m), g
                        } else {
                            if (r && (m = r.getElementById(l)) && qa(k, m) && m.id === l) return g.push(m), g
                        } else {
                    if (t[2]) return Aa.apply(g, k.getElementsByTagName(c)),
                        g;
                    if ((l = t[3]) && U.getElementsByClassName && k.getElementsByClassName) return Aa.apply(g, k.getElementsByClassName(l)), g
                }
                if (!(!U.qsa || Ga[c + " "] || Oa && Oa.test(c))) {
                    if (1 !== u) r = k, p = c;
                    else if ("object" !== k.nodeName.toLowerCase()) {
                        (n = k.getAttribute("id")) ? n = n.replace(hb, jb): k.setAttribute("id", n = ya);
                        m = ea(c);
                        for (l = m.length; l--;) m[l] = "#" + n + " " + x(m[l]);
                        p = m.join(",");
                        r = fb.test(c) && z(k.parentNode) || k
                    }
                    if (p) try {
                        return Aa.apply(g, r.querySelectorAll(p)), g
                    } catch (v) {} finally {
                        n === ya && k.removeAttribute("id")
                    }
                }
            }
            return ma(c.replace(Na,
                "$1"), k, g, h)
        }

        function g() {
            function c(k, g) {
                return d.push(k + " ") > ga.cacheLength && delete c[d.shift()], c[k + " "] = g
            }
            var d = [];
            return c
        }

        function h(c) {
            return c[ya] = !0, c
        }

        function m(c) {
            var d = ta.createElement("fieldset");
            try {
                return !!c(d)
            } catch (k) {
                return !1
            } finally {
                d.parentNode && d.parentNode.removeChild(d)
            }
        }

        function n(c, d) {
            c = c.split("|");
            for (var k = c.length; k--;) ga.attrHandle[c[k]] = d
        }

        function t(c, d) {
            var k = d && c,
                g = k && 1 === c.nodeType && 1 === d.nodeType && c.sourceIndex - d.sourceIndex;
            if (g) return g;
            if (k)
                for (; k = k.nextSibling;)
                    if (k ===
                        d) return -1;
            return c ? 1 : -1
        }

        function p(c) {
            return function(d) {
                return "input" === d.nodeName.toLowerCase() && d.type === c
            }
        }

        function r(c) {
            return function(d) {
                var k = d.nodeName.toLowerCase();
                return ("input" === k || "button" === k) && d.type === c
            }
        }

        function u(c) {
            return function(d) {
                return "label" in d && d.disabled === c || "form" in d && d.disabled === c || "form" in d && !1 === d.disabled && (d.isDisabled === c || d.isDisabled !== !c && ("label" in d || !pb(d)) !== c)
            }
        }

        function v(c) {
            return h(function(d) {
                return d = +d, h(function(k, g) {
                    for (var h, l = c([], k.length,
                            d), m = l.length; m--;) k[h = l[m]] && (k[h] = !(g[h] = k[h]))
                })
            })
        }

        function z(c) {
            return c && "undefined" != typeof c.getElementsByTagName && c
        }

        function B() {}

        function x(c) {
            for (var d = 0, k = c.length, g = ""; d < k; d++) g += c[d].value;
            return g
        }

        function P(c, d, k) {
            var g = d.dir,
                h = d.next,
                l = h || g,
                m = k && "parentNode" === l,
                n = Ba++;
            return d.first ? function(d, k, h) {
                for (; d = d[g];)
                    if (1 === d.nodeType || m) return c(d, k, h)
            } : function(d, k, t) {
                var p, r, A, u = [ra, n];
                if (t)
                    for (; d = d[g];) {
                        if ((1 === d.nodeType || m) && c(d, k, t)) return !0
                    } else
                        for (; d = d[g];)
                            if (1 === d.nodeType ||
                                m)
                                if (A = d[ya] || (d[ya] = {}), r = A[d.uniqueID] || (A[d.uniqueID] = {}), h && h === d.nodeName.toLowerCase()) d = d[g] || d;
                                else {
                                    if ((p = r[l]) && p[0] === ra && p[1] === n) return u[2] = p[2];
                                    if (r[l] = u, u[2] = c(d, k, t)) return !0
                                }
            }
        }

        function G(c) {
            return 1 < c.length ? function(d, k, g) {
                for (var h = c.length; h--;)
                    if (!c[h](d, k, g)) return !1;
                return !0
            } : c[0]
        }

        function K(c, d, k, g, h) {
            for (var l, m = [], n = 0, t = c.length, p = null != d; n < t; n++)(l = c[n]) && (k && !k(l, g, h) || (m.push(l), p && d.push(n)));
            return m
        }

        function J(c, g, m, n, t, p) {
            return n && !n[ya] && (n = J(n)), t && !t[ya] && (t = J(t,
                p)), h(function(h, l, p, r) {
                var u, v, z = [],
                    B = [],
                    E = l.length,
                    x;
                if (!(x = h)) {
                    x = g || "*";
                    for (var H = p.nodeType ? [p] : p, Y = [], L = 0, P = H.length; L < P; L++) d(x, H[L], Y);
                    x = Y
                }
                x = !c || !h && g ? x : K(x, z, c, p, r);
                H = m ? t || (h ? c : E || n) ? [] : l : x;
                if (m && m(x, H, p, r), n)
                    for (u = K(H, B), n(u, [], p, r), p = u.length; p--;)(v = u[p]) && (H[B[p]] = !(x[B[p]] = v));
                if (h) {
                    if (t || c) {
                        if (t) {
                            u = [];
                            for (p = H.length; p--;)(v = H[p]) && u.push(x[p] = v);
                            t(null, H = [], u, r)
                        }
                        for (p = H.length; p--;)(v = H[p]) && -1 < (u = t ? La(h, v) : z[p]) && (h[u] = !(l[u] = v))
                    }
                } else H = K(H === l ? H.splice(E, H.length) : H), t ? t(null, l, H,
                    r) : Aa.apply(l, H)
            })
        }

        function M(c) {
            var d, k, g, h = c.length,
                l = ga.relative[c[0].type];
            k = l || ga.relative[" "];
            for (var m = l ? 1 : 0, n = P(function(c) {
                    return c === d
                }, k, !0), t = P(function(c) {
                    return -1 < La(d, c)
                }, k, !0), p = [function(c, k, g) {
                    c = !l && (g || k !== fa) || ((d = k).nodeType ? n(c, k, g) : t(c, k, g));
                    return d = null, c
                }]; m < h; m++)
                if (k = ga.relative[c[m].type]) p = [P(G(p), k)];
                else {
                    if (k = ga.filter[c[m].type].apply(null, c[m].matches), k[ya]) {
                        for (g = ++m; g < h && !ga.relative[c[g].type]; g++);
                        return J(1 < m && G(p), 1 < m && x(c.slice(0, m - 1).concat({
                            value: " " ===
                                c[m - 2].type ? "*" : ""
                        })).replace(Na, "$1"), k, m < g && M(c.slice(m, g)), g < h && M(c = c.slice(g)), g < h && x(c))
                    }
                    p.push(k)
                }
            return G(p)
        }

        function R(c, g) {
            var m = 0 < g.length,
                n = 0 < c.length,
                t = function(h, l, t, p, r) {
                    var u, v, z, x = 0,
                        B = "0",
                        E = h && [],
                        H = [],
                        Y = fa,
                        N = h || n && ga.find.TAG("*", r),
                        L = ra += null == Y ? 1 : Math.random() || .1,
                        P = N.length;
                    for (r && (fa = l === ta || l || r); B !== P && null != (u = N[B]); B++) {
                        if (n && u) {
                            v = 0;
                            for (l || u.ownerDocument === ta || (Z(u), t = !Ea); z = c[v++];)
                                if (z(u, l || ta, t)) {
                                    p.push(u);
                                    break
                                }
                            r && (ra = L)
                        }
                        m && ((u = !z && u) && x--, h && E.push(u))
                    }
                    if (x += B, m && B !==
                        x) {
                        for (v = 0; z = g[v++];) z(E, H, l, t);
                        if (h) {
                            if (0 < x)
                                for (; B--;) E[B] || H[B] || (H[B] = Ja.call(p));
                            H = K(H)
                        }
                        Aa.apply(p, H);
                        r && !h && 0 < H.length && 1 < x + g.length && d.uniqueSort(p)
                    }
                    return r && (ra = L, fa = Y), E
                };
            return m ? h(t) : t
        }
        var Q, U, ga, W, da, ea, ba, ma, fa, aa, sa, Z, ta, ka, Ea, Oa, za, na, qa, ya = "sizzle" + 1 * new Date,
            ja = c.document,
            ra = 0,
            Ba = 0,
            Qa = g(),
            tb = g(),
            Ga = g(),
            Ha = function(c, d) {
                return c === d && (sa = !0), 0
            },
            Ia = {}.hasOwnProperty,
            xa = [],
            Ja = xa.pop,
            Ka = xa.push,
            Aa = xa.push,
            ob = xa.slice,
            La = function(c, d) {
                for (var k = 0, g = c.length; k < g; k++)
                    if (c[k] === d) return k;
                return -1
            },
            Sa = /[\x20\t\r\n\f]+/g,
            Na = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
            yb = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
            Va = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
            Wa = /=[\x20\t\r\n\f]*([^\]'"]*?)[\x20\t\r\n\f]*\]/g,
            eb = /:((?:\\.|[\w-]|[^\x00-\xa0])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^\x00-\xa0])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/,
            Za = /^(?:\\.|[\w-]|[^\x00-\xa0])+$/,
            Ra = {
                ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
                TAG: /^((?:\\.|[\w-]|[^\x00-\xa0])+|[*])/,
                ATTR: /^\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^\x00-\xa0])+))|)[\x20\t\r\n\f]*\]/,
                PSEUDO: /^:((?:\\.|[\w-]|[^\x00-\xa0])+)(?:\((('((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)")|((?:\\.|[^\\()[\]]|\[[\x20\t\r\n\f]*((?:\\.|[\w-]|[^\x00-\xa0])+)(?:[\x20\t\r\n\f]*([*^$|!~]?=)[\x20\t\r\n\f]*(?:'((?:\\.|[^\\'])*)'|"((?:\\.|[^\\"])*)"|((?:\\.|[\w-]|[^\x00-\xa0])+))|)[\x20\t\r\n\f]*\])*)|.*)\)|)/,
                CHILD: /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,
                bool: /^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$/i,
                needsContext: /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i
            },
            bb = /^(?:input|select|textarea|button)$/i,
            cb = /^h\d$/i,
            Ta =
            /^[^{]+\{\s*\[native \w/,
            ub = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            fb = /[+~]/,
            mb = /\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/ig,
            qb = function(c, d, k) {
                c = "0x" + d - 65536;
                return c !== c || k ? d : 0 > c ? String.fromCharCode(c + 65536) : String.fromCharCode(c >> 10 | 55296, 1023 & c | 56320)
            },
            hb = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
            jb = function(c, d) {
                return d ? "\x00" === c ? "\ufffd" : c.slice(0, -1) + "\\" + c.charCodeAt(c.length - 1).toString(16) + " " : "\\" + c
            },
            kb = function() {
                Z()
            },
            pb = P(function(c) {
                return !0 === c.disabled
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            Aa.apply(xa = ob.call(ja.childNodes), ja.childNodes), xa[ja.childNodes.length].nodeType
        } catch (w) {
            Aa = {
                apply: xa.length ? function(c, d) {
                    Ka.apply(c, ob.call(d))
                } : function(c, d) {
                    for (var k = c.length, g = 0; c[k++] = d[g++];);
                    c.length = k - 1
                }
            }
        }
        U = d.support = {};
        da = d.isXML = function(c) {
            c = c && (c.ownerDocument || c).documentElement;
            return !!c && "HTML" !== c.nodeName
        };
        Z = d.setDocument = function(c) {
            var d, k;
            c = c ? c.ownerDocument || c : ja;
            return c !== ta && 9 === c.nodeType && c.documentElement ? (ta = c, ka = ta.documentElement, Ea = !da(ta),
                ja !== ta && (k = ta.defaultView) && k.top !== k && (k.addEventListener ? k.addEventListener("unload", kb, !1) : k.attachEvent && k.attachEvent("onunload", kb)), U.attributes = m(function(c) {
                    return c.className = "i", !c.getAttribute("className")
                }), U.getElementsByTagName = m(function(c) {
                    return c.appendChild(ta.createComment("")), !c.getElementsByTagName("*").length
                }), U.getElementsByClassName = Ta.test(ta.getElementsByClassName), U.getById = m(function(c) {
                    return ka.appendChild(c).id = ya, !ta.getElementsByName || !ta.getElementsByName(ya).length
                }),
                U.getById ? (ga.find.ID = function(c, d) {
                    if ("undefined" != typeof d.getElementById && Ea) return (c = d.getElementById(c)) ? [c] : []
                }, ga.filter.ID = function(c) {
                    var d = c.replace(mb, qb);
                    return function(c) {
                        return c.getAttribute("id") === d
                    }
                }) : (delete ga.find.ID, ga.filter.ID = function(c) {
                    var d = c.replace(mb, qb);
                    return function(c) {
                        return (c = "undefined" != typeof c.getAttributeNode && c.getAttributeNode("id")) && c.value === d
                    }
                }), ga.find.TAG = U.getElementsByTagName ? function(c, d) {
                    return "undefined" != typeof d.getElementsByTagName ? d.getElementsByTagName(c) :
                        U.qsa ? d.querySelectorAll(c) : void 0
                } : function(c, d) {
                    var k = [],
                        g = 0;
                    d = d.getElementsByTagName(c);
                    if ("*" === c) {
                        for (; c = d[g++];) 1 === c.nodeType && k.push(c);
                        return k
                    }
                    return d
                }, ga.find.CLASS = U.getElementsByClassName && function(c, d) {
                    if ("undefined" != typeof d.getElementsByClassName && Ea) return d.getElementsByClassName(c)
                }, za = [], Oa = [], (U.qsa = Ta.test(ta.querySelectorAll)) && (m(function(c) {
                    ka.appendChild(c).innerHTML = "<a id='" + ya + "'></a><select id='" + ya + "-\r\\' msallowcapture=''><option selected=''></option></select>";
                    c.querySelectorAll("[msallowcapture^='']").length && Oa.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
                    c.querySelectorAll("[selected]").length || Oa.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
                    c.querySelectorAll("[id~=" + ya + "-]").length || Oa.push("~=");
                    c.querySelectorAll(":checked").length || Oa.push(":checked");
                    c.querySelectorAll("a#" + ya + "+*").length || Oa.push(".#.+[+~]")
                }), m(function(c) {
                    c.innerHTML =
                        "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var d = ta.createElement("input");
                    d.setAttribute("type", "hidden");
                    c.appendChild(d).setAttribute("name", "D");
                    c.querySelectorAll("[name=d]").length && Oa.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
                    2 !== c.querySelectorAll(":enabled").length && Oa.push(":enabled", ":disabled");
                    ka.appendChild(c).disabled = !0;
                    2 !== c.querySelectorAll(":disabled").length && Oa.push(":enabled", ":disabled");
                    c.querySelectorAll("*,:x");
                    Oa.push(",.*:")
                })), (U.matchesSelector = Ta.test(na = ka.matches || ka.webkitMatchesSelector || ka.mozMatchesSelector || ka.oMatchesSelector || ka.msMatchesSelector)) && m(function(c) {
                    U.disconnectedMatch = na.call(c, "*");
                    na.call(c, "[s!='']:x");
                    za.push("!=", ":((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)")
                }),
                Oa = Oa.length && new RegExp(Oa.join("|")), za = za.length && new RegExp(za.join("|")), d = Ta.test(ka.compareDocumentPosition), qa = d || Ta.test(ka.contains) ? function(c, d) {
                    var k = 9 === c.nodeType ? c.documentElement : c;
                    d = d && d.parentNode;
                    return c === d || !(!d || 1 !== d.nodeType || !(k.contains ? k.contains(d) : c.compareDocumentPosition && 16 & c.compareDocumentPosition(d)))
                } : function(c, d) {
                    if (d)
                        for (; d = d.parentNode;)
                            if (d === c) return !0;
                    return !1
                }, Ha = d ? function(c, d) {
                    if (c === d) return sa = !0, 0;
                    var k = !c.compareDocumentPosition - !d.compareDocumentPosition;
                    return k ? k : (k = (c.ownerDocument || c) === (d.ownerDocument || d) ? c.compareDocumentPosition(d) : 1, 1 & k || !U.sortDetached && d.compareDocumentPosition(c) === k ? c === ta || c.ownerDocument === ja && qa(ja, c) ? -1 : d === ta || d.ownerDocument === ja && qa(ja, d) ? 1 : aa ? La(aa, c) - La(aa, d) : 0 : 4 & k ? -1 : 1)
                } : function(c, d) {
                    if (c === d) return sa = !0, 0;
                    var k = 0,
                        g = c.parentNode,
                        h = d.parentNode,
                        l = [c],
                        m = [d];
                    if (!g || !h) return c === ta ? -1 : d === ta ? 1 : g ? -1 : h ? 1 : aa ? La(aa, c) - La(aa, d) : 0;
                    if (g === h) return t(c, d);
                    for (; c = c.parentNode;) l.unshift(c);
                    for (c = d; c = c.parentNode;) m.unshift(c);
                    for (; l[k] === m[k];) k++;
                    return k ? t(l[k], m[k]) : l[k] === ja ? -1 : m[k] === ja ? 1 : 0
                }, ta) : ta
        };
        d.matches = function(c, g) {
            return d(c, null, null, g)
        };
        d.matchesSelector = function(c, g) {
            if ((c.ownerDocument || c) !== ta && Z(c), g = g.replace(Wa, "='$1']"), !(!U.matchesSelector || !Ea || Ga[g + " "] || za && za.test(g) || Oa && Oa.test(g))) try {
                var h = na.call(c, g);
                if (h || U.disconnectedMatch || c.document && 11 !== c.document.nodeType) return h
            } catch (l) {}
            return 0 < d(g, ta, null, [c]).length
        };
        d.contains = function(c, d) {
            return (c.ownerDocument || c) !== ta && Z(c), qa(c, d)
        };
        d.attr = function(c, d) {
            (c.ownerDocument || c) !== ta && Z(c);
            var k = ga.attrHandle[d.toLowerCase()],
                k = k && Ia.call(ga.attrHandle, d.toLowerCase()) ? k(c, d, !Ea) : void 0;
            return void 0 !== k ? k : U.attributes || !Ea ? c.getAttribute(d) : (k = c.getAttributeNode(d)) && k.specified ? k.value : null
        };
        d.escape = function(c) {
            return (c + "").replace(hb, jb)
        };
        d.error = function(c) {
            throw Error("Syntax error, unrecognized expression: " + c);
        };
        d.uniqueSort = function(c) {
            var d, k = [],
                g = 0,
                h = 0;
            if (sa = !U.detectDuplicates, aa = !U.sortStable && c.slice(0), c.sort(Ha), sa) {
                for (; d =
                    c[h++];) d === c[h] && (g = k.push(h));
                for (; g--;) c.splice(k[g], 1)
            }
            return aa = null, c
        };
        W = d.getText = function(c) {
            var d, k = "",
                g = 0;
            if (d = c.nodeType)
                if (1 === d || 9 === d || 11 === d) {
                    if ("string" == typeof c.textContent) return c.textContent;
                    for (c = c.firstChild; c; c = c.nextSibling) k += W(c)
                } else {
                    if (3 === d || 4 === d) return c.nodeValue
                } else
                for (; d = c[g++];) k += W(d);
            return k
        };
        ga = d.selectors = {
            cacheLength: 50,
            createPseudo: h,
            match: Ra,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(c) {
                    return c[1] = c[1].replace(mb, qb), c[3] = (c[3] || c[4] || c[5] || "").replace(mb, qb), "~=" === c[2] && (c[3] = " " + c[3] + " "), c.slice(0, 4)
                },
                CHILD: function(c) {
                    return c[1] = c[1].toLowerCase(), "nth" === c[1].slice(0, 3) ? (c[3] || d.error(c[0]), c[4] = +(c[4] ? c[5] + (c[6] || 1) : 2 * ("even" === c[3] || "odd" === c[3])), c[5] = +(c[7] + c[8] || "odd" === c[3])) : c[3] && d.error(c[0]), c
                },
                PSEUDO: function(c) {
                    var d, k = !c[6] && c[2];
                    return Ra.CHILD.test(c[0]) ? null : (c[3] ? c[2] = c[4] || c[5] || "" : k && eb.test(k) &&
                        (d = ea(k, !0)) && (d = k.indexOf(")", k.length - d) - k.length) && (c[0] = c[0].slice(0, d), c[2] = k.slice(0, d)), c.slice(0, 3))
                }
            },
            filter: {
                TAG: function(c) {
                    var d = c.replace(mb, qb).toLowerCase();
                    return "*" === c ? function() {
                        return !0
                    } : function(c) {
                        return c.nodeName && c.nodeName.toLowerCase() === d
                    }
                },
                CLASS: function(c) {
                    var d = Qa[c + " "];
                    return d || (d = new RegExp("(^|[\\x20\\t\\r\\n\\f])" + c + "([\\x20\\t\\r\\n\\f]|$)"), Qa(c, function(c) {
                        return d.test("string" == typeof c.className && c.className || "undefined" != typeof c.getAttribute && c.getAttribute("class") ||
                            "")
                    }))
                },
                ATTR: function(c, g, h) {
                    return function(l) {
                        l = d.attr(l, c);
                        return null == l ? "!=" === g : !g || (l += "", "=" === g ? l === h : "!=" === g ? l !== h : "^=" === g ? h && 0 === l.indexOf(h) : "*=" === g ? h && -1 < l.indexOf(h) : "$=" === g ? h && l.slice(-h.length) === h : "~=" === g ? -1 < (" " + l.replace(Sa, " ") + " ").indexOf(h) : "|=" === g && (l === h || l.slice(0, h.length + 1) === h + "-"))
                    }
                },
                CHILD: function(c, d, k, g, h) {
                    var l = "nth" !== c.slice(0, 3),
                        m = "last" !== c.slice(-4),
                        n = "of-type" === d;
                    return 1 === g && 0 === h ? function(c) {
                        return !!c.parentNode
                    } : function(d, k, t) {
                        var p, r, u, A, v, z;
                        k =
                            l !== m ? "nextSibling" : "previousSibling";
                        var x = d.parentNode,
                            B = n && d.nodeName.toLowerCase();
                        t = !t && !n;
                        var E = !1;
                        if (x) {
                            if (l) {
                                for (; k;) {
                                    for (A = d; A = A[k];)
                                        if (n ? A.nodeName.toLowerCase() === B : 1 === A.nodeType) return !1;
                                    z = k = "only" === c && !z && "nextSibling"
                                }
                                return !0
                            }
                            if (z = [m ? x.firstChild : x.lastChild], m && t)
                                for (A = x, u = A[ya] || (A[ya] = {}), r = u[A.uniqueID] || (u[A.uniqueID] = {}), p = r[c] || [], E = (v = p[0] === ra && p[1]) && p[2], A = v && x.childNodes[v]; A = ++v && A && A[k] || (E = v = 0) || z.pop();) {
                                    if (1 === A.nodeType && ++E && A === d) {
                                        r[c] = [ra, v, E];
                                        break
                                    }
                                } else if (t &&
                                    (A = d, u = A[ya] || (A[ya] = {}), r = u[A.uniqueID] || (u[A.uniqueID] = {}), p = r[c] || [], v = p[0] === ra && p[1], E = v), !1 === E)
                                    for (;
                                        (A = ++v && A && A[k] || (E = v = 0) || z.pop()) && ((n ? A.nodeName.toLowerCase() !== B : 1 !== A.nodeType) || !++E || (t && (u = A[ya] || (A[ya] = {}), r = u[A.uniqueID] || (u[A.uniqueID] = {}), r[c] = [ra, E]), A !== d)););
                            return E -= h, E === g || 0 === E % g && 0 <= E / g
                        }
                    }
                },
                PSEUDO: function(c, g) {
                    var m, n = ga.pseudos[c] || ga.setFilters[c.toLowerCase()] || d.error("unsupported pseudo: " + c);
                    return n[ya] ? n(g) : 1 < n.length ? (m = [c, c, "", g], ga.setFilters.hasOwnProperty(c.toLowerCase()) ?
                        h(function(c, d) {
                            for (var k, h = n(c, g), l = h.length; l--;) k = La(c, h[l]), c[k] = !(d[k] = h[l])
                        }) : function(c) {
                            return n(c, 0, m)
                        }) : n
                }
            },
            pseudos: {
                not: h(function(c) {
                    var d = [],
                        k = [],
                        g = ba(c.replace(Na, "$1"));
                    return g[ya] ? h(function(c, d, k, h) {
                        var l;
                        k = g(c, null, h, []);
                        for (h = c.length; h--;)(l = k[h]) && (c[h] = !(d[h] = l))
                    }) : function(c, h, l) {
                        return d[0] = c, g(d, null, l, k), d[0] = null, !k.pop()
                    }
                }),
                has: h(function(c) {
                    return function(g) {
                        return 0 < d(c, g).length
                    }
                }),
                contains: h(function(c) {
                    return c = c.replace(mb, qb),
                        function(d) {
                            return -1 < (d.textContent ||
                                d.innerText || W(d)).indexOf(c)
                        }
                }),
                lang: h(function(c) {
                    return Za.test(c || "") || d.error("unsupported lang: " + c), c = c.replace(mb, qb).toLowerCase(),
                        function(d) {
                            var k;
                            do
                                if (k = Ea ? d.lang : d.getAttribute("xml:lang") || d.getAttribute("lang")) return k = k.toLowerCase(), k === c || 0 === k.indexOf(c + "-");
                            while ((d = d.parentNode) && 1 === d.nodeType);
                            return !1
                        }
                }),
                target: function(d) {
                    var k = c.location && c.location.hash;
                    return k && k.slice(1) === d.id
                },
                root: function(c) {
                    return c === ka
                },
                focus: function(c) {
                    return c === ta.activeElement && (!ta.hasFocus ||
                        ta.hasFocus()) && !!(c.type || c.href || ~c.tabIndex)
                },
                enabled: u(!1),
                disabled: u(!0),
                checked: function(c) {
                    var d = c.nodeName.toLowerCase();
                    return "input" === d && !!c.checked || "option" === d && !!c.selected
                },
                selected: function(c) {
                    return c.parentNode && c.parentNode.selectedIndex, !0 === c.selected
                },
                empty: function(c) {
                    for (c = c.firstChild; c; c = c.nextSibling)
                        if (6 > c.nodeType) return !1;
                    return !0
                },
                parent: function(c) {
                    return !ga.pseudos.empty(c)
                },
                header: function(c) {
                    return cb.test(c.nodeName)
                },
                input: function(c) {
                    return bb.test(c.nodeName)
                },
                button: function(c) {
                    var d = c.nodeName.toLowerCase();
                    return "input" === d && "button" === c.type || "button" === d
                },
                text: function(c) {
                    var d;
                    return "input" === c.nodeName.toLowerCase() && "text" === c.type && (null == (d = c.getAttribute("type")) || "text" === d.toLowerCase())
                },
                first: v(function() {
                    return [0]
                }),
                last: v(function(c, d) {
                    return [d - 1]
                }),
                eq: v(function(c, d, k) {
                    return [0 > k ? k + d : k]
                }),
                even: v(function(c, d) {
                    for (var k = 0; k < d; k += 2) c.push(k);
                    return c
                }),
                odd: v(function(c, d) {
                    for (var k = 1; k < d; k += 2) c.push(k);
                    return c
                }),
                lt: v(function(c, d, k) {
                    for (d =
                        0 > k ? k + d : k; 0 <= --d;) c.push(d);
                    return c
                }),
                gt: v(function(c, d, k) {
                    for (k = 0 > k ? k + d : k; ++k < d;) c.push(k);
                    return c
                })
            }
        };
        ga.pseudos.nth = ga.pseudos.eq;
        for (Q in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) ga.pseudos[Q] = p(Q);
        for (Q in {
                submit: !0,
                reset: !0
            }) ga.pseudos[Q] = r(Q);
        B.prototype = ga.filters = ga.pseudos;
        ga.setFilters = new B;
        ea = d.tokenize = function(c, g) {
            var h, l, m, n, t, p, r;
            if (t = tb[c + " "]) return g ? 0 : t.slice(0);
            t = c;
            p = [];
            for (r = ga.preFilter; t;) {
                h && !(l = yb.exec(t)) || (l && (t = t.slice(l[0].length) || t), p.push(m = []));
                h = !1;
                (l = Va.exec(t)) && (h = l.shift(), m.push({
                    value: h,
                    type: l[0].replace(Na, " ")
                }), t = t.slice(h.length));
                for (n in ga.filter) !(l = Ra[n].exec(t)) || r[n] && !(l = r[n](l)) || (h = l.shift(), m.push({
                    value: h,
                    type: n,
                    matches: l
                }), t = t.slice(h.length));
                if (!h) break
            }
            return g ? t.length : t ? d.error(c) : tb(c, p).slice(0)
        };
        return ba = d.compile = function(c, d) {
                var k, g = [],
                    h = [],
                    l = Ga[c + " "];
                if (!l) {
                    d || (d = ea(c));
                    for (k = d.length; k--;) l = M(d[k]), l[ya] ? g.push(l) : h.push(l);
                    l = Ga(c, R(h, g));
                    l.selector = c
                }
                return l
            }, ma = d.select = function(c, d, k, g) {
                var h, l, m, n,
                    t, p = "function" == typeof c && c,
                    r = !g && ea(c = p.selector || c);
                if (k = k || [], 1 === r.length) {
                    if (l = r[0] = r[0].slice(0), 2 < l.length && "ID" === (m = l[0]).type && U.getById && 9 === d.nodeType && Ea && ga.relative[l[1].type]) {
                        if (d = (ga.find.ID(m.matches[0].replace(mb, qb), d) || [])[0], !d) return k;
                        p && (d = d.parentNode);
                        c = c.slice(l.shift().value.length)
                    }
                    for (h = Ra.needsContext.test(c) ? 0 : l.length; h-- && (m = l[h], !ga.relative[n = m.type]);)
                        if ((t = ga.find[n]) && (g = t(m.matches[0].replace(mb, qb), fb.test(l[0].type) && z(d.parentNode) || d))) {
                            if (l.splice(h,
                                    1), c = g.length && x(l), !c) return Aa.apply(k, g), k;
                            break
                        }
                }
                return (p || ba(c, r))(g, d, !Ea, k, !d || fb.test(c) && z(d.parentNode) || d), k
            }, U.sortStable = ya.split("").sort(Ha).join("") === ya, U.detectDuplicates = !!sa, Z(), U.sortDetached = m(function(c) {
                return 1 & c.compareDocumentPosition(ta.createElement("fieldset"))
            }), m(function(c) {
                return c.innerHTML = "<a href='#'></a>", "#" === c.firstChild.getAttribute("href")
            }) || n("type|href|height|width", function(c, d, k) {
                if (!k) return c.getAttribute(d, "type" === d.toLowerCase() ? 1 : 2)
            }), U.attributes &&
            m(function(c) {
                return c.innerHTML = "<input/>", c.firstChild.setAttribute("value", ""), "" === c.firstChild.getAttribute("value")
            }) || n("value", function(c, d, k) {
                if (!k && "input" === c.nodeName.toLowerCase()) return c.defaultValue
            }), m(function(c) {
                return null == c.getAttribute("disabled")
            }) || n("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", function(c, d, k) {
                var g;
                if (!k) return !0 === c[d] ? d.toLowerCase() : (g = c.getAttributeNode(d)) && g.specified ? g.value :
                    null
            }), d
    }(d);
    h.find = kb;
    h.expr = kb.selectors;
    h.expr[":"] = h.expr.pseudos;
    h.uniqueSort = h.unique = kb.uniqueSort;
    h.text = kb.getText;
    h.isXMLDoc = kb.isXML;
    h.contains = kb.contains;
    h.escapeSelector = kb.escape;
    var bc = function(c, d, g) {
            for (var l = [], m = void 0 !== g;
                (c = c[d]) && 9 !== c.nodeType;)
                if (1 === c.nodeType) {
                    if (m && h(c).is(g)) break;
                    l.push(c)
                }
            return l
        },
        Wc = function(c, d) {
            for (var g = []; c; c = c.nextSibling) 1 === c.nodeType && c !== d && g.push(c);
            return g
        },
        od = h.expr.match.needsContext,
        pd = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
        Id = /^.[^:#\[\.,]*$/;
    h.filter = function(c, d, g) {
        var l = d[0];
        return g && (c = ":not(" + c + ")"), 1 === d.length && 1 === l.nodeType ? h.find.matchesSelector(l, c) ? [l] : [] : h.find.matches(c, h.grep(d, function(c) {
            return 1 === c.nodeType
        }))
    };
    h.fn.extend({
        find: function(c) {
            var d, g, l = this.length,
                m = this;
            if ("string" != typeof c) return this.pushStack(h(c).filter(function() {
                for (d = 0; d < l; d++)
                    if (h.contains(m[d], this)) return !0
            }));
            g = this.pushStack([]);
            for (d = 0; d < l; d++) h.find(c, m[d], g);
            return 1 < l ? h.uniqueSort(g) : g
        },
        filter: function(c) {
            return this.pushStack(z(this,
                c || [], !1))
        },
        not: function(c) {
            return this.pushStack(z(this, c || [], !0))
        },
        is: function(c) {
            return !!z(this, "string" == typeof c && od.test(c) ? h(c) : c || [], !1).length
        }
    });
    var J, Jd = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (h.fn.init = function(c, d, g) {
        var l, m;
        if (!c) return this;
        if (g = g || J, "string" == typeof c) {
            if (l = "<" === c[0] && ">" === c[c.length - 1] && 3 <= c.length ? [null, c, null] : Jd.exec(c), !l || !l[1] && d) return !d || d.jquery ? (d || g).find(c) : this.constructor(d).find(c);
            if (l[1]) {
                if (d = d instanceof h ? d[0] : d, h.merge(this, h.parseHTML(l[1],
                        d && d.nodeType ? d.ownerDocument || d : G, !0)), pd.test(l[1]) && h.isPlainObject(d))
                    for (l in d) h.isFunction(this[l]) ? this[l](d[l]) : this.attr(l, d[l]);
                return this
            }
            return m = G.getElementById(l[2]), m && (this[0] = m, this.length = 1), this
        }
        return c.nodeType ? (this[0] = c, this.length = 1, this) : h.isFunction(c) ? void 0 !== g.ready ? g.ready(c) : c(h) : h.makeArray(c, this)
    }).prototype = h.fn;
    J = h(G);
    var Kd = /^(?:parents|prev(?:Until|All))/,
        bb = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    h.fn.extend({
        has: function(c) {
            var d = h(c, this),
                g = d.length;
            return this.filter(function() {
                for (var c =
                        0; c < g; c++)
                    if (h.contains(this, d[c])) return !0
            })
        },
        closest: function(c, d) {
            var g, l = 0,
                m = this.length,
                n = [],
                t = "string" != typeof c && h(c);
            if (!od.test(c))
                for (; l < m; l++)
                    for (g = this[l]; g && g !== d; g = g.parentNode)
                        if (11 > g.nodeType && (t ? -1 < t.index(g) : 1 === g.nodeType && h.find.matchesSelector(g, c))) {
                            n.push(g);
                            break
                        }
            return this.pushStack(1 < n.length ? h.uniqueSort(n) : n)
        },
        index: function(c) {
            return c ? "string" == typeof c ? Za.call(h(c), this[0]) : Za.call(this, c.jquery ? c[0] : c) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(c, d) {
            return this.pushStack(h.uniqueSort(h.merge(this.get(), h(c, d))))
        },
        addBack: function(c) {
            return this.add(null == c ? this.prevObject : this.prevObject.filter(c))
        }
    });
    h.each({
        parent: function(c) {
            return (c = c.parentNode) && 11 !== c.nodeType ? c : null
        },
        parents: function(c) {
            return bc(c, "parentNode")
        },
        parentsUntil: function(c, d, g) {
            return bc(c, "parentNode", g)
        },
        next: function(c) {
            return x(c, "nextSibling")
        },
        prev: function(c) {
            return x(c, "previousSibling")
        },
        nextAll: function(c) {
            return bc(c, "nextSibling")
        },
        prevAll: function(c) {
            return bc(c,
                "previousSibling")
        },
        nextUntil: function(c, d, g) {
            return bc(c, "nextSibling", g)
        },
        prevUntil: function(c, d, g) {
            return bc(c, "previousSibling", g)
        },
        siblings: function(c) {
            return Wc((c.parentNode || {}).firstChild, c)
        },
        children: function(c) {
            return Wc(c.firstChild)
        },
        contents: function(c) {
            return c.contentDocument || h.merge([], c.childNodes)
        }
    }, function(c, d) {
        h.fn[c] = function(g, l) {
            var m = h.map(this, d, g);
            return "Until" !== c.slice(-5) && (l = g), l && "string" == typeof l && (m = h.filter(l, m)), 1 < this.length && (bb[c] || h.uniqueSort(m), Kd.test(c) &&
                m.reverse()), this.pushStack(m)
        }
    });
    var ja = /\S+/g;
    h.Callbacks = function(c) {
        c = "string" == typeof c ? r(c) : h.extend({}, c);
        var d, g, l, m, n = [],
            t = [],
            p = -1,
            u = function() {
                m = c.once;
                for (l = d = !0; t.length; p = -1)
                    for (g = t.shift(); ++p < n.length;) !1 === n[p].apply(g[0], g[1]) && c.stopOnFalse && (p = n.length, g = !1);
                c.memory || (g = !1);
                d = !1;
                m && (n = g ? [] : "")
            },
            v = {
                add: function() {
                    return n && (g && !d && (p = n.length - 1, t.push(g)), function Ca(d) {
                            h.each(d, function(d, k) {
                                h.isFunction(k) ? c.unique && v.has(k) || n.push(k) : k && k.length && "string" !== h.type(k) && Ca(k)
                            })
                        }(arguments),
                        g && !d && u()), this
                },
                remove: function() {
                    return h.each(arguments, function(c, d) {
                        for (var k; - 1 < (k = h.inArray(d, n, k));) n.splice(k, 1), k <= p && p--
                    }), this
                },
                has: function(c) {
                    return c ? -1 < h.inArray(c, n) : 0 < n.length
                },
                empty: function() {
                    return n && (n = []), this
                },
                disable: function() {
                    return m = t = [], n = g = "", this
                },
                disabled: function() {
                    return !n
                },
                lock: function() {
                    return m = t = [], g || d || (n = g = ""), this
                },
                locked: function() {
                    return !!m
                },
                fireWith: function(c, g) {
                    return m || (g = g || [], g = [c, g.slice ? g.slice() : g], t.push(g), d || u()), this
                },
                fire: function() {
                    return v.fireWith(this,
                        arguments), this
                },
                fired: function() {
                    return !!l
                }
            };
        return v
    };
    h.extend({
        Deferred: function(c) {
            var k = [
                    ["notify", "progress", h.Callbacks("memory"), h.Callbacks("memory"), 2],
                    ["resolve", "done", h.Callbacks("once memory"), h.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", h.Callbacks("once memory"), h.Callbacks("once memory"), 1, "rejected"]
                ],
                g = "pending",
                l = {
                    state: function() {
                        return g
                    },
                    always: function() {
                        return m.done(arguments).fail(arguments), this
                    },
                    "catch": function(c) {
                        return l.then(null, c)
                    },
                    pipe: function() {
                        var c =
                            arguments;
                        return h.Deferred(function(d) {
                            h.each(k, function(k, g) {
                                var l = h.isFunction(c[g[4]]) && c[g[4]];
                                m[g[1]](function() {
                                    var c = l && l.apply(this, arguments);
                                    c && h.isFunction(c.promise) ? c.promise().progress(d.notify).done(d.resolve).fail(d.reject) : d[g[0] + "With"](this, l ? [c] : arguments)
                                })
                            });
                            c = null
                        }).promise()
                    },
                    then: function(c, g, l) {
                        function m(c, k, g, l) {
                            return function() {
                                var n = this,
                                    t = arguments,
                                    r = function() {
                                        var d, r;
                                        if (!(c < p)) {
                                            if (d = g.apply(n, t), d === k.promise()) throw new TypeError("Thenable self-resolution");
                                            r = d &&
                                                ("object" == typeof d || "function" == typeof d) && d.then;
                                            h.isFunction(r) ? l ? r.call(d, m(p, k, Q, l), m(p, k, R, l)) : (p++, r.call(d, m(p, k, Q, l), m(p, k, R, l), m(p, k, Q, k.notifyWith))) : (g !== Q && (n = void 0, t = [d]), (l || k.resolveWith)(n, t))
                                        }
                                    },
                                    u = l ? r : function() {
                                        try {
                                            r()
                                        } catch (d) {
                                            h.Deferred.exceptionHook && h.Deferred.exceptionHook(d, u.stackTrace), c + 1 >= p && (g !== R && (n = void 0, t = [d]), k.rejectWith(n, t))
                                        }
                                    };
                                c ? u() : (h.Deferred.getStackHook && (u.stackTrace = h.Deferred.getStackHook()), d.setTimeout(u))
                            }
                        }
                        var p = 0;
                        return h.Deferred(function(d) {
                            k[0][3].add(m(0,
                                d, h.isFunction(l) ? l : Q, d.notifyWith));
                            k[1][3].add(m(0, d, h.isFunction(c) ? c : Q));
                            k[2][3].add(m(0, d, h.isFunction(g) ? g : R))
                        }).promise()
                    },
                    promise: function(c) {
                        return null != c ? h.extend(c, l) : l
                    }
                },
                m = {};
            return h.each(k, function(c, d) {
                var h = d[2],
                    p = d[5];
                l[d[1]] = h.add;
                p && h.add(function() {
                    g = p
                }, k[3 - c][2].disable, k[0][2].lock);
                h.add(d[3].fire);
                m[d[0]] = function() {
                    return m[d[0] + "With"](this === m ? void 0 : this, arguments), this
                };
                m[d[0] + "With"] = h.fireWith
            }), l.promise(m), c && c.call(m, m), m
        },
        when: function(c) {
            var d = arguments.length,
                g = d,
                l = Array(g),
                m = Qa.call(arguments),
                n = h.Deferred(),
                t = function(c) {
                    return function(g) {
                        l[c] = this;
                        m[c] = 1 < arguments.length ? Qa.call(arguments) : g;
                        --d || n.resolveWith(l, m)
                    }
                };
            if (1 >= d && (da(c, n.done(t(g)).resolve, n.reject), "pending" === n.state() || h.isFunction(m[g] && m[g].then))) return n.then();
            for (; g--;) da(m[g], t(g), n.reject);
            return n.promise()
        }
    });
    var Qb = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    h.Deferred.exceptionHook = function(c, k) {
        d.console && d.console.warn && c && Qb.test(c.name) && d.console.warn("jQuery.Deferred exception: " +
            c.message, c.stack, k)
    };
    h.readyException = function(c) {
        d.setTimeout(function() {
            throw c;
        })
    };
    var jc = h.Deferred();
    h.fn.ready = function(c) {
        return jc.then(c)["catch"](function(c) {
            h.readyException(c)
        }), this
    };
    h.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(c) {
            c ? h.readyWait++ : h.ready(!0)
        },
        ready: function(c) {
            (!0 === c ? --h.readyWait : h.isReady) || (h.isReady = !0, !0 !== c && 0 < --h.readyWait || jc.resolveWith(G, [h]))
        }
    });
    h.ready.then = jc.then;
    "complete" === G.readyState || "loading" !== G.readyState && !G.documentElement.doScroll ? d.setTimeout(h.ready) :
        (G.addEventListener("DOMContentLoaded", aa), d.addEventListener("load", aa));
    var M = function(c, d, g, l, m, n, t) {
            var p = 0,
                r = c.length,
                u = null == g;
            if ("object" === h.type(g))
                for (p in m = !0, g) M(c, d, p, g[p], !0, n, t);
            else if (void 0 !== l && (m = !0, h.isFunction(l) || (t = !0), u && (t ? (d.call(c, l), d = null) : (u = d, d = function(c, d, k) {
                    return u.call(h(c), k)
                })), d))
                for (; p < r; p++) d(c[p], g, t ? l : l.call(c[p], p, d(c[p], g)));
            return m ? c : u ? d.call(c) : r ? d(c[0], g) : n
        },
        ba = function(c) {
            return 1 === c.nodeType || 9 === c.nodeType || !+c.nodeType
        };
    ma.uid = 1;
    ma.prototype = {
        cache: function(c) {
            var d = c[this.expando];
            return d || (d = {}, ba(c) && (c.nodeType ? c[this.expando] = d : Object.defineProperty(c, this.expando, {
                value: d,
                configurable: !0
            }))), d
        },
        set: function(c, d, g) {
            var l;
            c = this.cache(c);
            if ("string" == typeof d) c[h.camelCase(d)] = g;
            else
                for (l in d) c[h.camelCase(l)] = d[l];
            return c
        },
        get: function(c, d) {
            return void 0 === d ? this.cache(c) : c[this.expando] && c[this.expando][h.camelCase(d)]
        },
        access: function(c, d, g) {
            return void 0 === d || d && "string" == typeof d && void 0 === g ? this.get(c, d) : (this.set(c, d, g),
                void 0 !== g ? g : d)
        },
        remove: function(c, d) {
            var g, l = c[this.expando];
            if (void 0 !== l) {
                if (void 0 !== d)
                    for (h.isArray(d) ? d = d.map(h.camelCase) : (d = h.camelCase(d), d = d in l ? [d] : d.match(ja) || []), g = d.length; g--;) delete l[d[g]];
                (void 0 === d || h.isEmptyObject(l)) && (c.nodeType ? c[this.expando] = void 0 : delete c[this.expando])
            }
        },
        hasData: function(c) {
            c = c[this.expando];
            return void 0 !== c && !h.isEmptyObject(c)
        }
    };
    var Z = new ma,
        W = new ma,
        Md = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Nd = /[A-Z]/g;
    h.extend({
        hasData: function(c) {
            return W.hasData(c) ||
                Z.hasData(c)
        },
        data: function(c, d, g) {
            return W.access(c, d, g)
        },
        removeData: function(c, d) {
            W.remove(c, d)
        },
        _data: function(c, d, g) {
            return Z.access(c, d, g)
        },
        _removeData: function(c, d) {
            Z.remove(c, d)
        }
    });
    h.fn.extend({
        data: function(c, d) {
            var g, l, m, n = this[0],
                t = n && n.attributes;
            if (void 0 === c) {
                if (this.length && (m = W.get(n), 1 === n.nodeType && !Z.get(n, "hasDataAttrs"))) {
                    for (g = t.length; g--;) t[g] && (l = t[g].name, 0 === l.indexOf("data-") && (l = h.camelCase(l.slice(5)), ka(n, l, m[l])));
                    Z.set(n, "hasDataAttrs", !0)
                }
                return m
            }
            return "object" ==
                typeof c ? this.each(function() {
                    W.set(this, c)
                }) : M(this, function(d) {
                    var k;
                    if (n && void 0 === d) {
                        if ((k = W.get(n, c), void 0 !== k) || (k = ka(n, c), void 0 !== k)) return k
                    } else this.each(function() {
                        W.set(this, c, d)
                    })
                }, null, d, 1 < arguments.length, null, !0)
        },
        removeData: function(c) {
            return this.each(function() {
                W.remove(this, c)
            })
        }
    });
    h.extend({
        queue: function(c, d, g) {
            var l;
            if (c) return d = (d || "fx") + "queue", l = Z.get(c, d), g && (!l || h.isArray(g) ? l = Z.access(c, d, h.makeArray(g)) : l.push(g)), l || []
        },
        dequeue: function(c, d) {
            d = d || "fx";
            var g = h.queue(c,
                    d),
                l = g.length,
                m = g.shift(),
                n = h._queueHooks(c, d),
                t = function() {
                    h.dequeue(c, d)
                };
            "inprogress" === m && (m = g.shift(), l--);
            m && ("fx" === d && g.unshift("inprogress"), delete n.stop, m.call(c, t, n));
            !l && n && n.empty.fire()
        },
        _queueHooks: function(c, d) {
            var g = d + "queueHooks";
            return Z.get(c, g) || Z.access(c, g, {
                empty: h.Callbacks("once memory").add(function() {
                    Z.remove(c, [d + "queue", g])
                })
            })
        }
    });
    h.fn.extend({
        queue: function(c, d) {
            var g = 2;
            return "string" != typeof c && (d = c, c = "fx", g--), arguments.length < g ? h.queue(this[0], c) : void 0 === d ? this :
                this.each(function() {
                    var g = h.queue(this, c, d);
                    h._queueHooks(this, c);
                    "fx" === c && "inprogress" !== g[0] && h.dequeue(this, c)
                })
        },
        dequeue: function(c) {
            return this.each(function() {
                h.dequeue(this, c)
            })
        },
        clearQueue: function(c) {
            return this.queue(c || "fx", [])
        },
        promise: function(c, d) {
            var g, l = 1,
                m = h.Deferred(),
                n = this,
                t = this.length,
                p = function() {
                    --l || m.resolveWith(n, [n])
                };
            "string" != typeof c && (d = c, c = void 0);
            for (c = c || "fx"; t--;)(g = Z.get(n[t], c + "queueHooks")) && g.empty && (l++, g.empty.add(p));
            return p(), m.promise(d)
        }
    });
    var qd = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        kc = new RegExp("^(?:([+-])=|)(" + qd + ")([a-z%]*)$", "i"),
        Rb = ["Top", "Right", "Bottom", "Left"],
        Ac = function(c, d) {
            return c = d || c, "none" === c.style.display || "" === c.style.display && h.contains(c.ownerDocument, c) && "none" === h.css(c, "display")
        },
        rd = function(c, d, g, h) {
            var m, n = {};
            for (m in d) n[m] = c.style[m], c.style[m] = d[m];
            g = g.apply(c, h || []);
            for (m in d) c.style[m] = n[m];
            return g
        },
        sd = {};
    h.fn.extend({
        show: function() {
            return tb(this, !0)
        },
        hide: function() {
            return tb(this)
        },
        toggle: function(c) {
            return "boolean" == typeof c ? c ? this.show() :
                this.hide() : this.each(function() {
                    Ac(this) ? h(this).show() : h(this).hide()
                })
        }
    });
    var cc = /^(?:checkbox|radio)$/i,
        dc = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        Gb = /^$|\/(?:java|ecma)script/i,
        Va = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Va.optgroup = Va.option;
    Va.tbody = Va.tfoot = Va.colgroup = Va.caption = Va.thead;
    Va.th = Va.td;
    var hb = /<|&#?\w+;/;
    ! function() {
        var c = G.createDocumentFragment().appendChild(G.createElement("div")),
            d = G.createElement("input");
        d.setAttribute("type", "radio");
        d.setAttribute("checked", "checked");
        d.setAttribute("name", "t");
        c.appendChild(d);
        Ba.checkClone = c.cloneNode(!0).cloneNode(!0).lastChild.checked;
        c.innerHTML = "<textarea>x</textarea>";
        Ba.noCloneChecked = !!c.cloneNode(!0).lastChild.defaultValue
    }();
    var cb = G.documentElement,
        Na = /^key/,
        lc = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Wa =
        /^([^.]*)(?:\.(.+)|)/;
    h.event = {
        global: {},
        add: function(c, d, g, l, m) {
            var n, t, p, r, u, v, z, x, B, P;
            if (u = Z.get(c))
                for (g.handler && (n = g, g = n.handler, m = n.selector), m && h.find.matchesSelector(cb, m), g.guid || (g.guid = h.guid++), (r = u.events) || (r = u.events = {}), (t = u.handle) || (t = u.handle = function(d) {
                        return "undefined" != typeof h && h.event.triggered !== d.type ? h.event.dispatch.apply(c, arguments) : void 0
                    }), d = (d || "").match(ja) || [""], u = d.length; u--;) p = Wa.exec(d[u]) || [], B = P = p[1], p = (p[2] || "").split(".").sort(), B && (z = h.event.special[B] || {}, B = (m ? z.delegateType : z.bindType) || B, z = h.event.special[B] || {}, v = h.extend({
                    type: B,
                    origType: P,
                    data: l,
                    handler: g,
                    guid: g.guid,
                    selector: m,
                    needsContext: m && h.expr.match.needsContext.test(m),
                    namespace: p.join(".")
                }, n), (x = r[B]) || (x = r[B] = [], x.delegateCount = 0, z.setup && !1 !== z.setup.call(c, l, p, t) || c.addEventListener && c.addEventListener(B, t)), z.add && (z.add.call(c, v), v.handler.guid || (v.handler.guid = g.guid)), m ? x.splice(x.delegateCount++, 0, v) : x.push(v), h.event.global[B] = !0)
        },
        remove: function(c, d, g, l, m) {
            var n, t, p, r,
                u, v, z, B, x, P, G, K = Z.hasData(c) && Z.get(c);
            if (K && (r = K.events)) {
                d = (d || "").match(ja) || [""];
                for (u = d.length; u--;)
                    if (p = Wa.exec(d[u]) || [], x = G = p[1], P = (p[2] || "").split(".").sort(), x) {
                        z = h.event.special[x] || {};
                        x = (l ? z.delegateType : z.bindType) || x;
                        B = r[x] || [];
                        p = p[2] && new RegExp("(^|\\.)" + P.join("\\.(?:.*\\.|)") + "(\\.|$)");
                        for (t = n = B.length; n--;) v = B[n], !m && G !== v.origType || g && g.guid !== v.guid || p && !p.test(v.namespace) || l && l !== v.selector && ("**" !== l || !v.selector) || (B.splice(n, 1), v.selector && B.delegateCount--, z.remove && z.remove.call(c,
                            v));
                        t && !B.length && (z.teardown && !1 !== z.teardown.call(c, P, K.handle) || h.removeEvent(c, x, K.handle), delete r[x])
                    } else
                        for (x in r) h.event.remove(c, x + d[u], g, l, !0);
                h.isEmptyObject(r) && Z.remove(c, "handle events")
            }
        },
        dispatch: function(c) {
            var d = h.event.fix(c),
                g, l, m, n, t, p, r = Array(arguments.length);
            l = (Z.get(this, "events") || {})[d.type] || [];
            var u = h.event.special[d.type] || {};
            r[0] = d;
            for (g = 1; g < arguments.length; g++) r[g] = arguments[g];
            if (d.delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, d)) {
                p = h.event.handlers.call(this,
                    d, l);
                for (g = 0;
                    (n = p[g++]) && !d.isPropagationStopped();)
                    for (d.currentTarget = n.elem, l = 0;
                        (t = n.handlers[l++]) && !d.isImmediatePropagationStopped();) d.rnamespace && !d.rnamespace.test(t.namespace) || (d.handleObj = t, d.data = t.data, m = ((h.event.special[t.origType] || {}).handle || t.handler).apply(n.elem, r), void 0 !== m && !1 === (d.result = m) && (d.preventDefault(), d.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, d), d.result
            }
        },
        handlers: function(c, d) {
            var g, l, m, n, t = [],
                p = d.delegateCount,
                r = c.target;
            if (p && r.nodeType &&
                ("click" !== c.type || isNaN(c.button) || 1 > c.button))
                for (; r !== this; r = r.parentNode || this)
                    if (1 === r.nodeType && (!0 !== r.disabled || "click" !== c.type)) {
                        l = [];
                        for (g = 0; g < p; g++) n = d[g], m = n.selector + " ", void 0 === l[m] && (l[m] = n.needsContext ? -1 < h(m, this).index(r) : h.find(m, this, null, [r]).length), l[m] && l.push(n);
                        l.length && t.push({
                            elem: r,
                            handlers: l
                        })
                    }
            return p < d.length && t.push({
                elem: this,
                handlers: d.slice(p)
            }), t
        },
        addProp: function(c, d) {
            Object.defineProperty(h.Event.prototype, c, {
                enumerable: !0,
                configurable: !0,
                get: h.isFunction(d) ?
                    function() {
                        if (this.originalEvent) return d(this.originalEvent)
                    } : function() {
                        if (this.originalEvent) return this.originalEvent[c]
                    },
                set: function(d) {
                    Object.defineProperty(this, c, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: d
                    })
                }
            })
        },
        fix: function(c) {
            return c[h.expando] ? c : new h.Event(c)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== ra() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === ra() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && h.nodeName(this, "input")) return this.click(), !1
                },
                _default: function(c) {
                    return h.nodeName(c.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(c) {
                    void 0 !== c.result && c.originalEvent && (c.originalEvent.returnValue = c.result)
                }
            }
        }
    };
    h.removeEvent = function(c, d, g) {
        c.removeEventListener && c.removeEventListener(d, g)
    };
    h.Event = function(c, d) {
        return this instanceof h.Event ? (c && c.type ? (this.originalEvent = c, this.type = c.type, this.isDefaultPrevented = c.defaultPrevented ||
            void 0 === c.defaultPrevented && !1 === c.returnValue ? yb : ob, this.target = c.target && 3 === c.target.nodeType ? c.target.parentNode : c.target, this.currentTarget = c.currentTarget, this.relatedTarget = c.relatedTarget) : this.type = c, d && h.extend(this, d), this.timeStamp = c && c.timeStamp || h.now(), void(this[h.expando] = !0)) : new h.Event(c, d)
    };
    h.Event.prototype = {
        constructor: h.Event,
        isDefaultPrevented: ob,
        isPropagationStopped: ob,
        isImmediatePropagationStopped: ob,
        isSimulated: !1,
        preventDefault: function() {
            var c = this.originalEvent;
            this.isDefaultPrevented =
                yb;
            c && !this.isSimulated && c.preventDefault()
        },
        stopPropagation: function() {
            var c = this.originalEvent;
            this.isPropagationStopped = yb;
            c && !this.isSimulated && c.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var c = this.originalEvent;
            this.isImmediatePropagationStopped = yb;
            c && !this.isSimulated && c.stopImmediatePropagation();
            this.stopPropagation()
        }
    };
    h.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(c) {
            var d = c.button;
            return null == c.which && Na.test(c.type) ? null != c.charCode ? c.charCode : c.keyCode : !c.which && void 0 !== d && lc.test(c.type) ? 1 & d ? 1 : 2 & d ? 3 : 4 & d ? 2 : 0 : c.which
        }
    }, h.event.addProp);
    h.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(c, d) {
        h.event.special[c] = {
            delegateType: d,
            bindType: d,
            handle: function(c) {
                var l, m = c.relatedTarget,
                    n = c.handleObj;
                return m && (m === this || h.contains(this, m)) || (c.type = n.origType, l = n.handler.apply(this, arguments), c.type = d), l
            }
        }
    });
    h.fn.extend({
        on: function(c, d, g, h) {
            return qa(this, c, d, g, h)
        },
        one: function(c, d, g, h) {
            return qa(this, c, d, g, h, 1)
        },
        off: function(c, d, g) {
            var l, m;
            if (c && c.preventDefault && c.handleObj) return l = c.handleObj, h(c.delegateTarget).off(l.namespace ? l.origType + "." + l.namespace : l.origType, l.selector, l.handler), this;
            if ("object" ==
                typeof c) {
                for (m in c) this.off(m, d, c[m]);
                return this
            }
            return !1 !== d && "function" != typeof d || (g = d, d = void 0), !1 === g && (g = ob), this.each(function() {
                h.event.remove(this, c, g, d)
            })
        }
    });
    var Ra = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        mc = /<script|<style|<link/i,
        td = /checked\s*(?:[^=]|=\s*.checked.)/i,
        nc = /^true\/(.*)/,
        oc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    h.extend({
        htmlPrefilter: function(c) {
            return c.replace(Ra, "<$1></$2>")
        },
        clone: function(c, d, g) {
            var l, m,
                n, t, p = c.cloneNode(!0),
                r = h.contains(c.ownerDocument, c);
            if (!(Ba.noCloneChecked || 1 !== c.nodeType && 11 !== c.nodeType || h.isXMLDoc(c)))
                for (t = za(p), n = za(c), l = 0, m = n.length; l < m; l++) {
                    var u = n[l],
                        v = t[l],
                        z = v.nodeName.toLowerCase();
                    "input" === z && cc.test(u.type) ? v.checked = u.checked : "input" !== z && "textarea" !== z || (v.defaultValue = u.defaultValue)
                }
            if (d)
                if (g)
                    for (n = n || za(c), t = t || za(p), l = 0, m = n.length; l < m; l++) ub(n[l], t[l]);
                else ub(c, p);
            return t = za(p, "script"), 0 < t.length && B(t, !r && za(c, "script")), p
        },
        cleanData: function(c) {
            for (var d,
                    g, l, m = h.event.special, n = 0; void 0 !== (g = c[n]); n++)
                if (ba(g)) {
                    if (d = g[Z.expando]) {
                        if (d.events)
                            for (l in d.events) m[l] ? h.event.remove(g, l) : h.removeEvent(g, l, d.handle);
                        g[Z.expando] = void 0
                    }
                    g[W.expando] && (g[W.expando] = void 0)
                }
        }
    });
    h.fn.extend({
        detach: function(c) {
            return Yb(this, c, !0)
        },
        remove: function(c) {
            return Yb(this, c)
        },
        text: function(c) {
            return M(this, function(c) {
                    return void 0 === c ? h.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = c)
                    })
                }, null,
                c, arguments.length)
        },
        append: function() {
            return jb(this, arguments, function(c) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || yc(this, c).appendChild(c)
            })
        },
        prepend: function() {
            return jb(this, arguments, function(c) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var d = yc(this, c);
                    d.insertBefore(c, d.firstChild)
                }
            })
        },
        before: function() {
            return jb(this, arguments, function(c) {
                this.parentNode && this.parentNode.insertBefore(c, this)
            })
        },
        after: function() {
            return jb(this, arguments, function(c) {
                this.parentNode &&
                    this.parentNode.insertBefore(c, this.nextSibling)
            })
        },
        empty: function() {
            for (var c, d = 0; null != (c = this[d]); d++) 1 === c.nodeType && (h.cleanData(za(c, !1)), c.textContent = "");
            return this
        },
        clone: function(c, d) {
            return c = null != c && c, d = null == d ? c : d, this.map(function() {
                return h.clone(this, c, d)
            })
        },
        html: function(c) {
            return M(this, function(c) {
                var d = this[0] || {},
                    l = 0,
                    m = this.length;
                if (void 0 === c && 1 === d.nodeType) return d.innerHTML;
                if ("string" == typeof c && !mc.test(c) && !Va[(dc.exec(c) || ["", ""])[1].toLowerCase()]) {
                    c = h.htmlPrefilter(c);
                    try {
                        for (; l < m; l++) d = this[l] || {}, 1 === d.nodeType && (h.cleanData(za(d, !1)), d.innerHTML = c);
                        d = 0
                    } catch (n) {}
                }
                d && this.empty().append(c)
            }, null, c, arguments.length)
        },
        replaceWith: function() {
            var c = [];
            return jb(this, arguments, function(d) {
                var g = this.parentNode;
                0 > h.inArray(this, c) && (h.cleanData(za(this)), g && g.replaceChild(d, this))
            }, c)
        }
    });
    h.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(c, d) {
        h.fn[c] = function(c) {
            for (var l = [], m = h(c), n = m.length -
                    1, t = 0; t <= n; t++) c = t === n ? this : this.clone(!0), h(m[t])[d](c), Ta.apply(l, c.get());
            return this.pushStack(l)
        }
    });
    var Sb = /^margin/,
        Bc = new RegExp("^(" + qd + ")(?!px)[a-z%]+$", "i"),
        Hb = function(c) {
            var k = c.ownerDocument.defaultView;
            return k && k.opener || (k = d), k.getComputedStyle(c)
        };
    ! function() {
        function c() {
            if (t) {
                t.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%";
                t.innerHTML = "";
                cb.appendChild(n);
                var c = d.getComputedStyle(t);
                k = "1%" !== c.top;
                m = "2px" ===
                    c.marginLeft;
                g = "4px" === c.width;
                t.style.marginRight = "50%";
                l = "4px" === c.marginRight;
                cb.removeChild(n);
                t = null
            }
        }
        var k, g, l, m, n = G.createElement("div"),
            t = G.createElement("div");
        t.style && (t.style.backgroundClip = "content-box", t.cloneNode(!0).style.backgroundClip = "", Ba.clearCloneStyle = "content-box" === t.style.backgroundClip, n.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", n.appendChild(t), h.extend(Ba, {
            pixelPosition: function() {
                return c(), k
            },
            boxSizingReliable: function() {
                return c(),
                    g
            },
            pixelMarginRight: function() {
                return c(), l
            },
            reliableMarginLeft: function() {
                return c(), m
            }
        }))
    }();
    var Cc = /^(none|table(?!-c[ea]).+)/,
        Dc = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Tb = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Ec = ["Webkit", "Moz", "ms"],
        Fc = G.createElement("div").style;
    h.extend({
        cssHooks: {
            opacity: {
                get: function(c, d) {
                    if (d) return c = fb(c, "opacity"), "" === c ? "1" : c
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(c, d, g, l) {
            if (c && 3 !== c.nodeType && 8 !== c.nodeType && c.style) {
                var m, n, t, p = h.camelCase(d),
                    r = c.style;
                return d = h.cssProps[p] || (h.cssProps[p] = Cb(p) || p), t = h.cssHooks[d] || h.cssHooks[p], void 0 === g ? t && "get" in t && void 0 !== (m = t.get(c, !1, l)) ? m : r[d] : (n = typeof g, "string" === n && (m = kc.exec(g)) && m[1] && (g = ea(c, d, m), n = "number"), null != g && g === g && ("number" === n && (g += m && m[3] || (h.cssNumber[p] ? "" : "px")), Ba.clearCloneStyle || "" !==
                    g || 0 !== d.indexOf("background") || (r[d] = "inherit"), t && "set" in t && void 0 === (g = t.set(c, g, l)) || (r[d] = g)), void 0)
            }
        },
        css: function(c, d, g, l) {
            var m, n, t, p = h.camelCase(d);
            return d = h.cssProps[p] || (h.cssProps[p] = Cb(p) || p), t = h.cssHooks[d] || h.cssHooks[p], t && "get" in t && (m = t.get(c, !0, g)), void 0 === m && (m = fb(c, d, l)), "normal" === m && d in Tb && (m = Tb[d]), "" === g || g ? (n = parseFloat(m), !0 === g || isFinite(n) ? n || 0 : m) : m
        }
    });
    h.each(["height", "width"], function(c, d) {
        h.cssHooks[d] = {
            get: function(c, l, m) {
                if (l) return !Cc.test(h.css(c, "display")) ||
                    c.getClientRects().length && c.getBoundingClientRect().width ? Fb(c, d, m) : rd(c, Dc, function() {
                        return Fb(c, d, m)
                    })
            },
            set: function(c, l, m) {
                var n, t = m && Hb(c);
                m = m && Eb(c, d, m, "border-box" === h.css(c, "boxSizing", !1, t), t);
                return m && (n = kc.exec(l)) && "px" !== (n[3] || "px") && (c.style[d] = l, l = h.css(c, d)), Db(c, l, m)
            }
        }
    });
    h.cssHooks.marginLeft = Bb(Ba.reliableMarginLeft, function(c, d) {
        if (d) return (parseFloat(fb(c, "marginLeft")) || c.getBoundingClientRect().left - rd(c, {
            marginLeft: 0
        }, function() {
            return c.getBoundingClientRect().left
        })) + "px"
    });
    h.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(c, d) {
        h.cssHooks[c + d] = {
            expand: function(g) {
                var h = 0,
                    m = {};
                for (g = "string" == typeof g ? g.split(" ") : [g]; 4 > h; h++) m[c + Rb[h] + d] = g[h] || g[h - 2] || g[0];
                return m
            }
        };
        Sb.test(c) || (h.cssHooks[c + d].set = Db)
    });
    h.fn.extend({
        css: function(c, d) {
            return M(this, function(c, d, k) {
                var n, t = {},
                    p = 0;
                if (h.isArray(d)) {
                    k = Hb(c);
                    for (n = d.length; p < n; p++) t[d[p]] = h.css(c, d[p], !1, k);
                    return t
                }
                return void 0 !== k ? h.style(c, d, k) : h.css(c, d)
            }, c, d, 1 < arguments.length)
        }
    });
    h.Tween = Aa;
    Aa.prototype = {
        constructor: Aa,
        init: function(c, d, g, l, m, n) {
            this.elem = c;
            this.prop = g;
            this.easing = m || h.easing._default;
            this.options = d;
            this.start = this.now = this.cur();
            this.end = l;
            this.unit = n || (h.cssNumber[g] ? "" : "px")
        },
        cur: function() {
            var c = Aa.propHooks[this.prop];
            return c && c.get ? c.get(this) : Aa.propHooks._default.get(this)
        },
        run: function(c) {
            var d, g = Aa.propHooks[this.prop];
            return this.options.duration ? this.pos = d = h.easing[this.easing](c, this.options.duration * c, 0, 1, this.options.duration) : this.pos = d = c, this.now = (this.end - this.start) * d + this.start,
                this.options.step && this.options.step.call(this.elem, this.now, this), g && g.set ? g.set(this) : Aa.propHooks._default.set(this), this
        }
    };
    Aa.prototype.init.prototype = Aa.prototype;
    Aa.propHooks = {
        _default: {
            get: function(c) {
                var d;
                return 1 !== c.elem.nodeType || null != c.elem[c.prop] && null == c.elem.style[c.prop] ? c.elem[c.prop] : (d = h.css(c.elem, c.prop, ""), d && "auto" !== d ? d : 0)
            },
            set: function(c) {
                h.fx.step[c.prop] ? h.fx.step[c.prop](c) : 1 !== c.elem.nodeType || null == c.elem.style[h.cssProps[c.prop]] && !h.cssHooks[c.prop] ? c.elem[c.prop] =
                    c.now : h.style(c.elem, c.prop, c.now + c.unit)
            }
        }
    };
    Aa.propHooks.scrollTop = Aa.propHooks.scrollLeft = {
        set: function(c) {
            c.elem.nodeType && c.elem.parentNode && (c.elem[c.prop] = c.now)
        }
    };
    h.easing = {
        linear: function(c) {
            return c
        },
        swing: function(c) {
            return .5 - Math.cos(c * Math.PI) / 2
        },
        _default: "swing"
    };
    h.fx = Aa.prototype.init;
    h.fx.step = {};
    var Ib, xa, Jb = /^(?:toggle|show|hide)$/,
        Ja = /queueHooks$/;
    h.Animation = h.extend(fa, {
        tweeners: {
            "*": [function(c, d) {
                var g = this.createTween(c, d);
                return ea(g.elem, c, kc.exec(d), g), g
            }]
        },
        tweener: function(c,
            d) {
            h.isFunction(c) ? (d = c, c = ["*"]) : c = c.match(ja);
            for (var g, l = 0, m = c.length; l < m; l++) g = c[l], fa.tweeners[g] = fa.tweeners[g] || [], fa.tweeners[g].unshift(d)
        },
        prefilters: [function(c, d, g) {
            var l, m, n, t, p, r, u, v, z = "width" in d || "height" in d,
                x = this,
                B = {},
                P = c.style,
                G = c.nodeType && Ac(c),
                K = Z.get(c, "fxshow");
            g.queue || (t = h._queueHooks(c, "fx"), null == t.unqueued && (t.unqueued = 0, p = t.empty.fire, t.empty.fire = function() {
                t.unqueued || p()
            }), t.unqueued++, x.always(function() {
                x.always(function() {
                    t.unqueued--;
                    h.queue(c, "fx").length || t.empty.fire()
                })
            }));
            for (l in d)
                if (m = d[l], Jb.test(m)) {
                    if (delete d[l], n = n || "toggle" === m, m === (G ? "hide" : "show")) {
                        if ("show" !== m || !K || void 0 === K[l]) continue;
                        G = !0
                    }
                    B[l] = K && K[l] || h.style(c, l)
                }
            if (r = !h.isEmptyObject(d), r || !h.isEmptyObject(B))
                for (l in z && 1 === c.nodeType && (g.overflow = [P.overflow, P.overflowX, P.overflowY], u = K && K.display, null == u && (u = Z.get(c, "display")), v = h.css(c, "display"), "none" === v && (u ? v = u : (tb([c], !0), u = c.style.display || u, v = h.css(c, "display"), tb([c]))), ("inline" === v || "inline-block" === v && null != u) && "none" === h.css(c,
                        "float") && (r || (x.done(function() {
                        P.display = u
                    }), null == u && (v = P.display, u = "none" === v ? "" : v)), P.display = "inline-block")), g.overflow && (P.overflow = "hidden", x.always(function() {
                        P.overflow = g.overflow[0];
                        P.overflowX = g.overflow[1];
                        P.overflowY = g.overflow[2]
                    })), r = !1, B) r || (K ? "hidden" in K && (G = K.hidden) : K = Z.access(c, "fxshow", {
                    display: u
                }), n && (K.hidden = !G), G && tb([c], !0), x.done(function() {
                    G || tb([c]);
                    Z.remove(c, "fxshow");
                    for (l in B) h.style(c, l, B[l])
                })), r = zc(G ? K[l] : 0, l, x), l in K || (K[l] = r.start, G && (r.end = r.start, r.start =
                    0))
        }],
        prefilter: function(c, d) {
            d ? fa.prefilters.unshift(c) : fa.prefilters.push(c)
        }
    });
    h.speed = function(c, d, g) {
        var l = c && "object" == typeof c ? h.extend({}, c) : {
            complete: g || !g && d || h.isFunction(c) && c,
            duration: c,
            easing: g && d || d && !h.isFunction(d) && d
        };
        return h.fx.off || G.hidden ? l.duration = 0 : l.duration = "number" == typeof l.duration ? l.duration : l.duration in h.fx.speeds ? h.fx.speeds[l.duration] : h.fx.speeds._default, null != l.queue && !0 !== l.queue || (l.queue = "fx"), l.old = l.complete, l.complete = function() {
            h.isFunction(l.old) && l.old.call(this);
            l.queue && h.dequeue(this, l.queue)
        }, l
    };
    h.fn.extend({
        fadeTo: function(c, d, g, h) {
            return this.filter(Ac).css("opacity", 0).show().end().animate({
                opacity: d
            }, c, g, h)
        },
        animate: function(c, d, g, l) {
            var m = h.isEmptyObject(c),
                n = h.speed(d, g, l);
            d = function() {
                var d = fa(this, h.extend({}, c), n);
                (m || Z.get(this, "finish")) && d.stop(!0)
            };
            return d.finish = d, m || !1 === n.queue ? this.each(d) : this.queue(n.queue, d)
        },
        stop: function(c, d, g) {
            var l = function(c) {
                var d = c.stop;
                delete c.stop;
                d(g)
            };
            return "string" != typeof c && (g = d, d = c, c = void 0), d && !1 !==
                c && this.queue(c || "fx", []), this.each(function() {
                    var d = !0,
                        k = null != c && c + "queueHooks",
                        t = h.timers,
                        p = Z.get(this);
                    if (k) p[k] && p[k].stop && l(p[k]);
                    else
                        for (k in p) p[k] && p[k].stop && Ja.test(k) && l(p[k]);
                    for (k = t.length; k--;) t[k].elem !== this || null != c && t[k].queue !== c || (t[k].anim.stop(g), d = !1, t.splice(k, 1));
                    !d && g || h.dequeue(this, c)
                })
        },
        finish: function(c) {
            return !1 !== c && (c = c || "fx"), this.each(function() {
                var d, g = Z.get(this),
                    l = g[c + "queue"];
                d = g[c + "queueHooks"];
                var m = h.timers,
                    n = l ? l.length : 0;
                g.finish = !0;
                h.queue(this, c, []);
                d && d.stop && d.stop.call(this, !0);
                for (d = m.length; d--;) m[d].elem === this && m[d].queue === c && (m[d].anim.stop(!0), m.splice(d, 1));
                for (d = 0; d < n; d++) l[d] && l[d].finish && l[d].finish.call(this);
                delete g.finish
            })
        }
    });
    h.each(["toggle", "show", "hide"], function(c, d) {
        var g = h.fn[d];
        h.fn[d] = function(c, h, n) {
            return null == c || "boolean" == typeof c ? g.apply(this, arguments) : this.animate(Zb(d, !0), c, h, n)
        }
    });
    h.each({
            slideDown: Zb("show"),
            slideUp: Zb("hide"),
            slideToggle: Zb("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        },
        function(c, d) {
            h.fn[c] = function(c, h, m) {
                return this.animate(d, c, h, m)
            }
        });
    h.timers = [];
    h.fx.tick = function() {
        var c, d = 0,
            g = h.timers;
        for (Ib = h.now(); d < g.length; d++) c = g[d], c() || g[d] !== c || g.splice(d--, 1);
        g.length || h.fx.stop();
        Ib = void 0
    };
    h.fx.timer = function(c) {
        h.timers.push(c);
        c() ? h.fx.start() : h.timers.pop()
    };
    h.fx.interval = 13;
    h.fx.start = function() {
        xa || (xa = d.requestAnimationFrame ? d.requestAnimationFrame(Ob) : d.setInterval(h.fx.tick, h.fx.interval))
    };
    h.fx.stop = function() {
        d.cancelAnimationFrame ? d.cancelAnimationFrame(xa) :
            d.clearInterval(xa);
        xa = null
    };
    h.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    h.fn.delay = function(c, k) {
        return c = h.fx ? h.fx.speeds[c] || c : c, k = k || "fx", this.queue(k, function(g, k) {
            var h = d.setTimeout(g, c);
            k.stop = function() {
                d.clearTimeout(h)
            }
        })
    };
    (function() {
        var c = G.createElement("input"),
            d = G.createElement("select").appendChild(G.createElement("option"));
        c.type = "checkbox";
        Ba.checkOn = "" !== c.value;
        Ba.optSelected = d.selected;
        c = G.createElement("input");
        c.value = "t";
        c.type = "radio";
        Ba.radioValue = "t" === c.value
    })();
    var pb,
        zb = h.expr.attrHandle;
    h.fn.extend({
        attr: function(c, d) {
            return M(this, h.attr, c, d, 1 < arguments.length)
        },
        removeAttr: function(c) {
            return this.each(function() {
                h.removeAttr(this, c)
            })
        }
    });
    h.extend({
        attr: function(c, d, g) {
            var l, m, n = c.nodeType;
            if (3 !== n && 8 !== n && 2 !== n) return "undefined" == typeof c.getAttribute ? h.prop(c, d, g) : (1 === n && h.isXMLDoc(c) || (m = h.attrHooks[d.toLowerCase()] || (h.expr.match.bool.test(d) ? pb : void 0)), void 0 !== g ? null === g ? void h.removeAttr(c, d) : m && "set" in m && void 0 !== (l = m.set(c, g, d)) ? l : (c.setAttribute(d,
                g + ""), g) : m && "get" in m && null !== (l = m.get(c, d)) ? l : (l = h.find.attr(c, d), null == l ? void 0 : l))
        },
        attrHooks: {
            type: {
                set: function(c, d) {
                    if (!Ba.radioValue && "radio" === d && h.nodeName(c, "input")) {
                        var g = c.value;
                        return c.setAttribute("type", d), g && (c.value = g), d
                    }
                }
            }
        },
        removeAttr: function(c, d) {
            var g = 0,
                h = d && d.match(ja);
            if (h && 1 === c.nodeType)
                for (; d = h[g++];) c.removeAttribute(d)
        }
    });
    pb = {
        set: function(c, d, g) {
            return !1 === d ? h.removeAttr(c, g) : c.setAttribute(g, g), g
        }
    };
    h.each(h.expr.match.bool.source.match(/\w+/g), function(c, d) {
        var g = zb[d] ||
            h.find.attr;
        zb[d] = function(c, d, k) {
            var h, p, r = d.toLowerCase();
            return k || (p = zb[r], zb[r] = h, h = null != g(c, d, k) ? r : null, zb[r] = p), h
        }
    });
    var Gc = /^(?:input|select|textarea|button)$/i,
        Xc = /^(?:a|area)$/i;
    h.fn.extend({
        prop: function(c, d) {
            return M(this, h.prop, c, d, 1 < arguments.length)
        },
        removeProp: function(c) {
            return this.each(function() {
                delete this[h.propFix[c] || c]
            })
        }
    });
    h.extend({
        prop: function(c, d, g) {
            var l, m, n = c.nodeType;
            if (3 !== n && 8 !== n && 2 !== n) return 1 === n && h.isXMLDoc(c) || (d = h.propFix[d] || d, m = h.propHooks[d]), void 0 !==
                g ? m && "set" in m && void 0 !== (l = m.set(c, g, d)) ? l : c[d] = g : m && "get" in m && null !== (l = m.get(c, d)) ? l : c[d]
        },
        propHooks: {
            tabIndex: {
                get: function(c) {
                    var d = h.find.attr(c, "tabindex");
                    return d ? parseInt(d, 10) : Gc.test(c.nodeName) || Xc.test(c.nodeName) && c.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    });
    Ba.optSelected || (h.propHooks.selected = {
        get: function(c) {
            c = c.parentNode;
            return c && c.parentNode && c.parentNode.selectedIndex, null
        },
        set: function(c) {
            c = c.parentNode;
            c && (c.selectedIndex, c.parentNode && c.parentNode.selectedIndex)
        }
    });
    h.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function() {
        h.propFix[this.toLowerCase()] = this
    });
    var Ub = /[\t\r\n\f]/g;
    h.fn.extend({
        addClass: function(c) {
            var d, g, l, m, n, p, r = 0;
            if (h.isFunction(c)) return this.each(function(d) {
                h(this).addClass(c.call(this, d, Ka(this)))
            });
            if ("string" == typeof c && c)
                for (d = c.match(ja) || []; g = this[r++];)
                    if (m = Ka(g), l = 1 === g.nodeType && (" " + m + " ").replace(Ub, " ")) {
                        for (p = 0; n = d[p++];) 0 > l.indexOf(" " + n + " ") && (l +=
                            n + " ");
                        l = h.trim(l);
                        m !== l && g.setAttribute("class", l)
                    }
            return this
        },
        removeClass: function(c) {
            var d, g, l, m, n, p, r = 0;
            if (h.isFunction(c)) return this.each(function(d) {
                h(this).removeClass(c.call(this, d, Ka(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof c && c)
                for (d = c.match(ja) || []; g = this[r++];)
                    if (m = Ka(g), l = 1 === g.nodeType && (" " + m + " ").replace(Ub, " ")) {
                        for (p = 0; n = d[p++];)
                            for (; - 1 < l.indexOf(" " + n + " ");) l = l.replace(" " + n + " ", " ");
                        l = h.trim(l);
                        m !== l && g.setAttribute("class", l)
                    }
            return this
        },
        toggleClass: function(c, d) {
            var g = typeof c;
            return "boolean" == typeof d && "string" === g ? d ? this.addClass(c) : this.removeClass(c) : h.isFunction(c) ? this.each(function(g) {
                h(this).toggleClass(c.call(this, g, Ka(this), d), d)
            }) : this.each(function() {
                var d, k, n, p;
                if ("string" === g)
                    for (k = 0, n = h(this), p = c.match(ja) || []; d = p[k++];) n.hasClass(d) ? n.removeClass(d) : n.addClass(d);
                else void 0 !== c && "boolean" !== g || (d = Ka(this), d && Z.set(this, "__className__", d), this.setAttribute && this.setAttribute("class", d || !1 === c ? "" : Z.get(this, "__className__") ||
                    ""))
            })
        },
        hasClass: function(c) {
            var d, g = 0;
            for (c = " " + c + " "; d = this[g++];)
                if (1 === d.nodeType && -1 < (" " + Ka(d) + " ").replace(Ub, " ").indexOf(c)) return !0;
            return !1
        }
    });
    var Yc = /\r/g,
        Hc = /[\x20\t\r\n\f]+/g;
    h.fn.extend({
        val: function(c) {
            var d, g, l, m = this[0];
            if (arguments.length) return l = h.isFunction(c), this.each(function(g) {
                var m;
                1 === this.nodeType && (m = l ? c.call(this, g, h(this).val()) : c, null == m ? m = "" : "number" == typeof m ? m += "" : h.isArray(m) && (m = h.map(m, function(c) {
                        return null == c ? "" : c + ""
                    })), d = h.valHooks[this.type] || h.valHooks[this.nodeName.toLowerCase()],
                    d && "set" in d && void 0 !== d.set(this, m, "value") || (this.value = m))
            });
            if (m) return d = h.valHooks[m.type] || h.valHooks[m.nodeName.toLowerCase()], d && "get" in d && void 0 !== (g = d.get(m, "value")) ? g : (g = m.value, "string" == typeof g ? g.replace(Yc, "") : null == g ? "" : g)
        }
    });
    h.extend({
        valHooks: {
            option: {
                get: function(c) {
                    var d = h.find.attr(c, "value");
                    return null != d ? d : h.trim(h.text(c)).replace(Hc, " ")
                }
            },
            select: {
                get: function(c) {
                    for (var d, g = c.options, l = c.selectedIndex, m = "select-one" === c.type, n = m ? null : [], p = m ? l + 1 : g.length, r = 0 > l ? p : m ? l : 0; r <
                        p; r++)
                        if (d = g[r], !(!d.selected && r !== l || d.disabled || d.parentNode.disabled && h.nodeName(d.parentNode, "optgroup"))) {
                            if (c = h(d).val(), m) return c;
                            n.push(c)
                        }
                    return n
                },
                set: function(c, d) {
                    for (var g, l = c.options, m = h.makeArray(d), n = l.length; n--;) d = l[n], (d.selected = -1 < h.inArray(h.valHooks.option.get(d), m)) && (g = !0);
                    return g || (c.selectedIndex = -1), m
                }
            }
        }
    });
    h.each(["radio", "checkbox"], function() {
        h.valHooks[this] = {
            set: function(c, d) {
                if (h.isArray(d)) return c.checked = -1 < h.inArray(h(c).val(), d)
            }
        };
        Ba.checkOn || (h.valHooks[this].get =
            function(c) {
                return null === c.getAttribute("value") ? "on" : c.value
            })
    });
    var pc = /^(?:focusinfocus|focusoutblur)$/;
    h.extend(h.event, {
        trigger: function(c, k, g, l) {
            var m, n, p, r, u, v, z, x = [g || G],
                B = Uc.call(c, "type") ? c.type : c;
            m = Uc.call(c, "namespace") ? c.namespace.split(".") : [];
            if (n = p = g = g || G, 3 !== g.nodeType && 8 !== g.nodeType && !pc.test(B + h.event.triggered) && (-1 < B.indexOf(".") && (m = B.split("."), B = m.shift(), m.sort()), u = 0 > B.indexOf(":") && "on" + B, c = c[h.expando] ? c : new h.Event(B, "object" == typeof c && c), c.isTrigger = l ? 2 : 3, c.namespace =
                    m.join("."), c.rnamespace = c.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c.result = void 0, c.target || (c.target = g), k = null == k ? [c] : h.makeArray(k, [c]), z = h.event.special[B] || {}, l || !z.trigger || !1 !== z.trigger.apply(g, k))) {
                if (!l && !z.noBubble && !h.isWindow(g)) {
                    r = z.delegateType || B;
                    for (pc.test(r + B) || (n = n.parentNode); n; n = n.parentNode) x.push(n), p = n;
                    p === (g.ownerDocument || G) && x.push(p.defaultView || p.parentWindow || d)
                }
                for (m = 0;
                    (n = x[m++]) && !c.isPropagationStopped();) c.type = 1 < m ? r : z.bindType || B, (v = (Z.get(n, "events") || {})[c.type] && Z.get(n, "handle")) && v.apply(n, k), (v = u && n[u]) && v.apply && ba(n) && (c.result = v.apply(n, k), !1 === c.result && c.preventDefault());
                return c.type = B, l || c.isDefaultPrevented() || z._default && !1 !== z._default.apply(x.pop(), k) || !ba(g) || u && h.isFunction(g[B]) && !h.isWindow(g) && (p = g[u], p && (g[u] = null), h.event.triggered = B, g[B](), h.event.triggered = void 0, p && (g[u] = p)), c.result
            }
        },
        simulate: function(c, d, g) {
            c = h.extend(new h.Event, g, {
                type: c,
                isSimulated: !0
            });
            h.event.trigger(c, null, d)
        }
    });
    h.fn.extend({
        trigger: function(c,
            d) {
            return this.each(function() {
                h.event.trigger(c, d, this)
            })
        },
        triggerHandler: function(c, d) {
            var g = this[0];
            if (g) return h.event.trigger(c, d, g, !0)
        }
    });
    h.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(c, d) {
        h.fn[d] = function(c, h) {
            return 0 < arguments.length ? this.on(d, null, c, h) : this.trigger(d)
        }
    });
    h.fn.extend({
        hover: function(c, d) {
            return this.mouseenter(c).mouseleave(d ||
                c)
        }
    });
    Ba.focusin = "onfocusin" in d;
    Ba.focusin || h.each({
        focus: "focusin",
        blur: "focusout"
    }, function(c, d) {
        var g = function(c) {
            h.event.simulate(d, c.target, h.event.fix(c))
        };
        h.event.special[d] = {
            setup: function() {
                var h = this.ownerDocument || this,
                    m = Z.access(h, d);
                m || h.addEventListener(c, g, !0);
                Z.access(h, d, (m || 0) + 1)
            },
            teardown: function() {
                var h = this.ownerDocument || this,
                    m = Z.access(h, d) - 1;
                m ? Z.access(h, d, m) : (h.removeEventListener(c, g, !0), Z.remove(h, d))
            }
        }
    });
    var Kb = d.location,
        Ic = h.now(),
        vb = /\?/;
    h.parseXML = function(c) {
        var k;
        if (!c || "string" != typeof c) return null;
        try {
            k = (new d.DOMParser).parseFromString(c, "text/xml")
        } catch (g) {
            k = void 0
        }
        return k && !k.getElementsByTagName("parsererror").length || h.error("Invalid XML: " + c), k
    };
    var qc = /\[\]$/,
        Vb = /\r?\n/g,
        rc = /^(?:submit|button|image|reset|file)$/i,
        sc = /^(?:input|select|textarea|keygen)/i;
    h.param = function(c, d) {
        var g, l = [],
            m = function(c, d) {
                d = h.isFunction(d) ? d() : d;
                l[l.length] = encodeURIComponent(c) + "=" + encodeURIComponent(null == d ? "" : d)
            };
        if (h.isArray(c) || c.jquery && !h.isPlainObject(c)) h.each(c,
            function() {
                m(this.name, this.value)
            });
        else
            for (g in c) $b(g, c[g], d, m);
        return l.join("&")
    };
    h.fn.extend({
        serialize: function() {
            return h.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var c = h.prop(this, "elements");
                return c ? h.makeArray(c) : this
            }).filter(function() {
                var c = this.type;
                return this.name && !h(this).is(":disabled") && sc.test(this.nodeName) && !rc.test(c) && (this.checked || !cc.test(c))
            }).map(function(c, d) {
                c = h(this).val();
                return null == c ? null : h.isArray(c) ? h.map(c, function(c) {
                    return {
                        name: d.name,
                        value: c.replace(Vb, "\r\n")
                    }
                }) : {
                    name: d.name,
                    value: c.replace(Vb, "\r\n")
                }
            }).get()
        }
    });
    var tc = /%20/g,
        ud = /#.*$/,
        wb = /([?&])_=[^&]*/,
        Od = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        vd = /^(?:GET|HEAD)$/,
        Jc = /^\/\//,
        Zc = {},
        uc = {},
        Sa = "*/".concat("*"),
        vc = G.createElement("a");
    vc.href = Kb.href;
    h.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Kb.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Kb.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Sa,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": h.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(c, d) {
            return d ? P(P(c, h.ajaxSettings), d) : P(h.ajaxSettings, c)
        },
        ajaxPrefilter: na(Zc),
        ajaxTransport: na(uc),
        ajax: function(c,
            k) {
            function g(c, g, k, p) {
                var t, z, B, G, Q = g;
                if (!u) {
                    u = !0;
                    r && d.clearTimeout(r);
                    l = void 0;
                    n = p || "";
                    U.readyState = 0 < c ? 4 : 0;
                    p = 200 <= c && 300 > c || 304 === c;
                    if (k) {
                        B = x;
                        for (var W = U, ea, ca, aa, da, fa = B.contents, sa = B.dataTypes;
                            "*" === sa[0];) sa.shift(), void 0 === ea && (ea = B.mimeType || W.getResponseHeader("Content-Type"));
                        if (ea)
                            for (ca in fa)
                                if (fa[ca] && fa[ca].test(ea)) {
                                    sa.unshift(ca);
                                    break
                                }
                        if (sa[0] in k) aa = sa[0];
                        else {
                            for (ca in k) {
                                if (!sa[0] || B.converters[ca + " " + sa[0]]) {
                                    aa = ca;
                                    break
                                }
                                da || (da = ca)
                            }
                            aa = aa || da
                        }
                        k = aa ? (aa !== sa[0] && sa.unshift(aa),
                            k[aa]) : void 0;
                        B = k
                    }
                    var ba;
                    a: {
                        k = x;
                        ea = B;
                        ca = U;
                        aa = p;
                        var Z, ma, ka;
                        B = {};
                        W = k.dataTypes.slice();
                        if (W[1])
                            for (Z in k.converters) B[Z.toLowerCase()] = k.converters[Z];
                        for (da = W.shift(); da;)
                            if (k.responseFields[da] && (ca[k.responseFields[da]] = ea), !ka && aa && k.dataFilter && (ea = k.dataFilter(ea, k.dataType)), ka = da, da = W.shift())
                                if ("*" === da) da = ka;
                                else if ("*" !== ka && ka !== da) {
                            if (Z = B[ka + " " + da] || B["* " + da], !Z)
                                for (ba in B)
                                    if (ma = ba.split(" "), ma[1] === da && (Z = B[ka + " " + ma[0]] || B["* " + ma[0]])) {
                                        !0 === Z ? Z = B[ba] : !0 !== B[ba] && (da = ma[0], W.unshift(ma[1]));
                                        break
                                    }
                            if (!0 !== Z)
                                if (Z && k["throws"]) ea = Z(ea);
                                else try {
                                    ea = Z(ea)
                                } catch (Ea) {
                                    ba = {
                                        state: "parsererror",
                                        error: Z ? Ea : "No conversion from " + ka + " to " + da
                                    };
                                    break a
                                }
                        }
                        ba = {
                            state: "success",
                            data: ea
                        }
                    }
                    B = ba;
                    p ? (x.ifModified && (G = U.getResponseHeader("Last-Modified"), G && (h.lastModified[m] = G), G = U.getResponseHeader("etag"), G && (h.etag[m] = G)), 204 === c || "HEAD" === x.type ? Q = "nocontent" : 304 === c ? Q = "notmodified" : (Q = B.state, t = B.data, z = B.error, p = !z)) : (z = Q, !c && Q || (Q = "error", 0 > c && (c = 0)));
                    U.status = c;
                    U.statusText = (g || Q) + "";
                    p ? J.resolveWith(P, [t, Q, U]) : J.rejectWith(P, [U, Q, z]);
                    U.statusCode(R);
                    R = void 0;
                    v && K.trigger(p ? "ajaxSuccess" : "ajaxError", [U, x, p ? t : z]);
                    M.fireWith(P, [U, Q]);
                    v && (K.trigger("ajaxComplete", [U, x]), --h.active || h.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof c && (k = c, c = void 0);
            k = k || {};
            var l, m, n, p, r, u, v, z, B, x = h.ajaxSetup({}, k),
                P = x.context || x,
                K = x.context && (P.nodeType || P.jquery) ? h(P) : h.event,
                J = h.Deferred(),
                M = h.Callbacks("once memory"),
                R = x.statusCode || {},
                Q = {},
                W = {},
                ea = "canceled",
                U = {
                    readyState: 0,
                    getResponseHeader: function(c) {
                        var d;
                        if (u) {
                            if (!p)
                                for (p = {}; d = Od.exec(n);) p[d[1].toLowerCase()] = d[2];
                            d = p[c.toLowerCase()]
                        }
                        return null == d ? null : d
                    },
                    getAllResponseHeaders: function() {
                        return u ? n : null
                    },
                    setRequestHeader: function(c, d) {
                        return null == u && (c = W[c.toLowerCase()] = W[c.toLowerCase()] || c, Q[c] = d), this
                    },
                    overrideMimeType: function(c) {
                        return null == u && (x.mimeType = c), this
                    },
                    statusCode: function(c) {
                        var d;
                        if (c)
                            if (u) U.always(c[U.status]);
                            else
                                for (d in c) R[d] = [R[d], c[d]];
                        return this
                    },
                    abort: function(c) {
                        c = c || ea;
                        return l && l.abort(c), g(0, c), this
                    }
                };
            if (J.promise(U), x.url = ((c ||
                    x.url || Kb.href) + "").replace(Jc, Kb.protocol + "//"), x.type = k.method || k.type || x.method || x.type, x.dataTypes = (x.dataType || "*").toLowerCase().match(ja) || [""], null == x.crossDomain) {
                c = G.createElement("a");
                try {
                    c.href = x.url, c.href = c.href, x.crossDomain = vc.protocol + "//" + vc.host != c.protocol + "//" + c.host
                } catch (ga) {
                    x.crossDomain = !0
                }
            }
            if (x.data && x.processData && "string" != typeof x.data && (x.data = h.param(x.data, x.traditional)), ac(Zc, x, k, U), u) return U;
            (v = h.event && x.global) && 0 === h.active++ && h.event.trigger("ajaxStart");
            x.type =
                x.type.toUpperCase();
            x.hasContent = !vd.test(x.type);
            m = x.url.replace(ud, "");
            x.hasContent ? x.data && x.processData && 0 === (x.contentType || "").indexOf("application/x-www-form-urlencoded") && (x.data = x.data.replace(tc, "+")) : (B = x.url.slice(m.length), x.data && (m += (vb.test(m) ? "&" : "?") + x.data, delete x.data), !1 === x.cache && (m = m.replace(wb, ""), B = (vb.test(m) ? "&" : "?") + "_=" + Ic++ + B), x.url = m + B);
            x.ifModified && (h.lastModified[m] && U.setRequestHeader("If-Modified-Since", h.lastModified[m]), h.etag[m] && U.setRequestHeader("If-None-Match",
                h.etag[m]));
            (x.data && x.hasContent && !1 !== x.contentType || k.contentType) && U.setRequestHeader("Content-Type", x.contentType);
            U.setRequestHeader("Accept", x.dataTypes[0] && x.accepts[x.dataTypes[0]] ? x.accepts[x.dataTypes[0]] + ("*" !== x.dataTypes[0] ? ", " + Sa + "; q=0.01" : "") : x.accepts["*"]);
            for (z in x.headers) U.setRequestHeader(z, x.headers[z]);
            if (x.beforeSend && (!1 === x.beforeSend.call(P, U, x) || u)) return U.abort();
            if (ea = "abort", M.add(x.complete), U.done(x.success), U.fail(x.error), l = ac(uc, x, k, U)) {
                if (U.readyState = 1, v &&
                    K.trigger("ajaxSend", [U, x]), u) return U;
                x.async && 0 < x.timeout && (r = d.setTimeout(function() {
                    U.abort("timeout")
                }, x.timeout));
                try {
                    u = !1, l.send(Q, g)
                } catch (ga) {
                    if (u) throw ga;
                    g(-1, ga)
                }
            } else g(-1, "No Transport");
            return U
        },
        getJSON: function(c, d, g) {
            return h.get(c, d, g, "json")
        },
        getScript: function(c, d) {
            return h.get(c, void 0, d, "script")
        }
    });
    h.each(["get", "post"], function(c, d) {
        h[d] = function(c, l, m, n) {
            return h.isFunction(l) && (n = n || m, m = l, l = void 0), h.ajax(h.extend({
                    url: c,
                    type: d,
                    dataType: n,
                    data: l,
                    success: m
                }, h.isPlainObject(c) &&
                c))
        }
    });
    h._evalUrl = function(c) {
        return h.ajax({
            url: c,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    };
    h.fn.extend({
        wrapAll: function(c) {
            var d;
            return this[0] && (h.isFunction(c) && (c = c.call(this[0])), d = h(c, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && d.insertBefore(this[0]), d.map(function() {
                for (var c = this; c.firstElementChild;) c = c.firstElementChild;
                return c
            }).append(this)), this
        },
        wrapInner: function(c) {
            return h.isFunction(c) ? this.each(function(d) {
                h(this).wrapInner(c.call(this,
                    d))
            }) : this.each(function() {
                var d = h(this),
                    g = d.contents();
                g.length ? g.wrapAll(c) : d.append(c)
            })
        },
        wrap: function(c) {
            var d = h.isFunction(c);
            return this.each(function(g) {
                h(this).wrapAll(d ? c.call(this, g) : c)
            })
        },
        unwrap: function(c) {
            return this.parent(c).not("body").each(function() {
                h(this).replaceWith(this.childNodes)
            }), this
        }
    });
    h.expr.pseudos.hidden = function(c) {
        return !h.expr.pseudos.visible(c)
    };
    h.expr.pseudos.visible = function(c) {
        return !!(c.offsetWidth || c.offsetHeight || c.getClientRects().length)
    };
    h.ajaxSettings.xhr =
        function() {
            try {
                return new d.XMLHttpRequest
            } catch (c) {}
        };
    var ec = {
            0: 200,
            1223: 204
        },
        Wb = h.ajaxSettings.xhr();
    Ba.cors = !!Wb && "withCredentials" in Wb;
    Ba.ajax = Wb = !!Wb;
    h.ajaxTransport(function(c) {
        var h, g;
        if (Ba.cors || Wb && !c.crossDomain) return {
            send: function(l, m) {
                var n, p = c.xhr();
                if (p.open(c.type, c.url, c.async, c.username, c.password), c.xhrFields)
                    for (n in c.xhrFields) p[n] = c.xhrFields[n];
                c.mimeType && p.overrideMimeType && p.overrideMimeType(c.mimeType);
                c.crossDomain || l["X-Requested-With"] || (l["X-Requested-With"] = "XMLHttpRequest");
                for (n in l) p.setRequestHeader(n, l[n]);
                h = function(c) {
                    return function() {
                        h && (h = g = p.onload = p.onerror = p.onabort = p.onreadystatechange = null, "abort" === c ? p.abort() : "error" === c ? "number" != typeof p.status ? m(0, "error") : m(p.status, p.statusText) : m(ec[p.status] || p.status, p.statusText, "text" !== (p.responseType || "text") || "string" != typeof p.responseText ? {
                            binary: p.response
                        } : {
                            text: p.responseText
                        }, p.getAllResponseHeaders()))
                    }
                };
                p.onload = h();
                g = p.onerror = h("error");
                void 0 !== p.onabort ? p.onabort = g : p.onreadystatechange = function() {
                    4 ===
                        p.readyState && d.setTimeout(function() {
                            h && g()
                        })
                };
                h = h("abort");
                try {
                    p.send(c.hasContent && c.data || null)
                } catch (r) {
                    if (h) throw r;
                }
            },
            abort: function() {
                h && h()
            }
        }
    });
    h.ajaxPrefilter(function(c) {
        c.crossDomain && (c.contents.script = !1)
    });
    h.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(c) {
                return h.globalEval(c), c
            }
        }
    });
    h.ajaxPrefilter("script", function(c) {
        void 0 === c.cache &&
            (c.cache = !1);
        c.crossDomain && (c.type = "GET")
    });
    h.ajaxTransport("script", function(c) {
        if (c.crossDomain) {
            var d, g;
            return {
                send: function(l, m) {
                    d = h("<script>").prop({
                        charset: c.scriptCharset,
                        src: c.url
                    }).on("load error", g = function(c) {
                        d.remove();
                        g = null;
                        c && m("error" === c.type ? 404 : 200, c.type)
                    });
                    G.head.appendChild(d[0])
                },
                abort: function() {
                    g && g()
                }
            }
        }
    });
    var Kc = [],
        wc = /(=)\?(?=&|$)|\?\?/;
    h.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var c = Kc.pop() || h.expando + "_" + Ic++;
            return this[c] = !0, c
        }
    });
    h.ajaxPrefilter("json jsonp",
        function(c, k, g) {
            var l, m, n, p = !1 !== c.jsonp && (wc.test(c.url) ? "url" : "string" == typeof c.data && 0 === (c.contentType || "").indexOf("application/x-www-form-urlencoded") && wc.test(c.data) && "data");
            if (p || "jsonp" === c.dataTypes[0]) return l = c.jsonpCallback = h.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, p ? c[p] = c[p].replace(wc, "$1" + l) : !1 !== c.jsonp && (c.url += (vb.test(c.url) ? "&" : "?") + c.jsonp + "=" + l), c.converters["script json"] = function() {
                    return n || h.error(l + " was not called"), n[0]
                }, c.dataTypes[0] = "json",
                m = d[l], d[l] = function() {
                    n = arguments
                }, g.always(function() {
                    void 0 === m ? h(d).removeProp(l) : d[l] = m;
                    c[l] && (c.jsonpCallback = k.jsonpCallback, Kc.push(l));
                    n && h.isFunction(m) && m(n[0]);
                    n = m = void 0
                }), "script"
        });
    Ba.createHTMLDocument = function() {
        var c = G.implementation.createHTMLDocument("").body;
        return c.innerHTML = "<form></form><form></form>", 2 === c.childNodes.length
    }();
    h.parseHTML = function(c, d, g) {
        if ("string" != typeof c) return [];
        "boolean" == typeof d && (g = d, d = !1);
        var l, m, n;
        return d || (Ba.createHTMLDocument ? (d = G.implementation.createHTMLDocument(""),
            l = d.createElement("base"), l.href = G.location.href, d.head.appendChild(l)) : d = G), m = pd.exec(c), n = !g && [], m ? [d.createElement(m[1])] : (m = xc([c], d, n), n && n.length && h(n).remove(), h.merge([], m.childNodes))
    };
    h.fn.load = function(c, d, g) {
        var l, m, n, p = this,
            r = c.indexOf(" ");
        return -1 < r && (l = h.trim(c.slice(r)), c = c.slice(0, r)), h.isFunction(d) ? (g = d, d = void 0) : d && "object" == typeof d && (m = "POST"), 0 < p.length && h.ajax({
            url: c,
            type: m || "GET",
            dataType: "html",
            data: d
        }).done(function(c) {
            n = arguments;
            p.html(l ? h("<div>").append(h.parseHTML(c)).find(l) :
                c)
        }).always(g && function(c, d) {
            p.each(function() {
                g.apply(this, n || [c.responseText, d, c])
            })
        }), this
    };
    h.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(c, d) {
        h.fn[d] = function(c) {
            return this.on(d, c)
        }
    });
    h.expr.pseudos.animated = function(c) {
        return h.grep(h.timers, function(d) {
            return c === d.elem
        }).length
    };
    h.offset = {
        setOffset: function(c, d, g) {
            var l, m, n, p, r, u, v = h.css(c, "position"),
                x = h(c),
                B = {};
            "static" === v && (c.style.position = "relative");
            r = x.offset();
            n = h.css(c, "top");
            u = h.css(c,
                "left");
            ("absolute" === v || "fixed" === v) && -1 < (n + u).indexOf("auto") ? (l = x.position(), p = l.top, m = l.left) : (p = parseFloat(n) || 0, m = parseFloat(u) || 0);
            h.isFunction(d) && (d = d.call(c, g, h.extend({}, r)));
            null != d.top && (B.top = d.top - r.top + p);
            null != d.left && (B.left = d.left - r.left + m);
            "using" in d ? d.using.call(c, B) : x.css(B)
        }
    };
    h.fn.extend({
        offset: function(c) {
            if (arguments.length) return void 0 === c ? this : this.each(function(d) {
                h.offset.setOffset(this, c, d)
            });
            var d, g, l, m, n = this[0];
            if (n) return n.getClientRects().length ? (l = n.getBoundingClientRect(),
                l.width || l.height ? (m = n.ownerDocument, g = K(m), d = m.documentElement, {
                    top: l.top + g.pageYOffset - d.clientTop,
                    left: l.left + g.pageXOffset - d.clientLeft
                }) : l) : {
                top: 0,
                left: 0
            }
        },
        position: function() {
            if (this[0]) {
                var c, d, g = this[0],
                    l = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === h.css(g, "position") ? d = g.getBoundingClientRect() : (c = this.offsetParent(), d = this.offset(), h.nodeName(c[0], "html") || (l = c.offset()), l = {
                    top: l.top + h.css(c[0], "borderTopWidth", !0),
                    left: l.left + h.css(c[0], "borderLeftWidth", !0)
                }), {
                    top: d.top - l.top - h.css(g, "marginTop", !0),
                    left: d.left - l.left - h.css(g, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var c = this.offsetParent; c && "static" === h.css(c, "position");) c = c.offsetParent;
                return c || cb
            })
        }
    });
    h.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(c, d) {
        var g = "pageYOffset" === d;
        h.fn[c] = function(h) {
            return M(this, function(c, h, l) {
                var p = K(c);
                return void 0 === l ? p ? p[d] : c[h] : void(p ? p.scrollTo(g ? p.pageXOffset : l, g ? l : p.pageYOffset) : c[h] = l)
            }, c, h, arguments.length)
        }
    });
    h.each(["top", "left"], function(c,
        d) {
        h.cssHooks[d] = Bb(Ba.pixelPosition, function(c, l) {
            if (l) return l = fb(c, d), Bc.test(l) ? h(c).position()[d] + "px" : l
        })
    });
    h.each({
        Height: "height",
        Width: "width"
    }, function(c, d) {
        h.each({
            padding: "inner" + c,
            content: d,
            "": "outer" + c
        }, function(g, l) {
            h.fn[l] = function(m, n) {
                var p = arguments.length && (g || "boolean" != typeof m),
                    r = g || (!0 === m || !0 === n ? "margin" : "border");
                return M(this, function(d, g, k) {
                    var m;
                    return h.isWindow(d) ? 0 === l.indexOf("outer") ? d["inner" + c] : d.document.documentElement["client" + c] : 9 === d.nodeType ? (m = d.documentElement,
                        Math.max(d.body["scroll" + c], m["scroll" + c], d.body["offset" + c], m["offset" + c], m["client" + c])) : void 0 === k ? h.css(d, g, r) : h.style(d, g, k, r)
                }, d, p ? m : void 0, p)
            }
        })
    });
    h.fn.extend({
        bind: function(c, d, g) {
            return this.on(c, null, d, g)
        },
        unbind: function(c, d) {
            return this.off(c, null, d)
        },
        delegate: function(c, d, g, h) {
            return this.on(d, c, g, h)
        },
        undelegate: function(c, d, g) {
            return 1 === arguments.length ? this.off(c, "**") : this.off(d, c || "**", g)
        }
    });
    h.parseJSON = JSON.parse;
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return h
    });
    var $c = d.jQuery,
        ad = d.$;
    return h.noConflict = function(c) {
        return d.$ === h && (d.$ = ad), c && d.jQuery === h && (d.jQuery = $c), h
    }, p || (d.jQuery = d.$ = h), h
});
THREE.DDSLoader = function() {
    this._parser = THREE.DDSLoader.parse
};
THREE.DDSLoader.prototype = Object.create(THREE.CompressedTextureLoader.prototype);
THREE.DDSLoader.prototype.constructor = THREE.DDSLoader;
THREE.DDSLoader.parse = function(d, p) {
    function v(d) {
        return d.charCodeAt(0) + (d.charCodeAt(1) << 8) + (d.charCodeAt(2) << 16) + (d.charCodeAt(3) << 24)
    }

    function u(d, p, r, u) {
        var v = r * u * 4;
        d = new Uint8Array(d, p, v);
        for (var v = new Uint8Array(v), x = p = 0, z = 0; z < u; z++)
            for (var R = 0; R < r; R++) {
                var Q = d[x];
                x++;
                var ea = d[x];
                x++;
                var da = d[x];
                x++;
                var aa = d[x];
                x++;
                v[p] = da;
                p++;
                v[p] = ea;
                p++;
                v[p] = Q;
                p++;
                v[p] = aa;
                p++
            }
        return v
    }
    var z = {
            mipmaps: [],
            width: 0,
            height: 0,
            format: null,
            mipmapCount: 1
        },
        x = v("DXT1"),
        r = v("DXT3"),
        Q = v("DXT5"),
        R = v("ETC1"),
        da = new Int32Array(d,
            0, 31);
    if (542327876 !== da[0]) return console.error("THREE.DDSLoader.parse: Invalid magic number in DDS header."), z;
    if (!da[20] & 4) return console.error("THREE.DDSLoader.parse: Unsupported format, must contain a FourCC code."), z;
    var aa = da[21],
        ma = !1;
    switch (aa) {
        case x:
            x = 8;
            z.format = THREE.RGB_S3TC_DXT1_Format;
            break;
        case r:
            x = 16;
            z.format = THREE.RGBA_S3TC_DXT3_Format;
            break;
        case Q:
            x = 16;
            z.format = THREE.RGBA_S3TC_DXT5_Format;
            break;
        case R:
            x = 8;
            z.format = THREE.RGB_ETC1_Format;
            break;
        default:
            if (32 === da[22] && da[23] & 16711680 &&
                da[24] & 65280 && da[25] & 255 && da[26] & 4278190080) ma = !0, x = 64, z.format = THREE.RGBAFormat;
            else return console.error("THREE.DDSLoader.parse: Unsupported FourCC code ", String.fromCharCode(aa & 255, aa >> 8 & 255, aa >> 16 & 255, aa >> 24 & 255)), z
    }
    z.mipmapCount = 1;
    da[2] & 131072 && !1 !== p && (z.mipmapCount = Math.max(1, da[7]));
    p = da[28];
    z.isCubemap = p & 512 ? !0 : !1;
    if (z.isCubemap && !(p & 1024 && p & 2048 && p & 4096 && p & 8192 && p & 16384 && p & 32768)) return console.error("THREE.DDSLoader.parse: Incomplete cubemap faces"), z;
    z.width = da[4];
    z.height = da[3];
    da = da[1] +
        4;
    p = z.isCubemap ? 6 : 1;
    for (r = 0; r < p; r++)
        for (Q = z.width, R = z.height, aa = 0; aa < z.mipmapCount; aa++) {
            if (ma) var ka = u(d, da, Q, R),
                ea = ka.length;
            else ea = Math.max(4, Q) / 4 * Math.max(4, R) / 4 * x, ka = new Uint8Array(d, da, ea);
            z.mipmaps.push({
                data: ka,
                width: Q,
                height: R
            });
            da += ea;
            Q = Math.max(Q >> 1, 1);
            R = Math.max(R >> 1, 1)
        }
    return z
};
THREE.MTLLoader = function(d) {
    this.manager = void 0 !== d ? d : THREE.DefaultLoadingManager
};
Object.assign(THREE.MTLLoader.prototype, THREE.EventDispatcher.prototype, {
    load: function(d, p, v, u) {
        var z = this,
            x = new THREE.XHRLoader(this.manager);
        x.setPath(this.path);
        x.load(d, function(d) {
            p(z.parse(d))
        }, v, u)
    },
    setPath: function(d) {
        this.path = d
    },
    setTexturePath: function(d) {
        this.texturePath = d
    },
    setBaseUrl: function(d) {
        console.warn("THREE.MTLLoader: .setBaseUrl() is deprecated. Use .setTexturePath( path ) for texture path or .setPath( path ) for general base path instead.");
        this.setTexturePath(d)
    },
    setCrossOrigin: function(d) {
        this.crossOrigin =
            d
    },
    setMaterialOptions: function(d) {
        this.materialOptions = d
    },
    parse: function(d) {
        var p = d.split("\n"),
            v = {},
            u = /\s+/;
        d = {};
        for (var z = 0; z < p.length; z++) {
            var x = p[z],
                x = x.trim();
            if (0 !== x.length && "#" !== x.charAt(0)) {
                var r = x.indexOf(" "),
                    Q = 0 <= r ? x.substring(0, r) : x,
                    Q = Q.toLowerCase(),
                    x = 0 <= r ? x.substring(r + 1) : "",
                    x = x.trim();
                "newmtl" === Q ? (v = {
                    name: x
                }, d[x] = v) : v && ("ka" === Q || "kd" === Q || "ks" === Q ? (x = x.split(u, 3), v[Q] = [parseFloat(x[0]), parseFloat(x[1]), parseFloat(x[2])]) : v[Q] = x)
            }
        }
        p = new THREE.MTLLoader.MaterialCreator(this.texturePath ||
            this.path, this.materialOptions);
        p.setCrossOrigin(this.crossOrigin);
        p.setManager(this.manager);
        p.setMaterials(d);
        return p
    }
});
THREE.MTLLoader.MaterialCreator = function(d, p) {
    this.baseUrl = d || "";
    this.options = p;
    this.materialsInfo = {};
    this.materials = {};
    this.materialsArray = [];
    this.nameLookup = {};
    this.side = this.options && this.options.side ? this.options.side : THREE.FrontSide;
    this.wrap = this.options && this.options.wrap ? this.options.wrap : THREE.RepeatWrapping
};
THREE.MTLLoader.MaterialCreator.prototype = {
    constructor: THREE.MTLLoader.MaterialCreator,
    setCrossOrigin: function(d) {
        this.crossOrigin = d
    },
    setManager: function(d) {
        this.manager = d
    },
    setMaterials: function(d) {
        this.materialsInfo = this.convert(d);
        this.materials = {};
        this.materialsArray = [];
        this.nameLookup = {}
    },
    convert: function(d) {
        if (!this.options) return d;
        var p = {},
            v;
        for (v in d) {
            var u = d[v],
                z = {};
            p[v] = z;
            for (var x in u) {
                var r = !0,
                    Q = u[x],
                    R = x.toLowerCase();
                switch (R) {
                    case "kd":
                    case "ka":
                    case "ks":
                        this.options && this.options.normalizeRGB &&
                            (Q = [Q[0] / 255, Q[1] / 255, Q[2] / 255]), this.options && this.options.ignoreZeroRGBs && 0 === Q[0] && 0 === Q[1] && 0 === Q[2] && (r = !1)
                }
                r && (z[R] = Q)
            }
        }
        return p
    },
    preload: function() {
        for (var d in this.materialsInfo) this.create(d)
    },
    getIndex: function(d) {
        return this.nameLookup[d]
    },
    getAsArray: function() {
        var d = 0,
            p;
        for (p in this.materialsInfo) this.materialsArray[d] = this.create(p), this.nameLookup[p] = d, d++;
        return this.materialsArray
    },
    create: function(d) {
        void 0 === this.materials[d] && this.createMaterial_(d);
        return this.materials[d]
    },
    createMaterial_: function(d) {
        function p(d,
            p) {
            if (!z[d]) {
                p = v.getTextureParams(p, z);
                var r = v.loadTexture(x(v.baseUrl, p.url));
                r.repeat.copy(p.scale);
                r.offset.copy(p.offset);
                r.wrapS = v.wrap;
                r.wrapT = v.wrap;
                z[d] = r
            }
        }
        var v = this,
            u = this.materialsInfo[d],
            z = {
                name: d,
                side: this.side
            },
            x = function(d, p) {
                return "string" !== typeof p || "" === p ? "" : /^https?:\/\//i.test(p) ? p : d + p
            },
            r;
        for (r in u) {
            var Q = u[r];
            if ("" !== Q) switch (r.toLowerCase()) {
                case "kd":
                    z.color = (new THREE.Color).fromArray(Q);
                    break;
                case "ks":
                    z.specular = (new THREE.Color).fromArray(Q);
                    break;
                case "map_kd":
                    p("map",
                        Q);
                    break;
                case "map_ks":
                    p("specularMap", Q);
                    break;
                case "map_bump":
                case "bump":
                    p("bumpMap", Q);
                    break;
                case "ns":
                    z.shininess = parseFloat(Q);
                    break;
                case "d":
                    1 > Q && (z.opacity = Q, z.transparent = !0);
                    break;
                case "Tr":
                    0 < Q && (z.opacity = 1 - Q, z.transparent = !0)
            }
        }
        this.materials[d] = new THREE.MeshPhongMaterial(z);
        return this.materials[d]
    },
    getTextureParams: function(d, p) {
        var v = {
            scale: new THREE.Vector2(1, 1),
            offset: new THREE.Vector2(0, 0)
        };
        d = d.split(/\s+/);
        var u;
        u = d.indexOf("-bm");
        0 <= u && (p.bumpScale = parseFloat(d[u + 1]), d.splice(u,
            2));
        u = d.indexOf("-s");
        0 <= u && (v.scale.set(parseFloat(d[u + 1]), parseFloat(d[u + 2])), d.splice(u, 4));
        u = d.indexOf("-o");
        0 <= u && (v.offset.set(parseFloat(d[u + 1]), parseFloat(d[u + 2])), d.splice(u, 4));
        v.url = d.join(" ").trim();
        return v
    },
    loadTexture: function(d, p, v, u, z) {
        var x = THREE.Loader.Handlers.get(d),
            r = void 0 !== this.manager ? this.manager : THREE.DefaultLoadingManager;
        null === x && (x = new THREE.TextureLoader(r));
        x.setCrossOrigin && x.setCrossOrigin(this.crossOrigin);
        d = x.load(d, v, u, z);
        void 0 !== p && (d.mapping = p);
        return d
    }
};
THREE.OBJLoader = function(d) {
    this.manager = void 0 !== d ? d : THREE.DefaultLoadingManager;
    this.materials = null;
    this.regexp = {
        vertex_pattern: /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        normal_pattern: /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        uv_pattern: /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        face_vertex: /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
        face_vertex_uv: /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
        face_vertex_uv_normal: /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
        face_vertex_normal: /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
        object_pattern: /^[og]\s*(.+)?/,
        smoothing_pattern: /^s\s+(\d+|on|off)/,
        material_library_pattern: /^mtllib /,
        material_use_pattern: /^usemtl /
    }
};
THREE.OBJLoader.prototype = {
    constructor: THREE.OBJLoader,
    load: function(d, p, v, u) {
        var z = this,
            x = new THREE.XHRLoader(z.manager);
        x.setPath(this.path);
        x.load(d, function(d) {
            p(z.parse(d))
        }, v, u)
    },
    setPath: function(d) {
        this.path = d
    },
    setMaterials: function(d) {
        this.materials = d
    },
    _createParserState: function() {
        var d = {
            objects: [],
            object: {},
            vertices: [],
            normals: [],
            uvs: [],
            materialLibraries: [],
            startObject: function(d, v) {
                if (this.object && !1 === this.object.fromDeclaration) this.object.name = d, this.object.fromDeclaration = !1 !== v;
                else {
                    this.object &&
                        "function" === typeof this.object._finalize && this.object._finalize();
                    var u = this.object && "function" === typeof this.object.currentMaterial ? this.object.currentMaterial() : void 0;
                    this.object = {
                        name: d || "",
                        fromDeclaration: !1 !== v,
                        geometry: {
                            vertices: [],
                            normals: [],
                            uvs: []
                        },
                        materials: [],
                        smooth: !0,
                        startMaterial: function(d, p) {
                            var r = this._finalize(!1);
                            r && (r.inherited || 0 >= r.groupCount) && this.materials.splice(r.index, 1);
                            d = {
                                index: this.materials.length,
                                name: d || "",
                                mtllib: Array.isArray(p) && 0 < p.length ? p[p.length - 1] : "",
                                smooth: void 0 !==
                                    r ? r.smooth : this.smooth,
                                groupStart: void 0 !== r ? r.groupEnd : 0,
                                groupEnd: -1,
                                groupCount: -1,
                                inherited: !1,
                                clone: function(d) {
                                    return {
                                        index: "number" === typeof d ? d : this.index,
                                        name: this.name,
                                        mtllib: this.mtllib,
                                        smooth: this.smooth,
                                        groupStart: this.groupEnd,
                                        groupEnd: -1,
                                        groupCount: -1,
                                        inherited: !1
                                    }
                                }
                            };
                            this.materials.push(d);
                            return d
                        },
                        currentMaterial: function() {
                            if (0 < this.materials.length) return this.materials[this.materials.length - 1]
                        },
                        _finalize: function(d) {
                            var p = this.currentMaterial();
                            p && -1 === p.groupEnd && (p.groupEnd = this.geometry.vertices.length /
                                3, p.groupCount = p.groupEnd - p.groupStart, p.inherited = !1);
                            !1 !== d && 0 === this.materials.length && this.materials.push({
                                name: "",
                                smooth: this.smooth
                            });
                            return p
                        }
                    };
                    u && u.name && "function" === typeof u.clone && (d = u.clone(0), d.inherited = !0, this.object.materials.push(d));
                    this.objects.push(this.object)
                }
            },
            finalize: function() {
                this.object && "function" === typeof this.object._finalize && this.object._finalize()
            },
            parseVertexIndex: function(d, v) {
                d = parseInt(d, 10);
                return 3 * (0 <= d ? d - 1 : d + v / 3)
            },
            parseNormalIndex: function(d, v) {
                d = parseInt(d,
                    10);
                return 3 * (0 <= d ? d - 1 : d + v / 3)
            },
            parseUVIndex: function(d, v) {
                d = parseInt(d, 10);
                return 2 * (0 <= d ? d - 1 : d + v / 2)
            },
            addVertex: function(d, v, u) {
                var z = this.vertices,
                    x = this.object.geometry.vertices;
                x.push(z[d + 0]);
                x.push(z[d + 1]);
                x.push(z[d + 2]);
                x.push(z[v + 0]);
                x.push(z[v + 1]);
                x.push(z[v + 2]);
                x.push(z[u + 0]);
                x.push(z[u + 1]);
                x.push(z[u + 2])
            },
            addVertexLine: function(d) {
                var v = this.vertices,
                    u = this.object.geometry.vertices;
                u.push(v[d + 0]);
                u.push(v[d + 1]);
                u.push(v[d + 2])
            },
            addNormal: function(d, v, u) {
                var z = this.normals,
                    x = this.object.geometry.normals;
                x.push(z[d + 0]);
                x.push(z[d + 1]);
                x.push(z[d + 2]);
                x.push(z[v + 0]);
                x.push(z[v + 1]);
                x.push(z[v + 2]);
                x.push(z[u + 0]);
                x.push(z[u + 1]);
                x.push(z[u + 2])
            },
            addUV: function(d, v, u) {
                var z = this.uvs,
                    x = this.object.geometry.uvs;
                x.push(z[d + 0]);
                x.push(z[d + 1]);
                x.push(z[v + 0]);
                x.push(z[v + 1]);
                x.push(z[u + 0]);
                x.push(z[u + 1])
            },
            addUVLine: function(d) {
                var v = this.uvs,
                    u = this.object.geometry.uvs;
                u.push(v[d + 0]);
                u.push(v[d + 1])
            },
            addFace: function(d, v, u, z, x, r, Q, R, da, aa, ma, ka) {
                var ea = this.vertices.length;
                d = this.parseVertexIndex(d, ea);
                v = this.parseVertexIndex(v,
                    ea);
                u = this.parseVertexIndex(u, ea);
                void 0 === z ? this.addVertex(d, v, u) : (ea = this.parseVertexIndex(z, ea), this.addVertex(d, v, ea), this.addVertex(v, u, ea));
                void 0 !== x && (ea = this.uvs.length, d = this.parseUVIndex(x, ea), v = this.parseUVIndex(r, ea), u = this.parseUVIndex(Q, ea), void 0 === z ? this.addUV(d, v, u) : (ea = this.parseUVIndex(R, ea), this.addUV(d, v, ea), this.addUV(v, u, ea)));
                void 0 !== da && (x = this.normals.length, d = this.parseNormalIndex(da, x), v = da === aa ? d : this.parseNormalIndex(aa, x), u = da === ma ? d : this.parseNormalIndex(ma, x), void 0 ===
                    z ? this.addNormal(d, v, u) : (ea = this.parseNormalIndex(ka, x), this.addNormal(d, v, ea), this.addNormal(v, u, ea)))
            },
            addLineGeometry: function(d, v) {
                this.object.geometry.type = "Line";
                for (var u = this.vertices.length, z = this.uvs.length, x = 0, r = d.length; x < r; x++) this.addVertexLine(this.parseVertexIndex(d[x], u));
                d = 0;
                for (r = v.length; d < r; d++) this.addUVLine(this.parseUVIndex(v[d], z))
            }
        };
        d.startObject("", !1);
        return d
    },
    parse: function(d) {
        console.time("OBJLoader");
        var p = this._createParserState(); - 1 !== d.indexOf("\r\n") && (d = d.replace("\r\n",
            "\n"));
        var v = d.split("\n"),
            u, z, x = [],
            r = "function" === typeof "".trimLeft;
        d = 0;
        for (var Q = v.length; d < Q; d++)
            if (u = v[d], u = r ? u.trimLeft() : u.trim(), z = u.length, 0 !== z && (z = u.charAt(0), "#" !== z))
                if ("v" === z)
                    if (z = u.charAt(1), " " === z && null !== (x = this.regexp.vertex_pattern.exec(u))) p.vertices.push(parseFloat(x[1]), parseFloat(x[2]), parseFloat(x[3]));
                    else if ("n" === z && null !== (x = this.regexp.normal_pattern.exec(u))) p.normals.push(parseFloat(x[1]), parseFloat(x[2]), parseFloat(x[3]));
        else if ("t" === z && null !== (x = this.regexp.uv_pattern.exec(u))) p.uvs.push(parseFloat(x[1]),
            parseFloat(x[2]));
        else throw Error("Unexpected vertex/normal/uv line: '" + u + "'");
        else if ("f" === z)
            if (null !== (x = this.regexp.face_vertex_uv_normal.exec(u))) p.addFace(x[1], x[4], x[7], x[10], x[2], x[5], x[8], x[11], x[3], x[6], x[9], x[12]);
            else if (null !== (x = this.regexp.face_vertex_uv.exec(u))) p.addFace(x[1], x[3], x[5], x[7], x[2], x[4], x[6], x[8]);
        else if (null !== (x = this.regexp.face_vertex_normal.exec(u))) p.addFace(x[1], x[3], x[5], x[7], void 0, void 0, void 0, void 0, x[2], x[4], x[6], x[8]);
        else if (null !== (x = this.regexp.face_vertex.exec(u))) p.addFace(x[1],
            x[2], x[3], x[4]);
        else throw Error("Unexpected face line: '" + u + "'");
        else if ("l" === z) {
            z = u.substring(1).trim().split(" ");
            var R = [],
                da = [];
            if (-1 === u.indexOf("/")) R = z;
            else {
                u = 0;
                for (var aa = z.length; u < aa; u++) {
                    var ma = z[u].split("/");
                    "" !== ma[0] && R.push(ma[0]);
                    "" !== ma[1] && da.push(ma[1])
                }
            }
            p.addLineGeometry(R, da)
        } else if (null !== (x = this.regexp.object_pattern.exec(u))) u = x[0].substr(1).trim(), p.startObject(u);
        else if (this.regexp.material_use_pattern.test(u)) p.object.startMaterial(u.substring(7).trim(), p.materialLibraries);
        else if (this.regexp.material_library_pattern.test(u)) p.materialLibraries.push(u.substring(7).trim());
        else if (null !== (x = this.regexp.smoothing_pattern.exec(u))) {
            if (u = x[1].trim().toLowerCase(), p.object.smooth = "1" === u || "on" === u, u = p.object.currentMaterial()) u.smooth = p.object.smooth
        } else if ("\x00" !== u) throw Error("Unexpected line: '" + u + "'");
        p.finalize();
        v = new THREE.Group;
        v.materialLibraries = [].concat(p.materialLibraries);
        d = 0;
        for (Q = p.objects.length; d < Q; d++)
            if (x = p.objects[d], u = x.geometry, R = x.materials, r =
                "Line" === u.type, 0 !== u.vertices.length) {
                z = new THREE.BufferGeometry;
                z.addAttribute("position", new THREE.BufferAttribute(new Float32Array(u.vertices), 3));
                0 < u.normals.length ? z.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(u.normals), 3)) : z.computeVertexNormals();
                0 < u.uvs.length && z.addAttribute("uv", new THREE.BufferAttribute(new Float32Array(u.uvs), 2));
                da = [];
                aa = 0;
                for (ma = R.length; aa < ma; aa++) {
                    var ka = R[aa];
                    u = void 0;
                    if (null !== this.materials && (u = this.materials.create(ka.name), r && u && !(u instanceof THREE.LineBasicMaterial))) {
                        var ea = new THREE.LineBasicMaterial;
                        ea.copy(u);
                        u = ea
                    }
                    u || (u = r ? new THREE.LineBasicMaterial : new THREE.MeshPhongMaterial, u.name = ka.name);
                    u.shading = ka.smooth ? THREE.SmoothShading : THREE.FlatShading;
                    da.push(u)
                }
                if (1 < da.length) {
                    aa = 0;
                    for (ma = R.length; aa < ma; aa++) ka = R[aa], z.addGroup(ka.groupStart, ka.groupCount, aa);
                    u = new THREE.MultiMaterial(da);
                    r = r ? new THREE.LineSegments(z, u) : new THREE.Mesh(z, u)
                } else r = r ? new THREE.LineSegments(z, da[0]) : new THREE.Mesh(z, da[0]);
                r.name = x.name;
                v.add(r)
            }
        console.timeEnd("OBJLoader");
        return v
    }
};
THREE.MCControls = function(d, p, v) {
    function u(d, p, r) {
        var u = new THREE.Vector3;
        u.setFromSpherical(d);
        null != p && u.applyQuaternion(p);
        null != r && u.applyQuaternion(r);
        d.setFromVector3(u)
    }

    function z() {
        return Math.pow(.95, B.zoomSpeed)
    }

    function x(d) {
        B.object instanceof THREE.PerspectiveCamera ? ub /= d : B.object instanceof THREE.OrthographicCamera ? (B.object.zoom = Math.max(B.minZoom, Math.min(B.maxZoom, B.object.zoom * d)), B.object.updateProjectionMatrix(), Yb = !0) : (console.warn("WARNING: MCControls.js encountered an unknown camera type - dolly/zoom disabled."),
            B.enableZoom = !1)
    }

    function r(d) {
        B.object instanceof THREE.PerspectiveCamera ? ub *= d : B.object instanceof THREE.OrthographicCamera ? (B.object.zoom = Math.max(B.minZoom, Math.min(B.maxZoom, B.object.zoom / d)), B.object.updateProjectionMatrix(), Yb = !0) : (console.warn("WARNING: MCControls.js encountered an unknown camera type - dolly/zoom disabled."), B.enableZoom = !1)
    }

    function Q(d) {
        if (!1 !== B.enabled) {
            d.preventDefault();
            if (d.button === B.mouseButtons.ORBIT) {
                if (!1 === B.enableRotate) return;
                fb.set(d.clientX, d.clientY);
                qa =
                    ra.ROTATE
            } else if (d.button === B.mouseButtons.ZOOM) {
                if (!1 === B.enableZoom) return;
                Aa.set(d.clientX, d.clientY);
                qa = ra.DOLLY
            } else if (d.button === B.mouseButtons.PAN) {
                if (!1 === B.enablePan) return;
                Db.set(d.clientX, d.clientY);
                qa = ra.PAN
            }
            qa !== ra.NONE && (document.addEventListener("mousemove", R, !1), document.addEventListener("mouseup", da, !1), B.dispatchEvent(yb))
        }
    }

    function R(d) {
        !1 !== B.enabled && (d.preventDefault(), qa === ra.ROTATE ? !1 !== B.enableRotate && (Bb.set(d.clientX, d.clientY), Cb.subVectors(Bb, fb), d = B.domElement === document ?
            B.domElement.body : B.domElement, Ha.theta -= 2 * Math.PI * Cb.x / d.clientWidth * B.rotateSpeed, Ha.phi -= 2 * Math.PI * Cb.y / d.clientHeight * B.rotateSpeed, fb.copy(Bb), B.update()) : qa === ra.DOLLY ? !1 !== B.enableZoom && (Ob.set(d.clientX, d.clientY), ic.subVectors(Ob, Aa), 0 < ic.y ? x(z()) : 0 > ic.y && r(z()), Aa.copy(Ob), B.update()) : qa === ra.PAN && !1 !== B.enablePan && (Eb.set(d.clientX, d.clientY), Fb.subVectors(Eb, Db), na(Fb.x, Fb.y), Db.copy(Eb), B.update()))
    }

    function da(d) {
        !1 !== B.enabled && (document.removeEventListener("mousemove", R, !1), document.removeEventListener("mouseup",
            da, !1), B.dispatchEvent(ob), qa = ra.NONE)
    }

    function aa(d) {
        !1 === B.enabled || !1 === B.enableZoom || qa !== ra.NONE && qa !== ra.ROTATE || (d.preventDefault(), d.stopPropagation(), 0 > d.deltaY ? r(z()) : 0 < d.deltaY && x(z()), B.update(), B.dispatchEvent(yb), B.dispatchEvent(ob))
    }

    function ma(d) {
        if (!1 !== B.enabled && !1 !== B.enableKeys && !1 !== B.enablePan) switch (d.keyCode) {
            case B.keys.UP:
                na(0, B.keyPanSpeed);
                B.update();
                break;
            case B.keys.BOTTOM:
                na(0, -B.keyPanSpeed);
                B.update();
                break;
            case B.keys.LEFT:
                na(B.keyPanSpeed, 0);
                B.update();
                break;
            case B.keys.RIGHT:
                na(-B.keyPanSpeed,
                    0), B.update()
        }
    }

    function ka(d) {
        if (!1 !== B.enabled) {
            switch (d.touches.length) {
                case 1:
                    if (!1 === B.enableRotate) return;
                    fb.set(d.touches[0].pageX, d.touches[0].pageY);
                    qa = ra.TOUCH_ROTATE;
                    break;
                case 2:
                case 3:
                    if (B.useMSGestures) return;
                    var p = d.touches[0].pageX - d.touches[1].pageX,
                        r = d.touches[0].pageY - d.touches[1].pageY;
                    Aa.set(0, Math.sqrt(p * p + r * r));
                    Db.set(d.touches[0].pageX, d.touches[0].pageY);
                    qa = ra.TOUCH_DOLLY;
                    break;
                default:
                    qa = ra.NONE
            }
            qa !== ra.NONE && B.dispatchEvent(yb)
        }
    }

    function ea(d) {
        if (!1 !== B.enabled) switch (d.preventDefault(),
            d.stopPropagation(), d.touches.length) {
            case 1:
                if (!1 === B.enableRotate) break;
                if (qa !== ra.TOUCH_ROTATE) break;
                Bb.set(d.touches[0].pageX, d.touches[0].pageY);
                Cb.subVectors(Bb, fb);
                d = B.domElement === document ? B.domElement.body : B.domElement;
                Ha.theta -= 2 * Math.PI * Cb.x / d.clientWidth * B.rotateSpeed;
                Ha.phi -= 2 * Math.PI * Cb.y / d.clientHeight * B.rotateSpeed;
                fb.copy(Bb);
                B.update();
                break;
            case 2:
            case 3:
                if (B.useMSGestures) break;
                if (qa !== ra.TOUCH_DOLLY) break;
                if (!0 === B.enableZoom) {
                    var p = d.touches[0].pageX - d.touches[1].pageX,
                        r = d.touches[0].pageY -
                        d.touches[1].pageY,
                        p = Math.sqrt(p * p + r * r);
                    Ob.set(0, p);
                    1 < Aa.y && (ub = Aa.y / p);
                    Aa.copy(Ob);
                    B.update()
                }!0 === B.enablePan && (Eb.set(d.touches[0].pageX, d.touches[0].pageY), Fb.subVectors(Eb, Db), na(Fb.x, Fb.y), Db.copy(Eb), B.update());
                break;
            default:
                qa = ra.NONE
        }
    }

    function tb(d) {
        !1 !== B.enabled && (B.dispatchEvent(ob), qa = ra.NONE)
    }

    function za(d) {
        d.preventDefault()
    }
    this.object = d;
    this.domElement = void 0 !== p ? p : document;
    this.enabled = !0;
    this.target = new THREE.Vector3;
    this.upVec = new THREE.Vector3;
    this.minDistance = 0;
    this.maxDistance =
        Infinity;
    this.minZoom = 0;
    this.maxZoom = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.localAngleLimits = !0;
    this.localAngleLimitsUpVec = new THREE.Vector3;
    this.enableDamping = !1;
    this.dampingFactor = .25;
    this.enableZoom = !0;
    this.zoomSpeed = 1;
    this.enableRotate = !0;
    this.rotateSpeed = 1;
    this.enablePan = !0;
    this.keyPanSpeed = 7;
    this.autoRotate = !1;
    this.autoRotateSpeed = 2;
    this.enableKeys = !0;
    this.keys = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        BOTTOM: 40
    };
    this.mouseButtons = {
        ORBIT: THREE.MOUSE.LEFT,
        ZOOM: THREE.MOUSE.MIDDLE,
        PAN: THREE.MOUSE.RIGHT
    };
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.upVec0 = new THREE.Vector3(0, 1, 0);
    this.zoom0 = this.object.zoom;
    this.useMSGestures = this.refreshPanning = this.enableDynamicCenter = !1;
    "undefined" != typeof MSGesture && (this.useMSGestures = !0);
    "ontouchstart" in window || this.useMSGestures || ($("#toolbar-instructions").html("Click and drag to rotate, scroll to zoom, right-click drag to pan."), $("#toolbar-instructions-below").html("Click and drag to rotate, scroll to zoom, right-click drag to pan."));
    this.getPolarAngle = function() {
        return Ga.phi
    };
    this.getAzimuthalAngle = function() {
        return Ga.theta
    };
    this.reset = function() {
        B.target.copy(B.target0);
        B.object.position.copy(B.position0);
        B.object.zoom = B.zoom0;
        B.object.updateProjectionMatrix();
        B.dispatchEvent(xc);
        B.update();
        qa = ra.NONE;
        B.refreshPanning = !0
    };
    this.update = function() {
        var d = new THREE.Vector3,
            p = new THREE.Quaternion,
            r = new THREE.Quaternion,
            v = new THREE.Vector3,
            x = new THREE.Quaternion;
        return function() {
            var z = B.object.position;
            d.copy(z).sub(B.target);
            d.clone().negate();
            p.setFromUnitVectors(B.upVec, new THREE.Vector3(0, 1, 0));
            r.setFromUnitVectors(B.localAngleLimitsUpVec, new THREE.Vector3(0, 1, 0));
            d.applyQuaternion(p);
            Ga.setFromVector3(d);
            B.autoRotate && qa === ra.NONE && (Ha.theta -= 2 * Math.PI / 60 / 60 * B.autoRotateSpeed);
            if (0 != Ha.theta || 0 != Ha.phi) u(Ga, p.clone().inverse(), B.localAngleLimits ? r : null), Ga.theta += Ha.theta, Ga.phi += Ha.phi, Ga.theta = Math.max(B.minAzimuthAngle, Math.min(B.maxAzimuthAngle, Ga.theta)), Ga.phi = Math.max(B.minPolarAngle, Math.min(B.maxPolarAngle, Ga.phi)), u(Ga, B.localAngleLimits ?
                r.clone().inverse() : null, p), Ga.makeSafe();
            Ga.radius *= ub;
            Ga.radius = Math.max(B.minDistance, Math.min(B.maxDistance, Ga.radius));
            B.target.add(jb);
            d.setFromSpherical(Ga);
            d.applyQuaternion(p.clone().inverse());
            z.copy(B.target).add(d);
            z = B.position0.clone();
            z.sub(B.target0).negate();
            var R = d.clone().negate(),
                z = (new THREE.Quaternion).setFromUnitVectors(z, R);
            B.upVec.copy(B.localAngleLimitsUpVec);
            B.upVec.applyQuaternion(z);
            B.object.up = B.upVec.clone();
            B.object.lookAt(B.target);
            !0 === B.enableDamping ? (Ha.theta *= 1 -
                B.dampingFactor, Ha.phi *= 1 - B.dampingFactor) : Ha.set(0, 0, 0);
            ub = 1;
            jb.set(0, 0, 0);
            return Yb || v.distanceToSquared(B.object.position) > yc || 8 * (1 - x.dot(B.object.quaternion)) > yc ? (B.dispatchEvent(xc), v.copy(B.object.position), x.copy(B.object.quaternion), Yb = !1, !0) : !1
        }
    }();
    this.dispose = function() {
        B.domElement.removeEventListener("contextmenu", za, !1);
        B.domElement.removeEventListener("mousedown", Q, !1);
        B.domElement.removeEventListener("wheel", aa, !1);
        B.domElement.removeEventListener("touchstart", ka, !1);
        B.domElement.removeEventListener("touchend",
            tb, !1);
        B.domElement.removeEventListener("touchmove", ea, !1);
        document.removeEventListener("mousemove", R, !1);
        document.removeEventListener("mouseup", da, !1);
        window.removeEventListener("keydown", ma, !1)
    };
    var B = this,
        xc = {
            type: "change"
        },
        yb = {
            type: "start"
        },
        ob = {
            type: "end"
        },
        ra = {
            NONE: -1,
            ROTATE: 0,
            DOLLY: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_DOLLY: 4,
            TOUCH_PAN: 5
        },
        qa = ra.NONE,
        yc = 1E-6,
        Ga = new THREE.Spherical,
        Ha = new THREE.Spherical,
        ub = 1,
        jb = new THREE.Vector3,
        Yb = !1,
        fb = new THREE.Vector2,
        Bb = new THREE.Vector2,
        Cb = new THREE.Vector2,
        Db =
        new THREE.Vector2,
        Eb = new THREE.Vector2,
        Fb = new THREE.Vector2,
        Aa = new THREE.Vector2,
        Ob = new THREE.Vector2,
        ic = new THREE.Vector2,
        Zb = new THREE.Vector2(v / B.object.fov, v / B.object.fov),
        zc = new THREE.Vector2(v / B.object.fov, v / B.object.fov),
        Ia = new THREE.Vector2;
    Ia.copy(Zb);
    var fa = new THREE.Vector2;
    fa.copy(zc);
    var Ka = function() {
            var d = new THREE.Vector3;
            return function(p, r) {
                d.setFromMatrixColumn(r, 0);
                d.multiplyScalar(-p);
                jb.add(d)
            }
        }(),
        $b = function() {
            var d = new THREE.Vector3;
            return function(p, r) {
                d.setFromMatrixColumn(r,
                    1);
                d.multiplyScalar(p);
                jb.add(d)
            }
        }(),
        na = function() {
            var d = new THREE.Vector3;
            return function(p, r) {
                B.refreshPanning && (Ia.copy(Zb), fa.copy(zc), B.refreshPanning = !1);
                var u = B.domElement === document ? B.domElement.body : B.domElement;
                if (B.object instanceof THREE.PerspectiveCamera) {
                    d.copy(B.object.position).sub(B.target);
                    var v = d.length(),
                        v = v * Math.tan(B.object.fov / 2 * Math.PI / 180);
                    0 < p ? 2 * p * v / u.clientHeight > Ia.x ? (p = Ia.x * u.clientHeight / (2 * v), Ia.y += Ia.x, Ia.x = 0) : (Ia.x -= 2 * p * v / u.clientHeight, Ia.y += 2 * p * v / u.clientHeight) :
                        0 > p && (2 * p * v / u.clientHeight < -1 * Ia.y ? (p = -1 * Ia.y * u.clientHeight / (2 * v), Ia.x += Ia.y, Ia.y = 0) : (Ia.y -= -2 * p * v / u.clientHeight, Ia.x += -2 * p * v / u.clientHeight));
                    0 < r ? 2 * r * v / u.clientHeight > fa.x ? (r = fa.x * u.clientHeight / (2 * v), fa.y += fa.x, fa.x = 0) : (fa.x -= 2 * r * v / u.clientHeight, fa.y += 2 * r * v / u.clientHeight) : 0 > r && (2 * r * v / u.clientHeight < -1 * fa.y ? (r = -1 * fa.y * u.clientHeight / (2 * v), fa.x += fa.y, fa.y = 0) : (fa.y -= -2 * r * v / u.clientHeight, fa.x += -2 * r * v / u.clientHeight));
                    Ka(2 * p * v / u.clientHeight, B.object.matrix);
                    $b(2 * r * v / u.clientHeight, B.object.matrix)
                } else B.object instanceof
                THREE.OrthographicCamera ? (Ka(p * (B.object.right - B.object.left) / B.object.zoom / u.clientWidth, B.object.matrix), $b(r * (B.object.top - B.object.bottom) / B.object.zoom / u.clientHeight, B.object.matrix)) : (console.warn("WARNING: MCControls.js encountered an unknown camera type - pan disabled."), B.enablePan = !1)
            }
        }();
    B.domElement.addEventListener("contextmenu", za, !1);
    B.domElement.addEventListener("mousedown", Q, !1);
    B.domElement.addEventListener("wheel", aa, !1);
    B.domElement.addEventListener("touchstart", ka, !1);
    B.domElement.addEventListener("touchend",
        tb, !1);
    B.domElement.addEventListener("touchmove", ea, !1);
    if (B.useMSGestures) {
        myGesture = new MSGesture;
        myGesture.target = B.domElement;
        var ac = 0;
        B.domElement.addEventListener("pointerdown", function(d) {
            ac++;
            myGesture.addPointer(d.pointerId)
        }, !1);
        B.domElement.addEventListener("pointerup", function(d) {
            ac--;
            myGesture.addPointer(d.pointerId)
        }, !1);
        B.domElement.addEventListener("MSGestureChange", function(d) {
            1 >= ac || (qa = ra.NONE, d.detail != d.MSGESTURE_FLAG_INERTIA && (B.enableZoom && (ub = 1 / d.scale), B.enablePan && (costh =
                Math.cos(d.rotation), sinth = Math.sin(d.rotation), tx = costh * d.translationX - sinth * d.translationY, ty = sinth * d.translationX + costh * d.translationY, na(tx, ty)), B.update()))
        }, !1)
    }
    window.addEventListener("keydown", ma, !1);
    this.update()
};
THREE.MCControls.prototype = Object.create(THREE.EventDispatcher.prototype);
THREE.MCControls.prototype.constructor = THREE.MCControls;
Object.defineProperties(THREE.MCControls.prototype, {
    center: {
        get: function() {
            console.warn("THREE.MCControls: .center has been renamed to .target");
            return this.target
        }
    },
    noZoom: {
        get: function() {
            console.warn("THREE.MCControls: .noZoom has been deprecated. Use .enableZoom instead.");
            return !this.enableZoom
        },
        set: function(d) {
            console.warn("THREE.MCControls: .noZoom has been deprecated. Use .enableZoom instead.");
            this.enableZoom = !d
        }
    },
    noRotate: {
        get: function() {
            console.warn("THREE.MCControls: .noRotate has been deprecated. Use .enableRotate instead.");
            return !this.enableRotate
        },
        set: function(d) {
            console.warn("THREE.MCControls: .noRotate has been deprecated. Use .enableRotate instead.");
            this.enableRotate = !d
        }
    },
    noPan: {
        get: function() {
            console.warn("THREE.MCControls: .noPan has been deprecated. Use .enablePan instead.");
            return !this.enablePan
        },
        set: function(d) {
            console.warn("THREE.MCControls: .noPan has been deprecated. Use .enablePan instead.");
            this.enablePan = !d
        }
    },
    noKeys: {
        get: function() {
            console.warn("THREE.MCControls: .noKeys has been deprecated. Use .enableKeys instead.");
            return !this.enableKeys
        },
        set: function(d) {
            console.warn("THREE.MCControls: .noKeys has been deprecated. Use .enableKeys instead.");
            this.enableKeys = !d
        }
    },
    staticMoving: {
        get: function() {
            console.warn("THREE.MCControls: .staticMoving has been deprecated. Use .enableDamping instead.");
            return !this.enableDamping
        },
        set: function(d) {
            console.warn("THREE.MCControls: .staticMoving has been deprecated. Use .enableDamping instead.");
            this.enableDamping = !d
        }
    },
    dynamicDampingFactor: {
        get: function() {
            console.warn("THREE.MCControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.");
            return this.dampingFactor
        },
        set: function(d) {
            console.warn("THREE.MCControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead.");
            this.dampingFactor = d
        }
    }
});
var deserialize, tree, sort, TreeToCutlet, inFrontOf, MergeGeometries, MergeAdd;
MergeAdd = function(d, p) {
    if (!1 === (p && p.isBufferGeometry)) console.error("MergeAdd: geometry not an instance of THREE.BufferGeometry.", p);
    else {
        var v = d.attributes,
            u;
        for (u in v)
            if (void 0 !== p.attributes[u]) {
                for (var z = Array.prototype.slice.call(v[u].array), x = p.attributes[u].array, r = 0; r < x.length; r++) z.push(x[r]);
                v[u].array = new Float32Array(z);
                v[u].needsUpdate = !0
            }
        p.uvsNeedUpdate = !0;
        p.buffersNeedUpdate = !0;
        return d
    }
};
MergeGeometries = function(d) {
    for (var p = 0; p < TreeToCutlet.length; p++)
        if (0 != TreeToCutlet[p].length) {
            for (var v = d[TreeToCutlet[p][0]], u = 1; u < TreeToCutlet[p].length; u++) MergeAdd(v.geometry, d[TreeToCutlet[p][u]].geometry);
            for (u = 1; u < TreeToCutlet[p].length; u++) d[TreeToCutlet[p][u]] = {}
        }
};
deserialize = function(d, p) {
    var v = d[0];
    d.shift(); - 1 !== v && (p.value = v, p.back = {}, p.front = {}, deserialize(d, p.front), deserialize(d, p.back))
};
tree = {};
TreeToCutlet = [];
sort = function(d, p, v) {
    traverse = function(d, p, v, r) {
        $.isEmptyObject(p) || (inFrontOf(d[TreeToCutlet[p.value][0]], v) ? (traverse(d, p.back, v, r), d[TreeToCutlet[p.value][0]].renderOrder = r.n, r.n += 1, traverse(d, p.front, v, r)) : (traverse(d, p.front, v, r), d[TreeToCutlet[p.value][0]].renderOrder = r.n, r.n += 1, traverse(d, p.back, v, r)))
    };
    traverse(d, p, v, {
        n: 0
    })
};
inFrontOf = function(d, p) {
    p = p.position.clone();
    d = d.geometry.attributes.position.array;
    var v = new THREE.Vector3;
    v.setX(d[0]);
    v.setY(d[1]);
    v.setZ(d[2]);
    var u = new THREE.Vector3;
    u.setX(d[3]);
    u.setY(d[4]);
    u.setZ(d[5]);
    var z = new THREE.Vector3;
    z.setX(d[6]);
    z.setY(d[7]);
    z.setZ(d[8]);
    u.sub(v);
    z.sub(v);
    u.cross(z);
    p.sub(v);
    return 1E-6 < p.dot(u)
};
EasingFunctions = {
    linear: function(d) {
        return d
    },
    easeInQuad: function(d) {
        return d * d
    },
    easeOutQuad: function(d) {
        return d * (2 - d)
    },
    easeInOutQuad: function(d) {
        return .5 > d ? 2 * d * d : -1 + (4 - 2 * d) * d
    },
    easeInCubic: function(d) {
        return d * d * d
    },
    easeOutCubic: function(d) {
        return --d * d * d + 1
    },
    easeInOutCubic: function(d) {
        return .5 > d ? 4 * d * d * d : (d - 1) * (2 * d - 2) * (2 * d - 2) + 1
    },
    easeInQuart: function(d) {
        return d * d * d * d
    },
    easeOutQuart: function(d) {
        return 1 - --d * d * d * d
    },
    easeInOutQuart: function(d) {
        return .5 > d ? 8 * d * d * d * d : 1 - 8 * --d * d * d * d
    },
    easeInQuint: function(d) {
        return d *
            d * d * d * d
    },
    easeOutQuint: function(d) {
        return 1 + --d * d * d * d * d
    },
    easeInOutQuint: function(d) {
        return .5 > d ? 16 * d * d * d * d * d : 1 + 16 * --d * d * d * d * d
    }
};

function Transition() {
    this.duration = this.t = 0
}
Transition.prototype = {
    constructor: Transition,
    isTransition: !0,
    active: function() {
        return 0 < this.duration && 1 > this.t
    },
    setOrigin: function(d) {
        this.pos0 = d.position.clone();
        this.quat0 = d.quaternion.clone();
        this.duration = 0
    },
    setDest: function(d) {
        this.pos1 = d.position.clone();
        this.quat1 = d.quaternion.clone();
        this.duration = 0
    },
    start: function() {
        var d = this.pos1.distanceTo(this.pos0),
            p = this.quat1.dot(this.quat0);
        this.duration = .001 > d && .001 > 1 - p * p ? 0 : 1;
        this.t = 0
    },
    advance: function(d, p) {
        this.t += d / this.duration;
        this.t = Math.min(1,
            this.t);
        d = EasingFunctions.easeInOutQuad(this.t);
        THREE.Quaternion.slerp(this.quat0, this.quat1, p.quaternion, d);
        p.position.lerpVectors(this.pos0, this.pos1, d)
    }
};
var camera, controls, scene, renderer, startTime, object, bkmks = [],
    stages = [],
    alphaTest = .02,
    arrayofobjects = [],
    anisotropicRatio = 1,
    pathT = 0,
    activeStageId = 0,
    MC_MODE = {
        CONTROL: 1,
        PLAY: 2
    },
    mode = MC_MODE.CONTROL,
    transition = new Transition,
    initialCamera = {};

function currentBookmarkIdx() {
    return Math.floor(pathT)
}
var loadComplete = !1;

function init() {
    function d(d) {
        return "Infinity" === d ? Infinity : "-Infinity" === d ? -Infinity : JSON.parse(d)
    }
    var p = "undefined" !== typeof mc_basepath ? mc_basepath + "/" : "./",
        v = function() {
            var d = null;
            $.ajax({
                async: !1,
                global: !1,
                url: p + "ScenePreferences.json",
                dataType: "json",
                success: function(p) {
                    d = p
                }
            });
            return d
        }();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 1E3);
    renderer = new THREE.WebGLRenderer;
    controls = new THREE.MCControls(camera, renderer.domElement, window.innerHeight);
    for (var u in v) "alphaTest" ===
        u ? alphaTest = d(v[u]) : "anisotropy" === u ? anisotropicRatio = d(v[u]) : controls[u] = d(v[u]);
    scene = new THREE.Scene;
    var z = [],
        x = [],
        r = 0,
        Q = [0, 0, 0];
    anisotropicRatio > renderer.getMaxAnisotropy() && (anisotropicRatio = renderer.getMaxAnisotropy());
    scene.add(new THREE.AmbientLight(16777215));
    renderer.setClearColor(16777215);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", onWindowResize, !1);
    $.get(p + "Scene.mcx", function(d) {
        parsed = JSON.parse(d);
        null == parsed.stages && (parsed.stages = [], parsed.stages.push({
            minPolarAngle: 180 * controls.minPolarAngle / Math.PI,
            maxPolarAngle: 180 * controls.maxPolarAngle / Math.PI,
            minAzimuthAngle: 180 * controls.minAzimuthAngle / Math.PI,
            maxAzimuteAngle: 180 * controls.maxAzimuthAngle / Math.PI,
            minDistance: controls.minDistance,
            maxDistance: controls.maxDistance
        }));
        for (i = 0; i < parsed.stages.length; i++) d = parsed.stages[i], stages.push({
            center: null == d ? null : new THREE.Vector3(d.x, d.y, d.z),
            minPolarAngle: null != d.minPolarAngle ? d.minPolarAngle *
                Math.PI / 180 : 0,
            maxPolarAngle: null != d.maxPolarAngle ? d.maxPolarAngle * Math.PI / 180 : Math.PI,
            minAzimuthAngle: null != d.minAzimuthAngle ? d.minAzimuthAngle * Math.PI / 180 : -Infinity,
            maxAzimuthAngle: null != d.maxAzimuthAngle ? d.maxAzimuthAngle * Math.PI / 180 : Infinity,
            minDistance: null != d.minDistance ? d.minDistance : 0,
            maxDistance: d.maxDistance ? d.maxDistance : Infinity
        });
        for (i = 0; i < parsed.bookmarks.length; i++) bkmks.push({
            quat: new THREE.Quaternion(parsed.bookmarks[i].qx, parsed.bookmarks[i].qy, parsed.bookmarks[i].qz, parsed.bookmarks[i].qw),
            vec: new THREE.Vector3(parsed.bookmarks[i].x, parsed.bookmarks[i].y, parsed.bookmarks[i].z),
            stageId: parsed.bookmarks[i].stage || 0
        });
        deserialize(parsed.bsp, tree);
        TreeToCutlet = parsed.bspCutlet;
        initialCamera.quat = new THREE.Quaternion(parsed.currentCamera.qx, parsed.currentCamera.qy, parsed.currentCamera.qz, parsed.currentCamera.qw);
        initialCamera.vec = new THREE.Vector3(parsed.currentCamera.x, parsed.currentCamera.y, parsed.currentCamera.z);
        var u = function(d) {
                d.lengthComputable && console.log(Math.round(d.loaded / d.total *
                    100, 2) + "% downloaded")
            },
            v = function(d) {};
        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader);
        d = new THREE.MTLLoader;
        d.setPath(p);
        d.load("canvas_materials.mtl", function(d) {
            d.preload();
            for (var R in d.materials) d.materials.hasOwnProperty(R) && (d.materials[R].transparent = !0, d.materials[R].side = THREE.DoubleSide, d.materials[R].depthWrite = !1, d.materials[R].depthTest = !1, d.materials[R].alphaTest = 0, d.materials[R].map.anisotropy = anisotropicRatio, d.materials[R].blending = THREE.CustomBlending, d.materials[R].blendEquation =
                THREE.AddEquation, d.materials[R].blendSrc = THREE.OneFactor, d.materials[R].blendDst = THREE.OneMinusSrcAlphaFactor);
            R = new THREE.OBJLoader;
            R.setMaterials(d);
            R.setPath(p);
            R.load("Scene.obj", function(d) {
                for (v = 0; v < d.children.length; v++)
                    for (z[v] = [0, 0, 0], j = x[v] = 0; j < d.children[v].geometry.attributes.position.array.length; j++) 0 === j % 3 ? (x[v] += 1, z[v][0] += d.children[v].geometry.attributes.position.array[j]) : 1 === j % 3 ? z[v][1] += d.children[v].geometry.attributes.position.array[j] : z[v][2] += d.children[v].geometry.attributes.position.array[j];
                for (v = 0; v < x.length; v++) r += x[v], Q[0] += z[v][0], Q[1] += z[v][1], Q[2] += z[v][2];
                var p = new THREE.Vector3(0, 0, 0);
                if (0 != r)
                    for (v = 0; 3 > v; v++) p.setComponent(v, Q[v] / r);
                for (var u = d.children.length, v = 0; v < u; v++) {
                    d.children[0].position.x = 0;
                    d.children[0].position.y = 0;
                    for (j = d.children[0].position.z = 0; j < d.children[0].geometry.attributes.position.array.length; j++) d.children[0].geometry.attributes.position.array[j] = 0 === j % 3 ? d.children[0].geometry.attributes.position.array[j] - d.children[0].position.x : 1 === j % 3 ? d.children[0].geometry.attributes.position.array[j] -
                        d.children[0].position.y : d.children[0].geometry.attributes.position.array[j] - d.children[0].position.z;
                    arrayofobjects.push(d.children[0]);
                    d.children.shift()
                }
                MergeGeometries(arrayofobjects);
                for (var v = 0; v < arrayofobjects.length; v++) $.isEmptyObject(arrayofobjects[v]) || scene.add(arrayofobjects[v]);
                null == stages[0].center && (stages[0].center = p.clone());
                controls.target = stages[0].center.clone();
                controls.target0 = controls.target.clone();
                0 < bkmks.length ? (setCameraToCurrentBookmark(), controls.target0 = controls.target.clone()) :
                    (camera.quaternion.set(initialCamera.quat.x, initialCamera.quat.y, initialCamera.quat.z, initialCamera.quat.w), camera.position.set(initialCamera.vec.x, initialCamera.vec.y, initialCamera.vec.z), updateControlLookatTarget());
                controls.position0 = controls.object.position.clone();
                controls.zoom0 = controls.object.zoom;
                $("#loading-canvas").hide();
                document.body.appendChild(renderer.domElement);
                loadComplete = !0;
                animate()
            }, u, v)
        })
    })
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    loadComplete && renderer.render(scene, camera)
}
var clock = new THREE.Clock;

function animate() {
    requestAnimationFrame(animate);
    var d = clock.getDelta();
    mode == MC_MODE.PLAY ? (transition.active() || (pathT += d / .03333333333 * .015, pathT >= bkmks.length - 1 && (pathT = bkmks.length - 1)), updateCameraAlongBookmarkPath(pathT), pathT >= bkmks.length - 1 && (playEnd(), controls.update())) : controls.update();
    transition.active() && transition.advance(d, camera);
    sort(arrayofobjects, tree, camera);
    renderer.render(scene, camera)
}

function setControlsToStage() {
    var d = stages[activeStageId];
    controls.minPolarAngle = d.minPolarAngle;
    controls.maxPolarAngle = d.maxPolarAngle;
    controls.minAzimuthAngle = d.minAzimuthAngle;
    controls.maxAzimuthAngle = d.maxAzimuthAngle;
    controls.minDistance = d.minDistance;
    controls.maxDistance = d.maxDistance
}

function setCameraToCurrentBookmark() {
    var d = bkmks[currentBookmarkIdx()].quat,
        p = bkmks[currentBookmarkIdx()].vec;
    camera.quaternion.set(d.x, d.y, d.z, d.w);
    camera.position.set(p.x, p.y, p.z);
    activeStageId = bkmks[currentBookmarkIdx()].stageId;
    setControlsToStage();
    updateControlLookatTarget()
}

function updateControlLookatTarget() {
    var d = new THREE.Vector3(0, 0, -1);
    d.applyQuaternion(camera.quaternion);
    var p = stages[activeStageId].center.clone().sub(camera.position);.1 <= d.dot(p) ? d.multiplyScalar(d.dot(p)) : d.multiplyScalar(.1);
    controls.target = camera.position.clone().add(d);
    controls.upVec = new THREE.Vector3(0, 1, 0);
    controls.upVec.applyQuaternion(camera.quaternion);
    controls.localAngleLimitsUpVec = controls.upVec.clone();
    controls.position0 = camera.position.clone();
    controls.target0 = controls.target.clone();
    controls.upVec0 = controls.upVec.clone()
}

function setupTransitionToBookmark(d) {
    transition.setOrigin(camera);
    pathT = d;
    setCameraToCurrentBookmark();
    controls.update();
    transition.setDest(camera);
    mode = MC_MODE.CONTROL;
    updatePlayButton(!1);
    transition.start()
}

function nextBookmark() {
    if (0 != bkmks.length) {
        var d = Math.round(Math.floor(pathT) + 1);
        d >= bkmks.length && (d = 0);
        setupTransitionToBookmark(d)
    }
}

function prevBookmark() {
    if (0 != bkmks.length) {
        var d = Math.round(Math.ceil(pathT) - 1);
        0 > d && (d = bkmks.length - 1);
        setupTransitionToBookmark(d)
    }
}

function updateCameraAlongBookmarkPath(d) {
    var p = Math.floor(d),
        v = bkmks.length;
    iend = 1 >= v ? p = 0 : p >= v - 1 ? p = v - 1 : p + 1;
    d -= p;
    0 > d ? d = 0 : 1 < d && (d = 1);
    d = EasingFunctions.easeInOutQuad(d);
    var v = bkmks[p],
        u = bkmks[iend];
    THREE.Quaternion.slerp(v.quat, u.quat, camera.quaternion, d);
    camera.position.lerpVectors(v.vec, u.vec, d);
    activeStageId = bkmks[.5 > d ? p : iend].stageId;
    updateControlLookatTarget();
    setControlsToStage()
}

function resetClick() {
    0 < bkmks.length ? setupTransitionToBookmark(0) : controls.reset()
}

function updatePlayButton(d) {
    var p = document.getElementById("play_pause-button");
    d ? (p.value = "Pause", p.src = "https://mentalcanvasweb.blob.core.windows.net/viewer/assets/Pause_50px.png", p.onclick = function() {
        play_pauseClick(!1)
    }, mode = MC_MODE.PLAY) : (p.value = "Play", p.src = "https://mentalcanvasweb.blob.core.windows.net/viewer/assets/Play_50px.png", p.onclick = function() {
        play_pauseClick(!0)
    }, mode = MC_MODE.CONTROL)
}

function play_pauseClick(d) {
    var p = mode;
    updatePlayButton(d);
    mode != p && (transition.setOrigin(camera), mode == MC_MODE.PLAY ? updateCameraAlongBookmarkPath(pathT) : controls.update(), transition.setDest(camera), transition.start())
}

function playEnd() {
    pathT = 0;
    play_pauseClick(!1)
}
try {
    init()
} catch (d) {
    $("#loading-status").text("Sorry, cannot run in this browser."), $("#loading-error-msg").text(d), $("#loading-error-msg").show()
};
