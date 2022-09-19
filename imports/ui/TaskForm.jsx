import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Autocomplete, Button, TextField } from '@mui/material';
import TagField from './TagField';

export const TaskForm = () => {
  const [text, setText] = useState("");
  const [tagValue, setTagValue]= React.useState([]) 
  const [clearInput, setClearInput]=useState('')
  // console.log(tagValue);
  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('tasks.insert', text, tagValue);

    setText("");
    setTagValue([])
  };
 
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{textAlign:'center',display:"flex"}}
    >
    <TextField id="standard-basic" variant="standard" placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)} sx={{mr:0.5}}/>
      <TagField setTagValue={setTagValue} tagValue={tagValue} setClearInput={setClearInput}/>  
        <Button type="submit" variant="contained" sx={{mt:0, ml:0.5}}>Add Task</Button>
    </Box>
  );
};
