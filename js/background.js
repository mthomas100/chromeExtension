chrome.contextMenus.create({
  title: "Switch Google Account",
  documentUrlPatterns: ['*://meet.google.com/*'],
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

const userSpecifiedAuthLink = '?authuser=1'

function switchUser(meetUrl) {
    const authStartIndex = meetUrl.indexOf("?authuser");
    let newMeetUrl = '';

    if (authStartIndex !== -1) {
        const beforeAuthLink = meetUrl
        .split("")
        .slice(0, authStartIndex)
        .join("");
        
        newMeetUrl = beforeAuthLink.concat(userSpecifiedAuthLink);
    } else {
        newMeetUrl = meetUrl.concat(userSpecifiedAuthLink)
    }
  
    return newMeetUrl;
}
