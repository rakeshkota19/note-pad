import React, { Component } from 'react';
import axios from '../../axios-notes';
import Hoc from '../../Hoc/Hoc';
import classes from './NotepadHandler.module.css';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import NoteEditor from '../../components/NoteEditor/NoteEditor';
import Toolbar from '../../components/Toolbar/Toolbar';


class NotepadHandler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes : [],
            currentNote : null,
            noteIncrementId : 3
        };
    }

    componentDidMount() {
        console.log("component mounted");

        axios.get('.json').then((response) => {
            let data = response.data;

            let notes = data.reduce( 
                (arr, curr) => {

                    if (curr !== null) {
                        arr.push(curr);
                    }
                    
                    return arr;
                }, []);

            notes.reverse();
            this.setState({
                notes : notes,
                currentNote : notes[0],
                noteIncrementId : notes.length > 0 ? notes[0].id : 0 
            });
            console.log("Data Updated");
        }).catch((err) => {
            console.log(err);

            this.setState ({
                notes :  [
                    {
                        id : 1,
                        title : "New Note",
                        "text" : 'New Note'
                    }
                ]
            });
        });

        
    }

    viewNoteHandler = (id) => {
        let notes = [...this.state.notes];

        console.log(notes);
        let currentNote = notes.find(x => x.id === id);

        console.log(currentNote)
        this.setState({
            currentNote : currentNote
        });
    }

    updateNoteHandler = (event, id) => {
        
        let text = event.target.value;

        let notes = [...this.state.notes];
        let currentNoteIndex = notes.findIndex(x => x.id === id);
        notes[currentNoteIndex].text = text;

        if (text.length > 0) {

            if (text.length > 10) {
                notes[currentNoteIndex].title = text.substring(0,15) + "...";
            } else {
            notes[currentNoteIndex].title = text;
            }
        } else {
            notes[currentNoteIndex].title = "Blank";
        }
    
        this.setState({
            notes : notes
         });


        axios.put(id + ".json", notes[currentNoteIndex]).
                    then(response => {
                        console.log(response)
                    }).catch( err => {
                        console.log(err);
                    }
                    );
        
    }

    createNoteHandler = () => {
        let noteId = this.state.noteIncrementId + 1;
        
        let newNote = {
            id : noteId,
            title : 'Blank'
        }

        let notes = [... this.state.notes];

        notes.unshift(newNote);
        this.setState({
            notes : notes,
            currentNote : newNote,
            noteIncrementId : noteId
        });
    }

    deleteNoteHandler = () => {
        
        let currentNote = this.state.currentNote;
        let deleteNoteId = currentNote.id;
        let notes = [... this.state.notes];

        let index = notes.findIndex(x => x.id === deleteNoteId);
        notes.splice(index,1);

        axios.delete(deleteNoteId + ".json").
        then(response => {
            console.log(response);
            this.setState({
                notes : notes,
                currentNote : index >= notes.length ? notes[index-1] : notes[index]
            });
        }).catch( err => {
            console.log(err);
        }
        );
    }

    render() {
        return (
            <div className = {classes.NotepadHandler}>
                <Toolbar add = {this.createNoteHandler}
                        deleted = {this.deleteNoteHandler}/>
                <SideDrawer notes = {this.state.notes} 
                            clicked = {this.viewNoteHandler}
                            currentNote = {this.state.currentNote}
                            />
                <NoteEditor 
                    currentNote = {this.state.currentNote}
                    updateNote = {this.updateNoteHandler}>
                </NoteEditor>
            </div>
        );
    }
}

export default NotepadHandler;
