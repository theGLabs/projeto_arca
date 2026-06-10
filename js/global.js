/**
 * global.js — Programa ARCA
 * Dados dos animais, navegação entre páginas, autenticação
 * (login/cadastro/logout), menu de perfil e notificações toast.
 */
// DATA
const ANIMALS = [
  {id:1,img:'img/Rex.jpg',name:'Joca',species:'cao',size:'medio',age:'adulto',sex:'macho',ageText:'2 anos',desc:'Brincalhão e carinhoso, adora crianças e outros animais.',castrado:'Sim ✓',vacinado:'Sim ✓'},
  {id:2,img:'img/mia.jpg',name:'Lili',species:'gato',size:'pequeno',age:'adulto',sex:'femea',ageText:'1 ano',desc:'Tranquila e independente, ótima para apartamento.',castrado:'Sim ✓',vacinado:'Sim ✓'},
  {id:3,img:'img/bolinha.jpg',name:'Tonny',species:'cao',size:'grande',age:'adulto',sex:'macho',ageText:'3 anos',desc:'Calmo e obediente, precisa de espaço para correr.',castrado:'Sim ✓',vacinado:'Sim ✓'},
  {id:4,img:'img/nina.jpg',name:'Billy',species:'gato',size:'pequeno',age:'adulto',sex:'femea',ageText:'4 anos',desc:'Muito dócil, se dá bem com outros animais e crianças.',castrado:'Sim ✓',vacinado:'Sim ✓'},
  {id:5,img:'img/thor.jpg',name:'Tobby',species:'cao',size:'grande',age:'idoso',sex:'macho',ageText:'5 anos',desc:'Protetor e leal, ama atividades ao ar livre.',castrado:'Sim ✓',vacinado:'Sim ✓'},
  {id:6,img:'img/coco.jpg',name:'Sonic',species:'cao',size:'medio',age:'filhote',sex:'femea',ageText:'6 meses',desc:'Filhote cheio de energia e curiosidade, aprende rápido.',castrado:'Não',vacinado:'Sim ✓'},
  {id:7,img:'img/luna.jpg',name:'Luna',species:'gato',size:'pequeno',age:'filhote',sex:'femea',ageText:'4 meses',desc:'Gatinha lindíssima, muito carinhosa e brincalhona.',castrado:'Não',vacinado:'Sim ✓'},
  {id:8,img:'img/bob.jpg',name:'Bob',species:'cao',size:'grande',age:'adulto',sex:'macho',ageText:'4 anos',desc:'Cão de grande porte, muito dócil e bem treinado.',castrado:'Sim ✓',vacinado:'Sim ✓'},
  {id:9,img:'img/mel.jpg',name:'Mel',species:'gato',size:'pequeno',age:'adulto',sex:'femea',ageText:'2 anos',desc:'Gata preta muito carinhosa, adora colo e atenção.',castrado:'Sim ✓',vacinado:'Sim ✓'},
  {id:10,img:'img/spike.jpg',name:'Spike',species:'cao',size:'medio',age:'adulto',sex:'macho',ageText:'3 anos',desc:'Energético e brincalhão, adora crianças e passeios.',castrado:'Sim ✓',vacinado:'Sim ✓'},
  {id:11,img:'img/fifi.jpg',name:'Fifi',species:'gato',size:'pequeno',age:'idoso',sex:'femea',ageText:'8 anos',desc:'Gata idosa, muito tranquila e carinhosa, ideal para lares calmos.',castrado:'Sim ✓',vacinado:'Sim ✓'},
  {id:12,img:'img/max.jpg',name:'Max',species:'cao',size:'grande',age:'adulto',sex:'macho',ageText:'2 anos',desc:'Golden retriever mix, extremamente dócil e sociável.',castrado:'Sim ✓',vacinado:'Sim ✓'},
];

const PPER = 6;
let state = {user:{nome:'',email:''},page:1,filtered:[]};

// PAGE MAP
const PAGE_MAP = {
  login:'index.html', home:'home.html', listagem:'listagem.html',
  adocao:'adocao.html', castracao:'castracao.html', resgate:'resgate.html', denuncia:'denuncia.html'
};

// CURRENT PAGE
const CURRENT_PAGE = document.body.dataset.page || 'home';

// NAVIGATION
function go(s){
  closeDrops();
  sessionStorage.setItem('arca_screen', s);
  window.location.href = PAGE_MAP[s] || s+'.html';
}

