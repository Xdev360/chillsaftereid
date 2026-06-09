  const nav=document.getElementById('nav');
  addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30));
  const root=document.documentElement;
  document.getElementById('tgl').addEventListener('click',()=>root.dataset.theme=root.dataset.theme==='dark'?'light':'dark');
  const ham=document.getElementById('ham');
  ham.addEventListener('click',()=>document.body.classList.toggle('m-open'));
  document.querySelectorAll('.mc').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('m-open')));

  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.14});
  document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%3*.05)+'s';io.observe(el)});

  // gentle parallax on fanned cards — moves the INNER element so it never fights the card's tilt
  const inners=[...document.querySelectorAll('.fcard[data-speed]')].map(c=>({el:c.querySelector('.finner'),s:+c.dataset.speed}));
  const fan=document.getElementById('fan');let tick=false;
  function px(){const r=fan.getBoundingClientRect();const prog=(window.innerHeight-r.top)/(window.innerHeight+r.height);
    const off=(prog-0.5)*2; // -1..1 through viewport
    inners.forEach(o=>o.el.style.transform='translateY('+(off*o.s*-4)+'px)');tick=false}
  addEventListener('scroll',()=>{if(!tick){requestAnimationFrame(px);tick=true}},{passive:true});px();

  const gm=document.getElementById('gmodal'),gg=document.getElementById('ggrid');
  function openGallery(el){
    const ed=el.dataset.ed,yr=el.dataset.year,th=el.dataset.theme,c=el.dataset.color,now=el.dataset.now==='1';
    document.getElementById('gtitle').textContent='ChillsAfterEid '+ed+' · '+yr;
    document.getElementById('gsub').textContent=th;gg.innerHTML='';
    const n=now?6:9;
    for(let i=1;i<=n;i++){const t=document.createElement('div');t.className='tile';
      t.style.background='linear-gradient('+(120+i*15)+'deg,'+c+','+shade(c,-26)+')';
      t.textContent=now?'coming soon':ed+' · photo '+i;gg.appendChild(t)}
    gm.classList.add('show');document.body.style.overflow='hidden';
  }
  function closeGallery(){gm.classList.remove('show');document.body.style.overflow=''}
  gm.addEventListener('click',e=>{if(e.target===gm)closeGallery()});
  addEventListener('keydown',e=>{if(e.key==='Escape'){closeGallery();document.body.classList.remove('m-open')}});
  function shade(hex,p){let n=parseInt(hex.slice(1),16),r=(n>>16)+p,g=(n>>8&255)+p,b=(n&255)+p;return'#'+(0x1000000+(Math.max(0,Math.min(255,r))<<16)+(Math.max(0,Math.min(255,g))<<8)+Math.max(0,Math.min(255,b))).toString(16).slice(1)}

  let price=6500,name='Single',qty=1;const fmt=n=>'₦'+n.toLocaleString();
  function pick(t){document.querySelectorAll('.tix').forEach(x=>{x.classList.remove('sel');x.querySelector('.tix-pick').textContent='Select'});
    t.classList.add('sel');t.querySelector('.tix-pick').textContent='Selected';
    price=+t.dataset.price;name=t.dataset.name;qty=1;render()}
  function step(d){qty=Math.max(1,qty+d);render()}
  function render(){q.textContent=qty;cn.textContent=name;total.textContent=fmt(price*qty)}

  // newsletter
  function subscribe(){const e=document.getElementById('nemail'),ok=document.getElementById('nok');
    const v=e.value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){ok.style.color='#ff8a8a';ok.textContent='Enter a valid email';return}
    ok.style.color='';ok.textContent="You're on the list — we'll be in touch ✦";e.value=''}
  document.getElementById('nemail').addEventListener('keydown',ev=>{if(ev.key==='Enter')subscribe()});
