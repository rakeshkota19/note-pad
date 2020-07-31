import React from 'react';
import classes from './Layout.module.css'
import NotepadHandler from '../../containers/NotepadHandler/NotepadHandler';

const layout = (props) => {
    return (
        <div className = {classes.Layout}>
            
            <div style = {{ margin : "0px 16px",fontFamily : "lobster cursive"}}>
                <p>NotePad</p>
            </div>
            <NotepadHandler/>
        </div>
    );
}

export default layout;