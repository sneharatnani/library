let modal = document.querySelector('.modal');
let newBookBtn = document.querySelector('.new-book');
newBookBtn.addEventListener('click', () => {
    modal.removeAttribute('id', 'popup');
});

let myLibrary = [];

