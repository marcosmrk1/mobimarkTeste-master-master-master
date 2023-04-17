
import { dadosDoEmaileSenha } from '../localStorageGlobais'
import { AppBar, Toolbar,CssBaseline,Typography, makeStyles,Button,Box} from '@material-ui/core';
import { Link,useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  navlinks: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(5),
    gap: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(2),
      marginTop: theme.spacing(1),
      gap: theme.spacing(2),
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: 35,
      marginTop: theme.spacing(2),
    },
      [theme.breakpoints.between('md','lg')]: {
          display: 'flex',
          marginLeft: 300,
          marginTop: theme.spacing(2),
          flexDirection: 'justifyContent',
          alignItems: 'flex-start',
          gap: 40,
        },
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
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0, 1),
    },
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1, 0),
    },
  },
}));
function Template() {
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
        <Typography variant='h4'>
         MobiTeste
        </Typography>
          <Box className={classes.navlinks}>
            <Link to='/formulario' className={classes.link}>
              Formulario
            </Link>
            <Link to='/sobremim' className={classes.link}>
             Sobre min
            </Link>
            <Link to='/telalistagem' className={classes.link}>
             Tela Listagem
            </Link>
            <Button onClick={FuncaoSaidaButton}><Link to='/' className={classes.link}>
              Sair
            </Link>
            </Button>
          </Box>
      </Toolbar>
    </AppBar>
    </>
  );
}
export default Template;