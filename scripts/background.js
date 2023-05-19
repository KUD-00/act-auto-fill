chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action === "saveInputValues") {
      chrome.storage.local.set(request.values).then(() => {
        sendResponse({message: "Values saved"})
      });
      return true;
    }

    if (request.action === "fillInputValues") {
      chrome.storage.local.get([request.values]).then((result) => {
        console.log(result);
        sendResponse({ message: "Input values got.", inputValues: result });
      });
      return true;
    }
  }
);