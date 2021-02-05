import { useState } from 'react';
import { TextField } from '@material-ui/core';

const Note = ({edit, setEdit, value, setValue}) => {
  const handleChange = e => {
    setValue(e.target.value)
  }
  return (
    <div className={'note'} onClick={!edit && setEdit}>{
      edit ? <TextField
        id="outlined-multiline-static"
        multiline
        rows={value.split("\n").length + 1}
        value={value}
        variant="outlined"
        onChange={handleChange}
      /> : (
        value.split("\n\n").map(str => <p dangerouslySetInnerHTML={{__html: str.replace("\n", '<br />')}}></p>)
      )
    }</div>
  )
}

export default Note
