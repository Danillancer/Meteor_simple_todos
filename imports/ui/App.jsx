import React from 'react';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Task } from './Task.jsx';


export const App = () =>{ 
  const tasks = [
    {_id: 1, text: 'First Task'},
    {_id: 2, text: 'Second Task'},
    {_id: 3, text: 'Third Task'},
  ];
  
  return(
  <div>
    <h1>Welcome to Meteor!</h1>
    <ul>
      { tasks.map(task => <Task key={ task._id } task={ task }/>) }
    </ul>
  </div>
)};
