import React, { useContext, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext'

const AddNote = () => {
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const context = useContext(NoteContext);
    const { addNote } = context;

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    const handleOnClick = () => {
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }

    return (
        <div id="addnotecontainer">
            <div>
                <h1>Add a Note</h1>
                <div id='addnoteinner'>
                    <textarea placeholder='Title' value={note.title} onChange={onChange} name="title" id="title" cols="20" rows="2"></textarea>
                    <textarea placeholder='Description' value={note.description} onChange={onChange} name="description" id="description" cols="30" rows="5"></textarea>
                    <textarea placeholder='Tag' value={note.tag} onChange={onChange} name="tag" id="tag" cols="20" rows="2"></textarea>
                    <button id='addnotebutton' disabled={note.title === "" || note.description === "" ? true : false} onClick={handleOnClick} >Add Note</button>
                </div>
            </div>
        </div>
    )
}

export default AddNote