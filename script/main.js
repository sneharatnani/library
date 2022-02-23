const modal = document.querySelector('.modal');
const newBookBtn = document.querySelector('.new-book');
newBookBtn.addEventListener('click', () => {
    modal.removeAttribute('id', 'popup');
    overlay.setAttribute('id', 'overlay');
});

const cancelBtn = document.querySelector('.cancel');
cancelBtn.addEventListener('click', () => {
    modal.setAttribute('id', 'popup');
    overlay.removeAttribute('id', 'overlay');
})

function Book() {
    this.title = title.value;
    this.author = author.value;
    this.page = page.value;
    this.status = function () {
        if (checkBox.checked) {
            return 'read';
        }
        else {
            return 'not read';
        }
    };
}

let myLibrary = [];
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const page = document.querySelector('#number');
const checkBox = document.querySelector('#status');
const submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', () => {
    if (title.value !== '' && author.value !== '' && page.value !== '') {
        myLibrary.push(new Book());
        addBookToLibrary(myLibrary[myLibrary.length - 1]);
        title.value = '';
        author.value = '';
        page.value = '';
        modal.setAttribute('id', 'popup');
        overlay.removeAttribute('id', 'overlay');
    }
});

function addBookToLibrary(obj) {
    const mainContainer = document.querySelector('.books');
    const bookContainer = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const page = document.createElement('p');
    const statusBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    title.textContent = obj.title;
    author.textContent = obj.author;
    page.textContent = obj.page;
    statusBtn.textContent = obj.status();
    removeBtn.textContent = 'remove';
    removeBtn.setAttribute('class', 'remove');
    bookContainer.append(title, author, page, statusBtn, removeBtn);
    mainContainer.appendChild(bookContainer);
    bookContainer.classList.add('book');

    removeBtn.addEventListener('click', () => {
        mainContainer.removeChild(bookContainer);
    });

    statusBtn.addEventListener('click', () => {
        if (statusBtn.textContent === 'read') {
            statusBtn.textContent = 'not read';
        }
        else {
            statusBtn.textContent = 'read';
        }
    });
}
// overlay
const overlay = document.querySelector('.overlay');




