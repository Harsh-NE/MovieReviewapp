import { API_KEY } from '/config.js'
const searchBtn = document.getElementById("search_btn");
const movieDetails = document.getElementById("movie-details");
console.log(API_KEY);
movieDetails.innerHTML = `<br><h1><strong>Rate. Review. Discover</strong><h1>`;
searchBtn.addEventListener("click", () => {
    const movieTitle = document.getElementById("movie-title").value.trim();
    console.log(movieTitle);
    if (movieTitle === "") {
        movieDetails.innerHTML = "<p>Please enter a movie title.</p>";
        return;
    }

    fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                console.log(data.Title);
                movieDetails.innerHTML = `
                    <div class="data">
                    <img src="${data.Poster}" id="image" alt="${data.Title} Poster">
                    <div class="descr">
                    <h2>${data.Title}</h2>
                    <p><strong>Year:</strong> ${data.Year}</p>
                    <p><strong>Genre:</strong> ${data.Genre}</p>
                    <p><strong>Plot:</strong> ${data.Plot}</p>
                    <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
                    </div>
                    </div>
                `;
            } else {
                movieDetails.innerHTML = `<p>${data.Error}</p>`;
            }
        })
        .catch(() => {
            movieDetails.innerHTML = "<p>Something went wrong. Please try again.</p>";
        });
        window.onload = function() 
        { const image = document.getElementById('image');
        image.style.width = window.innerWidth * 0.8 + 'px'; 
        };
        window.onresize = function() 
        { 
        const image = document.getElementById('image');
        image.style.width = window.innerWidth * 0.8 + 'px'; 
        };
});
