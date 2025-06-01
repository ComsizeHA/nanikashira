chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: fillTextInputs_text
  });
});

function fillTextInputs_text() {
  const inputs_text = document.querySelectorAll('input[id^="recording_timestamp_time"]');
  const input_btn = document.getElementById("recording_timestamp_time_1");
  if (inputs_text.length >= 2) {
    inputs_text[0].focus();
    inputs_text[0].value = "09:00";
    inputs_text[0].dispatchEvent(new Event("input", { bubbles: true }));
    inputs_text[0].dispatchEvent(new Event("change", { bubbles: true }));

    inputs_text[2].focus();
    inputs_text[2].value = "18:00";
    inputs_text[2].dispatchEvent(new Event("input", { bubbles: true }));
    inputs_text[2].dispatchEvent(new Event("change", { bubbles: true }));

  } else {
    alert("対象のテキストボックスが見つかりません。");
  }
  if (input_btn != null) {
    input_btn.click();
  } else {
    alert("ボタンが見つからないよ。");
  }
}