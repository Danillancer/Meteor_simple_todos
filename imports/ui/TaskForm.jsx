import React, { useState } from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';
import Box from '@mui/material/Box';
import { Button, TextField } from '@mui/material';
export const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    TasksCollection.insert({
      text: text.trim(),
      createdAt: new Date()
    });

    setText("");
  };
 
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{textAlign:'center'}}
    >
    <TextField id="standard-basic" variant="standard" placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}/>
        <Button type="submit" variant="contained" sx={{mt:0, ml:0.5}}>Add Task</Button>
    </Box>
  );
};