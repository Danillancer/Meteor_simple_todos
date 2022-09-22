import { Meteor } from "meteor/meteor";
import "../imports/api/Tasks/methods/TasksMethods";
import "../imports/api/Tasks/publications/TasksPublications";
import "../imports/api/Tags/publications/TagPublications"
import { userInsert } from "./autoInserts/userInsert";
import { insertTasks } from "./autoInserts/tasksInsert";
import { tagInsert } from "./autoInserts/tagInsert";


Meteor.startup(() => {
  userInsert()
  insertTasks()
  tagInsert()
});
ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      loginStyle: "popup",
      clientId: "1432f60fc1417c2024ed", // insert your clientId here
      secret: "a5d54ccfb4b16ac4663297e793257423ab176f3b", // insert your secret here
    },
  }
);
