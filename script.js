const notesList = JSON.parse(localStorage.getItem("notesList")) || [];

document.addEventListener("DOMContentLoaded", refreshNotes);

function addNote(event) {
  event.preventDefault();
  const note = document.getElementById("note");
  notesList.push(note.value);
  localStorage.setItem("notesList", JSON.stringify(notesList));
  refreshNotes();
}

function deleteNote(index) {
  notesList.splice(index, 1);
  localStorage.setItem("notesList", JSON.stringify(notesList));
  refreshNotes();
}

function refreshNotes() {
  const notes = document.getElementById("notes");
  notes.innerHTML = "";
  notesList.forEach((note, i) => {
    const li = document.createElement("li");
    li.classList.add("space-x-2");
    li.textContent = note;
    li.innerHTML += `<button onclick='deleteNote(${i})' class='bg-red-500 py-0.5 px-1 rounded text-white text-xs cursor-pointer' type='button'>delete</button>`;
    notes.appendChild(li);
  });
}
