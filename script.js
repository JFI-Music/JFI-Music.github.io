const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const playlist = [
  { title: 'Yet to Become', file: 'assets/musicPlayerAssets/01-yet-to-become.mp3', duration: '03:11' },
  { title: 'Destroy the Girl', file: 'assets/musicPlayerAssets/02-destroy-the-girl.mp3', duration: '04:06' },
  { title: 'Every Thousand Years', file: 'assets/musicPlayerAssets/03-every-thousand-years.mp3', duration: '03:35' },
  { title: 'My Origin Story', file: 'assets/musicPlayerAssets/04-my-origin-story.mp3', duration: '03:26' },
  { title: 'Of a Lifetime', file: 'assets/musicPlayerAssets/05-of-a-lifetime.mp3', duration: '06:12' },
];

const player = document.querySelector('#playlist-audio');
const playButton = document.querySelector('#play-track');
const previousButton = document.querySelector('#previous-track');
const nextButton = document.querySelector('#next-track');
const progress = document.querySelector('#track-progress');
const elapsed = document.querySelector('#elapsed-time');
const total = document.querySelector('#total-time');
const currentTitle = document.querySelector('#current-track-title');
const choices = [...document.querySelectorAll('.track-choice')];
let currentTrack = 0;

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
};

const syncPlayButton = () => {
  playButton.textContent = player.paused ? '▶' : 'Ⅱ';
  playButton.setAttribute('aria-label', `${player.paused ? 'Play' : 'Pause'} ${playlist[currentTrack].title}`);
};

const loadTrack = (index, autoplay = false) => {
  currentTrack = (index + playlist.length) % playlist.length;
  const track = playlist[currentTrack];
  player.src = track.file;
  currentTitle.textContent = track.title;
  total.textContent = track.duration;
  elapsed.textContent = '00:00';
  progress.value = 0;
  choices.forEach((choice, choiceIndex) => choice.classList.toggle('active', choiceIndex === currentTrack));
  if (autoplay) player.play();
  syncPlayButton();
};

playButton.addEventListener('click', () => (player.paused ? player.play() : player.pause()));
previousButton.addEventListener('click', () => loadTrack(currentTrack - 1, true));
nextButton.addEventListener('click', () => loadTrack(currentTrack + 1, true));
choices.forEach((choice) => choice.addEventListener('click', () => loadTrack(Number(choice.dataset.track), true)));
player.addEventListener('play', syncPlayButton);
player.addEventListener('pause', syncPlayButton);
player.addEventListener('ended', () => loadTrack(currentTrack + 1, true));
player.addEventListener('timeupdate', () => {
  elapsed.textContent = formatTime(player.currentTime);
  progress.value = player.duration ? (player.currentTime / player.duration) * 100 : 0;
});
progress.addEventListener('input', () => {
  if (player.duration) player.currentTime = (Number(progress.value) / 100) * player.duration;
});

const singleAudio = document.querySelector('#single-audio');
const singlePlay = document.querySelector('#single-play');
const singleProgress = document.querySelector('#single-track-progress');
const singleElapsed = document.querySelector('#single-elapsed');
const singleTotal = document.querySelector('#single-total');

const syncSingleButton = () => {
  singlePlay.textContent = singleAudio.paused ? '▶' : 'Ⅱ';
  singlePlay.setAttribute('aria-label', `${singleAudio.paused ? 'Play' : 'Pause'} City of the Violet Crown`);
};

singlePlay.addEventListener('click', () => (singleAudio.paused ? singleAudio.play() : singleAudio.pause()));
singleAudio.addEventListener('play', () => {
  if (!player.paused) player.pause();
  syncSingleButton();
});
player.addEventListener('play', () => {
  if (!singleAudio.paused) singleAudio.pause();
});
singleAudio.addEventListener('pause', syncSingleButton);
singleAudio.addEventListener('loadedmetadata', () => {
  singleTotal.textContent = formatTime(singleAudio.duration);
});
singleAudio.addEventListener('timeupdate', () => {
  singleElapsed.textContent = formatTime(singleAudio.currentTime);
  singleProgress.value = singleAudio.duration ? (singleAudio.currentTime / singleAudio.duration) * 100 : 0;
});
singleProgress.addEventListener('input', () => {
  if (singleAudio.duration) singleAudio.currentTime = (Number(singleProgress.value) / 100) * singleAudio.duration;
});

const revealItems = [
  ...document.querySelectorAll('.hero > *:not(.scroll-cue), .section-heading, .music-player, .split > *, .video-shell, .story > *, .highlights > *, .gallery img, .contact > *, footer > *'),
];

revealItems.forEach((item, index) => {
  item.classList.add('reveal-item');
  if (item.matches('.split > :first-child, .story > :first-child')) item.classList.add('reveal-left');
  if (item.matches('.split > :last-child, .story > :last-child')) item.classList.add('reveal-right');
  item.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
});
document.documentElement.classList.add('reveal-ready');

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  requestAnimationFrame(() => revealItems.forEach((item) => revealObserver.observe(item)));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

document.querySelector('#year').textContent = new Date().getFullYear();
