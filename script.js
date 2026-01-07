// Select elements
const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");
const error = document.getElementById("error");

// Load notes from localStorage (or empty array)
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Render all notes
function renderNotes() {
  notesContainer.innerHTML = "";

  if (notes.length === 0) {
    notesContainer.innerHTML = "<p>No notes yet.</p>";
    return;
  }

  notes.forEach((note, index) => {
    const card = document.createElement("div");
    card.className = "note-card";

    const content = document.createElement("div");
    content.className = "note-content";
    content.textContent = note;

    const actions = document.createElement("div");
    actions.className = "note-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";
    editBtn.onclick = () => editNote(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => deleteNote(index);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(content);
    card.appendChild(actions);

    notesContainer.appendChild(card);
  });
}

// Save notes array to localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Add new note with validation
function addNote() {
  const text = noteText.value.trim();

  if (text === "") {
    error.textContent = "Note cannot be empty.";
    return;
  }

  error.textContent = "";
  notes.push(text);
  saveNotes();
  renderNotes();
  noteText.value = "";
}

// Delete note
function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

// Edit note (simple prompt-based)
function editNote(index) {
  const currentText = notes[index];
  const updatedText = prompt("Edit your note:", currentText);

  if (updatedText === null) {
    return; // user cancelled
  }

  const trimmed = updatedText.trim();
  if (trimmed === "") {
    alert("Updated note cannot be empty.");
    return;
  }

  notes[index] = trimmed;
  saveNotes();
  renderNotes();
}

// Events
addNoteBtn.addEventListener("click", addNote);

// Optional: Add with Ctrl+Enter
noteText.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    addNote();
  }
});

// Initial render
renderNotes();
