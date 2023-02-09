/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {


  const loadTweets = function () {
    $.ajax("/tweets").then(function (tweets) {
      renderTweets(tweets);
    });
  };
  loadTweets();
  $(".error").hide();

  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (const item of tweets) {
      const tweetElement = createTweetElement(item);
      $("#tweets-container").prepend(tweetElement);
    }
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  loadTweets();
  $(".text-error").hide();


  const createTweetElement = function(tweet) {
    let $tweet = $(`
  <article class="tweet">
        <header class="tweet-header">
          <div class="user-profile">
            <img class="avatar" src="${tweet.user.avatars}"></img> 
            <h4 class="tweeter-name">${tweet.user.name}</h4>
          </div>
          <div>
            <h4 class="user-handle">${tweet.user.handle}</h4>
          </div>
        </header>
        <div class="tweet-text">
          ${escape(tweet.content.text)}
        </div>
        <footer class="tweet-footer">
          <span class="tweet-date">${timeago.format(tweet.created_at)}</span>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>`);
    return $tweet;
  };

  

  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const $textLength = $(this).find("#tweet-text").val().length;
  
    if (!$textLength) {
      $(".text-error").text("Your Tweet is too short!");
      $(".text-error").slideDown("slow");
      $(".text-error").delay(2500).slideUp("slow");
    } else if ($textLength > 140) {
      $(".text-error").text("Your Tweet is too long!");
      $(".text-error").slideDown("slow");
      $(".text-error").delay(2500).slideUp("slow");
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data: $(this).serialize(),
      }).then(() => {
        loadTweets();
        $("#tweet-text").val("");
        $(".counter").text(140);
      });
    }
  });
});