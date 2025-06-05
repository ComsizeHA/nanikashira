chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["config.js", "utils.js"]
  }, () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: main
    });
  });
});

function main() {
  check_config();
  //open_input();
  const { times, work_status } = config;
  create_inputbox(times, work_status);
  input_attendance(times, work_status);
}