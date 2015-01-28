$(document).ready(function() {
	// Hide the tweet submit and character count elements
	$("#tweet-submit").hide();
	$("#char-count").hide();

	

    // On focus of tweet text, double the size and show the tweet submit
    // character count
	$("#tweet-content > .tweet-compose").on("focus", function() {
		$(this).animate({ height: "4em" }, 500);
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
    var $charCount = $("#char-count");
    var $submitButton = $("#tweet-submit");
    var $textBox = $("#tweet-content > .tweet-compose");

    var remaining = 140 - $textBox.val().length;
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
	var $profileImg = $("#profile-summary").find(".avatar").val();
	var $textBoxVal = $("#tweet-content > .tweet-compose").val();

	console.log($profileImg);
	var tweetText = '<img class="avatar" src="' + $profileImg + '" /><strong class="fullname">My BFF</strong><span class="username">@mybff</span><p class="tweet-text">' + $textBoxVal + '</p>';
	$("#stream").find(".content").prepend(tweetText);
	//console.log(tweetText);

}

