const modal = document.querySelector('.modal');
const newBookBtn = document.querySelector('.new-book');
const overlay = document.querySelector('.overlay');
const cancelBtn = document.querySelector('.cancel');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const page = document.querySelector('#number');
const checkBox = document.querySelector('#status');
const submitBtn = document.querySelector('#submit');
// to display books
const mainContainer = document.querySelector('.books');

// open form to add new book
newBookBtn.addEventListener('click', () => {
    modal.removeAttribute('id', 'popup');
    overlay.setAttribute('id', 'overlay');
});
// close the new book form
cancelBtn.addEventListener('click', () => {
    modal.setAttribute('id', 'popup');
    overlay.removeAttribute('id', 'overlay');
});

function Book(title, author, page, cbStatus) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.showStatus = function () {
        if (cbStatus) {
            return 'read';
        }
        else {
            return 'not read';
        }
    };
}
// save the instances of Book
const myLibrary = [];
submitBtn.addEventListener('click', () => {
    if (title.value !== '' && author.value !== '' && page.value !== '') {
        myLibrary.push(new Book(title.value, author.value, page.value, checkBox.checked));
        addBookToLibrary(myLibrary);
        title.value = '';
        author.value = '';
        page.value = '';
        checkBox.checked = false;
        modal.setAttribute('id', 'popup');
        overlay.removeAttribute('id', 'overlay');
    }
});

// iterate over array and display the book
function addBookToLibrary(arr) {
    mainContainer.textContent = '';
    for (let i = 0; i < arr.length; i++) {
        makeBook(arr[i]);
    };
}

function makeBook(obj) {
    const bookContainer = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const page = document.createElement('p');
    const statusBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    title.textContent = obj.title;
    author.textContent = obj.author;
    page.textContent = obj.page;
    statusBtn.textContent = obj.showStatus();
    removeBtn.textContent = 'remove';
    removeBtn.setAttribute('class', 'remove');
    bookContainer.append(title, author, page, statusBtn, removeBtn);
    mainContainer.appendChild(bookContainer);
    bookContainer.classList.add('book');
    // remove book
    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(obj), 1);
        mainContainer.removeChild(bookContainer);
    });
    // update the reading status
    statusBtn.addEventListener('click', () => {
        if (obj.showStatus() === 'read') {
            statusBtn.textContent = 'not read';
            myLibrary[myLibrary.indexOf(obj)].showStatus = function () {
                return 'not read';
            };
        }
        else {
            statusBtn.textContent = 'read';
            myLibrary[myLibrary.indexOf(obj)].showStatus = function () {
                return 'read';
            };
        }
    });
}

// current year
let currentYear = new Date().getFullYear();
document.querySelector('.year').textContent = currentYear;





