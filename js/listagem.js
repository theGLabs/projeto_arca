/**
 * listagem.js — Programa ARCA
 * Renderização dos cards de animais, modal de detalhes,
 * filtros de busca e paginação da listagem.
 */
// RENDER ANIMALS
function makeCard(a,delay=0){
  const d=document.createElement('div');
  d.className='ac';
  d.style.animationDelay=delay+'s';
  const imgHtml = a.img
    ? `<img src="${a.img}" style="width:100%;height:100%;object-fit:cover" alt="${a.name}">`
    : `<span style="font-size:64px">${a.emoji||'🐾'}</span>`;
  d.innerHTML=`<div class="ai">${imgHtml}</div><div class="ab"><div class="an">${a.name}</div><div class="am">${a.species==='cao'?'Cão':'Gato'} · ${cap(a.size)} · ${a.ageText}</div><div class="ad">${a.desc}</div><button class="btn btn-p btn-full" onclick="event.stopPropagation();openModal(${a.id})">Ver perfil →</button></div>`;
  d.addEventListener('click',()=>openModal(a.id));
  return d;
}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1);}

function renderHome(){
  const g=document.getElementById('home-animals');
  if(!g)return;
  g.innerHTML='';
  ANIMALS.slice(0,3).forEach((a,i)=>{g.appendChild(makeCard(a,i*.07));});
}

// MODAL
function openModal(id){
  const a=ANIMALS.find(x=>x.id===id);
  if(!a)return;
  const mImg=document.getElementById('m-img');
  if(mImg){
    if(a.img){ mImg.innerHTML=`<img src="${a.img}" style="width:100%;height:100%;object-fit:cover" alt="${a.name}">`; }
    else { mImg.textContent=a.emoji||'🐾'; }
  }
  document.getElementById('m-name').textContent=a.name;
  document.getElementById('m-meta').textContent=(a.species==='cao'?'Cão':'Gato')+' · '+cap(a.size)+' · '+a.ageText;
  document.getElementById('m-esp').textContent=a.species==='cao'?'Cão':'Gato';
  document.getElementById('m-porte').textContent=cap(a.size);
  document.getElementById('m-age').textContent=a.ageText;
  document.getElementById('m-sex').textContent=cap(a.sex==='macho'?'Macho':'Fêmea');
  document.getElementById('m-cas').textContent=a.castrado;
  document.getElementById('m-vac').textContent=a.vacinado;
  document.getElementById('m-desc').textContent=a.desc;
  sessionStorage.setItem('arca_animal', JSON.stringify(a));
  document.getElementById('animalModal').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(e){
  if(e&&e.target!==document.getElementById('animalModal'))return;
  document.getElementById('animalModal').classList.remove('open');
  document.body.style.overflow='';
}

// FILTERS + LISTING
function applyF(){
  const sp=[...document.querySelectorAll('.fs:checked')].map(c=>c.value);
  const sz=[...document.querySelectorAll('.fz:checked')].map(c=>c.value);
  const ag=[...document.querySelectorAll('.fa:checked')].map(c=>c.value);
  const sx=[...document.querySelectorAll('.fg3:checked')].map(c=>c.value);
  const sort=document.querySelector('.ss')?.value||'recent';
  let list=ANIMALS.filter(a=>sp.includes(a.species)&&sz.includes(a.size)&&ag.includes(a.age)&&sx.includes(a.sex));
  if(sort==='az')list.sort((a,b)=>a.name.localeCompare(b.name));
  else if(sort==='za')list.sort((a,b)=>b.name.localeCompare(a.name));
  state.filtered=list;
  state.page=1;
  renderListing();
}

function updateCounts(){
  ['cao','gato'].forEach(s=>{
    const el=document.getElementById('fc-'+s);
    if(el)el.textContent='('+ANIMALS.filter(a=>a.species===s).length+')';
  });
}

function renderListing(){
  const g=document.getElementById('lgr');
  const pgr=document.getElementById('pgr');
  if(!g)return;
  const list=state.filtered.length>0?state.filtered:ANIMALS;
  const total=list.length;
  const pages=Math.ceil(total/PPER);
  const start=(state.page-1)*PPER;
  const slice=list.slice(start,start+PPER);
  g.innerHTML='';
  if(slice.length===0){
    g.innerHTML=`<div class="es"><div class="ei">🔍</div><div class="et">Nenhum animal encontrado</div><div class="ed">Tente ajustar os filtros.</div><button class="btn btn-s" onclick="clearF()">Limpar filtros</button></div>`;
  } else {
    slice.forEach((a,i)=>{g.appendChild(makeCard(a,i*.05));});
  }
  const lcnt=document.getElementById('lcnt');
  if(lcnt)lcnt.textContent=total+' animal'+(total===1?'':'is')+' encontrado'+(total===1?'':'s');
  if(!pgr)return;
  pgr.innerHTML='';
  if(pages<=1)return;
  const prev=document.createElement('button');
  prev.className='pb2';prev.textContent='«';prev.disabled=state.page===1;
  prev.onclick=()=>{state.page--;renderListing();};
  pgr.appendChild(prev);
  for(let i=1;i<=pages;i++){
    const b=document.createElement('button');
    b.className='pb2'+(i===state.page?' active':'');
    b.textContent=i;
    b.onclick=(()=>{const p=i;return()=>{state.page=p;renderListing();}})();
    pgr.appendChild(b);
  }
  const next=document.createElement('button');
  next.className='pb2';next.textContent='»';next.disabled=state.page===pages;
  next.onclick=()=>{state.page++;renderListing();};
  pgr.appendChild(next);
}

function clearF(){
  document.querySelectorAll('.fs,.fz,.fa,.fg3').forEach(c=>c.checked=true);
  state.filtered=[...ANIMALS];state.page=1;renderListing();toast('Filtros limpos!');
}
