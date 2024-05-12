(() => {
  // .docs/__internals__.mjs
  var __setToArray__ = (s) => {
    let nextNodes = [s];
    let result = [];
    while (nextNodes.length > 0) {
      const elem = nextNodes.shift();
      if (elem.__constructor === `SetRBNode`) {
        result = result.concat(__setToArray__(elem.__args[2]));
        result.push(elem.__args[1]);
        nextNodes.push(elem.__args[3]);
      }
    }
    return result;
  };
  var __dictToArray__ = (s) => {
    let nextNodes = [s];
    let result = [];
    while (nextNodes.length > 0) {
      const elem = nextNodes.shift();
      if (elem.__constructor === `DictRBNode`) {
        result = result.concat(__dictToArray__(elem.__args[3]));
        result.push(elem.__args[1]);
        result.push(elem.__args[2]);
        nextNodes.push(elem.__args[4]);
      }
    }
    return result;
  };
  var __eq__Set = (l, r) => {
    const arrL = __setToArray__(l);
    const arrR = __setToArray__(r);
    let result = true;
    let index = 0;
    while (result && index < arrL.length) {
      if (!__eq__(arrL[index], arrR[index])) {
        result = false;
      }
      index = index + 1;
    }
    return result;
  };
  var __eq__Dict = (l, r) => {
    const arrL = __dictToArray__(l);
    const arrR = __dictToArray__(r);
    let result = true;
    let index = 0;
    while (result && index < arrL.length) {
      if (!__eq__(arrL[index], arrR[index])) {
        result = false;
      }
      index = index + 1;
    }
    return result;
  };
  window.__eq__ = (l, r) => {
    if (l === r) {
      return true;
    }
    if (typeof l !== typeof r) {
      return false;
    }
    if (l === null && r !== null || l !== null && r === null) {
      return false;
    }
    if (l === null && r === null) {
      return true;
    }
    if (typeof l === `object`) {
      if (l.n && l.v) {
        let result = true;
        while (l !== null && result) {
          if (r === null) {
            result = false;
            break;
          }
          result = __eq__(l.v, r.v);
          l = l.n;
          r = r.n;
        }
        return result && r === null;
      }
      if (l.__constructor === `SetRBNode` || l.__constructor === `SetRBEmpty`) {
        return __eq__Set(l, r);
      }
      if (l.__constructor === `DictRBNode` || l.__constructor === `DictRBEmpty`) {
        return __eq__Dict(l, r);
      }
      const keysL = Object.keys(l);
      const keysR = Object.keys(r);
      return keysL.length === keysR.length && keysL.reduce((res, k) => res && __eq__(l[k], r[k]), true);
    }
    return l === r;
  };
  var __applyMany__ = (f, params) => params.reduce((_f, param) => _f(param), f);
  window.__apMtdDicts__ = (dict, dicts) => Object.keys(dict).reduce((o, k) => ({ ...o, [k]: () => __applyMany__(dict[k](), dicts) }), {});
  window.__once__ = (fn, context) => {
    var result;
    return function() {
      if (fn) {
        result = fn.apply(context || this, arguments);
        fn = null;
      }
      return result;
    };
  };
  window.__listToJSArray__ = (list) => {
    let res = [];
    while (list) {
      res.push(list.v);
      list = list.n;
    }
    return res;
  };
  window.__jsArrayToList__ = (arr) => {
    let res = null;
    for (let i = arr.length - 1; i >= 0; i--) {
      let head = { v: arr[i], n: res };
      res = head;
    }
    return res;
  };
  window.__listCtorSpread__ = (_spread, _next) => {
    if (_spread === null) {
      return _next;
    }
    let head = { ..._spread };
    let result = head;
    while (head.n !== null) {
      head = head.n;
    }
    head.n = _next;
    return result;
  };

  // ../../node_modules/snabbdom/build/htmldomapi.js
  function createElement(tagName2, options) {
    return document.createElement(tagName2, options);
  }
  function createElementNS(namespaceURI, qualifiedName, options) {
    return document.createElementNS(namespaceURI, qualifiedName, options);
  }
  function createDocumentFragment() {
    return parseFragment(document.createDocumentFragment());
  }
  function createTextNode(text) {
    return document.createTextNode(text);
  }
  function createComment(text) {
    return document.createComment(text);
  }
  function insertBefore(parentNode2, newNode, referenceNode) {
    if (isDocumentFragment(parentNode2)) {
      let node = parentNode2;
      while (node && isDocumentFragment(node)) {
        const fragment2 = parseFragment(node);
        node = fragment2.parent;
      }
      parentNode2 = node !== null && node !== void 0 ? node : parentNode2;
    }
    if (isDocumentFragment(newNode)) {
      newNode = parseFragment(newNode, parentNode2);
    }
    if (referenceNode && isDocumentFragment(referenceNode)) {
      referenceNode = parseFragment(referenceNode).firstChildNode;
    }
    parentNode2.insertBefore(newNode, referenceNode);
  }
  function removeChild(node, child) {
    node.removeChild(child);
  }
  function appendChild(node, child) {
    if (isDocumentFragment(child)) {
      child = parseFragment(child, node);
    }
    node.appendChild(child);
  }
  function parentNode(node) {
    if (isDocumentFragment(node)) {
      while (node && isDocumentFragment(node)) {
        const fragment2 = parseFragment(node);
        node = fragment2.parent;
      }
      return node !== null && node !== void 0 ? node : null;
    }
    return node.parentNode;
  }
  function nextSibling(node) {
    var _a;
    if (isDocumentFragment(node)) {
      const fragment2 = parseFragment(node);
      const parent = parentNode(fragment2);
      if (parent && fragment2.lastChildNode) {
        const children = Array.from(parent.childNodes);
        const index = children.indexOf(fragment2.lastChildNode);
        return (_a = children[index + 1]) !== null && _a !== void 0 ? _a : null;
      }
      return null;
    }
    return node.nextSibling;
  }
  function tagName(elm) {
    return elm.tagName;
  }
  function setTextContent(node, text) {
    node.textContent = text;
  }
  function getTextContent(node) {
    return node.textContent;
  }
  function isElement(node) {
    return node.nodeType === 1;
  }
  function isText(node) {
    return node.nodeType === 3;
  }
  function isComment(node) {
    return node.nodeType === 8;
  }
  function isDocumentFragment(node) {
    return node.nodeType === 11;
  }
  function parseFragment(fragmentNode, parentNode2) {
    var _a, _b, _c;
    const fragment2 = fragmentNode;
    (_a = fragment2.parent) !== null && _a !== void 0 ? _a : fragment2.parent = parentNode2 !== null && parentNode2 !== void 0 ? parentNode2 : null;
    (_b = fragment2.firstChildNode) !== null && _b !== void 0 ? _b : fragment2.firstChildNode = fragmentNode.firstChild;
    (_c = fragment2.lastChildNode) !== null && _c !== void 0 ? _c : fragment2.lastChildNode = fragmentNode.lastChild;
    return fragment2;
  }
  var htmlDomApi = {
    createElement,
    createElementNS,
    createTextNode,
    createDocumentFragment,
    createComment,
    insertBefore,
    removeChild,
    appendChild,
    parentNode,
    nextSibling,
    tagName,
    setTextContent,
    getTextContent,
    isElement,
    isText,
    isComment,
    isDocumentFragment
  };

  // ../../node_modules/snabbdom/build/vnode.js
  function vnode(sel, data, children, text, elm) {
    const key = data === void 0 ? void 0 : data.key;
    return { sel, data, children, text, elm, key };
  }

  // ../../node_modules/snabbdom/build/is.js
  var array = Array.isArray;
  function primitive(s) {
    return typeof s === "string" || typeof s === "number" || s instanceof String || s instanceof Number;
  }

  // ../../node_modules/snabbdom/build/init.js
  function isUndef(s) {
    return s === void 0;
  }
  function isDef(s) {
    return s !== void 0;
  }
  var emptyNode = vnode("", {}, [], void 0, void 0);
  function sameVnode(vnode1, vnode2) {
    var _a, _b;
    const isSameKey = vnode1.key === vnode2.key;
    const isSameIs = ((_a = vnode1.data) === null || _a === void 0 ? void 0 : _a.is) === ((_b = vnode2.data) === null || _b === void 0 ? void 0 : _b.is);
    const isSameSel = vnode1.sel === vnode2.sel;
    const isSameTextOrFragment = !vnode1.sel && vnode1.sel === vnode2.sel ? typeof vnode1.text === typeof vnode2.text : true;
    return isSameSel && isSameKey && isSameIs && isSameTextOrFragment;
  }
  function documentFragmentIsNotSupported() {
    throw new Error("The document fragment is not supported on this platform.");
  }
  function isElement2(api, vnode2) {
    return api.isElement(vnode2);
  }
  function isDocumentFragment2(api, vnode2) {
    return api.isDocumentFragment(vnode2);
  }
  function createKeyToOldIdx(children, beginIdx, endIdx) {
    var _a;
    const map = {};
    for (let i = beginIdx; i <= endIdx; ++i) {
      const key = (_a = children[i]) === null || _a === void 0 ? void 0 : _a.key;
      if (key !== void 0) {
        map[key] = i;
      }
    }
    return map;
  }
  var hooks = [
    "create",
    "update",
    "remove",
    "destroy",
    "pre",
    "post"
  ];
  function init(modules, domApi, options) {
    const cbs = {
      create: [],
      update: [],
      remove: [],
      destroy: [],
      pre: [],
      post: []
    };
    const api = domApi !== void 0 ? domApi : htmlDomApi;
    for (const hook of hooks) {
      for (const module of modules) {
        const currentHook = module[hook];
        if (currentHook !== void 0) {
          cbs[hook].push(currentHook);
        }
      }
    }
    function emptyNodeAt(elm) {
      const id = elm.id ? "#" + elm.id : "";
      const classes = elm.getAttribute("class");
      const c = classes ? "." + classes.split(" ").join(".") : "";
      return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], void 0, elm);
    }
    function emptyDocumentFragmentAt(frag) {
      return vnode(void 0, {}, [], void 0, frag);
    }
    function createRmCb(childElm, listeners) {
      return function rmCb() {
        if (--listeners === 0) {
          const parent = api.parentNode(childElm);
          if (parent !== null) {
            api.removeChild(parent, childElm);
          }
        }
      };
    }
    function createElm(vnode2, insertedVnodeQueue) {
      var _a, _b, _c, _d;
      let i;
      let data = vnode2.data;
      if (data !== void 0) {
        const init2 = (_a = data.hook) === null || _a === void 0 ? void 0 : _a.init;
        if (isDef(init2)) {
          init2(vnode2);
          data = vnode2.data;
        }
      }
      const children = vnode2.children;
      const sel = vnode2.sel;
      if (sel === "!") {
        if (isUndef(vnode2.text)) {
          vnode2.text = "";
        }
        vnode2.elm = api.createComment(vnode2.text);
      } else if (sel === "") {
        vnode2.elm = api.createTextNode(vnode2.text);
      } else if (sel !== void 0) {
        const hashIdx = sel.indexOf("#");
        const dotIdx = sel.indexOf(".", hashIdx);
        const hash = hashIdx > 0 ? hashIdx : sel.length;
        const dot = dotIdx > 0 ? dotIdx : sel.length;
        const tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
        const elm = vnode2.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag, data) : api.createElement(tag, data);
        if (hash < dot)
          elm.setAttribute("id", sel.slice(hash + 1, dot));
        if (dotIdx > 0)
          elm.setAttribute("class", sel.slice(dot + 1).replace(/\./g, " "));
        for (i = 0; i < cbs.create.length; ++i)
          cbs.create[i](emptyNode, vnode2);
        if (primitive(vnode2.text) && (!array(children) || children.length === 0)) {
          api.appendChild(elm, api.createTextNode(vnode2.text));
        }
        if (array(children)) {
          for (i = 0; i < children.length; ++i) {
            const ch = children[i];
            if (ch != null) {
              api.appendChild(elm, createElm(ch, insertedVnodeQueue));
            }
          }
        }
        const hook = vnode2.data.hook;
        if (isDef(hook)) {
          (_b = hook.create) === null || _b === void 0 ? void 0 : _b.call(hook, emptyNode, vnode2);
          if (hook.insert) {
            insertedVnodeQueue.push(vnode2);
          }
        }
      } else if (((_c = options === null || options === void 0 ? void 0 : options.experimental) === null || _c === void 0 ? void 0 : _c.fragments) && vnode2.children) {
        vnode2.elm = ((_d = api.createDocumentFragment) !== null && _d !== void 0 ? _d : documentFragmentIsNotSupported)();
        for (i = 0; i < cbs.create.length; ++i)
          cbs.create[i](emptyNode, vnode2);
        for (i = 0; i < vnode2.children.length; ++i) {
          const ch = vnode2.children[i];
          if (ch != null) {
            api.appendChild(vnode2.elm, createElm(ch, insertedVnodeQueue));
          }
        }
      } else {
        vnode2.elm = api.createTextNode(vnode2.text);
      }
      return vnode2.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        const ch = vnodes[startIdx];
        if (ch != null) {
          api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
        }
      }
    }
    function invokeDestroyHook(vnode2) {
      var _a, _b;
      const data = vnode2.data;
      if (data !== void 0) {
        (_b = (_a = data === null || data === void 0 ? void 0 : data.hook) === null || _a === void 0 ? void 0 : _a.destroy) === null || _b === void 0 ? void 0 : _b.call(_a, vnode2);
        for (let i = 0; i < cbs.destroy.length; ++i)
          cbs.destroy[i](vnode2);
        if (vnode2.children !== void 0) {
          for (let j = 0; j < vnode2.children.length; ++j) {
            const child = vnode2.children[j];
            if (child != null && typeof child !== "string") {
              invokeDestroyHook(child);
            }
          }
        }
      }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
      var _a, _b;
      for (; startIdx <= endIdx; ++startIdx) {
        let listeners;
        let rm;
        const ch = vnodes[startIdx];
        if (ch != null) {
          if (isDef(ch.sel)) {
            invokeDestroyHook(ch);
            listeners = cbs.remove.length + 1;
            rm = createRmCb(ch.elm, listeners);
            for (let i = 0; i < cbs.remove.length; ++i)
              cbs.remove[i](ch, rm);
            const removeHook = (_b = (_a = ch === null || ch === void 0 ? void 0 : ch.data) === null || _a === void 0 ? void 0 : _a.hook) === null || _b === void 0 ? void 0 : _b.remove;
            if (isDef(removeHook)) {
              removeHook(ch, rm);
            } else {
              rm();
            }
          } else if (ch.children) {
            invokeDestroyHook(ch);
            removeVnodes(parentElm, ch.children, 0, ch.children.length - 1);
          } else {
            api.removeChild(parentElm, ch.elm);
          }
        }
      }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
      let oldStartIdx = 0;
      let newStartIdx = 0;
      let oldEndIdx = oldCh.length - 1;
      let oldStartVnode = oldCh[0];
      let oldEndVnode = oldCh[oldEndIdx];
      let newEndIdx = newCh.length - 1;
      let newStartVnode = newCh[0];
      let newEndVnode = newCh[newEndIdx];
      let oldKeyToIdx;
      let idxInOld;
      let elmToMove;
      let before;
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
          oldStartVnode = oldCh[++oldStartIdx];
        } else if (oldEndVnode == null) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (newStartVnode == null) {
          newStartVnode = newCh[++newStartIdx];
        } else if (newEndVnode == null) {
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
          api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
          api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (oldKeyToIdx === void 0) {
            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
          }
          idxInOld = oldKeyToIdx[newStartVnode.key];
          if (isUndef(idxInOld)) {
            api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else if (isUndef(oldKeyToIdx[newEndVnode.key])) {
            api.insertBefore(parentElm, createElm(newEndVnode, insertedVnodeQueue), api.nextSibling(oldEndVnode.elm));
            newEndVnode = newCh[--newEndIdx];
          } else {
            elmToMove = oldCh[idxInOld];
            if (elmToMove.sel !== newStartVnode.sel) {
              api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
            } else {
              patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
              oldCh[idxInOld] = void 0;
              api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
            }
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
      if (newStartIdx <= newEndIdx) {
        before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      }
      if (oldStartIdx <= oldEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
    function patchVnode(oldVnode, vnode2, insertedVnodeQueue) {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const hook = (_a = vnode2.data) === null || _a === void 0 ? void 0 : _a.hook;
      (_b = hook === null || hook === void 0 ? void 0 : hook.prepatch) === null || _b === void 0 ? void 0 : _b.call(hook, oldVnode, vnode2);
      const elm = vnode2.elm = oldVnode.elm;
      if (oldVnode === vnode2)
        return;
      if (vnode2.data !== void 0 || isDef(vnode2.text) && vnode2.text !== oldVnode.text) {
        (_c = vnode2.data) !== null && _c !== void 0 ? _c : vnode2.data = {};
        (_d = oldVnode.data) !== null && _d !== void 0 ? _d : oldVnode.data = {};
        for (let i = 0; i < cbs.update.length; ++i)
          cbs.update[i](oldVnode, vnode2);
        (_g = (_f = (_e = vnode2.data) === null || _e === void 0 ? void 0 : _e.hook) === null || _f === void 0 ? void 0 : _f.update) === null || _g === void 0 ? void 0 : _g.call(_f, oldVnode, vnode2);
      }
      const oldCh = oldVnode.children;
      const ch = vnode2.children;
      if (isUndef(vnode2.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch)
            updateChildren(elm, oldCh, ch, insertedVnodeQueue);
        } else if (isDef(ch)) {
          if (isDef(oldVnode.text))
            api.setTextContent(elm, "");
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          api.setTextContent(elm, "");
        }
      } else if (oldVnode.text !== vnode2.text) {
        if (isDef(oldCh)) {
          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        }
        api.setTextContent(elm, vnode2.text);
      }
      (_h = hook === null || hook === void 0 ? void 0 : hook.postpatch) === null || _h === void 0 ? void 0 : _h.call(hook, oldVnode, vnode2);
    }
    return function patch(oldVnode, vnode2) {
      let i, elm, parent;
      const insertedVnodeQueue = [];
      for (i = 0; i < cbs.pre.length; ++i)
        cbs.pre[i]();
      if (isElement2(api, oldVnode)) {
        oldVnode = emptyNodeAt(oldVnode);
      } else if (isDocumentFragment2(api, oldVnode)) {
        oldVnode = emptyDocumentFragmentAt(oldVnode);
      }
      if (sameVnode(oldVnode, vnode2)) {
        patchVnode(oldVnode, vnode2, insertedVnodeQueue);
      } else {
        elm = oldVnode.elm;
        parent = api.parentNode(elm);
        createElm(vnode2, insertedVnodeQueue);
        if (parent !== null) {
          api.insertBefore(parent, vnode2.elm, api.nextSibling(elm));
          removeVnodes(parent, [oldVnode], 0, 0);
        }
      }
      for (i = 0; i < insertedVnodeQueue.length; ++i) {
        insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
      }
      for (i = 0; i < cbs.post.length; ++i)
        cbs.post[i]();
      return vnode2;
    };
  }

  // ../../node_modules/snabbdom/build/h.js
  function addNS(data, children, sel) {
    data.ns = "http://www.w3.org/2000/svg";
    if (sel !== "foreignObject" && children !== void 0) {
      for (let i = 0; i < children.length; ++i) {
        const child = children[i];
        if (typeof child === "string")
          continue;
        const childData = child.data;
        if (childData !== void 0) {
          addNS(childData, child.children, child.sel);
        }
      }
    }
  }
  function h(sel, b, c) {
    let data = {};
    let children;
    let text;
    let i;
    if (c !== void 0) {
      if (b !== null) {
        data = b;
      }
      if (array(c)) {
        children = c;
      } else if (primitive(c)) {
        text = c.toString();
      } else if (c && c.sel) {
        children = [c];
      }
    } else if (b !== void 0 && b !== null) {
      if (array(b)) {
        children = b;
      } else if (primitive(b)) {
        text = b.toString();
      } else if (b && b.sel) {
        children = [b];
      } else {
        data = b;
      }
    }
    if (children !== void 0) {
      for (i = 0; i < children.length; ++i) {
        if (primitive(children[i]))
          children[i] = vnode(void 0, void 0, void 0, children[i], void 0);
      }
    }
    if (sel.startsWith("svg") && (sel.length === 3 || sel[3] === "." || sel[3] === "#")) {
      addNS(data, children, sel);
    }
    return vnode(sel, data, children, text, void 0);
  }

  // ../../node_modules/snabbdom/build/modules/attributes.js
  var xlinkNS = "http://www.w3.org/1999/xlink";
  var xmlnsNS = "http://www.w3.org/2000/xmlns/";
  var xmlNS = "http://www.w3.org/XML/1998/namespace";
  var colonChar = 58;
  var xChar = 120;
  var mChar = 109;
  function updateAttrs(oldVnode, vnode2) {
    let key;
    const elm = vnode2.elm;
    let oldAttrs = oldVnode.data.attrs;
    let attrs = vnode2.data.attrs;
    if (!oldAttrs && !attrs)
      return;
    if (oldAttrs === attrs)
      return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    for (key in attrs) {
      const cur = attrs[key];
      const old = oldAttrs[key];
      if (old !== cur) {
        if (cur === true) {
          elm.setAttribute(key, "");
        } else if (cur === false) {
          elm.removeAttribute(key);
        } else {
          if (key.charCodeAt(0) !== xChar) {
            elm.setAttribute(key, cur);
          } else if (key.charCodeAt(3) === colonChar) {
            elm.setAttributeNS(xmlNS, key, cur);
          } else if (key.charCodeAt(5) === colonChar) {
            key.charCodeAt(1) === mChar ? elm.setAttributeNS(xmlnsNS, key, cur) : elm.setAttributeNS(xlinkNS, key, cur);
          } else {
            elm.setAttribute(key, cur);
          }
        }
      }
    }
    for (key in oldAttrs) {
      if (!(key in attrs)) {
        elm.removeAttribute(key);
      }
    }
  }
  var attributesModule = {
    create: updateAttrs,
    update: updateAttrs
  };

  // ../../node_modules/snabbdom/build/modules/eventlisteners.js
  function invokeHandler(handler, vnode2, event) {
    if (typeof handler === "function") {
      handler.call(vnode2, event, vnode2);
    } else if (typeof handler === "object") {
      for (let i = 0; i < handler.length; i++) {
        invokeHandler(handler[i], vnode2, event);
      }
    }
  }
  function handleEvent(event, vnode2) {
    const name = event.type;
    const on = vnode2.data.on;
    if (on && on[name]) {
      invokeHandler(on[name], vnode2, event);
    }
  }
  function createListener() {
    return function handler(event) {
      handleEvent(event, handler.vnode);
    };
  }
  function updateEventListeners(oldVnode, vnode2) {
    const oldOn = oldVnode.data.on;
    const oldListener = oldVnode.listener;
    const oldElm = oldVnode.elm;
    const on = vnode2 && vnode2.data.on;
    const elm = vnode2 && vnode2.elm;
    let name;
    if (oldOn === on) {
      return;
    }
    if (oldOn && oldListener) {
      if (!on) {
        for (name in oldOn) {
          oldElm.removeEventListener(name, oldListener, false);
        }
      } else {
        for (name in oldOn) {
          if (!on[name]) {
            oldElm.removeEventListener(name, oldListener, false);
          }
        }
      }
    }
    if (on) {
      const listener = vnode2.listener = oldVnode.listener || createListener();
      listener.vnode = vnode2;
      if (!oldOn) {
        for (name in on) {
          elm.addEventListener(name, listener, false);
        }
      } else {
        for (name in on) {
          if (!oldOn[name]) {
            elm.addEventListener(name, listener, false);
          }
        }
      }
    }
  }
  var eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
  };

  // ../../node_modules/snabbdom/build/modules/props.js
  function updateProps(oldVnode, vnode2) {
    let key;
    let cur;
    let old;
    const elm = vnode2.elm;
    let oldProps = oldVnode.data.props;
    let props = vnode2.data.props;
    if (!oldProps && !props)
      return;
    if (oldProps === props)
      return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in props) {
      cur = props[key];
      old = oldProps[key];
      if (old !== cur && (key !== "value" || elm[key] !== cur)) {
        elm[key] = cur;
      }
    }
  }
  var propsModule = { create: updateProps, update: updateProps };

  // ../../node_modules/snabbdom/build/modules/style.js
  var raf = typeof (window === null || window === void 0 ? void 0 : window.requestAnimationFrame) === "function" ? window.requestAnimationFrame.bind(window) : setTimeout;
  var nextFrame = function(fn) {
    raf(function() {
      raf(fn);
    });
  };
  var reflowForced = false;
  function setNextFrame(obj, prop, val) {
    nextFrame(function() {
      obj[prop] = val;
    });
  }
  function updateStyle(oldVnode, vnode2) {
    let cur;
    let name;
    const elm = vnode2.elm;
    let oldStyle = oldVnode.data.style;
    let style = vnode2.data.style;
    if (!oldStyle && !style)
      return;
    if (oldStyle === style)
      return;
    oldStyle = oldStyle || {};
    style = style || {};
    const oldHasDel = "delayed" in oldStyle;
    for (name in oldStyle) {
      if (!(name in style)) {
        if (name[0] === "-" && name[1] === "-") {
          elm.style.removeProperty(name);
        } else {
          elm.style[name] = "";
        }
      }
    }
    for (name in style) {
      cur = style[name];
      if (name === "delayed" && style.delayed) {
        for (const name2 in style.delayed) {
          cur = style.delayed[name2];
          if (!oldHasDel || cur !== oldStyle.delayed[name2]) {
            setNextFrame(elm.style, name2, cur);
          }
        }
      } else if (name !== "remove" && cur !== oldStyle[name]) {
        if (name[0] === "-" && name[1] === "-") {
          elm.style.setProperty(name, cur);
        } else {
          elm.style[name] = cur;
        }
      }
    }
  }
  function applyDestroyStyle(vnode2) {
    let style;
    let name;
    const elm = vnode2.elm;
    const s = vnode2.data.style;
    if (!s || !(style = s.destroy))
      return;
    for (name in style) {
      elm.style[name] = style[name];
    }
  }
  function applyRemoveStyle(vnode2, rm) {
    const s = vnode2.data.style;
    if (!s || !s.remove) {
      rm();
      return;
    }
    if (!reflowForced) {
      vnode2.elm.offsetLeft;
      reflowForced = true;
    }
    let name;
    const elm = vnode2.elm;
    let i = 0;
    const style = s.remove;
    let amount = 0;
    const applied = [];
    for (name in style) {
      applied.push(name);
      elm.style[name] = style[name];
    }
    const compStyle = getComputedStyle(elm);
    const props = compStyle["transition-property"].split(", ");
    for (; i < props.length; ++i) {
      if (applied.indexOf(props[i]) !== -1)
        amount++;
    }
    elm.addEventListener("transitionend", function(ev) {
      if (ev.target === elm)
        --amount;
      if (amount === 0)
        rm();
    });
  }
  function forceReflow() {
    reflowForced = false;
  }
  var styleModule = {
    pre: forceReflow,
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
  };

  // .docs/madlib_modules/MadDoc/src/Main.mjs
  var _10f79_DictRBBlack = { __constructor: "DictRBBlack", __args: [] };
  var _10f79_DictRBRed = { __constructor: "DictRBRed", __args: [] };
  var _10f79_DictRBEmpty = { __constructor: "DictRBEmpty", __args: [] };
  var _10f79_DictRBNode = (a) => (b) => (c) => (d) => (e) => ({ __constructor: "DictRBNode", __args: [a, b, c, d, e] });
  var _10f79_LT = { __constructor: "LT", __args: [] };
  var _10f79_EQ = { __constructor: "EQ", __args: [] };
  var _10f79_GT = { __constructor: "GT", __args: [] };
  var _3d769_Loop = (a) => ({ __constructor: "Loop", __args: [a] });
  var _3d769_Done = (a) => ({ __constructor: "Done", __args: [a] });
  var _2e42b_Just = (a) => ({ __constructor: "Just", __args: [a] });
  var _2e42b_Nothing = { __constructor: "Nothing", __args: [] };
  var _1e6e4_Wish = (a) => ({ __constructor: "Wish", __args: [a] });
  var _4e1b6_KEY_ANY = { __constructor: "KEY_ANY", __args: [] };
  var _4e1b6_KEY_BREAK = { __constructor: "KEY_BREAK", __args: [] };
  var _4e1b6_KEY_BACKSPACE = { __constructor: "KEY_BACKSPACE", __args: [] };
  var _4e1b6_KEY_TAB = { __constructor: "KEY_TAB", __args: [] };
  var _4e1b6_KEY_CLEAR = { __constructor: "KEY_CLEAR", __args: [] };
  var _4e1b6_KEY_ENTER = { __constructor: "KEY_ENTER", __args: [] };
  var _4e1b6_KEY_SHIFT = { __constructor: "KEY_SHIFT", __args: [] };
  var _4e1b6_KEY_CTRL = { __constructor: "KEY_CTRL", __args: [] };
  var _4e1b6_KEY_ALT = { __constructor: "KEY_ALT", __args: [] };
  var _4e1b6_KEY_PAUSE = { __constructor: "KEY_PAUSE", __args: [] };
  var _4e1b6_KEY_CAPS_LOCK = { __constructor: "KEY_CAPS_LOCK", __args: [] };
  var _4e1b6_KEY_HANGUL = { __constructor: "KEY_HANGUL", __args: [] };
  var _4e1b6_KEY_HANJA = { __constructor: "KEY_HANJA", __args: [] };
  var _4e1b6_KEY_ESCAPE = { __constructor: "KEY_ESCAPE", __args: [] };
  var _4e1b6_KEY_CONVERSION = { __constructor: "KEY_CONVERSION", __args: [] };
  var _4e1b6_KEY_NON_CONVERSION = { __constructor: "KEY_NON_CONVERSION", __args: [] };
  var _4e1b6_KEY_SPACE = { __constructor: "KEY_SPACE", __args: [] };
  var _4e1b6_KEY_PAGE_UP = { __constructor: "KEY_PAGE_UP", __args: [] };
  var _4e1b6_KEY_PAGE_DOWN = { __constructor: "KEY_PAGE_DOWN", __args: [] };
  var _4e1b6_KEY_END = { __constructor: "KEY_END", __args: [] };
  var _4e1b6_KEY_HOME = { __constructor: "KEY_HOME", __args: [] };
  var _4e1b6_KEY_LEFT_ARROW = { __constructor: "KEY_LEFT_ARROW", __args: [] };
  var _4e1b6_KEY_UP_ARROW = { __constructor: "KEY_UP_ARROW", __args: [] };
  var _4e1b6_KEY_RIGHT_ARROW = { __constructor: "KEY_RIGHT_ARROW", __args: [] };
  var _4e1b6_KEY_DOWN_ARROW = { __constructor: "KEY_DOWN_ARROW", __args: [] };
  var _4e1b6_KEY_SELECT = { __constructor: "KEY_SELECT", __args: [] };
  var _4e1b6_KEY_PRINT = { __constructor: "KEY_PRINT", __args: [] };
  var _4e1b6_KEY_EXECUTE = { __constructor: "KEY_EXECUTE", __args: [] };
  var _4e1b6_KEY_PRINT_SCREEN = { __constructor: "KEY_PRINT_SCREEN", __args: [] };
  var _4e1b6_KEY_INSERT = { __constructor: "KEY_INSERT", __args: [] };
  var _4e1b6_KEY_DELETE = { __constructor: "KEY_DELETE", __args: [] };
  var _4e1b6_KEY_HELP = { __constructor: "KEY_HELP", __args: [] };
  var _4e1b6_KEY_0 = { __constructor: "KEY_0", __args: [] };
  var _4e1b6_KEY_1 = { __constructor: "KEY_1", __args: [] };
  var _4e1b6_KEY_2 = { __constructor: "KEY_2", __args: [] };
  var _4e1b6_KEY_3 = { __constructor: "KEY_3", __args: [] };
  var _4e1b6_KEY_4 = { __constructor: "KEY_4", __args: [] };
  var _4e1b6_KEY_5 = { __constructor: "KEY_5", __args: [] };
  var _4e1b6_KEY_6 = { __constructor: "KEY_6", __args: [] };
  var _4e1b6_KEY_7 = { __constructor: "KEY_7", __args: [] };
  var _4e1b6_KEY_8 = { __constructor: "KEY_8", __args: [] };
  var _4e1b6_KEY_9 = { __constructor: "KEY_9", __args: [] };
  var _4e1b6_KEY_COLON = { __constructor: "KEY_COLON", __args: [] };
  var _4e1b6_KEY_LEFT_CHEVRON = { __constructor: "KEY_LEFT_CHEVRON", __args: [] };
  var _4e1b6_KEY_EQUAL = { __constructor: "KEY_EQUAL", __args: [] };
  var _4e1b6_KEY_ESZETT = { __constructor: "KEY_ESZETT", __args: [] };
  var _4e1b6_KEY_AT = { __constructor: "KEY_AT", __args: [] };
  var _4e1b6_KEY_A = { __constructor: "KEY_A", __args: [] };
  var _4e1b6_KEY_B = { __constructor: "KEY_B", __args: [] };
  var _4e1b6_KEY_C = { __constructor: "KEY_C", __args: [] };
  var _4e1b6_KEY_D = { __constructor: "KEY_D", __args: [] };
  var _4e1b6_KEY_E = { __constructor: "KEY_E", __args: [] };
  var _4e1b6_KEY_F = { __constructor: "KEY_F", __args: [] };
  var _4e1b6_KEY_G = { __constructor: "KEY_G", __args: [] };
  var _4e1b6_KEY_H = { __constructor: "KEY_H", __args: [] };
  var _4e1b6_KEY_I = { __constructor: "KEY_I", __args: [] };
  var _4e1b6_KEY_J = { __constructor: "KEY_J", __args: [] };
  var _4e1b6_KEY_K = { __constructor: "KEY_K", __args: [] };
  var _4e1b6_KEY_L = { __constructor: "KEY_L", __args: [] };
  var _4e1b6_KEY_M = { __constructor: "KEY_M", __args: [] };
  var _4e1b6_KEY_N = { __constructor: "KEY_N", __args: [] };
  var _4e1b6_KEY_O = { __constructor: "KEY_O", __args: [] };
  var _4e1b6_KEY_P = { __constructor: "KEY_P", __args: [] };
  var _4e1b6_KEY_Q = { __constructor: "KEY_Q", __args: [] };
  var _4e1b6_KEY_R = { __constructor: "KEY_R", __args: [] };
  var _4e1b6_KEY_S = { __constructor: "KEY_S", __args: [] };
  var _4e1b6_KEY_T = { __constructor: "KEY_T", __args: [] };
  var _4e1b6_KEY_U = { __constructor: "KEY_U", __args: [] };
  var _4e1b6_KEY_V = { __constructor: "KEY_V", __args: [] };
  var _4e1b6_KEY_W = { __constructor: "KEY_W", __args: [] };
  var _4e1b6_KEY_X = { __constructor: "KEY_X", __args: [] };
  var _4e1b6_KEY_Y = { __constructor: "KEY_Y", __args: [] };
  var _4e1b6_KEY_Z = { __constructor: "KEY_Z", __args: [] };
  var _4e1b6_KEY_CMD_LEFT = { __constructor: "KEY_CMD_LEFT", __args: [] };
  var _4e1b6_KEY_CMD_RIGHT = { __constructor: "KEY_CMD_RIGHT", __args: [] };
  var _4e1b6_KEY_SLEEP = { __constructor: "KEY_SLEEP", __args: [] };
  var _4e1b6_KEY_NUMPAD_0 = { __constructor: "KEY_NUMPAD_0", __args: [] };
  var _4e1b6_KEY_NUMPAD_1 = { __constructor: "KEY_NUMPAD_1", __args: [] };
  var _4e1b6_KEY_NUMPAD_2 = { __constructor: "KEY_NUMPAD_2", __args: [] };
  var _4e1b6_KEY_NUMPAD_3 = { __constructor: "KEY_NUMPAD_3", __args: [] };
  var _4e1b6_KEY_NUMPAD_4 = { __constructor: "KEY_NUMPAD_4", __args: [] };
  var _4e1b6_KEY_NUMPAD_5 = { __constructor: "KEY_NUMPAD_5", __args: [] };
  var _4e1b6_KEY_NUMPAD_6 = { __constructor: "KEY_NUMPAD_6", __args: [] };
  var _4e1b6_KEY_NUMPAD_7 = { __constructor: "KEY_NUMPAD_7", __args: [] };
  var _4e1b6_KEY_NUMPAD_8 = { __constructor: "KEY_NUMPAD_8", __args: [] };
  var _4e1b6_KEY_NUMPAD_9 = { __constructor: "KEY_NUMPAD_9", __args: [] };
  var _4e1b6_KEY_MULTIPLY = { __constructor: "KEY_MULTIPLY", __args: [] };
  var _4e1b6_KEY_ADD = { __constructor: "KEY_ADD", __args: [] };
  var _4e1b6_KEY_NUMPAD_PERIOD = { __constructor: "KEY_NUMPAD_PERIOD", __args: [] };
  var _4e1b6_KEY_SUBSTRACT = { __constructor: "KEY_SUBSTRACT", __args: [] };
  var _4e1b6_KEY_DECIMAL_POINT = { __constructor: "KEY_DECIMAL_POINT", __args: [] };
  var _4e1b6_KEY_DIVIDE = { __constructor: "KEY_DIVIDE", __args: [] };
  var _4e1b6_KEY_F1 = { __constructor: "KEY_F1", __args: [] };
  var _4e1b6_KEY_F2 = { __constructor: "KEY_F2", __args: [] };
  var _4e1b6_KEY_F3 = { __constructor: "KEY_F3", __args: [] };
  var _4e1b6_KEY_F4 = { __constructor: "KEY_F4", __args: [] };
  var _4e1b6_KEY_F5 = { __constructor: "KEY_F5", __args: [] };
  var _4e1b6_KEY_F6 = { __constructor: "KEY_F6", __args: [] };
  var _4e1b6_KEY_F7 = { __constructor: "KEY_F7", __args: [] };
  var _4e1b6_KEY_F8 = { __constructor: "KEY_F8", __args: [] };
  var _4e1b6_KEY_F9 = { __constructor: "KEY_F9", __args: [] };
  var _4e1b6_KEY_F10 = { __constructor: "KEY_F10", __args: [] };
  var _4e1b6_KEY_F11 = { __constructor: "KEY_F11", __args: [] };
  var _4e1b6_KEY_F12 = { __constructor: "KEY_F12", __args: [] };
  var _4e1b6_KEY_F13 = { __constructor: "KEY_F13", __args: [] };
  var _4e1b6_KEY_F14 = { __constructor: "KEY_F14", __args: [] };
  var _4e1b6_KEY_F15 = { __constructor: "KEY_F15", __args: [] };
  var _4e1b6_KEY_F16 = { __constructor: "KEY_F16", __args: [] };
  var _4e1b6_KEY_F17 = { __constructor: "KEY_F17", __args: [] };
  var _4e1b6_KEY_F18 = { __constructor: "KEY_F18", __args: [] };
  var _4e1b6_KEY_F19 = { __constructor: "KEY_F19", __args: [] };
  var _4e1b6_KEY_F20 = { __constructor: "KEY_F20", __args: [] };
  var _4e1b6_KEY_F21 = { __constructor: "KEY_F21", __args: [] };
  var _4e1b6_KEY_F22 = { __constructor: "KEY_F22", __args: [] };
  var _4e1b6_KEY_F23 = { __constructor: "KEY_F23", __args: [] };
  var _4e1b6_KEY_F24 = { __constructor: "KEY_F24", __args: [] };
  var _4e1b6_KEY_F25 = { __constructor: "KEY_F25", __args: [] };
  var _4e1b6_KEY_F26 = { __constructor: "KEY_F26", __args: [] };
  var _4e1b6_KEY_F27 = { __constructor: "KEY_F27", __args: [] };
  var _4e1b6_KEY_F28 = { __constructor: "KEY_F28", __args: [] };
  var _4e1b6_KEY_F29 = { __constructor: "KEY_F29", __args: [] };
  var _4e1b6_KEY_F30 = { __constructor: "KEY_F30", __args: [] };
  var _4e1b6_KEY_F31 = { __constructor: "KEY_F31", __args: [] };
  var _4e1b6_KEY_F32 = { __constructor: "KEY_F32", __args: [] };
  var _4e1b6_KEY_NUM_LOCK = { __constructor: "KEY_NUM_LOCK", __args: [] };
  var _4e1b6_KEY_SCROLL_LOCK = { __constructor: "KEY_SCROLL_LOCK", __args: [] };
  var _4e1b6_KEY_AIRPLANE_MODE = { __constructor: "KEY_AIRPLANE_MODE", __args: [] };
  var _4e1b6_KEY_CIRCONFLEX = { __constructor: "KEY_CIRCONFLEX", __args: [] };
  var _4e1b6_KEY_EXCLAMATION_MARK = { __constructor: "KEY_EXCLAMATION_MARK", __args: [] };
  var _4e1b6_KEY_ARABIC_SEMI_COLON = { __constructor: "KEY_ARABIC_SEMI_COLON", __args: [] };
  var _4e1b6_KEY_NUMBER_SIGN = { __constructor: "KEY_NUMBER_SIGN", __args: [] };
  var _4e1b6_KEY_DOLLAR = { __constructor: "KEY_DOLLAR", __args: [] };
  var _4e1b6_KEY_U_GRAVE_ACCENT = { __constructor: "KEY_U_GRAVE_ACCENT", __args: [] };
  var _4e1b6_KEY_PAGE_BACKWARD = { __constructor: "KEY_PAGE_BACKWARD", __args: [] };
  var _4e1b6_KEY_PAGE_FORWARD = { __constructor: "KEY_PAGE_FORWARD", __args: [] };
  var _4e1b6_KEY_REFRESH = { __constructor: "KEY_REFRESH", __args: [] };
  var _4e1b6_KEY_RIGHT_PAREN = { __constructor: "KEY_RIGHT_PAREN", __args: [] };
  var _4e1b6_KEY_ASTERISK = { __constructor: "KEY_ASTERISK", __args: [] };
  var _4e1b6_KEY_TILDE = { __constructor: "KEY_TILDE", __args: [] };
  var _4e1b6_KEY_MUTE = { __constructor: "KEY_MUTE", __args: [] };
  var _4e1b6_KEY_NEXT = { __constructor: "KEY_NEXT", __args: [] };
  var _4e1b6_KEY_PREVIOUS = { __constructor: "KEY_PREVIOUS", __args: [] };
  var _4e1b6_KEY_STOP = { __constructor: "KEY_STOP", __args: [] };
  var _4e1b6_KEY_PLAY_PAUSE = { __constructor: "KEY_PLAY_PAUSE", __args: [] };
  var _4e1b6_KEY_EMAIL = { __constructor: "KEY_EMAIL", __args: [] };
  var _4e1b6_KEY_MUTE_UNMUTE = { __constructor: "KEY_MUTE_UNMUTE", __args: [] };
  var _4e1b6_KEY_DECREASE_VOLUME = { __constructor: "KEY_DECREASE_VOLUME", __args: [] };
  var _4e1b6_KEY_INCREASE_VOLUME = { __constructor: "KEY_INCREASE_VOLUME", __args: [] };
  var _4e1b6_KEY_SEMI_COLON = { __constructor: "KEY_SEMI_COLON", __args: [] };
  var _4e1b6_KEY_COMMA = { __constructor: "KEY_COMMA", __args: [] };
  var _4e1b6_KEY_DASH = { __constructor: "KEY_DASH", __args: [] };
  var _4e1b6_KEY_PERIOD = { __constructor: "KEY_PERIOD", __args: [] };
  var _4e1b6_KEY_FORWARD_SLASH = { __constructor: "KEY_FORWARD_SLASH", __args: [] };
  var _4e1b6_KEY_GRAVE_ACCENT = { __constructor: "KEY_GRAVE_ACCENT", __args: [] };
  var _4e1b6_KEY_QUESTION_MARK = { __constructor: "KEY_QUESTION_MARK", __args: [] };
  var _4e1b6_KEY_BRACKET_LEFT = { __constructor: "KEY_BRACKET_LEFT", __args: [] };
  var _4e1b6_KEY_BACK_SLASH = { __constructor: "KEY_BACK_SLASH", __args: [] };
  var _4e1b6_KEY_BRACKET_RIGHT = { __constructor: "KEY_BRACKET_RIGHT", __args: [] };
  var _4e1b6_KEY_SINGLE_QUOTE = { __constructor: "KEY_SINGLE_QUOTE", __args: [] };
  var _4e1b6_KEY_BACK_TICK = { __constructor: "KEY_BACK_TICK", __args: [] };
  var _4e1b6_KEY_CMD = { __constructor: "KEY_CMD", __args: [] };
  var _4e1b6_KEY_ALTGR = { __constructor: "KEY_ALTGR", __args: [] };
  var _4e1b6_KEY_LEFT_BACK_SLASH = { __constructor: "KEY_LEFT_BACK_SLASH", __args: [] };
  var _4e1b6_KEY_GNOME_COMPOSE = { __constructor: "KEY_GNOME_COMPOSE", __args: [] };
  var _4e1b6_KEY_C_CEDILLA = { __constructor: "KEY_C_CEDILLA", __args: [] };
  var _4e1b6_KEY_XF86_FORWARD = { __constructor: "KEY_XF86_FORWARD", __args: [] };
  var _4e1b6_KEY_XF86_BACKWARD = { __constructor: "KEY_XF86_BACKWARD", __args: [] };
  var _4e1b6_KEY_ALPHA_NUMERIC = { __constructor: "KEY_ALPHA_NUMERIC", __args: [] };
  var _4e1b6_KEY_HIRAGANA_KATAKANA = { __constructor: "KEY_HIRAGANA_KATAKANA", __args: [] };
  var _4e1b6_KEY_HALF_WIDTH_FULL_WIDTH = { __constructor: "KEY_HALF_WIDTH_FULL_WIDTH", __args: [] };
  var _4e1b6_KEY_KANJI = { __constructor: "KEY_KANJI", __args: [] };
  var _4e1b6_KEY_UNLOCK_TRACK_PAD = { __constructor: "KEY_UNLOCK_TRACK_PAD", __args: [] };
  var _4e1b6_KEY_TOGGLE_TOUCH_PAD = { __constructor: "KEY_TOGGLE_TOUCH_PAD", __args: [] };
  var _4495c_AbstractEvent = (a) => ({ __constructor: "AbstractEvent", __args: [a] });
  var _4495c_MouseEvent = (a) => ({ __constructor: "MouseEvent", __args: [a] });
  var _4495c_InputEvent = (a) => ({ __constructor: "InputEvent", __args: [a] });
  var _4495c_KeyboardEvent = (a) => ({ __constructor: "KeyboardEvent", __args: [a] });
  var _4495c_PopStateEvent = (a) => ({ __constructor: "PopStateEvent", __args: [a] });
  var _7e49a_GlobalAction = (a) => (b) => ({ __constructor: "GlobalAction", __args: [a, b] });
  var _2da14_Header = (a) => (b) => ({ __constructor: "Header", __args: [a, b] });
  var _2da14_CONNECT = { __constructor: "CONNECT", __args: [] };
  var _2da14_DELETE = { __constructor: "DELETE", __args: [] };
  var _2da14_GET = { __constructor: "GET", __args: [] };
  var _2da14_HEAD = { __constructor: "HEAD", __args: [] };
  var _2da14_OPTIONS = { __constructor: "OPTIONS", __args: [] };
  var _2da14_PATCH = { __constructor: "PATCH", __args: [] };
  var _2da14_POST = { __constructor: "POST", __args: [] };
  var _2da14_PUT = { __constructor: "PUT", __args: [] };
  var _2da14_TRACE = { __constructor: "TRACE", __args: [] };
  var _2da14_AccessDenied = { __constructor: "AccessDenied", __args: [] };
  var _2da14_AddressNotFound = { __constructor: "AddressNotFound", __args: [] };
  var _2da14_BadTransferEncoding = { __constructor: "BadTransferEncoding", __args: [] };
  var _2da14_BadUrl = (a) => ({ __constructor: "BadUrl", __args: [a] });
  var _2da14_ConnectionFailed = { __constructor: "ConnectionFailed", __args: [] };
  var _2da14_Http2FramingError = { __constructor: "Http2FramingError", __args: [] };
  var _2da14_IncompleteResponse = { __constructor: "IncompleteResponse", __args: [] };
  var _2da14_InternalError = { __constructor: "InternalError", __args: [] };
  var _2da14_InvalidSSLCertificate = { __constructor: "InvalidSSLCertificate", __args: [] };
  var _2da14_MalformedResponse = { __constructor: "MalformedResponse", __args: [] };
  var _2da14_NotSupported = { __constructor: "NotSupported", __args: [] };
  var _2da14_SSLConnectionFailed = { __constructor: "SSLConnectionFailed", __args: [] };
  var _2da14_SSLEngineNotFound = { __constructor: "SSLEngineNotFound", __args: [] };
  var _2da14_SSLInitializationFailed = { __constructor: "SSLInitializationFailed", __args: [] };
  var _2da14_Timeout = { __constructor: "Timeout", __args: [] };
  var _2da14_TooManyRedirects = { __constructor: "TooManyRedirects", __args: [] };
  var _2da14_UnresolvedProxy = { __constructor: "UnresolvedProxy", __args: [] };
  var _2da14_UnsupportedProtocol = { __constructor: "UnsupportedProtocol", __args: [] };
  var _2da14_BadResponse = (a) => ({ __constructor: "BadResponse", __args: [a] });
  var _2da14_ClientError = (a) => ({ __constructor: "ClientError", __args: [a] });
  var _0fac7_StringAttribute = (a) => ({ __constructor: "StringAttribute", __args: [a] });
  var _0fac7_AttributeAccept = (a) => ({ __constructor: "AttributeAccept", __args: [a] });
  var _0fac7_AttributeAcceptCharset = (a) => ({ __constructor: "AttributeAcceptCharset", __args: [a] });
  var _0fac7_AttributeAccessKey = (a) => ({ __constructor: "AttributeAccessKey", __args: [a] });
  var _0fac7_AttributeAction = (a) => ({ __constructor: "AttributeAction", __args: [a] });
  var _0fac7_AttributeAlt = (a) => ({ __constructor: "AttributeAlt", __args: [a] });
  var _0fac7_AttributeAsync = (a) => ({ __constructor: "AttributeAsync", __args: [a] });
  var _0fac7_AttributeAutoComplete = (a) => ({ __constructor: "AttributeAutoComplete", __args: [a] });
  var _0fac7_AttributeAutoFocus = (a) => ({ __constructor: "AttributeAutoFocus", __args: [a] });
  var _0fac7_AttributeAutoPlay = (a) => ({ __constructor: "AttributeAutoPlay", __args: [a] });
  var _0fac7_AttributeChecked = (a) => ({ __constructor: "AttributeChecked", __args: [a] });
  var _0fac7_AttributeCite = (a) => ({ __constructor: "AttributeCite", __args: [a] });
  var _0fac7_AttributeClass = (a) => ({ __constructor: "AttributeClass", __args: [a] });
  var _0fac7_AttributeCols = (a) => ({ __constructor: "AttributeCols", __args: [a] });
  var _0fac7_AttributeColSpan = (a) => ({ __constructor: "AttributeColSpan", __args: [a] });
  var _0fac7_AttributeContentEditable = (a) => ({ __constructor: "AttributeContentEditable", __args: [a] });
  var _0fac7_AttributeControls = (a) => ({ __constructor: "AttributeControls", __args: [a] });
  var _0fac7_AttributeCoords = (a) => ({ __constructor: "AttributeCoords", __args: [a] });
  var _0fac7_AttributeData = (a) => ({ __constructor: "AttributeData", __args: [a] });
  var _0fac7_AttributeDateTime = (a) => ({ __constructor: "AttributeDateTime", __args: [a] });
  var _0fac7_AttributeDefault = (a) => ({ __constructor: "AttributeDefault", __args: [a] });
  var _0fac7_AttributeDefer = (a) => ({ __constructor: "AttributeDefer", __args: [a] });
  var _0fac7_AttributeDir = (a) => ({ __constructor: "AttributeDir", __args: [a] });
  var _0fac7_AttributeDirName = (a) => ({ __constructor: "AttributeDirName", __args: [a] });
  var _0fac7_AttributeDisabled = (a) => ({ __constructor: "AttributeDisabled", __args: [a] });
  var _0fac7_AttributeDownload = (a) => ({ __constructor: "AttributeDownload", __args: [a] });
  var _0fac7_AttributeDraggable = (a) => ({ __constructor: "AttributeDraggable", __args: [a] });
  var _0fac7_AttributeEncType = (a) => ({ __constructor: "AttributeEncType", __args: [a] });
  var _0fac7_AttributeFor = (a) => ({ __constructor: "AttributeFor", __args: [a] });
  var _0fac7_AttributeForm = (a) => ({ __constructor: "AttributeForm", __args: [a] });
  var _0fac7_AttributeFormAction = (a) => ({ __constructor: "AttributeFormAction", __args: [a] });
  var _0fac7_AttributeHeaders = (a) => ({ __constructor: "AttributeHeaders", __args: [a] });
  var _0fac7_AttributeHeight = (a) => ({ __constructor: "AttributeHeight", __args: [a] });
  var _0fac7_AttributeHidden = (a) => ({ __constructor: "AttributeHidden", __args: [a] });
  var _0fac7_AttributeHigh = (a) => ({ __constructor: "AttributeHigh", __args: [a] });
  var _0fac7_AttributeHref = (a) => ({ __constructor: "AttributeHref", __args: [a] });
  var _0fac7_AttributeHrefLang = (a) => ({ __constructor: "AttributeHrefLang", __args: [a] });
  var _0fac7_AttributeId = (a) => ({ __constructor: "AttributeId", __args: [a] });
  var _0fac7_AttributeInnerHTML = (a) => ({ __constructor: "AttributeInnerHTML", __args: [a] });
  var _0fac7_AttributeInnerText = (a) => ({ __constructor: "AttributeInnerText", __args: [a] });
  var _0fac7_AttributeIsMap = (a) => ({ __constructor: "AttributeIsMap", __args: [a] });
  var _0fac7_AttributeKey = (a) => ({ __constructor: "AttributeKey", __args: [a] });
  var _0fac7_AttributeKind = (a) => ({ __constructor: "AttributeKind", __args: [a] });
  var _0fac7_AttributeLang = (a) => ({ __constructor: "AttributeLang", __args: [a] });
  var _0fac7_AttributeLabel = (a) => ({ __constructor: "AttributeLabel", __args: [a] });
  var _0fac7_AttributeList = (a) => ({ __constructor: "AttributeList", __args: [a] });
  var _0fac7_AttributeLoop = (a) => ({ __constructor: "AttributeLoop", __args: [a] });
  var _0fac7_AttributeLow = (a) => ({ __constructor: "AttributeLow", __args: [a] });
  var _0fac7_AttributeMax = (a) => ({ __constructor: "AttributeMax", __args: [a] });
  var _0fac7_AttributeMaxLength = (a) => ({ __constructor: "AttributeMaxLength", __args: [a] });
  var _0fac7_AttributeMedia = (a) => ({ __constructor: "AttributeMedia", __args: [a] });
  var _0fac7_AttributeMethod = (a) => ({ __constructor: "AttributeMethod", __args: [a] });
  var _0fac7_AttributeMin = (a) => ({ __constructor: "AttributeMin", __args: [a] });
  var _0fac7_AttributeMultiple = (a) => ({ __constructor: "AttributeMultiple", __args: [a] });
  var _0fac7_AttributeMuted = (a) => ({ __constructor: "AttributeMuted", __args: [a] });
  var _0fac7_AttributeName = (a) => ({ __constructor: "AttributeName", __args: [a] });
  var _0fac7_AttributeNoValidate = (a) => ({ __constructor: "AttributeNoValidate", __args: [a] });
  var _0fac7_AttributeOnAbort = (a) => ({ __constructor: "AttributeOnAbort", __args: [a] });
  var _0fac7_AttributeOnBlur = (a) => ({ __constructor: "AttributeOnBlur", __args: [a] });
  var _0fac7_AttributeOnCanPlay = (a) => ({ __constructor: "AttributeOnCanPlay", __args: [a] });
  var _0fac7_AttributeOnCanPlayThrough = (a) => ({ __constructor: "AttributeOnCanPlayThrough", __args: [a] });
  var _0fac7_AttributeOnChange = (a) => ({ __constructor: "AttributeOnChange", __args: [a] });
  var _0fac7_AttributeOnClick = (a) => ({ __constructor: "AttributeOnClick", __args: [a] });
  var _0fac7_AttributeOnContextMenu = (a) => ({ __constructor: "AttributeOnContextMenu", __args: [a] });
  var _0fac7_AttributeOnCopy = (a) => ({ __constructor: "AttributeOnCopy", __args: [a] });
  var _0fac7_AttributeOnCueChange = (a) => ({ __constructor: "AttributeOnCueChange", __args: [a] });
  var _0fac7_AttributeOnCut = (a) => ({ __constructor: "AttributeOnCut", __args: [a] });
  var _0fac7_AttributeOnDblClick = (a) => ({ __constructor: "AttributeOnDblClick", __args: [a] });
  var _0fac7_AttributeOnDrag = (a) => ({ __constructor: "AttributeOnDrag", __args: [a] });
  var _0fac7_AttributeOnDragEnd = (a) => ({ __constructor: "AttributeOnDragEnd", __args: [a] });
  var _0fac7_AttributeOnDragEnter = (a) => ({ __constructor: "AttributeOnDragEnter", __args: [a] });
  var _0fac7_AttributeOnDragLeave = (a) => ({ __constructor: "AttributeOnDragLeave", __args: [a] });
  var _0fac7_AttributeOnDragOver = (a) => ({ __constructor: "AttributeOnDragOver", __args: [a] });
  var _0fac7_AttributeOnDragStart = (a) => ({ __constructor: "AttributeOnDragStart", __args: [a] });
  var _0fac7_AttributeOnDrop = (a) => ({ __constructor: "AttributeOnDrop", __args: [a] });
  var _0fac7_AttributeOnDurationChange = (a) => ({ __constructor: "AttributeOnDurationChange", __args: [a] });
  var _0fac7_AttributeOnEmptied = (a) => ({ __constructor: "AttributeOnEmptied", __args: [a] });
  var _0fac7_AttributeOnEnded = (a) => ({ __constructor: "AttributeOnEnded", __args: [a] });
  var _0fac7_AttributeOnError = (a) => ({ __constructor: "AttributeOnError", __args: [a] });
  var _0fac7_AttributeOnFocus = (a) => ({ __constructor: "AttributeOnFocus", __args: [a] });
  var _0fac7_AttributeOnInput = (a) => ({ __constructor: "AttributeOnInput", __args: [a] });
  var _0fac7_AttributeOnInvalid = (a) => ({ __constructor: "AttributeOnInvalid", __args: [a] });
  var _0fac7_AttributeOnKeyPress = (a) => ({ __constructor: "AttributeOnKeyPress", __args: [a] });
  var _0fac7_AttributeOnKeyDown = (a) => ({ __constructor: "AttributeOnKeyDown", __args: [a] });
  var _0fac7_AttributeOnKeyUp = (a) => ({ __constructor: "AttributeOnKeyUp", __args: [a] });
  var _0fac7_AttributeOnLoad = (a) => ({ __constructor: "AttributeOnLoad", __args: [a] });
  var _0fac7_AttributeOnLoadedData = (a) => ({ __constructor: "AttributeOnLoadedData", __args: [a] });
  var _0fac7_AttributeOnLoadedMetaData = (a) => ({ __constructor: "AttributeOnLoadedMetaData", __args: [a] });
  var _0fac7_AttributeOnLoadStart = (a) => ({ __constructor: "AttributeOnLoadStart", __args: [a] });
  var _0fac7_AttributeOnMouseDown = (a) => ({ __constructor: "AttributeOnMouseDown", __args: [a] });
  var _0fac7_AttributeOnMouseEnter = (a) => ({ __constructor: "AttributeOnMouseEnter", __args: [a] });
  var _0fac7_AttributeOnMouseLeave = (a) => ({ __constructor: "AttributeOnMouseLeave", __args: [a] });
  var _0fac7_AttributeOnMouseMove = (a) => ({ __constructor: "AttributeOnMouseMove", __args: [a] });
  var _0fac7_AttributeOnMouseUp = (a) => ({ __constructor: "AttributeOnMouseUp", __args: [a] });
  var _0fac7_AttributeOnMouseWheel = (a) => ({ __constructor: "AttributeOnMouseWheel", __args: [a] });
  var _0fac7_AttributeOnMouseOver = (a) => ({ __constructor: "AttributeOnMouseOver", __args: [a] });
  var _0fac7_AttributeOnMouseOut = (a) => ({ __constructor: "AttributeOnMouseOut", __args: [a] });
  var _0fac7_AttributeOnPaste = (a) => ({ __constructor: "AttributeOnPaste", __args: [a] });
  var _0fac7_AttributeOnPause = (a) => ({ __constructor: "AttributeOnPause", __args: [a] });
  var _0fac7_AttributeOnPlay = (a) => ({ __constructor: "AttributeOnPlay", __args: [a] });
  var _0fac7_AttributeOnPlaying = (a) => ({ __constructor: "AttributeOnPlaying", __args: [a] });
  var _0fac7_AttributeOnProgress = (a) => ({ __constructor: "AttributeOnProgress", __args: [a] });
  var _0fac7_AttributeOnRateChange = (a) => ({ __constructor: "AttributeOnRateChange", __args: [a] });
  var _0fac7_AttributeOnReset = (a) => ({ __constructor: "AttributeOnReset", __args: [a] });
  var _0fac7_AttributeOnScroll = (a) => ({ __constructor: "AttributeOnScroll", __args: [a] });
  var _0fac7_AttributeOnSearch = (a) => ({ __constructor: "AttributeOnSearch", __args: [a] });
  var _0fac7_AttributeOnSeeked = (a) => ({ __constructor: "AttributeOnSeeked", __args: [a] });
  var _0fac7_AttributeOnSeeking = (a) => ({ __constructor: "AttributeOnSeeking", __args: [a] });
  var _0fac7_AttributeOnSelect = (a) => ({ __constructor: "AttributeOnSelect", __args: [a] });
  var _0fac7_AttributeOnStalled = (a) => ({ __constructor: "AttributeOnStalled", __args: [a] });
  var _0fac7_AttributeOnSubmit = (a) => ({ __constructor: "AttributeOnSubmit", __args: [a] });
  var _0fac7_AttributeOnSuspend = (a) => ({ __constructor: "AttributeOnSuspend", __args: [a] });
  var _0fac7_AttributeOnTimeUpdate = (a) => ({ __constructor: "AttributeOnTimeUpdate", __args: [a] });
  var _0fac7_AttributeOnToggle = (a) => ({ __constructor: "AttributeOnToggle", __args: [a] });
  var _0fac7_AttributeOnTransitionCancel = (a) => ({ __constructor: "AttributeOnTransitionCancel", __args: [a] });
  var _0fac7_AttributeOnTransitionEnd = (a) => ({ __constructor: "AttributeOnTransitionEnd", __args: [a] });
  var _0fac7_AttributeOnTransitionRun = (a) => ({ __constructor: "AttributeOnTransitionRun", __args: [a] });
  var _0fac7_AttributeOnTransitionStart = (a) => ({ __constructor: "AttributeOnTransitionStart", __args: [a] });
  var _0fac7_AttributeOnVolumeChange = (a) => ({ __constructor: "AttributeOnVolumeChange", __args: [a] });
  var _0fac7_AttributeOnWaiting = (a) => ({ __constructor: "AttributeOnWaiting", __args: [a] });
  var _0fac7_AttributeOnWheel = (a) => ({ __constructor: "AttributeOnWheel", __args: [a] });
  var _0fac7_AttributeOpen = (a) => ({ __constructor: "AttributeOpen", __args: [a] });
  var _0fac7_AttributeOptimum = (a) => ({ __constructor: "AttributeOptimum", __args: [a] });
  var _0fac7_AttributePattern = (a) => ({ __constructor: "AttributePattern", __args: [a] });
  var _0fac7_AttributePlaceholder = (a) => ({ __constructor: "AttributePlaceholder", __args: [a] });
  var _0fac7_AttributePoster = (a) => ({ __constructor: "AttributePoster", __args: [a] });
  var _0fac7_AttributePreload = (a) => ({ __constructor: "AttributePreload", __args: [a] });
  var _0fac7_AttributeReadOnly = (a) => ({ __constructor: "AttributeReadOnly", __args: [a] });
  var _0fac7_AttributeRel = (a) => ({ __constructor: "AttributeRel", __args: [a] });
  var _0fac7_AttributeRequired = (a) => ({ __constructor: "AttributeRequired", __args: [a] });
  var _0fac7_AttributeReversed = (a) => ({ __constructor: "AttributeReversed", __args: [a] });
  var _0fac7_AttributeRows = (a) => ({ __constructor: "AttributeRows", __args: [a] });
  var _0fac7_AttributeRowSpan = (a) => ({ __constructor: "AttributeRowSpan", __args: [a] });
  var _0fac7_AttributeSandBox = (a) => ({ __constructor: "AttributeSandBox", __args: [a] });
  var _0fac7_AttributeScope = (a) => ({ __constructor: "AttributeScope", __args: [a] });
  var _0fac7_AttributeSelected = (a) => ({ __constructor: "AttributeSelected", __args: [a] });
  var _0fac7_AttributeShape = (a) => ({ __constructor: "AttributeShape", __args: [a] });
  var _0fac7_AttributeSize = (a) => ({ __constructor: "AttributeSize", __args: [a] });
  var _0fac7_AttributeSizes = (a) => ({ __constructor: "AttributeSizes", __args: [a] });
  var _0fac7_AttributeSpan = (a) => ({ __constructor: "AttributeSpan", __args: [a] });
  var _0fac7_AttributeSpellCheck = (a) => ({ __constructor: "AttributeSpellCheck", __args: [a] });
  var _0fac7_AttributeSrc = (a) => ({ __constructor: "AttributeSrc", __args: [a] });
  var _0fac7_AttributeSrcDoc = (a) => ({ __constructor: "AttributeSrcDoc", __args: [a] });
  var _0fac7_AttributeSrcLang = (a) => ({ __constructor: "AttributeSrcLang", __args: [a] });
  var _0fac7_AttributeSrcSet = (a) => ({ __constructor: "AttributeSrcSet", __args: [a] });
  var _0fac7_AttributeStart = (a) => ({ __constructor: "AttributeStart", __args: [a] });
  var _0fac7_AttributeStep = (a) => ({ __constructor: "AttributeStep", __args: [a] });
  var _0fac7_AttributeStyle = (a) => ({ __constructor: "AttributeStyle", __args: [a] });
  var _0fac7_AttributeTabIndex = (a) => ({ __constructor: "AttributeTabIndex", __args: [a] });
  var _0fac7_AttributeTarget = (a) => ({ __constructor: "AttributeTarget", __args: [a] });
  var _0fac7_AttributeTitle = (a) => ({ __constructor: "AttributeTitle", __args: [a] });
  var _0fac7_AttributeTo = (a) => ({ __constructor: "AttributeTo", __args: [a] });
  var _0fac7_AttributeTranslate = (a) => ({ __constructor: "AttributeTranslate", __args: [a] });
  var _0fac7_AttributeType = (a) => ({ __constructor: "AttributeType", __args: [a] });
  var _0fac7_AttributeUseMap = (a) => ({ __constructor: "AttributeUseMap", __args: [a] });
  var _0fac7_AttributeValue = (a) => ({ __constructor: "AttributeValue", __args: [a] });
  var _0fac7_AttributeWidth = (a) => ({ __constructor: "AttributeWidth", __args: [a] });
  var _0fac7_AttributeWrap = (a) => ({ __constructor: "AttributeWrap", __args: [a] });
  var _ebd38_HashRouting = { __constructor: "HashRouting", __args: [] };
  var _ebd38_BasicRouting = { __constructor: "BasicRouting", __args: [] };
  var _5906d_Element = { __constructor: "Element", __args: [] };
  var _42e19_Left = (a) => ({ __constructor: "Left", __args: [a] });
  var _42e19_Right = (a) => ({ __constructor: "Right", __args: [a] });
  var _b9d70_JsonString = (a) => ({ __constructor: "JsonString", __args: [a] });
  var _b9d70_JsonInteger = (a) => ({ __constructor: "JsonInteger", __args: [a] });
  var _b9d70_JsonFloat = (a) => ({ __constructor: "JsonFloat", __args: [a] });
  var _b9d70_JsonBoolean = (a) => ({ __constructor: "JsonBoolean", __args: [a] });
  var _b9d70_JsonNull = { __constructor: "JsonNull", __args: [] };
  var _b9d70_JsonObject = (a) => ({ __constructor: "JsonObject", __args: [a] });
  var _b9d70_JsonArray = (a) => ({ __constructor: "JsonArray", __args: [a] });
  var _a32d2_Loc = (a) => (b) => (c) => ({ __constructor: "Loc", __args: [a, b, c] });
  var _a32d2_Parser = (a) => ({ __constructor: "Parser", __args: [a] });
  var _a32d2_Error = (a) => ({ __constructor: "Error", __args: [a] });
  var _a32d2_Config = (a) => ({ __constructor: "Config", __args: [a] });
  var _29844_Parser = (a) => ({ __constructor: "Parser", __args: [a] });
  var _8c112_BothTargets = (a) => (b) => ({ __constructor: "BothTargets", __args: [a, b] });
  var _8c112_JSTarget = (a) => ({ __constructor: "JSTarget", __args: [a] });
  var _8c112_LLVMTarget = (a) => ({ __constructor: "LLVMTarget", __args: [a] });
  var _8c112_InvalidTarget = { __constructor: "InvalidTarget", __args: [] };
  var _77488_AddressAlreadyInUse = { __constructor: "AddressAlreadyInUse", __args: [] };
  var _77488_ArgumentListToLong = { __constructor: "ArgumentListToLong", __args: [] };
  var _77488_PermissionDenied = { __constructor: "PermissionDenied", __args: [] };
  var _77488_UnknownError = { __constructor: "UnknownError", __args: [] };
  var _1fda7_EmptyDoc = { __constructor: "EmptyDoc", __args: [] };
  var _1fda7_CharDoc = (a) => ({ __constructor: "CharDoc", __args: [a] });
  var _1fda7_TextDoc = (a) => (b) => ({ __constructor: "TextDoc", __args: [a, b] });
  var _1fda7_LineDoc = (a) => ({ __constructor: "LineDoc", __args: [a] });
  var _1fda7_CatDoc = (a) => (b) => ({ __constructor: "CatDoc", __args: [a, b] });
  var _1fda7_NestDoc = (a) => (b) => ({ __constructor: "NestDoc", __args: [a, b] });
  var _1fda7_UnionDoc = (a) => (b) => ({ __constructor: "UnionDoc", __args: [a, b] });
  var _1fda7_ColumnDoc = (a) => ({ __constructor: "ColumnDoc", __args: [a] });
  var _1fda7_NestingDoc = (a) => ({ __constructor: "NestingDoc", __args: [a] });
  var _1fda7_SEmpty = { __constructor: "SEmpty", __args: [] };
  var _1fda7_SChar = (a) => (b) => ({ __constructor: "SChar", __args: [a, b] });
  var _1fda7_SText = (a) => (b) => (c) => ({ __constructor: "SText", __args: [a, b, c] });
  var _1fda7_SLine = (a) => (b) => ({ __constructor: "SLine", __args: [a, b] });
  var _91e6c_Constructor = (a) => (b) => ({ __constructor: "Constructor", __args: [a, b] });
  var _91e6c_Unit = { __constructor: "Unit", __args: [] };
  var _91e6c_Record = (a) => ({ __constructor: "Record", __args: [a] });
  var _91e6c_Integer = (a) => ({ __constructor: "Integer", __args: [a] });
  var _91e6c_Float = (a) => ({ __constructor: "Float", __args: [a] });
  var _91e6c_Boolean = (a) => ({ __constructor: "Boolean", __args: [a] });
  var _91e6c_Char = (a) => ({ __constructor: "Char", __args: [a] });
  var _91e6c_Str = (a) => ({ __constructor: "Str", __args: [a] });
  var _91e6c_DictionaryConstructor = (a) => ({ __constructor: "DictionaryConstructor", __args: [a] });
  var _91e6c_ListConstructor = (a) => ({ __constructor: "ListConstructor", __args: [a] });
  var _91e6c_TupleConstructor = (a) => ({ __constructor: "TupleConstructor", __args: [a] });
  var _91e6c_Byte = (a) => ({ __constructor: "Byte", __args: [a] });
  var _91e6c_ByteArray = (a) => ({ __constructor: "ByteArray", __args: [a] });
  var _4595d_LLVM = { __constructor: "LLVM", __args: [] };
  var _4595d_JS = { __constructor: "JS", __args: [] };
  var _39ce8_ModuleResult = (a) => ({ __constructor: "ModuleResult", __args: [a] });
  var _39ce8_ExpressionResult = (a) => (b) => ({ __constructor: "ExpressionResult", __args: [a, b] });
  var _39ce8_TypeResult = (a) => (b) => ({ __constructor: "TypeResult", __args: [a, b] });
  var _39ce8_AliasResult = (a) => (b) => ({ __constructor: "AliasResult", __args: [a, b] });
  var _39ce8_InterfaceResult = (a) => (b) => ({ __constructor: "InterfaceResult", __args: [a, b] });
  var _39ce8_InstanceResult = (a) => (b) => ({ __constructor: "InstanceResult", __args: [a, b] });
  var _39ce8_NotFound = { __constructor: "NotFound", __args: [] };
  var _1c6a3_Text = (a) => ({ __constructor: "Text", __args: [a] });
  var _1c6a3_Bold = (a) => ({ __constructor: "Bold", __args: [a] });
  var _1c6a3_Italic = (a) => ({ __constructor: "Italic", __args: [a] });
  var _1c6a3_InlineCode = (a) => ({ __constructor: "InlineCode", __args: [a] });
  var _1c6a3_Link = (a) => (b) => ({ __constructor: "Link", __args: [a, b] });
  var _1c6a3_Image = (a) => (b) => ({ __constructor: "Image", __args: [a, b] });
  var _1c6a3_LineReturn = { __constructor: "LineReturn", __args: [] };
  var _1c6a3_H1 = (a) => ({ __constructor: "H1", __args: [a] });
  var _1c6a3_H2 = (a) => ({ __constructor: "H2", __args: [a] });
  var _1c6a3_H3 = (a) => ({ __constructor: "H3", __args: [a] });
  var _1c6a3_H4 = (a) => ({ __constructor: "H4", __args: [a] });
  var _1c6a3_H5 = (a) => ({ __constructor: "H5", __args: [a] });
  var _1c6a3_H6 = (a) => ({ __constructor: "H6", __args: [a] });
  var _1c6a3_Paragraph = (a) => ({ __constructor: "Paragraph", __args: [a] });
  var _1c6a3_Blockquote = (a) => ({ __constructor: "Blockquote", __args: [a] });
  var _1c6a3_Code = (a) => (b) => ({ __constructor: "Code", __args: [a, b] });
  var _1c6a3_UnorderedList = (a) => ({ __constructor: "UnorderedList", __args: [a] });
  var _8781f_Breadcrumb = (a) => (b) => ({ __constructor: "Breadcrumb", __args: [a, b] });
  var _ebd38_DEFAULT_CONFIG__898 = { subscriptions: null, globalEventHandlers: null, routingKind: _ebd38_BasicRouting };
  var _d4261_isDigit__154 = (s) => __eq__(s, String.fromCodePoint(48)) || __eq__(s, String.fromCodePoint(49)) || __eq__(s, String.fromCodePoint(50)) || __eq__(s, String.fromCodePoint(51)) || __eq__(s, String.fromCodePoint(52)) || __eq__(s, String.fromCodePoint(53)) || __eq__(s, String.fromCodePoint(54)) || __eq__(s, String.fromCodePoint(55)) || __eq__(s, String.fromCodePoint(56)) || __eq__(s, String.fromCodePoint(57));
  var _d0d4c__scanFloat__161 = (just) => (nothing) => (str) => {
    const n = parseFloat(str);
    return isNaN(n) ? nothing : just(n);
  };
  var _d0d4c_scanFloat__160 = _d0d4c__scanFloat__161(_2e42b_Just)(_2e42b_Nothing);
  var _d0d4c_scan__159 = (_) => _d0d4c_scanFloat__160;
  var _b8152_makeTagClassName__866 = (isWarning) => isWarning ? `definition__target-tag definition__target-tag--warning` : `definition__target-tag`;
  var _a32d2_pure__799 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__784 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__701 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__403 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__392 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__365 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__353 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__334 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__297 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__226 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__223 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__210 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__183 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__163 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__147 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__134 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_pure__119 = (a) => _a32d2_Parser((s) => (l) => [{ v: [a, s], n: null }, l]);
  var _a32d2_parse__840 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_runParser__839 = (m) => (s) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && __x__[0].v[1] === "" && __x__[0].n === null && true) {
      let [{ v: [res] }] = __x__;
      return _42e19_Right(res);
    } else if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [, rest] }, l] = __x__;
      return _42e19_Left(_a32d2_Error(l));
    } else if (__x__.length === 2 && true && true) {
      let [, l] = __x__;
      return _42e19_Left(_a32d2_Error(l));
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__840(m)(s)(_a32d2_Loc(0)(0)(0)));
  var _a32d2_parse__838 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__831 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__813 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__809 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__803 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__801 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__790 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__788 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__772 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__765 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__760 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__756 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__749 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__747 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__743 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__742 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__731 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__721 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__719 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__710 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__698 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__695 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__405 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__394 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__367 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__355 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__321 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__317 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__308 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__299 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_runParser__420 = (m) => (s) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && __x__[0].v[1] === "" && __x__[0].n === null && true) {
      let [{ v: [res] }] = __x__;
      return _42e19_Right(res);
    } else if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [, rest] }, l] = __x__;
      return _42e19_Left(_a32d2_Error(l));
    } else if (__x__.length === 2 && true && true) {
      let [, l] = __x__;
      return _42e19_Left(_a32d2_Error(l));
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__299(m)(s)(_a32d2_Loc(0)(0)(0)));
  var _a32d2_parse__239 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__228 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__217 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__188 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__182 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__181 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__167 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_runParser__253 = (m) => (s) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && __x__[0].v[1] === "" && __x__[0].n === null && true) {
      let [{ v: [res] }] = __x__;
      return _42e19_Right(res);
    } else if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [, rest] }, l] = __x__;
      return _42e19_Left(_a32d2_Error(l));
    } else if (__x__.length === 2 && true && true) {
      let [, l] = __x__;
      return _42e19_Left(_a32d2_Error(l));
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__167(m)(s)(_a32d2_Loc(0)(0)(0)));
  var _a32d2_parse__152 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__142 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_parse__137 = (parser) => (input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _a32d2_of__700 = (_) => _a32d2_pure__701;
  var _a32d2_of__402 = (_) => _a32d2_pure__403;
  var _a32d2_of__391 = (_) => _a32d2_pure__392;
  var _a32d2_of__364 = (_) => _a32d2_pure__365;
  var _a32d2_of__352 = (_) => _a32d2_pure__353;
  var _a32d2_of__333 = (_) => _a32d2_pure__334;
  var _a32d2_of__296 = (_) => _a32d2_pure__297;
  var _a32d2_of__293 = (_) => _a32d2_pure__183;
  var _a32d2_of__225 = (_) => _a32d2_pure__226;
  var _a32d2_of__222 = (_) => _a32d2_pure__223;
  var _a32d2_of__209 = (_) => _a32d2_pure__210;
  var _a32d2_of__162 = (_) => _a32d2_pure__163;
  var _a32d2_of__146 = (_) => _a32d2_pure__147;
  var _a32d2_of__133 = (_) => _a32d2_pure__134;
  var _a32d2_map__837 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__838(m)(s)(l)));
  var _a32d2_map__826 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__747(m)(s)(l)));
  var _a32d2_map__819 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_map__817 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__743(m)(s)(l)));
  var _a32d2_map__815 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_map__811 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__749(m)(s)(l)));
  var _a32d2_map__806 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_map__794 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__743(m)(s)(l)));
  var _a32d2_map__786 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_map__783 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__698(m)(s)(l)));
  var _a32d2_map__780 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_map__774 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__772(m)(s)(l)));
  var _a32d2_map__771 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__772(m)(s)(l)));
  var _a32d2_map__763 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__743(m)(s)(l)));
  var _a32d2_map__758 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__142(m)(s)(l)));
  var _a32d2_map__754 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_map__746 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__747(m)(s)(l)));
  var _a32d2_map__732 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__142(m)(s)(l)));
  var _a32d2_map__730 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__731(m)(s)(l)));
  var _a32d2_map__727 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__698(m)(s)(l)));
  var _a32d2_map__717 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_map__713 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_map__708 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__698(m)(s)(l)));
  var _a32d2_map__706 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_map__697 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__698(m)(s)(l)));
  var _a32d2_map__693 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__142(m)(s)(l)));
  var _a32d2_map__687 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_map__683 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_map__679 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__142(m)(s)(l)));
  var _a32d2_map__343 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_map__315 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__299(m)(s)(l)));
  var _a32d2_map__307 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__308(m)(s)(l)));
  var _a32d2_map__295 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_map__291 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_map__285 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_map__200 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_map__189 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_map__186 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_map__179 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_map__150 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_map__141 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, b] }, loc] = __x__;
      return [{ v: [f(a), b], n: null }, loc];
    } else if (__x__.length === 2 && true && true) {
      let [, loc] = __x__;
      return [null, loc];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__142(m)(s)(l)));
  var _a32d2_lookAhead__791 = (p) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a] }] = __x__;
      return [{ v: [a, s], n: null }, l];
    } else if (true) {
      return [null, l];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__788(p)(s)(l)));
  var _a32d2_lookAhead__688 = (p) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a] }] = __x__;
      return [{ v: [a, s], n: null }, l];
    } else if (true) {
      return [null, l];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(p)(s)(l)));
  var _a32d2_lazy__351 = (wrapped) => _a32d2_Parser((input) => (loc) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let parserFn = __x__.__args[0];
      return parserFn(input)(loc);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(wrapped()));
  var _a32d2_incLoc__129 = (c) => (__W__1) => ((__x__) => {
    if (__x__.__constructor === "Loc" && true && true && true) {
      let abs = __x__.__args[0];
      let line = __x__.__args[1];
      let col = __x__.__args[2];
      return __eq__(c, String.fromCodePoint(10)) ? _a32d2_Loc(abs + 1)(line + 1)(0) : _a32d2_Loc(abs + 1)(line)(col + 1);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__1);
  var _a32d2_chain__795 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__743(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__698(m)(s)(l)));
  var _a32d2_chain__792 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__698(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__788(m)(s)(l)));
  var _a32d2_chain__773 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__772(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__743(m)(s)(l)));
  var _a32d2_chain__767 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__743(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_chain__703 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__698(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__142(m)(s)(l)));
  var _a32d2_chain__702 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__698(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_chain__414 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__299(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__405(m)(s)(l)));
  var _a32d2_chain__406 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__405(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__394(m)(s)(l)));
  var _a32d2_chain__404 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__405(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__405(m)(s)(l)));
  var _a32d2_chain__395 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__394(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_chain__393 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__394(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__299(m)(s)(l)));
  var _a32d2_chain__388 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__299(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__367(m)(s)(l)));
  var _a32d2_chain__368 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__367(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__355(m)(s)(l)));
  var _a32d2_chain__366 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__367(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__367(m)(s)(l)));
  var _a32d2_chain__356 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__355(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_chain__354 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__355(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__299(m)(s)(l)));
  var _a32d2_chain__344 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__299(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__142(m)(s)(l)));
  var _a32d2_chain__336 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__321(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__299(m)(s)(l)));
  var _a32d2_chain__335 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__321(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__321(m)(s)(l)));
  var _a32d2_chain__327 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__182(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__142(m)(s)(l)));
  var _a32d2_chain__320 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__299(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__321(m)(s)(l)));
  var _a32d2_chain__300 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__299(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_chain__298 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__299(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_chain__294 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__182(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_chain__248 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__167(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__239(m)(s)(l)));
  var _a32d2_chain__240 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__239(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__228(m)(s)(l)));
  var _a32d2_chain__238 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__239(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__239(m)(s)(l)));
  var _a32d2_chain__231 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__228(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__142(m)(s)(l)));
  var _a32d2_chain__230 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__228(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_chain__229 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__228(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_chain__227 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__228(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__167(m)(s)(l)));
  var _a32d2_chain__220 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__167(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__217(m)(s)(l)));
  var _a32d2_chain__218 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__217(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__167(m)(s)(l)));
  var _a32d2_chain__216 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__217(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__217(m)(s)(l)));
  var _a32d2_chain__207 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__167(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(m)(s)(l)));
  var _a32d2_chain__169 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__167(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__152(m)(s)(l)));
  var _a32d2_chain__168 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__167(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_chain__166 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__167(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__142(m)(s)(l)));
  var _a32d2_chain__143 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__142(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_chain__136 = (f) => (m) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [a, s1] }, l1] = __x__;
      return _a32d2_parse__137(f(a))(s1)(l1);
    } else if (__x__.length === 2 && true && true) {
      let [, ll] = __x__;
      return [null, ll];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(m)(s)(l)));
  var _a32d2_ap__812 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__137(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__813(parserA)(s)(l)));
  var _adecf_apL__810 = (a) => (b) => _a32d2_ap__812(_a32d2_map__811((x) => (_) => x)(a))(b);
  var _a32d2_ap__808 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__182(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__809(parserA)(s)(l)));
  var _a32d2_ap__802 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__731(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__803(parserA)(s)(l)));
  var _adecf_apL__814 = (a) => (b) => _a32d2_ap__802(_a32d2_map__815((x) => (_) => x)(a))(b);
  var _a32d2_ap__800 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__137(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__801(parserA)(s)(l)));
  var _a32d2_ap__789 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__788(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__790(parserA)(s)(l)));
  var _a32d2_ap__764 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__182(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__765(parserA)(s)(l)));
  var _adecf_apL__762 = (a) => (b) => _a32d2_ap__764(_a32d2_map__763((x) => (_) => x)(a))(b);
  var _a32d2_ap__759 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__137(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__760(parserA)(s)(l)));
  var _adecf_apL__757 = (a) => (b) => _a32d2_ap__759(_a32d2_map__758((x) => (_) => x)(a))(b);
  var _a32d2_ap__755 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__142(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__756(parserA)(s)(l)));
  var _adecf_apL__753 = (a) => (b) => _a32d2_ap__755(_a32d2_map__754((x) => (_) => x)(a))(b);
  var _a32d2_ap__748 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__182(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__749(parserA)(s)(l)));
  var _adecf_apL__745 = (a) => (b) => _a32d2_ap__748(_a32d2_map__746((x) => (_) => x)(a))(b);
  var _a32d2_ap__741 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__743(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__742(parserA)(s)(l)));
  var _a32d2_ap__720 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__182(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__721(parserA)(s)(l)));
  var _a32d2_ap__718 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__137(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__719(parserA)(s)(l)));
  var _adecf_apL__716 = (a) => (b) => _a32d2_ap__718(_a32d2_map__717((x) => (_) => x)(a))(b);
  var _a32d2_ap__709 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__137(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__710(parserA)(s)(l)));
  var _adecf_apL__707 = (a) => (b) => _a32d2_ap__709(_a32d2_map__708((x) => (_) => x)(a))(b);
  var _a32d2_ap__694 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__182(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__695(parserA)(s)(l)));
  var _adecf_apL__696 = (a) => (b) => _a32d2_ap__694(_a32d2_map__697((x) => (_) => x)(a))(b);
  var _a32d2_ap__316 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__142(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__317(parserA)(s)(l)));
  var _adecf_apL__314 = (a) => (b) => _a32d2_ap__316(_a32d2_map__315((x) => (_) => x)(a))(b);
  var _a32d2_ap__187 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__142(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__188(parserA)(s)(l)));
  var _adecf_apL__185 = (a) => (b) => _a32d2_ap__187(_a32d2_map__186((x) => (_) => x)(a))(b);
  var _a32d2_ap__180 = (parserA) => (parserB) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
      let [{ v: [f, s1] }, l1] = __x__;
      return ((__x__2) => {
        if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
          let [{ v: [a, s2] }, l2] = __x__2;
          return [{ v: [f(a), s2], n: null }, l2];
        } else if (__x__2.length === 2 && true && true) {
          let [, l2] = __x__2;
          return [null, l2];
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_a32d2_parse__182(parserB)(s1)(l1));
    } else if (__x__.length === 2 && true && true) {
      let [, l1] = __x__;
      return [null, l1];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__181(parserA)(s)(l)));
  var _adecf_apL__818 = (a) => (b) => _a32d2_ap__180(_a32d2_map__819((x) => (_) => x)(a))(b);
  var _a32d2_alt__830 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__831(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__831(ma)(s)(l)));
  var _a32d2_alt__823 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__747(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__747(ma)(s)(l)));
  var _a32d2_alt__787 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__788(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__788(ma)(s)(l)));
  var _a32d2_alt__736 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__698(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__698(ma)(s)(l)));
  var _a32d2_alt__407 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__405(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__405(ma)(s)(l)));
  var _a32d2_alt__369 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__367(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__367(ma)(s)(l)));
  var _a32d2_alt__338 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__299(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__299(ma)(s)(l)));
  var _a32d2_alt__337 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__321(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__321(ma)(s)(l)));
  var _a32d2_alt__250 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__167(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__167(ma)(s)(l)));
  var _a32d2_alt__241 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__239(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__239(ma)(s)(l)));
  var _a32d2_alt__219 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__217(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__217(ma)(s)(l)));
  var _a32d2_alt__204 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__137(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(ma)(s)(l)));
  var _a32d2_alt__194 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__182(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__182(ma)(s)(l)));
  var _a32d2_alt__151 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__152(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__152(ma)(s)(l)));
  var _a32d2_alt__144 = (ma) => (mb) => _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return _a32d2_parse__142(mb)(s)(l);
    } else if (true) {
      let res = __x__;
      return res;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__142(ma)(s)(l)));
  var _a32d2_aempty__829 = (_) => _a32d2_Parser((_2) => (l) => [null, l]);
  var _a32d2_fail__828 = _a32d2_aempty__829();
  var _a32d2_aempty__822 = (_) => _a32d2_Parser((_2) => (l) => [null, l]);
  var _a32d2_fail__821 = _a32d2_aempty__822();
  var _a32d2_aempty__735 = (_) => _a32d2_Parser((_2) => (l) => [null, l]);
  var _a32d2_fail__734 = _a32d2_aempty__735();
  var _a32d2_aempty__417 = (_) => _a32d2_Parser((_2) => (l) => [null, l]);
  var _a32d2_fail__416 = _a32d2_aempty__417();
  var _a32d2_aempty__398 = (_) => _a32d2_Parser((_2) => (l) => [null, l]);
  var _a32d2_fail__397 = _a32d2_aempty__398();
  var _a32d2_aempty__360 = (_) => _a32d2_Parser((_2) => (l) => [null, l]);
  var _a32d2_fail__359 = _a32d2_aempty__360();
  var _a32d2_aempty__331 = (_) => _a32d2_Parser((_2) => (l) => [null, l]);
  var _a32d2_fail__330 = _a32d2_aempty__331();
  var _a32d2_aempty__234 = (_) => _a32d2_Parser((_2) => (l) => [null, l]);
  var _a32d2_fail__233 = _a32d2_aempty__234();
  var _a32d2_aempty__213 = (_) => _a32d2_Parser((_2) => (l) => [null, l]);
  var _a32d2_fail__212 = _a32d2_aempty__213();
  var _a32d2_aempty__193 = (_) => _a32d2_Parser((_2) => (l) => [null, l]);
  var _a32d2_fail__192 = _a32d2_aempty__193();
  var _a32d2_aempty__165 = (_) => _a32d2_Parser((_2) => (l) => [null, l]);
  var _a32d2_fail__164 = _a32d2_aempty__165();
  var _a32d2_aempty__131 = (_) => _a32d2_Parser((_2) => (l) => [null, l]);
  var _a32d2_fail__130 = _a32d2_aempty__131();
  var _9bab1_putLine__477 = (a) => {
    console.log(a);
  };
  var _936d2_ansi__425 = { FGBlack: `30`, FGRed: `31`, FGGreen: `32`, FGYellow: `33`, FGBlue: `34`, FGMagenta: `35`, FGCyan: `36`, FGWhite: `37`, FGBrightBlack: `90`, FGBrightRed: `91`, FGBrightGreen: `92`, FGBrightYellow: `93`, FGBrightBlue: `94`, FGBrightMagenta: `95`, FGBrightCyan: `96`, FGBrightWhite: `97`, BGBlack: `40`, BGRed: `41`, BGGreen: `42`, BGYellow: `43`, BGBlue: `44`, BGMagenta: `45`, BGCyan: `46`, BGWhite: `47`, BGBrightBlack: `100`, BGBrightRed: `101`, BGBrightGreen: `102`, BGBrightYellow: `103`, BGBrightBlue: `104`, BGBrightMagenta: `105`, BGBrightCyan: `106`, BGBrightWhite: `107`, FormatUnderline: `4`, FormatNoUnderline: `24`, FormatBold: `1`, FormatNoBold: `21`, FormatInvert: `7` };
  var _936d2_END_COLOR__430 = `\x1B[0m`;
  var _91e6c_BYTE_CHARS__312 = { v: String.fromCodePoint(48), n: { v: String.fromCodePoint(49), n: { v: String.fromCodePoint(50), n: { v: String.fromCodePoint(51), n: { v: String.fromCodePoint(52), n: { v: String.fromCodePoint(53), n: { v: String.fromCodePoint(54), n: { v: String.fromCodePoint(55), n: { v: String.fromCodePoint(56), n: { v: String.fromCodePoint(57), n: { v: String.fromCodePoint(65), n: { v: String.fromCodePoint(66), n: { v: String.fromCodePoint(67), n: { v: String.fromCodePoint(68), n: { v: String.fromCodePoint(69), n: { v: String.fromCodePoint(70), n: null } } } } } } } } } } } } } } } };
  var _8c112_makeType__73 = (name) => (params) => (constructors) => (description) => (since) => (example) => ({ name, params, constructors, description, since, example });
  var _8c112_makeTargeted__92 = (maybeJS) => (maybeLLVM) => ((__x__) => {
    if (__x__.length === 2 && __x__[0].__constructor === "Just" && true && __x__[1].__constructor === "Just" && true) {
      let [{ __args: [js] }, { __args: [llvm] }] = __x__;
      return _8c112_BothTargets(js)(llvm);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Just" && true && __x__[1].__constructor === "Nothing") {
      let [{ __args: [js] }, { __args: [] }] = __x__;
      return _8c112_JSTarget(js);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Nothing" && __x__[1].__constructor === "Just" && true) {
      let [{ __args: [] }, { __args: [llvm] }] = __x__;
      return _8c112_LLVMTarget(llvm);
    } else if (true) {
      return _8c112_InvalidTarget;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })([maybeJS, maybeLLVM]);
  var _8c112_makeModule__105 = (path) => (name) => (description) => (expressions) => (typeDeclarations) => (aliases) => (interfaces) => (instances) => ({ path, name, description, expressions, typeDeclarations, aliases, interfaces, instances });
  var _8c112_makeInterface__49 = (name) => (vars) => (constraints) => (methods) => (description) => (since) => (example) => ({ name, vars, constraints, methods, description, since, example });
  var _8c112_makeInstance__25 = (declaration) => (constraints) => (description) => (since) => (example) => ({ declaration, constraints, description, since, example });
  var _8c112_makeExpression__87 = (name) => (description) => (typing) => (since) => (example) => ({ name, description, typing, since, example });
  var _8c112_makeAlias__61 = (name) => (params) => (aliasedType) => (description) => (since) => (example) => ({ name, params, aliasedType, description, since, example });
  var _8c112_getName__483 = (__W__1) => ((__x__) => {
    if (__x__.__constructor === "BothTargets" && true && true) {
      let a = __x__.__args[0];
      return a.name;
    } else if (__x__.__constructor === "JSTarget" && true) {
      let a = __x__.__args[0];
      return a.name;
    } else if (__x__.__constructor === "LLVMTarget" && true) {
      let a = __x__.__args[0];
      return a.name;
    } else if (__x__.__constructor === "InvalidTarget") {
      return `Invalid Target`;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__1);
  var _8781f_getName__659 = (__W__2) => ((__x__) => {
    if (__x__.__constructor === "Breadcrumb" && true && true) {
      let l = __x__.__args[0];
      return l;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__2);
  var _8781f_getLink__660 = (__W__1) => ((__x__) => {
    if (__x__.__constructor === "Breadcrumb" && true && true) {
      let l = __x__.__args[1];
      return l;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__1);
  var _801bd_min__471 = (a) => (b) => a > b ? b : a;
  var _7f28c_getUrl__258 = (_) => document.location.href || "";
  var startGlobalEventHandlers = (env, globalActions) => {
    const keysForWindowEvents = [];
    while (globalActions !== null) {
      keysForWindowEvents.push({
        eventName: globalActions.v.__args[0],
        eventHandler: globalActions.v.__args[1]
      });
      globalActions = globalActions.n;
    }
    keysForWindowEvents.forEach((ga) => {
      const handler = wrapEventHandler(env, EventConstructors[ga.eventName], ga.eventHandler);
      window.addEventListener(ga.eventName, handler);
      if (ga.eventName === "popstate") {
        handler({});
      }
    });
  };
  var hashFixModule = () => {
    let triggered = false;
    history.scrollRestoration = "manual";
    return {
      post: () => {
        if (!triggered) {
          const element = document.getElementById(window.location.hash.substr(1));
          if (element) {
            const top = element.offsetTop;
            window.scrollTo(0, top);
          }
        }
        triggered = true;
      }
    };
  };
  var _7f28c__renderWithConfig__904 = (_runAction) => (config) => (view) => (initialState) => (containerId) => {
    window.env = {
      routingKind: config.routingKind.__constructor,
      patch: null,
      currentElement: null,
      currentState: null,
      rootView: null
    };
    let initialElement;
    initialElement = view(initialState);
    const patch = init([attributesModule, propsModule, eventListenersModule, styleModule, hashFixModule()]);
    patch(document.getElementById(containerId), initialElement);
    window.env.patch = patch;
    window.env.currentElement = initialElement;
    window.env.rootView = view;
    window.env.currentState = initialState;
    startGlobalEventHandlers(window.env, config.globalEventHandlers);
    window.addEventListener("popstate", () => {
      _runAction(window.env)((x) => x);
    });
    let subs = config.subscriptions;
    while (subs !== null) {
      subs.v(_runAction(window.env));
      subs = subs.n;
    }
    ;
    return { __constructor: "Unit", __args: [] };
  };
  var _7e49a_onUrlChanged__900 = _7e49a_GlobalAction(`popstate`);
  var _76f3d_maybeLoop__691 = (start) => (evaluate) => {
    let $_result_;
    let $_continue_ = true;
    let $$start = start;
    let $$evaluate = evaluate;
    while ($_continue_) {
      let $start = $$start;
      let $evaluate = $$evaluate;
      $_continue_ = false;
      ((__x__) => {
        if (__x__.__constructor === "Just" && true) {
          let x = __x__.__args[0];
          $$start = x, $$evaluate = $evaluate, $_continue_ = true;
        } else if (__x__.__constructor === "Nothing") {
          $_result_ = $start;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($evaluate($start));
    }
    return $_result_;
  };
  var _6b70e_snd__657 = (tuple) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [, b] = __x__;
      return b;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(tuple);
  var _6b70e_snd__467 = (tuple) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [, b] = __x__;
      return b;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(tuple);
  var _6b70e_snd__462 = (tuple) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [, b] = __x__;
      return b;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(tuple);
  var _6b70e_fst__625 = (tuple) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [a] = __x__;
      return a;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(tuple);
  var _6b70e_fst__466 = (tuple) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [a] = __x__;
      return a;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(tuple);
  var _6b70e_fst__459 = (tuple) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [a] = __x__;
      return a;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(tuple);
  var _5b0b9_mapL__805 = (__P__1) => _a32d2_map__806(/* @__PURE__ */ ((a) => (_) => a)(__P__1));
  var _5b0b9_mapL__782 = (__P__1) => _a32d2_map__783(/* @__PURE__ */ ((a) => (_) => a)(__P__1));
  var _5b0b9_mapL__715 = (__P__1) => _a32d2_map__179(/* @__PURE__ */ ((a) => (_) => a)(__P__1));
  var _5b0b9_mapL__712 = (__P__1) => _a32d2_map__713(/* @__PURE__ */ ((a) => (_) => a)(__P__1));
  var _5b0b9_mapL__705 = (__P__1) => _a32d2_map__706(/* @__PURE__ */ ((a) => (_) => a)(__P__1));
  var _5b0b9_mapL__686 = (__P__1) => _a32d2_map__687(/* @__PURE__ */ ((a) => (_) => a)(__P__1));
  var _5b0b9_mapL__682 = (__P__1) => _a32d2_map__683(/* @__PURE__ */ ((a) => (_) => a)(__P__1));
  var _5906d_show__11 = (__$a__) => ((__x__) => {
    if (__x__.__constructor === "Element") {
      return `Element`;
    } else if (true) {
      return `Unknown`;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__$a__);
  var _5906d_empty__667 = (attrs) => (children) => null;
  var _5906d__tag__589 = (objectifyAttrs) => (tagName2) => (attrs) => (children) => {
    return h(tagName2, objectifyAttrs(window.env, attrs), __listToJSArray__(children));
  };
  var __getAttributeTuple = (attr) => [attr.__constructor.substr(9).toLowerCase(), attr.__args[0]];
  var PROP_NAMES = [
    "value",
    "innerhtml",
    "innertext"
  ];
  var _5906d__objectifyAttrs__588 = (_reduce) => (_wrapEventHandler) => (_EventConstructors) => {
    return (env, attrs) => _reduce((obj) => (attr) => {
      const [attrName, attrValue] = __getAttributeTuple(attr);
      if (attr.__constructor == "AttributeStyle") {
        const items = attr.__args[0].__args[0];
        const styleObj = _reduce((obj2) => ([key, value]) => ({
          ...obj2,
          [key]: value
        }))({})(items);
        return { ...obj, style: styleObj };
      } else if (attr.__constructor == "StringAttribute") {
        return { ...obj, attrs: { ...obj.attrs, [attr.__args[0][0]]: attr.__args[0][1] } };
      } else if (attrName === "key") {
        return { ...obj, key: attrValue };
      } else if (PROP_NAMES.includes(attrName)) {
        let realAttr = attrName;
        if (attrName === "innerhtml") {
          realAttr = "innerHTML";
        }
        if (attrName === "innertext") {
          realAttr = "innerText";
        }
        return { ...obj, props: { ...obj.props, [realAttr]: attrValue } };
      } else if (attrName.substr(0, 2) === "on") {
        const eventName = attrName.substr(2);
        const ctor = _EventConstructors[eventName];
        return { ...obj, on: { ...obj.on, [eventName]: _wrapEventHandler(env, ctor, attrValue) } };
      } else {
        return { ...obj, attrs: { ...obj.attrs, [attrName]: attrValue } };
      }
    })({})(attrs);
  };
  var triggerLink = (e, path) => {
    e.preventDefault();
    const url = new URL(window.location);
    const state = {};
    let changed = true;
    if (window.env.routingKind === "BasicRouting") {
      url.href = url.origin + path;
      changed = path !== window.location.pathname;
    } else if (window.env.routingKind === "HashRouting") {
      url.hash = path;
      changed = path !== window.location.hash;
    }
    if (changed) {
      history.pushState(state, "", url);
      var popStateEvent = new PopStateEvent("popstate", { state });
      dispatchEvent(popStateEvent);
      window.scrollTo(0, 0);
    }
  };
  var _5906d__link__615 = (objectifyAttrs) => (attrs) => (children) => {
    const objAttrs = objectifyAttrs(window.env, attrs);
    if (objAttrs.attrs.to) {
      if (!objAttrs.attrs) {
        objAttrs.attrs = {};
      }
      if (window.env.routingKind === "HashRouting") {
        objAttrs.attrs.href = `#${objAttrs.attrs.to}`;
      } else {
        objAttrs.attrs.href = `${objAttrs.attrs.to}`;
      }
      delete objAttrs.attrs.to;
    }
    if (!objAttrs.on) {
      objAttrs.on = {};
    }
    if (objAttrs.on.click) {
      const current = objAttrs.on.click;
      objAttrs.on.click = (e) => {
        triggerLink(e, objAttrs.attrs.href);
        current(e);
      };
    } else {
      objAttrs.on.click = (e) => {
        triggerLink(e, objAttrs.attrs.href);
      };
    }
    return h("a", { ...objAttrs }, __listToJSArray__(children));
  };
  var _5800c_setLinkView__674 = (linkView) => (config) => ({ ...config, linkView });
  var _50cb0__decode__260 = (just) => (nothing) => (url) => {
    try {
      return just(decodeURIComponent(url));
    } catch (e) {
      return nothing;
    }
  };
  var _50cb0_decode__259 = (url) => _50cb0__decode__260(_2e42b_Just)(_2e42b_Nothing)(url);
  var _4be73_andDo__399 = (b) => (a) => _a32d2_chain__395((_) => b)(a);
  var _4be73_andDo__361 = (b) => (a) => _a32d2_chain__356((_) => b)(a);
  var _4be73_andDo__332 = (b) => (a) => _a32d2_chain__300((_) => b)(a);
  var _4be73_andDo__235 = (b) => (a) => _a32d2_chain__229((_) => b)(a);
  var _4be73_andDo__214 = (b) => (a) => _a32d2_chain__207((_) => b)(a);
  var _4595d_show__281 = (__$a__) => ((__x__) => {
    if (__x__.__constructor === "LLVM") {
      return `LLVM`;
    } else if (__x__.__constructor === "JS") {
      return `JS`;
    } else if (true) {
      return `Unknown`;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__$a__);
  var _4495c_buildPopStateEvent__581 = (e) => _4495c_PopStateEvent({
    url: document.location.href,
    path: window.env.routingKind === "BasicRouting" ? document.location.pathname : document.location.hash.substr(1) || "/",
    bubbles: e.bubbles,
    defaultPrevented: e.defaultPrevented,
    preventDefault: e.preventDefault,
    stopImmediatePropagation: e.stopImmediatePropagation,
    stopPropagation: e.stopPropagation,
    timeStamp: e.timeStamp,
    eventType: e.eventType
  });
  var _4495c_buildInputEvent__568 = (e) => _4495c_InputEvent({ bubbles: e.bubbles, defaultPrevented: e.defaultPrevented, preventDefault: e.preventDefault, stopImmediatePropagation: e.stopImmediatePropagation, stopPropagation: e.stopPropagation, timeStamp: e.timeStamp, eventType: e.eventType, target: e.target, data: e.data, inputType: e.inputType });
  var _4495c_buildAbstractEvent__565 = (e) => _4495c_AbstractEvent({ bubbles: e.bubbles, defaultPrevented: e.defaultPrevented, preventDefault: e.preventDefault, stopImmediatePropagation: e.stopImmediatePropagation, stopPropagation: e.stopPropagation, timeStamp: e.timeStamp, eventType: e.eventType });
  var _4495c_addDataTransfer__567 = (event) => (e) => {
    return { ...event, dataTransfer: e.dataTransfer };
  };
  var _4495c_buildMouseEvent__566 = (e) => _4495c_MouseEvent(_4495c_addDataTransfer__567({ bubbles: e.bubbles, defaultPrevented: e.defaultPrevented, preventDefault: e.preventDefault, stopImmediatePropagation: e.stopImmediatePropagation, stopPropagation: e.stopPropagation, timeStamp: e.timeStamp, eventType: e.eventType, clientX: e.clientX, clientY: e.clientY })(e));
  var _42e19_pure__97 = (_) => _42e19_Right;
  var _42e19_pure__77 = (_) => _42e19_Right;
  var _42e19_pure__65 = (_) => _42e19_Right;
  var _42e19_pure__53 = (_) => _42e19_Right;
  var _42e19_pure__40 = (_) => _42e19_Right;
  var _42e19_pure__29 = (_) => _42e19_Right;
  var _42e19_pure__109 = (_) => _42e19_Right;
  var _42e19_map__98 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__80 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__78 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__68 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__66 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__56 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__54 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__43 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__41 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__32 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__30 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__112 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__110 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_map__100 = (f) => (__W__3) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(f(a));
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__3);
  var _42e19_mapLeft__842 = (f) => (m) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(a);
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(f(e));
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(m);
  var _42e19_chain__48 = (f) => (__W__2) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return f(a);
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__2);
  var _42e19_chain__24 = (f) => (__W__2) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return f(a);
    } else if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__2);
  var _42e19_ap__99 = (mf) => (m) => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else if (__x__.__constructor === "Right" && true) {
      let f = __x__.__args[0];
      return _42e19_map__100(f)(m);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(mf);
  var _42e19_ap__79 = (mf) => (m) => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else if (__x__.__constructor === "Right" && true) {
      let f = __x__.__args[0];
      return _42e19_map__80(f)(m);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(mf);
  var _42e19_ap__67 = (mf) => (m) => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else if (__x__.__constructor === "Right" && true) {
      let f = __x__.__args[0];
      return _42e19_map__68(f)(m);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(mf);
  var _42e19_ap__55 = (mf) => (m) => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else if (__x__.__constructor === "Right" && true) {
      let f = __x__.__args[0];
      return _42e19_map__56(f)(m);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(mf);
  var _42e19_ap__42 = (mf) => (m) => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else if (__x__.__constructor === "Right" && true) {
      let f = __x__.__args[0];
      return _42e19_map__43(f)(m);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(mf);
  var _42e19_ap__31 = (mf) => (m) => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else if (__x__.__constructor === "Right" && true) {
      let f = __x__.__args[0];
      return _42e19_map__32(f)(m);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(mf);
  var _42e19_ap__111 = (mf) => (m) => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(e);
    } else if (__x__.__constructor === "Right" && true) {
      let f = __x__.__args[0];
      return _42e19_map__112(f)(m);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(mf);
  var _42034_runAction__583 = (env) => (updater) => {
    env.currentState = updater(env.currentState);
    window.env = env;
    const newElement = env.rootView(env.currentState);
    env.patch(env.currentElement, newElement);
    env.currentElement = newElement;
  };
  var _7f28c_renderWithConfig__903 = _7f28c__renderWithConfig__904(_42034_runAction__583);
  var _42034__wrapEventHandler__585 = (_fulfill) => (_runAction) => (env, ctor, handler) => {
    return (event) => {
      event.eventType = event.type;
      let wishes = handler(env.currentState)(ctor(event));
      while (wishes !== null) {
        _fulfill(_runAction(env))(_runAction(env))(wishes.v);
        wishes = wishes.n;
      }
    };
  };
  var _411df_TargetedItem__895 = (target) => (targeted) => (cardView) => ((__x__) => {
    if (__x__.__constructor === "JSTarget" && true) {
      let js = __x__.__args[0];
      return __eq__(target, _4595d_JS) ? cardView({ hasJS: true, hasLLVM: false, isAvailable: true })(js) : cardView({ hasJS: true, hasLLVM: false, isAvailable: false })(js);
    } else if (__x__.__constructor === "LLVMTarget" && true) {
      let llvm = __x__.__args[0];
      return __eq__(target, _4595d_LLVM) ? cardView({ hasJS: false, hasLLVM: true, isAvailable: true })(llvm) : cardView({ hasJS: false, hasLLVM: true, isAvailable: false })(llvm);
    } else if (__x__.__constructor === "BothTargets" && true && true) {
      let js = __x__.__args[0];
      let llvm = __x__.__args[1];
      return __eq__(target, _4595d_JS) ? cardView({ hasJS: true, hasLLVM: true, isAvailable: true })(js) : cardView({ hasJS: true, hasLLVM: true, isAvailable: true })(llvm);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(targeted);
  var _3d769_notEquals__202 = (val) => (a) => !__eq__(val, a);
  var _3d769_ifElse__869 = (predicate) => (truthy) => (falsy) => (value) => predicate(value) ? truthy(value) : falsy(value);
  var _3d769_ifElse__559 = (predicate) => (truthy) => (falsy) => (value) => predicate(value) ? truthy(value) : falsy(value);
  var _3d769_ifElse__556 = (predicate) => (truthy) => (falsy) => (value) => predicate(value) ? truthy(value) : falsy(value);
  var _3d769_ifElse__526 = (predicate) => (truthy) => (falsy) => (value) => predicate(value) ? truthy(value) : falsy(value);
  var _3d769_ifElse__515 = (predicate) => (truthy) => (falsy) => (value) => predicate(value) ? truthy(value) : falsy(value);
  var _3d769_ifElse__500 = (predicate) => (truthy) => (falsy) => (value) => predicate(value) ? truthy(value) : falsy(value);
  var _3d769_ifElse__135 = (predicate) => (truthy) => (falsy) => (value) => predicate(value) ? truthy(value) : falsy(value);
  var _3d769_identity__781 = (a) => a;
  var _3d769_identity__497 = (a) => a;
  var _3d769_equals__796 = (val) => (a) => __eq__(val, a);
  var _3d769_equals__555 = (val) => (a) => __eq__(val, a);
  var _3d769_equals__514 = (val) => (a) => __eq__(val, a);
  var _3d769_equals__503 = (val) => (a) => __eq__(val, a);
  var _3d769_equals__499 = (val) => (a) => __eq__(val, a);
  var _3d769_equals__149 = (val) => (a) => __eq__(val, a);
  var _3d769_complement__506 = (fn) => (x) => !fn(x);
  var _3d769_complement__289 = (fn) => (x) => !fn(x);
  var _3d769_always__868 = (a) => (_) => a;
  var _3d769_always__841 = (a) => (_) => a;
  var _3d769_always__785 = (a) => (_) => a;
  var _3d769_always__779 = (a) => (_) => a;
  var _3d769_always__766 = (a) => (_) => a;
  var _3d769_always__761 = (a) => (_) => a;
  var _3d769_always__729 = (a) => (_) => a;
  var _3d769_always__726 = (a) => (_) => a;
  var _3d769_always__678 = (a) => (_) => a;
  var _3d769_always__593 = (a) => (_) => a;
  var _3d769_always__551 = (a) => (_) => a;
  var _3d769_always__525 = (a) => (_) => a;
  var _3d769_always__489 = (a) => (_) => a;
  var _3d769_always__199 = (a) => (_) => a;
  var _3d769_always__132 = (a) => (_) => a;
  var _39ce8__findItem__549 = (finders) => (path) => (module) => {
    let $_result_;
    let $_continue_ = true;
    let $$finders = finders;
    let $$path = path;
    let $$module = module;
    while ($_continue_) {
      let $finders = $$finders;
      let $path = $$path;
      let $module = $$module;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: _$_try_$_, n: others } = __x__;
          ((__x__2) => {
            if (__x__2.__constructor === "NotFound") {
              $$finders = others, $$path = $path, $$module = $module, $_continue_ = true;
            } else if (true) {
              let found = __x__2;
              $_result_ = found;
            } else {
              console.log("non exhaustive patterns for value: ", __x__2.toString());
              console.trace();
              throw "non exhaustive patterns!";
            }
          })(_$_try_$_($path)($module));
        } else if (__x__ === null) {
          $_result_ = _39ce8_NotFound;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($finders);
    }
    return $_result_;
  };
  var _31104_get__579 = (k) => (dict) => {
    let $_result_;
    let $_continue_ = true;
    let $$k = k;
    let $$dict = dict;
    while ($_continue_) {
      let $k = $$k;
      let $dict = $$dict;
      $_continue_ = false;
      ((__x__) => {
        if (__x__.__constructor === "DictRBEmpty") {
          $_result_ = _2e42b_Nothing;
        } else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
          let _k = __x__.__args[1];
          let _v = __x__.__args[2];
          let left = __x__.__args[3];
          let right = __x__.__args[4];
          __eq__($k, _k) ? $_result_ = _2e42b_Just(_v) : $k > _k ? ($$k = $k, $$dict = right, $_continue_ = true) : ($$k = $k, $$dict = left, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($dict);
    }
    return $_result_;
  };
  var _2e42b_fromMaybe__580 = (or) => (__W__1) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let a = __x__.__args[0];
      return a;
    } else if (__x__.__constructor === "Nothing") {
      return or;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__1);
  var _2e42b_fromMaybe__261 = (or) => (__W__1) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let a = __x__.__args[0];
      return a;
    } else if (__x__.__constructor === "Nothing") {
      return or;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__1);
  var _29844_string__5 = _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonString" && true) {
      let s = __x__.__args[0];
      return _42e19_Right(s);
    } else if (true) {
      return _42e19_Left(`Error parsing string`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _29844_getParserFn__94 = (parser) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _29844_map2__93 = (fn) => (parserA) => (parserB) => _29844_Parser((input) => ((__x__) => {
    if (__x__.length === 2 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true) {
      let [{ __args: [a] }, { __args: [b] }] = __x__;
      return _42e19_Right(fn(a)(b));
    } else if (__x__.length === 2 && __x__[0].__constructor === "Left" && true && true) {
      let [{ __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 2 && true && __x__[1].__constructor === "Left" && true) {
      let [, { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })([_29844_getParserFn__94(parserA)(input), _29844_getParserFn__94(parserB)(input)]));
  var _29844_getParserFn__90 = (parser) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _29844_maybe__91 = (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let a = __x__.__args[0];
      return _42e19_Right(_2e42b_Just(a));
    } else if (__x__.__constructor === "Left" && true) {
      return _42e19_Right(_2e42b_Nothing);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_29844_getParserFn__90(parser)(input)));
  var _29844_getParserFn__84 = (parser) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _29844_getParserFn__72 = (parser) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _29844_getParserFn__60 = (parser) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _29844_getParserFn__47 = (parser) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _29844_getParserFn__37 = (parser) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _29844_getParserFn__23 = (parser) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _29844_map5__26 = (fn) => (parserA) => (parserB) => (parserC) => (parserD) => (parserE) => _29844_Parser((input) => ((__x__) => {
    if (__x__.length === 5 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true) {
      let [{ __args: [a] }, { __args: [b] }, { __args: [c] }, { __args: [d] }, { __args: [e] }] = __x__;
      return _42e19_Right(fn(a)(b)(c)(d)(e));
    } else if (__x__.length === 5 && __x__[0].__constructor === "Left" && true && true && true && true && true) {
      let [{ __args: [e] }, , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 5 && true && __x__[1].__constructor === "Left" && true && true && true && true) {
      let [, { __args: [e] }, , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 5 && true && true && __x__[2].__constructor === "Left" && true && true && true) {
      let [, , { __args: [e] }, ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 5 && true && true && true && __x__[3].__constructor === "Left" && true && true) {
      let [, , , { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 5 && true && true && true && true && __x__[4].__constructor === "Left" && true) {
      let [, , , , { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })([_29844_getParserFn__23(parserA)(input), _29844_getParserFn__23(parserB)(input), _29844_getParserFn__23(parserC)(input), _29844_getParserFn__23(parserD)(input), _29844_getParserFn__23(parserE)(input)]));
  var _29844_map5__88 = (fn) => (parserA) => (parserB) => (parserC) => (parserD) => (parserE) => _29844_Parser((input) => ((__x__) => {
    if (__x__.length === 5 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true) {
      let [{ __args: [a] }, { __args: [b] }, { __args: [c] }, { __args: [d] }, { __args: [e] }] = __x__;
      return _42e19_Right(fn(a)(b)(c)(d)(e));
    } else if (__x__.length === 5 && __x__[0].__constructor === "Left" && true && true && true && true && true) {
      let [{ __args: [e] }, , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 5 && true && __x__[1].__constructor === "Left" && true && true && true && true) {
      let [, { __args: [e] }, , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 5 && true && true && __x__[2].__constructor === "Left" && true && true && true) {
      let [, , { __args: [e] }, ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 5 && true && true && true && __x__[3].__constructor === "Left" && true && true) {
      let [, , , { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 5 && true && true && true && true && __x__[4].__constructor === "Left" && true) {
      let [, , , , { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })([_29844_getParserFn__23(parserA)(input), _29844_getParserFn__23(parserB)(input), _29844_getParserFn__23(parserC)(input), _29844_getParserFn__23(parserD)(input), _29844_getParserFn__23(parserE)(input)]));
  var _29844_map6__62 = (fn) => (parserA) => (parserB) => (parserC) => (parserD) => (parserE) => (parserF) => _29844_Parser((input) => ((__x__) => {
    if (__x__.length === 6 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true && __x__[5].__constructor === "Right" && true) {
      let [{ __args: [a] }, { __args: [b] }, { __args: [c] }, { __args: [d] }, { __args: [e] }, { __args: [f] }] = __x__;
      return _42e19_Right(fn(a)(b)(c)(d)(e)(f));
    } else if (__x__.length === 6 && __x__[0].__constructor === "Left" && true && true && true && true && true && true) {
      let [{ __args: [e] }, , , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 6 && true && __x__[1].__constructor === "Left" && true && true && true && true && true) {
      let [, { __args: [e] }, , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 6 && true && true && __x__[2].__constructor === "Left" && true && true && true && true) {
      let [, , { __args: [e] }, , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 6 && true && true && true && __x__[3].__constructor === "Left" && true && true && true) {
      let [, , , { __args: [e] }, ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 6 && true && true && true && true && __x__[4].__constructor === "Left" && true && true) {
      let [, , , , { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 6 && true && true && true && true && true && __x__[5].__constructor === "Left" && true) {
      let [, , , , , { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })([_29844_getParserFn__23(parserA)(input), _29844_getParserFn__23(parserB)(input), _29844_getParserFn__23(parserC)(input), _29844_getParserFn__23(parserD)(input), _29844_getParserFn__23(parserE)(input), _29844_getParserFn__23(parserF)(input)]));
  var _29844_map6__74 = (fn) => (parserA) => (parserB) => (parserC) => (parserD) => (parserE) => (parserF) => _29844_Parser((input) => ((__x__) => {
    if (__x__.length === 6 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true && __x__[5].__constructor === "Right" && true) {
      let [{ __args: [a] }, { __args: [b] }, { __args: [c] }, { __args: [d] }, { __args: [e] }, { __args: [f] }] = __x__;
      return _42e19_Right(fn(a)(b)(c)(d)(e)(f));
    } else if (__x__.length === 6 && __x__[0].__constructor === "Left" && true && true && true && true && true && true) {
      let [{ __args: [e] }, , , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 6 && true && __x__[1].__constructor === "Left" && true && true && true && true && true) {
      let [, { __args: [e] }, , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 6 && true && true && __x__[2].__constructor === "Left" && true && true && true && true) {
      let [, , { __args: [e] }, , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 6 && true && true && true && __x__[3].__constructor === "Left" && true && true && true) {
      let [, , , { __args: [e] }, ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 6 && true && true && true && true && __x__[4].__constructor === "Left" && true && true) {
      let [, , , , { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 6 && true && true && true && true && true && __x__[5].__constructor === "Left" && true) {
      let [, , , , , { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })([_29844_getParserFn__23(parserA)(input), _29844_getParserFn__23(parserB)(input), _29844_getParserFn__47(parserC)(input), _29844_getParserFn__23(parserD)(input), _29844_getParserFn__23(parserE)(input), _29844_getParserFn__23(parserF)(input)]));
  var _29844_map7__50 = (fn) => (parserA) => (parserB) => (parserC) => (parserD) => (parserE) => (parserF) => (parserG) => _29844_Parser((input) => ((__x__) => {
    if (__x__.length === 7 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true && __x__[5].__constructor === "Right" && true && __x__[6].__constructor === "Right" && true) {
      let [{ __args: [a] }, { __args: [b] }, { __args: [c] }, { __args: [d] }, { __args: [e] }, { __args: [f] }, { __args: [g] }] = __x__;
      return _42e19_Right(fn(a)(b)(c)(d)(e)(f)(g));
    } else if (__x__.length === 7 && __x__[0].__constructor === "Left" && true && true && true && true && true && true && true) {
      let [{ __args: [e] }, , , , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 7 && true && __x__[1].__constructor === "Left" && true && true && true && true && true && true) {
      let [, { __args: [e] }, , , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 7 && true && true && __x__[2].__constructor === "Left" && true && true && true && true && true) {
      let [, , { __args: [e] }, , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 7 && true && true && true && __x__[3].__constructor === "Left" && true && true && true && true) {
      let [, , , { __args: [e] }, , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 7 && true && true && true && true && __x__[4].__constructor === "Left" && true && true && true) {
      let [, , , , { __args: [e] }, ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 7 && true && true && true && true && true && __x__[5].__constructor === "Left" && true && true) {
      let [, , , , , { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 7 && true && true && true && true && true && true && __x__[6].__constructor === "Left" && true) {
      let [, , , , , , { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })([_29844_getParserFn__23(parserA)(input), _29844_getParserFn__23(parserB)(input), _29844_getParserFn__23(parserC)(input), _29844_getParserFn__47(parserD)(input), _29844_getParserFn__23(parserE)(input), _29844_getParserFn__23(parserF)(input), _29844_getParserFn__23(parserG)(input)]));
  var _29844_getParserFn__116 = (parser) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _29844_getParserFn__104 = (parser) => ((__x__) => {
    if (__x__.__constructor === "Parser" && true) {
      let fn = __x__.__args[0];
      return fn;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(parser);
  var _29844_map8__106 = (fn) => (parserA) => (parserB) => (parserC) => (parserD) => (parserE) => (parserF) => (parserG) => (parserH) => _29844_Parser((input) => ((__x__) => {
    if (__x__.length === 8 && __x__[0].__constructor === "Right" && true && __x__[1].__constructor === "Right" && true && __x__[2].__constructor === "Right" && true && __x__[3].__constructor === "Right" && true && __x__[4].__constructor === "Right" && true && __x__[5].__constructor === "Right" && true && __x__[6].__constructor === "Right" && true && __x__[7].__constructor === "Right" && true) {
      let [{ __args: [a] }, { __args: [b] }, { __args: [c] }, { __args: [d] }, { __args: [e] }, { __args: [f] }, { __args: [g] }, { __args: [h2] }] = __x__;
      return _42e19_Right(fn(a)(b)(c)(d)(e)(f)(g)(h2));
    } else if (__x__.length === 8 && __x__[0].__constructor === "Left" && true && true && true && true && true && true && true && true) {
      let [{ __args: [e] }, , , , , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 8 && true && __x__[1].__constructor === "Left" && true && true && true && true && true && true && true) {
      let [, { __args: [e] }, , , , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 8 && true && true && __x__[2].__constructor === "Left" && true && true && true && true && true && true) {
      let [, , { __args: [e] }, , , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 8 && true && true && true && __x__[3].__constructor === "Left" && true && true && true && true && true) {
      let [, , , { __args: [e] }, , , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 8 && true && true && true && true && __x__[4].__constructor === "Left" && true && true && true && true) {
      let [, , , , { __args: [e] }, , ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 8 && true && true && true && true && true && __x__[5].__constructor === "Left" && true && true && true) {
      let [, , , , , { __args: [e] }, ,] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 8 && true && true && true && true && true && true && __x__[6].__constructor === "Left" && true && true) {
      let [, , , , , , { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else if (__x__.length === 8 && true && true && true && true && true && true && true && __x__[7].__constructor === "Left" && true) {
      let [, , , , , , , { __args: [e] }] = __x__;
      return _42e19_Left(e);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })([_29844_getParserFn__23(parserA)(input), _29844_getParserFn__23(parserB)(input), _29844_getParserFn__23(parserC)(input), _29844_getParserFn__104(parserD)(input), _29844_getParserFn__84(parserE)(input), _29844_getParserFn__72(parserF)(input), _29844_getParserFn__60(parserG)(input), _29844_getParserFn__37(parserH)(input)]));
  var _294a4_docJson__3 = `{
  "modules": [
    {
      "path": "/Users/brekk/madness/gambit/src/Gambit.mad",
      "moduleName": "Gambit",
      "description": "",
      "typeDeclarations": [
        
      ],
      "aliases": [
        
      ],
      "interfaces": [
        
      ],
      "instances": [
        
      ],
      "expressions": [
        {
          "js": {
            "name": "Ace",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank"
          },
          "llvm": {
            "name": "Ace",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank"
          }
        },
        {
          "js": {
            "name": "Card",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> Rank -> Card"
          },
          "llvm": {
            "name": "Card",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> Rank -> Card"
          }
        },
        {
          "js": {
            "name": "Clubs",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit"
          },
          "llvm": {
            "name": "Clubs",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit"
          }
        },
        {
          "js": {
            "name": "Diamonds",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit"
          },
          "llvm": {
            "name": "Diamonds",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit"
          }
        },
        {
          "js": {
            "name": "Hearts",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit"
          },
          "llvm": {
            "name": "Hearts",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit"
          }
        },
        {
          "js": {
            "name": "InvalidRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank"
          },
          "llvm": {
            "name": "InvalidRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank"
          }
        },
        {
          "js": {
            "name": "Jack",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank"
          },
          "llvm": {
            "name": "Jack",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank"
          }
        },
        {
          "js": {
            "name": "Joker",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit"
          },
          "llvm": {
            "name": "Joker",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit"
          }
        },
        {
          "js": {
            "name": "King",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank"
          },
          "llvm": {
            "name": "King",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank"
          }
        },
        {
          "js": {
            "name": "NoFace",
            "description": "",
            "example": "",
            "since": "",
            "type": "Short -> Rank"
          },
          "llvm": {
            "name": "NoFace",
            "description": "",
            "example": "",
            "since": "",
            "type": "Short -> Rank"
          }
        },
        {
          "js": {
            "name": "Queen",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank"
          },
          "llvm": {
            "name": "Queen",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank"
          }
        },
        {
          "js": {
            "name": "Spades",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit"
          },
          "llvm": {
            "name": "Spades",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit"
          }
        },
        {
          "js": {
            "name": "Wildcard",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank"
          },
          "llvm": {
            "name": "Wildcard",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank"
          }
        },
        {
          "js": {
            "name": "DECK",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card"
          },
          "llvm": {
            "name": "DECK",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card"
          }
        },
        {
          "js": {
            "name": "DECK_WITH_JOKERS",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card"
          },
          "llvm": {
            "name": "DECK_WITH_JOKERS",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card"
          }
        },
        {
          "js": {
            "name": "anyMatchingRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> List Card -> Boolean"
          },
          "llvm": {
            "name": "anyMatchingRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> List Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "club",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Card"
          },
          "llvm": {
            "name": "club",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Card"
          }
        },
        {
          "js": {
            "name": "compareWithTrump",
            "description": "",
            "example": "",
            "since": "",
            "type": "Boolean -> Suit -> Card -> Card -> Comparison"
          },
          "llvm": {
            "name": "compareWithTrump",
            "description": "",
            "example": "",
            "since": "",
            "type": "Boolean -> Suit -> Card -> Card -> Comparison"
          }
        },
        {
          "js": {
            "name": "consecutiveAceHigh",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "consecutiveAceHigh",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "consecutiveAceLow",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "consecutiveAceLow",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "consecutiveFlush",
            "description": "",
            "example": "",
            "since": "",
            "type": "Boolean -> Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "consecutiveFlush",
            "description": "",
            "example": "",
            "since": "",
            "type": "Boolean -> Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "consecutiveTo",
            "description": "",
            "example": "",
            "since": "",
            "type": "Boolean -> Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "consecutiveTo",
            "description": "",
            "example": "",
            "since": "",
            "type": "Boolean -> Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "deal",
            "description": "",
            "example": "",
            "since": "",
            "type": "Integer -> Integer -> List Card -> Maybe #[List (List Card), List Card]"
          },
          "llvm": {
            "name": "deal",
            "description": "",
            "example": "",
            "since": "",
            "type": "Integer -> Integer -> List Card -> Maybe #[List (List Card), List Card]"
          }
        },
        {
          "js": {
            "name": "dedupe",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card -> List Card"
          },
          "llvm": {
            "name": "dedupe",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "diamond",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Card"
          },
          "llvm": {
            "name": "diamond",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Card"
          }
        },
        {
          "js": {
            "name": "filterBySuit",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> List Card -> List Card"
          },
          "llvm": {
            "name": "filterBySuit",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "findSameRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card -> List (List Card)"
          },
          "llvm": {
            "name": "findSameRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card -> List (List Card)"
          }
        },
        {
          "js": {
            "name": "getFaceCards",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card -> List Card"
          },
          "llvm": {
            "name": "getFaceCards",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "getNonFaceCards",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card -> List Card"
          },
          "llvm": {
            "name": "getNonFaceCards",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "has",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> List Card -> Boolean"
          },
          "llvm": {
            "name": "has",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> List Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "heart",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Card"
          },
          "llvm": {
            "name": "heart",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Card"
          }
        },
        {
          "js": {
            "name": "isFaceCard",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Boolean"
          },
          "llvm": {
            "name": "isFaceCard",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "isNoFaceCard",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Boolean"
          },
          "llvm": {
            "name": "isNoFaceCard",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "isNonStandardRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Boolean"
          },
          "llvm": {
            "name": "isNonStandardRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "isRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Card -> Boolean"
          },
          "llvm": {
            "name": "isRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "isSuit",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> Card -> Boolean"
          },
          "llvm": {
            "name": "isSuit",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "joker",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Card"
          },
          "llvm": {
            "name": "joker",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Card"
          }
        },
        {
          "js": {
            "name": "match",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> Rank -> Card -> Boolean"
          },
          "llvm": {
            "name": "match",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> Rank -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "ordinalRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Boolean -> Rank -> Short"
          },
          "llvm": {
            "name": "ordinalRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Boolean -> Rank -> Short"
          }
        },
        {
          "js": {
            "name": "rank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Rank"
          },
          "llvm": {
            "name": "rank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Rank"
          }
        },
        {
          "js": {
            "name": "rankFrom",
            "description": "",
            "example": "",
            "since": "",
            "type": "Short -> Rank"
          },
          "llvm": {
            "name": "rankFrom",
            "description": "",
            "example": "",
            "since": "",
            "type": "Short -> Rank"
          }
        },
        {
          "js": {
            "name": "rejectBySuit",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> List Card -> List Card"
          },
          "llvm": {
            "name": "rejectBySuit",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "remove",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> List Card -> List Card"
          },
          "llvm": {
            "name": "remove",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "sameCard",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "sameCard",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "sameRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "sameRank",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "sameSuit",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "sameSuit",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "sort",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card -> List Card"
          },
          "llvm": {
            "name": "sort",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "sortDesc",
            "description": "",
            "example": "",
            "since": "",
            "type": "Boolean -> List Card -> List Card"
          },
          "llvm": {
            "name": "sortDesc",
            "description": "",
            "example": "",
            "since": "",
            "type": "Boolean -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "sortDescWithTrump",
            "description": "",
            "example": "",
            "since": "",
            "type": "Boolean -> Suit -> List Card -> List Card"
          },
          "llvm": {
            "name": "sortDescWithTrump",
            "description": "",
            "example": "",
            "since": "",
            "type": "Boolean -> Suit -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "sortLow",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card -> List Card"
          },
          "llvm": {
            "name": "sortLow",
            "description": "",
            "example": "",
            "since": "",
            "type": "List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "sortLowWithTrump",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> List Card -> List Card"
          },
          "llvm": {
            "name": "sortLowWithTrump",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "sortWithTrump",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> List Card -> List Card"
          },
          "llvm": {
            "name": "sortWithTrump",
            "description": "",
            "example": "",
            "since": "",
            "type": "Suit -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "spade",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Card"
          },
          "llvm": {
            "name": "spade",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Card"
          }
        },
        {
          "js": {
            "name": "suit",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Suit"
          },
          "llvm": {
            "name": "suit",
            "description": "",
            "example": "",
            "since": "",
            "type": "Card -> Suit"
          }
        },
        {
          "js": {
            "name": "toOrdinal",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Short"
          },
          "llvm": {
            "name": "toOrdinal",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Short"
          }
        },
        {
          "js": {
            "name": "toOrdinalLow",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Short"
          },
          "llvm": {
            "name": "toOrdinalLow",
            "description": "",
            "example": "",
            "since": "",
            "type": "Rank -> Short"
          }
        }
      ]
    },
    {
      "path": "/Users/brekk/madness/gambit/src/Deck.mad",
      "moduleName": "Deck",
      "description": "",
      "typeDeclarations": [
        
      ],
      "aliases": [
        
      ],
      "interfaces": [
        
      ],
      "instances": [
        
      ],
      "expressions": [
        {
          "js": {
            "name": "DECK",
            "description": "A full deck of French-suited Cards.",
            "example": "import { DECK } from \\"Gambit\\"\\nimport IO from \\"IO\\"\\nIO.pTrace(\\"A deck of cards\\", DECK)",
            "since": "0.0.1",
            "type": "List Card"
          },
          "llvm": {
            "name": "DECK",
            "description": "A full deck of French-suited Cards.",
            "example": "import { DECK } from \\"Gambit\\"\\nimport IO from \\"IO\\"\\nIO.pTrace(\\"A deck of cards\\", DECK)",
            "since": "0.0.1",
            "type": "List Card"
          }
        },
        {
          "js": {
            "name": "DECK_WITH_JOKERS",
            "description": "A full deck of French-suited Cards, plus two Jokers.",
            "example": "import { DECK_WITH_JOKERS } from \\"Gambit\\"\\nimport IO from \\"IO\\"\\nIO.pTrace(\\"A deck of cards\\", DECK_WITH_JOKERS)",
            "since": "0.0.1",
            "type": "List Card"
          },
          "llvm": {
            "name": "DECK_WITH_JOKERS",
            "description": "A full deck of French-suited Cards, plus two Jokers.",
            "example": "import { DECK_WITH_JOKERS } from \\"Gambit\\"\\nimport IO from \\"IO\\"\\nIO.pTrace(\\"A deck of cards\\", DECK_WITH_JOKERS)",
            "since": "0.0.1",
            "type": "List Card"
          }
        },
        {
          "js": {
            "name": "compareWithTrump",
            "description": "Compare two cards, with respect to ace-high evaluation and a trump Suit.",
            "example": "import { Ace, compareWithTrump, Clubs, Card, Hearts } from \\"Gambit\\"\\ncompareWithTrump(true, Clubs, Card(Clubs, Ace), Card(Hearts, Ace)) // LT",
            "since": "0.0.1",
            "type": "Boolean -> Suit -> Card -> Card -> Comparison"
          },
          "llvm": {
            "name": "compareWithTrump",
            "description": "Compare two cards, with respect to ace-high evaluation and a trump Suit.",
            "example": "import { Ace, compareWithTrump, Clubs, Card, Hearts } from \\"Gambit\\"\\ncompareWithTrump(true, Clubs, Card(Clubs, Ace), Card(Hearts, Ace)) // LT",
            "since": "0.0.1",
            "type": "Boolean -> Suit -> Card -> Card -> Comparison"
          }
        },
        {
          "js": {
            "name": "sortDescWithTrump",
            "description": "Sort cards descending, with respect to ace-high evaluation and a trump Suit.",
            "example": "import { sortDescWithTrump, Clubs, DECK } from \\"Gambit\\"\\nsortDescWithTrump(true, Clubs, DECK)",
            "since": "0.0.1",
            "type": "Boolean -> Suit -> List Card -> List Card"
          },
          "llvm": {
            "name": "sortDescWithTrump",
            "description": "Sort cards descending, with respect to ace-high evaluation and a trump Suit.",
            "example": "import { sortDescWithTrump, Clubs, DECK } from \\"Gambit\\"\\nsortDescWithTrump(true, Clubs, DECK)",
            "since": "0.0.1",
            "type": "Boolean -> Suit -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "sortWithTrump",
            "description": "Sort cards descending, assuming ace-high evaluation and with respect to a trump Suit.",
            "example": "import { sortWithTrump, Clubs, DECK } from \\"Gambit\\"\\nsortWithTrump(true, Clubs, DECK)",
            "since": "0.0.1",
            "type": "Suit -> List Card -> List Card"
          },
          "llvm": {
            "name": "sortWithTrump",
            "description": "Sort cards descending, assuming ace-high evaluation and with respect to a trump Suit.",
            "example": "import { sortWithTrump, Clubs, DECK } from \\"Gambit\\"\\nsortWithTrump(true, Clubs, DECK)",
            "since": "0.0.1",
            "type": "Suit -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "sortLowWithTrump",
            "description": "Sort cards descending, assuming ace-low evaluation and with respect to a trump Suit.",
            "example": "import { sortLowWithTrump, Clubs, DECK } from \\"Gambit\\"\\nsortLowWithTrump(true, Clubs, DECK)",
            "since": "0.0.1",
            "type": "Suit -> List Card -> List Card"
          },
          "llvm": {
            "name": "sortLowWithTrump",
            "description": "Sort cards descending, assuming ace-low evaluation and with respect to a trump Suit.",
            "example": "import { sortLowWithTrump, Clubs, DECK } from \\"Gambit\\"\\nsortLowWithTrump(true, Clubs, DECK)",
            "since": "0.0.1",
            "type": "Suit -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "sortDesc",
            "description": "Sort cards descending, with respect to ace-high evaluation",
            "example": "import { sortDesc, DECK } from \\"Gambit\\"\\nsortDesc(true, DECK)",
            "since": "0.0.1",
            "type": "Boolean -> List Card -> List Card"
          },
          "llvm": {
            "name": "sortDesc",
            "description": "Sort cards descending, with respect to ace-high evaluation",
            "example": "import { sortDesc, DECK } from \\"Gambit\\"\\nsortDesc(true, DECK)",
            "since": "0.0.1",
            "type": "Boolean -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "sort",
            "description": "Sort cards descending, assuming ace-high evaluation",
            "example": "import { sort, DECK } from \\"Gambit\\"\\nsort(DECK)",
            "since": "0.0.1",
            "type": "List Card -> List Card"
          },
          "llvm": {
            "name": "sort",
            "description": "Sort cards descending, assuming ace-high evaluation",
            "example": "import { sort, DECK } from \\"Gambit\\"\\nsort(DECK)",
            "since": "0.0.1",
            "type": "List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "sortLow",
            "description": "Sort cards descending, assuming ace-low evaluation",
            "example": "import { sort, DECK } from \\"Gambit\\"\\nsort(DECK)",
            "since": "0.0.1",
            "type": "List Card -> List Card"
          },
          "llvm": {
            "name": "sortLow",
            "description": "Sort cards descending, assuming ace-low evaluation",
            "example": "import { sort, DECK } from \\"Gambit\\"\\nsort(DECK)",
            "since": "0.0.1",
            "type": "List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "has",
            "description": "Test whether a given card is within a List of Cards",
            "example": "import { has, club, Ace } from \\"Gambit\\"\\nhas(club(Ace), []) // false",
            "since": "0.0.1",
            "type": "Card -> List Card -> Boolean"
          },
          "llvm": {
            "name": "has",
            "description": "Test whether a given card is within a List of Cards",
            "example": "import { has, club, Ace } from \\"Gambit\\"\\nhas(club(Ace), []) // false",
            "since": "0.0.1",
            "type": "Card -> List Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "remove",
            "description": "Remove a card from a list of cards",
            "example": "import { has, club, Ace } from \\"Gambit\\"\\nremove(club(Ace), [club(Ace)]) // []",
            "since": "0.0.1",
            "type": "Card -> List Card -> List Card"
          },
          "llvm": {
            "name": "remove",
            "description": "Remove a card from a list of cards",
            "example": "import { has, club, Ace } from \\"Gambit\\"\\nremove(club(Ace), [club(Ace)]) // []",
            "since": "0.0.1",
            "type": "Card -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "anyMatchingRank",
            "description": "Test a List of Cards for any Card that is of the same rank as a given Card",
            "example": "import { anyMatchingRank, club, Ace, DECK } from \\"Gambit\\"\\nanyMatchingRank(club(Ace), DECK) // true",
            "since": "0.0.1",
            "type": "Card -> List Card -> Boolean"
          },
          "llvm": {
            "name": "anyMatchingRank",
            "description": "Test a List of Cards for any Card that is of the same rank as a given Card",
            "example": "import { anyMatchingRank, club, Ace, DECK } from \\"Gambit\\"\\nanyMatchingRank(club(Ace), DECK) // true",
            "since": "0.0.1",
            "type": "Card -> List Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "deal",
            "description": "Take a list of cards and possibly segment them into sublists of a specific number per player.",
            "example": "import { deal, DECK } from \\"Gambit\\"\\ndeal(7, 2, DECK) // Just(#[[sevenCardsForPlayer1, sevenCardsForPlayer2], remainder])",
            "since": "0.0.1",
            "type": "Integer -> Integer -> List Card -> Maybe #[List (List Card), List Card]"
          },
          "llvm": {
            "name": "deal",
            "description": "Take a list of cards and possibly segment them into sublists of a specific number per player.",
            "example": "import { deal, DECK } from \\"Gambit\\"\\ndeal(7, 2, DECK) // Just(#[[sevenCardsForPlayer1, sevenCardsForPlayer2], remainder])",
            "since": "0.0.1",
            "type": "Integer -> Integer -> List Card -> Maybe #[List (List Card), List Card]"
          }
        },
        {
          "js": {
            "name": "filterBySuit",
            "description": "Filter a List of Cards by a given Suit",
            "example": "import { filterBySuit, Clubs, DECK } from \\"Gambit\\"\\nfilterBySuit(Clubs, DECK) // only cards of Clubs",
            "since": "0.0.1",
            "type": "Suit -> List Card -> List Card"
          },
          "llvm": {
            "name": "filterBySuit",
            "description": "Filter a List of Cards by a given Suit",
            "example": "import { filterBySuit, Clubs, DECK } from \\"Gambit\\"\\nfilterBySuit(Clubs, DECK) // only cards of Clubs",
            "since": "0.0.1",
            "type": "Suit -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "rejectBySuit",
            "description": "Reject a List of Cards by a given Suit",
            "example": "import { rejectBySuit, Clubs, DECK } from \\"Gambit\\"\\nrejectBySuit(Clubs, DECK) // only cards of not Clubs",
            "since": "0.0.1",
            "type": "Suit -> List Card -> List Card"
          },
          "llvm": {
            "name": "rejectBySuit",
            "description": "Reject a List of Cards by a given Suit",
            "example": "import { rejectBySuit, Clubs, DECK } from \\"Gambit\\"\\nrejectBySuit(Clubs, DECK) // only cards of not Clubs",
            "since": "0.0.1",
            "type": "Suit -> List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "getFaceCards",
            "description": "Get face cards from a given list of cards",
            "example": "import { DECK, getFaceCards } from \\"Gambit\\"\\ngetFaceCards(DECK) // only Ace / King / Queen / Jack",
            "since": "0.0.1",
            "type": "List Card -> List Card"
          },
          "llvm": {
            "name": "getFaceCards",
            "description": "Get face cards from a given list of cards",
            "example": "import { DECK, getFaceCards } from \\"Gambit\\"\\ngetFaceCards(DECK) // only Ace / King / Queen / Jack",
            "since": "0.0.1",
            "type": "List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "getNonFaceCards",
            "description": "Get non-face cards from a given list of cards",
            "example": "import { DECK, getNonFaceCards } from \\"Gambit\\"\\ngetFaceCards(DECK) // no Aces / Kings / Queens / Jacks",
            "since": "0.0.1",
            "type": "List Card -> List Card"
          },
          "llvm": {
            "name": "getNonFaceCards",
            "description": "Get non-face cards from a given list of cards",
            "example": "import { DECK, getNonFaceCards } from \\"Gambit\\"\\ngetFaceCards(DECK) // no Aces / Kings / Queens / Jacks",
            "since": "0.0.1",
            "type": "List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "dedupe",
            "description": "Return a unique list of cards",
            "example": "import { dedupe, club, Ace } from \\"Gambit\\"\\ndedupe([club(Ace), club(Ace), club(Ace)]) // [Card(Clubs, Ace)]",
            "since": "0.0.1",
            "type": "List Card -> List Card"
          },
          "llvm": {
            "name": "dedupe",
            "description": "Return a unique list of cards",
            "example": "import { dedupe, club, Ace } from \\"Gambit\\"\\ndedupe([club(Ace), club(Ace), club(Ace)]) // [Card(Clubs, Ace)]",
            "since": "0.0.1",
            "type": "List Card -> List Card"
          }
        },
        {
          "js": {
            "name": "findSameRank",
            "description": "Find cards which are of the same rank within a list",
            "example": "import { findSameRank, DECK } from \\"Gambit\\"\\nfindSameRank(DECK) // a list of lists of cards grouped by rank",
            "since": "0.0.1",
            "type": "List Card -> List (List Card)"
          },
          "llvm": {
            "name": "findSameRank",
            "description": "Find cards which are of the same rank within a list",
            "example": "import { findSameRank, DECK } from \\"Gambit\\"\\nfindSameRank(DECK) // a list of lists of cards grouped by rank",
            "since": "0.0.1",
            "type": "List Card -> List (List Card)"
          }
        }
      ]
    },
    {
      "path": "/Users/brekk/madness/gambit/src/Cards.mad",
      "moduleName": "Cards",
      "description": "",
      "typeDeclarations": [
        {
          "js": {
            "name": "Suit",
            "params": "",
            "constructors": [
              "Clubs",
              "Diamonds",
              "Hearts",
              "Spades",
              "Joker"
            ],
            "description": "A type which specifies one of five categories for cards",
            "example": "import type { Suit } from \\"Gambit\\"",
            "since": "0.0.1"
          },
          "llvm": {
            "name": "Suit",
            "params": "",
            "constructors": [
              "Clubs",
              "Diamonds",
              "Hearts",
              "Spades",
              "Joker"
            ],
            "description": "A type which specifies one of five categories for cards",
            "example": "import type { Suit } from \\"Gambit\\"",
            "since": "0.0.1"
          }
        },
        {
          "js": {
            "name": "Rank",
            "params": "",
            "constructors": [
              "NoFace(Short)",
              "Jack",
              "Queen",
              "King",
              "Ace",
              "Wildcard",
              "InvalidRank"
            ],
            "description": "A type which specifies the point value of a given card.\\nIn addition to traditional values, two additional constructors: Wildcard and InvalidRank\\nare exported.",
            "example": "import type { Rank } from \\"Gambit\\"",
            "since": "0.0.1"
          },
          "llvm": {
            "name": "Rank",
            "params": "",
            "constructors": [
              "NoFace(Short)",
              "Jack",
              "Queen",
              "King",
              "Ace",
              "Wildcard",
              "InvalidRank"
            ],
            "description": "A type which specifies the point value of a given card.\\nIn addition to traditional values, two additional constructors: Wildcard and InvalidRank\\nare exported.",
            "example": "import type { Rank } from \\"Gambit\\"",
            "since": "0.0.1"
          }
        },
        {
          "js": {
            "name": "Card",
            "params": "",
            "constructors": [
              "Card(Suit, Rank)"
            ],
            "description": "A type which specifies a given Suit and Rank combination",
            "example": "import type { Card } from \\"Gambit\\"\\nimport { Card } from \\"Gambit\\"\\naceOfSpades = Card(Spades, Ace)",
            "since": "0.0.1"
          },
          "llvm": {
            "name": "Card",
            "params": "",
            "constructors": [
              "Card(Suit, Rank)"
            ],
            "description": "A type which specifies a given Suit and Rank combination",
            "example": "import type { Card } from \\"Gambit\\"\\nimport { Card } from \\"Gambit\\"\\naceOfSpades = Card(Spades, Ace)",
            "since": "0.0.1"
          }
        }
      ],
      "aliases": [
        
      ],
      "interfaces": [
        
      ],
      "instances": [
        
      ],
      "expressions": [
        {
          "js": {
            "name": "spade",
            "description": "A sugar constructor for Spades",
            "example": "import { spade } from \\"Gambit\\"\\naceOfSpades = spade(Ace)",
            "since": "0.0.1",
            "type": "Rank -> Card"
          },
          "llvm": {
            "name": "spade",
            "description": "A sugar constructor for Spades",
            "example": "import { spade } from \\"Gambit\\"\\naceOfSpades = spade(Ace)",
            "since": "0.0.1",
            "type": "Rank -> Card"
          }
        },
        {
          "js": {
            "name": "diamond",
            "description": "A sugar constructor for Diamonds",
            "example": "import { diamond } from \\"Gambit\\"\\naceOfDiamonds = diamond(Ace)",
            "since": "0.0.1",
            "type": "Rank -> Card"
          },
          "llvm": {
            "name": "diamond",
            "description": "A sugar constructor for Diamonds",
            "example": "import { diamond } from \\"Gambit\\"\\naceOfDiamonds = diamond(Ace)",
            "since": "0.0.1",
            "type": "Rank -> Card"
          }
        },
        {
          "js": {
            "name": "heart",
            "description": "A sugar constructor for Hearts",
            "example": "import { heart } from \\"Gambit\\"\\naceOfHearts = heart(Ace)",
            "since": "0.0.1",
            "type": "Rank -> Card"
          },
          "llvm": {
            "name": "heart",
            "description": "A sugar constructor for Hearts",
            "example": "import { heart } from \\"Gambit\\"\\naceOfHearts = heart(Ace)",
            "since": "0.0.1",
            "type": "Rank -> Card"
          }
        },
        {
          "js": {
            "name": "club",
            "description": "A sugar constructor for Clubs",
            "example": "import { club } from \\"Gambit\\"\\naceOfClubs = club(Ace)",
            "since": "0.0.1",
            "type": "Rank -> Card"
          },
          "llvm": {
            "name": "club",
            "description": "A sugar constructor for Clubs",
            "example": "import { club } from \\"Gambit\\"\\naceOfClubs = club(Ace)",
            "since": "0.0.1",
            "type": "Rank -> Card"
          }
        },
        {
          "js": {
            "name": "joker",
            "description": "A sugar constructor for Jokers",
            "example": "import { joker } from \\"Gambit\\"\\naceOfJokers = joker(Ace)",
            "since": "0.0.1",
            "type": "Rank -> Card"
          },
          "llvm": {
            "name": "joker",
            "description": "A sugar constructor for Jokers",
            "example": "import { joker } from \\"Gambit\\"\\naceOfJokers = joker(Ace)",
            "since": "0.0.1",
            "type": "Rank -> Card"
          }
        },
        {
          "js": {
            "name": "suit",
            "description": "Get the Suit of a given Card",
            "example": "import { Ace, Clubs, club, suit } from \\"Gambit\\"\\nsuit(club(Ace)) == Clubs // true",
            "since": "0.0.1",
            "type": "Card -> Suit"
          },
          "llvm": {
            "name": "suit",
            "description": "Get the Suit of a given Card",
            "example": "import { Ace, Clubs, club, suit } from \\"Gambit\\"\\nsuit(club(Ace)) == Clubs // true",
            "since": "0.0.1",
            "type": "Card -> Suit"
          }
        },
        {
          "js": {
            "name": "rank",
            "description": "Get the Rank of a given Card",
            "example": "import { Ace, club, rank } from \\"Gambit\\"\\nrank(club(Ace)) == Ace // true",
            "since": "0.0.1",
            "type": "Card -> Rank"
          },
          "llvm": {
            "name": "rank",
            "description": "Get the Rank of a given Card",
            "example": "import { Ace, club, rank } from \\"Gambit\\"\\nrank(club(Ace)) == Ace // true",
            "since": "0.0.1",
            "type": "Card -> Rank"
          }
        },
        {
          "js": {
            "name": "ordinalRank",
            "description": "Convert a Rank to a numeric value with respect to ace-high evaluation",
            "example": "import { Ace, ordinalRank } from \\"Gambit\\"\\nordinalRank(true, Ace) == 14 // true\\nordinalRank(false, Ace) == 1 // true",
            "since": "0.0.1",
            "type": "Boolean -> Rank -> Short"
          },
          "llvm": {
            "name": "ordinalRank",
            "description": "Convert a Rank to a numeric value with respect to ace-high evaluation",
            "example": "import { Ace, ordinalRank } from \\"Gambit\\"\\nordinalRank(true, Ace) == 14 // true\\nordinalRank(false, Ace) == 1 // true",
            "since": "0.0.1",
            "type": "Boolean -> Rank -> Short"
          }
        },
        {
          "js": {
            "name": "toOrdinal",
            "description": "Convert a Rank to a numeric value, assuming ace-high evaluation",
            "example": "import { Ace, ordinalRank } from \\"Gambit\\"\\ntoOrdinal(Ace) == 14 // true",
            "since": "0.0.1",
            "type": "Rank -> Short"
          },
          "llvm": {
            "name": "toOrdinal",
            "description": "Convert a Rank to a numeric value, assuming ace-high evaluation",
            "example": "import { Ace, ordinalRank } from \\"Gambit\\"\\ntoOrdinal(Ace) == 14 // true",
            "since": "0.0.1",
            "type": "Rank -> Short"
          }
        },
        {
          "js": {
            "name": "toOrdinalLow",
            "description": "Convert a Rank to a numeric value, assuming ace-low evaluation",
            "example": "import { Ace, ordinalRank } from \\"Gambit\\"\\ntoOrdinal(Ace) == 1 // true",
            "since": "0.0.1",
            "type": "Rank -> Short"
          },
          "llvm": {
            "name": "toOrdinalLow",
            "description": "Convert a Rank to a numeric value, assuming ace-low evaluation",
            "example": "import { Ace, ordinalRank } from \\"Gambit\\"\\ntoOrdinal(Ace) == 1 // true",
            "since": "0.0.1",
            "type": "Rank -> Short"
          }
        },
        {
          "js": {
            "name": "rankFrom",
            "description": "Convert a Short numeric value to a Rank",
            "example": "import { Ace, rankFrom } from \\"Gambit\\"\\nrankFrom(1) == Ace // true",
            "since": "0.0.1",
            "type": "Short -> Rank"
          },
          "llvm": {
            "name": "rankFrom",
            "description": "Convert a Short numeric value to a Rank",
            "example": "import { Ace, rankFrom } from \\"Gambit\\"\\nrankFrom(1) == Ace // true",
            "since": "0.0.1",
            "type": "Short -> Rank"
          }
        },
        {
          "js": {
            "name": "isSuit",
            "description": "Test whether a Card has a given Suit",
            "example": "import { isSuit, Clubs, club, Ace } from \\"Gambit\\"\\nisSuit(Clubs, club(Ace)) // true",
            "since": "0.0.1",
            "type": "Suit -> Card -> Boolean"
          },
          "llvm": {
            "name": "isSuit",
            "description": "Test whether a Card has a given Suit",
            "example": "import { isSuit, Clubs, club, Ace } from \\"Gambit\\"\\nisSuit(Clubs, club(Ace)) // true",
            "since": "0.0.1",
            "type": "Suit -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "isRank",
            "description": "Test whether a Card has a given Rank",
            "example": "import { isRank, club, Ace } from \\"Gambit\\"\\nisRank(Ace, club(Ace)) // true",
            "since": "0.0.1",
            "type": "Rank -> Card -> Boolean"
          },
          "llvm": {
            "name": "isRank",
            "description": "Test whether a Card has a given Rank",
            "example": "import { isRank, club, Ace } from \\"Gambit\\"\\nisRank(Ace, club(Ace)) // true",
            "since": "0.0.1",
            "type": "Rank -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "match",
            "description": "Test whether a Card has a given Suit and Rank",
            "example": "import { match, Clubs, Ace, club } from \\"Gambit\\"\\nmatch(Clubs, Ace, club(Ace)) // true",
            "since": "0.0.1",
            "type": "Suit -> Rank -> Card -> Boolean"
          },
          "llvm": {
            "name": "match",
            "description": "Test whether a Card has a given Suit and Rank",
            "example": "import { match, Clubs, Ace, club } from \\"Gambit\\"\\nmatch(Clubs, Ace, club(Ace)) // true",
            "since": "0.0.1",
            "type": "Suit -> Rank -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "sameCard",
            "description": "Test whether two Cards are the same",
            "example": "import { sameCard, Card, King, Ace, Clubs } from \\"Gambit\\"\\nsameCard(Card(Clubs, Ace), Card(Clubs, King)) // false",
            "since": "0.0.1",
            "type": "Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "sameCard",
            "description": "Test whether two Cards are the same",
            "example": "import { sameCard, Card, King, Ace, Clubs } from \\"Gambit\\"\\nsameCard(Card(Clubs, Ace), Card(Clubs, King)) // false",
            "since": "0.0.1",
            "type": "Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "sameSuit",
            "description": "Test whether two Cards of the same Suit",
            "example": "import { sameSuit, club, Ace, King } from \\"Gambit\\"\\nsameSuit(club(Ace), club(King)) // true",
            "since": "0.0.1",
            "type": "Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "sameSuit",
            "description": "Test whether two Cards of the same Suit",
            "example": "import { sameSuit, club, Ace, King } from \\"Gambit\\"\\nsameSuit(club(Ace), club(King)) // true",
            "since": "0.0.1",
            "type": "Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "sameRank",
            "description": "Test whether two Cards of the same Rank",
            "example": "import { sameRank, spade, club, Ace } from \\"Gambit\\"\\nsameRank(club(Ace), spade(Ace)) // true",
            "since": "0.0.1",
            "type": "Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "sameRank",
            "description": "Test whether two Cards of the same Rank",
            "example": "import { sameRank, spade, club, Ace } from \\"Gambit\\"\\nsameRank(club(Ace), spade(Ace)) // true",
            "since": "0.0.1",
            "type": "Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "consecutiveTo",
            "description": "Test whether two Cards are consecutive to each other,\\nwith respect to ace-high evaluation.",
            "example": "import { consecutiveTo, Ace, King, club } from \\"Gambit\\"\\nconsecutiveTo(true, club(Ace), club(King)) // true",
            "since": "0.0.1",
            "type": "Boolean -> Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "consecutiveTo",
            "description": "Test whether two Cards are consecutive to each other,\\nwith respect to ace-high evaluation.",
            "example": "import { consecutiveTo, Ace, King, club } from \\"Gambit\\"\\nconsecutiveTo(true, club(Ace), club(King)) // true",
            "since": "0.0.1",
            "type": "Boolean -> Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "consecutiveAceHigh",
            "description": "Test whether two Cards are consecutive to each other,\\nassuming ace-high evaluation.",
            "example": "import { consecutiveAceHigh, Ace, King, club } from \\"Gambit\\"\\nconsecutiveAceHigh(club(Ace), club(King)) // true",
            "since": "0.0.1",
            "type": "Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "consecutiveAceHigh",
            "description": "Test whether two Cards are consecutive to each other,\\nassuming ace-high evaluation.",
            "example": "import { consecutiveAceHigh, Ace, King, club } from \\"Gambit\\"\\nconsecutiveAceHigh(club(Ace), club(King)) // true",
            "since": "0.0.1",
            "type": "Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "consecutiveAceLow",
            "description": "Test whether two Cards are consecutive to each other,\\nassuming ace-low evaluation.",
            "example": "import { consecutiveAceLow, Ace, King, club } from \\"Gambit\\"\\nconsecutiveAceHigh(club(Ace), club(King)) // false",
            "since": "0.0.1",
            "type": "Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "consecutiveAceLow",
            "description": "Test whether two Cards are consecutive to each other,\\nassuming ace-low evaluation.",
            "example": "import { consecutiveAceLow, Ace, King, club } from \\"Gambit\\"\\nconsecutiveAceHigh(club(Ace), club(King)) // false",
            "since": "0.0.1",
            "type": "Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "consecutiveFlush",
            "description": "Test whether two Cards are of the same suit and consecutive to each other,\\nwith respect to ace-high evaluation.",
            "example": "import { consecutiveFlush, Ace, King, club, spade } from \\"Gambit\\"\\nconsecutiveFlush(true, club(Ace), club(King)) // true\\nconsecutiveFlush(true, club(Ace), spade(King)) // false",
            "since": "0.0.1",
            "type": "Boolean -> Card -> Card -> Boolean"
          },
          "llvm": {
            "name": "consecutiveFlush",
            "description": "Test whether two Cards are of the same suit and consecutive to each other,\\nwith respect to ace-high evaluation.",
            "example": "import { consecutiveFlush, Ace, King, club, spade } from \\"Gambit\\"\\nconsecutiveFlush(true, club(Ace), club(King)) // true\\nconsecutiveFlush(true, club(Ace), spade(King)) // false",
            "since": "0.0.1",
            "type": "Boolean -> Card -> Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "isNoFaceCard",
            "description": "Test whether a given Card is not a face card (Ace / King / Queen / Jack)",
            "example": "import { club, Ace, isNoFaceCard } from \\"Gambit\\"\\nisNoFaceCard(club(Ace)) // false",
            "since": "0.0.1",
            "type": "Card -> Boolean"
          },
          "llvm": {
            "name": "isNoFaceCard",
            "description": "Test whether a given Card is not a face card (Ace / King / Queen / Jack)",
            "example": "import { club, Ace, isNoFaceCard } from \\"Gambit\\"\\nisNoFaceCard(club(Ace)) // false",
            "since": "0.0.1",
            "type": "Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "isFaceCard",
            "description": "Test whether a given Card is a face card (Ace / King / Queen / Jack)\\nand not a Wildcard or card of InvalidRank",
            "example": "import { club, Ace, isFaceCard } from \\"Gambit\\"\\nisFaceCard(club(Ace)) // true",
            "since": "0.0.1",
            "type": "Card -> Boolean"
          },
          "llvm": {
            "name": "isFaceCard",
            "description": "Test whether a given Card is a face card (Ace / King / Queen / Jack)\\nand not a Wildcard or card of InvalidRank",
            "example": "import { club, Ace, isFaceCard } from \\"Gambit\\"\\nisFaceCard(club(Ace)) // true",
            "since": "0.0.1",
            "type": "Card -> Boolean"
          }
        },
        {
          "js": {
            "name": "isNonStandardRank",
            "description": "Test whether a given Card is a Wildcard or Card of InvalidRank",
            "example": "import { club, Ace, isNonStandardRank } from \\"Gambit\\"\\nisNonStandardRank(club(Ace)) // false",
            "since": "0.0.1",
            "type": "Card -> Boolean"
          },
          "llvm": {
            "name": "isNonStandardRank",
            "description": "Test whether a given Card is a Wildcard or Card of InvalidRank",
            "example": "import { club, Ace, isNonStandardRank } from \\"Gambit\\"\\nisNonStandardRank(club(Ace)) // false",
            "since": "0.0.1",
            "type": "Card -> Boolean"
          }
        }
      ]
    }
  ]
}
`;
  var _1fda7_textWithLength__431 = (i) => (s) => ((__x__) => {
    if (__x__ === "") {
      return _1fda7_EmptyDoc;
    } else if (true) {
      let or = __x__;
      return _1fda7_TextDoc(i)(or);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(s);
  var _1fda7_nest__446 = (i) => (x) => _1fda7_NestDoc(i)((_) => x);
  var _1fda7_linebreak__433 = _1fda7_LineDoc(true);
  var _1fda7_line__437 = _1fda7_LineDoc(false);
  var _1fda7_flatten__448 = (doc) => {
    let $_result_;
    let $_continue_ = true;
    let $$doc = doc;
    while ($_continue_) {
      let $doc = $$doc;
      $_continue_ = false;
      ((__x__) => {
        if (__x__.__constructor === "CatDoc" && true && true) {
          let x = __x__.__args[0];
          let y = __x__.__args[1];
          $_result_ = _1fda7_CatDoc((_) => _1fda7_flatten__448(x()))((_) => _1fda7_flatten__448(y()));
        } else if (__x__.__constructor === "NestDoc" && true && true) {
          let i = __x__.__args[0];
          let x = __x__.__args[1];
          $_result_ = _1fda7_NestDoc(i)((_) => _1fda7_flatten__448(x()));
        } else if (__x__.__constructor === "LineDoc" && true) {
          let _$_break_$_ = __x__.__args[0];
          _$_break_$_ ? $_result_ = _1fda7_EmptyDoc : $_result_ = _1fda7_TextDoc(1)(` `);
        } else if (__x__.__constructor === "UnionDoc" && true && true) {
          let x = __x__.__args[0];
          let y = __x__.__args[1];
          $$doc = x, $_continue_ = true;
        } else if (__x__.__constructor === "ColumnDoc" && true) {
          let f = __x__.__args[0];
          $_result_ = _1fda7_ColumnDoc((__P__1) => _1fda7_flatten__448(f(__P__1)));
        } else if (__x__.__constructor === "NestingDoc" && true) {
          let f = __x__.__args[0];
          $_result_ = _1fda7_NestingDoc((__P__2) => _1fda7_flatten__448(f(__P__2)));
        } else if (true) {
          let or = __x__;
          $_result_ = or;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($doc);
    }
    return $_result_;
  };
  var _1fda7_group__447 = (x) => _1fda7_UnionDoc(_1fda7_flatten__448(x))(x);
  var _1fda7_softline__454 = _1fda7_group__447(_1fda7_line__437);
  var _1fda7_fits__472 = (w) => (simpleDoc) => {
    let $_result_;
    let $_continue_ = true;
    let $$w = w;
    let $$simpleDoc = simpleDoc;
    while ($_continue_) {
      let $w = $$w;
      let $simpleDoc = $$simpleDoc;
      $_continue_ = false;
      $w < 0 ? $_result_ = false : ((__x__) => {
        if (__x__.__constructor === "SEmpty") {
          $_result_ = true;
        } else if (__x__.__constructor === "SChar" && true && true) {
          let x = __x__.__args[1];
          $$w = $w - 1, $$simpleDoc = x, $_continue_ = true;
        } else if (__x__.__constructor === "SText" && true && true && true) {
          let l = __x__.__args[0];
          let x = __x__.__args[2];
          $$w = $w - l, $$simpleDoc = x(), $_continue_ = true;
        } else if (__x__.__constructor === "SLine" && true && true) {
          $_result_ = true;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($simpleDoc);
    }
    return $_result_;
  };
  var _1fda7_renderPretty__470 = (_) => (w) => (doc) => {
    let r;
    r = w;
    let nicest__0;
    nicest__0 = (n) => (k) => (x) => (y) => {
      let width;
      width = _801bd_min__471(w - k)(r - k + n);
      return _1fda7_fits__472(width)(x) ? x : y();
    };
    let best__0;
    best__0 = (n) => (k) => (docs) => {
      let $_result_;
      let $_continue_ = true;
      let $_start_ = { __args: [] };
      let $args = $_start_.__args;
      let $index = 0;
      let $newValue;
      let $$n = n;
      let $$k = k;
      let $$docs = docs;
      while ($_continue_) {
        let $n = $$n;
        let $k = $$k;
        let $docs = $$docs;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $args[$index] = _1fda7_SEmpty, $_result_ = $_start_.__args[0];
          } else if (__x__ !== null && __x__.v.length === 2 && true && true && true) {
            let { v: [i, d], n: ds } = __x__;
            ((__x__2) => {
              if (__x__2.__constructor === "EmptyDoc") {
                $$n = $n, $$k = $k, $$docs = ds, $_continue_ = true;
              } else if (__x__2.__constructor === "CharDoc" && true) {
                let c = __x__2.__args[0];
                $newValue = { __constructor: "SChar", __args: [] }, $newValue.__args.push(c), $newValue.__args.push(null), $args[$index] = $newValue, $args = $newValue.__args, $index = 1, $$n = $n, $$k = $k + 1, $$docs = ds, $_continue_ = true;
              } else if (__x__2.__constructor === "TextDoc" && true && true) {
                let l = __x__2.__args[0];
                let s = __x__2.__args[1];
                $args[$index] = _1fda7_SText(l)(s)((_2) => best__0($n)($k + l)(ds)), $_result_ = $_start_.__args[0];
              } else if (__x__2.__constructor === "LineDoc" && true) {
                $newValue = { __constructor: "SLine", __args: [] }, $newValue.__args.push(i), $newValue.__args.push(null), $args[$index] = $newValue, $args = $newValue.__args, $index = 1, $$n = i, $$k = i, $$docs = ds, $_continue_ = true;
              } else if (__x__2.__constructor === "CatDoc" && true && true) {
                let x = __x__2.__args[0];
                let y = __x__2.__args[1];
                $$n = $n, $$k = $k, $$docs = { v: [i, x()], n: { v: [i, y()], n: ds } }, $_continue_ = true;
              } else if (__x__2.__constructor === "NestDoc" && true && true) {
                let j = __x__2.__args[0];
                let x = __x__2.__args[1];
                $$n = $n, $$k = $k, $$docs = { v: [i + j, x()], n: ds }, $_continue_ = true;
              } else if (__x__2.__constructor === "UnionDoc" && true && true) {
                let x = __x__2.__args[0];
                let y = __x__2.__args[1];
                $args[$index] = nicest__0($n)($k)(best__0($n)($k)({ v: [i, x], n: ds }))((_2) => best__0($n)($k)({ v: [i, y], n: ds })), $_result_ = $_start_.__args[0];
              } else if (__x__2.__constructor === "ColumnDoc" && true) {
                let f = __x__2.__args[0];
                $$n = $n, $$k = $k, $$docs = { v: [i, f($k)], n: ds }, $_continue_ = true;
              } else if (__x__2.__constructor === "NestingDoc" && true) {
                let f = __x__2.__args[0];
                $$n = $n, $$k = $k, $$docs = { v: [i, f(i)], n: ds }, $_continue_ = true;
              } else {
                console.log("non exhaustive patterns for value: ", __x__2.toString());
                console.trace();
                throw "non exhaustive patterns!";
              }
            })(d);
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($docs);
      }
      return $_result_;
    };
    return best__0(0)(0)({ v: [0, doc], n: null });
  };
  var _1fda7_empty__439 = _1fda7_EmptyDoc;
  var _1fda7_char__436 = (c) => ((__x__) => {
    if (__x__ === String.fromCodePoint(10)) {
      return _1fda7_line__437;
    } else if (true) {
      let or = __x__;
      return _1fda7_CharDoc(or);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(c);
  var _1fda7_colon__460 = _1fda7_char__436(String.fromCodePoint(58));
  var _1fda7_comma__435 = _1fda7_char__436(String.fromCodePoint(44));
  var _1fda7_lbrace__457 = _1fda7_char__436(String.fromCodePoint(123));
  var _1fda7_lbracket__455 = _1fda7_char__436(String.fromCodePoint(91));
  var _1fda7_rbrace__464 = _1fda7_char__436(String.fromCodePoint(125));
  var _1fda7_rbracket__456 = _1fda7_char__436(String.fromCodePoint(93));
  var _1fda7_space__461 = _1fda7_char__436(String.fromCodePoint(32));
  var _1fda7_beside__440 = (x) => (y) => _1fda7_CatDoc((_) => x)((_) => y);
  var _1e6e4_good__596 = (a) => _1e6e4_Wish((_) => (goodCB) => {
    goodCB(a);
    return (_2) => ({ __constructor: "Unit", __args: [] });
  });
  var _1e6e4_pure__595 = (_) => _1e6e4_good__596;
  var _1e6e4_of__594 = (_) => _1e6e4_pure__595();
  var _7e49a_syncAction__600 = (stateUpdate) => (_) => (event) => ({ v: _1e6e4_of__594()((state) => stateUpdate(state)(event)), n: null });
  var _294a4_handleUrlChanged__899 = _7e49a_onUrlChanged__900(_7e49a_syncAction__600((state) => (event) => ((__x__) => {
    if (__x__.__constructor === "PopStateEvent" && true) {
      let { url } = __x__.__args[0];
      return { ...state, path: _2e42b_fromMaybe__261(``)(_50cb0_decode__259(url)) };
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(event)));
  var _913f5_handleTargetChange__599 = (target) => _7e49a_syncAction__600((state) => (_) => ({ ...state, target }));
  var _1e6e4_fulfill__584 = (badCB) => (goodCB) => (m) => ((__x__) => {
    if (__x__.__constructor === "Wish" && true) {
      let run = __x__.__args[0];
      return run(badCB)(goodCB);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(m);
  var _42034_wrapEventHandler__582 = _42034__wrapEventHandler__585(_1e6e4_fulfill__584)(_42034_runAction__583);
  var _1dd2b_reverse__835 = (list) => {
    let helper__0;
    helper__0 = (acc) => (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$acc = acc;
      let $$l = l;
      while ($_continue_) {
        let $acc = $$acc;
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && true) {
            let { v: h2, n: xs } = __x__;
            $$acc = { v: h2, n: $acc }, $$l = xs, $_continue_ = true;
          } else if (__x__ === null) {
            $_result_ = $acc;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return helper__0(null)(list);
  };
  var _a32d2_many__834 = (p) => _a32d2_Parser((s) => (l) => {
    let rest;
    rest = s;
    let loc;
    loc = l;
    let acc;
    acc = null;
    while (((__x__) => {
      if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
        let [{ v: [parsed, r] }, loc_] = __x__;
        return (() => {
          rest = r;
          loc = loc_;
          acc = { v: parsed, n: acc };
          return true;
        })();
      } else if (true) {
        return false;
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(_a32d2_parse__831(p)(rest)(loc))) {
      ({ __constructor: "Unit", __args: [] });
    }
    ;
    return [{ v: [_1dd2b_reverse__835(acc), rest], n: null }, loc];
  });
  var _1dd2b_reverse__770 = (list) => {
    let helper__0;
    helper__0 = (acc) => (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$acc = acc;
      let $$l = l;
      while ($_continue_) {
        let $acc = $$acc;
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && true) {
            let { v: h2, n: xs } = __x__;
            $$acc = { v: h2, n: $acc }, $$l = xs, $_continue_ = true;
          } else if (__x__ === null) {
            $_result_ = $acc;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return helper__0(null)(list);
  };
  var _a32d2_many__769 = (p) => _a32d2_Parser((s) => (l) => {
    let rest;
    rest = s;
    let loc;
    loc = l;
    let acc;
    acc = null;
    while (((__x__) => {
      if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
        let [{ v: [parsed, r] }, loc_] = __x__;
        return (() => {
          rest = r;
          loc = loc_;
          acc = { v: parsed, n: acc };
          return true;
        })();
      } else if (true) {
        return false;
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(_a32d2_parse__743(p)(rest)(loc))) {
      ({ __constructor: "Unit", __args: [] });
    }
    ;
    return [{ v: [_1dd2b_reverse__770(acc), rest], n: null }, loc];
  });
  var _a32d2_some__768 = (p) => _a32d2_chain__773((first) => _a32d2_map__771((rest) => ({ v: first, n: rest }))(_a32d2_many__769(p)))(p);
  var _1dd2b_reverse__740 = (list) => {
    let helper__0;
    helper__0 = (acc) => (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$acc = acc;
      let $$l = l;
      while ($_continue_) {
        let $acc = $$acc;
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && true) {
            let { v: h2, n: xs } = __x__;
            $$acc = { v: h2, n: $acc }, $$l = xs, $_continue_ = true;
          } else if (__x__ === null) {
            $_result_ = $acc;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return helper__0(null)(list);
  };
  var _a32d2_many__739 = (p) => _a32d2_Parser((s) => (l) => {
    let rest;
    rest = s;
    let loc;
    loc = l;
    let acc;
    acc = null;
    while (((__x__) => {
      if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
        let [{ v: [parsed, r] }, loc_] = __x__;
        return (() => {
          rest = r;
          loc = loc_;
          acc = { v: parsed, n: acc };
          return true;
        })();
      } else if (true) {
        return false;
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(_a32d2_parse__698(p)(rest)(loc))) {
      ({ __constructor: "Unit", __args: [] });
    }
    ;
    return [{ v: [_1dd2b_reverse__740(acc), rest], n: null }, loc];
  });
  var _a32d2_some__793 = (p) => _a32d2_chain__795((first) => _a32d2_map__794((rest) => ({ v: first, n: rest }))(_a32d2_many__739(p)))(p);
  var _1dd2b_reverse__442 = (list) => {
    let helper__0;
    helper__0 = (acc) => (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$acc = acc;
      let $$l = l;
      while ($_continue_) {
        let $acc = $$acc;
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && true) {
            let { v: h2, n: xs } = __x__;
            $$acc = { v: h2, n: $acc }, $$l = xs, $_continue_ = true;
          } else if (__x__ === null) {
            $_result_ = $acc;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return helper__0(null)(list);
  };
  var _1dd2b_reverse__401 = (list) => {
    let helper__0;
    helper__0 = (acc) => (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$acc = acc;
      let $$l = l;
      while ($_continue_) {
        let $acc = $$acc;
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && true) {
            let { v: h2, n: xs } = __x__;
            $$acc = { v: h2, n: $acc }, $$l = xs, $_continue_ = true;
          } else if (__x__ === null) {
            $_result_ = $acc;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return helper__0(null)(list);
  };
  var _a32d2_many__400 = (p) => _a32d2_Parser((s) => (l) => {
    let rest;
    rest = s;
    let loc;
    loc = l;
    let acc;
    acc = null;
    while (((__x__) => {
      if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
        let [{ v: [parsed, r] }, loc_] = __x__;
        return (() => {
          rest = r;
          loc = loc_;
          acc = { v: parsed, n: acc };
          return true;
        })();
      } else if (true) {
        return false;
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(_a32d2_parse__394(p)(rest)(loc))) {
      ({ __constructor: "Unit", __args: [] });
    }
    ;
    return [{ v: [_1dd2b_reverse__401(acc), rest], n: null }, loc];
  });
  var _a32d2_sepBy__396 = (parser) => (separator) => _a32d2_alt__407((() => {
    return _a32d2_chain__406((first) => _a32d2_chain__404((rest) => _a32d2_of__402()({ v: first, n: rest }))(_a32d2_many__400(_4be73_andDo__399(parser)(separator))))(parser);
  })())(_a32d2_fail__397);
  var _1dd2b_reverse__363 = (list) => {
    let helper__0;
    helper__0 = (acc) => (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$acc = acc;
      let $$l = l;
      while ($_continue_) {
        let $acc = $$acc;
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && true) {
            let { v: h2, n: xs } = __x__;
            $$acc = { v: h2, n: $acc }, $$l = xs, $_continue_ = true;
          } else if (__x__ === null) {
            $_result_ = $acc;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return helper__0(null)(list);
  };
  var _a32d2_many__362 = (p) => _a32d2_Parser((s) => (l) => {
    let rest;
    rest = s;
    let loc;
    loc = l;
    let acc;
    acc = null;
    while (((__x__) => {
      if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
        let [{ v: [parsed, r] }, loc_] = __x__;
        return (() => {
          rest = r;
          loc = loc_;
          acc = { v: parsed, n: acc };
          return true;
        })();
      } else if (true) {
        return false;
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(_a32d2_parse__355(p)(rest)(loc))) {
      ({ __constructor: "Unit", __args: [] });
    }
    ;
    return [{ v: [_1dd2b_reverse__363(acc), rest], n: null }, loc];
  });
  var _a32d2_sepBy__358 = (parser) => (separator) => _a32d2_alt__369((() => {
    return _a32d2_chain__368((first) => _a32d2_chain__366((rest) => _a32d2_of__364()({ v: first, n: rest }))(_a32d2_many__362(_4be73_andDo__361(parser)(separator))))(parser);
  })())(_a32d2_fail__359);
  var _a32d2_maybeSepBy__357 = (parser) => (sep) => ((__P__2) => ((__$PH3__) => _a32d2_alt__369(__$PH3__)(_a32d2_pure__365(null)))(_a32d2_sepBy__358(parser)(__P__2)))(sep);
  var _1dd2b_reverse__34 = (list) => {
    let helper__0;
    helper__0 = (acc) => (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$acc = acc;
      let $$l = l;
      while ($_continue_) {
        let $acc = $$acc;
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && true) {
            let { v: h2, n: xs } = __x__;
            $$acc = { v: h2, n: $acc }, $$l = xs, $_continue_ = true;
          } else if (__x__ === null) {
            $_result_ = $acc;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return helper__0(null)(list);
  };
  var _a32d2_many__215 = (p) => _a32d2_Parser((s) => (l) => {
    let rest;
    rest = s;
    let loc;
    loc = l;
    let acc;
    acc = null;
    while (((__x__) => {
      if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
        let [{ v: [parsed, r] }, loc_] = __x__;
        return (() => {
          rest = r;
          loc = loc_;
          acc = { v: parsed, n: acc };
          return true;
        })();
      } else if (true) {
        return false;
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(_a32d2_parse__167(p)(rest)(loc))) {
      ({ __constructor: "Unit", __args: [] });
    }
    ;
    return [{ v: [_1dd2b_reverse__34(acc), rest], n: null }, loc];
  });
  var _a32d2_sepBy__211 = (parser) => (separator) => _a32d2_alt__219((() => {
    return _a32d2_chain__218((first) => _a32d2_chain__216((rest) => _a32d2_of__209()({ v: first, n: rest }))(_a32d2_many__215(_4be73_andDo__214(parser)(separator))))(parser);
  })())(_a32d2_fail__212);
  var _1dd2b_reverse__319 = (list) => {
    let helper__0;
    helper__0 = (acc) => (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$acc = acc;
      let $$l = l;
      while ($_continue_) {
        let $acc = $$acc;
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && true) {
            let { v: h2, n: xs } = __x__;
            $$acc = { v: h2, n: $acc }, $$l = xs, $_continue_ = true;
          } else if (__x__ === null) {
            $_result_ = $acc;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return helper__0(null)(list);
  };
  var _a32d2_many__318 = (p) => _a32d2_Parser((s) => (l) => {
    let rest;
    rest = s;
    let loc;
    loc = l;
    let acc;
    acc = null;
    while (((__x__) => {
      if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
        let [{ v: [parsed, r] }, loc_] = __x__;
        return (() => {
          rest = r;
          loc = loc_;
          acc = { v: parsed, n: acc };
          return true;
        })();
      } else if (true) {
        return false;
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(_a32d2_parse__299(p)(rest)(loc))) {
      ({ __constructor: "Unit", __args: [] });
    }
    ;
    return [{ v: [_1dd2b_reverse__319(acc), rest], n: null }, loc];
  });
  var _a32d2_sepBy__329 = (parser) => (separator) => _a32d2_alt__337((() => {
    return _a32d2_chain__336((first) => _a32d2_chain__335((rest) => _a32d2_of__333()({ v: first, n: rest }))(_a32d2_many__318(_4be73_andDo__332(parser)(separator))))(parser);
  })())(_a32d2_fail__330);
  var _a32d2_maybeSepBy__328 = (parser) => (sep) => ((__P__2) => ((__$PH3__) => _a32d2_alt__337(__$PH3__)(_a32d2_pure__334(null)))(_a32d2_sepBy__329(parser)(__P__2)))(sep);
  var _1dd2b_reverse__304 = (list) => {
    let helper__0;
    helper__0 = (acc) => (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$acc = acc;
      let $$l = l;
      while ($_continue_) {
        let $acc = $$acc;
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && true) {
            let { v: h2, n: xs } = __x__;
            $$acc = { v: h2, n: $acc }, $$l = xs, $_continue_ = true;
          } else if (__x__ === null) {
            $_result_ = $acc;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return helper__0(null)(list);
  };
  var _a32d2_many__303 = (p) => _a32d2_Parser((s) => (l) => {
    let rest;
    rest = s;
    let loc;
    loc = l;
    let acc;
    acc = null;
    while (((__x__) => {
      if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
        let [{ v: [parsed, r] }, loc_] = __x__;
        return (() => {
          rest = r;
          loc = loc_;
          acc = { v: parsed, n: acc };
          return true;
        })();
      } else if (true) {
        return false;
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(_a32d2_parse__182(p)(rest)(loc))) {
      ({ __constructor: "Unit", __args: [] });
    }
    ;
    return [{ v: [_1dd2b_reverse__304(acc), rest], n: null }, loc];
  });
  var _1dd2b_reverse__237 = (list) => {
    let helper__0;
    helper__0 = (acc) => (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$acc = acc;
      let $$l = l;
      while ($_continue_) {
        let $acc = $$acc;
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && true) {
            let { v: h2, n: xs } = __x__;
            $$acc = { v: h2, n: $acc }, $$l = xs, $_continue_ = true;
          } else if (__x__ === null) {
            $_result_ = $acc;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return helper__0(null)(list);
  };
  var _a32d2_many__236 = (p) => _a32d2_Parser((s) => (l) => {
    let rest;
    rest = s;
    let loc;
    loc = l;
    let acc;
    acc = null;
    while (((__x__) => {
      if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
        let [{ v: [parsed, r] }, loc_] = __x__;
        return (() => {
          rest = r;
          loc = loc_;
          acc = { v: parsed, n: acc };
          return true;
        })();
      } else if (true) {
        return false;
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(_a32d2_parse__228(p)(rest)(loc))) {
      ({ __constructor: "Unit", __args: [] });
    }
    ;
    return [{ v: [_1dd2b_reverse__237(acc), rest], n: null }, loc];
  });
  var _a32d2_sepBy__232 = (parser) => (separator) => _a32d2_alt__241((() => {
    return _a32d2_chain__240((first) => _a32d2_chain__238((rest) => _a32d2_of__222()({ v: first, n: rest }))(_a32d2_many__236(_4be73_andDo__235(parser)(separator))))(parser);
  })())(_a32d2_fail__233);
  var _1dd2b_reverse__140 = (list) => {
    let helper__0;
    helper__0 = (acc) => (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$acc = acc;
      let $$l = l;
      while ($_continue_) {
        let $acc = $$acc;
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && true) {
            let { v: h2, n: xs } = __x__;
            $$acc = { v: h2, n: $acc }, $$l = xs, $_continue_ = true;
          } else if (__x__ === null) {
            $_result_ = $acc;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return helper__0(null)(list);
  };
  var _a32d2_manyTill__690 = (p) => (end) => _a32d2_Parser((s) => (l) => {
    let result;
    result = _76f3d_maybeLoop__691([s, l, null])((state) => ((__x__) => {
      if (__x__.length === 3 && true && true && true) {
        let [ss, ll, acc] = __x__;
        return ((__x__2) => {
          if (__x__2.length === 2 && __x__2[0] !== null && __x__2[0].v.length === 2 && true && true && __x__2[0].n === null && true) {
            let [{ v: [,] }] = __x__2;
            return _2e42b_Nothing;
          } else if (true) {
            return ((__x__3) => {
              if (__x__3.length === 2 && __x__3[0] !== null && __x__3[0].v.length === 2 && true && true && __x__3[0].n === null && true) {
                let [{ v: [parsed, rest] }, loc] = __x__3;
                return _2e42b_Just([rest, loc, { v: parsed, n: acc }]);
              } else if (true) {
                return _2e42b_Nothing;
              } else {
                console.log("non exhaustive patterns for value: ", __x__3.toString());
                console.trace();
                throw "non exhaustive patterns!";
              }
            })(_a32d2_parse__137(p)(ss)(ll));
          } else {
            console.log("non exhaustive patterns for value: ", __x__2.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })(_a32d2_parse__182(end)(ss)(ll));
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(state));
    return ((__x__) => {
      if (__x__.length === 3 && true && true && true) {
        let [rest, loc, parseResult] = __x__;
        return [{ v: [_1dd2b_reverse__140(parseResult), rest], n: null }, loc];
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(result);
  });
  var _a32d2_many__139 = (p) => _a32d2_Parser((s) => (l) => {
    let rest;
    rest = s;
    let loc;
    loc = l;
    let acc;
    acc = null;
    while (((__x__) => {
      if (__x__.length === 2 && __x__[0] !== null && __x__[0].v.length === 2 && true && true && __x__[0].n === null && true) {
        let [{ v: [parsed, r] }, loc_] = __x__;
        return (() => {
          rest = r;
          loc = loc_;
          acc = { v: parsed, n: acc };
          return true;
        })();
      } else if (true) {
        return false;
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(_a32d2_parse__137(p)(rest)(loc))) {
      ({ __constructor: "Unit", __args: [] });
    }
    ;
    return [{ v: [_1dd2b_reverse__140(acc), rest], n: null }, loc];
  });
  var _a32d2_some__138 = (p) => _a32d2_chain__143((first) => _a32d2_map__141((rest) => ({ v: first, n: rest }))(_a32d2_many__139(p)))(p);
  var _1dd2b_repeat__476 = (a) => (count) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$a = a;
    let $$count = count;
    while ($_continue_) {
      let $a = $$a;
      let $count = $$count;
      $_continue_ = false;
      $count <= 0 ? ($_end_.n = null, $_result_ = $_start_.n) : ($_end_ = $_end_.n = { v: $a }, $$a = $a, $$count = $count - 1, $_continue_ = true);
    }
    return $_result_;
  };
  var _1dd2b_pure__342 = (x) => ({ v: x, n: null });
  var _1dd2b_of__341 = (_) => _1dd2b_pure__342;
  var _1dd2b_map__896 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__888 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__883 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__879 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__877 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__872 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__859 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__858 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__853 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__662 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__643 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__640 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__637 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__634 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__631 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__622 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__620 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__617 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__490 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__488 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__487 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__486 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__485 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__484 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _39ce8_getPossiblePaths__482 = (module) => __listCtorSpread__(_1dd2b_map__484(_8c112_getName__483)(module.expressions), __listCtorSpread__(_1dd2b_map__485((__R__) => __R__.name)(module.typeDeclarations), __listCtorSpread__(_1dd2b_map__486((__R__) => __R__.name)(module.aliases), __listCtorSpread__(_1dd2b_map__487((__R__) => __R__.name)(module.interfaces), _1dd2b_map__488((__R__) => __R__.declaration)(module.instances)))));
  var _1dd2b_map__468 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__463 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_map__434 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: $f(a) }, $$f = $f, $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_mapMaybe__836 = (f) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$f = f;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          ((__x__2) => {
            if (__x__2.__constructor === "Just" && true) {
              let mapped = __x__2.__args[0];
              $_end_ = $_end_.n = { v: mapped }, $$f = $f, $$list = xs, $_continue_ = true;
            } else if (__x__2.__constructor === "Nothing") {
              $$f = $f, $$list = xs, $_continue_ = true;
            } else {
              console.log("non exhaustive patterns for value: ", __x__2.toString());
              console.trace();
              throw "non exhaustive patterns!";
            }
          })($f(a));
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_length__554 = (list) => {
    let helper__0;
    helper__0 = (list_) => (count) => {
      let $_result_;
      let $_continue_ = true;
      let $$list_ = list_;
      let $$count = count;
      while ($_continue_) {
        let $list_ = $$list_;
        let $count = $$count;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_result_ = $count;
          } else if (__x__ !== null && true && true) {
            let { v: a, n: xs } = __x__;
            $$list_ = xs, $$count = $count + 1, $_continue_ = true;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($list_);
      }
      return $_result_;
    };
    return helper__0(list)(0);
  };
  var _1dd2b_length__512 = (list) => {
    let helper__0;
    helper__0 = (list_) => (count) => {
      let $_result_;
      let $_continue_ = true;
      let $$list_ = list_;
      let $$count = count;
      while ($_continue_) {
        let $list_ = $$list_;
        let $count = $$count;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_result_ = $count;
          } else if (__x__ !== null && true && true) {
            let { v: a, n: xs } = __x__;
            $$list_ = xs, $$count = $count + 1, $_continue_ = true;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($list_);
      }
      return $_result_;
    };
    return helper__0(list)(0);
  };
  var _1dd2b_slice__511 = (start) => (end) => (list) => {
    let len;
    len = _1dd2b_length__512(list);
    let helper__0;
    helper__0 = (start_) => (end_) => (list_) => {
      let $_result_;
      let $_continue_ = true;
      let $_start_ = {};
      let $_end_ = $_start_;
      let $$start_ = start_;
      let $$end_ = end_;
      let $$list_ = list_;
      while ($_continue_) {
        let $start_ = $$start_;
        let $end_ = $$end_;
        let $list_ = $$list_;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_end_.n = null, $_result_ = $_start_.n;
          } else if (__x__ !== null && true && true) {
            let { v: a, n: xs } = __x__;
            __eq__($start_, 0) && $end_ >= 0 ? ($_end_ = $_end_.n = { v: a }, $$start_ = 0, $$end_ = $end_ - 1, $$list_ = xs, $_continue_ = true) : $start_ > 0 ? ($$start_ = $start_ - 1, $$end_ = $end_ - 1, $$list_ = xs, $_continue_ = true) : ($_end_.n = null, $_result_ = $_start_.n);
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($list_);
      }
      return $_result_;
    };
    let realStart;
    realStart = start < 0 ? start + len : start;
    let realEnd;
    realEnd = __eq__(end, 0) ? len - 1 : end < 0 ? end + len - 1 : end;
    return helper__0(realStart)(realEnd)(list);
  };
  var _1dd2b_length__451 = (list) => {
    let helper__0;
    helper__0 = (list_) => (count) => {
      let $_result_;
      let $_continue_ = true;
      let $$list_ = list_;
      let $$count = count;
      while ($_continue_) {
        let $list_ = $$list_;
        let $count = $$count;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_result_ = $count;
          } else if (__x__ !== null && true && true) {
            let { v: a, n: xs } = __x__;
            $$list_ = xs, $$count = $count + 1, $_continue_ = true;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($list_);
      }
      return $_result_;
    };
    return helper__0(list)(0);
  };
  var _1dd2b_slice__450 = (start) => (end) => (list) => {
    let len;
    len = _1dd2b_length__451(list);
    let helper__0;
    helper__0 = (start_) => (end_) => (list_) => {
      let $_result_;
      let $_continue_ = true;
      let $_start_ = {};
      let $_end_ = $_start_;
      let $$start_ = start_;
      let $$end_ = end_;
      let $$list_ = list_;
      while ($_continue_) {
        let $start_ = $$start_;
        let $end_ = $$end_;
        let $list_ = $$list_;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_end_.n = null, $_result_ = $_start_.n;
          } else if (__x__ !== null && true && true) {
            let { v: a, n: xs } = __x__;
            __eq__($start_, 0) && $end_ >= 0 ? ($_end_ = $_end_.n = { v: a }, $$start_ = 0, $$end_ = $end_ - 1, $$list_ = xs, $_continue_ = true) : $start_ > 0 ? ($$start_ = $start_ - 1, $$end_ = $end_ - 1, $$list_ = xs, $_continue_ = true) : ($_end_.n = null, $_result_ = $_start_.n);
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($list_);
      }
      return $_result_;
    };
    let realStart;
    realStart = start < 0 ? start + len : start;
    let realEnd;
    realEnd = __eq__(end, 0) ? len - 1 : end < 0 ? end + len - 1 : end;
    return helper__0(realStart)(realEnd)(list);
  };
  var _1dd2b_take__449 = (n) => (list) => _1dd2b_slice__450(0)(n - 1)(list);
  var _1dd2b_last__535 = (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$list = list;
    while ($_continue_) {
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && __x__.n === null) {
          let { v: item } = __x__;
          $_result_ = _2e42b_Just(item);
        } else if (__x__ === null) {
          $_result_ = _2e42b_Nothing;
        } else if (__x__ !== null && true && __x__.n !== null && true && true) {
          let { n: { v: a, n: xs } } = __x__;
          $$list = { v: a, n: xs }, $_continue_ = true;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_isEmpty__644 = (xs) => ((__x__) => {
    if (__x__ === null) {
      return true;
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(xs);
  var _1dd2b_isEmpty__524 = (xs) => ((__x__) => {
    if (__x__ === null) {
      return true;
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(xs);
  var _1dd2b_isEmpty__523 = (xs) => ((__x__) => {
    if (__x__ === null) {
      return true;
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(xs);
  var _1dd2b_isEmpty__522 = (xs) => ((__x__) => {
    if (__x__ === null) {
      return true;
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(xs);
  var _1dd2b_isEmpty__521 = (xs) => ((__x__) => {
    if (__x__ === null) {
      return true;
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(xs);
  var _1dd2b_isEmpty__520 = (xs) => ((__x__) => {
    if (__x__ === null) {
      return true;
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(xs);
  var _39ce8_emptyPaths__519 = (module) => !_1dd2b_isEmpty__524(module.expressions) || !_1dd2b_isEmpty__523(module.typeDeclarations) || !_1dd2b_isEmpty__522(module.aliases) || !_1dd2b_isEmpty__521(module.interfaces) || !_1dd2b_isEmpty__520(module.instances);
  var _1dd2b_isEmpty__452 = (xs) => ((__x__) => {
    if (__x__ === null) {
      return true;
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(xs);
  var _1dd2b_isEmpty__432 = (xs) => ((__x__) => {
    if (__x__ === null) {
      return true;
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(xs);
  var _1dd2b_intersperse__445 = (a) => (xs) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$a = a;
    let $$xs = xs;
    while ($_continue_) {
      let $a = $$a;
      let $xs = $$xs;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && __x__.n === null) {
          let { v: one } = __x__;
          $_end_.n = { v: one, n: null }, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && __x__.n !== null && true && __x__.n.n === null) {
          let { v: one, n: { v: two } } = __x__;
          $_end_.n = { v: one, n: { v: $a, n: { v: two, n: null } } }, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: one, n: rest } = __x__;
          $_end_.n = { v: one, n: { v: $a } }, $_end_ = $_end_.n.n, $$a = $a, $$xs = rest, $_continue_ = true;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($xs);
    }
    return $_result_;
  };
  var _1dd2b_intersperse__428 = (a) => (xs) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$a = a;
    let $$xs = xs;
    while ($_continue_) {
      let $a = $$a;
      let $xs = $$xs;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && __x__.n === null) {
          let { v: one } = __x__;
          $_end_.n = { v: one, n: null }, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && __x__.n !== null && true && __x__.n.n === null) {
          let { v: one, n: { v: two } } = __x__;
          $_end_.n = { v: one, n: { v: $a, n: { v: two, n: null } } }, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: one, n: rest } = __x__;
          $_end_.n = { v: one, n: { v: $a } }, $_end_ = $_end_.n.n, $$a = $a, $$xs = rest, $_continue_ = true;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($xs);
    }
    return $_result_;
  };
  var _1dd2b_intersperseWithIndex__663 = (f) => (list) => {
    let go__0;
    go__0 = (i) => (xs) => {
      let $_result_;
      let $_continue_ = true;
      let $_start_ = {};
      let $_end_ = $_start_;
      let $$i = i;
      let $$xs = xs;
      while ($_continue_) {
        let $i = $$i;
        let $xs = $$xs;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_end_.n = null, $_result_ = $_start_.n;
          } else if (__x__ !== null && true && __x__.n === null) {
            let { v: one } = __x__;
            $_end_.n = { v: one, n: null }, $_result_ = $_start_.n;
          } else if (__x__ !== null && true && __x__.n !== null && true && __x__.n.n === null) {
            let { v: one, n: { v: two } } = __x__;
            $_end_.n = { v: one, n: { v: f($i), n: { v: two, n: null } } }, $_result_ = $_start_.n;
          } else if (__x__ !== null && true && true) {
            let { v: one, n: rest } = __x__;
            $_end_.n = { v: one, n: { v: f($i) } }, $_end_ = $_end_.n.n, $$i = $i + 1, $$xs = rest, $_continue_ = true;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($xs);
      }
      return $_result_;
    };
    return go__0(0)(list);
  };
  var _1dd2b_includes__122 = (x) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$x = x;
    let $$list = list;
    while ($_continue_) {
      let $x = $$x;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_result_ = false;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          __eq__(a, $x) ? $_result_ = true : ($$x = $x, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_flatten__623 = (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$list = list;
    while ($_continue_) {
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else if (__x__ !== null && __x__.v === null && true) {
          let { n: vs } = __x__;
          $$list = vs, $_continue_ = true;
        } else if (__x__ !== null && __x__.v !== null && true && true && true) {
          let { v: { v: x, n: xs }, n: vs } = __x__;
          $_end_ = $_end_.n = { v: x }, $$list = { v: xs, n: vs }, $_continue_ = true;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_first__530 = (list) => ((__x__) => {
    if (__x__ === null) {
      return _2e42b_Nothing;
    } else if (__x__ !== null && true && true) {
      let { v: a } = __x__;
      return _2e42b_Just(a);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(list);
  var _1dd2b_first__513 = (list) => ((__x__) => {
    if (__x__ === null) {
      return _2e42b_Nothing;
    } else if (__x__ !== null && true && true) {
      let { v: a } = __x__;
      return _2e42b_Just(a);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(list);
  var _1dd2b_find__548 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_result_ = _2e42b_Nothing;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? $_result_ = _2e42b_Just(a) : ($$predicate = $predicate, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_find__545 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_result_ = _2e42b_Nothing;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? $_result_ = _2e42b_Just(a) : ($$predicate = $predicate, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_find__542 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_result_ = _2e42b_Nothing;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? $_result_ = _2e42b_Just(a) : ($$predicate = $predicate, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_find__539 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_result_ = _2e42b_Nothing;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? $_result_ = _2e42b_Just(a) : ($$predicate = $predicate, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_find__536 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_result_ = _2e42b_Nothing;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? $_result_ = _2e42b_Just(a) : ($$predicate = $predicate, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_filter__642 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? ($_end_ = $_end_.n = { v: a }, $$predicate = $predicate, $$list = xs, $_continue_ = true) : ($$predicate = $predicate, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_filter__639 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? ($_end_ = $_end_.n = { v: a }, $$predicate = $predicate, $$list = xs, $_continue_ = true) : ($$predicate = $predicate, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_filter__636 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? ($_end_ = $_end_.n = { v: a }, $$predicate = $predicate, $$list = xs, $_continue_ = true) : ($$predicate = $predicate, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_filter__633 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? ($_end_ = $_end_.n = { v: a }, $$predicate = $predicate, $$list = xs, $_continue_ = true) : ($$predicate = $predicate, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_filter__619 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? ($_end_ = $_end_.n = { v: a }, $$predicate = $predicate, $$list = xs, $_continue_ = true) : ($$predicate = $predicate, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_filter__527 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? ($_end_ = $_end_.n = { v: a }, $$predicate = $predicate, $$list = xs, $_continue_ = true) : ($$predicate = $predicate, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_filter__507 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? ($_end_ = $_end_.n = { v: a }, $$predicate = $predicate, $$list = xs, $_continue_ = true) : ($$predicate = $predicate, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_drop__510 = (n) => (list) => _1dd2b_slice__511(n)(0)(list);
  var _1dd2b_drop__453 = (n) => (list) => _1dd2b_slice__450(n)(0)(list);
  var _1dd2b_dropWhile__797 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_result_ = null;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $predicate(a) ? ($$predicate = $predicate, $$list = xs, $_continue_ = true) : $_result_ = { v: a, n: xs };
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_chain__621 = (f) => (xs) => ((__P__4) => _1dd2b_flatten__623(_1dd2b_map__622(f)(__P__4)))(xs);
  var _1dd2b_descending__628 = (compareFn) => (a) => (as) => (xs) => {
    let $_result_;
    let $_continue_ = true;
    let $$compareFn = compareFn;
    let $$a = a;
    let $$as = as;
    let $$xs = xs;
    while ($_continue_) {
      let $compareFn = $$compareFn;
      let $a = $$a;
      let $as = $$as;
      let $xs = $$xs;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: b, n: bs } = __x__;
          __eq__($compareFn($a)(b), _10f79_GT) ? ($$compareFn = $compareFn, $$a = b, $$as = { v: $a, n: $as }, $$xs = bs, $_continue_ = true) : $_result_ = { v: { v: $a, n: $as }, n: _1dd2b_sequences__627($compareFn)($xs) };
        } else if (true) {
          $_result_ = { v: { v: $a, n: $as }, n: _1dd2b_sequences__627($compareFn)($xs) };
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($xs);
    }
    return $_result_;
  };
  var _1dd2b_ascending__629 = (compareFn) => (a) => (as) => (xs) => {
    let $_result_;
    let $_continue_ = true;
    let $$compareFn = compareFn;
    let $$a = a;
    let $$as = as;
    let $$xs = xs;
    while ($_continue_) {
      let $compareFn = $$compareFn;
      let $a = $$a;
      let $as = $$as;
      let $xs = $$xs;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: b, n: bs } = __x__;
          !__eq__($compareFn($a)(b), _10f79_GT) ? ($$compareFn = $compareFn, $$a = b, $$as = (ys) => $as({ v: $a, n: ys }), $$xs = bs, $_continue_ = true) : $_result_ = { v: $as({ v: $a, n: null }), n: _1dd2b_sequences__627($compareFn)($xs) };
        } else if (true) {
          $_result_ = { v: $as({ v: $a, n: null }), n: _1dd2b_sequences__627($compareFn)($xs) };
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($xs);
    }
    return $_result_;
  };
  var _1dd2b_sequences__627 = (compareFn) => (list) => ((__x__) => {
    if (__x__ !== null && true && __x__.n !== null && true && true) {
      let { v: a, n: { v: b, n: xs } } = __x__;
      return __eq__(compareFn(a)(b), _10f79_GT) ? _1dd2b_descending__628(compareFn)(b)({ v: a, n: null })(xs) : _1dd2b_ascending__629(compareFn)(b)((l) => ({ v: a, n: l }))(xs);
    } else if (true) {
      let xs = __x__;
      return { v: xs, n: null };
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(list);
  var _1dd2b_sortBy__626 = (compareFn) => (list) => {
    let merge__0;
    merge__0 = (listA) => (listB) => {
      let $_result_;
      let $_continue_ = true;
      let $_start_ = {};
      let $_end_ = $_start_;
      let $$listA = listA;
      let $$listB = listB;
      while ($_continue_) {
        let $listA = $$listA;
        let $listB = $$listB;
        $_continue_ = false;
        ((__x__) => {
          if (__x__.length === 2 && __x__[0] !== null && true && true && __x__[1] !== null && true && true) {
            let [{ v: a, n: as }, { v: b, n: bs }] = __x__;
            __eq__(compareFn(a)(b), _10f79_GT) ? ($_end_ = $_end_.n = { v: b }, $$listA = $listA, $$listB = bs, $_continue_ = true) : ($_end_ = $_end_.n = { v: a }, $$listA = as, $$listB = $listB, $_continue_ = true);
          } else if (__x__.length === 2 && __x__[0] === null && true) {
            let [, bs] = __x__;
            $_end_.n = bs, $_result_ = $_start_.n;
          } else if (__x__.length === 2 && true && __x__[1] === null) {
            let [as] = __x__;
            $_end_.n = as, $_result_ = $_start_.n;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })([$listA, $listB]);
      }
      return $_result_;
    };
    let mergePairs__0;
    mergePairs__0 = (l) => {
      let $_result_;
      let $_continue_ = true;
      let $_start_ = {};
      let $_end_ = $_start_;
      let $$l = l;
      while ($_continue_) {
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && __x__.n !== null && true && true) {
            let { v: a, n: { v: b, n: xs } } = __x__;
            $_end_ = $_end_.n = { v: merge__0(a)(b) }, $$l = xs, $_continue_ = true;
          } else if (true) {
            let xs = __x__;
            $_end_.n = xs, $_result_ = $_start_.n;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    let mergeAll__0;
    mergeAll__0 = (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$l = l;
      while ($_continue_) {
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && __x__.n === null) {
            let { v: x } = __x__;
            $_result_ = x;
          } else if (true) {
            let xs = __x__;
            $$l = mergePairs__0(xs), $_continue_ = true;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return ((__P__3) => mergeAll__0(_1dd2b_sequences__627(compareFn)(__P__3)))(list);
  };
  var _1dd2b_descending__609 = (compareFn) => (a) => (as) => (xs) => {
    let $_result_;
    let $_continue_ = true;
    let $$compareFn = compareFn;
    let $$a = a;
    let $$as = as;
    let $$xs = xs;
    while ($_continue_) {
      let $compareFn = $$compareFn;
      let $a = $$a;
      let $as = $$as;
      let $xs = $$xs;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: b, n: bs } = __x__;
          __eq__($compareFn($a)(b), _10f79_GT) ? ($$compareFn = $compareFn, $$a = b, $$as = { v: $a, n: $as }, $$xs = bs, $_continue_ = true) : $_result_ = { v: { v: $a, n: $as }, n: _1dd2b_sequences__608($compareFn)($xs) };
        } else if (true) {
          $_result_ = { v: { v: $a, n: $as }, n: _1dd2b_sequences__608($compareFn)($xs) };
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($xs);
    }
    return $_result_;
  };
  var _1dd2b_ascending__610 = (compareFn) => (a) => (as) => (xs) => {
    let $_result_;
    let $_continue_ = true;
    let $$compareFn = compareFn;
    let $$a = a;
    let $$as = as;
    let $$xs = xs;
    while ($_continue_) {
      let $compareFn = $$compareFn;
      let $a = $$a;
      let $as = $$as;
      let $xs = $$xs;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: b, n: bs } = __x__;
          !__eq__($compareFn($a)(b), _10f79_GT) ? ($$compareFn = $compareFn, $$a = b, $$as = (ys) => $as({ v: $a, n: ys }), $$xs = bs, $_continue_ = true) : $_result_ = { v: $as({ v: $a, n: null }), n: _1dd2b_sequences__608($compareFn)($xs) };
        } else if (true) {
          $_result_ = { v: $as({ v: $a, n: null }), n: _1dd2b_sequences__608($compareFn)($xs) };
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($xs);
    }
    return $_result_;
  };
  var _1dd2b_sequences__608 = (compareFn) => (list) => ((__x__) => {
    if (__x__ !== null && true && __x__.n !== null && true && true) {
      let { v: a, n: { v: b, n: xs } } = __x__;
      return __eq__(compareFn(a)(b), _10f79_GT) ? _1dd2b_descending__609(compareFn)(b)({ v: a, n: null })(xs) : _1dd2b_ascending__610(compareFn)(b)((l) => ({ v: a, n: l }))(xs);
    } else if (true) {
      let xs = __x__;
      return { v: xs, n: null };
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(list);
  var _1dd2b_sortBy__607 = (compareFn) => (list) => {
    let merge__0;
    merge__0 = (listA) => (listB) => {
      let $_result_;
      let $_continue_ = true;
      let $_start_ = {};
      let $_end_ = $_start_;
      let $$listA = listA;
      let $$listB = listB;
      while ($_continue_) {
        let $listA = $$listA;
        let $listB = $$listB;
        $_continue_ = false;
        ((__x__) => {
          if (__x__.length === 2 && __x__[0] !== null && true && true && __x__[1] !== null && true && true) {
            let [{ v: a, n: as }, { v: b, n: bs }] = __x__;
            __eq__(compareFn(a)(b), _10f79_GT) ? ($_end_ = $_end_.n = { v: b }, $$listA = $listA, $$listB = bs, $_continue_ = true) : ($_end_ = $_end_.n = { v: a }, $$listA = as, $$listB = $listB, $_continue_ = true);
          } else if (__x__.length === 2 && __x__[0] === null && true) {
            let [, bs] = __x__;
            $_end_.n = bs, $_result_ = $_start_.n;
          } else if (__x__.length === 2 && true && __x__[1] === null) {
            let [as] = __x__;
            $_end_.n = as, $_result_ = $_start_.n;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })([$listA, $listB]);
      }
      return $_result_;
    };
    let mergePairs__0;
    mergePairs__0 = (l) => {
      let $_result_;
      let $_continue_ = true;
      let $_start_ = {};
      let $_end_ = $_start_;
      let $$l = l;
      while ($_continue_) {
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && __x__.n !== null && true && true) {
            let { v: a, n: { v: b, n: xs } } = __x__;
            $_end_ = $_end_.n = { v: merge__0(a)(b) }, $$l = xs, $_continue_ = true;
          } else if (true) {
            let xs = __x__;
            $_end_.n = xs, $_result_ = $_start_.n;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    let mergeAll__0;
    mergeAll__0 = (l) => {
      let $_result_;
      let $_continue_ = true;
      let $$l = l;
      while ($_continue_) {
        let $l = $$l;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ !== null && true && __x__.n === null) {
            let { v: x } = __x__;
            $_result_ = x;
          } else if (true) {
            let xs = __x__;
            $$l = mergePairs__0(xs), $_continue_ = true;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($l);
      }
      return $_result_;
    };
    return ((__P__3) => mergeAll__0(_1dd2b_sequences__608(compareFn)(__P__3)))(list);
  };
  var _1dd2b_append__902 = (item) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$item = item;
    let $$list = list;
    while ($_continue_) {
      let $item = $$item;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = { v: $item, n: null }, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: a }, $$item = $item, $$list = xs, $_continue_ = true;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _ebd38_addGlobalEventHandler__901 = (action) => (config) => ({ ...config, globalEventHandlers: _1dd2b_append__902(action)(config.globalEventHandlers) });
  var _1dd2b_append__654 = (item) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$item = item;
    let $$list = list;
    while ($_continue_) {
      let $item = $$item;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = { v: $item, n: null }, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: a }, $$item = $item, $$list = xs, $_continue_ = true;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_append__652 = (item) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$item = item;
    let $$list = list;
    while ($_continue_) {
      let $item = $$item;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = { v: $item, n: null }, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: a }, $$item = $item, $$list = xs, $_continue_ = true;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_append__155 = (item) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$item = item;
    let $$list = list;
    while ($_continue_) {
      let $item = $$item;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_end_.n = { v: $item, n: null }, $_result_ = $_start_.n;
        } else if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $_end_ = $_end_.n = { v: a }, $$item = $item, $$list = xs, $_continue_ = true;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_any__518 = (pred) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$pred = pred;
    let $$list = list;
    while ($_continue_) {
      let $pred = $$pred;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_result_ = false;
        } else if (__x__ !== null && true && true) {
          let { v: x, n: xs } = __x__;
          $pred(x) ? $_result_ = true : ($$pred = $pred, $$list = xs, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_all__645 = (predicate) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$predicate = predicate;
    let $$list = list;
    while ($_continue_) {
      let $predicate = $$predicate;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ === null) {
          $_result_ = true;
        } else if (__x__ !== null && true && true) {
          let { v: x, n: xs } = __x__;
          $predicate(x) ? ($$predicate = $predicate, $$list = xs, $_continue_ = true) : $_result_ = false;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1c6a3_between__714 = (start) => (mid) => (end) => ((__P__1) => ((__$PH2__) => _adecf_apL__716(__$PH2__)(end))(((__$PH1__) => _a32d2_ap__180(__$PH1__)(mid))(_5b0b9_mapL__715(_3d769_identity__497)(__P__1))))(start);
  var _176d5__scanInteger__173 = (just) => (nothing) => (str) => {
    const n = parseInt(str);
    return isNaN(n) ? nothing : just(n);
  };
  var _176d5_scanInteger__172 = _176d5__scanInteger__173(_2e42b_Just)(_2e42b_Nothing);
  var _176d5_scan__171 = (_) => _176d5_scanInteger__172;
  var _10f79_show__290 = (c) => {
    if (c === "\\") {
      return `'\\\\'`;
    } else if (c === "'") {
      return `'\\''`;
    } else if (c === "\n") {
      return `'\\n'`;
    } else if (c === "	") {
      return `'\\t'`;
    } else if (c === "\r") {
      return `'\\r'`;
    } else {
      return `'${c}'`;
    }
  };
  var _10f79_show__16 = (b) => b ? `true` : `false`;
  var _10f79_show__15 = (n) => "" + n;
  var _10f79_show__14 = (n) => "" + n;
  var _a32d2_show__255 = (__$a__) => ((__x__) => {
    if (__x__.__constructor === "Loc" && true && true && true) {
      let a0 = __x__.__args[0];
      let a1 = __x__.__args[1];
      let a2 = __x__.__args[2];
      return `Loc(` + _10f79_show__14(a0) + `, ` + _10f79_show__14(a1) + `, ` + _10f79_show__14(a2) + `)`;
    } else if (true) {
      return `Unknown`;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__$a__);
  var _a32d2_show__254 = (__$a__) => ((__x__) => {
    if (__x__.__constructor === "Error" && true) {
      let a0 = __x__.__args[0];
      return `Error(` + _a32d2_show__255(a0) + `)`;
    } else if (true) {
      return `Unknown`;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__$a__);
  var _10f79_show__10 = (list) => {
    let showItems__0;
    showItems__0 = (_list) => (acc) => {
      let $_result_;
      let $_continue_ = true;
      let $$_list = _list;
      let $$acc = acc;
      while ($_continue_) {
        let $_list = $$_list;
        let $acc = $$acc;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_result_ = $acc;
          } else if (__x__ !== null && true && __x__.n === null) {
            let { v: last } = __x__;
            __eq__($acc, ``) ? $_result_ = _5906d_show__11(last) : $_result_ = $acc + `, ` + _5906d_show__11(last);
          } else if (__x__ !== null && true && true) {
            let { v: item, n: next } = __x__;
            __eq__($acc, ``) ? ($$_list = next, $$acc = _5906d_show__11(item), $_continue_ = true) : ($$_list = next, $$acc = $acc + `, ` + _5906d_show__11(item), $_continue_ = true);
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($_list);
      }
      return $_result_;
    };
    return `[` + showItems__0(list)(``) + `]`;
  };
  var _10f79_reduceLeft__833 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduce__832 = _10f79_reduceLeft__833;
  var _a32d2_choice__827 = (ps) => _1dd2b_reduce__832(_a32d2_alt__830)(_a32d2_fail__828)(ps);
  var _10f79_reduceLeft__825 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduce__824 = _10f79_reduceLeft__825;
  var _a32d2_choice__820 = (ps) => _1dd2b_reduce__824(_a32d2_alt__823)(_a32d2_fail__821)(ps);
  var _10f79_reduceLeft__82 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduceRight__81 = (f) => (acc) => (list) => ((__P__2) => _10f79_reduceLeft__82((a) => (b) => f(b)(a))(acc)(_1dd2b_reverse__34(__P__2)))(list);
  var _1dd2b_mapM__76 = (f) => (list) => {
    let helper__0;
    helper__0 = (x) => (result) => ((__P__1) => ((__$PH2__) => _42e19_ap__79(__$PH2__)(result))(((__$PH1__) => _42e19_map__78(__$PH1__)(f(x)))(__P__1)))((x_) => (result_) => ({ v: x_, n: result_ }));
    return _1dd2b_reduceRight__81(helper__0)(_42e19_pure__77()(null))(list);
  };
  var _29844_list__75 = (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonArray" && true) {
      let arr = __x__.__args[0];
      return ((__x__2) => {
        if (__x__2.__constructor === "Parser" && true) {
          let parserFn = __x__2.__args[0];
          return _1dd2b_mapM__76(parserFn)(arr);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(parser);
    } else if (true) {
      return _42e19_Left(`Error parsing list`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _10f79_reduceLeft__738 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduce__737 = _10f79_reduceLeft__738;
  var _a32d2_choice__733 = (ps) => _1dd2b_reduce__737(_a32d2_alt__736)(_a32d2_fail__734)(ps);
  var _10f79_reduceLeft__70 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduceRight__69 = (f) => (acc) => (list) => ((__P__2) => _10f79_reduceLeft__70((a) => (b) => f(b)(a))(acc)(_1dd2b_reverse__34(__P__2)))(list);
  var _1dd2b_mapM__64 = (f) => (list) => {
    let helper__0;
    helper__0 = (x) => (result) => ((__P__1) => ((__$PH2__) => _42e19_ap__67(__$PH2__)(result))(((__$PH1__) => _42e19_map__66(__$PH1__)(f(x)))(__P__1)))((x_) => (result_) => ({ v: x_, n: result_ }));
    return _1dd2b_reduceRight__69(helper__0)(_42e19_pure__65()(null))(list);
  };
  var _29844_list__63 = (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonArray" && true) {
      let arr = __x__.__args[0];
      return ((__x__2) => {
        if (__x__2.__constructor === "Parser" && true) {
          let parserFn = __x__2.__args[0];
          return _1dd2b_mapM__64(parserFn)(arr);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(parser);
    } else if (true) {
      return _42e19_Left(`Error parsing list`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _10f79_reduceLeft__656 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduce__655 = _10f79_reduceLeft__656;
  var _10f79_reduceLeft__587 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduce__586 = _10f79_reduceLeft__587;
  var _10f79_reduceLeft__58 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduceRight__57 = (f) => (acc) => (list) => ((__P__2) => _10f79_reduceLeft__58((a) => (b) => f(b)(a))(acc)(_1dd2b_reverse__34(__P__2)))(list);
  var _1dd2b_mapM__52 = (f) => (list) => {
    let helper__0;
    helper__0 = (x) => (result) => ((__P__1) => ((__$PH2__) => _42e19_ap__55(__$PH2__)(result))(((__$PH1__) => _42e19_map__54(__$PH1__)(f(x)))(__P__1)))((x_) => (result_) => ({ v: x_, n: result_ }));
    return _1dd2b_reduceRight__57(helper__0)(_42e19_pure__53()(null))(list);
  };
  var _29844_list__51 = (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonArray" && true) {
      let arr = __x__.__args[0];
      return ((__x__2) => {
        if (__x__2.__constructor === "Parser" && true) {
          let parserFn = __x__2.__args[0];
          return _1dd2b_mapM__52(parserFn)(arr);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(parser);
    } else if (true) {
      return _42e19_Left(`Error parsing list`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _10f79_reduceLeft__578 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _10f79_reduceLeft__45 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduceRight__44 = (f) => (acc) => (list) => ((__P__2) => _10f79_reduceLeft__45((a) => (b) => f(b)(a))(acc)(_1dd2b_reverse__34(__P__2)))(list);
  var _1dd2b_mapM__39 = (f) => (list) => {
    let helper__0;
    helper__0 = (x) => (result) => ((__P__1) => ((__$PH2__) => _42e19_ap__42(__$PH2__)(result))(((__$PH1__) => _42e19_map__41(__$PH1__)(f(x)))(__P__1)))((x_) => (result_) => ({ v: x_, n: result_ }));
    return _1dd2b_reduceRight__44(helper__0)(_42e19_pure__40()(null))(list);
  };
  var _29844_list__38 = (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonArray" && true) {
      let arr = __x__.__args[0];
      return ((__x__2) => {
        if (__x__2.__constructor === "Parser" && true) {
          let parserFn = __x__2.__args[0];
          return _1dd2b_mapM__39(parserFn)(arr);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(parser);
    } else if (true) {
      return _42e19_Left(`Error parsing list`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _10f79_reduceLeft__443 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduceRight__441 = (f) => (acc) => (list) => ((__P__2) => _10f79_reduceLeft__443((a) => (b) => f(b)(a))(acc)(_1dd2b_reverse__442(__P__2)))(list);
  var _1fda7_hcat__438 = _1dd2b_reduceRight__441(_1fda7_beside__440)(_1fda7_empty__439);
  var _1fda7_sepBy__444 = (separator) => (docs) => ((__P__4) => _1fda7_hcat__438(_1dd2b_intersperse__445(separator)(__P__4)))(docs);
  var _10f79_reduceLeft__419 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduce__418 = _10f79_reduceLeft__419;
  var _a32d2_choice__415 = (ps) => _1dd2b_reduce__418(_a32d2_alt__338)(_a32d2_fail__416)(ps);
  var _10f79_reduceLeft__413 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _10f79_reduceLeft__387 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _10f79_reduceLeft__35 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduceRight__33 = (f) => (acc) => (list) => ((__P__2) => _10f79_reduceLeft__35((a) => (b) => f(b)(a))(acc)(_1dd2b_reverse__34(__P__2)))(list);
  var _1dd2b_mapM__28 = (f) => (list) => {
    let helper__0;
    helper__0 = (x) => (result) => ((__P__1) => ((__$PH2__) => _42e19_ap__31(__$PH2__)(result))(((__$PH1__) => _42e19_map__30(__$PH1__)(f(x)))(__P__1)))((x_) => (result_) => ({ v: x_, n: result_ }));
    return _1dd2b_reduceRight__33(helper__0)(_42e19_pure__29()(null))(list);
  };
  var _29844_list__27 = (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonArray" && true) {
      let arr = __x__.__args[0];
      return ((__x__2) => {
        if (__x__2.__constructor === "Parser" && true) {
          let parserFn = __x__2.__args[0];
          return _1dd2b_mapM__28(parserFn)(arr);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(parser);
    } else if (true) {
      return _42e19_Left(`Error parsing list`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _10f79_reduceLeft__306 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduce__305 = _10f79_reduceLeft__306;
  var _10f79_reduceLeft__252 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduce__251 = _10f79_reduceLeft__252;
  var _a32d2_choice__249 = (ps) => _1dd2b_reduce__251(_a32d2_alt__250)(_a32d2_fail__164)(ps);
  var _10f79_reduceLeft__247 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _10f79_reduceLeft__22 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduce__21 = _10f79_reduceLeft__22;
  var _10f79_reduceLeft__206 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduce__205 = _10f79_reduceLeft__206;
  var _a32d2_choice__203 = (ps) => _1dd2b_reduce__205(_a32d2_alt__204)(_a32d2_fail__130)(ps);
  var _10f79_reduceLeft__196 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduce__195 = _10f79_reduceLeft__196;
  var _a32d2_choice__191 = (ps) => _1dd2b_reduce__195(_a32d2_alt__194)(_a32d2_fail__192)(ps);
  var _10f79_reduceLeft__114 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduceRight__113 = (f) => (acc) => (list) => ((__P__2) => _10f79_reduceLeft__114((a) => (b) => f(b)(a))(acc)(_1dd2b_reverse__34(__P__2)))(list);
  var _1dd2b_mapM__108 = (f) => (list) => {
    let helper__0;
    helper__0 = (x) => (result) => ((__P__1) => ((__$PH2__) => _42e19_ap__111(__$PH2__)(result))(((__$PH1__) => _42e19_map__110(__$PH1__)(f(x)))(__P__1)))((x_) => (result_) => ({ v: x_, n: result_ }));
    return _1dd2b_reduceRight__113(helper__0)(_42e19_pure__109()(null))(list);
  };
  var _29844_list__107 = (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonArray" && true) {
      let arr = __x__.__args[0];
      return ((__x__2) => {
        if (__x__2.__constructor === "Parser" && true) {
          let parserFn = __x__2.__args[0];
          return _1dd2b_mapM__108(parserFn)(arr);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(parser);
    } else if (true) {
      return _42e19_Left(`Error parsing list`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _10f79_reduceLeft__102 = (f) => (acc) => (list) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$list = list;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $list = $$list;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: a, n: xs } = __x__;
          $$f = $f, $$acc = $f($acc)(a), $$list = xs, $_continue_ = true;
        } else if (__x__ === null) {
          $_result_ = $acc;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list);
    }
    return $_result_;
  };
  var _1dd2b_reduceRight__101 = (f) => (acc) => (list) => ((__P__2) => _10f79_reduceLeft__102((a) => (b) => f(b)(a))(acc)(_1dd2b_reverse__34(__P__2)))(list);
  var _1dd2b_mapM__96 = (f) => (list) => {
    let helper__0;
    helper__0 = (x) => (result) => ((__P__1) => ((__$PH2__) => _42e19_ap__99(__$PH2__)(result))(((__$PH1__) => _42e19_map__98(__$PH1__)(f(x)))(__P__1)))((x_) => (result_) => ({ v: x_, n: result_ }));
    return _1dd2b_reduceRight__101(helper__0)(_42e19_pure__97()(null))(list);
  };
  var _29844_list__95 = (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonArray" && true) {
      let arr = __x__.__args[0];
      return ((__x__2) => {
        if (__x__2.__constructor === "Parser" && true) {
          let parserFn = __x__2.__args[0];
          return _1dd2b_mapM__96(parserFn)(arr);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(parser);
    } else if (true) {
      return _42e19_Left(`Error parsing list`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _10f79_dictReduceRight__383 = (f) => (acc) => (dict) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$dict = dict;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $dict = $$dict;
      $_continue_ = false;
      ((__x__) => {
        if (__x__.__constructor === "DictRBEmpty") {
          $_result_ = $acc;
        } else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
          let k = __x__.__args[1];
          let v = __x__.__args[2];
          let left = __x__.__args[3];
          let right = __x__.__args[4];
          $$f = $f, $$acc = $f(k)(v)(_10f79_dictReduceRight__383($f)($acc)(right)), $$dict = left, $_continue_ = true;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($dict);
    }
    return $_result_;
  };
  var _10f79_dictToList__382 = (dict) => _10f79_dictReduceRight__383((k) => (v) => (list) => ({ v: [k, v], n: list }))(null)(dict);
  var _31104_toList__458 = _10f79_dictToList__382;
  var _10f79_dictReduceRight__378 = (f) => (acc) => (dict) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$dict = dict;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $dict = $$dict;
      $_continue_ = false;
      ((__x__) => {
        if (__x__.__constructor === "DictRBEmpty") {
          $_result_ = $acc;
        } else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
          let k = __x__.__args[1];
          let v = __x__.__args[2];
          let left = __x__.__args[3];
          let right = __x__.__args[4];
          $$f = $f, $$acc = $f(k)(v)(_10f79_dictReduceRight__378($f)($acc)(right)), $$dict = left, $_continue_ = true;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($dict);
    }
    return $_result_;
  };
  var _10f79_dictToList__377 = (dict) => _10f79_dictReduceRight__378((k) => (v) => (list) => ({ v: [k, v], n: list }))(null)(dict);
  var _31104_toList__465 = _10f79_dictToList__377;
  var _10f79_dictReduceRight__19 = (f) => (acc) => (dict) => {
    let $_result_;
    let $_continue_ = true;
    let $$f = f;
    let $$acc = acc;
    let $$dict = dict;
    while ($_continue_) {
      let $f = $$f;
      let $acc = $$acc;
      let $dict = $$dict;
      $_continue_ = false;
      ((__x__) => {
        if (__x__.__constructor === "DictRBEmpty") {
          $_result_ = $acc;
        } else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
          let k = __x__.__args[1];
          let v = __x__.__args[2];
          let left = __x__.__args[3];
          let right = __x__.__args[4];
          $$f = $f, $$acc = $f(k)(v)(_10f79_dictReduceRight__19($f)($acc)(right)), $$dict = left, $_continue_ = true;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($dict);
    }
    return $_result_;
  };
  var _10f79_dictToList__18 = (dict) => _10f79_dictReduceRight__19((k) => (v) => (list) => ({ v: [k, v], n: list }))(null)(dict);
  var _b9d70_show__13 = (__$a__) => ((__x__) => {
    if (__x__.__constructor === "JsonString" && true) {
      let a0 = __x__.__args[0];
      return `JsonString(` + _5906d_show__11(a0) + `)`;
    } else if (__x__.__constructor === "JsonInteger" && true) {
      let a0 = __x__.__args[0];
      return `JsonInteger(` + _10f79_show__14(a0) + `)`;
    } else if (__x__.__constructor === "JsonFloat" && true) {
      let a0 = __x__.__args[0];
      return `JsonFloat(` + _10f79_show__15(a0) + `)`;
    } else if (__x__.__constructor === "JsonBoolean" && true) {
      let a0 = __x__.__args[0];
      return `JsonBoolean(` + _10f79_show__16(a0) + `)`;
    } else if (__x__.__constructor === "JsonNull") {
      return `JsonNull`;
    } else if (__x__.__constructor === "JsonObject" && true) {
      let a0 = __x__.__args[0];
      return `JsonObject(` + _10f79_show__17(a0) + `)`;
    } else if (__x__.__constructor === "JsonArray" && true) {
      let a0 = __x__.__args[0];
      return `JsonArray(` + _10f79_show__20(a0) + `)`;
    } else if (true) {
      return `Unknown`;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__$a__);
  var _10f79_show__20 = (list) => {
    let showItems__0;
    showItems__0 = (_list) => (acc) => {
      let $_result_;
      let $_continue_ = true;
      let $$_list = _list;
      let $$acc = acc;
      while ($_continue_) {
        let $_list = $$_list;
        let $acc = $$acc;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_result_ = $acc;
          } else if (__x__ !== null && true && __x__.n === null) {
            let { v: last } = __x__;
            __eq__($acc, ``) ? $_result_ = _b9d70_show__13(last) : $_result_ = $acc + `, ` + _b9d70_show__13(last);
          } else if (__x__ !== null && true && true) {
            let { v: item, n: next } = __x__;
            __eq__($acc, ``) ? ($$_list = next, $$acc = _b9d70_show__13(item), $_continue_ = true) : ($$_list = next, $$acc = $acc + `, ` + _b9d70_show__13(item), $_continue_ = true);
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($_list);
      }
      return $_result_;
    };
    return `[` + showItems__0(list)(``) + `]`;
  };
  var _10f79_show__17 = (dict) => {
    let showItems__0;
    showItems__0 = (items) => (acc) => {
      let $_result_;
      let $_continue_ = true;
      let $$items = items;
      let $$acc = acc;
      while ($_continue_) {
        let $items = $$items;
        let $acc = $$acc;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_result_ = ``;
          } else if (__x__ !== null && __x__.v.length === 2 && true && true && __x__.n === null) {
            let { v: [key, value] } = __x__;
            __eq__($acc, ``) ? $_result_ = _5906d_show__11(key) + `: ` + _b9d70_show__13(value) : $_result_ = $acc + `, ` + _5906d_show__11(key) + `: ` + _b9d70_show__13(value);
          } else if (__x__ !== null && __x__.v.length === 2 && true && true && true) {
            let { v: [key, value], n: next } = __x__;
            __eq__($acc, ``) ? ($$items = next, $$acc = _5906d_show__11(key) + `: ` + _b9d70_show__13(value), $_continue_ = true) : ($$items = next, $$acc = $acc + `, ` + _5906d_show__11(key) + `: ` + _b9d70_show__13(value), $_continue_ = true);
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($items);
      }
      return $_result_;
    };
    let renderedItems;
    renderedItems = ((__P__1) => ((__$PH1__) => showItems__0(__$PH1__)(``))(_10f79_dictToList__18(__P__1)))(dict);
    return `{{ ` + renderedItems + ` }}`;
  };
  var _42e19_show__12 = (__$a__) => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      let a0 = __x__.__args[0];
      return `Left(` + _5906d_show__11(a0) + `)`;
    } else if (__x__.__constructor === "Right" && true) {
      let a0 = __x__.__args[0];
      return `Right(` + _b9d70_show__13(a0) + `)`;
    } else if (true) {
      return `Unknown`;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__$a__);
  var _10f79_concatString__257 = (a) => (b) => a + b;
  var _10f79_compare__9 = (a) => (b) => a > b ? _10f79_GT : a === b ? _10f79_EQ : _10f79_LT;
  var _10f79_gt__8 = (a) => (b) => __eq__(_10f79_compare__9(a)(b), _10f79_GT);
  var _31104_get__7 = (k) => (dict) => {
    let $_result_;
    let $_continue_ = true;
    let $$k = k;
    let $$dict = dict;
    while ($_continue_) {
      let $k = $$k;
      let $dict = $$dict;
      $_continue_ = false;
      ((__x__) => {
        if (__x__.__constructor === "DictRBEmpty") {
          $_result_ = _2e42b_Nothing;
        } else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
          let _k = __x__.__args[1];
          let _v = __x__.__args[2];
          let left = __x__.__args[3];
          let right = __x__.__args[4];
          __eq__($k, _k) ? $_result_ = _2e42b_Just(_v) : _10f79_gt__8($k)(_k) ? ($$k = $k, $$dict = right, $_continue_ = true) : ($$k = $k, $$dict = left, $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($dict);
    }
    return $_result_;
  };
  var _29844_field__103 = (fieldName) => (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonObject" && true) {
      let d = __x__.__args[0];
      return ((__P__10) => ((__W__11) => ((__x__2) => {
        if (__x__2.__constructor === "Just" && true) {
          let value = __x__2.__args[0];
          return _29844_getParserFn__104(parser)(value);
        } else if (__x__2.__constructor === "Nothing") {
          return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__W__11))(_31104_get__7(fieldName)(__P__10)))(d);
    } else if (true) {
      return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _29844_field__115 = (fieldName) => (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonObject" && true) {
      let d = __x__.__args[0];
      return ((__P__10) => ((__W__11) => ((__x__2) => {
        if (__x__2.__constructor === "Just" && true) {
          let value = __x__2.__args[0];
          return _29844_getParserFn__116(parser)(value);
        } else if (__x__2.__constructor === "Nothing") {
          return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__W__11))(_31104_get__7(fieldName)(__P__10)))(d);
    } else if (true) {
      return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _29844_field__36 = (fieldName) => (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonObject" && true) {
      let d = __x__.__args[0];
      return ((__P__10) => ((__W__11) => ((__x__2) => {
        if (__x__2.__constructor === "Just" && true) {
          let value = __x__2.__args[0];
          return _29844_getParserFn__37(parser)(value);
        } else if (__x__2.__constructor === "Nothing") {
          return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__W__11))(_31104_get__7(fieldName)(__P__10)))(d);
    } else if (true) {
      return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _29844_field__59 = (fieldName) => (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonObject" && true) {
      let d = __x__.__args[0];
      return ((__P__10) => ((__W__11) => ((__x__2) => {
        if (__x__2.__constructor === "Just" && true) {
          let value = __x__2.__args[0];
          return _29844_getParserFn__60(parser)(value);
        } else if (__x__2.__constructor === "Nothing") {
          return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__W__11))(_31104_get__7(fieldName)(__P__10)))(d);
    } else if (true) {
      return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _29844_field__71 = (fieldName) => (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonObject" && true) {
      let d = __x__.__args[0];
      return ((__P__10) => ((__W__11) => ((__x__2) => {
        if (__x__2.__constructor === "Just" && true) {
          let value = __x__2.__args[0];
          return _29844_getParserFn__72(parser)(value);
        } else if (__x__2.__constructor === "Nothing") {
          return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__W__11))(_31104_get__7(fieldName)(__P__10)))(d);
    } else if (true) {
      return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _29844_field__83 = (fieldName) => (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonObject" && true) {
      let d = __x__.__args[0];
      return ((__P__10) => ((__W__11) => ((__x__2) => {
        if (__x__2.__constructor === "Just" && true) {
          let value = __x__2.__args[0];
          return _29844_getParserFn__84(parser)(value);
        } else if (__x__2.__constructor === "Nothing") {
          return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__W__11))(_31104_get__7(fieldName)(__P__10)))(d);
    } else if (true) {
      return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _29844_field__86 = (fieldName) => (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonObject" && true) {
      let d = __x__.__args[0];
      return ((__P__10) => ((__W__11) => ((__x__2) => {
        if (__x__2.__constructor === "Just" && true) {
          let value = __x__2.__args[0];
          return _29844_getParserFn__23(parser)(value);
        } else if (__x__2.__constructor === "Nothing") {
          return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__W__11))(_31104_get__7(fieldName)(__P__10)))(d);
    } else if (true) {
      return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _8c112_expressionParser__85 = _29844_map5__88(_8c112_makeExpression__87)(_29844_field__86(`name`)(_29844_string__5))(_29844_field__86(`description`)(_29844_string__5))(_29844_field__86(`type`)(_29844_string__5))(_29844_field__86(`since`)(_29844_string__5))(_29844_field__86(`example`)(_29844_string__5));
  var _29844_field__89 = (fieldName) => (parser) => _29844_Parser((input) => ((__x__) => {
    if (__x__.__constructor === "JsonObject" && true) {
      let d = __x__.__args[0];
      return ((__P__10) => ((__W__11) => ((__x__2) => {
        if (__x__2.__constructor === "Just" && true) {
          let value = __x__2.__args[0];
          return _29844_getParserFn__90(parser)(value);
        } else if (__x__2.__constructor === "Nothing") {
          return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__W__11))(_31104_get__7(fieldName)(__P__10)))(d);
    } else if (true) {
      return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(input));
  var _29844_path__46 = (pathParts) => (parser) => _29844_Parser((input) => ((__P__12) => _42e19_chain__48(_29844_getParserFn__47(parser))(_1dd2b_reduce__21((val) => (fieldName) => ((__x__) => {
    if (__x__.__constructor === "Right" && __x__.__args[0].__constructor === "JsonObject" && true) {
      let d = __x__.__args[0].__args[0];
      return ((__P__13) => ((__W__14) => ((__x__2) => {
        if (__x__2.__constructor === "Just" && true) {
          let value = __x__2.__args[0];
          return _42e19_Right(value);
        } else if (__x__2.__constructor === "Nothing") {
          return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__W__14))(_31104_get__7(fieldName)(__P__13)))(d);
    } else if (true) {
      return _42e19_Left(`Error parsing path: '` + _10f79_show__10(pathParts) + `' - value: '` + _42e19_show__12(val) + `'`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(val))(_42e19_Right(input))(__P__12)))(pathParts));
  var _29844_path__6 = (pathParts) => (parser) => _29844_Parser((input) => ((__P__12) => _42e19_chain__24(_29844_getParserFn__23(parser))(_1dd2b_reduce__21((val) => (fieldName) => ((__x__) => {
    if (__x__.__constructor === "Right" && __x__.__args[0].__constructor === "JsonObject" && true) {
      let d = __x__.__args[0].__args[0];
      return ((__P__13) => ((__W__14) => ((__x__2) => {
        if (__x__2.__constructor === "Just" && true) {
          let value = __x__2.__args[0];
          return _42e19_Right(value);
        } else if (__x__2.__constructor === "Nothing") {
          return _42e19_Left(`Error parsing fieldname '` + fieldName + `'`);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__W__14))(_31104_get__7(fieldName)(__P__13)))(d);
    } else if (true) {
      return _42e19_Left(`Error parsing path: '` + _10f79_show__10(pathParts) + `' - value: '` + _42e19_show__12(val) + `'`);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(val))(_42e19_Right(input))(__P__12)))(pathParts));
  var _8c112_parser__4 = _29844_field__115(`modules`)(_29844_list__107(_29844_map8__106(_8c112_makeModule__105)(_29844_field__86(`path`)(_29844_string__5))(_29844_field__86(`moduleName`)(_29844_string__5))(_29844_field__86(`description`)(_29844_string__5))(_29844_field__103(`expressions`)(_29844_list__95(_29844_map2__93(_8c112_makeTargeted__92)(_29844_maybe__91(_29844_field__89(`js`)(_8c112_expressionParser__85)))(_29844_maybe__91(_29844_field__89(`llvm`)(_8c112_expressionParser__85))))))(_29844_field__83(`typeDeclarations`)(_29844_list__75(_29844_map6__74(_8c112_makeType__73)(_29844_path__6({ v: `js`, n: { v: `name`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `params`, n: null } })(_29844_string__5))(_29844_path__46({ v: `js`, n: { v: `constructors`, n: null } })(_29844_list__38(_29844_string__5)))(_29844_path__6({ v: `js`, n: { v: `description`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `since`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `example`, n: null } })(_29844_string__5)))))(_29844_field__71(`aliases`)(_29844_list__63(_29844_map6__62(_8c112_makeAlias__61)(_29844_path__6({ v: `js`, n: { v: `name`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `params`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `aliasedType`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `description`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `since`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `example`, n: null } })(_29844_string__5)))))(_29844_field__59(`interfaces`)(_29844_list__51(_29844_map7__50(_8c112_makeInterface__49)(_29844_path__6({ v: `js`, n: { v: `name`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `vars`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `constraints`, n: null } })(_29844_string__5))(_29844_path__46({ v: `js`, n: { v: `methods`, n: null } })(_29844_list__38(_29844_string__5)))(_29844_path__6({ v: `js`, n: { v: `description`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `since`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `example`, n: null } })(_29844_string__5)))))(_29844_field__36(`instances`)(_29844_list__27(_29844_map5__26(_8c112_makeInstance__25)(_29844_path__6({ v: `js`, n: { v: `declaration`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `constraints`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `description`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `since`, n: null } })(_29844_string__5))(_29844_path__6({ v: `js`, n: { v: `example`, n: null } })(_29844_string__5)))))));
  var _10f79_compare__576 = (a) => (b) => a > b ? _10f79_GT : __eq__(a, b) ? _10f79_EQ : _10f79_LT;
  var _91e6c_compare__374 = (__$a__) => (__$b__) => ((__x__) => {
    if (__x__.length === 2 && __x__[0].__constructor === "Boolean" && true && __x__[1].__constructor === "Boolean" && true) {
      let [{ __args: [a0] }, { __args: [b0] }] = __x__;
      return _10f79_compare__9(a0)(b0);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Boolean" && true && true) {
      let [{ __args: [] }] = __x__;
      return _10f79_LT;
    } else if (__x__.length === 2 && __x__[0].__constructor === "Byte" && true && __x__[1].__constructor === "Byte" && true) {
      let [{ __args: [a0] }, { __args: [b0] }] = __x__;
      return _10f79_compare__9(a0)(b0);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Byte" && true && true) {
      let [{ __args: [] }, __other__] = __x__;
      return ((__x__2) => {
        if (__x__2.__constructor === "Boolean" && true) {
          return _10f79_GT;
        } else if (true) {
          return _10f79_LT;
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__other__);
    } else if (__x__.length === 2 && __x__[0].__constructor === "ByteArray" && true && __x__[1].__constructor === "ByteArray" && true) {
      let [{ __args: [a0] }, { __args: [b0] }] = __x__;
      return _10f79_compare__375(a0)(b0);
    } else if (__x__.length === 2 && __x__[0].__constructor === "ByteArray" && true && true) {
      let [{ __args: [] }, __other__] = __x__;
      return ((__x__2) => {
        if (__x__2.__constructor === "Boolean" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Byte" && true) {
          return _10f79_GT;
        } else if (true) {
          return _10f79_LT;
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__other__);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Char" && true && __x__[1].__constructor === "Char" && true) {
      let [{ __args: [a0] }, { __args: [b0] }] = __x__;
      return _10f79_compare__9(a0)(b0);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Char" && true && true) {
      let [{ __args: [] }, __other__] = __x__;
      return ((__x__2) => {
        if (__x__2.__constructor === "Boolean" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Byte" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ByteArray" && true) {
          return _10f79_GT;
        } else if (true) {
          return _10f79_LT;
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__other__);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Constructor" && true && true && __x__[1].__constructor === "Constructor" && true && true) {
      let [{ __args: [a0, a1] }, { __args: [b0, b1] }] = __x__;
      return (() => {
        let __r__0;
        __r__0 = _10f79_compare__9(a0)(b0);
        return __eq__(__r__0, _10f79_EQ) ? _10f79_compare__375(a1)(b1) : __r__0;
      })();
    } else if (__x__.length === 2 && __x__[0].__constructor === "Constructor" && true && true && true) {
      let [{ __args: [,] }, __other__] = __x__;
      return ((__x__2) => {
        if (__x__2.__constructor === "Boolean" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Byte" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ByteArray" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Char" && true) {
          return _10f79_GT;
        } else if (true) {
          return _10f79_LT;
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__other__);
    } else if (__x__.length === 2 && __x__[0].__constructor === "DictionaryConstructor" && true && __x__[1].__constructor === "DictionaryConstructor" && true) {
      let [{ __args: [a0] }, { __args: [b0] }] = __x__;
      return _10f79_compare__376(a0)(b0);
    } else if (__x__.length === 2 && __x__[0].__constructor === "DictionaryConstructor" && true && true) {
      let [{ __args: [] }, __other__] = __x__;
      return ((__x__2) => {
        if (__x__2.__constructor === "Boolean" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Byte" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ByteArray" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Char" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Constructor" && true && true) {
          return _10f79_GT;
        } else if (true) {
          return _10f79_LT;
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__other__);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Float" && true && __x__[1].__constructor === "Float" && true) {
      let [{ __args: [a0] }, { __args: [b0] }] = __x__;
      return _10f79_compare__9(a0)(b0);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Float" && true && true) {
      let [{ __args: [] }, __other__] = __x__;
      return ((__x__2) => {
        if (__x__2.__constructor === "Boolean" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Byte" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ByteArray" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Char" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Constructor" && true && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "DictionaryConstructor" && true) {
          return _10f79_GT;
        } else if (true) {
          return _10f79_LT;
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__other__);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Integer" && true && __x__[1].__constructor === "Integer" && true) {
      let [{ __args: [a0] }, { __args: [b0] }] = __x__;
      return _10f79_compare__9(a0)(b0);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Integer" && true && true) {
      let [{ __args: [] }, __other__] = __x__;
      return ((__x__2) => {
        if (__x__2.__constructor === "Boolean" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Byte" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ByteArray" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Char" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Constructor" && true && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "DictionaryConstructor" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Float" && true) {
          return _10f79_GT;
        } else if (true) {
          return _10f79_LT;
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__other__);
    } else if (__x__.length === 2 && __x__[0].__constructor === "ListConstructor" && true && __x__[1].__constructor === "ListConstructor" && true) {
      let [{ __args: [a0] }, { __args: [b0] }] = __x__;
      return _10f79_compare__375(a0)(b0);
    } else if (__x__.length === 2 && __x__[0].__constructor === "ListConstructor" && true && true) {
      let [{ __args: [] }, __other__] = __x__;
      return ((__x__2) => {
        if (__x__2.__constructor === "Boolean" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Byte" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ByteArray" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Char" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Constructor" && true && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "DictionaryConstructor" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Float" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Integer" && true) {
          return _10f79_GT;
        } else if (true) {
          return _10f79_LT;
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__other__);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Record" && true && __x__[1].__constructor === "Record" && true) {
      let [{ __args: [a0] }, { __args: [b0] }] = __x__;
      return _10f79_compare__381(a0)(b0);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Record" && true && true) {
      let [{ __args: [] }, __other__] = __x__;
      return ((__x__2) => {
        if (__x__2.__constructor === "Boolean" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Byte" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ByteArray" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Char" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Constructor" && true && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "DictionaryConstructor" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Float" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Integer" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ListConstructor" && true) {
          return _10f79_GT;
        } else if (true) {
          return _10f79_LT;
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__other__);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Str" && true && __x__[1].__constructor === "Str" && true) {
      let [{ __args: [a0] }, { __args: [b0] }] = __x__;
      return _10f79_compare__9(a0)(b0);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Str" && true && true) {
      let [{ __args: [] }, __other__] = __x__;
      return ((__x__2) => {
        if (__x__2.__constructor === "Boolean" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Byte" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ByteArray" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Char" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Constructor" && true && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "DictionaryConstructor" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Float" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Integer" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ListConstructor" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Record" && true) {
          return _10f79_GT;
        } else if (true) {
          return _10f79_LT;
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__other__);
    } else if (__x__.length === 2 && __x__[0].__constructor === "TupleConstructor" && true && __x__[1].__constructor === "TupleConstructor" && true) {
      let [{ __args: [a0] }, { __args: [b0] }] = __x__;
      return _10f79_compare__375(a0)(b0);
    } else if (__x__.length === 2 && __x__[0].__constructor === "TupleConstructor" && true && true) {
      let [{ __args: [] }, __other__] = __x__;
      return ((__x__2) => {
        if (__x__2.__constructor === "Boolean" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Byte" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ByteArray" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Char" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Constructor" && true && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "DictionaryConstructor" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Float" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Integer" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ListConstructor" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Record" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Str" && true) {
          return _10f79_GT;
        } else if (true) {
          return _10f79_LT;
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__other__);
    } else if (__x__.length === 2 && __x__[0].__constructor === "Unit" && __x__[1].__constructor === "Unit") {
      let [{ __args: [] }, { __args: [] }] = __x__;
      return _10f79_EQ;
    } else if (__x__.length === 2 && __x__[0].__constructor === "Unit" && true) {
      let [{ __args: [] }, __other__] = __x__;
      return ((__x__2) => {
        if (__x__2.__constructor === "Boolean" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Byte" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ByteArray" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Char" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Constructor" && true && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "DictionaryConstructor" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Float" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Integer" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "ListConstructor" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Record" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "Str" && true) {
          return _10f79_GT;
        } else if (__x__2.__constructor === "TupleConstructor" && true) {
          return _10f79_GT;
        } else if (true) {
          return _10f79_LT;
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__other__);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })([__$a__, __$b__]);
  var _10f79_compare__375 = (a) => (b) => {
    let $_result_;
    let $_continue_ = true;
    let $$a = a;
    let $$b = b;
    while ($_continue_) {
      let $a = $$a;
      let $b = $$b;
      $_continue_ = false;
      ((__x__) => {
        if (__x__.length === 2 && __x__[0] === null && __x__[1] === null) {
          let [,] = __x__;
          $_result_ = _10f79_EQ;
        } else if (__x__.length === 2 && __x__[0] === null && true) {
          let [,] = __x__;
          $_result_ = _10f79_LT;
        } else if (__x__.length === 2 && true && __x__[1] === null) {
          let [,] = __x__;
          $_result_ = _10f79_GT;
        } else if (__x__.length === 2 && __x__[0] !== null && true && true && __x__[1] !== null && true && true) {
          let [{ v: itemA, n: xsa }, { v: itemB, n: xsb }] = __x__;
          (() => {
            let r;
            r = _91e6c_compare__374(itemA)(itemB);
            return __eq__(r, _10f79_EQ) ? ($$a = xsa, $$b = xsb, $_continue_ = true) : $_result_ = r;
          })();
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })([$a, $b]);
    }
    return $_result_;
  };
  var _10f79_compare__379 = (a) => (b) => {
    let $_result_;
    let $_continue_ = true;
    let $$a = a;
    let $$b = b;
    while ($_continue_) {
      let $a = $$a;
      let $b = $$b;
      $_continue_ = false;
      ((__x__) => {
        if (__x__.length === 2 && __x__[0] === null && __x__[1] === null) {
          let [,] = __x__;
          $_result_ = _10f79_EQ;
        } else if (__x__.length === 2 && __x__[0] === null && true) {
          let [,] = __x__;
          $_result_ = _10f79_LT;
        } else if (__x__.length === 2 && true && __x__[1] === null) {
          let [,] = __x__;
          $_result_ = _10f79_GT;
        } else if (__x__.length === 2 && __x__[0] !== null && true && true && __x__[1] !== null && true && true) {
          let [{ v: itemA, n: xsa }, { v: itemB, n: xsb }] = __x__;
          (() => {
            let r;
            r = _10f79_compare__380(itemA)(itemB);
            return __eq__(r, _10f79_EQ) ? ($$a = xsa, $$b = xsb, $_continue_ = true) : $_result_ = r;
          })();
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })([$a, $b]);
    }
    return $_result_;
  };
  var _10f79_compare__384 = (a) => (b) => {
    let $_result_;
    let $_continue_ = true;
    let $$a = a;
    let $$b = b;
    while ($_continue_) {
      let $a = $$a;
      let $b = $$b;
      $_continue_ = false;
      ((__x__) => {
        if (__x__.length === 2 && __x__[0] === null && __x__[1] === null) {
          let [,] = __x__;
          $_result_ = _10f79_EQ;
        } else if (__x__.length === 2 && __x__[0] === null && true) {
          let [,] = __x__;
          $_result_ = _10f79_LT;
        } else if (__x__.length === 2 && true && __x__[1] === null) {
          let [,] = __x__;
          $_result_ = _10f79_GT;
        } else if (__x__.length === 2 && __x__[0] !== null && true && true && __x__[1] !== null && true && true) {
          let [{ v: itemA, n: xsa }, { v: itemB, n: xsb }] = __x__;
          (() => {
            let r;
            r = _10f79_compare__385(itemA)(itemB);
            return __eq__(r, _10f79_EQ) ? ($$a = xsa, $$b = xsb, $_continue_ = true) : $_result_ = r;
          })();
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })([$a, $b]);
    }
    return $_result_;
  };
  var _10f79_compare__376 = (a) => (b) => _10f79_compare__379(_10f79_dictToList__377(a))(_10f79_dictToList__377(b));
  var _10f79_compare__381 = (a) => (b) => _10f79_compare__384(_10f79_dictToList__382(a))(_10f79_dictToList__382(b));
  var _10f79_compare__380 = (a) => (b) => ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 2 && true && true && __x__[1].length === 2 && true && true) {
      let [[a1, a2], [b1, b2]] = __x__;
      return (() => {
        let r0;
        r0 = _91e6c_compare__374(a1)(b1);
        return __eq__(r0, _10f79_EQ) ? _91e6c_compare__374(a2)(b2) : r0;
      })();
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })([a, b]);
  var _10f79_compare__385 = (a) => (b) => ((__x__) => {
    if (__x__.length === 2 && __x__[0].length === 2 && true && true && __x__[1].length === 2 && true && true) {
      let [[a1, a2], [b1, b2]] = __x__;
      return (() => {
        let r0;
        r0 = _10f79_compare__9(a1)(b1);
        return __eq__(r0, _10f79_EQ) ? _91e6c_compare__374(a2)(b2) : r0;
      })();
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })([a, b]);
  var _10f79_balanceDict__577 = (color) => (k) => (v) => (left) => (right) => ((__x__) => {
    if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
      let rK = __x__.__args[1];
      let rV = __x__.__args[2];
      let rLeft = __x__.__args[3];
      let rRight = __x__.__args[4];
      return ((__x__2) => {
        if (__x__2.__constructor === "DictRBNode" && __x__2.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
          let lK = __x__2.__args[1];
          let lV = __x__2.__args[2];
          let lLeft = __x__2.__args[3];
          let lRight = __x__2.__args[4];
          return _10f79_DictRBNode(_10f79_DictRBRed)(k)(v)(_10f79_DictRBNode(_10f79_DictRBBlack)(lK)(lV)(lLeft)(lRight))(_10f79_DictRBNode(_10f79_DictRBBlack)(rK)(rV)(rLeft)(rRight));
        } else if (true) {
          return _10f79_DictRBNode(color)(rK)(rV)(_10f79_DictRBNode(_10f79_DictRBRed)(k)(v)(left)(rLeft))(rRight);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(left);
    } else if (true) {
      return ((__x__2) => {
        if (__x__2.__constructor === "DictRBNode" && __x__2.__args[0].__constructor === "DictRBRed" && true && true && __x__2.__args[3].__constructor === "DictRBNode" && __x__2.__args[3].__args[0].__constructor === "DictRBRed" && true && true && true && true && true) {
          let lK = __x__2.__args[1];
          let lV = __x__2.__args[2];
          let llK = __x__2.__args[3].__args[1];
          let llV = __x__2.__args[3].__args[2];
          let llLeft = __x__2.__args[3].__args[3];
          let llRight = __x__2.__args[3].__args[4];
          let lRight = __x__2.__args[4];
          return _10f79_DictRBNode(_10f79_DictRBRed)(lK)(lV)(_10f79_DictRBNode(_10f79_DictRBBlack)(llK)(llV)(llLeft)(llRight))(_10f79_DictRBNode(_10f79_DictRBBlack)(k)(v)(lRight)(right));
        } else if (true) {
          return _10f79_DictRBNode(color)(k)(v)(left)(right);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(left);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(right);
  var _10f79_insertHelp__575 = (key) => (value) => (dict) => ((__x__) => {
    if (__x__.__constructor === "DictRBEmpty") {
      return _10f79_DictRBNode(_10f79_DictRBRed)(key)(value)(_10f79_DictRBEmpty)(_10f79_DictRBEmpty);
    } else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
      let nColor = __x__.__args[0];
      let nKey = __x__.__args[1];
      let nValue = __x__.__args[2];
      let nLeft = __x__.__args[3];
      let nRight = __x__.__args[4];
      return ((__x__2) => {
        if (__x__2.__constructor === "LT") {
          return _10f79_balanceDict__577(nColor)(nKey)(nValue)(_10f79_insertHelp__575(key)(value)(nLeft))(nRight);
        } else if (__x__2.__constructor === "EQ") {
          return _10f79_DictRBNode(nColor)(nKey)(value)(nLeft)(nRight);
        } else if (__x__2.__constructor === "GT") {
          return _10f79_balanceDict__577(nColor)(nKey)(nValue)(nLeft)(_10f79_insertHelp__575(key)(value)(nRight));
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_10f79_compare__576(key)(nKey));
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(dict);
  var _10f79_dictInsert__574 = (key) => (value) => (dict) => ((__x__) => {
    if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
      let k = __x__.__args[1];
      let v = __x__.__args[2];
      let left = __x__.__args[3];
      let right = __x__.__args[4];
      return _10f79_DictRBNode(_10f79_DictRBBlack)(k)(v)(left)(right);
    } else if (true) {
      let or = __x__;
      return or;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_10f79_insertHelp__575(key)(value)(dict));
  var _10f79_dictFromList__573 = (items) => _10f79_reduceLeft__578((dict) => (item) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [k, v] = __x__;
      return _10f79_dictInsert__574(k)(v)(dict);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(item))(_10f79_DictRBEmpty)(items);
  var _31104_fromList__572 = _10f79_dictFromList__573;
  var _4e1b6_KEY_CODE_MAPPINGS__571 = _31104_fromList__572({ v: [3, _4e1b6_KEY_BREAK], n: { v: [8, _4e1b6_KEY_BACKSPACE], n: { v: [9, _4e1b6_KEY_TAB], n: { v: [12, _4e1b6_KEY_CLEAR], n: { v: [13, _4e1b6_KEY_ENTER], n: { v: [16, _4e1b6_KEY_SHIFT], n: { v: [17, _4e1b6_KEY_CTRL], n: { v: [18, _4e1b6_KEY_ALT], n: { v: [19, _4e1b6_KEY_PAUSE], n: { v: [20, _4e1b6_KEY_CAPS_LOCK], n: { v: [21, _4e1b6_KEY_HANGUL], n: { v: [25, _4e1b6_KEY_HANJA], n: { v: [27, _4e1b6_KEY_ESCAPE], n: { v: [28, _4e1b6_KEY_CONVERSION], n: { v: [29, _4e1b6_KEY_NON_CONVERSION], n: { v: [32, _4e1b6_KEY_SPACE], n: { v: [33, _4e1b6_KEY_PAGE_UP], n: { v: [34, _4e1b6_KEY_PAGE_DOWN], n: { v: [35, _4e1b6_KEY_END], n: { v: [36, _4e1b6_KEY_HOME], n: { v: [37, _4e1b6_KEY_LEFT_ARROW], n: { v: [38, _4e1b6_KEY_UP_ARROW], n: { v: [39, _4e1b6_KEY_RIGHT_ARROW], n: { v: [40, _4e1b6_KEY_DOWN_ARROW], n: { v: [41, _4e1b6_KEY_SELECT], n: { v: [42, _4e1b6_KEY_PRINT], n: { v: [43, _4e1b6_KEY_EXECUTE], n: { v: [44, _4e1b6_KEY_PRINT_SCREEN], n: { v: [45, _4e1b6_KEY_INSERT], n: { v: [46, _4e1b6_KEY_DELETE], n: { v: [47, _4e1b6_KEY_HELP], n: { v: [48, _4e1b6_KEY_0], n: { v: [49, _4e1b6_KEY_1], n: { v: [50, _4e1b6_KEY_2], n: { v: [51, _4e1b6_KEY_3], n: { v: [52, _4e1b6_KEY_4], n: { v: [53, _4e1b6_KEY_5], n: { v: [54, _4e1b6_KEY_6], n: { v: [55, _4e1b6_KEY_7], n: { v: [56, _4e1b6_KEY_8], n: { v: [57, _4e1b6_KEY_9], n: { v: [58, _4e1b6_KEY_COLON], n: { v: [59, _4e1b6_KEY_EQUAL], n: { v: [60, _4e1b6_KEY_LEFT_CHEVRON], n: { v: [61, _4e1b6_KEY_EQUAL], n: { v: [63, _4e1b6_KEY_ESZETT], n: { v: [64, _4e1b6_KEY_AT], n: { v: [65, _4e1b6_KEY_A], n: { v: [66, _4e1b6_KEY_B], n: { v: [67, _4e1b6_KEY_C], n: { v: [68, _4e1b6_KEY_D], n: { v: [69, _4e1b6_KEY_E], n: { v: [70, _4e1b6_KEY_F], n: { v: [71, _4e1b6_KEY_G], n: { v: [72, _4e1b6_KEY_H], n: { v: [73, _4e1b6_KEY_I], n: { v: [74, _4e1b6_KEY_J], n: { v: [75, _4e1b6_KEY_K], n: { v: [76, _4e1b6_KEY_L], n: { v: [77, _4e1b6_KEY_M], n: { v: [78, _4e1b6_KEY_N], n: { v: [79, _4e1b6_KEY_O], n: { v: [80, _4e1b6_KEY_P], n: { v: [81, _4e1b6_KEY_Q], n: { v: [82, _4e1b6_KEY_R], n: { v: [83, _4e1b6_KEY_S], n: { v: [84, _4e1b6_KEY_T], n: { v: [85, _4e1b6_KEY_U], n: { v: [86, _4e1b6_KEY_V], n: { v: [87, _4e1b6_KEY_W], n: { v: [88, _4e1b6_KEY_X], n: { v: [89, _4e1b6_KEY_Y], n: { v: [90, _4e1b6_KEY_Z], n: { v: [91, _4e1b6_KEY_CMD_LEFT], n: { v: [92, _4e1b6_KEY_CMD_RIGHT], n: { v: [93, _4e1b6_KEY_CMD_RIGHT], n: { v: [95, _4e1b6_KEY_SLEEP], n: { v: [96, _4e1b6_KEY_NUMPAD_0], n: { v: [97, _4e1b6_KEY_NUMPAD_1], n: { v: [98, _4e1b6_KEY_NUMPAD_2], n: { v: [99, _4e1b6_KEY_NUMPAD_3], n: { v: [100, _4e1b6_KEY_NUMPAD_4], n: { v: [101, _4e1b6_KEY_NUMPAD_5], n: { v: [102, _4e1b6_KEY_NUMPAD_6], n: { v: [103, _4e1b6_KEY_NUMPAD_7], n: { v: [104, _4e1b6_KEY_NUMPAD_8], n: { v: [105, _4e1b6_KEY_NUMPAD_9], n: { v: [106, _4e1b6_KEY_MULTIPLY], n: { v: [107, _4e1b6_KEY_ADD], n: { v: [108, _4e1b6_KEY_NUMPAD_PERIOD], n: { v: [109, _4e1b6_KEY_SUBSTRACT], n: { v: [110, _4e1b6_KEY_DECIMAL_POINT], n: { v: [111, _4e1b6_KEY_DIVIDE], n: { v: [112, _4e1b6_KEY_F1], n: { v: [113, _4e1b6_KEY_F2], n: { v: [114, _4e1b6_KEY_F3], n: { v: [115, _4e1b6_KEY_F4], n: { v: [116, _4e1b6_KEY_F5], n: { v: [117, _4e1b6_KEY_F6], n: { v: [118, _4e1b6_KEY_F7], n: { v: [119, _4e1b6_KEY_F8], n: { v: [120, _4e1b6_KEY_F9], n: { v: [121, _4e1b6_KEY_F10], n: { v: [122, _4e1b6_KEY_F11], n: { v: [123, _4e1b6_KEY_F12], n: { v: [124, _4e1b6_KEY_F13], n: { v: [125, _4e1b6_KEY_F14], n: { v: [126, _4e1b6_KEY_F15], n: { v: [127, _4e1b6_KEY_F16], n: { v: [128, _4e1b6_KEY_F17], n: { v: [129, _4e1b6_KEY_F18], n: { v: [130, _4e1b6_KEY_F19], n: { v: [131, _4e1b6_KEY_F20], n: { v: [132, _4e1b6_KEY_F21], n: { v: [133, _4e1b6_KEY_F22], n: { v: [134, _4e1b6_KEY_F23], n: { v: [135, _4e1b6_KEY_F24], n: { v: [136, _4e1b6_KEY_F25], n: { v: [137, _4e1b6_KEY_F26], n: { v: [138, _4e1b6_KEY_F27], n: { v: [139, _4e1b6_KEY_F28], n: { v: [140, _4e1b6_KEY_F29], n: { v: [141, _4e1b6_KEY_F30], n: { v: [142, _4e1b6_KEY_F31], n: { v: [143, _4e1b6_KEY_F32], n: { v: [144, _4e1b6_KEY_NUM_LOCK], n: { v: [145, _4e1b6_KEY_SCROLL_LOCK], n: { v: [151, _4e1b6_KEY_AIRPLANE_MODE], n: { v: [160, _4e1b6_KEY_CIRCONFLEX], n: { v: [161, _4e1b6_KEY_EXCLAMATION_MARK], n: { v: [162, _4e1b6_KEY_ARABIC_SEMI_COLON], n: { v: [163, _4e1b6_KEY_NUMBER_SIGN], n: { v: [164, _4e1b6_KEY_DOLLAR], n: { v: [165, _4e1b6_KEY_U_GRAVE_ACCENT], n: { v: [166, _4e1b6_KEY_PAGE_BACKWARD], n: { v: [167, _4e1b6_KEY_PAGE_FORWARD], n: { v: [168, _4e1b6_KEY_REFRESH], n: { v: [169, _4e1b6_KEY_RIGHT_PAREN], n: { v: [170, _4e1b6_KEY_ASTERISK], n: { v: [171, _4e1b6_KEY_TILDE], n: { v: [172, _4e1b6_KEY_HOME], n: { v: [173, _4e1b6_KEY_MUTE], n: { v: [174, _4e1b6_KEY_DECREASE_VOLUME], n: { v: [175, _4e1b6_KEY_INCREASE_VOLUME], n: { v: [176, _4e1b6_KEY_NEXT], n: { v: [177, _4e1b6_KEY_PREVIOUS], n: { v: [178, _4e1b6_KEY_STOP], n: { v: [179, _4e1b6_KEY_PLAY_PAUSE], n: { v: [180, _4e1b6_KEY_EMAIL], n: { v: [181, _4e1b6_KEY_MUTE_UNMUTE], n: { v: [182, _4e1b6_KEY_DECREASE_VOLUME], n: { v: [183, _4e1b6_KEY_INCREASE_VOLUME], n: { v: [186, _4e1b6_KEY_SEMI_COLON], n: { v: [187, _4e1b6_KEY_EQUAL], n: { v: [188, _4e1b6_KEY_COMMA], n: { v: [189, _4e1b6_KEY_DASH], n: { v: [190, _4e1b6_KEY_PERIOD], n: { v: [191, _4e1b6_KEY_FORWARD_SLASH], n: { v: [192, _4e1b6_KEY_GRAVE_ACCENT], n: { v: [193, _4e1b6_KEY_QUESTION_MARK], n: { v: [194, _4e1b6_KEY_NUMPAD_PERIOD], n: { v: [219, _4e1b6_KEY_BRACKET_LEFT], n: { v: [220, _4e1b6_KEY_BACK_SLASH], n: { v: [221, _4e1b6_KEY_BRACKET_RIGHT], n: { v: [222, _4e1b6_KEY_SINGLE_QUOTE], n: { v: [223, _4e1b6_KEY_BACK_TICK], n: { v: [224, _4e1b6_KEY_CMD], n: { v: [225, _4e1b6_KEY_ALTGR], n: { v: [226, _4e1b6_KEY_LEFT_BACK_SLASH], n: { v: [230, _4e1b6_KEY_GNOME_COMPOSE], n: { v: [231, _4e1b6_KEY_C_CEDILLA], n: { v: [233, _4e1b6_KEY_XF86_FORWARD], n: { v: [234, _4e1b6_KEY_XF86_BACKWARD], n: { v: [235, _4e1b6_KEY_NON_CONVERSION], n: { v: [240, _4e1b6_KEY_ALPHA_NUMERIC], n: { v: [242, _4e1b6_KEY_HIRAGANA_KATAKANA], n: { v: [243, _4e1b6_KEY_HALF_WIDTH_FULL_WIDTH], n: { v: [244, _4e1b6_KEY_KANJI], n: { v: [251, _4e1b6_KEY_UNLOCK_TRACK_PAD], n: { v: [255, _4e1b6_KEY_TOGGLE_TOUCH_PAD], n: null } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } } });
  var _4e1b6_getKeyFromCode__570 = (keyCode) => _2e42b_fromMaybe__580(_4e1b6_KEY_ANY)(_31104_get__579(keyCode)(_4e1b6_KEY_CODE_MAPPINGS__571));
  var _4495c_buildKeyboardEvent__569 = (e) => {
    let k;
    k = _4e1b6_getKeyFromCode__570(e.keyCode);
    return _4495c_KeyboardEvent({ bubbles: e.bubbles, defaultPrevented: e.defaultPrevented, preventDefault: e.preventDefault, stopImmediatePropagation: e.stopImmediatePropagation, stopPropagation: e.stopPropagation, timeStamp: e.timeStamp, eventType: e.eventType, key: k, altKey: e.altKey, ctrlKey: e.ctrlKey, shiftKey: e.shiftKey });
  };
  var _4495c_EventConstructors__564 = { abort: _4495c_buildAbstractEvent__565, afterprint: _4495c_buildAbstractEvent__565, beforeprint: _4495c_buildAbstractEvent__565, beforeunload: _4495c_buildAbstractEvent__565, blur: _4495c_buildAbstractEvent__565, canplay: _4495c_buildAbstractEvent__565, canplaythrough: _4495c_buildAbstractEvent__565, change: _4495c_buildAbstractEvent__565, click: _4495c_buildMouseEvent__566, contextmenu: _4495c_buildAbstractEvent__565, copy: _4495c_buildAbstractEvent__565, cuechange: _4495c_buildAbstractEvent__565, cut: _4495c_buildAbstractEvent__565, dblclick: _4495c_buildMouseEvent__566, drag: _4495c_buildMouseEvent__566, dragend: _4495c_buildMouseEvent__566, dragenter: _4495c_buildMouseEvent__566, dragleave: _4495c_buildMouseEvent__566, dragover: _4495c_buildMouseEvent__566, dragstart: _4495c_buildMouseEvent__566, drop: _4495c_buildMouseEvent__566, durationchange: _4495c_buildAbstractEvent__565, emptied: _4495c_buildAbstractEvent__565, ended: _4495c_buildAbstractEvent__565, error: _4495c_buildAbstractEvent__565, focus: _4495c_buildAbstractEvent__565, input: _4495c_buildInputEvent__568, invalid: _4495c_buildAbstractEvent__565, keydown: _4495c_buildKeyboardEvent__569, keypress: _4495c_buildKeyboardEvent__569, keyup: _4495c_buildKeyboardEvent__569, load: _4495c_buildAbstractEvent__565, loadeddata: _4495c_buildAbstractEvent__565, loadedmetadata: _4495c_buildAbstractEvent__565, loadstart: _4495c_buildAbstractEvent__565, mousedown: _4495c_buildMouseEvent__566, mouseenter: _4495c_buildMouseEvent__566, mouseleave: _4495c_buildMouseEvent__566, mousemove: _4495c_buildMouseEvent__566, mouseout: _4495c_buildMouseEvent__566, mouseover: _4495c_buildMouseEvent__566, mouseup: _4495c_buildMouseEvent__566, mousewheel: _4495c_buildMouseEvent__566, offline: _4495c_buildAbstractEvent__565, online: _4495c_buildAbstractEvent__565, pagehide: _4495c_buildAbstractEvent__565, pageshow: _4495c_buildAbstractEvent__565, paste: _4495c_buildAbstractEvent__565, pause: _4495c_buildAbstractEvent__565, play: _4495c_buildAbstractEvent__565, playing: _4495c_buildAbstractEvent__565, popstate: _4495c_buildPopStateEvent__581, progress: _4495c_buildAbstractEvent__565, ratechange: _4495c_buildAbstractEvent__565, reset: _4495c_buildAbstractEvent__565, resize: _4495c_buildAbstractEvent__565, scroll: _4495c_buildAbstractEvent__565, search: _4495c_buildAbstractEvent__565, seeked: _4495c_buildAbstractEvent__565, seeking: _4495c_buildAbstractEvent__565, select: _4495c_buildAbstractEvent__565, stalled: _4495c_buildAbstractEvent__565, storage: _4495c_buildAbstractEvent__565, submit: _4495c_buildAbstractEvent__565, suspend: _4495c_buildAbstractEvent__565, timeupdate: _4495c_buildAbstractEvent__565, toggle: _4495c_buildAbstractEvent__565, transitioncancel: _4495c_buildAbstractEvent__565, transitionend: _4495c_buildAbstractEvent__565, transitionrun: _4495c_buildAbstractEvent__565, transitionstart: _4495c_buildAbstractEvent__565, unload: _4495c_buildAbstractEvent__565, volumechange: _4495c_buildAbstractEvent__565, waiting: _4495c_buildAbstractEvent__565, wheel: _4495c_buildAbstractEvent__565 };
  var _5906d_link__614 = _5906d__link__615(_5906d__objectifyAttrs__588(_1dd2b_reduce__586)(_42034_wrapEventHandler__582)(_4495c_EventConstructors__564));
  var _5906d_tag__563 = (tagName2) => (attrs) => (children) => _5906d__tag__589(_5906d__objectifyAttrs__588(_1dd2b_reduce__586)(_42034_wrapEventHandler__582)(_4495c_EventConstructors__564))(tagName2)(attrs)(children);
  var _5906d_a__672 = _5906d_tag__563(`a`);
  var _5906d_blockquote__857 = _5906d_tag__563(`blockquote`);
  var _5906d_br__852 = _5906d_tag__563(`br`);
  var _5906d_button__602 = _5906d_tag__563(`button`);
  var _5906d_code__673 = _5906d_tag__563(`code`);
  var _5906d_div__603 = _5906d_tag__563(`div`);
  var _5906d_h1__562 = _5906d_tag__563(`h1`);
  var _5906d_h2__666 = _5906d_tag__563(`h2`);
  var _5906d_h3__648 = _5906d_tag__563(`h3`);
  var _5906d_h4__854 = _5906d_tag__563(`h4`);
  var _5906d_h5__855 = _5906d_tag__563(`h5`);
  var _5906d_h6__856 = _5906d_tag__563(`h6`);
  var _5906d_header__604 = _5906d_tag__563(`header`);
  var _5906d_i__848 = _5906d_tag__563(`i`);
  var _5906d_img__851 = _5906d_tag__563(`img`);
  var _5906d_input__598 = _5906d_tag__563(`input`);
  var _5906d_li__616 = _5906d_tag__563(`li`);
  var _5906d_main__897 = _5906d_tag__563(`main`);
  var _5906d_p__646 = _5906d_tag__563(`p`);
  var _5906d_span__612 = _5906d_tag__563(`span`);
  var _5906d_strong__847 = _5906d_tag__563(`strong`);
  var _5906d_ul__649 = _5906d_tag__563(`ul`);
  var _10f79_balanceDict__412 = (color) => (k) => (v) => (left) => (right) => ((__x__) => {
    if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
      let rK = __x__.__args[1];
      let rV = __x__.__args[2];
      let rLeft = __x__.__args[3];
      let rRight = __x__.__args[4];
      return ((__x__2) => {
        if (__x__2.__constructor === "DictRBNode" && __x__2.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
          let lK = __x__2.__args[1];
          let lV = __x__2.__args[2];
          let lLeft = __x__2.__args[3];
          let lRight = __x__2.__args[4];
          return _10f79_DictRBNode(_10f79_DictRBRed)(k)(v)(_10f79_DictRBNode(_10f79_DictRBBlack)(lK)(lV)(lLeft)(lRight))(_10f79_DictRBNode(_10f79_DictRBBlack)(rK)(rV)(rLeft)(rRight));
        } else if (true) {
          return _10f79_DictRBNode(color)(rK)(rV)(_10f79_DictRBNode(_10f79_DictRBRed)(k)(v)(left)(rLeft))(rRight);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(left);
    } else if (true) {
      return ((__x__2) => {
        if (__x__2.__constructor === "DictRBNode" && __x__2.__args[0].__constructor === "DictRBRed" && true && true && __x__2.__args[3].__constructor === "DictRBNode" && __x__2.__args[3].__args[0].__constructor === "DictRBRed" && true && true && true && true && true) {
          let lK = __x__2.__args[1];
          let lV = __x__2.__args[2];
          let llK = __x__2.__args[3].__args[1];
          let llV = __x__2.__args[3].__args[2];
          let llLeft = __x__2.__args[3].__args[3];
          let llRight = __x__2.__args[3].__args[4];
          let lRight = __x__2.__args[4];
          return _10f79_DictRBNode(_10f79_DictRBRed)(lK)(lV)(_10f79_DictRBNode(_10f79_DictRBBlack)(llK)(llV)(llLeft)(llRight))(_10f79_DictRBNode(_10f79_DictRBBlack)(k)(v)(lRight)(right));
        } else if (true) {
          return _10f79_DictRBNode(color)(k)(v)(left)(right);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(left);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(right);
  var _10f79_insertHelp__411 = (key) => (value) => (dict) => ((__x__) => {
    if (__x__.__constructor === "DictRBEmpty") {
      return _10f79_DictRBNode(_10f79_DictRBRed)(key)(value)(_10f79_DictRBEmpty)(_10f79_DictRBEmpty);
    } else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
      let nColor = __x__.__args[0];
      let nKey = __x__.__args[1];
      let nValue = __x__.__args[2];
      let nLeft = __x__.__args[3];
      let nRight = __x__.__args[4];
      return ((__x__2) => {
        if (__x__2.__constructor === "LT") {
          return _10f79_balanceDict__412(nColor)(nKey)(nValue)(_10f79_insertHelp__411(key)(value)(nLeft))(nRight);
        } else if (__x__2.__constructor === "EQ") {
          return _10f79_DictRBNode(nColor)(nKey)(value)(nLeft)(nRight);
        } else if (__x__2.__constructor === "GT") {
          return _10f79_balanceDict__412(nColor)(nKey)(nValue)(nLeft)(_10f79_insertHelp__411(key)(value)(nRight));
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_10f79_compare__9(key)(nKey));
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(dict);
  var _10f79_dictInsert__410 = (key) => (value) => (dict) => ((__x__) => {
    if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
      let k = __x__.__args[1];
      let v = __x__.__args[2];
      let left = __x__.__args[3];
      let right = __x__.__args[4];
      return _10f79_DictRBNode(_10f79_DictRBBlack)(k)(v)(left)(right);
    } else if (true) {
      let or = __x__;
      return or;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_10f79_insertHelp__411(key)(value)(dict));
  var _10f79_dictFromList__409 = (items) => _10f79_reduceLeft__413((dict) => (item) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [k, v] = __x__;
      return _10f79_dictInsert__410(k)(v)(dict);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(item))(_10f79_DictRBEmpty)(items);
  var _31104_fromList__408 = _10f79_dictFromList__409;
  var _10f79_balanceDict__386 = (color) => (k) => (v) => (left) => (right) => ((__x__) => {
    if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
      let rK = __x__.__args[1];
      let rV = __x__.__args[2];
      let rLeft = __x__.__args[3];
      let rRight = __x__.__args[4];
      return ((__x__2) => {
        if (__x__2.__constructor === "DictRBNode" && __x__2.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
          let lK = __x__2.__args[1];
          let lV = __x__2.__args[2];
          let lLeft = __x__2.__args[3];
          let lRight = __x__2.__args[4];
          return _10f79_DictRBNode(_10f79_DictRBRed)(k)(v)(_10f79_DictRBNode(_10f79_DictRBBlack)(lK)(lV)(lLeft)(lRight))(_10f79_DictRBNode(_10f79_DictRBBlack)(rK)(rV)(rLeft)(rRight));
        } else if (true) {
          return _10f79_DictRBNode(color)(rK)(rV)(_10f79_DictRBNode(_10f79_DictRBRed)(k)(v)(left)(rLeft))(rRight);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(left);
    } else if (true) {
      return ((__x__2) => {
        if (__x__2.__constructor === "DictRBNode" && __x__2.__args[0].__constructor === "DictRBRed" && true && true && __x__2.__args[3].__constructor === "DictRBNode" && __x__2.__args[3].__args[0].__constructor === "DictRBRed" && true && true && true && true && true) {
          let lK = __x__2.__args[1];
          let lV = __x__2.__args[2];
          let llK = __x__2.__args[3].__args[1];
          let llV = __x__2.__args[3].__args[2];
          let llLeft = __x__2.__args[3].__args[3];
          let llRight = __x__2.__args[3].__args[4];
          let lRight = __x__2.__args[4];
          return _10f79_DictRBNode(_10f79_DictRBRed)(lK)(lV)(_10f79_DictRBNode(_10f79_DictRBBlack)(llK)(llV)(llLeft)(llRight))(_10f79_DictRBNode(_10f79_DictRBBlack)(k)(v)(lRight)(right));
        } else if (true) {
          return _10f79_DictRBNode(color)(k)(v)(left)(right);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(left);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(right);
  var _10f79_insertHelp__373 = (key) => (value) => (dict) => ((__x__) => {
    if (__x__.__constructor === "DictRBEmpty") {
      return _10f79_DictRBNode(_10f79_DictRBRed)(key)(value)(_10f79_DictRBEmpty)(_10f79_DictRBEmpty);
    } else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
      let nColor = __x__.__args[0];
      let nKey = __x__.__args[1];
      let nValue = __x__.__args[2];
      let nLeft = __x__.__args[3];
      let nRight = __x__.__args[4];
      return ((__x__2) => {
        if (__x__2.__constructor === "LT") {
          return _10f79_balanceDict__386(nColor)(nKey)(nValue)(_10f79_insertHelp__373(key)(value)(nLeft))(nRight);
        } else if (__x__2.__constructor === "EQ") {
          return _10f79_DictRBNode(nColor)(nKey)(value)(nLeft)(nRight);
        } else if (__x__2.__constructor === "GT") {
          return _10f79_balanceDict__386(nColor)(nKey)(nValue)(nLeft)(_10f79_insertHelp__373(key)(value)(nRight));
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_91e6c_compare__374(key)(nKey));
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(dict);
  var _10f79_dictInsert__372 = (key) => (value) => (dict) => ((__x__) => {
    if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
      let k = __x__.__args[1];
      let v = __x__.__args[2];
      let left = __x__.__args[3];
      let right = __x__.__args[4];
      return _10f79_DictRBNode(_10f79_DictRBBlack)(k)(v)(left)(right);
    } else if (true) {
      let or = __x__;
      return or;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_10f79_insertHelp__373(key)(value)(dict));
  var _10f79_dictFromList__371 = (items) => _10f79_reduceLeft__387((dict) => (item) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [k, v] = __x__;
      return _10f79_dictInsert__372(k)(v)(dict);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(item))(_10f79_DictRBEmpty)(items);
  var _31104_fromList__370 = _10f79_dictFromList__371;
  var _10f79_balanceDict__246 = (color) => (k) => (v) => (left) => (right) => ((__x__) => {
    if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
      let rK = __x__.__args[1];
      let rV = __x__.__args[2];
      let rLeft = __x__.__args[3];
      let rRight = __x__.__args[4];
      return ((__x__2) => {
        if (__x__2.__constructor === "DictRBNode" && __x__2.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
          let lK = __x__2.__args[1];
          let lV = __x__2.__args[2];
          let lLeft = __x__2.__args[3];
          let lRight = __x__2.__args[4];
          return _10f79_DictRBNode(_10f79_DictRBRed)(k)(v)(_10f79_DictRBNode(_10f79_DictRBBlack)(lK)(lV)(lLeft)(lRight))(_10f79_DictRBNode(_10f79_DictRBBlack)(rK)(rV)(rLeft)(rRight));
        } else if (true) {
          return _10f79_DictRBNode(color)(rK)(rV)(_10f79_DictRBNode(_10f79_DictRBRed)(k)(v)(left)(rLeft))(rRight);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(left);
    } else if (true) {
      return ((__x__2) => {
        if (__x__2.__constructor === "DictRBNode" && __x__2.__args[0].__constructor === "DictRBRed" && true && true && __x__2.__args[3].__constructor === "DictRBNode" && __x__2.__args[3].__args[0].__constructor === "DictRBRed" && true && true && true && true && true) {
          let lK = __x__2.__args[1];
          let lV = __x__2.__args[2];
          let llK = __x__2.__args[3].__args[1];
          let llV = __x__2.__args[3].__args[2];
          let llLeft = __x__2.__args[3].__args[3];
          let llRight = __x__2.__args[3].__args[4];
          let lRight = __x__2.__args[4];
          return _10f79_DictRBNode(_10f79_DictRBRed)(lK)(lV)(_10f79_DictRBNode(_10f79_DictRBBlack)(llK)(llV)(llLeft)(llRight))(_10f79_DictRBNode(_10f79_DictRBBlack)(k)(v)(lRight)(right));
        } else if (true) {
          return _10f79_DictRBNode(color)(k)(v)(left)(right);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(left);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(right);
  var _10f79_insertHelp__245 = (key) => (value) => (dict) => ((__x__) => {
    if (__x__.__constructor === "DictRBEmpty") {
      return _10f79_DictRBNode(_10f79_DictRBRed)(key)(value)(_10f79_DictRBEmpty)(_10f79_DictRBEmpty);
    } else if (__x__.__constructor === "DictRBNode" && true && true && true && true && true) {
      let nColor = __x__.__args[0];
      let nKey = __x__.__args[1];
      let nValue = __x__.__args[2];
      let nLeft = __x__.__args[3];
      let nRight = __x__.__args[4];
      return ((__x__2) => {
        if (__x__2.__constructor === "LT") {
          return _10f79_balanceDict__246(nColor)(nKey)(nValue)(_10f79_insertHelp__245(key)(value)(nLeft))(nRight);
        } else if (__x__2.__constructor === "EQ") {
          return _10f79_DictRBNode(nColor)(nKey)(value)(nLeft)(nRight);
        } else if (__x__2.__constructor === "GT") {
          return _10f79_balanceDict__246(nColor)(nKey)(nValue)(nLeft)(_10f79_insertHelp__245(key)(value)(nRight));
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_10f79_compare__9(key)(nKey));
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(dict);
  var _10f79_dictInsert__244 = (key) => (value) => (dict) => ((__x__) => {
    if (__x__.__constructor === "DictRBNode" && __x__.__args[0].__constructor === "DictRBRed" && true && true && true && true) {
      let k = __x__.__args[1];
      let v = __x__.__args[2];
      let left = __x__.__args[3];
      let right = __x__.__args[4];
      return _10f79_DictRBNode(_10f79_DictRBBlack)(k)(v)(left)(right);
    } else if (true) {
      let or = __x__;
      return or;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_10f79_insertHelp__245(key)(value)(dict));
  var _10f79_dictFromList__243 = (items) => _10f79_reduceLeft__247((dict) => (item) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [k, v] = __x__;
      return _10f79_dictInsert__244(k)(v)(dict);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(item))(_10f79_DictRBEmpty)(items);
  var _31104_fromList__242 = _10f79_dictFromList__243;
  var _10f79_assoc__496 = (list1) => (list2) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$list1 = list1;
    let $$list2 = list2;
    while ($_continue_) {
      let $list1 = $$list1;
      let $list2 = $$list2;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: item, n: more } = __x__;
          $_end_ = $_end_.n = { v: item }, $$list1 = more, $$list2 = $list2, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = $list2, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list1);
    }
    return $_result_;
  };
  var _10f79_mappend__495 = (_) => _10f79_assoc__496;
  var _10f79_assoc__256 = (_) => _10f79_concatString__257;
  var _10f79_mappend__271 = (_) => _10f79_assoc__256();
  var _8c112_show__270 = (__$a__) => `{ ` + _10f79_mappend__271()(`aliasedType: `)(_5906d_show__11(__$a__.aliasedType)) + `, ` + _10f79_mappend__271()(`description: `)(_5906d_show__11(__$a__.description)) + `, ` + _10f79_mappend__271()(`example: `)(_5906d_show__11(__$a__.example)) + `, ` + _10f79_mappend__271()(`name: `)(_5906d_show__11(__$a__.name)) + `, ` + _10f79_mappend__271()(`params: `)(_5906d_show__11(__$a__.params)) + `, ` + _10f79_mappend__271()(`since: `)(_5906d_show__11(__$a__.since)) + ` }`;
  var _10f79_show__269 = (list) => {
    let showItems__0;
    showItems__0 = (_list) => (acc) => {
      let $_result_;
      let $_continue_ = true;
      let $$_list = _list;
      let $$acc = acc;
      while ($_continue_) {
        let $_list = $$_list;
        let $acc = $$acc;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_result_ = $acc;
          } else if (__x__ !== null && true && __x__.n === null) {
            let { v: last } = __x__;
            __eq__($acc, ``) ? $_result_ = _8c112_show__270(last) : $_result_ = $acc + `, ` + _8c112_show__270(last);
          } else if (__x__ !== null && true && true) {
            let { v: item, n: next } = __x__;
            __eq__($acc, ``) ? ($$_list = next, $$acc = _8c112_show__270(item), $_continue_ = true) : ($$_list = next, $$acc = $acc + `, ` + _8c112_show__270(item), $_continue_ = true);
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($_list);
      }
      return $_result_;
    };
    return `[` + showItems__0(list)(``) + `]`;
  };
  var _8c112_show__274 = (__$a__) => `{ ` + _10f79_mappend__271()(`description: `)(_5906d_show__11(__$a__.description)) + `, ` + _10f79_mappend__271()(`example: `)(_5906d_show__11(__$a__.example)) + `, ` + _10f79_mappend__271()(`name: `)(_5906d_show__11(__$a__.name)) + `, ` + _10f79_mappend__271()(`since: `)(_5906d_show__11(__$a__.since)) + `, ` + _10f79_mappend__271()(`typing: `)(_5906d_show__11(__$a__.typing)) + ` }`;
  var _8c112_show__273 = (__$a__) => ((__x__) => {
    if (__x__.__constructor === "BothTargets" && true && true) {
      let a0 = __x__.__args[0];
      let a1 = __x__.__args[1];
      return `BothTargets(` + _8c112_show__274(a0) + `, ` + _8c112_show__274(a1) + `)`;
    } else if (__x__.__constructor === "JSTarget" && true) {
      let a0 = __x__.__args[0];
      return `JSTarget(` + _8c112_show__274(a0) + `)`;
    } else if (__x__.__constructor === "LLVMTarget" && true) {
      let a0 = __x__.__args[0];
      return `LLVMTarget(` + _8c112_show__274(a0) + `)`;
    } else if (__x__.__constructor === "InvalidTarget") {
      return `InvalidTarget`;
    } else if (true) {
      return `Unknown`;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__$a__);
  var _10f79_show__272 = (list) => {
    let showItems__0;
    showItems__0 = (_list) => (acc) => {
      let $_result_;
      let $_continue_ = true;
      let $$_list = _list;
      let $$acc = acc;
      while ($_continue_) {
        let $_list = $$_list;
        let $acc = $$acc;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_result_ = $acc;
          } else if (__x__ !== null && true && __x__.n === null) {
            let { v: last } = __x__;
            __eq__($acc, ``) ? $_result_ = _8c112_show__273(last) : $_result_ = $acc + `, ` + _8c112_show__273(last);
          } else if (__x__ !== null && true && true) {
            let { v: item, n: next } = __x__;
            __eq__($acc, ``) ? ($$_list = next, $$acc = _8c112_show__273(item), $_continue_ = true) : ($$_list = next, $$acc = $acc + `, ` + _8c112_show__273(item), $_continue_ = true);
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($_list);
      }
      return $_result_;
    };
    return `[` + showItems__0(list)(``) + `]`;
  };
  var _8c112_show__276 = (__$a__) => `{ ` + _10f79_mappend__271()(`constraints: `)(_5906d_show__11(__$a__.constraints)) + `, ` + _10f79_mappend__271()(`declaration: `)(_5906d_show__11(__$a__.declaration)) + `, ` + _10f79_mappend__271()(`description: `)(_5906d_show__11(__$a__.description)) + `, ` + _10f79_mappend__271()(`example: `)(_5906d_show__11(__$a__.example)) + `, ` + _10f79_mappend__271()(`since: `)(_5906d_show__11(__$a__.since)) + ` }`;
  var _10f79_show__275 = (list) => {
    let showItems__0;
    showItems__0 = (_list) => (acc) => {
      let $_result_;
      let $_continue_ = true;
      let $$_list = _list;
      let $$acc = acc;
      while ($_continue_) {
        let $_list = $$_list;
        let $acc = $$acc;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_result_ = $acc;
          } else if (__x__ !== null && true && __x__.n === null) {
            let { v: last } = __x__;
            __eq__($acc, ``) ? $_result_ = _8c112_show__276(last) : $_result_ = $acc + `, ` + _8c112_show__276(last);
          } else if (__x__ !== null && true && true) {
            let { v: item, n: next } = __x__;
            __eq__($acc, ``) ? ($$_list = next, $$acc = _8c112_show__276(item), $_continue_ = true) : ($$_list = next, $$acc = $acc + `, ` + _8c112_show__276(item), $_continue_ = true);
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($_list);
      }
      return $_result_;
    };
    return `[` + showItems__0(list)(``) + `]`;
  };
  var _8c112_show__278 = (__$a__) => `{ ` + _10f79_mappend__271()(`constraints: `)(_5906d_show__11(__$a__.constraints)) + `, ` + _10f79_mappend__271()(`description: `)(_5906d_show__11(__$a__.description)) + `, ` + _10f79_mappend__271()(`example: `)(_5906d_show__11(__$a__.example)) + `, ` + _10f79_mappend__271()(`methods: `)(_10f79_show__10(__$a__.methods)) + `, ` + _10f79_mappend__271()(`name: `)(_5906d_show__11(__$a__.name)) + `, ` + _10f79_mappend__271()(`since: `)(_5906d_show__11(__$a__.since)) + `, ` + _10f79_mappend__271()(`vars: `)(_5906d_show__11(__$a__.vars)) + ` }`;
  var _10f79_show__277 = (list) => {
    let showItems__0;
    showItems__0 = (_list) => (acc) => {
      let $_result_;
      let $_continue_ = true;
      let $$_list = _list;
      let $$acc = acc;
      while ($_continue_) {
        let $_list = $$_list;
        let $acc = $$acc;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_result_ = $acc;
          } else if (__x__ !== null && true && __x__.n === null) {
            let { v: last } = __x__;
            __eq__($acc, ``) ? $_result_ = _8c112_show__278(last) : $_result_ = $acc + `, ` + _8c112_show__278(last);
          } else if (__x__ !== null && true && true) {
            let { v: item, n: next } = __x__;
            __eq__($acc, ``) ? ($$_list = next, $$acc = _8c112_show__278(item), $_continue_ = true) : ($$_list = next, $$acc = $acc + `, ` + _8c112_show__278(item), $_continue_ = true);
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($_list);
      }
      return $_result_;
    };
    return `[` + showItems__0(list)(``) + `]`;
  };
  var _8c112_show__280 = (__$a__) => `{ ` + _10f79_mappend__271()(`constructors: `)(_10f79_show__10(__$a__.constructors)) + `, ` + _10f79_mappend__271()(`description: `)(_5906d_show__11(__$a__.description)) + `, ` + _10f79_mappend__271()(`example: `)(_5906d_show__11(__$a__.example)) + `, ` + _10f79_mappend__271()(`name: `)(_5906d_show__11(__$a__.name)) + `, ` + _10f79_mappend__271()(`params: `)(_5906d_show__11(__$a__.params)) + `, ` + _10f79_mappend__271()(`since: `)(_5906d_show__11(__$a__.since)) + ` }`;
  var _10f79_show__279 = (list) => {
    let showItems__0;
    showItems__0 = (_list) => (acc) => {
      let $_result_;
      let $_continue_ = true;
      let $$_list = _list;
      let $$acc = acc;
      while ($_continue_) {
        let $_list = $$_list;
        let $acc = $$acc;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_result_ = $acc;
          } else if (__x__ !== null && true && __x__.n === null) {
            let { v: last } = __x__;
            __eq__($acc, ``) ? $_result_ = _8c112_show__280(last) : $_result_ = $acc + `, ` + _8c112_show__280(last);
          } else if (__x__ !== null && true && true) {
            let { v: item, n: next } = __x__;
            __eq__($acc, ``) ? ($$_list = next, $$acc = _8c112_show__280(item), $_continue_ = true) : ($$_list = next, $$acc = $acc + `, ` + _8c112_show__280(item), $_continue_ = true);
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($_list);
      }
      return $_result_;
    };
    return `[` + showItems__0(list)(``) + `]`;
  };
  var _8c112_show__268 = (__$a__) => `{ ` + _10f79_mappend__271()(`aliases: `)(_10f79_show__269(__$a__.aliases)) + `, ` + _10f79_mappend__271()(`description: `)(_5906d_show__11(__$a__.description)) + `, ` + _10f79_mappend__271()(`expressions: `)(_10f79_show__272(__$a__.expressions)) + `, ` + _10f79_mappend__271()(`instances: `)(_10f79_show__275(__$a__.instances)) + `, ` + _10f79_mappend__271()(`interfaces: `)(_10f79_show__277(__$a__.interfaces)) + `, ` + _10f79_mappend__271()(`name: `)(_5906d_show__11(__$a__.name)) + `, ` + _10f79_mappend__271()(`path: `)(_5906d_show__11(__$a__.path)) + `, ` + _10f79_mappend__271()(`typeDeclarations: `)(_10f79_show__279(__$a__.typeDeclarations)) + ` }`;
  var _10f79_show__267 = (list) => {
    let showItems__0;
    showItems__0 = (_list) => (acc) => {
      let $_result_;
      let $_continue_ = true;
      let $$_list = _list;
      let $$acc = acc;
      while ($_continue_) {
        let $_list = $$_list;
        let $acc = $$acc;
        $_continue_ = false;
        ((__x__) => {
          if (__x__ === null) {
            $_result_ = $acc;
          } else if (__x__ !== null && true && __x__.n === null) {
            let { v: last } = __x__;
            __eq__($acc, ``) ? $_result_ = _8c112_show__268(last) : $_result_ = $acc + `, ` + _8c112_show__268(last);
          } else if (__x__ !== null && true && true) {
            let { v: item, n: next } = __x__;
            __eq__($acc, ``) ? ($$_list = next, $$acc = _8c112_show__268(item), $_continue_ = true) : ($$_list = next, $$acc = $acc + `, ` + _8c112_show__268(item), $_continue_ = true);
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($_list);
      }
      return $_result_;
    };
    return `[` + showItems__0(list)(``) + `]`;
  };
  var _294a4_show__266 = (__$a__) => `{ ` + _10f79_mappend__271()(`modules: `)(_10f79_show__267(__$a__.modules)) + `, ` + _10f79_mappend__271()(`path: `)(_5906d_show__11(__$a__.path)) + `, ` + _10f79_mappend__271()(`search: `)(_5906d_show__11(__$a__.search)) + `, ` + _10f79_mappend__271()(`target: `)(_4595d_show__281(__$a__.target)) + ` }`;
  var _936d2_colorize__429 = (color) => (v) => _10f79_assoc__256()(color)(_10f79_assoc__256()(v)(_936d2_END_COLOR__430));
  var _10f79_assoc__157 = (list1) => (list2) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$list1 = list1;
    let $$list2 = list2;
    while ($_continue_) {
      let $list1 = $$list1;
      let $list2 = $$list2;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: item, n: more } = __x__;
          $_end_ = $_end_.n = { v: item }, $$list1 = more, $$list2 = $list2, $_continue_ = true;
        } else if (__x__ === null) {
          $_end_.n = $list2, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($list1);
    }
    return $_result_;
  };
  var _10f79_mappend__692 = (_) => _10f79_assoc__157;
  var _a32d2_someTill__689 = (p) => (end) => _a32d2_chain__143((first) => _a32d2_map__141((rest) => _10f79_mappend__692()({ v: first, n: null })(rest))(_a32d2_manyTill__690(p)(end)))(p);
  var _1dd2b_concat__156 = _10f79_assoc__157;
  var _0fac7_to__613 = _0fac7_AttributeTo;
  var _0fac7_src__849 = _0fac7_AttributeSrc;
  var _0fac7_placeholder__591 = _0fac7_AttributePlaceholder;
  var _0fac7_onInput__597 = _0fac7_AttributeOnInput;
  var _0fac7_onClick__601 = _0fac7_AttributeOnClick;
  var _0fac7_key__661 = _0fac7_AttributeKey;
  var _0fac7_inputType__590 = _0fac7_AttributeType;
  var _0fac7_href__671 = _0fac7_AttributeHref;
  var _5800c_defaultConfig__670 = { linkView: (name) => (url) => _5906d_a__672({ v: _0fac7_href__671(url), n: null })({ v: name, n: null }), codeView: (_) => (content) => _5906d_code__673(null)({ v: content, n: null }) };
  var _0fac7_className__561 = _0fac7_AttributeClass;
  var _1129f_mdConfig__669 = ((__P__1) => _5800c_setLinkView__674((txt) => (url) => _5906d_link__614({ v: _0fac7_className__561(`markdown__link`), n: { v: _0fac7_to__613(url), n: null } })({ v: txt, n: null }))(__P__1))(_5800c_defaultConfig__670);
  var _12b67_Typing__891 = (__P__1) => ((typing) => _5906d_p__646(null)({ v: _5906d_span__612({ v: _0fac7_className__561(`definition__type`), n: null })({ v: typing, n: null }), n: null }))(((__R__) => __R__.typing)(__P__1));
  var _6d366_ConstructorView__862 = (separator) => (constructor) => _5906d_div__603({ v: _0fac7_className__561(`definition__constructor`), n: null })({ v: _5906d_span__612({ v: _0fac7_className__561(`highlight`), n: null })({ v: separator, n: null }), n: { v: _5906d_span__612(null)({ v: constructor, n: null }), n: null } });
  var _6d366_ConstructorsView__861 = (separator) => (items) => {
    let $_result_;
    let $_continue_ = true;
    let $_start_ = {};
    let $_end_ = $_start_;
    let $$separator = separator;
    let $$items = items;
    while ($_continue_) {
      let $separator = $$separator;
      let $items = $$items;
      $_continue_ = false;
      ((__x__) => {
        if (__x__ !== null && true && true) {
          let { v: ctor, n: more } = __x__;
          $_end_ = $_end_.n = { v: _6d366_ConstructorView__862($separator)(ctor) }, $$separator = `|`, $$items = more, $_continue_ = true;
        } else if (__x__ !== null && true && __x__.n === null) {
          let { v: ctor } = __x__;
          $_end_.n = { v: _6d366_ConstructorView__862($separator)(ctor), n: null }, $_result_ = $_start_.n;
        } else if (__x__ === null) {
          $_end_.n = null, $_result_ = $_start_.n;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })($items);
    }
    return $_result_;
  };
  var _8781f_BreadcrumbItem__658 = (breadcrumb) => _5906d_li__616({ v: _0fac7_className__561(`breadcrumbs__item`), n: { v: _0fac7_key__661(_8781f_getLink__660(breadcrumb)), n: null } })({ v: _5906d_link__614({ v: _0fac7_to__613(_8781f_getLink__660(breadcrumb)), n: null })({ v: _8781f_getName__659(breadcrumb), n: null }), n: null });
  var _b8152_TargetTags__865 = (targetInfo) => {
    let unavailable;
    unavailable = !targetInfo.isAvailable;
    let unavailableClass;
    unavailableClass = _b8152_makeTagClassName__866(unavailable);
    return { v: targetInfo.hasJS ? _5906d_span__612({ v: _0fac7_className__561(unavailableClass), n: null })({ v: `"JS"`, n: null }) : _5906d_empty__667(null)(null), n: { v: targetInfo.hasLLVM ? _5906d_span__612({ v: _0fac7_className__561(unavailableClass), n: null })({ v: `"LLVM"`, n: null }) : _5906d_empty__667(null)(null), n: null } };
  };
  var _b8152_Title__864 = (title) => (targetInfo) => (moduleName) => _5906d_h2__666({ v: _0fac7_className__561(`definition__title`), n: null })({ v: _5906d_span__612({ v: _0fac7_className__561(`definition__title-span`), n: null })({ v: title, n: null }), n: __listCtorSpread__(_b8152_TargetTags__865(targetInfo), { v: _5906d_span__612({ v: _0fac7_className__561(`definition__module`), n: null })({ v: moduleName, n: null }), n: null }) });
  var _cc3cb_Etiquette__863 = (content) => _5906d_div__603({ v: _0fac7_className__561(`definition__etiquette`), n: null })({ v: content, n: null });
  var _0fac7_altAttribute__850 = _0fac7_AttributeAlt;
  var _bcfe4_renderContentPart__846 = (config) => (__W__2) => ((__x__) => {
    if (__x__.__constructor === "Text" && true) {
      let t = __x__.__args[0];
      return _5906d_span__612({ v: _0fac7_className__561(`markdown__text`), n: null })({ v: t, n: null });
    } else if (__x__.__constructor === "Bold" && true) {
      let t = __x__.__args[0];
      return _5906d_strong__847({ v: _0fac7_className__561(`markdown__bold`), n: null })({ v: t, n: null });
    } else if (__x__.__constructor === "Italic" && true) {
      let t = __x__.__args[0];
      return _5906d_i__848({ v: _0fac7_className__561(`markdown__italic`), n: null })({ v: t, n: null });
    } else if (__x__.__constructor === "InlineCode" && true) {
      let t = __x__.__args[0];
      return _5906d_span__612({ v: _0fac7_className__561(`markdown__inline-code`), n: null })({ v: t, n: null });
    } else if (__x__.__constructor === "Link" && true && true) {
      let t = __x__.__args[0];
      let l = __x__.__args[1];
      return config.linkView(t)(l);
    } else if (__x__.__constructor === "Image" && true && true) {
      let alt_ = __x__.__args[0];
      let s = __x__.__args[1];
      return _5906d_img__851({ v: _0fac7_className__561(`markdown__image`), n: { v: _0fac7_src__849(s), n: { v: _0fac7_altAttribute__850(alt_), n: null } } })(null);
    } else if (__x__.__constructor === "LineReturn") {
      return _5906d_br__852(null)(null);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__2);
  var _bcfe4_renderContent__845 = (config) => _1dd2b_map__853(_bcfe4_renderContentPart__846(config));
  var _bcfe4_renderBlock__844 = (config) => (__W__1) => ((__x__) => {
    if (__x__.__constructor === "H1" && true) {
      let content = __x__.__args[0];
      return _5906d_h1__562(null)(_bcfe4_renderContent__845(config)(content));
    } else if (__x__.__constructor === "H2" && true) {
      let content = __x__.__args[0];
      return _5906d_h2__666(null)(_bcfe4_renderContent__845(config)(content));
    } else if (__x__.__constructor === "H3" && true) {
      let content = __x__.__args[0];
      return _5906d_h3__648(null)(_bcfe4_renderContent__845(config)(content));
    } else if (__x__.__constructor === "H4" && true) {
      let content = __x__.__args[0];
      return _5906d_h4__854(null)(_bcfe4_renderContent__845(config)(content));
    } else if (__x__.__constructor === "H5" && true) {
      let content = __x__.__args[0];
      return _5906d_h5__855(null)(_bcfe4_renderContent__845(config)(content));
    } else if (__x__.__constructor === "H6" && true) {
      let content = __x__.__args[0];
      return _5906d_h6__856(null)(_bcfe4_renderContent__845(config)(content));
    } else if (__x__.__constructor === "Paragraph" && true) {
      let content = __x__.__args[0];
      return _5906d_p__646(null)(_bcfe4_renderContent__845(config)(content));
    } else if (__x__.__constructor === "Blockquote" && true) {
      let content = __x__.__args[0];
      return _5906d_blockquote__857(null)(_bcfe4_renderContent__845(config)(content));
    } else if (__x__.__constructor === "Code" && true && true) {
      let lang = __x__.__args[0];
      let content = __x__.__args[1];
      return config.codeView(lang)(content);
    } else if (__x__.__constructor === "UnorderedList" && true) {
      let items = __x__.__args[0];
      return _5906d_ul__649(null)(_1dd2b_map__858((item) => _5906d_li__616(null)(_bcfe4_renderContent__845(config)(item)))(items));
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__1);
  var _bcfe4_doRender__843 = (config) => (markdown) => _5906d_div__603({ v: _0fac7_className__561(`markdown`), n: null })(_1dd2b_map__859(_bcfe4_renderBlock__844(config))(markdown));
  var _0b37a_ModuleLink__611 = (module) => _5906d_li__616({ v: _0fac7_className__561(`side-menu__link-item`), n: null })({ v: _5906d_link__614({ v: _0fac7_className__561(`side-menu__link`), n: { v: _0fac7_to__613(`/` + module.name), n: null } })({ v: _5906d_span__612({ v: _0fac7_className__561(`side-menu__link-name`), n: null })({ v: module.name, n: null }), n: null }), n: null });
  var _0b37a_MenuSection__647 = (title) => (items) => _1dd2b_isEmpty__644(items) ? null : { v: _5906d_h3__648({ v: _0fac7_className__561(`side-menu__title`), n: null })({ v: title, n: null }), n: { v: _5906d_ul__649({ v: _0fac7_className__561(`side-menu__link-list`), n: null })(items), n: null } };
  var _0b37a_MenuLink__630 = (__W__1) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [name, moduleName] = __x__;
      return _5906d_li__616({ v: _0fac7_className__561(`side-menu__link-item`), n: null })({ v: _5906d_link__614({ v: _0fac7_className__561(`side-menu__link`), n: { v: _0fac7_to__613(`/` + moduleName + `/` + name), n: null } })({ v: _5906d_span__612({ v: _0fac7_className__561(`side-menu__link-name`), n: null })({ v: name, n: null }), n: { v: _5906d_span__612({ v: _0fac7_className__561(`side-menu__link-extra`), n: null })({ v: moduleName, n: null }), n: null } }), n: null });
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__1);
  var _0b37a_itemsToLinks__624 = (__P__5) => _1dd2b_map__631(_0b37a_MenuLink__630)(_1dd2b_sortBy__626((a) => (b) => _10f79_compare__9(_6b70e_fst__625(a))(_6b70e_fst__625(b)))(__P__5));
  var _051c8_toLower__481 = (s) => {
    return s.toLowerCase();
  };
  var _913f5_handleInput__592 = (state) => (event) => ((__x__) => {
    if (__x__.__constructor === "InputEvent" && true) {
      let e = __x__.__args[0];
      return { v: _1e6e4_of__594()(_3d769_always__593({ ...state, search: _051c8_toLower__481(e.target.value) })), n: null };
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(event);
  var _913f5_Header__560 = (target) => _5906d_header__604({ v: _0fac7_className__561(`header`), n: null })({ v: _5906d_h1__562({ v: _0fac7_className__561(`header__title`), n: null })({ v: `"MadDoc"`, n: null }), n: { v: _5906d_input__598({ v: _0fac7_inputType__590(`text`), n: { v: _0fac7_placeholder__591(`What are you looking for?`), n: { v: _0fac7_className__561(`search-field`), n: { v: _0fac7_onInput__597(_913f5_handleInput__592), n: null } } } })(null), n: { v: _5906d_div__603({ v: _0fac7_className__561(`target-selector`), n: null })({ v: _5906d_button__602({ v: _0fac7_className__561(`target-selector__button` + (__eq__(target, _4595d_JS) ? ` target-selector__button--selected` : ``)), n: { v: _0fac7_onClick__601(_913f5_handleTargetChange__599(_4595d_JS)), n: null } })({ v: `"Javascript"`, n: null }), n: { v: _5906d_button__602({ v: _0fac7_className__561(`target-selector__button` + (__eq__(target, _4595d_LLVM) ? ` target-selector__button--selected` : ``)), n: { v: _0fac7_onClick__601(_913f5_handleTargetChange__599(_4595d_LLVM)), n: null } })({ v: `"LLVM"`, n: null }), n: null } }), n: null } } });
  var _051c8_split__534 = (separator) => (str) => {
    const items = str.split(separator);
    if (items.length === 0) {
      return null;
    }
    let current = {};
    let output = current;
    items.forEach((item) => {
      current = current.n = {};
      current.v = item;
    });
    current.n = null;
    return output.n;
  };
  var _39ce8_nameMatchesEndOfPath__533 = (path) => (getter) => (raw) => ((__P__8) => ((__W__9) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let x = __x__.__args[0];
      return __eq__(x, getter(raw));
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__9))(_1dd2b_last__535(_051c8_split__534(`/`)(__P__8))))(path);
  var _39ce8_tryItemByKind__532 = (constructor) => (retrieveName) => (items) => (path) => (module) => ((__P__10) => ((__W__11) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let found = __x__.__args[0];
      return constructor(module.name)(found);
    } else if (__x__.__constructor === "Nothing") {
      return _39ce8_NotFound;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__11))(_1dd2b_find__536(_39ce8_nameMatchesEndOfPath__533(path)(retrieveName))(__P__10)))(items);
  var _39ce8_nameMatchesEndOfPath__538 = (path) => (getter) => (raw) => ((__P__8) => ((__W__9) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let x = __x__.__args[0];
      return __eq__(x, getter(raw));
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__9))(_1dd2b_last__535(_051c8_split__534(`/`)(__P__8))))(path);
  var _39ce8_tryItemByKind__537 = (constructor) => (retrieveName) => (items) => (path) => (module) => ((__P__10) => ((__W__11) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let found = __x__.__args[0];
      return constructor(module.name)(found);
    } else if (__x__.__constructor === "Nothing") {
      return _39ce8_NotFound;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__11))(_1dd2b_find__539(_39ce8_nameMatchesEndOfPath__538(path)(retrieveName))(__P__10)))(items);
  var _39ce8_nameMatchesEndOfPath__541 = (path) => (getter) => (raw) => ((__P__8) => ((__W__9) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let x = __x__.__args[0];
      return __eq__(x, getter(raw));
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__9))(_1dd2b_last__535(_051c8_split__534(`/`)(__P__8))))(path);
  var _39ce8_tryItemByKind__540 = (constructor) => (retrieveName) => (items) => (path) => (module) => ((__P__10) => ((__W__11) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let found = __x__.__args[0];
      return constructor(module.name)(found);
    } else if (__x__.__constructor === "Nothing") {
      return _39ce8_NotFound;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__11))(_1dd2b_find__542(_39ce8_nameMatchesEndOfPath__541(path)(retrieveName))(__P__10)))(items);
  var _39ce8_nameMatchesEndOfPath__544 = (path) => (getter) => (raw) => ((__P__8) => ((__W__9) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let x = __x__.__args[0];
      return __eq__(x, getter(raw));
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__9))(_1dd2b_last__535(_051c8_split__534(`/`)(__P__8))))(path);
  var _39ce8_tryItemByKind__543 = (constructor) => (retrieveName) => (items) => (path) => (module) => ((__P__10) => ((__W__11) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let found = __x__.__args[0];
      return constructor(module.name)(found);
    } else if (__x__.__constructor === "Nothing") {
      return _39ce8_NotFound;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__11))(_1dd2b_find__545(_39ce8_nameMatchesEndOfPath__544(path)(retrieveName))(__P__10)))(items);
  var _39ce8_nameMatchesEndOfPath__547 = (path) => (getter) => (raw) => ((__P__8) => ((__W__9) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let x = __x__.__args[0];
      return __eq__(x, getter(raw));
    } else if (true) {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__9))(_1dd2b_last__535(_051c8_split__534(`/`)(__P__8))))(path);
  var _39ce8_tryItemByKind__546 = (constructor) => (retrieveName) => (items) => (path) => (module) => ((__P__10) => ((__W__11) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let found = __x__.__args[0];
      return constructor(module.name)(found);
    } else if (__x__.__constructor === "Nothing") {
      return _39ce8_NotFound;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__11))(_1dd2b_find__548(_39ce8_nameMatchesEndOfPath__547(path)(retrieveName))(__P__10)))(items);
  var _39ce8_findItem__531 = (path) => (module) => _39ce8__findItem__549({ v: _39ce8_tryItemByKind__532(_39ce8_ExpressionResult)(_8c112_getName__483)(module.expressions), n: { v: _39ce8_tryItemByKind__537(_39ce8_TypeResult)((__R__) => __R__.name)(module.typeDeclarations), n: { v: _39ce8_tryItemByKind__540(_39ce8_AliasResult)((__R__) => __R__.name)(module.aliases), n: { v: _39ce8_tryItemByKind__543(_39ce8_InterfaceResult)((__R__) => __R__.name)(module.interfaces), n: { v: _39ce8_tryItemByKind__546(_39ce8_InstanceResult)((__R__) => __R__.declaration)(module.instances), n: null } } } } })(path)(module);
  var _051c8_slice__128 = (start) => (end) => (s) => {
    return s.slice(start, end === 0 ? s.length : end);
  };
  var _051c8_take__498 = (n) => (s) => _051c8_slice__128(0)(n)(s);
  var _051c8_replace__501 = (regex) => (replacing) => (input) => input.replace(new RegExp(regex, "g"), replacing);
  var _051c8_prependChar__178 = (c) => (s) => {
    return c + s;
  };
  var _051c8_match__326 = (regex) => (input) => input.match(regex) !== null;
  var _0b37a_LinksForType__618 = (search) => (getItems) => (retrieveName) => (__P__2) => _0b37a_itemsToLinks__624(_1dd2b_chain__621((module) => ((__P__3) => _1dd2b_map__620((a) => [retrieveName(a), module.name])(_1dd2b_filter__619((__P__4) => _051c8_match__326(search)(_051c8_toLower__481(retrieveName(__P__4))))(getItems(__P__3))))(module))(__P__2));
  var _0b37a_LinksForType__632 = (search) => (getItems) => (retrieveName) => (__P__2) => _0b37a_itemsToLinks__624(_1dd2b_chain__621((module) => ((__P__3) => _1dd2b_map__634((a) => [retrieveName(a), module.name])(_1dd2b_filter__633((__P__4) => _051c8_match__326(search)(_051c8_toLower__481(retrieveName(__P__4))))(getItems(__P__3))))(module))(__P__2));
  var _0b37a_LinksForType__635 = (search) => (getItems) => (retrieveName) => (__P__2) => _0b37a_itemsToLinks__624(_1dd2b_chain__621((module) => ((__P__3) => _1dd2b_map__637((a) => [retrieveName(a), module.name])(_1dd2b_filter__636((__P__4) => _051c8_match__326(search)(_051c8_toLower__481(retrieveName(__P__4))))(getItems(__P__3))))(module))(__P__2));
  var _0b37a_LinksForType__638 = (search) => (getItems) => (retrieveName) => (__P__2) => _0b37a_itemsToLinks__624(_1dd2b_chain__621((module) => ((__P__3) => _1dd2b_map__640((a) => [retrieveName(a), module.name])(_1dd2b_filter__639((__P__4) => _051c8_match__326(search)(_051c8_toLower__481(retrieveName(__P__4))))(getItems(__P__3))))(module))(__P__2));
  var _0b37a_LinksForType__641 = (search) => (getItems) => (retrieveName) => (__P__2) => _0b37a_itemsToLinks__624(_1dd2b_chain__621((module) => ((__P__3) => _1dd2b_map__643((a) => [retrieveName(a), module.name])(_1dd2b_filter__642((__P__4) => _051c8_match__326(search)(_051c8_toLower__481(retrieveName(__P__4))))(getItems(__P__3))))(module))(__P__2));
  var _0b37a_sortAndFilterModules__606 = (search) => (__P__6) => _1dd2b_sortBy__607((a) => (b) => _10f79_compare__9(a.name)(b.name))(_1dd2b_filter__527((__P__7) => _051c8_match__326(search)(_051c8_toLower__481(((__R__) => __R__.name)(__P__7))))(__P__6));
  var _0b37a_SideMenu__605 = (search) => (modules) => {
    let moduleLinks;
    moduleLinks = _1dd2b_map__617(_0b37a_ModuleLink__611)(_0b37a_sortAndFilterModules__606(search)(modules));
    let functionLinks;
    functionLinks = _0b37a_LinksForType__618(search)((__R__) => __R__.expressions)(_8c112_getName__483)(modules);
    let typeLinks;
    typeLinks = _0b37a_LinksForType__632(search)((__R__) => __R__.typeDeclarations)((__R__) => __R__.name)(modules);
    let aliasLinks;
    aliasLinks = _0b37a_LinksForType__635(search)((__R__) => __R__.aliases)((__R__) => __R__.name)(modules);
    let interfaceLinks;
    interfaceLinks = _0b37a_LinksForType__638(search)((__R__) => __R__.interfaces)((__R__) => __R__.name)(modules);
    let instanceLinks;
    instanceLinks = _0b37a_LinksForType__641(search)((__R__) => __R__.instances)((__R__) => __R__.declaration)(modules);
    let notFound;
    notFound = _1dd2b_all__645(_1dd2b_isEmpty__644)({ v: moduleLinks, n: { v: functionLinks, n: { v: typeLinks, n: { v: aliasLinks, n: { v: interfaceLinks, n: { v: instanceLinks, n: null } } } } } });
    return notFound ? _5906d_div__603({ v: _0fac7_className__561(`side-menu`), n: null })({ v: _5906d_p__646({ v: _0fac7_className__561(`side-menu__no-result`), n: null })({ v: `"No result was found for "`, n: { v: _5906d_span__612({ v: _0fac7_className__561(`side-menu__no-result-search`), n: null })({ v: search, n: null }), n: null } }), n: null }) : _5906d_div__603({ v: _0fac7_className__561(`side-menu`), n: null })({ v: _5906d_div__603({ v: _0fac7_className__561(`side-menu__scrollbar-container`), n: null })(__listCtorSpread__(_0b37a_MenuSection__647(`MODULES`)(moduleLinks), __listCtorSpread__(_0b37a_MenuSection__647(`FUNCTIONS`)(functionLinks), __listCtorSpread__(_0b37a_MenuSection__647(`TYPES`)(typeLinks), __listCtorSpread__(_0b37a_MenuSection__647(`ALIASES`)(aliasLinks), __listCtorSpread__(_0b37a_MenuSection__647(`INTERFACES`)(interfaceLinks), _0b37a_MenuSection__647(`INSTANCES`)(instanceLinks))))))), n: null });
  };
  var _d4261_isLetter__325 = (c) => ((__P__1) => _051c8_match__326(`[a-zA-Z]+`)(((__$PH1__) => _051c8_prependChar__178(__$PH1__)(``))(__P__1)))(c);
  var _051c8_length__423 = (s) => {
    return s.length;
  };
  var _1fda7_text__422 = (s) => ((__x__) => {
    if (__x__ === "") {
      return _1fda7_EmptyDoc;
    } else if (true) {
      let or = __x__;
      return _1fda7_TextDoc(_051c8_length__423(or))(or);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(s);
  var _051c8_join__427 = (a) => (xs) => ((__P__1) => _1dd2b_reduce__305(_10f79_mappend__271())(``)(_1dd2b_intersperse__428(a)(__P__1)))(xs);
  var _936d2_ansiColor__426 = (parts) => (str) => _936d2_colorize__429(`\x1B[` + _051c8_join__427(`;`)(parts) + `m`)(str);
  var _936d2_text__424 = { black: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGBlack, n: null }), red: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGRed, n: null }), green: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGGreen, n: null }), yellow: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGYellow, n: null }), blue: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGBlue, n: null }), magenta: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGMagenta, n: null }), cyan: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGCyan, n: null }), white: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGWhite, n: null }), brightBlack: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGBrightBlack, n: null }), brightRed: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGBrightRed, n: null }), brightGreen: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGBrightGreen, n: null }), brightYellow: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGBrightYellow, n: null }), brightBlue: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGBrightBlue, n: null }), brightMagenta: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGBrightMagenta, n: null }), brightCyan: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGBrightCyan, n: null }), brightWhite: _936d2_ansiColor__426({ v: _936d2_ansi__425.FGBrightWhite, n: null }), underline: _936d2_ansiColor__426({ v: _936d2_ansi__425.FormatUnderline, n: null }), bold: _936d2_ansiColor__426({ v: _936d2_ansi__425.FormatBold, n: null }), boldUnderline: _936d2_ansiColor__426({ v: _936d2_ansi__425.FormatBold, n: { v: _936d2_ansi__425.FormatUnderline, n: null } }) };
  var _91e6c_valueToDoc__421 = (colored) => (v) => ((__x__) => {
    if (__x__.__constructor === "Unit") {
      return _1fda7_text__422(`{}`);
    } else if (__x__.__constructor === "Integer" && true) {
      let i = __x__.__args[0];
      return colored ? _1fda7_textWithLength__431(_051c8_length__423(i))(_936d2_text__424.brightYellow(i)) : _1fda7_text__422(i);
    } else if (__x__.__constructor === "Float" && true) {
      let f = __x__.__args[0];
      return colored ? _1fda7_textWithLength__431(_051c8_length__423(f))(_936d2_text__424.brightYellow(f)) : _1fda7_text__422(f);
    } else if (__x__.__constructor === "Byte" && true) {
      let b = __x__.__args[0];
      return colored ? _1fda7_textWithLength__431(2)(_936d2_text__424.brightYellow(b)) : _1fda7_text__422(b);
    } else if (__x__.__constructor === "Boolean" && true) {
      let b = __x__.__args[0];
      return colored ? _1fda7_textWithLength__431(_051c8_length__423(b))(_936d2_text__424.brightYellow(b)) : _1fda7_text__422(b);
    } else if (__x__.__constructor === "Char" && true) {
      let c = __x__.__args[0];
      return colored ? _1fda7_textWithLength__431(_051c8_length__423(c))(_936d2_text__424.brightCyan(c)) : _1fda7_text__422(c);
    } else if (__x__.__constructor === "Str" && true) {
      let s = __x__.__args[0];
      return colored ? _1fda7_textWithLength__431(_051c8_length__423(s))(_936d2_text__424.brightCyan(s)) : _1fda7_text__422(s);
    } else if (__x__.__constructor === "Constructor" && true && true) {
      let n = __x__.__args[0];
      let args = __x__.__args[1];
      return _1dd2b_isEmpty__432(args) ? _1fda7_text__422(n) : _1fda7_group__447(_1fda7_hcat__438({ v: _1fda7_text__422(n), n: { v: _1fda7_text__422(`(`), n: { v: _1fda7_nest__446(2)(_1fda7_hcat__438({ v: _1fda7_linebreak__433, n: { v: _1fda7_sepBy__444(_1fda7_hcat__438({ v: _1fda7_comma__435, n: { v: _1fda7_line__437, n: null } }))(_1dd2b_map__434(_91e6c_valueToDoc__421(colored))(args)), n: null } })), n: { v: _1fda7_linebreak__433, n: { v: _1fda7_text__422(`)`), n: null } } } } }));
    } else if (__x__.__constructor === "ByteArray" && true) {
      let bytes = __x__.__args[0];
      return (() => {
        let groupBytes__0;
        groupBytes__0 = (bs) => (result) => _1dd2b_isEmpty__432(bs) ? result : (() => {
          let currentGroup;
          currentGroup = ((__P__15) => _1fda7_hcat__438(_1dd2b_map__434(_91e6c_valueToDoc__421(colored))(_1dd2b_take__449(8)(__P__15))))(bs);
          return _1dd2b_isEmpty__452(result) ? groupBytes__0(_1dd2b_drop__453(8)(bs))({ v: currentGroup, n: null }) : groupBytes__0(_1dd2b_drop__453(8)(bs))(__listCtorSpread__(result, { v: currentGroup, n: null }));
        })();
        return _1fda7_group__447(_1fda7_hcat__438({ v: _1fda7_text__422(`ByteArray`), n: { v: _1fda7_text__422(`(`), n: { v: _1fda7_nest__446(2)(_1fda7_hcat__438({ v: _1fda7_linebreak__433, n: { v: _1fda7_sepBy__444(_1fda7_softline__454)(groupBytes__0(bytes)(null)), n: null } })), n: { v: _1fda7_linebreak__433, n: { v: _1fda7_text__422(`)`), n: null } } } } }));
      })();
    } else if (__x__.__constructor === "ListConstructor" && true) {
      let items = __x__.__args[0];
      return _1fda7_group__447(_1fda7_hcat__438({ v: _1fda7_lbracket__455, n: { v: _1fda7_nest__446(2)(_1fda7_hcat__438({ v: _1fda7_linebreak__433, n: { v: _1fda7_sepBy__444(_1fda7_hcat__438({ v: _1fda7_comma__435, n: { v: _1fda7_line__437, n: null } }))(_1dd2b_map__434(_91e6c_valueToDoc__421(colored))(items)), n: null } })), n: { v: _1fda7_linebreak__433, n: { v: _1fda7_rbracket__456, n: null } } } }));
    } else if (__x__.__constructor === "TupleConstructor" && true) {
      let items = __x__.__args[0];
      return _1fda7_group__447(_1fda7_hcat__438({ v: _1fda7_text__422(`#`), n: { v: _1fda7_lbracket__455, n: { v: _1fda7_nest__446(2)(_1fda7_hcat__438({ v: _1fda7_linebreak__433, n: { v: _1fda7_sepBy__444(_1fda7_hcat__438({ v: _1fda7_comma__435, n: { v: _1fda7_line__437, n: null } }))(_1dd2b_map__434(_91e6c_valueToDoc__421(colored))(items)), n: null } })), n: { v: _1fda7_linebreak__433, n: { v: _1fda7_rbracket__456, n: null } } } } }));
    } else if (__x__.__constructor === "Record" && true) {
      let fields = __x__.__args[0];
      return _1fda7_group__447(_1fda7_hcat__438({ v: _1fda7_lbrace__457, n: { v: _1fda7_nest__446(2)(_1fda7_hcat__438({ v: _1fda7_line__437, n: { v: _1fda7_sepBy__444(_1fda7_hcat__438({ v: _1fda7_comma__435, n: { v: _1fda7_line__437, n: null } }))(_1dd2b_map__463((f) => _1fda7_hcat__438({ v: _1fda7_text__422(_6b70e_fst__459(f)), n: { v: _1fda7_colon__460, n: { v: _1fda7_space__461, n: { v: _91e6c_valueToDoc__421(colored)(_6b70e_snd__462(f)), n: null } } } }))(_31104_toList__458(fields))), n: null } })), n: { v: _1fda7_line__437, n: { v: _1fda7_rbrace__464, n: null } } } }));
    } else if (__x__.__constructor === "DictionaryConstructor" && true) {
      let fields = __x__.__args[0];
      return _1fda7_group__447(_1fda7_hcat__438({ v: _1fda7_text__422(`{{`), n: { v: _1fda7_nest__446(2)(_1fda7_hcat__438({ v: _1fda7_line__437, n: { v: _1fda7_sepBy__444(_1fda7_hcat__438({ v: _1fda7_comma__435, n: { v: _1fda7_line__437, n: null } }))(_1dd2b_map__468((f) => _1fda7_hcat__438({ v: _91e6c_valueToDoc__421(colored)(_6b70e_fst__466(f)), n: { v: _1fda7_colon__460, n: { v: _1fda7_space__461, n: { v: _91e6c_valueToDoc__421(colored)(_6b70e_snd__467(f)), n: null } } } }))(_31104_toList__465(fields))), n: null } })), n: { v: _1fda7_line__437, n: { v: _1fda7_text__422(`}}`), n: null } } } }));
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(v);
  var _051c8_isEmpty__505 = (s) => __eq__(s, ``);
  var _35c24_Since__867 = (__P__1) => _3d769_ifElse__869(_051c8_isEmpty__505)(_3d769_always__868(_5906d_empty__667(null)(null)))((since) => _5906d_p__646({ v: _0fac7_className__561(`definition__since`), n: null })({ v: `"since v"`, n: { v: since, n: null } }))(((__R__) => __R__.since)(__P__1));
  var _35c24_Since__874 = (__P__1) => _3d769_ifElse__869(_051c8_isEmpty__505)(_3d769_always__868(_5906d_empty__667(null)(null)))((since) => _5906d_p__646({ v: _0fac7_className__561(`definition__since`), n: null })({ v: `"since v"`, n: { v: since, n: null } }))(((__R__) => __R__.since)(__P__1));
  var _35c24_Since__880 = (__P__1) => _3d769_ifElse__869(_051c8_isEmpty__505)(_3d769_always__868(_5906d_empty__667(null)(null)))((since) => _5906d_p__646({ v: _0fac7_className__561(`definition__since`), n: null })({ v: `"since v"`, n: { v: since, n: null } }))(((__R__) => __R__.since)(__P__1));
  var _35c24_Since__885 = (__P__1) => _3d769_ifElse__869(_051c8_isEmpty__505)(_3d769_always__868(_5906d_empty__667(null)(null)))((since) => _5906d_p__646({ v: _0fac7_className__561(`definition__since`), n: null })({ v: `"since v"`, n: { v: since, n: null } }))(((__R__) => __R__.since)(__P__1));
  var _35c24_Since__892 = (__P__1) => _3d769_ifElse__869(_051c8_isEmpty__505)(_3d769_always__868(_5906d_empty__667(null)(null)))((since) => _5906d_p__646({ v: _0fac7_className__561(`definition__since`), n: null })({ v: `"since v"`, n: { v: since, n: null } }))(((__R__) => __R__.since)(__P__1));
  var _5dc4d_Example__871 = (__P__1) => _3d769_ifElse__869(_051c8_isEmpty__505)(_3d769_always__868(_5906d_empty__667(null)(null)))((example) => _5906d_p__646({ v: _0fac7_className__561(`definition__example`), n: null })({ v: example, n: null }))(((__R__) => __R__.example)(__P__1));
  var _5dc4d_Example__876 = (__P__1) => _3d769_ifElse__869(_051c8_isEmpty__505)(_3d769_always__868(_5906d_empty__667(null)(null)))((example) => _5906d_p__646({ v: _0fac7_className__561(`definition__example`), n: null })({ v: example, n: null }))(((__R__) => __R__.example)(__P__1));
  var _5dc4d_Example__882 = (__P__1) => _3d769_ifElse__869(_051c8_isEmpty__505)(_3d769_always__868(_5906d_empty__667(null)(null)))((example) => _5906d_p__646({ v: _0fac7_className__561(`definition__example`), n: null })({ v: example, n: null }))(((__R__) => __R__.example)(__P__1));
  var _5dc4d_Example__887 = (__P__1) => _3d769_ifElse__869(_051c8_isEmpty__505)(_3d769_always__868(_5906d_empty__667(null)(null)))((example) => _5906d_p__646({ v: _0fac7_className__561(`definition__example`), n: null })({ v: example, n: null }))(((__R__) => __R__.example)(__P__1));
  var _5dc4d_Example__894 = (__P__1) => _3d769_ifElse__869(_051c8_isEmpty__505)(_3d769_always__868(_5906d_empty__667(null)(null)))((example) => _5906d_p__646({ v: _0fac7_className__561(`definition__example`), n: null })({ v: example, n: null }))(((__R__) => __R__.example)(__P__1));
  var _051c8_fromList__158 = (list) => {
    let chars = [];
    while (list !== null) {
      chars.push(list.v);
      list = list.n;
    }
    return chars.join("");
  };
  var _051c8_repeat__475 = (c) => (n) => ((__P__6) => _051c8_fromList__158(_1dd2b_repeat__476(c)(__P__6)))(n);
  var _1fda7_indentation__474 = (n) => _051c8_repeat__475(String.fromCodePoint(32))(n);
  var _051c8_singleton__302 = (c) => _051c8_fromList__158({ v: c, n: null });
  var _051c8_drop__127 = (n) => (s) => _051c8_slice__128(n)(0)(s);
  var _051c8_dropLast__509 = (n) => (s) => _051c8_slice__128(0)(-n)(s);
  var _051c8_appendChar__473 = (c) => (s) => {
    return s + c;
  };
  var _1fda7_prettyPrint__469 = (width) => (doc) => {
    let helper__0;
    helper__0 = (pretty) => (d) => {
      let $_result_;
      let $_continue_ = true;
      let $$pretty = pretty;
      let $$d = d;
      while ($_continue_) {
        let $pretty = $$pretty;
        let $d = $$d;
        $_continue_ = false;
        ((__x__) => {
          if (__x__.__constructor === "SEmpty") {
            $_result_ = $pretty;
          } else if (__x__.__constructor === "SChar" && true && true) {
            let c = __x__.__args[0];
            let next = __x__.__args[1];
            $$pretty = _051c8_appendChar__473(c)($pretty), $$d = next, $_continue_ = true;
          } else if (__x__.__constructor === "SText" && true && true && true) {
            let s = __x__.__args[1];
            let next = __x__.__args[2];
            $$pretty = _10f79_assoc__256()($pretty)(s), $$d = next(), $_continue_ = true;
          } else if (__x__.__constructor === "SLine" && true && true) {
            let i = __x__.__args[0];
            let next = __x__.__args[1];
            $$pretty = _10f79_assoc__256()($pretty)(_10f79_assoc__256()(`
`)(_1fda7_indentation__474(i))), $$d = next, $_continue_ = true;
          } else {
            console.log("non exhaustive patterns for value: ", __x__.toString());
            console.trace();
            throw "non exhaustive patterns!";
          }
        })($d);
      }
      return $_result_;
    };
    return helper__0(``)(_1fda7_renderPretty__470(0)(width)(doc));
  };
  var _051c8__charAt__126 = (nothing) => (just) => (n) => (s) => {
    const c = s[n];
    return !!c ? just(c) : nothing;
  };
  var _051c8_charAt__125 = (n) => (s) => _051c8__charAt__126(_2e42b_Nothing)(_2e42b_Just)(n)(s);
  var _051c8_firstChar__177 = _051c8_charAt__125(0);
  var _c821c_performSplitPath__494 = (buffer) => (foundSlash) => (path) => {
    let $_result_;
    let $_continue_ = true;
    let $$buffer = buffer;
    let $$foundSlash = foundSlash;
    let $$path = path;
    while ($_continue_) {
      let $buffer = $$buffer;
      let $foundSlash = $$foundSlash;
      let $path = $$path;
      $_continue_ = false;
      ((__x__) => {
        if (__x__.__constructor === "Nothing") {
          $_result_ = { v: $buffer, n: null };
        } else if (__x__.__constructor === "Just" && __x__.__args[0] === String.fromCodePoint(47)) {
          $$buffer = _10f79_assoc__256()($buffer)(`/`), $$foundSlash = true, $$path = _051c8_drop__127(1)($path), $_continue_ = true;
        } else if (__x__.__constructor === "Just" && true) {
          let char = __x__.__args[0];
          $foundSlash ? $_result_ = _10f79_mappend__495()({ v: $buffer, n: null })(_c821c_performSplitPath__494(_051c8_prependChar__178(char)(``))(false)(_051c8_drop__127(1)($path))) : ($$buffer = _10f79_assoc__256()($buffer)(_051c8_prependChar__178(char)(``)), $$foundSlash = false, $$path = _051c8_drop__127(1)($path), $_continue_ = true);
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(_051c8_firstChar__177($path));
    }
    return $_result_;
  };
  var _c821c_splitPath__493 = _c821c_performSplitPath__494(``)(false);
  var _051c8_lastChar__502 = (s) => _051c8_charAt__125(_051c8_length__423(s) - 1)(s);
  var _c821c_dropTrailingPathSeparator__508 = _3d769_ifElse__500((path) => !__eq__(path, `/`) && __eq__(_051c8_lastChar__502(path), _2e42b_Just(String.fromCodePoint(47))))(_051c8_dropLast__509(1))(_3d769_identity__497);
  var _c821c_joinPath__504 = (__P__1) => _3d769_ifElse__515((__P__4) => _3d769_equals__514(_2e42b_Just(`/`))(_1dd2b_first__513(__P__4)))((__P__3) => _10f79_mappend__271()(`/`)(_051c8_join__427(`/`)(_1dd2b_map__490(_c821c_dropTrailingPathSeparator__508)(_1dd2b_drop__510(1)(__P__3)))))((__P__2) => _051c8_join__427(`/`)(_1dd2b_map__490(_c821c_dropTrailingPathSeparator__508)(__P__2)))(_1dd2b_filter__507(_3d769_complement__506(_051c8_isEmpty__505))(__P__1));
  var _c821c_canonicalizePath__492 = (__P__5) => _c821c_joinPath__504(_1dd2b_map__490((__P__6) => _3d769_ifElse__500((__P__8) => _3d769_equals__503(_2e42b_Just(String.fromCodePoint(47)))(_051c8_lastChar__502(__P__8)))(_051c8_replace__501(`([^/]+)/*`)(`$1/`))(_3d769_identity__497)(_3d769_ifElse__500((__P__7) => _3d769_equals__499(`./`)(_051c8_take__498(2)(__P__7)))(_051c8_drop__127(2))(_3d769_identity__497)(__P__6)))(_c821c_splitPath__493(__P__5)));
  var _39ce8_hasLongerPath__553 = (path) => (m) => _051c8_length__423(_c821c_canonicalizePath__492(path)) > _051c8_length__423(`/` + m.name);
  var _39ce8_firstModuleIsInPath__552 = (path) => (maybeModule) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let m = __x__.__args[0];
      return _39ce8_hasLongerPath__553(path)(m);
    } else if (__x__.__constructor === "Nothing") {
      return false;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(maybeModule);
  var _39ce8_isItemView__550 = (path) => (mods) => {
    _9bab1_putLine__477(`checking "` + path + `": ` + _10f79_show__267(mods));
    return _3d769_ifElse__556((__P__7) => _3d769_equals__555(1)(_1dd2b_length__554(__P__7)))((__P__6) => _39ce8_firstModuleIsInPath__552(path)(_1dd2b_first__530(__P__6)))(_3d769_always__551(false))(mods);
  };
  var _8781f_generateBreadcrumbName__653 = (__P__3) => ((pathSegment) => __eq__(pathSegment, `/`) || __eq__(pathSegment, ``) ? `home` : pathSegment)(_c821c_canonicalizePath__492(__P__3));
  var _8781f_computeBreadcrumbs__651 = (__P__4) => _6b70e_snd__657(_1dd2b_reduce__655((acc) => (pathSegment) => ((__x__) => {
    if (__x__.length === 2 && true && true) {
      let [prevPath, breadcrumbs] = __x__;
      return ((__P__5) => ((path) => [path, _1dd2b_append__654(_8781f_Breadcrumb(_8781f_generateBreadcrumbName__653(pathSegment))(path))(breadcrumbs)])(_c821c_joinPath__504(_1dd2b_append__652(pathSegment)(__P__5))))({ v: prevPath, n: null });
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(acc))([``, null])(_c821c_splitPath__493(((__R__) => __R__.path)(__P__4))));
  var _8781f_Breadcrumbs__650 = (__P__6) => ((breadcrumbs) => _5906d_ul__649({ v: _0fac7_className__561(`breadcrumbs`), n: null })(breadcrumbs))(_1dd2b_intersperseWithIndex__663((i) => _5906d_li__616({ v: _0fac7_className__561(`breadcrumbs__separator`), n: { v: _0fac7_key__661(`sep-` + _10f79_show__14(i)), n: null } })({ v: `"/"`, n: null }))(_1dd2b_map__662(_8781f_BreadcrumbItem__658)(_8781f_computeBreadcrumbs__651(__P__6))));
  var _c821c_dropPathSegments__517 = (howMany) => (__P__9) => _c821c_joinPath__504(_1dd2b_drop__510(howMany)(_c821c_splitPath__493(__P__9)));
  var _c821c_isRootPathOf__516 = (root) => (path) => {
    let $_result_;
    let $_continue_ = true;
    let $$root = root;
    let $$path = path;
    while ($_continue_) {
      let $root = $$root;
      let $path = $$path;
      $_continue_ = false;
      let rootParts;
      rootParts = _c821c_splitPath__493($root);
      let pathParts;
      pathParts = _c821c_splitPath__493($path);
      let rootStart;
      rootStart = _c821c_dropTrailingPathSeparator__508(_2e42b_fromMaybe__261(``)(_1dd2b_first__513(rootParts)));
      let pathStart;
      pathStart = _c821c_dropTrailingPathSeparator__508(_2e42b_fromMaybe__261(``)(_1dd2b_first__513(pathParts)));
      __eq__(rootStart, pathStart) || __eq__(rootStart, ``) ? __eq__(rootStart, ``) ? $_result_ = true : ($$root = _c821c_dropPathSegments__517(1)($root), $$path = _c821c_dropPathSegments__517(1)($path), $_continue_ = true) : $_result_ = false;
    }
    return $_result_;
  };
  var _39ce8_isParentPath__491 = (parent) => (child) => ((__P__1) => ((__$PH1__) => _c821c_isRootPathOf__516(__$PH1__)(child))(_051c8_drop__127(1)(_051c8_toLower__481(_c821c_canonicalizePath__492(__P__1)))))(parent);
  var _39ce8_walkByPath__480 = (path) => (module) => ((__P__2) => _3d769_ifElse__526(_39ce8_isParentPath__491(path))(_3d769_always__525(_39ce8_emptyPaths__519(module)))((__P__3) => _1dd2b_any__518(_39ce8_isParentPath__491(path))(_1dd2b_map__490((__P__4) => _051c8_toLower__481(_10f79_mappend__271()(module.name + `/`)(__P__4)))(_3d769_always__489(_39ce8_getPossiblePaths__482(module))(__P__3))))(_051c8_toLower__481(((__R__) => __R__.name)(__P__2))))(module);
  var _39ce8_filterByPath__479 = (path) => (modules) => _1dd2b_filter__527(_39ce8_walkByPath__480(path))(modules);
  var _39ce8_getModulesToShow__478 = (state) => ((__P__5) => _39ce8_filterByPath__479(state.path)(((__R__) => __R__.modules)(__P__5)))(state);
  var _a32d2_anyChar__124 = _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let c = __x__.__args[0];
      return [{ v: [c, _051c8_drop__127(1)(s)], n: null }, _a32d2_incLoc__129(c)(l)];
    } else if (__x__.__constructor === "Nothing") {
      return [null, l];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_051c8_charAt__125(0)(s)));
  var _a32d2_eof__728 = _a32d2_Parser((s) => (l) => ((__x__) => {
    if (__x__.length === 2 && __x__[0] === null && true) {
      let [,] = __x__;
      return [{ v: [{ __constructor: "Unit", __args: [] }, ``], n: null }, l];
    } else if (true) {
      return [null, l];
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_a32d2_parse__137(_a32d2_anyChar__124)(s)(l)));
  var _a32d2_satisfy__123 = (pred) => _a32d2_chain__136(_3d769_ifElse__135(pred)(_a32d2_of__133())(_3d769_always__132(_a32d2_fail__130)))(_a32d2_anyChar__124);
  var _a32d2_char__148 = (__P__3) => _a32d2_satisfy__123(_3d769_equals__149(__P__3));
  var _1c6a3_lineReturn__778 = _a32d2_map__780(_3d769_always__779(_1c6a3_LineReturn))(_a32d2_char__148(String.fromCodePoint(10)));
  var _1c6a3_lineReturnExceptBefore__777 = (before) => ((__P__16) => _a32d2_chain__792((__W__17) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      return _a32d2_aempty__735();
    } else if (__x__.__constructor === "Nothing") {
      return _1c6a3_lineReturn__778;
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__17))(_a32d2_lookAhead__791(((__$PH11__) => _a32d2_ap__789(__$PH11__)(_a32d2_alt__787(_a32d2_map__786(_3d769_always__785(_2e42b_Just()))(before))(_a32d2_pure__784(_2e42b_Nothing))))(_5b0b9_mapL__782(_3d769_identity__781)(__P__16)))))(_1c6a3_lineReturn__778);
  var _91e6c_escapedChar__292 = (() => {
    return _a32d2_chain__294((backslash) => _a32d2_chain__294((escaped) => ((__P__5) => _a32d2_of__293()(_051c8_fromList__158(__P__5)))({ v: backslash, n: { v: escaped, n: null } }))(_a32d2_anyChar__124))(_a32d2_char__148(String.fromCodePoint(92)));
  })();
  var _91e6c_maybeMinus__340 = _a32d2_alt__144(_a32d2_map__343(_1dd2b_of__341())(_a32d2_char__148(String.fromCodePoint(45))))(_a32d2_pure__119(null));
  var _a32d2_string__176 = (s) => ((__x__) => {
    if (__x__.__constructor === "Just" && true) {
      let c = __x__.__args[0];
      return ((__P__5) => ((__$PH4__) => _a32d2_ap__180(__$PH4__)(_a32d2_string__176(_051c8_drop__127(1)(s))))(_a32d2_map__179((a) => (b) => _051c8_prependChar__178(a)(b))(__P__5)))(_a32d2_char__148(c));
    } else if (__x__.__constructor === "Nothing") {
      return _a32d2_pure__183(``);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_051c8_firstChar__177(s));
  var _1c6a3_doubleReturnTerminal__798 = _a32d2_choice__191({ v: _a32d2_string__176(`

`), n: { v: _a32d2_map__730(_3d769_always__729(``))(_a32d2_eof__728), n: { v: ((__P__20) => ((__$PH14__) => _a32d2_ap__802(__$PH14__)(_a32d2_eof__728))(_a32d2_ap__800(_a32d2_pure__799((_) => (_2) => ``))(__P__20)))(_a32d2_char__148(String.fromCodePoint(10))), n: null } } });
  var _1c6a3_singleReturnTerminal__744 = _a32d2_alt__194(_a32d2_string__176(`
`))(_a32d2_map__730(_3d769_always__729(``))(_a32d2_eof__728));
  var _91e6c_boolean__286 = ((__P__4) => _a32d2_map__285(_91e6c_Boolean)(_a32d2_alt__194(_a32d2_string__176(`false`))(__P__4)))(_a32d2_string__176(`true`));
  var _a32d2_digit__153 = _a32d2_satisfy__123(_d4261_isDigit__154);
  var _29844_jsonFloat__145 = (() => {
    return _a32d2_chain__169((negSignChar) => _a32d2_chain__166((beforeDot) => _a32d2_chain__168((dot) => _a32d2_chain__166((afterDot) => {
      let start;
      start = ((__x__) => {
        if (__x__.__constructor === "Just" && true) {
          let s = __x__.__args[0];
          return { v: s, n: beforeDot };
        } else if (true) {
          return beforeDot;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(negSignChar);
      return ((__P__4) => ((__W__5) => ((__x__) => {
        if (__x__.__constructor === "Just" && true) {
          let f = __x__.__args[0];
          return _a32d2_of__162()(_b9d70_JsonFloat(f));
        } else if (__x__.__constructor === "Nothing") {
          return _a32d2_fail__164;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__W__5))(_d0d4c_scan__159()(_051c8_fromList__158(((__$PH1__) => _1dd2b_concat__156(__$PH1__)(afterDot))(__P__4)))))(_1dd2b_append__155(dot)(start));
    })(_a32d2_some__138(_a32d2_digit__153)))(_a32d2_char__148(String.fromCodePoint(46))))(_a32d2_some__138(_a32d2_digit__153)))(_a32d2_alt__151(_a32d2_map__150(_2e42b_Just)(_a32d2_char__148(String.fromCodePoint(45))))(_a32d2_of__146()(_2e42b_Nothing)));
  })();
  var _29844_jsonInteger__170 = (() => {
    return _a32d2_chain__169((negSignChar) => _a32d2_chain__166((digitChars) => {
      let allChars;
      allChars = ((__x__) => {
        if (__x__.__constructor === "Just" && true) {
          let s = __x__.__args[0];
          return { v: s, n: digitChars };
        } else if (true) {
          return digitChars;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(negSignChar);
      return ((__P__2) => ((__W__3) => ((__x__) => {
        if (__x__.__constructor === "Just" && true) {
          let i = __x__.__args[0];
          return _a32d2_of__162()(_b9d70_JsonInteger(i));
        } else if (__x__.__constructor === "Nothing") {
          return _a32d2_fail__164;
        } else {
          console.log("non exhaustive patterns for value: ", __x__.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(__W__3))(_176d5_scan__171()(_051c8_fromList__158(__P__2))))(allChars);
    })(_a32d2_some__138(_a32d2_digit__153)))(_a32d2_alt__151(_a32d2_map__150(_2e42b_Just)(_a32d2_char__148(String.fromCodePoint(45))))(_a32d2_of__146()(_2e42b_Nothing)));
  })();
  var _91e6c_float__339 = (() => {
    return _a32d2_chain__344((minus) => _a32d2_chain__344((before) => _a32d2_chain__298((dot) => _a32d2_chain__344((after) => ((__P__3) => _a32d2_of__296()(_91e6c_Float(_051c8_fromList__158(__P__3))))(__listCtorSpread__(minus, __listCtorSpread__(before, { v: dot, n: after }))))(_a32d2_some__138(_a32d2_digit__153)))(_a32d2_char__148(String.fromCodePoint(46))))(_a32d2_some__138(_a32d2_digit__153)))(_91e6c_maybeMinus__340);
  })();
  var _91e6c_integer__346 = (() => {
    return _a32d2_chain__344((minus) => _a32d2_chain__344((digits) => ((__P__1) => _a32d2_of__296()(_91e6c_Integer(_051c8_fromList__158(__P__1))))(__listCtorSpread__(minus, digits)))(_a32d2_some__138(_a32d2_digit__153)))(_91e6c_maybeMinus__340);
  })();
  var _a32d2_letter__324 = _a32d2_satisfy__123(_d4261_isLetter__325);
  var _1c6a3_linkCharacter__722 = _a32d2_choice__203({ v: _a32d2_letter__324, n: { v: _a32d2_digit__153, n: { v: _a32d2_char__148(String.fromCodePoint(33)), n: { v: _a32d2_char__148(String.fromCodePoint(35)), n: { v: _a32d2_char__148(String.fromCodePoint(36)), n: { v: _a32d2_char__148(String.fromCodePoint(37)), n: { v: _a32d2_char__148(String.fromCodePoint(38)), n: { v: _a32d2_char__148(String.fromCodePoint(39)), n: { v: _a32d2_char__148(String.fromCodePoint(42)), n: { v: _a32d2_char__148(String.fromCodePoint(43)), n: { v: _a32d2_char__148(String.fromCodePoint(44)), n: { v: _a32d2_char__148(String.fromCodePoint(45)), n: { v: _a32d2_char__148(String.fromCodePoint(46)), n: { v: _a32d2_char__148(String.fromCodePoint(47)), n: { v: _a32d2_char__148(String.fromCodePoint(58)), n: { v: _a32d2_char__148(String.fromCodePoint(59)), n: { v: _a32d2_char__148(String.fromCodePoint(61)), n: { v: _a32d2_char__148(String.fromCodePoint(63)), n: { v: _a32d2_char__148(String.fromCodePoint(64)), n: { v: _a32d2_char__148(String.fromCodePoint(95)), n: { v: _a32d2_char__148(String.fromCodePoint(126)), n: null } } } } } } } } } } } } } } } } } } } } });
  var _91e6c_alphaNumericalName__323 = (() => {
    return _a32d2_chain__294((firstChar) => _a32d2_chain__327((rest) => ((__P__10) => _a32d2_of__293()(_051c8_fromList__158(__P__10)))({ v: firstChar, n: rest }))(_a32d2_many__139(_a32d2_choice__203({ v: _a32d2_letter__324, n: { v: _a32d2_digit__153, n: null } }))))(_a32d2_letter__324);
  })();
  var _a32d2_letters__807 = _a32d2_many__139(_a32d2_letter__324);
  var _1c6a3_code__804 = ((__P__21) => ((__$PH18__) => _adecf_apL__745(__$PH18__)(_a32d2_choice__191({ v: _a32d2_map__295((_) => ``)(_adecf_apL__814(_a32d2_string__176(`
\`\`\``))(_a32d2_eof__728)), n: { v: _a32d2_string__176(`
\`\`\`
`), n: null } })))(((__$PH17__) => _a32d2_ap__748(__$PH17__)(_a32d2_map__693(_051c8_fromList__158)(_a32d2_manyTill__690(_a32d2_anyChar__124)(_a32d2_lookAhead__688(_a32d2_string__176(`
\`\`\``))))))(((__$PH16__) => _adecf_apL__810(__$PH16__)(_a32d2_char__148(String.fromCodePoint(10))))(((__$PH15__) => _a32d2_ap__808(__$PH15__)(_a32d2_alt__194(_a32d2_map__693(_051c8_fromList__158)(_a32d2_letters__807))(_a32d2_pure__183(``))))(_5b0b9_mapL__805((lang) => (c) => _1c6a3_Code(lang)(c))(__P__21))))))(_a32d2_string__176(`\`\`\``));
  var _a32d2_notChar__201 = (__P__4) => _a32d2_satisfy__123(_3d769_notEquals__202(__P__4));
  var _1c6a3_bold__685 = ((__P__2) => ((__$PH4__) => _adecf_apL__696(__$PH4__)(_a32d2_string__176(`**`)))(((__$PH3__) => _a32d2_ap__694(__$PH3__)(((__P__3) => _a32d2_map__693(_051c8_fromList__158)(((a) => _a32d2_someTill__689(a)(_a32d2_lookAhead__688(_a32d2_string__176(`**`))))(__P__3)))(_a32d2_notChar__201(String.fromCodePoint(10)))))(_5b0b9_mapL__686(_1c6a3_Bold)(__P__2))))(_a32d2_string__176(`**`));
  var _29844_stringCharacter__198 = _a32d2_choice__203({ v: _a32d2_map__200(_3d769_always__199(String.fromCodePoint(34)))(_a32d2_string__176(`\\"`)), n: { v: _a32d2_map__200(_3d769_always__199(String.fromCodePoint(10)))(_a32d2_string__176(`\\n`)), n: { v: _a32d2_map__200(_3d769_always__199(String.fromCodePoint(9)))(_a32d2_string__176(`\\t`)), n: { v: _a32d2_notChar__201(String.fromCodePoint(34)), n: null } } } });
  var _a32d2_notOneOf__288 = (cs) => _a32d2_satisfy__123(_3d769_complement__289((__$PH2__) => _1dd2b_includes__122(__$PH2__)(cs)));
  var _1c6a3_image__711 = ((__P__10) => ((__$PH9__) => _a32d2_ap__694(__$PH9__)(_1c6a3_between__714(_a32d2_char__148(String.fromCodePoint(40)))(((__P__12) => _a32d2_map__693(_051c8_fromList__158)(_a32d2_many__139(__P__12)))(_1c6a3_linkCharacter__722))(_a32d2_char__148(String.fromCodePoint(41)))))(((__$PH8__) => _a32d2_ap__720(__$PH8__)(_1c6a3_between__714(_a32d2_char__148(String.fromCodePoint(91)))(((__P__11) => _a32d2_map__693(_051c8_fromList__158)(_a32d2_many__139(__P__11)))(_a32d2_notOneOf__288({ v: String.fromCodePoint(93), n: { v: String.fromCodePoint(10), n: null } })))(_a32d2_char__148(String.fromCodePoint(93)))))(_5b0b9_mapL__712(_1c6a3_Image)(__P__10))))(_a32d2_char__148(String.fromCodePoint(33)));
  var _1c6a3_inlineCode__704 = ((__P__5) => ((__$PH6__) => _adecf_apL__707(__$PH6__)(_a32d2_char__148(String.fromCodePoint(96))))(((__$PH5__) => _a32d2_ap__694(__$PH5__)(((__P__6) => _a32d2_map__693(_051c8_fromList__158)(_a32d2_many__139(__P__6)))(_a32d2_notOneOf__288({ v: String.fromCodePoint(96), n: { v: String.fromCodePoint(10), n: null } }))))(_5b0b9_mapL__705(_1c6a3_InlineCode)(__P__5))))(_a32d2_char__148(String.fromCodePoint(96)));
  var _1c6a3_italic__699 = (() => {
    return _a32d2_chain__702((_) => _a32d2_chain__702((firstChar) => _a32d2_chain__703((nextChars) => _a32d2_chain__702((_2) => ((__P__4) => _a32d2_of__700()(_1c6a3_Italic(_051c8_prependChar__178(firstChar)(_051c8_fromList__158(__P__4)))))({ v: firstChar, n: nextChars }))(_a32d2_char__148(String.fromCodePoint(42))))(_a32d2_many__139(_a32d2_notOneOf__288({ v: String.fromCodePoint(42), n: { v: String.fromCodePoint(10), n: null } }))))(_a32d2_notChar__201(String.fromCodePoint(32))))(_a32d2_char__148(String.fromCodePoint(42)));
  })();
  var _1c6a3_link__723 = ((__P__8) => ((__$PH7__) => _a32d2_ap__694(__$PH7__)(_1c6a3_between__714(_a32d2_char__148(String.fromCodePoint(40)))(((__P__9) => _a32d2_map__693(_051c8_fromList__158)(_a32d2_many__139(__P__9)))(_1c6a3_linkCharacter__722))(_a32d2_char__148(String.fromCodePoint(41)))))(_a32d2_map__687(_1c6a3_Link)(__P__8)))(_1c6a3_between__714(_a32d2_char__148(String.fromCodePoint(91)))(((__P__7) => _a32d2_map__693(_051c8_fromList__158)(_a32d2_many__139(__P__7)))(_a32d2_notOneOf__288({ v: String.fromCodePoint(93), n: { v: String.fromCodePoint(10), n: null } })))(_a32d2_char__148(String.fromCodePoint(93))));
  var _1c6a3_textTerminals__725 = _a32d2_choice__191({ v: _a32d2_map__727(_3d769_always__726(``))(_1c6a3_bold__685), n: { v: _a32d2_map__727(_3d769_always__726(``))(_1c6a3_italic__699), n: { v: _a32d2_map__727(_3d769_always__726(``))(_1c6a3_inlineCode__704), n: { v: _a32d2_map__727(_3d769_always__726(``))(_1c6a3_image__711), n: { v: _a32d2_map__727(_3d769_always__726(``))(_1c6a3_link__723), n: { v: _a32d2_map__730(_3d769_always__729(``))(_a32d2_eof__728), n: { v: _a32d2_string__176(`
`), n: null } } } } } } });
  var _1c6a3_text__724 = ((__P__13) => _a32d2_map__732((__P__14) => _1c6a3_Text(_051c8_fromList__158(__P__14)))(((__$PH10__) => _a32d2_someTill__689(__$PH10__)(_a32d2_lookAhead__688(_1c6a3_textTerminals__725)))(__P__13)))(_a32d2_notChar__201(String.fromCodePoint(10)));
  var _1c6a3_contentWithLineReturn__776 = (delimiter) => ((__P__18) => _a32d2_map__794(_1dd2b_dropWhile__797(_3d769_equals__796(_1c6a3_LineReturn)))(_a32d2_some__793(_a32d2_choice__733(__P__18))))({ v: _1c6a3_bold__685, n: { v: _1c6a3_italic__699, n: { v: _1c6a3_inlineCode__704, n: { v: _1c6a3_image__711, n: { v: _1c6a3_link__723, n: { v: _1c6a3_text__724, n: { v: _1c6a3_lineReturnExceptBefore__777(delimiter), n: null } } } } } } });
  var _1c6a3_content__684 = ((__P__15) => _a32d2_many__739(_a32d2_choice__733(__P__15)))({ v: _1c6a3_bold__685, n: { v: _1c6a3_italic__699, n: { v: _1c6a3_inlineCode__704, n: { v: _1c6a3_image__711, n: { v: _1c6a3_link__723, n: { v: _1c6a3_text__724, n: null } } } } } });
  var _91e6c_char__287 = (() => {
    return _a32d2_chain__298((_) => _a32d2_chain__300((c) => _a32d2_chain__298((_2) => ((__P__7) => _a32d2_of__296()(_91e6c_Char(__P__7)))(c))(_a32d2_char__148(String.fromCodePoint(39))))(((__P__6) => ((__$PH1__) => _a32d2_alt__194(__$PH1__)(_a32d2_map__295((c) => `'` + c + `'`)(_91e6c_escapedChar__292)))(_a32d2_map__291((c) => _10f79_show__290(c))(__P__6)))(_a32d2_notOneOf__288({ v: String.fromCodePoint(39), n: { v: String.fromCodePoint(92), n: null } }))))(_a32d2_char__148(String.fromCodePoint(39)));
  })();
  var _91e6c_string__301 = (() => {
    return _a32d2_chain__298((_) => _a32d2_chain__300((content) => _a32d2_chain__298((_2) => ((__P__9) => _a32d2_of__296()(_91e6c_Str(__P__9)))(content))(_a32d2_char__148(String.fromCodePoint(34))))(((__P__8) => _a32d2_map__295((s) => `"` + s + `"`)(_a32d2_map__307(_1dd2b_reduce__305(_10f79_mappend__271())(``))(_a32d2_many__303(((__$PH2__) => _a32d2_alt__194(__$PH2__)(_91e6c_escapedChar__292))(_a32d2_map__291(_051c8_singleton__302)(__P__8))))))(_a32d2_notOneOf__288({ v: String.fromCodePoint(34), n: { v: String.fromCodePoint(92), n: null } }))))(_a32d2_char__148(String.fromCodePoint(34)));
  })();
  var _a32d2_oneOf__121 = (cs) => _a32d2_satisfy__123((__$PH1__) => _1dd2b_includes__122(__$PH1__)(cs));
  var _1c6a3_listItemStart__752 = _a32d2_map__693(_3d769_always__761(``))(_adecf_apL__757(_a32d2_many__139(_a32d2_char__148(String.fromCodePoint(32))))(_adecf_apL__753(_a32d2_oneOf__121({ v: String.fromCodePoint(42), n: { v: String.fromCodePoint(45), n: { v: String.fromCodePoint(43), n: null } } }))(_a32d2_some__138(_a32d2_char__148(String.fromCodePoint(32))))));
  var _1c6a3_paragraph__816 = ((__P__25) => ((__$PH21__) => _adecf_apL__745(__$PH21__)(_a32d2_choice__191({ v: _1c6a3_doubleReturnTerminal__798, n: { v: _a32d2_lookAhead__688(_a32d2_string__176(`
\`\`\``)), n: { v: _a32d2_lookAhead__688(_a32d2_string__176(`
>`)), n: { v: _a32d2_lookAhead__688(_adecf_apL__818(_a32d2_string__176(`
`))(_1c6a3_listItemStart__752)), n: null } } } })))(_a32d2_map__817(_1c6a3_Paragraph)(__P__25)))(_1c6a3_contentWithLineReturn__776(_a32d2_choice__191({ v: _1c6a3_listItemStart__752, n: { v: _a32d2_string__176(`
`), n: { v: _a32d2_string__176(`\`\`\``), n: { v: _a32d2_string__176(`>`), n: null } } } })));
  var _1c6a3_unorderedListItem__751 = ((__P__23) => _a32d2_chain__767(_3d769_always__766(_adecf_apL__762(_1c6a3_content__684)(_1c6a3_singleReturnTerminal__744)))(__P__23))(_1c6a3_listItemStart__752);
  var _1c6a3_unorderedList__750 = ((__P__24) => _a32d2_map__774(_1c6a3_UnorderedList)(_a32d2_some__768(__P__24)))(_1c6a3_unorderedListItem__751);
  var _91e6c__byte__311 = (() => {
    return _a32d2_chain__298((char1) => _a32d2_chain__298((char2) => _a32d2_of__296()(_91e6c_Byte(_051c8_fromList__158({ v: char1, n: { v: char2, n: null } }))))(_a32d2_oneOf__121(_91e6c_BYTE_CHARS__312)))(_a32d2_oneOf__121(_91e6c_BYTE_CHARS__312));
  })();
  var _91e6c_integerOrByte__345 = (() => {
    return _a32d2_chain__344((minus) => _a32d2_chain__344((digits) => ((__P__2) => _a32d2_of__296()(_91e6c_Integer(_051c8_fromList__158(__P__2))))(__listCtorSpread__(minus, digits)))(_a32d2_some__138(_a32d2_oneOf__121(_91e6c_BYTE_CHARS__312))))(_91e6c_maybeMinus__340);
  })();
  var _a32d2_spaces__120 = ((__P__6) => _a32d2_some__138(_a32d2_oneOf__121(__P__6)))({ v: String.fromCodePoint(32), n: { v: String.fromCodePoint(10), n: { v: String.fromCodePoint(13), n: { v: String.fromCodePoint(9), n: null } } } });
  var _a32d2_token__184 = (__$PH5__) => _adecf_apL__185(__$PH5__)(_a32d2_alt__144(_a32d2_spaces__120)(_a32d2_pure__119(null)));
  var _a32d2_symbol__175 = (__P__7) => _a32d2_token__184(_a32d2_string__176(__P__7));
  var _1c6a3_blockquote__775 = ((__P__22) => ((__$PH20__) => _adecf_apL__745(__$PH20__)(_a32d2_choice__191({ v: _1c6a3_doubleReturnTerminal__798, n: { v: _a32d2_lookAhead__688(_a32d2_string__176(`
\`\`\``)), n: { v: _a32d2_lookAhead__688(_a32d2_string__176(`
>`)), n: null } } })))(((__$PH19__) => _a32d2_ap__741(__$PH19__)(_1c6a3_contentWithLineReturn__776(_a32d2_choice__191({ v: _a32d2_string__176(`
`), n: { v: _a32d2_string__176(`\`\`\``), n: { v: _a32d2_string__176(`>`), n: null } } }))))(_5b0b9_mapL__682(_1c6a3_Blockquote)(__P__22))))(_a32d2_alt__194(_a32d2_symbol__175(`>`))(_a32d2_string__176(`>`)));
  var _1c6a3_heading__681 = (constructor) => (__P__19) => ((__$PH13__) => _adecf_apL__745(__$PH13__)(_1c6a3_singleReturnTerminal__744))(((__$PH12__) => _a32d2_ap__741(__$PH12__)(_1c6a3_content__684))(_5b0b9_mapL__682(constructor)(_a32d2_symbol__175(__P__19))));
  var _1c6a3_block__680 = _a32d2_choice__820({ v: _1c6a3_heading__681(_1c6a3_H6)(`######`), n: { v: _1c6a3_heading__681(_1c6a3_H5)(`#####`), n: { v: _1c6a3_heading__681(_1c6a3_H4)(`####`), n: { v: _1c6a3_heading__681(_1c6a3_H3)(`###`), n: { v: _1c6a3_heading__681(_1c6a3_H2)(`##`), n: { v: _1c6a3_heading__681(_1c6a3_H1)(`#`), n: { v: _1c6a3_unorderedList__750, n: { v: _1c6a3_blockquote__775, n: { v: _1c6a3_code__804, n: { v: _1c6a3_paragraph__816, n: null } } } } } } } } } });
  var _1c6a3_markdownParser__677 = ((__P__26) => _a32d2_map__837(_1dd2b_mapMaybe__836((x) => x))(_a32d2_many__834(_a32d2_choice__827(__P__26))))({ v: _a32d2_map__679(_3d769_always__678(_2e42b_Nothing))(_a32d2_spaces__120), n: { v: _a32d2_map__826(_2e42b_Just)(_1c6a3_block__680), n: null } });
  var _1c6a3_parseMarkdown__676 = (__P__27) => _42e19_mapLeft__842(_3d769_always__841(`Malformed markdown input`))(_a32d2_runParser__839(_1c6a3_markdownParser__677)(__P__27));
  var _bcfe4_renderMarkdownWithConfig__675 = (config) => (__P__3) => ((__W__4) => ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let ast = __x__.__args[0];
      return _bcfe4_doRender__843(config)(ast);
    } else if (__x__.__constructor === "Left" && true) {
      return _5906d_p__646(null)({ v: `"Error processing the given markdown"`, n: null });
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__4))(_1c6a3_parseMarkdown__676(__P__3));
  var _1129f_renderMarkdown__668 = _bcfe4_renderMarkdownWithConfig__675(_1129f_mdConfig__669);
  var _419f8_Description__870 = (__P__1) => ((content) => _5906d_div__603({ v: _0fac7_className__561(`definition__description`), n: null })({ v: content, n: null }))(_1129f_renderMarkdown__668(((__R__) => __R__.description)(__P__1)));
  var _6d366_Type__860 = (moduleName) => (typeDefinition) => {
    let constructors;
    constructors = typeDefinition.constructors;
    let manyCtors;
    manyCtors = _1dd2b_length__512(constructors) > 1;
    let renderedConstructors;
    renderedConstructors = manyCtors ? _6d366_ConstructorsView__861(`=`)(constructors) : { v: _5906d_span__612({ v: _0fac7_className__561(`definition__constructor`), n: null })({ v: _5906d_span__612({ v: _0fac7_className__561(`highlight`), n: null })({ v: `"= "`, n: null }), n: { v: _5906d_span__612(null)({ v: _2e42b_fromMaybe__261(`???`)(_1dd2b_first__513(constructors)), n: null }), n: null } }), n: null };
    return _5906d_li__616({ v: _0fac7_className__561(`definition`), n: null })(__listCtorSpread__({ v: _cc3cb_Etiquette__863(`Type`), n: { v: _b8152_Title__864(typeDefinition.name)({ hasJS: false, hasLLVM: false, isAvailable: false })(moduleName), n: null } }, { v: _5906d_div__603({ v: _0fac7_className__561(`definition__adt`), n: null })({ v: _5906d_span__612({ v: _0fac7_className__561(`highlight`), n: null })({ v: `"type"`, n: null }), n: { v: _5906d_span__612(null)({ v: typeDefinition.name, n: { v: typeDefinition.params, n: null } }), n: { v: _5906d_span__612({ v: _0fac7_className__561(`definition__constructors`), n: null })(renderedConstructors), n: null } } }), n: { v: _35c24_Since__867(typeDefinition), n: { v: _419f8_Description__870(typeDefinition), n: { v: _5dc4d_Example__871(typeDefinition), n: null } } } }));
  };
  var _419f8_Description__875 = (__P__1) => ((content) => _5906d_div__603({ v: _0fac7_className__561(`definition__description`), n: null })({ v: content, n: null }))(_1129f_renderMarkdown__668(((__R__) => __R__.description)(__P__1)));
  var _34268_Alias__873 = (moduleName) => (aliasDef) => {
    let aliasedType;
    aliasedType = aliasDef.aliasedType;
    let params;
    params = _051c8_isEmpty__505(aliasDef.params) ? `` : ` ` + aliasDef.params;
    return _5906d_li__616({ v: _0fac7_className__561(`definition`), n: null })(__listCtorSpread__({ v: _cc3cb_Etiquette__863(`Alias`), n: { v: _b8152_Title__864(aliasDef.name)({ hasJS: false, hasLLVM: false, isAvailable: false })(moduleName), n: null } }, { v: _5906d_div__603({ v: _0fac7_className__561(`definition__adt`), n: null })({ v: _5906d_span__612({ v: _0fac7_className__561(`highlight`), n: null })({ v: `"alias"`, n: null }), n: { v: _5906d_span__612(null)({ v: aliasDef.name, n: { v: params, n: null } }), n: { v: _5906d_span__612({ v: _0fac7_className__561(`definition__constructors`), n: null })({ v: _5906d_span__612({ v: _0fac7_className__561(`definition__constructor`), n: null })({ v: _5906d_span__612({ v: _0fac7_className__561(`highlight`), n: null })({ v: `"= "`, n: null }), n: { v: _5906d_span__612(null)({ v: aliasedType, n: null }), n: null } }), n: null }), n: null } } }), n: { v: _35c24_Since__874(aliasDef), n: { v: _419f8_Description__875(aliasDef), n: { v: _5dc4d_Example__876(aliasDef), n: null } } } }));
  };
  var _419f8_Description__881 = (__P__1) => ((content) => _5906d_div__603({ v: _0fac7_className__561(`definition__description`), n: null })({ v: content, n: null }))(_1129f_renderMarkdown__668(((__R__) => __R__.description)(__P__1)));
  var _cac79_Interface__878 = (moduleName) => (interfaceDef) => {
    let methods;
    methods = interfaceDef.methods;
    let constraints;
    constraints = interfaceDef.constraints;
    let constraintElements;
    constraintElements = !__eq__(constraints, ``) ? { v: _5906d_span__612(null)({ v: constraints, n: null }), n: { v: _5906d_span__612({ v: _0fac7_className__561(`highlight`), n: null })({ v: ` => `, n: null }), n: null } } : null;
    return _5906d_li__616({ v: _0fac7_className__561(`definition`), n: null })(__listCtorSpread__({ v: _cc3cb_Etiquette__863(`Interface`), n: { v: _b8152_Title__864(interfaceDef.name)({ hasJS: false, hasLLVM: false, isAvailable: false })(moduleName), n: null } }, { v: _5906d_div__603({ v: _0fac7_className__561(`definition__interface`), n: null })({ v: _5906d_span__612({ v: _0fac7_className__561(`highlight`), n: null })({ v: `"interface "`, n: null }), n: { v: _5906d_span__612(null)(constraintElements), n: { v: _5906d_span__612(null)({ v: interfaceDef.name, n: { v: interfaceDef.vars, n: null } }), n: { v: _5906d_span__612({ v: _0fac7_className__561(`highlight`), n: null })({ v: ` {`, n: null }), n: { v: _5906d_div__603(null)(_1dd2b_map__879((method) => _5906d_div__603(null)({ v: `"  "`, n: { v: method, n: null } }))(methods)), n: { v: _5906d_span__612({ v: _0fac7_className__561(`highlight`), n: null })({ v: `}`, n: null }), n: null } } } } } }), n: { v: _35c24_Since__880(interfaceDef), n: { v: _419f8_Description__881(interfaceDef), n: { v: _5dc4d_Example__882(interfaceDef), n: null } } } }));
  };
  var _419f8_Description__886 = (__P__1) => ((content) => _5906d_div__603({ v: _0fac7_className__561(`definition__description`), n: null })({ v: content, n: null }))(_1129f_renderMarkdown__668(((__R__) => __R__.description)(__P__1)));
  var _0cada_Instance__884 = (moduleName) => (instanceDef) => {
    let constraints;
    constraints = instanceDef.constraints;
    let constraintElements;
    constraintElements = !__eq__(constraints, ``) ? { v: _5906d_span__612(null)({ v: constraints, n: null }), n: { v: _5906d_span__612({ v: _0fac7_className__561(`highlight`), n: null })({ v: ` => `, n: null }), n: null } } : null;
    return _5906d_li__616({ v: _0fac7_className__561(`definition`), n: null })(__listCtorSpread__({ v: _cc3cb_Etiquette__863(`Instance`), n: { v: _b8152_Title__864(instanceDef.declaration)({ hasJS: false, hasLLVM: false, isAvailable: false })(moduleName), n: null } }, { v: _5906d_div__603({ v: _0fac7_className__561(`definition__interface`), n: null })({ v: _5906d_span__612({ v: _0fac7_className__561(`highlight`), n: null })({ v: `"instance "`, n: null }), n: { v: _5906d_span__612(null)(constraintElements), n: { v: _5906d_span__612(null)({ v: instanceDef.declaration, n: null }), n: null } } }), n: { v: _35c24_Since__885(instanceDef), n: { v: _419f8_Description__886(instanceDef), n: { v: _5dc4d_Example__887(instanceDef), n: null } } } }));
  };
  var _419f8_Description__893 = (__P__1) => ((content) => _5906d_div__603({ v: _0fac7_className__561(`definition__description`), n: null })({ v: content, n: null }))(_1129f_renderMarkdown__668(((__R__) => __R__.description)(__P__1)));
  var _34e39_ExpressionView__890 = (moduleName) => (targetInfo) => (definition) => _5906d_li__616({ v: _0fac7_className__561(`definition` + (targetInfo.isAvailable ? `` : ` definition--greyed-out`)), n: { v: _0fac7_key__661(moduleName + `-` + definition.name), n: null } })({ v: _cc3cb_Etiquette__863(`Function`), n: { v: _b8152_Title__864(definition.name)(targetInfo)(moduleName), n: { v: _12b67_Typing__891(definition), n: { v: _35c24_Since__892(definition), n: { v: _419f8_Description__893(definition), n: { v: _5dc4d_Example__894(definition), n: null } } } } } });
  var _34e39_Expression__889 = (target) => (moduleName) => (definition) => _411df_TargetedItem__895(target)(definition)(_34e39_ExpressionView__890(moduleName));
  var _294a4_ModuleView__665 = (target) => (module) => _5906d_div__603({ v: _0fac7_className__561(`module`), n: null })({ v: _5906d_h2__666({ v: _0fac7_className__561(`module__title`), n: null })({ v: _5906d_link__614({ v: _0fac7_to__613(`/` + module.name), n: null })({ v: module.name, n: null }), n: null }), n: { v: _051c8_isEmpty__505(module.description) ? _5906d_empty__667(null)(null) : _5906d_p__646({ v: _0fac7_className__561(`module__description`), n: null })({ v: _1129f_renderMarkdown__668(module.description), n: null }), n: { v: _5906d_ul__649({ v: _0fac7_className__561(`content__items`), n: null })(__listCtorSpread__(_1dd2b_map__872(_6d366_Type__860(module.name))(module.typeDeclarations), __listCtorSpread__(_1dd2b_map__877(_34268_Alias__873(module.name))(module.aliases), __listCtorSpread__(_1dd2b_map__883(_cac79_Interface__878(module.name))(module.interfaces), __listCtorSpread__(_1dd2b_map__888(_0cada_Instance__884(module.name))(module.instances), _1dd2b_map__896(_34e39_Expression__889(target)(module.name))(module.expressions)))))), n: null } } });
  var _294a4_ContentView__664 = (target) => (pathResult) => ((__x__) => {
    if (__x__.__constructor === "ModuleResult" && true) {
      let modules = __x__.__args[0];
      return _5906d_div__603(null)(_1dd2b_map__617(_294a4_ModuleView__665(target))(modules));
    } else if (__x__.__constructor === "ExpressionResult" && true && true) {
      let moduleName = __x__.__args[0];
      let exp = __x__.__args[1];
      return _5906d_ul__649({ v: _0fac7_className__561(`content__items`), n: null })({ v: _34e39_Expression__889(target)(moduleName)(exp), n: null });
    } else if (__x__.__constructor === "TypeResult" && true && true) {
      let moduleName = __x__.__args[0];
      let t = __x__.__args[1];
      return _5906d_ul__649({ v: _0fac7_className__561(`content__items`), n: null })({ v: _6d366_Type__860(moduleName)(t), n: null });
    } else if (__x__.__constructor === "AliasResult" && true && true) {
      let moduleName = __x__.__args[0];
      let t = __x__.__args[1];
      return _5906d_ul__649({ v: _0fac7_className__561(`content__items`), n: null })({ v: _34268_Alias__873(moduleName)(t), n: null });
    } else if (__x__.__constructor === "InterfaceResult" && true && true) {
      let moduleName = __x__.__args[0];
      let t = __x__.__args[1];
      return _5906d_ul__649({ v: _0fac7_className__561(`content__items`), n: null })({ v: _cac79_Interface__878(moduleName)(t), n: null });
    } else if (__x__.__constructor === "InstanceResult" && true && true) {
      let moduleName = __x__.__args[0];
      let t = __x__.__args[1];
      return _5906d_ul__649({ v: _0fac7_className__561(`content__items`), n: null })({ v: _0cada_Instance__884(moduleName)(t), n: null });
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(pathResult);
  var _29844_jsonBoolean__190 = ((__P__7) => _a32d2_map__189((b) => __eq__(b, `true`) ? _b9d70_JsonBoolean(true) : _b9d70_JsonBoolean(false))(_a32d2_choice__191(__P__7)))({ v: _a32d2_symbol__175(`true`), n: { v: _a32d2_symbol__175(`false`), n: null } });
  var _29844_jsonNull__174 = ((__P__6) => _a32d2_map__189((_) => _b9d70_JsonNull)(_a32d2_symbol__175(__P__6)))(`null`);
  var _29844_jsonString__197 = (() => {
    return _a32d2_chain__168((_) => _a32d2_chain__166((cs) => _a32d2_chain__207((_2) => ((__P__1) => _a32d2_of__162()(_b9d70_JsonString(_051c8_fromList__158(__P__1))))(cs))(_a32d2_symbol__175(`"`)))(_a32d2_many__139(_29844_stringCharacter__198)))(_a32d2_char__148(String.fromCodePoint(34)));
  })();
  var _29844_jsonArray__208 = (() => {
    return _a32d2_chain__207((_) => _a32d2_chain__220((items) => _a32d2_chain__166((_2) => _a32d2_chain__207((_3) => _a32d2_of__162()(_b9d70_JsonArray(items)))(_a32d2_symbol__175(`]`)))(_a32d2_alt__144(_a32d2_spaces__120)(_a32d2_pure__119(null))))(_a32d2_alt__219(_a32d2_sepBy__211(_29844_jsonValue__118)(_a32d2_symbol__175(`,`)))(_a32d2_of__209()(null))))(_a32d2_symbol__175(`[`));
  })();
  var _29844_objectField__224 = (() => {
    return _a32d2_chain__230((_) => _a32d2_chain__231((fieldName) => _a32d2_chain__230((_2) => _a32d2_chain__229((_3) => _a32d2_chain__227((fieldValue) => _a32d2_of__225()([_051c8_fromList__158(fieldName), fieldValue]))(_29844_jsonValue__118))(_a32d2_symbol__175(`:`)))(_a32d2_char__148(String.fromCodePoint(34))))(_a32d2_many__139(_a32d2_notChar__201(String.fromCodePoint(34)))))(_a32d2_char__148(String.fromCodePoint(34)));
  })();
  var _29844_jsonObject__221 = (() => {
    return _a32d2_chain__207((_) => _a32d2_chain__248((fields) => _a32d2_chain__166((_2) => _a32d2_chain__207((_3) => _a32d2_of__162()(_b9d70_JsonObject(_31104_fromList__242(fields))))(_a32d2_symbol__175(`}`)))(_a32d2_alt__144(_a32d2_spaces__120)(_a32d2_pure__119(null))))(_a32d2_alt__241(_a32d2_sepBy__232(_29844_objectField__224)(_a32d2_symbol__175(`,`)))(_a32d2_of__222()(null))))(_a32d2_symbol__175(`{`));
  })();
  var _29844_jsonValue__118 = (() => {
    return _a32d2_chain__166((_) => _a32d2_choice__249({ v: _29844_jsonFloat__145, n: { v: _29844_jsonInteger__170, n: { v: _29844_jsonNull__174, n: { v: _29844_jsonBoolean__190, n: { v: _29844_jsonString__197, n: { v: _29844_jsonArray__208, n: { v: _29844_jsonObject__221, n: null } } } } } } }))(_a32d2_alt__144(_a32d2_spaces__120)(_a32d2_pure__119(null)));
  })();
  var _29844_parse__117 = (parser) => (input) => ((__P__8) => ((__W__9) => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      let e = __x__.__args[0];
      return _42e19_Left(_10f79_assoc__256()(`Invalid json: `)(_a32d2_show__254(e)));
    } else if (__x__.__constructor === "Right" && true) {
      let parsed = __x__.__args[0];
      return ((__x__2) => {
        if (__x__2.__constructor === "Parser" && true) {
          let parserFn = __x__2.__args[0];
          return parserFn(parsed);
        } else {
          console.log("non exhaustive patterns for value: ", __x__2.toString());
          console.trace();
          throw "non exhaustive patterns!";
        }
      })(parser);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__9))(_a32d2_runParser__253(_29844_jsonValue__118)(__P__8)))(input);
  var _294a4_parsedDocumentation__2 = _29844_parse__117(_8c112_parser__4)(_294a4_docJson__3);
  var _294a4_initialState__1 = ((__x__) => {
    if (__x__.__constructor === "Right" && true) {
      let modules = __x__.__args[0];
      return { modules, search: ``, path: _2e42b_fromMaybe__261(``)(_50cb0_decode__259(_7f28c_getUrl__258())), target: _4595d_JS };
    } else if (__x__.__constructor === "Left" && true) {
      let err = __x__.__args[0];
      return /* @__PURE__ */ (() => {
        return { modules: null, search: ``, path: ``, target: _4595d_JS };
      })();
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(_294a4_parsedDocumentation__2);
  var _91e6c_unit__284 = _a32d2_map__285((_) => _91e6c_Unit)(_a32d2_symbol__175(`{}`));
  var _a32d2_token__313 = (__$PH5__) => _adecf_apL__314(__$PH5__)(_a32d2_alt__144(_a32d2_spaces__120)(_a32d2_pure__119(null)));
  var _91e6c_byte__310 = _a32d2_token__313(_91e6c__byte__311);
  var _91e6c_byteArray__309 = (() => {
    return _a32d2_chain__300((name) => _a32d2_chain__300((_) => _a32d2_chain__320((args) => _a32d2_chain__300((_2) => _a32d2_of__296()(_91e6c_ByteArray(args)))(_a32d2_symbol__175(`)`)))(_a32d2_many__318(_a32d2_token__313(_91e6c_byte__310))))(_a32d2_symbol__175(`(`)))(_a32d2_string__176(`ByteArray`));
  })();
  var _91e6c_constructor__322 = (() => {
    let nary;
    nary = (() => {
      return _a32d2_chain__300((name) => _a32d2_chain__300((_) => _a32d2_chain__320((args) => _a32d2_chain__300((_2) => _a32d2_of__296()(_91e6c_Constructor(name)(args)))(_a32d2_symbol__175(`)`)))(_a32d2_maybeSepBy__328(_91e6c_value__283)(_a32d2_symbol__175(`,`))))(_a32d2_symbol__175(`(`)))(_91e6c_alphaNumericalName__323);
    })();
    let nullary;
    nullary = (() => {
      return _a32d2_chain__300((name) => _a32d2_of__296()(_91e6c_Constructor(name)(null)))(_91e6c_alphaNumericalName__323);
    })();
    return _a32d2_alt__338(nary)(nullary);
  })();
  var _91e6c_recordField__390 = (() => {
    return _a32d2_chain__395((fieldName) => _a32d2_chain__395((_) => _a32d2_chain__393((fieldValue) => _a32d2_of__391()([fieldName, fieldValue]))(_a32d2_token__313(_91e6c_value__283)))(_a32d2_symbol__175(`:`)))(_a32d2_token__184(_91e6c_alphaNumericalName__323));
  })();
  var _91e6c_record__389 = (() => {
    return _a32d2_chain__300((_) => _a32d2_chain__414((fields) => _a32d2_chain__300((_2) => _a32d2_chain__300((_3) => ((__P__11) => _a32d2_of__296()(_91e6c_Record(_31104_fromList__408(__P__11))))(fields))(_a32d2_symbol__175(`}`)))(_a32d2_alt__194(_a32d2_symbol__175(`,`))(_a32d2_pure__183(``))))(_a32d2_sepBy__396(_91e6c_recordField__390)(_a32d2_symbol__175(`,`))))(_a32d2_symbol__175(`{`));
  })();
  var _91e6c_dictionaryField__350 = (() => {
    return _a32d2_chain__354((fieldKey) => _a32d2_chain__356((_) => _a32d2_chain__354((fieldValue) => _a32d2_of__352()([fieldKey, fieldValue]))(_a32d2_token__313(_91e6c_value__283)))(_a32d2_symbol__175(`:`)))(_a32d2_token__313(_a32d2_lazy__351((_) => _91e6c_value__283)));
  })();
  var _91e6c_dictionary__349 = (() => {
    return _a32d2_chain__300((_) => _a32d2_chain__388((fields) => _a32d2_chain__300((_2) => _a32d2_chain__300((_3) => ((__P__12) => _a32d2_of__296()(_91e6c_DictionaryConstructor(_31104_fromList__370(__P__12))))(fields))(_a32d2_symbol__175(`}}`)))(_a32d2_alt__194(_a32d2_symbol__175(`,`))(_a32d2_pure__183(``))))(_a32d2_maybeSepBy__357(_91e6c_dictionaryField__350)(_a32d2_symbol__175(`,`))))(_a32d2_symbol__175(`{{`));
  })();
  var _91e6c_list__348 = (() => {
    return _a32d2_chain__300((_) => _a32d2_chain__320((items) => _a32d2_chain__300((_2) => ((__P__13) => _a32d2_of__296()(_91e6c_ListConstructor(__P__13)))(items))(_a32d2_symbol__175(`]`)))(_a32d2_maybeSepBy__328(_91e6c_value__283)(_a32d2_symbol__175(`,`))))(_a32d2_symbol__175(`[`));
  })();
  var _91e6c_tuple__347 = (() => {
    return _a32d2_chain__300((_) => _a32d2_chain__320((items) => _a32d2_chain__300((_2) => ((__P__14) => _a32d2_of__296()(_91e6c_TupleConstructor(__P__14)))(items))(_a32d2_symbol__175(`]`)))(_a32d2_maybeSepBy__328(_91e6c_value__283)(_a32d2_symbol__175(`,`))))(_a32d2_symbol__175(`#[`));
  })();
  var _91e6c_value__283 = _a32d2_choice__415({ v: _91e6c_unit__284, n: { v: _91e6c_boolean__286, n: { v: _91e6c_char__287, n: { v: _91e6c_string__301, n: { v: _91e6c_byteArray__309, n: { v: _91e6c_constructor__322, n: { v: _91e6c_float__339, n: { v: _91e6c_integerOrByte__345, n: { v: _91e6c_integer__346, n: { v: _91e6c_byte__310, n: { v: _91e6c_tuple__347, n: { v: _91e6c_list__348, n: { v: _91e6c_dictionary__349, n: { v: _91e6c_record__389, n: null } } } } } } } } } } } } } });
  var _91e6c_printMadlibValue__282 = (width) => (colored) => (madlibValue) => ((__P__16) => ((__W__17) => ((__x__) => {
    if (__x__.__constructor === "Left" && true) {
      let r = __x__.__args[0];
      return _10f79_assoc__256()(`Unknown`)(_a32d2_show__254(r));
    } else if (__x__.__constructor === "Right" && true) {
      let parsed = __x__.__args[0];
      return ((__P__18) => _1fda7_prettyPrint__469(width)(_91e6c_valueToDoc__421(colored)(__P__18)))(parsed);
    } else {
      console.log("non exhaustive patterns for value: ", __x__.toString());
      console.trace();
      throw "non exhaustive patterns!";
    }
  })(__W__17))(_a32d2_runParser__420(_91e6c_value__283)(__P__16)))(madlibValue);
  var _91e6c_pShow__265 = (a) => ((__P__19) => _91e6c_printMadlibValue__282(80)(false)(_294a4_show__266(__P__19)))(a);
  var _9bab1_pTrace__264 = (v) => (a) => {
    _9bab1_putLine__477(v + ` ` + _91e6c_pShow__265(a));
    return a;
  };
  var _91e6c_pShow__529 = (a) => ((__P__19) => _91e6c_printMadlibValue__282(80)(false)(_10f79_show__267(__P__19)))(a);
  var _9bab1_pTrace__528 = (v) => (a) => {
    _9bab1_putLine__477(v + ` ` + _91e6c_pShow__529(a));
    return a;
  };
  var _91e6c_pShow__558 = (a) => ((__P__19) => _91e6c_printMadlibValue__282(80)(false)(_10f79_show__16(__P__19)))(a);
  var _9bab1_pTrace__557 = (v) => (a) => {
    _9bab1_putLine__477(v + ` ` + _91e6c_pShow__558(a));
    return a;
  };
  var _39ce8_processPath__263 = (state) => {
    let path;
    path = state.path;
    return ((__P__12) => _3d769_ifElse__559((__P__15) => _9bab1_pTrace__557(`isITEMVIEW?`)(_39ce8_isItemView__550(path)(__P__15)))((__P__13) => ((__W__14) => ((__x__) => {
      if (__x__.__constructor === "Just" && true) {
        let m = __x__.__args[0];
        return _39ce8_findItem__531(path)(m);
      } else if (__x__.__constructor === "Nothing") {
        return _39ce8_NotFound;
      } else {
        console.log("non exhaustive patterns for value: ", __x__.toString());
        console.trace();
        throw "non exhaustive patterns!";
      }
    })(__W__14))(_1dd2b_first__530(_9bab1_pTrace__528(`yo`)(__P__13))))(_39ce8_ModuleResult)(_39ce8_getModulesToShow__478(_9bab1_pTrace__264(`skurp`)(__P__12))))(state);
  };
  var _294a4_DocApp__262 = (state) => {
    let pathResult;
    pathResult = _39ce8_processPath__263(state);
    return _5906d_div__603({ v: _0fac7_className__561(`documentation`), n: null })({ v: _913f5_Header__560(state.target), n: { v: _0b37a_SideMenu__605(state.search)(state.modules), n: { v: _5906d_main__897({ v: _0fac7_className__561(`documentation__content`), n: null })({ v: _8781f_Breadcrumbs__650(state), n: { v: _294a4_ContentView__664(state.target)(pathResult), n: null } }), n: null } } });
  };
  var _52fc3_main = (_) => {
    _7f28c_renderWithConfig__903(_ebd38_addGlobalEventHandler__901(_294a4_handleUrlChanged__899)(_ebd38_DEFAULT_CONFIG__898))(_294a4_DocApp__262)(_294a4_initialState__1)(`app`);
    return { __constructor: "Unit", __args: [] };
  };
  var Main_default = { _ebd38_DEFAULT_CONFIG__898, _d4261_isDigit__154, _d0d4c_scan__159, _a32d2_pure__799, _a32d2_pure__784, _a32d2_pure__701, _a32d2_pure__403, _a32d2_pure__392, _a32d2_pure__365, _a32d2_pure__353, _a32d2_pure__334, _a32d2_pure__297, _a32d2_pure__226, _a32d2_pure__223, _a32d2_pure__210, _a32d2_pure__183, _a32d2_pure__163, _a32d2_pure__147, _a32d2_pure__134, _a32d2_pure__119, _a32d2_runParser__839, _a32d2_runParser__420, _a32d2_runParser__253, _a32d2_of__700, _a32d2_of__402, _a32d2_of__391, _a32d2_of__364, _a32d2_of__352, _a32d2_of__333, _a32d2_of__296, _a32d2_of__293, _a32d2_of__225, _a32d2_of__222, _a32d2_of__209, _a32d2_of__162, _a32d2_of__146, _a32d2_of__133, _a32d2_map__837, _a32d2_map__826, _a32d2_map__819, _a32d2_map__817, _a32d2_map__815, _a32d2_map__811, _a32d2_map__806, _a32d2_map__794, _a32d2_map__786, _a32d2_map__783, _a32d2_map__780, _a32d2_map__774, _a32d2_map__771, _a32d2_map__763, _a32d2_map__758, _a32d2_map__754, _a32d2_map__746, _a32d2_map__732, _a32d2_map__730, _a32d2_map__727, _a32d2_map__717, _a32d2_map__713, _a32d2_map__708, _a32d2_map__706, _a32d2_map__697, _a32d2_map__693, _a32d2_map__687, _a32d2_map__683, _a32d2_map__679, _a32d2_map__343, _a32d2_map__315, _a32d2_map__307, _a32d2_map__295, _a32d2_map__291, _a32d2_map__285, _a32d2_map__200, _a32d2_map__189, _a32d2_map__186, _a32d2_map__179, _a32d2_map__150, _a32d2_map__141, _a32d2_lookAhead__791, _a32d2_lookAhead__688, _a32d2_lazy__351, _a32d2_chain__795, _a32d2_chain__792, _a32d2_chain__773, _a32d2_chain__767, _a32d2_chain__703, _a32d2_chain__702, _a32d2_chain__414, _a32d2_chain__406, _a32d2_chain__404, _a32d2_chain__395, _a32d2_chain__393, _a32d2_chain__388, _a32d2_chain__368, _a32d2_chain__366, _a32d2_chain__356, _a32d2_chain__354, _a32d2_chain__344, _a32d2_chain__336, _a32d2_chain__335, _a32d2_chain__327, _a32d2_chain__320, _a32d2_chain__300, _a32d2_chain__298, _a32d2_chain__294, _a32d2_chain__248, _a32d2_chain__240, _a32d2_chain__238, _a32d2_chain__231, _a32d2_chain__230, _a32d2_chain__229, _a32d2_chain__227, _a32d2_chain__220, _a32d2_chain__218, _a32d2_chain__216, _a32d2_chain__207, _a32d2_chain__169, _a32d2_chain__168, _a32d2_chain__166, _a32d2_chain__143, _a32d2_chain__136, _a32d2_ap__812, _adecf_apL__810, _a32d2_ap__808, _a32d2_ap__802, _adecf_apL__814, _a32d2_ap__800, _a32d2_ap__789, _a32d2_ap__764, _adecf_apL__762, _a32d2_ap__759, _adecf_apL__757, _a32d2_ap__755, _adecf_apL__753, _a32d2_ap__748, _adecf_apL__745, _a32d2_ap__741, _a32d2_ap__720, _a32d2_ap__718, _adecf_apL__716, _a32d2_ap__709, _adecf_apL__707, _a32d2_ap__694, _adecf_apL__696, _a32d2_ap__316, _adecf_apL__314, _a32d2_ap__187, _adecf_apL__185, _a32d2_ap__180, _adecf_apL__818, _a32d2_alt__830, _a32d2_alt__823, _a32d2_alt__787, _a32d2_alt__736, _a32d2_alt__407, _a32d2_alt__369, _a32d2_alt__338, _a32d2_alt__337, _a32d2_alt__250, _a32d2_alt__241, _a32d2_alt__219, _a32d2_alt__204, _a32d2_alt__194, _a32d2_alt__151, _a32d2_alt__144, _a32d2_aempty__829, _a32d2_fail__828, _a32d2_aempty__822, _a32d2_fail__821, _a32d2_aempty__735, _a32d2_fail__734, _a32d2_aempty__417, _a32d2_fail__416, _a32d2_aempty__398, _a32d2_fail__397, _a32d2_aempty__360, _a32d2_fail__359, _a32d2_aempty__331, _a32d2_fail__330, _a32d2_aempty__234, _a32d2_fail__233, _a32d2_aempty__213, _a32d2_fail__212, _a32d2_aempty__193, _a32d2_fail__192, _a32d2_aempty__165, _a32d2_fail__164, _a32d2_aempty__131, _a32d2_fail__130, _9bab1_putLine__477, _936d2_ansi__425, _8c112_makeType__73, _8c112_makeTargeted__92, _8c112_makeModule__105, _8c112_makeInterface__49, _8c112_makeExpression__87, _8c112_makeAlias__61, _8c112_getName__483, _801bd_min__471, _7f28c_getUrl__258, _7f28c__renderWithConfig__904, _7e49a_onUrlChanged__900, _76f3d_maybeLoop__691, _6b70e_snd__657, _6b70e_snd__467, _6b70e_snd__462, _6b70e_fst__625, _6b70e_fst__466, _6b70e_fst__459, _5b0b9_mapL__805, _5b0b9_mapL__782, _5b0b9_mapL__715, _5b0b9_mapL__712, _5b0b9_mapL__705, _5b0b9_mapL__686, _5b0b9_mapL__682, _5906d_show__11, _5906d_empty__667, _5906d__tag__589, _5906d__link__615, _5800c_setLinkView__674, _50cb0_decode__259, _4be73_andDo__399, _4be73_andDo__361, _4be73_andDo__332, _4be73_andDo__235, _4be73_andDo__214, _4595d_show__281, _4495c_buildPopStateEvent__581, _4495c_buildInputEvent__568, _4495c_buildAbstractEvent__565, _4495c_buildMouseEvent__566, _42e19_pure__97, _42e19_pure__77, _42e19_pure__65, _42e19_pure__53, _42e19_pure__40, _42e19_pure__29, _42e19_pure__109, _42e19_map__98, _42e19_map__80, _42e19_map__78, _42e19_map__68, _42e19_map__66, _42e19_map__56, _42e19_map__54, _42e19_map__43, _42e19_map__41, _42e19_map__32, _42e19_map__30, _42e19_map__112, _42e19_map__110, _42e19_map__100, _42e19_mapLeft__842, _42e19_chain__48, _42e19_chain__24, _42e19_ap__99, _42e19_ap__79, _42e19_ap__67, _42e19_ap__55, _42e19_ap__42, _42e19_ap__31, _42e19_ap__111, _42034_runAction__583, _7f28c_renderWithConfig__903, _411df_TargetedItem__895, _3d769_notEquals__202, _3d769_ifElse__869, _3d769_ifElse__559, _3d769_ifElse__556, _3d769_ifElse__526, _3d769_ifElse__515, _3d769_ifElse__500, _3d769_ifElse__135, _3d769_identity__781, _3d769_identity__497, _3d769_equals__796, _3d769_equals__555, _3d769_equals__514, _3d769_equals__503, _3d769_equals__499, _3d769_equals__149, _3d769_complement__506, _3d769_complement__289, _3d769_always__868, _3d769_always__841, _3d769_always__785, _3d769_always__779, _3d769_always__766, _3d769_always__761, _3d769_always__729, _3d769_always__726, _3d769_always__678, _3d769_always__593, _3d769_always__551, _3d769_always__525, _3d769_always__489, _3d769_always__199, _3d769_always__132, _31104_get__579, _2e42b_fromMaybe__580, _2e42b_fromMaybe__261, _29844_string__5, _29844_map2__93, _29844_maybe__91, _29844_map5__26, _29844_map5__88, _29844_map6__62, _29844_map6__74, _29844_map7__50, _29844_map8__106, _1fda7_textWithLength__431, _1fda7_nest__446, _1fda7_linebreak__433, _1fda7_line__437, _1fda7_flatten__448, _1fda7_group__447, _1fda7_softline__454, _1fda7_renderPretty__470, _1fda7_empty__439, _1fda7_char__436, _1fda7_colon__460, _1fda7_comma__435, _1fda7_lbrace__457, _1fda7_lbracket__455, _1fda7_rbrace__464, _1fda7_rbracket__456, _1fda7_space__461, _1fda7_beside__440, _1e6e4_good__596, _1e6e4_pure__595, _1e6e4_of__594, _7e49a_syncAction__600, _294a4_handleUrlChanged__899, _1e6e4_fulfill__584, _42034_wrapEventHandler__582, _1dd2b_reverse__835, _a32d2_many__834, _1dd2b_reverse__770, _a32d2_many__769, _a32d2_some__768, _1dd2b_reverse__740, _a32d2_many__739, _a32d2_some__793, _1dd2b_reverse__442, _1dd2b_reverse__401, _a32d2_many__400, _a32d2_sepBy__396, _1dd2b_reverse__363, _a32d2_many__362, _a32d2_sepBy__358, _a32d2_maybeSepBy__357, _1dd2b_reverse__34, _a32d2_many__215, _a32d2_sepBy__211, _1dd2b_reverse__319, _a32d2_many__318, _a32d2_sepBy__329, _a32d2_maybeSepBy__328, _1dd2b_reverse__304, _a32d2_many__303, _1dd2b_reverse__237, _a32d2_many__236, _a32d2_sepBy__232, _1dd2b_reverse__140, _a32d2_manyTill__690, _a32d2_many__139, _a32d2_some__138, _1dd2b_repeat__476, _1dd2b_pure__342, _1dd2b_of__341, _1dd2b_map__896, _1dd2b_map__888, _1dd2b_map__883, _1dd2b_map__879, _1dd2b_map__877, _1dd2b_map__872, _1dd2b_map__859, _1dd2b_map__858, _1dd2b_map__853, _1dd2b_map__662, _1dd2b_map__643, _1dd2b_map__640, _1dd2b_map__637, _1dd2b_map__634, _1dd2b_map__631, _1dd2b_map__622, _1dd2b_map__620, _1dd2b_map__617, _1dd2b_map__490, _1dd2b_map__488, _1dd2b_map__487, _1dd2b_map__486, _1dd2b_map__485, _1dd2b_map__484, _39ce8_getPossiblePaths__482, _1dd2b_map__468, _1dd2b_map__463, _1dd2b_map__434, _1dd2b_mapMaybe__836, _1dd2b_length__554, _1dd2b_length__512, _1dd2b_slice__511, _1dd2b_length__451, _1dd2b_slice__450, _1dd2b_take__449, _1dd2b_last__535, _1dd2b_isEmpty__644, _1dd2b_isEmpty__524, _1dd2b_isEmpty__523, _1dd2b_isEmpty__522, _1dd2b_isEmpty__521, _1dd2b_isEmpty__520, _39ce8_emptyPaths__519, _1dd2b_isEmpty__452, _1dd2b_isEmpty__432, _1dd2b_intersperse__445, _1dd2b_intersperse__428, _1dd2b_intersperseWithIndex__663, _1dd2b_includes__122, _1dd2b_flatten__623, _1dd2b_first__530, _1dd2b_first__513, _1dd2b_find__548, _1dd2b_find__545, _1dd2b_find__542, _1dd2b_find__539, _1dd2b_find__536, _1dd2b_filter__642, _1dd2b_filter__639, _1dd2b_filter__636, _1dd2b_filter__633, _1dd2b_filter__619, _1dd2b_filter__527, _1dd2b_filter__507, _1dd2b_drop__510, _1dd2b_drop__453, _1dd2b_dropWhile__797, _1dd2b_chain__621, _1dd2b_sortBy__626, _1dd2b_sortBy__607, _1dd2b_append__902, _ebd38_addGlobalEventHandler__901, _1dd2b_append__654, _1dd2b_append__652, _1dd2b_append__155, _1dd2b_any__518, _1dd2b_all__645, _176d5_scan__171, _10f79_show__290, _10f79_show__16, _10f79_show__15, _10f79_show__14, _a32d2_show__255, _a32d2_show__254, _10f79_show__10, _10f79_reduceLeft__833, _1dd2b_reduce__832, _a32d2_choice__827, _10f79_reduceLeft__825, _1dd2b_reduce__824, _a32d2_choice__820, _10f79_reduceLeft__82, _1dd2b_reduceRight__81, _1dd2b_mapM__76, _29844_list__75, _10f79_reduceLeft__738, _1dd2b_reduce__737, _a32d2_choice__733, _10f79_reduceLeft__70, _1dd2b_reduceRight__69, _1dd2b_mapM__64, _29844_list__63, _10f79_reduceLeft__656, _1dd2b_reduce__655, _10f79_reduceLeft__587, _1dd2b_reduce__586, _10f79_reduceLeft__58, _1dd2b_reduceRight__57, _1dd2b_mapM__52, _29844_list__51, _10f79_reduceLeft__578, _10f79_reduceLeft__45, _1dd2b_reduceRight__44, _1dd2b_mapM__39, _29844_list__38, _10f79_reduceLeft__443, _1dd2b_reduceRight__441, _1fda7_hcat__438, _1fda7_sepBy__444, _10f79_reduceLeft__419, _1dd2b_reduce__418, _a32d2_choice__415, _10f79_reduceLeft__413, _10f79_reduceLeft__387, _10f79_reduceLeft__35, _1dd2b_reduceRight__33, _1dd2b_mapM__28, _29844_list__27, _10f79_reduceLeft__306, _1dd2b_reduce__305, _10f79_reduceLeft__252, _1dd2b_reduce__251, _a32d2_choice__249, _10f79_reduceLeft__247, _10f79_reduceLeft__22, _1dd2b_reduce__21, _10f79_reduceLeft__206, _1dd2b_reduce__205, _a32d2_choice__203, _10f79_reduceLeft__196, _1dd2b_reduce__195, _a32d2_choice__191, _10f79_reduceLeft__114, _1dd2b_reduceRight__113, _1dd2b_mapM__108, _29844_list__107, _10f79_reduceLeft__102, _1dd2b_reduceRight__101, _1dd2b_mapM__96, _29844_list__95, _10f79_dictReduceRight__383, _10f79_dictToList__382, _31104_toList__458, _10f79_dictReduceRight__378, _10f79_dictToList__377, _31104_toList__465, _10f79_dictReduceRight__19, _10f79_dictToList__18, _b9d70_show__13, _10f79_show__20, _10f79_show__17, _42e19_show__12, _10f79_compare__9, _10f79_gt__8, _31104_get__7, _29844_field__103, _29844_field__115, _29844_field__36, _29844_field__59, _29844_field__71, _29844_field__83, _29844_field__86, _8c112_expressionParser__85, _29844_field__89, _29844_path__46, _29844_path__6, _8c112_parser__4, _10f79_compare__576, _91e6c_compare__374, _10f79_compare__375, _10f79_compare__379, _10f79_compare__384, _10f79_compare__376, _10f79_compare__381, _10f79_compare__380, _10f79_compare__385, _10f79_balanceDict__577, _10f79_dictInsert__574, _10f79_dictFromList__573, _31104_fromList__572, _4e1b6_getKeyFromCode__570, _4495c_buildKeyboardEvent__569, _4495c_EventConstructors__564, _5906d_link__614, _5906d_tag__563, _5906d_a__672, _5906d_blockquote__857, _5906d_br__852, _5906d_button__602, _5906d_code__673, _5906d_div__603, _5906d_h1__562, _5906d_h2__666, _5906d_h3__648, _5906d_h4__854, _5906d_h5__855, _5906d_h6__856, _5906d_header__604, _5906d_i__848, _5906d_img__851, _5906d_input__598, _5906d_li__616, _5906d_main__897, _5906d_p__646, _5906d_span__612, _5906d_strong__847, _5906d_ul__649, _10f79_balanceDict__412, _10f79_dictInsert__410, _10f79_dictFromList__409, _31104_fromList__408, _10f79_balanceDict__386, _10f79_dictInsert__372, _10f79_dictFromList__371, _31104_fromList__370, _10f79_balanceDict__246, _10f79_dictInsert__244, _10f79_dictFromList__243, _31104_fromList__242, _10f79_assoc__496, _10f79_mappend__495, _10f79_assoc__256, _10f79_mappend__271, _8c112_show__270, _10f79_show__269, _8c112_show__274, _8c112_show__273, _10f79_show__272, _8c112_show__276, _10f79_show__275, _8c112_show__278, _10f79_show__277, _8c112_show__280, _10f79_show__279, _8c112_show__268, _10f79_show__267, _294a4_show__266, _10f79_assoc__157, _10f79_mappend__692, _a32d2_someTill__689, _1dd2b_concat__156, _0fac7_to__613, _0fac7_src__849, _0fac7_placeholder__591, _0fac7_onInput__597, _0fac7_onClick__601, _0fac7_key__661, _0fac7_inputType__590, _0fac7_href__671, _5800c_defaultConfig__670, _0fac7_className__561, _12b67_Typing__891, _b8152_Title__864, _cc3cb_Etiquette__863, _0fac7_altAttribute__850, _051c8_toLower__481, _913f5_Header__560, _051c8_split__534, _39ce8_nameMatchesEndOfPath__533, _39ce8_tryItemByKind__532, _39ce8_nameMatchesEndOfPath__538, _39ce8_tryItemByKind__537, _39ce8_nameMatchesEndOfPath__541, _39ce8_tryItemByKind__540, _39ce8_nameMatchesEndOfPath__544, _39ce8_tryItemByKind__543, _39ce8_nameMatchesEndOfPath__547, _39ce8_tryItemByKind__546, _39ce8_findItem__531, _051c8_slice__128, _051c8_take__498, _051c8_replace__501, _051c8_prependChar__178, _051c8_match__326, _0b37a_SideMenu__605, _d4261_isLetter__325, _051c8_length__423, _1fda7_text__422, _051c8_join__427, _936d2_ansiColor__426, _936d2_text__424, _051c8_isEmpty__505, _35c24_Since__867, _35c24_Since__874, _35c24_Since__880, _35c24_Since__885, _35c24_Since__892, _5dc4d_Example__871, _5dc4d_Example__876, _5dc4d_Example__882, _5dc4d_Example__887, _5dc4d_Example__894, _051c8_fromList__158, _051c8_repeat__475, _051c8_singleton__302, _051c8_drop__127, _051c8_dropLast__509, _051c8_appendChar__473, _1fda7_prettyPrint__469, _051c8_charAt__125, _051c8_firstChar__177, _c821c_splitPath__493, _051c8_lastChar__502, _c821c_dropTrailingPathSeparator__508, _c821c_joinPath__504, _c821c_canonicalizePath__492, _39ce8_hasLongerPath__553, _39ce8_firstModuleIsInPath__552, _39ce8_isItemView__550, _8781f_Breadcrumbs__650, _c821c_dropPathSegments__517, _c821c_isRootPathOf__516, _39ce8_isParentPath__491, _39ce8_walkByPath__480, _39ce8_filterByPath__479, _39ce8_getModulesToShow__478, _a32d2_anyChar__124, _a32d2_eof__728, _a32d2_satisfy__123, _a32d2_char__148, _a32d2_string__176, _a32d2_digit__153, _a32d2_letter__324, _a32d2_letters__807, _a32d2_notChar__201, _a32d2_notOneOf__288, _a32d2_oneOf__121, _a32d2_spaces__120, _a32d2_token__184, _a32d2_symbol__175, _1c6a3_parseMarkdown__676, _bcfe4_renderMarkdownWithConfig__675, _1129f_renderMarkdown__668, _419f8_Description__870, _6d366_Type__860, _419f8_Description__875, _34268_Alias__873, _419f8_Description__881, _cac79_Interface__878, _419f8_Description__886, _0cada_Instance__884, _419f8_Description__893, _34e39_Expression__889, _29844_jsonValue__118, _29844_parse__117, _294a4_initialState__1, _a32d2_token__313, _91e6c_pShow__265, _9bab1_pTrace__264, _91e6c_pShow__529, _9bab1_pTrace__528, _91e6c_pShow__558, _9bab1_pTrace__557, _39ce8_processPath__263, _294a4_DocApp__262, _10f79_DictRBBlack, _10f79_DictRBRed, _10f79_DictRBEmpty, _10f79_DictRBNode, _10f79_LT, _10f79_EQ, _10f79_GT, _3d769_Loop, _3d769_Done, _2e42b_Just, _2e42b_Nothing, _1e6e4_Wish, _4e1b6_KEY_ANY, _4e1b6_KEY_BREAK, _4e1b6_KEY_BACKSPACE, _4e1b6_KEY_TAB, _4e1b6_KEY_CLEAR, _4e1b6_KEY_ENTER, _4e1b6_KEY_SHIFT, _4e1b6_KEY_CTRL, _4e1b6_KEY_ALT, _4e1b6_KEY_PAUSE, _4e1b6_KEY_CAPS_LOCK, _4e1b6_KEY_HANGUL, _4e1b6_KEY_HANJA, _4e1b6_KEY_ESCAPE, _4e1b6_KEY_CONVERSION, _4e1b6_KEY_NON_CONVERSION, _4e1b6_KEY_SPACE, _4e1b6_KEY_PAGE_UP, _4e1b6_KEY_PAGE_DOWN, _4e1b6_KEY_END, _4e1b6_KEY_HOME, _4e1b6_KEY_LEFT_ARROW, _4e1b6_KEY_UP_ARROW, _4e1b6_KEY_RIGHT_ARROW, _4e1b6_KEY_DOWN_ARROW, _4e1b6_KEY_SELECT, _4e1b6_KEY_PRINT, _4e1b6_KEY_EXECUTE, _4e1b6_KEY_PRINT_SCREEN, _4e1b6_KEY_INSERT, _4e1b6_KEY_DELETE, _4e1b6_KEY_HELP, _4e1b6_KEY_0, _4e1b6_KEY_1, _4e1b6_KEY_2, _4e1b6_KEY_3, _4e1b6_KEY_4, _4e1b6_KEY_5, _4e1b6_KEY_6, _4e1b6_KEY_7, _4e1b6_KEY_8, _4e1b6_KEY_9, _4e1b6_KEY_COLON, _4e1b6_KEY_LEFT_CHEVRON, _4e1b6_KEY_EQUAL, _4e1b6_KEY_ESZETT, _4e1b6_KEY_AT, _4e1b6_KEY_A, _4e1b6_KEY_B, _4e1b6_KEY_C, _4e1b6_KEY_D, _4e1b6_KEY_E, _4e1b6_KEY_F, _4e1b6_KEY_G, _4e1b6_KEY_H, _4e1b6_KEY_I, _4e1b6_KEY_J, _4e1b6_KEY_K, _4e1b6_KEY_L, _4e1b6_KEY_M, _4e1b6_KEY_N, _4e1b6_KEY_O, _4e1b6_KEY_P, _4e1b6_KEY_Q, _4e1b6_KEY_R, _4e1b6_KEY_S, _4e1b6_KEY_T, _4e1b6_KEY_U, _4e1b6_KEY_V, _4e1b6_KEY_W, _4e1b6_KEY_X, _4e1b6_KEY_Y, _4e1b6_KEY_Z, _4e1b6_KEY_CMD_LEFT, _4e1b6_KEY_CMD_RIGHT, _4e1b6_KEY_SLEEP, _4e1b6_KEY_NUMPAD_0, _4e1b6_KEY_NUMPAD_1, _4e1b6_KEY_NUMPAD_2, _4e1b6_KEY_NUMPAD_3, _4e1b6_KEY_NUMPAD_4, _4e1b6_KEY_NUMPAD_5, _4e1b6_KEY_NUMPAD_6, _4e1b6_KEY_NUMPAD_7, _4e1b6_KEY_NUMPAD_8, _4e1b6_KEY_NUMPAD_9, _4e1b6_KEY_MULTIPLY, _4e1b6_KEY_ADD, _4e1b6_KEY_NUMPAD_PERIOD, _4e1b6_KEY_SUBSTRACT, _4e1b6_KEY_DECIMAL_POINT, _4e1b6_KEY_DIVIDE, _4e1b6_KEY_F1, _4e1b6_KEY_F2, _4e1b6_KEY_F3, _4e1b6_KEY_F4, _4e1b6_KEY_F5, _4e1b6_KEY_F6, _4e1b6_KEY_F7, _4e1b6_KEY_F8, _4e1b6_KEY_F9, _4e1b6_KEY_F10, _4e1b6_KEY_F11, _4e1b6_KEY_F12, _4e1b6_KEY_F13, _4e1b6_KEY_F14, _4e1b6_KEY_F15, _4e1b6_KEY_F16, _4e1b6_KEY_F17, _4e1b6_KEY_F18, _4e1b6_KEY_F19, _4e1b6_KEY_F20, _4e1b6_KEY_F21, _4e1b6_KEY_F22, _4e1b6_KEY_F23, _4e1b6_KEY_F24, _4e1b6_KEY_F25, _4e1b6_KEY_F26, _4e1b6_KEY_F27, _4e1b6_KEY_F28, _4e1b6_KEY_F29, _4e1b6_KEY_F30, _4e1b6_KEY_F31, _4e1b6_KEY_F32, _4e1b6_KEY_NUM_LOCK, _4e1b6_KEY_SCROLL_LOCK, _4e1b6_KEY_AIRPLANE_MODE, _4e1b6_KEY_CIRCONFLEX, _4e1b6_KEY_EXCLAMATION_MARK, _4e1b6_KEY_ARABIC_SEMI_COLON, _4e1b6_KEY_NUMBER_SIGN, _4e1b6_KEY_DOLLAR, _4e1b6_KEY_U_GRAVE_ACCENT, _4e1b6_KEY_PAGE_BACKWARD, _4e1b6_KEY_PAGE_FORWARD, _4e1b6_KEY_REFRESH, _4e1b6_KEY_RIGHT_PAREN, _4e1b6_KEY_ASTERISK, _4e1b6_KEY_TILDE, _4e1b6_KEY_MUTE, _4e1b6_KEY_NEXT, _4e1b6_KEY_PREVIOUS, _4e1b6_KEY_STOP, _4e1b6_KEY_PLAY_PAUSE, _4e1b6_KEY_EMAIL, _4e1b6_KEY_MUTE_UNMUTE, _4e1b6_KEY_DECREASE_VOLUME, _4e1b6_KEY_INCREASE_VOLUME, _4e1b6_KEY_SEMI_COLON, _4e1b6_KEY_COMMA, _4e1b6_KEY_DASH, _4e1b6_KEY_PERIOD, _4e1b6_KEY_FORWARD_SLASH, _4e1b6_KEY_GRAVE_ACCENT, _4e1b6_KEY_QUESTION_MARK, _4e1b6_KEY_BRACKET_LEFT, _4e1b6_KEY_BACK_SLASH, _4e1b6_KEY_BRACKET_RIGHT, _4e1b6_KEY_SINGLE_QUOTE, _4e1b6_KEY_BACK_TICK, _4e1b6_KEY_CMD, _4e1b6_KEY_ALTGR, _4e1b6_KEY_LEFT_BACK_SLASH, _4e1b6_KEY_GNOME_COMPOSE, _4e1b6_KEY_C_CEDILLA, _4e1b6_KEY_XF86_FORWARD, _4e1b6_KEY_XF86_BACKWARD, _4e1b6_KEY_ALPHA_NUMERIC, _4e1b6_KEY_HIRAGANA_KATAKANA, _4e1b6_KEY_HALF_WIDTH_FULL_WIDTH, _4e1b6_KEY_KANJI, _4e1b6_KEY_UNLOCK_TRACK_PAD, _4e1b6_KEY_TOGGLE_TOUCH_PAD, _4495c_AbstractEvent, _4495c_MouseEvent, _4495c_InputEvent, _4495c_KeyboardEvent, _4495c_PopStateEvent, _7e49a_GlobalAction, _2da14_Header, _2da14_CONNECT, _2da14_DELETE, _2da14_GET, _2da14_HEAD, _2da14_OPTIONS, _2da14_PATCH, _2da14_POST, _2da14_PUT, _2da14_TRACE, _2da14_AccessDenied, _2da14_AddressNotFound, _2da14_BadTransferEncoding, _2da14_BadUrl, _2da14_ConnectionFailed, _2da14_Http2FramingError, _2da14_IncompleteResponse, _2da14_InternalError, _2da14_InvalidSSLCertificate, _2da14_MalformedResponse, _2da14_NotSupported, _2da14_SSLConnectionFailed, _2da14_SSLEngineNotFound, _2da14_SSLInitializationFailed, _2da14_Timeout, _2da14_TooManyRedirects, _2da14_UnresolvedProxy, _2da14_UnsupportedProtocol, _2da14_BadResponse, _2da14_ClientError, _0fac7_StringAttribute, _0fac7_AttributeAccept, _0fac7_AttributeAcceptCharset, _0fac7_AttributeAccessKey, _0fac7_AttributeAction, _0fac7_AttributeAlt, _0fac7_AttributeAsync, _0fac7_AttributeAutoComplete, _0fac7_AttributeAutoFocus, _0fac7_AttributeAutoPlay, _0fac7_AttributeChecked, _0fac7_AttributeCite, _0fac7_AttributeClass, _0fac7_AttributeCols, _0fac7_AttributeColSpan, _0fac7_AttributeContentEditable, _0fac7_AttributeControls, _0fac7_AttributeCoords, _0fac7_AttributeData, _0fac7_AttributeDateTime, _0fac7_AttributeDefault, _0fac7_AttributeDefer, _0fac7_AttributeDir, _0fac7_AttributeDirName, _0fac7_AttributeDisabled, _0fac7_AttributeDownload, _0fac7_AttributeDraggable, _0fac7_AttributeEncType, _0fac7_AttributeFor, _0fac7_AttributeForm, _0fac7_AttributeFormAction, _0fac7_AttributeHeaders, _0fac7_AttributeHeight, _0fac7_AttributeHidden, _0fac7_AttributeHigh, _0fac7_AttributeHref, _0fac7_AttributeHrefLang, _0fac7_AttributeId, _0fac7_AttributeInnerHTML, _0fac7_AttributeInnerText, _0fac7_AttributeIsMap, _0fac7_AttributeKey, _0fac7_AttributeKind, _0fac7_AttributeLang, _0fac7_AttributeLabel, _0fac7_AttributeList, _0fac7_AttributeLoop, _0fac7_AttributeLow, _0fac7_AttributeMax, _0fac7_AttributeMaxLength, _0fac7_AttributeMedia, _0fac7_AttributeMethod, _0fac7_AttributeMin, _0fac7_AttributeMultiple, _0fac7_AttributeMuted, _0fac7_AttributeName, _0fac7_AttributeNoValidate, _0fac7_AttributeOnAbort, _0fac7_AttributeOnBlur, _0fac7_AttributeOnCanPlay, _0fac7_AttributeOnCanPlayThrough, _0fac7_AttributeOnChange, _0fac7_AttributeOnClick, _0fac7_AttributeOnContextMenu, _0fac7_AttributeOnCopy, _0fac7_AttributeOnCueChange, _0fac7_AttributeOnCut, _0fac7_AttributeOnDblClick, _0fac7_AttributeOnDrag, _0fac7_AttributeOnDragEnd, _0fac7_AttributeOnDragEnter, _0fac7_AttributeOnDragLeave, _0fac7_AttributeOnDragOver, _0fac7_AttributeOnDragStart, _0fac7_AttributeOnDrop, _0fac7_AttributeOnDurationChange, _0fac7_AttributeOnEmptied, _0fac7_AttributeOnEnded, _0fac7_AttributeOnError, _0fac7_AttributeOnFocus, _0fac7_AttributeOnInput, _0fac7_AttributeOnInvalid, _0fac7_AttributeOnKeyPress, _0fac7_AttributeOnKeyDown, _0fac7_AttributeOnKeyUp, _0fac7_AttributeOnLoad, _0fac7_AttributeOnLoadedData, _0fac7_AttributeOnLoadedMetaData, _0fac7_AttributeOnLoadStart, _0fac7_AttributeOnMouseDown, _0fac7_AttributeOnMouseEnter, _0fac7_AttributeOnMouseLeave, _0fac7_AttributeOnMouseMove, _0fac7_AttributeOnMouseUp, _0fac7_AttributeOnMouseWheel, _0fac7_AttributeOnMouseOver, _0fac7_AttributeOnMouseOut, _0fac7_AttributeOnPaste, _0fac7_AttributeOnPause, _0fac7_AttributeOnPlay, _0fac7_AttributeOnPlaying, _0fac7_AttributeOnProgress, _0fac7_AttributeOnRateChange, _0fac7_AttributeOnReset, _0fac7_AttributeOnScroll, _0fac7_AttributeOnSearch, _0fac7_AttributeOnSeeked, _0fac7_AttributeOnSeeking, _0fac7_AttributeOnSelect, _0fac7_AttributeOnStalled, _0fac7_AttributeOnSubmit, _0fac7_AttributeOnSuspend, _0fac7_AttributeOnTimeUpdate, _0fac7_AttributeOnToggle, _0fac7_AttributeOnTransitionCancel, _0fac7_AttributeOnTransitionEnd, _0fac7_AttributeOnTransitionRun, _0fac7_AttributeOnTransitionStart, _0fac7_AttributeOnVolumeChange, _0fac7_AttributeOnWaiting, _0fac7_AttributeOnWheel, _0fac7_AttributeOpen, _0fac7_AttributeOptimum, _0fac7_AttributePattern, _0fac7_AttributePlaceholder, _0fac7_AttributePoster, _0fac7_AttributePreload, _0fac7_AttributeReadOnly, _0fac7_AttributeRel, _0fac7_AttributeRequired, _0fac7_AttributeReversed, _0fac7_AttributeRows, _0fac7_AttributeRowSpan, _0fac7_AttributeSandBox, _0fac7_AttributeScope, _0fac7_AttributeSelected, _0fac7_AttributeShape, _0fac7_AttributeSize, _0fac7_AttributeSizes, _0fac7_AttributeSpan, _0fac7_AttributeSpellCheck, _0fac7_AttributeSrc, _0fac7_AttributeSrcDoc, _0fac7_AttributeSrcLang, _0fac7_AttributeSrcSet, _0fac7_AttributeStart, _0fac7_AttributeStep, _0fac7_AttributeStyle, _0fac7_AttributeTabIndex, _0fac7_AttributeTarget, _0fac7_AttributeTitle, _0fac7_AttributeTo, _0fac7_AttributeTranslate, _0fac7_AttributeType, _0fac7_AttributeUseMap, _0fac7_AttributeValue, _0fac7_AttributeWidth, _0fac7_AttributeWrap, _ebd38_HashRouting, _ebd38_BasicRouting, _5906d_Element, _42e19_Left, _42e19_Right, _b9d70_JsonString, _b9d70_JsonInteger, _b9d70_JsonFloat, _b9d70_JsonBoolean, _b9d70_JsonNull, _b9d70_JsonObject, _b9d70_JsonArray, _a32d2_Loc, _a32d2_Parser, _a32d2_Error, _a32d2_Config, _29844_Parser, _8c112_BothTargets, _8c112_JSTarget, _8c112_LLVMTarget, _8c112_InvalidTarget, _77488_AddressAlreadyInUse, _77488_ArgumentListToLong, _77488_PermissionDenied, _77488_UnknownError, _1fda7_EmptyDoc, _1fda7_CharDoc, _1fda7_TextDoc, _1fda7_LineDoc, _1fda7_CatDoc, _1fda7_NestDoc, _1fda7_UnionDoc, _1fda7_ColumnDoc, _1fda7_NestingDoc, _1fda7_SEmpty, _1fda7_SChar, _1fda7_SText, _1fda7_SLine, _4595d_LLVM, _4595d_JS, _39ce8_ModuleResult, _39ce8_ExpressionResult, _39ce8_TypeResult, _39ce8_AliasResult, _39ce8_InterfaceResult, _39ce8_InstanceResult, _39ce8_NotFound, _1c6a3_Text, _1c6a3_Bold, _1c6a3_Italic, _1c6a3_InlineCode, _1c6a3_Link, _1c6a3_Image, _1c6a3_LineReturn, _1c6a3_H1, _1c6a3_H2, _1c6a3_H3, _1c6a3_H4, _1c6a3_H5, _1c6a3_H6, _1c6a3_Paragraph, _1c6a3_Blockquote, _1c6a3_Code, _1c6a3_UnorderedList };
  _52fc3_main(null);
})();
