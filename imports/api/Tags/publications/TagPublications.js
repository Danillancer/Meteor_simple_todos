import { Meteor } from 'meteor/meteor';
import { TagsCollection } from '/imports/api/Tags/TagsCollection';



Meteor.publish('tags', function publishTags() {
  return TagsCollection.find();
});