// import * as React from 'react';

// import { styled } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
// import TodayIcon from '@mui/icons-material/Today';

// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// //import { red } from '@mui/material/colors';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import AppointmentForm from '../client/addAppointment';


// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function Service() {
  
//   //we have to get the id in props from the map that exists in the serviceList 
//   const serviceId=753;

//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   const [appointment, setAppointment] = React.useState(false);

 
//   return (
//     <>
//     <Card sx={{ maxWidth: 290 }}>

//       {/* the header of the card */}
//       <CardHeader
//         title="Service Name"
//         subheader="Time of service."
//       />

//       {/* the picture of the service */}
//       <CardMedia
//         component="img"
//         height="194"
//         image="/assets/img.jpg"
//         alt="Paella dish"
//       />

//       <CardContent>
//         <Typography variant="body2" color="black">
//           Your description...
//         </Typography>
//       </CardContent>

//       {/* disableSpacing defines a space between the add appointment icon and expand more icon */}
//       <CardActions disableSpacing>
//         <IconButton onClick={(e)=> setAppointment(true)} aria-label="set an appointment">
//            <TodayIcon  />
//         </IconButton>
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>

//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography paragraph>Method:</Typography>
//           <Typography paragraph>
//             texttttttttttttttttttttttttttt.
//           </Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//     {appointment && <AppointmentForm serviceId={serviceId} setAppointment={setAppointment}></AppointmentForm>}
//     </>
   
//   );
// }


import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, useLocation } from 'react-router-dom';


import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import TodayIcon from '@mui/icons-material/Today';
import { Button } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import { red } from '@mui/material/colors';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppointmentForm from '../client/addAppointment';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Service(props) {
  const { id, name, description, price, duration } = props;

  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Check if the current URL matches the admin URL
    setIsAdmin(location.pathname.includes('/admin'));
  }, [location.pathname]);

  //we have to get the id in props from the map that exists in the serviceList 
  //const serviceId = 753;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [appointment, setAppointment] = useState(false);


  return (
    <>
      {console.log("props in service", name)}
      <Card sx={{ maxWidth: 290 }}>

        {/* the header of the card */}
        <CardHeader
          title={name}
          subheader={`${duration} minutes`}
        />

        {/* the picture of the service */}
        {/* <CardMedia
        component="img"
        height="194"
        image="/assets/img.jpg"
        alt="Paella dish"
      /> */}

        <CardContent>
          <Typography variant="body2" color="black">
            {/* Your description... */}{description}
          </Typography>
        </CardContent>

        {/* disableSpacing defines a space between the add appointment icon and expand more icon */}
        <CardActions disableSpacing>
          {/* <Button  color='warning'> */}
          {!isAdmin && <IconButton //aria-label="set an appointment"
            size="large"
            edge="start"
            color="warning"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={(e) => setAppointment(true)}
          >
            <TodayIcon />
          </IconButton>}
          {/* </Button> */}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Price:</Typography>
            <Typography paragraph>
              {price} $
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      {appointment && <AppointmentForm serviceName={name} setAppointment={setAppointment}></AppointmentForm>}
    </>

  );
}

