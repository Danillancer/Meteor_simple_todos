import randomWords from 'random-words'
import { TagsCollection } from '../../imports/api/Tags/TagsCollection';
const insertTag = (tag) =>
TagsCollection.insert({
  text: tag,
  createdAt: new Date(),
});


export const tagInsert = () => {
    if (TagsCollection.find().count() === 0) {
        randomWords(100).forEach((tag) => insertTag(tag));
      }
}
