// DOM
const modal = document.querySelector('.modal');
const newBookBtn = document.querySelector('.new-book');
const overlay = document.querySelector('.overlay');
const cancelBtn = document.querySelector('.cancel');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const page = document.querySelector('#number');
const checkBox = document.querySelector('#status');
const submitBtn = document.querySelector('#submit');
// to insert books
const mainContainer = document.querySelector('.books');
// save the instances of Book
let myLibrary = [];

// open form to add new book
function openModal() {
    modal.removeAttribute('id', 'popup');
    overlay.setAttribute('id', 'overlay');
}

// close the new book form
function closeModal() {
    modal.setAttribute('id', 'popup');
    overlay.removeAttribute('id', 'overlay');
}

// reset form variables
function resetForm() {
    title.value = '';
    author.value = '';
    page.value = '';
    checkBox.checked = false;
}

// remove book
function removeBook(e) {
    let parent = e.target.parentNode;/* get the parent node of remove button */
    if (e.target.classList.value === 'remove') {
        myLibrary.splice(Number(parent.id), 1);/* remove book from array */
        mainContainer.removeChild(parent);
        addBookToLibrary(myLibrary);/* run the loop again to update id */
    }
}

// update the reading status
function updateReadingStatus(e) {
    let parent = e.target.parentNode;
    let index = Number(parent.id);
    if (e.target.classList.value === 'status') {
        if (myLibrary[index].showStatus() === 'read') {
            e.target.textContent = 'not read';
            myLibrary[index].showStatus = function () {
                return 'not read';
            }
            addBookToLibrary(myLibrary);
        }

        else {
            e.target.textContent = 'read';
            myLibrary[index].showStatus = function () {
                return 'read';
            }
            addBookToLibrary(myLibrary);
        }
    }
}

// make a new instance and push it into array
function createBookObj() {
    myLibrary.push(new Book(title.value, author.value, page.value, checkBox.checked));
}

// book class
class Book {
    constructor(title, author, page, cbStatus) {
        this.title = title;
        this.author = author;
        this.page = page;
        this.cbStatus = cbStatus;
    }
    showStatus() {
        return this.cbStatus ? 'read' : 'not read';
    }
}

// iterate over array and display the book
function addBookToLibrary(arr) {
    mainContainer.textContent = ''; /* clear main container */
    for (let i = 0; i < arr.length; i++) {
        makeBook(arr[i]);
    };
}

// create a book
function makeBook(obj) {
    let bookContainer = document.createElement('div');
    bookContainer.classList.add('book');
    bookContainer.setAttribute('id', `${myLibrary.indexOf(obj)}`);

    let title = document.createElement('p');
    title.textContent = obj.title;

    let author = document.createElement('p');
    author.textContent = obj.author;

    let page = document.createElement('p');
    page.textContent = obj.page;

    let statusBtn = document.createElement('button');
    statusBtn.textContent = obj.showStatus();
    statusBtn.classList.add('status');

    let removeBtn = document.createElement('button');
    removeBtn.textContent = 'remove';
    removeBtn.classList.add('remove');

    bookContainer.append(title, author, page, statusBtn, removeBtn);
    mainContainer.appendChild(bookContainer);
}

// events
newBookBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);
submitBtn.addEventListener('click', () => {
    if (title.value !== '' && author.value !== '' && page.value !== '') {
        createBookObj();
        addBookToLibrary(myLibrary);
        resetForm();
        closeModal();
    }
});

document.addEventListener('click', (e) => {
    removeBook(e);
});

document.addEventListener('click', (e) => {
    updateReadingStatus(e);
});

// current year
let currentYear = new Date().getFullYear();
document.querySelector('.year').textContent = currentYear;





