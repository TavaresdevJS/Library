const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, true);
console.log(myLibrary);

function arrayLoop() {
  const tableEl = document.getElementById('library-body');
  tableEl.innerHTML = '';

  myLibrary.forEach(book => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.read}</td>
    <td><button>Remove</button></td>`;
  });
}
