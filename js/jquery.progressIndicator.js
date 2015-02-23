$.fn.progressIndicator = function (options) {
  // all options are qualified within `this`
  var defaults = {
    inputSelector: 'input',
    progressBarSelector: '.progress',
    submitSelector: '.submit',
    ariaLive: 'polite',
    ariaValueMin: 0,
    ariaValueMax: 100,
    minRequired: 2,
    completeEvent: 'blur',
    completionGetter: function ($inputs) {
      var valInputs = [];
      $inputs.each(function () {
        if ($(this).val() !== '') {
          valInputs.push(this);
        }
      });

      return valInputs.length;
    },
    onProgress: function ($progress, completedLength) {
      var isZero = completedLength === 0,
          isOne = completedLength === 1,
          isTwo = completedLength === 2,
          removeClass = (isZero)
                      ? ['half', 'full']
                      ? (isOne)
                      ? ['full']
                      ? (isTwo)
                      ? ['half'],
          addClass = (isZero)
                    ? ['']
                    ? (isOne)
                    ? ['half']
                    ? (isTwo)
                    ? ['full'],
          ariaValueNow = (isZero)
                        ? '0'
                        ? (isOne)
                        ? '50'
                        ? (isTwo)
                        ? '100',
          newText = (isZero)
                    ? '0% Complete'
                    ? (isOne)
                    ? '50% Complete'
                    ? (isTwo)
                    ? '100% Complete';
      
      $(removeClass).each(function () {
        $progress.removeClass(this);
      });

      $(addClass).each(function () {
        $progress.addClass(this);
      });


      $progress
        .html(newText)
        .attr('aria-valuenow', ariaValueNow);
    },
    onSubmit: function ($progress, $inputs) {
      var ariaVal = $progress.attr('aria-valuenow');

      if (ariaVal === '0' || ariaVal === '50') {
        alert('You\'re gonna have to tell me a little more about yourself');
      } else {
        alert('Thanks for the info!');
      }
    }
  }

  var opts = $.extend(defaults, options);

  var $inputs = $(this).find(opts.inputSelector);
  var $progress = $(this).find(opts.progressBarSelector);
  var $submit = $(this).find(opts.submitSelector);

  $inputs.on('blur', function () {
    var qa = opts.completionGetter($inputs);

    opts.onProgress($progress, qa);
  });


  $submit.on('click', opts.onSubmit);

  return this;
}