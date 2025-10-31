document.querySelector('.dots-button').addEventListener('click', function () {
  const menu = document.querySelector('.dropdown-menu');
  const expanded = this.getAttribute('aria-expanded') === 'true';

  this.setAttribute('aria-expanded', !expanded);
  menu.style.display = expanded ? 'none' : 'block';
});
