const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Fechar':'Menu'});
nav?.addEventListener('click',e=>{if(e.target.closest('a')){nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}});
const reduce=matchMedia('(prefers-reduced-motion: reduce)'),mobile=matchMedia('(max-width: 700px)');
if(!reduce.matches&&'IntersectionObserver' in window){document.body.classList.add('motion');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el))}
const hero=document.querySelector('.hero'),photo=document.querySelector('.hero-photo'),video=document.querySelector('.hero-video'),moments=[...document.querySelectorAll('.moment')],chapters=[...document.querySelectorAll('.chapters button')];
// Set this path only after a final scene film is provided. No video is fetched on mobile.
const HERO_VIDEO_URL='';
let queued=false,last=-1;
function render(){queued=false;if(!hero)return;const staticMode=mobile.matches||reduce.matches;const range=hero.offsetHeight-innerHeight;const p=staticMode?1:Math.max(0,Math.min(1,-hero.getBoundingClientRect().top/Math.max(1,range)));const index=Math.min(3,Math.floor(p*4));if(index!==last){moments.forEach((el,i)=>{el.classList.toggle('active',i===index);el.setAttribute('aria-hidden',String(i!==index));el.inert=i!==index});chapters.forEach((el,i)=>{el.classList.toggle('active',i===index);el.setAttribute('aria-pressed',String(i===index))});last=index}if(photo)photo.style.transform=staticMode?'none':`scale(${1.075-p*.075})`;if(video&&video.readyState>=2&&!staticMode&&Number.isFinite(video.duration)&&!video.seeking){const target=p*Math.max(0,video.duration-.04);if(Math.abs(video.currentTime-target)>.035)video.currentTime=target}}
function schedule(){if(!queued){queued=true;requestAnimationFrame(render)}}
function media(){if(video){if(HERO_VIDEO_URL&&!mobile.matches&&!reduce.matches){if(!video.getAttribute('src')){video.src=HERO_VIDEO_URL;video.load()}}else{video.pause();video.removeAttribute('src');video.load();video.classList.remove('ready')}}last=-1;schedule()}
video?.addEventListener('loadeddata',()=>{video.classList.add('ready');schedule()});video?.addEventListener('seeked',schedule);video?.addEventListener('error',()=>video.classList.remove('ready'));
chapters.forEach((el,i)=>el.addEventListener('click',()=>{const top=hero.getBoundingClientRect().top+scrollY;window.scrollTo({top:top+(hero.offsetHeight-innerHeight)*(i===3?.94:i/4+.03),behavior:reduce.matches?'instant':'smooth'})}));
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);mobile.addEventListener('change',media);reduce.addEventListener('change',media);media();



// Projetos por necessidade e mensagem de contato para WhatsApp.
document.querySelectorAll('.pd-catalog').forEach(catalog=>{
 const buttons=[...catalog.querySelectorAll('[data-filter]')],projects=[...catalog.querySelectorAll('[data-category]')];
 buttons.forEach(button=>button.addEventListener('click',()=>{
  let visible=0;projects.forEach(project=>{project.hidden=button.dataset.filter!=='todos'&&project.dataset.category!==button.dataset.filter;if(!project.hidden)visible++;});
  buttons.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  catalog.querySelector('.pd-count').textContent=visible+(visible===1?' projeto':' projetos');
 }));
});
const pdForm=document.getElementById('pd-contact-form');
if(pdForm){
 const fields=Object.fromEntries(['nome','servico','instagram','intencao'].map(key=>[key,pdForm.elements.namedItem(key)]));
 const link=document.getElementById('pd-whatsapp-link'),preview=document.getElementById('pd-message-preview');
 const serviceIndex=new URLSearchParams(location.search).get('servico');
 const serviceNames=['Instagram','Portfólio','Portfólio + site + Instagram','Edição de até 10 fotos'];
 if(serviceIndex!==null&&/^[0-3]$/.test(serviceIndex))fields.servico.value=serviceNames[Number(serviceIndex)];
 function updateMessage(){
  for(const key of ['nome','intencao'])fields[key].setCustomValidity(fields[key].value&&!fields[key].value.trim()?'Preencha este campo.':'');
  fields.instagram.setCustomValidity(fields.instagram.value&&!/^@?[A-Za-z0-9_][A-Za-z0-9_.]{0,29}$/.test(fields.instagram.value.trim())?'Informe um @ válido do Instagram, sem espaços ou links.':'');
  const handle=fields.instagram.value.trim().replace(/^@/,'');
  const message='Olá! Vim pelo site da Presença Digital.\n\nMeu nome: '+fields.nome.value.trim()+'\nTenho interesse em: '+fields.servico.value.trim()+'\nMeu Instagram: @'+handle+'\nMinha intenção: '+fields.intencao.value.trim();
  preview.textContent=message;link.href='https://wa.me/5511954377399?text='+encodeURIComponent(message);
 }
 pdForm.addEventListener('input',updateMessage);pdForm.addEventListener('change',updateMessage);
 link.addEventListener('click',event=>{updateMessage();if(!pdForm.reportValidity())event.preventDefault();});
 pdForm.addEventListener('submit',event=>{event.preventDefault();updateMessage();if(pdForm.reportValidity())link.click();});
 updateMessage();
}
