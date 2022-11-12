import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Loading from '../Loading.js';


const columns = [
  { id: 'studentID', label: 'Student ID', minWidth: 140, align: 'center' },
  { id: 'keyNumber', label: 'Key Number', minWidth: 120, align: 'center' },
  {
    id: 'handoverTime',
    label: 'Handover Time',
    minWidth: 140,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'returnTime',
    label: 'Return Time',
    minWidth: 140,
    align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'duration',
    label: 'Duration',
    minWidth: 140,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
];


export default function ViewTable(props) {
  const [rows, setRows] = useState([])
  const methods = require('../methods.js');
  const [selectHistory, setSelectHistory] = useState('not returned');

  useEffect(() => {
    if(selectHistory=="all"){
      setRows(props.data);
    }
    else if(selectHistory=="today"){
      let data = props.data;
      let tmp = [];
      for(let i=0; i<data.length; i++){
        let s = data[i].handoverTime;
        s = s.split(", ");
        let todaysDate = methods.getDate();
        if(todaysDate == s[0]){
          tmp.push(data[i]);
        }
      }
      setRows(tmp);
    }
    else if(selectHistory == "not returned"){
      let data = props.data;
      let tmp = [];
      for(let i=0; i<data.length; i++){
        if(data[i].duration == "-"){
          tmp.push(data[i]);
        }
      }
      setRows(tmp);
    }
  }, [selectHistory])
  

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <div>


      <center>
            <div className="col-4" style={{marginLeft:"-16px"}}>
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} fullWidth>
                    <InputLabel id="demo-simple-select-filled-label">Select one</InputLabel>
                    <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={selectHistory}
                    onChange={(e)=>setSelectHistory(e.target.value)}
                    >
                    <MenuItem value={"today"}>Today's History</MenuItem>
                    <MenuItem value={"not returned"}>On Service Keys</MenuItem>
                    <MenuItem value={"all"}>All History (Life Time)</MenuItem>
                    </Select>
                </FormControl>
            </div>
            </center>

    {rows.length?
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <TableContainer sx={{ maxHeight:"71vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <b>{column.label}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Paper>
    : 
    <h1 align='center'><br/><br/>Nothing Found</h1>}
    </div>
  );
}
