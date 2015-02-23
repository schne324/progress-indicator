
$('#polite').progressIndicator()
  .find('input')
    .on('keydown', listenForEnter);;
$('#assertive').progressIndicator()
  .find('input')
    .on('keydown', listenForEnter);


function listenForEnter(keyVent) {
  if (keyVent.which === 13) {
    $(this)
      .closest('fieldset')
      .find('.submit')
      .click();
  }
}