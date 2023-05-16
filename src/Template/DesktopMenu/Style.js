
import { makeStyles } from '@material-ui/core';
export const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: 'none',
        marginLeft: '22px',
        color: 'white',
        fontSize: '20px',
        margin: theme.spacing(0, 2),
        '&:hover': {
            color: 'yellow',
            borderBottom: '1px solid white',
        }
    }
}));