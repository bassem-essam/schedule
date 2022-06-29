import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from '@mui/material/Checkbox';
import Container from "@mui/material/Container";
import React from "react";
import MultipleSelectChip from "./MultiChip";

function FilterBar(props) {
  let depts = ["CS", "SC", "IS", "CSYS"];
  let sections = Array.from(Array(6).keys()).map(i => String(i + 1))

  let [lecture, setLecture] = React.useState(true)

  let lectureHandleChange = (event) => {
    let res = event.target.checked;
    setLecture(res)
    props.onChange({lecture: res});
  }

  return (
    <Container sx={{ direction: "rtl", padding: "5px", textAlign: "center" }}>
      <Box
        component="form"
        autocomplete="on"
        sx={{
          "& > :not(style)": { maxWidth: "40ch" },
        }}
      >
        <FormGroup>
          <MultipleSelectChip
            filter={props.filter}
            handleChange={props.onChange}
          />
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Department
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={props.filter.department}
              onChange={(e) => props.onChange({ department: e.target.value })}
              sx={{ textAlign: "left" }}
            >
              <MenuItem key="" value="">
                <em>All departments</em>
              </MenuItem>
              {depts.map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Section
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={props.filter.section}
              onChange={(e) => props.onChange({ section: e.target.value })}
              sx={{ textAlign: "left" }}
            >
              <MenuItem key="" value="">
                <em>All sections</em>
              </MenuItem>
              {sections.map((item) => (
                <MenuItem key={item} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel 
          sx={{margin: "0 auto"}} 
          control={<Checkbox 
            checked={lecture}
            onChange={lectureHandleChange}
            />} 
           label="Lectures" />
        </FormGroup>
      </Box>
    </Container>
  );
}

export default FilterBar;
