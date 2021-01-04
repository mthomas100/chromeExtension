chrome.contextMenus.create({
  title: "View Top Posts From This Subreddit",
  contexts: ["selection"],
  onclick: printCurrentTab()
});

function printCurrentTab() {
  return function(tab) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let meetUrl = tabs[0].url;
      switchUser(meetUrl);
    });
  };
}

function switchUser(url) {}

function switchAccount() {
  return function(info, tab) {
    let text = info.selectionText;
    let redditLink = "https://www.reddit.com/" + format(text) + "/top/?t=all";
    chrome.tabs.create({
      index: tab.index + 1,
      url: redditLink,
      selected: true
    });
  };
}

function format(subName) {
  // If selected text begins with "r/"
  if (subName[0] === "r" && subName[1] === "/") {
    return subName;
  } else {
    return "r/" + subName;
  }
}
