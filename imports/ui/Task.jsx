import { Autocomplete, Box, Button, Checkbox, Chip, ListItem, TextField } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
export const Task = ({ task, onCheckboxClick, onDeleteClick  }) => {
  return (
  <ListItem key={task._id} sx={{p: "8px 0 8px 0",justifyContent:'space-between'}}>
    <label>
    <Checkbox
      checked={!!task.isChecked}
      onClick={() => onCheckboxClick(task)}
      readOnly
    />
    <span>{task.text}</span>
    </label>
    <Box sx={{display:"flex"}}>
    {task.tag? (task.tag.map(tag=>{
     return (<Chip label={tag.text} sx={{ml:1}}/>)
    })):<></>}
    <Button color="error" onClick={()=> onDeleteClick(task)} ><DeleteIcon/></Button>
    </Box>
  </ListItem>
  )
};

