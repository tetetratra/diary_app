import { useState } from 'react';
import { TextField } from '@material-ui/core';

const Note = ({edit, setEdit, value, setValue}) => {
  const handleChange = e => {
    setValue(e.target.value)
  }
  return (
    <div className={'note'} onClick={() => setEdit(true)}>{
      edit ? <TextField
        id="outlined-multiline-static"
        multiline
        rows={value.split("\n").length + 1}
        cols={100}
        value={value}
        variant="outlined"
        onChange={handleChange}
        inputProps={{style: {width: "40rem"} }}
      /> : (
        value.split("\n\n").map(str => <p>{str.split("\n").map(s => <>{s}<br /></>)}</p>)
      )
    }</div>
  )
}

export default Note
