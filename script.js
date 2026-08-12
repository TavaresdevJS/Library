// DOM ELEMENTS
const newBookBtn = document.getElementById('new-book-btn');
const dialog = document.getElementById('new-book-dialog');
const form = document.getElementById('new-book-form');
const cancelBtn = document.getElementById('cancel-btn');
const tableEl = document.getElementById('library-body');

// Array that stores all books
let myLibrary = [];

// EVENT LISTENERS

// Open the dialog when "New Book" is clicked
newBookBtn.addEventListener('click', () => {
  dialog.showModal();
});

// Handle form submission (add a new book)
form.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = +document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  arrayLoop(); // Re-render the table
  dialog.close();
  form.reset(); // Clear the form
});

// Close the dialog when Cancel is clicked
cancelBtn.addEventListener('click', () => {
  dialog.close();
});

// Handle clicks inside the table (Remove + Toggle Read)
tableEl.addEventListener('click', e => {
  // Remove a book
  if (e.target.classList.contains('remove-btn')) {
    const row = e.target.closest('tr');
    const bookId = row.dataset.id;
    myLibrary = myLibrary.filter(book => book.id !== bookId);
    arrayLoop();
  }

  // Toggle Read / Not Read
  if (e.target.classList.contains('toggle-read-btn')) {
    const row = e.target.closest('tr');
    const bookId = row.dataset.id;
    const book = myLibrary.find(book => book.id === bookId);

    if (book) {
      book.toggleRead(); // Flip true ↔ false
      arrayLoop(); // Re-render the table
    }
  }
});
// FUNCTIONS

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

// Create a new book and add it to the library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// Render all books in the table
function arrayLoop() {
  tableEl.innerHTML = '';

  myLibrary.forEach(book => {
    const tr = document.createElement('tr');
    tr.dataset.id = book.id;
    tr.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td>
      <button class="read-status ${book.read ? 'read-yes' : 'read-no'} toggle-read-btn">
        ${book.read ? 'Read' : 'Not Read'}
      </button>
    </td>
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
