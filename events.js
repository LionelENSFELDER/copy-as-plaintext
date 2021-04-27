var copyAsPlaintext = {
  "id": "copyAsPlaintext",
  "title": "Copy as plaintext !",
  "contexts": ["selection"],
}

chrome.contextMenus.create(copyAsPlaintext);

chrome.contextMenus.onClicked.addListener(function(info, tab) { 
  let text = info.selectionText.toString();
  copyToClipboard(text);
  //setToClipboard(text);
});

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const setToClipboard = text => {
  const textToCopy = new Blob([text], {type: 'text/plain'});
  let data = [new ClipboardItem({ 
    "text/plain": textToCopy 
  })];
  //log("data=>", data);
  window.navigator.clipboard.writeText(text).then(function() {
    /* success */
    alert("success");
    chrome.extension.getBackgroundPage().console.log('success');
  }, function(err) {
    /* failure */
    alert("failure");
    chrome.extension.getBackgroundPage().console.log('failure', err);
  });
}