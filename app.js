import fs from 'fs';
import chalk from 'chalk';

const path = 'notes.json';

// Helper function: load notes from file
function loadNotes() {
  try {
    const dataBuffer = fs.readFileSync(path);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
}

// Helper function: save notes to file
function saveNotes(notes) {
  fs.writeFileSync(path, JSON.stringify(notes, null, 2));
}

// Add a new note
export function addNote(title, body) {
  const notes = loadNotes();
  const duplicate = notes.find(note => note.title === title);

  if (!duplicate) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green('✅ Note added!'));
  } else {
    console.log(chalk.red('❌ Note title already exists!'));
  }
}

// List all notes
export function listNotes() {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log(chalk.yellow('📭 No notes found.'));
    return;
  }
  console.log(chalk.blue.bold('📒 Your notes:'));
  notes.forEach((note, index) => {
    console.log(chalk.cyan(`${index + 1}. ${note.title}`));
  });
}

// Read a note by title
export function readNote(title) {
  const notes = loadNotes();
  const note = notes.find(n => n.title === title);
  if (note) {
    console.log(chalk.green(`📌 ${note.title}:`) + ` ${note.body}`);
  } else {
    console.log(chalk.red('❌ Note not found!'));
  }
}

// Remove a note by title
export function removeNote(title) {
  const notes = loadNotes();
  const newNotes = notes.filter(n => n.title !== title);

  if (notes.length > newNotes.length) {
    saveNotes(newNotes);
    console.log(chalk.green('✅ Note removed!'));
  } else {
    console.log(chalk.red('❌ Note not found!'));
  }
}



