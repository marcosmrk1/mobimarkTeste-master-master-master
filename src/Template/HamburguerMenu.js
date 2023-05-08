import * as React from 'react';
import react, { useState } from 'react'
import { AppBar, Box, IconButton, Popover, Typography } from '@mui/material';
import { Drawer, Toolbar } from '@material-ui/core';

import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    navlinks: {
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(1),
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(1),
    },
  }));


  const HamburguerMenu = ({listaMenu}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'menu-popover' : undefined;
   


        
  return (
    <Box sx={{  display:  { xs: 'flex', md: 'none' },}}
      >
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 4 }} onClick={handleClick}>
      <MenuIcon/>
    </IconButton>
    <Popover
   id={id}
   open={open}
   anchorEl={anchorEl}
   onClose={handleClose}
   anchorOrigin={{
     vertical: 'bottom',
     horizontal: 'center',
   }}
   transformOrigin={{
     vertical: 'top',
     horizontal: 'center',
   }}
 >         
 {listaMenu.map((listaItem,index)=> (
    
    <Box  key = {index} sx={{marginTop:'20px'}}>
      <Link  to = {listaItem.path} className={classes.link}> {listaItem.label}</Link>
    </Box>
    ))}

</Popover>
    </Box>
  )
}

export default HamburguerMenu