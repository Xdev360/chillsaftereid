(function () {
  var KEY = 'cae_auth';
  var PASSWORD = 'wintech666';

  if (sessionStorage.getItem(KEY) === 'ok') return;

  var css = '' +
    '#cae-gate{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px;' +
    'background:radial-gradient(circle at 80% 12%,rgba(132,195,65,.25),transparent 45%),radial-gradient(circle at 12% 92%,rgba(54,180,207,.25),transparent 45%),#0c161b;' +
    'font-family:\'Schibsted Grotesk\',system-ui,sans-serif}' +
    '#cae-gate .gbox{width:100%;max-width:360px;background:#111f26;border:1px solid #22343c;border-radius:20px;padding:30px 26px;text-align:center;box-shadow:0 30px 70px -30px rgba(0,0,0,.7)}' +
    '#cae-gate .glogo{display:flex;align-items:center;justify-content:center;gap:8px;font-family:\'Baloo 2\',sans-serif;font-weight:800;font-size:1.15rem;color:#eaf3f6;margin-bottom:4px}' +
    '#cae-gate .glogo .moon{width:18px;height:18px;border-radius:50%;background:#e8941e;box-shadow:inset -5px 1px 0 0 #111f26}' +
    '#cae-gate .glogo b{color:#e8941e}#cae-gate .glogo u{color:#46c2dd;text-decoration:none}' +
    '#cae-gate p{color:#9fb3bb;font-size:.9rem;margin:6px 0 20px}' +
    '#cae-gate input{width:100%;padding:13px 16px;border-radius:40px;border:1px solid #22343c;background:rgba(255,255,255,.06);color:#fff;font-size:1rem;font-family:inherit;outline:none;text-align:center}' +
    '#cae-gate input:focus{border-color:#84c341}' +
    '#cae-gate button{width:100%;margin-top:12px;padding:13px;border:none;border-radius:40px;background:#e8941e;color:#fff;font-family:\'Baloo 2\',sans-serif;font-weight:700;font-size:1rem;cursor:pointer;transition:.2s}' +
    '#cae-gate button:hover{background:#cf7f10}' +
    '#cae-gate .gerr{color:#ff8a8a;font-size:.82rem;font-weight:600;height:18px;margin-top:12px}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';

  var gate = document.createElement('div');
  gate.id = 'cae-gate';
  gate.innerHTML =
    '<div class="gbox">' +
      '<div class="glogo"><span class="moon"></span>Chills<b>After</b><u>Eid</u></div>' +
      '<p>This site is private. Enter the password to continue.</p>' +
      '<input id="cae-pw" type="password" autocomplete="off" placeholder="Password" aria-label="Password">' +
      '<button id="cae-go" type="button">Unlock</button>' +
      '<div class="gerr" id="cae-err"></div>' +
    '</div>';
  document.body.appendChild(gate);

  var input = gate.querySelector('#cae-pw');
  var err = gate.querySelector('#cae-err');
  input.focus();

  function tryUnlock() {
    if (input.value === PASSWORD) {
      sessionStorage.setItem(KEY, 'ok');
      document.documentElement.style.overflow = prevOverflow;
      gate.remove();
    } else {
      err.textContent = 'Incorrect password';
      input.value = '';
      input.focus();
    }
  }

  gate.querySelector('#cae-go').addEventListener('click', tryUnlock);
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') tryUnlock(); });
})();
