import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Row from './Row'

function Place(props) {
  let row = <Row data={props.data}/>;
  let className = "";
  let header = [
  <TableCell key={0} className="day-head" rowSpan={props.daySpan}>{props.dayName}</TableCell>,
  <TableCell key={1} className="place-head">{props.name}</TableCell>
  ];
  
  if (!props['data-key'] == 0)
    header = header.splice(1);

  if (props.lastOne == props.length - 1){
     className = "last-row";
  }
  return (
  <React.Fragment>
  <TableRow className={className}>
  {header}
  {row}
  </TableRow>
  </React.Fragment>);
}

export default Place;
