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
    if (props.show === true) {
        attachedClasses.push(classes.Hide);
    }     
    
    if (note == "") {
        note = <textarea type = "text"  disabled 
        className = {classes.Content} 
        value = {"Create a New Note to Continue"}
             ></textarea>;
    }
    
    return (
        <div className = {attachedClasses.join(' ')}>
            {note}
        </div>
    );
}

export default noteEditor;