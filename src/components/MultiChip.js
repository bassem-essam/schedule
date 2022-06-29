import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { courses } from '../data.js'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let names = Object.keys(courses)
names = names.sort((a, b) => {
  return courses[b].length - courses[a].length
})

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    let res = typeof value === 'string' ? value.split(',') : value;
    props.handleChange({subject: res});
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300}}>
        <InputLabel id="demo-multiple-chip-label">Course</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={props.filter.subject}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => {
            return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        }
          MenuProps={MenuProps}
        >
          {names.map((name) => {

            if (name == '')
              name = "All courses"
            
            return (<MenuItem
              key={name}
              value={name}
              style={getStyles(name, props.filter.subject, theme)}
            >
              {name}
            </MenuItem>
          
          )}
          )}
        </Select>
        <label>{Object.keys(personName)}</label>
      </FormControl>
    </div>
  );
}