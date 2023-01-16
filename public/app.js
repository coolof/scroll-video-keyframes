const main = document.querySelector('main');
const videoFrames = main.dataset.frames;//Number of frames in the video
const videoFps = main.dataset.fps;//Framerate of the video
const videoTime = videoFrames / videoFps;//Total length (in s) of video
const scrollMultiplier = main.dataset.multiplier ? main.dataset.multiplier : 3;
let h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
let percent = 0;

main.style.height = (videoFrames * scrollMultiplier) + 'vh';//Set height of video wrapper based on number of frames

/* Scrobble video on scroll (based on % scrolled) */
function videoScroll() {
  let video = document.querySelector('#video');
  percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;//Get percentage scrolled
  let setTime = Number.parseFloat((videoTime / 100) * percent).toFixed(3);

  video.currentTime = setTime;//Set current time in the video
}

/* Run on scroll and resize */
window.addEventListener('scroll', function() {
  //videoScroll();
  window.requestAnimationFrame(videoScroll);
});
window.addEventListener('resize', function() {
  //videoScroll();
  window.requestAnimationFrame(videoScroll);
});

/* Toolbar */
const toggle = document.querySelector('.toolbar-toggle');
const keyframes = document.querySelector('#keyframes');

toggle.addEventListener('click', function() {
  document.body.classList.toggle('menu-open');
});

keyframes.addEventListener('change', function() {
  video = document.querySelector('#video');

  let videoElem = document.createElement('video');
  videoElem.id = 'video';
  videoElem.setAttribute('playsInline', '');
  videoElem.setAttribute('muted', 'muted');

  let sourceMp4 = document.createElement('source');
  sourceMp4.src = '/' + keyframes.value + '.mp4#t=0.001';
  sourceMp4.type = 'video/mp4';

  let sourceWebm = document.createElement('source');
  sourceWebm.src = '/' + keyframes.value + '.webm#t=0.001';
  sourceWebm.type = 'video/webm';

  video.parentNode.removeChild(video);
  main.appendChild(videoElem);
  videoElem.appendChild(sourceWebm);
  videoElem.appendChild(sourceMp4);
  videoScroll();
});