
//detects user input in the text field, calls counter to update
$(document).ready(function() {
  $("#tweet-text").on("input", counter);
});

//finds how hamy characters are in the text field
const counter = function () {

  //finds the current length and subtracts the input character
  const $textLength = $(this).val().length;
  const textCounter = 140 - $textLength;
  const $counterElement = $(this).parent().find(".counter");
  $counterElement.text(textCounter);

  //activates the error message for both special cases
  if (textCounter < 0) {
    $counterElement.addClass("text-over-limit");
  } else {
    $counterElement.removeClass("text-over-limit");
  }
};