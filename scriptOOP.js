class Note {
  constructor(text, checked = false) {
    this.text = text;
    this.checked = checked;
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
    this.saveToLocalStorage();
    this.renderNotes();
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
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    console.log(notes);
    const finalNotes = notes.map((note) => new Note(note.text, note.checked));
    console.log(finalNotes);
    return finalNotes;
  }
  renderNotes() {
    const notes = document.getElementById("notes");
    notes.innerHTML = "";
    this.notesList.forEach((note, i) => {
      const li = document.createElement("li");
      li.classList.add(
        "flex",
        "justify-between",
        "border",
        "px-2",
        "py-1",
        "rounded",
        "border-red-900",
      );
      const span = document.createElement("span");
      span.textContent = note.text;
      if (note.checked) {
        span.classList.add("line-through");
      }
      span.onclick = () => this.toggleNote(i);
      li.appendChild(span);
      const btn = document.createElement("button");
      btn.classList.add(
        "bg-red-500/90",
        "py-0.5",
        "px-2",
        "rounded",
        "text-white",
        "text-xs",
        "cursor-pointer",
      );
      btn.textContent = "delete";
      btn.type = "button";
      btn.onclick = () => this.deleteNote(i);
      li.appendChild(btn);
      notes.appendChild(li);
    });
  }
}
const app = new NotesApp();

document.addEventListener("DOMContentLoaded", app.renderNotes());

document.getElementById("form").addEventListener("submit", (s) => {
  s.preventDefault();
  const note = document.getElementById("note");
  app.addNote(note.value);
  note.value = "";
});
