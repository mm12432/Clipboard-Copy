chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == "image" || request.type == "text") {
    function pasteCallback(event) {
      if (event.clipboardData.items && event.clipboardData.items.length > 0) {
        var item = event.clipboardData.items[0];
        if (item && item.kind === "file" && item.type.match(/^image\//)) {
          var result = item.getAsFile();
          const reader = new FileReader();
          reader.onload = function(event) {
            var str = event.target.result;
            chrome.tabs.query({ active: true, currentWindow: true }, function(
              tabs
            ) {
              chrome.tabs.sendMessage(tabs[0].id, {
                type: "imgback",
                clipboard: str
              });
            });
          };
          reader.readAsDataURL(result);
        } else {
          var content = event.clipboardData.getData("text");
          sendResponse({ clipboard: content });
        }
      }
    }
    document.addEventListener("paste", pasteCallback);
    document.execCommand("paste");
    document.removeEventListener("paste", pasteCallback);
  }
});
