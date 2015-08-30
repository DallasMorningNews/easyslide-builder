$(document).ready(function() {


	$('#slideCounter').keyup(function() {
		var n = parseInt($('#slideCounter').val());
		console.log(n);
		var cutlines = '';

		for (i=1; i<=n; i++) {
			cutlines += "<h5>Cutline " + i + "</h5>";
			cutlines += "<input class='required form-control cutline' type='text' id='slideCounter' placeholder='Cutline goes here (Photographer name/Staff photographer' value='' >";
		}

		$('#cutlines').append(cutlines);
	})

	$('#submitButton').on('click', function() {

		var title = $('#slideTitle').val();
		var count = parseInt($('#slideCounter').val());
		var namesString = $('#imageNames').val().replace(/\s+/g, '');
		var sizesString = $('#imageSizes').val().replace(/\s+/g, '');;

		var namesArray = [];
		var sizesArray = [];

		var cutlines = [];

		var countNumber = isNaN(count);

		if (title.length === 0) {
			alert("Your slideshow needs a title");
		} else if (countNumber === true) {
			alert("You must enter a number of slides");
		} else if (namesString.length === 0) {
			alert("You must enter image names");
		} else if (sizesString.length === 0) {
			alert("You must list image sizes");
		} else {
			namesArray = namesString.split(',');
			sizesArray = sizesString.split(',');

			$.each($('.cutline'), function() {
				cutlines.push($(this).val());
			})
		}

		console.log(cutlines);

		if (count !== namesArray.length) {
			alert ("The number of slides must be equal to the number of image names")
		} else {
		

			var h = Math.round(sizesArray.length / 2);

			var srcsetArray = [];
			var srcArray = [];

			for (i=0; i<namesArray.length; i++) {

				set = '';
				srcArray[i] = "images/" + namesArray[i] + "_" + sizesArray[h] + ".jpg";

				for (j=0; j<sizesArray.length; j++) {

					if (j === (sizesArray.length - 1) ) {
						set += "images/" + namesArray[i] + "_" + sizesArray[j] + ".jpg " + sizesArray[j] + "w";
					} else {
						set += "images/" + namesArray[i] + "_" + sizesArray[j] + ".jpg " + sizesArray[j] + "w, ";
					}
				}

				srcsetArray[i] = set; 

			}

			console.log(srcsetArray)


			code = "<pre>&lt;div class='slideshow clearFix'&gt; \n";
			code += "\t&lt;h5&gt;Slideshow: " + title + "&lt;/h5&gt; \n";
			code += "\t&lt;div class='slideContainer'&gt;\n";

			for (i=0; i<count; i++) {
				if (i===0) {
					code += "\t\t&lt;div class='slide current' data-srcset='" + srcsetArray[0] + "' data-default='" + srcArray[0] + "'&gt; \n";
					code += "\t\t\t&lt;img srcset='" + srcsetArray[0] + "' sizes='(min-width: 1500px) 1400px, 90vw' src='" + srcArray[0] + "' alt='" + cutlines[0] + "' /&gt; \n";
					code += "\t\t\t&lt;p class='cutline'&gt;" + cutlines[0] + "&lt;/p&gt; \n";
					code += "\t\t&lt;/div&gt; \n";
				} else if (i===1) {
					code += "\t\t&lt;div class='slide preSlide' data-srcset='" + srcsetArray[1] + "' data-default='" + srcArray[1] + "'&gt; \n";
					code += "\t\t\t&lt;img srcset='" + srcsetArray[1] + "' sizes='(min-width: 1500px) 1400px, 90vw' src='" + srcArray[1] + "' alt='"+ cutlines[1] + "' /&gt; \n";
					code += "\t\t\t&lt;p class='cutline'&gt;"+ cutlines[1] + "&lt;/p&gt; \n";
					code += "\t\t&lt;/div&gt; \n";
				} else {
					code += "\t\t&lt;div class='slide preSlide' data-srcset='" + srcsetArray[i] + "' data-default='" + srcArray[i] + "'&gt; \n";
					code += "\t\t\t&lt;img srcset='' sizes='(min-width: 1500px) 1400px, 90vw' src='' alt='" + cutlines[i] + "' /&gt; \n";
					code += "\t\t\t&lt;p class='cutline'&gt;" + cutlines[i] + "&lt;/p&gt; \n";
					code += "\t\t&lt;/div&gt;\n";
				}
			};

			code += "\t\t&lt;img class='nextButton slideButton' src='images/buttonRight.svg' alt='Click to advance slideshow' /&gt; \n";
			code +=	"\t\t&lt;img class='previousButton slideButton' src='images/buttonLeft.svg' alt='Click to rewind slideshow' /&gt; \n";
			code += "\t&lt;/div&gt \n";
			code += "&lt;/div&gt;</pre>";

			$('.output').html(code);
		}
	})
})