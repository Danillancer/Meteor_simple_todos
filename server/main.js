import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "/imports/db/TasksCollection";
import { TagsCollection } from "/imports/db/TagsCollection";
import "/imports/api/TasksMethods";
import "/imports/api/TasksPublications";
import "/imports/api/TagPublications";
import randomWords from 'random-words'

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const insertTag = (tag) =>
  TagsCollection.insert({
    text: tag,
    createdAt: new Date(),
  });

const SEED_USERNAME = "admin";
const SEED_PASSWORD = "123";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    [
      "First Task",
      "Second Task",
      "Third Task",
      "Fourth Task",
      "Fifth Task",
      "Sixth Task",
      "Seventh Task",
    ].forEach((taskText) => insertTask(taskText, user));
  }
  if (TagsCollection.find().count() === 0) {
    randomWords(100).forEach((tag) => insertTag(tag));
  }
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
