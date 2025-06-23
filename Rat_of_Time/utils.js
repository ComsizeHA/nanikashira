function open_input() {
  ///////////////入力画面を開く///////////////
  const editmenu = document.querySelectorAll('select[class^="htBlock-selectOther"]');

  if (editmenu.length === 0) {
    console.warn("ボタンが見つかりません。");
    return;
  }

  editmenu[0].value = "#button_0590253740701";
  editmenu[0].dispatchEvent(new Event("change", { bubbles: true }));
  editmenu[0].dispatchEvent(new Event("input", { bubbles: true }));
}

///////////////入力枠を増やす///////////////
function create_inputbox(times, work_status) {
  const default_textbox_num = document.querySelectorAll('input[id^="recording_timestamp_time"]');
  const input_btn = document.getElementById("recording_timestamp_add");

  if (input_btn == null || default_textbox_num.length == 0) {
    console.warn("ボタンが見つかりません。");
  }

  if (times.length !== work_status.length) {
    console.warn("打刻種別と打刻時間が対応しません。");
    return;
  }

  for (let i = 0; i <= times.length - default_textbox_num.length; i++) {
    input_btn.click();
  }
}

///////////////打刻入力///////////////
function input_attendance(times, work_status) {
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
    input_code.dispatchEvent(new Event("change", { bubbles: true }));

    //打刻時間入力
    input_time.focus();
    input_time.value = times[i];
    input_time.dispatchEvent(new Event("input", { bubbles: true }));
    input_time.dispatchEvent(new Event("change", { bubbles: true }));
  }
}

///////////////ページタイトル取得///////////////
function get_page_title() {
  const str = document.getElementsByClassName('htBlock-pageTitleSticky')[0].querySelectorAll('span')[0].textContent.trim();
  console.warn(str);
  return str;
}

///////////////chrome.storageの取得///////////////
function get_storage(){
  return new Promise((resolve)=> {
    chrome.storage.local.get({ atai: [],atai2: []}, (data) => {
      resolve([data.atai, data.atai2]);
    });
  });
}

function waitForH1SpanText(targetText, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const interval = setInterval(() => {
      const h1 = document.querySelector("h1 span");

      if (h1 && h1.textContent.trim() === targetText) {
        clearInterval(interval);
        resolve();
      }

      // タイムアウト処理（任意）
      if (Date.now() - start > timeout) {
        clearInterval(interval);
        reject(new Error("タイムアウト：指定のテキストが現れませんでした"));
      }
    }, 500); // 500ms 間隔で監視
  });
}