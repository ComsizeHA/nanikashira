function check_config() {
  if (typeof config === "undefined") {
    console.warn("config.js が読み込まれていません。");
    return;
  }
}

function open_input() {
  ///////////////入力画面を開く///////////////
  const editmenu = document.querySelectorAll('select//[class^="htBlock-selectOther"]');

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