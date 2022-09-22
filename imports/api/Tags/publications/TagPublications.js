import { Meteor } from 'meteor/meteor';
import { TagsCollection } from '../TagsCollection';




Meteor.publish('tags', function publishTags() {
  return TagsCollection.find();
});