// TOAST
let tTimer;
function toast(msg){
  const t=document.getElementById('toast');
  if(!t)return;
  document.getElementById('tmsg').textContent=msg;
  t.style.opacity='1';
  t.classList.add('show');t.classList.remove('hide');
  clearTimeout(tTimer);
  tTimer=setTimeout(()=>{t.classList.add('hide');setTimeout(()=>{t.classList.remove('show','hide');t.style.opacity='0'},300)},3200);
}

// TABS
function stab(id,el){
  document.querySelectorAll('.lt').forEach(t=>t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('lf').style.display='none';
  document.getElementById('rf').style.display='none';
  document.getElementById(id).style.display='block';
}

function sv(v){
  document.getElementById('v-auth').style.display=v==='auth'?'block':'none';
  document.getElementById('v-forgot').style.display=v==='forgot'?'block':'none';
}

// AUTH
function setE(id,show){
  const inp=document.getElementById(id);
  const err=document.getElementById('e'+id);
  if(!inp)return;
  inp.classList.toggle('err',show);
  if(err)err.classList.toggle('show',show);
}

function doLogin(){
  const e=document.getElementById('le').value;
  const p=document.getElementById('lp').value;
  let ok=true;
  if(!e||!e.endsWith('@gmail.com')){setE('le',true);ok=false}else setE('le',false);
  if(!p){setE('lp',true);ok=false}else setE('lp',false);
  if(!ok)return;
  state.user={nome:e.split('@')[0],email:e};
  sessionStorage.setItem('arca_user', JSON.stringify(state.user));
  toast('✓ Login realizado! Bem-vindo(a), '+state.user.nome+'.');
  setTimeout(()=>{ window.location.href='home.html'; },700);
}

function doReg(){
  const n=document.getElementById('rn').value;
  const e=document.getElementById('re').value;
  const p=document.getElementById('rp').value;
  const p2=document.getElementById('rp2').value;
  let ok=true;
  if(!n){setE('rn',true);ok=false}else setE('rn',false);
  if(!e||!e.endsWith('@gmail.com')){setE('re',true);ok=false}else setE('re',false);
  if(!p||p.length<8){setE('rp',true);ok=false}else setE('rp',false);
  if(p!==p2){setE('rp2',true);ok=false}else setE('rp2',false);
  if(!ok)return;
  state.user={nome:n.split(' ')[0],email:e};
  sessionStorage.setItem('arca_user', JSON.stringify(state.user));
  toast('✓ Conta criada! Bem-vindo(a), '+state.user.nome+'.');
  setTimeout(()=>{ window.location.href='home.html'; },700);
}

function setUI(){
  const n=state.user.nome||'';
  const av=n?n.charAt(0).toUpperCase():'?';
  const email=state.user.email||'';
  // Single nav
  const elAv=document.getElementById('nav-av');
  const elNm=document.getElementById('nav-nm');
  const elPfn=document.getElementById('nav-pfn');
  const elPfe=document.getElementById('nav-pfe');
  if(elAv)elAv.textContent=av;
  if(elNm)elNm.textContent=n;
  if(elPfn)elPfn.textContent=n;
  if(elPfe)elPfe.textContent=email;
  // Set active nav link
  const page = document.body.dataset.page;
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
  const active = document.getElementById('nl-'+page);
  if(active) active.classList.add('active');
}

function doLogout(){
  closeDrops();
  sessionStorage.clear();
  state.user={nome:'',email:''};
  toast('Você saiu da conta.');
  setTimeout(()=>{ window.location.href='index.html'; },700);
}

// PROFILE DROPDOWN
function toggleDrop(dropId,btnId){
  const d=document.getElementById(dropId);
  const b=document.getElementById(btnId);
  if(!d)return;
  const isOpen=d.classList.contains('open');
  closeDrops();
  if(!isOpen){d.classList.add('open');if(b)b.classList.add('open');}
}
function closeDrops(){
  document.querySelectorAll('.prof-drop').forEach(d=>d.classList.remove('open'));
  document.querySelectorAll('.prof-btn').forEach(b=>b.classList.remove('open'));
}
document.addEventListener('click',e=>{if(!e.target.closest('.nav-right'))closeDrops();});

// INIT - restore session
(function(){
  state.filtered=[...ANIMALS];
  const saved = sessionStorage.getItem('arca_user');
  if(saved){
    try{ state.user = JSON.parse(saved); }catch(e){}
  } else if(document.body.dataset.page !== 'login'){
    window.location.href = 'index.html';
    return;
  }
  setUI();
})();
