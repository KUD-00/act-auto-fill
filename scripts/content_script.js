// const inputBoxes = $('input')
// console.log(inputBoxes)
// inputBoxes.map(function(input) {
//   console.log($(input).val())
// })


// inputBoxes.forEach(function(textbox) {
//   textbox.addEventListener('input', function() {
//     chrome.runtime.sendMessage({
//       type: 'save_textbox',
//       id: textbox.id,
//       value: textbox.value
//     });
//   });
// });

// window.addEventListener('save', function() {
//   const inputBoxes = $('input')
//   console.log(inputBoxes)
//   inputBoxes.map(function(input) {
//     console.log($(input).val())
//   })
// })

// window.addEventListener('load', function() {
//   textboxes.forEach(function(textbox) {
//     chrome.runtime.sendMessage({
//       type: 'get_textbox',
//       id: textbox.id
//     }, function(response) {
//       if (response.value) {
//         textbox.value = response.value;
//       }
//     });
//   });
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "saveInputs") {
    var inputs = document.getElementsByTagName("input");
    var inputValues = {};

    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      inputValues[input.name] = input.value;
    }
    chrome.runtime.sendMessage({action: "saveInputValues", values: inputValues}, function(response) {
      sendResponse({message: response.message});
    });
  }
});
