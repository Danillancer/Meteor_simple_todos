import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "/imports/db/TasksCollection";
import { TagsCollection } from "/imports/db/TagsCollection";
import "/imports/api/TasksMethods";
import "/imports/api/TasksPublications";
import "/imports/api/TagPublications";

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
    [
      "all","allow","almost","alone","along","aloud","alphabet","already",
      "balloon","band","bank","bar","bare","bark","barn","base",
      "business","busy","but","butter","buy","by","cabin","cage",
      "cake","call","calm","came","camera","camp","can","canal",
      "actual","actually","add","addition","additional","adjective","adult","adventure",
      "energy","engine","engineer","enjoy","enough","enter","entire","entirely",
      "dark","darkness","date","daughter","dawn","day","dead","deal",
      "fierce","fifteen","fifth","fifty","fight","fighting","figure","fill",
      "helpful","her","herd","here","herself","hidden","hide","high",
      "lying","machine","machinery","mad","made","magic","magnet","mail",
      "manufacturing","many","map","mark","market","married","mass","massage",
      "no","nobody","nodded","noise","none","noon","nor","north",
      "nose","not","note","noted","nothing","notice","noun","now",
      "production","program","progress","promised","proper","properly","property","protection",
      "school","science","scientific","scientist","score","screen","sea","search",
      "weigh","weight","welcome","well","went","were","west","western",].forEach((tag) => insertTag(tag));
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
