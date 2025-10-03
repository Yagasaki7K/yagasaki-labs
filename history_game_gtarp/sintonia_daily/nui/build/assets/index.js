(function () {
	const T = document.createElement("link").relList;
	if (T && T.supports && T.supports("modulepreload")) return;
	for (const O of document.querySelectorAll('link[rel="modulepreload"]')) z(O);
	new MutationObserver((O) => {
		for (const $ of O) if ($.type === "childList") for (const le of $.addedNodes) le.tagName === "LINK" && le.rel === "modulepreload" && z(le);
	}).observe(document, { childList: !0, subtree: !0 });
	function m(O) {
		const $ = {};
		return (
			O.integrity && ($.integrity = O.integrity),
			O.referrerPolicy && ($.referrerPolicy = O.referrerPolicy),
			O.crossOrigin === "use-credentials" ? ($.credentials = "include") : O.crossOrigin === "anonymous" ? ($.credentials = "omit") : ($.credentials = "same-origin"),
			$
		);
	}
	function z(O) {
		if (O.ep) return;
		O.ep = !0;
		const $ = m(O);
		fetch(O.href, $);
	}
})();
function Ia(S) {
	return S && S.__esModule && Object.prototype.hasOwnProperty.call(S, "default") ? S.default : S;
}
var xi = { exports: {} },
	yr = {},
	Ei = { exports: {} },
	F = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Na;
