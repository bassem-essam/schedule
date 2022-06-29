import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Day from "./Day";
import { data } from "../data.js";
import { tableslots as slots } from '../times.js'

function TableView(props) {
  let days = {};
  let indices = props.indices;

  for (let ind of indices) {
    if (!days[data[ind].day]) days[data[ind].day] = [];

    days[data[ind].day].push(data[ind]);
  }

  let dayNames = Object.keys(days);
  dayNames = dayNames.sort(compareDays);
  
  let heads = slots.map((slot, i) => <TableCell key={i} sx={{ textAlign: "center", border: 1 }}>
  {slot}
  </TableCell>)
  return (
    <Table sx={{ textAlign: "center", direction: "rtl" }}>
      <TableHead>
        <TableRow>{heads}</TableRow>
      </TableHead>
      <TableBody>
        {dayNames.map((day, count) => (
          <Day name={day} key={count++} data={days[day]} />
        ))}
      </TableBody>
    </Table>
  );
}
function compareDays(a, b) {
  let dayIndices = [
    "السبت",
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
  ];
  return dayIndices.indexOf(a) - dayIndices.indexOf(b);
}

export default TableView;
