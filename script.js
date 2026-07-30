(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, false);
    } else {
      fn();
    }
  }

  ready(function () {
    var body = document.body;
    var menuButton = document.querySelector('.menu-button');
    var drawer = document.getElementById('mobile-drawer');
    var closeButton = document.querySelector('.drawer-close');
    var backdrop = document.querySelector('.drawer-backdrop');
    var lastFocus = null;

    function setDrawer(open) {
      if (!menuButton || !drawer || !backdrop) return;
      body.classList.toggle('drawer-open', open);
      drawer.classList.toggle('open', open);
      backdrop.hidden = !open;
      backdrop.classList.toggle('visible', open);
      drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuButton.classList.toggle('is-open', open);

      if (open) {
        lastFocus = document.activeElement;
        window.setTimeout(function () {
          if (closeButton) closeButton.focus();
        }, 30);
      } else if (lastFocus && typeof lastFocus.focus === 'function') {
        lastFocus.focus();
      }
    }

    function toggleDrawer(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      var isOpen = body.classList.contains('drawer-open');
      setDrawer(!isOpen);
    }

    if (menuButton) {
      menuButton.setAttribute('type', 'button');
      menuButton.addEventListener('click', toggleDrawer, false);
    }
    if (closeButton) {
      closeButton.setAttribute('type', 'button');
      closeButton.addEventListener('click', function (event) {
        event.preventDefault();
        setDrawer(false);
      }, false);
    }
    if (backdrop) {
      backdrop.addEventListener('click', function () { setDrawer(false); }, false);
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' || event.keyCode === 27) setDrawer(false);
    }, false);

    var drawerToggles = document.querySelectorAll('.drawer-toggle');
    Array.prototype.forEach.call(drawerToggles, function (button) {
      button.setAttribute('type', 'button');
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var section = button.closest ? button.closest('.drawer-section') : button.parentNode.parentNode;
        if (!section) return;
        var opening = !section.classList.contains('open');

        Array.prototype.forEach.call(document.querySelectorAll('.drawer-section.open'), function (other) {
          if (other !== section) {
            other.classList.remove('open');
            var otherButton = other.querySelector('.drawer-toggle');
            if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
          }
        });

        section.classList.toggle('open', opening);
        button.setAttribute('aria-expanded', opening ? 'true' : 'false');
      }, false);
    });

    Array.prototype.forEach.call(drawer.querySelectorAll('a'), function (link) {
      link.addEventListener('click', function () { setDrawer(false); }, false);
    });

    var navItems = document.querySelectorAll('.nav-item.has-mega');
    Array.prototype.forEach.call(navItems, function (item) {
      var trigger = item.querySelector('.mega-trigger');
      var link = item.querySelector('.nav-main');
      var panel = item.querySelector('.mega-panel');
      var timer = null;

      function closeAll(except) {
        Array.prototype.forEach.call(document.querySelectorAll('.nav-item.open'), function (openItem) {
          if (openItem !== except) {
            openItem.classList.remove('open');
            var openTrigger = openItem.querySelector('.mega-trigger');
            if (openTrigger) openTrigger.setAttribute('aria-expanded', 'false');
          }
        });
      }

      function openMenu() {
        window.clearTimeout(timer);
        closeAll(item);
        item.classList.add('open');
        if (trigger) trigger.setAttribute('aria-expanded', 'true');
      }

      function closeMenu() {
        item.classList.remove('open');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      }

      item.addEventListener('mouseenter', openMenu, false);
      item.addEventListener('mouseleave', function () {
        timer = window.setTimeout(closeMenu, 180);
      }, false);
      if (link) link.addEventListener('focus', openMenu, false);
      if (trigger) {
        trigger.setAttribute('type', 'button');
        trigger.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          var opening = !item.classList.contains('open');
          closeAll(opening ? item : null);
          item.classList.toggle('open', opening);
          trigger.setAttribute('aria-expanded', opening ? 'true' : 'false');
        }, false);
      }
      if (panel) {
        panel.addEventListener('focusout', function (event) {
          if (!item.contains(event.relatedTarget)) closeMenu();
        }, false);
      }
    });

    document.addEventListener('click', function (event) {
      if (!event.target.closest || !event.target.closest('.nav-item')) {
        Array.prototype.forEach.call(document.querySelectorAll('.nav-item.open'), function (item) {
          item.classList.remove('open');
          var trigger = item.querySelector('.mega-trigger');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        });
      }
    }, false);

    var video = document.querySelector('.home-hero video');
    if (video) {
      video.muted = true;
      video.playsInline = true;
      var promise = video.play();
      if (promise && typeof promise.catch === 'function') promise.catch(function () {});
    }
  });
}());
