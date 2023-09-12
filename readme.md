# Tabnabbing Detector Extension
<div align="center">
  <a href="https://github.com/kccarlos/chrome-extension-for-tabnabbing">
    <img src="images/icon.png">
  </a>
</div>

## Instructions to run

1. Go to `chrome://extensions/`
2. Turn on Developer mode
3. Click on Load unpacked and browse to `./tabnabbingDetector/`, Select this folder
4. Pin this extension so you can see alarm in the taskbar. The extension will start to work automatically.

## How it works

When it detect that any website changes (Resemble MisMatchPercentage < 1)

 - the differences in the page will be colored with purple. Unchanged region will be greyscaled.
- the extension icon will have a red badge warning

 ![alarm](./images/icon-alarm.png)

When it does not detect any changes, no badge warning and website coloring will be applied.

 ![no alarm](./images/icon-no-alarm.png)

## Example Screenshots

- before leaving the tab

![before](./images/jhu-before.png)

- after leaving the tab

![after](./images/jhu-after.png)

- two view differences
   - notice that the background video region is highlighted. The top banner and the white labels on the right remain uncolored

![alarm](./images/jhu-alarm.png)
