$('#saveBtn').click(function() {
    console.log("save")
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'save_textbox'}, function() {
            alert('保存成功！');
        });
    });
});

$('#fillBtn').click(function() {
    console.log("fill")
    var inputs = $('input[type="text"], textarea');
    inputs.each(function() {
        $(this).val('');
    });
});

document.getElementById("saveButton").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "saveInputs"}, function(response) {
            console.log(response.message);
        });
    });
});
