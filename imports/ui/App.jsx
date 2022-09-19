import { AppBar, Button, CssBaseline, List } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { TasksCollection } from "../api/TasksCollection.js";
import { LoginForm } from "./LoginForm.jsx";
import { Task } from "./Task.jsx";
import { TaskForm } from "./TaskForm.jsx";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  
  const user = useTracker(() => Meteor.user());

  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }
    return TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    return TasksCollection.find(pendingOnlyFilter).count();
  });
  const logout = () => Meteor.logout();
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
      <AppBar position="static" sx={{ mb: 2, pl: 1, flexDirection:"row",justifyContent:"space-around", alignItems:"center" }}>
        <h1>Welcome to Meteor!</h1>
        <div className="user" onClick={logout}>
        {user? `${user.username}🚪`: ''}
      </div>
      </AppBar>
      <Container maxWidth="sm">
        {user ? (
          <div>
            <h1>
              📝️ To Do List :
              {pendingTasksCount ? ` ${pendingTasksCount}` : "0"}
            </h1>
            <TaskForm user={user} />
            <Box component="div" sx={{ textAlign: "center", mt: 1 }}>
              <Button
                variant="outlined"
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
        ) : (
          <LoginForm />
        )}
      </Container>
    </>
  );
};
