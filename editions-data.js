const EDITIONS = {
  '1.0': {
    year: '2023',
    theme: 'The First Gathering',
    color: '#e8941e',
    accent: 'linear-gradient(150deg,#f0a53a,#cf7f10)',
    bio: 'Where it all started — the first after-Eid hangout in Lagos. A small room, big energy, and proof the community was ready for something like this.',
    photos: 24
  },
  '2.0': {
    year: '2024',
    theme: 'Doubled the Room',
    color: '#84c341',
    accent: 'linear-gradient(150deg,#94d150,#69a92c)',
    bio: 'The crowd showed up twice as strong. More vendors, more games, and the vibe that told us ChillsAfterEid was becoming a tradition.',
    photos: 38
  },
  '3.0': {
    year: '2025',
    theme: 'The Festival Year',
    color: '#36b4cf',
    accent: 'linear-gradient(150deg,#3fc0db,#1f93ad)',
    bio: 'It became a full experience — panels, giveaways, content corners, and a market that felt like a festival. The community came alive.',
    photos: 52
  },
  '4.0': {
    year: '2026',
    theme: 'The High-Fly Muslim Experience',
    color: '#84c341',
    accent: 'linear-gradient(150deg,#94d150,#3fc0db)',
    bio: 'Edition 4.0 — eat, drink, network, and chill after Eid. The High-Fly Muslim Experience at Dr Oluyomi Abayomi Finnih Park, Lagos.',
    photos: 0,
    comingSoon: true
  }
};

const CATEGORIES = [
  { id: 'networking', label: 'Networking', grad: 'linear-gradient(150deg,#3fc0db,#1f93ad)' },
  { id: 'games', label: 'Games & fun', grad: 'linear-gradient(150deg,#94d150,#69a92c)' },
  { id: 'content', label: 'Content', grad: 'linear-gradient(150deg,#f0a53a,#cf7f10)' },
  { id: 'shopping', label: 'Shopping', grad: 'linear-gradient(150deg,#f0a53a,#e8941e)' },
  { id: 'panels', label: 'Panels', grad: 'linear-gradient(150deg,#3fc0db,#36b4cf)' },
  { id: 'giveaways', label: 'Giveaways', grad: 'linear-gradient(150deg,#94d150,#84c341)' }
];

const CATEGORY_ICONS = {
  networking: '<circle cx="9" cy="7" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><path d="M16 3.1a4 4 0 0 1 0 7.8M22 21v-2a4 4 0 0 0-3-3.9"/>',
  games: '<line x1="6" y1="11" x2="10" y2="11"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="15" y1="12" x2="15.01" y2="12"/><line x1="18" y1="10" x2="18.01" y2="10"/><path d="M17.3 5H6.7a4 4 0 0 0-4 3.6c-.6 5.5-.8 7 .4 8.3.9.9 2.6.9 5.9.9 1.1 0 1.8-1.2 2.5-2h1.9c.7.8 1.4 2 2.5 2 3.3 0 5 0 5.9-.9 1.3-1.3 1-2.8.4-8.3A4 4 0 0 0 17.3 5z"/>',
  content: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  shopping: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  panels: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/>',
  giveaways: '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>'
};

function buildEditionPhotos(ed, cat, count, color) {
  const n = ed.comingSoon ? 3 : count;
  return Array.from({ length: n }, (_, i) => ({
    bg: CATEGORIES.find(c => c.id === cat).grad,
    caption: ed.comingSoon
      ? `${ed.theme} — photos coming soon`
      : `${ed.year} · ${CATEGORIES.find(c => c.id === cat).label} — moment ${i + 1}`
  }));
}

function getEditionGallery(edId) {
  const ed = EDITIONS[edId];
  if (!ed) return null;
  const perCat = ed.comingSoon ? 3 : Math.max(3, Math.floor(ed.photos / 6));
  const gallery = {};
  CATEGORIES.forEach(cat => {
    gallery[cat.id] = buildEditionPhotos(ed, cat.id, perCat, ed.color);
  });
  return { ...ed, id: edId, gallery };
}
