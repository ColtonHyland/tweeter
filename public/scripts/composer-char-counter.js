$(document).ready(function() {
  $("#tweet-text").on("input", counter);
});

 const counter = function () {

  const $textLength = $(this).val().length;
  const textCounter = 140 - $textLength;
  const $counterElement = $(this).parent().find(".counter");
  $counterElement.text(textCounter);

  if (textCounter < 0) {
    $counterElement.addClass("text-over-limit");
  } else {
    $counterElement.removeClass("text-over-limit");
  }
};