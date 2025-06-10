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
  //check_pageLoaded();
  const { times, work_status } = config;
  const times_input = get_storage();
  alert(times_input);
  create_inputbox(times, work_status);
  input_attendance(times, work_status);
}