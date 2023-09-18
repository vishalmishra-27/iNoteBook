import { React, useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { element, updateNote } = props;

    const delNote = () => {
        if (window.confirm("Click OK to proceed with the deletion of this note") === true) {
            deleteNote(element._id);
        }

        else { }
    }

    return (
        <div className="card">
            <div>
                <h4><b>{element.title}</b></h4>
                <p>{element.description}<br /></p>
                <p>#{element.tag}<br /></p>
                <i onClick={() => {updateNote(element)}} className="fa-solid fa-pen-to-square"></i>
                <i onClick={delNote} className="fa-solid fa-trash"></i>
            </div>
        </div>
    )
}

export default NoteItem