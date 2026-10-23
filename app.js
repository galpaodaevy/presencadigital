const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
function closeMenu(returnFocus = false) {
  nav?.classList.remove('open');
  menu?.setAttribute('aria-expanded', 'false');
  if (menu) menu.textContent = 'Menu';
  if (returnFocus) menu?.focus();
}
menu?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Fechar' : 'Menu';
});
nav?.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) closeMenu(true);
});
const narrowMenu = matchMedia('(max-width: 800px)');
narrowMenu.addEventListener('change', () => closeMenu());

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
