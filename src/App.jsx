import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import EnhancedTable from './components/admin/meetingTable';
import SiteDoesntExist from './components/siteDoesntExist';
import Service from './components/admin/service';
import AppointmentForm from './components/client/addAppointment';
import MenuAppBar from './components/bar';
import AddNewService from './components/admin/addNewService'
import ServicesList from './components/admin/servicesList';
import Admin from './components/admin/admin';
import LogInForm from './components/login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true') {
      setLoggedIn(true);
    }
  },[]);

  return (<>

    <Router>

      <Routes >

        <Route path="/" element={loggedIn?<><MenuAppBar /><ServicesList /></>: <SiteDoesntExist setLoggedIn={setLoggedIn}></SiteDoesntExist>} />
        <Route path="/admin" element={<><MenuAppBar /><LogInForm setLoggedIn={setLoggedIn}/></>} />
        <Route path="/admin/services" element={<><MenuAppBar /><Admin /><ServicesList /></>} />
        <Route path="/admin/appointments" element={<><MenuAppBar /><Admin />< EnhancedTable /></>} />
      
      </Routes>

    </Router>

  </>)
}
export default App;