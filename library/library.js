const overlay = document.querySelector('.overlay');
const myList = document.querySelector('.myList');
const addBtn = document.querySelector('.addBtn');
const closeBtn = document.querySelector('.closeBtn');
const addForm = document.querySelector('.addForm');
const submitBtn = document.querySelector('.submitBtn');


let myLibrary = [
  {
    id: 1, 
    img: 'https://m.media-amazon.com/images/I/91TwkWWSsiL._AC_UY654_FMwebp_QL65_.jpg',
    title: 'Such a Fun Age',
    author: 'Kiley Reid',
    pages: 295,
    read: false
  },
  {
    id: 2,
    img: 'https://m.media-amazon.com/images/I/41EiiyV9w4L.jpg',
    title: 'A Man',
    author: 'Keiichiro Hirano',
    pages: 322,
    read: true
  },
  {
    id: 3,
    img: 'https://m.media-amazon.com/images/I/41tjS2DPOZL._SX335_BO1,204,203,200_.jpg',
    title: 'Normal People',
    author: 'Sally Rooney',
    pages: 187,
    read: false
  }
];


//object constructor
function Book(id, img, title, author, pages, read) {
  this.id = id,
  this.img = img,
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}


//add a new book in to the array
function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  render();
}


//close & open a modal
function handleModal() {
  if(addForm.classList.contains('active')) {
    addForm.classList.remove('active');
    overlay.classList.remove('active');
  }else {
    addForm.classList.add('active');
    overlay.classList.add('active');
  }
}


//form submit function
function getBookFromForm(e) {
  e.preventDefault();

  //take all values from form
  let id = myLibrary.length + 1;
  let img = document.getElementById('img').value;
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('read').checked ? true : false;

  //form validate check, and push a new book to the array
  if(title === '') {
    alert('Fill the Title please');
  }else if(author === '') {
    alert('Fill the Author please');
  }else if(isNaN(pages) || pages === '') {
    alert('Page should be a Number');
  }else {
    addBookToLibrary(new Book(id, img, title, author, pages, read));

    //after add a book, close the modal.
    handleModal();
  }

  //clean the form
  document.getElementById('img').value = '';
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('read').checked = false;
}


//display my library on the screen
function render() {
  //clear the list
  while (myList.hasChildNodes()) {
    myList.removeChild(myList.lastChild);
  }

  //add books
  myLibrary.forEach(item => {
    const newItem = document.createElement('li');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.setAttribute('book-data-index', item.id);
    deleteBtn.addEventListener('click', deleteBookFromLibrary);

    const readBtn = document.createElement('button');
    readBtn.classList.add('readBtn');
    readBtn.setAttribute('book-data-index', item.id);
    readBtn.addEventListener('click', changeReadState);
    if(item.read) {
      readBtn.classList.add('active');
      readBtn.textContent = 'Read';
    }else {
      readBtn.textContent = 'Unread';
    }

    const bookImg = document.createElement('img');
    bookImg.classList.add('bookImg');
    bookImg.setAttribute('src', item.img);

    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('bookTitle');
    bookTitle.textContent = item.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.classList.add('bookAuthor');
    bookAuthor.textContent = item.author;

    const bookPages = document.createElement('p');
    bookPages.classList.add('bookPages');
    bookPages.textContent = `${item.pages} page`;

    myList.prepend(newItem);
    newItem.append(deleteBtn, bookImg, bookTitle, bookAuthor, bookPages, readBtn);
  })

  //create add button at the end of list
  const addBtn = document.createElement('li');
  addBtn.classList.add('addBtn');
  addBtn.textContent = '+';
  addBtn.addEventListener('click', handleModal);

  myList.appendChild(addBtn);
}


//delete book from my Library
function deleteBookFromLibrary() {
  //find a book's id you click
  const bookID = parseInt(this.attributes[1].value);

  //make a new array without that book
  myLibrary = myLibrary.filter(item => item.id !== bookID);

  render();
}


//change 'read' state
function changeReadState() {
  const bookID = parseInt(this.attributes[1].value);
  const theBook = myLibrary.filter(item => item.id === bookID)[0];

  if(theBook.read){
    theBook.read = false;
  }else {
    theBook.read = true;
  }

  render();
}


//event listeners
closeBtn.addEventListener('click', handleModal);
addForm.addEventListener('submit', getBookFromForm);


//first render
render();