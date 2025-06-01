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

  const default_textbox_num = document.querySelectorAll('input[id^="recording_timestamp_time"]');
  const input_btn = document.getElementById("recording_timestamp_add");

  if (input_btn == null || default_textbox_num.length == 0) {
    console.warn("ボタンが見つかりません。");
  }

  const { times, work_status } = config;

  if (times.length !== work_status.length) {
    console.warn("打刻種別と打刻時間が対応しません。");
    return;
  }

  for (let i = 0; i <= times.length - default_textbox_num.length; i++) {
    input_btn.click();
  }

  let input_time;
  let input_code;
  for (let i = 0; i < times.length; i++) {
    input_code = document.getElementById('recording_type_code_' + (i + 1));
    input_time = document.getElementById('recording_timestamp_time_' + (i + 1));

    if (input_code == null || input_time == null) {
      alert("オブジェクトの取得に失敗しました。");
    }

    //打刻種別入力
    input_code.value = work_status[i];
    input_code.dispatchEvent(new Event("input", { bubbles: true }));
    input_code.dispatchEvent(new Event("change", { bubbles: true }));

    //打刻時間入力
    input_time.focus();
    input_time.value = times[i];
    input_time.dispatchEvent(new Event("input", { bubbles: true }));
    input_time.dispatchEvent(new Event("change", { bubbles: true }));
  }
}