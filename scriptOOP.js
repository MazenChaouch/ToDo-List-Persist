class Note {
  constructor(text) {
    this.text = text;
    this.checked = false;
  }

  toggleCheck() {
    this.checked = !this.checked;
  }
}

class NotesApp {
  constructor() {
    this.notesList = this.loadFromLocalStorage();
  }

  addNote(text) {
    const note = new Note(text);
    this.notesList.push(note);
  }

  deleteNote(index) {
    this.notesList.splice(index, 1);
    this.saveToLocalStorage();
    this.renderNotes();
  }

  toggleNote(index) {
    this.notesList[index].toggleCheck();
    this.saveToLocalStorage();
    this.renderNotes();
  }

  saveToLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(this.notesList));
  }

  loadFromLocalStorage() {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    return savedNotes.map((note) => new Note(note.text, note.checked)); // Ensures correct class instances
  }

  renderNotes() {
    const notes = document.getElementById("notes");
    notes.innerHTML = "";
    this.notesList.forEach((note, i) => {
      const li = document.createElement("li");
      li.onclick = () => this.toggleNote(i);
      li.classList.toggle;
      li.classList.add(
        "flex",
        "justify-between",
        "border",
        "px-2",
        "py-1",
        "rounded",
        "border-red-900",
      );
      li.innerHTML = `<span class="${note.checked ? "line-through" : ""}">${
        note.text
      }</span>
        <button onclick='NoteApp.deleteNote(${i})' 
        class='bg-red-500/90 py-0.5 px-2 rounded text-white text-xs cursor-pointer' 
        type='button'>delete</button>`;
      notes.appendChild(li);
    });
  }
}

const NoteApp = new NotesApp();
document.addEventListener("DOMContentLoaded", () => load());

console.log(NoteApp.notesList);

function load() {
  console.log("i'm here");
  NoteApp.loadFromLocalStorage();
  NoteApp.renderNotes();
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const note = document.getElementById("note");
  NoteApp.addNote(note.value);
  note.value = "";
  NoteApp.saveToLocalStorage();
  load();
});
