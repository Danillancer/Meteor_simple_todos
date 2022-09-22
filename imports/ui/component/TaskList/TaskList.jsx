import { List } from '@mui/material'
import React from 'react'
import { Task } from './Task'

export const TaskList = ({tasks,toggleChecked,deleteTask}) => {
  return (
    <>
    <List>
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                />
              ))}
    </List>
    </>
  )
}
