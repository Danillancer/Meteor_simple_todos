import { AppBar, Button, CssBaseline, List } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { TasksCollection } from "../db/TasksCollection.js";
import { LoginForm } from "./LoginForm.jsx";
import { Task } from "./Task.jsx";
import { TaskForm } from "./TaskForm.jsx";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const user = useTracker(() => Meteor.user());

  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });


  const logout = () => Meteor.logout();

  const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call("tasks.setIsChecked", _id, !isChecked);
  };

  const deleteTask = ({ _id }) => Meteor.call("tasks.remove", _id);

  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{
          mb: 2,
          pl: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <h1>Welcome to Meteor!</h1>
        <div onClick={logout}>
          {user ? `${user.username || user.profile.name} 🚪` : ""}
        </div>
      </AppBar>
      <Container maxWidth="sm">
        {user ? (
          <div>
            <h1>
              📝️ To Do List :
              {pendingTasksCount ? ` ${pendingTasksCount}` : "0"}
            </h1>
            <TaskForm />
            <Box component="div" sx={{ textAlign: "center", mt: 1 }}>
              <Button
                variant="outlined"
                onClick={() => setHideCompleted(!hideCompleted)}
              >
                {hideCompleted ? "Show All" : "Hide Completed"}
              </Button>
            </Box>
            {isLoading && <div className="loading">loading...</div>}
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
