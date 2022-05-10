// on load data is gotten from local storage
window.onload = () => {
  try {
    notesData = JSON.parse(localStorage.getItem("notes"));
    displayNotesOnLoad();
  } catch (err) {
    localStorage.setItem("notes", "[]");
    console.log(err);
  }
};

function displayNotesOnLoad() {
  notesData.forEach((item, index) => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.setAttribute("id", `${index}`);
    note.innerHTML = `<div class="options">
                <span class="material-symbols-outlined edit" onclick="editNote(this)"> edit </span>
                <span class="material-symbols-outlined remove" onclick="deleteNote(this)"> remove </span>
              </div>
              <h2>${item.headline}</h2>
              <p>${item.content}</p>`;
    notesElement.appendChild(note);
  });
}
// used in two or more
const popUpNote = document.getElementById("writing-area");

// everything to create new note
const backArrow = document.getElementById("arrow-back");
const notesElement = document.getElementById("notes-element");
const noteHeadline = document.getElementById("headline");
const noteContent = document.getElementById("textarea-one");
const saveBtn = document.getElementById("save-btn");
let noteId = 0;
let notesData = [];

const addBtn = document.getElementById("add-btn");
const changeNoteArea = document.getElementById("create-note");
addBtn.addEventListener("click", () => {
  addField();
});

function addField() {
  changeNoteArea.classList.remove("hidden");
  popUpNote.animate(
    { transform: "translateY(69%)" },
    { duration: 800, fill: "both" }
  );
}

backArrow.addEventListener("click", () => {
  removeField();
});

function removeField() {
  popUpNote.animate(
    { transform: "translateY(200%)" },
    { duration: 800, fill: "both" }
  );
  setTimeout(() => {
    changeNoteArea.classList.add("hidden");
  }, 800);
  noteHeadline.value = "";
  noteContent.value = "";
}

saveBtn.addEventListener("click", () => {
  let headline = noteHeadline.value;
  let noteText = noteContent.value;
  if (headline) {
    if (noteText) {
      createNewNote(headline, noteText);
    } else {
      if (confirm("Do you want to save an empty note?")) {
        createNewNote(headline, noteText);
      } else {
        return;
      }
    }
  } else {
    alert("Note headline field is required.");
  }
});

function createNewNote(headline, content) {
  const note = document.createElement("div");
  note.classList.add("note");
  note.setAttribute("id", `${noteId}`);
  note.innerHTML = `<div class="options">
                <span class="material-symbols-outlined edit" onclick="editNote(this)"> edit </span>
                <span class="material-symbols-outlined remove" onclick="deleteNote(this)"> remove </span>
              </div>
              <h2>${headline}</h2>
              <p>${content}</p>`;
  addToLS(headline, content);
  noteId += 1;
  notesElement.appendChild(note);
  removeField();
}

function addToLS(name, text) {
  const newNote = { headline: `${name}`, content: `${text}` };
  notesData.push(newNote);
  localStorage.setItem("notes", JSON.stringify(notesData));
}

// delete a note
function deleteNote(element) {
  const childNote = element.parentElement.parentElement;
  const eId = childNote.id;
  notesElement.removeChild(childNote);
  notesData.splice(eId, 1);
  localStorage.setItem("notes", JSON.stringify(notesData));
  changeId(eId);
}

function changeId(eId) {
  noteId -= 1;
  document.querySelectorAll(".note").forEach((element) => {
    if (element.id > eId) {
      element.id = element.id - 1;
    }
  });
}

// note editing
function backToNote(element) {
  const child = element.parentElement.parentElement;
  const parent = child.parentElement;
  parent.removeChild(child);
}

function editNote(element) {
  const parent = element.parentElement.parentElement;
  const headlineText = parent.querySelector("h2");
  const noteText = parent.querySelector("p");
  editMode(headlineText.textContent, noteText.textContent, parent);
}

function editMode(headline, content, parent) {
  const editArea = document.createElement("div");
  editArea.setAttribute("class", "edit-area");
  editArea.innerHTML = `
      <div class="edit-head">
        <span class="material-symbols-outlined arrow-icon" onclick="backToNote(this)">
          arrow_back
        </span>
        <h2>Edit the note</h2>
      </div>
      <div class="edit-note-headline">
        <label for="headline">Note headline:</label>
        <input
          type="text"
          name="headline"
          id="edit-headline"
          required
          autocomplete="off"
          value="${headline}"
        />
      </div>
      <textarea
        class="textarea-two"
        name="textarea2"
        id="textarea-two"
        cols="5"
        rows="10"
      >${content}</textarea>
      <div class="edit-button">
        <button class="edit-btn" id="edit-btn" onclick="saveChanges(this)">
          Edit
        </button>
      </div>
  `;
  parent.appendChild(editArea);
}

function saveChanges(element) {
  const editArea = element.parentElement.parentElement;
  const changedHeadline = editArea.querySelector("#edit-headline").value;
  const changedContent = editArea.querySelector("#textarea-two").value;
  const parent = editArea.parentElement;
  parent.querySelector("h2").textContent = changedHeadline;
  parent.querySelector("p").textContent = changedContent;
  notesData[parent.id].headline = `${changedHeadline}`;
  notesData[parent.id].content = `${changedContent}`;
  localStorage.setItem("notes", JSON.stringify(notesData));
  parent.removeChild(editArea);
}
