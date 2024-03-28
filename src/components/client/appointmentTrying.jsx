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

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AppointmentForm = observer((props)=> {
  
  const {serviceId} = props;
  const [open, setOpen] = React.useState(true);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  const [date, setDate] = React.useState(null);

  const [data, setData] = React.useState({
    serviceType: ""+serviceId,
    dateTime: ""+date,
    clientName: "",
    clientPhone: "",
    clientEmail: "",
  });

  function handelChenge(field, value) {
    console.log(value)
    let enter = data;
    enter[field] = value;
    setData(enter);
    console.log(data);
  }

  // function handleSave() {
  //   setOpen(false);
  // }

  function handleClose () {
    setOpen(false);
    console.log(data);

    // let res= await 
    store.addMeeting(data);
  };


  return (
    <React.Fragment>

      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>

        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">  Modal title </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
        ><CloseIcon /></IconButton>

        <DialogContent dividers>
          <TextField label="Name" type="search" color="warning"
            onChange={(e) => handelChenge('clientName', e.target.value)} />
          <br /><br />
          <TextField label="Phone" type="search" color="warning"
            onChange={(e) => handelChenge('clientPhone', e.target.value)} />
          <br /><br />
          <TextField label="Email" type="email" color="warning"
            onChange={(e) => handelChenge('clientEmail', e.target.value)} />
          <br /><br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['DateTimePicker']} >
              <DateTimePicker
                label="Choose date and time."
                name="startDateTime"
                onChange={(e) => setDate(e)}
                referenceDate={dayjs('2024-03-27T11:00')}
                onClose={(e) => handelChenge('dateTime', date.$d.toJSON())} />
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent >

        <DialogActions>
          <Button autoFocus type="submit" color="warning" onClick={handleClose} >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
})
export default AppointmentForm;