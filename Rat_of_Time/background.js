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

async function main() {
  check_config();
  //open_input();
  //check_pageLoaded();
  //const work_status = config;
  const times_input = await get_storage();
  alert(times_input);
  create_inputbox(times_input[0], times_input[1]);
  input_attendance(times_input[0], times_input[1]);
}