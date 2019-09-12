let breed = [
    "schipperke",
    "corgi",
    "bostonTerrier",
    "chihuahua",
    "pug",
    "jackRussell",
    "germanShepherd",
    "norfolkTerrier"
]

$("button").on("click", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    const breed = $(this).attr("data-breed").replace(' ', '-');

    console.log(breed);

    // Constructing a URL to search Giphy for the name of the person who said the quote
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      breed + "&api_key=uwpbX1inV0fpeYT8iVG75MVHBWB8Hgub&limit=10";

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function(response) {
          
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

            // Giving the image tag an src attribute of a proprty pulled off the
            // result item
            breedImage.attr("src", results[i].images.fixed_height.url);

            // Appending the paragraph and personImage we created to the "gifDiv" div we created
            gifDiv.append(p);
            gifDiv.append(breedImage);

            // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            $("#gifs-appear-here").prepend(gifDiv);
          }
        }
      });
  });