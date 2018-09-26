console.log('Hello World');

const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');

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
    console.log(roar);
    form.style.display = 'none';
    loadingElement.style.display = '';

});