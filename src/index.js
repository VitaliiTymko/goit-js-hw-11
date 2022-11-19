import './css/styles.css';

const DEBOUNCE_DELAY = 300;

function onFetch() {
    fetch('https://pixabay.com/api/?key=31423589-05a77bf58d80d41712d5d29e1&q=women&image_type=photo')
    .then(r=> r.json())
    .then(console.log())
}

onFetch();