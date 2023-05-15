import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { dadosDoEmaileSenha } from '../localStorageGlobais';
const useStyles = makeStyles((theme) => ({

  link: {
    textDecoration: 'none',
    color: '#325d87',
    flexDirection: 'column',
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
  const [drawerIcon, setDrawerIcon] = useState(false)


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);



  const open = Boolean(anchorEl);
  const id = open ? 'menu-popover' : undefined;
  const navigate = useNavigate();

  const FuncaoSaidaButton = () => {
    window.localStorage.removeItem(dadosDoEmaileSenha, '');
    navigate('/');
  };
  return (


    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <Button onClick={() => setDrawerIcon(true)}>{<MenuIcon sx={{ color: 'white' }} />}</Button>
      <Drawer
        anchor={'left'}
        open={drawerIcon}
        onClose={() => setDrawerIcon(false)}

      >
        <Box sx={{ marginTop: '12px' }}>
          <Typography sx={{
            flexDirection: 'column', fontSize: '1.25rem',
            marginLeft: '95px', fontFamily: "Roboto, Helvetica,Arial,sans-serif",
            fontSize: "20px", color: '#325d87', fontWeight: "bold",
          }}>Menu</Typography>
        </Box>
        <Box sx={{ color: "#325d87", borderBottom: '1px solid black' }}></Box>
        <Grid container
          sx={{ width: 250, marginTop: '12px', gap: '20px' }}
          role="presentation"
        >
          {listaMenu.map((listaItem, index) => (
            <Link key={index} to={listaItem.path} className={classes.link}>
              {listaItem.picture}{listaItem.label}
            </Link>
          ))}
          <Button onClick={FuncaoSaidaButton} sx={{ color: '#325d87', marginTop: '14px', fontSize: '20px', marginRight: '92px' }}><Link to='/' className={classes.link}></Link>
            <LogoutIcon /> Sair
          </Button>

        </Grid>
      </Drawer>
    </Box>
  );
}


export default HamburguerMenu