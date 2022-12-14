import React, { useState } from "react";
import Box from "@mui/material/Box";
import {TextField } from "@mui/material";
import TagField from "./TagField";

export const TaskForm = () => {
  const [text, setText] = useState("");
  return (
    <Box component="div" sx={{ textAlign: "center", display: "flex",justifyContent:'center'}}>
      <TextField
        id="standard-basic"
        variant="standard"
        placeholder="Type to add new tasks"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mr: 0.5 }}
      />
      <TagField
        setText={setText}
        text={text}
      />
    </Box>
  );
};
