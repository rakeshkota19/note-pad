import React from 'react';
import classes from './SideDrawer.module.css';
import NoteItems from './NoteItems/NoteItems';


const sideDrawer = (props) => {
    return (
        <div className = {classes.SideDrawer}>
            <NoteItems notes = {props.notes} currentNote = {props.currentNote} clicked = {props.clicked}/>
        </div>
    )
}

export default sideDrawer;