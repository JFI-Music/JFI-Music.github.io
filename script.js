document.documentElement.classList.add('js-ready');

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (start, end, value) => {
  const amount = clamp((value - start) / (end - start));
  return amount * amount * (3 - 2 * amount);
};
const bell = (value, start, peak, end) => Math.min(smoothstep(start, peak, value), 1 - smoothstep(peak, end, value));

/* Navigation */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !open);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
}));

/* Music players */
const playlist = [
  { title:'Yet to Become', file:'assets/musicPlayerAssets/01-yet-to-become.mp3', duration:'03:11' },
  { title:'Destroy the Girl', file:'assets/musicPlayerAssets/02-destroy-the-girl.mp3', duration:'04:06' },
  { title:'Every Thousand Years', file:'assets/musicPlayerAssets/03-every-thousand-years.mp3', duration:'03:35' },
  { title:'My Origin Story', file:'assets/musicPlayerAssets/04-my-origin-story.mp3', duration:'03:26' },
  { title:'Of a Lifetime', file:'assets/musicPlayerAssets/05-of-a-lifetime.mp3', duration:'06:12' },
];

const player = document.querySelector('#playlist-audio');
const playerShell = document.querySelector('.music-player');
const playButton = document.querySelector('#play-track');
const previousButton = document.querySelector('#previous-track');
const nextButton = document.querySelector('#next-track');
const progress = document.querySelector('#track-progress');
const elapsed = document.querySelector('#elapsed-time');
const total = document.querySelector('#total-time');
const currentTitle = document.querySelector('#current-track-title');
const choices = [...document.querySelectorAll('.track-choice')];
let currentTrack = 0;

const singleAudio = document.querySelector('#single-audio');
const singleShell = document.querySelector('.single-player');
const singlePlay = document.querySelector('#single-play');
const singleProgress = document.querySelector('#single-track-progress');
const singleElapsed = document.querySelector('#single-elapsed');
const singleTotal = document.querySelector('#single-total');

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return '00:00';
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
};

const requestPlayback = (audio) => {
  const request = audio.play();
  if (request && typeof request.catch === 'function') request.catch(() => {});
};

const syncPlayButton = () => {
  playButton.textContent = player.paused ? '▶' : 'Ⅱ';
  playButton.setAttribute('aria-label', `${player.paused ? 'Play' : 'Pause'} ${playlist[currentTrack].title}`);
  playerShell.classList.toggle('is-playing', !player.paused);
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
  if (autoplay) requestPlayback(player);
  syncPlayButton();
};

playButton.addEventListener('click', () => (player.paused ? requestPlayback(player) : player.pause()));
previousButton.addEventListener('click', () => loadTrack(currentTrack - 1, true));
nextButton.addEventListener('click', () => loadTrack(currentTrack + 1, true));
choices.forEach((choice) => choice.addEventListener('click', () => loadTrack(Number(choice.dataset.track), true)));
player.addEventListener('play', () => {
  if (!singleAudio.paused) singleAudio.pause();
  syncPlayButton();
});
player.addEventListener('pause', syncPlayButton);
player.addEventListener('ended', () => loadTrack(currentTrack + 1, true));
player.addEventListener('timeupdate', () => {
  elapsed.textContent = formatTime(player.currentTime);
  progress.value = player.duration ? (player.currentTime / player.duration) * 100 : 0;
});
progress.addEventListener('input', () => {
  if (player.duration) player.currentTime = (Number(progress.value) / 100) * player.duration;
});

const syncSingleButton = () => {
  singlePlay.textContent = singleAudio.paused ? '▶' : 'Ⅱ';
  singlePlay.setAttribute('aria-label', `${singleAudio.paused ? 'Play' : 'Pause'} City of the Violet Crown`);
  singleShell.classList.toggle('is-playing', !singleAudio.paused);
};

singlePlay.addEventListener('click', () => (singleAudio.paused ? requestPlayback(singleAudio) : singleAudio.pause()));
singleAudio.addEventListener('play', () => {
  if (!player.paused) player.pause();
  syncSingleButton();
});
singleAudio.addEventListener('pause', syncSingleButton);
singleAudio.addEventListener('loadedmetadata', () => { singleTotal.textContent = formatTime(singleAudio.duration); });
singleAudio.addEventListener('timeupdate', () => {
  singleElapsed.textContent = formatTime(singleAudio.currentTime);
  singleProgress.value = singleAudio.duration ? (singleAudio.currentTime / singleAudio.duration) * 100 : 0;
});
singleProgress.addEventListener('input', () => {
  if (singleAudio.duration) singleAudio.currentTime = (Number(singleProgress.value) / 100) * singleAudio.duration;
});

