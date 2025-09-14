import "./new-style.css";
import { validator } from "./validation-module";

class GameEntry {
  #game;
  #publisher;
  #genre;
  #played;

  constructor({ game, publisher, genre, played }) {
    this.#game = game;
    this.#publisher = publisher;
    this.#genre = genre;
    this.#played = played;
    this.id = crypto.randomUUID();
  }

  getEntryDetails() {
    return {
      game: this.#game,
      publisher: this.#publisher,
      genre: this.#genre,
      played: this.#played
    }
  }

  getId() {
    return this.id;
  }
}

(() => {
  const inputsData = document.querySelectorAll("input");
  const userInputs = {};

  const addButton = document.querySelector(".add");
  const removeButton = document.querySelector(".remove");

  const inputsAddHandler = () => {
    for (let key of inputsData) {
      userInputs[key.id] = key.value;
    }

    addToTable();
  }

  function addToTable() {
    const newGame = new GameEntry(userInputs);
    const gameData = newGame.getEntryDetails();

    const tbody = document.querySelector("tbody");
    const row = document.createElement("tr");
    row.style.position = 'relative';
    row.dataset.id = newGame.getId();
    tbody.appendChild(row);

    for (let data in gameData) {
      const td = document.createElement('td');
      if (gameData[data] == "") {
        td.innerText = "N/A";
      } else td.innerText = gameData[data]
      row.appendChild(td);
      
    }

    const checkBox = document.createElement("input");
    checkBox.setAttribute("type", "checkbox");
    checkBox.id = newGame.getId();
    row.appendChild(checkBox);
    inputsData.forEach(input => input.value = "");
  }

  function removeFromLibrary() {
    const checkedPositions = document.querySelectorAll("input[type='checkbox']:checked");

    for (let checkbox of checkedPositions) {
      let row = checkbox.closest("tr");
      if (row) row.remove();

    }
  }

  addButton.addEventListener("click", (e) => {
    if (validator()) inputsAddHandler();
    else e.preventDefault();
  });

  removeButton.addEventListener("click", removeFromLibrary);


})();