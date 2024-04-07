import * as React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import store from '../store/meetingsStore';

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

function createData(id, serviceType, date, time,clientName, clientPhone, clientEmail) {
    return {
        id,
        serviceType,
        date,
        time,
        clientName,
        clientPhone,
        clientEmail,
    };
}   

const headCells = [
    //id, serviceType, dateTime,clientName, clientPhone, clientEmail
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
];

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

    const rows =  
    (store.getMeeting).map(x=> createData(x.id, x.serviceType, x.dateTime,x.dateTime, x.clientName, x.clientPhone, x.clientEmail));
    

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
                                    <TableRow hover key={row.id}>
                                        <TableCell align="center">{row.id}</TableCell>
                                        <TableCell align="center">{row.serviceType}</TableCell>
                                        <TableCell align="center">{row.date}</TableCell>
                                        <TableCell align="center">{row.time}</TableCell>
                                        <TableCell align="center">{row.clientName}</TableCell>
                                        <TableCell align="center">{row.clientPhone}</TableCell>
                                        <TableCell align="center">{row.clientEmail}</TableCell>
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
        
        <RestoreIcon/>
        </>
    );
});

export default EnhancedTable;