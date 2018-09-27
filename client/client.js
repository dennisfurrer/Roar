console.log('Hello World');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:5000/roars';

loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const roar = {
        name,
        content
    };

    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(roar),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
    .then(createdRoar => {
        console.log(createdRoar);
        form.reset();
        loadingElement.style.display = 'none';
        form.style.display = '';

    });

});