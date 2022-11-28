import './css/styles.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  articlesContainer: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

refs.searchForm.addEventListener('submit', onSearch);

let page = 1;

function onSearch(event) {
  event.preventDefault();

  clearArticlesContainer();
  fetchMovieSearche().then(results => {
    if(results.length === 0) {
      console.log('введите значение');
    }
    appendHitsMarkup(results);
  });
}

function fetchMovieSearche() {
  const searchQuery = event.currentTarget.elements.query.value;

  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=19011014b9b53c4fd496d37c25f2b619&query=${searchQuery}&page=${page}&genre`
  )
    .then(r => r.json())
    .then(data => {
      console.log(data.results[0]);

      return data.results;
    });
}

function appendHitsMarkup(results) {
  console.log('original_title', results[0].original_title);
  console.log('Жанр', results[0].genre_ids[0].name);
  refs.articlesContainer.insertAdjacentHTML('beforeend', createCard(results));
}

function createCard(results) {
  return results
    .map(({ poster_path, 
      original_title, 
      id, 
      popularity,
      release_date,
      vote_count,
      genre_ids,
     }) => {
      return `
    <div class="photo-card">
    <h2> ${original_title} </h2>
    <img class="gallery__image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="movie"/>
    <div class="info">
    
      <p class="info-item">
        <b>Id</b>${id}
      </p>
      <p class="info-item">
        <b>Popularity
        </b>${popularity}
      </p>
      <p class="info-item">
        <b>Release_date</b>${release_date.slice(0, 4)}
      </p>
      <p class="info-item">
      <b>genre</b>${genre_ids[0]}
      </p>
    </div>
  </div>
  `;
    })
    .join('');
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}
// function clearArticlesContainer() {
//   refs.articlesContainer.innerHTML = '';
// }

// const API_KEY = '249f222afb1002186f4d88b2b5418b55';
// const BASE_URL = 'https://api.themoviedb.org/3';
// const TREND_URL = `${BASE_URL}/trending/movie/week`;
// const SEARCH_URL = `${BASE_URL}/search/movie`;
// const ID_URL = `${BASE_URL}/movie/`;

// export { API_KEY, BASE_URL, TREND_URL, SEARCH_URL, ID_URL };

// import axios from 'axios';
// import { createGenresFromID, createYear } from '../data/data-combine';
// import { API_KEY, TREND_URL, SEARCH_URL, ID_URL } from './api-vars';

// export default {
//   // Получение полной информации о трендах
//   async getTrendData(page) {
//     try {
//       const { data } = await axios.get(
//         `${TREND_URL}?api_key=${API_KEY}&page=${page}`,
//       );

//       return data;
//     } catch (error) {
//       console.error('Smth wrong with api get full trends' + error);
//     }
//   },

//   // Фетч по поисковому запросу
//   async fetchMovieSearcher(text, page) {
//     try {
//       const { data } = await axios.get(
//         `${SEARCH_URL}?api_key=${API_KEY}&query=${text}&page=${page}`,
//       );

//       return data;
//     } catch (error) {
//       console.error('Smth wrong with api search fetch' + error);
//     }
//   },

//   // Фетч фильма по его ID
//   async getMovieById(id) {
//     try {
//       const { data } = await axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);

//       const result = {
//         ...data,
//         year: createYear(data),
//         customGenres: createGenresFromID(data),
//       };

//       return result;
//     } catch (error) {
//       console.error('Smth wrong with api ID fetch' + error);
//     }
//   },
// };
