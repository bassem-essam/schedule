import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { data } from "../data";
import { messages, importance } from "../importance";
import { gridslots as slots } from "../times.js";

let GridView = (props) => {
  let days = {};
  let dayIndices = [
    "السبت",
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
  ];

  let indices = props.indices;

  for (let ind of indices) {
    if (!days[data[ind].day]) days[data[ind].day] = [];

    days[data[ind].day].push(data[ind]);
  }

  let dayNames = Object.keys(days);
  dayNames = dayNames.sort((a, b) => {
    return dayIndices.indexOf(a) - dayIndices.indexOf(b);
  });
  let filteredData = [];
  for (let day of dayNames) {
    let dayData = days[day].sort((a, b) => {
      return a.time - b.time;
    });
    filteredData = filteredData.concat(dayData);
  }

  return (
    <Container sx={{ padding: 3, background: "#dedede" }}>
      <Grid spacing={2} container>
        {Object.keys(filteredData).map((key, i) => {
          let item = filteredData[key];
          const isLecture = item.section === 0;
          let whatIsIt = isLecture ? "Lecture" : "sec " + item.section;
          let whatsup = importance[!isLecture][item.subject];
          let classes = ["cell", whatsup].join(" ");
          return (
            <Grid key={i} item md={6} xs={12}>
              <Box
                className={classes}
                sx={{ padding: 3, border: 3, direction: "rtl" }}
              >
                <p><b>{messages[whatsup]}</b></p>
                <p><b>{slots[item.time - 1]}</b></p>
                <p>{item.day}</p>
                <p>{item.subject}</p>
                <p>
                  {item.department} {whatIsIt}
                </p>
                <p>المكان: {item.place}</p>
                <p>{item.instructor}</p>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default GridView;
