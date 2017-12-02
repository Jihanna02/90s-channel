$(document).ready(function(){

	//default artist channel buttons
	var artistChannel = ["jodeci", "boyz ii men", "tlc", "dru hill", "xscape"];

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

		var newArtist = $("#add-station").val();
		
		addButton(newArtist);
	});

	//function to make API call on click of buttons
	function makeGiphyMagic (artistName) {

		$("#giphy").empty();

		var apiURL = "https://api.giphy.com/v1/gifs/search?api_key=xYMoXqkxy5CwhMYVKmNgGpMzN5gPd5Lw&q="+artistName+"&limit=6&offset=0&rating=G&lang=en";


		$.ajax(
			url = apiURL,
			method = "GET" ).done(function(response){

				var results = response.data
				
				for(i=0; i < results.length; i++){
					var responseURL = response.data[i].images.fixed_height.url;
						//console.log(responseURL);
					var responseImg = $("<img>");
					$(responseImg).addClass("gif");
					$(responseImg).attr("src", responseURL);
					$("#giphy").append(responseImg);
				}
			});
	}

	$("#stations").on("click", "button", function(){
		var artistName = $(this).text();

		makeGiphyMagic(artistName);
	});

});