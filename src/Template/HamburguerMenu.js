import * as React from 'react';
import react, { useState } from 'react'
import { AppBar, Box, Divider, IconButton, Popover, Typography } from '@mui/material';
import { Card, Drawer, Toolbar } from '@material-ui/core';
import { dadosDoEmaileSenha } from '../localStorageGlobais'

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    fontSize: '1.25rem',
    fontWeight: theme.typography.fontWeightMedium,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

const HamburguerMenu = ({ listaMenu }) => {
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

  const navigate = useNavigate();

  const FuncaoSaidaButton = () => {
    window.localStorage.removeItem(dadosDoEmaileSenha, '');
    navigate('/');
  };

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 4 }} onClick={handleClick}>
        <MenuIcon />
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
        <Box className={classes.navlinks}>
          <IconButton sx={{ alignSelf: 'flex-end' }} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          {listaMenu.map((listaItem, index) => (
            <Link key={index} to={listaItem.path} className={classes.link}>
              {listaItem.label}
            </Link>
          ))}
        </Box>
      </Popover>
    </Box>
  );
};


export default HamburguerMenu