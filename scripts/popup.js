document.getElementById("saveButton").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(results) {
        chrome.tabs.sendMessage(results[0].id, {action: "save"}, function(response) {
            console.log(response.message);
        });
    });
});

document.getElementById("fillButton").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(results) {
        chrome.tabs.sendMessage(results[0].id, {action: "fill"}, function(response) {
            console.log(response.message);
        });
    });
});

document.getElementById("resetButton").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(results) {
        chrome.tabs.sendMessage(results[0].id, {action: "reset"}, function(response) {
            console.log(response.message);
        });
    });
});