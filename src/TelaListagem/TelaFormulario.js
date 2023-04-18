
import {Box,TextField} from '@mui/material';

const TelaFormulario = () => {
  return (
    <div> 
    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    <TextField id="filled-basic" label="Filled" variant="filled" />
    <TextField id="standard-basic" label="Standard" variant="standard" />
  </Box>
  </div>
  )
}

export default TelaFormulario