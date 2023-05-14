chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "saveInputValues") {
    chrome.storage.local.set({inputValues: request.values}, function() {
      sendResponse({message: "Input values saved."});
    });
  }
});
