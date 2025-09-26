import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as notes from './app.js'; // Import all exported functions

const argv = yargs(hideBin(process.argv))

  // Add note
  .command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
      title: { describe: 'Note title', demandOption: true, type: 'string' },
      body: { describe: 'Note body', demandOption: true, type: 'string' }
    },
    handler(argv) {
      notes.addNote(argv.title, argv.body);
    }
  })

  // List notes
  .command({
    command: 'list',
    describe: 'List all notes',
    handler() {
      notes.listNotes();
    }
  })

  // Read note
  .command({
    command: 'read',
    describe: 'Read a note by title',
    builder: {
      title: { describe: 'Note title', demandOption: true, type: 'string' }
    },
    handler(argv) {
      notes.readNote(argv.title);
    }
  })

  // Remove note
  .command({
    command: 'remove',
    describe: 'Remove a note by title',
    builder: {
      title: { describe: 'Note title', demandOption: true, type: 'string' }
    },
    handler(argv) {
      notes.removeNote(argv.title);
    }
  })
  .parse();



// node index.js add --title="Shopping" --body="Buy milk and eggs"
// node index.js list
// node index.js read --title="Shopping"
// node index.js remove --title="Shopping"
