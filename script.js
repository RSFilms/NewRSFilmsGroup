// app.js - handles dynamic services list and form submissions (Vanilla JS)

// Services data
const services = [
  { title: 'YouTube Channel Management', desc: 'Content strategy, upload, SEO and analytics' },
  { title: 'Instagram Management', desc: 'Content creation, reels, scheduling and growth' },
  { title: 'Facebook Management', desc: 'Page growth, ad setup & management' },
  { title: 'Music Distribution', desc: 'Worldwide distribution (Spotify, Apple, JioSaavn, YouTube Music)' },
  { title: 'Poster Design (PSD)', desc: 'Custom posters, printable and editable PSDs' },
  { title: 'Video Shoot & Edit', desc: 'Full production, editing, color grading' },
];

// render services
const servicesGrid = document.getElementById('servicesGrid');
if (servicesGrid) {
  services.forEach(s => {
    const card = document.createElement('div');
    card.className = 'service-card';
    card.innerHTML = `<h4>${s.title}</h4><p class="muted">${s.desc}</p><div style="margin-top:10px;"><a class="btn small" href="#contact">Get Started</a></div>`;
    servicesGrid.appendChild(card);
  });
}

// set footer year
document.getElementById('year').innerText = new Date().getFullYear();

// Contact form submit (AJAX)
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    contactStatus.innerText = 'Sending...';

    const formData = new FormData(contactForm);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };

    try {
      const res = await fetch('http://localhost:8000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        contactStatus.innerText = 'Message sent. Thank you!';
        contactForm.reset();
      } else {
        contactStatus.innerText = 'Error: ' + (data.message || res.statusText);
      }
    } catch (err) {
      contactStatus.innerText = 'Network error. Is backend running?';
      console.error(err);
    }
  });
}

// Music submit form (multipart/form-data)
const musicForm = document.getElementById('musicForm');
const musicStatus = document.getElementById('musicStatus');
if (musicForm) {
  musicForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    musicStatus.innerText = 'Uploading...';
    const mf = new FormData(musicForm);

    try {
      const res = await fetch('http://localhost:8000/music/submit', {
        method: 'POST',
        body: mf
      });
      const data = await res.json();
      if (res.ok) {
        musicStatus.innerText = 'Uploaded successfully: ' + (data.file || 'ok');
        musicForm.reset();
      } else {
        musicStatus.innerText = 'Error: ' + (data.detail || JSON.stringify(data));
      }
    } catch (err) {
      musicStatus.innerText = 'Network error. Is backend running?';
      console.error(err);
    }
  });
}
