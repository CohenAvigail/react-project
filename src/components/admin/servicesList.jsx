// import { useState } from 'react';
// // import store from '../../store/serviceStore';
// import { observer } from 'mobx-react-lite';
// import Service from './service';
// import AddNewService from './addNewService';

// //import CreateIcon from '@mui/icons-material/Create';
// import AddIcon from '@mui/icons-material/Add';
// import IconButton from '@mui/material/IconButton';

// const ServicesList = observer(() => {

//     // const list = store.get();

//     const [addService, setAddService] = useState(false);

//     function handleClickUpdate() {
//         setAddService(!addService);
//     }

//     return (<>
//         {/* {list.map((x)=> <Service ></Service>)} */}
//         <IconButton
//             size="large"
//             edge="start"
//             color="warning"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//             onClick={() => handleClickUpdate()}
//         >
//             <AddIcon />
//         </IconButton>

//         {addService && <AddNewService ></AddNewService>}

//     </>)
// }
// )
// export default ServicesList;



import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';

import store from '../../store/serviceStore';
import { observer } from 'mobx-react-lite';
import Service from './service';
import AddNewService from './addNewService';

import { styled } from '@mui/material/styles';

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    borderRadius: '50%',
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.common.black,
    '&:hover': {
        backgroundColor: theme.palette.warning.dark,
    },
}));

const ServicesList = observer(() => {
    const [firstVisibleIndex, setFirstVisibleIndex] = useState(0);

    const listServices = store.get;

    const [addService, setAddService] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);

    const location = useLocation();

    useEffect(() => {
        // Check if the current URL matches the admin URL
        setIsAdmin(location.pathname.includes( '/admin'));
    }, [location.pathname]);

    const handleNextClick = () => {
        setFirstVisibleIndex(firstVisibleIndex + 4);
    };

    const handlePrevClick = () => {
        setFirstVisibleIndex(Math.max(0, firstVisibleIndex - 4));
    };

    function handleClickUpdate() {
        setAddService(!addService);
    }

    return (
        <>
            {listServices && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StyledIconButton
                        size="large"
                        aria-label="show previous"
                        disabled={firstVisibleIndex === 0}
                        onClick={handlePrevClick}
                    >
                        <ArrowBackIosNewIcon />
                    </StyledIconButton>

                    {listServices.slice(firstVisibleIndex, firstVisibleIndex + 4).map((service) => (
                        <div key={service.id} style={{ width: '15vw', margin: '1vw' }}>
                            <Service
                                id={service.id}
                                name={service.name}
                                description={service.description}
                                price={service.price}
                                duration={service.duration}
                            />
                        </div>
                    ))}

                    <StyledIconButton
                        size="large"
                        aria-label="show next"
                        disabled={firstVisibleIndex + 4 >= listServices.length}
                        onClick={handleNextClick}
                    >
                        <ArrowForwardIosIcon />
                    </StyledIconButton>
                </div>
            )}

            {isAdmin && (
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
            )}

            {addService && <AddNewService />}
        </>
    );
});

export default ServicesList;
