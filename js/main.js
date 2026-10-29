/* ROLMAR AUTOPEÇAS — scripts */
(function () {
  'use strict';

  /* Número do WhatsApp: troque aqui (DDI + DDD + número, só dígitos) */
  var WA = (document.body.getAttribute('data-wa-number') || '551434021090').replace(/\D/g, '');
  var LOADER_MS = 3500;

  function waLink(msg) {
    return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
  }

  /* Links do WhatsApp */
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    a.setAttribute('href', waLink(a.getAttribute('data-wa')));
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });

  /* Busca rápida de peça */
  var input = document.getElementById('peca');
  var go = document.getElementById('quick-go');
  function sendQuick() {
    var v = (input.value || '').trim();
    var msg = v
      ? 'Olá! Gostaria de um orçamento: ' + v
      : 'Olá! Gostaria de um orçamento de peças.';
    window.open(waLink(msg), '_blank', 'noopener');
  }
  if (go && input) {
    go.addEventListener('click', sendQuick);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); sendQuick(); }
    });
  }

  /* Menu mobile */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  function closeMenu() {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menu');
  }
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* Ano do rodapé */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* Tela de carregamento: 3,5 s */
  var loader = document.getElementById('loader');
  function finish() {
    if (!loader) return;
    loader.classList.add('done');
    document.body.classList.remove('is-loading');
    document.body.classList.add('ready');
    setTimeout(function () { if (loader.parentNode) loader.parentNode.removeChild(loader); }, 600);
  }
  if (loader) setTimeout(finish, LOADER_MS);
  else document.body.classList.add('ready');
})();
