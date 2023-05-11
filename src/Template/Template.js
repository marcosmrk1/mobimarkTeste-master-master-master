
import { dadosDoEmaileSenha } from '../localStorageGlobais'
import { AppBar, Toolbar, CssBaseline, makeStyles } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, } from '@mui/material';
import HamburguerMenu from './HamburguerMenu';
import { IconButton } from '@mui/material';
import Grid from '@mui/material/Grid';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
const listaMenu = [
  { picture: <FormatListBulletedIcon sx={{ fontSize: '16px', marginRight: '4px', }} />, path: '/telalistagem', label: 'Listagem' },
  { picture: <PersonIcon sx={{ fontSize: '16px', marginRight: '4px' }} />, path: '/sobremim', label: 'Sobre mim' },
  { picture: <EditIcon sx={{ fontSize: '16px', marginRight: '4px', }} />, path: '/TelaFormulario', label: 'Formulário ' },
]
const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
    margin: theme.spacing(0, 2),
    '&:hover': {
      color: 'yellow',
      borderBottom: '1px solid white',
    },
  },
}));
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
          <span style={{ fontSize: 25 }} >MobiTeste</span>
          <Grid container marginLeft={'18px'}>
            <Grid item sm={12} md={10} style={{
              textDecoration: 'none',
              color: 'white',
              fontSize: '20px',
            }
            } sx={{ display: { xs: 'none', md: 'flex' }, }} >
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