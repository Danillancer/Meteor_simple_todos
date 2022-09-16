import { AppBar, Button, CssBaseline, List } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { TasksCollection } from "../api/TasksCollection.js";
import { Task } from "./Task.jsx";
import { TaskForm } from "./TaskForm.jsx";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );
  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
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
      <AppBar position="static" sx={{ mb: 2, pl: 1 }}>
        <h1>Welcome to Meteor!</h1>
      </AppBar>
      <Container maxWidth="sm">
        <div>
          <h1>
            📝️ To Do List :{pendingTasksCount ? ` ${pendingTasksCount}` : ""}
          </h1>
          <TaskForm />
          <Box component="div" sx={{ textAlign: "center", mt: 1 }}>
            <Button
              variant="contained"
              onClick={() => setHideCompleted(!hideCompleted)}
            >
              {hideCompleted ? "Show All" : "Hide Completed"}
            </Button>
          </Box>
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
