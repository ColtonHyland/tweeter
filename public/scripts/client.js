/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(() => {

  //renders existing tweets using ajax promise
  const loadTweets = function () {
    $.ajax("/tweets").then(function (tweets) {
      renderTweets(tweets);
    });
  };

  //render tweets and hide our error response
  loadTweets();
  $(".error").hide();

  //tweets are identified and placed into out tweet container
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (const item of tweets) {
      const tweetElement = createTweetElement(item);
      $("#tweets-container").prepend(tweetElement);
    }
  };

  //leaves html writing and place, creates element node and a text node
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //hides error response and loads tweets
  loadTweets();
  $(".text-error").hide();

  //html script filled out with identifiers of the node data for tweet
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

  
//submits a form depending on if something happens
  $("#new-tweet-form").submit(function(event) {
    event.preventDefault();
    const $textLength = $(this).find("#tweet-text").val().length;
  
    //checks for an error and sends commands to summon and error message
    if (!$textLength) {
      $(".text-error").text("Your Tweet is too short!");
      $(".text-error").slideDown("slow");
      $(".text-error").delay(2500).slideUp("slow");
    } else if ($textLength > 140) {
      $(".text-error").text("Your Tweet is too long!");
      $(".text-error").slideDown("slow");
      $(".text-error").delay(2500).slideUp("slow");
    } else { //ajax promise fetches tweets
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