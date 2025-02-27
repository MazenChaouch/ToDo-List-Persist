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
    return savedNotes != []
      ? savedNotes.map((note) => new Note(note.text, note.checked))
      : savedNotes;
  }

  renderNotes() {
    const notes = document.getElementById("notes");
    notes.innerHTML = "";
    this.notesList.forEach((note, i) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const deleteButton = document.createElement("button");
      span.textContent = note.text;
      if (note.checked) {
        span.classList.add("line-through");
      }
      li.classList.add(
        "flex",
        "justify-between",
        "border",
        "px-2",
        "py-1",
        "rounded",
        "border-red-900",
      );
      deleteButton.classList.add(
        "bg-red-500/90",
        "py-0.5",
        "px-2",
        "rounded",
        "text-white",
        "text-xs",
        "cursor-pointer",
      );
      deleteButton.textContent = "delete";
      deleteButton.type = "button";
      span.addEventListener("click", () => this.toggleNote(i));
      deleteButton.addEventListener("click", () => {
        NoteApp.deleteNote(i);
      });

      li.appendChild(span);
      li.appendChild(deleteButton);
      notes.appendChild(li);
    });
  }
}

const NoteApp = new NotesApp();
document.addEventListener("DOMContentLoaded", () => load());

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
