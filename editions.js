const EDITIONS = [
  { ed: '1.0', year: 2023, theme: 'The First Gathering', color: '#e8941e', posts: 24 },
  { ed: '2.0', year: 2024, theme: 'Doubled the Room', color: '#84c341', posts: 38 },
  { ed: '3.0', year: 2025, theme: 'The Festival Year', color: '#36b4cf', posts: 52 },
  { ed: '4.0', year: 2026, theme: 'The High-Fly Muslim Experience', color: '#69a92c', posts: 0, now: true }
];
const ICONS = {
  networking: '<circle cx="9" cy="7" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><path d="M16 3.1a4 4 0 0 1 0 7.8M22 21v-2a4 4 0 0 0-3-3.9"/>',
  games: '<line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.3 5H6.7a4 4 0 0 0-4 3.6c-.6 5.5-.8 7 .4 8.3.9.9 2.6.9 5.9.9 1.1 0 1.8-1.2 2.5-2h1.9c.7.8 1.4 2 2.5 2 3.3 0 5 0 5.9-.9 1.3-1.3 1-2.8.4-8.3A4 4 0 0 0 17.3 5z"/>',
  content: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  shopping: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  panels: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>',
  giveaways: '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>'
};
const ACTS = [
  { key: 'networking', name: 'Networking', color: '#36b4cf', desc: 'Meet the community' },
  { key: 'games', name: 'Games & Fun', color: '#84c341', desc: 'Play & compete' },
  { key: 'content', name: 'Content', color: '#e8941e', desc: 'Shoot for the feed' },
  { key: 'shopping', name: 'Shopping', color: '#e8941e', desc: 'The vendor market' },
  { key: 'panels', name: 'Panels', color: '#36b4cf', desc: 'Real conversations' },
  { key: 'giveaways', name: 'Giveaways', color: '#84c341', desc: 'Prizes & surprises' }
];
const actByKey = k => ACTS.find(a => a.key === k);
const edIndex = id => EDITIONS.findIndex(e => e.ed === id);

function shade(hex, p) {
  let n = parseInt(hex.slice(1), 16), r = (n >> 16) + p, g = (n >> 8 & 255) + p, b = (n & 255) + p;
  return '#' + (0x1000000 + (Math.max(0, Math.min(255, r)) << 16) + (Math.max(0, Math.min(255, g)) << 8) + Math.max(0, Math.min(255, b))).toString(16).slice(1);
}
const grad = (c, i) => 'linear-gradient(' + (120 + i * 23) + 'deg,' + c + ',' + shade(c, -30) + ')';

let stack = [{ type: 'home' }];
let fromMain = false;

function show(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('on'));
  document.getElementById(id).classList.add('on');
  document.querySelector('.app').scrollIntoView({ block: 'start' });
}
function setTop(html, showBack) {
  document.getElementById('topTitle').innerHTML = html;
  document.getElementById('backBtn').style.visibility = showBack ? 'visible' : 'hidden';
}
function nav(state) {
  stack.push(state);
  render(state);
}
function goBack() {
  if (fromMain && stack.length <= 2) {
    location.href = 'index.html#editions';
    return;
  }
  if (stack.length > 1) {
    stack.pop();
    render(stack[stack.length - 1]);
    return;
  }
  location.href = 'index.html#editions';
}
function render(s) {
  if (s.type === 'home') { setTop('ChillsAfterEid', fromMain); show('v-home'); }
  if (s.type === 'profile') { renderProfile(s.ed); show('v-profile'); }
  if (s.type === 'activity') { renderActivity(s.act); show('v-activity'); }
  if (s.type === 'photos') { renderPhotos(s.act, s.ed); show('v-photos'); }
}

