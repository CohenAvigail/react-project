import { useState } from 'react';
// import store from '../../store/serviceStore';
import { observer } from 'mobx-react-lite';
import Service from './service';
import AddNewService from './addNewService';

//import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

const ServicesList = observer(() => {

    // const list = store.get();

    const [addService, setAddService] = useState(false);

    function handleClickUpdate() {
        setAddService(!addService);
    }

    return (<>
        {/* {list.map((x)=> <Service ></Service>)} */}
        <IconButton
            size="large"
            edge="start"
            color="warning"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => handleClickUpdate()}
        >
            <AddIcon />
        </IconButton>

        {addService && <AddNewService ></AddNewService>}

    </>)
}
)
export default ServicesList;