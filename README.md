# Simple sleep browser sleep timer

## Inspired by this feature on spotify:
![image of spotify feature](https://github.com/Ymirke/browser-sleep/blob/main/spotify-sleep.jpeg?raw=true)

## But for browsers:
![image of browser sleep](https://github.com/Ymirke/browser-sleep/blob/main/screenshot.png?raw=true)

All it does is the following when you set a timer:
1. Go through all tabs and identify audio and video HTML elements.
2. Create promises which resolve after X time, and all elements are set to "pause".

It could also have a timer to show how long you have left to listen before your browser will sleep all audio/video.

The promises are actually stored, and can be setup to be able to cancel or prolonge a timer - however it is not really implemented.

Created this a while ago, and thought why not share it.
