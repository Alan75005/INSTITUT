const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav');
if (menu && nav) {
  const closeMenu = () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menu.setAttribute('aria-expanded', 'false');
  };
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    document.body.classList.toggle('menu-open', open);
    menu.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}
const dialog = document.querySelector('#discernment-dialog');
document.querySelector('[data-dialog-open]')?.addEventListener('click', () => dialog?.showModal());
document.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog?.close());
const facts = document.querySelector('#facts');
const status = document.querySelector('.status');
if (facts) facts.value = localStorage.getItem('institut-facts') || '';
document.querySelector('.save')?.addEventListener('click', () => {
  localStorage.setItem('institut-facts', facts.value.trim());
  status.textContent = 'Votre réflexion a été enregistrée sur cet appareil.';
});
