const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');
menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const form = document.querySelector('#discernment-form');
const dialog = document.querySelector('#dialog');
const recap = document.querySelector('#recap');
const facts = document.querySelector('#facts');
const note = document.querySelector('.dialog-note');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const value = document.querySelector('#situation').value.trim();
  if (!value) return;
  recap.textContent = `Situation décrite : « ${value} »`;
  facts.value = localStorage.getItem('institut-facts') || '';
  note.textContent = '';
  dialog.showModal();
});
document.querySelector('.close')?.addEventListener('click', () => dialog.close());
document.querySelector('.dialog-button')?.addEventListener('click', () => {
  localStorage.setItem('institut-facts', facts.value);
  note.textContent = 'Votre note a été enregistrée sur cet appareil.';
});
dialog?.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
  if (!inside) dialog.close();
});
