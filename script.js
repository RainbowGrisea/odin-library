const myLibrary = [
  {
    title: 'Guns, Germs and Steel',
    author: 'Jared Diamond',
    pages: 480,
    read: true,
  },
  {
    title: 'The Sandman',
    author: 'Neil Gaiman',
    pages: 600,
    read: false,
  },
];


class Book {
  constructor( title, author, pages, read ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

// function NewBook(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

const addBookButton = document.querySelector('.addBookButton');
const openModalButton = document.querySelector('.openModalButton');
const closeModalButton = document.querySelector('.close');

openModalButton.addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'block';
});

closeModalButton.addEventListener('click', () => {
  document.querySelector('.modal').style.display = 'none';
  clearInput();
});

addBookButton.addEventListener('click', () => {
  addBookToLibrary();
  addLibraryToHTML();
  clearInput();
  document.querySelector('.modal').style.display = 'none';
});

function clearInput() {
  const inputs = document.querySelectorAll('input');
  for (let i = 0; i < inputs.length - 1; i++) {
    inputs[i].value = '';
  }
  inputs[inputs.length - 1].checked = false;
}

function addBookToLibrary() {
  const title = document.querySelector('#bookTitle').value;
  const author = document.querySelector('#bookAuthor').value;
  const pages = document.querySelector('#bookPages').value;
  const read = Boolean(document.querySelector('#bookRead').checked);
  myLibrary.push(new Book(title, author, pages, read));
}

function addLibraryToHTML() {
  const bookSection = document.querySelector('.bookSection');
  bookSection.textContent = '';
  index = 0;
  myLibrary.forEach((book) => {
    const newBook = document.createElement('div');
    newBook.classList.add('bookEntry');
    newBook.id = index;
    index += 1;
    for (property in book) {
      let newProperty;
      console.log(property);
      if (property !== 'read') {
        newProperty = document.createElement('div');
        newProperty == 'pages';
        newProperty.textContent =
          newProperty == 'pages' ? `${book[property]} pages` : book[property];
      } else {
        newProperty = document.createElement('button');
        newProperty.textContent = property === 'read' ? 'Read' : 'Not read';
        newProperty.classList.add('toggleButton');
        newProperty.addEventListener('click', () => {
          toggleRead.call(newProperty);
        });
      }
      newBook.appendChild(newProperty);
    }
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('removeButton');
    removeButton.addEventListener('click', () => {
      removeBook.call(removeButton);
    });
    newBook.appendChild(removeButton);
    bookSection.appendChild(newBook);
  });
}

function toggleRead() {
  if (this.textContent === 'Read') {
    this.textContent = 'Not read';
    myLibrary[this.parentElement.parentElement.id].read = false;
  } else {
    this.textContent = 'Read';
    myLibrary[this.parentElement.parentElement.id].read = true;
  }
}

function removeBook() {
  myLibrary.splice(this.parentElement.id, 1);
  this.parentElement.remove();
  rearrangeLibrary();
}

function rearrangeLibrary() {
  const books = document.querySelector('.bookSection').children;
  for (let i = 0; i < books.length; i++) {
    books[i].id = i;
  }
}

addLibraryToHTML();
