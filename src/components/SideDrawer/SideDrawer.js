import React from 'react';
import classes from './SideDrawer.module.css';
import NoteItems from './NoteItems/NoteItems';


const sideDrawer = (props) => {

    let attachedClasses = [classes.SideDrawer];

    if (!props.show) {
        attachedClasses.push(classes.Close);
    } else {
        attachedClasses.push(classes.Open);
    }

    return (
        <div className = {attachedClasses.join(' ')}>
            <NoteItems notes = {props.notes}
                        currentNote = {props.currentNote} 
                        clicked = {props.clicked} 
                        toggle = {props.toggle}/>
        </div>
    )
}

export default sideDrawer;