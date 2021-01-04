chrome.contextMenus.create({
  title: "View Top Posts From This Subreddit",
  contexts: ["page"],
  onclick: printCurrentTab()
});

function printCurrentTab() {
  return function(info, tab) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let meetUrl = tabs[0].url;
      const newMeetUrl = switchUser(meetUrl);
      chrome.tabs.create({
        index: tab.index + 1,
        url: newMeetUrl,
        selected: true
      });
    });
  };
}

function switchUser(meetUrl) {
  const authStartIndex = meetUrl.indexOf("authuser");
  const authEndIndex = authStartIndex + 10;

  //Get what's before authLink
  const beforeAuthLink = meetUrl
    .split("")
    .slice(0, authStartIndex)
    .join("");
  //Get authlink
  let authLink = meetUrl
    .split("")
    .slice(authStartIndex, authEndIndex)
    .join("");

  authLink = "authuser=0";

  const newMeetUrl = beforeAuthLink.concat(authLink);

  return newMeetUrl;
}
