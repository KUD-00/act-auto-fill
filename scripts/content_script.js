// Maybe url parse here?
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "save") {
    const link = location.href
    const params = new URLSearchParams(link);
    const inquiryId = params.get('inquiry_id');

    let inputMap = {}
    inputMap[inquiryId] = {}

    // get all class with inquiry-entry
    $(".inquiry-entry").each((index, element) => {
      const entryNo = $(element).attr("data-entry-no")
      if (entryNo == undefined) return;

      let inputValues = []
      let textareaValues = []
      let selectorValues = []
      let optionValues = []
      // get all input textarea selector

      $(element).find("input").each((index, element) => {
        if ($(element).attr("type") === "radio" || $(element).attr("type") === "checkbox") {
          if ($(element).prop("checked")){
            optionValues.push(1)
          } else {
            optionValues.push(0)
          }
        } else {
          inputValues.push($(element).val())
        }
      })

      $(element).find("textarea").each((index, element) => {
        textareaValues.push($(element).val())
      })

      $(element).find("select").each((index, element) => {
        selectorValues.push($(element).find(":selected").val())
      })

      inputMap[inquiryId][entryNo] = {
        "inputValues": inputValues,
        "textareaValues": textareaValues,
        "selectorValues": selectorValues,
        "optionValues": optionValues
      }
    })
    console.log(inputMap);

    (async () => {
      const saveResponse = await chrome.runtime.sendMessage({ action: "saveInputValues", values: inputMap, greeting: "hello"});
      console.log(saveResponse);
      sendResponse({ message: response.message });
    })();
  }

  if (request.action === "fill") {
    const link = location.href
    const params = new URLSearchParams(link);
    const inquiryId = params.get('inquiry_id');

    (async () => {
      const fillResponse = await chrome.runtime.sendMessage({ action: "fillInputValues", values: inquiryId })
      console.log(fillResponse);
      //sendResponse({ message: response.message });
    })();

    chrome.runtime.sendMessage({ action: "fillInputValues", values: inquiryId }, function (response) {
      $(".inquiry-entry").each((index, element) => {
        const entryNo = $(element).attr("data-entry-no")
        if (entryNo === undefined) return;

        const data = response[entryNo]
        
        if (data.textareaValues.length != 0) {
          $(element).find("textarea").each((index, element) => {
            $(element).val(data.textareaValues[index])
          })
        }
        //sendResponse({ message: response.message });
      });
    })
  }
});