/* Descent renderer: one scroll coordinator and one procedural canvas. */
const descent = document.querySelector('#descent');
const descentStage = document.querySelector('.descent-stage');
const canvas = document.querySelector('#descent-canvas');
const context = canvas.getContext('2d', { alpha:false, desynchronized:true });
const descentScenes = [...document.querySelectorAll('.descent-scene')];
const sceneNumber = document.querySelector('.scene-number');
const sceneName = document.querySelector('.scene-name');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const rootStyle = document.documentElement.style;

let canvasWidth = 0;
let canvasHeight = 0;
let pixelRatio = 1;
let descentTop = 0;
let descentRange = 1;
let sceneCenters = [];
let journeyProgress = 0;
let targetJourneyProgress = 0;
let scrollEnergy = 0;
let journeyInitialized = false;
let activeSceneIndex = -1;
let journeyVisible = true;
let animationFrame = 0;
let lastDrawTime = 0;
let lastAnimationTime = 0;

const SCROLL_EASE_MS = 520;
const SCROLL_ENERGY_DECAY_MS = 1100;

const seededRandom = (seed) => {
  const value = Math.sin(seed * 999.91) * 43758.5453;
  return value - Math.floor(value);
};

const stars = Array.from({ length:150 }, (_, index) => ({
  x:seededRandom(index + 1), y:seededRandom(index + 67), z:.18 + seededRandom(index + 143) * .82,
  size:.4 + seededRandom(index + 211) * 1.8, phase:seededRandom(index + 307) * Math.PI * 2,
}));

const galaxyPoints = Array.from({ length:190 }, (_, index) => {
  const arm = index % 3;
  const radius = Math.pow(seededRandom(index + 401), .62);
  return { radius, angle:arm * Math.PI * 2 / 3 + radius * 7.2 + (seededRandom(index + 521) - .5) * .65, size:.4 + seededRandom(index + 631) * 1.5 };
});

const bats = Array.from({ length:24 }, (_, index) => {
  const column = index % 4;
  const row = Math.floor(index / 4);
  return {
    start:.04 + row * .105 + column * .014,
    lane:column - 1.5,
    row,
    size:4.3 + seededRandom(index + 857) * 5.6,
    phase:seededRandom(index + 967) * Math.PI * 2,
    tone:index % 3,
  };
});

const measureDescent = () => {
  const scrollY = window.scrollY;
  descentTop = descent.getBoundingClientRect().top + scrollY;
  descentRange = Math.max(1, descent.offsetHeight - window.innerHeight);
  sceneCenters = descentScenes.map((scene) => scene.offsetTop + scene.offsetHeight / 2);
};

const resizeCanvas = () => {
  const mobile = window.innerWidth < 800;
  pixelRatio = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.6);
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = Math.round(canvasWidth * pixelRatio);
  canvas.height = Math.round(canvasHeight * pixelRatio);
  context.setTransform(pixelRatio,0,0,pixelRatio,0,0);
  measureDescent();
  updateDescentTarget(!journeyInitialized);
  journeyInitialized = true;
};

const drawAtmosphere = (progressValue) => {
  const gradient = context.createRadialGradient(canvasWidth * .5,canvasHeight * .48,0,canvasWidth * .5,canvasHeight * .48,Math.max(canvasWidth,canvasHeight) * .72);
  const hueShift = progressValue > .68 ? '32,13,52' : '22,9,38';
  gradient.addColorStop(0,`rgba(${hueShift},.92)`);
  gradient.addColorStop(.38,'rgba(8,3,15,.98)');
  gradient.addColorStop(1,'#010102');
  context.fillStyle = gradient;
  context.fillRect(0,0,canvasWidth,canvasHeight);
};

const drawGeometry = (progressValue, time) => {
  const fade = 1 - smoothstep(.19,.42,progressValue);
  if (fade <= .01) return;
  const centerX = canvasWidth * .5;
  const centerY = canvasHeight * .48;
  const collapse = 1 - smoothstep(.24,.42,progressValue) * .78;
  [5,7,4].forEach((sides, layer) => {
    const radius = Math.min(canvasWidth,canvasHeight) * (.37 - layer * .075) * collapse;
    const rotation = time * (.000035 + layer * .000012) * (layer % 2 ? -1 : 1) + progressValue * (2.4 + layer);
    context.beginPath();
    for (let point = 0; point <= sides; point += 1) {
      const angle = rotation + point * Math.PI * 2 / sides;
      const distortion = 1 + Math.sin(angle * 3 + time * .00018) * .08;
      const x = centerX + Math.cos(angle) * radius * distortion;
      const y = centerY + Math.sin(angle) * radius * .78 * distortion;
      if (point === 0) context.moveTo(x,y); else context.lineTo(x,y);
    }
    context.strokeStyle = `rgba(${layer === 1 ? '255,65,164' : '153,100,255'},${fade * (.22 - layer * .045)})`;
    context.lineWidth = .7 + layer * .35;
    context.stroke();
  });
};

