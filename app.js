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


const serviceNames=['Instagram completo','Portfólio profissional','Portfólio + site + Instagram','Edição de até 10 fotos'];const selectedService=new URLSearchParams(location.search).get('servico');const contactButton=document.querySelector('.contact-links .button');if(contactButton&&selectedService!==null&&serviceNames[Number(selectedService)]){contactButton.href='mailto:prod.eodrew@gmail.com?subject='+encodeURIComponent('Orçamento: '+serviceNames[Number(selectedService)]);}
