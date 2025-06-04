function updateText(el, text) {
  el.textContent = text;
}

function highlight(el) {
  el.style.backgroundColor = "#ffd54f";
  el.style.padding = "10px";
  el.style.borderRadius = "8px";
}

function logInfo(msg) {
  console.log("[拡張機能] " + msg);
}