function photoCell(bg, cap) {
  const capEsc = cap.replace(/'/g, "\\'");
  return `<button type="button" class="cell" onclick="openLb('${bg}','${capEsc}')"><div class="gimg" style="background:${bg}"></div></button>`;
}

function renderHome() {
  document.getElementById('homeActs').innerHTML = ACTS.map(a => `
    <div class="acard" onclick="nav({type:'activity',act:'${a.key}'})">
      <div class="aimg" style="background:${grad(a.color, 2)}">
        <span class="arrow"><svg class="ic" style="width:15px;height:15px" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
        <svg class="ic" viewBox="0 0 24 24">${ICONS[a.key]}</svg>
      </div>
      <div class="abody"><h3>${a.name}</h3><p>${a.desc}</p></div>
    </div>`).join('');
  document.getElementById('homeFolders').innerHTML = EDITIONS.map((e, i) => `
    <div class="folder" style="--acc:${e.color}" onclick="nav({type:'profile',ed:${i}})">
      <div class="tab"></div>
      <div class="body">
        <div class="ph"><i style="background:${grad(e.color, 1)}"></i><i style="background:${grad(e.color, 3)}"></i></div>
        <div class="v">${e.ed}</div>
        <div class="th">${e.year} · ${e.theme}</div>
      </div>
    </div>`).join('');
}

function renderProfile(i) {
  const e = EDITIONS[i];
  setTop(`@chillsaftereid <small>· ${e.ed}</small>`, true);
  const highlights = ACTS.map(a => `
    <div class="hl" style="--acc:${a.color}" onclick="nav({type:'activity',act:'${a.key}'})">
      <div class="ring"><div class="core" style="background:${grad(a.color, 2)}"><svg class="ic" viewBox="0 0 24 24">${ICONS[a.key]}</svg></div></div>
      <small>${a.name}</small>
    </div>`).join('');
  let body;
  if (e.now) {
    body = `<div class="empty"><div class="big"><svg class="ic" style="width:26px;height:26px" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div><b>Coming soon</b>Photos drop right after the event</div>`;
  } else {
    let cells = '';
    for (let n = 0; n < e.posts; n++) {
      const a = ACTS[n % ACTS.length];
      cells += photoCell(grad(a.color, n), `${e.ed} · ${a.name} · photo ${n + 1}`);
    }
    body = `<div class="gridwrap"><div class="grid">${cells}</div></div>`;
  }
  document.getElementById('v-profile').innerHTML = `
    <div class="pf-head">
      <div class="avatar"><div class="inner" style="background:${grad(e.color, 2)}">${e.ed}</div></div>
      <div class="stats">
        <div><b>${e.now ? '—' : e.posts}</b><span>posts</span></div>
        <div><b>${e.year}</b><span>year</span></div>
        <div><b>${e.ed}</b><span>edition</span></div>
      </div>
    </div>
    <div class="pf-meta">
      <div class="nm">${e.theme}</div>
      <div class="hd">ChillsAfterEid · Lagos</div>
      <div class="bio">The after-Eid experience. Tap a highlight to browse by category → <b>across every edition</b>.</div>
    </div>
    <div class="hl-row">${highlights}</div>
    <div class="tabbar"><span class="tab-ic"><svg class="ic" style="width:22px;height:22px" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span></div>
    ${body}
    <div style="height:12px"></div>`;
}

function renderActivity(key) {
  const a = actByKey(key);
  setTop(a.name, true);
  const folders = EDITIONS.map((e, i) => `
    <div class="folder" style="--acc:${a.color}" onclick="nav({type:'photos',act:'${key}',ed:${i}})">
      <div class="tab"></div>
      <div class="body">
        <div class="ph"><i style="background:${grad(a.color, i + 1)}"></i><i style="background:${grad(a.color, i + 3)}"></i></div>
        <div class="v">${e.ed}</div>
        <div class="th">${e.now ? 'Coming soon' : a.name + ' · ' + e.year}</div>
      </div>
    </div>`).join('');
  document.getElementById('v-activity').innerHTML = `
    <div class="act-intro">
      <div class="ai" style="background:${grad(a.color, 2)}"><svg class="ic" viewBox="0 0 24 24">${ICONS[key]}</svg></div>
      <h2>${a.name}</h2>
      <p>The whole ${a.name} series — pick an edition</p>
    </div>
    <div class="act-folders">${folders}</div>`;
}

function renderPhotos(key, i) {
  const a = actByKey(key), e = EDITIONS[i];
  setTop(`${a.name} <small>· ${e.ed} · ${e.year}</small>`, true);
  let body;
  if (e.now) {
    body = `<div class="empty"><div class="big"><svg class="ic" style="width:26px;height:26px" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div><b>Coming soon</b>${a.name} photos from 4.0 land after the event</div>`;
  } else {
    const count = 8 + (i * 2);
    let cells = '';
    for (let n = 0; n < count; n++) {
      cells += photoCell(grad(a.color, n), `${a.name} · ${e.ed} · ${e.year} · photo ${n + 1}`);
    }
    body = `<div class="gridwrap"><div class="grid">${cells}</div></div>`;
  }
  document.getElementById('v-photos').innerHTML = `
    <div class="act-intro">
      <div class="ai" style="background:${grad(a.color, 2)}"><svg class="ic" viewBox="0 0 24 24">${ICONS[key]}</svg></div>
      <h2>${a.name} · ${e.ed}</h2>
      <p>${e.year} · ${e.theme}</p>
    </div>
    <div style="height:8px"></div>
    ${body}
    <div style="height:16px"></div>`;
}

function openLb(bg, cap) {
  document.getElementById('lbImg').innerHTML = `<div class="gimg" style="background:${bg};width:100%;height:100%"></div>`;
  document.getElementById('lbCap').textContent = cap;
  document.getElementById('lightbox').classList.add('on');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  document.getElementById('lightbox').classList.remove('on');
  document.body.style.overflow = '';
}

renderHome();

const params = new URLSearchParams(location.search);
const edParam = params.get('ed');
if (edParam) {
  const idx = edIndex(edParam);
  if (idx >= 0) {
    fromMain = true;
    stack = [{ type: 'home' }, { type: 'profile', ed: idx }];
    render({ type: 'profile', ed: idx });
  }
}

addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLb();
});