const drawGalaxy = (progressValue, time) => {
  const opacity = bell(progressValue,.35,.54,.76);
  if (opacity <= .01) return;
  const centerX = canvasWidth * .52;
  const centerY = canvasHeight * .5;
  const scale = Math.min(canvasWidth,canvasHeight) * (.12 + progressValue * .27);
  const rotation = progressValue * 2.2 + time * .000018;
  context.save();
  context.globalCompositeOperation = 'lighter';
  galaxyPoints.forEach((point,index) => {
    const angle = point.angle + rotation;
    const x = centerX + Math.cos(angle) * point.radius * scale;
    const y = centerY + Math.sin(angle) * point.radius * scale * .36;
    const warm = index % 7 === 0;
    context.fillStyle = warm ? `rgba(255,109,187,${opacity * .62})` : `rgba(157,130,255,${opacity * .72})`;
    context.beginPath(); context.arc(x,y,point.size,0,Math.PI * 2); context.fill();
  });
  const core = context.createRadialGradient(centerX,centerY,0,centerX,centerY,scale * .24);
  core.addColorStop(0,`rgba(255,255,255,${opacity * .85})`); core.addColorStop(.15,`rgba(255,104,200,${opacity * .55})`); core.addColorStop(1,'rgba(94,47,180,0)');
  context.fillStyle = core; context.beginPath(); context.arc(centerX,centerY,scale * .26,0,Math.PI * 2); context.fill();
  context.restore();
};

const drawStars = (progressValue, time) => {
  const cosmic = smoothstep(.25,.48,progressValue);
  const density = window.innerWidth < 800 ? 75 : 150;
  const acceleration = bell(progressValue,.42,.59,.72) + scrollEnergy * 1.4;
  context.save();
  context.globalCompositeOperation = 'lighter';
  stars.slice(0,density).forEach((star,index) => {
    const depthTravel = (progressValue * (1.4 + star.z * 2.1) + star.phase / 8) % 1;
    const scale = .25 + depthTravel * 1.45;
    const x = canvasWidth * .5 + (star.x - .5) * canvasWidth * scale;
    const y = canvasHeight * .5 + (star.y - .5) * canvasHeight * scale;
    const alpha = (.14 + star.z * .55) * (.3 + cosmic * .7);
    context.strokeStyle = index % 11 === 0 ? `rgba(255,104,198,${alpha})` : `rgba(191,205,255,${alpha})`;
    context.lineWidth = star.size * (.6 + scale * .45);
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x + (x - canvasWidth * .5) * acceleration * .022,y + (y - canvasHeight * .5) * acceleration * .022);
    context.stroke();
    if (cosmic < .15) {
      const drift = Math.sin(time * .00015 + star.phase) * 2;
      context.fillStyle = `rgba(180,132,255,${alpha * .5})`; context.fillRect(x + drift,y,1,1);
    }
  });
  context.restore();
};

const drawSignal = (progressValue, time) => {
  const xWaver = Math.sin(time * .00035) * canvasWidth * .018;
  const signalX = canvasWidth * .5 + xWaver;
  const signalY = canvasHeight * (.12 + progressValue * .76);
  context.save();
  context.globalCompositeOperation = 'lighter';
  const glowRadius = 48 + scrollEnergy * 26;
  const glow = context.createRadialGradient(signalX,signalY,0,signalX,signalY,glowRadius);
  glow.addColorStop(0,'rgba(255,255,255,.95)'); glow.addColorStop(.15,'rgba(255,75,180,.68)'); glow.addColorStop(1,'rgba(122,71,255,0)');
  context.fillStyle = glow; context.beginPath(); context.arc(signalX,signalY,glowRadius,0,Math.PI * 2); context.fill();
  context.strokeStyle='rgba(212,178,255,.32)'; context.lineWidth=1; context.beginPath(); context.moveTo(canvasWidth * .5,-20); context.bezierCurveTo(canvasWidth * .58,canvasHeight * .3,canvasWidth * .4,canvasHeight * .56,signalX,signalY); context.stroke();
  context.restore();
};

