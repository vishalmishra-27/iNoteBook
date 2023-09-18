import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import NoteState from './Context/Notes/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import Notes from './components/Notes';

function App() {
  return (
    <div className="App">
      <NoteState>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/Notes' element={<Notes />} />
          <Route exact path='/Login' element={<Login />} />
          <Route exact path='/Signup' element={<Signup />} />
        </Routes>
      </NoteState>
    </div>
  );
}

export default App;