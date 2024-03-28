import * as React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../store/logInStore';
import { useState } from 'react';


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const LogInForm = observer(() => {
    const [data,setData]=useState({
        name:'',
        password:''
    });

    async function handelLogIn(){
        let res=await store.addLogin(data);
        console.log("res: ",res);
        if(res.status==401){
            alert('error');
        }
        else if(res.status==200){
            alert('ok');
        }
    }

    function handelChenge(field,value){
        let enter=data;
        enter[field]=value;
        setData(enter);
        console.log(data);
    }

    return (
        <Box  component="form" sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }} noValidate autoComplete="off" >

            <Paper>

                <div>
                    <div>
                        <TextField id="outlined-search" label="User Name" type="search" color="info" 
                        onChange={(e)=>handelChenge('name',e.target.value)} />
                    </div>
                    <div>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            color="info"
                            onChange={(e)=>handelChenge('password',e.target.value)}
                        />
                    </div>
                </div>

                <div style={{ margin: '10px' }}>
                    <Button variant="outlined" size="large" color="info" onClick={handelLogIn}>
                        Log in
                    </Button>
                </div>

            </Paper>
        </Box>
    );
});
export default LogInForm;