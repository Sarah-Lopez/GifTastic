const breeds = [
  "Schipperke",
  "Corgi",
  "Boston Terrier",
  "Chihuahua",
  "Pug",
  "Jack Russell",
  "German Shepherd",
  "Norfolk Terrier",
  "Golden Retriever",
  "Maltese"
]

$("#buttons-toolbar").on("click", ".breed-btn", function () {
  // In this case, the "this" keyword is the button that was clicked
  console.log("clicked")
  const breed = $(this).attr("data-breed");
  console.log(breed);

  // URL to search Giphy for the breed.
  const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    breed + "&api_key=uwpbX1inV0fpeYT8iVG75MVHBWB8Hgub&limit=10";

  // AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function (response) {
      // Storing an array of results in the results variable
      const results = response.data;
      console.log(results);
      // Looping over every result item
      for (let i = 0; i < results.length; i++) {
        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div for the gif
          const gifDiv = $("<div>");
          // Storing the result item's rating
          const rating = results[i].rating;
          // Creating a paragraph tag with the result item's rating
          const p = $("<p>").text("Rating: " + rating);
          // Creating an image tag
          const breedImage = $("<img>");
          // Giving the image tag a src attribute of a proprty pulled off the
          // result item
          breedImage.attr("src", results[i].images.fixed_height.url);
          // Appending the paragraph and breedImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(breedImage);
          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
});

// $(document).on('click', '.searchButton', function(){   function for pausing images
// $('#searches').empty();
// const type = $(this).data('type');

// })


// This function handles events where a breed button is clicked
$('#add-breed').on('click', function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  let newBreed = $('#breed-input').eq(0).val();
  // Adding breed from the textbox to our array
  breeds.push(newBreed);
  // Calling renderButtons which handles the processing of our breed array
  renderButtons(breeds, '#buttons-toolbar', '.breed-btn');
  console.log(breeds)
})

function renderButtons() {
  console.log($("#buttons-toolbar"))
  // Deleting the breeds prior to adding new ones
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-toolbar").empty();
  console.log($("#buttons-toolbar"))
  // Looping through the array of breeds
  for (var i = 0; i < breeds.length; i++) {
    // Then dynamicaly generating buttons for each breed in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    const a = $("<button>");
    // Adding a class of breed-btn to our button
    a.addClass("breed-btn");
    // Adding a data-attribute
    a.attr("data-breed", breeds[i]);
    // Providing the initial button text
    a.text(breeds[i]);
    // Adding the button to the buttons-toolbar div
    $("#buttons-toolbar").append(a);
  }

}
// Calling the renderButtons function to display the intial buttons
renderButtons()