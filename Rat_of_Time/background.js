chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["utils.js"]
  }, () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: main
    });
  });
});

async function main() {
  open_input();
  
  //const work_status = config;
  const times_input = await get_storage();
  create_inputbox(times_input[0], times_input[1]);
  input_attendance(times_input[0], times_input[1]);
  
}

/*
(async () => {
  try {
    await waitForH1SpanText("勤務データ編集");
    console.log("タイトル一致！次の処理へ");
    // ここに次の処理を書く（自動入力など）
  } catch (e) {
    console.warn(e.message);
  }
  })();
*/