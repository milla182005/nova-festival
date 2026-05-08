// ── CURSEUR CUSTOM ──
const cursor = document.createElement('div');
const cursorRing = document.createElement('div');

cursor.id = 'cursor';
cursorRing.id = 'cursor-ring';

document.body.appendChild(cursor);
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Effet hover sur les liens et boutons
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover');
    cursorRing.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover');
    cursorRing.classList.remove('cursor-hover');
  });
});

// ── GSAP ANIMATIONS ──
gsap.registerPlugin(ScrollTrigger);

// 1. RÉVÉAL DU TITRE AU CHARGEMENT
gsap.from('.hero-eyebrow', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.2,
  ease: 'power3.out'
});

gsap.from('.hero-title', {
  opacity: 0,
  y: 60,
  duration: 1,
  delay: 0.4,
  ease: 'power3.out'
});

gsap.from('.hero-date', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.7,
  ease: 'power3.out'
});

gsap.from('.btn', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  delay: 0.9,
  ease: 'power3.out'
});

// 2. PARALLAX SUR LE HERO
gsap.to('.hero-title', {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5
  }
});

gsap.to('.hero-eyebrow', {
  yPercent: -10,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1
  }
});

// 3. CARTES ARTISTES AU SCROLL
gsap.from('.artist-card', {
  opacity: 0,
  y: 80,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.lineup-grid',
    start: 'top 80%',
  }
});

// 4. COUNTDOWN AU SCROLL
gsap.from('.countdown-section', {
  opacity: 0,
  y: 50,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.countdown-section',
    start: 'top 80%',
  }
});

// ── COUNTDOWN ──
function updateCountdown() {
  const festivalDate = new Date('2026-07-18T00:00:00');
  const now = new Date();
  const diff = festivalDate - now;

  if (diff <= 0) {
    document.querySelector('.countdown-label').textContent = "Le festival est en cours !";
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent    = String(days).padStart(2, '0');
  document.getElementById('hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);