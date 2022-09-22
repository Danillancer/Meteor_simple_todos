import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Button, TextField } from "@mui/material";

export default function TagField({ setText, text }) {
  const [tags, setTags] = React.useState([]);
  const [tagInputValue, setTagInputValue] = React.useState("");
  const [tagValue, setTagValue] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [timer, setTimer] = React.useState(null);

  const asyncCallMethod = (methodName, ...args) => {
    return new Promise((resolve, reject) => {
      Meteor.call(methodName, ...args, (error, result) => {
        if (error) {
          reject(error);
        }

        resolve(result);
      });
    });
  };


  React.useEffect(() => {
    if (timer) {
        clearTimeout(timer);
        setTimer(null);
    }
    const timerEl = setTimeout(() => {
        setSearch(tagInputValue);
    }, 300);
    setTimer(timerEl);
}, [tagInputValue]);

  React.useEffect(() => {
    const loadTags = async() => {
      let tags;
      if (search.length >= 2) {
          tags = await asyncCallMethod("tags.getAll", {
            query: search,
            limit: 50,
          });
      } else {
          tags = await asyncCallMethod("tags.getAll", { limit: 10 });
      }
      if (tags) {
        setTags(tags.filter((el) => el.text.includes(search)));
      }
    };
    loadTags();
  }, [search]);

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
