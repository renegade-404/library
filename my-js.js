const myLibrary = [];
const columnNames = ['Name', 'Author', 'Pages', 'Read'];
const tableButton = document.body.querySelector(".create-table");
const addLibButton = document.body.querySelector(".add-to-lib");
const buttons = document.body.querySelectorAll('button');

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
    tr.style.position = 'relative';
    tbody.appendChild(tr);
    const removeButton = document.createElement('button');
    removeButton.innerText = "-";
    

    const latestBook = myLibrary[myLibrary.length - 1];
    
    for (let text in latestBook) {    
      if (text == "id") continue;
      let data = document.createElement('td');
      data.innerText = latestBook[text];
      tr.appendChild(data); 
      tr.appendChild(removeButton);
      removeButton.classList.add('book-remove', `${latestBook.name}`);
      tr.classList.add(`${latestBook.name}`);
  }

  removeButton.addEventListener('click', (e)=> {
    for (let i = 0; i < myLibrary.length; i++) {
      if (e.target.classList.contains(myLibrary[i].name)) {
        myLibrary.splice(i, 1);
        tbody.removeChild(tr);
      }
    }
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

