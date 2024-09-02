export type PlainN = string | PlainNode;
export interface PlainNode {
  key?: string;
  type: string;
  props: any;
  children: (PlainN | false | null)[] | string;
}

// =========== EVENT HANDLING ===========
// credits to: https://stackoverflow.com/questions/4386300/javascript-dom-how-to-remove-all-event-listeners-of-a-dom-object/4386514#4386514
const _eventHandlers: {
  [event: string]: {
    node: any;
    handler: any;
    capture: boolean;
  }[];
} = {};

function addListener(node: any, event: string, handler: any) {
  if (!(event in _eventHandlers)) _eventHandlers[event] = [];

  _eventHandlers[event].push({
    node: node,
    handler: handler,
    capture: false,
  });
  node.addEventListener(event, handler);
}

function removeAllListeners(targetNode: any, event: string) {
  // remove listeners from the matching nodes
  if (!(event in _eventHandlers)) return;
  _eventHandlers[event]
    .filter(({ node }) => node === targetNode)
    .forEach(({ handler, capture, node }) =>
      node.removeEventListener(event, handler)
    );

  // update _eventHandlers global
  _eventHandlers[event] = _eventHandlers[event].filter(
    ({ node }) => node !== targetNode
  );
}

function _renderPlainNode(node: PlainNode | string): HTMLElement | Text {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }

  const el = document.createElement(node.type);
  for (const key in node.props) {
    if (key === "onClick") {
      addListener(el, "click", () => node.props[key]());
    } else if (key === "onChange") {
      addListener(el, "change", (e: any) => node.props[key](e.target.value));
    } else if (key === "onInput") {
      addListener(el, "input", (e: any) => node.props[key](e.target.value));
    } else {
      el.setAttribute(key, node.props[key]);
    }
  }

  if (typeof node.children === "string") {
    el.appendChild(document.createTextNode(node.children));
    return el;
  }

  node.children.forEach((child) => {
    if (!child) return;
    el.appendChild(_renderPlainNode(child));
  });

  return el;
}

function applyDiff(
  oldEl: HTMLElement | Text,
  newEl: PlainN
): HTMLElement | Text {
  if (typeof newEl === "string") {
    if (oldEl instanceof Text) {
      if (oldEl.textContent !== newEl) {
        oldEl.textContent = newEl;
      }
      return oldEl;
    } else {
      const newTextNode = document.createTextNode(newEl);
      oldEl.replaceWith(newTextNode);
      return newTextNode;
    }
  } else if (oldEl instanceof Text) {
    const newElement = _renderPlainNode(newEl);
    oldEl.replaceWith(newElement);
    return newElement;
  } else if (oldEl.nodeName.toLowerCase() !== newEl.type.toLowerCase()) {
    const newElement = _renderPlainNode(newEl);
    oldEl.replaceWith(newElement);
    return newElement;
  } else {
    // remove old listeners
    removeAllListeners(oldEl, "click");
    removeAllListeners(oldEl, "input");

    for (let i = 0; i < oldEl.attributes.length; i++) {
      const attr = oldEl.attributes[i];
      if (!(attr.name in newEl.props)) {
        oldEl.removeAttribute(attr.name);
      }
    }

    for (const key in newEl.props) {
      if (key === "onClick") {
        addListener(oldEl, "click", () => newEl.props[key]());
      } else if (key === "onChange") {
        addListener(oldEl, "change", (e: any) =>
          newEl.props[key](e.target.value)
        );
      } else if (key === "onInput") {
        addListener(oldEl, "input", (e: any) =>
          newEl.props[key](e.target.value)
        );
      } else {
        (oldEl as any).setAttribute(key, newEl.props[key]);
      }
    }

    const oldChildren = Array.from(oldEl.childNodes);
    const newChildren = newEl.children;
    const length = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < length; i++) {
      if (i >= newChildren.length || !newChildren[i]) {
        oldChildren[i]?.remove();
        continue;
      }
      let o: HTMLElement | Text | null = null;
      if (
        i < oldChildren.length &&
        (oldChildren[i] instanceof HTMLElement ||
          oldChildren[i] instanceof Text)!
      ) {
        o = oldChildren[i] as any;
      } else {
        o = document.createElement("div");
        oldEl.appendChild(o);
      }

      applyDiff(o!, newChildren[i] as any);
    }
    return oldEl;
  }
}

export function render<T>(
  parentSelector: string,
  initialState: T,
  builder: (state: T, setState: (state: T) => any) => PlainNode
): () => void {
  const parent = document.querySelector(parentSelector);
  if (!parent) {
    console.error(
      `PLAIN_UI: could not find parent element with selector ${parentSelector}`
    );
    return () => {};
  }

  // create a container Element in the DOM
  let base: HTMLElement | Text = document.createElement("div");
  parent.appendChild(base);

  function setState(state: T) {
    if (!base.isConnected) return;
    const newNode = builder(state, setState);
    base = applyDiff(base, newNode);
  }
  setState(initialState);

  return () => {
    base.remove();
  };
}

export function h(
  type: string,
  props: any,
  ...children: (PlainN | false | null)[]
): PlainNode {
  return {
    type,
    props,
    children,
  };
}
