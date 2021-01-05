
// const meetLink = 'https://meet.google.com/pbx-wmab-hij?authuser=1&hs=122';
// const notMeetLink = 'https://www.google.com';
// const authUser = 0; // preference as denoted in the extension settings


// //NOTE: this will need to be improved to more precisely target meet link
// // 
// function containsMeetLink(link) {
//     return link.startsWith('https://meet.google.com');
// }

// function handleMeetLink(link) {
//     if (containsMeetLink(link)) {
//         const authStartIndex = link.indexOf('authuser');
//         const authEndIndex = authStartIndex + 10;
//         //Get what's before authLink
//         const beforeAuthLink = link.split("").slice(0, authStartIndex).join("");
//         //Get authlink
//         const authLink = link.split("").slice(authStartIndex, authEndIndex).join("");
//         //Get what's after authLink
//         const afterAuthLink = link.split("").slice(authEndIndex).join("");

//         console.log(authLink[authLink.length - 1])
//     } else {
//         console.log('Meet Link Not Detected')
//     }
// }

// handleMeetLink(meetLink);

// const currentMeetLink = 'https://meet.google.com/pbx-wmab-hij?authuser=1';
// const notCurrentMeetLink = 'https://www.google.com';
// const specifiedAuthLink = 'authuser=1';

// function containsCurrentMeetLink(meetUrl) {
//     return meetUrl.startsWith('https://meet.google.com');
// }

// function handleMeetLink(meetUrl) {
//     if (containsCurrentMeetLink(meetUrl)) {
//         const authStartIndex = meetUrl.indexOf('authuser');
//         const authEndIndex = authStartIndex + 10;

//         //Get what's before authLink
//         const beforeAuthLink = meetUrl.split("").slice(0, authStartIndex).join("");
//         //Get authlink
//         let authLink = meetUrl.split("").slice(authStartIndex, authEndIndex).join("");

//         if (authLink === specifiedAuthLink) {
//             console.log(`no auth Link change`)

//         } else {
//             authLink = specifiedAuthLink;
//             console.log('auth link change');
//         }

//         const newMeetUrl = beforeAuthLink.concat(authLink);
//         console.log(newMeetUrl);

//         // console.log(authLink[authLink.length - 1])
//     } else {
//         console.log('Meet Link Not Detected')
//     }
// }

// handleMeetLink(currentMeetLink)



const meetUrl1 = 'https://meet.google.com/pbx-wmab-hij';
const meetUrl2 = 'https://meet.google.com/pbx-wmab-hij?authuser=1';
const meetUrl3 = 'https://meet.google.com/pbx-wmab-hij?authuser=1&hs=122&ijlm=1609727277478';
const meetUrl4 = 'https://meet.google.com/pbx-wmab-hij?authuser=1&hs=122';

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

console.log(switchUser(meetUrl1));
console.log(switchUser(meetUrl2));
console.log(switchUser(meetUrl3));
console.log(switchUser(meetUrl4));