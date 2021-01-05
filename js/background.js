chrome.contextMenus.create({
  title: "Switch Google Account",
  onclick: printCurrentTab()
});

function printCurrentTab() {
  return function(info, tab) {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      let meetUrl = tabs[0].url;
      const newMeetUrl = switchUser(meetUrl);
      console.log(newMeetUrl);
      chrome.tabs.update({
        url: newMeetUrl
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

  if (authLink == "authuser=1") {
    authLink = "authuser=0";
  } else authLink = "authuser=1";

  const newMeetUrl = beforeAuthLink.concat('?').concat(authLink);

  return newMeetUrl;
}
