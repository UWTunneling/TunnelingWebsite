(function () {
  document.querySelectorAll('.framer--slideshow-controls').forEach(function (controls) {
    var track = controls.parentElement.querySelector('ul');
    var slides = Array.from(track.children);
    var dots = controls.querySelectorAll('button[aria-label^="Scroll to page"]');
    var current = 0;
    function show(index) {
      current = (index + slides.length) % slides.length;
      var first = slides[0].firstElementChild.getBoundingClientRect();
      var target = slides[current].firstElementChild.getBoundingClientRect();
      var offset = target.left - first.left;
      track.style.transform = 'translateX(' + (-offset) + 'px)';
      slides.forEach(function (slide, i) {
        slide.setAttribute('aria-hidden', String(i !== current));
      });
      dots.forEach(function (dot, i) {
        dot.setAttribute('aria-current', String(i === current));
      });
    }
    controls.querySelector('[aria-label="Previous"]').addEventListener('click', function () { show(current - 1); });
    controls.querySelector('[aria-label="Next"]').addEventListener('click', function () { show(current + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { show(i); });
    });
    window.addEventListener('resize', function () { show(current); });
    show(0);
  });
})();
