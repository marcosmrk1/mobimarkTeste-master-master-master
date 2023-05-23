
import { AppBar, Toolbar } from '@material-ui/core';
import { Box, Button, Typography, } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import { dadosDoEmaileSenha } from '../../localStorageGlobais';
import { listaMenu } from '../../utils/utils';
import HamburguerMenu from '../HamburguerMenu/HamburguerMenu';
import { useStyles } from './StyleNavbarDesktop';
function Template({ children }) {
  const navigate = useNavigate();
  const FuncaoSaidaButton = () => {
    window.localStorage.removeItem(dadosDoEmaileSenha, '')
    navigate('/')
  }
  const classes = useStyles();
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <HamburguerMenu listaMenu={listaMenu} />
          <Box style={{ fontSize: 25 }} >

            <Typography variant='h4'>MobiTeste</Typography>
          </Box>
          <Grid container marginLeft={'18px'}>
            <Grid item sm={12} md={10} style={{
              textDecoration: 'none',
              color: 'white',
              fontSize: '20px',
            }
            }
              sx={{ display: { xs: 'none', md: 'flex' }, marginLeft: '10px', gap: '22px', }} >
              {listaMenu.map((listaItem, index) => (
                <Link key={index} to={listaItem.path} className={classes.link}>
                  {listaItem.label}
                </Link>
              ))}
              <Button onClick={FuncaoSaidaButton}><Link to='/' className={classes.link}>
                Sair
              </Link>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {children}
    </>
  );
}
export default Template;