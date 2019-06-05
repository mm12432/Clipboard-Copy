var id;
window.addEventListener(
  "message",
  function(e) {
    id = e.data["id"];
    if (e.data["type"] == "image") {
      chrome.runtime.sendMessage({ type: "image" });
    } else {
      chrome.runtime.sendMessage({ type: "text" }, function(response) {
        const text = document.getElementById(id);
        text.innerText = response["clipboard"];
      });
    }
  },
  false
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == "imgback") {
    const img = document.getElementById(id);
    img.setAttribute("src", request["clipboard"]);
  }
});
