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
  // const first = [
  //   "Got",
  //   "ability",
  //   "shop",
  //   "recall",
  //   "fruit",
  //   "easy",
  //   "dirty",
  //   "giant",
  //   "shaking",
  //   "ground",
  // ];
  // const secont = [
  //   "weather",
  //   "lesson",
  //   "almost",
  //   "square",
  //   "forward",
  //   "bend",
  //   "cold",
  //   "broken",
  //   "distant",
  //   "adjective.",
  // ];

  if (TagsCollection.find().count() === 0) {
    [
      "ability","able","aboard","about","above","accept","accident","according",
      "account","accurate","acres","across","act","action","active","activity",
      "actual","actually","add","addition","additional","adjective","adult","adventure",
      "advice","affect","afraid","after","afternoon","again","against","age",
      "ago","agree","ahead","aid","air","airplane","alike","alive",
      "all","allow","almost","alone","along","aloud","alphabet","already",
      "also","although","am","among","amount","ancient","angle","angry",
      "animal","announced","another","answer","ants","any","anybody","anyone",
      "anything","anyway","anywhere","apart","apartment","appearance","apple","applied",
      "appropriate","are","area","arm","army","around","arrange","arrangement",
      "arrive","arrow","art","article","as","aside","ask","asleep",
      "at","ate","atmosphere","atom","atomic","attached","attack","attempt",
      "attention","audience","author","automobile"].forEach((tag) => insertTag(tag));
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
