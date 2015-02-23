
$.fn.progressIndicator = function () {
  var $inputs = $(this).find('input');
  var $progress = $(this).find('.progress');
  var $submit = $(this).find('.submit');

  $inputs
    .on('blur', function () {
      var wasFull = $progress.hasClass('full');
      var wasHalf = $progress.hasClass('half');
      var qa = checkInputs($inputs);

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

        $('#alert-bin')
          .append('<p role="alert">'
                +   'Thanks! You have provided enough info'
                + '</p>');
      }
    })
    .on('keydown', function (keyVent) {
      if (keyVent.which === 13) { // ENTER
        $submit.click();
      }
    });


  $submit.on('click', function () {
    var ariaVal = $progress.attr('aria-valuenow');

    if (ariaVal === '0' || ariaVal === '50') {
      alert('You\'re gonna have to tell me a little more about yourself');
    } else {
      alert('Thanks for the info!');
    }
  });

  return this;
}

function checkInputs($inputs) {
  var valInputs = [];
  $inputs.each(function () {
    if ($(this).val() !== '') {
      valInputs.push(this);
    }
  });

  return valInputs.length;
}

$('#polite').progressIndicator();
$('#assertive').progressIndicator();
