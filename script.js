const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 30));
const root = document.documentElement;
document.getElementById('tgl').addEventListener('click', () => root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark');
const ham = document.getElementById('ham');
ham.addEventListener('click', () => document.body.classList.toggle('m-open'));
document.querySelectorAll('.mc').forEach(a => a.addEventListener('click', () => document.body.classList.remove('m-open')));

const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }), { threshold: .14 });
document.querySelectorAll('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 3 * .05) + 's'; io.observe(el); });

// Fan card shuffle — click any card to bring it to center
const FAN_SLOTS_DESKTOP = [
  { x: -220, y: 36, r: -22, z: 1 },
  { x: -114, y: 9, r: -11, z: 2 },
  { x: 0, y: 0, r: 0, z: 3 },
  { x: 114, y: 9, r: 11, z: 2 },
  { x: 220, y: 36, r: 22, z: 1 }
];
const FAN_SLOTS_MOBILE = [
  { x: -132, y: 22, r: -22, z: 1 },
  { x: -68, y: 6, r: -11, z: 2 },
  { x: 0, y: 0, r: 0, z: 3 },
  { x: 68, y: 6, r: 11, z: 2 },
  { x: 132, y: 22, r: 22, z: 1 }
];
const fanCards = [...document.querySelectorAll('.fcard[data-card]')];
let fanOrder = fanCards.map(c => +c.dataset.card);
const fan = document.getElementById('fan');
const inners = fanCards.map(c => ({ el: c.querySelector('.finner'), s: +c.dataset.speed }));

function fanSlots() {
  return matchMedia('(max-width:680px)').matches ? FAN_SLOTS_MOBILE : FAN_SLOTS_DESKTOP;
}

function applyFan() {
  const slots = fanSlots();
  fanOrder.forEach((cardId, slot) => {
    const card = fanCards[cardId];
    const s = slots[slot];
    card.style.transform = `translateX(${s.x}px) translateY(${s.y}px) rotate(${s.r}deg)`;
    card.style.zIndex = s.z;
    card.classList.toggle('fcard-center', slot === 2);
  });
}

function shuffleFan(cardId) {
  const from = fanOrder.indexOf(cardId);
  if (from === 2) return;
  const next = [...fanOrder];
  next.splice(from, 1);
  next.splice(2, 0, cardId);
  fanOrder = next;
  applyFan();
}

fanCards.forEach(card => {
  card.addEventListener('click', () => shuffleFan(+card.dataset.card));
});

let tick = false;
function px() {
  const r = fan.getBoundingClientRect();
  const prog = (window.innerHeight - r.top) / (window.innerHeight + r.height);
  const off = (prog - 0.5) * 2;
  inners.forEach(o => o.el.style.transform = 'translateY(' + (off * o.s * -4) + 'px)');
  tick = false;
}
addEventListener('scroll', () => { if (!tick) { requestAnimationFrame(px); tick = true; } }, { passive: true });
addEventListener('resize', applyFan);
applyFan();
px();

function openEdition(id) {
  location.href = 'edition.html?ed=' + encodeURIComponent(id);
}

let price = 6500, name = 'Single', qty = 1;
const fmt = n => '₦' + n.toLocaleString();
function pick(t) {
  document.querySelectorAll('.tix').forEach(x => {
    x.classList.remove('sel');
    x.querySelector('.tix-pick').textContent = 'Select';
  });
  t.classList.add('sel');
  t.querySelector('.tix-pick').textContent = 'Selected';
  price = +t.dataset.price;
  name = t.dataset.name;
  qty = 1;
  render();
}
function step(d) { qty = Math.max(1, qty + d); render(); }
function render() { q.textContent = qty; cn.textContent = name; total.textContent = fmt(price * qty); }

function subscribe() {
  const e = document.getElementById('nemail'), ok = document.getElementById('nok');
  const v = e.value.trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
    ok.style.color = '#ff8a8a';
    ok.textContent = 'Enter a valid email';
    return;
  }
  ok.style.color = '';
  ok.textContent = "You're on the list — we'll be in touch ✦";
  e.value = '';
}
document.getElementById('nemail').addEventListener('keydown', ev => { if (ev.key === 'Enter') subscribe(); });
addEventListener('keydown', e => { if (e.key === 'Escape') document.body.classList.remove('m-open'); });
