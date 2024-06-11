import { useState } from 'react';
import './App.css'
import LoginForm from './components/LoginForm'
import Welcome from './components/Welcome';
import Notes from './components/Notes';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [name, setName] = useState('');

  return (
    <>
      {
        isLoggedIn ? (
          <>
            <Welcome name={name} setIsLoggedIn={setIsLoggedIn} />
          </>
        ) : (
          <>
            <LoginForm setIsLoggedIn={setIsLoggedIn} setName={setName} />
            <Notes />
          </>
        )
      }
    </>
  )
}