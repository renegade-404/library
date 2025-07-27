const myLibrary = [];
const columnNames = ['Name', 'Author', 'Pages', 'Read'];
const tableButton = document.body.querySelector(".create-table");
const addLibButton = document.body.querySelector(".add-to-lib");

const tableDiv = document.createElement('div');
tableDiv.classList.add('table-div');
document.body.appendChild(tableDiv);

function Book(arr) {
    this.id = crypto.randomUUID(),
    this.name = arr[0],
    this.author = arr[1],
    this.pages = arr[2],
    this.read = arr[3];
}

  function addBookToLibrary(arr) {
    book = new Book(arr);
    myLibrary.push(book);
  }

function createTable() {
    const table = document.createElement('table');
    tableDiv.appendChild(table);

    const thead = table.createTHead();
    const tbody = table.createTBody();
    
       
    for (let i = 0; i < columnNames.length; i++) {
        const header = document.createElement('th');
        header.setAttribute("scope", "col");
        const text = document.createTextNode(columnNames[i]);
        header.appendChild(text);
        thead.appendChild(header);
    }

}

function addToTable() {
  const tbody = document.querySelector('tbody');
  const tr = document.createElement('tr');
  tr.style.position = 'relative';
  tbody.appendChild(tr);

  const latestBook = myLibrary[myLibrary.length - 1];

  // Add book data
  for (let key in latestBook) {
    if (key === 'id') continue;

    const td = document.createElement('td');
    td.innerText = latestBook[key];
    tr.appendChild(td);
  }

  const unreadButton = document.createElement('button');
  unreadButton.innerText = 'unread';
  unreadButton.dataset.bookId = latestBook.id;
  unreadButton.classList.add('unread-book');
  tr.appendChild(unreadButton); 

  // Create and attach remove button
  const removeButton = document.createElement('button');
  removeButton.innerText = 'delete';
  removeButton.classList.add('book-remove');
  removeButton.dataset.bookId = latestBook.id; // more reliable than name!
  tr.appendChild(removeButton);

  removeButton.addEventListener('click', (e) => {
    const bookId = e.target.dataset.bookId;

    // Remove from array
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
      myLibrary.splice(index, 1);
    }

    // Remove row from DOM
    tbody.removeChild(tr);
  });
  
  unreadButton.addEventListener('click', (e) => {
    const tds = tr.children;
    const readTd = tds[3];
    const bookId = e.target.dataset.bookId;
    const index = myLibrary.findIndex(book => book.id === bookId);

    // change status
    myLibrary[index].read = myLibrary[index].read === "read" ? "unread" : "read";
    readTd.innerText = readTd.innerText === "read" ? "unread" : "read";
    unreadButton.innerText = unreadButton.innerText === "read" ? "unread" : "read";
  })
}

function addToLibrary() {
  const userInput = document.querySelector("#book-info").value.split(',');

  addBookToLibrary(userInput);
}

tableButton.addEventListener('click', () => {
    const existingTable = document.querySelector('table');

    if (!existingTable) {
        createTable();
        addToTable();
    }
    else addToTable();
});

addLibButton.addEventListener('click', addToLibrary);

