import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import EnhancedTable from './components/meetingTable';
import SiteDoesntExist from './components/siteDoesntExist';
import Service from './components/admin/service';
import AppointmentForm from './components/client/appointmentTrying';
import MenuAppBar from './components/bar';
import AddNewService from './components/admin/addNewService'
import ServicesList from './components/admin/servicesList';
import Admin from './components/admin/admin';

function App() {
  const [exist, setExist] = useState(false);

  return (<>
    
    <MenuAppBar />
    <Router>
      <Routes >
        <Route path="/siteDoesNotExist" element={<SiteDoesntExist/>}/>
        <Route path="/" element={<><MenuAppBar /></>} />
        <Route path="/admin" element={<><Admin /></>} />
        <Route path="/admin/services" element={<><Admin /><Service /><ServicesList /></>} />
        <Route path="/admin/appointments" element={<><Admin />< EnhancedTable /></>} />

          {/* <Route path="/servicesList" element={<><Service /></>} /> */}
      </Routes>
    </Router>
    {/* <MenuAppBar/> */}
    {/* { exist? <EnhancedTable></EnhancedTable> : <SiteDoesntExist></SiteDoesntExist>} */}
    {/* <Service /> */}
    {/* <AppointmentForm></AppointmentForm> */}
    {/* <ServicesList/> */}
    {/* <AddNewService/> */}
    {/* <Admin></Admin> */}
  </>)
}
export default App;