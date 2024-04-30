import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import ServicesList from './servicesList';
import EnhancedTable from './meetingTable';

import Button from '@mui/material/IconButton';
 
const Admin = observer(() => {
    
    const nav = useNavigate();

    const [services, setServices] = useState(false);
    const [appointment, setAppointment] = useState(false);


    function handleServices() {
        nav('/admin/services');
        setServices(true);
    }

    function handleAppoinment(){
        nav('/admin/appointments');
        setAppointment(true);
    }

    return (<>
        <Button
            size="large"
            edge="start"
            color="warning"
            aria-label="menu"
            sx={{ mr: 20 }}
            onClick={() => handleServices()}
        >
            Services
        </Button> 
        <Button
            size="large"
            edge="start"
            color="warning"
            aria-label="menu"
            sx={{ mr: 20 }}
            onClick={() => handleAppoinment()}
        >
            Appointment
        </Button>
       

    </>)
}
)
export default Admin;