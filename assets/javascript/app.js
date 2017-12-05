$(document).ready(function(){

	//default artist channel buttons
	var artistChannel = ["jodeci", "boyz ii men", "tlc", "dru hill", "xscape", "lil' kim"];

	function makeButtons () {
		for (var i=0; i < artistChannel.length; i++) {
			var artistButton = $("<button>");
			$(artistButton).text(artistChannel[i]);
			$(artistButton).attr("id", i);
			$("#stations").append(artistButton);
		}
	}

	makeButtons();

	//function to add button on click of the submit button
	function addButton (newArtist) {
		$("#stations").empty();

		artistChannel.push(newArtist);

		makeButtons();
	}

	$("#submit").on("click", function(){
		event.preventDefault();

		var newArtist = $("#add-station").val().trim("");
		
		addButton(newArtist);

		var newArtist = $("#add-station").val("");

	});

	//function to make API call on click of buttons
	function makeGiphyMagic (artistName) {

		$("#giphy").empty();

		var apiURL = "https://api.giphy.com/v1/gifs/search?api_key=xYMoXqkxy5CwhMYVKmNgGpMzN5gPd5Lw&q="+artistName+"&limit=9&offset=0&rating=G&lang=en";


		$.ajax(
			url = apiURL,
			method = "GET" ).done(function(response){

				var results = response.data;
				
				for(i=0; i < results.length; i++){
					var animatedURL = response.data[i].images.fixed_height.url;
					var stillURL = response.data[i].images.fixed_height_still.url;

					var responseImg = $("<img>");
					$(responseImg).addClass("gif");
					$(responseImg).attr("data-state", "still");
					$(responseImg).attr("src", stillURL);
					$(responseImg).attr("data-still", stillURL);
					$(responseImg).attr("data-animate", animatedURL);

					$("#giphy").append(responseImg);
				}
			});
	}

	$("#stations").on("click", "button", function(){
		var artistName = $(this).text();

		$(".channel-select").text("Now Playing: ");
		$(".artist-select").text(artistName);

		$("button").removeClass("active");
		$(this).addClass("active");

		makeGiphyMagic(artistName);
	});


	$("#giphy").on("click",".gif", function(){

      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }

	});
});