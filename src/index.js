import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import NewsApiService from './news-service';
import LoadMoreBtn from './css/load-more-btn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  articlesContainer: document.querySelector('.gallery'),
  // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });

console.log('loadMoreBtn', loadMoreBtn);

// loadMoreBtn.enable();

refs.searchForm.addEventListener('submit', onSearche);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore); 

function onSearche(event) {
  event.preventDefault();
  clearArticlesContainer();
  newsApiService.searchQuery = event.currentTarget.elements.searchQuery.value;
  if (newsApiService.searchQuery === '') {
    Notiflix.Notify.failure(`Enter what you want to find`);
    return;
  }

  newsApiService.resetPage();
  newsApiService.fetchArticles().then(hits => {
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
      loadMoreBtn.hide();
      
      return;
    }
    loadMoreBtn.show();
    appendHitsMarkup(hits);
    lightbox.refresh();
  });
}

function onLoadMore() {
  newsApiService.fetchArticles().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  // console.log('hits.likes', hits[19].likes);
  refs.articlesContainer.insertAdjacentHTML('beforeend', createCard(hits));
}

function createCard(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return ` 
    <div class="photo-card">
    <a class="gallery__item" href="${largeImageURL}" >
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}
      </p>
      <p class="info-item">
        <b>Views</b>${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </div>
  `;
      }
    )
    .join('');
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}




