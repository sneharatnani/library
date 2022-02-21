function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.info = function (status) {
        return `${title} by ${author}, ${pages} pages, ${status}`;
    };
}

let a = new Book('harry potter', 'jrr', 700);
console.log(a.title);