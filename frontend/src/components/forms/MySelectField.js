import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import Menu from '@mui/material/Menu';

export default function MySelectField(props) {
    const {label, name, control} = props
  return (
    <div>
      <FormControl sx={{ m: 2, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
        <Controller
                name = {name}
                control = {control}
                render={({
                    field:{onChange,value},
                    fieldState:{error},
                    formState,
                }) =>(
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        onChange={onChange}
                        value={value}
                        >
                        <MenuItem value={""}>Default</MenuItem>
                        <MenuItem value={"Xd"}><em>None</em></MenuItem>
                        <MenuItem value={"What about"}>What about</MenuItem>
                    </Select>
        )
        } 
        />
      </FormControl>
    </div>
  );
}