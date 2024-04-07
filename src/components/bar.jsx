import { useState } from 'react';

import store from '../store/businessDetails';
import LogInForm from './login';
import UpdateBusiness from './admin/updateBusiness';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';


export default function withRouter(MenuAppBar) {
    const [auth, setAuth] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [clickedLogIn, setClickedLogIn] = useState(false);
    const [clickedUpdate, setClickedUpdate] = useState(false);


    const business = store.get;
    // function initBusiness(){
    //     if(business=={})
    //     store.addDetails({
    //         id: "123",
    //         name: "Coding Academy",
    //         address: "Rothschild 60 Tel Aviv",
    //         phone: "03-1234567",
    //         owner: "Yariv Katz",
    //         logo: "https://coding-academy.org/images/ca_logo.png",
    //         description: "The best coding academy in the world"})
    // }

    // {
    //     id: "123",
    //     name: "Coding Academy",
    //     address: "Rothschild 60 Tel Aviv",
    //     phone: "03-1234567",
    //     owner: "Yariv Katz",
    //     logo: "https://coding-academy.org/images/ca_logo.png",
    //     description: "The best coding academy in the world",
    // };

    function handleClickLogIn() {
        setClickedLogIn(true);
        // setStyle({opacity: 0});
    }

    function handleClickUpdate() {
        setClickedUpdate(true);
        // setStyle({opacity: 0});
    }

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (<>
        <Box sx={{ flexGrow: 1 }} style={{ color: 'chocolate' }} >
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={auth}
                            onChange={handleChange}
                            aria-label="login switch"
                            color='warning'
                            onClick={() => handleClickLogIn()}
                        />
                    }
                    label={auth ? 'Login as administrator' : 'Login as a customer'}
                />
            </FormGroup>
            <AppBar position="fixed" color="inherit" >
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="warning"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => handleClickUpdate()}
                    >
                        <CreateIcon />
                    </IconButton>
                    {/* {()=>initBusiness()} */}
                    <div>
                        <h3>name: {business.name}</h3>
                        <h4>address: {business.address}</h4>
                        <h4>phone: {business.phone}</h4>
                        <h4>owner: {business.owner}</h4>
                        <h4>description: {business.description}</h4>
                    </div>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="warning"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
        {clickedLogIn && <LogInForm></LogInForm>}
        {clickedUpdate && <UpdateBusiness {...business}></UpdateBusiness>}

    </>
    );
}
