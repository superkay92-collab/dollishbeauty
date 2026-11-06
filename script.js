const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    menuToggle.textContent = isOpen ? '×' : '☰';
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }));
}

document.getElementById('year').textContent = new Date().getFullYear();
const dateInput = document.getElementById('date');
if (dateInput) {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = localDate;
}

document.querySelectorAll('.service-link').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.getElementById('service');
    if (select) {
      const requested = link.dataset.service;
      if (requested === 'Makeup Artistry') select.value = 'Makeup Artistry';
      if (requested === 'Hair Styling') select.value = 'Hair Styling';
      if (requested === 'Ponytail Bundles & Frontal Laces') select.value = 'Ponytail Bundles & Frontal Laces';
      if (requested === 'Bridal Styling') select.value = 'Bridal Styling';
    }
  });
});

document.querySelectorAll('.portfolio-filters button').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('.portfolio-filters button').forEach(item => item.classList.toggle('active', item === button));
    document.querySelectorAll('.portfolio-grid figure').forEach(figure => {
      figure.hidden = filter !== 'all' && figure.dataset.category !== filter;
    });
  });
});

document.querySelectorAll('.studio-book-button').forEach(button => {
  button.addEventListener('click', () => {
    const details = document.getElementById('details');
    if (details) {
      details.value = `Studio Glam enquiry: ${button.dataset.studioService}`;
      details.focus();
      document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.querySelectorAll('.product-enquire').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.dataset.product;
    const message = `Hello Dollish Beauty! I'd like to enquire about ${product}. Please share the available options, prices and delivery details. Thank you.`;
    window.open(`https://wa.me/233535889669?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
});

const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!bookingForm.reportValidity()) return;
    const form = new FormData(bookingForm);
    const details = String(form.get('details') || '').trim();
    const message = [
      'Hello Dollish Beauty! I would like to enquire about an appointment.',
      '',
      `Name: ${form.get('name')}`,
      `Phone: ${form.get('phone')}`,
      `Service: ${form.get('service')}`,
      `Appointment type: ${form.get('appointmentType')}`,
      `Preferred date: ${form.get('date')}`,
      `Preferred time: ${form.get('time')}`,
      details ? `Additional details: ${details}` : '',
      '',
      'Please confirm availability and the GH₵100 reservation fee required to secure the booking. Thank you!'
    ].filter(Boolean).join('\n');
    document.getElementById('form-feedback').textContent = 'Opening WhatsApp with your enquiry. Please press Send in WhatsApp to submit it.';
    window.open(`https://wa.me/233535889669?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  });
}

const imageLightbox = document.getElementById('image-lightbox');
const lightboxImage = imageLightbox ? imageLightbox.querySelector('.lightbox-image') : null;
const lightboxClose = imageLightbox ? imageLightbox.querySelector('.lightbox-close') : null;

function closeLightbox() {
  if (!imageLightbox) return;
  imageLightbox.hidden = true;
  document.body.classList.remove('lightbox-open');
}

function openLightbox(image) {
  if (!imageLightbox || !lightboxImage || !image.src) return;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt || 'Dollish Beauty image';
  imageLightbox.hidden = false;
  document.body.classList.add('lightbox-open');
  lightboxClose.focus();
}

function toggleVideoSound(button) {
  const video = button.closest('.studio-video-card').querySelector('video');
  video.muted = !video.muted;
  video.volume = 1;
  const muted = video.muted;
  button.setAttribute('aria-pressed', String(muted));
  button.setAttribute('aria-label', muted ? 'Unmute video' : 'Mute video');
  button.textContent = muted ? '🔇 Sound off — tap to unmute' : '🔊 Sound on — tap to mute';
}

document.querySelectorAll('.video-play-button').forEach(button => {
  const video = button.closest('.studio-media-shell').querySelector('video');
  button.addEventListener('click', async () => {
    document.querySelectorAll('.studio-media-shell video').forEach(otherVideo => {
      if (otherVideo !== video) otherVideo.pause();
    });
    if (video.paused) {
      await video.play();
    } else {
      video.pause();
    }
  });
  video.addEventListener('play', () => {
    button.textContent = 'Ⅱ';
    button.setAttribute('aria-label', 'Pause video');
    button.classList.add('is-playing');
  });
  video.addEventListener('pause', () => {
    button.textContent = '▶';
    button.setAttribute('aria-label', 'Play video');
    button.classList.remove('is-playing');
  });
  video.addEventListener('ended', () => {
    button.textContent = '▶';
    button.setAttribute('aria-label', 'Replay video');
  });
});

document.querySelectorAll('.video-sound-button').forEach(button => {
  const video = button.closest('.studio-video-card').querySelector('video');
  video.muted = false;
  video.volume = 1;

  button.addEventListener('click', () => {
    video.muted = !video.muted;
    const muted = video.muted;
    button.setAttribute('aria-pressed', String(muted));
    button.setAttribute('aria-label', muted ? 'Unmute video' : 'Mute video');
    button.textContent = muted ? '🔇 Sound off — tap to unmute' : '🔊 Sound on — tap to mute';
  });
});

if (imageLightbox) {
  document.querySelectorAll('main img').forEach(image => {
    image.classList.add('clickable-image');
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', 'Open image');
  });

  document.addEventListener('click', event => {
    if (event.target.classList && event.target.classList.contains('clickable-image')) {
      openLightbox(event.target);
      return;
    }
    if (event.target === imageLightbox || event.target === lightboxClose) closeLightbox();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeLightbox();
      return;
    }
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches && event.target.matches('main img')) {
      event.preventDefault();
      openLightbox(event.target);
    }
  });
}
