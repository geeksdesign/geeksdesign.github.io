$(function() {
  $("body, html, .slider").mousewheel(function(event, delta) {
  this.scrollLeft -= (delta * 50);
  event.preventDefault();
  });
});