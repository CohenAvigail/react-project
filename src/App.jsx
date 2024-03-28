import { useState } from 'react';
import './App.css';
import EnhancedTable from './components/meetingTable';
import SiteDoesntExist from './components/siteDoesntExist';
import Service from './components/admin/service';
import AppointmentForm from './components/client/appointment';
import AddNewService from  './components/admin/addNewService';


function App() {

  const [exist, setExist]= useState(false);
  

  return (<><EnhancedTable></EnhancedTable>
    {/* { exist? <EnhancedTable></EnhancedTable> : <SiteDoesntExist></SiteDoesntExist>} */}
    {/* <Service/> */}
    {/* <AppointmentForm></AppointmentForm> */}
    {/* <AddNewService/> */}
  </>)
}
export default App;
