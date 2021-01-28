import React, { useState } from 'react';
import Diary from './Diary.js';
import TaskList from './TaskList.js';

const Note = props => {
  const today = new Date()
  return <>
    <h2>{today.getDate()}日</h2>
    <TaskList />
    <Diary />
  </>
}

export default Note;

