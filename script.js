const newBookBtn = document.getElementById('new-book-btn');
const dialog = document.getElementById('new-book-dialog');
const form = document.getElementById('new-book-form');
const cancelBtn = document.getElementById('cancel-btn');
const tableEl = document.getElementById('library-body');

let myLibrary = [];

newBookBtn.addEventListener('click', () => {
  dialog.showModal();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = +document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  addBookToLibrary(title, author, pages, read);
  arrayLoop();
  dialog.close();
  form.reset();
});

cancelBtn.addEventListener('click', () => {
  dialog.close();
});

tableEl.addEventListener('click', e => {
  if (e.target.classList.contains('remove-btn')) {
    const row = e.target.closest('tr');
    const bookId = row.dataset.id;
    myLibrary = myLibrary.filter(book => book.id !== bookId);
    arrayLoop();
  }
});

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

function arrayLoop() {
  tableEl.innerHTML = '';

  myLibrary.forEach(book => {
    const tr = document.createElement('tr');
    tr.dataset.id = book.id;
    tr.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>${book.read}</td>
    <td><button class="remove-btn">Remove</button></td>`;
    tableEl.appendChild(tr);
  });
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 310, true);
console.log(myLibrary);
arrayLoop();
