import React from 'react';
import classes from './Toolbar.module.css';

const toolbar = (props) => {

    let showNotesToggler  = <div>
                            <button onClick = {props.toggle} className = {classes.Toggle}>
                                Hide List
                            </button>
                            </div>;

    if (props.show === false) {
        showNotesToggler = <div onClick = {props.Toggle} className = {classes.Toggle}>
            <button onClick = {props.toggle}>
                Show List
            </button>

        </div>
    }

    return (
        <div className = {classes.Toolbar}>
            {showNotesToggler}

            <button className = {classes.Button} onClick = {() => {props.add();}}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>

            <button className = {classes.Button} onClick = {() => {props.deleted();}}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button>

            <input className = {classes.Handle} type = "text"   
                    placeholder = {props.user}
                    onChange = {props.handle}>
            </input>
 
        </div>
    );
}

export default toolbar;