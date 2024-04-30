import * as React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import store from '../../store/meetingsStore';

import RestoreIcon from '@mui/icons-material/Restore';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import  Chip  from '@mui/material/Chip';





function createData(id, serviceType, dateTime,clientName, clientPhone, clientEmail) {
    console.log("id ************ ",id);
    return {
        id,
        serviceType,
        dateTime,
        clientName,
        clientPhone,
        clientEmail,
    };
}   

const headCells = [
    {
        id:"appointmentId",
        numeric: false,
        disablePadding: true,
        label: 'ID',
    },
    {
        id: 'serviceType',
        numeric: false,
        disablePadding: false,
        label: 'Service',
    },
    {
        id: 'date',
        numeric: true,
        disablePadding: false,
        label: 'Date',
    },
    {
        id: 'time',
        numeric: true,
        disablePadding: false,
        label: 'Time',
    },
    {
        id: 'clientName',
        numeric: true,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'clientPhone',
        numeric: true,
        disablePadding: false,
        label: 'Phone',
    },
    {
        id: 'clientEmail',
        numeric: true,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'isTodaty',
        numeric: true,
        disablePadding: false,
        label: 'Status',
    },
];

//this fubction creates the title of each coll in the table  - the function is taken from mui
function EnhancedTableHead() {
    return (<TableHead>
        <TableRow>
            {headCells.map((headCell) => (
                <TableCell key={headCell.id} align="center">
                    {headCell.label}
                </TableCell>))}
        </TableRow>
    </TableHead>);
}

EnhancedTableHead.propTypes = {
    rowCount: PropTypes.number.isRequired,
};


const EnhancedTable = observer(() =>{

    //this function compares the dates of the meetings
    function compareDates(date){
        const today = new Date();
        const newDate = new Date(date);
        
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth() + 1; // Note: Months are zero-based (0-11), so add 1
        const todayDay = today.getDate();

        const newDateYear = newDate.getFullYear();
        const newDateMonth = newDate.getMonth() + 1; // Note: Months are zero-based (0-11), so add 1
        const newDateDay = newDate.getDate();

        if(newDateYear !== todayYear) {
            return newDateYear - todayYear;
        }   
        
        //else, the years are equal:
        if(newDateMonth !== todayMonth) {
            return newDateMonth - todayMonth;
        }    
        
        //else, the monthes are equal:  
        return newDateDay - todayDay;
    }

    function extractDate(dateTimeString){
        
        const dateTime = new Date(dateTimeString);
       
        const year = dateTime.getFullYear();
        const month = dateTime.getMonth() + 1; // Note: Months are zero-based (0-11), so add 1
        const day = dateTime.getDate();
        
        // Format the date as needed (DD-MM-YYYY)
        const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
        
        return formattedDate;

    }

    function extractTime(dateTimeString){
        
        // Extract time part
        let parts = dateTimeString.split('T');

        // Extract the first 5 characters (HH:MM)
        let timePart = parts[1].substring(0, 5); 
        
        return timePart;
    }

    const[getFunction, setGetFunction]  = React.useState(store.getMeetings);


     const rows = 
    (store.getMeetings).map(x=> createData(x.id, x.serviceType, x.dateTime, x.clientName, x.clientPhone, x.clientEmail));
    console.count("getFunction")
    // const[history, setHistory] = React.useState(false);
    // const [rows, setRows] = React.useState((store.getMeeting).map(x=> createData(x.id, x.serviceType, x.dateTime,x.dateTime, x.clientName, x.clientPhone, x.clientEmail))) ;
    // history&& setRows ((store.getMeetingsHistory).map(x=> createData(x.id, x.serviceType, x.dateTime,x.dateTime, x.clientName, x.clientPhone, x.clientEmail)));
    

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(() => rows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    ));

    return (<>
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <EnhancedTableHead rowCount={rows.length} />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow hover key={row.id}  >
                                        <TableCell align="center">{row.id}</TableCell>
                                        <TableCell align="center">{row.serviceType}</TableCell>
                                        <TableCell align="center">{extractDate(row.dateTime)}</TableCell>
                                        <TableCell align="center">{extractTime(row.dateTime)}</TableCell>
                                        <TableCell align="center">{row.clientName}</TableCell>
                                        <TableCell align="center">{row.clientPhone}</TableCell>
                                        <TableCell align="center">{row.clientEmail}</TableCell>
                                        <TableCell align="center">
                                            {
                                             compareDates(row.dateTime) < 0 ? <Chip label="PAST" color="primary" variant="outlined" /> :
                                             compareDates(row.dateTime) == 0 ? <Chip label="TODAY" color="success" variant="outlined" /> :
                                             compareDates(row.dateTime) > 0 && <Chip label="FUTURE" color="warning" variant="outlined" /> 
                                            }        
                                        </TableCell>
                                    </TableRow>
                                    
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

 
                {/* This component is the bottom line of the table */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}>
                       
                </TablePagination>
            </Paper>
        </Box>
        {/*  
        <RestoreIcon onClick={setGetFuntion(store.getMeetingsHistory)}/>*/}
        </>
    );
});

export default EnhancedTable;

// export const Rows = React.memo(()=>{

//   const rows =  (getFunction).map(x=> createData(x.id, x.serviceType, x.dateTime, x.clientName, x.clientPhone, x.clientEmail));
  
//   return(<>
      
//   </>)

// })