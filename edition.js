const params = new URLSearchParams(location.search);
const edId = params.get('ed') || '1.0';
const data = getEditionGallery(edId);
let activeCat = 'networking';

const root = document.documentElement;
document.getElementById('tgl').addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
});

if (!data) {
  document.getElementById('edMain').innerHTML = '<p style="padding:40px 16px;text-align:center">Edition not found. <a href="index.html">Go home</a></p>';
} else {
  document.title = `ChillsAfterEid ${data.id} · ${data.year}`;
  document.getElementById('edTopTitle').textContent = `CAE ${data.id}`;
  document.getElementById('edAvatar').textContent = data.id;
  document.getElementById('edAvatar').style.background = data.accent;
  document.getElementById('edPhotoCount').textContent = data.comingSoon ? '—' : data.photos;
  document.getElementById('edYear').textContent = data.year;
  document.getElementById('edVer').textContent = data.id;
  document.getElementById('edName').textContent = `${data.theme} · ${data.year}`;
  document.getElementById('edBio').textContent = data.bio;

  const tabs = document.getElementById('edTabs');
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ed-tab' + (cat.id === activeCat ? ' active' : '');
    btn.dataset.cat = cat.id;
    btn.setAttribute('aria-label', cat.label);
    btn.innerHTML = `<svg viewBox="0 0 24 24">${CATEGORY_ICONS[cat.id]}</svg>`;
    btn.addEventListener('click', () => selectCat(cat.id));
    tabs.appendChild(btn);
  });

  renderGrid();

  const lb = document.getElementById('edLightbox');
  document.getElementById('edLbClose').addEventListener('click', () => { lb.hidden = true; document.body.style.overflow = ''; });
  lb.addEventListener('click', e => { if (e.target === lb) { lb.hidden = true; document.body.style.overflow = ''; } });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) { lb.hidden = true; document.body.style.overflow = ''; } });
}

function selectCat(id) {
  activeCat = id;
  document.querySelectorAll('.ed-tab').forEach(t => t.classList.toggle('active', t.dataset.cat === id));
  renderGrid();
}

function renderGrid() {
  const grid = document.getElementById('edGrid');
  grid.innerHTML = '';
  if (!data) return;
  data.gallery[activeCat].forEach((photo, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'ed-cell';
    btn.innerHTML = `<div class="ph" style="background:${photo.bg}"></div>`;
    btn.addEventListener('click', () => openPhoto(photo));
    grid.appendChild(btn);
  });
}

function openPhoto(photo) {
  const lb = document.getElementById('edLightbox');
  document.getElementById('edLbImg').innerHTML = `<div class="ph" style="background:${photo.bg};width:100%;height:100%"></div>`;
  document.getElementById('edLbCap').textContent = photo.caption;
  lb.hidden = false;
  document.body.style.overflow = 'hidden';
}
