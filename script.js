document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '8de6e80c';
    const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;
    
    const searchInput = document.getElementById('search-input');
    const clearSearchBtn = document.getElementById('clear-search');
    const moviesContainer = document.getElementById('movies-container');
    const noResults = document.getElementById('no-results');
    const yearFilter = document.getElementById('year-filter');

    let allMovies = [];

    init();

    async function init() {
        setupEventListeners();
        await fetchPopularMovies();
        searchInput.focus();
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }

    function setupEventListeners() {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchMovies(searchInput.value.trim());
        });

        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.focus();
            clearSearchBtn.classList.remove('visible');
            fetchPopularMovies();
            yearFilter.value = '';
        });

        searchInput.addEventListener('input', () => {
            clearSearchBtn.classList.toggle('visible', searchInput.value.length > 0);
        });

        yearFilter.addEventListener('change', filterByYear);
    }

    async function fetchPopularMovies() {
        showLoading();
        try {
            const response = await fetch(`${BASE_URL}&s=movie&type=movie`);
            const data = await response.json();
            
            if (data.Response === "True") {
                allMovies = await Promise.all(
                    data.Search.slice(0, 8).map(movie => fetchMovieDetails(movie.imdbID))
                );
                displayMovies(allMovies);
                updateYearFilter();
            } else {
                showNoResults();
            }
        } catch (error) {
            showError('Ошибка загрузки');
        }
    }

    async function fetchMovieDetails(id) {
        const response = await fetch(`${BASE_URL}&i=${id}`);
        return await response.json();
    }

    async function searchMovies(query) {
        showLoading();
        try {
            const response = await fetch(`${BASE_URL}&s=${query}&type=movie`);
            const data = await response.json();
            
            if (data.Response === "True") {
                allMovies = await Promise.all(
                    data.Search.map(movie => fetchMovieDetails(movie.imdbID))
                );
                displayMovies(allMovies);
                updateYearFilter();
            } else {
                showNoResults();
            }
        } catch (error) {
            showError('Ошибка поиска');
        }
    }

    function displayMovies(movies) {
        moviesContainer.innerHTML = '';
        noResults.style.display = 'none';
        
        if (!movies || movies.length === 0) {
            showNoResults();
            return;
        }

        movies.forEach(movie => {
            const card = createMovieCard(movie);
            setupCardInteractivity(card, movie);
            moviesContainer.appendChild(card);
        });
    }

    function createMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.dataset.year = movie.Year;
        
        card.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" 
                 alt="${movie.Title}"
                 class="movie-poster"
                 onerror="this.src='https://via.placeholder.com/300x450?text=Poster+Error'">
            <div class="movie-info">
                <h3>${movie.Title} <span class="expand-icon">+</span></h3>
                <p>${movie.Year} • ${movie.Type}</p>
                ${movie.imdbRating ? `<p><i class="fas fa-star"></i> ${movie.imdbRating}</p>` : ''}
                <div class="movie-details">
                    <p class="movie-plot">${movie.Plot || 'No description available'}</p>
                    <p><strong>Director:</strong> ${movie.Director || 'N/A'}</p>
                    <p><strong>Actors:</strong> ${movie.Actors || 'N/A'}</p>
                    <p><strong>Runtime:</strong> ${movie.Runtime || 'N/A'}</p>
                </div>
            </div>
        `;
        
        return card;
    }

    function setupCardInteractivity(card) {
        const expandIcon = card.querySelector('.expand-icon');

        card.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.toggle('expanded');
            expandIcon.textContent = card.classList.contains('expanded') ? '-' : '+';
        });

        // Закрытие при клике вне карточки
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.movie-card')) {
                document.querySelectorAll('.movie-card.expanded').forEach(c => {
                    c.classList.remove('expanded');
                    c.querySelector('.expand-icon').textContent = '+';
                });
            }
        });
    }

    function updateYearFilter() {
        const years = [...new Set(allMovies.map(movie => movie.Year.substring(0, 4)))].sort((a, b) => b - a);
        yearFilter.innerHTML = '<option value="">All Years</option>';
        
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
    }

    function filterByYear() {
        const year = yearFilter.value;
        const filtered = year ? allMovies.filter(movie => movie.Year.startsWith(year)) : allMovies;
        displayMovies(filtered.length ? filtered : allMovies);
    }

    function showLoading() {
        moviesContainer.innerHTML = '<div class="loading">Loading movies...</div>';
        noResults.style.display = 'none';
    }

    function showNoResults() {
        moviesContainer.innerHTML = '';
        noResults.style.display = 'block';
    }

    function showError(message) {
        moviesContainer.innerHTML = `<div class="error">${message}</div>`;
    }
});
