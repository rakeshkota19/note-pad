import React from 'react';
import classes from './NoteItems.module.css';
import NoteItem from './NoteItem/NoteItem';

const noteItems = (props) => {

    let items = props.notes.map((note) => {
        return <NoteItem 
                        key = {note.id} 
                        id = {note.id}
                        title = {note.title} 
                        currentNote = {props.currentNote}
                        clicked = { (_) => { props.clicked(note.id); props.toggle()}}></NoteItem>
    })

    return (
        <div className = {classes.NoteItems}>
            {items}
        </div>
    );
}


export default noteItems;