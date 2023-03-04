const { GestureDescription, Finger, FingerCurl } = window.fp;

const ScrollDownGesture = new GestureDescription('scroll-down'); // ✊️
const ScrollUpGesture = new GestureDescription('scroll-up'); // 🖐


// Rock
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ScrollDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}


// Paper
// -----------------------------------------------------------------------------

// no finger should be curled
for (let finger of Finger.all) {
  ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}


// Scissors
//------------------------------------------------------------------------------

// index and middle finger: stretched out
// ScissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
// ScissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);

// // ring: curled
// ScissorsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
// ScissorsGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// // pinky: curled
// ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
// ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9);

const knowGestures = [
  ScrollDownGesture,
  ScrollUpGesture,
]

const gestureStrings = {
  'scroll-down': '✊️',
  'scroll-up': '🖐',
}

export {
  knowGestures,
  gestureStrings,
}