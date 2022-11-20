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

console.log('loadMoreBtn', loadMoreBtn);

loadMoreBtn.hide();


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
    console.log('hits.length ', hits.length);
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query. Please try again.`
      );
      return;
    }
    appendHitsMarkup(hits);
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
    <a class="gallery__item" href="${largeImageURL}">
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

const lightbox = new SimpleLightbox('.gallery__item a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// const lightbox = {
//   init() {
//     this.lightbox = new SimpleLightbox('.photo-card a', {
//       captionsData: 'alt',
//       captionDelay: 250,
//       close: false,
//       showCounter: false,
//     });
//   },

//   refresh() {
//     this.lightbox.refresh();
//   },
// };

// function onFetch() {
//     fetch('https://pixabay.com/api/?key=31423589-05a77bf58d80d41712d5d29e1&q=women&image_type=photo&per_page=40&page=2')
//     .then(r=> r.json())
//     .then(console.log())
// }

// onFetch();
