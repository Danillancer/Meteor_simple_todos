import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TagsCollection } from "../TagsCollection";

Meteor.methods({
  "tags.getAll"({ query, limit } = {}) {
    const fields = {};
    if (query) {
      fields.text = {
        $regex: query,
        $options: "gi",
      };
    }

    const tags = TagsCollection.find(fields, { limit }).fetch();
    return tags;
  },
});
