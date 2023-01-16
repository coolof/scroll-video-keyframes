const main = document.querySelector('main');
const videoFrames = main.dataset.frames;//Number of frames in the video
const videoFps = main.dataset.fps;//Framerate of the video
const videoTime = videoFrames / videoFps;//Total length (in s) of video

main.style.height = (videoFrames * 3) + 'vh';//Set height of video wrapper based on number of frames

/* Scrobble video on scroll (based on % scrolled) */
function videoScroll() {
  let video = document.querySelector('#video');
  let h = document.documentElement, 
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';

  let percent = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;//Get percentage scrolled
  video.currentTime = (videoTime / 100) * percent;//Set current time in the video
}

/* Run on scroll and resize */
window.addEventListener('scroll', function() {
  videoScroll();
});
window.addEventListener('resize', function() {
  videoScroll();
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
  videoElem.setAttribute('playsinline', '');
  videoElem.setAttribute('muted', '');

  let sourceMp4 = document.createElement('source');
  sourceMp4.src = '/' + keyframes.value + '.mp4';
  sourceMp4.type = 'video/mp4';

  let sourceWebm = document.createElement('source');
  sourceWebm.src = '/' + keyframes.value + '.webm';
  sourceWebm.type = 'video/webm';

  video.parentNode.removeChild(video);
  main.appendChild(videoElem);
  videoElem.appendChild(sourceWebm);
  videoElem.appendChild(sourceMp4);
  videoScroll();
});