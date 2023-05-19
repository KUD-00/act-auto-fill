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
          if ($(element).prop("checked")) {
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
      const saveResponse = await chrome.runtime.sendMessage({ action: "saveInputValues", values: inputMap, greeting: "hello" });
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
      const data = fillResponse["inputValues"][inquiryId]
      console.log(data);

      $(".inquiry-entry").each((index, element) => {
        const entryNo = $(element).attr("data-entry-no")
        if (entryNo === undefined) return;

        const entryData = data[entryNo]

        if (entryData.textareaValues.length != 0) {
          $(element).find("textarea").each((index, element) => {
            $(element).val(entryData.textareaValues[Number(index)])
          })
        }

        if (entryData.selectorValues.length != 0) {
          $(element).find("select").each((index, element) => {
            // delete what is selected
            $(element).find(":selected").removeAttr(':selected');
            $(element).find((`option:eq(${Number(entryData.selectorValues[index])})`)).attr(':selected',':selected')
          })
        }

        if (entryData.inputValues.length != 0 || entryData.optionValues.length != 0) {
          $(element).find("input").each((index, element) => {
            if ($(element).attr("type") === "radio" || $(element).attr("type") === "checkbox") {
              console.log(entryNo);
              console.log(entryData);
              if (entryData.optionValues[Number(index)] == 1) {
                console.log("HERE")
                $(element).prop('checked', true)
              }
            } else {
              $(element).val(entryData.inputValues[Number(index)])
            }
          })
        }

        //sendResponse({ message: response.message });
      });
    })();
  }
});
