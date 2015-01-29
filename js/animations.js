$(document).ready(function() {
	// Hide the tweet submit and character count elements
	$("#tweet-submit").hide();
	$("#char-count").hide();
	$(".tweet-actions").hide();
	//$(".stats").hide();
	$(".reply").hide();
	
     // On click of tweet, show the stats area - Retweets/timestamp/Reply
	 $(".tweet").click(function() {
	 	$(".retweets", this).css("display", "inline-block");
	 	$(".timestamp", this).show();
	 	$(".reply", this).show();
	 });

     // On dblclick of tweet, hide the stats area
	 $(".tweet").dblclick(function() {
	 	$(".retweets", this).css("display", "none");
	 	$(".timestamp", this).hide();
	 	$(".reply", this).hide();
	 });	

	$(".tweet").hover(
		function() {
			$(".tweet-actions", this).fadeIn(1000);
		},
		function() {
			$(".tweet-actions", this).fadeOut(500);
		}
	);

    // On focus of tweet text, double the size and show the tweet submit
    // character count
	$("#tweet-content > .tweet-compose").on("focus", function() {
		$(this).animate({ height: "5em" }, 200);
		$("#tweet-submit").show();
		$("#char-count").show();
	});

	// When the user clicks the tweet button, add to the main stream
	$("#tweet-submit").on("click", function() {
		addTweetStream();		
	});

	// As text is being entered, count down the number of characters
	$("#tweet-content > .tweet-compose").on("keypress, keydown, keyup", function() {
    	$(this).change(updateCharCount());
    	$(this).keyup(updateCharCount());
    }); 

});


function updateCharCount() {
    // 140 is the max message length
    var maxChars = 140;
    var $charCount = $("#char-count");
    var $submitButton = $("#tweet-submit");
    var $textBox = $("#tweet-content > .tweet-compose");

    var remaining = maxChars - $textBox.val().length;
    if (remaining <= 10) {
    	$charCount.css({ "color": "red"});
    } else {
    	$charCount.css({ "color": "#999"});
    }
    if (remaining <= 0) {
    	$submitButton.prop("disabled", true);
    } else {
    	$submitButton.prop("disabled", false);
    }

    $charCount.text(remaining);
}

function addTweetStream() {
	var $profileImg = $("#profile-summary > .content > .avatar").attr("src");
	//var $profileImg = $("#profile-summary > .content > .avatar")[0].src;
	var $fullName = $("#profile-summary > .content > .fullname").html();
	var $userName = $("#profile-summary > .content > .username").html();
	var $textBoxVal = $("#tweet-content > .tweet-compose").val();


	var content = "<div class=\"tweet\"><div class=\"content\">";
	var profile = "<img class=\"avatar\" src=\"" + $profileImg + "\"" + 
				  " /><strong class=\"fullname\">" + $fullName + 
				  "</strong><span class=\"username\">" + $userName + "</span>" +
				  "<p class=\"tweet-text\">" + $textBoxVal + "</p>";
	var actions = "<div class=\"tweet-actions\"><ul>" + 
				  "<li><span class=\"icon action-reply\"></span> Reply</li>" +
				  "<li><span class=\"icon action-retweet\"></span> Retweet</li>" +
				  "<li><span class=\"icon action-favorite\"></span> Favorite</li>" +
				  "<li><span class=\"icon action-more\"></span> More</li>" +
				  "</ul></div>";
	var stats = "<div class=\"stats\"><div class=\"retweets\">" +
				"<p class=\"num-retweets\">30</p><p>RETWEETS</p></div>" +
				"<div class=\"favorites\"><p class=\"num-favorites\">6</p>" +
				"<p>FAVORITES</p></div><div class=\"users-interact\"><div>" +
				"<img src=\"img/alagoon.jpg\" /><img src=\"img/vklimenko.jpg\" />" +
				"</div></div><div class=\"time\">1:04 PM - 19 Sep 13</div></div>";
	var reply = "<div class=\"reply\"><img class=\"avatar\" src=\"img/alagoon.jpg\" />" +
				"<textarea class=\"tweet-compose\" placeholder=\"Reply to @mybff\"/>" + 
				"</textarea></div>";
	var ending = "</div></div>";

//	console.log(content);
//	console.log(profile);
//	console.log(actions);
//	console.log(stats);
//	console.log(reply);
//	console.log(ending);
	
	
	var tweetContent = content + profile + actions + stats + reply + ending;
//	console.log("final", tweetContent);
	$("#stream").prepend(tweetContent);

}


