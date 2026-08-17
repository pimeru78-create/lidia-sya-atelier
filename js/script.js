document.getElementById('year').textContent = new Date().getFullYear();

// Sticky header shadow on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 10);
});

// Mobile nav toggle
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('is-open');
});
nav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('is-open'));
});

// Lightbox gallery
const galleryImgs = Array.from(document.querySelectorAll('#galleryGrid img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = galleryImgs[index].src;
  lightboxImg.alt = galleryImgs[index].alt;
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}
function showDelta(delta) {
  currentIndex = (currentIndex + delta + galleryImgs.length) % galleryImgs.length;
  lightboxImg.src = galleryImgs[currentIndex].src;
  lightboxImg.alt = galleryImgs[currentIndex].alt;
}

galleryImgs.forEach((img, i) => img.addEventListener('click', () => openLightbox(i)));

// Gallery horizontal scroll arrows
const galleryGrid = document.getElementById('galleryGrid');
document.getElementById('galleryPrev').addEventListener('click', () => {
  galleryGrid.scrollBy({ left: -galleryGrid.clientWidth * 0.8, behavior: 'smooth' });
});
document.getElementById('galleryNext').addEventListener('click', () => {
  galleryGrid.scrollBy({ left: galleryGrid.clientWidth * 0.8, behavior: 'smooth' });
});
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => showDelta(-1));
document.getElementById('lightboxNext').addEventListener('click', () => showDelta(1));
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showDelta(-1);
  if (e.key === 'ArrowRight') showDelta(1);
});

// "Записаться" dropdown menus (header + hero)
document.querySelectorAll('.booking').forEach(booking => {
  const toggle = booking.querySelector('.booking__toggle');
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = !booking.classList.contains('is-open');
    document.querySelectorAll('.booking.is-open').forEach(b => b.classList.remove('is-open'));
    if (willOpen) booking.classList.add('is-open');
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.booking.is-open').forEach(b => b.classList.remove('is-open'));
});

// Floating contact button group
const fabGroup = document.getElementById('fabGroup');
const fabToggle = document.getElementById('fabToggle');
fabToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  fabGroup.classList.toggle('is-open');
});
document.addEventListener('click', (e) => {
  if (!fabGroup.contains(e.target)) fabGroup.classList.remove('is-open');
});

// Reviews carousel
const reviewTrack = document.getElementById('reviewTrack');
const reviewCards = Array.from(reviewTrack.children);
const reviewDots = document.getElementById('reviewDots');
reviewCards.forEach((_, i) => {
  const dot = document.createElement('span');
  if (i === 0) dot.classList.add('is-active');
  dot.addEventListener('click', () => {
    reviewTrack.scrollTo({ left: reviewCards[i].offsetLeft, behavior: 'smooth' });
  });
  reviewDots.appendChild(dot);
});
const dotEls = Array.from(reviewDots.children);

function currentReviewIndex() {
  const scrollLeft = reviewTrack.scrollLeft;
  let closest = 0, min = Infinity;
  reviewCards.forEach((card, i) => {
    const d = Math.abs(card.offsetLeft - scrollLeft);
    if (d < min) { min = d; closest = i; }
  });
  return closest;
}
function updateDots() {
  const idx = currentReviewIndex();
  dotEls.forEach((d, i) => d.classList.toggle('is-active', i === idx));
}
document.getElementById('reviewPrev').addEventListener('click', () => {
  const idx = Math.max(0, currentReviewIndex() - 1);
  reviewTrack.scrollTo({ left: reviewCards[idx].offsetLeft, behavior: 'smooth' });
});
document.getElementById('reviewNext').addEventListener('click', () => {
  const idx = Math.min(reviewCards.length - 1, currentReviewIndex() + 1);
  reviewTrack.scrollTo({ left: reviewCards[idx].offsetLeft, behavior: 'smooth' });
});
let reviewScrollTimer;
reviewTrack.addEventListener('scroll', () => {
  clearTimeout(reviewScrollTimer);
  reviewScrollTimer = setTimeout(updateDots, 80);
});
