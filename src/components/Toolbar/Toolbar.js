import React from 'react';
import classes from './Toolbar.module.css';

const toolbar = (props) => {
    return (
        <div className = {classes.Toolbar}>
            <button className = {classes.Button} onClick = {props.add}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </button>
            <button className = {classes.Button} onClick = {props.deleted}>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
        </div>
    );
}

export default toolbar;