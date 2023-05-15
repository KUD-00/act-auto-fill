// Maybe url parse here?
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "save") {
    const link = location.href
    const params = new URLSearchParams(link);
    const inquiryId = params.get('inquiry_id');

    let inputMap = {
      "inquiryId": inquiryId, 
      "inputValues": []
    }

    $("input").each(function () {
      const value = $(this).val()
      console.log(value)
      inputMap.inputValues.push(value)
    });

    console.log(inputMap.inputValues)

/*     var inputValues = $("input").map((index, input) => {
      console.log($(this).val())
      return $(this).val()
    }) */

    chrome.runtime.sendMessage({ action: "saveInputValues", values: inputMap.inputValues}, function (response) {
      //sendResponse({ message: response.message });
    });
  }

  if (request.action === "fill") {
    const link = location.href
    const params = new URLSearchParams(link);
    const inquiryId = params.get('inquiry_id');

    chrome.runtime.sendMessage({ action: "fillInputValues", values: inquiryId}, function (response) {
      $("input").array.forEach((element, index) => {
        $(this).val(response.inputValues[index]) 
      });
      //sendResponse({ message: response.message });
    });
  }

  if (request.action === "reset") {
  }
});
