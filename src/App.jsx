import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then(userData => {
      if(userData) {
        dispatch(login({userData}));
      } else {
        dispatch(logout());
      }
  })
    .finally(() => setLoading(false));
  }, []);
  if(loading) {
    return <div>Loading...</div>
  }
  return (
    <div className="min-h-screen flex flex-wrap content-between">
    <div className='w-full block'>
      <Header />
      <main>
        TODO: {/* TODO: <outlet /> */}
      </main>
      <Footer />
    </div>
        <h1>MegaBlog</h1>
    </div>
  );
}

export default App
