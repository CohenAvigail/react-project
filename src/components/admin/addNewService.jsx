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
// export default function AddNewService 

const AddNewService = observer(() => {
    const [data, setData] = useState({
        id: "",
        name: "",
        description: "",
        price: 0,
        duration: 0

    });

    const [open, setOpen] = React.useState(true);

    function handelChenge(field, value) {
        let enter = data;
        enter[field] = value;
        setData(enter);
        console.log(data);
    }

    function handleSave() {
        store.addService(data);
        // console.log(store.get());
        setOpen(false);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        // <Box component="form" sx={{
        //     '& .MuiTextField-root': { m: 1, width: '25ch' },
        // }} noValidate autoComplete="off" >
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
                            onChange={(e) => handelChenge('name', e.target.value)} />
                        <br /><br />
                        <TextField label="Description" type="text" color="warning"
                            onChange={(e) => handelChenge('description', e.target.value)} />
                        <br /><br />
                        <TextField label="Price" type="text" color="warning"
                            onChange={(e) => handelChenge('price', e.target.value)} />
                        <br /><br />
                        <TextField label="Duration" type="number" color="warning" 
                            onChange={(e) => handelChenge('duration', e.target.value)} />
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
        // </Box >
    );
}
)
export default AddNewService;





// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';

// export default function FormDialog() {
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open form dialog
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           component: 'form',
//           onSubmit: (event) => {
//             event.preventDefault();
//             const formData = new FormData(event.currentTarget);
//             const formJson = Object.fromEntries(formData.entries());
//             const email = formJson.email;
//             console.log(email);
//             handleClose();
//           },
//         }}
//       >
//         <DialogTitle>Subscribe</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="name"
//             name="email"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="standard"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button type="submit">Subscribe</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }