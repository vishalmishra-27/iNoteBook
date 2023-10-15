import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = "http://localhost:80";

    const [Notes, setNotes] = useState([]);

    //GET ALL NOTES
    const getNotes = async () => {

        //API Call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
        })
        const json = await response.json();
        setNotes(json);
    }

    //ADD A NOTE
    const addNote = async (title, description, tag) => {

        //API Call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();

        //Adding note on front-end
        setNotes(Notes.concat(note));
    }


    //DELETE A NOTE
    const deleteNote = async (id) => {
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            }
        });
        const json = await response.json();

        //Removing note from front-end
        const newNotes = Notes.filter((note) => { return note._id !== json.note._id })
        setNotes(newNotes);
    }


    //EDIT A NOTE
    const editNote = async (id, title, description, tag) => {
        //API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "auth-token": localStorage.getItem('token'),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();

        //Displaying edited note on client side
        let newNotes = JSON.parse(JSON.stringify(Notes));
        for (let index = 0; index < newNotes.length; index++) {
            if (newNotes[index]._id === json.note._id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);

    }

    return (
        <NoteContext.Provider value={{ Notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;