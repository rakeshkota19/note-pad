import React, { Component } from 'react';
import axios from '../../axios-notes';
import classes from './NotepadHandler.module.css';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import NoteEditor from '../../components/NoteEditor/NoteEditor';
import Toolbar from '../../components/Toolbar/Toolbar';


class NotepadHandler extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            currentNote: null,
            noteIncrementId: 3,
            sideDrawerDisplay: true,
            handle : "sampleUser"
        };
    }

    componentDidMount() {
        console.log("component mounting");

        let handle = this.state.handle;
        axios.get(handle + '.json').then((response) => {
            console.log(response);
            let data = response.data;
            let notes = data != null ? Object.values(data) : []

            notes = notes.reduce((arr,curr) => {
                if (curr === null)
                    return arr;
                arr.push(curr);
                return arr;    
            },[]);    
            
            notes.reverse();
            this.setState({
                notes: notes,
                currentNote: notes.length > 0 ? notes[0] : null,
                noteIncrementId: notes.length > 0 ? notes[0].id : 0
            });
            console.log("Data Updated");

        }).catch((err) => {
            console.log(err);

            this.setState({
                notes: [
                    {
                        id: 1,
                        title: "New Note",
                        "text": 'New Note'
                    }
                ],
                currentNote :  {
                    id: 1,
                    title: "New Note",
                    "text": 'New Note'
                }
            });
        });

        console.log("component mounted");
    }

    viewNoteHandler = (id) => {
        let notes = [...this.state.notes];

        console.log(notes);
        let currentNote = notes.find(x => x.id === id);

        console.log(currentNote)
        this.setState({
            currentNote: currentNote
        });
    }

    updateNoteHandler = (event, id) => {

        let text = event.target.value;

        let notes = [...this.state.notes];
        let currentNoteIndex = notes.findIndex(x => x.id === id);
        notes[currentNoteIndex].text = text;

        if (text.length > 0) {

            if (text.length > 8) {
                notes[currentNoteIndex].title = text.substring(0, 9) + "...";
            } else {
                notes[currentNoteIndex].title = text;
            }
        } else {
            notes[currentNoteIndex].title = "Blank";
        }

        this.setState({
            notes: notes
        });


        let handle = this.state.handle;
        axios.put(handle + "/" + id + ".json", notes[currentNoteIndex])
            .then(response => {
                console.log(response)
            }).catch(err => {
                console.log(err);
            }
            );

    }

    createNoteHandler = () => {
        if (this.state.handle == "") {
            alert("Please Enter Handle to Continue");
            return false;
        }

        let noteId = this.state.noteIncrementId + 1;

        let newNote = {
            id: noteId,
            title: 'Blank'
        }

        let notes = [...this.state.notes];

        notes.unshift(newNote);
        this.setState({
            notes: notes,
            currentNote: newNote,
            noteIncrementId: noteId
        });
    }

    deleteNoteHandler = () => {

        let currentNote = this.state.currentNote;

        if (currentNote === null || this.state.handle == "") {

            if (this.state.handle == '')
                alert("Please Enter Handle to Continue");
            return;
    }

        let deleteNoteId = currentNote.id;
        let notes = [...this.state.notes];

        let index = notes.findIndex(x => x.id === deleteNoteId);
        notes.splice(index, 1);

        let handle = this.state.handle;

        axios.delete(handle + "/" + deleteNoteId + ".json")
            .then(response => {
                console.log(response);
                this.setState({
                    notes: notes,
                    currentNote: notes.length > 0 ? (index >= notes.length ? notes[index - 1] : notes[index])
                                                  : null   
                });
            }).catch(err => {
                console.log(err);
            }
            );
    }

    sideDrawerToggleHandler = () => {
        let show = this.state.sideDrawerDisplay;
        console.log(show);
        this.setState({
            sideDrawerDisplay: !show
        });
    }

    handleUpdateHandler = (event) => {
        console.log(event.target.value);

        this.setState({
            handle : event.target.value
        });

        let handle = event.target.value;

        if (handle == "") {
            this.setState({
                notes: [
                    {
                        id: 1,
                        title: "New Note",
                        "text": 'Enter your handle to Continue'
                    }
                ],
                currentNote :  {
                    id: 1,
                    title: "New Note",
                    "text": 'Enter your handle to Continue'
                }
            });
            
            return;
        };

        axios.get(handle + '.json').then((response) => {
            console.log(response);
            let data = response.data;
            let notes = data != null ? Object.values(data) : []

            notes = notes.reduce((arr,curr) => {
                if (curr === null)
                    return arr;
                arr.push(curr);
                return arr;    
            },[]);    
            
            notes.reverse();
            this.setState({
                notes: notes,
                currentNote: notes.length > 0 ? notes[0] : null,
                noteIncrementId: notes.length > 0 ? notes[0].id : 0
            });
            console.log("Data Updated");

        }).catch((err) => {
            console.log(err);

            this.setState({
                notes: [
                    {
                        id: 1,
                        title: "New Note",
                        "text": 'New Note'
                    }
                ],
                currentNote :  {
                    id: 1,
                    title: "New Note",
                    "text": 'New Note'
                }
            });
        });   
     }


    render() {
        return (
            <div className={classes.NotepadHandler}>
                <Toolbar add={this.createNoteHandler}
                    deleted={this.deleteNoteHandler}
                    toggle={this.sideDrawerToggleHandler}
                    show={this.state.sideDrawerDisplay}
                    handle = {this.handleUpdateHandler}
                    user = {this.state.handle} />

                <SideDrawer notes={this.state.notes}
                    clicked={this.viewNoteHandler}
                    currentNote={this.state.currentNote}
                    show={this.state.sideDrawerDisplay}
                    toggle={this.sideDrawerToggleHandler}
                />

                <NoteEditor
                    currentNote={this.state.currentNote}
                    updateNote={this.updateNoteHandler}
                    show={this.state.sideDrawerDisplay}
                    toggle={this.sideDrawerToggleHandler}
                />
            </div>
        );
    }
}

export default NotepadHandler;
