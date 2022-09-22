import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useTracker } from "meteor/react-meteor-data";
import { Button, TextField } from "@mui/material";
import debounce from "lodash.debounce";
import { TagsCollection } from "../../../api/Tags/TagsCollection";

export default function TagField({ setText, text }) {
  const [tags, setTags] = React.useState([]);
  const [tagInputValue, setTagInputValue] = React.useState("");
  const [tagValue, setTagValue] = React.useState([]);
  const { tag = [], isLoading = false } = useTracker(() => {
    const hangler = Meteor.subscribe("tags");
    const tag = TagsCollection.find({}, { limit: 50 }).fetch();

    if (hangler.ready()) {
      return { tag: tag, isLoading: true };
    }
    return { tag };
  });

  React.useEffect(() => {
    if (isLoading) {
      setTags(tag.slice(0, 10));
    }
  }, [isLoading]);

  React.useEffect(() => {
    if (tagInputValue.length >= 2) {
      debounce(() => {
        setTags(tag.filter((el) => el.text.includes(tagInputValue)));
      }, 300)();
    } else {
      setTags(tag.filter((el) => el.text.includes(tagInputValue)).slice(0, 10));
    }
  }, [tagInputValue]);

  const handleSubmit = () => {
    if (!text) return;
    Meteor.call("tasks.insert", text, tagValue);
    setText("");
    setTagValue([]);
  };
  return (
    <>
      <Autocomplete
        id="multiple-limit-tags"
        multiple
        limitTags={4}
        /* Configure options and values */
        isOptionEqualToValue={(option, value) => option._id === value._id}
        options={tags}
        value={tagValue}
        size={"small"}
        onChange={(event, values) => {
          console.log(values);
          setTagValue(values);
        }}
        filterOptions={(x) => x}
        onInputChange={(event, newInputValue) => {
          setTagInputValue(newInputValue);
        }}
        getOptionLabel={(tag) => tag.text}
        renderInput={(params) => (
          <TextField {...params} label="Tags" placeholder="Add tags" />
        )}
        sx={{ width: "500px" }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 0, ml: 0.5 }}
        onClick={(e) => {
          handleSubmit();
        }}
      >
        Add Task
      </Button>
    </>
  );
}
