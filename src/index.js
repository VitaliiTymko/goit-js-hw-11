import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import NewsApiService from './news-service';
// const DEBOUNCE_DELAY = 300;

const refs = {
  searchForm: document.querySelector('.search-form'),
  articlesContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let currentHits = 0;
const newsApiService = new NewsApiService();

console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearche);
refs.loadMoreBtn.addEventListener('click', onLoadMore);



function onSearche(event) {
  event.preventDefault();

  newsApiService.searchQuery = event.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(appendHitsMarkup);  
};

function onLoadMore() {
    newsApiService.fetchArticles().then(appendHitsMarkup);
};

function appendHitsMarkup(hits) {
    console.log('hits.likes', hits[19].likes);

    currentHits += hits.length;
  const mark = hits.reduce((acc, element) => {
    acc += `<div class="photo-card" width="400px">
        <a href="${element.largeImageURL}">
           <img class="photo-img" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
           </a>
           <div class="info">
             <p class="info-item">
               <b>Likes</b>
               ${element.likes}
             </p>
             <p class="info-item">
               <b>Views</b>
               ${element.views}
             </p>
             <p class="info-item">
               <b>Comments</b>
               ${element.comments}
             </p>
             <p class="info-item">
               <b>Downloads</b>
               ${element.downloads}
             </p>
           </div>
        </div>`;

    return acc;
  }, '');
  return mark;
}

// function onFetch() {
//     fetch('https://pixabay.com/api/?key=31423589-05a77bf58d80d41712d5d29e1&q=women&image_type=photo&per_page=40&page=2')
//     .then(r=> r.json())
//     .then(console.log())
// }

// onFetch();
