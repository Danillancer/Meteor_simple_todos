import { Button, Checkbox, ListItem } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
export const Task = ({ task, onCheckboxClick, onDeleteClick  }) => {
  return (
  <ListItem sx={{p: "8px 0 8px 0",justifyContent:'space-between'}}>
    <label>
    <Checkbox
      checked={!!task.isChecked}
      onClick={() => onCheckboxClick(task)}
      readOnly
    />
    <span>{task.text}</span>
    </label>
    <Button color="error" onClick={()=> onDeleteClick(task)} ><DeleteIcon/></Button>
  </ListItem>
  )
};