function Vf() {
	if (Na) return F;
	Na = 1;
	var S = Symbol.for("react.element"),
		T = Symbol.for("react.portal"),
		m = Symbol.for("react.fragment"),
		z = Symbol.for("react.strict_mode"),
		O = Symbol.for("react.profiler"),
		$ = Symbol.for("react.provider"),
		le = Symbol.for("react.context"),
		ae = Symbol.for("react.forward_ref"),
		W = Symbol.for("react.suspense"),
		U = Symbol.for("react.memo"),
		Q = Symbol.for("react.lazy"),
		Y = Symbol.iterator;
	function K(a) {
		return a === null || typeof a != "object" ? null : ((a = (Y && a[Y]) || a["@@iterator"]), typeof a == "function" ? a : null);
	}
	var ze = {
			isMounted: function () {
				return !1;
			},
			enqueueForceUpdate: function () {},
			enqueueReplaceState: function () {},
			enqueueSetState: function () {},
		},
		_e = Object.assign,
		q = {};
	function X(a, v, P) {
		(this.props = a), (this.context = v), (this.refs = q), (this.updater = P || ze);
	}
	(X.prototype.isReactComponent = {}),
		(X.prototype.setState = function (a, v) {
			if (typeof a != "object" && typeof a != "function" && a != null)
				throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
			this.updater.enqueueSetState(this, a, v, "setState");
		}),
		(X.prototype.forceUpdate = function (a) {
			this.updater.enqueueForceUpdate(this, a, "forceUpdate");
		});
	function vt() {}
	vt.prototype = X.prototype;
	function st(a, v, P) {
		(this.props = a), (this.context = v), (this.refs = q), (this.updater = P || ze);
	}
	var qe = (st.prototype = new vt());
	(qe.constructor = st), _e(qe, X.prototype), (qe.isPureReactComponent = !0);
	var Se = Array.isArray,
		be = Object.prototype.hasOwnProperty,
		Ne = { current: null },
		Te = { key: !0, ref: !0, __self: !0, __source: !0 };
	function We(a, v, P) {
		var V,
			I = {},
			b = null,
			H = null;
		if (v != null) for (V in (v.ref !== void 0 && (H = v.ref), v.key !== void 0 && (b = "" + v.key), v)) be.call(v, V) && !Te.hasOwnProperty(V) && (I[V] = v[V]);
		var J = arguments.length - 2;
		if (J === 1) I.children = P;
		else if (1 < J) {
			for (var Z = Array(J), Re = 0; Re < J; Re++) Z[Re] = arguments[Re + 2];
			I.children = Z;
		}
		if (a && a.defaultProps) for (V in ((J = a.defaultProps), J)) I[V] === void 0 && (I[V] = J[V]);
		return {
			$$typeof: S,
			type: a,
			key: b,
			ref: H,
			props: I,
			_owner: Ne.current,
		};
	}
	function Nt(a, v) {
		return {
			$$typeof: S,
			type: a.type,
			key: v,
			ref: a.ref,
			props: a.props,
			_owner: a._owner,
		};
	}
	function yt(a) {
		return typeof a == "object" && a !== null && a.$$typeof === S;
	}
	function Kt(a) {
		var v = { "=": "=0", ":": "=2" };
		return (
			"$" +
			a.replace(/[=:]/g, function (P) {
				return v[P];
			})
		);
	}
	var at = /\/+/g;
	function Ve(a, v) {
		return typeof a == "object" && a !== null && a.key != null ? Kt("" + a.key) : v.toString(36);
	}
	function et(a, v, P, V, I) {
		var b = typeof a;
		(b === "undefined" || b === "boolean") && (a = null);
		var H = !1;
		if (a === null) H = !0;
		else
			switch (b) {
				case "string":
				case "number":
					H = !0;
					break;
				case "object":
					switch (a.$$typeof) {
						case S:
						case T:
							H = !0;
					}
			}
		if (H)
			return (
				(H = a),
				(I = I(H)),
				(a = V === "" ? "." + Ve(H, 0) : V),
				Se(I)
					? ((P = ""),
						a != null && (P = a.replace(at, "$&/") + "/"),
						et(I, v, P, "", function (Re) {
							return Re;
						}))
					: I != null && (yt(I) && (I = Nt(I, P + (!I.key || (H && H.key === I.key) ? "" : ("" + I.key).replace(at, "$&/") + "/") + a)), v.push(I)),
				1
			);
		if (((H = 0), (V = V === "" ? "." : V + ":"), Se(a)))
			for (var J = 0; J < a.length; J++) {
				b = a[J];
				var Z = V + Ve(b, J);
				H += et(b, v, P, Z, I);
			}
		else if (((Z = K(a)), typeof Z == "function")) for (a = Z.call(a), J = 0; !(b = a.next()).done; ) (b = b.value), (Z = V + Ve(b, J++)), (H += et(b, v, P, Z, I));
		else if (b === "object")
			throw (
				((v = String(a)),
				Error(
					"Objects are not valid as a React child (found: " +
						(v === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : v) +
						"). If you meant to render a collection of children, use an array instead.",
				))
			);
		return H;
	}
	function ct(a, v, P) {
		if (a == null) return a;
		var V = [],
			I = 0;
		return (
			et(a, V, "", "", function (b) {
				return v.call(P, b, I++);
			}),
			V
		);
	}
	function je(a) {
		if (a._status === -1) {
			var v = a._result;
			(v = v()),
				v.then(
					function (P) {
						(a._status === 0 || a._status === -1) && ((a._status = 1), (a._result = P));
					},
					function (P) {
						(a._status === 0 || a._status === -1) && ((a._status = 2), (a._result = P));
					},
				),
				a._status === -1 && ((a._status = 0), (a._result = v));
		}
		if (a._status === 1) return a._result.default;
		throw a._result;
	}
	var oe = { current: null },
		C = { transition: null },
		D = {
			ReactCurrentDispatcher: oe,
			ReactCurrentBatchConfig: C,
			ReactCurrentOwner: Ne,
		};
	return (
		(F.Children = {
			map: ct,
			forEach: function (a, v, P) {
				ct(
					a,
					function () {
						v.apply(this, arguments);
					},
					P,
				);
			},
			count: function (a) {
				var v = 0;
				return (
					ct(a, function () {
						v++;
					}),
					v
				);
			},
			toArray: function (a) {
				return (
					ct(a, function (v) {
						return v;
					}) || []
				);
			},
			only: function (a) {
				if (!yt(a)) throw Error("React.Children.only expected to receive a single React element child.");
				return a;
			},
		}),
		(F.Component = X),
		(F.Fragment = m),
		(F.Profiler = O),
		(F.PureComponent = st),
		(F.StrictMode = z),
		(F.Suspense = W),
		(F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = D),
		(F.cloneElement = function (a, v, P) {
			if (a == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
			var V = _e({}, a.props),
				I = a.key,
				b = a.ref,
				H = a._owner;
			if (v != null) {
				if ((v.ref !== void 0 && ((b = v.ref), (H = Ne.current)), v.key !== void 0 && (I = "" + v.key), a.type && a.type.defaultProps)) var J = a.type.defaultProps;
				for (Z in v) be.call(v, Z) && !Te.hasOwnProperty(Z) && (V[Z] = v[Z] === void 0 && J !== void 0 ? J[Z] : v[Z]);
			}
			var Z = arguments.length - 2;
			if (Z === 1) V.children = P;
			else if (1 < Z) {
				J = Array(Z);
				for (var Re = 0; Re < Z; Re++) J[Re] = arguments[Re + 2];
				V.children = J;
			}
			return { $$typeof: S, type: a.type, key: I, ref: b, props: V, _owner: H };
		}),
		(F.createContext = function (a) {
			return (
				(a = {
					$$typeof: le,
					_currentValue: a,
					_currentValue2: a,
					_threadCount: 0,
					Provider: null,
					Consumer: null,
					_defaultValue: null,
					_globalName: null,
				}),
				(a.Provider = { $$typeof: $, _context: a }),
				(a.Consumer = a)
			);
		}),
		(F.createElement = We),
		(F.createFactory = function (a) {
			var v = We.bind(null, a);
			return (v.type = a), v;
		}),
		(F.createRef = function () {
			return { current: null };
		}),
		(F.forwardRef = function (a) {
			return { $$typeof: ae, render: a };
		}),
		(F.isValidElement = yt),
		(F.lazy = function (a) {
			return { $$typeof: Q, _payload: { _status: -1, _result: a }, _init: je };
		}),
		(F.memo = function (a, v) {
			return { $$typeof: U, type: a, compare: v === void 0 ? null : v };
		}),
		(F.startTransition = function (a) {
			var v = C.transition;
			C.transition = {};
			try {
				a();
			} finally {
				C.transition = v;
			}
		}),
		(F.unstable_act = function () {
			throw Error("act(...) is not supported in production builds of React.");
		}),
		(F.useCallback = function (a, v) {
			return oe.current.useCallback(a, v);
		}),
		(F.useContext = function (a) {
			return oe.current.useContext(a);
		}),
		(F.useDebugValue = function () {}),
		(F.useDeferredValue = function (a) {
			return oe.current.useDeferredValue(a);
		}),
		(F.useEffect = function (a, v) {
			return oe.current.useEffect(a, v);
		}),
		(F.useId = function () {
			return oe.current.useId();
		}),
		(F.useImperativeHandle = function (a, v, P) {
			return oe.current.useImperativeHandle(a, v, P);
		}),
		(F.useInsertionEffect = function (a, v) {
			return oe.current.useInsertionEffect(a, v);
		}),
		(F.useLayoutEffect = function (a, v) {
			return oe.current.useLayoutEffect(a, v);
		}),
		(F.useMemo = function (a, v) {
			return oe.current.useMemo(a, v);
		}),
		(F.useReducer = function (a, v, P) {
			return oe.current.useReducer(a, v, P);
		}),
		(F.useRef = function (a) {
			return oe.current.useRef(a);
		}),
		(F.useState = function (a) {
			return oe.current.useState(a);
		}),
		(F.useSyncExternalStore = function (a, v, P) {
			return oe.current.useSyncExternalStore(a, v, P);
		}),
		(F.useTransition = function () {
			return oe.current.useTransition();
		}),
		(F.version = "18.2.0"),
		F
	);
}
var La;
function zi() {
	return La || ((La = 1), (Ei.exports = Vf())), Ei.exports;
}
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Pa;
function Af() {
	if (Pa) return yr;
	Pa = 1;
	var S = zi(),
		T = Symbol.for("react.element"),
		m = Symbol.for("react.fragment"),
		z = Object.prototype.hasOwnProperty,
		O = S.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
		$ = { key: !0, ref: !0, __self: !0, __source: !0 };
	function le(ae, W, U) {
		var Q,
			Y = {},
			K = null,
			ze = null;
		U !== void 0 && (K = "" + U), W.key !== void 0 && (K = "" + W.key), W.ref !== void 0 && (ze = W.ref);
		for (Q in W) z.call(W, Q) && !$.hasOwnProperty(Q) && (Y[Q] = W[Q]);
		if (ae && ae.defaultProps) for (Q in ((W = ae.defaultProps), W)) Y[Q] === void 0 && (Y[Q] = W[Q]);
		return {
			$$typeof: T,
			type: ae,
			key: K,
			ref: ze,
			props: Y,
			_owner: O.current,
		};
	}
	return (yr.Fragment = m), (yr.jsx = le), (yr.jsxs = le), yr;
}
var za;
function Bf() {
	return za || ((za = 1), (xi.exports = Af())), xi.exports;
}
var k = Bf(),
	Je = zi();
const Hf = Ia(Je);
var Pl = {},
	_i = { exports: {} },
	Ue = {},
	Ni = { exports: {} },
	Li = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ta;
function $f() {
	return (
		Ta ||
			((Ta = 1),
			(function (S) {
				function T(C, D) {
					var a = C.length;
					C.push(D);
					e: for (; 0 < a; ) {
						var v = (a - 1) >>> 1,
							P = C[v];
						if (0 < O(P, D)) (C[v] = D), (C[a] = P), (a = v);
						else break e;
					}
				}
				function m(C) {
					return C.length === 0 ? null : C[0];
				}
				function z(C) {
					if (C.length === 0) return null;
					var D = C[0],
						a = C.pop();
					if (a !== D) {
						C[0] = a;
						e: for (var v = 0, P = C.length, V = P >>> 1; v < V; ) {
							var I = 2 * (v + 1) - 1,
								b = C[I],
								H = I + 1,
								J = C[H];
							if (0 > O(b, a)) H < P && 0 > O(J, b) ? ((C[v] = J), (C[H] = a), (v = H)) : ((C[v] = b), (C[I] = a), (v = I));
							else if (H < P && 0 > O(J, a)) (C[v] = J), (C[H] = a), (v = H);
							else break e;
						}
					}
					return D;
				}
				function O(C, D) {
					var a = C.sortIndex - D.sortIndex;
					return a !== 0 ? a : C.id - D.id;
				}
				if (typeof performance == "object" && typeof performance.now == "function") {
					var $ = performance;
					S.unstable_now = function () {
						return $.now();
					};
				} else {
					var le = Date,
						ae = le.now();
					S.unstable_now = function () {
						return le.now() - ae;
					};
				}
				var W = [],
					U = [],
					Q = 1,
					Y = null,
					K = 3,
					ze = !1,
					_e = !1,
					q = !1,
					X = typeof setTimeout == "function" ? setTimeout : null,
					vt = typeof clearTimeout == "function" ? clearTimeout : null,
					st = typeof setImmediate < "u" ? setImmediate : null;
				typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
				function qe(C) {
					for (var D = m(U); D !== null; ) {
						if (D.callback === null) z(U);
						else if (D.startTime <= C) z(U), (D.sortIndex = D.expirationTime), T(W, D);
						else break;
						D = m(U);
					}
				}
				function Se(C) {
					if (((q = !1), qe(C), !_e))
						if (m(W) !== null) (_e = !0), je(be);
						else {
							var D = m(U);
							D !== null && oe(Se, D.startTime - C);
						}
				}
				function be(C, D) {
					(_e = !1), q && ((q = !1), vt(We), (We = -1)), (ze = !0);
					var a = K;
					try {
						for (qe(D), Y = m(W); Y !== null && (!(Y.expirationTime > D) || (C && !Kt())); ) {
							var v = Y.callback;
							if (typeof v == "function") {
								(Y.callback = null), (K = Y.priorityLevel);
								var P = v(Y.expirationTime <= D);
								(D = S.unstable_now()), typeof P == "function" ? (Y.callback = P) : Y === m(W) && z(W), qe(D);
							} else z(W);
							Y = m(W);
						}
						if (Y !== null) var V = !0;
						else {
							var I = m(U);
							I !== null && oe(Se, I.startTime - D), (V = !1);
						}
						return V;
					} finally {
						(Y = null), (K = a), (ze = !1);
					}
				}
				var Ne = !1,
					Te = null,
					We = -1,
					Nt = 5,
					yt = -1;
				function Kt() {
					return !(S.unstable_now() - yt < Nt);
				}
				function at() {
					if (Te !== null) {
						var C = S.unstable_now();
						yt = C;
						var D = !0;
						try {
							D = Te(!0, C);
						} finally {
							D ? Ve() : ((Ne = !1), (Te = null));
						}
					} else Ne = !1;
				}
				var Ve;
				if (typeof st == "function")
					Ve = function () {
						st(at);
					};
				else if (typeof MessageChannel < "u") {
					var et = new MessageChannel(),
						ct = et.port2;
					(et.port1.onmessage = at),
						(Ve = function () {
							ct.postMessage(null);
						});
				} else
					Ve = function () {
						X(at, 0);
					};
				function je(C) {
					(Te = C), Ne || ((Ne = !0), Ve());
				}
				function oe(C, D) {
					We = X(function () {
						C(S.unstable_now());
					}, D);
				}
				(S.unstable_IdlePriority = 5),
					(S.unstable_ImmediatePriority = 1),
					(S.unstable_LowPriority = 4),
					(S.unstable_NormalPriority = 3),
					(S.unstable_Profiling = null),
					(S.unstable_UserBlockingPriority = 2),
					(S.unstable_cancelCallback = function (C) {
						C.callback = null;
					}),
					(S.unstable_continueExecution = function () {
						_e || ze || ((_e = !0), je(be));
					}),
					(S.unstable_forceFrameRate = function (C) {
						0 > C || 125 < C
							? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported")
							: (Nt = 0 < C ? Math.floor(1e3 / C) : 5);
					}),
					(S.unstable_getCurrentPriorityLevel = function () {
						return K;
					}),
					(S.unstable_getFirstCallbackNode = function () {
						return m(W);
					}),
					(S.unstable_next = function (C) {
						switch (K) {
							case 1:
							case 2:
							case 3:
								var D = 3;
								break;
							default:
								D = K;
						}
						var a = K;
						K = D;
						try {
							return C();
						} finally {
							K = a;
						}
					}),
					(S.unstable_pauseExecution = function () {}),
					(S.unstable_requestPaint = function () {}),
					(S.unstable_runWithPriority = function (C, D) {
						switch (C) {
							case 1:
							case 2:
							case 3:
							case 4:
							case 5:
								break;
							default:
								C = 3;
						}
						var a = K;
						K = C;
						try {
							return D();
						} finally {
							K = a;
						}
					}),
					(S.unstable_scheduleCallback = function (C, D, a) {
						var v = S.unstable_now();
						switch ((typeof a == "object" && a !== null ? ((a = a.delay), (a = typeof a == "number" && 0 < a ? v + a : v)) : (a = v), C)) {
							case 1:
								var P = -1;
								break;
							case 2:
								P = 250;
								break;
							case 5:
								P = 1073741823;
								break;
							case 4:
								P = 1e4;
								break;
							default:
								P = 5e3;
						}
						return (
							(P = a + P),
							(C = {
								id: Q++,
								callback: D,
								priorityLevel: C,
								startTime: a,
								expirationTime: P,
								sortIndex: -1,
							}),
							a > v
								? ((C.sortIndex = a), T(U, C), m(W) === null && C === m(U) && (q ? (vt(We), (We = -1)) : (q = !0), oe(Se, a - v)))
								: ((C.sortIndex = P), T(W, C), _e || ze || ((_e = !0), je(be))),
							C
						);
					}),
					(S.unstable_shouldYield = Kt),
					(S.unstable_wrapCallback = function (C) {
						var D = K;
						return function () {
							var a = K;
							K = D;
							try {
								return C.apply(this, arguments);
							} finally {
								K = a;
							}
						};
					});
			})(Li)),
		Li
	);
}
var ja;
function Wf() {
	return ja || ((ja = 1), (Ni.exports = $f())), Ni.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ra;
function Qf() {
	if (Ra) return Ue;
	Ra = 1;
	var S = zi(),
		T = Wf();
	function m(e) {
		for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	var z = new Set(),
		O = {};
	function $(e, t) {
		le(e, t), le(e + "Capture", t);
	}
	function le(e, t) {
		for (O[e] = t, e = 0; e < t.length; e++) z.add(t[e]);
	}
	var ae = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
		W = Object.prototype.hasOwnProperty,
		U =
			/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
		Q = {},
		Y = {};
	function K(e) {
		return W.call(Y, e) ? !0 : W.call(Q, e) ? !1 : U.test(e) ? (Y[e] = !0) : ((Q[e] = !0), !1);
	}
	function ze(e, t, n, r) {
		if (n !== null && n.type === 0) return !1;
		switch (typeof t) {
			case "function":
			case "symbol":
				return !0;
			case "boolean":
				return r ? !1 : n !== null ? !n.acceptsBooleans : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
			default:
				return !1;
		}
	}
	function _e(e, t, n, r) {
		if (t === null || typeof t > "u" || ze(e, t, n, r)) return !0;
		if (r) return !1;
		if (n !== null)
			switch (n.type) {
				case 3:
					return !t;
				case 4:
					return t === !1;
				case 5:
					return isNaN(t);
				case 6:
					return isNaN(t) || 1 > t;
			}
		return !1;
	}
	function q(e, t, n, r, l, u, i) {
		(this.acceptsBooleans = t === 2 || t === 3 || t === 4),
			(this.attributeName = r),
			(this.attributeNamespace = l),
			(this.mustUseProperty = n),
			(this.propertyName = e),
			(this.type = t),
			(this.sanitizeURL = u),
			(this.removeEmptyString = i);
	}
	var X = {};
	"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function (e) {
		X[e] = new q(e, 0, !1, e, null, !1, !1);
	}),
		[
			["acceptCharset", "accept-charset"],
			["className", "class"],
			["htmlFor", "for"],
			["httpEquiv", "http-equiv"],
		].forEach(function (e) {
			var t = e[0];
			X[t] = new q(t, 1, !1, e[1], null, !1, !1);
		}),
		["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
			X[e] = new q(e, 2, !1, e.toLowerCase(), null, !1, !1);
		}),
		["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function (e) {
			X[e] = new q(e, 2, !1, e, null, !1, !1);
		}),
		"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
			.split(" ")
			.forEach(function (e) {
				X[e] = new q(e, 3, !1, e.toLowerCase(), null, !1, !1);
			}),
		["checked", "multiple", "muted", "selected"].forEach(function (e) {
			X[e] = new q(e, 3, !0, e, null, !1, !1);
		}),
		["capture", "download"].forEach(function (e) {
			X[e] = new q(e, 4, !1, e, null, !1, !1);
		}),
		["cols", "rows", "size", "span"].forEach(function (e) {
			X[e] = new q(e, 6, !1, e, null, !1, !1);
		}),
		["rowSpan", "start"].forEach(function (e) {
			X[e] = new q(e, 5, !1, e.toLowerCase(), null, !1, !1);
		});
	var vt = /[\-:]([a-z])/g;
	function st(e) {
		return e[1].toUpperCase();
	}
	"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
		.split(" ")
		.forEach(function (e) {
			var t = e.replace(vt, st);
			X[t] = new q(t, 1, !1, e, null, !1, !1);
		}),
		"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function (e) {
			var t = e.replace(vt, st);
			X[t] = new q(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
		}),
		["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
			var t = e.replace(vt, st);
			X[t] = new q(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
		}),
		["tabIndex", "crossOrigin"].forEach(function (e) {
			X[e] = new q(e, 1, !1, e.toLowerCase(), null, !1, !1);
		}),
		(X.xlinkHref = new q("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1)),
		["src", "href", "action", "formAction"].forEach(function (e) {
			X[e] = new q(e, 1, !1, e.toLowerCase(), null, !0, !0);
		});
	function qe(e, t, n, r) {
		var l = X.hasOwnProperty(t) ? X[t] : null;
		(l !== null ? l.type !== 0 : r || !(2 < t.length) || (t[0] !== "o" && t[0] !== "O") || (t[1] !== "n" && t[1] !== "N")) &&
			(_e(t, n, l, r) && (n = null),
			r || l === null
				? K(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
				: l.mustUseProperty
					? (e[l.propertyName] = n === null ? (l.type === 3 ? !1 : "") : n)
					: ((t = l.attributeName),
						(r = l.attributeNamespace),
						n === null ? e.removeAttribute(t) : ((l = l.type), (n = l === 3 || (l === 4 && n === !0) ? "" : "" + n), r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
	}
	var Se = S.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
		be = Symbol.for("react.element"),
		Ne = Symbol.for("react.portal"),
		Te = Symbol.for("react.fragment"),
		We = Symbol.for("react.strict_mode"),
		Nt = Symbol.for("react.profiler"),
		yt = Symbol.for("react.provider"),
		Kt = Symbol.for("react.context"),
		at = Symbol.for("react.forward_ref"),
		Ve = Symbol.for("react.suspense"),
		et = Symbol.for("react.suspense_list"),
		ct = Symbol.for("react.memo"),
		je = Symbol.for("react.lazy"),
		oe = Symbol.for("react.offscreen"),
		C = Symbol.iterator;
	function D(e) {
		return e === null || typeof e != "object" ? null : ((e = (C && e[C]) || e["@@iterator"]), typeof e == "function" ? e : null);
	}
	var a = Object.assign,
		v;
	function P(e) {
		if (v === void 0)
			try {
				throw Error();
			} catch (n) {
				var t = n.stack.trim().match(/\n( *(at )?)/);
				v = (t && t[1]) || "";
			}
		return (
			`
` +
			v +
			e
		);
	}
	var V = !1;
	function I(e, t) {
		if (!e || V) return "";
		V = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			if (t)
				if (
					((t = function () {
						throw Error();
					}),
					Object.defineProperty(t.prototype, "props", {
						set: function () {
							throw Error();
						},
					}),
					typeof Reflect == "object" && Reflect.construct)
				) {
					try {
						Reflect.construct(t, []);
					} catch (p) {
						var r = p;
					}
					Reflect.construct(e, [], t);
				} else {
					try {
						t.call();
					} catch (p) {
						r = p;
					}
					e.call(t.prototype);
				}
			else {
				try {
					throw Error();
				} catch (p) {
					r = p;
				}
				e();
			}
		} catch (p) {
			if (p && r && typeof p.stack == "string") {
				for (
					var l = p.stack.split(`
`),
						u = r.stack.split(`
`),
						i = l.length - 1,
						o = u.length - 1;
					1 <= i && 0 <= o && l[i] !== u[o];
				)
					o--;
				for (; 1 <= i && 0 <= o; i--, o--)
					if (l[i] !== u[o]) {
						if (i !== 1 || o !== 1)
							do
								if ((i--, o--, 0 > o || l[i] !== u[o])) {
									var s =
										`
` + l[i].replace(" at new ", " at ");
									return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
								}
							while (1 <= i && 0 <= o);
						break;
					}
			}
		} finally {
			(V = !1), (Error.prepareStackTrace = n);
		}
		return (e = e ? e.displayName || e.name : "") ? P(e) : "";
	}
	function b(e) {
		switch (e.tag) {
			case 5:
				return P(e.type);
			case 16:
				return P("Lazy");
			case 13:
				return P("Suspense");
			case 19:
				return P("SuspenseList");
			case 0:
			case 2:
			case 15:
				return (e = I(e.type, !1)), e;
			case 11:
				return (e = I(e.type.render, !1)), e;
			case 1:
				return (e = I(e.type, !0)), e;
			default:
				return "";
		}
	}
	function H(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case Te:
				return "Fragment";
			case Ne:
				return "Portal";
			case Nt:
				return "Profiler";
			case We:
				return "StrictMode";
			case Ve:
				return "Suspense";
			case et:
				return "SuspenseList";
		}
		if (typeof e == "object")
			switch (e.$$typeof) {
				case Kt:
					return (e.displayName || "Context") + ".Consumer";
				case yt:
					return (e._context.displayName || "Context") + ".Provider";
				case at:
					var t = e.render;
					return (e = e.displayName), e || ((e = t.displayName || t.name || ""), (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")), e;
				case ct:
					return (t = e.displayName || null), t !== null ? t : H(e.type) || "Memo";
				case je:
					(t = e._payload), (e = e._init);
					try {
						return H(e(t));
					} catch {}
			}
		return null;
	}
	function J(e) {
		var t = e.type;
		switch (e.tag) {
			case 24:
				return "Cache";
			case 9:
				return (t.displayName || "Context") + ".Consumer";
			case 10:
				return (t._context.displayName || "Context") + ".Provider";
			case 18:
				return "DehydratedFragment";
			case 11:
				return (e = t.render), (e = e.displayName || e.name || ""), t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
			case 7:
				return "Fragment";
			case 5:
				return t;
			case 4:
				return "Portal";
			case 3:
				return "Root";
			case 6:
				return "Text";
			case 16:
				return H(t);
			case 8:
				return t === We ? "StrictMode" : "Mode";
			case 22:
				return "Offscreen";
			case 12:
				return "Profiler";
			case 21:
				return "Scope";
			case 13:
				return "Suspense";
			case 19:
				return "SuspenseList";
			case 25:
				return "TracingMarker";
			case 1:
			case 0:
			case 17:
			case 2:
			case 14:
			case 15:
				if (typeof t == "function") return t.displayName || t.name || null;
				if (typeof t == "string") return t;
		}
		return null;
	}
	function Z(e) {
		switch (typeof e) {
			case "boolean":
			case "number":
			case "string":
			case "undefined":
				return e;
			case "object":
				return e;
			default:
				return "";
		}
	}
	function Re(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Ba(e) {
		var t = Re(e) ? "checked" : "value",
			n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
			r = "" + e[t];
		if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
			var l = n.get,
				u = n.set;
			return (
				Object.defineProperty(e, t, {
					configurable: !0,
					get: function () {
						return l.call(this);
					},
					set: function (i) {
						(r = "" + i), u.call(this, i);
					},
				}),
				Object.defineProperty(e, t, { enumerable: n.enumerable }),
				{
					getValue: function () {
						return r;
					},
					setValue: function (i) {
						r = "" + i;
					},
					stopTracking: function () {
						(e._valueTracker = null), delete e[t];
					},
				}
			);
		}
	}
	function gr(e) {
		e._valueTracker || (e._valueTracker = Ba(e));
	}
	function Ti(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(),
			r = "";
		return e && (r = Re(e) ? (e.checked ? "true" : "false") : e.value), (e = r), e !== n ? (t.setValue(e), !0) : !1;
	}
	function wr(e) {
		if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Tl(e, t) {
		var n = t.checked;
		return a({}, t, {
			defaultChecked: void 0,
			defaultValue: void 0,
			value: void 0,
			checked: n ?? e._wrapperState.initialChecked,
		});
	}
	function ji(e, t) {
		var n = t.defaultValue == null ? "" : t.defaultValue,
			r = t.checked != null ? t.checked : t.defaultChecked;
		(n = Z(t.value != null ? t.value : n)),
			(e._wrapperState = {
				initialChecked: r,
				initialValue: n,
				controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null,
			});
	}
	function Ri(e, t) {
		(t = t.checked), t != null && qe(e, "checked", t, !1);
	}
	function jl(e, t) {
		Ri(e, t);
		var n = Z(t.value),
			r = t.type;
		if (n != null) r === "number" ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
		else if (r === "submit" || r === "reset") {
			e.removeAttribute("value");
			return;
		}
		t.hasOwnProperty("value") ? Rl(e, t.type, n) : t.hasOwnProperty("defaultValue") && Rl(e, t.type, Z(t.defaultValue)),
			t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
	}
	function Di(e, t, n) {
		if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
			var r = t.type;
			if (!((r !== "submit" && r !== "reset") || (t.value !== void 0 && t.value !== null))) return;
			(t = "" + e._wrapperState.initialValue), n || t === e.value || (e.value = t), (e.defaultValue = t);
		}
		(n = e.name), n !== "" && (e.name = ""), (e.defaultChecked = !!e._wrapperState.initialChecked), n !== "" && (e.name = n);
	}
	function Rl(e, t, n) {
		(t !== "number" || wr(e.ownerDocument) !== e) && (n == null ? (e.defaultValue = "" + e._wrapperState.initialValue) : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
	}
	var Rn = Array.isArray;
	function on(e, t, n, r) {
		if (((e = e.options), t)) {
			t = {};
			for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
			for (n = 0; n < e.length; n++) (l = t.hasOwnProperty("$" + e[n].value)), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Z(n), t = null, l = 0; l < e.length; l++) {
				if (e[l].value === n) {
					(e[l].selected = !0), r && (e[l].defaultSelected = !0);
					return;
				}
				t !== null || e[l].disabled || (t = e[l]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Dl(e, t) {
		if (t.dangerouslySetInnerHTML != null) throw Error(m(91));
		return a({}, t, {
			value: void 0,
			defaultValue: void 0,
			children: "" + e._wrapperState.initialValue,
		});
	}
	function Mi(e, t) {
		var n = t.value;
		if (n == null) {
			if (((n = t.children), (t = t.defaultValue), n != null)) {
				if (t != null) throw Error(m(92));
				if (Rn(n)) {
					if (1 < n.length) throw Error(m(93));
					n = n[0];
				}
				t = n;
			}
			t == null && (t = ""), (n = t);
		}
		e._wrapperState = { initialValue: Z(n) };
	}
	function Oi(e, t) {
		var n = Z(t.value),
			r = Z(t.defaultValue);
		n != null && ((n = "" + n), n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
	}
	function Ii(e) {
		var t = e.textContent;
		t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
	}
	function Fi(e) {
		switch (e) {
			case "svg":
				return "http://www.w3.org/2000/svg";
			case "math":
				return "http://www.w3.org/1998/Math/MathML";
			default:
				return "http://www.w3.org/1999/xhtml";
		}
	}
	function Ml(e, t) {
		return e == null || e === "http://www.w3.org/1999/xhtml" ? Fi(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
	}
	var Sr,
		Ui = (function (e) {
			return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
				? function (t, n, r, l) {
						MSApp.execUnsafeLocalFunction(function () {
							return e(t, n, r, l);
						});
					}
				: e;
		})(function (e, t) {
			if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
			else {
				for (Sr = Sr || document.createElement("div"), Sr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Sr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
				for (; t.firstChild; ) e.appendChild(t.firstChild);
			}
		});
	function Dn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Mn = {
			animationIterationCount: !0,
			aspectRatio: !0,
			borderImageOutset: !0,
			borderImageSlice: !0,
			borderImageWidth: !0,
			boxFlex: !0,
			boxFlexGroup: !0,
			boxOrdinalGroup: !0,
			columnCount: !0,
			columns: !0,
			flex: !0,
			flexGrow: !0,
			flexPositive: !0,
			flexShrink: !0,
			flexNegative: !0,
			flexOrder: !0,
			gridArea: !0,
			gridRow: !0,
			gridRowEnd: !0,
			gridRowSpan: !0,
			gridRowStart: !0,
			gridColumn: !0,
			gridColumnEnd: !0,
			gridColumnSpan: !0,
			gridColumnStart: !0,
			fontWeight: !0,
			lineClamp: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			tabSize: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0,
			fillOpacity: !0,
			floodOpacity: !0,
			stopOpacity: !0,
			strokeDasharray: !0,
			strokeDashoffset: !0,
			strokeMiterlimit: !0,
			strokeOpacity: !0,
			strokeWidth: !0,
		},
		Ha = ["Webkit", "ms", "Moz", "O"];
	Object.keys(Mn).forEach(function (e) {
		Ha.forEach(function (t) {
			(t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Mn[t] = Mn[e]);
		});
	});
	function Vi(e, t, n) {
		return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || (Mn.hasOwnProperty(e) && Mn[e]) ? ("" + t).trim() : t + "px";
	}
	function Ai(e, t) {
		e = e.style;
		for (var n in t)
			if (t.hasOwnProperty(n)) {
				var r = n.indexOf("--") === 0,
					l = Vi(n, t[n], r);
				n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : (e[n] = l);
			}
	}
	var $a = a(
		{ menuitem: !0 },
		{
			area: !0,
			base: !0,
			br: !0,
			col: !0,
			embed: !0,
			hr: !0,
			img: !0,
			input: !0,
			keygen: !0,
			link: !0,
			meta: !0,
			param: !0,
			source: !0,
			track: !0,
			wbr: !0,
		},
	);
	function Ol(e, t) {
		if (t) {
			if ($a[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(m(137, e));
			if (t.dangerouslySetInnerHTML != null) {
				if (t.children != null) throw Error(m(60));
				if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(m(61));
			}
			if (t.style != null && typeof t.style != "object") throw Error(m(62));
		}
	}
	function Il(e, t) {
		if (e.indexOf("-") === -1) return typeof t.is == "string";
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph":
				return !1;
			default:
				return !0;
		}
	}
	var Fl = null;
	function Ul(e) {
		return (e = e.target || e.srcElement || window), e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var Vl = null,
		sn = null,
		an = null;
	function Bi(e) {
		if ((e = nr(e))) {
			if (typeof Vl != "function") throw Error(m(280));
			var t = e.stateNode;
			t && ((t = $r(t)), Vl(e.stateNode, e.type, t));
		}
	}
	function Hi(e) {
		sn ? (an ? an.push(e) : (an = [e])) : (sn = e);
	}
	function $i() {
		if (sn) {
			var e = sn,
				t = an;
			if (((an = sn = null), Bi(e), t)) for (e = 0; e < t.length; e++) Bi(t[e]);
		}
	}
	function Wi(e, t) {
		return e(t);
	}
	function Qi() {}
	var Al = !1;
	function Ki(e, t, n) {
		if (Al) return e(t, n);
		Al = !0;
		try {
			return Wi(e, t, n);
		} finally {
			(Al = !1), (sn !== null || an !== null) && (Qi(), $i());
		}
	}
	function On(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = $r(n);
		if (r === null) return null;
		n = r[t];
		e: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || ((e = e.type), (r = !(e === "button" || e === "input" || e === "select" || e === "textarea"))), (e = !r);
				break e;
			default:
				e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(m(231, t, typeof n));
		return n;
	}
	var Bl = !1;
	if (ae)
		try {
			var In = {};
			Object.defineProperty(In, "passive", {
				get: function () {
					Bl = !0;
				},
			}),
				window.addEventListener("test", In, In),
				window.removeEventListener("test", In, In);
		} catch {
			Bl = !1;
		}
	function Wa(e, t, n, r, l, u, i, o, s) {
		var p = Array.prototype.slice.call(arguments, 3);
		try {
			t.apply(n, p);
		} catch (y) {
			this.onError(y);
		}
	}
	var Fn = !1,
		kr = null,
		Cr = !1,
		Hl = null,
		Qa = {
			onError: function (e) {
				(Fn = !0), (kr = e);
			},
		};
	function Ka(e, t, n, r, l, u, i, o, s) {
		(Fn = !1), (kr = null), Wa.apply(Qa, arguments);
	}
	function Za(e, t, n, r, l, u, i, o, s) {
		if ((Ka.apply(this, arguments), Fn)) {
			if (Fn) {
				var p = kr;
				(Fn = !1), (kr = null);
			} else throw Error(m(198));
			Cr || ((Cr = !0), (Hl = p));
		}
	}
	function Zt(e) {
		var t = e,
			n = e;
		if (e.alternate) for (; t.return; ) t = t.return;
		else {
			e = t;
			do (t = e), (t.flags & 4098) !== 0 && (n = t.return), (e = t.return);
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function Zi(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null)) return t.dehydrated;
		}
		return null;
	}
	function Yi(e) {
		if (Zt(e) !== e) throw Error(m(188));
	}
	function Ya(e) {
		var t = e.alternate;
		if (!t) {
			if (((t = Zt(e)), t === null)) throw Error(m(188));
			return t !== e ? null : e;
		}
		for (var n = e, r = t; ; ) {
			var l = n.return;
			if (l === null) break;
			var u = l.alternate;
			if (u === null) {
				if (((r = l.return), r !== null)) {
					n = r;
					continue;
				}
				break;
			}
			if (l.child === u.child) {
				for (u = l.child; u; ) {
					if (u === n) return Yi(l), e;
					if (u === r) return Yi(l), t;
					u = u.sibling;
				}
				throw Error(m(188));
			}
			if (n.return !== r.return) (n = l), (r = u);
			else {
				for (var i = !1, o = l.child; o; ) {
					if (o === n) {
						(i = !0), (n = l), (r = u);
						break;
					}
					if (o === r) {
						(i = !0), (r = l), (n = u);
						break;
					}
					o = o.sibling;
				}
				if (!i) {
					for (o = u.child; o; ) {
						if (o === n) {
							(i = !0), (n = u), (r = l);
							break;
						}
						if (o === r) {
							(i = !0), (r = u), (n = l);
							break;
						}
						o = o.sibling;
					}
					if (!i) throw Error(m(189));
				}
			}
			if (n.alternate !== r) throw Error(m(190));
		}
		if (n.tag !== 3) throw Error(m(188));
		return n.stateNode.current === n ? e : t;
	}
	function Gi(e) {
		return (e = Ya(e)), e !== null ? Xi(e) : null;
	}
	function Xi(e) {
		if (e.tag === 5 || e.tag === 6) return e;
		for (e = e.child; e !== null; ) {
			var t = Xi(e);
			if (t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var Ji = T.unstable_scheduleCallback,
		qi = T.unstable_cancelCallback,
		Ga = T.unstable_shouldYield,
		Xa = T.unstable_requestPaint,
		ce = T.unstable_now,
		Ja = T.unstable_getCurrentPriorityLevel,
		$l = T.unstable_ImmediatePriority,
		bi = T.unstable_UserBlockingPriority,
		xr = T.unstable_NormalPriority,
		qa = T.unstable_LowPriority,
		eo = T.unstable_IdlePriority,
		Er = null,
		ft = null;
	function ba(e) {
		if (ft && typeof ft.onCommitFiberRoot == "function")
			try {
				ft.onCommitFiberRoot(Er, e, void 0, (e.current.flags & 128) === 128);
			} catch {}
	}
	var tt = Math.clz32 ? Math.clz32 : nc,
		ec = Math.log,
		tc = Math.LN2;
	function nc(e) {
		return (e >>>= 0), e === 0 ? 32 : (31 - ((ec(e) / tc) | 0)) | 0;
	}
	var _r = 64,
		Nr = 4194304;
	function Un(e) {
		switch (e & -e) {
			case 1:
				return 1;
			case 2:
				return 2;
			case 4:
				return 4;
			case 8:
				return 8;
			case 16:
				return 16;
			case 32:
				return 32;
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
				return e & 4194240;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864:
				return e & 130023424;
			case 134217728:
				return 134217728;
			case 268435456:
				return 268435456;
			case 536870912:
				return 536870912;
			case 1073741824:
				return 1073741824;
			default:
				return e;
		}
	}
	function Lr(e, t) {
		var n = e.pendingLanes;
		if (n === 0) return 0;
		var r = 0,
			l = e.suspendedLanes,
			u = e.pingedLanes,
			i = n & 268435455;
		if (i !== 0) {
			var o = i & ~l;
			o !== 0 ? (r = Un(o)) : ((u &= i), u !== 0 && (r = Un(u)));
		} else (i = n & ~l), i !== 0 ? (r = Un(i)) : u !== 0 && (r = Un(u));
		if (r === 0) return 0;
		if (t !== 0 && t !== r && (t & l) === 0 && ((l = r & -r), (u = t & -t), l >= u || (l === 16 && (u & 4194240) !== 0))) return t;
		if (((r & 4) !== 0 && (r |= n & 16), (t = e.entangledLanes), t !== 0)) for (e = e.entanglements, t &= r; 0 < t; ) (n = 31 - tt(t)), (l = 1 << n), (r |= e[n]), (t &= ~l);
		return r;
	}
	function rc(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
				return t + 250;
			case 8:
			case 16:
			case 32:
			case 64:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
				return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
			case 67108864:
				return -1;
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824:
				return -1;
			default:
				return -1;
		}
	}
	function lc(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, u = e.pendingLanes; 0 < u; ) {
			var i = 31 - tt(u),
				o = 1 << i,
				s = l[i];
			s === -1 ? ((o & n) === 0 || (o & r) !== 0) && (l[i] = rc(o, t)) : s <= t && (e.expiredLanes |= o), (u &= ~o);
		}
	}
	function Wl(e) {
		return (e = e.pendingLanes & -1073741825), e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
	}
	function to() {
		var e = _r;
		return (_r <<= 1), (_r & 4194240) === 0 && (_r = 64), e;
	}
	function Ql(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Vn(e, t, n) {
		(e.pendingLanes |= t), t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)), (e = e.eventTimes), (t = 31 - tt(t)), (e[t] = n);
	}
	function uc(e, t) {
		var n = e.pendingLanes & ~t;
		(e.pendingLanes = t), (e.suspendedLanes = 0), (e.pingedLanes = 0), (e.expiredLanes &= t), (e.mutableReadLanes &= t), (e.entangledLanes &= t), (t = e.entanglements);
		var r = e.eventTimes;
		for (e = e.expirationTimes; 0 < n; ) {
			var l = 31 - tt(n),
				u = 1 << l;
			(t[l] = 0), (r[l] = -1), (e[l] = -1), (n &= ~u);
		}
	}
	function Kl(e, t) {
		var n = (e.entangledLanes |= t);
		for (e = e.entanglements; n; ) {
			var r = 31 - tt(n),
				l = 1 << r;
			(l & t) | (e[r] & t) && (e[r] |= t), (n &= ~l);
		}
	}
	var G = 0;
	function no(e) {
		return (e &= -e), 1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1;
	}
	var ro,
		Zl,
		lo,
		uo,
		io,
		Yl = !1,
		Pr = [],
		Lt = null,
		Pt = null,
		zt = null,
		An = new Map(),
		Bn = new Map(),
		Tt = [],
		ic =
			"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
				" ",
			);
	function oo(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Lt = null;
				break;
			case "dragenter":
			case "dragleave":
				Pt = null;
				break;
			case "mouseover":
			case "mouseout":
				zt = null;
				break;
			case "pointerover":
			case "pointerout":
				An.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture":
				Bn.delete(t.pointerId);
		}
	}
	function Hn(e, t, n, r, l, u) {
		return e === null || e.nativeEvent !== u
			? ((e = {
					blockedOn: t,
					domEventName: n,
					eventSystemFlags: r,
					nativeEvent: u,
					targetContainers: [l],
				}),
				t !== null && ((t = nr(t)), t !== null && Zl(t)),
				e)
			: ((e.eventSystemFlags |= r), (t = e.targetContainers), l !== null && t.indexOf(l) === -1 && t.push(l), e);
	}
	function oc(e, t, n, r, l) {
		switch (t) {
			case "focusin":
				return (Lt = Hn(Lt, e, t, n, r, l)), !0;
			case "dragenter":
				return (Pt = Hn(Pt, e, t, n, r, l)), !0;
			case "mouseover":
				return (zt = Hn(zt, e, t, n, r, l)), !0;
			case "pointerover":
				var u = l.pointerId;
				return An.set(u, Hn(An.get(u) || null, e, t, n, r, l)), !0;
			case "gotpointercapture":
				return (u = l.pointerId), Bn.set(u, Hn(Bn.get(u) || null, e, t, n, r, l)), !0;
		}
		return !1;
	}
	function so(e) {
		var t = Yt(e.target);
		if (t !== null) {
			var n = Zt(t);
			if (n !== null) {
				if (((t = n.tag), t === 13)) {
					if (((t = Zi(n)), t !== null)) {
						(e.blockedOn = t),
							io(e.priority, function () {
								lo(n);
							});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function zr(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length; ) {
			var n = Xl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				(Fl = r), n.target.dispatchEvent(r), (Fl = null);
			} else return (t = nr(n)), t !== null && Zl(t), (e.blockedOn = n), !1;
			t.shift();
		}
		return !0;
	}
	function ao(e, t, n) {
		zr(e) && n.delete(t);
	}
	function sc() {
		(Yl = !1), Lt !== null && zr(Lt) && (Lt = null), Pt !== null && zr(Pt) && (Pt = null), zt !== null && zr(zt) && (zt = null), An.forEach(ao), Bn.forEach(ao);
	}
	function $n(e, t) {
		e.blockedOn === t && ((e.blockedOn = null), Yl || ((Yl = !0), T.unstable_scheduleCallback(T.unstable_NormalPriority, sc)));
	}
	function Wn(e) {
		function t(l) {
			return $n(l, e);
		}
		if (0 < Pr.length) {
			$n(Pr[0], e);
			for (var n = 1; n < Pr.length; n++) {
				var r = Pr[n];
				r.blockedOn === e && (r.blockedOn = null);
			}
		}
		for (Lt !== null && $n(Lt, e), Pt !== null && $n(Pt, e), zt !== null && $n(zt, e), An.forEach(t), Bn.forEach(t), n = 0; n < Tt.length; n++)
			(r = Tt[n]), r.blockedOn === e && (r.blockedOn = null);
		for (; 0 < Tt.length && ((n = Tt[0]), n.blockedOn === null); ) so(n), n.blockedOn === null && Tt.shift();
	}
	var cn = Se.ReactCurrentBatchConfig,
		Tr = !0;
	function ac(e, t, n, r) {
		var l = G,
			u = cn.transition;
		cn.transition = null;
		try {
			(G = 1), Gl(e, t, n, r);
		} finally {
			(G = l), (cn.transition = u);
		}
	}
	function cc(e, t, n, r) {
		var l = G,
			u = cn.transition;
		cn.transition = null;
		try {
			(G = 4), Gl(e, t, n, r);
		} finally {
			(G = l), (cn.transition = u);
		}
	}
	function Gl(e, t, n, r) {
		if (Tr) {
			var l = Xl(e, t, n, r);
			if (l === null) pu(e, t, r, jr, n), oo(e, r);
			else if (oc(l, e, t, n, r)) r.stopPropagation();
			else if ((oo(e, r), t & 4 && -1 < ic.indexOf(e))) {
				for (; l !== null; ) {
					var u = nr(l);
					if ((u !== null && ro(u), (u = Xl(e, t, n, r)), u === null && pu(e, t, r, jr, n), u === l)) break;
					l = u;
				}
				l !== null && r.stopPropagation();
			} else pu(e, t, r, null, n);
		}
	}
	var jr = null;
	function Xl(e, t, n, r) {
		if (((jr = null), (e = Ul(r)), (e = Yt(e)), e !== null))
			if (((t = Zt(e)), t === null)) e = null;
			else if (((n = t.tag), n === 13)) {
				if (((e = Zi(t)), e !== null)) return e;
				e = null;
			} else if (n === 3) {
				if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
				e = null;
			} else t !== e && (e = null);
		return (jr = e), null;
	}
	function co(e) {
		switch (e) {
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart":
				return 1;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "toggle":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave":
				return 4;
			case "message":
				switch (Ja()) {
					case $l:
						return 1;
					case bi:
						return 4;
					case xr:
					case qa:
						return 16;
					case eo:
						return 536870912;
					default:
						return 16;
				}
			default:
				return 16;
		}
	}
	var jt = null,
		Jl = null,
		Rr = null;
	function fo() {
		if (Rr) return Rr;
		var e,
			t = Jl,
			n = t.length,
			r,
			l = "value" in jt ? jt.value : jt.textContent,
			u = l.length;
		for (e = 0; e < n && t[e] === l[e]; e++);
		var i = n - e;
		for (r = 1; r <= i && t[n - r] === l[u - r]; r++);
		return (Rr = l.slice(e, 1 < r ? 1 - r : void 0));
	}
	function Dr(e) {
		var t = e.keyCode;
		return "charCode" in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t), e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function Mr() {
		return !0;
	}
	function po() {
		return !1;
	}
	function Ae(e) {
		function t(n, r, l, u, i) {
			(this._reactName = n), (this._targetInst = l), (this.type = r), (this.nativeEvent = u), (this.target = i), (this.currentTarget = null);
			for (var o in e) e.hasOwnProperty(o) && ((n = e[o]), (this[o] = n ? n(u) : u[o]));
			return (this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Mr : po), (this.isPropagationStopped = po), this;
		}
		return (
			a(t.prototype, {
				preventDefault: function () {
					this.defaultPrevented = !0;
					var n = this.nativeEvent;
					n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), (this.isDefaultPrevented = Mr));
				},
				stopPropagation: function () {
					var n = this.nativeEvent;
					n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), (this.isPropagationStopped = Mr));
				},
				persist: function () {},
				isPersistent: Mr,
			}),
			t
		);
	}
	var fn = {
			eventPhase: 0,
			bubbles: 0,
			cancelable: 0,
			timeStamp: function (e) {
				return e.timeStamp || Date.now();
			},
			defaultPrevented: 0,
			isTrusted: 0,
		},
		ql = Ae(fn),
		Qn = a({}, fn, { view: 0, detail: 0 }),
		fc = Ae(Qn),
		bl,
		eu,
		Kn,
		Or = a({}, Qn, {
			screenX: 0,
			screenY: 0,
			clientX: 0,
			clientY: 0,
			pageX: 0,
			pageY: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			getModifierState: nu,
			button: 0,
			buttons: 0,
			relatedTarget: function (e) {
				return e.relatedTarget === void 0 ? (e.fromElement === e.srcElement ? e.toElement : e.fromElement) : e.relatedTarget;
			},
			movementX: function (e) {
				return "movementX" in e
					? e.movementX
					: (e !== Kn && (Kn && e.type === "mousemove" ? ((bl = e.screenX - Kn.screenX), (eu = e.screenY - Kn.screenY)) : (eu = bl = 0), (Kn = e)), bl);
			},
			movementY: function (e) {
				return "movementY" in e ? e.movementY : eu;
			},
		}),
		mo = Ae(Or),
		dc = a({}, Or, { dataTransfer: 0 }),
		pc = Ae(dc),
		mc = a({}, Qn, { relatedTarget: 0 }),
		tu = Ae(mc),
		hc = a({}, fn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
		vc = Ae(hc),
		yc = a({}, fn, {
			clipboardData: function (e) {
				return "clipboardData" in e ? e.clipboardData : window.clipboardData;
			},
		}),
		gc = Ae(yc),
		wc = a({}, fn, { data: 0 }),
		ho = Ae(wc),
		Sc = {
			Esc: "Escape",
			Spacebar: " ",
			Left: "ArrowLeft",
			Up: "ArrowUp",
			Right: "ArrowRight",
			Down: "ArrowDown",
			Del: "Delete",
			Win: "OS",
			Menu: "ContextMenu",
			Apps: "ContextMenu",
			Scroll: "ScrollLock",
			MozPrintableKey: "Unidentified",
		},
		kc = {
			8: "Backspace",
			9: "Tab",
			12: "Clear",
			13: "Enter",
			16: "Shift",
			17: "Control",
			18: "Alt",
			19: "Pause",
			20: "CapsLock",
			27: "Escape",
			32: " ",
			33: "PageUp",
			34: "PageDown",
			35: "End",
			36: "Home",
			37: "ArrowLeft",
			38: "ArrowUp",
			39: "ArrowRight",
			40: "ArrowDown",
			45: "Insert",
			46: "Delete",
			112: "F1",
			113: "F2",
			114: "F3",
			115: "F4",
			116: "F5",
			117: "F6",
			118: "F7",
			119: "F8",
			120: "F9",
			121: "F10",
			122: "F11",
			123: "F12",
			144: "NumLock",
			145: "ScrollLock",
			224: "Meta",
		},
		Cc = {
			Alt: "altKey",
			Control: "ctrlKey",
			Meta: "metaKey",
			Shift: "shiftKey",
		};
	function xc(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Cc[e]) ? !!t[e] : !1;
	}
	function nu() {
		return xc;
	}
	var Ec = a({}, Qn, {
			key: function (e) {
				if (e.key) {
					var t = Sc[e.key] || e.key;
					if (t !== "Unidentified") return t;
				}
				return e.type === "keypress" ? ((e = Dr(e)), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? kc[e.keyCode] || "Unidentified" : "";
			},
			code: 0,
			location: 0,
			ctrlKey: 0,
			shiftKey: 0,
			altKey: 0,
			metaKey: 0,
			repeat: 0,
			locale: 0,
			getModifierState: nu,
			charCode: function (e) {
				return e.type === "keypress" ? Dr(e) : 0;
			},
			keyCode: function (e) {
				return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
			which: function (e) {
				return e.type === "keypress" ? Dr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
			},
		}),
		_c = Ae(Ec),
		Nc = a({}, Or, {
			pointerId: 0,
			width: 0,
			height: 0,
			pressure: 0,
			tangentialPressure: 0,
			tiltX: 0,
			tiltY: 0,
			twist: 0,
			pointerType: 0,
			isPrimary: 0,
		}),
		vo = Ae(Nc),
		Lc = a({}, Qn, {
			touches: 0,
			targetTouches: 0,
			changedTouches: 0,
			altKey: 0,
			metaKey: 0,
			ctrlKey: 0,
			shiftKey: 0,
			getModifierState: nu,
		}),
		Pc = Ae(Lc),
		zc = a({}, fn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
		Tc = Ae(zc),
		jc = a({}, Or, {
			deltaX: function (e) {
				return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
			},
			deltaY: function (e) {
				return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
			},
			deltaZ: 0,
			deltaMode: 0,
		}),
		Rc = Ae(jc),
		Dc = [9, 13, 27, 32],
		ru = ae && "CompositionEvent" in window,
		Zn = null;
	ae && "documentMode" in document && (Zn = document.documentMode);
	var Mc = ae && "TextEvent" in window && !Zn,
		yo = ae && (!ru || (Zn && 8 < Zn && 11 >= Zn)),
		go = " ",
		wo = !1;
	function So(e, t) {
		switch (e) {
			case "keyup":
				return Dc.indexOf(t.keyCode) !== -1;
			case "keydown":
				return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout":
				return !0;
			default:
				return !1;
		}
	}
	function ko(e) {
		return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
	}
	var dn = !1;
	function Oc(e, t) {
		switch (e) {
			case "compositionend":
				return ko(t);
			case "keypress":
				return t.which !== 32 ? null : ((wo = !0), go);
			case "textInput":
				return (e = t.data), e === go && wo ? null : e;
			default:
				return null;
		}
	}
	function Ic(e, t) {
		if (dn) return e === "compositionend" || (!ru && So(e, t)) ? ((e = fo()), (Rr = Jl = jt = null), (dn = !1), e) : null;
		switch (e) {
			case "paste":
				return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend":
				return yo && t.locale !== "ko" ? null : t.data;
			default:
				return null;
		}
	}
	var Fc = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0,
	};
	function Co(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!Fc[e.type] : t === "textarea";
	}
	function xo(e, t, n, r) {
		Hi(r), (t = Ar(t, "onChange")), 0 < t.length && ((n = new ql("onChange", "change", null, n, r)), e.push({ event: n, listeners: t }));
	}
	var Yn = null,
		Gn = null;
	function Uc(e) {
		Bo(e, 0);
	}
	function Ir(e) {
		var t = yn(e);
		if (Ti(t)) return e;
	}
	function Vc(e, t) {
		if (e === "change") return t;
	}
	var Eo = !1;
	if (ae) {
		var lu;
		if (ae) {
			var uu = "oninput" in document;
			if (!uu) {
				var _o = document.createElement("div");
				_o.setAttribute("oninput", "return;"), (uu = typeof _o.oninput == "function");
			}
			lu = uu;
		} else lu = !1;
		Eo = lu && (!document.documentMode || 9 < document.documentMode);
	}
	function No() {
		Yn && (Yn.detachEvent("onpropertychange", Lo), (Gn = Yn = null));
	}
	function Lo(e) {
		if (e.propertyName === "value" && Ir(Gn)) {
			var t = [];
			xo(t, Gn, e, Ul(e)), Ki(Uc, t);
		}
	}
	function Ac(e, t, n) {
		e === "focusin" ? (No(), (Yn = t), (Gn = n), Yn.attachEvent("onpropertychange", Lo)) : e === "focusout" && No();
	}
	function Bc(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ir(Gn);
	}
	function Hc(e, t) {
		if (e === "click") return Ir(t);
	}
	function $c(e, t) {
		if (e === "input" || e === "change") return Ir(t);
	}
	function Wc(e, t) {
		return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
	}
	var nt = typeof Object.is == "function" ? Object.is : Wc;
	function Xn(e, t) {
		if (nt(e, t)) return !0;
		if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
		var n = Object.keys(e),
			r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var l = n[r];
			if (!W.call(t, l) || !nt(e[l], t[l])) return !1;
		}
		return !0;
	}
	function Po(e) {
		for (; e && e.firstChild; ) e = e.firstChild;
		return e;
	}
	function zo(e, t) {
		var n = Po(e);
		e = 0;
		for (var r; n; ) {
			if (n.nodeType === 3) {
				if (((r = e + n.textContent.length), e <= t && r >= t)) return { node: n, offset: t - e };
				e = r;
			}
			e: {
				for (; n; ) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break e;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Po(n);
		}
	}
	function To(e, t) {
		return e && t
			? e === t
				? !0
				: e && e.nodeType === 3
					? !1
					: t && t.nodeType === 3
						? To(e, t.parentNode)
						: "contains" in e
							? e.contains(t)
							: e.compareDocumentPosition
								? !!(e.compareDocumentPosition(t) & 16)
								: !1
			: !1;
	}
	function jo() {
		for (var e = window, t = wr(); t instanceof e.HTMLIFrameElement; ) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = wr(e.document);
		}
		return t;
	}
	function iu(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return (
			t &&
			((t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password")) ||
				t === "textarea" ||
				e.contentEditable === "true")
		);
	}
	function Qc(e) {
		var t = jo(),
			n = e.focusedElem,
			r = e.selectionRange;
		if (t !== n && n && n.ownerDocument && To(n.ownerDocument.documentElement, n)) {
			if (r !== null && iu(n)) {
				if (((t = r.start), (e = r.end), e === void 0 && (e = t), "selectionStart" in n)) (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
				else if (((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)) {
					e = e.getSelection();
					var l = n.textContent.length,
						u = Math.min(r.start, l);
					(r = r.end === void 0 ? u : Math.min(r.end, l)), !e.extend && u > r && ((l = r), (r = u), (u = l)), (l = zo(n, u));
					var i = zo(n, r);
					l &&
						i &&
						(e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) &&
						((t = t.createRange()),
						t.setStart(l.node, l.offset),
						e.removeAllRanges(),
						u > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
				}
			}
			for (t = [], e = n; (e = e.parentNode); ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
			for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) (e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top);
		}
	}
	var Kc = ae && "documentMode" in document && 11 >= document.documentMode,
		pn = null,
		ou = null,
		Jn = null,
		su = !1;
	function Ro(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		su ||
			pn == null ||
			pn !== wr(r) ||
			((r = pn),
			"selectionStart" in r && iu(r)
				? (r = { start: r.selectionStart, end: r.selectionEnd })
				: ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
					(r = {
						anchorNode: r.anchorNode,
						anchorOffset: r.anchorOffset,
						focusNode: r.focusNode,
						focusOffset: r.focusOffset,
					})),
			(Jn && Xn(Jn, r)) || ((Jn = r), (r = Ar(ou, "onSelect")), 0 < r.length && ((t = new ql("onSelect", "select", null, t, n)), e.push({ event: t, listeners: r }), (t.target = pn))));
	}
	function Fr(e, t) {
		var n = {};
		return (n[e.toLowerCase()] = t.toLowerCase()), (n["Webkit" + e] = "webkit" + t), (n["Moz" + e] = "moz" + t), n;
	}
	var mn = {
			animationend: Fr("Animation", "AnimationEnd"),
			animationiteration: Fr("Animation", "AnimationIteration"),
			animationstart: Fr("Animation", "AnimationStart"),
			transitionend: Fr("Transition", "TransitionEnd"),
		},
		au = {},
		Do = {};
	ae &&
		((Do = document.createElement("div").style),
		"AnimationEvent" in window || (delete mn.animationend.animation, delete mn.animationiteration.animation, delete mn.animationstart.animation),
		"TransitionEvent" in window || delete mn.transitionend.transition);
	function Ur(e) {
		if (au[e]) return au[e];
		if (!mn[e]) return e;
		var t = mn[e],
			n;
		for (n in t) if (t.hasOwnProperty(n) && n in Do) return (au[e] = t[n]);
		return e;
	}
	var Mo = Ur("animationend"),
		Oo = Ur("animationiteration"),
		Io = Ur("animationstart"),
		Fo = Ur("transitionend"),
		Uo = new Map(),
		Vo =
			"abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
				" ",
			);
	function Rt(e, t) {
		Uo.set(e, t), $(t, [e]);
	}
	for (var cu = 0; cu < Vo.length; cu++) {
		var fu = Vo[cu],
			Zc = fu.toLowerCase(),
			Yc = fu[0].toUpperCase() + fu.slice(1);
		Rt(Zc, "on" + Yc);
	}
	Rt(Mo, "onAnimationEnd"),
		Rt(Oo, "onAnimationIteration"),
		Rt(Io, "onAnimationStart"),
		Rt("dblclick", "onDoubleClick"),
		Rt("focusin", "onFocus"),
		Rt("focusout", "onBlur"),
		Rt(Fo, "onTransitionEnd"),
		le("onMouseEnter", ["mouseout", "mouseover"]),
		le("onMouseLeave", ["mouseout", "mouseover"]),
		le("onPointerEnter", ["pointerout", "pointerover"]),
		le("onPointerLeave", ["pointerout", "pointerover"]),
		$("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")),
		$("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),
		$("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
		$("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")),
		$("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")),
		$("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var qn =
			"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
				" ",
			),
		Gc = new Set("cancel close invalid load scroll toggle".split(" ").concat(qn));
	function Ao(e, t, n) {
		var r = e.type || "unknown-event";
		(e.currentTarget = n), Za(r, t, void 0, e), (e.currentTarget = null);
	}
	function Bo(e, t) {
		t = (t & 4) !== 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n],
				l = r.event;
			r = r.listeners;
			e: {
				var u = void 0;
				if (t)
					for (var i = r.length - 1; 0 <= i; i--) {
						var o = r[i],
							s = o.instance,
							p = o.currentTarget;
						if (((o = o.listener), s !== u && l.isPropagationStopped())) break e;
						Ao(l, o, p), (u = s);
					}
				else
					for (i = 0; i < r.length; i++) {
						if (((o = r[i]), (s = o.instance), (p = o.currentTarget), (o = o.listener), s !== u && l.isPropagationStopped())) break e;
						Ao(l, o, p), (u = s);
					}
			}
		}
		if (Cr) throw ((e = Hl), (Cr = !1), (Hl = null), e);
	}
	function te(e, t) {
		var n = t[wu];
		n === void 0 && (n = t[wu] = new Set());
		var r = e + "__bubble";
		n.has(r) || (Ho(t, e, 2, !1), n.add(r));
	}
	function du(e, t, n) {
		var r = 0;
		t && (r |= 4), Ho(n, e, r, t);
	}
	var Vr = "_reactListening" + Math.random().toString(36).slice(2);
	function bn(e) {
		if (!e[Vr]) {
			(e[Vr] = !0),
				z.forEach(function (n) {
					n !== "selectionchange" && (Gc.has(n) || du(n, !1, e), du(n, !0, e));
				});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Vr] || ((t[Vr] = !0), du("selectionchange", !1, t));
		}
	}
	function Ho(e, t, n, r) {
		switch (co(t)) {
			case 1:
				var l = ac;
				break;
			case 4:
				l = cc;
				break;
			default:
				l = Gl;
		}
		(n = l.bind(null, t, n, e)),
			(l = void 0),
			!Bl || (t !== "touchstart" && t !== "touchmove" && t !== "wheel") || (l = !0),
			r
				? l !== void 0
					? e.addEventListener(t, n, { capture: !0, passive: l })
					: e.addEventListener(t, n, !0)
				: l !== void 0
					? e.addEventListener(t, n, { passive: l })
					: e.addEventListener(t, n, !1);
	}
	function pu(e, t, n, r, l) {
		var u = r;
		if ((t & 1) === 0 && (t & 2) === 0 && r !== null)
			e: for (;;) {
				if (r === null) return;
				var i = r.tag;
				if (i === 3 || i === 4) {
					var o = r.stateNode.containerInfo;
					if (o === l || (o.nodeType === 8 && o.parentNode === l)) break;
					if (i === 4)
						for (i = r.return; i !== null; ) {
							var s = i.tag;
							if ((s === 3 || s === 4) && ((s = i.stateNode.containerInfo), s === l || (s.nodeType === 8 && s.parentNode === l))) return;
							i = i.return;
						}
					for (; o !== null; ) {
						if (((i = Yt(o)), i === null)) return;
						if (((s = i.tag), s === 5 || s === 6)) {
							r = u = i;
							continue e;
						}
						o = o.parentNode;
					}
				}
				r = r.return;
			}
		Ki(function () {
			var p = u,
				y = Ul(n),
				g = [];
			e: {
				var h = Uo.get(e);
				if (h !== void 0) {
					var x = ql,
						_ = e;
					switch (e) {
						case "keypress":
							if (Dr(n) === 0) break e;
						case "keydown":
						case "keyup":
							x = _c;
							break;
						case "focusin":
							(_ = "focus"), (x = tu);
							break;
						case "focusout":
							(_ = "blur"), (x = tu);
							break;
						case "beforeblur":
						case "afterblur":
							x = tu;
							break;
						case "click":
							if (n.button === 2) break e;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							x = mo;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							x = pc;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							x = Pc;
							break;
						case Mo:
						case Oo:
						case Io:
							x = vc;
							break;
						case Fo:
							x = Tc;
							break;
						case "scroll":
							x = fc;
							break;
						case "wheel":
							x = Rc;
							break;
						case "copy":
						case "cut":
						case "paste":
							x = gc;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							x = vo;
					}
					var N = (t & 4) !== 0,
						fe = !N && e === "scroll",
						f = N ? (h !== null ? h + "Capture" : null) : h;
					N = [];
					for (var c = p, d; c !== null; ) {
						d = c;
						var w = d.stateNode;
						if ((d.tag === 5 && w !== null && ((d = w), f !== null && ((w = On(c, f)), w != null && N.push(er(c, w, d)))), fe)) break;
						c = c.return;
					}
					0 < N.length && ((h = new x(h, _, null, n, y)), g.push({ event: h, listeners: N }));
				}
			}
			if ((t & 7) === 0) {
				e: {
					if (
						((h = e === "mouseover" || e === "pointerover"),
						(x = e === "mouseout" || e === "pointerout"),
						h && n !== Fl && (_ = n.relatedTarget || n.fromElement) && (Yt(_) || _[gt]))
					)
						break e;
					if (
						(x || h) &&
						((h = y.window === y ? y : (h = y.ownerDocument) ? h.defaultView || h.parentWindow : window),
						x
							? ((_ = n.relatedTarget || n.toElement), (x = p), (_ = _ ? Yt(_) : null), _ !== null && ((fe = Zt(_)), _ !== fe || (_.tag !== 5 && _.tag !== 6)) && (_ = null))
							: ((x = null), (_ = p)),
						x !== _)
					) {
						if (
							((N = mo),
							(w = "onMouseLeave"),
							(f = "onMouseEnter"),
							(c = "mouse"),
							(e === "pointerout" || e === "pointerover") && ((N = vo), (w = "onPointerLeave"), (f = "onPointerEnter"), (c = "pointer")),
							(fe = x == null ? h : yn(x)),
							(d = _ == null ? h : yn(_)),
							(h = new N(w, c + "leave", x, n, y)),
							(h.target = fe),
							(h.relatedTarget = d),
							(w = null),
							Yt(y) === p && ((N = new N(f, c + "enter", _, n, y)), (N.target = d), (N.relatedTarget = fe), (w = N)),
							(fe = w),
							x && _)
						)
							t: {
								for (N = x, f = _, c = 0, d = N; d; d = hn(d)) c++;
								for (d = 0, w = f; w; w = hn(w)) d++;
								for (; 0 < c - d; ) (N = hn(N)), c--;
								for (; 0 < d - c; ) (f = hn(f)), d--;
								for (; c--; ) {
									if (N === f || (f !== null && N === f.alternate)) break t;
									(N = hn(N)), (f = hn(f));
								}
								N = null;
							}
						else N = null;
						x !== null && $o(g, h, x, N, !1), _ !== null && fe !== null && $o(g, fe, _, N, !0);
					}
				}
				e: {
					if (((h = p ? yn(p) : window), (x = h.nodeName && h.nodeName.toLowerCase()), x === "select" || (x === "input" && h.type === "file"))) var L = Vc;
					else if (Co(h))
						if (Eo) L = $c;
						else {
							L = Bc;
							var j = Ac;
						}
					else (x = h.nodeName) && x.toLowerCase() === "input" && (h.type === "checkbox" || h.type === "radio") && (L = Hc);
					if (L && (L = L(e, p))) {
						xo(g, L, n, y);
						break e;
					}
					j && j(e, h, p), e === "focusout" && (j = h._wrapperState) && j.controlled && h.type === "number" && Rl(h, "number", h.value);
				}
				switch (((j = p ? yn(p) : window), e)) {
					case "focusin":
						(Co(j) || j.contentEditable === "true") && ((pn = j), (ou = p), (Jn = null));
						break;
					case "focusout":
						Jn = ou = pn = null;
						break;
					case "mousedown":
						su = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						(su = !1), Ro(g, n, y);
						break;
					case "selectionchange":
						if (Kc) break;
					case "keydown":
					case "keyup":
						Ro(g, n, y);
				}
				var R;
				if (ru)
					e: {
						switch (e) {
							case "compositionstart":
								var M = "onCompositionStart";
								break e;
							case "compositionend":
								M = "onCompositionEnd";
								break e;
							case "compositionupdate":
								M = "onCompositionUpdate";
								break e;
						}
						M = void 0;
					}
				else dn ? So(e, n) && (M = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (M = "onCompositionStart");
				M &&
					(yo &&
						n.locale !== "ko" &&
						(dn || M !== "onCompositionStart" ? M === "onCompositionEnd" && dn && (R = fo()) : ((jt = y), (Jl = "value" in jt ? jt.value : jt.textContent), (dn = !0))),
					(j = Ar(p, M)),
					0 < j.length && ((M = new ho(M, e, null, n, y)), g.push({ event: M, listeners: j }), R ? (M.data = R) : ((R = ko(n)), R !== null && (M.data = R)))),
					(R = Mc ? Oc(e, n) : Ic(e, n)) &&
						((p = Ar(p, "onBeforeInput")), 0 < p.length && ((y = new ho("onBeforeInput", "beforeinput", null, n, y)), g.push({ event: y, listeners: p }), (y.data = R)));
			}
			Bo(g, t);
		});
	}
	function er(e, t, n) {
		return { instance: e, listener: t, currentTarget: n };
	}
	function Ar(e, t) {
		for (var n = t + "Capture", r = []; e !== null; ) {
			var l = e,
				u = l.stateNode;
			l.tag === 5 && u !== null && ((l = u), (u = On(e, n)), u != null && r.unshift(er(e, u, l)), (u = On(e, t)), u != null && r.push(er(e, u, l))), (e = e.return);
		}
		return r;
	}
	function hn(e) {
		if (e === null) return null;
		do e = e.return;
		while (e && e.tag !== 5);
		return e || null;
	}
	function $o(e, t, n, r, l) {
		for (var u = t._reactName, i = []; n !== null && n !== r; ) {
			var o = n,
				s = o.alternate,
				p = o.stateNode;
			if (s !== null && s === r) break;
			o.tag === 5 && p !== null && ((o = p), l ? ((s = On(n, u)), s != null && i.unshift(er(n, s, o))) : l || ((s = On(n, u)), s != null && i.push(er(n, s, o)))), (n = n.return);
		}
		i.length !== 0 && e.push({ event: t, listeners: i });
	}
	var Xc = /\r\n?/g,
		Jc = /\u0000|\uFFFD/g;
	function Wo(e) {
		return (typeof e == "string" ? e : "" + e)
			.replace(
				Xc,
				`
`,
			)
			.replace(Jc, "");
	}
	function Br(e, t, n) {
		if (((t = Wo(t)), Wo(e) !== t && n)) throw Error(m(425));
	}
	function Hr() {}
	var mu = null,
		hu = null;
	function vu(e, t) {
		return (
			e === "textarea" ||
			e === "noscript" ||
			typeof t.children == "string" ||
			typeof t.children == "number" ||
			(typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null)
		);
	}
	var yu = typeof setTimeout == "function" ? setTimeout : void 0,
		qc = typeof clearTimeout == "function" ? clearTimeout : void 0,
		Qo = typeof Promise == "function" ? Promise : void 0,
		bc =
			typeof queueMicrotask == "function"
				? queueMicrotask
				: typeof Qo < "u"
					? function (e) {
							return Qo.resolve(null).then(e).catch(ef);
						}
					: yu;
	function ef(e) {
		setTimeout(function () {
			throw e;
		});
	}
	function gu(e, t) {
		var n = t,
			r = 0;
		do {
			var l = n.nextSibling;
			if ((e.removeChild(n), l && l.nodeType === 8))
				if (((n = l.data), n === "/$")) {
					if (r === 0) {
						e.removeChild(l), Wn(t);
						return;
					}
					r--;
				} else (n !== "$" && n !== "$?" && n !== "$!") || r++;
			n = l;
		} while (n);
		Wn(t);
	}
	function Dt(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
				if (t === "/$") return null;
			}
		}
		return e;
	}
	function Ko(e) {
		e = e.previousSibling;
		for (var t = 0; e; ) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?") {
					if (t === 0) return e;
					t--;
				} else n === "/$" && t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	var vn = Math.random().toString(36).slice(2),
		dt = "__reactFiber$" + vn,
		tr = "__reactProps$" + vn,
		gt = "__reactContainer$" + vn,
		wu = "__reactEvents$" + vn,
		tf = "__reactListeners$" + vn,
		nf = "__reactHandles$" + vn;
	function Yt(e) {
		var t = e[dt];
		if (t) return t;
		for (var n = e.parentNode; n; ) {
			if ((t = n[gt] || n[dt])) {
				if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
					for (e = Ko(e); e !== null; ) {
						if ((n = e[dt])) return n;
						e = Ko(e);
					}
				return t;
			}
			(e = n), (n = e.parentNode);
		}
		return null;
	}
	function nr(e) {
		return (e = e[dt] || e[gt]), !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e;
	}
	function yn(e) {
		if (e.tag === 5 || e.tag === 6) return e.stateNode;
		throw Error(m(33));
	}
	function $r(e) {
		return e[tr] || null;
	}
	var Su = [],
		gn = -1;
	function Mt(e) {
		return { current: e };
	}
	function ne(e) {
		0 > gn || ((e.current = Su[gn]), (Su[gn] = null), gn--);
	}
	function ee(e, t) {
		gn++, (Su[gn] = e.current), (e.current = t);
	}
	var Ot = {},
		ke = Mt(Ot),
		De = Mt(!1),
		Gt = Ot;
	function wn(e, t) {
		var n = e.type.contextTypes;
		if (!n) return Ot;
		var r = e.stateNode;
		if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
		var l = {},
			u;
		for (u in n) l[u] = t[u];
		return r && ((e = e.stateNode), (e.__reactInternalMemoizedUnmaskedChildContext = t), (e.__reactInternalMemoizedMaskedChildContext = l)), l;
	}
	function Me(e) {
		return (e = e.childContextTypes), e != null;
	}
	function Wr() {
		ne(De), ne(ke);
	}
	function Zo(e, t, n) {
		if (ke.current !== Ot) throw Error(m(168));
		ee(ke, t), ee(De, n);
	}
	function Yo(e, t, n) {
		var r = e.stateNode;
		if (((t = t.childContextTypes), typeof r.getChildContext != "function")) return n;
		r = r.getChildContext();
		for (var l in r) if (!(l in t)) throw Error(m(108, J(e) || "Unknown", l));
		return a({}, n, r);
	}
	function Qr(e) {
		return (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Ot), (Gt = ke.current), ee(ke, e), ee(De, De.current), !0;
	}
	function Go(e, t, n) {
		var r = e.stateNode;
		if (!r) throw Error(m(169));
		n ? ((e = Yo(e, t, Gt)), (r.__reactInternalMemoizedMergedChildContext = e), ne(De), ne(ke), ee(ke, e)) : ne(De), ee(De, n);
	}
	var wt = null,
		Kr = !1,
		ku = !1;
	function Xo(e) {
		wt === null ? (wt = [e]) : wt.push(e);
	}
	function rf(e) {
		(Kr = !0), Xo(e);
	}
	function It() {
		if (!ku && wt !== null) {
			ku = !0;
			var e = 0,
				t = G;
			try {
				var n = wt;
				for (G = 1; e < n.length; e++) {
					var r = n[e];
					do r = r(!0);
					while (r !== null);
				}
				(wt = null), (Kr = !1);
			} catch (l) {
				throw (wt !== null && (wt = wt.slice(e + 1)), Ji($l, It), l);
			} finally {
				(G = t), (ku = !1);
			}
		}
		return null;
	}
	var Sn = [],
		kn = 0,
		Zr = null,
		Yr = 0,
		Qe = [],
		Ke = 0,
		Xt = null,
		St = 1,
		kt = "";
	function Jt(e, t) {
		(Sn[kn++] = Yr), (Sn[kn++] = Zr), (Zr = e), (Yr = t);
	}
	function Jo(e, t, n) {
		(Qe[Ke++] = St), (Qe[Ke++] = kt), (Qe[Ke++] = Xt), (Xt = e);
		var r = St;
		e = kt;
		var l = 32 - tt(r) - 1;
		(r &= ~(1 << l)), (n += 1);
		var u = 32 - tt(t) + l;
		if (30 < u) {
			var i = l - (l % 5);
			(u = (r & ((1 << i) - 1)).toString(32)), (r >>= i), (l -= i), (St = (1 << (32 - tt(t) + l)) | (n << l) | r), (kt = u + e);
		} else (St = (1 << u) | (n << l) | r), (kt = e);
	}
	function Cu(e) {
		e.return !== null && (Jt(e, 1), Jo(e, 1, 0));
	}
	function xu(e) {
		for (; e === Zr; ) (Zr = Sn[--kn]), (Sn[kn] = null), (Yr = Sn[--kn]), (Sn[kn] = null);
		for (; e === Xt; ) (Xt = Qe[--Ke]), (Qe[Ke] = null), (kt = Qe[--Ke]), (Qe[Ke] = null), (St = Qe[--Ke]), (Qe[Ke] = null);
	}
	var Be = null,
		He = null,
		re = !1,
		rt = null;
	function qo(e, t) {
		var n = Xe(5, null, null, 0);
		(n.elementType = "DELETED"), (n.stateNode = t), (n.return = e), (t = e.deletions), t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
	}
	function bo(e, t) {
		switch (e.tag) {
			case 5:
				var n = e.type;
				return (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t), t !== null ? ((e.stateNode = t), (Be = e), (He = Dt(t.firstChild)), !0) : !1;
			case 6:
				return (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t), t !== null ? ((e.stateNode = t), (Be = e), (He = null), !0) : !1;
			case 13:
				return (
					(t = t.nodeType !== 8 ? null : t),
					t !== null
						? ((n = Xt !== null ? { id: St, overflow: kt } : null),
							(e.memoizedState = {
								dehydrated: t,
								treeContext: n,
								retryLane: 1073741824,
							}),
							(n = Xe(18, null, null, 0)),
							(n.stateNode = t),
							(n.return = e),
							(e.child = n),
							(Be = e),
							(He = null),
							!0)
						: !1
				);
			default:
				return !1;
		}
	}
	function Eu(e) {
		return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
	}
	function _u(e) {
		if (re) {
			var t = He;
			if (t) {
				var n = t;
				if (!bo(e, t)) {
					if (Eu(e)) throw Error(m(418));
					t = Dt(n.nextSibling);
					var r = Be;
					t && bo(e, t) ? qo(r, n) : ((e.flags = (e.flags & -4097) | 2), (re = !1), (Be = e));
				}
			} else {
				if (Eu(e)) throw Error(m(418));
				(e.flags = (e.flags & -4097) | 2), (re = !1), (Be = e);
			}
		}
	}
	function es(e) {
		for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
		Be = e;
	}
	function Gr(e) {
		if (e !== Be) return !1;
		if (!re) return es(e), (re = !0), !1;
		var t;
		if (((t = e.tag !== 3) && !(t = e.tag !== 5) && ((t = e.type), (t = t !== "head" && t !== "body" && !vu(e.type, e.memoizedProps))), t && (t = He))) {
			if (Eu(e)) throw (ts(), Error(m(418)));
			for (; t; ) qo(e, t), (t = Dt(t.nextSibling));
		}
		if ((es(e), e.tag === 13)) {
			if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e)) throw Error(m(317));
			e: {
				for (e = e.nextSibling, t = 0; e; ) {
					if (e.nodeType === 8) {
						var n = e.data;
						if (n === "/$") {
							if (t === 0) {
								He = Dt(e.nextSibling);
								break e;
							}
							t--;
						} else (n !== "$" && n !== "$!" && n !== "$?") || t++;
					}
					e = e.nextSibling;
				}
				He = null;
			}
		} else He = Be ? Dt(e.stateNode.nextSibling) : null;
		return !0;
	}
	function ts() {
		for (var e = He; e; ) e = Dt(e.nextSibling);
	}
	function Cn() {
		(He = Be = null), (re = !1);
	}
	function Nu(e) {
		rt === null ? (rt = [e]) : rt.push(e);
	}
	var lf = Se.ReactCurrentBatchConfig;
	function lt(e, t) {
		if (e && e.defaultProps) {
			(t = a({}, t)), (e = e.defaultProps);
			for (var n in e) t[n] === void 0 && (t[n] = e[n]);
			return t;
		}
		return t;
	}
	var Xr = Mt(null),
		Jr = null,
		xn = null,
		Lu = null;
	function Pu() {
		Lu = xn = Jr = null;
	}
	function zu(e) {
		var t = Xr.current;
		ne(Xr), (e._currentValue = t);
	}
	function Tu(e, t, n) {
		for (; e !== null; ) {
			var r = e.alternate;
			if (((e.childLanes & t) !== t ? ((e.childLanes |= t), r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n)) break;
			e = e.return;
		}
	}
	function En(e, t) {
		(Jr = e), (Lu = xn = null), (e = e.dependencies), e !== null && e.firstContext !== null && ((e.lanes & t) !== 0 && (Oe = !0), (e.firstContext = null));
	}
	function Ze(e) {
		var t = e._currentValue;
		if (Lu !== e)
			if (((e = { context: e, memoizedValue: t, next: null }), xn === null)) {
				if (Jr === null) throw Error(m(308));
				(xn = e), (Jr.dependencies = { lanes: 0, firstContext: e });
			} else xn = xn.next = e;
		return t;
	}
	var qt = null;
	function ju(e) {
		qt === null ? (qt = [e]) : qt.push(e);
	}
	function ns(e, t, n, r) {
		var l = t.interleaved;
		return l === null ? ((n.next = n), ju(t)) : ((n.next = l.next), (l.next = n)), (t.interleaved = n), Ct(e, r);
	}
	function Ct(e, t) {
		e.lanes |= t;
		var n = e.alternate;
		for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) (e.childLanes |= t), (n = e.alternate), n !== null && (n.childLanes |= t), (n = e), (e = e.return);
		return n.tag === 3 ? n.stateNode : null;
	}
	var Ft = !1;
	function Ru(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: { pending: null, interleaved: null, lanes: 0 },
			effects: null,
		};
	}
	function rs(e, t) {
		(e = e.updateQueue),
			t.updateQueue === e &&
				(t.updateQueue = {
					baseState: e.baseState,
					firstBaseUpdate: e.firstBaseUpdate,
					lastBaseUpdate: e.lastBaseUpdate,
					shared: e.shared,
					effects: e.effects,
				});
	}
	function xt(e, t) {
		return {
			eventTime: e,
			lane: t,
			tag: 0,
			payload: null,
			callback: null,
			next: null,
		};
	}
	function Ut(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (((r = r.shared), (A & 2) !== 0)) {
			var l = r.pending;
			return l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)), (r.pending = t), Ct(e, n);
		}
		return (l = r.interleaved), l === null ? ((t.next = t), ju(r)) : ((t.next = l.next), (l.next = t)), (r.interleaved = t), Ct(e, n);
	}
	function qr(e, t, n) {
		if (((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))) {
			var r = t.lanes;
			(r &= e.pendingLanes), (n |= r), (t.lanes = n), Kl(e, n);
		}
	}
	function ls(e, t) {
		var n = e.updateQueue,
			r = e.alternate;
		if (r !== null && ((r = r.updateQueue), n === r)) {
			var l = null,
				u = null;
			if (((n = n.firstBaseUpdate), n !== null)) {
				do {
					var i = {
						eventTime: n.eventTime,
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: n.callback,
						next: null,
					};
					u === null ? (l = u = i) : (u = u.next = i), (n = n.next);
				} while (n !== null);
				u === null ? (l = u = t) : (u = u.next = t);
			} else l = u = t;
			(n = {
				baseState: r.baseState,
				firstBaseUpdate: l,
				lastBaseUpdate: u,
				shared: r.shared,
				effects: r.effects,
			}),
				(e.updateQueue = n);
			return;
		}
		(e = n.lastBaseUpdate), e === null ? (n.firstBaseUpdate = t) : (e.next = t), (n.lastBaseUpdate = t);
	}
	function br(e, t, n, r) {
		var l = e.updateQueue;
		Ft = !1;
		var u = l.firstBaseUpdate,
			i = l.lastBaseUpdate,
			o = l.shared.pending;
		if (o !== null) {
			l.shared.pending = null;
			var s = o,
				p = s.next;
			(s.next = null), i === null ? (u = p) : (i.next = p), (i = s);
			var y = e.alternate;
			y !== null && ((y = y.updateQueue), (o = y.lastBaseUpdate), o !== i && (o === null ? (y.firstBaseUpdate = p) : (o.next = p), (y.lastBaseUpdate = s)));
		}
		if (u !== null) {
			var g = l.baseState;
			(i = 0), (y = p = s = null), (o = u);
			do {
				var h = o.lane,
					x = o.eventTime;
				if ((r & h) === h) {
					y !== null &&
						(y = y.next =
							{
								eventTime: x,
								lane: 0,
								tag: o.tag,
								payload: o.payload,
								callback: o.callback,
								next: null,
							});
					e: {
						var _ = e,
							N = o;
						switch (((h = t), (x = n), N.tag)) {
							case 1:
								if (((_ = N.payload), typeof _ == "function")) {
									g = _.call(x, g, h);
									break e;
								}
								g = _;
								break e;
							case 3:
								_.flags = (_.flags & -65537) | 128;
							case 0:
								if (((_ = N.payload), (h = typeof _ == "function" ? _.call(x, g, h) : _), h == null)) break e;
								g = a({}, g, h);
								break e;
							case 2:
								Ft = !0;
						}
					}
					o.callback !== null && o.lane !== 0 && ((e.flags |= 64), (h = l.effects), h === null ? (l.effects = [o]) : h.push(o));
				} else
					(x = {
						eventTime: x,
						lane: h,
						tag: o.tag,
						payload: o.payload,
						callback: o.callback,
						next: null,
					}),
						y === null ? ((p = y = x), (s = g)) : (y = y.next = x),
						(i |= h);
				if (((o = o.next), o === null)) {
					if (((o = l.shared.pending), o === null)) break;
					(h = o), (o = h.next), (h.next = null), (l.lastBaseUpdate = h), (l.shared.pending = null);
				}
			} while (!0);
			if ((y === null && (s = g), (l.baseState = s), (l.firstBaseUpdate = p), (l.lastBaseUpdate = y), (t = l.shared.interleaved), t !== null)) {
				l = t;
				do (i |= l.lane), (l = l.next);
				while (l !== t);
			} else u === null && (l.shared.lanes = 0);
			(tn |= i), (e.lanes = i), (e.memoizedState = g);
		}
	}
	function us(e, t, n) {
		if (((e = t.effects), (t.effects = null), e !== null))
			for (t = 0; t < e.length; t++) {
				var r = e[t],
					l = r.callback;
				if (l !== null) {
					if (((r.callback = null), (r = n), typeof l != "function")) throw Error(m(191, l));
					l.call(r);
				}
			}
	}
	var is = new S.Component().refs;
	function Du(e, t, n, r) {
		(t = e.memoizedState), (n = n(r, t)), (n = n == null ? t : a({}, t, n)), (e.memoizedState = n), e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var el = {
		isMounted: function (e) {
			return (e = e._reactInternals) ? Zt(e) === e : !1;
		},
		enqueueSetState: function (e, t, n) {
			e = e._reactInternals;
			var r = Pe(),
				l = Ht(e),
				u = xt(r, l);
			(u.payload = t), n != null && (u.callback = n), (t = Ut(e, u, l)), t !== null && (ot(t, e, l, r), qr(t, e, l));
		},
		enqueueReplaceState: function (e, t, n) {
			e = e._reactInternals;
			var r = Pe(),
				l = Ht(e),
				u = xt(r, l);
			(u.tag = 1), (u.payload = t), n != null && (u.callback = n), (t = Ut(e, u, l)), t !== null && (ot(t, e, l, r), qr(t, e, l));
		},
		enqueueForceUpdate: function (e, t) {
			e = e._reactInternals;
			var n = Pe(),
				r = Ht(e),
				l = xt(n, r);
			(l.tag = 2), t != null && (l.callback = t), (t = Ut(e, l, r)), t !== null && (ot(t, e, r, n), qr(t, e, r));
		},
	};
	function os(e, t, n, r, l, u, i) {
		return (
			(e = e.stateNode), typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, u, i) : t.prototype && t.prototype.isPureReactComponent ? !Xn(n, r) || !Xn(l, u) : !0
		);
	}
	function ss(e, t, n) {
		var r = !1,
			l = Ot,
			u = t.contextType;
		return (
			typeof u == "object" && u !== null ? (u = Ze(u)) : ((l = Me(t) ? Gt : ke.current), (r = t.contextTypes), (u = (r = r != null) ? wn(e, l) : Ot)),
			(t = new t(n, u)),
			(e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
			(t.updater = el),
			(e.stateNode = t),
			(t._reactInternals = e),
			r && ((e = e.stateNode), (e.__reactInternalMemoizedUnmaskedChildContext = l), (e.__reactInternalMemoizedMaskedChildContext = u)),
			t
		);
	}
	function as(e, t, n, r) {
		(e = t.state),
			typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r),
			typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r),
			t.state !== e && el.enqueueReplaceState(t, t.state, null);
	}
	function Mu(e, t, n, r) {
		var l = e.stateNode;
		(l.props = n), (l.state = e.memoizedState), (l.refs = is), Ru(e);
		var u = t.contextType;
		typeof u == "object" && u !== null ? (l.context = Ze(u)) : ((u = Me(t) ? Gt : ke.current), (l.context = wn(e, u))),
			(l.state = e.memoizedState),
			(u = t.getDerivedStateFromProps),
			typeof u == "function" && (Du(e, t, u, n), (l.state = e.memoizedState)),
			typeof t.getDerivedStateFromProps == "function" ||
				typeof l.getSnapshotBeforeUpdate == "function" ||
				(typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function") ||
				((t = l.state),
				typeof l.componentWillMount == "function" && l.componentWillMount(),
				typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(),
				t !== l.state && el.enqueueReplaceState(l, l.state, null),
				br(e, n, l, r),
				(l.state = e.memoizedState)),
			typeof l.componentDidMount == "function" && (e.flags |= 4194308);
	}
	function rr(e, t, n) {
		if (((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")) {
			if (n._owner) {
				if (((n = n._owner), n)) {
					if (n.tag !== 1) throw Error(m(309));
					var r = n.stateNode;
				}
				if (!r) throw Error(m(147, e));
				var l = r,
					u = "" + e;
				return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === u
					? t.ref
					: ((t = function (i) {
							var o = l.refs;
							o === is && (o = l.refs = {}), i === null ? delete o[u] : (o[u] = i);
						}),
						(t._stringRef = u),
						t);
			}
			if (typeof e != "string") throw Error(m(284));
			if (!n._owner) throw Error(m(290, e));
		}
		return e;
	}
	function tl(e, t) {
		throw ((e = Object.prototype.toString.call(t)), Error(m(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function cs(e) {
		var t = e._init;
		return t(e._payload);
	}
	function fs(e) {
		function t(f, c) {
			if (e) {
				var d = f.deletions;
				d === null ? ((f.deletions = [c]), (f.flags |= 16)) : d.push(c);
			}
		}
		function n(f, c) {
			if (!e) return null;
			for (; c !== null; ) t(f, c), (c = c.sibling);
			return null;
		}
		function r(f, c) {
			for (f = new Map(); c !== null; ) c.key !== null ? f.set(c.key, c) : f.set(c.index, c), (c = c.sibling);
			return f;
		}
		function l(f, c) {
			return (f = Wt(f, c)), (f.index = 0), (f.sibling = null), f;
		}
		function u(f, c, d) {
			return (f.index = d), e ? ((d = f.alternate), d !== null ? ((d = d.index), d < c ? ((f.flags |= 2), c) : d) : ((f.flags |= 2), c)) : ((f.flags |= 1048576), c);
		}
		function i(f) {
			return e && f.alternate === null && (f.flags |= 2), f;
		}
		function o(f, c, d, w) {
			return c === null || c.tag !== 6 ? ((c = yi(d, f.mode, w)), (c.return = f), c) : ((c = l(c, d)), (c.return = f), c);
		}
		function s(f, c, d, w) {
			var L = d.type;
			return L === Te
				? y(f, c, d.props.children, w, d.key)
				: c !== null && (c.elementType === L || (typeof L == "object" && L !== null && L.$$typeof === je && cs(L) === c.type))
					? ((w = l(c, d.props)), (w.ref = rr(f, c, d)), (w.return = f), w)
					: ((w = Sl(d.type, d.key, d.props, null, f.mode, w)), (w.ref = rr(f, c, d)), (w.return = f), w);
		}
		function p(f, c, d, w) {
			return c === null || c.tag !== 4 || c.stateNode.containerInfo !== d.containerInfo || c.stateNode.implementation !== d.implementation
				? ((c = gi(d, f.mode, w)), (c.return = f), c)
				: ((c = l(c, d.children || [])), (c.return = f), c);
		}
		function y(f, c, d, w, L) {
			return c === null || c.tag !== 7 ? ((c = un(d, f.mode, w, L)), (c.return = f), c) : ((c = l(c, d)), (c.return = f), c);
		}
		function g(f, c, d) {
			if ((typeof c == "string" && c !== "") || typeof c == "number") return (c = yi("" + c, f.mode, d)), (c.return = f), c;
			if (typeof c == "object" && c !== null) {
				switch (c.$$typeof) {
					case be:
						return (d = Sl(c.type, c.key, c.props, null, f.mode, d)), (d.ref = rr(f, null, c)), (d.return = f), d;
					case Ne:
						return (c = gi(c, f.mode, d)), (c.return = f), c;
					case je:
						var w = c._init;
						return g(f, w(c._payload), d);
				}
				if (Rn(c) || D(c)) return (c = un(c, f.mode, d, null)), (c.return = f), c;
				tl(f, c);
			}
			return null;
		}
		function h(f, c, d, w) {
			var L = c !== null ? c.key : null;
			if ((typeof d == "string" && d !== "") || typeof d == "number") return L !== null ? null : o(f, c, "" + d, w);
			if (typeof d == "object" && d !== null) {
				switch (d.$$typeof) {
					case be:
						return d.key === L ? s(f, c, d, w) : null;
					case Ne:
						return d.key === L ? p(f, c, d, w) : null;
					case je:
						return (L = d._init), h(f, c, L(d._payload), w);
				}
				if (Rn(d) || D(d)) return L !== null ? null : y(f, c, d, w, null);
				tl(f, d);
			}
			return null;
		}
		function x(f, c, d, w, L) {
			if ((typeof w == "string" && w !== "") || typeof w == "number") return (f = f.get(d) || null), o(c, f, "" + w, L);
			if (typeof w == "object" && w !== null) {
				switch (w.$$typeof) {
					case be:
						return (f = f.get(w.key === null ? d : w.key) || null), s(c, f, w, L);
					case Ne:
						return (f = f.get(w.key === null ? d : w.key) || null), p(c, f, w, L);
					case je:
						var j = w._init;
						return x(f, c, d, j(w._payload), L);
				}
				if (Rn(w) || D(w)) return (f = f.get(d) || null), y(c, f, w, L, null);
				tl(c, w);
			}
			return null;
		}
		function _(f, c, d, w) {
			for (var L = null, j = null, R = c, M = (c = 0), ye = null; R !== null && M < d.length; M++) {
				R.index > M ? ((ye = R), (R = null)) : (ye = R.sibling);
				var B = h(f, R, d[M], w);
				if (B === null) {
					R === null && (R = ye);
					break;
				}
				e && R && B.alternate === null && t(f, R), (c = u(B, c, M)), j === null ? (L = B) : (j.sibling = B), (j = B), (R = ye);
			}
			if (M === d.length) return n(f, R), re && Jt(f, M), L;
			if (R === null) {
				for (; M < d.length; M++) (R = g(f, d[M], w)), R !== null && ((c = u(R, c, M)), j === null ? (L = R) : (j.sibling = R), (j = R));
				return re && Jt(f, M), L;
			}
			for (R = r(f, R); M < d.length; M++)
				(ye = x(R, f, M, d[M], w)),
					ye !== null && (e && ye.alternate !== null && R.delete(ye.key === null ? M : ye.key), (c = u(ye, c, M)), j === null ? (L = ye) : (j.sibling = ye), (j = ye));
			return (
				e &&
					R.forEach(function (Qt) {
						return t(f, Qt);
					}),
				re && Jt(f, M),
				L
			);
		}
		function N(f, c, d, w) {
			var L = D(d);
			if (typeof L != "function") throw Error(m(150));
			if (((d = L.call(d)), d == null)) throw Error(m(151));
			for (var j = (L = null), R = c, M = (c = 0), ye = null, B = d.next(); R !== null && !B.done; M++, B = d.next()) {
				R.index > M ? ((ye = R), (R = null)) : (ye = R.sibling);
				var Qt = h(f, R, B.value, w);
				if (Qt === null) {
					R === null && (R = ye);
					break;
				}
				e && R && Qt.alternate === null && t(f, R), (c = u(Qt, c, M)), j === null ? (L = Qt) : (j.sibling = Qt), (j = Qt), (R = ye);
			}
			if (B.done) return n(f, R), re && Jt(f, M), L;
			if (R === null) {
				for (; !B.done; M++, B = d.next()) (B = g(f, B.value, w)), B !== null && ((c = u(B, c, M)), j === null ? (L = B) : (j.sibling = B), (j = B));
				return re && Jt(f, M), L;
			}
			for (R = r(f, R); !B.done; M++, B = d.next())
				(B = x(R, f, M, B.value, w)),
					B !== null && (e && B.alternate !== null && R.delete(B.key === null ? M : B.key), (c = u(B, c, M)), j === null ? (L = B) : (j.sibling = B), (j = B));
			return (
				e &&
					R.forEach(function (Uf) {
						return t(f, Uf);
					}),
				re && Jt(f, M),
				L
			);
		}
		function fe(f, c, d, w) {
			if ((typeof d == "object" && d !== null && d.type === Te && d.key === null && (d = d.props.children), typeof d == "object" && d !== null)) {
				switch (d.$$typeof) {
					case be:
						e: {
							for (var L = d.key, j = c; j !== null; ) {
								if (j.key === L) {
									if (((L = d.type), L === Te)) {
										if (j.tag === 7) {
											n(f, j.sibling), (c = l(j, d.props.children)), (c.return = f), (f = c);
											break e;
										}
									} else if (j.elementType === L || (typeof L == "object" && L !== null && L.$$typeof === je && cs(L) === j.type)) {
										n(f, j.sibling), (c = l(j, d.props)), (c.ref = rr(f, j, d)), (c.return = f), (f = c);
										break e;
									}
									n(f, j);
									break;
								} else t(f, j);
								j = j.sibling;
							}
							d.type === Te
								? ((c = un(d.props.children, f.mode, w, d.key)), (c.return = f), (f = c))
								: ((w = Sl(d.type, d.key, d.props, null, f.mode, w)), (w.ref = rr(f, c, d)), (w.return = f), (f = w));
						}
						return i(f);
					case Ne:
						e: {
							for (j = d.key; c !== null; ) {
								if (c.key === j)
									if (c.tag === 4 && c.stateNode.containerInfo === d.containerInfo && c.stateNode.implementation === d.implementation) {
										n(f, c.sibling), (c = l(c, d.children || [])), (c.return = f), (f = c);
										break e;
									} else {
										n(f, c);
										break;
									}
								else t(f, c);
								c = c.sibling;
							}
							(c = gi(d, f.mode, w)), (c.return = f), (f = c);
						}
						return i(f);
					case je:
						return (j = d._init), fe(f, c, j(d._payload), w);
				}
				if (Rn(d)) return _(f, c, d, w);
				if (D(d)) return N(f, c, d, w);
				tl(f, d);
			}
			return (typeof d == "string" && d !== "") || typeof d == "number"
				? ((d = "" + d), c !== null && c.tag === 6 ? (n(f, c.sibling), (c = l(c, d)), (c.return = f), (f = c)) : (n(f, c), (c = yi(d, f.mode, w)), (c.return = f), (f = c)), i(f))
				: n(f, c);
		}
		return fe;
	}
	var _n = fs(!0),
		ds = fs(!1),
		lr = {},
		pt = Mt(lr),
		ur = Mt(lr),
		ir = Mt(lr);
	function bt(e) {
		if (e === lr) throw Error(m(174));
		return e;
	}
	function Ou(e, t) {
		switch ((ee(ir, t), ee(ur, e), ee(pt, lr), (e = t.nodeType), e)) {
			case 9:
			case 11:
				t = (t = t.documentElement) ? t.namespaceURI : Ml(null, "");
				break;
			default:
				(e = e === 8 ? t.parentNode : t), (t = e.namespaceURI || null), (e = e.tagName), (t = Ml(t, e));
		}
		ne(pt), ee(pt, t);
	}
	function Nn() {
		ne(pt), ne(ur), ne(ir);
	}
	function ps(e) {
		bt(ir.current);
		var t = bt(pt.current),
			n = Ml(t, e.type);
		t !== n && (ee(ur, e), ee(pt, n));
	}
	function Iu(e) {
		ur.current === e && (ne(pt), ne(ur));
	}
	var ue = Mt(0);
	function nl(e) {
		for (var t = e; t !== null; ) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
				if ((t.flags & 128) !== 0) return t;
			} else if (t.child !== null) {
				(t.child.return = t), (t = t.child);
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null; ) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			(t.sibling.return = t.return), (t = t.sibling);
		}
		return null;
	}
	var Fu = [];
	function Uu() {
		for (var e = 0; e < Fu.length; e++) Fu[e]._workInProgressVersionPrimary = null;
		Fu.length = 0;
	}
	var rl = Se.ReactCurrentDispatcher,
		Vu = Se.ReactCurrentBatchConfig,
		en = 0,
		ie = null,
		pe = null,
		he = null,
		ll = !1,
		or = !1,
		sr = 0,
		uf = 0;
	function Ce() {
		throw Error(m(321));
	}
	function Au(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!nt(e[n], t[n])) return !1;
		return !0;
	}
	function Bu(e, t, n, r, l, u) {
		if (((en = u), (ie = t), (t.memoizedState = null), (t.updateQueue = null), (t.lanes = 0), (rl.current = e === null || e.memoizedState === null ? cf : ff), (e = n(r, l)), or)) {
			u = 0;
			do {
				if (((or = !1), (sr = 0), 25 <= u)) throw Error(m(301));
				(u += 1), (he = pe = null), (t.updateQueue = null), (rl.current = df), (e = n(r, l));
			} while (or);
		}
		if (((rl.current = ol), (t = pe !== null && pe.next !== null), (en = 0), (he = pe = ie = null), (ll = !1), t)) throw Error(m(300));
		return e;
	}
	function Hu() {
		var e = sr !== 0;
		return (sr = 0), e;
	}
	function mt() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null,
		};
		return he === null ? (ie.memoizedState = he = e) : (he = he.next = e), he;
	}
	function Ye() {
		if (pe === null) {
			var e = ie.alternate;
			e = e !== null ? e.memoizedState : null;
		} else e = pe.next;
		var t = he === null ? ie.memoizedState : he.next;
		if (t !== null) (he = t), (pe = e);
		else {
			if (e === null) throw Error(m(310));
			(pe = e),
				(e = {
					memoizedState: pe.memoizedState,
					baseState: pe.baseState,
					baseQueue: pe.baseQueue,
					queue: pe.queue,
					next: null,
				}),
				he === null ? (ie.memoizedState = he = e) : (he = he.next = e);
		}
		return he;
	}
	function ar(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function $u(e) {
		var t = Ye(),
			n = t.queue;
		if (n === null) throw Error(m(311));
		n.lastRenderedReducer = e;
		var r = pe,
			l = r.baseQueue,
			u = n.pending;
		if (u !== null) {
			if (l !== null) {
				var i = l.next;
				(l.next = u.next), (u.next = i);
			}
			(r.baseQueue = l = u), (n.pending = null);
		}
		if (l !== null) {
			(u = l.next), (r = r.baseState);
			var o = (i = null),
				s = null,
				p = u;
			do {
				var y = p.lane;
				if ((en & y) === y)
					s !== null &&
						(s = s.next =
							{
								lane: 0,
								action: p.action,
								hasEagerState: p.hasEagerState,
								eagerState: p.eagerState,
								next: null,
							}),
						(r = p.hasEagerState ? p.eagerState : e(r, p.action));
				else {
					var g = {
						lane: y,
						action: p.action,
						hasEagerState: p.hasEagerState,
						eagerState: p.eagerState,
						next: null,
					};
					s === null ? ((o = s = g), (i = r)) : (s = s.next = g), (ie.lanes |= y), (tn |= y);
				}
				p = p.next;
			} while (p !== null && p !== u);
			s === null ? (i = r) : (s.next = o), nt(r, t.memoizedState) || (Oe = !0), (t.memoizedState = r), (t.baseState = i), (t.baseQueue = s), (n.lastRenderedState = r);
		}
		if (((e = n.interleaved), e !== null)) {
			l = e;
			do (u = l.lane), (ie.lanes |= u), (tn |= u), (l = l.next);
			while (l !== e);
		} else l === null && (n.lanes = 0);
		return [t.memoizedState, n.dispatch];
	}
	function Wu(e) {
		var t = Ye(),
			n = t.queue;
		if (n === null) throw Error(m(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch,
			l = n.pending,
			u = t.memoizedState;
		if (l !== null) {
			n.pending = null;
			var i = (l = l.next);
			do (u = e(u, i.action)), (i = i.next);
			while (i !== l);
			nt(u, t.memoizedState) || (Oe = !0), (t.memoizedState = u), t.baseQueue === null && (t.baseState = u), (n.lastRenderedState = u);
		}
		return [u, r];
	}
	function ms() {}
	function hs(e, t) {
		var n = ie,
			r = Ye(),
			l = t(),
			u = !nt(r.memoizedState, l);
		if ((u && ((r.memoizedState = l), (Oe = !0)), (r = r.queue), Qu(gs.bind(null, n, r, e), [e]), r.getSnapshot !== t || u || (he !== null && he.memoizedState.tag & 1))) {
			if (((n.flags |= 2048), cr(9, ys.bind(null, n, r, l, t), void 0, null), ve === null)) throw Error(m(349));
			(en & 30) !== 0 || vs(n, t, l);
		}
		return l;
	}
	function vs(e, t, n) {
		(e.flags |= 16384),
			(e = { getSnapshot: t, value: n }),
			(t = ie.updateQueue),
			t === null ? ((t = { lastEffect: null, stores: null }), (ie.updateQueue = t), (t.stores = [e])) : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
	}
	function ys(e, t, n, r) {
		(t.value = n), (t.getSnapshot = r), ws(t) && Ss(e);
	}
	function gs(e, t, n) {
		return n(function () {
			ws(t) && Ss(e);
		});
	}
	function ws(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !nt(e, n);
		} catch {
			return !0;
		}
	}
	function Ss(e) {
		var t = Ct(e, 1);
		t !== null && ot(t, e, 1, -1);
	}
	function ks(e) {
		var t = mt();
		return (
			typeof e == "function" && (e = e()),
			(t.memoizedState = t.baseState = e),
			(e = {
				pending: null,
				interleaved: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ar,
				lastRenderedState: e,
			}),
			(t.queue = e),
			(e = e.dispatch = af.bind(null, ie, e)),
			[t.memoizedState, e]
		);
	}
	function cr(e, t, n, r) {
		return (
			(e = { tag: e, create: t, destroy: n, deps: r, next: null }),
			(t = ie.updateQueue),
			t === null
				? ((t = { lastEffect: null, stores: null }), (ie.updateQueue = t), (t.lastEffect = e.next = e))
				: ((n = t.lastEffect), n === null ? (t.lastEffect = e.next = e) : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
			e
		);
	}
	function Cs() {
		return Ye().memoizedState;
	}
	function ul(e, t, n, r) {
		var l = mt();
		(ie.flags |= e), (l.memoizedState = cr(1 | t, n, void 0, r === void 0 ? null : r));
	}
	function il(e, t, n, r) {
		var l = Ye();
		r = r === void 0 ? null : r;
		var u = void 0;
		if (pe !== null) {
			var i = pe.memoizedState;
			if (((u = i.destroy), r !== null && Au(r, i.deps))) {
				l.memoizedState = cr(t, n, u, r);
				return;
			}
		}
		(ie.flags |= e), (l.memoizedState = cr(1 | t, n, u, r));
	}
	function xs(e, t) {
		return ul(8390656, 8, e, t);
	}
	function Qu(e, t) {
		return il(2048, 8, e, t);
	}
	function Es(e, t) {
		return il(4, 2, e, t);
	}
	function _s(e, t) {
		return il(4, 4, e, t);
	}
	function Ns(e, t) {
		if (typeof t == "function")
			return (
				(e = e()),
				t(e),
				function () {
					t(null);
				}
			);
		if (t != null)
			return (
				(e = e()),
				(t.current = e),
				function () {
					t.current = null;
				}
			);
	}
	function Ls(e, t, n) {
		return (n = n != null ? n.concat([e]) : null), il(4, 4, Ns.bind(null, t, e), n);
	}
	function Ku() {}
	function Ps(e, t) {
		var n = Ye();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && Au(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
	}
	function zs(e, t) {
		var n = Ye();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return r !== null && t !== null && Au(t, r[1]) ? r[0] : ((e = e()), (n.memoizedState = [e, t]), e);
	}
	function Ts(e, t, n) {
		return (en & 21) === 0 ? (e.baseState && ((e.baseState = !1), (Oe = !0)), (e.memoizedState = n)) : (nt(n, t) || ((n = to()), (ie.lanes |= n), (tn |= n), (e.baseState = !0)), t);
	}
	function of(e, t) {
		var n = G;
		(G = n !== 0 && 4 > n ? n : 4), e(!0);
		var r = Vu.transition;
		Vu.transition = {};
		try {
			e(!1), t();
		} finally {
			(G = n), (Vu.transition = r);
		}
	}
	function js() {
		return Ye().memoizedState;
	}
	function sf(e, t, n) {
		var r = Ht(e);
		if (
			((n = {
				lane: r,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null,
			}),
			Rs(e))
		)
			Ds(t, n);
		else if (((n = ns(e, t, n, r)), n !== null)) {
			var l = Pe();
			ot(n, e, r, l), Ms(n, t, r);
		}
	}
	function af(e, t, n) {
		var r = Ht(e),
			l = {
				lane: r,
				action: n,
				hasEagerState: !1,
				eagerState: null,
				next: null,
			};
		if (Rs(e)) Ds(t, l);
		else {
			var u = e.alternate;
			if (e.lanes === 0 && (u === null || u.lanes === 0) && ((u = t.lastRenderedReducer), u !== null))
				try {
					var i = t.lastRenderedState,
						o = u(i, n);
					if (((l.hasEagerState = !0), (l.eagerState = o), nt(o, i))) {
						var s = t.interleaved;
						s === null ? ((l.next = l), ju(t)) : ((l.next = s.next), (s.next = l)), (t.interleaved = l);
						return;
					}
				} catch {
				} finally {
				}
			(n = ns(e, t, l, r)), n !== null && ((l = Pe()), ot(n, e, r, l), Ms(n, t, r));
		}
	}
	function Rs(e) {
		var t = e.alternate;
		return e === ie || (t !== null && t === ie);
	}
	function Ds(e, t) {
		or = ll = !0;
		var n = e.pending;
		n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t);
	}
	function Ms(e, t, n) {
		if ((n & 4194240) !== 0) {
			var r = t.lanes;
			(r &= e.pendingLanes), (n |= r), (t.lanes = n), Kl(e, n);
		}
	}
	var ol = {
			readContext: Ze,
			useCallback: Ce,
			useContext: Ce,
			useEffect: Ce,
			useImperativeHandle: Ce,
			useInsertionEffect: Ce,
			useLayoutEffect: Ce,
			useMemo: Ce,
			useReducer: Ce,
			useRef: Ce,
			useState: Ce,
			useDebugValue: Ce,
			useDeferredValue: Ce,
			useTransition: Ce,
			useMutableSource: Ce,
			useSyncExternalStore: Ce,
			useId: Ce,
			unstable_isNewReconciler: !1,
		},
		cf = {
			readContext: Ze,
			useCallback: function (e, t) {
				return (mt().memoizedState = [e, t === void 0 ? null : t]), e;
			},
			useContext: Ze,
			useEffect: xs,
			useImperativeHandle: function (e, t, n) {
				return (n = n != null ? n.concat([e]) : null), ul(4194308, 4, Ns.bind(null, t, e), n);
			},
			useLayoutEffect: function (e, t) {
				return ul(4194308, 4, e, t);
			},
			useInsertionEffect: function (e, t) {
				return ul(4, 2, e, t);
			},
			useMemo: function (e, t) {
				var n = mt();
				return (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e;
			},
			useReducer: function (e, t, n) {
				var r = mt();
				return (
					(t = n !== void 0 ? n(t) : t),
					(r.memoizedState = r.baseState = t),
					(e = {
						pending: null,
						interleaved: null,
						lanes: 0,
						dispatch: null,
						lastRenderedReducer: e,
						lastRenderedState: t,
					}),
					(r.queue = e),
					(e = e.dispatch = sf.bind(null, ie, e)),
					[r.memoizedState, e]
				);
			},
			useRef: function (e) {
				var t = mt();
				return (e = { current: e }), (t.memoizedState = e);
			},
			useState: ks,
			useDebugValue: Ku,
			useDeferredValue: function (e) {
				return (mt().memoizedState = e);
			},
			useTransition: function () {
				var e = ks(!1),
					t = e[0];
				return (e = of.bind(null, e[1])), (mt().memoizedState = e), [t, e];
			},
			useMutableSource: function () {},
			useSyncExternalStore: function (e, t, n) {
				var r = ie,
					l = mt();
				if (re) {
					if (n === void 0) throw Error(m(407));
					n = n();
				} else {
					if (((n = t()), ve === null)) throw Error(m(349));
					(en & 30) !== 0 || vs(r, t, n);
				}
				l.memoizedState = n;
				var u = { value: n, getSnapshot: t };
				return (l.queue = u), xs(gs.bind(null, r, u, e), [e]), (r.flags |= 2048), cr(9, ys.bind(null, r, u, n, t), void 0, null), n;
			},
			useId: function () {
				var e = mt(),
					t = ve.identifierPrefix;
				if (re) {
					var n = kt,
						r = St;
					(n = (r & ~(1 << (32 - tt(r) - 1))).toString(32) + n), (t = ":" + t + "R" + n), (n = sr++), 0 < n && (t += "H" + n.toString(32)), (t += ":");
				} else (n = uf++), (t = ":" + t + "r" + n.toString(32) + ":");
				return (e.memoizedState = t);
			},
			unstable_isNewReconciler: !1,
		},
		ff = {
			readContext: Ze,
			useCallback: Ps,
			useContext: Ze,
			useEffect: Qu,
			useImperativeHandle: Ls,
			useInsertionEffect: Es,
			useLayoutEffect: _s,
			useMemo: zs,
			useReducer: $u,
			useRef: Cs,
			useState: function () {
				return $u(ar);
			},
			useDebugValue: Ku,
			useDeferredValue: function (e) {
				var t = Ye();
				return Ts(t, pe.memoizedState, e);
			},
			useTransition: function () {
				var e = $u(ar)[0],
					t = Ye().memoizedState;
				return [e, t];
			},
			useMutableSource: ms,
			useSyncExternalStore: hs,
			useId: js,
			unstable_isNewReconciler: !1,
		},
		df = {
			readContext: Ze,
			useCallback: Ps,
			useContext: Ze,
			useEffect: Qu,
			useImperativeHandle: Ls,
			useInsertionEffect: Es,
			useLayoutEffect: _s,
			useMemo: zs,
			useReducer: Wu,
			useRef: Cs,
			useState: function () {
				return Wu(ar);
			},
			useDebugValue: Ku,
			useDeferredValue: function (e) {
				var t = Ye();
				return pe === null ? (t.memoizedState = e) : Ts(t, pe.memoizedState, e);
			},
			useTransition: function () {
				var e = Wu(ar)[0],
					t = Ye().memoizedState;
				return [e, t];
			},
			useMutableSource: ms,
			useSyncExternalStore: hs,
			useId: js,
			unstable_isNewReconciler: !1,
		};
	function Ln(e, t) {
		try {
			var n = "",
				r = t;
			do (n += b(r)), (r = r.return);
			while (r);
			var l = n;
		} catch (u) {
			l =
				`
Error generating stack: ` +
				u.message +
				`
` +
				u.stack;
		}
		return { value: e, source: t, stack: l, digest: null };
	}
	function Zu(e, t, n) {
		return { value: e, source: null, stack: n ?? null, digest: t ?? null };
	}
	function Yu(e, t) {
		try {
			console.error(t.value);
		} catch (n) {
			setTimeout(function () {
				throw n;
			});
		}
	}
	var pf = typeof WeakMap == "function" ? WeakMap : Map;
	function Os(e, t, n) {
		(n = xt(-1, n)), (n.tag = 3), (n.payload = { element: null });
		var r = t.value;
		return (
			(n.callback = function () {
				ml || ((ml = !0), (ai = r)), Yu(e, t);
			}),
			n
		);
	}
	function Is(e, t, n) {
		(n = xt(-1, n)), (n.tag = 3);
		var r = e.type.getDerivedStateFromError;
		if (typeof r == "function") {
			var l = t.value;
			(n.payload = function () {
				return r(l);
			}),
				(n.callback = function () {
					Yu(e, t);
				});
		}
		var u = e.stateNode;
		return (
			u !== null &&
				typeof u.componentDidCatch == "function" &&
				(n.callback = function () {
					Yu(e, t), typeof r != "function" && (At === null ? (At = new Set([this])) : At.add(this));
					var i = t.stack;
					this.componentDidCatch(t.value, {
						componentStack: i !== null ? i : "",
					});
				}),
			n
		);
	}
	function Fs(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new pf();
			var l = new Set();
			r.set(t, l);
		} else (l = r.get(t)), l === void 0 && ((l = new Set()), r.set(t, l));
		l.has(n) || (l.add(n), (e = Lf.bind(null, e, t, n)), t.then(e, e));
	}
	function Us(e) {
		do {
			var t;
			if (((t = e.tag === 13) && ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)), t)) return e;
			e = e.return;
		} while (e !== null);
		return null;
	}
	function Vs(e, t, n, r, l) {
		return (e.mode & 1) === 0
			? (e === t
					? (e.flags |= 65536)
					: ((e.flags |= 128),
						(n.flags |= 131072),
						(n.flags &= -52805),
						n.tag === 1 && (n.alternate === null ? (n.tag = 17) : ((t = xt(-1, 1)), (t.tag = 2), Ut(n, t, 1))),
						(n.lanes |= 1)),
				e)
			: ((e.flags |= 65536), (e.lanes = l), e);
	}
	var mf = Se.ReactCurrentOwner,
		Oe = !1;
	function Le(e, t, n, r) {
		t.child = e === null ? ds(t, null, n, r) : _n(t, e.child, n, r);
	}
	function As(e, t, n, r, l) {
		n = n.render;
		var u = t.ref;
		return (
			En(t, l),
			(r = Bu(e, t, n, r, u, l)),
			(n = Hu()),
			e !== null && !Oe ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), Et(e, t, l)) : (re && n && Cu(t), (t.flags |= 1), Le(e, t, r, l), t.child)
		);
	}
	function Bs(e, t, n, r, l) {
		if (e === null) {
			var u = n.type;
			return typeof u == "function" && !vi(u) && u.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0
				? ((t.tag = 15), (t.type = u), Hs(e, t, u, r, l))
				: ((e = Sl(n.type, null, r, t, t.mode, l)), (e.ref = t.ref), (e.return = t), (t.child = e));
		}
		if (((u = e.child), (e.lanes & l) === 0)) {
			var i = u.memoizedProps;
			if (((n = n.compare), (n = n !== null ? n : Xn), n(i, r) && e.ref === t.ref)) return Et(e, t, l);
		}
		return (t.flags |= 1), (e = Wt(u, r)), (e.ref = t.ref), (e.return = t), (t.child = e);
	}
	function Hs(e, t, n, r, l) {
		if (e !== null) {
			var u = e.memoizedProps;
			if (Xn(u, r) && e.ref === t.ref)
				if (((Oe = !1), (t.pendingProps = r = u), (e.lanes & l) !== 0)) (e.flags & 131072) !== 0 && (Oe = !0);
				else return (t.lanes = e.lanes), Et(e, t, l);
		}
		return Gu(e, t, n, r, l);
	}
	function $s(e, t, n) {
		var r = t.pendingProps,
			l = r.children,
			u = e !== null ? e.memoizedState : null;
		if (r.mode === "hidden")
			if ((t.mode & 1) === 0)
				(t.memoizedState = {
					baseLanes: 0,
					cachePool: null,
					transitions: null,
				}),
					ee(zn, $e),
					($e |= n);
			else {
				if ((n & 1073741824) === 0)
					return (
						(e = u !== null ? u.baseLanes | n : n),
						(t.lanes = t.childLanes = 1073741824),
						(t.memoizedState = {
							baseLanes: e,
							cachePool: null,
							transitions: null,
						}),
						(t.updateQueue = null),
						ee(zn, $e),
						($e |= e),
						null
					);
				(t.memoizedState = {
					baseLanes: 0,
					cachePool: null,
					transitions: null,
				}),
					(r = u !== null ? u.baseLanes : n),
					ee(zn, $e),
					($e |= r);
			}
		else u !== null ? ((r = u.baseLanes | n), (t.memoizedState = null)) : (r = n), ee(zn, $e), ($e |= r);
		return Le(e, t, l, n), t.child;
	}
	function Ws(e, t) {
		var n = t.ref;
		((e === null && n !== null) || (e !== null && e.ref !== n)) && ((t.flags |= 512), (t.flags |= 2097152));
	}
	function Gu(e, t, n, r, l) {
		var u = Me(n) ? Gt : ke.current;
		return (
			(u = wn(t, u)),
			En(t, l),
			(n = Bu(e, t, n, r, u, l)),
			(r = Hu()),
			e !== null && !Oe ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l), Et(e, t, l)) : (re && r && Cu(t), (t.flags |= 1), Le(e, t, n, l), t.child)
		);
	}
	function Qs(e, t, n, r, l) {
		if (Me(n)) {
			var u = !0;
			Qr(t);
		} else u = !1;
		if ((En(t, l), t.stateNode === null)) al(e, t), ss(t, n, r), Mu(t, n, r, l), (r = !0);
		else if (e === null) {
			var i = t.stateNode,
				o = t.memoizedProps;
			i.props = o;
			var s = i.context,
				p = n.contextType;
			typeof p == "object" && p !== null ? (p = Ze(p)) : ((p = Me(n) ? Gt : ke.current), (p = wn(t, p)));
			var y = n.getDerivedStateFromProps,
				g = typeof y == "function" || typeof i.getSnapshotBeforeUpdate == "function";
			g || (typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function") || ((o !== r || s !== p) && as(t, i, r, p)), (Ft = !1);
			var h = t.memoizedState;
			(i.state = h),
				br(t, r, i, l),
				(s = t.memoizedState),
				o !== r || h !== s || De.current || Ft
					? (typeof y == "function" && (Du(t, n, y, r), (s = t.memoizedState)),
						(o = Ft || os(t, n, o, r, h, s, p))
							? (g ||
									(typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function") ||
									(typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()),
								typeof i.componentDidMount == "function" && (t.flags |= 4194308))
							: (typeof i.componentDidMount == "function" && (t.flags |= 4194308), (t.memoizedProps = r), (t.memoizedState = s)),
						(i.props = r),
						(i.state = s),
						(i.context = p),
						(r = o))
					: (typeof i.componentDidMount == "function" && (t.flags |= 4194308), (r = !1));
		} else {
			(i = t.stateNode),
				rs(e, t),
				(o = t.memoizedProps),
				(p = t.type === t.elementType ? o : lt(t.type, o)),
				(i.props = p),
				(g = t.pendingProps),
				(h = i.context),
				(s = n.contextType),
				typeof s == "object" && s !== null ? (s = Ze(s)) : ((s = Me(n) ? Gt : ke.current), (s = wn(t, s)));
			var x = n.getDerivedStateFromProps;
			(y = typeof x == "function" || typeof i.getSnapshotBeforeUpdate == "function") ||
				(typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function") ||
				((o !== g || h !== s) && as(t, i, r, s)),
				(Ft = !1),
				(h = t.memoizedState),
				(i.state = h),
				br(t, r, i, l);
			var _ = t.memoizedState;
			o !== g || h !== _ || De.current || Ft
				? (typeof x == "function" && (Du(t, n, x, r), (_ = t.memoizedState)),
					(p = Ft || os(t, n, p, r, h, _, s) || !1)
						? (y ||
								(typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function") ||
								(typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, _, s),
								typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, _, s)),
							typeof i.componentDidUpdate == "function" && (t.flags |= 4),
							typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
						: (typeof i.componentDidUpdate != "function" || (o === e.memoizedProps && h === e.memoizedState) || (t.flags |= 4),
							typeof i.getSnapshotBeforeUpdate != "function" || (o === e.memoizedProps && h === e.memoizedState) || (t.flags |= 1024),
							(t.memoizedProps = r),
							(t.memoizedState = _)),
					(i.props = r),
					(i.state = _),
					(i.context = s),
					(r = p))
				: (typeof i.componentDidUpdate != "function" || (o === e.memoizedProps && h === e.memoizedState) || (t.flags |= 4),
					typeof i.getSnapshotBeforeUpdate != "function" || (o === e.memoizedProps && h === e.memoizedState) || (t.flags |= 1024),
					(r = !1));
		}
		return Xu(e, t, n, r, u, l);
	}
	function Xu(e, t, n, r, l, u) {
		Ws(e, t);
		var i = (t.flags & 128) !== 0;
		if (!r && !i) return l && Go(t, n, !1), Et(e, t, u);
		(r = t.stateNode), (mf.current = t);
		var o = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
		return (
			(t.flags |= 1), e !== null && i ? ((t.child = _n(t, e.child, null, u)), (t.child = _n(t, null, o, u))) : Le(e, t, o, u), (t.memoizedState = r.state), l && Go(t, n, !0), t.child
		);
	}
	function Ks(e) {
		var t = e.stateNode;
		t.pendingContext ? Zo(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Zo(e, t.context, !1), Ou(e, t.containerInfo);
	}
	function Zs(e, t, n, r, l) {
		return Cn(), Nu(l), (t.flags |= 256), Le(e, t, n, r), t.child;
	}
	var Ju = { dehydrated: null, treeContext: null, retryLane: 0 };
	function qu(e) {
		return { baseLanes: e, cachePool: null, transitions: null };
	}
	function Ys(e, t, n) {
		var r = t.pendingProps,
			l = ue.current,
			u = !1,
			i = (t.flags & 128) !== 0,
			o;
		if (
			((o = i) || (o = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0),
			o ? ((u = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (l |= 1),
			ee(ue, l & 1),
			e === null)
		)
			return (
				_u(t),
				(e = t.memoizedState),
				e !== null && ((e = e.dehydrated), e !== null)
					? ((t.mode & 1) === 0 ? (t.lanes = 1) : e.data === "$!" ? (t.lanes = 8) : (t.lanes = 1073741824), null)
					: ((i = r.children),
						(e = r.fallback),
						u
							? ((r = t.mode),
								(u = t.child),
								(i = { mode: "hidden", children: i }),
								(r & 1) === 0 && u !== null ? ((u.childLanes = 0), (u.pendingProps = i)) : (u = kl(i, r, 0, null)),
								(e = un(e, r, n, null)),
								(u.return = t),
								(e.return = t),
								(u.sibling = e),
								(t.child = u),
								(t.child.memoizedState = qu(n)),
								(t.memoizedState = Ju),
								e)
							: bu(t, i))
			);
		if (((l = e.memoizedState), l !== null && ((o = l.dehydrated), o !== null))) return hf(e, t, i, r, o, l, n);
		if (u) {
			(u = r.fallback), (i = t.mode), (l = e.child), (o = l.sibling);
			var s = { mode: "hidden", children: r.children };
			return (
				(i & 1) === 0 && t.child !== l
					? ((r = t.child), (r.childLanes = 0), (r.pendingProps = s), (t.deletions = null))
					: ((r = Wt(l, s)), (r.subtreeFlags = l.subtreeFlags & 14680064)),
				o !== null ? (u = Wt(o, u)) : ((u = un(u, i, n, null)), (u.flags |= 2)),
				(u.return = t),
				(r.return = t),
				(r.sibling = u),
				(t.child = r),
				(r = u),
				(u = t.child),
				(i = e.child.memoizedState),
				(i =
					i === null
						? qu(n)
						: {
								baseLanes: i.baseLanes | n,
								cachePool: null,
								transitions: i.transitions,
							}),
				(u.memoizedState = i),
				(u.childLanes = e.childLanes & ~n),
				(t.memoizedState = Ju),
				r
			);
		}
		return (
			(u = e.child),
			(e = u.sibling),
			(r = Wt(u, { mode: "visible", children: r.children })),
			(t.mode & 1) === 0 && (r.lanes = n),
			(r.return = t),
			(r.sibling = null),
			e !== null && ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
			(t.child = r),
			(t.memoizedState = null),
			r
		);
	}
	function bu(e, t) {
		return (t = kl({ mode: "visible", children: t }, e.mode, 0, null)), (t.return = e), (e.child = t);
	}
	function sl(e, t, n, r) {
		return r !== null && Nu(r), _n(t, e.child, null, n), (e = bu(t, t.pendingProps.children)), (e.flags |= 2), (t.memoizedState = null), e;
	}
	function hf(e, t, n, r, l, u, i) {
		if (n)
			return t.flags & 256
				? ((t.flags &= -257), (r = Zu(Error(m(422)))), sl(e, t, i, r))
				: t.memoizedState !== null
					? ((t.child = e.child), (t.flags |= 128), null)
					: ((u = r.fallback),
						(l = t.mode),
						(r = kl({ mode: "visible", children: r.children }, l, 0, null)),
						(u = un(u, l, i, null)),
						(u.flags |= 2),
						(r.return = t),
						(u.return = t),
						(r.sibling = u),
						(t.child = r),
						(t.mode & 1) !== 0 && _n(t, e.child, null, i),
						(t.child.memoizedState = qu(i)),
						(t.memoizedState = Ju),
						u);
		if ((t.mode & 1) === 0) return sl(e, t, i, null);
		if (l.data === "$!") {
			if (((r = l.nextSibling && l.nextSibling.dataset), r)) var o = r.dgst;
			return (r = o), (u = Error(m(419))), (r = Zu(u, r, void 0)), sl(e, t, i, r);
		}
		if (((o = (i & e.childLanes) !== 0), Oe || o)) {
			if (((r = ve), r !== null)) {
				switch (i & -i) {
					case 4:
						l = 2;
						break;
					case 16:
						l = 8;
						break;
					case 64:
					case 128:
					case 256:
					case 512:
					case 1024:
					case 2048:
					case 4096:
					case 8192:
					case 16384:
					case 32768:
					case 65536:
					case 131072:
					case 262144:
					case 524288:
					case 1048576:
					case 2097152:
					case 4194304:
					case 8388608:
					case 16777216:
					case 33554432:
					case 67108864:
						l = 32;
						break;
					case 536870912:
						l = 268435456;
						break;
					default:
						l = 0;
				}
				(l = (l & (r.suspendedLanes | i)) !== 0 ? 0 : l), l !== 0 && l !== u.retryLane && ((u.retryLane = l), Ct(e, l), ot(r, e, l, -1));
			}
			return hi(), (r = Zu(Error(m(421)))), sl(e, t, i, r);
		}
		return l.data === "$?"
			? ((t.flags |= 128), (t.child = e.child), (t = Pf.bind(null, e)), (l._reactRetry = t), null)
			: ((e = u.treeContext),
				(He = Dt(l.nextSibling)),
				(Be = t),
				(re = !0),
				(rt = null),
				e !== null && ((Qe[Ke++] = St), (Qe[Ke++] = kt), (Qe[Ke++] = Xt), (St = e.id), (kt = e.overflow), (Xt = t)),
				(t = bu(t, r.children)),
				(t.flags |= 4096),
				t);
	}
	function Gs(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Tu(e.return, t, n);
	}
	function ei(e, t, n, r, l) {
		var u = e.memoizedState;
		u === null
			? (e.memoizedState = {
					isBackwards: t,
					rendering: null,
					renderingStartTime: 0,
					last: r,
					tail: n,
					tailMode: l,
				})
			: ((u.isBackwards = t), (u.rendering = null), (u.renderingStartTime = 0), (u.last = r), (u.tail = n), (u.tailMode = l));
	}
	function Xs(e, t, n) {
		var r = t.pendingProps,
			l = r.revealOrder,
			u = r.tail;
		if ((Le(e, t, r.children, n), (r = ue.current), (r & 2) !== 0)) (r = (r & 1) | 2), (t.flags |= 128);
		else {
			if (e !== null && (e.flags & 128) !== 0)
				e: for (e = t.child; e !== null; ) {
					if (e.tag === 13) e.memoizedState !== null && Gs(e, n, t);
					else if (e.tag === 19) Gs(e, n, t);
					else if (e.child !== null) {
						(e.child.return = e), (e = e.child);
						continue;
					}
					if (e === t) break e;
					for (; e.sibling === null; ) {
						if (e.return === null || e.return === t) break e;
						e = e.return;
					}
					(e.sibling.return = e.return), (e = e.sibling);
				}
			r &= 1;
		}
		if ((ee(ue, r), (t.mode & 1) === 0)) t.memoizedState = null;
		else
			switch (l) {
				case "forwards":
					for (n = t.child, l = null; n !== null; ) (e = n.alternate), e !== null && nl(e) === null && (l = n), (n = n.sibling);
					(n = l), n === null ? ((l = t.child), (t.child = null)) : ((l = n.sibling), (n.sibling = null)), ei(t, !1, l, n, u);
					break;
				case "backwards":
					for (n = null, l = t.child, t.child = null; l !== null; ) {
						if (((e = l.alternate), e !== null && nl(e) === null)) {
							t.child = l;
							break;
						}
						(e = l.sibling), (l.sibling = n), (n = l), (l = e);
					}
					ei(t, !0, n, null, u);
					break;
				case "together":
					ei(t, !1, null, null, void 0);
					break;
				default:
					t.memoizedState = null;
			}
		return t.child;
	}
	function al(e, t) {
		(t.mode & 1) === 0 && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
	}
	function Et(e, t, n) {
		if ((e !== null && (t.dependencies = e.dependencies), (tn |= t.lanes), (n & t.childLanes) === 0)) return null;
		if (e !== null && t.child !== e.child) throw Error(m(153));
		if (t.child !== null) {
			for (e = t.child, n = Wt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) (e = e.sibling), (n = n.sibling = Wt(e, e.pendingProps)), (n.return = t);
			n.sibling = null;
		}
		return t.child;
	}
	function vf(e, t, n) {
		switch (t.tag) {
			case 3:
				Ks(t), Cn();
				break;
			case 5:
				ps(t);
				break;
			case 1:
				Me(t.type) && Qr(t);
				break;
			case 4:
				Ou(t, t.stateNode.containerInfo);
				break;
			case 10:
				var r = t.type._context,
					l = t.memoizedProps.value;
				ee(Xr, r._currentValue), (r._currentValue = l);
				break;
			case 13:
				if (((r = t.memoizedState), r !== null))
					return r.dehydrated !== null
						? (ee(ue, ue.current & 1), (t.flags |= 128), null)
						: (n & t.child.childLanes) !== 0
							? Ys(e, t, n)
							: (ee(ue, ue.current & 1), (e = Et(e, t, n)), e !== null ? e.sibling : null);
				ee(ue, ue.current & 1);
				break;
			case 19:
				if (((r = (n & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
					if (r) return Xs(e, t, n);
					t.flags |= 128;
				}
				if (((l = t.memoizedState), l !== null && ((l.rendering = null), (l.tail = null), (l.lastEffect = null)), ee(ue, ue.current), r)) break;
				return null;
			case 22:
			case 23:
				return (t.lanes = 0), $s(e, t, n);
		}
		return Et(e, t, n);
	}
	var Js, ti, qs, bs;
	(Js = function (e, t) {
		for (var n = t.child; n !== null; ) {
			if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
			else if (n.tag !== 4 && n.child !== null) {
				(n.child.return = n), (n = n.child);
				continue;
			}
			if (n === t) break;
			for (; n.sibling === null; ) {
				if (n.return === null || n.return === t) return;
				n = n.return;
			}
			(n.sibling.return = n.return), (n = n.sibling);
		}
	}),
		(ti = function () {}),
		(qs = function (e, t, n, r) {
			var l = e.memoizedProps;
			if (l !== r) {
				(e = t.stateNode), bt(pt.current);
				var u = null;
				switch (n) {
					case "input":
						(l = Tl(e, l)), (r = Tl(e, r)), (u = []);
						break;
					case "select":
						(l = a({}, l, { value: void 0 })), (r = a({}, r, { value: void 0 })), (u = []);
						break;
					case "textarea":
						(l = Dl(e, l)), (r = Dl(e, r)), (u = []);
						break;
					default:
						typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Hr);
				}
				Ol(n, r);
				var i;
				n = null;
				for (p in l)
					if (!r.hasOwnProperty(p) && l.hasOwnProperty(p) && l[p] != null)
						if (p === "style") {
							var o = l[p];
							for (i in o) o.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
						} else
							p !== "dangerouslySetInnerHTML" &&
								p !== "children" &&
								p !== "suppressContentEditableWarning" &&
								p !== "suppressHydrationWarning" &&
								p !== "autoFocus" &&
								(O.hasOwnProperty(p) ? u || (u = []) : (u = u || []).push(p, null));
				for (p in r) {
					var s = r[p];
					if (((o = l != null ? l[p] : void 0), r.hasOwnProperty(p) && s !== o && (s != null || o != null)))
						if (p === "style")
							if (o) {
								for (i in o) !o.hasOwnProperty(i) || (s && s.hasOwnProperty(i)) || (n || (n = {}), (n[i] = ""));
								for (i in s) s.hasOwnProperty(i) && o[i] !== s[i] && (n || (n = {}), (n[i] = s[i]));
							} else n || (u || (u = []), u.push(p, n)), (n = s);
						else
							p === "dangerouslySetInnerHTML"
								? ((s = s ? s.__html : void 0), (o = o ? o.__html : void 0), s != null && o !== s && (u = u || []).push(p, s))
								: p === "children"
									? (typeof s != "string" && typeof s != "number") || (u = u || []).push(p, "" + s)
									: p !== "suppressContentEditableWarning" &&
										p !== "suppressHydrationWarning" &&
										(O.hasOwnProperty(p) ? (s != null && p === "onScroll" && te("scroll", e), u || o === s || (u = [])) : (u = u || []).push(p, s));
				}
				n && (u = u || []).push("style", n);
				var p = u;
				(t.updateQueue = p) && (t.flags |= 4);
			}
		}),
		(bs = function (e, t, n, r) {
			n !== r && (t.flags |= 4);
		});
	function fr(e, t) {
		if (!re)
			switch (e.tailMode) {
				case "hidden":
					t = e.tail;
					for (var n = null; t !== null; ) t.alternate !== null && (n = t), (t = t.sibling);
					n === null ? (e.tail = null) : (n.sibling = null);
					break;
				case "collapsed":
					n = e.tail;
					for (var r = null; n !== null; ) n.alternate !== null && (r = n), (n = n.sibling);
					r === null ? (t || e.tail === null ? (e.tail = null) : (e.tail.sibling = null)) : (r.sibling = null);
			}
	}
	function xe(e) {
		var t = e.alternate !== null && e.alternate.child === e.child,
			n = 0,
			r = 0;
		if (t) for (var l = e.child; l !== null; ) (n |= l.lanes | l.childLanes), (r |= l.subtreeFlags & 14680064), (r |= l.flags & 14680064), (l.return = e), (l = l.sibling);
		else for (l = e.child; l !== null; ) (n |= l.lanes | l.childLanes), (r |= l.subtreeFlags), (r |= l.flags), (l.return = e), (l = l.sibling);
		return (e.subtreeFlags |= r), (e.childLanes = n), t;
	}
	function yf(e, t, n) {
		var r = t.pendingProps;
		switch ((xu(t), t.tag)) {
			case 2:
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14:
				return xe(t), null;
			case 1:
				return Me(t.type) && Wr(), xe(t), null;
			case 3:
				return (
					(r = t.stateNode),
					Nn(),
					ne(De),
					ne(ke),
					Uu(),
					r.pendingContext && ((r.context = r.pendingContext), (r.pendingContext = null)),
					(e === null || e.child === null) &&
						(Gr(t) ? (t.flags |= 4) : e === null || (e.memoizedState.isDehydrated && (t.flags & 256) === 0) || ((t.flags |= 1024), rt !== null && (di(rt), (rt = null)))),
					ti(e, t),
					xe(t),
					null
				);
			case 5:
				Iu(t);
				var l = bt(ir.current);
				if (((n = t.type), e !== null && t.stateNode != null)) qs(e, t, n, r, l), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(m(166));
						return xe(t), null;
					}
					if (((e = bt(pt.current)), Gr(t))) {
						(r = t.stateNode), (n = t.type);
						var u = t.memoizedProps;
						switch (((r[dt] = t), (r[tr] = u), (e = (t.mode & 1) !== 0), n)) {
							case "dialog":
								te("cancel", r), te("close", r);
								break;
							case "iframe":
							case "object":
							case "embed":
								te("load", r);
								break;
							case "video":
							case "audio":
								for (l = 0; l < qn.length; l++) te(qn[l], r);
								break;
							case "source":
								te("error", r);
								break;
							case "img":
							case "image":
							case "link":
								te("error", r), te("load", r);
								break;
							case "details":
								te("toggle", r);
								break;
							case "input":
								ji(r, u), te("invalid", r);
								break;
							case "select":
								(r._wrapperState = { wasMultiple: !!u.multiple }), te("invalid", r);
								break;
							case "textarea":
								Mi(r, u), te("invalid", r);
						}
						Ol(n, u), (l = null);
						for (var i in u)
							if (u.hasOwnProperty(i)) {
								var o = u[i];
								i === "children"
									? typeof o == "string"
										? r.textContent !== o && (u.suppressHydrationWarning !== !0 && Br(r.textContent, o, e), (l = ["children", o]))
										: typeof o == "number" && r.textContent !== "" + o && (u.suppressHydrationWarning !== !0 && Br(r.textContent, o, e), (l = ["children", "" + o]))
									: O.hasOwnProperty(i) && o != null && i === "onScroll" && te("scroll", r);
							}
						switch (n) {
							case "input":
								gr(r), Di(r, u, !0);
								break;
							case "textarea":
								gr(r), Ii(r);
								break;
							case "select":
							case "option":
								break;
							default:
								typeof u.onClick == "function" && (r.onclick = Hr);
						}
						(r = l), (t.updateQueue = r), r !== null && (t.flags |= 4);
					} else {
						(i = l.nodeType === 9 ? l : l.ownerDocument),
							e === "http://www.w3.org/1999/xhtml" && (e = Fi(n)),
							e === "http://www.w3.org/1999/xhtml"
								? n === "script"
									? ((e = i.createElement("div")), (e.innerHTML = "<script></script>"), (e = e.removeChild(e.firstChild)))
									: typeof r.is == "string"
										? (e = i.createElement(n, { is: r.is }))
										: ((e = i.createElement(n)), n === "select" && ((i = e), r.multiple ? (i.multiple = !0) : r.size && (i.size = r.size)))
								: (e = i.createElementNS(e, n)),
							(e[dt] = t),
							(e[tr] = r),
							Js(e, t, !1, !1),
							(t.stateNode = e);
						e: {
							switch (((i = Il(n, r)), n)) {
								case "dialog":
									te("cancel", e), te("close", e), (l = r);
									break;
								case "iframe":
								case "object":
								case "embed":
									te("load", e), (l = r);
									break;
								case "video":
								case "audio":
									for (l = 0; l < qn.length; l++) te(qn[l], e);
									l = r;
									break;
								case "source":
									te("error", e), (l = r);
									break;
								case "img":
								case "image":
								case "link":
									te("error", e), te("load", e), (l = r);
									break;
								case "details":
									te("toggle", e), (l = r);
									break;
								case "input":
									ji(e, r), (l = Tl(e, r)), te("invalid", e);
									break;
								case "option":
									l = r;
									break;
								case "select":
									(e._wrapperState = { wasMultiple: !!r.multiple }), (l = a({}, r, { value: void 0 })), te("invalid", e);
									break;
								case "textarea":
									Mi(e, r), (l = Dl(e, r)), te("invalid", e);
									break;
								default:
									l = r;
							}
							Ol(n, l), (o = l);
							for (u in o)
								if (o.hasOwnProperty(u)) {
									var s = o[u];
									u === "style"
										? Ai(e, s)
										: u === "dangerouslySetInnerHTML"
											? ((s = s ? s.__html : void 0), s != null && Ui(e, s))
											: u === "children"
												? typeof s == "string"
													? (n !== "textarea" || s !== "") && Dn(e, s)
													: typeof s == "number" && Dn(e, "" + s)
												: u !== "suppressContentEditableWarning" &&
													u !== "suppressHydrationWarning" &&
													u !== "autoFocus" &&
													(O.hasOwnProperty(u) ? s != null && u === "onScroll" && te("scroll", e) : s != null && qe(e, u, s, i));
								}
							switch (n) {
								case "input":
									gr(e), Di(e, r, !1);
									break;
								case "textarea":
									gr(e), Ii(e);
									break;
								case "option":
									r.value != null && e.setAttribute("value", "" + Z(r.value));
									break;
								case "select":
									(e.multiple = !!r.multiple), (u = r.value), u != null ? on(e, !!r.multiple, u, !1) : r.defaultValue != null && on(e, !!r.multiple, r.defaultValue, !0);
									break;
								default:
									typeof l.onClick == "function" && (e.onclick = Hr);
							}
							switch (n) {
								case "button":
								case "input":
								case "select":
								case "textarea":
									r = !!r.autoFocus;
									break e;
								case "img":
									r = !0;
									break e;
								default:
									r = !1;
							}
						}
						r && (t.flags |= 4);
					}
					t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
				}
				return xe(t), null;
			case 6:
				if (e && t.stateNode != null) bs(e, t, e.memoizedProps, r);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(m(166));
					if (((n = bt(ir.current)), bt(pt.current), Gr(t))) {
						if (((r = t.stateNode), (n = t.memoizedProps), (r[dt] = t), (u = r.nodeValue !== n) && ((e = Be), e !== null)))
							switch (e.tag) {
								case 3:
									Br(r.nodeValue, n, (e.mode & 1) !== 0);
									break;
								case 5:
									e.memoizedProps.suppressHydrationWarning !== !0 && Br(r.nodeValue, n, (e.mode & 1) !== 0);
							}
						u && (t.flags |= 4);
					} else (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)), (r[dt] = t), (t.stateNode = r);
				}
				return xe(t), null;
			case 13:
				if ((ne(ue), (r = t.memoizedState), e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))) {
					if (re && He !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0) ts(), Cn(), (t.flags |= 98560), (u = !1);
					else if (((u = Gr(t)), r !== null && r.dehydrated !== null)) {
						if (e === null) {
							if (!u) throw Error(m(318));
							if (((u = t.memoizedState), (u = u !== null ? u.dehydrated : null), !u)) throw Error(m(317));
							u[dt] = t;
						} else Cn(), (t.flags & 128) === 0 && (t.memoizedState = null), (t.flags |= 4);
						xe(t), (u = !1);
					} else rt !== null && (di(rt), (rt = null)), (u = !0);
					if (!u) return t.flags & 65536 ? t : null;
				}
				return (t.flags & 128) !== 0
					? ((t.lanes = n), t)
					: ((r = r !== null),
						r !== (e !== null && e.memoizedState !== null) &&
							r &&
							((t.child.flags |= 8192), (t.mode & 1) !== 0 && (e === null || (ue.current & 1) !== 0 ? me === 0 && (me = 3) : hi())),
						t.updateQueue !== null && (t.flags |= 4),
						xe(t),
						null);
			case 4:
				return Nn(), ti(e, t), e === null && bn(t.stateNode.containerInfo), xe(t), null;
			case 10:
				return zu(t.type._context), xe(t), null;
			case 17:
				return Me(t.type) && Wr(), xe(t), null;
			case 19:
				if ((ne(ue), (u = t.memoizedState), u === null)) return xe(t), null;
				if (((r = (t.flags & 128) !== 0), (i = u.rendering), i === null))
					if (r) fr(u, !1);
					else {
						if (me !== 0 || (e !== null && (e.flags & 128) !== 0))
							for (e = t.child; e !== null; ) {
								if (((i = nl(e)), i !== null)) {
									for (
										t.flags |= 128, fr(u, !1), r = i.updateQueue, r !== null && ((t.updateQueue = r), (t.flags |= 4)), t.subtreeFlags = 0, r = n, n = t.child;
										n !== null;
									)
										(u = n),
											(e = r),
											(u.flags &= 14680066),
											(i = u.alternate),
											i === null
												? ((u.childLanes = 0),
													(u.lanes = e),
													(u.child = null),
													(u.subtreeFlags = 0),
													(u.memoizedProps = null),
													(u.memoizedState = null),
													(u.updateQueue = null),
													(u.dependencies = null),
													(u.stateNode = null))
												: ((u.childLanes = i.childLanes),
													(u.lanes = i.lanes),
													(u.child = i.child),
													(u.subtreeFlags = 0),
													(u.deletions = null),
													(u.memoizedProps = i.memoizedProps),
													(u.memoizedState = i.memoizedState),
													(u.updateQueue = i.updateQueue),
													(u.type = i.type),
													(e = i.dependencies),
													(u.dependencies =
														e === null
															? null
															: {
																	lanes: e.lanes,
																	firstContext: e.firstContext,
																})),
											(n = n.sibling);
									return ee(ue, (ue.current & 1) | 2), t.child;
								}
								e = e.sibling;
							}
						u.tail !== null && ce() > Tn && ((t.flags |= 128), (r = !0), fr(u, !1), (t.lanes = 4194304));
					}
				else {
					if (!r)
						if (((e = nl(i)), e !== null)) {
							if (
								((t.flags |= 128),
								(r = !0),
								(n = e.updateQueue),
								n !== null && ((t.updateQueue = n), (t.flags |= 4)),
								fr(u, !0),
								u.tail === null && u.tailMode === "hidden" && !i.alternate && !re)
							)
								return xe(t), null;
						} else 2 * ce() - u.renderingStartTime > Tn && n !== 1073741824 && ((t.flags |= 128), (r = !0), fr(u, !1), (t.lanes = 4194304));
					u.isBackwards ? ((i.sibling = t.child), (t.child = i)) : ((n = u.last), n !== null ? (n.sibling = i) : (t.child = i), (u.last = i));
				}
				return u.tail !== null
					? ((t = u.tail), (u.rendering = t), (u.tail = t.sibling), (u.renderingStartTime = ce()), (t.sibling = null), (n = ue.current), ee(ue, r ? (n & 1) | 2 : n & 1), t)
					: (xe(t), null);
			case 22:
			case 23:
				return (
					mi(),
					(r = t.memoizedState !== null),
					e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
					r && (t.mode & 1) !== 0 ? ($e & 1073741824) !== 0 && (xe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : xe(t),
					null
				);
			case 24:
				return null;
			case 25:
				return null;
		}
		throw Error(m(156, t.tag));
	}
	function gf(e, t) {
		switch ((xu(t), t.tag)) {
			case 1:
				return Me(t.type) && Wr(), (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
			case 3:
				return Nn(), ne(De), ne(ke), Uu(), (e = t.flags), (e & 65536) !== 0 && (e & 128) === 0 ? ((t.flags = (e & -65537) | 128), t) : null;
			case 5:
				return Iu(t), null;
			case 13:
				if ((ne(ue), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
					if (t.alternate === null) throw Error(m(340));
					Cn();
				}
				return (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null;
			case 19:
				return ne(ue), null;
			case 4:
				return Nn(), null;
			case 10:
				return zu(t.type._context), null;
			case 22:
			case 23:
				return mi(), null;
			case 24:
				return null;
			default:
				return null;
		}
	}
	var cl = !1,
		Ee = !1,
		wf = typeof WeakSet == "function" ? WeakSet : Set,
		E = null;
	function Pn(e, t) {
		var n = e.ref;
		if (n !== null)
			if (typeof n == "function")
				try {
					n(null);
				} catch (r) {
					se(e, t, r);
				}
			else n.current = null;
	}
	function ni(e, t, n) {
		try {
			n();
		} catch (r) {
			se(e, t, r);
		}
	}
	var ea = !1;
	function Sf(e, t) {
		if (((mu = Tr), (e = jo()), iu(e))) {
			if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
			else
				e: {
					n = ((n = e.ownerDocument) && n.defaultView) || window;
					var r = n.getSelection && n.getSelection();
					if (r && r.rangeCount !== 0) {
						n = r.anchorNode;
						var l = r.anchorOffset,
							u = r.focusNode;
						r = r.focusOffset;
						try {
							n.nodeType, u.nodeType;
						} catch {
							n = null;
							break e;
						}
						var i = 0,
							o = -1,
							s = -1,
							p = 0,
							y = 0,
							g = e,
							h = null;
						t: for (;;) {
							for (
								var x;
								g !== n || (l !== 0 && g.nodeType !== 3) || (o = i + l),
									g !== u || (r !== 0 && g.nodeType !== 3) || (s = i + r),
									g.nodeType === 3 && (i += g.nodeValue.length),
									(x = g.firstChild) !== null;
							)
								(h = g), (g = x);
							for (;;) {
								if (g === e) break t;
								if ((h === n && ++p === l && (o = i), h === u && ++y === r && (s = i), (x = g.nextSibling) !== null)) break;
								(g = h), (h = g.parentNode);
							}
							g = x;
						}
						n = o === -1 || s === -1 ? null : { start: o, end: s };
					} else n = null;
				}
			n = n || { start: 0, end: 0 };
		} else n = null;
		for (hu = { focusedElem: e, selectionRange: n }, Tr = !1, E = t; E !== null; )
			if (((t = E), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null)) (e.return = t), (E = e);
			else
				for (; E !== null; ) {
					t = E;
					try {
						var _ = t.alternate;
						if ((t.flags & 1024) !== 0)
							switch (t.tag) {
								case 0:
								case 11:
								case 15:
									break;
								case 1:
									if (_ !== null) {
										var N = _.memoizedProps,
											fe = _.memoizedState,
											f = t.stateNode,
											c = f.getSnapshotBeforeUpdate(t.elementType === t.type ? N : lt(t.type, N), fe);
										f.__reactInternalSnapshotBeforeUpdate = c;
									}
									break;
								case 3:
									var d = t.stateNode.containerInfo;
									d.nodeType === 1 ? (d.textContent = "") : d.nodeType === 9 && d.documentElement && d.removeChild(d.documentElement);
									break;
								case 5:
								case 6:
								case 4:
								case 17:
									break;
								default:
									throw Error(m(163));
							}
					} catch (w) {
						se(t, t.return, w);
					}
					if (((e = t.sibling), e !== null)) {
						(e.return = t.return), (E = e);
						break;
					}
					E = t.return;
				}
		return (_ = ea), (ea = !1), _;
	}
	function dr(e, t, n) {
		var r = t.updateQueue;
		if (((r = r !== null ? r.lastEffect : null), r !== null)) {
			var l = (r = r.next);
			do {
				if ((l.tag & e) === e) {
					var u = l.destroy;
					(l.destroy = void 0), u !== void 0 && ni(t, n, u);
				}
				l = l.next;
			} while (l !== r);
		}
	}
	function fl(e, t) {
		if (((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)) {
			var n = (t = t.next);
			do {
				if ((n.tag & e) === e) {
					var r = n.create;
					n.destroy = r();
				}
				n = n.next;
			} while (n !== t);
		}
	}
	function ri(e) {
		var t = e.ref;
		if (t !== null) {
			var n = e.stateNode;
			switch (e.tag) {
				case 5:
					e = n;
					break;
				default:
					e = n;
			}
			typeof t == "function" ? t(e) : (t.current = e);
		}
	}
	function ta(e) {
		var t = e.alternate;
		t !== null && ((e.alternate = null), ta(t)),
			(e.child = null),
			(e.deletions = null),
			(e.sibling = null),
			e.tag === 5 && ((t = e.stateNode), t !== null && (delete t[dt], delete t[tr], delete t[wu], delete t[tf], delete t[nf])),
			(e.stateNode = null),
			(e.return = null),
			(e.dependencies = null),
			(e.memoizedProps = null),
			(e.memoizedState = null),
			(e.pendingProps = null),
			(e.stateNode = null),
			(e.updateQueue = null);
	}
	function na(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 4;
	}
	function ra(e) {
		e: for (;;) {
			for (; e.sibling === null; ) {
				if (e.return === null || na(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
				if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
				(e.child.return = e), (e = e.child);
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function li(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6)
			(e = e.stateNode),
				t
					? n.nodeType === 8
						? n.parentNode.insertBefore(e, t)
						: n.insertBefore(e, t)
					: (n.nodeType === 8 ? ((t = n.parentNode), t.insertBefore(e, n)) : ((t = n), t.appendChild(e)),
						(n = n._reactRootContainer),
						n != null || t.onclick !== null || (t.onclick = Hr));
		else if (r !== 4 && ((e = e.child), e !== null)) for (li(e, t, n), e = e.sibling; e !== null; ) li(e, t, n), (e = e.sibling);
	}
	function ui(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && ((e = e.child), e !== null)) for (ui(e, t, n), e = e.sibling; e !== null; ) ui(e, t, n), (e = e.sibling);
	}
	var ge = null,
		ut = !1;
	function Vt(e, t, n) {
		for (n = n.child; n !== null; ) la(e, t, n), (n = n.sibling);
	}
	function la(e, t, n) {
		if (ft && typeof ft.onCommitFiberUnmount == "function")
			try {
				ft.onCommitFiberUnmount(Er, n);
			} catch {}
		switch (n.tag) {
			case 5:
				Ee || Pn(n, t);
			case 6:
				var r = ge,
					l = ut;
				(ge = null),
					Vt(e, t, n),
					(ge = r),
					(ut = l),
					ge !== null && (ut ? ((e = ge), (n = n.stateNode), e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ge.removeChild(n.stateNode));
				break;
			case 18:
				ge !== null && (ut ? ((e = ge), (n = n.stateNode), e.nodeType === 8 ? gu(e.parentNode, n) : e.nodeType === 1 && gu(e, n), Wn(e)) : gu(ge, n.stateNode));
				break;
			case 4:
				(r = ge), (l = ut), (ge = n.stateNode.containerInfo), (ut = !0), Vt(e, t, n), (ge = r), (ut = l);
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				if (!Ee && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
					l = r = r.next;
					do {
						var u = l,
							i = u.destroy;
						(u = u.tag), i !== void 0 && ((u & 2) !== 0 || (u & 4) !== 0) && ni(n, t, i), (l = l.next);
					} while (l !== r);
				}
				Vt(e, t, n);
				break;
			case 1:
				if (!Ee && (Pn(n, t), (r = n.stateNode), typeof r.componentWillUnmount == "function"))
					try {
						(r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount();
					} catch (o) {
						se(n, t, o);
					}
				Vt(e, t, n);
				break;
			case 21:
				Vt(e, t, n);
				break;
			case 22:
				n.mode & 1 ? ((Ee = (r = Ee) || n.memoizedState !== null), Vt(e, t, n), (Ee = r)) : Vt(e, t, n);
				break;
			default:
				Vt(e, t, n);
		}
	}
	function ua(e) {
		var t = e.updateQueue;
		if (t !== null) {
			e.updateQueue = null;
			var n = e.stateNode;
			n === null && (n = e.stateNode = new wf()),
				t.forEach(function (r) {
					var l = zf.bind(null, e, r);
					n.has(r) || (n.add(r), r.then(l, l));
				});
		}
	}
	function it(e, t) {
		var n = t.deletions;
		if (n !== null)
			for (var r = 0; r < n.length; r++) {
				var l = n[r];
				try {
					var u = e,
						i = t,
						o = i;
					e: for (; o !== null; ) {
						switch (o.tag) {
							case 5:
								(ge = o.stateNode), (ut = !1);
								break e;
							case 3:
								(ge = o.stateNode.containerInfo), (ut = !0);
								break e;
							case 4:
								(ge = o.stateNode.containerInfo), (ut = !0);
								break e;
						}
						o = o.return;
					}
					if (ge === null) throw Error(m(160));
					la(u, i, l), (ge = null), (ut = !1);
					var s = l.alternate;
					s !== null && (s.return = null), (l.return = null);
				} catch (p) {
					se(l, t, p);
				}
			}
		if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) ia(t, e), (t = t.sibling);
	}
	function ia(e, t) {
		var n = e.alternate,
			r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if ((it(t, e), ht(e), r & 4)) {
					try {
						dr(3, e, e.return), fl(3, e);
					} catch (N) {
						se(e, e.return, N);
					}
					try {
						dr(5, e, e.return);
					} catch (N) {
						se(e, e.return, N);
					}
				}
				break;
			case 1:
				it(t, e), ht(e), r & 512 && n !== null && Pn(n, n.return);
				break;
			case 5:
				if ((it(t, e), ht(e), r & 512 && n !== null && Pn(n, n.return), e.flags & 32)) {
					var l = e.stateNode;
					try {
						Dn(l, "");
					} catch (N) {
						se(e, e.return, N);
					}
				}
				if (r & 4 && ((l = e.stateNode), l != null)) {
					var u = e.memoizedProps,
						i = n !== null ? n.memoizedProps : u,
						o = e.type,
						s = e.updateQueue;
					if (((e.updateQueue = null), s !== null))
						try {
							o === "input" && u.type === "radio" && u.name != null && Ri(l, u), Il(o, i);
							var p = Il(o, u);
							for (i = 0; i < s.length; i += 2) {
								var y = s[i],
									g = s[i + 1];
								y === "style" ? Ai(l, g) : y === "dangerouslySetInnerHTML" ? Ui(l, g) : y === "children" ? Dn(l, g) : qe(l, y, g, p);
							}
							switch (o) {
								case "input":
									jl(l, u);
									break;
								case "textarea":
									Oi(l, u);
									break;
								case "select":
									var h = l._wrapperState.wasMultiple;
									l._wrapperState.wasMultiple = !!u.multiple;
									var x = u.value;
									x != null
										? on(l, !!u.multiple, x, !1)
										: h !== !!u.multiple && (u.defaultValue != null ? on(l, !!u.multiple, u.defaultValue, !0) : on(l, !!u.multiple, u.multiple ? [] : "", !1));
							}
							l[tr] = u;
						} catch (N) {
							se(e, e.return, N);
						}
				}
				break;
			case 6:
				if ((it(t, e), ht(e), r & 4)) {
					if (e.stateNode === null) throw Error(m(162));
					(l = e.stateNode), (u = e.memoizedProps);
					try {
						l.nodeValue = u;
					} catch (N) {
						se(e, e.return, N);
					}
				}
				break;
			case 3:
				if ((it(t, e), ht(e), r & 4 && n !== null && n.memoizedState.isDehydrated))
					try {
						Wn(t.containerInfo);
					} catch (N) {
						se(e, e.return, N);
					}
				break;
			case 4:
				it(t, e), ht(e);
				break;
			case 13:
				it(t, e),
					ht(e),
					(l = e.child),
					l.flags & 8192 && ((u = l.memoizedState !== null), (l.stateNode.isHidden = u), !u || (l.alternate !== null && l.alternate.memoizedState !== null) || (si = ce())),
					r & 4 && ua(e);
				break;
			case 22:
				if (((y = n !== null && n.memoizedState !== null), e.mode & 1 ? ((Ee = (p = Ee) || y), it(t, e), (Ee = p)) : it(t, e), ht(e), r & 8192)) {
					if (((p = e.memoizedState !== null), (e.stateNode.isHidden = p) && !y && (e.mode & 1) !== 0))
						for (E = e, y = e.child; y !== null; ) {
							for (g = E = y; E !== null; ) {
								switch (((h = E), (x = h.child), h.tag)) {
									case 0:
									case 11:
									case 14:
									case 15:
										dr(4, h, h.return);
										break;
									case 1:
										Pn(h, h.return);
										var _ = h.stateNode;
										if (typeof _.componentWillUnmount == "function") {
											(r = h), (n = h.return);
											try {
												(t = r), (_.props = t.memoizedProps), (_.state = t.memoizedState), _.componentWillUnmount();
											} catch (N) {
												se(r, n, N);
											}
										}
										break;
									case 5:
										Pn(h, h.return);
										break;
									case 22:
										if (h.memoizedState !== null) {
											aa(g);
											continue;
										}
								}
								x !== null ? ((x.return = h), (E = x)) : aa(g);
							}
							y = y.sibling;
						}
					e: for (y = null, g = e; ; ) {
						if (g.tag === 5) {
							if (y === null) {
								y = g;
								try {
									(l = g.stateNode),
										p
											? ((u = l.style), typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : (u.display = "none"))
											: ((o = g.stateNode),
												(s = g.memoizedProps.style),
												(i = s != null && s.hasOwnProperty("display") ? s.display : null),
												(o.style.display = Vi("display", i)));
								} catch (N) {
									se(e, e.return, N);
								}
							}
						} else if (g.tag === 6) {
							if (y === null)
								try {
									g.stateNode.nodeValue = p ? "" : g.memoizedProps;
								} catch (N) {
									se(e, e.return, N);
								}
						} else if (((g.tag !== 22 && g.tag !== 23) || g.memoizedState === null || g === e) && g.child !== null) {
							(g.child.return = g), (g = g.child);
							continue;
						}
						if (g === e) break e;
						for (; g.sibling === null; ) {
							if (g.return === null || g.return === e) break e;
							y === g && (y = null), (g = g.return);
						}
						y === g && (y = null), (g.sibling.return = g.return), (g = g.sibling);
					}
				}
				break;
			case 19:
				it(t, e), ht(e), r & 4 && ua(e);
				break;
			case 21:
				break;
			default:
				it(t, e), ht(e);
		}
	}
	function ht(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				e: {
					for (var n = e.return; n !== null; ) {
						if (na(n)) {
							var r = n;
							break e;
						}
						n = n.return;
					}
					throw Error(m(160));
				}
				switch (r.tag) {
					case 5:
						var l = r.stateNode;
						r.flags & 32 && (Dn(l, ""), (r.flags &= -33));
						var u = ra(e);
						ui(e, u, l);
						break;
					case 3:
					case 4:
						var i = r.stateNode.containerInfo,
							o = ra(e);
						li(e, o, i);
						break;
					default:
						throw Error(m(161));
				}
			} catch (s) {
				se(e, e.return, s);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function kf(e, t, n) {
		(E = e), oa(e);
	}
	function oa(e, t, n) {
		for (var r = (e.mode & 1) !== 0; E !== null; ) {
			var l = E,
				u = l.child;
			if (l.tag === 22 && r) {
				var i = l.memoizedState !== null || cl;
				if (!i) {
					var o = l.alternate,
						s = (o !== null && o.memoizedState !== null) || Ee;
					o = cl;
					var p = Ee;
					if (((cl = i), (Ee = s) && !p))
						for (E = l; E !== null; ) (i = E), (s = i.child), i.tag === 22 && i.memoizedState !== null ? ca(l) : s !== null ? ((s.return = i), (E = s)) : ca(l);
					for (; u !== null; ) (E = u), oa(u), (u = u.sibling);
					(E = l), (cl = o), (Ee = p);
				}
				sa(e);
			} else (l.subtreeFlags & 8772) !== 0 && u !== null ? ((u.return = l), (E = u)) : sa(e);
		}
	}
	function sa(e) {
		for (; E !== null; ) {
			var t = E;
			if ((t.flags & 8772) !== 0) {
				var n = t.alternate;
				try {
					if ((t.flags & 8772) !== 0)
						switch (t.tag) {
							case 0:
							case 11:
							case 15:
								Ee || fl(5, t);
								break;
							case 1:
								var r = t.stateNode;
								if (t.flags & 4 && !Ee)
									if (n === null) r.componentDidMount();
									else {
										var l = t.elementType === t.type ? n.memoizedProps : lt(t.type, n.memoizedProps);
										r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
									}
								var u = t.updateQueue;
								u !== null && us(t, u, r);
								break;
							case 3:
								var i = t.updateQueue;
								if (i !== null) {
									if (((n = null), t.child !== null))
										switch (t.child.tag) {
											case 5:
												n = t.child.stateNode;
												break;
											case 1:
												n = t.child.stateNode;
										}
									us(t, i, n);
								}
								break;
							case 5:
								var o = t.stateNode;
								if (n === null && t.flags & 4) {
									n = o;
									var s = t.memoizedProps;
									switch (t.type) {
										case "button":
										case "input":
										case "select":
										case "textarea":
											s.autoFocus && n.focus();
											break;
										case "img":
											s.src && (n.src = s.src);
									}
								}
								break;
							case 6:
								break;
							case 4:
								break;
							case 12:
								break;
							case 13:
								if (t.memoizedState === null) {
									var p = t.alternate;
									if (p !== null) {
										var y = p.memoizedState;
										if (y !== null) {
											var g = y.dehydrated;
											g !== null && Wn(g);
										}
									}
								}
								break;
							case 19:
							case 17:
							case 21:
							case 22:
							case 23:
							case 25:
								break;
							default:
								throw Error(m(163));
						}
					Ee || (t.flags & 512 && ri(t));
				} catch (h) {
					se(t, t.return, h);
				}
			}
			if (t === e) {
				E = null;
				break;
			}
			if (((n = t.sibling), n !== null)) {
				(n.return = t.return), (E = n);
				break;
			}
			E = t.return;
		}
	}
	function aa(e) {
		for (; E !== null; ) {
			var t = E;
			if (t === e) {
				E = null;
				break;
			}
			var n = t.sibling;
			if (n !== null) {
				(n.return = t.return), (E = n);
				break;
			}
			E = t.return;
		}
	}
	function ca(e) {
		for (; E !== null; ) {
			var t = E;
			try {
				switch (t.tag) {
					case 0:
					case 11:
					case 15:
						var n = t.return;
						try {
							fl(4, t);
						} catch (s) {
							se(t, n, s);
						}
						break;
					case 1:
						var r = t.stateNode;
						if (typeof r.componentDidMount == "function") {
							var l = t.return;
							try {
								r.componentDidMount();
							} catch (s) {
								se(t, l, s);
							}
						}
						var u = t.return;
						try {
							ri(t);
						} catch (s) {
							se(t, u, s);
						}
						break;
					case 5:
						var i = t.return;
						try {
							ri(t);
						} catch (s) {
							se(t, i, s);
						}
				}
			} catch (s) {
				se(t, t.return, s);
			}
			if (t === e) {
				E = null;
				break;
			}
			var o = t.sibling;
			if (o !== null) {
				(o.return = t.return), (E = o);
				break;
			}
			E = t.return;
		}
	}
	var Cf = Math.ceil,
		dl = Se.ReactCurrentDispatcher,
		ii = Se.ReactCurrentOwner,
		Ge = Se.ReactCurrentBatchConfig,
		A = 0,
		ve = null,
		de = null,
		we = 0,
		$e = 0,
		zn = Mt(0),
		me = 0,
		pr = null,
		tn = 0,
		pl = 0,
		oi = 0,
		mr = null,
		Ie = null,
		si = 0,
		Tn = 1 / 0,
		_t = null,
		ml = !1,
		ai = null,
		At = null,
		hl = !1,
		Bt = null,
		vl = 0,
		hr = 0,
		ci = null,
		yl = -1,
		gl = 0;
	function Pe() {
		return (A & 6) !== 0 ? ce() : yl !== -1 ? yl : (yl = ce());
	}
	function Ht(e) {
		return (e.mode & 1) === 0
			? 1
			: (A & 2) !== 0 && we !== 0
				? we & -we
				: lf.transition !== null
					? (gl === 0 && (gl = to()), gl)
					: ((e = G), e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : co(e.type))), e);
	}
	function ot(e, t, n, r) {
		if (50 < hr) throw ((hr = 0), (ci = null), Error(m(185)));
		Vn(e, n, r),
			((A & 2) === 0 || e !== ve) &&
				(e === ve && ((A & 2) === 0 && (pl |= n), me === 4 && $t(e, we)), Fe(e, r), n === 1 && A === 0 && (t.mode & 1) === 0 && ((Tn = ce() + 500), Kr && It()));
	}
	function Fe(e, t) {
		var n = e.callbackNode;
		lc(e, t);
		var r = Lr(e, e === ve ? we : 0);
		if (r === 0) n !== null && qi(n), (e.callbackNode = null), (e.callbackPriority = 0);
		else if (((t = r & -r), e.callbackPriority !== t)) {
			if ((n != null && qi(n), t === 1))
				e.tag === 0 ? rf(da.bind(null, e)) : Xo(da.bind(null, e)),
					bc(function () {
						(A & 6) === 0 && It();
					}),
					(n = null);
			else {
				switch (no(r)) {
					case 1:
						n = $l;
						break;
					case 4:
						n = bi;
						break;
					case 16:
						n = xr;
						break;
					case 536870912:
						n = eo;
						break;
					default:
						n = xr;
				}
				n = Sa(n, fa.bind(null, e));
			}
			(e.callbackPriority = t), (e.callbackNode = n);
		}
	}
	function fa(e, t) {
		if (((yl = -1), (gl = 0), (A & 6) !== 0)) throw Error(m(327));
		var n = e.callbackNode;
		if (jn() && e.callbackNode !== n) return null;
		var r = Lr(e, e === ve ? we : 0);
		if (r === 0) return null;
		if ((r & 30) !== 0 || (r & e.expiredLanes) !== 0 || t) t = wl(e, r);
		else {
			t = r;
			var l = A;
			A |= 2;
			var u = ma();
			(ve !== e || we !== t) && ((_t = null), (Tn = ce() + 500), rn(e, t));
			do
				try {
					_f();
					break;
				} catch (o) {
					pa(e, o);
				}
			while (!0);
			Pu(), (dl.current = u), (A = l), de !== null ? (t = 0) : ((ve = null), (we = 0), (t = me));
		}
		if (t !== 0) {
			if ((t === 2 && ((l = Wl(e)), l !== 0 && ((r = l), (t = fi(e, l)))), t === 1)) throw ((n = pr), rn(e, 0), $t(e, r), Fe(e, ce()), n);
			if (t === 6) $t(e, r);
			else {
				if (((l = e.current.alternate), (r & 30) === 0 && !xf(l) && ((t = wl(e, r)), t === 2 && ((u = Wl(e)), u !== 0 && ((r = u), (t = fi(e, u)))), t === 1)))
					throw ((n = pr), rn(e, 0), $t(e, r), Fe(e, ce()), n);
				switch (((e.finishedWork = l), (e.finishedLanes = r), t)) {
					case 0:
					case 1:
						throw Error(m(345));
					case 2:
						ln(e, Ie, _t);
						break;
					case 3:
						if (($t(e, r), (r & 130023424) === r && ((t = si + 500 - ce()), 10 < t))) {
							if (Lr(e, 0) !== 0) break;
							if (((l = e.suspendedLanes), (l & r) !== r)) {
								Pe(), (e.pingedLanes |= e.suspendedLanes & l);
								break;
							}
							e.timeoutHandle = yu(ln.bind(null, e, Ie, _t), t);
							break;
						}
						ln(e, Ie, _t);
						break;
					case 4:
						if (($t(e, r), (r & 4194240) === r)) break;
						for (t = e.eventTimes, l = -1; 0 < r; ) {
							var i = 31 - tt(r);
							(u = 1 << i), (i = t[i]), i > l && (l = i), (r &= ~u);
						}
						if (
							((r = l),
							(r = ce() - r),
							(r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Cf(r / 1960)) - r),
							10 < r)
						) {
							e.timeoutHandle = yu(ln.bind(null, e, Ie, _t), r);
							break;
						}
						ln(e, Ie, _t);
						break;
					case 5:
						ln(e, Ie, _t);
						break;
					default:
						throw Error(m(329));
				}
			}
		}
		return Fe(e, ce()), e.callbackNode === n ? fa.bind(null, e) : null;
	}
	function fi(e, t) {
		var n = mr;
		return e.current.memoizedState.isDehydrated && (rn(e, t).flags |= 256), (e = wl(e, t)), e !== 2 && ((t = Ie), (Ie = n), t !== null && di(t)), e;
	}
	function di(e) {
		Ie === null ? (Ie = e) : Ie.push.apply(Ie, e);
	}
	function xf(e) {
		for (var t = e; ; ) {
			if (t.flags & 16384) {
				var n = t.updateQueue;
				if (n !== null && ((n = n.stores), n !== null))
					for (var r = 0; r < n.length; r++) {
						var l = n[r],
							u = l.getSnapshot;
						l = l.value;
						try {
							if (!nt(u(), l)) return !1;
						} catch {
							return !1;
						}
					}
			}
			if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) (n.return = t), (t = n);
			else {
				if (t === e) break;
				for (; t.sibling === null; ) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				(t.sibling.return = t.return), (t = t.sibling);
			}
		}
		return !0;
	}
	function $t(e, t) {
		for (t &= ~oi, t &= ~pl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
			var n = 31 - tt(t),
				r = 1 << n;
			(e[n] = -1), (t &= ~r);
		}
	}
	function da(e) {
		if ((A & 6) !== 0) throw Error(m(327));
		jn();
		var t = Lr(e, 0);
		if ((t & 1) === 0) return Fe(e, ce()), null;
		var n = wl(e, t);
		if (e.tag !== 0 && n === 2) {
			var r = Wl(e);
			r !== 0 && ((t = r), (n = fi(e, r)));
		}
		if (n === 1) throw ((n = pr), rn(e, 0), $t(e, t), Fe(e, ce()), n);
		if (n === 6) throw Error(m(345));
		return (e.finishedWork = e.current.alternate), (e.finishedLanes = t), ln(e, Ie, _t), Fe(e, ce()), null;
	}
	function pi(e, t) {
		var n = A;
		A |= 1;
		try {
			return e(t);
		} finally {
			(A = n), A === 0 && ((Tn = ce() + 500), Kr && It());
		}
	}
	function nn(e) {
		Bt !== null && Bt.tag === 0 && (A & 6) === 0 && jn();
		var t = A;
		A |= 1;
		var n = Ge.transition,
			r = G;
		try {
			if (((Ge.transition = null), (G = 1), e)) return e();
		} finally {
			(G = r), (Ge.transition = n), (A = t), (A & 6) === 0 && It();
		}
	}
	function mi() {
		($e = zn.current), ne(zn);
	}
	function rn(e, t) {
		(e.finishedWork = null), (e.finishedLanes = 0);
		var n = e.timeoutHandle;
		if ((n !== -1 && ((e.timeoutHandle = -1), qc(n)), de !== null))
			for (n = de.return; n !== null; ) {
				var r = n;
				switch ((xu(r), r.tag)) {
					case 1:
						(r = r.type.childContextTypes), r != null && Wr();
						break;
					case 3:
						Nn(), ne(De), ne(ke), Uu();
						break;
					case 5:
						Iu(r);
						break;
					case 4:
						Nn();
						break;
					case 13:
						ne(ue);
						break;
					case 19:
						ne(ue);
						break;
					case 10:
						zu(r.type._context);
						break;
					case 22:
					case 23:
						mi();
				}
				n = n.return;
			}
		if (((ve = e), (de = e = Wt(e.current, null)), (we = $e = t), (me = 0), (pr = null), (oi = pl = tn = 0), (Ie = mr = null), qt !== null)) {
			for (t = 0; t < qt.length; t++)
				if (((n = qt[t]), (r = n.interleaved), r !== null)) {
					n.interleaved = null;
					var l = r.next,
						u = n.pending;
					if (u !== null) {
						var i = u.next;
						(u.next = l), (r.next = i);
					}
					n.pending = r;
				}
			qt = null;
		}
		return e;
	}
	function pa(e, t) {
		do {
			var n = de;
			try {
				if ((Pu(), (rl.current = ol), ll)) {
					for (var r = ie.memoizedState; r !== null; ) {
						var l = r.queue;
						l !== null && (l.pending = null), (r = r.next);
					}
					ll = !1;
				}
				if (((en = 0), (he = pe = ie = null), (or = !1), (sr = 0), (ii.current = null), n === null || n.return === null)) {
					(me = 1), (pr = t), (de = null);
					break;
				}
				e: {
					var u = e,
						i = n.return,
						o = n,
						s = t;
					if (((t = we), (o.flags |= 32768), s !== null && typeof s == "object" && typeof s.then == "function")) {
						var p = s,
							y = o,
							g = y.tag;
						if ((y.mode & 1) === 0 && (g === 0 || g === 11 || g === 15)) {
							var h = y.alternate;
							h ? ((y.updateQueue = h.updateQueue), (y.memoizedState = h.memoizedState), (y.lanes = h.lanes)) : ((y.updateQueue = null), (y.memoizedState = null));
						}
						var x = Us(i);
						if (x !== null) {
							(x.flags &= -257), Vs(x, i, o, u, t), x.mode & 1 && Fs(u, p, t), (t = x), (s = p);
							var _ = t.updateQueue;
							if (_ === null) {
								var N = new Set();
								N.add(s), (t.updateQueue = N);
							} else _.add(s);
							break e;
						} else {
							if ((t & 1) === 0) {
								Fs(u, p, t), hi();
								break e;
							}
							s = Error(m(426));
						}
					} else if (re && o.mode & 1) {
						var fe = Us(i);
						if (fe !== null) {
							(fe.flags & 65536) === 0 && (fe.flags |= 256), Vs(fe, i, o, u, t), Nu(Ln(s, o));
							break e;
						}
					}
					(u = s = Ln(s, o)), me !== 4 && (me = 2), mr === null ? (mr = [u]) : mr.push(u), (u = i);
					do {
						switch (u.tag) {
							case 3:
								(u.flags |= 65536), (t &= -t), (u.lanes |= t);
								var f = Os(u, s, t);
								ls(u, f);
								break e;
							case 1:
								o = s;
								var c = u.type,
									d = u.stateNode;
								if (
									(u.flags & 128) === 0 &&
									(typeof c.getDerivedStateFromError == "function" || (d !== null && typeof d.componentDidCatch == "function" && (At === null || !At.has(d))))
								) {
									(u.flags |= 65536), (t &= -t), (u.lanes |= t);
									var w = Is(u, o, t);
									ls(u, w);
									break e;
								}
						}
						u = u.return;
					} while (u !== null);
				}
				va(n);
			} catch (L) {
				(t = L), de === n && n !== null && (de = n = n.return);
				continue;
			}
			break;
		} while (!0);
	}
	function ma() {
		var e = dl.current;
		return (dl.current = ol), e === null ? ol : e;
	}
	function hi() {
		(me === 0 || me === 3 || me === 2) && (me = 4), ve === null || ((tn & 268435455) === 0 && (pl & 268435455) === 0) || $t(ve, we);
	}
	function wl(e, t) {
		var n = A;
		A |= 2;
		var r = ma();
		(ve !== e || we !== t) && ((_t = null), rn(e, t));
		do
			try {
				Ef();
				break;
			} catch (l) {
				pa(e, l);
			}
		while (!0);
		if ((Pu(), (A = n), (dl.current = r), de !== null)) throw Error(m(261));
		return (ve = null), (we = 0), me;
	}
	function Ef() {
		for (; de !== null; ) ha(de);
	}
	function _f() {
		for (; de !== null && !Ga(); ) ha(de);
	}
	function ha(e) {
		var t = wa(e.alternate, e, $e);
		(e.memoizedProps = e.pendingProps), t === null ? va(e) : (de = t), (ii.current = null);
	}
	function va(e) {
		var t = e;
		do {
			var n = t.alternate;
			if (((e = t.return), (t.flags & 32768) === 0)) {
				if (((n = yf(n, t, $e)), n !== null)) {
					de = n;
					return;
				}
			} else {
				if (((n = gf(n, t)), n !== null)) {
					(n.flags &= 32767), (de = n);
					return;
				}
				if (e !== null) (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
				else {
					(me = 6), (de = null);
					return;
				}
			}
			if (((t = t.sibling), t !== null)) {
				de = t;
				return;
			}
			de = t = e;
		} while (t !== null);
		me === 0 && (me = 5);
	}
	function ln(e, t, n) {
		var r = G,
			l = Ge.transition;
		try {
			(Ge.transition = null), (G = 1), Nf(e, t, n, r);
		} finally {
			(Ge.transition = l), (G = r);
		}
		return null;
	}
	function Nf(e, t, n, r) {
		do jn();
		while (Bt !== null);
		if ((A & 6) !== 0) throw Error(m(327));
		n = e.finishedWork;
		var l = e.finishedLanes;
		if (n === null) return null;
		if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(m(177));
		(e.callbackNode = null), (e.callbackPriority = 0);
		var u = n.lanes | n.childLanes;
		if (
			(uc(e, u),
			e === ve && ((de = ve = null), (we = 0)),
			((n.subtreeFlags & 2064) === 0 && (n.flags & 2064) === 0) ||
				hl ||
				((hl = !0),
				Sa(xr, function () {
					return jn(), null;
				})),
			(u = (n.flags & 15990) !== 0),
			(n.subtreeFlags & 15990) !== 0 || u)
		) {
			(u = Ge.transition), (Ge.transition = null);
			var i = G;
			G = 1;
			var o = A;
			(A |= 4), (ii.current = null), Sf(e, n), ia(n, e), Qc(hu), (Tr = !!mu), (hu = mu = null), (e.current = n), kf(n), Xa(), (A = o), (G = i), (Ge.transition = u);
		} else e.current = n;
		if ((hl && ((hl = !1), (Bt = e), (vl = l)), (u = e.pendingLanes), u === 0 && (At = null), ba(n.stateNode), Fe(e, ce()), t !== null))
			for (r = e.onRecoverableError, n = 0; n < t.length; n++) (l = t[n]), r(l.value, { componentStack: l.stack, digest: l.digest });
		if (ml) throw ((ml = !1), (e = ai), (ai = null), e);
		return (vl & 1) !== 0 && e.tag !== 0 && jn(), (u = e.pendingLanes), (u & 1) !== 0 ? (e === ci ? hr++ : ((hr = 0), (ci = e))) : (hr = 0), It(), null;
	}
	function jn() {
		if (Bt !== null) {
			var e = no(vl),
				t = Ge.transition,
				n = G;
			try {
				if (((Ge.transition = null), (G = 16 > e ? 16 : e), Bt === null)) var r = !1;
				else {
					if (((e = Bt), (Bt = null), (vl = 0), (A & 6) !== 0)) throw Error(m(331));
					var l = A;
					for (A |= 4, E = e.current; E !== null; ) {
						var u = E,
							i = u.child;
						if ((E.flags & 16) !== 0) {
							var o = u.deletions;
							if (o !== null) {
								for (var s = 0; s < o.length; s++) {
									var p = o[s];
									for (E = p; E !== null; ) {
										var y = E;
										switch (y.tag) {
											case 0:
											case 11:
											case 15:
												dr(8, y, u);
										}
										var g = y.child;
										if (g !== null) (g.return = y), (E = g);
										else
											for (; E !== null; ) {
												y = E;
												var h = y.sibling,
													x = y.return;
												if ((ta(y), y === p)) {
													E = null;
													break;
												}
												if (h !== null) {
													(h.return = x), (E = h);
													break;
												}
												E = x;
											}
									}
								}
								var _ = u.alternate;
								if (_ !== null) {
									var N = _.child;
									if (N !== null) {
										_.child = null;
										do {
											var fe = N.sibling;
											(N.sibling = null), (N = fe);
										} while (N !== null);
									}
								}
								E = u;
							}
						}
						if ((u.subtreeFlags & 2064) !== 0 && i !== null) (i.return = u), (E = i);
						else
							e: for (; E !== null; ) {
								if (((u = E), (u.flags & 2048) !== 0))
									switch (u.tag) {
										case 0:
										case 11:
										case 15:
											dr(9, u, u.return);
									}
								var f = u.sibling;
								if (f !== null) {
									(f.return = u.return), (E = f);
									break e;
								}
								E = u.return;
							}
					}
					var c = e.current;
					for (E = c; E !== null; ) {
						i = E;
						var d = i.child;
						if ((i.subtreeFlags & 2064) !== 0 && d !== null) (d.return = i), (E = d);
						else
							e: for (i = c; E !== null; ) {
								if (((o = E), (o.flags & 2048) !== 0))
									try {
										switch (o.tag) {
											case 0:
											case 11:
											case 15:
												fl(9, o);
										}
									} catch (L) {
										se(o, o.return, L);
									}
								if (o === i) {
									E = null;
									break e;
								}
								var w = o.sibling;
								if (w !== null) {
									(w.return = o.return), (E = w);
									break e;
								}
								E = o.return;
							}
					}
					if (((A = l), It(), ft && typeof ft.onPostCommitFiberRoot == "function"))
						try {
							ft.onPostCommitFiberRoot(Er, e);
						} catch {}
					r = !0;
				}
				return r;
			} finally {
				(G = n), (Ge.transition = t);
			}
		}
		return !1;
	}
	function ya(e, t, n) {
		(t = Ln(n, t)), (t = Os(e, t, 1)), (e = Ut(e, t, 1)), (t = Pe()), e !== null && (Vn(e, 1, t), Fe(e, t));
	}
	function se(e, t, n) {
		if (e.tag === 3) ya(e, e, n);
		else
			for (; t !== null; ) {
				if (t.tag === 3) {
					ya(t, e, n);
					break;
				} else if (t.tag === 1) {
					var r = t.stateNode;
					if (typeof t.type.getDerivedStateFromError == "function" || (typeof r.componentDidCatch == "function" && (At === null || !At.has(r)))) {
						(e = Ln(n, e)), (e = Is(t, e, 1)), (t = Ut(t, e, 1)), (e = Pe()), t !== null && (Vn(t, 1, e), Fe(t, e));
						break;
					}
				}
				t = t.return;
			}
	}
	function Lf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t),
			(t = Pe()),
			(e.pingedLanes |= e.suspendedLanes & n),
			ve === e && (we & n) === n && (me === 4 || (me === 3 && (we & 130023424) === we && 500 > ce() - si) ? rn(e, 0) : (oi |= n)),
			Fe(e, t);
	}
	function ga(e, t) {
		t === 0 && ((e.mode & 1) === 0 ? (t = 1) : ((t = Nr), (Nr <<= 1), (Nr & 130023424) === 0 && (Nr = 4194304)));
		var n = Pe();
		(e = Ct(e, t)), e !== null && (Vn(e, t, n), Fe(e, n));
	}
	function Pf(e) {
		var t = e.memoizedState,
			n = 0;
		t !== null && (n = t.retryLane), ga(e, n);
	}
	function zf(e, t) {
		var n = 0;
		switch (e.tag) {
			case 13:
				var r = e.stateNode,
					l = e.memoizedState;
				l !== null && (n = l.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			default:
				throw Error(m(314));
		}
		r !== null && r.delete(t), ga(e, n);
	}
	var wa;
	wa = function (e, t, n) {
		if (e !== null)
			if (e.memoizedProps !== t.pendingProps || De.current) Oe = !0;
			else {
				if ((e.lanes & n) === 0 && (t.flags & 128) === 0) return (Oe = !1), vf(e, t, n);
				Oe = (e.flags & 131072) !== 0;
			}
		else (Oe = !1), re && (t.flags & 1048576) !== 0 && Jo(t, Yr, t.index);
		switch (((t.lanes = 0), t.tag)) {
			case 2:
				var r = t.type;
				al(e, t), (e = t.pendingProps);
				var l = wn(t, ke.current);
				En(t, n), (l = Bu(null, t, r, e, l, n));
				var u = Hu();
				return (
					(t.flags |= 1),
					typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0
						? ((t.tag = 1),
							(t.memoizedState = null),
							(t.updateQueue = null),
							Me(r) ? ((u = !0), Qr(t)) : (u = !1),
							(t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null),
							Ru(t),
							(l.updater = el),
							(t.stateNode = l),
							(l._reactInternals = t),
							Mu(t, r, e, n),
							(t = Xu(null, t, r, !0, u, n)))
						: ((t.tag = 0), re && u && Cu(t), Le(null, t, l, n), (t = t.child)),
					t
				);
			case 16:
				r = t.elementType;
				e: {
					switch ((al(e, t), (e = t.pendingProps), (l = r._init), (r = l(r._payload)), (t.type = r), (l = t.tag = jf(r)), (e = lt(r, e)), l)) {
						case 0:
							t = Gu(null, t, r, e, n);
							break e;
						case 1:
							t = Qs(null, t, r, e, n);
							break e;
						case 11:
							t = As(null, t, r, e, n);
							break e;
						case 14:
							t = Bs(null, t, r, lt(r.type, e), n);
							break e;
					}
					throw Error(m(306, r, ""));
				}
				return t;
			case 0:
				return (r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : lt(r, l)), Gu(e, t, r, l, n);
			case 1:
				return (r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : lt(r, l)), Qs(e, t, r, l, n);
			case 3:
				e: {
					if ((Ks(t), e === null)) throw Error(m(387));
					(r = t.pendingProps), (u = t.memoizedState), (l = u.element), rs(e, t), br(t, r, null, n);
					var i = t.memoizedState;
					if (((r = i.element), u.isDehydrated))
						if (
							((u = {
								element: r,
								isDehydrated: !1,
								cache: i.cache,
								pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
								transitions: i.transitions,
							}),
							(t.updateQueue.baseState = u),
							(t.memoizedState = u),
							t.flags & 256)
						) {
							(l = Ln(Error(m(423)), t)), (t = Zs(e, t, r, n, l));
							break e;
						} else if (r !== l) {
							(l = Ln(Error(m(424)), t)), (t = Zs(e, t, r, n, l));
							break e;
						} else
							for (He = Dt(t.stateNode.containerInfo.firstChild), Be = t, re = !0, rt = null, n = ds(t, null, r, n), t.child = n; n; )
								(n.flags = (n.flags & -3) | 4096), (n = n.sibling);
					else {
						if ((Cn(), r === l)) {
							t = Et(e, t, n);
							break e;
						}
						Le(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 5:
				return (
					ps(t),
					e === null && _u(t),
					(r = t.type),
					(l = t.pendingProps),
					(u = e !== null ? e.memoizedProps : null),
					(i = l.children),
					vu(r, l) ? (i = null) : u !== null && vu(r, u) && (t.flags |= 32),
					Ws(e, t),
					Le(e, t, i, n),
					t.child
				);
			case 6:
				return e === null && _u(t), null;
			case 13:
				return Ys(e, t, n);
			case 4:
				return Ou(t, t.stateNode.containerInfo), (r = t.pendingProps), e === null ? (t.child = _n(t, null, r, n)) : Le(e, t, r, n), t.child;
			case 11:
				return (r = t.type), (l = t.pendingProps), (l = t.elementType === r ? l : lt(r, l)), As(e, t, r, l, n);
			case 7:
				return Le(e, t, t.pendingProps, n), t.child;
			case 8:
				return Le(e, t, t.pendingProps.children, n), t.child;
			case 12:
				return Le(e, t, t.pendingProps.children, n), t.child;
			case 10:
				e: {
					if (((r = t.type._context), (l = t.pendingProps), (u = t.memoizedProps), (i = l.value), ee(Xr, r._currentValue), (r._currentValue = i), u !== null))
						if (nt(u.value, i)) {
							if (u.children === l.children && !De.current) {
								t = Et(e, t, n);
								break e;
							}
						} else
							for (u = t.child, u !== null && (u.return = t); u !== null; ) {
								var o = u.dependencies;
								if (o !== null) {
									i = u.child;
									for (var s = o.firstContext; s !== null; ) {
										if (s.context === r) {
											if (u.tag === 1) {
												(s = xt(-1, n & -n)), (s.tag = 2);
												var p = u.updateQueue;
												if (p !== null) {
													p = p.shared;
													var y = p.pending;
													y === null ? (s.next = s) : ((s.next = y.next), (y.next = s)), (p.pending = s);
												}
											}
											(u.lanes |= n), (s = u.alternate), s !== null && (s.lanes |= n), Tu(u.return, n, t), (o.lanes |= n);
											break;
										}
										s = s.next;
									}
								} else if (u.tag === 10) i = u.type === t.type ? null : u.child;
								else if (u.tag === 18) {
									if (((i = u.return), i === null)) throw Error(m(341));
									(i.lanes |= n), (o = i.alternate), o !== null && (o.lanes |= n), Tu(i, n, t), (i = u.sibling);
								} else i = u.child;
								if (i !== null) i.return = u;
								else
									for (i = u; i !== null; ) {
										if (i === t) {
											i = null;
											break;
										}
										if (((u = i.sibling), u !== null)) {
											(u.return = i.return), (i = u);
											break;
										}
										i = i.return;
									}
								u = i;
							}
					Le(e, t, l.children, n), (t = t.child);
				}
				return t;
			case 9:
				return (l = t.type), (r = t.pendingProps.children), En(t, n), (l = Ze(l)), (r = r(l)), (t.flags |= 1), Le(e, t, r, n), t.child;
			case 14:
				return (r = t.type), (l = lt(r, t.pendingProps)), (l = lt(r.type, l)), Bs(e, t, r, l, n);
			case 15:
				return Hs(e, t, t.type, t.pendingProps, n);
			case 17:
				return (
					(r = t.type),
					(l = t.pendingProps),
					(l = t.elementType === r ? l : lt(r, l)),
					al(e, t),
					(t.tag = 1),
					Me(r) ? ((e = !0), Qr(t)) : (e = !1),
					En(t, n),
					ss(t, r, l),
					Mu(t, r, l, n),
					Xu(null, t, r, !0, e, n)
				);
			case 19:
				return Xs(e, t, n);
			case 22:
				return $s(e, t, n);
		}
		throw Error(m(156, t.tag));
	};
	function Sa(e, t) {
		return Ji(e, t);
	}
	function Tf(e, t, n, r) {
		(this.tag = e),
			(this.key = n),
			(this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null),
			(this.index = 0),
			(this.ref = null),
			(this.pendingProps = t),
			(this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
			(this.mode = r),
			(this.subtreeFlags = this.flags = 0),
			(this.deletions = null),
			(this.childLanes = this.lanes = 0),
			(this.alternate = null);
	}
	function Xe(e, t, n, r) {
		return new Tf(e, t, n, r);
	}
	function vi(e) {
		return (e = e.prototype), !(!e || !e.isReactComponent);
	}
	function jf(e) {
		if (typeof e == "function") return vi(e) ? 1 : 0;
		if (e != null) {
			if (((e = e.$$typeof), e === at)) return 11;
			if (e === ct) return 14;
		}
		return 2;
	}
	function Wt(e, t) {
		var n = e.alternate;
		return (
			n === null
				? ((n = Xe(e.tag, t, e.key, e.mode)), (n.elementType = e.elementType), (n.type = e.type), (n.stateNode = e.stateNode), (n.alternate = e), (e.alternate = n))
				: ((n.pendingProps = t), (n.type = e.type), (n.flags = 0), (n.subtreeFlags = 0), (n.deletions = null)),
			(n.flags = e.flags & 14680064),
			(n.childLanes = e.childLanes),
			(n.lanes = e.lanes),
			(n.child = e.child),
			(n.memoizedProps = e.memoizedProps),
			(n.memoizedState = e.memoizedState),
			(n.updateQueue = e.updateQueue),
			(t = e.dependencies),
			(n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
			(n.sibling = e.sibling),
			(n.index = e.index),
			(n.ref = e.ref),
			n
		);
	}
	function Sl(e, t, n, r, l, u) {
		var i = 2;
		if (((r = e), typeof e == "function")) vi(e) && (i = 1);
		else if (typeof e == "string") i = 5;
		else
			e: switch (e) {
				case Te:
					return un(n.children, l, u, t);
				case We:
					(i = 8), (l |= 8);
					break;
				case Nt:
					return (e = Xe(12, n, t, l | 2)), (e.elementType = Nt), (e.lanes = u), e;
				case Ve:
					return (e = Xe(13, n, t, l)), (e.elementType = Ve), (e.lanes = u), e;
				case et:
					return (e = Xe(19, n, t, l)), (e.elementType = et), (e.lanes = u), e;
				case oe:
					return kl(n, l, u, t);
				default:
					if (typeof e == "object" && e !== null)
						switch (e.$$typeof) {
							case yt:
								i = 10;
								break e;
							case Kt:
								i = 9;
								break e;
							case at:
								i = 11;
								break e;
							case ct:
								i = 14;
								break e;
							case je:
								(i = 16), (r = null);
								break e;
						}
					throw Error(m(130, e == null ? e : typeof e, ""));
			}
		return (t = Xe(i, n, t, l)), (t.elementType = e), (t.type = r), (t.lanes = u), t;
	}
	function un(e, t, n, r) {
		return (e = Xe(7, e, r, t)), (e.lanes = n), e;
	}
	function kl(e, t, n, r) {
		return (e = Xe(22, e, r, t)), (e.elementType = oe), (e.lanes = n), (e.stateNode = { isHidden: !1 }), e;
	}
	function yi(e, t, n) {
		return (e = Xe(6, e, null, t)), (e.lanes = n), e;
	}
	function gi(e, t, n) {
		return (
			(t = Xe(4, e.children !== null ? e.children : [], e.key, t)),
			(t.lanes = n),
			(t.stateNode = {
				containerInfo: e.containerInfo,
				pendingChildren: null,
				implementation: e.implementation,
			}),
			t
		);
	}
	function Rf(e, t, n, r, l) {
		(this.tag = t),
			(this.containerInfo = e),
			(this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
			(this.timeoutHandle = -1),
			(this.callbackNode = this.pendingContext = this.context = null),
			(this.callbackPriority = 0),
			(this.eventTimes = Ql(0)),
			(this.expirationTimes = Ql(-1)),
			(this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0),
			(this.entanglements = Ql(0)),
			(this.identifierPrefix = r),
			(this.onRecoverableError = l),
			(this.mutableSourceEagerHydrationData = null);
	}
	function wi(e, t, n, r, l, u, i, o, s) {
		return (
			(e = new Rf(e, t, n, o, s)),
			t === 1 ? ((t = 1), u === !0 && (t |= 8)) : (t = 0),
			(u = Xe(3, null, null, t)),
			(e.current = u),
			(u.stateNode = e),
			(u.memoizedState = {
				element: r,
				isDehydrated: n,
				cache: null,
				transitions: null,
				pendingSuspenseBoundaries: null,
			}),
			Ru(u),
			e
		);
	}
	function Df(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: Ne,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n,
		};
	}
	function ka(e) {
		if (!e) return Ot;
		e = e._reactInternals;
		e: {
			if (Zt(e) !== e || e.tag !== 1) throw Error(m(170));
			var t = e;
			do {
				switch (t.tag) {
					case 3:
						t = t.stateNode.context;
						break e;
					case 1:
						if (Me(t.type)) {
							t = t.stateNode.__reactInternalMemoizedMergedChildContext;
							break e;
						}
				}
				t = t.return;
			} while (t !== null);
			throw Error(m(171));
		}
		if (e.tag === 1) {
			var n = e.type;
			if (Me(n)) return Yo(e, n, t);
		}
		return t;
	}
	function Ca(e, t, n, r, l, u, i, o, s) {
		return (
			(e = wi(n, r, !0, e, l, u, i, o, s)),
			(e.context = ka(null)),
			(n = e.current),
			(r = Pe()),
			(l = Ht(n)),
			(u = xt(r, l)),
			(u.callback = t ?? null),
			Ut(n, u, l),
			(e.current.lanes = l),
			Vn(e, l, r),
			Fe(e, r),
			e
		);
	}
	function Cl(e, t, n, r) {
		var l = t.current,
			u = Pe(),
			i = Ht(l);
		return (
			(n = ka(n)),
			t.context === null ? (t.context = n) : (t.pendingContext = n),
			(t = xt(u, i)),
			(t.payload = { element: e }),
			(r = r === void 0 ? null : r),
			r !== null && (t.callback = r),
			(e = Ut(l, t, i)),
			e !== null && (ot(e, l, i, u), qr(e, l, i)),
			i
		);
	}
	function xl(e) {
		if (((e = e.current), !e.child)) return null;
		switch (e.child.tag) {
			case 5:
				return e.child.stateNode;
			default:
				return e.child.stateNode;
		}
	}
	function xa(e, t) {
		if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function Si(e, t) {
		xa(e, t), (e = e.alternate) && xa(e, t);
	}
	function Mf() {
		return null;
	}
	var Ea =
		typeof reportError == "function"
			? reportError
			: function (e) {
					console.error(e);
				};
	function ki(e) {
		this._internalRoot = e;
	}
	(El.prototype.render = ki.prototype.render =
		function (e) {
			var t = this._internalRoot;
			if (t === null) throw Error(m(409));
			Cl(e, t, null, null);
		}),
		(El.prototype.unmount = ki.prototype.unmount =
			function () {
				var e = this._internalRoot;
				if (e !== null) {
					this._internalRoot = null;
					var t = e.containerInfo;
					nn(function () {
						Cl(null, e, null, null);
					}),
						(t[gt] = null);
				}
			});
	function El(e) {
		this._internalRoot = e;
	}
	El.prototype.unstable_scheduleHydration = function (e) {
		if (e) {
			var t = uo();
			e = { blockedOn: null, target: e, priority: t };
			for (var n = 0; n < Tt.length && t !== 0 && t < Tt[n].priority; n++);
			Tt.splice(n, 0, e), n === 0 && so(e);
		}
	};
	function Ci(e) {
		return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
	}
	function _l(e) {
		return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable ")));
	}
	function _a() {}
	function Of(e, t, n, r, l) {
		if (l) {
			if (typeof r == "function") {
				var u = r;
				r = function () {
					var p = xl(i);
					u.call(p);
				};
			}
			var i = Ca(t, r, e, 0, null, !1, !1, "", _a);
			return (e._reactRootContainer = i), (e[gt] = i.current), bn(e.nodeType === 8 ? e.parentNode : e), nn(), i;
		}
		for (; (l = e.lastChild); ) e.removeChild(l);
		if (typeof r == "function") {
			var o = r;
			r = function () {
				var p = xl(s);
				o.call(p);
			};
		}
		var s = wi(e, 0, !1, null, null, !1, !1, "", _a);
		return (
			(e._reactRootContainer = s),
			(e[gt] = s.current),
			bn(e.nodeType === 8 ? e.parentNode : e),
			nn(function () {
				Cl(t, s, n, r);
			}),
			s
		);
	}
	function Nl(e, t, n, r, l) {
		var u = n._reactRootContainer;
		if (u) {
			var i = u;
			if (typeof l == "function") {
				var o = l;
				l = function () {
					var s = xl(i);
					o.call(s);
				};
			}
			Cl(t, i, e, l);
		} else i = Of(n, t, e, l, r);
		return xl(i);
	}
	(ro = function (e) {
		switch (e.tag) {
			case 3:
				var t = e.stateNode;
				if (t.current.memoizedState.isDehydrated) {
					var n = Un(t.pendingLanes);
					n !== 0 && (Kl(t, n | 1), Fe(t, ce()), (A & 6) === 0 && ((Tn = ce() + 500), It()));
				}
				break;
			case 13:
				nn(function () {
					var r = Ct(e, 1);
					if (r !== null) {
						var l = Pe();
						ot(r, e, 1, l);
					}
				}),
					Si(e, 1);
		}
	}),
		(Zl = function (e) {
			if (e.tag === 13) {
				var t = Ct(e, 134217728);
				if (t !== null) {
					var n = Pe();
					ot(t, e, 134217728, n);
				}
				Si(e, 134217728);
			}
		}),
		(lo = function (e) {
			if (e.tag === 13) {
				var t = Ht(e),
					n = Ct(e, t);
				if (n !== null) {
					var r = Pe();
					ot(n, e, t, r);
				}
				Si(e, t);
			}
		}),
		(uo = function () {
			return G;
		}),
		(io = function (e, t) {
			var n = G;
			try {
				return (G = e), t();
			} finally {
				G = n;
			}
		}),
		(Vl = function (e, t, n) {
			switch (t) {
				case "input":
					if ((jl(e, n), (t = n.name), n.type === "radio" && t != null)) {
						for (n = e; n.parentNode; ) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var l = $r(r);
								if (!l) throw Error(m(90));
								Ti(r), jl(r, l);
							}
						}
					}
					break;
				case "textarea":
					Oi(e, n);
					break;
				case "select":
					(t = n.value), t != null && on(e, !!n.multiple, t, !1);
			}
		}),
		(Wi = pi),
		(Qi = nn);
	var If = { usingClientEntryPoint: !1, Events: [nr, yn, $r, Hi, $i, pi] },
		vr = {
			findFiberByHostInstance: Yt,
			bundleType: 0,
			version: "18.2.0",
			rendererPackageName: "react-dom",
		},
		Ff = {
			bundleType: vr.bundleType,
			version: vr.version,
			rendererPackageName: vr.rendererPackageName,
			rendererConfig: vr.rendererConfig,
			overrideHookState: null,
			overrideHookStateDeletePath: null,
			overrideHookStateRenamePath: null,
			overrideProps: null,
			overridePropsDeletePath: null,
			overridePropsRenamePath: null,
			setErrorHandler: null,
			setSuspenseHandler: null,
			scheduleUpdate: null,
			currentDispatcherRef: Se.ReactCurrentDispatcher,
			findHostInstanceByFiber: function (e) {
				return (e = Gi(e)), e === null ? null : e.stateNode;
			},
			findFiberByHostInstance: vr.findFiberByHostInstance || Mf,
			findHostInstancesForRefresh: null,
			scheduleRefresh: null,
			scheduleRoot: null,
			setRefreshHandler: null,
			getCurrentFiber: null,
			reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
		};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Ll = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Ll.isDisabled && Ll.supportsFiber)
			try {
				(Er = Ll.inject(Ff)), (ft = Ll);
			} catch {}
	}
	return (
		(Ue.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = If),
		(Ue.createPortal = function (e, t) {
			var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
			if (!Ci(t)) throw Error(m(200));
			return Df(e, t, null, n);
		}),
		(Ue.createRoot = function (e, t) {
			if (!Ci(e)) throw Error(m(299));
			var n = !1,
				r = "",
				l = Ea;
			return (
				t != null &&
					(t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)),
				(t = wi(e, 1, !1, null, null, n, !1, r, l)),
				(e[gt] = t.current),
				bn(e.nodeType === 8 ? e.parentNode : e),
				new ki(t)
			);
		}),
		(Ue.findDOMNode = function (e) {
			if (e == null) return null;
			if (e.nodeType === 1) return e;
			var t = e._reactInternals;
			if (t === void 0) throw typeof e.render == "function" ? Error(m(188)) : ((e = Object.keys(e).join(",")), Error(m(268, e)));
			return (e = Gi(t)), (e = e === null ? null : e.stateNode), e;
		}),
		(Ue.flushSync = function (e) {
			return nn(e);
		}),
		(Ue.hydrate = function (e, t, n) {
			if (!_l(t)) throw Error(m(200));
			return Nl(null, e, t, !0, n);
		}),
		(Ue.hydrateRoot = function (e, t, n) {
			if (!Ci(e)) throw Error(m(405));
			var r = (n != null && n.hydratedSources) || null,
				l = !1,
				u = "",
				i = Ea;
			if (
				(n != null &&
					(n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
				(t = Ca(t, null, e, 1, n ?? null, l, !1, u, i)),
				(e[gt] = t.current),
				bn(e),
				r)
			)
				for (e = 0; e < r.length; e++)
					(n = r[e]),
						(l = n._getVersion),
						(l = l(n._source)),
						t.mutableSourceEagerHydrationData == null ? (t.mutableSourceEagerHydrationData = [n, l]) : t.mutableSourceEagerHydrationData.push(n, l);
			return new El(t);
		}),
		(Ue.render = function (e, t, n) {
			if (!_l(t)) throw Error(m(200));
			return Nl(null, e, t, !1, n);
		}),
		(Ue.unmountComponentAtNode = function (e) {
			if (!_l(e)) throw Error(m(40));
			return e._reactRootContainer
				? (nn(function () {
						Nl(null, null, e, !1, function () {
							(e._reactRootContainer = null), (e[gt] = null);
						});
					}),
					!0)
				: !1;
		}),
		(Ue.unstable_batchedUpdates = pi),
		(Ue.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
			if (!_l(n)) throw Error(m(200));
			if (e == null || e._reactInternals === void 0) throw Error(m(38));
			return Nl(e, t, n, !1, r);
		}),
		(Ue.version = "18.2.0-next-9e3b772b8-20220608"),
		Ue
	);
}
var Da;
function Kf() {
	if (Da) return _i.exports;
	Da = 1;
	function S() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
			try {
				__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(S);
			} catch (T) {
				console.error(T);
			}
	}
	return S(), (_i.exports = Qf()), _i.exports;
}
var Ma;
function Zf() {
	if (Ma) return Pl;
	Ma = 1;
	var S = Kf();
	return (Pl.createRoot = S.createRoot), (Pl.hydrateRoot = S.hydrateRoot), Pl;
}
var Yf = Zf();
const Gf = Ia(Yf),
	Xf = "" + new URL("logo-D1_z80fx.png", import.meta.url).href,
	Fa = "" + new URL("example-B9LOfTJy.png", import.meta.url).href,
	Jf = "" + new URL("char-CYjxwK7J.png", import.meta.url).href,
	qf = "" + new URL("title-DZhsUot9.png", import.meta.url).href,
	Ua = () => !window.invokeNative,
	bf = () => {};
async function zl(S, T, m) {
	const z = {
		method: "POST",
		headers: { "Content-Type": "application/json; charset=UTF-8" },
		body: JSON.stringify(T),
	};
	if (Ua() && m) return m;
	const O = window.GetParentResourceName ? window.GetParentResourceName() : "react-app";
	return await (await fetch(`https://${O}/${S}`, z)).json();
}
const ed =
		"data:image/svg+xml,%3csvg%20width='26'%20height='26'%20viewBox='0%200%2026%2026'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M26%208.44375V17.5562C26.0008%2017.819%2025.9494%2018.0793%2025.8488%2018.322C25.7481%2018.5647%2025.6003%2018.785%2025.4137%2018.97L18.97%2025.4137C18.785%2025.6003%2018.5647%2025.7481%2018.322%2025.8488C18.0793%2025.9494%2017.819%2026.0008%2017.5562%2026H8.44375C8.18101%2026.0008%207.92073%2025.9494%207.67803%2025.8488C7.43532%2025.7481%207.21505%2025.6003%207.03%2025.4137L0.58626%2018.97C0.399734%2018.785%200.251852%2018.5647%200.151209%2018.322C0.0505663%2018.0793%20-0.000829298%2017.819%201.01186e-05%2017.5562V8.44375C-0.000829298%208.18101%200.0505663%207.92073%200.151209%207.67803C0.251852%207.43532%200.399734%207.21505%200.58626%207.03L7.03%200.58626C7.21505%200.399734%207.43532%200.251852%207.67803%200.151209C7.92073%200.0505663%208.18101%20-0.000829298%208.44375%201.01186e-05H17.5562C17.819%20-0.000829298%2018.0793%200.0505663%2018.322%200.151209C18.5647%200.251852%2018.785%200.399734%2018.97%200.58626L25.4137%207.03C25.6003%207.21505%2025.7481%207.43532%2025.8488%207.67803C25.9494%207.92073%2026.0008%208.18101%2026%208.44375ZM24%208.44375L17.5562%202.00001H8.44375L2.00001%208.44375V17.5562L8.44375%2024H17.5562L24%2017.5562V8.44375Z'%20fill='white'/%3e%3cpath%20d='M19.7617%209.34847L11.1489%2017.7678C11.0739%2017.8414%2010.9848%2017.8998%2010.8866%2017.9396C10.7885%2017.9795%2010.6832%2018%2010.577%2018C10.4707%2018%2010.3655%2017.9795%2010.2673%2017.9396C10.1692%2017.8998%2010.08%2017.8414%2010.005%2017.7678L6.23691%2014.0844C6.1618%2014.0109%206.10222%2013.9238%206.06157%2013.8278C6.02093%2013.7319%206%2013.6291%206%2013.5253C6%2013.4214%206.02093%2013.3186%206.06157%2013.2227C6.10222%2013.1268%206.1618%2013.0396%206.23691%2012.9662C6.31202%2012.8927%206.40119%2012.8345%206.49932%2012.7948C6.59746%2012.755%206.70264%2012.7346%206.80886%2012.7346C6.91508%2012.7346%207.02026%2012.755%207.11839%2012.7948C7.21653%2012.8345%207.30569%2012.8927%207.3808%2012.9662L10.5776%2016.0912L18.6192%208.23159C18.7709%208.08331%2018.9766%208%2019.1911%208C19.4057%208%2019.6114%208.08331%2019.7631%208.23159C19.9148%208.37987%2020%208.58099%2020%208.79069C20%209.00039%2019.9148%209.2015%2019.7631%209.34979L19.7617%209.34847Z'%20fill='white'/%3e%3c/svg%3e",
	td =
		"data:image/svg+xml,%3csvg%20width='34'%20height='34'%20viewBox='0%200%2034%2034'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M21.9386%2015.5606V10.2609C21.9386%209.69728%2021.7147%209.15678%2021.3162%208.75826C20.9176%208.35975%2020.3771%208.13586%2019.8136%208.13586H14.1866C13.623%208.13586%2013.0825%208.35975%2012.684%208.75826C12.2854%209.15678%2012.0616%209.69728%2012.0616%2010.2609V15.5592M9.91673%2015.5379H24.0834C25.6482%2015.5379%2026.9167%2016.8065%2026.9167%2018.3713V26.8713C26.9167%2028.4361%2025.6482%2029.7046%2024.0834%2029.7046H9.91673C8.35192%2029.7046%207.0834%2028.4361%207.0834%2026.8713V18.3713C7.0834%2016.8065%208.35192%2015.5379%209.91673%2015.5379Z'%20stroke='white'%20stroke-width='2'/%3e%3c/svg%3e",
	nd = "" + new URL("polygon-B9Csg2eW.png", import.meta.url).href;
function Va(S) {
	var T,
		m,
		z = "";
	if (typeof S == "string" || typeof S == "number") z += S;
	else if (typeof S == "object")
		if (Array.isArray(S)) {
			var O = S.length;
			for (T = 0; T < O; T++) S[T] && (m = Va(S[T])) && (z && (z += " "), (z += m));
		} else for (m in S) S[m] && (z && (z += " "), (z += m));
	return z;
}
function Pi() {
	for (var S, T, m = 0, z = "", O = arguments.length; m < O; m++) (S = arguments[m]) && (T = Va(S)) && (z && (z += " "), (z += T));
	return z;
}
function rd({ item: S }) {
	return k.jsxs("div", {
		className: "size-[6.875rem] relative flex-none",
		children: [
			k.jsxs("p", {
				className: "text-white/80 text-[0.625rem] font-semibold uppercase absolute top-4 left-1/2 -translate-x-1/2 z-20",
				children: ["DIA ", S.day],
			}),
			(S.redeemed || S.blocked) &&
				k.jsx("img", {
					src: S.redeemed ? ed : td,
					alt: "Check",
					className: "z-30 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-[1.625rem]",
				}),
			k.jsx("img", {
				src: S.image ? `http://128.201.228.211/inventario/${S.image}.png` : Fa,
				alt: "Example",
				className: Pi("z-20 w-14 h-12 absolute top-[1.94rem] left-1/2 -translate-x-1/2 object-contain", S.blocked || S.redeemed ? "opacity-25" : ""),
			}),
			k.jsx("img", {
				src: nd,
				alt: "Polygon",
				className: Pi("absolute size-full object-contain", S.blocked || S.redeemed ? "opacity-25" : ""),
			}),
		],
	});
}
const Oa = (S, T) => {
		const m = Je.useRef(bf);
		Je.useEffect(() => {
			m.current = T;
		}, [T]),
			Je.useEffect(() => {
				const z = (O) => {
					const { action: $, data: le } = O.data;
					m.current && $ === S && m.current(le);
				};
				return window.addEventListener("message", z), () => window.removeEventListener("message", z);
			}, [S]);
	},
	Aa = Je.createContext(null),
	ld = ({ children: S }) => {
		const [T, m] = Je.useState(!1);
		return (
			Oa("open", () => {
				m(!0);
			}),
			Oa("close", () => {
				m(!1);
			}),
			Je.useEffect(() => {
				if (!T) return;
				const z = (O) => {
					O.key === "Escape" && (Ua() ? m(!T) : zl("close"));
				};
				return window.addEventListener("keydown", z), () => window.removeEventListener("keydown", z);
			}, [T]),
			k.jsx(Aa.Provider, {
				value: { opened: T, setOpened: m },
				children: T && S,
			})
		);
	},
	ud = () => Je.useContext(Aa);
function id() {
	var ae, W;
	const { setOpened: S } = ud(),
		[T, m] = Je.useState(0),
		[z, O] = Je.useState({
			store: "",
			currentDay: 1,
			items: [],
			remainingTime: 0,
			remainingDays: 0,
		});
	function $() {
		const U = z.items.find((Q) => Q.day === z.currentDay);
		if ((U != null && U.blocked) || (U != null && U.redeemed)) {
			console.log("Item já foi resgatado ou está bloqueado!");
			return;
		}
		zl("redeem", U, { nextDay: 4, remainingTime: 1e3 }).then((Q) => {
			const Y = z.items.map((K) => (K.day === z.currentDay ? { ...K, redeemed: !0, blocked: !0 } : K));
			O({
				...z,
				items: Y,
				currentDay: Q.nextDay,
				remainingTime: Q.remainingTime,
			}),
				m(Q.remainingTime);
		});
	}
	function le() {
		zl("close", null, !0);
	}
	return (
		Je.useEffect(() => {
			function handleMessage(event) {
				if (event.data.action === "open") {
					S(true); // Exibe a NUI
				}
				if (event.data.action === "getData") {
					O(event.data);
					m(event.data.remainingTime);
				}
			}
			window.addEventListener("message", handleMessage);
			return () => window.removeEventListener("message", handleMessage);
		}, []),
		Je.useEffect(() => {
			const U = setInterval(() => {
				m((Q) => (Q > 0 ? Q - 1 : 0));
			}, 1e3);
			return () => clearInterval(U);
		}, [T]),
		k.jsxs("div", {
			className: "w-screen h-screen bg-background bg-cover bg-center",
			children: [
				k.jsx("img", {
					src: Xf,
					alt: "Logo",
					className: "absolute left-1/2 -translate-x-1/2 top-5 size-20",
				}),
				k.jsx("img", {
					src: qf,
					alt: "Title",
					className: "absolute top-1/2 -translate-y-1/2 left-[3.75rem] w-[26.25rem]",
				}),
				k.jsx("img", {
					src: Jf,
					alt: "Title",
					className: "absolute bottom-0 right-0 w-[34.1875rem]",
				}),
				k.jsxs("div", {
					onClick: le,
					className:
						"transition-all duration-300 cursor-pointer flex items-center justify-center gap-1 w-[11.25rem] h-[2.0625rem] rounded-lg border-[.0625rem] border-white/35 top-[4.37rem] left-[4.38rem] absolute group hover:bg-[#fb9f24]",
					children: [
						k.jsx("svg", {
							className: "size-[1.1875rem]",
							viewBox: "0 0 19 19",
							fill: "none",
							xmlns: "http://www.w3.org/2000/svg",
							children: k.jsx("path", {
								d: "M15.0417 10.2917H5.34375L9.5 14.4479L8.9775 15.0417L3.83167 9.89583L8.9775 4.75L9.5 5.34375L5.34375 9.5H15.0417V10.2917Z",
								fill: "#CCCCCC",
								className: "group-hover:!fill-[#1E1E1E]",
							}),
						}),
						k.jsx("p", {
							className: "text-white/80 text-[0.6875rem] font-extrabold group-hover:text-[#1E1E1E]",
							children: "VOLTAR",
						}),
					],
				}),
				k.jsxs("div", {
					className: "flex items-center gap-[.44rem] absolute top-[4.37rem] right-[4.38rem]",
					children: [
						k.jsx("button", {
							onClick: $,
							style: {
								boxShadow: T === 0 ? "0 0 .25rem 0 rgba(0, 0, 0, 0.10), 0 0 1rem 0 rgba(251, 159, 36, 0.45)" : "",
							},
							className: Pi(
								"text-white/80 text-[0.6875rem] font-extrabold w-[11.25rem] h-[2.0625rem] flex items-center justify-center rounded-lg border-[.0625rem] border-white/15 bg-white/10 pointer-events-none",
								T === 0 && "!bg-[#fb9f24] !text-[#1E1E1E] !pointer-events-auto",
							),
							children: "RESGATAR ITEM",
						}),
						k.jsxs("button", {
							onClick: () => window.invokeNative("openUrl", z.store),
							style: {
								boxShadow: "0 0 .25rem 0 rgba(0, 0, 0, 0.10), 0 0 1rem 0 rgba(251, 159, 36, 0.45)",
							},
							className:
								"text-[#1E1E1E] text-[0.6875rem] font-extrabold w-[11.25rem] h-[2.0625rem] flex gap-2 items-center justify-center rounded-lg border-[.0625rem] border-white/15 bg-[#fb9f24]",
							children: [
								"ACESSAR LOJA",
								k.jsxs("svg", {
									className: "size-[1.1875rem]",
									viewBox: "0 0 19 19",
									fill: "none",
									xmlns: "http://www.w3.org/2000/svg",
									children: [
										k.jsx("path", {
											d: "M6.53125 16.625C7.18709 16.625 7.71875 16.0933 7.71875 15.4375C7.71875 14.7817 7.18709 14.25 6.53125 14.25C5.87541 14.25 5.34375 14.7817 5.34375 15.4375C5.34375 16.0933 5.87541 16.625 6.53125 16.625Z",
											fill: "#1E1E1E",
										}),
										k.jsx("path", {
											d: "M14.8438 16.625C15.4996 16.625 16.0312 16.0933 16.0312 15.4375C16.0312 14.7817 15.4996 14.25 14.8438 14.25C14.1879 14.25 13.6562 14.7817 13.6562 15.4375C13.6562 16.0933 14.1879 16.625 14.8438 16.625Z",
											fill: "#1E1E1E",
										}),
										k.jsx("path", {
											d: "M16.9516 4.48207C16.8681 4.38004 16.7631 4.29786 16.6439 4.2415C16.5248 4.18515 16.3946 4.15602 16.2628 4.15625H4.96857L4.74109 2.86559C4.71684 2.72811 4.64491 2.60357 4.53796 2.51385C4.431 2.42413 4.29585 2.37497 4.15625 2.375H1.78125C1.62378 2.375 1.47276 2.43756 1.36141 2.54891C1.25006 2.66026 1.1875 2.81128 1.1875 2.96875C1.1875 3.12622 1.25006 3.27724 1.36141 3.38859C1.47276 3.49994 1.62378 3.5625 1.78125 3.5625H3.65824L5.35266 13.1657C5.37691 13.3031 5.44884 13.4277 5.55579 13.5174C5.66275 13.6071 5.7979 13.6563 5.9375 13.6562H15.4375C15.595 13.6562 15.746 13.5937 15.8573 13.4823C15.9687 13.371 16.0312 13.22 16.0312 13.0625C16.0312 12.905 15.9687 12.754 15.8573 12.6427C15.746 12.5313 15.595 12.4688 15.4375 12.4688H6.43551L6.22621 11.2812H15.1941C15.4 11.281 15.5995 11.2096 15.7588 11.0791C15.9181 10.9487 16.0275 10.7672 16.0684 10.5654L17.1371 5.22166C17.1629 5.09234 17.1596 4.9589 17.1275 4.831C17.0954 4.7031 17.0353 4.58392 16.9516 4.48207Z",
											fill: "#1E1E1E",
										}),
									],
								}),
							],
						}),
					],
				}),
				k.jsxs("div", {
					className: "w-[11.25rem] flex items-center justify-center gap-1 absolute top-[6.94rem] right-[16rem]",
					children: [
						k.jsx("svg", {
							className: "size-[1.125rem]",
							viewBox: "0 0 18 18",
							fill: "none",
							xmlns: "http://www.w3.org/2000/svg",
							children: k.jsx("path", {
								d: "M8.01001 1.57875C8.31076 1.40423 8.6523 1.31232 9.00001 1.31232C9.34773 1.31232 9.68927 1.40423 9.99001 1.57875L9.99076 1.5795L14.949 4.4295C15.2501 4.60454 15.4998 4.85561 15.6733 5.15757C15.8468 5.45952 15.9379 5.80176 15.9375 6.15V11.8523C15.9368 12.2 15.8452 12.5414 15.6718 12.8428C15.4984 13.1442 15.2492 13.3951 14.949 13.5705L14.9468 13.572L9.99076 16.4213H9.98926C9.6886 16.5956 9.34721 16.6875 8.99964 16.6875C8.65207 16.6875 8.31067 16.5956 8.01001 16.4213H8.00926L3.05326 13.5713H3.05101C2.74934 13.3967 2.49907 13.1457 2.3255 12.8434C2.15193 12.5412 2.06121 12.1985 2.06251 11.85V6.1485C2.06325 5.80079 2.15486 5.45931 2.32825 5.15792C2.50164 4.85652 2.7508 4.60568 3.05101 4.43025L3.05326 4.42875L8.01001 1.57875ZM9.56251 4.5C9.56251 4.35082 9.50325 4.20774 9.39776 4.10225C9.29227 3.99677 9.1492 3.9375 9.00001 3.9375C8.85083 3.9375 8.70776 3.99677 8.60227 4.10225C8.49678 4.20774 8.43751 4.35082 8.43751 4.5V9C8.43751 9.213 8.55751 9.408 8.74876 9.5025L11.7488 11.0025C11.8152 11.0399 11.8885 11.0634 11.9642 11.0717C12.04 11.0799 12.1166 11.0726 12.1895 11.0503C12.2624 11.028 12.33 10.9911 12.3882 10.9419C12.4463 10.8927 12.4939 10.8322 12.528 10.764C12.5621 10.6958 12.582 10.6215 12.5864 10.5454C12.5909 10.4693 12.5798 10.3931 12.554 10.3214C12.5281 10.2497 12.4879 10.1841 12.4359 10.1284C12.3838 10.0727 12.321 10.0282 12.2513 9.9975L9.56251 8.65275V4.5Z",
								fill: "#fb9f24",
							}),
						}),
						k.jsx("p", {
							className: "text-white/80 text-[0.6875rem] font-extrabold",
							children: new Date(T * 1e3).toISOString().substr(11, 8),
						}),
					],
				}),
				k.jsxs("div", {
					className: "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-2.5",
					children: [
						k.jsxs("div", {
							className: "flex items-center gap-4",
							children: [
								k.jsxs("svg", {
									className: "size-[3.625rem]",
									viewBox: "0 0 58 58",
									fill: "none",
									xmlns: "http://www.w3.org/2000/svg",
									children: [
										k.jsx("path", {
											d: "M4.33013 34.5C2.36517 31.0966 2.36517 26.9034 4.33013 23.5L11.9019 10.3853C13.8669 6.98186 17.4983 4.88527 21.4282 4.88527L36.5718 4.88527C40.5017 4.88527 44.1331 6.98186 46.0981 10.3853L53.6699 23.5C55.6348 26.9034 55.6348 31.0966 53.6699 34.5L46.0981 47.6147C44.1331 51.0181 40.5017 53.1147 36.5718 53.1147L21.4282 53.1147C17.4983 53.1147 13.8669 51.0181 11.9019 47.6147L4.33013 34.5Z",
											fill: "url(#paint0_radial_140_1428)",
											"fill-opacity": "0.45",
											stroke: "#fb9f24",
											"stroke-width": "2",
										}),
										k.jsx("path", {
											d: "M8.88675 34C7.10042 30.906 7.10042 27.094 8.88675 24L14.6132 14.0814C16.3996 10.9874 19.7008 9.08142 23.2735 9.08142L34.7265 9.08142C38.2992 9.08142 41.6004 10.9874 43.3868 14.0814L49.1132 24C50.8996 27.094 50.8996 30.906 49.1132 34L43.3868 43.9186C41.6004 47.0126 38.2992 48.9186 34.7265 48.9186L23.2735 48.9186C19.7008 48.9186 16.3996 47.0126 14.6132 43.9186L8.88675 34Z",
											fill: "#fb9f24",
										}),
										k.jsx("g", {
											filter: "url(#filter0_dd_140_1428)",
											children: k.jsx("path", {
												d: "M27.8828 23.3125H30.1172V29H38.4453C38.7416 29 39.0258 28.8823 39.2353 28.6728C39.4448 28.4632 39.5625 28.1791 39.5625 27.8828V24.4297C39.5625 24.1334 39.4448 23.8492 39.2353 23.6397C39.0258 23.4302 38.7416 23.3125 38.4453 23.3125H35.4076C35.8189 22.4652 35.9148 21.4991 35.6778 20.5876C35.4408 19.6761 34.8866 18.8789 34.1147 18.3393C33.3428 17.7997 32.4038 17.5529 31.4663 17.6434C30.5289 17.734 29.6544 18.1557 29 18.8331C28.3445 18.1595 27.4707 17.7409 26.535 17.6523C25.5992 17.5636 24.6625 17.8106 23.8921 18.3491C23.1217 18.8877 22.5679 19.6826 22.3297 20.5918C22.0916 21.5011 22.1845 22.4654 22.5919 23.3125H19.5547C19.2584 23.3125 18.9742 23.4302 18.7647 23.6397C18.5552 23.8492 18.4375 24.1334 18.4375 24.4297V27.8828C18.4375 28.1791 18.5552 28.4632 18.7647 28.6728C18.8685 28.7765 18.9916 28.8588 19.1272 28.9149C19.2627 28.9711 19.408 29 19.5547 29H27.8828V23.3125ZM30.1172 21.5859C30.1172 21.2444 30.2184 20.9106 30.4082 20.6267C30.5979 20.3428 30.8675 20.1215 31.183 19.9908C31.4985 19.8601 31.8457 19.8259 32.1806 19.8925C32.5155 19.9591 32.8231 20.1236 33.0646 20.3651C33.3061 20.6065 33.4705 20.9142 33.5371 21.2491C33.6038 21.584 33.5696 21.9312 33.4389 22.2466C33.3082 22.5621 33.0869 22.8318 32.803 23.0215C32.519 23.2112 32.1852 23.3125 31.8438 23.3125H30.1172V21.5859ZM24.4297 21.5859C24.4297 21.128 24.6116 20.6888 24.9354 20.3651C25.2592 20.0413 25.6983 19.8594 26.1562 19.8594C26.6142 19.8594 27.0533 20.0413 27.3771 20.365C27.7009 20.6888 27.8828 21.128 27.8828 21.5859V23.3125H26.1562C25.6983 23.3125 25.2592 23.1306 24.9354 22.8068C24.6116 22.483 24.4297 22.0438 24.4297 21.5859ZM30.1172 40.375H36.8203C37.1166 40.375 37.4008 40.2573 37.6103 40.0478C37.8198 39.8382 37.9375 39.5541 37.9375 39.2578V30.625H30.1172V40.375ZM20.0625 39.2578C20.0625 39.5541 20.1802 39.8382 20.3897 40.0478C20.5992 40.2573 20.8834 40.375 21.1797 40.375H27.8828V30.625H20.0625V39.2578Z",
												fill: "#1E1E1E",
											}),
										}),
										k.jsxs("defs", {
											children: [
												k.jsxs("filter", {
													id: "filter0_dd_140_1428",
													x: "4.4375",
													y: "3.62512",
													width: "49.125",
													height: "50.7499",
													filterUnits: "userSpaceOnUse",
													"color-interpolation-filters": "sRGB",
													children: [
														k.jsx("feFlood", {
															"flood-opacity": "0",
															result: "BackgroundImageFix",
														}),
														k.jsx("feColorMatrix", {
															in: "SourceAlpha",
															type: "matrix",
															values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
															result: "hardAlpha",
														}),
														k.jsx("feOffset", {}),
														k.jsx("feGaussianBlur", { stdDeviation: "7" }),
														k.jsx("feColorMatrix", {
															type: "matrix",
															values: "0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.45 0",
														}),
														k.jsx("feBlend", {
															mode: "normal",
															in2: "BackgroundImageFix",
															result: "effect1_dropShadow_140_1428",
														}),
														k.jsx("feColorMatrix", {
															in: "SourceAlpha",
															type: "matrix",
															values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",
															result: "hardAlpha",
														}),
														k.jsx("feOffset", {}),
														k.jsx("feGaussianBlur", { stdDeviation: "2" }),
														k.jsx("feComposite", {
															in2: "hardAlpha",
															operator: "out",
														}),
														k.jsx("feColorMatrix", {
															type: "matrix",
															values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0",
														}),
														k.jsx("feBlend", {
															mode: "normal",
															in2: "effect1_dropShadow_140_1428",
															result: "effect2_dropShadow_140_1428",
														}),
														k.jsx("feBlend", {
															mode: "normal",
															in: "SourceGraphic",
															in2: "effect2_dropShadow_140_1428",
															result: "shape",
														}),
													],
												}),
												k.jsxs("radialGradient", {
													id: "paint0_radial_140_1428",
													cx: "0",
													cy: "0",
													r: "1",
													gradientUnits: "userSpaceOnUse",
													gradientTransform: "translate(29 -0.0828493) rotate(90) scale(64.4007 657.175)",
													children: [k.jsx("stop", {}), k.jsx("stop", { offset: "1", "stop-opacity": "0" })],
												}),
											],
										}),
									],
								}),
								k.jsx("h2", {
									className: "text-[#fb9f24] text-xl font-bold",
									children: "RECOMPENSAS",
								}),
							],
						}),
						k.jsx("div", {
							className: "w-[50.375rem] h-[35.875rem] flex flex-wrap items-start gap-1",
							children: z.items.map((U, Q) => k.jsx(rd, { item: U }, Q)),
						}),
						k.jsxs("svg", {
							className: "w-[50.375rem] h-[.6875rem]",
							viewBox: "0 0 806 11",
							fill: "none",
							xmlns: "http://www.w3.org/2000/svg",
							children: [
								k.jsx("rect", {
									y: "6",
									width: "1",
									height: "806",
									transform: "rotate(-90 0 6)",
									fill: "white",
									"fill-opacity": "0.21",
								}),
								k.jsx("rect", {
									x: "353",
									y: "6",
									width: "1",
									height: "100",
									transform: "rotate(-90 353 6)",
									fill: "white",
									"fill-opacity": "0.21",
								}),
								k.jsx("path", {
									d: "M402.5 0.577351C403.119 0.220085 403.881 0.220085 404.5 0.577351L407.263 2.17265C407.882 2.52992 408.263 3.19017 408.263 3.9047V7.0953C408.263 7.80983 407.882 8.47009 407.263 8.82735L404.5 10.4226C403.881 10.7799 403.119 10.7799 402.5 10.4226L399.737 8.82735C399.118 8.47008 398.737 7.80983 398.737 7.0953V3.9047C398.737 3.19017 399.118 2.52992 399.737 2.17265L402.5 0.577351Z",
									fill: "#999999",
								}),
							],
						}),
						k.jsxs("div", {
							className: "flex flex-col items-center",
							children: [
								k.jsxs("div", {
									className: "flex items-center gap-[.31rem]",
									children: [
										k.jsxs("div", {
											className: "relative size-[3.125rem] flex items-center justify-center",
											children: [
												k.jsx("p", {
													className: "text-[#1E1E1E] text-sm font-extrabold z-20",
													children: z.currentDay,
												}),
												k.jsx("svg", {
													className: "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[3rem] h-[2.75rem]",
													viewBox: "0 0 48 44",
													fill: "none",
													xmlns: "http://www.w3.org/2000/svg",
													children: k.jsx("path", {
														d: "M1.95892 25.625C0.663831 23.3818 0.663832 20.6182 1.95892 18.375L9.84012 4.72437C11.1352 2.48121 13.5286 1.09937 16.1188 1.09937L31.8812 1.09937C34.4714 1.09937 36.8648 2.48121 38.1599 4.72437L46.0411 18.375C47.3362 20.6182 47.3362 23.3818 46.0411 25.625L38.1599 39.2756C36.8648 41.5188 34.4714 42.9006 31.8812 42.9006L16.1188 42.9006C13.5286 42.9006 11.1352 41.5188 9.84012 39.2756L1.95892 25.625Z",
														fill: "#fb9f24",
														stroke: "#fb9f24",
														"stroke-width": "1.5",
													}),
												}),
											],
										}),
										k.jsx("div", {
											className: "flex items-center gap-[.19rem]",
											children: Array.from({ length: 6 }).map((U, Q) => {
												const Y = z.items.find((q) => q.day === z.currentDay),
													K = (Y == null ? void 0 : Y.progress) || 0,
													ze = 100 / 6,
													_e = K >= (Q + 1) * ze;
												return k.jsx(
													"div",
													{
														style: {
															boxShadow: _e ? "0 0 .25rem 0 rgba(0, 0, 0, 0.10), 0 0 .875rem 0 rgba(251, 159, 36, 0.45)" : "",
														},
														className: `w-10 h-[0.375rem] rounded-sm ${_e ? "bg-primary" : "bg-white/30"}`,
													},
													Q,
												);
											}),
										}),
										k.jsxs("div", {
											className: "relative size-[3.125rem] flex items-center justify-center",
											children: [
												k.jsx("img", {
													src:
														(ae = z.items.find((U) => U.day === z.currentDay)) != null && ae.image
															? `http://128.201.228.211/inventario/${((W = z.items.find((U) => U.day === z.currentDay))) == null ? void 0 : W.image}.png`
															: Fa,
													alt: "Example",
													className: "size-[1.625rem] object-contain",
												}),
												k.jsx("svg", {
													className: "absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[3rem] h-[2.75rem]",
													viewBox: "0 0 48 44",
													fill: "none",
													xmlns: "http://www.w3.org/2000/svg",
													children: k.jsx("path", {
														d: "M1.95897 25.625C0.663877 23.3818 0.663877 20.6182 1.95897 18.375L9.84016 4.72437C11.1353 2.48121 13.5287 1.09937 16.1188 1.09937L31.8812 1.09937C34.4714 1.09937 36.8648 2.48121 38.1599 4.72437L46.0411 18.375C47.3362 20.6182 47.3362 23.3818 46.0411 25.625L38.1599 39.2756C36.8648 41.5188 34.4714 42.9006 31.8812 42.9006L16.1188 42.9006C13.5287 42.9006 11.1353 41.5188 9.84016 39.2756L1.95897 25.625Z",
														stroke: "#fb9f24",
														"stroke-width": "1.5",
													}),
												}),
											],
										}),
									],
								}),
								k.jsxs("div", {
									className: "flex flex-col items-center",
									children: [
										k.jsx("p", {
											className: "text-white/50 text-[0.5625rem] font-semibold leading-normal",
											children: "RESETA EM:",
										}),
										k.jsx("p", {
											className: "text-white text-[0.6875rem] font-extrabold leading-normal",
											children: "TEMPO RESTANTE",
										}),
										k.jsxs("p", {
											className: "text-primary text-[1.1875rem] font-extrabold leading-normal",
											children: [z.remainingDays, " DIA", z.remainingDays > 1 ? "S" : ""],
										}),
									],
								}),
							],
						}),
					],
				}),
			],
		})
	);
}
Gf.createRoot(document.getElementById("root")).render(k.jsx(Hf.StrictMode, { children: k.jsx(ld, { children: k.jsx(id, {}) }) }));
