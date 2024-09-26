var b = (s, t, o) => {
  if (!t.has(s))
    throw TypeError("Cannot " + o);
};
var e = (s, t, o) => (b(s, t, "read from private field"), o ? o.call(s) : t.get(s)), c = (s, t, o) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, o);
}, a = (s, t, o, n) => (b(s, t, "write to private field"), n ? n.call(s, o) : t.set(s, o), o);
var d = (s, t, o) => (b(s, t, "access private method"), o);
import { createSlice as E, createTimer as L } from "@milkdown/ctx";
import { schemaCtx as O, parserCtx as R, getDoc as Y, prosePluginsCtx as S, editorViewCtx as z, EditorViewReady as B } from "@milkdown/core";
import { ctxNotBind as g, missingYjsDoc as T } from "@milkdown/exception";
import { keydownHandler as V } from "@milkdown/prose/keymap";
import { PluginKey as X, Plugin as _ } from "@milkdown/prose/state";
import { ySyncPlugin as H, yUndoPlugin as I, undo as W, redo as v, yCursorPlugin as q, yDocToProsemirror as k, prosemirrorToYDoc as G, ySyncPluginKey as J, yCursorPluginKey as Q, yUndoPluginKey as Z } from "y-prosemirror";
import { encodeStateAsUpdate as $, applyUpdate as tt } from "yjs";
const M = new X("MILKDOWN_COLLAB_KEYMAP"), et = [M, J, Q, Z];
var h, r, u, i, p, w, A, C, F, m, K;
class U {
  constructor() {
    /// @internal
    c(this, w);
    /// @internal
    c(this, C);
    /// @internal
    c(this, m);
    /// @internal
    c(this, h, {});
    /// @internal
    c(this, r, null);
    /// @internal
    c(this, u, null);
    /// @internal
    c(this, i, null);
    /// @internal
    c(this, p, !1);
  }
  /// Bind the context to the service.
  bindCtx(t) {
    return a(this, i, t), this;
  }
  /// Bind the document to the service.
  bindDoc(t) {
    return a(this, r, t), this;
  }
  /// Set the options of the service.
  setOptions(t) {
    return a(this, h, t), this;
  }
  /// Merge some options to the service.
  /// The options will be merged to the existing options.
  /// THe options should be partial of the `CollabServiceOptions`.
  mergeOptions(t) {
    return Object.assign(e(this, h), t), this;
  }
  /// Set the awareness of the service.
  setAwareness(t) {
    return a(this, u, t), this;
  }
  /// Apply the template to the document.
  applyTemplate(t, o) {
    if (!e(this, i))
      throw g();
    if (!e(this, r))
      throw T();
    const n = o || ((f) => f.textContent.length === 0), l = d(this, w, A).call(this, t), P = e(this, i).get(O), y = k(P, e(this, r));
    if (console.log("yDocToProsemirror:", k), console.log("---applyTemplate!!---"), console.log("this.#doc:", e(this, r)), console.log("yDocNode:", y), l && n(y, l)) {
      const f = e(this, r).getXmlFragment("prosemirror");
      f.delete(0, f.length);
      const x = G(l), j = $(x);
      tt(e(this, r), j), x.destroy();
    }
    return this;
  }
  /// Connect the service.
  connect() {
    if (!e(this, i))
      throw g();
    if (e(this, p))
      return;
    const t = e(this, i).get(S), o = d(this, C, F).call(this), n = t.concat(o);
    return d(this, m, K).call(this, n), a(this, p, !0), this;
  }
  /// Disconnect the service.
  disconnect() {
    if (!e(this, i))
      throw g();
    if (!e(this, p))
      return this;
    const o = e(this, i).get(S).filter(
      (n) => !n.spec.key || !et.includes(n.spec.key)
    );
    return d(this, m, K).call(this, o), a(this, p, !1), this;
  }
}
h = new WeakMap(), r = new WeakMap(), u = new WeakMap(), i = new WeakMap(), p = new WeakMap(), w = new WeakSet(), A = function(t) {
  if (!e(this, i))
    throw g();
  const o = e(this, i).get(O), n = e(this, i).get(R);
  return Y(t, n, o);
}, C = new WeakSet(), F = function() {
  if (!e(this, r))
    throw T();
  const { ySyncOpts: t, yUndoOpts: o } = e(this, h), n = e(this, r).getXmlFragment("prosemirror"), l = [
    H(n, t),
    I(o),
    new _({
      key: M,
      props: {
        handleKeyDown: V({
          "Mod-z": W,
          "Mod-y": v,
          "Mod-Shift-z": v
        })
      }
    })
  ];
  if (e(this, u)) {
    const { yCursorOpts: P, yCursorStateField: y } = e(this, h);
    l.push(q(e(this, u), P, y));
  }
  return l;
}, m = new WeakSet(), K = function(t) {
  if (!e(this, i))
    throw g();
  e(this, i).set(S, t);
  const o = e(this, i).get(z), n = o.state.reconfigure({ plugins: t });
  o.updateState(n);
};
const N = E(new U(), "collabServiceCtx"), D = L("CollabReady"), ot = (s) => {
  const t = new U();
  return s.inject(N, t).record(D), async () => (await s.wait(B), t.bindCtx(s), s.done(D), () => {
    s.remove(N).clearTimer(D);
  });
};
ot.meta = {
  package: "@milkdown/plugin-collab",
  displayName: "Collab"
};
export {
  M as CollabKeymapPluginKey,
  D as CollabReady,
  U as CollabService,
  ot as collab,
  N as collabServiceCtx
};
//# sourceMappingURL=index.es.js.map
