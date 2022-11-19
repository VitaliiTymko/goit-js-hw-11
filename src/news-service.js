export default class NewsApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  fetchArticles() {
    console.log('До запроса: ',this);
    return fetch(
      `https://pixabay.com/api/?key=31423589-05a77bf58d80d41712d5d29e1&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    )
      .then(r => r.json())
      .then(data => {
        console.log('DATA: ',data);
        this.page +=1;

        console.log('После запроса если все ок: ',this);

        return data.hits;
      });
  }

resetPage() {
    this.page = 1;
}

  get searchQuery () {
    return this.query;
  }

  set searchQuery (newQuery) {
    this.query = newQuery;
  }
}
