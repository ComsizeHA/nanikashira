chrome.webNavigation.onHistoryStateUpdated.addListener(details => {
  console.log('[webNavigation] URL changed to:', details.url);
  // ここで必要な処理を呼び出す
}, {
  url: [{ hostContains: 'kingtime.ne.jp' }]
});

// 通常のフルリロードや click による遷移もキャッチ
chrome.webNavigation.onCompleted.addListener(details => {
  console.log('[webNavigation] page loaded:', details.url);
  console.log("asi")
}, {
  url: [{ hostContains: 'kingtime.ne.jp' }]
});