chrome.runtime.onMessage.addListener((req, sender, response) => {
    if (req.status === 'screenshot') {
        takeScreenShot(sender.tab.id, false)
    } else if (req.status === 'compare') {
        takeScreenShot(sender.tab.id, true)
    } else if (req.status === 'alert')  {
        alarmUser(sender.tab.id)
    }
});

async function takeScreenShot(tabid, responseStatus){
    await new Promise(r => setTimeout(r, 500));
    let data = await chrome.tabs.captureVisibleTab();
    await chrome.tabs.sendMessage(tabid, {
        screenshot: data,
        compare: responseStatus
    });
}

async function alarmUser(tabId){
    chrome.action.setBadgeBackgroundColor(
        { color: '#F00' },
        () => { /* ... */ },
    );
    chrome.action.setBadgeText({
        text: "!!!",
        tabId: tabId
    });
}