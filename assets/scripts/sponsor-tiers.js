(function () {
  var panels = Array.from(document.querySelectorAll('.sponsor-tier[data-tier]'));
  var displays = document.querySelectorAll('[data-tier-display]');
  var scheduled = false;
  function update() {
    scheduled = false;
    var target = window.innerHeight * 0.5;
    var active = panels[0];
    panels.forEach(function (panel) {
      if (panel.getBoundingClientRect().top <= target) active = panel;
    });
    displays.forEach(function (display) {
      display.setAttribute('aria-hidden', String(display.dataset.tierDisplay !== active.dataset.tier));
    });
  }
  function schedule() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
})();
