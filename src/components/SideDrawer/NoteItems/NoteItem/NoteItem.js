import React from 'react';
import classes from './NoteItem.module.css';

const noteItem = (props) => {

  let attachedClasses = [classes.NoteItem];

  if (props.currentNote !== undefined && props.id === props.currentNote.id) {
    attachedClasses.push(classes.Select);
  }
  
  return (
      <div className = {attachedClasses.join(' ')} onClick = {props.clicked}>
        {props.title}
      </div>
  );
}


export default noteItem;