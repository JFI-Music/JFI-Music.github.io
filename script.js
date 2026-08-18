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

document.querySelector('#year').textContent = new Date().getFullYear();
