// ページの読み込みが完了したタイミングで呼ばれる（MPA対応）
chrome.webNavigation.onCompleted.addListener((details) => {
  console.log("MPA遷移検出:", details.url);

  console.log("aiueo");
}, {
  url: [{ schemes: ["http", "https"] }]
});