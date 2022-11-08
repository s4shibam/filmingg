// Import CSS File
import "./style.css";

// Import API KEY
import apiKey from "./apiKey.js";

// Import required files
import imageNotFound from "./public/image_not_found.png";
import starImage from "./public/star.png";

// Declare variables
let x = apiKey.length;
let posterImage = null;
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Function to fetch data from API
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey.substring(
    1,
    x
  )}`;

  if (movieName.length <= 0) {
    result.innerHTML = `<div class="msg my-6 text-xl sm:text-2xl text-center text-white">Enter a valid Movie name!</div>`;
  } else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        // Movie Exists in Database
        if (data.Response == "True") {
          if (data.Poster != "N/A") posterImage = data.Poster;
          else posterImage = imageNotFound;

          result.innerHTML = `

            <div class="info mt-3 gap-2 flex flex-col sm:flex-row ">

                <div class="flex justify-center items-center">

                  <a href="https://www.google.com/search?q=${data.Title}+${
            data.Year
          }" target="_blank">
                      <img src=" ${posterImage} " class="poster m-auto sm:m-0 w-auto sm:w-full rounded-lg max-h-40 xsm:max-h-48 sm:max-h-96" />
                  </a>

                </div>

                <div class="basicDetails flex flex-col justify-center items-center w-full sm:w-8/12">

                    <h2 class="text-center mt-2 text-lg xsm:text-2xl sm:text-4xl font-bold tracking-wider"> ${
                      data.Title
                    } </h2>

                    <div class="rating my-2 flex justify-center items-center gap-2">

                        <img src="${starImage}" class="w-5">

                        <h4 class="pt-0.5 inline-block font-xl font-semibold tracking-widest"> ${
                          data.imdbRating
                        } </h4>

                    </div>

                    <div class="otherDetails my-2 flex justify-center items-center gap-3 text-gray-300 text-sm xsm:text-base font-normal">

                        <span> ${data.Year} </span>
                        |
                        <span> ${data.Rated} </span>
                        |
                        <span> ${data.Runtime} </span>

                    </div>

                    <div class="genre mb-1 flex justify-around flex-wrap w-full ">

                        <div class="genre-div"> ${data.Genre.split(",").join(
                          '</div><div class="genre-div">'
                        )} </div>

                    </div>

                </div>
            </div>

            <h3 class="mt-2 xsm:mt-3 sm:mt-5 text-sm xsm:text-base sm:text-lg font-medium text-[#f2aa4cff]">Director:</h3>
            <p class="text-xs xsm:text-sm sm:text-base font-light text-justify "> ${
              data.Director
            } </p>

            <h3 class="mt-2 xsm:mt-3 sm:mt-5 text-sm xsm:text-base sm:text-lg font-medium text-[#f2aa4cff]">Language:</h3>
            <p class="text-xs xsm:text-sm sm:text-base font-light text-justify "> ${
              data.Language
            } </p>

            <h3 class="mt-2 xsm:mt-3 sm:mt-5 text-sm xsm:text-base sm:text-lg font-medium text-[#f2aa4cff]">Cast:</h3>
            <p class="text-xs xsm:text-sm sm:text-base font-light text-justify"> ${
              data.Actors
            } </p>

            <h3 class="mt-2 xsm:mt-3 sm:mt-5 text-sm xsm:text-base sm:text-lg font-medium text-[#f2aa4cff]">Plot:</h3>
            <p class="text-xs xsm:text-sm sm:text-base font-light text-justify"> ${
              data.Plot
            } </p>
                
            `;
        }

        // Movie does NOT exist in database
        else {
          result.innerHTML = `<div class="msg my-6 text-xl sm:text-2xl text-center text-white"> ${data.Error} </div>`;
        }
      })

      // Any type of Error occurs
      .catch(() => {
        result.innerHTML = `<div class="msg my-6 text-xl sm:text-2xl text-center text-white"> Error Occurred! </div>`;
      });
  }
};

// Search on button (Search) press
searchBtn.addEventListener("click", getMovie);

// Search on "Enter" key press
movieNameRef.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});
