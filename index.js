
var $inputs = $('.question input');
var $progress = $('.progress');

$inputs.on('keydown', function (keyVent) {
  var wasFull = $progress.hasClass('full');
  var wasHalf = $progress.hasClass('half');
  setTimeout(function () {
    var qa = checkInputs();

    if (qa < 1) {
      if (wasHalf || wasFull) {
        $progress
          .removeClass('full')
          .removeClass('half')
          .html('0% Complete')
          .attr('aria-valuenow', '0');
      }
    } else if (qa === 1 && !wasHalf) {
      $progress
        .removeClass('full')
        .addClass('half')
        .html('50% Complete')
        .attr('aria-valuenow', '50');
    } else if (qa === 2 && !wasFull) {
      $progress
        .removeClass('half')
        .addClass('full')
        .html('100% Complete')
        .attr('aria-valuenow', '100');
    }
  }, 0);

  // submit "form" (not actually a form) on ENTER
  if (keyVent.which === 13) {
    $('#submit').click();
  }
});

$('#submit').on('click', function () {
  var ariaVal = $progress.attr('aria-valuenow');

  if (ariaVal === '0' || ariaVal === '50') {
    alert('You\'re gonna have to tell me a little more about yourself');
  } else {
    alert('Thanks for the info!');
  }
});

function checkInputs() {
  var valInputs = [];
  $inputs.each(function () {
    if ($(this).val() !== '') {
      valInputs.push(this);
    }
  });

  return valInputs.length;
}

