chrome.contextMenus.create({
  title: "Switch Google Account",
  documentUrlPatterns: ['*://meet.google.com/*'],
  onclick: printCurrentTab()
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
      const tabId = details.tabId;
      const initiator = details.initiator;
      const url = details.url;
      const meetId = url.match(/[a-z]{3}[-][a-z]{4}[-][a-z]{3}/gi)

      console.log({initiator, url, tabId, meetId});
      
      if (initiator === 'https://meet.google.com' || initiator === 'https://calendar.google.com' && meetId) {
        chrome.tabs.update(tabId, {url : switchUser(`https://meet.google.com/${meetId}`)})
        console.log(`redirect occured with initiator page of ${initiator}`);
      }
  },
  {urls: ['*://meet.google.com/*', '*://calendar.google.com/*'], types: ['main_frame']},
);

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
