
import { dadosDoEmaileSenha } from '../localStorageGlobais'
import { AppBar, Toolbar,CssBaseline,Typography, makeStyles,Button} from '@material-ui/core';
import { Link,useNavigate } from 'react-router-dom';
import {Box} from '@mui/material';
import HamburguerMenu from './HamburguerMenu';
import { IconButton } from '@mui/material';
;

const listaMenu = [
  {path: '/telalistagem', label:'Listagem'},
  {path: '/sobremim', label:'Sobre mim'},
  {path: '/TelaFormulario', label:'Formulário'},
]
const useStyles = makeStyles((theme) => ({
  navlinks: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(5),
    gap: theme.spacing(4),    
      }, 
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
function Template({children}) {
const navigate = useNavigate();
const FuncaoSaidaButton = () => {
  window.localStorage.removeItem(dadosDoEmaileSenha, '')
    navigate('/')
}
  const classes = useStyles();
  return (
    <>

    <AppBar position='static'>

      <CssBaseline />
      <Toolbar>
        <HamburguerMenu listaMenu={listaMenu} />
        <Typography variant='h4' >
         MobiTeste
        </Typography>
        <Box >  
          <Box className={classes.navlinks} sx={{  display:  { xs: 'none',md:'flex' }, }} >
            {listaMenu.map((listaItem,index)=> (
              
            <Link key={index} to={listaItem.path} className={classes.link}>
                {listaItem.label}
            </Link>
            ))}
            <Button onClick={FuncaoSaidaButton}><Link to='/' className={classes.link}>
              Sair
            </Link>
            </Button>
          </Box>
          </Box>
      </Toolbar>
    </AppBar>
    {children}
    </>
  );
}
export default Template;