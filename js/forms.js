/**
 * forms.js — Programa ARCA
 * Validação de formulários, barra de progresso e
 * preenchimento do card do animal selecionado para adoção.
 */
function fillAnimalCard(){
  const saved = sessionStorage.getItem('arca_animal');
  if(!saved) return;
  const a = JSON.parse(saved);
  const cap = s => s.charAt(0).toUpperCase()+s.slice(1);
  const emojiEl = document.getElementById('ach-emoji');
  const nameEl = document.getElementById('ach-name');
  const metaEl = document.getElementById('ach-meta');
  if(emojiEl){
    if(a.img){ emojiEl.innerHTML=`<img src="${a.img}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--rs)" alt="${a.name}">`; }
    else { emojiEl.textContent=a.emoji||'🐾'; }
  }
  if(nameEl) nameEl.textContent = a.name;
  if(metaEl) metaEl.textContent = (a.species==='cao'?'Cão':'Gato')+' · '+cap(a.size)+' · '+a.ageText;
}

document.addEventListener('DOMContentLoaded', fillAnimalCard);

// PROGRESS
function updP(){
  const inputs=[...document.querySelectorAll('#form-adocao input[data-req],#form-adocao textarea[data-req]')];
  const done=inputs.filter(i=>i.value.trim().length>0).length;
  const pct=Math.round((done/inputs.length)*100);
  const pf=document.getElementById('pf');const pp=document.getElementById('pp');
  if(pf)pf.style.width=pct+'%';
  if(pp)pp.textContent=pct+'%';
}

// FORM VALIDATION + SUBMIT
function submitF(form){
  const fc=document.getElementById('form-'+form);
  const reqs=[...fc.querySelectorAll('input[data-req],textarea[data-req]')];
  let ok=true;
  reqs.forEach(inp=>{
    const err=inp.nextElementSibling;
    if(!inp.value.trim()){
      inp.classList.add('err');
      if(err&&err.classList.contains('ferr'))err.classList.add('show');
      ok=false;
    } else {
      inp.classList.remove('err');
      if(err&&err.classList.contains('ferr'))err.classList.remove('show');
    }
  });
  const ck=document.getElementById('ck-'+form)?.querySelector('input');
  if(ck&&!ck.checked){toast('⚠ Confirme que as informações estão corretas antes de enviar.');ok=false;}
  if(!ok){
    toast('⚠ Preencha todos os campos obrigatórios antes de enviar.');
    const first=reqs.find(i=>!i.value.trim());
    if(first)first.scrollIntoView({behavior:'smooth',block:'center'});
    return;
  }
  const s=document.getElementById('success-'+form);
  if(s){s.style.display='flex';s.scrollIntoView({behavior:'smooth'});}
  toast('✓ Formulário enviado com sucesso!');
}
