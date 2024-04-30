import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route,useNavigate, useLocation } from 'react-router-dom';


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

export default function MenuAppBar() {
    const [auth, setAuth] = useState(true);
    const [clickedLogIn, setClickedLogIn] = useState(false);
    const [clickedUpdate, setClickedUpdate] = useState(false);
    const [business, setBusiness] = useState(store.getBusinessDetails)
    const [isAdmin, setIsAdmin] = useState(false);

    const location = useLocation();
    const nav = useNavigate();

    useEffect(()=>{
        // Check if the current URL matches the admin URL
        setIsAdmin(location.pathname.includes('/admin'));
    },[location.pathname])


    // useEffect(() => {
    //     console.log('useEffect store.businessDetails', store.businessDetails)
    //     setBusiness(store.businessDetails);
    //     // setBusiness({name:'aaa'})
    // }, [])


    function handleClickLogIn() {
        if(location.pathname.includes('/admin')){
            
        }
        setClickedLogIn(true);
    }

    function handleClickUpdate() {
        setClickedUpdate(true);
    }

    const handleChange = (event) => {
        if (location.pathname.includes('/admin')){
            nav('/');
        }
        setAuth(event.target.checked);
    };

    // const handleMenu = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    return (<>
        <Box sx={{ flexGrow: 1 }} style={{ color: 'chocolate' }} >
            {/* <FormGroup>
                
            </FormGroup> */}
            <AppBar position="fixed" color="inherit" >
                <Toolbar style={{justifyContent:'center'}}>
                    <div style={{marginRight:'auto'}}>
                    {isAdmin && <IconButton
                        size="large"
                        edge="start"
                        color="warning"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleClickUpdate}
                    >
                        <CreateIcon />
                    </IconButton>}
                    </div>
                    {/* {()=>initBusiness()} */}
                    <div>
                        <h3>{business.name}</h3>
                        <h4>{business.address}</h4>
                        <h4>{business.phone}</h4>
                        <h4>{business.owner}</h4>
                        <h4>{business.description}</h4>
                    </div>
                    <div style={{marginLeft:'auto'}}>
                        {/* <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="warning"
                        >
                            <AccountCircle />
                        </IconButton> */}
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={auth}
                                    onChange={handleChange}
                                    aria-label="login switch"
                                    color='warning'
                                    onClick={handleClickLogIn}
                                />
                            }
                            label={auth ? 'Login' : 'Logout'}
                        />
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
        {clickedLogIn && <LogInForm/>}
        {clickedUpdate && <UpdateBusiness {...business} setBusiness={setBusiness} business={business}></UpdateBusiness>}

    </>
    );
}
