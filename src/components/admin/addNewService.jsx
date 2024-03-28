import * as React from 'react';
import { useState } from 'react';
// import store from '../../store/serviceStore';
//import store from '../../store/serviceStore';
import { observer } from 'mobx-react-lite';
// import singleton from '../../store/serviceStore'

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// export default function AddNewService 

 const AddNewService = observer(()=>{
    const [data, setData] = useState({
        id: "",
        name: "",
        description:"",
        price: 0,
        duration: 0

    });

    function handelChenge(field, value) {
        let enter = data;
        enter[field] = value;
        setData(enter);
        console.log(data);
    }

    function handleSave(){
        //store.addService(data);
        // console.log(store.get());
    }

    return (
        <Box component="form" sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }} noValidate autoComplete="off" >

           
                <div>
                    <div>
                        <TextField label="Name" type="text" color="warning"
                            onChange={(e) => handelChenge('name', e.target.value)} />
                    </div>
                    <div>
                        <TextField label="Description" type="text" color="warning"
                            onChange={(e) => handelChenge('description', e.target.value)} />
                    </div>
                    <div>
                        <TextField label="Price" type="text" color="warning"
                            onChange={(e) => handelChenge('price', e.target.value)} />
                    </div>
                    <div>
                        <TextField label="Duration" type="number" color="warning"
                            onChange={(e) => handelChenge('duration', e.target.value)} />
                    </div>
                </div>

                <div style={{ margin: '10px' }}>
                    <Button variant="outlined" size="large" color="warning" onClick={handleSave}>
                        send
                    </Button>
                </div>
{/*  */}
          
        </Box>
    );
}
)
export default AddNewService;