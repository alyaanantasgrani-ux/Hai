/* ========================= */
/* ELEMENT */
/* ========================= */
const pages = document.querySelectorAll('.page');
const music = document.getElementById('bgm');
const heartsContainer = document.querySelector('.hearts');

/* ========================= */
/* STATE */
/* ========================= */
let unlockedMenu = 1;
let galleryTimeout = null;

/* ========================= */
/* PINDAH HALAMAN */
/* ========================= */
function go(index) {
  // reset halaman
  pages.forEach(p => p.classList.remove('active'));

  if (!pages[index]) return;
  pages[index].classList.add('active');

  // kalau masuk halaman galeri
  if (pages[index].classList.contains('gallery-page')) {
    animateGallery();

    // pastikan tidak dobel timeout
    clearTimeout(galleryTimeout);
    galleryTimeout = setTimeout(() => {
      go(6); // ke closing
    }, 6500);
  }

  // update menu kalau balik ke menu
  if (index === 1) updateMenuButtons();
}

/* ========================= */
/* START (AUTOPLAY MUSIC) */
/* ========================= */
function start() {
  if (music && music.paused) {
    music.volume = 0.4;
    music.play().catch(() => {});
  }
  go(1);
}

/* ========================= */
/* MENU LOCK SYSTEM */
/* ========================= */
function updateMenuButtons() {
  document.querySelectorAll('[data-step]').forEach(btn => {
    const step = Number(btn.dataset.step);
    btn.disabled = step > unlockedMenu;
    btn.style.opacity = btn.disabled ? '0.4' : '1';
  });
}

/* ========================= */
/* SELESAI BACA HALAMAN */
/* ========================= */
function finishPage(step) {
  if (step >= unlockedMenu) {
    unlockedMenu = step + 1;
  }
  go(1);
}

/* ========================= */
/* JAGA MUSIK (MOBILE SAFE) */
/* ========================= */
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && music && music.paused) {
    music.play().catch(() => {});
  }
});

/* ========================= */
/* FLOATING HEARTS (GLOBAL & TERUS ADA) */
/* ========================= */
const TOTAL_HEARTS = 18;

for (let i = 0; i < TOTAL_HEARTS; i++) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerText = '❤';

  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (14 + Math.random() * 24) + 'px';
  heart.style.animationDuration = (16 + Math.random() * 12) + 's';

  // delay negatif → langsung hidup & looping
  heart.style.animationDelay = (-Math.random() * 30) + 's';

  heartsContainer.appendChild(heart);
}

/* ========================= */
/* GALLERY PHOTO SEQUENCE */
/* ========================= */
function animateGallery() {
  const frames = document.querySelectorAll('.gallery .frame');

  // reset animasi
  frames.forEach(frame => frame.classList.remove('show'));

  // munculin satu-satu
  frames.forEach((frame, index) => {
    setTimeout(() => {
      frame.classList.add('show');
    }, index * 500);
  });
}

/* ========================= */
/* INIT */
/* ========================= */
updateMenuButtons();
