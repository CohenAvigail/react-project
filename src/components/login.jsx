// import * as React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../store/logInStore';
import { useState } from 'react';
import { useNavigate, Router, BrowserRouter} from 'react-router-dom';
import ServicesList from './admin/servicesList';


// import Swal from 'sweetalert2';
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

const LogInForm = observer(() => {

    
    const nav = useNavigate();

    const [data, setData] = useState({
        name: '',
        password: ''
    });

    // const [isAdmin, setIsAdmin] = useState(false);

    const [open, setOpen] = useState(true);

    const [ok, setOk] = useState(false);

    async function handleLogIn() {
        let res = await store.addLogin(data);
        console.log("res: ", res);
        if (res.status == 401) {
            // Swal.fire
            alert("error");
        }
        else if (res.status == 200) {
            nav('/admin');
            setOk(true);
        }
        setOpen(false);
    }

    function handleClose() {
        setOpen(false);
    }


    function handleChange(field, value) {
        let enter = data;
        enter[field] = value;
        setData(enter);
    }

    return (
        // <React.Fragment>
        <>
        {/* // <BrowserRouter> */}
            {/* <Router> */}
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title"> Log In </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
                ><CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <TextField id="outlined-search" label="User Name" type="search" color="warning"
                        onChange={(e) => handleChange('name', e.target.value)} />
                    <br /><br />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        color="warning"
                        onChange={(e) => handleChange('password', e.target.value)}
                    />
                </DialogContent >
                <DialogActions>
                    <div style={{ margin: '10px' }}>
                        <Button variant="outlined" size="large" color="warning" onClick={handleLogIn}>
                            Log in
                        </Button>
                    </div>
                </DialogActions>
            </BootstrapDialog>
            {/* {ok && nav('/admin')} */}
            {/* </Router> */}
            {/* ,</BrowserRouter> */}
        {/* </React.Fragment> */}
</>
    );
});
export default LogInForm;
//withRouter()