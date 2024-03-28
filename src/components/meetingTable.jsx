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

function createData(id, serviceType, dateTime,clientName, clientPhone, clientEmail) {
    return {
        id,
        serviceType,
        dateTime,
        clientName,
        clientPhone,
        clientEmail,
    };
}

const rows =  [store.meetingsList.map(x=> createData(x.id, x.serviceType, x.dateTime, x.clientName, x.clientPhone, x.clientEmail))];
// console.log(store.meetingsList);
// [createData(1, 'Service one', 305, 'Client One', "05-....", "Client@gmail.com"),
// createData(1, 'Service two', 305, 'Avigail Choen', "0556776658", "Ac8531286@gmail.com")];

const headCells = [
    //id, serviceType, dateTime,clientName, clientPhone, clientEmail
    {
        id: 'serviceType',
        numeric: false,
        disablePadding: true,
        label: 'Service',
    },
    {
        id: 'dateTime',
        numeric: true,
        disablePadding: false,
        label: 'Date',
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
//export default function EnhancedTable 
const EnhancedTable = observer(() =>{
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
                                        <TableCell align="center">{row.serviceType}</TableCell>
                                        <TableCell align="center">{row.dateTime}</TableCell>
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
                    rowsPerPageOptions={[5, 10, 25]}
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