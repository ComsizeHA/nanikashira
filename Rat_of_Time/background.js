chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["config.js","utils.js"]
  }, () => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: main
    });
  });
});

function main(){
  fillTextinput_texts();
}