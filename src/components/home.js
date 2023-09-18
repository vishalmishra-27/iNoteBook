import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  return (
    <div id='homecontainer' >
      <div id='sitedescription' >iNoteBook is an online notepad wherein you can securely save your notes, to-do lists and access them whenever you want by simply logging in to your iNoteBook account</div>
      <h2>{localStorage.getItem('token') && <div><Link id='gotonotes' to={'/Notes'}>Let's go to your Notes</Link></div>}</h2>
    </div>
  )
}

export default Home