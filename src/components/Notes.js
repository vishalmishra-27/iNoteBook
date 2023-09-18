import { React, useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

const Notes = () => {
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
    const context = useContext(NoteContext);
    const { Notes, getNotes, editNote } = context;

    let navigate = useNavigate();

    useEffect(() => {

        var modal = document.getElementById("myModal");

        var btn = document.getElementById("myBtn");

        var updateButton = document.getElementById("updatebutton");

        var span = document.getElementsByClassName("close")[0];

        btn.onclick = () => {
            modal.style.display = "block";
        }

        span.onclick = () => {
            modal.style.display = "none";
        }

        updateButton.onclick = () => {
            modal.style.display = "none";
        }

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }

        if (!localStorage.getItem('token')) {
            navigate('/Login');
        }

        else {
            getNotes();
        }

        // eslint-disable-next-line
    }, [])

    const onChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value })
    }

    const ref = useRef(null);

    const updateNote = (element) => {
        ref.current.click();
        setNote({ id: element._id, etitle: element.title, edescription: element.description, etag: element.tag });
    }

    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
    }

    return (
        <div>
            <AddNote />
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Edit Note</h2>
                        <span className="close">&times;</span>
                    </div>
                    <div id='editnotecontent' className="modal-footer">
                        <div className='aicenter'>TITLE&nbsp;<textarea name="etitle" id="etitle" value={note.etitle} onChange={onChange} cols="20" rows="5"></textarea></div>
                        <div className='aicenter'>DESCRIPTION&nbsp;<textarea name="edescription" id="edescription" value={note.edescription} onChange={onChange} cols="30" rows="5"></textarea></div>
                        <div className='aicenter'>TAG&nbsp;<textarea name="etag" id="etag" value={note.etag} onChange={onChange} cols="20" rows="5"></textarea></div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleClick} id='updatebutton'>UPDATE NOTE</button>
                    </div>
                </div>
            </div>
            <div id='notescontainer'>
                <h1 style={{ marginBottom: "20px" }}>Your Notes</h1>
                <h2>{Notes.length === 0 && "--No notes to display--"}</h2>
                <div id='innercontainer'>
                    {Notes.map((element) => { return <NoteItem key={element._id} updateNote={updateNote} element={element} /> })}
                </div>
            </div>
            <button hidden={true} ref={ref} id="myBtn" />
        </div>
    )
}

export default Notes