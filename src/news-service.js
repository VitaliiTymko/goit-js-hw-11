import Notiflix from 'notiflix';
import LoadMoreBtn from './css/load-more-btn';
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',  
});
export default class NewsApiService {
  constructor() {
    this.query = '';
    this.page = 1;
    this.card = 40;
  }

  fetchArticles() {
    console.log('До запроса: ', this);
    return fetch(
      `https://pixabay.com/api/?key=31423589-05a77bf58d80d41712d5d29e1&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    )
      .then(responce => responce.json())
      .then(data => {
        console.log('DATA: ', data);
        if (this.page === 1) {
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
        }
        this.page += 1;
        this.card += data.hits.length;
        console.log('После запроса если все ок: ', this);
        console.log('После запроса если все ок: кол-во карт', this.card);
        if (this.card >= data.totalHits) {
          Notiflix.Notify.failure(
            `We're sorry, but you've reached the end of search results.`,
            loadMoreBtn.hide(),
          );
        }
        return data.hits;
      });
    console.log('totalHits ', data.totalHits);
  }

  resetPage() {
    this.page = 1;
  }

  get searchQuery() {
    return this.query;
  }

  set searchQuery(newQuery) {
    this.query = newQuery;
  }
}
