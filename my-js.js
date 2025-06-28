const myLibrary = [];
const columnNames = ['Name', 'Author', 'Pages', 'Read'];
const tableButton = document.body.querySelector(".create-table");
const addLibButton = document.body.querySelector(".add-to-lib");


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
    document.body.appendChild(table);

    const thead = table.createTHead();
    const tbody = table.createTBody();
    
       
    for (let i = 0; i < columnNames.length; i++) {
        let header = document.createElement('th');
        header.setAttribute("scope", "col");
        let text = document.createTextNode(columnNames[i]);
        header.appendChild(text);
        thead.appendChild(header);
    }

}

function addToTable() {
    const tbody = document.querySelector('tbody');
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    const latestBook = myLibrary[myLibrary.length - 1];
    
    for (let text in latestBook) {    
      if (text == "id") continue;
      let data = document.createElement('td');
      data.innerText = latestBook[text];
      tr.appendChild(data); 
  }

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

