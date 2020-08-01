import React from 'react';
import classes from './NoteEditor.module.css';

const noteEditor = (props) => {

    let note = "";
    if (props.currentNote !== null) {
     note = <textarea type = "text" 
                className = {classes.Content} 
                value = {props.currentNote.text ? props.currentNote.text : ""}
                placeholder = {props.currentNote.text ? " " : "Add Note"}
                onChange = { (_) => { props.updateNote(_, props.currentNote.id)} }></textarea>;
    }

    let attachedClasses = [classes.NoteEditor];            
    if (props.show === false ) {
        attachedClasses.push(classes.Hide);
    }

     return (
        <div className = {attachedClasses.join(' ')}>
            {note}
        </div>
    );
}

export default noteEditor;