import * as React from 'react';
import dayjs from 'dayjs';
import store from '../../store/meetingsStore';
import { observer } from 'mobx-react-lite';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

import Swal from 'sweetalert2';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BorderColor } from '@mui/icons-material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AppointmentForm = observer((props)=> {
  const {serviceName,setAppointment} = props;
  const [open, setOpen] = React.useState(true);
  //const [cnt, setCnt] = React.useState(0);

  //let counter=0;


  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  const [date, setDate] = React.useState(null);

  const [data, setData] = React.useState({
    id:"",
    serviceType: ""+serviceName,
    dateTime: ""+date,
    clientName: "",
    clientPhone: "",
    clientEmail: "",
  });

  function handleChange(field, value) {
    let enter = data;
    enter[field] = value;
    setData(enter);
  }

  async function handleSave() {

    let res = await store.addMeeting(data);
    
    if(res.status == 400){
      // localStorage.setItem('clientName',data.clientName);
      // localStorage.setItem('clientPhone',data.clientPhone);
      // localStorage.setItem('clientEmail',data.clientEmail);
      // localStorage.setItem('serviceType',data.serviceType);
      // localStorage.setItem('error',true);

      handleClose();

      await Swal.fire({
        //position: "bottom-end",
        icon: "error",
        title: "Oops...",
        text: "The time you requested is not available...",
      });
      // setAppointment(true);

    }

    else if(res.status == 200){
      //setOpen(false);
      handleClose();
      await Swal.fire({
        icon: "success",
        title: "The appointment was successfully set!",
        text: "Thank you for contacting our services!",
      });
      localStorage.setItem('error',false);
      store.init();
      
    }
    
  }

  function handleClose () {
    setAppointment (false);
  };


  return (
    <React.Fragment>

      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>

        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title"> {data.serviceType} </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
        ><CloseIcon /></IconButton>

        <DialogContent dividers>
          <TextField id="nameId" label="Name" type="search" color="warning" 
            onChange={(e) => handleChange('clientName', e.target.value)} />
          <br /><br />
          <TextField id="phoneId" label="Phone" type="search" color="warning" 
            onChange={(e) => handleChange('clientPhone', e.target.value)} />
          <br /><br />
          <TextField id="emailId" name="email" label="Email Address" type="email" color="warning" 
            onChange={(e) => handleChange('clientEmail', e.target.value)} />
          <br /><br />
          <LocalizationProvider dateAdapter={AdapterDayjs} color ="warning" >
            <DemoContainer
              components={['DateTimePicker']} >
              <DateTimePicker
                
                color ="warning"
                label="Choose date and time."
                name="startDateTime"
                onChange={(e) => setDate(e)}
                referenceDate={dayjs(/*'2024-03-27T11:00'*/new Date())}
                onClose={(e) => handleChange('dateTime', date.$d.toJSON())} />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent >

        <DialogActions>
          <Button autoFocus type="submit" color="warning" onClick={handleSave} >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
})
export default AppointmentForm;