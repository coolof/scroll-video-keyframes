const main = document.querySelector('main');
const video = document.querySelector('#video');

/* Get video data from <main> element */
let frames = main.dataset.frames,
    fps = main.dataset.fps,
    multiplier = main.dataset.multiplier ? main.dataset.multiplier : 3;

/* Calculate video time in s */
let time = frames / fps;

/* Used for calculation of % scrolled */
let h = document.documentElement, 
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';

/* Set default scroll and time */
let percent = 0;
let currentTime = 0.001;

/* Set scroll length based on video */
main.style.height = (frames * multiplier) + 'vh';//Set height of video wrapper based on number of frames

/* Update time and scroll values */
window.addEventListener("scroll", function() {
  percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;//Get percentage scrolled
  currentTime = Number.parseFloat((time / 100) * percent).toFixed(3);
});

/* Update current time of video */
function step(timestamp) { 
  video.currentTime = currentTime;

  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);