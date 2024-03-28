import * as React from 'react';
import { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function UpdateBusiness(props) {
    const {id,name,address,phone,owner,logo,description} = props;
    const [data, setData] = useState({
        id: id,
        name: name,
        address: address,
        phone: phone,
        owner: owner,
        logo: logo,
        description: description
    });

    function handelChenge(field, value) {
        let enter = data;
        enter[field] = value;
        setData(enter);
        console.log(data);
    }

    

    return (
        <Box component="form" sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
        }} noValidate autoComplete="off" >

                <div>
                    <div>
                        <TextField label="Name" type="text" color="info"
                            onChange={(e) => handelChenge('name', e.target.value)} />
                    </div>
                    <div>
                        <TextField label="Address" type="text" color="info"
                            onChange={(e) => handelChenge('address', e.target.value)} />
                    </div>
                    <div>
                        <TextField label="Phone" type="text" color="info"
                            onChange={(e) => handelChenge('phone', e.target.value)} />
                    </div>
                    <div>
                        <TextField label="Owner" type="text" color="info"
                            onChange={(e) => handelChenge('owner', e.target.value)} />
                    </div>
                    <div>
                        <TextField label="Logo" type="text" color="info"
                            onChange={(e) => handelChenge('logo', e.target.value)} />
                    </div>
                    <div>
                        <TextField label="Description" type="text" color="info"
                            onChange={(e) => handelChenge('description', e.target.value)} />
                    </div>
                </div>

                <div style={{ margin: '10px' }}>
                    <Button variant="outlined" size="large" color="info">
                        send
                    </Button>
                </div>

        </Box>
    );
}
