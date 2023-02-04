export function elt(type, props, ...children) {
  let el = document.createElement(type);
  if (props) {
    for (let prop in props) {
      let value = props[prop];
      if (typeof value === "function") el[prop] = value;
      else el.setAttribute(prop, value);
    }
  }
  for (let child of children) {
    if (child == null) continue;
    if (typeof child === "string")
      el.appendChild(document.createTextNode(child));
    else el.appendChild(child);
  }
  return el;
}
