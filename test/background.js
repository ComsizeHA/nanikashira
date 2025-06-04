chrome.action.onClicked.addListener((tab) => {
  // utils.js を先に inject（補助関数群）
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["utils.js"]
  }, () => {
    // main 関数を実行
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: main
    });
  });
});

// 実行のメイン関数（utils.js の関数を使う）
function main() {
  const h1 = document.querySelector('h1');
  if (!h1) {
    console.warn("h1 タグが見つかりません。");
    return;
  }

  updateText(h1, "こんにちは、世界！");
  highlight(h1);
  logInfo("h1 を更新しました");
}