// content.js (run_at: "document_start")
;(function() {
  const dispatch = () => window.dispatchEvent(new Event('koTimeLocationChange'));
  // History API のフック
  ['pushState','replaceState'].forEach(fn => {
    const orig = history[fn];
    history[fn] = function(...args) {
      const res = orig.apply(this, args);
      dispatch();
      return res;
    };
  });
  // 戻る／進む
  window.addEventListener('popstate', dispatch);
})();

/** 画面遷移（一度だけ）を待つ Promise */
function waitForLocationChange() {
  return new Promise(resolve => {
    const onChange = () => {
      window.removeEventListener('koTimeLocationChange', onChange);
      resolve();
    };
    window.addEventListener('koTimeLocationChange', onChange);
  });
}