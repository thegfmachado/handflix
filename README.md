# Handflix - Gesture Controller

Streaming platform that can be controlled using eye and hand gestures detection 👁🖐

## Preview
<video width="100%" src="./assets/demo.mkv"></video>

## Pre-reqs

- NodeJS v19.6.x

## Running

- Run `npm ci` to restore the packages
- Run `npm start` and then go to your browser at [http://localhost:3000](http://localhost:3000) to view the page

## Features
- A lot of web worker processing (machine learning) to prevent the screen from freezing/crashing
- Hands draw on screen and background elements clickable 🙌
- Triggers scroll up when using open palm 🖐
- Triggers scroll down when using closed palm ✊
- Triggers click on nearest element when using pinch gesture 🤏
- When moving elements on the screen, fire **:hover** event on elements in context
- Play or pause videos with the blink of an eye 😁

### Credits
- Interface based on [Streaming Service](https://codepen.io/Gunnarhawk/pen/vYJEwoM) de [gunnarhawk](https://github.com/Gunnarhawk)