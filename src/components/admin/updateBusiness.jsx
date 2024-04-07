import * as React from 'react';
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../store/businessDetails';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

//export default function UpdateBusiness
const UpdateBusiness = observer((props)=> {
    const { id, name, address, phone, owner, logo, description } = props;
    const [data, setData] = useState({
        id: id,
        name: name,
        address: address,
        phone: phone,
        owner: owner,
        logo: logo,
        description: description
    });

    const [open, setOpen] = React.useState(true);

    async function handelSave() {
        store.updateDetails(data);
        setOpen(!open);
    }

    function handleClose() {
        setOpen(!open);
    }

    function handelChenge(field, value) {
        let enter = data;
        enter[field] = value;
        setData(enter);
        console.log(data);
    }

    
    return (
        <React.Fragment>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">Update Business Details</DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
                ><CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <TextField label="Name" type="text" color="warning"
                        onChange={(e) => handelChenge('name', e.target.value)} />
                    
                    <TextField label="Address" type="text" color="warning"
                        onChange={(e) => handelChenge('address', e.target.value)} />
                    <br /><br />
                    <TextField label="Phone" type="text" color="warning"
                        onChange={(e) => handelChenge('phone', e.target.value)} />
                    
                    <TextField label="Owner" type="text" color="warning"
                        onChange={(e) => handelChenge('owner', e.target.value)} />
                    <br /><br />
                    <TextField label="Logo" type="text" color="warning"
                        onChange={(e) => handelChenge('logo', e.target.value)} />
                    
                    <TextField label="Description" type="text" color="warning"
                        onChange={(e) => handelChenge('description', e.target.value)} />
                </DialogContent >
                <DialogActions>
                    <div style={{ margin: '10px' }}>
                        <Button variant="outlined" size="large" color="warning" onClick={handelSave}>
                            send
                        </Button>
                    </div>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
});
export default UpdateBusiness;