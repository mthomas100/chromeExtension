chrome.contextMenus.create({
  title: "View Top Posts From This Subreddit",
  contexts: ["selection"],
  onclick: switchAccount()
});

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

<<<<<<< HEAD
function deleteThisToo() {
  return;
}
=======
function deleteThis() {
  return;
}
>>>>>>> e66fedcadc8129d1517be96388f5ace3cb7b70db
