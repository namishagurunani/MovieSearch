//  for API integration and debouncing
 const API_KEY = '1ca6ed19';
 const searchInput = document.getElementById('searchInput');
 const movieList = document.getElementById('movieList');
 const detailsPage = document.getElementById('detailsPage');
 let debounceTimeout;

 // Function to fetch movie data from the OMDB API
 async function fetchMovies(query) {
     try {
         const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
         const data = await response.json();
         return data.Search || [];
     } catch (error) {
         console.error('API Error:', error);
         return [];
     }
 }
 

 // Function to display movie search results
function displayMovies(movies) {
    movieList.innerHTML = '';
    if (movies.length === 0) {
        movieList.innerHTML = 'No results found.';
        return;
    }
    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';

        // Check if the poster is "N/A" and display a default image or message
        if (movie.Poster !== "N/A") {
            movieCard.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
                <button data-id="${movie.imdbID}">More Info</button>
            `;
        } else {
            movieCard.innerHTML = `
                <div class="no-poster">
                    <p>No poster available</p>
                </div>
            `;
        }
        movieList.appendChild(movieCard);
    });
}
// Function to fetch detailed movie data by IMDb ID
async function fetchMovieDetails(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

 // Function to fetch movie data from the OMDB API
        async function fetchMovies(query) {
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
                const data = await response.json();
                return data.Search || [];
            } catch (error) {
                console.error('API Error:', error);
                return [];
            }
        }

        // Function to fetch detailed movie data by IMDb ID
        async function fetchMovieDetails(imdbID) {
            try {
                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('API Error:', error);
                return null;
            }
        }

        // Function to display movie details on the movie card
        function displayMovieDetailsOnCard(card, movie) {
            card.innerHTML = `
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title}</h2>
                <p>${movie.Year}</p>
                <p>${movie.Plot}</p>
                <p>Director: ${movie.Director}</p>
                <p>Cast: ${movie.Actors}</p>
                <p>Released: ${movie.Released}</p>
                <p>Ratings: ${movie.imdbRating}</p>
                <button onclick="hideDetails(this)">Close</button>
            `;
        }

        // Function to hide movie details on the movie card
        function hideDetails(button) {
            const card = button.parentElement;
            card.innerHTML = ''; // Remove the details
        }

        // Event listener for the search input
        searchInput.addEventListener('input', async () => {
            const query = searchInput.value;
            const movies = await fetchMovies(query);
            displayMovies(movies);
        });

        // Function to display movie cards
        function displayMovies(movies) {
            movieList.innerHTML = '';
            if (movies.length === 0) {
                movieList.innerHTML = 'No results found.';
                return;
            }
            movies.forEach((movie) => {
                const movieCard = document.createElement('div');
                movieCard.className = 'movie-card';

                // Check if the poster is "N/A" and display a default image or message
                if (movie.Poster !== "N/A") {
                    movieCard.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title}">
                        <h2>${movie.Title}</h2>
                        <p>${movie.Year}</p>
                        <button data-id="${movie.imdbID}" onclick="showDetails(this)">More Info</button>
                    `;
                } else {
                    movieCard.innerHTML = `
                        <div class="no-poster">
                            <p>No poster available</p>
                        </div>
                    `;
                }
                movieList.appendChild(movieCard);
            });
        }

        // Function to show movie details on the movie card when the "More Info" button is clicked
        function showDetails(button) {
            const imdbID = button.getAttribute('data-id');
            fetchMovieDetails(imdbID)
                .then((movie) => {
                    if (movie) {
                        displayMovieDetailsOnCard(button.parentElement, movie);
                    }
                });
        }

 // Function to handle debouncing and search
 function handleDebouncedSearch() {
     const query = searchInput.value;
     if (debounceTimeout) {
         clearTimeout(debounceTimeout);
     }
     debounceTimeout = setTimeout(async () => {
         const movies = await fetchMovies(query);
         displayMovies(movies);
     }, 300); // Adjust the debounce delay as needed
 }

 // Event listeners
 searchInput.addEventListener('input', handleDebouncedSearch);
 movieList.addEventListener('click', (e) => {
     if (e.target.tagName === 'BUTTON') {
         const imdbID = e.target.getAttribute('data-id');
         // Add code to display movie details, including plot summaries, cast, release dates, and ratings.
     }
 });
 
//  for theme switching
        const themeSwitcher = document.getElementById('theme-switcher');
        const body = document.body;

        themeSwitcher.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
        });
