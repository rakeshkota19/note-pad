import React from 'react';
import classes from './NoteEditor.module.css';

const noteEditor = (props) => {
    let note = <textarea className = {classes.Content} placeholder = "New Note"></textarea>;

    if (props.show === false) {
    note = <textarea type = "text" 
                className = {classes.Content} 
                value = {props.currentNote.text ? props.currentNote.text : ""}
                placeholder = {props.currentNote.text ? " " : "Add Note"}
                onChange = { (_) => { props.updateNote(_, props.currentNote.id)} }></textarea>;
    } else {
        note = ""
    }

     return (
        <div className = {classes.NoteEditor}>
            {note}
        </div>
    );
}

export default noteEditor;