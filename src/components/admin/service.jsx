import * as React from 'react';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import TodayIcon from '@mui/icons-material/Today';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import { red } from '@mui/material/colors';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppointmentForm from '../client/appointmentTrying';


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

export default function Service() {
  
  //we have to get the id in props from the map that exists in the serviceList 
  const serviceId=753;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [appointment, setAppointment] = React.useState(false);

 
  return (
    <>
    <Card sx={{ maxWidth: 290 }}>

      {/* the header of the card */}
      <CardHeader
        title="Service Name"
        subheader="Time of service."
      />

      {/* the picture of the service */}
      <CardMedia
        component="img"
        height="194"
        image="/assets/img.jpg"
        alt="Paella dish"
      />

      <CardContent>
        <Typography variant="body2" color="black">
          Your description...
        </Typography>
      </CardContent>

      {/* disableSpacing defines a space between the add appointment icon and expand more icon */}
      <CardActions disableSpacing>
        <IconButton aria-label="set an appointment">
           <TodayIcon onClick={(e)=> setAppointment(true)} />
        </IconButton>
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            texttttttttttttttttttttttttttt.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    {appointment && <AppointmentForm serviceId={serviceId} setAppointment={setAppointment}></AppointmentForm>}
    </>
   
  );
}
