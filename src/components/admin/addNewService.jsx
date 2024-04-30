import * as React from 'react';
import { useState } from 'react';
import store from '../../store/serviceStore';
import { observer } from 'mobx-react-lite';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const AddNewService = observer(() => {
    const [data, setData] = useState({
        id: "",
        name: "",
        description: "",
        price: 0,
        duration: 0

    });

    const [open, setOpen] = React.useState(true);

    function handleChange(field, value) {
        let enter = data;
        enter[field] = value;
        setData(enter);
        console.log(data);
    }

    function handleSave() {
        store.addService(data);
        setOpen(false);
        store.init();
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title"> Add Service </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
                    color='warning'
                ><CloseIcon /> 
                </IconButton>
                <DialogContent dividers >
                    <div>
                        <TextField label="Name" type="text" color="warning"
                            onChange={(e) => handleChange('name', e.target.value)} />
                        <br /><br />
                        <TextField label="Description" type="text" color="warning"
                            onChange={(e) => handleChange('description', e.target.value)} />
                        <br /><br />
                        <TextField label="Price" type="text" color="warning"
                            onChange={(e) => handleChange('price', e.target.value)} />
                        <br /><br />
                        <TextField label="Duration" type="number" color="warning" 
                            onChange={(e) => handleChange('duration', e.target.value)} />
                        <br /><br />
                    </div>
                </DialogContent >

                <DialogActions>
                    <div style={{ margin: '10px' }}>
                        <Button variant="outlined" size="large" color="warning" onClick={handleSave}>
                            send
                        </Button>
                    </div>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
)
export default AddNewService;