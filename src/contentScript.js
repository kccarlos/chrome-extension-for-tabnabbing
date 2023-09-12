(() => {
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        let {screenshot: screenshot, compare: needCompare} = obj;
        // console.log('Received!', screenshot)
        // console.log('compare', needCompare)
        if (!needCompare) {
            localStorage.setItem("screenshot", screenshot);
        } else {
            screenshot_before = localStorage.getItem("screenshot")
            var diff = resemble(screenshot_before)
                    .compareTo(screenshot)
                    .ignoreColors()
                    .onComplete(function (data) {
                        if (data.rawMisMatchPercentage < 1) {
                            console.log('No Snabbing, continue detection')
                            window.screenshotTask = setInterval( callBG('screenshot'), 1000);
                        } else {
                            console.log('Snabbing detected! ')
                            showdiff(data.getImageDataUrl());
                            chrome.runtime.sendMessage({status: 'alert'})
                        }
                    });
        }
    });

    window.screenshotTask = setInterval( callBG('screenshot'), 1000);

    function callBG(status){
        chrome.runtime.sendMessage({status: status});
    }

    document.addEventListener("visibilitychange", function() {
        removeOverlay()
        if (document.visibilityState === 'visible') {
            console.log('NOW VISIBLE, Comparing now');
            callBG('compare');
        } else if (document.visibilityState === 'hidden') {
            console.log('NOW HIDDEN, STOP SCREENSHOT');
            clearInterval(window.screenshotTask);
        }
    }, false);

    function showdiff(dataurl){
        // Source: https://stackoverflow.com/questions/61418514/use-chrome-dev-tools-to-overlay-transparent-image-in-browser-window
        const img = new Image();
        img.src = dataurl;
        img.className = "tabnabbingShow";
        Object.assign(img.style, {
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            opacity: 30,
            objectFit: 'cover',
            objectPosition: 'center center',
            pointerEvents: 'none'
        });
        document.body.appendChild(img);
    };

    function removeOverlay(){
        if (document.getElementById("tabnabbingShow")){
            [...document.getElementsByClassName("tabnabbingShow")].map(n => n && n.remove());
        };
    };
})();

