const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

function displayBooks() {
  const booksContainer = document.getElementById('booksContainer');
  booksContainer.innerHTML = ''; // Clear existing books

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const bookCard = document.createElement('div');
    bookCard.classList.add('bookCard');
    bookCard.dataset.index = i; // Associate DOM element with book object

    const title = document.createElement('h2');
    title.textContent = book.title;
    bookCard.appendChild(title);

    const author = document.createElement('p');
    author.textContent = 'Author: ' + book.author;
    bookCard.appendChild(author);

    const pages = document.createElement('p');
    pages.textContent = 'Pages: ' + book.pages;
    bookCard.appendChild(pages);

    const read = document.createElement('p');
    read.textContent = 'Read: ' + (book.read ? 'Yes' : 'No');
    bookCard.appendChild(read);

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', removeBook);
    bookCard.appendChild(removeBtn);

    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.textContent = 'Toggle Read';
    toggleReadBtn.addEventListener('click', toggleReadStatus);
    bookCard.appendChild(toggleReadBtn);

    booksContainer.appendChild(bookCard);
  }
}

function removeBook(event) {
  const index = event.target.parentNode.dataset.index;
  myLibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(event) {
  const index = event.target.parentNode.dataset.index;
  myLibrary[index].read = !myLibrary[index].read;
  displayBooks();
}

// Event listeners
document.getElementById('newBookBtn').addEventListener('click', function() {
  document.getElementById('bookForm').style.display = 'block';
});

document.getElementById('bookDetailsForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);

  // Clear the form and hide it
  document.getElementById('bookForm').style.display = 'none';
  document.getElementById('bookDetailsForm').reset();
});

// Initial display
displayBooks();
