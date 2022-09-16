import { Button, Checkbox } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
export const Task = ({ task, onCheckboxClick, onDeleteClick  }) => {
  return (
  <li>
    <Checkbox
      checked={!!task.isChecked}
      onClick={() => onCheckboxClick(task)}
      readOnly
    />
    <span>{task.text}</span>
    <Button color="error" onClick={()=> onDeleteClick(task)}><DeleteIcon/></Button>
  </li>
  )
};