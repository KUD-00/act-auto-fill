// Maybe url parse here?
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "save") {
    const link = location.href
    const params = new URLSearchParams(link);
    const inquiryId = params.get('inquiry_id');

    let inputMap = {
      "inquiryId": inquiryId, 
      "inputValues": {}
    }

    // get all class with inquiry-entry
    $(".inquiry-entry").each((index, element) => {
      console.log(element)
      const entryNo = $(element).attr("data-entry-no")
      console.log(entryNo)
      let inputValues = []
      let textareaValues = []
      let selectorValues = []
      // get all input textarea selector

      $(element).find("input").each((index, element) => {
        inputValues.push($(element).val())
      })

      $(element).find("textarea").each((index, element) => {
        textareaValues.push($(element).val())
      })

      $(element).find("select").each((index, element) => {
        selectorValues.push($(element).find(":selected").val())
      })

      inputMap.inputValues[entryNo] = {
        "inputValues": inputValues,
        "textareaValues": textareaValues,
        "selectorValues": selectorValues
      }
/*       const inputValuesFunctional = $(this).find("input").map(() => {
        return $(this).val()
      }) */
    })
    console.log(inputMap)

/*     $("input").each(function () {
      const value = $(this).val()
      console.log(value)
      inputMap.inputValues.push(value)
    });

    console.log(inputMap.inputValues) */

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
