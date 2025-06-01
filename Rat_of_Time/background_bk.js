chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["config.js"] // 先に config を inject
  }, () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: fillTextinput_texts
    });
  });
});

function fillTextinput_texts() {
  if (typeof config === "undefined") {
    console.warn("config.js が読み込まれていません。");
    return;
  }

  const input_btn = document.getElementById("recording_timestamp_add");
  if (input_btn == null) {
    console.warn("ボタンが見つかりません。");
  }

  const { times, work_status } = config;

  if (times.length !== work_status.length) {
    console.warn("打刻種別と打刻時間が対応しません。");
    return;
  }

  for (let i = 0; i < times.length - 4; i++) {
    input_btn.click();
  }

  const input_texts = document.querySelectorAll('input[id^="recording_timestamp_time"]');
  const input_codes = document.querySelectorAll('select[id^="recording_type_code"]');

  if (input_texts.length === 0 || input_codes.length === 0) {
    console.warn("入力欄の取得に失敗しました。");
    return;
  }

  for (let i = 0; i < times.length; i++) {
    if (input_codes[i] && input_texts[i]) {
      input_codes[i].value = work_status[i];
      input_codes[i].dispatchEvent(new Event("input", { bubbles: true }));
      input_codes[i].dispatchEvent(new Event("change", { bubbles: true }));
      input_texts[i].focus();
      input_texts[i].value = times[i];
      input_texts[i].dispatchEvent(new Event("input", { bubbles: true }));
      input_texts[i].dispatchEvent(new Event("change", { bubbles: true }));
    } else {
      console.warn(`index ${i} の要素が不足しています`);
    }
  }
}