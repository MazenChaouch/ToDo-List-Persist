const notesList = JSON.parse(localStorage.getItem("notesList")) || [];
document.addEventListener("DOMContentLoaded", refreshNotes);
document.getElementById("form").addEventListener("submit", (e) => addNote(e));
function addNote(event) {
  event.preventDefault();
  const note = document.getElementById("note");
  if (note.value.trim() != "") {
    notesList.push({ note: note.value, checked: false });
    localStorage.setItem("notesList", JSON.stringify(notesList));
    note.value = "";
  }
  refreshNotes();
}

function checkToDo(i) {
  console.log(i);
  notesList[i].checked = !notesList[i].checked;
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
    li.onclick = () => checkToDo(i);
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
      note.note
    }</span>
                <button onclick='deleteNote(${i})' 
                        class='bg-red-500/90 py-0.5 px-2 rounded text-white text-xs cursor-pointer' 
                        type='button'>delete</button>`;
    notes.appendChild(li);
  });
}
