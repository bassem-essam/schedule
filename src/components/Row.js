import TableCell from '@mui/material/TableCell';
import { messages, importance } from '../importance'

function Row(props){
  let data = props.data.sort(compareTimes);
  data = new Array(6).fill(0);
  for (let d of props.data){
    data[d.time - 1] = d;
  }
  let slots = data.map(
    (lect, index) => {
      if (lect == 0)
        return <TableCell key={index} className="empty"></TableCell>;
        
      const isLecture = lect.section == 0;
      let section =  isLecture ? lect.department : (lect.department + " sec " + lect.section);
      let whatsup = importance[!isLecture][lect.subject];
      let classes = ["cell", whatsup].join(" ")
      return (
      <TableCell key={index} className={classes}>
        <span className="txt-info">{messages[whatsup]}</span>
        <br/>
        <span className="txt-subject">{lect.subject}</span>
        <br/>
        <span className="txt-section">{section}</span>
        <br/>
        <span className="txt-instructor">{lect.instructor}</span>
      </TableCell>)
  });
  return slots;
}


function compareTimes(a, b){
  return Number(a.time) - Number(b.time);
}

export default Row;
