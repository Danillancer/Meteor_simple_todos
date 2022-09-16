import { AppBar, CssBaseline, List } from "@mui/material";
import { Container } from "@mui/system";
import { useTracker } from "meteor/react-meteor-data";
import React from "react";
import { TasksCollection } from "../api/TasksCollection.js";
import { Task } from "./Task.jsx";
import { TaskForm } from "./TaskForm.jsx";

export const App = () => {
  const tasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  );
  const toggleChecked = ({ _id, isChecked }) => {
    TasksCollection.update(_id, {
      $set: {
        isChecked: !isChecked,
      },
    });
  };
  const deleteTask = ({ _id }) => TasksCollection.remove(_id);
  return (
    <>
      <CssBaseline />
      <AppBar position="static" sx={{mb:2}}>
        <h1>Welcome to Meteor!</h1>
        </AppBar>
      <Container maxWidth="sm">
        <div>
          <TaskForm />
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
        </div>
      </Container>
    </>
  );
};
