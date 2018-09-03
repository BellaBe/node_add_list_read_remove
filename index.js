
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes');

const titleOptions = {
    describe: 'Title of note',
    demande: true,
    alias: 't'
}

const bodyOptions ={
    describe: 'Body of note',
    demande: true,
    alias: 'b'
}


const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note',{
        title: titleOptions,
        body: bodyOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions,
        body: bodyOptions
    })
    .help()
    .argv;
let command = argv._[0];
// console.log('Command:', command);
// console.log('Process:', process.argv);
//console.log('Yargs:', argv);

if(command === 'add'){
    let note = notes.addNote(argv.title, argv.body)
    if(note){
        console.log('Note created')
        notes.logNote(note)        
    }else{
        console.log('Note already exist')
    }
}else if( command === 'list'){
    let allNotes = notes.getAllNotes();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(note => notes.logNote(note))
}else if(command === 'read'){
    let note = notes.getNote(argv.title);
    if(note){
        console.log('Note found')
        notes.logNote(note)
    }else{
        console.log('Note not found')
    }
    
}else if(command === 'remove'){
    let noteRemoved = notes.removeNote(argv.title)
    let message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message)
}else{
    console.log('Command not recognized')
}



