# 📝 To-Do List with OOP in JavaScript

## 1. Define a `Note` Class

- **Properties**:

  - `text` (string) → Stores the note content.
  - `checked` (boolean) → Marks if the note is completed.

- **Methods**:
  - `toggleCheck()` → Toggles the `checked` status.

---

## 2. Create a `NotesApp` Class

- **Properties**:

  - `notesList` → An array of `Note` objects.

- **Methods**:
  - `addNote(text)` → Adds a new note.
  - `deleteNote(index)` → Removes a note.
  - `toggleNote(index)` → Marks a note as completed/incomplete.
  - `saveToLocalStorage()` → Stores `notesList` in `localStorage`.
  - `loadFromLocalStorage()` → Loads notes from `localStorage`.
  - `renderNotes()` → Updates the UI.

---

## 3. Handle DOM Interactions

- Capture user input (e.g., note text).
- Call appropriate `NotesApp` methods when:
  - A note is added.
  - A note is deleted.
  - A note is marked as done.

---

## 4. Initialize the Application

- Instantiate `NotesApp` and call `loadFromLocalStorage()`.
- Attach event listeners for adding, deleting, and toggling notes.

---

🚀 **Now, build and test your OOP-based to-do list!**
