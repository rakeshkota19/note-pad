import React from 'react';
import classes from './Layout.module.css'
import NotepadHandler from '../../containers/NotepadHandler/NotepadHandler';

const layout = (props) => {
    return (
        <div className = {classes.Layout}>
            
            <h2 className = {classes.Header}>
                NotePad
            </h2>
            <NotepadHandler/>
        </div>
    );
}

export default layout;