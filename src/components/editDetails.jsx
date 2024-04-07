import { observer } from "mobx-react-lite";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


const EditDetails = observer(() => {

    const business = {
        id: "123",
        name: "Coding Academy",
        address: "Rothschild 60 Tel Aviv",
        phone: "03-1234567",
        owner: "Yariv Katz",
        logo: "https://coding-academy.org/images/ca_logo.png",
        description: "The best coding academy in the world",
    };
    return (
    
    <Box>
        <Paper>
            

        </Paper>
    </Box>


    )
})
export default EditDetails;