const drawBat = (bat,x,y,motion,time,opacity) => {
  const wing = reducedMotion.matches ? .58 : .28 + Math.abs(Math.sin(time * .0085 + bat.phase + motion * 8.5)) * .72;
  const size = bat.size * (.72 + motion * .38);
  const rotation = Math.sin(bat.phase + motion * 3.2) * .18;
  const stroke = bat.tone === 0 ? '183,124,255' : bat.tone === 1 ? '255,103,183' : '103,207,255';
  context.save();
  context.translate(x,y);
  context.rotate(rotation);
  context.globalAlpha = opacity;
  context.shadowBlur = 7;
  context.shadowColor = `rgba(${stroke},.55)`;
  context.fillStyle = 'rgba(3,2,8,.96)';
  context.strokeStyle = `rgba(${stroke},.82)`;
  context.lineWidth = Math.max(.65,size * .085);
  context.beginPath();
  context.moveTo(0,size * .16);
  context.bezierCurveTo(-size * .2,-size * .08,-size * .55,-size * wing,-size,-size * .12);
  context.bezierCurveTo(-size * .78,size * .04,-size * .57,size * .34,-size * .28,size * .19);
  context.lineTo(0,size * .48);
  context.lineTo(size * .28,size * .19);
  context.bezierCurveTo(size * .57,size * .34,size * .78,size * .04,size,-size * .12);
  context.bezierCurveTo(size * .55,-size * wing,size * .2,-size * .08,0,size * .16);
  context.closePath();
  context.fill();
  context.stroke();
  context.beginPath();
  context.moveTo(-size * .1,size * .04); context.lineTo(-size * .03,-size * .22); context.lineTo(0,-size * .05);
  context.lineTo(size * .03,-size * .22); context.lineTo(size * .1,size * .04);
  context.stroke();
  context.restore();
};

const drawBats = (progressValue,time) => {
  const sceneOpacity = bell(progressValue,.69,.84,.985);
  if (sceneOpacity <= .01) return;
  const mobile = canvasWidth < 800;
  const count = reducedMotion.matches ? 6 : mobile ? 15 : bats.length;
  const swarmProgress = reducedMotion.matches ? .72 : smoothstep(.705,.92,progressValue);
  const originX = canvasWidth * (mobile ? .89 : .815);
  const originY = canvasHeight * .785;
  const fieldScale = Math.min(canvasWidth,canvasHeight);
  context.save();
  context.globalCompositeOperation = 'source-over';
  bats.slice(0,count).forEach((bat) => {
    const local = clamp((swarmProgress - bat.start) / Math.max(.01,1 - bat.start));
    if (local <= 0) return;
    const motion = 1 - Math.pow(1 - local,2.35);
    const corridorWidth = (7 + motion * 13) * (mobile ? .72 : 1);
    const laneOffset = bat.lane * corridorWidth;
    const sharedArc = Math.sin(motion * Math.PI) * fieldScale * .07;
    const x = originX - fieldScale * (.16 * motion + .48 * Math.pow(motion,1.18)) - sharedArc + laneOffset;
    const y = originY - fieldScale * (.24 * motion + .48 * Math.pow(motion,1.12)) + laneOffset * .28 + Math.sin((bat.row + 1) * 1.7) * 2;
    const opacity = sceneOpacity * smoothstep(0,.13,local) * (.56 + seededRandom(bat.phase + 37) * .4);
    drawBat(bat,x,y,motion,time,opacity);
  });
  context.restore();
};

const renderDescent = (time = 0) => {
  if (!context) return;
  context.setTransform(pixelRatio,0,0,pixelRatio,0,0);
  drawAtmosphere(journeyProgress);
  drawStars(journeyProgress,time);
  drawGeometry(journeyProgress,time);
  drawGalaxy(journeyProgress,time);
  drawSignal(journeyProgress,time);
  drawBats(journeyProgress,time);
};

const setActiveScene = (localCenter) => {
  let nearest = 0;
  let nearestDistance = Infinity;
  sceneCenters.forEach((center,index) => {
    const distance = Math.abs(center - localCenter);
    if (distance < nearestDistance) { nearest = index; nearestDistance = distance; }
  });
  if (nearest === activeSceneIndex) return;
  activeSceneIndex = nearest;
  descentScenes.forEach((scene,index) => scene.classList.toggle('is-current', index === nearest));
  sceneNumber.textContent = String(nearest + 1).padStart(2,'0');
  sceneName.textContent = descentScenes[nearest].dataset.sceneName;
};

const applyDescentState = () => {
  rootStyle.setProperty('--journey',journeyProgress.toFixed(4));
  rootStyle.setProperty('--scroll-energy',scrollEnergy.toFixed(3));
  rootStyle.setProperty('--fi-opacity',bell(journeyProgress,.07,.19,.34).toFixed(3));
  rootStyle.setProperty('--earth-opacity',bell(journeyProgress,.51,.66,.79).toFixed(3));
  rootStyle.setProperty('--austin-opacity',bell(journeyProgress,.67,.85,.95).toFixed(3));
  rootStyle.setProperty('--receiver-opacity',smoothstep(.90,.985,journeyProgress).toFixed(3));
  setActiveScene(journeyProgress * descentRange + window.innerHeight * .5);
};

const updateDescentTarget = (instant = false) => {
  const localScroll = window.scrollY - descentTop;
  const nextTarget = clamp(localScroll / descentRange);
  if (!instant && !reducedMotion.matches) {
    scrollEnergy = Math.min(1,scrollEnergy + Math.abs(nextTarget - targetJourneyProgress) * 13);
  }
  targetJourneyProgress = nextTarget;
  rootStyle.setProperty('--journey-target',targetJourneyProgress.toFixed(4));
  if (instant || reducedMotion.matches) {
    journeyProgress = targetJourneyProgress;
    scrollEnergy = 0;
    applyDescentState();
  }
  document.querySelector('.site-header').classList.toggle('scrolled',window.scrollY > 50);
};

const animationLoop = (time) => {
  animationFrame = 0;
  if (!journeyVisible || document.hidden) return;
  const deltaTime = lastAnimationTime ? Math.min(64,time - lastAnimationTime) : 16.7;
  lastAnimationTime = time;
  if (reducedMotion.matches) {
    journeyProgress = targetJourneyProgress;
    scrollEnergy = 0;
  } else {
    const easedStep = 1 - Math.exp(-deltaTime / SCROLL_EASE_MS);
    journeyProgress += (targetJourneyProgress - journeyProgress) * easedStep;
    if (Math.abs(targetJourneyProgress - journeyProgress) < .00004) journeyProgress = targetJourneyProgress;
    scrollEnergy *= Math.exp(-deltaTime / SCROLL_ENERGY_DECAY_MS);
    if (scrollEnergy < .002) scrollEnergy = 0;
  }
  applyDescentState();
  if (reducedMotion.matches || time - lastDrawTime > 32) {
    renderDescent(time);
    lastDrawTime = time;
  }
  if (!reducedMotion.matches) animationFrame = requestAnimationFrame(animationLoop);
};

const requestJourneyFrame = () => {
  updateDescentTarget();
  if (!animationFrame) animationFrame = requestAnimationFrame(animationLoop);
};

const journeyObserver = new IntersectionObserver(([entry]) => {
  journeyVisible = entry.isIntersecting;
  if (journeyVisible) requestJourneyFrame();
  else if (animationFrame) { cancelAnimationFrame(animationFrame); animationFrame = 0; lastAnimationTime = 0; }
}, { rootMargin:'15% 0px' });
journeyObserver.observe(descent);

window.addEventListener('scroll',requestJourneyFrame,{ passive:true });
window.addEventListener('resize',resizeCanvas,{ passive:true });
document.addEventListener('visibilitychange',() => { if (!document.hidden && journeyVisible) requestJourneyFrame(); });
reducedMotion.addEventListener('change',requestJourneyFrame);

/* Content reveals and scene-local animation pausing. */
const revealItems = [...document.querySelectorAll('.section-heading,.music-player,.split > *,.video-shell,.story > *,.highlights > *,.gallery img,.audience-copy,.creator-copy,.contact > *,footer > *')];
revealItems.forEach((item,index) => {
  item.classList.add('reveal-item');
  if (item.matches('.split > :first-child,.story > :first-child')) item.classList.add('reveal-left');
  if (item.matches('.split > :last-child,.story > :last-child')) item.classList.add('reveal-right');
  item.style.setProperty('--reveal-delay',`${(index % 3) * 85}ms`);
});
document.documentElement.classList.add('reveal-ready');

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries,observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold:.12, rootMargin:'0px 0px -5% 0px' });
  requestAnimationFrame(() => revealItems.forEach((item) => revealObserver.observe(item)));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const ambientScenes = [...document.querySelectorAll('.music-player,.single-player,.audience-scene,.creator-finale,footer')];
const ambientObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => entry.target.classList.toggle('scene-dormant',!entry.isIntersecting));
}, { rootMargin:'10% 0px', threshold:.05 });
ambientScenes.forEach((scene) => ambientObserver.observe(scene));

resizeCanvas();
requestJourneyFrame();
document.querySelector('#year').textContent = new Date().getFullYear();
