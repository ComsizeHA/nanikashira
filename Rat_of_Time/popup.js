document.getElementById("submit").addEventListener("click", async () => {
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: inputAttendance,
    args: [startTime, endTime],
  });
});

function inputAttendance(start, end) {
  // 例：KING OF TIMEの出勤・退勤時間の入力欄をセレクタで指定して値をセット
  const startInput = document.querySelector("input[name='WorkStartTime']"); // セレクタは実際のものに書き換えてください
  const endInput = document.querySelector("input[name='WorkEndTime']");

  if (startInput && endInput) {
    startInput.value = start;
    endInput.value = end;
  } else {
    alert("入力欄が見つかりません。セレクタを確認してください。");
  }
}