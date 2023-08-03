# dinosaur-game-chrome-hack
Hack for endless game of dinosaur game on chrome.

# About
This hack is based on the repository https://github.com/wayou/t-rex-runner/blob/gh-pages/index.js#L564 and has the intention of show how to input an action (jump) into the flow of the game without cheating, but by understanding what is happening under the hood.

# How to use
Simple: copy the content of hack.js and paste into the dev console of chrome (or similar that has the game) and hit enter. Just start the game and let the magic begins.

# How it works
The idea is to expand collision area and create a pre collision flow to insert a jump using the same method that check collision in the game (function checkForCollision, that is exposed and easily override).
